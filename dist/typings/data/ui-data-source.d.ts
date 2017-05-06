export declare class BaseDataSource {
    isEmpty: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    idProperty: string;
    dataProperty: string;
    totalProperty: string;
    pageProperty: string;
    countProperty: string;
    sortProperty: string;
    orderProperty: string;
    totalPages: number;
    currentPage: number;
    recordsPerPage: number;
    paged: boolean;
    sortBy: string;
    orderBy: string;
    data: any[];
    __original__: any[];
    model: any;
    fetchData(): void;
    loadPage(pg: any): void;
    sort(property: any, order: any): void;
    filter(props: any): void;
    dispose(): void;
    protected makeDataset(resp: any): void;
    getSummary(dataId: any, summary: any): any;
}
export declare class UILocalDS extends BaseDataSource {
    constructor(data: any, opts?: {});
    fetchData(): void;
    loadPage(pg?: number): void;
    sort(property?: string, order?: string): void;
}
export declare class UIRemoteDS extends BaseDataSource {
    url: string;
    buildUrl(): void;
}
