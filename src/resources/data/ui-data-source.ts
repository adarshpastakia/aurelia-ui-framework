import { autoinject } from 'aurelia-framework';
import { UIEvent } from "../utils/ui-event";
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
  changes = [];


  fetchData() { }
  loadPage(pg) { }

  pushChanges(record) {
    if (this.changes.indexOf(record) < 0) {
      this.changes.push(record);
    } else {
      _.extend(this.changes[this.changes.indexOf(record)], record);
    }
  }

  undoChanges(record) {
    if (record) {
      if (this.changes.indexOf(record) != -1) {
        for (const prop in record._original_) {
          record[prop] = record._original_[prop];
          record.isDirty = false;
        }
      }
    } else {
      for (var index = 0; index < this.changes.length; index++) {
        var element = this.changes[index];
        for (const prop in element._original_) {
          element[prop] = element._original_[prop];
          element.isDirty = false;
        }
      }
    }
  }

  getChanges() {
    return this.changes;
  }

  commit() {
    var p = new Promise((resolve, reject) => {
      for (var index = 0; index < this.changes.length; index++) {
        var element = this.changes[index];
        delete element.isDirty;
        delete element._original_;
      }
      this.changes = [];
      resolve();
    });
    return p;
  }

  getById(id, pk) {
    return _.find(this.__original__, (rec) => rec[pk] === id);
  }

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
