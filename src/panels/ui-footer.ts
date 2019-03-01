/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-footer")
@inlineView(
  `<template><div class="ui-footer" slot="panel-footer" ref="vmElement"><slot></slot></template>`
)
export class UIFooter {
  constructor(protected element: Element) {}
}
