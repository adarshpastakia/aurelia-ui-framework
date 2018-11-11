import { Container, ViewCompiler, ViewResources, CompositionEngine, TemplatingEngine } from "aurelia-framework";
export declare class UIDialogService {
    private compiler;
    private container;
    private resources;
    private compositionEngine;
    private templatingEngine;
    private activeWin;
    private windows;
    private initialized;
    constructor(compiler: ViewCompiler, container: Container, resources: ViewResources, compositionEngine: CompositionEngine, templatingEngine: TemplatingEngine);
    private initialize;
    makeActive(id: any): boolean;
    show(vm: any, model?: any): Promise<void>;
    close(id: any, force?: any): boolean;
    closeAll(): void;
    private createDialog;
    private initializeDialog;
    private closeDialog;
    private getViewModel;
    private invokeLifecycle;
    private changeActive;
    private taskClick;
    private nextActive;
    /**
       * dialog move
       */
    private __isDragging;
    private __isResizing;
    private __startX;
    private __startY;
    private __dialog;
    private __isRtl;
    private moveStart;
    private moveEnd;
    private move;
}
export declare class UIDialog {
    bind(bindingContext?: Object, overrideContext?: Object): void;
    attached(): void;
    static seed: number;
    static seedX: number;
    static posX: number;
    static posY: number;
    private uniqId;
    private dialogEl;
    private taskButtonEl;
    private dialogWrapperEl;
    private isActive;
    private isMaximized;
    private isMinimized;
    private posCurrent;
    id: any;
    glyph: any;
    title: string;
    theme: string;
    width: string;
    height: string;
    minWidth: string;
    minHeight: string;
    maxWidth: string;
    maxHeight: string;
    modal: boolean;
    draggable: boolean;
    resizable: boolean;
    minimizable: boolean;
    maximizable: boolean;
    closable: boolean;
    maximized: boolean;
    focus(): void;
    makeActive(): void;
    makeInactive(): void;
    minimize(): void;
    expand($event: any): void;
    collapse($event: any): void;
    close($event?: any): void;
    toast(config: any): void;
}
