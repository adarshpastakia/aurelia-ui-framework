/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import {
  autoinject,
  bindable,
  bindingMode,
  customElement,
  inlineView,
  PLATFORM,
  viewResources
} from "aurelia-framework";
import { ListMaker } from "./list-maker";

@autoinject()
@customElement("ui-list")
@viewResources(
  PLATFORM.moduleName("./input-wrapper"),
  PLATFORM.moduleName("./list-input"),
  PLATFORM.moduleName("./list-container")
)
@inlineView(`<template class="ui-input ui-list \${classes}" aria-disabled.bind="disabled || isDisabled" aria-readonly.bind="readonly">
<input-wrapper model.bind="$this">
  <slot></slot>
  <list-input></list-input>
  <div class="ui-list__container" ref="listContainer" css.bind="{height}">
    <list-container></list-container>
  </div>
</input-wrapper>
</template>`)
export class UIList extends ListMaker {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: AnyObject = undefined;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public model: AnyObject = undefined;

  @bindable()
  public errors: string[];

  @bindable()
  public name: string = "";
  @bindable()
  public height: string = "20em";
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
    this.multiple = element.hasAttribute("multiple");

    this.template = this.element.querySelector("template");
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

  protected attached(): void {
    this.loadOptions();
  }
}
