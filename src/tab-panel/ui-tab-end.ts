/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-tabbar-end")
@inlineView(`<template><div slot="tabbar-end"><slot></slot></div></template>`)
export class UITabbarEnd {
  constructor(protected element: Element) {}
}
