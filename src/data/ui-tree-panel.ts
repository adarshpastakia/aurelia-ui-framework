/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import {
  autoinject,
  bindable,
  customElement,
  inlineView,
  PLATFORM,
  viewResources
} from "aurelia-framework";
import { UITreeModel } from "../model/ui-tree-model";

@autoinject()
@customElement("ui-tree-panel")
@viewResources(PLATFORM.moduleName("./tree-node"))
@inlineView(`<template class="ui-tree__panel"><ui-field plain nolabel class="ui-tree__search" if.bind="searchable">
  <ui-input type="search" t="[placeholder]AUF.tree.search" placeholder="\${labelSearch}" clear value.bind="searchText" input.trigger="searchTextChanged(searchText) & debounce:200">
    <ui-input-addon class="ui-text-muted"><ui-icon icon="mdi mdi-magnify"></ui-icon></ui-input-addon></ui-input></ui-field>
  <div class="ui-tree__container" nodeclick.delegate="itemClicked($event.detail)" nodeover.delegate="itemOver($event.detail)" nodeout.delegate="itemOut($event.detail)">
    <tree-node virtual-repeat.for="child of rootNode.nodes" node.bind="child" tree.bind="$parent" index.bind="$index"></tree-node>
  </div></template>`)
export class UITreePanel {
  @bindable()
  public dataSource: KeyValue[];

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

  protected searchable = true;

  private rootNode: UITreeModel;

  constructor(protected element: Element) {}

  protected bind(): void {
    this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
  }

  protected dataSourceChanged(): void {
    this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
  }

  protected toggleExpand(index): void {
    this.rootNode.toggleExpand(index);
  }

  protected toggleMore(index): void {
    this.rootNode.toggleMore(index);
  }
}
