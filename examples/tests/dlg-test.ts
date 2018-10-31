/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { Countries, UIAlertService } from "aurelia-ui-framework";

@autoinject()
export class DlgTest {
  protected isModal = false;
  protected countries = Countries.list;
  private logger = getLogger("DlgTest");

  constructor(protected toastService: UIAlertService) {
    this.logger.info("constructor");
  }

  protected canActivate() {
    this.logger.info("canActivate");
    return true;
  }
  protected activate(model) {
    this.logger.info("activate");
    this.isModal = model.isModal;
    return true;
  }
  protected bind() {
    this.logger.info("bind");
    return true;
  }
  protected attached() {
    this.logger.info("attached");
    return true;
  }
  protected canDeactivate(result) {
    this.logger.info("canDeactivate", result);
    if (result) {
      return true;
    }
    return this.toastService.confirm("Are you sure?", "Closing", {
      icon: "mdi mdi-comment-question",
      theme: "danger"
    });
  }
  protected deactivate() {
    this.logger.info("deactivate");
    return true;
  }
  protected unbind() {
    this.logger.info("unbind");
    return true;
  }
  protected detached() {
    this.logger.info("detached");
    return true;
  }
}
