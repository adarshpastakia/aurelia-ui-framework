/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { UIApplication } from "aurelia-ui-framework";

@autoinject()
export class AppHome {
  private titleHidden = true;

  constructor(private app: UIApplication) {}

  protected activate() {
    this.app.broadcast("hidetitle", true);
  }
  protected deactivate() {
    this.app.broadcast("hidetitle", false);
  }

  protected hideTitle(b) {
    if (this.titleHidden !== b) {
      this.app.broadcast("hidetitle", (this.titleHidden = b));
    }
  }
}
