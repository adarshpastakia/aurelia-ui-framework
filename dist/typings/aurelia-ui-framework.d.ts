import { FrameworkConfiguration } from "aurelia-framework";
import "./libs/array";
import "./libs/string";
import "./libs/window";
import { UIInternal } from "./utils/ui-internal";
export * from "./models/ui-data-model";
export * from "./services/ui-application";
export * from "./services/ui-dialog";
export * from "./services/ui-notification";
export * from "./utils/ui-format";
export * from "./utils/ui-http";
export declare const Countries: ICountry;
export declare const queueTask: typeof UIInternal.queueTask;
export declare const queueMicroTask: typeof UIInternal.queueMicroTask;
export declare const broadcast: typeof UIInternal.broadcast;
export declare const subscribe: typeof UIInternal.subscribe;
export declare const subscribeOnce: typeof UIInternal.subscribeOnce;
export declare enum UIResources {
    Buttons = "buttons",
    Card = "card",
    Panel = "panel",
    Menus = "menus",
    Forms = "forms",
    Lists = "lists",
    TabPanel = "tabpanel",
    DataPanel = "datapanel",
    Calendar = "calendar",
    Gridder = "gridder"
}
export declare class UIFrameworkConfig {
    private auConfig;
    private resources;
    constructor(auConfig: FrameworkConfiguration, loadResources: (callback: () => Promise<void>) => void);
    setApiBaseUrl(v: string): UIFrameworkConfig;
    setApiHeaders(v: KeyValue): UIFrameworkConfig;
    setKeyValue(key: string, v: AnyObject): UIFrameworkConfig;
    useStandardResources(): void;
    useResource(resource: UIResources): this;
    private loadResources;
}
export declare function configure(auConfig: FrameworkConfiguration, configCallback: (config: UIFrameworkConfig) => void): Promise<void>;
