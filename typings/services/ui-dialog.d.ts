/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { CompositionEngine, Container } from "aurelia-framework";
import { UIAppConfig } from "../utils/ui-app-config";
export declare class UIDialogService {
    private appConfig;
    private container;
    private compositionEngine;
    private activeWin;
    private windows;
    private initialized;
    private dragObject;
    constructor(appConfig: UIAppConfig, container: Container, compositionEngine: CompositionEngine);
    open(viewModel: any, model?: any): Promise<{}>;
    private initialize;
    private startDrag;
    private drag;
    private stopDrag;
    private minimizeDialog;
    private closeDialog;
    private activate;
    private getViewModel;
}
