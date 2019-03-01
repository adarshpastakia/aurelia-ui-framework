/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("ui-card")
@inlineView(`<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth, height, minHeight, maxHeight}'>
<slot name="panel-header"></slot>
<div class="ui-card__body"><slot></slot></div>
<slot name="panel-footer"></slot>
</template>`)
export class UICard {
  @bindable()
  public width: string = "";
  @bindable()
  public minWidth: string = "8rem";
  @bindable()
  public maxWidth: string = "100vw";
  @bindable()
  public height: string = "";
  @bindable()
  public minHeight: string = "unset";
  @bindable()
  public maxHeight: string = "100vh";

  constructor(protected element: Element) {}
}
