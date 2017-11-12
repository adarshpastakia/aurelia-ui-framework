//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { UIDialog } from "aurelia-ui-framework";

@autoinject()
export class DlgView extends UIDialog {
  constructor() { super(); }

  // aurelia hooks
  canActivate(model) {
    this.modal = model.modal;
    this.printConsole = model.printConsole;
    this.printConsole(this.id, 'canActivate');
    return true;
  }
  created() { this.printConsole(this.id, 'created'); }
  activate(model) {
    this.printConsole(this.id, 'activate');
    return true;
  }
  bind(bindingContext) { this.printConsole(this.id, 'bind'); super.bind(); }
  attached() { this.printConsole(this.id, 'attached'); }
  detached() { this.printConsole(this.id, 'detached'); }
  unbind() { this.printConsole(this.id, 'unbind'); }
  canDeactivate() { this.printConsole(this.id, 'canDeactivate'); return true; }
  deactivate() { this.printConsole(this.id, 'deactivate'); }
  // end aurelia hooks

  id = "dlgView";
  title = "Simple Dialog";
  glyph = "icon-fill-document";

  width = "600px";
  height = "400px";

  printConsole;

  // closing = false;
  // close() {
  //   this.closing = true;
  //   setTimeout(() => super.close(), 2000);
  // }
}
