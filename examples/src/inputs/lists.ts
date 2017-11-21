//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';
import * as moment from "moment";
import * as _ from "lodash";

@autoinject()
export class InputLists {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';

  ctr = 'IND';
  countries = _.chain(window.Countries.list).sortBy(['continent', 'name']).groupBy('continent').value();

  activate() {
    this.httpClient.text('docs/inputs/lists.md').then(md => this.wiki = md);
    this.httpClient.text('docs/inputs/lists.example.md').then(md => this.source = md);
  }
}
