/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { autoinject, bindable, customAttribute } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customAttribute("ui-badge")
export class UIBadge {
  /**
   * Badge value
   * `ui-badge="9"`
   */
  @bindable({ primaryProperty: true })
  protected value: string = "";

  /**
   * Badge icon
   * `ui-badge.bind="{icon:''; value:''}`
   */
  @bindable()
  protected icon: string = "";

  /**
   * Badge theme
   * `ui-badge.bind="{theme:''; value:''}`
   */
  @bindable()
  protected theme: string = "";

  /**
   * Badge tooltip
   * `ui-badge.bind="{tooltip:''; value:''}`
   */
  @bindable()
  protected tooltip: string = "";

  constructor(protected element: Element) {
  }

  protected attached(): void {
    if (this.value || this.icon) {
      const vm = getViewModel(this.element);
      const view = UIInternal.compileTemplate(
        `<template><div class="ui-badge" ui-theme.bind="theme" ui-tooltip.bind="tooltip">
        <ui-icon icon.bind="icon" if.bind="icon"></ui-icon>\${value}
      </div></template>`,
        this
      );
      (vm ? (vm.badgeEl ? vm.badgeEl : vm.vmElement) : this.element).appendChild(view.fragment);
      view.attached();
    }
  }
}
