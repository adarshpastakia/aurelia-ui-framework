/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { containerless, customElement, inlineView } from "aurelia-framework";

@containerless()
@customElement("ui-tabbar-start")
@inlineView(`<template><div slot="tabbar-start"><slot></slot></div></template>`)
export class UITabbarStart {
  constructor(protected element: Element) {}
}
