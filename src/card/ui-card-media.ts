/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-card-media")
@inlineView("<template class='ui-card__media'><slot></slot></template>")
export class UICardMedia {
  constructor(protected element: Element) {
    if (element.hasAttribute("top")) {
      element.classList.add("ui-card__media--top");
    }
  }
}
