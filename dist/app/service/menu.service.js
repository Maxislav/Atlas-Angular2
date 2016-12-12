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
/**
 * Created by maxislav on 25.11.16.
 */
var core_1 = require('@angular/core');
var MenuService = (function () {
    function MenuService() {
        this._menuLoadOpen = false;
        this._menuOpen = false;
    }
    Object.defineProperty(MenuService.prototype, "menuOpen", {
        get: function () {
            return this._menuOpen;
        },
        set: function (value) {
            var click = onclick.bind(this);
            if (value) {
                setTimeout(function () {
                    document.body.addEventListener('click', click);
                }, 100);
            }
            else {
                document.body.removeEventListener('click', click);
            }
            function onclick(e) {
                document.body.removeEventListener('click', click);
                this.menuOpen = false;
            }
            this._menuOpen = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MenuService.prototype, "menuOpenLogin", {
        get: function () {
            return this._menuOpenLogin;
        },
        set: function (value) {
            this._menuOpenLogin = value;
        },
        enumerable: true,
        configurable: true
    });
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map