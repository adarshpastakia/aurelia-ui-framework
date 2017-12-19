export declare class UIDataSource {
    protected metadata: DSMetadata;
    logger: any;
    data: any[];
    busy: boolean;
    loaded: boolean;
    constructor(options?: any);
    /**
     * @description Load all records
     **/
    load(dataList?: any[]): void;
    /**
     * @description Load page
     * @param number page number
     **/
    loadPage(page: any): void;
    /**
     * @description Filter data list
     * @param string filter query
     **/
    filter(query: any): void;
    /**
     * @description: Sort data list
     * @param string column name
     * @param string sort order. 'asc'/'desc'
     **/
    sort(column: any, order: any): void;
    readonly totalPages: number;
    readonly totalRecords: number;
    readonly recordsPerPage: number;
    readonly page: number;
    readonly sortBy: string;
    readonly orderBy: string;
    protected paginate: boolean;
    protected buildDataList(): void;
}
export declare class UIRemoteDataSource extends UIDataSource {
    rootProperty: string;
    pageProperty: string;
    queryProperty: string;
    sortByProperty: string;
    orderByProperty: string;
    totalPagesProperty: string;
    totalRecordsProperty: string;
    recordsPerPageProperty: string;
    remoteSorting: boolean;
    remoteFiltering: boolean;
    httpClient: any;
    /**
     * @description Load all records
     **/
    load(): void;
    /**
     * @description Load page
     * @param number page number
     **/
    loadPage(page: any): void;
    /**
     * @description Filter data list
     * @param string filter query
     **/
    filter(query: any): void;
    /**
     * @description: Sort data list
     * @param string column name
     * @param string sort order. 'asc'/'desc'
     **/
    sort(column: any, order: any): void;
    preRequest(req: {
        url: string;
        queryObject: any;
    }): void;
    postRequest(req: {
        url: string;
        queryObject: any;
        data: [any];
    }): void;
    private apiSlug;
    private buildQueryObject();
    private doRequest();
    private callPreHook(hook, data?);
}
export declare class DSMetadata {
    original: any[];
    apiSlug: string;
    query: string;
    page: number;
    sortBy: string;
    orderBy: string;
    totalPages: number;
    totalRecords: number;
    recordsPerPage: number;
}
