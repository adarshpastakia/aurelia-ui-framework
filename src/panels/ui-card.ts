/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";

@autoinject()
@customElement("ui-card")
@inlineView(`<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth}'>
<slot name="panel-header"></slot>
<div class="ui-card__body"><slot></slot></div>
<slot name="panel-footer"></slot>
</template>`)
export class UICard {
  @bindable()
  public width: string = "auto";
  @bindable()
  public minWidth: string = "8rem";
  @bindable()
  public maxWidth: string = "100vw";

  constructor(protected element: Element) {}
}
