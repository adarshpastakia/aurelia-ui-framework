/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { FrameworkConfiguration } from "aurelia-framework";
import "./libs/array";
import "./libs/phonelib";
import "./libs/string";
import "./libs/window";
export { getValidationController } from "./forms/ui-validation";
export { Countries } from "./libs/countries";
export { Currencies } from "./libs/currencies";
export { FileTypes } from "./libs/filetypes";
export * from "./model/ui-tree-model";
export * from "./services/ui-alert";
export * from "./services/ui-application";
export * from "./services/ui-dialog";
export * from "./utils/ui-format";
export * from "./utils/ui-http";
/**
 * UIFrameworkConfig
 * @description : Framework configurator
 * @function setTitle(v: string);
 * @function setSubtitle(v: string);
 * @function setVersion(v: string);
 * @function setApiBaseUrl(v: string);
 * @function setApiHeaders(v: string | KeyValue);
 */
export declare class UIFrameworkConfig {
    private auConfig;
    use: {
        all: () => any;
        buttons: () => any;
        forms: () => any;
        panels: () => any;
        menus: () => any;
        data: () => any;
        appbars: () => any;
    };
    constructor(auConfig: FrameworkConfiguration);
    setTitle(v: string): UIFrameworkConfig;
    setSubtitle(v: string): UIFrameworkConfig;
    setVersion(v: string): UIFrameworkConfig;
    setApiBaseUrl(v: string): UIFrameworkConfig;
    setApiHeaders(v: string | KeyValue): UIFrameworkConfig;
    private loadFromModule;
}
export declare function configure(auConfig: FrameworkConfiguration, configCallback: (config: UIFrameworkConfig) => void): void;
