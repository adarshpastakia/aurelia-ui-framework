//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';
import * as moment from "moment";

@autoinject()
export class InputDates {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';

  activate() {
    this.httpClient.text('docs/inputs/dates.md').then(md => this.wiki = md);
    this.httpClient.text('docs/inputs/dates.example.md').then(md => this.source = md);
  }

  minDate = moment().toISOString();

  date1 = moment().toISOString();
  date2 = moment().add(1, 'month').toISOString();
}
