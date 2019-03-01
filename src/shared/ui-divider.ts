/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-divider")
@inlineView("<template class='ui-divider'><slot></slot></template>")
export class UIDivider {}
