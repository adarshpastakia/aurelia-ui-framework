/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-section-head")
@inlineView(`<template class="ui-section__head"><slot></slot></template>`)
export class UISectionHead {}
