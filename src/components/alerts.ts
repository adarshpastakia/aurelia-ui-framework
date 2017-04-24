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
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  themeTip = "dark";
  toast = {
    title: 'Toast!!',
    message: 'Sample toast message...',
    theme: 'dark',
    timeout: 5000,
    glyph: 'glyph-alert-info'
  }
  alert = {
    title: 'Alert!!',
    message: 'Sample alert message...',
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    glyph: 'glyph-alert-info'
  }

  alertHolder;
  inlineToast() {
    UIUtils.toast(Object.assign({ container: this.alertHolder }, this.toast));
  }
  toastAlert() {
    UIUtils.toast(this.toast);
  }

  openAlert() {
    UIUtils.alert(this.alert).then(b => UIUtils.toast({ theme: 'info', message: 'Alert Closed!!' }));
  }
  openConfirm() {
    UIUtils.confirm(this.alert).then(b => UIUtils.toast({ theme: b ? 'success' : 'danger', message: b ? "That's Correct!!" : "That's Wrong!!" }));
  }
  openPrompt() {
    UIUtils.prompt(this.alert).then(b => UIUtils.toast({ theme: b ? 'success' : 'danger', message: b || '---', title: b !== null ? 'You entered ' : 'Prompt was cancelled' }));
  }
}
