/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, computedFrom, customElement, noView, processContent, View } from "aurelia-framework";
import { UIFormat } from "aurelia-ui-framework";
import { format } from "date-fns";
import { parseDate } from "../../calendar/calendar-utils";
import { UIInternal } from "../../utils/ui-internal";

interface ICallbackModel {
  value: string;
  record: KeyValue;
}

@customElement("ui-column")
@processContent(false)
@noView()
export class UIColumn {
  @bindable()
  public dataId: string;

  @bindable()
  public label: string = "";

  @bindable()
  public width: string = "250px";
  @bindable()
  public minWidth: string = "80px";
  @bindable()
  public maxWidth: string = "420px";

  /**
   * Process value
   */
  @bindable()
  public value: ((model: ICallbackModel) => string | number | boolean | Date);
  /**
   * Format value
   */
  @bindable()
  public format: string | ((model: ICallbackModel) => string);

  @bindable()
  public type: "text" | "number" | "date" | "time" | "datetime" | "currency" | "url" = "text";

  @bindable()
  public align: "start" | "center" | "end" = "start";

  @bindable()
  public locked: false | "start" | "end" = false;

  public template;

  /*** Start private props ***/
  private resizeable: boolean = false;
  private sortable: boolean = false;

  private owningView;

  /*** End private props ***/


  constructor(private element: Element) {
    this.template = element.querySelector("template");

    this.sortable = element.hasAttribute("sortable");
    this.resizeable = element.hasAttribute("resizeable");
  }

  public compileCell(el: Element, record: KeyValue): boolean {
    if (el) {
      el.innerHTML = "";
      const tpl = this.template
        ? this.template.outerHTML
        : `<template><div innerhtml.bind="$value"></div></template>`;
      const model = {
        $record: record,
        $value: this.processValue(record)
      };

      const view = UIInternal.compileTemplate(tpl, model, this.owningView.bindingContext);
      view.appendNodesTo(el);
    }
    return true;
  }

  // Set current owningView
  protected created(owningView: View) {
    this.owningView = owningView;
  }

  protected bind() {
    if (!this.template && !this.label) {
      this.label = this.element.innerHTML || "";
    }
  }

  @computedFrom("width", "minWidth", "maxWidth")
  get css() {
    return {
      width: this.width,
      minWidth: this.minWidth,
      maxWidth: this.maxWidth
    };
  }

  private processValue(record: KeyValue) {
    let value = record[this.dataId] || "";

    if (isFunction(this.value)) {
      value = this.value({ record, value });
    }

    if (isFunction(this.format)) {
      value = this.value({ record, value });
    } else {
      switch (this.type) {
        case "date":
          value = UIFormat.date(value, this.format);
          break;
        case "time":
          value = UIFormat.time(value, this.format);
          break;
        case "datetime":
          value = UIFormat.datetime(value, this.format);
          break;
        case "number":
          value = UIFormat.number(value, this.format);
          break;
        case "currency":
          value = UIFormat.currency(value, this.format);
          break;
      }
    }

    return value;
  }
}
