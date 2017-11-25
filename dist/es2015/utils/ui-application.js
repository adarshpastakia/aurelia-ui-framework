var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { singleton, autoinject } from "aurelia-framework";
import { Redirect, Router } from "aurelia-router";
import { getLogger } from "aurelia-logging";
import { UIUtils } from "./ui-utils";
import { UIEvent } from "./ui-event";
import { UIConstants } from "./ui-constants";
let UIApplication = class UIApplication {
    constructor(router) {
        this.router = router;
        this.isBusy = false;
        this.constants = UIConstants;
        this.Authenticated = false;
        this.sharedState = {};
        this.logger = getLogger('UIApplication');
        this.logger.info('Initialized');
    }
    navigate(hash, options) {
        this.logger.info("navigate::" + hash);
        this.router.navigate(hash, options);
    }
    navigateTo(route, params = {}, options) {
        this.logger.info("navigateTo::" + route);
        this.router.navigateToRoute(route, params, options);
    }
    routeActive(route) {
        return route.isActive || route.href == location.hash ||
            location.hash.indexOf(route.config.redirect || 'QWER') > -1;
    }
    login(route = 'home', authHeader) {
        UIEvent.broadcast('auf:login');
        this.Authenticated = true;
        this.navigateTo(route);
        if (authHeader)
            UIConstants.Http.AuthorizationHeader = authHeader;
    }
    logout() {
        UIEvent.broadcast('auf:logout');
        this.Authenticated = false;
        this.navigateTo('login');
    }
    shared(key, value = '§') {
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
    }
    session(key, value = '§') {
        if (window.sessionStorage) {
            if (value === '§') {
                return JSON.parse(window.sessionStorage.getItem(UIConstants.AppKey + ':' + key));
            }
            else if (value === null) {
                window.sessionStorage.removeItem(UIConstants.AppKey + ':' + key);
            }
            else {
                window.sessionStorage.setItem(UIConstants.AppKey + ':' + key, JSON.stringify(value));
            }
        }
        return null;
    }
    clearSession() {
        if (window.sessionStorage)
            window.sessionStorage.clear();
    }
    persist(key, value = '§') {
        if (window.localStorage) {
            if (value === '§') {
                return JSON.parse(window.localStorage.getItem(UIConstants.AppKey + ':' + key));
            }
            else if (value === null) {
                window.localStorage.removeItem(UIConstants.AppKey + ':' + key);
            }
            else {
                window.localStorage.setItem(UIConstants.AppKey + ':' + key, JSON.stringify(value));
            }
        }
        return null;
    }
    clearPersist() {
        if (window.localStorage)
            window.localStorage.clear();
    }
    info(tag, msg, ...rest) {
        this.logger.info.apply(this.logger, [`${tag}::${msg}`].concat(rest));
    }
    warn(tag, msg, ...rest) {
        this.logger.warn.apply(this.logger, [`${tag}::${msg}`].concat(rest));
    }
    debug(tag, msg, ...rest) {
        this.logger.debug.apply(this.logger, [`${tag}::${msg}`].concat(rest));
    }
    error(tag, msg, ...rest) {
        this.logger.error.apply(this.logger, [`${tag}::${msg}`].concat(rest));
    }
    toast(config, container) {
        if (typeof config === 'string')
            config = { message: config };
        if (container)
            config.container = container;
        UIUtils.toast(config);
    }
    toastSuccess(config, container) {
        if (typeof config === 'string')
            config = { message: config };
        config.theme = 'success';
        config.glyph = config.glyph || 'glyph-alert-exclaim';
        if (container)
            config.container = container;
        UIUtils.toast(config);
    }
    toastError(config, container) {
        if (typeof config === 'string')
            config = { message: config };
        config.theme = 'danger';
        config.glyph = config.glyph || 'glyph-alert-error';
        if (container)
            config.container = container;
        UIUtils.toast(config);
    }
    alert(config) {
        return UIUtils.alert(config);
    }
    confirm(config) {
        return UIUtils.confirm(config);
    }
    prompt(config) {
        if (typeof config === 'string')
            config = { message: config };
        return UIUtils.prompt(config);
    }
};
UIApplication = __decorate([
    singleton(),
    autoinject(),
    __metadata("design:paramtypes", [Router])
], UIApplication);
export { UIApplication };
let AuthInterceptor = class AuthInterceptor {
    constructor(appState) {
        this.appState = appState;
        this.logger = getLogger('AuthInterceptor');
        this.logger.info('Initialized');
        UIEvent.subscribe('auf:unauthorized', () => appState.navigateTo('login', { status: 401 }));
    }
    run(routingContext, next) {
        if (routingContext.getAllInstructions()
            .some(i => i.config.auth)) {
            if (!this.appState.Authenticated) {
                this.logger.warn('Not authenticated');
                let url = routingContext.router.generate('login', { status: 401 });
                this.appState.Authenticated = false;
                this.appState.session('AppCurrentRoute', [routingContext.config.route, routingContext.params]);
                this.appState.session('AppCurrentFragment', routingContext.fragment);
                return next.reject(new Redirect(url));
            }
        }
        return next();
    }
};
AuthInterceptor = __decorate([
    singleton(),
    autoinject(),
    __metadata("design:paramtypes", [UIApplication])
], AuthInterceptor);
export { AuthInterceptor };
