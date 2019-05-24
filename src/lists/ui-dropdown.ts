/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, computedFrom, customElement, inlineView } from "aurelia-framework";
import { UIDrop } from "../shared/ui-drop";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-dropdown.html";

@customElement("ui-dropdown")
@inlineView(view)
export class UIDropdown {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: AnyObject = undefined;

  @bindable()
  public errors: string[];

  @bindable()
  public name: string = "";
  @bindable()
  public placeholder: string = "Select";

  @bindable()
  public labelProperty: string = "";
  @bindable()
  public valueProperty: string = "";
  @bindable()
  public iconProperty: string = "";
  @bindable()
  public iconPrefix: string = "";
  @bindable()
  public options: AnyObject[];

  @bindable()
  public disabled: boolean = false;

  protected dropEl: UIDrop;
  protected model: AnyObject = undefined;

  constructor(protected element: Element) {}

  protected attached() {
    this.dropEl.tether(this.element);
    this.valueChanged();
  }

  protected valueChanged(): void {
    if (this.options) {
      this.model = this.options.find(o => (o[this.valueProperty] || o) === this.value);
    }
  }

  protected select(model: AnyObject): void {
    this.model = model;
    this.value = this.model[this.valueProperty] || this.model;
  }

  @computedFrom("model")
  get selectedLabel() {
    return !isNull(this.model) ? this.model[this.labelProperty] || this.model : this.placeholder;
  }

  protected toggleDrop($event: Event): void {
    $event.stopEvent();
    const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
    const afterEvent = this.dropEl.isOpen ? "close" : "open";
    if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
      this.dropEl.toggleDrop();
      this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
    }
  }
}
