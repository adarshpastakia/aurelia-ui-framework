//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService, UIApplication } from 'aurelia-ui-framework';

@autoinject()
export class Drawer {
  constructor(public app: UIApplication, public httpClient: UIHttpService) { }

  wiki = '';
  source = '';
  activate() {
    // this.httpClient.text('docs/components/drawer.md').then(md => this.wiki = md);
    // this.httpClient.text('docs/components/drawer.example.md').then(md => this.source = md);
  }

  toast = {
    title: 'Toast!!',
    message: 'Sample toast message...',
    theme: 'dark',
    timeout: 5000,
    glyph: 'glyph-alert-info'
  }
  alertHolder;
  inlineToast() {
    this.app.toast(Object.assign({ container: this.alertHolder }, this.toast));
  }
  toastAlert() {
    this.app.toast(this.toast);
  }

  alert = {
    title: 'Alert!!',
    message: 'Sample alert message...',
    okLabel: 'OK',
    cancelLabel: 'Cancel',
    glyph: 'glyph-alert-info'
  }
  openAlert() {
    this.app.alert(this.alert)
      .then(b => this.app.toast({ theme: 'info', message: 'Alert Closed!!' }));
  }
  openConfirm() {
    this.app.confirm(this.alert)
      .then(b => this.app.toast({ theme: b ? 'success' : 'danger', message: b ? "That's Correct!!" : "That's Wrong!!" }));
  }
  openPrompt() {
    this.app.prompt(this.alert)
      .then(b => this.app.toast({ theme: b ? 'success' : 'danger', message: b ? "That's Correct!!" : "That's Wrong!!" }));
  }
}
