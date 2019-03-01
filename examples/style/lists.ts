/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Countries } from "aurelia-ui-framework";

export class ListsPage {
  protected countries = Countries.list;

  protected listClasses = {
    attrs:[
      { name: "data-style", default: "disc", values:"none | blank | check | cross | circle | square", description: "Unordered list style" },
    ],
    classes: [
      { name: "ui-dl--striped", description: "Striped definition list" },
      { name: "ui-dl--inline", description: "Inline definition list" },
      { name: "ui-table", description: "Styled table" }
    ]
  };
}
