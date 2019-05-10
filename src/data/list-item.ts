/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { autoinject, inlineView } from "aurelia-framework";
import view from "./list-item.html";

@autoinject()
@inlineView(view)
export class ListItem {
  protected vmElement;
}
