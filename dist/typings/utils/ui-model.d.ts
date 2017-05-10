import { Logger } from "aurelia-logging";
import { UIHttpService } from "./ui-http";
export declare class UIModel {
    logger: Logger;
    httpClient: UIHttpService;
    private __original__;
    private __observers__;
    constructor();
    get(...rest: any[]): void;
    post(...rest: any[]): void;
    put(...rest: any[]): void;
    delete(...rest: any[]): void;
    addObserver(ob: any): void;
    observe(property: any, callback: any): void;
    dispose(): void;
    deserialize(json: any): void;
    serialize(): {};
    static serializeObject(o: any): {};
    saveChanges(): void;
    discardChanges(): void;
    isDirty(): any;
    dirtyProperty(key: any): any;
    private checkDirty(o, t);
}
