/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { children, computedFrom } from "aurelia-framework";

let NODE_ID = 0;

export class UITreeModel {
  public id: string;

  public icon: string;
  public label: string;

  public iconOpen: string;
  public iconClosed: string;

  public children: UITreeModel[] = [];

  public leaf: boolean;
  public checked: number;
  public expanded: boolean;
  public selected: boolean;
  public disabled: boolean;

  constructor(model: AnyObject, private parent?: UITreeModel) {
    this.id = model.id || `node__${NODE_ID++}`;
    this.label = model.label;

    this.icon = model.icon;
    this.iconOpen = model.iconOpen;
    this.iconClosed = model.iconClosed;

    this.leaf = model.leaf;
    this.disabled = model.disabled;

    if (model.children) {
      this.children = model.children.map(child => new UITreeModel(child, this));
    }
  }

  @computedFrom("leaf", "icon", "expanded", "iconOpen", "iconClosed")
  get nodeIcon() {
    return (this.leaf ? this.icon : this.expanded ? this.iconOpen : this.iconClosed) || this.icon;
  }

  @computedFrom("checked")
  get checkIcon() {
    return this.checked === 2 ? "tree-check-half" : this.checked ? "tree-check-on" : "tree-check-off";
  }

  @computedFrom("expanded")
  get expandIcon() {
    return this.expanded ? "tree-collapse" : "tree-expand";
  }

  protected toggleCheck() {
    this.checked = this.checked ? 0 : 1;
    this.children.forEach((c: UITreeModel) => {
      c.updateChild("checked", this.checked);
    });
    if (this.parent && this.parent.updatePartial) {
      this.parent.updatePartial();
    }
  }

  private updatePartial() {
    const allChecked = this.children.every(node => node.checked === 1);
    const allUnchecked = this.children.every(node => node.checked === 0);
    this.checked = allChecked ? 1 : allUnchecked ? 0 : 2;
    if (this.parent && this.parent.updatePartial) {
      this.parent.updatePartial();
    }
  }

  private updateChild(prop, v) {
    this[prop] = v;
    this.children.forEach((c: UITreeModel) => {
      c.updateChild(prop, v);
    });
  }
}
