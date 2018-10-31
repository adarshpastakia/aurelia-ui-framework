/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, customElement, inlineView } from "aurelia-framework";

@autoinject()
@customElement("ui-card-title")
@inlineView("<template class='ui-card__title'><slot></slot></template>")
export class UICardTitle {
  constructor(private element: Element) {}
}

@autoinject()
@customElement("ui-card-meta")
@inlineView("<template class='ui-card__meta'><slot></slot></template>")
export class UICardMeta {
  constructor(private element: Element) {}
}

@autoinject()
@customElement("ui-card-list")
@inlineView("<template class='ui-card__list'><slot></slot></template>")
export class UICardList {
  constructor(private element: Element) {}
}

@autoinject()
@customElement("ui-card-content")
@inlineView("<template class='ui-card__content'><slot></slot></template>")
export class UICardContent {
  constructor(private element: Element) {
    if (element.hasAttribute("fill")) {
      element.classList.add("ui-card__content--fill");
    }
  }
}

@autoinject()
@customElement("ui-card-media")
@inlineView("<template class='ui-card__media'><slot></slot></template>")
export class UICardMedia {
  constructor(private element: Element) {
    if (element.hasAttribute("top")) {
      element.classList.add("ui-card__media--top");
    }
  }
}
