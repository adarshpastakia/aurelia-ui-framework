import { Container, TemplatingEngine, ViewCompiler } from "aurelia-framework";
import { UIAppConfig } from "../utils/ui-app-config";
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
export declare class UINotificationService {
    private appConfig;
    private container;
    private compiler;
    private templatingEngine;
    constructor(appConfig: UIAppConfig, container: Container, compiler: ViewCompiler, templatingEngine: TemplatingEngine);
    alert(message: string | UIAlertConfig, title?: string, config?: UIAlertConfig): Promise<boolean>;
    confirm(message: string | UIAlertConfig, title?: string, config?: UIAlertConfig): Promise<boolean>;
    message(message: string | UIAlertConfig, title?: string, config?: UIAlertConfig): Promise<boolean>;
    toast(message: string | UIAlertConfig, title?: string, config?: UIAlertConfig): Promise<boolean>;
    private buildConfig;
    private createToast;
    private createAlert;
}
