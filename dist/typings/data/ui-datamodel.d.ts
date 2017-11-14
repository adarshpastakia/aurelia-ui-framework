export declare class UIDataModel {
    private metadata;
    logger: any;
    constructor(id?: any);
    id: any;
    busy: boolean;
    loaded: boolean;
    get(id: any): void;
    save(): void;
    update(): void;
    reset(): void;
    discard(): void;
    serialize(): {};
    deserialize(json: any): void;
    static serializeObject(o: any): {};
    static serializeProperty(p: any): any;
    readonly isDirty: boolean;
    isPropDirty(prop: any): boolean;
    getDirtyProps(): any[];
    protected apiUrl: any;
    protected idProperty: string;
    private _id;
    private generateId();
    private propertyGetter(prop);
    private propertySetter(prop);
    private updateDirty(prop, value);
}
export declare function serializable(defaultValue?: any): any;
