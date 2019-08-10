"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deferred_1 = require("./deferred");
const base_station_location_1 = require("./base-station-location");
const MessageType = {
    GTSTR: 0,
    GTLBS: 1,
    GTGSM: 2,
    toString(n) {
        const r = {
            0: 'GTSTR',
            1: 'GTLBS',
            2: 'GTGSM'
        };
        return r[n];
    }
};
class Gl520Parser {
    constructor() {
        this.srcMsg = null;
        this.type = null;
        this.messageType = -1;
        this.pointList = null;
        this.deferred = new deferred_1.Deferred();
        this.baseStationLocation = new base_station_location_1.BaseStationLocation();
    }
    /**
     *
     * @param {string} srcStr
     * @returns {Gl520Parser}
     */
    setSrcData(srcStr) {
        this.srcMsg = srcStr;
        this.setType(srcStr);
        this.parseData();
        return this;
    }
    /**
     * @returns {Promise|Promise<any>}
     */
    getData() {
        return this.deferred.promise;
    }
    /**
     *
     * @returns {*}
     * @private
     */
    parseData() {
        const respData = {
            alt: null,
            lng: null,
            lat: null,
            azimuth: null,
            speed: null,
            date: null,
            src: this.srcMsg
        };
        if (this.messageType === MessageType.GTSTR) {
            const arr = this.srcMsg.split(',');
            const srcDate = arr[15];
            const point = Object.assign(respData, {
                device_key: arr[2],
                id: arr[2],
                speed: arr[10],
                azimuth: arr[11],
                alt: arr[12],
                lng: arr[13],
                lat: arr[14],
                type: this.type,
                date: new Date(Number(srcDate.slice(0, 4)), Number(srcDate.slice(4, 6)) - 1, Number(srcDate.slice(6, 8)), Number(srcDate.slice(8, 10)), Number(srcDate.slice(10, 12)), Number(srcDate.slice(12, 14)))
            });
            this.pointList = [point];
            this.deferred.resolve(this.pointList);
        }
        if (this.messageType === MessageType.GTGSM) {
            const arr = this.convertToMobileCell();
            Promise.all(arr.map(mobileCell => {
                return this.baseStationLocation.getLatLng(mobileCell);
            })).then((list) => {
                this.pointList = list.map((baseStationPoint, index) => {
                    return Object.assign({}, respData, {
                        device_key: arr[index].deviceId,
                        id: arr[index].deviceId,
                        date: arr[index].date,
                        lng: baseStationPoint.lng,
                        lat: baseStationPoint.lat,
                        type: this.type,
                        azimuth: 0,
                        speed: 0,
                        alt: 0,
                    });
                });
                this.deferred.resolve(this.pointList);
            })
                .catch(err => {
                console.error('error get cell');
            });
        }
        else {
            this.deferred.resolve(null);
        }
    }
    convertToMobileCell() {
        const mc = {
            mcc: null,
            mnc: null,
            lac: null,
            cellId: null
        };
        const arr = this.srcMsg.split(',');
        let deviceId = null;
        let date = null;
        if (this.messageType === MessageType.GTLBS) {
            date = this.strToDate(arr[arr.length - 2]);
            const prefix = arr.splice(0, 12);
            deviceId = prefix[10];
        }
        if (this.messageType === MessageType.GTGSM) {
            date = this.strToDate(arr[arr.length - 2]);
            const prefix = arr.splice(0, 4);
            deviceId = prefix[2];
        }
        const res = [];
        while (arr.length) {
            res.push(arr.splice(0, 6));
        }
        return res.filter(item => item[4]).map(item => {
            return {
                mcc: parseInt(item[0], 10),
                mnc: parseInt(item[1], 10),
                lac: parseInt(item[2], 16),
                cellId: parseInt(item[3], 16),
                deviceId: deviceId,
                date
            };
        });
    }
    strToDate(str) {
        return new Date(Number(str.slice(0, 4)), Number(str.slice(4, 6)) - 1, Number(str.slice(6, 8)), Number(str.slice(8, 10)), Number(str.slice(10, 12)), Number(str.slice(12, 14)));
    }
    setType(str) {
        switch (true) {
            case !str: {
                this.messageType = -1;
                break;
            }
            case typeof str !== 'string': {
                this.messageType = -1;
                break;
            }
            case !!str.match(/^([\s]+)?\+?RESP:GTSTR,\d+,\d+,.+/): {
                this.messageType = MessageType.GTSTR;
                break;
            }
            case !!str.match(/^([\s]+)?\+?RESP:GTLBS,\d+,\d+,.+/): {
                this.messageType = MessageType.GTLBS;
                break;
            }
            case !!str.match(/^([\s]+)?\+?RESP:GTGSM,\d+,\d+,.+/): {
                this.messageType = MessageType.GTGSM;
                break;
            }
            default: {
                this.messageType = -1;
                break;
            }
        }
        switch (this.messageType) {
            case MessageType.GTGSM:
            case MessageType.GTLBS: {
                this.type = 'BS';
                break;
            }
            case MessageType.GTSTR: {
                this.type = 'POINT';
                break;
            }
        }
    }
}
exports.Gl520Parser = Gl520Parser;
//# sourceMappingURL=gl-520-parser.js.map