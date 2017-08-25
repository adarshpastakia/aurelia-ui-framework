//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { UIDialog } from "../resources/utils/ui-dialog";

@autoinject()
export class DlgLayout extends UIDialog {
  constructor() { super(); }

  // aurelia hooks
  canActivate(model) {
    this.modal = model.modal;
    this.printConsole = model.printConsole;
    this.printConsole(this.id, 'canActivate');
    return true;
  }
  activate(model) {
    this.printConsole(this.id, 'activate');
    return true;
  }
  bind(bindingContext) { this.printConsole(this.id, 'bind'); super.bind(); }
  attached() { this.printConsole(this.id, 'attached'); super.attached(); }
  detached() { this.printConsole(this.id, 'detached'); }
  unbind() { this.printConsole(this.id, 'unbind'); }
  deactivate() { this.printConsole(this.id, 'deactivate'); }
  // end aurelia hooks

  id = "dlgLayout";
  title = "Complex Dialog";
  glyph = "icon-fill-note-list";

  minWidth = "600px";
  minHeight = "400px";

  width = "800px";
  height = "600px";

  maximized = true;

  printConsole;
}
