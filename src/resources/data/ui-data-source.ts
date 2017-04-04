import {autoinject} from 'aurelia-framework';
import {UIEvent} from "../utils/ui-event";
import * as _ from "lodash";

export class BaseDataSource {
  isEmpty = false;
  isLoading = false;
  isLoaded = false;

  dataProperty = 'data';
  totalProperty = 'totalRecords';

  pageProperty = 'page';
  countProperty = 'count';
  sortProperty = 'sort';
  orderProperty = 'order';

  totalPages = 0;
  currentPage = -1;
  recordsPerPage = 25;

  sortBy = '';
  orderBy = 'asc';

  data = [];
  __original__ = [];


  fetchData() { }
  loadPage(pg) { }

  sort(property, order) { }
  filter(props) {
    // array of [{prop: value}]
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
    this.isLoaded = true;
    this.isLoading = true;
    Promise.resolve(this.data = _.cloneDeep(this.__original__));
    this.isEmpty = this.data.length == 0;
    UIEvent.queueTask(() => this.isLoading = false);
  }
  loadPage(pg = 0) {
    this.isLoaded = true;
    this.isLoading = true;
    let offset = (this.currentPage = pg) * this.recordsPerPage;
    Promise.resolve(this.data = _.slice(this.__original__, offset, offset + this.recordsPerPage));
    this.isEmpty = this.data.length == 0;
    UIEvent.queueTask(() => this.isLoading = false);
  }

  sort(property = this.sortBy, order = this.orderBy) {
    this.isLoading = true;
    this.__original__ = _.orderBy(this.__original__, [this.sortBy = property], [this.orderBy = order])
    Promise.resolve(this.currentPage > -1 ? this.loadPage(this.currentPage) : this.fetchData());
    UIEvent.queueTask(() => this.isLoading = false);
  }
}

export class UIRemoteDS extends BaseDataSource {
  url = 'http://api.domain.com/list';

  buildUrl() { }
}
