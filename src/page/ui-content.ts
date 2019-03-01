/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-content")
@inlineView(`<template class="ui-section__content au-animate animate-slide-in-right animate-slide-out-left" ref="vmElement"><slot></slot></template>`)
export class UIContent {}
