import { UIEvent } from "../utils/ui-event";
import * as _ from "lodash";
export class BaseDataSource {
    constructor() {
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
    fetchData() { }
    loadPage(pg) { }
    sort(property, order) { }
    filter(props) {
    }
}
export class UILocalDS extends BaseDataSource {
    constructor(data, opts = {}) {
        super();
        this.__original__ = (data || []);
        Object.assign(this, opts);
        this.totalPages = Math.ceil(this.__original__.length / this.recordsPerPage);
    }
    fetchData() {
        this.isLoading = true;
        Promise.resolve(this.data = _.cloneDeep(this.__original__));
        this.isEmpty = this.data.length == 0;
        UIEvent.queueTask(() => this.isLoaded = !(this.isLoading = false));
    }
    loadPage(pg = 0) {
        this.isLoading = true;
        let offset = (this.currentPage = pg) * this.recordsPerPage;
        Promise.resolve(this.data = _.slice(this.__original__, offset, offset + this.recordsPerPage));
        this.isEmpty = this.data.length == 0;
        UIEvent.queueTask(() => this.isLoaded = !(this.isLoading = false));
    }
    sort(property = this.sortBy, order = this.orderBy) {
        this.isLoading = true;
        this.__original__ = _.orderBy(this.__original__, [this.sortBy = property], [this.orderBy = order]);
        Promise.resolve(this.currentPage > -1 ? this.loadPage(this.currentPage) : this.fetchData());
        UIEvent.queueTask(() => this.isLoading = false);
    }
}
export class UIRemoteDS extends BaseDataSource {
    constructor() {
        super(...arguments);
        this.url = 'http://api.domain.com/list';
    }
    buildUrl() { }
}
