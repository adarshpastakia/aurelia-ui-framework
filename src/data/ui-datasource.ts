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
  NO_API: { errorCode: 'AUF-DM:000', message: "API route required" },
  REJECTED: { errorCode: 'AUF-DM:001', message: "REST call rejected" },
  UNKNOWNID: { errorCode: 'AUF-DM:002', message: "Data model not loaded" }
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
  private metadata: DSMetadata;
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
  filter(query) { }

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
    UIEvent.queueTask(() => this.busy = true);
    let filtered = _.orderBy(this.metadata.original, [this.metadata.sortBy || 'id'], [this.metadata.orderBy]);
    if (this.paginate) {
      this.metadata.totalRecords = filtered.length;
      this.metadata.totalPages = Math.ceil(filtered.length / this.metadata.recordsPerPage);
      filtered = filtered.splice((this.metadata.page * this.metadata.recordsPerPage), this.metadata.recordsPerPage);
    }
    UIEvent.queueTask(() => this.data = filtered);
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
  load() { }

  /**
   * @description Load page
   * @param number page number
   **/
  loadPage(page) { }

  /**
   * @description Filter data list
   * @param string filter query
   **/
  filter(query) { }

  /**
   * @description: Sort data list
   * @param string column name
   * @param string sort order. 'asc'/'desc'
   **/
  sort(column, order) { }

  // Pre/Post hooks for fetch calls
  preRequest(req: { url: string, queryObject: any }) { }
  postRequest(req: { url: string, queryObject: any, data: [any] }) { }

  // ------ PRIVATE PROPS/METHODS
  private apiSlug;
  private buildQueryObject() {

  }

  private doRequest() {
    if (!this.apiSlug) return Promise.reject(ERROR_CODES.NO_API);;

    const queryObject = this.buildQueryObject();
    const url = `${this.apiSlug}${this.httpClient.buildQueryString(queryObject)}`;

    this.callPreHook('preRequest', { url, queryObject })
      .then(result => {
        if (result !== false) {
        }
        Promise.reject(ERROR_CODES.REJECTED);
      }).then(response => {
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


class DSMetadata {
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
