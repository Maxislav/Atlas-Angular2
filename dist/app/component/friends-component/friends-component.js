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
var common_1 = require('@angular/common');
var friends_service_1 = require("../../service/friends.service");
var FriendsComponent = (function () {
    function FriendsComponent(location, fr) {
        this.location = location;
        this.fr = fr;
        this.allUsers = fr.users;
    }
    FriendsComponent.prototype.onClose = function () {
        this.location.back();
    };
    FriendsComponent.prototype.getAllUsers = function () {
        this.fr.getAllUsers();
    };
    FriendsComponent = __decorate([
        core_1.Component({
            //noinspection TypeScriptUnresolvedVariable
            moduleId: module.id,
            templateUrl: './friends-component.html',
            styleUrls: ['./friends-component.css'],
        }), 
        __metadata('design:paramtypes', [common_1.Location, friends_service_1.FriendsService])
    ], FriendsComponent);
    return FriendsComponent;
}());
exports.FriendsComponent = FriendsComponent;
//# sourceMappingURL=friends-component.js.map