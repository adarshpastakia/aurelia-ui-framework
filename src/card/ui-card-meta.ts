/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-card-meta")
@inlineView("<template class='ui-card__meta'><slot></slot></template>")
export class UICardMeta {
  constructor(protected element: Element) {}
}
