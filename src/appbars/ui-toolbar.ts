/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, customElement, inlineView } from "aurelia-framework";

@autoinject()
@customElement("ui-toolbar")
@inlineView(`<template class="ui-toolbar"><slot></slot></template>`)
export class UIToolbar {
  constructor(protected element: Element) {}
}
