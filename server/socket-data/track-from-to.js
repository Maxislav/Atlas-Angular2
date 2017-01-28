const util = require('./util');

class TrackFromTo {
    constructor(socket, connection) {
        this.socket = socket;
        this.connection = connection;
        socket.on('trackFromTo', this.trackFromTo.bind(this, 'trackFromTo'))
    }

    trackFromTo(eName, data) {


        let _userId;
        util.getUserIdBySocketId(this.connection, this.socket.id)
            .then(userId => {
                _userId = userId;
                return util.getDeviceByUserId(this.connection, userId)
            }).then(devices => {

            return devices


        }).then(devices => {
            const promises = [];
            const tracks = {};
            devices.forEach(device => {
                promises.push(util.getTrackFromTo(this.connection, device.device_key, data.from, data.to)
                    .then(rows => {
                        tracks[device.device_key] = rows;
                        return tracks
                    })
                )
            });

            return Promise.all(promises)
                .then(d => {
                    return tracks
                });
        }).then(tracks => {
            this.socket.emit(eName, {
                result: 'ok',
                devices: tracks
            })
        })
            .catch(err => {
                console.error(err)
            })


    }


}

module.exports = TrackFromTo;