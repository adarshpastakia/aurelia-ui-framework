//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UIDialogService, UIDialog} from "../resources/utils/ui-dialog";
import {DlgReorder} from "./dlg-reorder";
import * as _ from "lodash";

@autoinject()
export class InputLists {
  constructor(public dlgService: UIDialogService) { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  ctr = 'UAE';
  countries = _.chain(window.Countries.list).sortBy(['continent', 'name']).groupBy('continent').value();

  reorder = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Lima', 'Omega', 'Sigma', 'Theta', 'Zulu'];

  openDialog(modal) {
    this.dlgService.show(DlgReorder, this.reorder);
  }
}
