/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { transient } from "aurelia-framework";
import { UIDrop } from "../core/ui-drop";
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";

const KEY_DOWN = 40;
const KEY_UP = 38;
const BACKSPACE = 8;
const ENTER = 13;

export class ListMaker extends BaseInput {
  public value: AnyObject = undefined;
  public model: AnyObject = undefined;

  public errors: string[];

  public name: string = "";
  public placeholder: string = "";

  public labelProperty: string = "";
  public valueProperty: string = "";
  public groupProperty: string = "";
  public query: ({ query }) => AnyObject[];
  public options: AnyObject[] = [];

  public readonly: boolean = false;
  public disabled: boolean = false;

  public noOptionsText: string = "No Options";

  protected template;
  protected innerOptions;

  protected multiple: boolean = false;
  protected listContainer: Element;

  protected valueEl: Element;

  protected inputValue: string = "";
  protected isLoaded = false;
  protected isLoading = false;
  protected isGrouped = false;
  protected ignoreChange = false;

  protected matcher: ({ option, value }) => boolean;

  protected valueChanged() {
    if (this.ignoreChange) {
      return;
    }
    if (!this.valueProperty) {
      this.model = this.value;
      if (!this.multiple) {
        this.inputValue = this.value ? this.value[this.labelProperty] || this.value : "";
      }
      return;
    }
    if (this.options && !isNull(this.value)) {
      if (this.multiple) {
        this.model = this.options.filter(o => {
          if (this.matcher) {
            return this.value.some(value => {
              return this.matcher({ option: o, value });
            });
          } else {
            return this.value.includes(o[this.valueProperty] || o);
          }
        });
      } else {
        this.model = this.options.find(o => {
          if (this.matcher) {
            return this.matcher({ option: o, value: this.value });
          } else {
            return this.value.includes(o[this.valueProperty] || o);
          }
        });
        this.resetQuery();
      }
    } else {
      this.inputValue = "";
      if (!this.dropEl) {
        this.loadOptions();
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
        (o[this.labelProperty] || o)
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
      if (this.labelProperty) {
        model.$label = model[this.labelProperty] || model;
      }
      this.value = model[this.valueProperty] || model;
      this.model = model;
      this.resetQuery();
    }
    if (!this.dropEl && this.query) {
      this.loadOptions();
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
    if (!this.multiple) {
      if (this.matcher) {
        this.matcher({ option, value: this.value })
          ? classes.push("ui-list__item--selected")
          : fn();
      } else if ((option[this.valueProperty] || option) === this.value) {
        classes.push("ui-list__item--selected");
      }
    } else if (this.multiple && this.value) {
      if (this.matcher) {
        this.value.forEach(value => {
          this.matcher({ option, value }) ? classes.push("ui-list__item--disabled") : fn();
        });
      } else if (this.value.includes(option[this.valueProperty] || option)) {
        classes.push("ui-list__item--disabled");
      }
    }
    return classes.join(" ");
  }

  protected toggleDrop(open?: boolean): boolean {
    if (this.dropEl) {
      if (open === true && this.dropEl.isOpen) {
        UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
        return;
      }
      if (super.toggleDrop(open)) {
        this.loadOptions();
      }
    }
  }

  protected loadOptions(): void {
    // TODO: Provide callback for fetching existing selected models
    if (this.query) {
      this.fetchOptions();
    } else {
      this.buildOptions(this.options);
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
    // TODO: Reset options for filtered lists only
  }

  private async fetchOptions(query?: string) {
    this.showLoading();
    const result = await this.query({ query });
    if (!this.options) {
      this.options = result;
    }
    this.buildOptions(result || []);
  }

  private showLoading() {
    this.isLoaded = false;
    this.isLoading = true;
    this.innerOptions = [];
    if (this.dropEl) {
      UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
    }
  }

  private buildOptions(options: AnyObject[], silent: boolean = false): void {
    if (!silent) {
      this.showLoading();
    }
    const optionsClone = options.map(o => (isString(o) ? `${o}` : { ...o }));
    UIInternal.queueTask(() => {
      this.isLoading = false;
      this.innerOptions = this.groupProperty
        ? optionsClone.sortBy([this.groupProperty, this.labelProperty]).groupBy(this.groupProperty)
        : [...optionsClone];
      this.isLoaded = true;
      UIInternal.queueTask(() => {
        const selected = this.listContainer.querySelector(".ui-list__item--selected");
        if (selected) {
          selected.scrollIntoView({ block: "nearest" });
        }
      });
      if (this.dropEl) {
        UIInternal.queueTask(() => this.dropEl.updatePosition());
      }
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
      const model = {
        $label: unmark ? option[this.labelProperty] || option : this.markOption(option),
        $model: option,
        $value: option[this.labelProperty] || option
      };
      if (isObject(option)) {
        Object.assign(model, option);
      }
      const view = UIInternal.compileTemplate(tpl, model);
      view.appendNodesTo(el);
    }
    return true;
  }

  private checkKeyEvent($event: KeyboardEvent): boolean {
    if ([KEY_DOWN, KEY_UP].includes($event.keyCode)) {
      // TODO: Add hilight and select functionality
      $event.stopEvent();
    } else if (this.dropEl && this.dropEl.isOpen && $event.keyCode === ENTER) {
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
