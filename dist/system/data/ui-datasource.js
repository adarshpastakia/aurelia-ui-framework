System.register(["aurelia-framework", "aurelia-logging", "aurelia-metadata", "../utils/ui-http", "../utils/ui-event", "../utils/ui-utils", "lodash"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, aurelia_logging_1, aurelia_metadata_1, ui_http_1, ui_event_1, ui_utils_1, _, ERROR_CODES, DEFAULT_OPTIONS, UIDataSource, UIRemoteDataSource, DSMetadata;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_logging_1_1) {
                aurelia_logging_1 = aurelia_logging_1_1;
            },
            function (aurelia_metadata_1_1) {
                aurelia_metadata_1 = aurelia_metadata_1_1;
            },
            function (ui_http_1_1) {
                ui_http_1 = ui_http_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            },
            function (ui_utils_1_1) {
                ui_utils_1 = ui_utils_1_1;
            },
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
            ERROR_CODES = {
                NO_API: { errorCode: 'AUF-DM:000', message: "API route required" },
                REJECTED: { errorCode: 'AUF-DM:001', message: "REST call rejected" },
                UNKNOWNID: { errorCode: 'AUF-DM:002', message: "Data model not loaded" }
            };
            DEFAULT_OPTIONS = {
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
            UIDataSource = (function () {
                function UIDataSource(options) {
                    if (options === void 0) { options = {}; }
                    this.data = [];
                    this.busy = false;
                    this.loaded = false;
                    this.paginate = false;
                    this.metadata = aurelia_metadata_1.metadata.getOrCreateOwn(aurelia_metadata_1.metadata.properties, DSMetadata, Object.getPrototypeOf(this));
                    this.logger = aurelia_logging_1.getLogger(this.constructor.name);
                    options = Object.assign({}, DEFAULT_OPTIONS, options);
                    this.paginate = options.paginate;
                    this.metadata.recordsPerPage = options.recordsPerPage;
                }
                UIDataSource.prototype.load = function (dataList) {
                    if (dataList === void 0) { dataList = []; }
                    this.metadata.original = dataList;
                    this.buildDataList();
                };
                UIDataSource.prototype.loadPage = function (page) {
                    this.metadata.page = page;
                    this.buildDataList();
                };
                Object.defineProperty(UIDataSource.prototype, "totalPages", {
                    get: function () {
                        return this.metadata.totalPages;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIDataSource.prototype, "totalRecords", {
                    get: function () {
                        return this.metadata.totalRecords;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIDataSource.prototype, "recordsPerPage", {
                    get: function () {
                        return this.metadata.recordsPerPage;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIDataSource.prototype, "page", {
                    get: function () {
                        return this.metadata.page;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIDataSource.prototype, "sortBy", {
                    get: function () {
                        return this.metadata.sortBy;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UIDataSource.prototype, "orderBy", {
                    get: function () {
                        return this.metadata.orderBy;
                    },
                    enumerable: true,
                    configurable: true
                });
                UIDataSource.prototype.buildDataList = function () {
                    var _this = this;
                    ui_event_1.UIEvent.queueTask(function () { return _this.busy = true; });
                    var filtered = _.orderBy(this.metadata.original, [this.metadata.sortBy || 'id'], [this.metadata.orderBy]);
                    if (this.paginate) {
                        this.metadata.totalRecords = filtered.length;
                        this.metadata.totalPages = Math.ceil(filtered.length / this.metadata.recordsPerPage);
                        filtered = filtered.splice((this.metadata.page * this.metadata.recordsPerPage), this.metadata.recordsPerPage);
                    }
                    ui_event_1.UIEvent.queueTask(function () { return _this.data = filtered; });
                    ui_event_1.UIEvent.queueTask(function () { return [_this.busy = false, _this.loaded = true]; });
                };
                __decorate([
                    aurelia_framework_1.computedFrom('metadata.totalPages'),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], UIDataSource.prototype, "totalPages", null);
                __decorate([
                    aurelia_framework_1.computedFrom('metadata.totalRecords'),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], UIDataSource.prototype, "totalRecords", null);
                __decorate([
                    aurelia_framework_1.computedFrom('metadata.recordsPerPage'),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], UIDataSource.prototype, "recordsPerPage", null);
                __decorate([
                    aurelia_framework_1.computedFrom('metadata.page'),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], UIDataSource.prototype, "page", null);
                __decorate([
                    aurelia_framework_1.computedFrom('metadata.sortBy'),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], UIDataSource.prototype, "sortBy", null);
                __decorate([
                    aurelia_framework_1.computedFrom('metadata.orderBy'),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], UIDataSource.prototype, "orderBy", null);
                return UIDataSource;
            }());
            exports_1("UIDataSource", UIDataSource);
            UIRemoteDataSource = (function (_super) {
                __extends(UIRemoteDataSource, _super);
                function UIRemoteDataSource() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.rootProperty = 'data';
                    _this.pageProperty = 'page';
                    _this.queryProperty = 'query';
                    _this.sortByProperty = 'sortBy';
                    _this.orderByProperty = 'orderBy';
                    _this.totalPagesProperty = 'totalPages';
                    _this.totalRecordsProperty = 'totalRecords';
                    _this.recordsPerPageProperty = 'recordsPerPage';
                    _this.remoteSorting = true;
                    _this.remoteFiltering = true;
                    _this.httpClient = ui_utils_1.UIUtils.lazy(ui_http_1.UIHttpService);
                    return _this;
                }
                UIRemoteDataSource.prototype.load = function () { };
                UIRemoteDataSource.prototype.loadPage = function (page) { };
                UIRemoteDataSource.prototype.filter = function (query) { };
                UIRemoteDataSource.prototype.sort = function (column, order) { };
                UIRemoteDataSource.prototype.preRequest = function (req) { };
                UIRemoteDataSource.prototype.postRequest = function (req) { };
                UIRemoteDataSource.prototype.buildQueryObject = function () {
                };
                UIRemoteDataSource.prototype.doRequest = function () {
                    if (!this.apiSlug)
                        return Promise.reject(ERROR_CODES.NO_API);
                    ;
                    var queryObject = this.buildQueryObject();
                    var url = "" + this.apiSlug + this.httpClient.buildQueryString(queryObject);
                    this.callPreHook('preRequest', { url: url, queryObject: queryObject })
                        .then(function (result) {
                        if (result !== false) {
                        }
                        Promise.reject(ERROR_CODES.REJECTED);
                    }).then(function (response) {
                    });
                };
                UIRemoteDataSource.prototype.callPreHook = function (hook, data) {
                    var result = this[hook](data);
                    if (result instanceof Promise) {
                        return result;
                    }
                    if (result !== null && result !== undefined) {
                        return Promise.resolve(result);
                    }
                    return Promise.resolve(true);
                };
                UIRemoteDataSource = __decorate([
                    aurelia_framework_1.autoinject()
                ], UIRemoteDataSource);
                return UIRemoteDataSource;
            }(UIDataSource));
            exports_1("UIRemoteDataSource", UIRemoteDataSource);
            DSMetadata = (function () {
                function DSMetadata() {
                    this.original = [];
                    this.query = '';
                    this.page = 0;
                    this.sortBy = '';
                    this.orderBy = 'asc';
                    this.totalPages = 0;
                    this.totalRecords = 0;
                    this.recordsPerPage = 10;
                }
                return DSMetadata;
            }());
        }
    };
});
