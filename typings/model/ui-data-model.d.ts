export declare class UIDataModel {
    readonly isDirty: boolean;
    readonly dirtyProps: AnyObject;
    static serializeObject(o: any): {};
    static serializeProperty(p: any): any;
    id: any;
    busy: boolean;
    logger: any;
    protected apiSlug: any;
    protected idProperty: string;
    private metadata;
    private httpClient;
    private loaded;
    private internalId;
    constructor(id?: any);
    /**
     * @description Get record by id
     * @param any record id
     */
    get(id: any): Promise<void>;
    /**
     * @description Save record, perform post if not loaded else perform a put
     */
    save(): Promise<void>;
    /**
     * @description Delete record
     */
    delete(): Promise<void>;
    /**
     * @description Update local copy
     */
    update(): void;
    /**
     * @description Reset changes to original values
     */
    reset(): void;
    /**
     * @description Reset changes to previously updated values
     */
    discard(): void;
    /**
     * @description add any observer / disposable object
     */
    addObserver(ob: any): void;
    /**
     * @description Observe a property for changes
     */
    observe(property: any, callback: any): void;
    /**
     * @description Dispose the data model, ensuring to dispose all added observers
     */
    dispose(): void;
    /**
     * @description Serialize the data model into a POJO
     */
    serialize(): {};
    /**
     * @description Deserialize POJO object into the data model properties
     */
    deserialize(json: any): void;
    preGet(): void;
    preSave(): void;
    preDelete(): void;
    postGet(response: any): void;
    postSave(response: any): void;
    postDelete(response: any): void;
    private generateId;
    private propertyGetter;
    private propertySetter;
    private updateDirty;
    private callPreHook;
    private doGet;
    private doPost;
    private doPut;
    private doDelete;
    private doUpdate;
}
export declare function serializable(defaultValue?: any): AnyObject;
