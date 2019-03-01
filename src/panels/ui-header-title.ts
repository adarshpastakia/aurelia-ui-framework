/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-header-title")
@inlineView(
  `<template><div ref="vmElement" slot="header-title" class='ui-header__title'><slot></slot></div></template>`
)
export class UIHeaderTitle {
  constructor(protected element: Element) {}
}
