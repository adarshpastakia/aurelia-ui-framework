import { Router } from "aurelia-router";
import { UIConstants } from "./ui-constants";
export declare class UIApplication {
    router: Router;
    private logger;
    isBusy: boolean;
    constants: typeof UIConstants;
    constructor(router: Router);
    navigate(hash: any, options?: any): void;
    navigateTo(route: any, params?: {}, options?: any): void;
    routeActive(route: any): any;
    /** App Constants **/
    private authUser;
    private authToken;
    private autenticated;
    AuthUser: any;
    AuthToken: any;
    Authenticated: any;
    login(user: any, route?: any): void;
    logout(): void;
    private sharedState;
    shared(key: any, value?: any): any;
    /** Session State **/
    session(key: any, value?: any): any;
    clearSession(): void;
    /** Persistent State **/
    persist(key: any, value?: any): any;
    /** Logger **/
    info(tag: any, msg: any, ...rest: any[]): void;
    warn(tag: any, msg: any, ...rest: any[]): void;
    debug(tag: any, msg: any, ...rest: any[]): void;
    error(tag: any, msg: any, ...rest: any[]): void;
    /** Toasts / Alerts **/
    toast(config: any, container?: any): void;
    toastSuccess(config: any, container?: any): void;
    toastError(config: any, container?: any): void;
    alert(config: any): Promise<{}>;
    confirm(config: any): Promise<{}>;
    prompt(config: any): Promise<{}>;
}
export declare class AuthInterceptor {
    appState: UIApplication;
    private logger;
    constructor(appState: UIApplication);
    run(routingContext: any, next: any): any;
}
