import { Container } from "aurelia-framework";
export declare module UIUtils {
    var auContainer: Container;
    var dialogContainer: Element;
    var overlayContainer: Element;
    var taskbarContainer: Element;
    function lazy(T: any): any;
    function newInstance(T: any): any;
    function toast(options: any): void;
    function alert(options: any): Promise<{}>;
    function confirm(options: any): Promise<{}>;
    function prompt(options: any): Promise<{}>;
    function eventCallback(fn: any, self: any, ...rest: any[]): Promise<any>;
    function tether(parent: any, child: any, opts?: any): any;
    function loadView(url: any, parent: any, model?: any): Promise<{}>;
}
