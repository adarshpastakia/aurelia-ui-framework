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
define(["require", "exports", "../utils/ui-event", "lodash"], function (require, exports, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseDataSource = (function () {
        function BaseDataSource() {
            this.isEmpty = false;
            this.isLoading = false;
            this.isLoaded = false;
            this.dataProperty = 'data';
            this.totalProperty = 'totalRecords';
            this.pageProperty = 'page';
            this.countProperty = 'count';
            this.sortProperty = 'sort';
            this.orderProperty = 'order';
            this.totalPages = 0;
            this.currentPage = -1;
            this.recordsPerPage = 25;
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
        return BaseDataSource;
    }());
    exports.BaseDataSource = BaseDataSource;
    var UILocalDS = (function (_super) {
        __extends(UILocalDS, _super);
        function UILocalDS(data, opts) {
            if (opts === void 0) { opts = {}; }
            var _this = _super.call(this) || this;
            _this.__original__ = (data || []);
            Object.assign(_this, opts);
            _this.totalPages = Math.ceil(_this.__original__.length / _this.recordsPerPage);
            return _this;
        }
        UILocalDS.prototype.fetchData = function () {
            var _this = this;
            this.isLoading = true;
            Promise.resolve(this.data = _.cloneDeep(this.__original__));
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
    exports.UILocalDS = UILocalDS;
    var UIRemoteDS = (function (_super) {
        __extends(UIRemoteDS, _super);
        function UIRemoteDS() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.url = 'http://api.domain.com/list';
            return _this;
        }
        UIRemoteDS.prototype.buildUrl = function () { };
        return UIRemoteDS;
    }(BaseDataSource));
    exports.UIRemoteDS = UIRemoteDS;
});
