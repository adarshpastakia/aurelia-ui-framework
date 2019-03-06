/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement } from "aurelia-framework";

@customElement("ui-calendar")
export class UICalendar {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public date: Date | undefined;
}
