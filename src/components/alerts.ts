// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UIUtils} from "../resources/utils/ui-utils";

@autoinject()
export class CompAlerts {
  constructor() { }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  toast = {
    title: 'Alert!!',
    message: 'Sample toast message...',
    theme: 'dark',
    timeout: 5000,
    glyph: 'symbol-info'
  }

  alertHolder;
  inlineToast() {
    UIUtils.toast(Object.assign({ container: this.alertHolder }, this.toast));
  }
  toastAlert() {
    UIUtils.toast(this.toast);
  }
}