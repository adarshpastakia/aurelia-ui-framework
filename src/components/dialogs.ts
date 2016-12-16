// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, useView} from 'aurelia-framework';
import {UIDialogService, UIDialog} from "../resources/utils/ui-dialog";
import {DlgView} from "./dlg-view";

@autoinject()
export class CompDialogs {
  constructor(public dlgService: UIDialogService) { }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  openDialog(modal) {
    this.dlgService.show(DlgView, ({ modal }));
  }
}