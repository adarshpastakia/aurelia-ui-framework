/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, bindingMode, customElement, inlineView, viewResources } from "aurelia-framework";
import { UITreeModel, UITreeNode } from "../../models/ui-tree-model";
import { UIInternal } from "../../utils/ui-internal";
import { TreeNode } from "./tree-node";

@customElement("ui-tree-panel")
@viewResources(TreeNode)
@inlineView(`<template class="ui-tree__panel"><ui-field nolabel class="ui-tree__search" if.bind="searchable">
  <ui-input type="search" placeholder="\${labelSearch}" value.bind="searchText" 
  clear.trigger="searchTextChanged()" input.trigger="searchTextChanged(searchText) & debounce:200">
    <ui-input-addon class="ui-text-muted"><ui-icon icon="mdi mdi-magnify"></ui-icon></ui-input-addon></ui-input></ui-field>
  <div class="ui-tree__container" nodeclick.delegate="itemClicked($event.detail)" nodeover.delegate="itemOver($event.detail)" nodeout.delegate="itemOut($event.detail)">
    <tree-node virtual-repeat.for="child of rootNode.nodes" node.bind="child" tree.bind="$parent" index.bind="$index"></tree-node>
  </div></template>`)
export class UITreePanel {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: AnyObject = undefined;
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public model: AnyObject = undefined;

  @bindable()
  public options: KeyValue[];

  @bindable()
  public labelSearch: string = "Search...";
  @bindable()
  public labelEmpty: string = "No Items";
  @bindable()
  public labelLess: string = "Show Less...";
  @bindable()
  public labelMore: string = "Show More...";

  @bindable()
  public maxNodes: number;
  @bindable()
  public checkable: boolean | number = false;
  @bindable()
  public searchable: boolean = false;

  private rootNode: UITreeModel;

  constructor(protected element: Element) {
    this.checkable = element.hasAttribute("checkable");
    this.searchable = element.hasAttribute("searchable");
  }

  public select(node: UITreeNode) {
    if (this.checkable !== false) {
      if (node.level >= this.checkable) {
        node.toggleCheck();
        this.getCheckedValues();
        this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
      }
    } else {
      return UIInternal.fireCallbackEvent(this, "beforeselect").then(b =>
        b ? this.changeSelection(node) : false
      );
    }
  }

  protected bind(): void {
    this.rootNode = new UITreeModel(this.options, this.maxNodes);
  }

  protected optionsChanged(): void {
    this.rootNode = new UITreeModel(this.options, this.maxNodes);
  }

  protected toggleExpand(index): void {
    this.rootNode.toggleExpand(index);
  }

  protected toggleMore(index): void {
    this.rootNode.toggleMore(index);
  }

  protected toggleCheck(node): void {
    node.toggleCheck();
    this.getCheckedValues();
    this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
  }

  protected getCheckedValues() {
    this.value = [];
    this.model = [];
    this.rootNode.getChecked().forEach(checkedNode => {
      if (checkedNode.level >= this.checkable) {
        this.value.push(checkedNode.id);
        this.model.push(checkedNode.model);
      }
    });
  }

  protected searchTextChanged(query) {
    this.rootNode.filter(query);
  }

  private changeSelection(node) {
    this.value = node.id;
    this.model = node.model;
    this.element.dispatchEvent(UIInternal.createEvent("select", this.value));
  }
}
