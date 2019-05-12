/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { bindable, customElement, inlineView } from "aurelia-framework";
import { UICardContent } from "./ui-card-content";
import { UICardList } from "./ui-card-list";
import { UICardMedia } from "./ui-card-media";
import { UICardMeta } from "./ui-card-meta";
import { UICardTitle } from "./ui-card-title";

@customElement("ui-card")
@inlineView(`<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth, height, minHeight, maxHeight}'>
<slot name="panel-header"></slot>
<div class="ui-card__body"><slot></slot></div>
<slot name="panel-footer"></slot>
</template>`)
class UICard {
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

export const Card = [UICard, UICardContent, UICardMeta, UICardMedia, UICardList, UICardTitle];
