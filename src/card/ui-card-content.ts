/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-card-content")
@inlineView("<template class='ui-card__content'><slot></slot></template>")
export class UICardContent {
  constructor(protected element: Element) {
    if (element.hasAttribute("fill")) {
      element.classList.add("ui-card__content--fill");
    }
  }
}
