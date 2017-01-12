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
var UserService = (function () {
    function UserService() {
        this._friends = [];
        this._user = {
            name: null,
            id: null,
            image: null
        };
        this._other = {
            id: null,
            name: null,
            image: null,
            devices: []
        };
    }
    UserService.prototype.clearUser = function () {
        for (var opt in this._user) {
            this._user[opt] = null;
        }
    };
    UserService.prototype.clearAll = function () {
        this.user.devices.forEach(function (device) {
            if (device.marker) {
                device.marker.remove();
            }
        });
        this.friends.forEach(function (friend) {
            friend.devices.forEach(function (device) {
                if (device.marker) {
                    device.marker.remove();
                }
            });
        });
        while (this.friends.length) {
            this.friends.shift();
        }
        this.clearUser();
    };
    UserService.prototype.createDeviceOther = function (device) {
        this._other.devices.push(device);
        return device;
    };
    Object.defineProperty(UserService.prototype, "other", {
        get: function () {
            return this._other;
        },
        set: function (value) {
            this._other = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "friends", {
        get: function () {
            return this._friends;
        },
        set: function (friends) {
            var _this = this;
            if (!friends)
                return;
            this._friends.length = 0;
            friends.forEach(function (friend) {
                _this._friends.push(friend);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserService.prototype, "user", {
        get: function () {
            return this._user;
        },
        set: function (value) {
            for (var opt in value) {
                this._user[opt] = value[opt];
            }
        },
        enumerable: true,
        configurable: true
    });
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=main.user.service.js.map