import { Container, ViewSlot } from "aurelia-framework";
export declare function lodashMixins(): void;
export declare module UIUtils {
    var auContainer: Container;
    var dialogContainer: Element;
    var overlayContainer: Element;
    var taskbarContainer: Element;
    function getDialogContainerSlot(): ViewSlot;
    function lazy(T: any): any;
    function newInstance(T: any): any;
    function tether(parent: any, child: any, opts?: any): any;
    function toast(options: any): void;
    function alert(options: any): Promise<boolean>;
    function confirm(options: any): Promise<boolean>;
    function prompt(options: any): Promise<string>;
    function loadView(url: any, parent: any, model?: any): Promise<{}>;
}
