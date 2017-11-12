var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-logging", "./ui-utils", "./ui-event", "./ui-constants"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_logging_1, ui_utils_1, ui_event_1, ui_constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIApplication = (function () {
        function UIApplication(router) {
            this.router = router;
            this.isBusy = false;
            this.constants = ui_constants_1.UIConstants;
            this.sharedState = {};
            this.logger = aurelia_logging_1.getLogger('UIApplication');
            this.logger.info('Initialized');
        }
        UIApplication.prototype.navigate = function (hash, options) {
            this.logger.info("navigate::" + hash);
            this.router.navigate(hash, options);
        };
        UIApplication.prototype.navigateTo = function (route, params, options) {
            if (params === void 0) { params = {}; }
            this.logger.info("navigateTo::" + route);
            this.router.navigateToRoute(route, params, options);
        };
        UIApplication.prototype.routeActive = function (route) {
            return route.isActive || route.href == location.hash ||
                location.hash.indexOf(route.config.redirect || 'QWER') > -1;
        };
        Object.defineProperty(UIApplication.prototype, "AuthUser", {
            get: function () {
                return this.authUser;
            },
            set: function (v) {
                this.authUser = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIApplication.prototype, "AuthToken", {
            get: function () {
                return this.authToken;
            },
            set: function (v) {
                this.authToken = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIApplication.prototype, "Authenticated", {
            get: function () {
                return this.autenticated;
            },
            set: function (v) {
                this.autenticated = v;
            },
            enumerable: true,
            configurable: true
        });
        UIApplication.prototype.login = function (user, route) {
            this.AuthUser = user.username;
            this.AuthToken = user.token;
            this.Authenticated = true;
            this.persist('AppUsername', user.username);
            this.persist('AppToken', user.remember ? user.token : null);
            this.navigateTo(route || 'home');
            ui_event_1.UIEvent.broadcast('auf:login');
        };
        UIApplication.prototype.logout = function () {
            this.AuthUser = null;
            this.AuthToken = null;
            ui_event_1.UIEvent.broadcast('auf:logout');
            this.persist('AppToken', null);
            this.Authenticated = false;
            this.navigateTo('login');
        };
        UIApplication.prototype.shared = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (value === '§') {
                return this.sharedState[key];
            }
            else if (value === null) {
                delete this.sharedState[key];
            }
            else {
                this.sharedState[key] = value;
            }
            return null;
        };
        UIApplication.prototype.session = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (window.sessionStorage) {
                if (value === '§') {
                    return JSON.parse(window.sessionStorage.getItem(ui_constants_1.UIConstants.AppKey + ':' + key));
                }
                else if (value === null) {
                    window.sessionStorage.removeItem(ui_constants_1.UIConstants.AppKey + ':' + key);
                }
                else {
                    window.sessionStorage.setItem(ui_constants_1.UIConstants.AppKey + ':' + key, JSON.stringify(value));
                }
            }
            return null;
        };
        UIApplication.prototype.clearSession = function () {
            if (window.sessionStorage)
                window.sessionStorage.clear();
        };
        UIApplication.prototype.persist = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (window.localStorage) {
                if (value === '§') {
                    return JSON.parse(window.localStorage.getItem(ui_constants_1.UIConstants.AppKey + ':' + key));
                }
                else if (value === null) {
                    window.localStorage.removeItem(ui_constants_1.UIConstants.AppKey + ':' + key);
                }
                else {
                    window.localStorage.setItem(ui_constants_1.UIConstants.AppKey + ':' + key, JSON.stringify(value));
                }
            }
            return null;
        };
        UIApplication.prototype.clearPersist = function () {
            if (window.localStorage)
                window.localStorage.clear();
        };
        UIApplication.prototype.info = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.info.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.warn = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.warn.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.debug = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.debug.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.error = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.error.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.toast = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            if (container)
                config.container = container;
            ui_utils_1.UIUtils.toast(config);
        };
        UIApplication.prototype.toastSuccess = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            config.theme = 'success';
            config.glyph = config.glyph || 'glyph-alert-exclaim';
            if (container)
                config.container = container;
            ui_utils_1.UIUtils.toast(config);
        };
        UIApplication.prototype.toastError = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            config.theme = 'danger';
            config.glyph = config.glyph || 'glyph-alert-error';
            if (container)
                config.container = container;
            ui_utils_1.UIUtils.toast(config);
        };
        UIApplication.prototype.alert = function (config) {
            return ui_utils_1.UIUtils.alert(config);
        };
        UIApplication.prototype.confirm = function (config) {
            return ui_utils_1.UIUtils.confirm(config);
        };
        UIApplication.prototype.prompt = function (config) {
            if (typeof config === 'string')
                config = { message: config };
            return ui_utils_1.UIUtils.prompt(config);
        };
        UIApplication = __decorate([
            aurelia_framework_1.singleton(),
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_router_1.Router])
        ], UIApplication);
        return UIApplication;
    }());
    exports.UIApplication = UIApplication;
    var AuthInterceptor = (function () {
        function AuthInterceptor(appState) {
            this.appState = appState;
            this.logger = aurelia_logging_1.getLogger('AuthInterceptor');
            this.logger.info('Initialized');
            ui_event_1.UIEvent.subscribe('auf:unauthorized', function () { return appState.navigateTo('login', { status: 401 }); });
        }
        AuthInterceptor.prototype.run = function (routingContext, next) {
            if (routingContext.getAllInstructions()
                .some(function (i) { return i.config.auth; })) {
                if (!this.appState.Authenticated) {
                    this.logger.warn('Not authenticated');
                    var url = routingContext.router.generate('login', { status: 401 });
                    this.appState.Authenticated = false;
                    this.appState.session('AppCurrentRoute', [routingContext.config.route, routingContext.params]);
                    this.appState.session('AppCurrentFragment', routingContext.fragment);
                    return next.reject(new aurelia_router_1.Redirect(url));
                }
            }
            return next();
        };
        AuthInterceptor = __decorate([
            aurelia_framework_1.singleton(),
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [UIApplication])
        ], AuthInterceptor);
        return AuthInterceptor;
    }());
    exports.AuthInterceptor = AuthInterceptor;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3VpLWFwcGxpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVNBO1FBT0UsdUJBQW1CLE1BQWM7WUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBSDFCLFdBQU0sR0FBWSxLQUFLLENBQUM7WUFDeEIsY0FBUyxHQUFHLDBCQUFXLENBQUM7WUF1RXZCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1lBcEV2QixJQUFJLENBQUMsTUFBTSxHQUFHLDJCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUVELGdDQUFRLEdBQVIsVUFBUyxJQUFJLEVBQUUsT0FBUTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxrQ0FBVSxHQUFWLFVBQVcsS0FBSyxFQUFFLE1BQVcsRUFBRSxPQUFRO1lBQXJCLHVCQUFBLEVBQUEsV0FBVztZQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsbUNBQVcsR0FBWCxVQUFZLEtBQUs7WUFDZixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJO2dCQUNsRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FB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LE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUkseUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDO1FBekJVLGVBQWU7WUFGM0IsNkJBQVMsRUFBRTtZQUNYLDhCQUFVLEVBQUU7NkNBSWtCLGFBQWE7V0FIL0IsZUFBZSxDQTBCM0I7UUFBRCxzQkFBQztLQTFCRCxBQTBCQyxJQUFBO0lBMUJZLDBDQUFlIiwiZmlsZSI6InV0aWxzL3VpLWFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2luZ2xldG9uLCBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBSZWRpcmVjdCwgUm91dGVyIH0gZnJvbSBcImF1cmVsaWEtcm91dGVyXCI7XG5pbXBvcnQgeyBnZXRMb2dnZXIgfSBmcm9tIFwiYXVyZWxpYS1sb2dnaW5nXCI7XG5pbXBvcnQgeyBVSVV0aWxzIH0gZnJvbSBcIi4vdWktdXRpbHNcIjtcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi91aS1ldmVudFwiO1xuaW1wb3J0IHsgVUlDb25zdGFudHMgfSBmcm9tIFwiLi91aS1jb25zdGFudHNcIjtcblxuQHNpbmdsZXRvbigpXG5AYXV0b2luamVjdCgpXG5leHBvcnQgY2xhc3MgVUlBcHBsaWNhdGlvbiB7XG5cbiAgcHJpdmF0ZSBsb2dnZXI7XG5cbiAgcHVibGljIGlzQnVzeTogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgY29uc3RhbnRzID0gVUlDb25zdGFudHM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJvdXRlcjogUm91dGVyKSB7XG4gICAgdGhpcy5sb2dnZXIgPSBnZXRMb2dnZXIoJ1VJQXBwbGljYXRpb24nKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKCdJbml0aWFsaXplZCcpO1xuICB9XG5cbiAgbmF2aWdhdGUoaGFzaCwgb3B0aW9ucz8pIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwibmF2aWdhdGU6OlwiICsgaGFzaCk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoaGFzaCwgb3B0aW9ucyk7XG4gIH1cblxuICBuYXZpZ2F0ZVRvKHJvdXRlLCBwYXJhbXMgPSB7fSwgb3B0aW9ucz8pIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKFwibmF2aWdhdGVUbzo6XCIgKyByb3V0ZSk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVUb1JvdXRlKHJvdXRlLCBwYXJhbXMsIG9wdGlvbnMpO1xuICB9XG5cbiAgcm91dGVBY3RpdmUocm91dGUpIHtcbiAgICByZXR1cm4gcm91dGUuaXNBY3RpdmUgfHwgcm91dGUuaHJlZiA9PSBsb2NhdGlvbi5oYXNoIHx8XG4gICAgICBsb2NhdGlvbi5oYXNoLmluZGV4T2Yocm91dGUuY29uZmlnLnJlZGlyZWN0IHx8ICdRV0VSJykgPiAtMTtcbiAgfVxuXG4gIC8qKiBBcHAgQ29uc3RhbnRzICoqL1xuICBwcml2YXRlIGF1dGhVc2VyO1xuICBwcml2YXRlIGF1dGhUb2tlbjtcbiAgcHJpdmF0ZSBhdXRlbnRpY2F0ZWQ7XG5cbiAgZ2V0IEF1dGhVc2VyKCkge1xuICAgIHJldHVybiB0aGlzLmF1dGhVc2VyO1xuICB9XG5cbiAgc2V0IEF1dGhVc2VyKHYpIHtcbiAgICB0aGlzLmF1dGhVc2VyID0gdjtcbiAgfVxuXG4gIGdldCBBdXRoVG9rZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFRva2VuO1xuICB9XG5cbiAgc2V0IEF1dGhUb2tlbih2KSB7XG4gICAgdGhpcy5hdXRoVG9rZW4gPSB2O1xuICB9XG5cbiAgZ2V0IEF1dGhlbnRpY2F0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXV0ZW50aWNhdGVkO1xuICB9XG5cbiAgc2V0IEF1dGhlbnRpY2F0ZWQodikge1xuICAgIHRoaXMuYXV0ZW50aWNhdGVkID0gdjtcbiAgfVxuXG4gIGxvZ2luKHVzZXIsIHJvdXRlPykge1xuICAgIHRoaXMuQXV0aFVzZXIgPSB1c2VyLnVzZXJuYW1lO1xuICAgIHRoaXMuQXV0aFRva2VuID0gdXNlci50b2tlbjtcbiAgICB0aGlzLkF1dGhlbnRpY2F0ZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5wZXJzaXN0KCdBcHBVc2VybmFtZScsIHVzZXIudXNlcm5hbWUpO1xuICAgIHRoaXMucGVyc2lzdCgnQXBwVG9rZW4nLCB1c2VyLnJlbWVtYmVyID8gdXNlci50b2tlbiA6IG51bGwpO1xuXG4gICAgdGhpcy5uYXZpZ2F0ZVRvKHJvdXRlIHx8ICdob21lJyk7XG4gICAgVUlFdmVudC5icm9hZGNhc3QoJ2F1Zjpsb2dpbicpO1xuICB9XG4gIGxvZ291dCgpIHtcbiAgICB0aGlzLkF1dGhVc2VyID0gbnVsbDtcbiAgICB0aGlzLkF1dGhUb2tlbiA9IG51bGw7XG4gICAgVUlFdmVudC5icm9hZGNhc3QoJ2F1Zjpsb2dvdXQnKTtcbiAgICB0aGlzLnBlcnNpc3QoJ0FwcFRva2VuJywgbnVsbCk7XG4gICAgdGhpcy5BdXRoZW50aWNhdGVkID0gZmFsc2U7XG4gICAgdGhpcy5uYXZpZ2F0ZVRvKCdsb2dpbicpO1xuICB9XG5cbiAgcHJpdmF0ZSBzaGFyZWRTdGF0ZSA9IHt9O1xuICBzaGFyZWQoa2V5LCB2YWx1ZTogYW55ID0gJ8KnJykge1xuICAgIGlmICh2YWx1ZSA9PT0gJ8KnJykge1xuICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkU3RhdGVba2V5XTtcbiAgICB9XG4gICAgZWxzZSBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnNoYXJlZFN0YXRlW2tleV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zaGFyZWRTdGF0ZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIFNlc3Npb24gU3RhdGUgKiovXG4gIHNlc3Npb24oa2V5LCB2YWx1ZTogYW55ID0gJ8KnJykge1xuICAgIGlmICh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJ8KnJykge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShVSUNvbnN0YW50cy5BcHBLZXkgKyAnOicgKyBrZXkpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFVJQ29uc3RhbnRzLkFwcEtleSArICc6JyArIGtleSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVUlDb25zdGFudHMuQXBwS2V5ICsgJzonICsga2V5LCBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNsZWFyU2Vzc2lvbigpIHtcbiAgICBpZiAod2luZG93LnNlc3Npb25TdG9yYWdlKSB3aW5kb3cuc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgfVxuXG4gIC8qKiBQZXJzaXN0ZW50IFN0YXRlICoqL1xuICBwZXJzaXN0KGtleSwgdmFsdWU6IGFueSA9ICfCpycpIHtcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgaWYgKHZhbHVlID09PSAnwqcnKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShVSUNvbnN0YW50cy5BcHBLZXkgKyAnOicgKyBrZXkpKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShVSUNvbnN0YW50cy5BcHBLZXkgKyAnOicgKyBrZXkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShVSUNvbnN0YW50cy5BcHBLZXkgKyAnOicgKyBrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY2xlYXJQZXJzaXN0KCkge1xuICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlKSB3aW5kb3cubG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gIH1cblxuICAvKiogTG9nZ2VyICoqL1xuICBpbmZvKHRhZywgbXNnLCAuLi5yZXN0KSB7XG4gICAgdGhpcy5sb2dnZXIuaW5mby5hcHBseSh0aGlzLmxvZ2dlciwgW2Ake3RhZ306OiR7bXNnfWBdLmNvbmNhdChyZXN0KSk7XG4gIH1cblxuICB3YXJuKHRhZywgbXNnLCAuLi5yZXN0KSB7XG4gICAgdGhpcy5sb2dnZXIud2Fybi5hcHBseSh0aGlzLmxvZ2dlciwgW2Ake3RhZ306OiR7bXNnfWBdLmNvbmNhdChyZXN0KSk7XG4gIH1cblxuICBkZWJ1Zyh0YWcsIG1zZywgLi4ucmVzdCkge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnLmFwcGx5KHRoaXMubG9nZ2VyLCBbYCR7dGFnfTo6JHttc2d9YF0uY29uY2F0KHJlc3QpKTtcbiAgfVxuXG4gIGVycm9yKHRhZywgbXNnLCAuLi5yZXN0KSB7XG4gICAgdGhpcy5sb2dnZXIuZXJyb3IuYXBwbHkodGhpcy5sb2dnZXIsIFtgJHt0YWd9Ojoke21zZ31gXS5jb25jYXQocmVzdCkpO1xuICB9XG5cbiAgLyoqIFRvYXN0cyAvIEFsZXJ0cyAqKi9cbiAgdG9hc3QoY29uZmlnLCBjb250YWluZXI/KSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSBjb25maWcgPSB7IG1lc3NhZ2U6IGNvbmZpZyB9O1xuICAgIGlmIChjb250YWluZXIpIGNvbmZpZy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgVUlVdGlscy50b2FzdChjb25maWcpO1xuICB9XG5cbiAgdG9hc3RTdWNjZXNzKGNvbmZpZywgY29udGFpbmVyPykge1xuICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykgY29uZmlnID0geyBtZXNzYWdlOiBjb25maWcgfTtcbiAgICBjb25maWcudGhlbWUgPSAnc3VjY2Vzcyc7XG4gICAgY29uZmlnLmdseXBoID0gY29uZmlnLmdseXBoIHx8ICdnbHlwaC1hbGVydC1leGNsYWltJztcbiAgICBpZiAoY29udGFpbmVyKSBjb25maWcuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIFVJVXRpbHMudG9hc3QoY29uZmlnKTtcbiAgfVxuXG4gIHRvYXN0RXJyb3IoY29uZmlnLCBjb250YWluZXI/KSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSBjb25maWcgPSB7IG1lc3NhZ2U6IGNvbmZpZyB9O1xuICAgIGNvbmZpZy50aGVtZSA9ICdkYW5nZXInO1xuICAgIGNvbmZpZy5nbHlwaCA9IGNvbmZpZy5nbHlwaCB8fCAnZ2x5cGgtYWxlcnQtZXJyb3InO1xuICAgIGlmIChjb250YWluZXIpIGNvbmZpZy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgVUlVdGlscy50b2FzdChjb25maWcpO1xuICB9XG5cblxuICBhbGVydChjb25maWcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gVUlVdGlscy5hbGVydChjb25maWcpO1xuICB9XG4gIGNvbmZpcm0oY29uZmlnKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIFVJVXRpbHMuY29uZmlybShjb25maWcpO1xuICB9XG4gIHByb21wdChjb25maWcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykgY29uZmlnID0geyBtZXNzYWdlOiBjb25maWcgfTtcbiAgICByZXR1cm4gVUlVdGlscy5wcm9tcHQoY29uZmlnKTtcbiAgfVxufVxuXG5Ac2luZ2xldG9uKClcbkBhdXRvaW5qZWN0KClcbmV4cG9ydCBjbGFzcyBBdXRoSW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIGxvZ2dlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgYXBwU3RhdGU6IFVJQXBwbGljYXRpb24pIHtcbiAgICB0aGlzLmxvZ2dlciA9IGdldExvZ2dlcignQXV0aEludGVyY2VwdG9yJyk7XG4gICAgdGhpcy5sb2dnZXIuaW5mbygnSW5pdGlhbGl6ZWQnKTtcbiAgICBVSUV2ZW50LnN1YnNjcmliZSgnYXVmOnVuYXV0aG9yaXplZCcsICgpID0+IGFwcFN0YXRlLm5hdmlnYXRlVG8oJ2xvZ2luJywgeyBzdGF0dXM6IDQwMSB9KSk7XG4gIH1cblxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQpIHtcbiAgICAvLyBDaGVjayBpZiB0aGUgcm91dGUgaGFzIGFuIFwiYXV0aFwiIGtleVxuICAgIC8vIFRoZSByZWFzb24gZm9yIHVzaW5nIGBuZXh0SW5zdHJ1Y3Rpb25zYCBpcyBiZWNhdXNlIHRoaXMgaW5jbHVkZXMgY2hpbGQgcm91dGVzLlxuICAgIGlmIChyb3V0aW5nQ29udGV4dC5nZXRBbGxJbnN0cnVjdGlvbnMoKVxuICAgICAgLnNvbWUoaSA9PiBpLmNvbmZpZy5hdXRoKSkge1xuICAgICAgaWYgKCF0aGlzLmFwcFN0YXRlLkF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIud2FybignTm90IGF1dGhlbnRpY2F0ZWQnKTtcbiAgICAgICAgbGV0IHVybCA9IHJvdXRpbmdDb250ZXh0LnJvdXRlci5nZW5lcmF0ZSgnbG9naW4nLCB7IHN0YXR1czogNDAxIH0pO1xuICAgICAgICB0aGlzLmFwcFN0YXRlLkF1dGhlbnRpY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hcHBTdGF0ZS5zZXNzaW9uKCdBcHBDdXJyZW50Um91dGUnLCBbcm91dGluZ0NvbnRleHQuY29uZmlnLnJvdXRlLCByb3V0aW5nQ29udGV4dC5wYXJhbXNdKTtcbiAgICAgICAgdGhpcy5hcHBTdGF0ZS5zZXNzaW9uKCdBcHBDdXJyZW50RnJhZ21lbnQnLCByb3V0aW5nQ29udGV4dC5mcmFnbWVudCk7XG4gICAgICAgIHJldHVybiBuZXh0LnJlamVjdChuZXcgUmVkaXJlY3QodXJsKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
