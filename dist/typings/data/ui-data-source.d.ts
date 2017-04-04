export declare class BaseDataSource {
    isEmpty: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    dataProperty: string;
    totalProperty: string;
    pageProperty: string;
    countProperty: string;
    sortProperty: string;
    orderProperty: string;
    totalPages: number;
    currentPage: number;
    recordsPerPage: number;
    sortBy: string;
    orderBy: string;
    data: any[];
    __original__: any[];
    fetchData(): void;
    loadPage(pg: any): void;
    sort(property: any, order: any): void;
    filter(props: any): void;
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
