/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-header-actions")
@inlineView(
  `<template><div ref="vmElement" slot="header-actions" class="ui-header__actions"><slot></slot></div></template>`
)
export class UIHeaderActions {
  constructor(protected element: Element) {}
}
