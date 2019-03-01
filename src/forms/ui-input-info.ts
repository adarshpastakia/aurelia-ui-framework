/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-input-info")
@inlineView(`<template class="ui-input__info"><slot></slot></template>`)
export class UIInputInfo {
  constructor(protected element: Element) {}
}
