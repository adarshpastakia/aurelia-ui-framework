//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService, UIDataSource, UIApplication } from 'aurelia-ui-framework';
import * as _ from "lodash";

@autoinject()
export class DgBasic {
  constructor(public httpClient: UIHttpService, public app: UIApplication) { }

  wiki;
  source;
  attached() {
    // this.httpClient.text('docs/api/http.md').then(md => this.wiki = md);
    // this.httpClient.text('docs/api/datamodel.example.md').then(md => this.source = md);
    this.ds.load(Countries.list);
  }

  sortBy = 'name';
  orderBy = 'asc';

  ds = new UIDataSource({ paginate: true, recordsPerPage: 20, sortBy: 'name' });


  linkClick(e) {
    this.app.toast(`Link Clicked - ${e.detail.value}`);
  }
  btnClick(e) {
    this.app.toast(`Button Clicked - ${e.detail.value}`);
  }
}
