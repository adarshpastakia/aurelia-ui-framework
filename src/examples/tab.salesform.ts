//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {UIUtils, UIEvent} from '../resources/index';
import * as _ from "lodash";

@autoinject()
export class TabSalesForm {
  constructor(public element: Element) { }

  countries = _.chain(window.Countries.list).sortBy(['continent', 'name']).groupBy('continent').value();

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model, route) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  canClose() {
    return UIUtils.confirm('Discard changes?');
  }

  isSaving = false;
  doSave() {
    this.isSaving = true;
    setTimeout(() => {
      UIUtils.toast({ message: 'Sale successful', glyph: 'glyph-alert-notif', theme: 'success' });
      this.isSaving = false;

      UIUtils.confirm("Add another sale?")
        .then(b => b ? this.resetForm() : UIEvent.fireEvent('close', this.element));
    }, 1000);
  }

  resetForm() {
    this.type = 0;
  }

  type = 0;
  amount = 0;
  ship = 0;
  discount = 0;

  prefix = "900 001";
  prefixCls = "ui-bg-yellow";
  changeType(type) {
    if (type == 0) {
      this.amount = 0;
      this.ship = 0;
      this.discount = 0;
      this.prefix = "900 001";
      this.prefixCls = "ui-bg-yellow";
    }
    if (type == 1) {
      this.amount = 39.99;
      this.ship = 10.00;
      this.discount = -4.99;
      this.prefix = "800 001";
      this.prefixCls = "ui-bg-blue ui-text-white";
    }
    if (type == 2) {
      this.amount = 69.99;
      this.ship = 10.00;
      this.discount = -7.99;
      this.prefix = "600 001";
      this.prefixCls = "ui-bg-teal ui-text-white";
    }
    if (type == 3) {
      this.amount = 99.99;
      this.ship = 0.00;
      this.discount = -9.99;
      this.prefix = "500 001";
      this.prefixCls = "ui-bg-purple ui-text-white";
    }
  }
}
