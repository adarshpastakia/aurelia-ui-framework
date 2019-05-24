/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { BaseInput } from "../forms/base-input";
import { UIInternal } from "../utils/ui-internal";

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
  protected isFiltered = false;
  protected ignoreChange = false;
  protected allowAny = false;

  protected hilightIndex = -1;

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
            return this.value === (o[this.valueProperty] || o);
          }
        });
      }
    } else {
      this.model = null;
      this.inputValue = "";
    }
    if (!this.dropEl) {
      UIInternal.queueTask(() => {
        const selected = this.listContainer.querySelector(".ui-list__item--selected");
        if (selected) {
          selected.scrollIntoView({ block: "nearest" });
        }
      });
    }
    this.resetQuery();
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

  protected loadOptions() {
    if (this.query) {
      this.fetchOptions();
    } else {
      this.buildOptions(this.options);
    }
  }

  protected filterOptions() {
    this.isFiltered = !!this.inputValue;
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

  protected selectOption(model) {
    this.ignoreChange = true;
    this.hilightIndex = -1;
    if (this.multiple) {
      if (!(this.value || []).includes(model[this.valueProperty] || model)) {
        this.value = this.value
          ? [...this.value, model[this.valueProperty] || model]
          : [model[this.valueProperty] || model];
        this.model = this.model ? [...this.model, model] : [model];
      }
      this.inputValue = "";
      this.inputEl.focus();
      this.inputEl.select();
    } else {
      if (this.labelProperty) {
        model.$label = model[this.labelProperty] || model;
      }
      this.value = model[this.valueProperty] || model;
      this.model = model;
      this.resetQuery();
      if (this.dropEl) {
        this.dropEl.closeDrop();
      }
    }
    if (this.isFiltered) {
      this.isFiltered = false;
      this.loadOptions();
    }
    this.element.dispatchEvent(UIInternal.createEvent("change", this.value));
    this.element.dispatchEvent(UIInternal.createEvent("select", this.model));
    setTimeout(() => (this.ignoreChange = false), 500);
  }

  protected removeOption(model) {
    this.ignoreChange = true;
    this.model = [...this.model.filter(m => m !== model)];
    this.value = this.value.filter(m => m !== (model[this.valueProperty] || model));
    setTimeout(() => (this.ignoreChange = false), 500);
  }

  protected resetQuery(clearFilter?: boolean) {
    this.hilightIndex = -1;
    if (this.multiple) {
      this.inputValue = "";
    } else {
      this.inputValue = this.model
        ? (this.model[this.labelProperty] || this.model).replace("<u>", "").replace("</u>", "")
        : "";
    }
    if (clearFilter && this.isFiltered) {
      this.isFiltered = false;
      this.loadOptions();
    }
  }

  protected clear() {
    this.model = null;
    this.value = null;
    this.inputValue = "";
    this.inputEl.focus();
    if (this.isFiltered) {
      this.loadOptions();
    }
  }

  protected listClass(option, index): string {
    const classes = ["ui-list__item"];
    option.__selected = false;
    if (!this.multiple) {
      if (this.matcher) {
        if (this.matcher({ option, value: this.value })) {
          option.__selected = true;
          classes.push("ui-list__item--selected");
        }
      } else if ((option[this.valueProperty] || option) === this.value) {
        option.__selected = true;
        classes.push("ui-list__item--selected");
      }
    } else if (this.multiple && this.value) {
      if (this.matcher) {
        this.value.forEach(value => {
          if (this.matcher({ option, value })) {
            option.__selected = true;
            classes.push("ui-list__item--disabled");
          }
        });
      } else if (this.value.includes(option[this.valueProperty] || option)) {
        option.__selected = true;
        classes.push("ui-list__item--disabled");
      }
    }
    if (this.hilightIndex === index) {
      classes.push("ui-list__item--hilight");
    }
    return classes.join(" ");
  }

  protected buildOption(option: AnyObject, el: Element, unmark: boolean = false): boolean {
    if (el) {
      el.innerHTML = "";
      const tpl = this.template
        ? this.template.outerHTML
        : `<template><div innerhtml.bind="$label"></div></template>`;
      const model = {
        $label:
          this.isFiltered && !unmark
            ? this.markOption(option)
            : option[this.labelProperty] || option,
        $model: option,
        $value: option[this.valueProperty] || option
      };
      // if (isObject(option)) {
      //   Object.assign(model, option);
      // }
      const view = UIInternal.compileTemplate(tpl, model);
      view.appendNodesTo(el);
    }
    return true;
  }

  protected checkKeyEvent($event: KeyboardEvent): boolean {
    if ([KEY_DOWN, KEY_UP].includes($event.keyCode)) {
      if (this.dropEl && !this.dropEl.isOpen) {
        this.dropEl.toggleDrop();
      }
      if ($event.keyCode === KEY_DOWN) {
        this.hilightIndex =
          this.hilightIndex === -1 && this.model
            ? this.innerOptions.indexOf(this.model)
            : this.hilightIndex >= this.innerOptions.length || this.hilightIndex < -1
            ? -1
            : this.hilightIndex;
        while (
          this.hilightIndex + 1 !== this.innerOptions.length &&
          (this.innerOptions[this.hilightIndex + 1].__type === "group" ||
            this.innerOptions[this.hilightIndex + 1].__selected ||
            this.innerOptions[this.hilightIndex + 1].__disabled)
          ) {
          this.hilightIndex++;
        }
        this.hilightIndex = this.hilightIndex + 1;
      }
      if ($event.keyCode === KEY_UP) {
        this.hilightIndex =
          this.hilightIndex === -1 && this.model
            ? this.innerOptions.indexOf(this.model)
            : this.hilightIndex === -1
            ? this.innerOptions.length
            : this.hilightIndex;

        while (
          this.hilightIndex - 1 > 0 &&
          (this.innerOptions[this.hilightIndex - 1].__type === "group" ||
            this.innerOptions[this.hilightIndex - 1].__selected ||
            this.innerOptions[this.hilightIndex - 1].__disabled)
          ) {
          this.hilightIndex--;
        }
        this.hilightIndex = this.hilightIndex - 1;
      }
      UIInternal.queueTask(() => {
        const selected = this.listContainer.querySelector(".ui-list__item--hilight");
        if (selected) {
          selected.scrollIntoView({ block: "nearest" });
        }
      });
      $event.stopEvent();
    } else if (this.hilightIndex !== -1 && $event.keyCode === ENTER) {
      this.selectOption(this.innerOptions[this.hilightIndex]);
      $event.stopEvent();
    } else if (this.allowAny && !!this.inputValue.trim() && $event.keyCode === ENTER) {
      this.selectOption(this.inputValue);
      $event.stopEvent();
    } else if (this.multiple && $event.keyCode === BACKSPACE) {
      if (this.model.length > 0 && this.inputValue.length === 0) {
        $event.stopEvent();
        this.removeOption(this.model.last());
      }
    } else {
      this.fireEnter($event);
    }
    return true;
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

      if (this.groupProperty) {
        const groups = optionsClone
          .sortBy([this.groupProperty, this.labelProperty])
          .groupBy(this.groupProperty);
        groups.forEach((items, label) =>
          this.innerOptions.push({ __type: "group", label }, ...items)
        );
      } else {
        this.innerOptions = optionsClone.sortBy(this.labelProperty);
      }
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
    return lbl;
  }
}
