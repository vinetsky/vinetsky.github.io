const inputLocation = `
{
    "LocoType": "ТГМ6",
    "LocoNumber": "1234",
    "Timestamp":[
         "2010-09-11 10:27:29",
         "2010-09-11 10:27:37",
         "2010-09-11 10:27:45",
         "2010-09-11 10:32:32",
         "2010-09-11 10:32:44",
         "2010-09-11 10:32:56",
         "2010-09-11 10:33:04",
         "2010-09-11 10:33:14",
         "2010-09-11 10:33:24",
         "2010-09-11 10:33:34",
         "2010-09-11 10:33:48",
         "2010-09-11 10:34:08",
         "2010-09-11 10:34:18",
         "2010-09-11 10:34:28",
         "2010-09-11 10:34:36",
         "2010-09-11 10:34:44",
         "2010-09-11 10:34:52",
         "2010-09-11 10:35:00",
         "2010-09-11 10:35:08",
         "2010-09-11 10:35:14",
         "2010-09-11 10:35:22",
         "2010-09-11 10:35:30",
         "2010-09-11 10:35:36",
         "2010-09-11 10:35:44",
         "2010-09-11 10:35:52",
         "2010-09-11 10:36:00",
         "2010-09-11 10:36:08",
         "2010-09-11 10:36:16",
         "2010-09-11 11:15:50",
         "2010-09-11 11:16:11",
         "2010-09-11 11:16:25",
         "2010-09-11 11:16:36",
         "2010-09-11 11:16:47",
         "2010-09-11 11:17:02",
         "2010-09-11 11:17:11",
         "2010-09-11 11:17:19",
         "2010-09-11 11:17:28",
         "2010-09-11 11:17:38",
         "2010-09-11 11:18:16",
         "2010-09-11 11:18:28",
         "2010-09-11 11:18:40",
         "2010-09-11 11:19:19",
         "2010-09-11 11:21:48",
         "2010-09-11 11:22:09",
         "2010-09-11 11:22:25",
         "2010-09-11 11:22:40",
         "2010-09-11 11:22:55",
         "2010-09-11 11:23:09",
         "2010-09-11 11:23:25",
         "2010-09-11 11:23:38",
         "2010-09-11 11:23:50",
         "2010-09-11 20:39:38",
         "2010-09-11 20:40:36",
         "2010-09-11 20:41:01",
         "2010-09-11 20:42:34",
         "2010-09-11 20:43:13"
    ],
    "Latitude":[
        59.13262376,
        59.13253209,
        59.13235906,
        59.13225019,
        59.13220035,
        59.13221238,
        59.13234531,
        59.13259798,
        59.13276471,
        59.13291826,
        59.1330701,
        59.1329091,
        59.13285581,
        59.13291826,
        59.13312797,
        59.133407,
        59.13373874,
        59.13406361,
        59.13439134,
        59.13465604,
        59.13494825,
        59.1352164,
        59.13543813,
        59.13557679,
        59.13571315,
        59.13569138,
        59.1357269,
        59.13584321,
        59.13577675,
        59.13570398,
        59.13563466,
        59.13559054,
        59.13547881,
        59.13526968,
        59.13496945,
        59.13468813,
        59.13443202,
        59.13414611,
        59.13300764,
        59.13283289,
        59.13280997,
        59.13329412,
        59.13313713,
        59.13293259,
        59.13287128,
        59.13267075,
        59.13244443,
        59.1322628,
        59.13218774,
        59.13218316,
        "NA",
        59.13219462,
        59.13216826,
        59.13212414,
        59.1321356,
        59.13204278
    ],
    "Longitude":[
        37.84800256,
        37.84717521,
        37.8464126,
        37.84562192,
        37.84462841,
        37.84357818,
        37.84280412,
        37.84206615,
        37.84126171,
        37.84031862,
        37.83947179,
        37.84035587,
        37.84135511,
        37.842332,
        37.84314789,
        37.8439231,
        37.84461008,
        37.84537841,
        37.84603159,
        37.84670424,
        37.84753445,
        37.84822315,
        37.848917,
        37.84973519,
        37.85063759,
        37.85156808,
        37.85247851,
        37.85337862,
        37.85251575,
        37.85164485,
        37.85080203,
        37.84994374,
        37.84907227,
        37.84832456,
        37.84770233,
        37.84703942,
        37.84634786,
        37.8456712,
        37.84294564,
        37.84213948,
        37.84123421,
        37.83889826,
        37.83964425,
        37.84037993,
        37.84123364,
        37.84195327,
        37.84267463,
        37.84342635,
        37.84428235,
        37.84518762,
        "NA",
        37.84278292,
        37.84368704,
        37.84454362,
        37.84546493,
        37.84631291
    ]
}
`;

const inputTemperatures = `
{
    "LocoType": "ТГМ6",
    "LocoNumber": "1234",
    "Timestamp":[
        "2010-09-11 10:00:00",
        "2010-09-11 11:00:01",
        "2010-09-11 11:59:55",
        "2010-09-11 21:00:00"
    ],
    "OutsideTemp":[
        21,
        25,
        26,
        23
    ]
}
`;

const Meta = {
    location: JSON.parse(inputLocation),
    temperatures: JSON.parse(inputTemperatures),
};


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

//# sourceMappingURL=footer.js.map
