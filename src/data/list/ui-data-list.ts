/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView, processContent, View } from "aurelia-framework";
import { UIInternal } from "../../utils/ui-internal";
import view from "./ui-data-list.html";

@customElement("ui-data-list")
@processContent(false)
@inlineView(view)
export class UIDataList {
  @bindable()
  public dataSource;

  private readonly template;
  private owningView;

  constructor(element: Element) {
    this.template = element.querySelector("template");
    if (element.hasAttribute("vertical")) {
      element.classList.add("ui-datalist--vertical");
    }
  }

  // Set current owningView
  protected created(owningView: View) {
    this.owningView = owningView;
  }

  protected compileTemplate(el: Element, record: KeyValue): boolean {
    if (el) {
      const tpl = `<template>${this.template.innerHTML}</template>`;
      const model = {
        $record: record
      };

      const tplView = UIInternal.compileTemplate(tpl, model, this.owningView.bindingContext);
      tplView.insertNodesBefore(el);
      tplView.attached();
      el.remove();
    }
    return true;
  }
}
