/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-page")
@inlineView(`<template class="ui-page au-animate animate-slide-in-right animate-slide-out-left" role="main">
  <div class="ui-page__title" if.bind="pageTitle">\${pageTitle}</div>
  <slot name="page-alert"></slot>
  <div class="ui-page__body"><slot></slot></div>
</template>`)
export class UIPage {
  @bindable()
  public pageTitle: string = "";
}
