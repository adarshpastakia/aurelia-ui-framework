/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-card-list")
@inlineView("<template class='ui-card__list'><slot></slot></template>")
export class UICardList {
  constructor(protected element: Element) {}
}
