import { singleton, autoinject } from "aurelia-framework";
import { Redirect, Router } from "aurelia-router";
import { getLogger } from "aurelia-logging";
import { UIUtils } from "./ui-utils";
import { UIEvent } from "./ui-event";
import { UIConstants } from "./ui-constants";

@singleton()
@autoinject()
export class UIApplication {

  private logger;

  public isBusy: boolean = false;
  public constants = UIConstants;
  public Authenticated: boolean = false;

  constructor(public router: Router) {
    this.logger = getLogger('UIApplication');
    this.logger.info('Initialized');
  }

  /**
   * @description Navigate to a using hash route
   */
  navigate(hash, options?) {
    this.logger.info("navigate::" + hash);
    this.router.navigate(hash, options);
  }

  /**
   * @description Navigate to a using route name
   */
  navigateTo(route, params = {}, options?) {
    this.logger.info("navigateTo::" + route);
    this.router.navigateToRoute(route, params, options);
  }

  /**
   * @description Check if route is active, this includes redirected routes
   */
  routeActive(route) {
    return route.isActive || route.href == location.hash ||
      location.hash.indexOf(route.config.redirect || 'QWER') > -1;
  }

  /**
   * @description Perform login action, optionally set current session authentication header
   */
  login(route = 'home', authHeader?) {
    UIEvent.broadcast('auf:login');
    this.Authenticated = true;
    this.navigateTo(route);

    if (authHeader) UIConstants.Http.AuthorizationHeader = authHeader;
  }

  /**
   * @description Perform logout action
   */
  logout() {
    UIEvent.broadcast('auf:logout');
    this.Authenticated = false;
    this.navigateTo('login');
  }

  /** App Shared State **/
  private sharedState = {};
  shared(key, value: any = '§') {
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

  /** Session State **/
  session(key, value: any = '§') {
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
    if (window.sessionStorage) window.sessionStorage.clear();
  }

  /** Persistent State **/
  persist(key, value: any = '§') {
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
    if (window.localStorage) window.localStorage.clear();
  }

  /** Logger **/
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

  /** Toasts / Alerts **/
  toast(config, container?) {
    if (typeof config === 'string') config = { message: config };
    if (container) config.container = container;
    UIUtils.toast(config);
  }

  toastSuccess(config, container?) {
    if (typeof config === 'string') config = { message: config };
    config.theme = 'success';
    config.glyph = config.glyph || 'glyph-alert-exclaim';
    if (container) config.container = container;
    UIUtils.toast(config);
  }

  toastError(config, container?) {
    if (typeof config === 'string') config = { message: config };
    config.theme = 'danger';
    config.glyph = config.glyph || 'glyph-alert-error';
    if (container) config.container = container;
    UIUtils.toast(config);
  }


  alert(config): Promise<boolean> {
    return UIUtils.alert(config);
  }
  confirm(config): Promise<boolean> {
    return UIUtils.confirm(config);
  }
  prompt(config): Promise<string> {
    if (typeof config === 'string') config = { message: config };
    return UIUtils.prompt(config);
  }
}

@singleton()
@autoinject()
export class AuthInterceptor {
  private logger;

  constructor(public appState: UIApplication) {
    this.logger = getLogger('AuthInterceptor');
    this.logger.info('Initialized');
    UIEvent.subscribe('auf:unauthorized', () => appState.navigateTo('login', { status: 401 }));
  }

  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because this includes child routes.
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
}
