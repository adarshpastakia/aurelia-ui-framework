import { autoinject, observable, computedFrom } from 'aurelia-framework';
import { UIEvent } from "../utils/ui-event";
import { UIModel } from "./ui-data-model";
import * as _ from "lodash";

export class BaseDataSource {
  isEmpty = false;
  isLoading = false;
  isLoaded = false;

  idProperty = '__autoId__';
  dataProperty = 'data';
  totalProperty = 'totalRecords';

  pageProperty = 'page';
  countProperty = 'count';
  sortProperty = 'sort';
  orderProperty = 'order';

  totalPages = 0;
  currentPage = -1;
  recordsPerPage = -1;

  paged = false;

  sortBy = '';
  orderBy = 'asc';

  data = [];
  __original__ = [];

  model;

  fetchData() { }
  loadPage(pg) { }

  sort(property, order) { }
  filter(props) {
    // array of [{prop: value}]
  }


  dispose() {
    _.forEach(this.__original__, (o: any) => o.dispose());
  }

  protected makeDataset(resp) {
    let ret = [];
    _.forEach(resp, o => {
      let model = new (this.model || UIModel)();
      model.deserialize(o);
      ret.push(model);
    });
    this.__original__ = ret;
  }

  // @computedFrom('data')
  getSummary(dataId, summary) {
    let retVal: any = '';
    switch (summary) {
      case 'sum': retVal = _.sumBy(this.data, dataId); break;
      case 'avg': retVal = _['meanBy'](this.data, dataId); break;
      default: return summary || '&nbsp;';
    }
    return retVal;
  }
}

export class UILocalDS extends BaseDataSource {

  constructor(data, opts = {}) {
    super();
    Object.assign(this, opts);
    this.makeDataset(data || []);

    this.totalPages = Math.ceil(this.__original__.length / this.recordsPerPage);
  }

  fetchData() {
    this.isLoading = true;
    Promise.resolve(this.data = this.__original__);
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
    this.__original__ = _.orderBy(this.__original__, [this.sortBy = property], [this.orderBy = order])
    Promise.resolve(this.currentPage > -1 ? this.loadPage(this.currentPage) : this.fetchData());
    UIEvent.queueTask(() => this.isLoading = false);
  }
}

export class UIRemoteDS extends BaseDataSource {
  url = 'http://api.domain.com/list';

  buildUrl() { }
}
