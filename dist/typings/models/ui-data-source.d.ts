interface IDataSourceOptions {
    rootProperty?: string;
    dataProperty?: string;
    pageProperty?: string;
    countProperty?: string;
    sortProperty?: string;
    orderProperty?: string;
    perPageProperty?: string;
    paginated?: boolean;
    recordsPerPage?: number;
    defaultSortProperty?: string;
    defaultSortOrder?: "asc" | "desc";
}
export declare class UIDataSource {
    isPaginated: boolean;
    pageNo: number;
    totalPages: number;
    recordsPerPage: number;
    sortByProperty: string;
    sortByOrder: "asc" | "desc";
    data: KeyValue[];
    private apiSlug;
    private original;
    private options;
    constructor(dataOrApi: string | KeyValue[], options?: IDataSourceOptions);
    sortBy(property: string): void;
    private performFilter;
}
export {};
