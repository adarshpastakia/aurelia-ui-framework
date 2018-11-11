/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container, ViewCompiler } from "aurelia-framework";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIAlertConfig } from "./ui-alert";
export interface UIAlertConfig {
    icon?: string;
    title?: string;
    message?: string;
    timeout?: number;
    autoClose?: boolean;
    parent?: Element;
    okLabel?: string;
    cancelLabel?: string;
    type?: "alert" | "confirm" | "prompt";
    theme?: "primary" | "secondary" | "gray" | "info" | "danger" | "success" | "warning";
}
export declare class UIAlertService {
    private appConfig;
    private container;
    private compiler;
    constructor(appConfig: UIAppConfig, container: Container, compiler: ViewCompiler);
    alert(message: string | UIAlertConfig, title: string, config?: UIAlertConfig): Promise<boolean>;
    confirm(message: string | UIAlertConfig, title: string, config?: UIAlertConfig): Promise<boolean>;
    toast(message: string | UIAlertConfig, title: string, config?: UIAlertConfig): Promise<boolean>;
    notification(message: string | UIAlertConfig, title: string, config?: UIAlertConfig): Promise<boolean>;
    private buildConfig;
    private createToast;
    private createAlert;
}
