/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, bindable, bindingMode, containerless, customElement } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@containerless()
@customElement("ui-fieldset")
export class UIFieldset {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public checked: boolean = false;
  @bindable()
  public label: string = "";
  @bindable()
  public class: string = "";
  @bindable()
  public disabled: boolean = false;

  protected fields: Element[] = [];
  protected optional: boolean = false;

  private vmElement;

  constructor(element: Element) {
    this.optional = element.hasAttribute("optional");
  }

  protected bind(): void {
    this.optional = this.optional || !!this.checked;
  }

  protected attached(): void {
    UIInternal.queueTask(() => {
      this.fields = this.vmElement.querySelectorAll(
        "ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle"
      );
      this.disabledChanged();
    });
  }

  protected disabledChanged(): void {
    this.fields.forEach(el => el.au.controller.viewModel.disable(!!this.disabled));
  }
}
