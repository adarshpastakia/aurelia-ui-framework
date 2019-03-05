/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { computedFrom } from "aurelia-framework";

let NODE_ID = 0;

export class UITreeModel {
  public children: UITreeNode[] = [];
  public nodes: UITreeNode[] = [];

  constructor(children: KeyValue[], private maxNodes = 0) {
    this.children = children.map(child => new UITreeNode(child));
    this.nodes = this.getExpandedTree(this.children.sortBy("label"));
  }

  public filter(query: string) {
    const filtered = this.filterNodes(this.children, query);
    this.nodes = this.getExpandedTree(filtered.sortBy("label"));
  }

  public toggleExpand(index: number): void {
    const node = this.nodes[index] as UITreeNode;
    node.expanded = !node.expanded;

    if (node.expanded) {
      let injectedChildren = node.children.sortBy("label");
      if (injectedChildren.length === 0) {
        injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
      }
      if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
        injectedChildren = [
          ...injectedChildren.slice(0, this.maxNodes),
          new UITreeNode({ id: "node-more", leaf: true }, node)
        ];
      }
      this.nodes = [
        ...this.nodes.slice(0, index + 1),
        ...injectedChildren,
        ...this.nodes.slice(index + 1)
      ];
    } else {
      let lastIndex = this.nodes.lastIndex(node.id, "parentId");
      while (this.nodes[lastIndex].expanded) {
        lastIndex = this.nodes.lastIndex(this.nodes[lastIndex].id, "parentId");
      }
      this.nodes = [...this.nodes.slice(0, index + 1), ...this.nodes.slice(lastIndex + 1)];
    }
  }

  public toggleMore(index: number): void {
    const node = this.nodes[index] as UITreeNode;
    node.showingMore = !node.showingMore;

    const parentIndex = this.nodes.index(node.parentId, "id");
    let injectedChildren = this.nodes[parentIndex].children.sortBy("label");
    if (!node.showingMore) {
      if (injectedChildren.length === 0) {
        injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
      }
      if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
        injectedChildren = [...injectedChildren.slice(0, this.maxNodes)];
      }
    }
    this.nodes = [
      ...this.nodes.slice(0, parentIndex + 1),
      ...injectedChildren,
      this.nodes[index],
      ...this.nodes.slice(index + 1)
    ];
  }

  public getChecked(): UITreeNode[] {
    const checked = [];
    this.getCheckedNodes(this.children, checked);
    return checked;
  }

  private getCheckedNodes(nodes, checked) {
    nodes.forEach(node => {
      if (node.checked === 1) {
        checked.push(node);
      }
      if (node.children) {
        this.getCheckedNodes(node.childNodes, checked);
      }
    });
  }

  private getExpandedTree(children) {
    const nodes = [];
    children.forEach(child => {
      nodes.push(child);
      if (child.expanded) {
        let injectedChildren = child.children.sortBy("label");
        if (injectedChildren.length === 0) {
          injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, child));
        }
        if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
          injectedChildren = [
            ...injectedChildren.slice(0, this.maxNodes),
            new UITreeNode({ id: "node-more", leaf: true }, child)
          ];
        }
        nodes.push(...this.getExpandedTree(injectedChildren));
      }
    });
    return nodes;
  }

  private filterNodes(nodes, query) {
    return nodes.filter(child => {
      let retVal =
        !query ||
        child.label
          .ascii()
          .toLocaleLowerCase()
          .includes(query.ascii().toLocaleLowerCase());
      if (!child.leaf) {
        child.filtered = this.filterNodes(child.childNodes, query);
        retVal = retVal || child.filtered.length > 0;
      }
      return retVal;
    });
  }
}

// tslint:disable-next-line
export class UITreeNode {
  @computedFrom("leaf", "icon", "expanded", "iconOpen", "iconClosed")
  get nodeIcon() {
    return (this.leaf ? this.icon : this.expanded ? this.iconOpen : this.iconClosed) || this.icon;
  }

  @computedFrom("checked")
  get checkIcon() {
    return this.checked === 2
      ? "tree-check-half"
      : this.checked
      ? "tree-check-on"
      : "tree-check-off";
  }

  @computedFrom("expanded")
  get expandIcon() {
    return this.expanded ? "tree-collapse" : "tree-expand";
  }

  public id: string;
  public icon: string;
  public label: string;
  public model: KeyValue;

  public iconOpen: string;
  public iconClosed: string;

  public childNodes: UITreeNode[] = [];
  public filtered: UITreeNode[] = null;

  public leaf: boolean;
  public parentId: string;
  public level: number = 0;
  public checked: number = 0;
  public expanded: boolean;
  public selected: boolean;
  public disabled: boolean;
  public showingMore: boolean;

  constructor(node: KeyValue, private parent?: UITreeNode) {
    this.id = node.id || `node__${NODE_ID++}`;
    this.label = node.label;
    this.model = node.model;

    this.icon = node.icon;
    this.iconOpen = node.iconOpen;
    this.iconClosed = node.iconClosed;

    this.leaf = !!node.leaf;
    this.expanded = node.expanded;
    this.disabled = node.disabled;

    if (parent) {
      this.level = parent.level + 1;
      this.parentId = parent.id;
    }

    if (node.children) {
      this.childNodes = node.children.map(child => new UITreeNode(child, this));
    }
  }

  get children() {
    return this.filtered || this.childNodes;
  }

  public toggleCheck() {
    this.checked = this.checked ? 0 : 1;
    this.children.forEach((c: UITreeNode) => {
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
    this.children.forEach((c: UITreeNode) => {
      c.updateChild(prop, v);
    });
  }
}
