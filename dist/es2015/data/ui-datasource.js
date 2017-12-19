var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { computedFrom } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { metadata as Metadata } from 'aurelia-metadata';
import { UIHttpService } from "../utils/ui-http";
import { UIEvent } from "../utils/ui-event";
import { UIUtils } from "../utils/ui-utils";
import * as _ from "lodash";
const ERROR_CODES = {
    NO_API: { errorCode: 'AUF-DS:000', message: "API route required" },
    REJECTED: { errorCode: 'AUF-DS:001', message: "REST call rejected" },
    UNKNOWNID: { errorCode: 'AUF-DS:002', message: "Data source error" }
};
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
};
export class UIDataSource {
    constructor(options = {}) {
        this.data = [];
        this.busy = false;
        this.loaded = false;
        this.paginate = false;
        this.metadata = Metadata.getOrCreateOwn(Metadata.properties, DSMetadata, Object.getPrototypeOf(this));
        this.logger = getLogger(this.constructor.name);
        options = Object.assign({}, DEFAULT_OPTIONS, options);
        Object.keys(options).forEach(key => (this.hasOwnProperty(key) && (this[key] = options[key]))
            || (this.metadata.hasOwnProperty(key) && (this.metadata[key] = options[key])));
    }
    load(dataList = []) {
        this.metadata.original = dataList;
        this.buildDataList();
    }
    loadPage(page) {
        this.metadata.page = page;
        this.buildDataList();
    }
    filter(query) {
        this.metadata.query = query;
        this.buildDataList();
    }
    sort(column, order) {
        this.metadata.sortBy = column;
        this.metadata.orderBy = order;
        this.buildDataList();
    }
    get totalPages() {
        return this.metadata.totalPages;
    }
    get totalRecords() {
        return this.metadata.totalRecords;
    }
    get recordsPerPage() {
        return this.metadata.recordsPerPage;
    }
    get page() {
        return this.metadata.page;
    }
    get sortBy() {
        return this.metadata.sortBy;
    }
    get orderBy() {
        return this.metadata.orderBy;
    }
    buildDataList() {
        this.busy = true;
        let filtered = _.cloneDeep(this.metadata.original);
        if (this.metadata.query) {
            const keys = Object.keys(this.metadata.query);
            filtered = _.filter(filtered, record => {
                let ret = false;
                _.forEach(keys, key => !(ret = isEmpty(this.metadata.query[key]) ||
                    record[key].ascii().toLowerCase().indexOf(this.metadata.query[key].ascii().toLowerCase()) >= 0));
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
__decorate([
    computedFrom('metadata.totalPages'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataSource.prototype, "totalPages", null);
__decorate([
    computedFrom('metadata.totalRecords'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataSource.prototype, "totalRecords", null);
__decorate([
    computedFrom('metadata.recordsPerPage'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataSource.prototype, "recordsPerPage", null);
__decorate([
    computedFrom('metadata.page'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataSource.prototype, "page", null);
__decorate([
    computedFrom('metadata.sortBy'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataSource.prototype, "sortBy", null);
__decorate([
    computedFrom('metadata.orderBy'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataSource.prototype, "orderBy", null);
export class UIRemoteDataSource extends UIDataSource {
    constructor() {
        super(...arguments);
        this.rootProperty = 'data';
        this.pageProperty = 'page';
        this.queryProperty = 'query';
        this.sortByProperty = 'sortBy';
        this.orderByProperty = 'orderBy';
        this.totalPagesProperty = 'totalPages';
        this.totalRecordsProperty = 'totalRecords';
        this.recordsPerPageProperty = 'recordsPerPage';
        this.remoteSorting = true;
        this.remoteFiltering = true;
        this.httpClient = UIUtils.lazy(UIHttpService);
    }
    load() {
        this.doRequest().then(data => this.metadata.original = _.cloneDeep(this.data = data));
    }
    loadPage(page) {
        this.metadata.page = page;
        this.doRequest().then(data => this.data = data);
    }
    filter(query) {
        this.metadata.query = query;
        this.remoteFiltering ? this.doRequest().then(data => this.data = data) : this.buildDataList();
    }
    sort(column, order) {
        this.metadata.sortBy = column;
        this.metadata.orderBy = order;
        this.remoteSorting ? this.doRequest().then(data => this.data = data) : this.buildDataList();
    }
    preRequest(req) { }
    postRequest(req) { }
    buildQueryObject() {
        return {
            [this.pageProperty]: this.metadata.page,
            [this.queryProperty]: this.metadata.query,
            [this.sortByProperty]: this.metadata.sortBy,
            [this.orderByProperty]: this.metadata.orderBy,
            [this.recordsPerPageProperty]: this.metadata.recordsPerPage
        };
    }
    doRequest() {
        if (!this.apiSlug)
            return Promise.reject(ERROR_CODES.NO_API);
        ;
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
    callPreHook(hook, data) {
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
    constructor() {
        this.original = [];
        this.apiSlug = '';
        this.query = '';
        this.page = 0;
        this.sortBy = '';
        this.orderBy = 'asc';
        this.totalPages = 0;
        this.totalRecords = 0;
        this.recordsPerPage = 10;
    }
}
