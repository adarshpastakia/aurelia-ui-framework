//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UIDialog} from "../resources/utils/ui-dialog";

@autoinject()
export class DlgReorder extends UIDialog {
  constructor() { super(); }
  canActivate(model) {
    this.reorder = model;
    return true;
  }
  reorder;
  modal = true;
  resizable = false;
  maximizable = false;
  id = "dlgView";
  title = "Reorder in Dialog";

  width = "300px";
  height = "240px";
}
