/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";

@autoinject()
@customElement("ui-page")
@inlineView(`<template class="ui-page" role="main">
  <div class="ui-page__title" if.bind="pageTitle">\${pageTitle}</div>
  <div class="ui-page__body"><slot></slot></div>
</template>`)
export class UIPage {
  @bindable()
  public pageTitle: string = "";
}

@autoinject()
@customElement("ui-section")
@inlineView(`<template class="ui-section" role="main"><slot></slot></template>`)
export class UISection {
  constructor(element: Element) {
    if (element.hasAttribute("centered")) {
      element.classList.add("ui-section--centered");
    }
  }
}

@autoinject()
@customElement("ui-section-head")
@inlineView(`<template class="ui-section__head"><slot></slot></template>`)
export class UISectionHead {}

@autoinject()
@customElement("ui-section-foot")
@inlineView(`<template class="ui-section__foot"><slot></slot></template>`)
export class UISectionFoot {}

@autoinject()
@customElement("ui-content")
@inlineView(`<template class="ui-section__content" ref="vmElement"><slot></slot></template>`)
export class UIContent {}
