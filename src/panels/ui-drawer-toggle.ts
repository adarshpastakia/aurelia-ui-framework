/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-drawer-toggle")
@inlineView(
  "<template class='ui-drawer__toggler' click.trigger='toggleOpen()'><slot><ui-svg-icon icon='menu'></ui-svg-icon></slot></template>"
)
export class UIDrawerToggle {
  @bindable() public drawer: HTMLElement;

  protected toggleOpen() {
    this.drawer.dataset.peek = `${!isTrue(this.drawer.dataset.peek)}`;
  }
}
