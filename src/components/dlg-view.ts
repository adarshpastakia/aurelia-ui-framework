// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UIDialog} from "../resources/utils/ui-dialog";

@autoinject()
export class DlgView extends UIDialog {
  constructor() { super(); }

  // aurelia hooks
  canActivate(model) { console.log('canActivate'); return true; }
  activate(model) { console.log('activate'); this.modal = model.modal; return true; }
  bind(bindingContext) { console.log('bind'); super.bind(); }
  attached() { console.log('attached'); }
  detached() { console.log('detached'); }
  unbind() { console.log('unbind'); }
  deactivate() { console.log('deactivate'); }
  // end aurelia hooks

  modal = true;

  width = "400px";
  height = "300px";
}