import { Router } from "aurelia-router";
import { UIConstants } from "./ui-constants";
export declare class UIApplication {
    router: Router;
    private logger;
    isBusy: boolean;
    constants: typeof UIConstants;
    Authenticated: boolean;
    constructor(router: Router);
    /**
     * @description Navigate to a using hash route
     */
    navigate(hash: any, options?: any): void;
    /**
     * @description Navigate to a using route name
     */
    navigateTo(route: any, params?: {}, options?: any): void;
    /**
     * @description Check if route is active, this includes redirected routes
     */
    routeActive(route: any): any;
    /**
     * @description Perform login action, optionally set current session authentication header
     */
    login(route?: string, authHeader?: any): void;
    /**
     * @description Perform logout action
     */
    logout(): void;
    /** App Shared State **/
    private sharedState;
    shared(key: any, value?: any): any;
    /** Session State **/
    session(key: any, value?: any): any;
    clearSession(): void;
    /** Persistent State **/
    persist(key: any, value?: any): any;
    clearPersist(): void;
    /** Logger **/
    info(tag: any, msg: any, ...rest: any[]): void;
    warn(tag: any, msg: any, ...rest: any[]): void;
    debug(tag: any, msg: any, ...rest: any[]): void;
    error(tag: any, msg: any, ...rest: any[]): void;
    /** Toasts / Alerts **/
    toast(config: any, container?: any): void;
    toastSuccess(config: any, container?: any): void;
    toastError(config: any, container?: any): void;
    alert(config: any): Promise<boolean>;
    confirm(config: any): Promise<boolean>;
    prompt(config: any): Promise<string>;
}
export declare class AuthInterceptor {
    appState: UIApplication;
    private logger;
    constructor(appState: UIApplication);
    run(routingContext: any, next: any): any;
}
