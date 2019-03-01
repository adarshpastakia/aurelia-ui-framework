/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { containerless, inlineView, processContent } from "aurelia-framework";
import view from "./list-container.html";

@containerless()
@inlineView(view)
@processContent((compiler, resources, node, instruction) => {
  instruction.inheritBindingContext = true;
  return true;
})
export class ListContainer {}
