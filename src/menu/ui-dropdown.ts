/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, bindingMode, children, customElement } from "aurelia-framework";
import { UIDrop } from "../core/ui-drop";
import { UIInternal } from "../utils/ui-internal";

@autoinject()
@customElement("ui-dropdown")
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
      this.model = this.options.find(o => o[this.valueProperty] || o === this.value);
    } else {
      this.element
        .querySelectorAll(".ui-drop .ui-menu__item")
        .forEach(
          (o: AnyObject) =>
            (o.value[this.valueProperty] || o.value) === this.value ? (this.model = o.value) : ""
        );
    }
  }

  protected select($event: UIEvent): void {
    if ($event.detail) {
      this.model = $event.detail;
      this.value = this.model[this.valueProperty] || this.model;
    }
  }

  private toggleDrop($event: Event): void {
    $event.stopEvent();
    const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
    const afterEvent = this.dropEl.isOpen ? "close" : "open";
    if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
      this.dropEl.toggleDrop();
      this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
    }
  }
}
