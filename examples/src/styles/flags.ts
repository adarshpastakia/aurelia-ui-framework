//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import * as _ from "lodash";

@autoinject()
export class StyleFlags {
  constructor() { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  attached() { this.filter(); }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  countries = window.Countries.list;
  elWidth = '8em';
  fCountries = [];
  filterText = '';
  filter() {
    this.fCountries = _.filter(window.Countries.list, c =>
      c.iso2.indexOf(this.filterText.toUpperCase()) > -1 ||
      c.iso3.indexOf(this.filterText.toUpperCase()) > -1 ||
      getAscii(c.name).toLowerCase().indexOf(this.filterText.toLowerCase()) > -1);
  }
}
