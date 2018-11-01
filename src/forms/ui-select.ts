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
  Container,
  customElement,
  ViewCompiler,
  viewResources
} from "aurelia-framework";
import { UIDropdown } from "../core/ui-dropdown";
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base";
import { InputWrapper } from "./input-wrapper";

// TODO: missing funtionality
/**
 * 1. When drop opens check for selected to scrollTo
 * 2. When drop closes check if reset query to selected label or blank
 * 3. Add key events
 */

const KEY_DOWN = 40;
const KEY_UP = 38;
const BACKSPACE = 8;
const ENTER = 13;

@autoinject()
@customElement("ui-select")
@viewResources(InputWrapper)
export class UISelect extends BaseInput {
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

  private template;
  private innerOptions;

  private multiple: boolean = false;
  private dropEl: UIDropdown;

  private valueEl: Element;

  private inputValue: string = "";
  private isLoaded = false;
  private isLoading = false;
  private isGrouped = false;
  private ignoreChange = false;

  constructor(
    protected element: Element,
    private container: Container,
    private compiler: ViewCompiler
  ) {
    super(element);
    this.dropHandle = "caret";
    this.multiple = element.hasAttribute("multiple");

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

  protected valueChanged() {
    if (this.ignoreChange) {
      return;
    }
    if (this.options && !isNull(this.value)) {
      if (this.multiple) {
        this.model = this.options.filter(o => this.value.includes(o[this.valueProperty] || o));
      } else {
        this.model = this.options.find(o => (o[this.valueProperty] || o) === this.value);
        this.resetQuery();
      }
    }
  }

  protected clear(): void {
    this.model = null;
    this.value = null;
    this.inputValue = "";
    this.inputEl.focus();
    this.loadOptions();
  }

  protected filterOptions(): void {
    if (this.query) {
      this.fetchOptions(this.inputValue);
    } else {
      const query = this.inputValue.ascii().toLowerCase();
      const options = this.options.filter(o =>
        o[this.labelProperty]
          .toString()
          .ascii()
          .toLowerCase()
          .includes(query)
      );
      this.buildOptions(options);
    }
  }

  protected selectOption(model: AnyObject): void {
    this.ignoreChange = true;
    if (this.multiple) {
      this.value = this.value
        ? [...this.value, model[this.valueProperty] || model]
        : [model[this.valueProperty] || model];
      this.model = this.model ? [...this.model, model] : [model];
      this.inputEl.focus();
      this.inputEl.select();
    } else {
      this.value = model[this.valueProperty] || model;
      this.model = model;
      this.resetQuery();
    }
    this.element.dispatchEvent(UIInternal.createEvent("change", this.value));
    this.element.dispatchEvent(UIInternal.createEvent("select", this.model));
    setTimeout(() => (this.ignoreChange = false), 500);
  }

  protected removeValue(model: AnyObject): void {
    this.ignoreChange = true;
    this.model = [...this.model.filter(m => m !== model)];
    this.value = this.value.filter(m => m !== (model[this.valueProperty] || model));
    setTimeout(() => (this.ignoreChange = false), 500);
  }

  protected listClass(option): string {
    const classes = ["ui-list__item"];
    if (!this.multiple && (option[this.valueProperty] || option) === this.value) {
      classes.push("ui-list__item--selected");
    } else if (
      this.multiple &&
      this.value &&
      this.value.includes(option[this.valueProperty] || option)
    ) {
      classes.push("ui-list__item--disabled");
    }
    return classes.join(" ");
  }

  protected canToggleDrop(evt: FocusEvent): void {
    if (evt.relatedTarget && evt.relatedTarget !== this.inputEl) {
      this.toggleDrop(false);
    }
  }

  protected toggleDrop(open?: boolean): void {
    if (open === true && this.dropEl.isOpen) {
      UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
      return;
    }
    const beforeEvent = this.dropEl.isOpen && !open ? "beforeclose" : "beforeopen";
    const afterEvent = this.dropEl.isOpen && !open ? "close" : "open";
    if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
      this.dropEl.toggleDrop(open);
      if (this.dropEl.isOpen) {
        this.isLoading = true;
        this.inputEl.select();
        this.loadOptions();
      } else {
        this.resetQuery();
      }
      this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
    }
  }

  private resetQuery(): void {
    if (this.multiple) {
      this.inputValue = "";
    } else {
      this.inputValue = this.model
        ? (this.model[this.labelProperty] || this.model).replace("<u>", "").replace("</u>", "")
        : "";
    }
  }

  private async fetchOptions(query?: string) {
    this.showLoading();
    const result = await this.query({ query });
    this.buildOptions(result || []);
  }

  private loadOptions(): void {
    if (this.query) {
      this.fetchOptions();
    } else {
      this.buildOptions(this.options);
    }
  }

  private showLoading() {
    this.isLoaded = false;
    this.isLoading = true;
    this.innerOptions = [];
    UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
  }

  private buildOptions(options: AnyObject[]): void {
    this.showLoading();
    const optionsClone = options.map(o => (isString(o) ? `${o}` : { ...o }));
    UIInternal.queueTask(() => {
      this.isLoading = false;
      this.innerOptions = this.groupProperty
        ? optionsClone.sortBy([this.groupProperty, this.labelProperty]).groupBy(this.groupProperty)
        : [...optionsClone];
      this.isLoaded = true;
      UIInternal.queueTask(() => {
        const selected = this.dropEl.vmElement.querySelector(".ui-list__item--selected");
        if (selected) {
          selected.scrollIntoView({ inline: "nearest" });
        }
      });
      UIInternal.queueTask(() => this.dropEl.updatePosition());
    });
  }

  private markOption(option: AnyObject): void {
    let lbl = option[this.labelProperty] || `${option}`;
    if (isEmpty(this.inputValue)) {
      return lbl;
    }
    // options.forEach(o => {
    const rx = new RegExp(this.inputValue, "i");
    const asc = lbl.toString().ascii();
    if (rx.test(asc)) {
      const start = asc.search(rx);
      lbl =
        lbl.substr(0, start) +
        "<u>" +
        lbl.substr(start, this.inputValue.length) +
        "</u>" +
        lbl.substr(start + this.inputValue.length);
    }
    // });
    return lbl;
  }

  private buildOption(option: AnyObject, el: Element, unmark: boolean = false): boolean {
    if (el) {
      el.innerHTML = "";
      const tpl = this.template
        ? this.template.outerHTML
        : `<template><div innerhtml.bind="$label"></div></template>`;
      const viewFactory = this.compiler.compile(tpl);
      const view = viewFactory.create(this.container);
      const model = {
        $label: unmark ? option[this.labelProperty] || option : this.markOption(option),
        $model: option,
        $value: option[this.labelProperty] || option
      };
      if (typeof option === "object") {
        Object.assign(model, option);
      }
      view.bind(model);
      view.appendNodesTo(el);
    }
    return true;
  }

  private checkKeyEvent($event: KeyboardEvent): boolean {
    if ([KEY_DOWN, KEY_UP].includes($event.keyCode)) {
      $event.stopEvent();
    } else if (this.dropEl.isOpen && $event.keyCode === ENTER) {
      $event.stopEvent();
    } else if (this.multiple && $event.keyCode === BACKSPACE) {
      if (this.model.length > 0 && this.query.length === 0) {
        $event.stopEvent();
        this.removeValue(this.model.last());
      }
    } else {
      this.fireEnter($event);
    }
    return true;
  }
}
