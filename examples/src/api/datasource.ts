//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService, UIDataSource } from 'aurelia-ui-framework';
import * as _ from "lodash";

@autoinject()
export class DataModel {
  constructor(public httpClient: UIHttpService) { }

  wiki;
  source;
  attached() {
    // this.httpClient.text('docs/api/http.md').then(md => this.wiki = md);
    // this.httpClient.text('docs/api/datamodel.example.md').then(md => this.source = md);
    this.ds.load(Countries.list);
  }

  sortBy = 'name';
  orderBy = 'asc';

  ds = new UIDataSource({ paginate: true, recordsPerPage: 20 });

  filter;

  doFilter() {
    console.log(this.httpClient.buildQueryString({
      sortBy: this.sortBy,
      orderBy: this.orderBy,
      query: { name: this.filter }
    }));
    this.ds.filter({ name: this.filter });
  }
}
