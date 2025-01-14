const mappApp = {
    go() {
        const track = this.getTrack();
        this.locoMap = L.map('js-map', {
            attributionControl: false
        });

        const sumPoint = track.reduce((acc, waypoint) => ({ lat: acc.lat + waypoint.lat, lng: acc.lng + waypoint.lng }), { lat: 0, lng: 0 });
        const mapCenter = [L.Util.formatNum(sumPoint.lat / track.length), L.Util.formatNum(sumPoint.lng / track.length)];

        const wayPoints = track.map(({ lat, lng }) => [lat, lng]);
        const route = L.polyline(wayPoints, {
            dashArray: '7, 12',
            dashOffset: '0',
            color: '#6A359B',
            opacity: 0.8,
            weight: 3
        }).addTo(this.locoMap);
        this.shadowRoute = L.polyline(wayPoints, {
            color: 'red',
            opacity: 0,
            weight: 30
        }).addTo(this.locoMap);

        this.shadowRoute.on('mousemove', e => this.dispayInfo(e, track));
        this.locoMap.on('mousemove', e => this.updateCursorByDistance(e));

        this.locoMap.setView(mapCenter, 16).fitBounds(route.getBounds());

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attributionControl: false
        }).addTo(this.locoMap);
    },

    updateCursorByDistance(e) {
        const maximalRange = this.shadowRoute.getLatLngs().reduce((acc, latLng, i, arr) => {
            if (i === 0) {
                return acc;
            }
            return latLng.distanceTo(arr[i - 1]) > acc ? latLng.distanceTo(arr[i - 1]) : acc;
        }, -Infinity);

        const minimalRange = this.shadowRoute
            .getLatLngs()
            .reduce((acc, latLng) => (e.latlng.distanceTo(latLng) < acc ? e.latlng.distanceTo(latLng) : acc), Infinity);
        const oldCursorValue = this.cursorInRange;
        this.cursorInRange = minimalRange < Math.round(maximalRange / 2);
        if (this.circle && oldCursorValue && !this.cursorInRange) {
            this.circle.remove();
        }
    },

    async dispayInfo(e, track) {
        const { lat, lng } = e.latlng;

        if (this.drawRestricted) {
            return;
        }
        this.drawRestricted = true;

        if (this.circle) {
            this.circle.remove();
        }

        const nearestPoint = this.getNiarestPoint({ lat, lng }, track);

        if (this.cursorInRange) {
            this.circle = L.circle([nearestPoint.lat, nearestPoint.lng], {
                color: 'transparent',
                fillColor: 'red',
                fillOpacity: 0.5,
                radius: 10
            })
                .addTo(this.locoMap)
                .bindPopup(`<strong>${Meta.location.LocoType}</strong> №${Meta.location.LocoNumber} ${nearestPoint.approximatedTemp}&deg;C`, {
                    offset: [0, -10, 0]
                })
                .openPopup();
        }

        await new Promise(resolve => requestAnimationFrame(() => resolve()));
        this.drawRestricted = false;
    },

    getPixelDistance(eventXY, pointsXY) {
        const pixelDistances = pointsXY.map(({ x, y }) => Math.round(Math.sqrt((x - eventXY.x) ** 2 + (y - eventXY.y) ** 2)));
        const minimalPixelDistance = pixelDistances.reduce((acc, point) => (acc < point ? acc : point), Infinity);
        return minimalPixelDistance;
    },

    getNiarestPoint({ lat: clientLat, lng: clientLng }, track) {
        const LatLng = L.LatLng;
        return track.reduce(
            (acc, { lat, lng, approximatedTemp }, position) => {
                const clientLatLng = new LatLng(clientLat, clientLng);
                const distance = clientLatLng.distanceTo(new LatLng(lat, lng));
                const oldDistance = clientLatLng.distanceTo(new LatLng(acc.lat, acc.lng));

                if (distance > oldDistance) {
                    return acc;
                }
                return { lat, lng, distance, position, approximatedTemp };
            },
            {
                lat: track[0].lat,
                lng: track[0].lng,
                distance: Infinity
            }
        );
    },

    getTrack() {
        const track = [];
        Meta.location.Timestamp.forEach((currentTimestamp, i) => {
            const currentLatitude = Meta.location.Latitude[i];
            const currentLongitude = Meta.location.Longitude[i];
            if (Number.isNaN(Number.parseFloat(currentLatitude)) || Number.isNaN(Number.parseFloat(currentLongitude))) {
                return;
            }
            const currentDate = new Date(currentTimestamp);
            const temperatures = this.getTemperatures();
            const approximatedTemp = this.getApproximatedTemp(currentDate, temperatures);
            track.push({
                lat: currentLatitude,
                lng: currentLongitude,
                date: currentDate,
                approximatedTemp
            });
        }, []);
        return track;
    },

    getApproximatedTemp(currentDate, temperatures) {
        const dateRange = temperatures.reduce(
            (acc, currentTempData, i) => {
                if (currentTempData.date <= currentDate) {
                    return {
                        ...acc,
                        nearestLower: currentTempData.date > acc.nearestLower ? currentTempData.date : acc.nearestLower,
                        nearestLowerPos: currentTempData.date > acc.nearestLower ? i : acc.nearestLowerPos
                    };
                }
                return {
                    ...acc,
                    nearestHigher: currentTempData.date < acc.nearestHigher ? currentTempData.date : acc.nearestHigher,
                    nearestHigherPos: currentTempData.date < acc.nearestHigher ? i : acc.nearestHigherPos
                };
            },
            {
                nearestHigher: Infinity,
                nearestHigherPos: null,
                nearestLower: -Infinity,
                nearestLowerPos: null
            }
        );
        if (dateRange.nearestHigher === Infinity) {
            return dateRange.nearestLower;
        }
        if (dateRange.nearestHigher === -Infinity) {
            return dateRange.nearestHigher;
        }
        const dateFactor = currentDate - dateRange.nearestLower;
        const dateDifference = dateRange.nearestHigher - dateRange.nearestLower;
        const tempDifference = temperatures[dateRange.nearestHigherPos].temperature - temperatures[dateRange.nearestLowerPos].temperature;

        return (temperatures[dateRange.nearestLowerPos].temperature + (tempDifference * dateFactor) / dateDifference).toFixed(2);
    },

    getTemperatures() {
        return Meta.temperatures.Timestamp.map((ts, i) => ({
            date: new Date(ts),
            temperature: Meta.temperatures.OutsideTemp[i]
        }));
    },

    asap() {
        if (!document.addEventListener) {
            throw new Error('IE is not longer supported...');
        }
        return Promise.all([
            new Promise(resolve => {
                document.readyState === 'complete' ? resolve() : document.addEventListener('readystatechange', () => document.readyState === 'complete' && resolve());
            }),
            new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve())),
            new Promise(resolve => window.addEventListener('load', resolve()))
        ]);
    }
};

mappApp.asap().then(() => mappApp.go());
