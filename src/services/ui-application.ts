/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, singleton } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { UIAppConfig } from "../utils/ui-app-config";

@singleton()
@autoinject()
export class UIApplication {
  private logger = getLogger("UIApplication");

  constructor(public config: UIAppConfig) {}

  public log(tag: string, ...rest) {
    this.logger.info(tag, ...rest);
  }
  public debug(tag: string, ...rest) {
    this.logger.debug(tag, ...rest);
  }
}
