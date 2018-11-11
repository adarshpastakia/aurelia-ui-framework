import { AppRouter } from "aurelia-router";
import { UIAppConfig } from "../utils/ui-app-config";
export declare class UIViewport {
    private appConfig;
    protected router: AppRouter;
    private dialogContainer;
    private taskbarContainer;
    constructor(appConfig: UIAppConfig, router: AppRouter);
    protected attached(): void;
    protected broadcastEvent($event: MouseEvent): void;
}
export declare class UIViewportHeader {
}
export declare class UIViewportFooter {
}
export declare class UIRouterView {
}
export declare class UIDivider {
}
export declare class UIFiller {
}
export declare class UILoader {
    busy: boolean;
}
