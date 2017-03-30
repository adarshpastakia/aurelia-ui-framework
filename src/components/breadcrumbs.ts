//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {UITreeOptions, UIEvent} from "../resources/index";

@autoinject()
export class CompCrumbs {
  constructor() {
  }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  crumbs = ['Personal Info', 'Shipping Info', 'Payment Info', 'Agreement'];
  activeTab = 0;
  next() {
    if (this.activeTab + 1 < this.crumbs.length)
      this.activeTab++;
  }
  prev() {
    this.activeTab--;
  }

  changeTab(evt) {
    this.activeTab = evt.detail;
  }
}
