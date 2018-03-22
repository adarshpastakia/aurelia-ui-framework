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
    this.httpClient.text('docs/components/datagrid.md').then(md => this.wiki = md);
    // this.httpClient.text('docs/api/datamodel.example.md').then(md => this.source = md);
    this.ds.load(Countries.list);
    this.ds.data.forEach((c, idx) => c.switchValue = idx % 5);
  }

  sortBy = 'name';
  orderBy = 'asc';

  ds = new UIDataSource({ paginate: true, recordsPerPage: 18, sortBy: 'name' });


  linkClick(value) {
    this.app.toast(`Link Clicked - ${value}`);
  }
  btnClick(value) {
    this.app.toast(`Button Clicked - ${value}`);
  }
  rowClick(r) {
    this.app.toast(`Row Clicked - ${r.name}`);
  }
}
