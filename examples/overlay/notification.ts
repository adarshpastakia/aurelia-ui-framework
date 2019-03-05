/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { UINotificationService } from "aurelia-ui-framework";

@autoinject()
export class NotificationPage {
  protected notifJs = `import { UINotificationService } from "aurelia-ui-framework";
  
@autoinject()
export class PageVm {
  constructor(private notificationService: UINotificationService) {}

  fn() {
    this.notificationService.alert(...);
    this.notificationService.confirm(...);
    this.notificationService.message(...);
    this.notificationService.toast(...);
  }
}`;

  constructor(private notificationService: UINotificationService) {}

  protected openAlertbox() {
    this.notificationService.alert("All is OK", "Yeah", {
      theme: "primary"
    });
  }

  protected openConfirmation() {
    this.notificationService.confirm("Is all OK?", "Hmm!", {
      theme: "info"
    });
  }

  protected showMessage() {
    this.notificationService.message("I am a user interaction message", "My Title", {
      theme: "danger"
    });
  }

  protected showNotification() {
    this.notificationService.toast("I am a server pushed message", "My Title", {
      theme: "warning",
      type: "confirm",
      autoClose: false,
      icon: "mdi mdi-account-circle"
    });
  }
}
