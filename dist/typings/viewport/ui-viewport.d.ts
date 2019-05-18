import { AppRouter } from "aurelia-router";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIViewportFooter } from "./ui-viewport-footer";
declare class UIViewport {
    private appConfig;
    protected router: AppRouter;
    private dialogContainer;
    private taskbarContainer;
    constructor(appConfig: UIAppConfig, router: AppRouter);
    protected attached(): void;
    protected broadcastEvent($event: MouseEvent): void;
}
export declare const Viewport: (typeof UIViewportFooter | typeof UIViewport)[];
export {};
