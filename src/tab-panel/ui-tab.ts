/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";

let tabSeed = 0;

@customElement("ui-tab")
@inlineView(
  `<template class="ui-tab" data-active.bind="active" data-hide.bind="!!view || !!viewModel"><slot></slot></template>`
)
export class UITab {
  @bindable()
  public id: string = "";
  @bindable()
  public label: string = "";
  @bindable()
  public icon: string = "";
  @bindable()
  public active: boolean = false;
  @bindable()
  public disabled: boolean = false;

  @bindable()
  public view: AnyObject;
  @bindable()
  public model: AnyObject;
  @bindable()
  public viewModel: AnyObject;

  @bindable()
  public closeable: boolean = false;

  constructor(protected element: Element) {
    this.id = `tab__${tabSeed++}`;
  }

  protected bind() {
    this.closeable = !isFalse(this.closeable)
  }
}
