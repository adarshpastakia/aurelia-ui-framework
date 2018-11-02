/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, customAttribute } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customAttribute("ui-badge")
export class UIBadge {
  @bindable({ primaryProperty: true })
  protected value: string = "";
  @bindable()
  protected icon: string = "";
  @bindable()
  protected theme: string = "";
  @bindable()
  protected tooltip: string = "";

  constructor(protected element: Element) {}

  protected attached(): void {
    if (this.value || this.icon) {
      const vm = getViewModel(this.element);
      const view = UIInternal.compileTemplate(
        `<template><div class="ui-badge" ui-theme.bind="theme" ui-tooltip.bind="tooltip">
        <div class="ui-badge__label"><ui-icon icon.bind="icon" if.bind="icon"></ui-icon>\${value}</div>
      </div></template>`,
        this
      );
      (vm && vm.badgeEl ? vm.badgeEl : vm.vmElement || this.element).appendChild(view.fragment);
      view.attached();
    }
  }
}
