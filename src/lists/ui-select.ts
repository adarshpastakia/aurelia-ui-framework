/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, inlineView, viewResources } from "aurelia-framework";
import { InputWrapper } from "../forms/input-wrapper";
import { ListContainer } from "./list-container";
import { ListInput } from "./list-input";
import { ListMaker } from "./list-maker";
import view from "./ui-select.html";

@customElement("ui-select")
@viewResources(InputWrapper, ListInput, ListContainer)
@inlineView(view)
export class UISelect extends ListMaker {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: AnyObject = undefined;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public model: AnyObject = undefined;

  @bindable()
  public errors: string[];

  @bindable()
  public name: string = "";
  @bindable()
  public placeholder: string = "";

  @bindable()
  public labelProperty: string = "";
  @bindable()
  public valueProperty: string = "";
  @bindable()
  public groupProperty: string = "";
  @bindable()
  public query: ({ query }) => AnyObject[];
  @bindable()
  public options: AnyObject[];

  @bindable()
  public readonly: boolean = false;
  @bindable()
  public disabled: boolean = false;

  @bindable()
  public noOptionsText: string = "No Options";

  @bindable()
  public matcher: ({ option, value }) => boolean;

  constructor(protected element: Element) {
    super(element);
    this.dropHandle = "caret";
    this.multiple = element.hasAttribute("multiple");
    this.allowAny = element.hasAttribute("allow-any");

    this.template = this.element.querySelector("template");
  }

  protected attached(): void {
    this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
    this.dropEl.closeOnClick = !this.multiple;
    this.dropEl.tether(this.element);
  }

  protected bind(): void {
    if (!isNull(this.model)) {
      if (this.multiple) {
        this.value = this.multiple
          ? this.model.map(o => o[this.valueProperty] || o)
          : this.model[this.labelProperty] || this.model;
      }
    }
    this.isGrouped = !!this.groupProperty;
    this.valueChanged();
  }
}
