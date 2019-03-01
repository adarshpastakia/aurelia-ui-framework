/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-grid")
@inlineView(`<template class='ui-grid ui-grid--\${size}'><slot></slot></template>`)
export class UIGrid {
  @bindable()
  public size: string = "nm";

  constructor(protected element: Element) {}
}
