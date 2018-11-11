System.register(["aurelia-framework", "aurelia-router", "aurelia-logging", "./ui-utils", "./ui-event", "./ui-constants"], function (exports_1, context_1) {
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
    var aurelia_framework_1, aurelia_router_1, aurelia_logging_1, ui_utils_1, ui_event_1, ui_constants_1, UIApplication, AuthInterceptor;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_router_1_1) {
                aurelia_router_1 = aurelia_router_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (ui_utils_1_1) {
                ui_utils_1 = ui_utils_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            },
            function (ui_constants_1_1) {
                ui_constants_1 = ui_constants_1_1;
            }
        ],
        execute: function () {
            UIApplication = (function () {
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
                    this.persist('AppPassword', user.password);
                    this.navigateTo(route || 'home');
                    ui_event_1.UIEvent.broadcast('auf:login');
                };
                UIApplication.prototype.logout = function () {
                    this.AuthUser = null;
                    this.AuthToken = null;
                    ui_event_1.UIEvent.broadcast('auf:logout');
                    this.persist('AppPassword', null);
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
                    if (typeof config === 'string')
                        config = { message: config };
                    config.glyph = config.glyph || 'glyph-alert-info';
                    return ui_utils_1.UIUtils.alert(config);
                };
                UIApplication.prototype.confirm = function (config) {
                    if (typeof config === 'string')
                        config = { message: config };
                    config.glyph = config.glyph || 'glyph-alert-question';
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
            exports_1("UIApplication", UIApplication);
            AuthInterceptor = (function () {
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
            exports_1("AuthInterceptor", AuthInterceptor);
        }
    };
});
