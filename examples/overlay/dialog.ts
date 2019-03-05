/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { UIDialogService } from "aurelia-ui-framework";
import { DlgTester } from "./dlgTester";

@autoinject()
export class DialogPage {
  protected dialogJs = `import { UIDialogService } from "aurelia-ui-framework";

@autoinject()
export class PageVm {
  constructor(private dialogService: UIDialogService) {}

  fn() {
    this.dialogService.open();
  }
}`;

  constructor(private dialogService: UIDialogService) {}

  protected openDialog() {
    this.dialogService.open(DlgTester);
  }
}
