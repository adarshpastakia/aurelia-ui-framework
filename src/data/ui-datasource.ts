//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, transient, computedFrom } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
import { metadata as Metadata } from 'aurelia-metadata';
import { UIHttpService } from "../utils/ui-http";
import { UIEvent } from "../utils/ui-event";
import { UIUtils } from "../utils/ui-utils";
import * as _ from "lodash";

const ERROR_CODES = {
  NO_API: { errorCode: 'AUF-DS:000', message: "API route required" },
  REJECTED: { errorCode: 'AUF-DS:001', message: "REST call rejected" },
  UNKNOWNID: { errorCode: 'AUF-DS:002', message: "Data source error" }
}

const DEFAULT_OPTIONS = {
  apiSlug: '',

  paginate: false,
  recordsPerPage: 10,

  rootProperty: 'data',
  pageProperty: 'page',
  queryProperty: 'query',
  sortByProperty: 'sortBy',
  orderByProperty: 'orderBy',
  totalPagesProperty: 'totalPages',
  totalRecordsProperty: 'totalRecords',
  recordsPerPageProperty: 'recordsPerPage',

  remoteSorting: true,
  remoteFiltering: true
}

export class UIDataSource {
  protected metadata: DSMetadata;
  public logger;

  data = [];

  busy = false;
  loaded = false;

  constructor(options: any = {}) {
    this.metadata = Metadata.getOrCreateOwn(Metadata.properties, DSMetadata, Object.getPrototypeOf(this)) as DSMetadata;

    this.logger = getLogger(this.constructor.name);

    options = Object.assign({}, DEFAULT_OPTIONS, options);

    Object.keys(options).forEach(key => (this.hasOwnProperty(key) && (this[key] = options[key]))
      || (this.metadata.hasOwnProperty(key) && (this.metadata[key] = options[key])));
  }

  /**
   * @description Load all records
   **/
  load(dataList = []) {
    this.metadata.original = dataList;
    this.buildDataList();
  }

  /**
   * @description Load page
   * @param number page number
   **/
  loadPage(page) {
    this.metadata.page = page;
    this.buildDataList();
  }

  /**
   * @description Filter data list
   * @param string filter query
   **/
  filter(query) {
    this.metadata.query = query;
    this.buildDataList();
  }

  /**
   * @description: Sort data list
   * @param string column name
   * @param string sort order. 'asc'/'desc'
   **/
  sort(column, order) {
    this.metadata.sortBy = column;
    this.metadata.orderBy = order;
    this.buildDataList();
  }

  @computedFrom('metadata.totalPages')
  get totalPages() {
    return this.metadata.totalPages;
  }
  @computedFrom('metadata.totalRecords')
  get totalRecords() {
    return this.metadata.totalRecords;
  }
  @computedFrom('metadata.recordsPerPage')
  get recordsPerPage() {
    return this.metadata.recordsPerPage;
  }
  @computedFrom('metadata.page')
  get page() {
    return this.metadata.page;
  }
  @computedFrom('metadata.sortBy')
  get sortBy() {
    return this.metadata.sortBy;
  }
  @computedFrom('metadata.orderBy')
  get orderBy() {
    return this.metadata.orderBy;
  }

  //----- Protected Methods -----//
  protected paginate = false;
  protected buildDataList() {
    this.busy = true;

    let filtered = _.cloneDeep(this.metadata.original);
    if (this.metadata.query) {
      const keys = Object.keys(this.metadata.query);
      filtered = _.filter(filtered, record => {
        let ret = false;
        _.forEach(keys, key =>
          !(ret = isEmpty(this.metadata.query[key]) ||
            record[key].ascii().toLowerCase().indexOf(this.metadata.query[key].ascii().toLowerCase()) >= 0)
        );
        return ret;
      });
    }

    filtered = _.orderBy(filtered, [this.metadata.sortBy || 'id'], [this.metadata.orderBy]);
    if (this.paginate) {
      this.metadata.totalRecords = filtered.length;
      this.metadata.totalPages = Math.ceil(filtered.length / this.metadata.recordsPerPage);
      filtered = filtered.splice((this.metadata.page * this.metadata.recordsPerPage), this.metadata.recordsPerPage);
    }
    this.data = filtered;
    UIEvent.queueTask(() => [this.busy = false, this.loaded = true]);
  }
}

export class UIRemoteDataSource extends UIDataSource {
  rootProperty = 'data';
  pageProperty = 'page';
  queryProperty = 'query';
  sortByProperty = 'sortBy';
  orderByProperty = 'orderBy';
  totalPagesProperty = 'totalPages';
  totalRecordsProperty = 'totalRecords';
  recordsPerPageProperty = 'recordsPerPage';

  remoteSorting = true;
  remoteFiltering = true;

  httpClient = UIUtils.lazy(UIHttpService);

  /**
   * @description Load all records
   **/
  load() {
    this.doRequest().then(data => this.metadata.original = _.cloneDeep(this.data = data));
  }

  /**
   * @description Load page
   * @param number page number
   **/
  loadPage(page) {
    this.metadata.page = page;
    this.doRequest().then(data => this.data = data);
  }

  /**
   * @description Filter data list
   * @param string filter query
   **/
  filter(query) {
    this.metadata.query = query;
    this.remoteFiltering ? this.doRequest().then(data => this.data = data) : this.buildDataList();
  }

  /**
   * @description: Sort data list
   * @param string column name
   * @param string sort order. 'asc'/'desc'
   **/
  sort(column, order) {
    this.metadata.sortBy = column;
    this.metadata.orderBy = order;
    this.remoteSorting ? this.doRequest().then(data => this.data = data) : this.buildDataList();
  }

  // Pre/Post hooks for fetch calls
  preRequest(req: { url: string, queryObject: any }) { }
  postRequest(req: { url: string, queryObject: any, data: [any] }) { }

  // ------ PRIVATE PROPS/METHODS
  private apiSlug;
  private buildQueryObject() {
    return {
      [this.pageProperty]: this.metadata.page,
      [this.queryProperty]: this.metadata.query,
      [this.sortByProperty]: this.metadata.sortBy,
      [this.orderByProperty]: this.metadata.orderBy,
      [this.recordsPerPageProperty]: this.metadata.recordsPerPage
    }
  }

  private doRequest() {
    if (!this.apiSlug) return Promise.reject(ERROR_CODES.NO_API);;

    const queryObject = this.buildQueryObject();
    const url = `${this.apiSlug}${this.httpClient.buildQueryString(queryObject)}`;

    this.callPreHook('preRequest', { url, queryObject })
      .then(result => {
        if (result !== false) {
          return this.httpClient.json(url);
        }
        Promise.reject(ERROR_CODES.REJECTED);
      }).then(response => {
        this.metadata.totalPages = response[this.totalPagesProperty];
        this.metadata.totalRecords = response[this.totalRecordsProperty];
        return response[this.rootProperty];
      });
  }

  private callPreHook(hook, data?) {
    let result = this[hook](data);

    if (result instanceof Promise) {
      return result;
    }

    if (result !== null && result !== undefined) {
      return Promise.resolve(result);
    }

    return Promise.resolve(true);
  }

}


export class DSMetadata {
  original = [];

  apiSlug = '';

  query = '';
  page = 0;
  sortBy = '';
  orderBy = 'asc';
  totalPages = 0;
  totalRecords = 0;
  recordsPerPage = 10;
}
