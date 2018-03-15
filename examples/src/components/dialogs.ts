//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, useView } from 'aurelia-framework';
import { UIDialogService, UIEvent } from "aurelia-ui-framework";
import { DlgView } from "./dlg-view";

@autoinject()
export class CompDialogs {
  constructor(public dlgService: UIDialogService) { }
  dir = "ltr";
  evtConsole;

  obDir;
  attached() {
    this.obDir = UIEvent.observe(this, 'dir', this.dirChanged.bind(this))
  }
  detached() {
    this.obDir.dispose();
  }

  printConsole(tag, event) {
    if (!this.evtConsole) return;
    this.evtConsole.innerHTML = `<div><span class="time">${new Date().toLocaleString()}</span>:<span class="tag">${tag}</span> - <span class="event">${event}</span></div>${this.evtConsole.innerHTML}`
  }

  openDialog(modal) {
    this.dlgService.show(DlgView, { modal: modal, printConsole: (...rest) => this.printConsole.apply(this, rest) });
  }

  dirChanged(evt) {
    document.querySelector('.ui-dialog-container')['dir'] = evt;
  }
}
