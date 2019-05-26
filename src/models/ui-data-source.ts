/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

/********************************************************

    Describe UIDataSource

    @class: UIDataSource

    

 ********************************************************/

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

export class UIDataSource {
  public isPaginated: boolean = false;
  public pageNo: number = 0;
  public totalPages: number = 0;
  public recordsPerPage = 50;

  public sortByProperty: string;
  public sortByOrder: "asc" | "desc" = "asc";

  public data: KeyValue[] = [];

  private apiSlug: string;
  private original: KeyValue[] = [];

  private options: IDataSourceOptions = {
    rootProperty: "",
    dataProperty: "data",
    pageProperty: "pageno",
    countProperty: "total",
    sortProperty: "sortBy",
    orderProperty: "sortOrder",
    perPageProperty: "pageCount"
  };

  constructor(dataOrApi: string | KeyValue[], options: IDataSourceOptions = {}) {
    this.options = { ...this.options, ...options };

    this.isPaginated = options.paginated;
    this.recordsPerPage = options.recordsPerPage || 50;

    this.sortByProperty = options.defaultSortProperty;
    this.sortByOrder = options.defaultSortOrder || "asc";

    if (isArray(dataOrApi)) {
      this.original = dataOrApi;
      this.performFilter();
    } else {
      this.apiSlug = dataOrApi;
    }
  }

  public sortBy(property: string) {
    if (this.sortByProperty === property) {
      this.sortByOrder = this.sortByOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortByProperty = property;
      this.sortByOrder = "asc";
    }
    this.performFilter();
  }

  private performFilter() {
    let data = [...this.original];
    // Sort
    if (this.sortByProperty) {
      data = data.sortBy(this.sortByProperty, this.sortByOrder === "asc");
    }
    // Paginate
    if (this.isPaginated) {
      this.totalPages = Math.ceil(data.length / this.recordsPerPage);
      data = data.splice(this.pageNo * this.recordsPerPage, this.recordsPerPage);
    }
    this.data = data;
  }
}
