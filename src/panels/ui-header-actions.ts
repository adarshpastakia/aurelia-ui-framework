/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-header-actions")
@inlineView(`<template class="ui-header__actions"><slot></slot></template>`)
export class UIHeaderActions {
  constructor(protected element: Element) {}
}
