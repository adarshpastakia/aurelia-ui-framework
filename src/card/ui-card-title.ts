/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-card-title")
@inlineView("<template class='ui-card__title'><slot></slot></template>")
export class UICardTitle {
  constructor(protected element: Element) {}
}
