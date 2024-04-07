const mappApp = {
    go() {
        const track = this.getTrack();
        this.locoMap = L.map('js-map', {
            attributionControl: false
        });

        const sumPoint = track.reduce((acc, waypoint) => ({ lat: acc.lat + waypoint.lat, lng: acc.lng + waypoint.lng }), { lat: 0, lng: 0 });
        const mapCenter = [L.Util.formatNum(sumPoint.lat / track.length), L.Util.formatNum(sumPoint.lng / track.length)];

        const wayPoints = track.map(({ lat, lng }) => [lat, lng]);
        const shadowRoute = L.polyline(wayPoints, {
            color: 'red',
            opacity: 0.1,
            weight: 14
        }).addTo(this.locoMap);

        const route = L.polyline(wayPoints, {
            dashArray: '7, 12',
            dashOffset: '0',
            color: '#6c488d',
            opacity: 0.8,
            weight: 3
        }).addTo(this.locoMap);

        wayPoints.forEach(wayPoint =>
            L.circle(wayPoint, {
                color: 'transparent',
                fillColor: (wayPoint[0] === 59.13373874 && wayPoint[1] === 37.84461008) ? 'orange' : 'blue',
                fillOpacity: 0.5,
                radius: 8
            })
                .addTo(this.locoMap)
                .bindPopup(`${wayPoint[0]}, ${wayPoint[1]}`)
        );

        shadowRoute.on('mousemove', ({ latlng }) => this.dispayInfo(latlng, track));

        this.locoMap.setView(mapCenter, 16).fitBounds(route.getBounds());

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attributionControl: false
        }).addTo(this.locoMap);
    },

    async dispayInfo({ lat, lng }, track) {
        if (this.drawRestricted) {
            return;
        }
        this.drawRestricted = true;

        if (this.circle) {
            this.circle.remove();
        }
        if (this.mouse) {
            this.mouse.remove();
        }
        const nearestPoint = this.getNiarestPoint({ lat, lng }, track);
        //console.log(lat, lng, nearestPoint);
        this.mouse = L.circle([lat, lng], {
            color: 'transparent',
            fillColor: 'yellow',
            fillOpacity: 1,
            radius: 10
        }).addTo(this.locoMap);
        this.circle = L.circle([nearestPoint.lat, nearestPoint.lng], {
            color: 'transparent',
            fillColor: 'red',
            fillOpacity: 0.5,
            radius: 10
        })
            .addTo(this.locoMap)
            .bindPopup('timestamp');
        await new Promise(resolve => requestAnimationFrame(() => resolve()));
        this.drawRestricted = false;
    },

    getNiarestPoint({ lat: clientLat, lng: clientLng }, track) {
        const LatLng = L.LatLng;
        return track.reduce(
            (acc, { lat, lng }) => {
                const clientLatLng = new LatLng(clientLat, clientLng);
                const distance = clientLatLng.distanceTo(new LatLng(lat, lng));
                const oldDistance = clientLatLng.distanceTo(new LatLng(acc.lat, acc.lng));
                // const distance = (clientLat - lat) ** 2 + (clientLng - lng) ** 2;
                // const oldDistance = (acc.lat - lat) ** 2 + (acc.lng - lng) ** 2;
                if (distance > oldDistance) {
                    return acc;
                }
                return { lat, lng, distance };
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
        Meta.location.Latitude.forEach((currentLatitude, i) => {
            const currentLongitude = Meta.location.Longitude[i];
            if (Number.isNaN(Number.parseFloat(currentLatitude)) || Number.isNaN(Number.parseFloat(currentLongitude))) {
                return;
            }
            track.push({
                lat: currentLatitude,
                lng: currentLongitude,
                timestamp: Meta.location.Timestamp[i]
            });
        }, []);
        return track;
    },

    truncNum(num) {
        const decimal = 10000000;
        return Math.floor(num * decimal) / decimal;
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
