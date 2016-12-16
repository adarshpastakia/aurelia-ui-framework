// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, useView} from 'aurelia-framework';
import {UIDialogService, UIDialog} from "../resources/utils/ui-dialog";
import {DlgView} from "./dlg-view";
import {DlgForm} from "./dlg-form";
import {DlgLayout} from "./dlg-layout";

@autoinject()
export class CompDialogs {
  constructor(public dlgService: UIDialogService) { }

  // aurelia hooks
  canActivate(model) { return true; } DlgForm
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  evtConsole;

  printConsole(tag, event) {
    this.evtConsole.innerHTML = `<div><span class="time">${new Date().toLocaleString()}</span>:<span class="tag">${tag}</span> - <span class="event">${event}</span></div>${this.evtConsole.innerHTML}`
  }

  openDialog(modal) {
    if (modal || !this.dlgService.makeActive('dlgView'))
      this.dlgService.show(DlgView, { modal: modal, printConsole: (...rest) => this.printConsole.apply(this, rest) });
  }

  openForm(modal) {
    if (modal || !this.dlgService.makeActive('dlgForm'))
      this.dlgService.show(DlgForm, { modal: modal, printConsole: (...rest) => this.printConsole.apply(this, rest) });
  }

  openLayout(modal) {
    if (modal || !this.dlgService.makeActive('dlgLayout'))
      this.dlgService.show(DlgLayout, { modal: modal, printConsole: (...rest) => this.printConsole.apply(this, rest) });
  }
}