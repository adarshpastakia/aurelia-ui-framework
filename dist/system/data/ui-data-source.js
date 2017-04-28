System.register(["aurelia-framework", "../utils/ui-event", "../utils/ui-model", "lodash"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ui_event_1, ui_model_1, _, BaseDataSource, UILocalDS, UIRemoteDS;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            },
            function (ui_model_1_1) {
                ui_model_1 = ui_model_1_1;
            },
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
            BaseDataSource = (function () {
                function BaseDataSource() {
                    this.isEmpty = false;
                    this.isLoading = false;
                    this.isLoaded = false;
                    this.idProperty = '__autoId__';
                    this.dataProperty = 'data';
                    this.totalProperty = 'totalRecords';
                    this.pageProperty = 'page';
                    this.countProperty = 'count';
                    this.sortProperty = 'sort';
                    this.orderProperty = 'order';
                    this.totalPages = 0;
                    this.currentPage = -1;
                    this.recordsPerPage = -1;
                    this.paged = false;
                    this.sortBy = '';
                    this.orderBy = 'asc';
                    this.data = [];
                    this.__original__ = [];
                }
                BaseDataSource.prototype.fetchData = function () { };
                BaseDataSource.prototype.loadPage = function (pg) { };
                BaseDataSource.prototype.sort = function (property, order) { };
                BaseDataSource.prototype.filter = function (props) {
                };
                BaseDataSource.prototype.dispose = function () {
                    _.forEach(this.__original__, function (o) { return o.dispose(); });
                };
                BaseDataSource.prototype.makeDataset = function (resp) {
                    var _this = this;
                    var ret = [];
                    _.forEach(resp, function (o) {
                        var model = new (_this.model || ui_model_1.UIModel)();
                        model.deserialize(o);
                        ret.push(model);
                    });
                    this.__original__ = ret;
                };
                return BaseDataSource;
            }());
            BaseDataSource = __decorate([
                aurelia_framework_1.observable('__original__')
            ], BaseDataSource);
            exports_1("BaseDataSource", BaseDataSource);
            UILocalDS = (function (_super) {
                __extends(UILocalDS, _super);
                function UILocalDS(data, opts) {
                    if (opts === void 0) { opts = {}; }
                    var _this = _super.call(this) || this;
                    _this.makeDataset(data || []);
                    Object.assign(_this, opts);
                    _this.totalPages = Math.ceil(_this.__original__.length / _this.recordsPerPage);
                    return _this;
                }
                UILocalDS.prototype.fetchData = function () {
                    var _this = this;
                    this.isLoading = true;
                    Promise.resolve(this.data = this.__original__);
                    this.isEmpty = this.data.length == 0;
                    ui_event_1.UIEvent.queueTask(function () { return _this.isLoaded = !(_this.isLoading = false); });
                };
                UILocalDS.prototype.loadPage = function (pg) {
                    var _this = this;
                    if (pg === void 0) { pg = 0; }
                    this.isLoading = true;
                    var offset = (this.currentPage = pg) * this.recordsPerPage;
                    Promise.resolve(this.data = _.slice(this.__original__, offset, offset + this.recordsPerPage));
                    this.isEmpty = this.data.length == 0;
                    ui_event_1.UIEvent.queueTask(function () { return _this.isLoaded = !(_this.isLoading = false); });
                };
                UILocalDS.prototype.sort = function (property, order) {
                    var _this = this;
                    if (property === void 0) { property = this.sortBy; }
                    if (order === void 0) { order = this.orderBy; }
                    this.isLoading = true;
                    this.__original__ = _.orderBy(this.__original__, [this.sortBy = property], [this.orderBy = order]);
                    Promise.resolve(this.currentPage > -1 ? this.loadPage(this.currentPage) : this.fetchData());
                    ui_event_1.UIEvent.queueTask(function () { return _this.isLoading = false; });
                };
                return UILocalDS;
            }(BaseDataSource));
            exports_1("UILocalDS", UILocalDS);
            UIRemoteDS = (function (_super) {
                __extends(UIRemoteDS, _super);
                function UIRemoteDS() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.url = 'http://api.domain.com/list';
                    return _this;
                }
                UIRemoteDS.prototype.buildUrl = function () { };
                return UIRemoteDS;
            }(BaseDataSource));
            exports_1("UIRemoteDS", UIRemoteDS);
        }
    };
});
