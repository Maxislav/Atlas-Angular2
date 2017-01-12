"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var map_service_1 = require("./map.service");
var timer_service_1 = require("./timer.service");
var MarkerService = (function () {
    function MarkerService(mapService, timer) {
        this.mapService = mapService;
        this.timer = timer;
        this.layerIds = [];
    }
    MarkerService.prototype.marker = function (marker2, user) {
        var map = this.mapService.map;
        var layerId = this.getNewLayer(0, 5000000, true) + '';
        var mapboxgl = this.mapService.mapboxgl;
        var mapBearing = map.getBearing();
        var icoContainer = document.createElement('div');
        icoContainer.classList.add("user-icon");
        icoContainer.setAttribute('status', getIconImage(marker2));
        var img = new Image();
        img.src = user.image || 'src/img/no-avatar.gif';
        icoContainer.appendChild(img);
        var popup = new mapboxgl.Popup({ closeOnClick: false, offset: [0, -15], closeButton: false })
            .setLngLat([marker2.lng, marker2.lat])
            .setHTML('<div>' + marker2.name + '</div>')
            .addTo(map);
        var iconMarker = new mapboxgl.Marker(icoContainer, { offset: [-20, -20] })
            .setLngLat([marker2.lng, marker2.lat])
            .addTo(map);
        var intervalUpdateMarker = null;
        var timer = this.timer;
        marker2.updateSetImage = function (src) {
            img.src = src;
        };
        marker2.image = user.image || 'src/img/no-avatar.gif';
        marker2.elapsed = '...';
        marker2.update = function (mark) {
            for (var opt in mark) {
                this[opt] = mark[opt];
            }
            popup.setLngLat([this.lng, this.lat]);
            iconMarker.setLngLat([this.lng, this.lat]);
            this.status = getIconImage(this);
            icoContainer.setAttribute('status', this.status);
        };
        marker2.updateMarker = function () {
            this.status = getIconImage(this);
            icoContainer.setAttribute('status', this.status);
            this.elapsed = timer.elapse(this.date);
        };
        marker2.remove = function () {
            popup.remove();
            console.log('delete marker id', layerId);
            iconMarker.remove();
            intervalUpdateMarker && clearInterval(intervalUpdateMarker);
        };
        intervalUpdateMarker = setInterval(function () {
            marker2.updateMarker();
        }, 1000);
        return marker2;
    };
    MarkerService.prototype.getNewLayer = function (min, max, int) {
        var rand = min + Math.random() * (max - min);
        if (int) {
            rand = 'marker' + Math.round(rand);
        }
        if (-1 < this.layerIds.indexOf(rand)) {
            return this.getNewLayer(min, max, int);
        }
        else {
            return rand;
        }
    };
    MarkerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [map_service_1.MapService, timer_service_1.TimerService])
    ], MarkerService);
    return MarkerService;
}());
exports.MarkerService = MarkerService;
function getIconImage(device) {
    var dateLong = new Date(device.date).getTime();
    var passed = new Date().getTime() - dateLong;
    if (passed < 10 * 60 * 1000) {
        if (device.speed < 0.1) {
            return 'green';
        }
        else {
            return 'arrow';
        }
    }
    else if (passed < 3600 * 12 * 1000) {
        return 'yellow';
    }
    else {
        return 'white';
    }
}
//# sourceMappingURL=marker.service.js.map