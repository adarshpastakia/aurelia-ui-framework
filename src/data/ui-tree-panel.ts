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
@inlineView(`<template class="ui-tree__panel"><ui-input-group class="ui-tree__search" if.bind="searchable">
  <ui-input type="search" t="[placeholder]Search" placeholder="\${labelSearch}" clear value.bind="searchText" input.trigger="searchTextChanged(searchText) & debounce:200"><ui-input-addon class="ui-text-muted" glyph="glyph-search"></ui-input-addon></ui-input></ui-input-group>
  <div class="ui-tree__container" nodeclick.delegate="itemClicked($event.detail)" nodeover.delegate="itemOver($event.detail)" nodeout.delegate="itemOut($event.detail)">
    <tree-node repeat.for="child of rootNode.children | sort:'label'" node.bind="child" tree.bind="$parent"></tree-node>
  </div></template>`)
export class UITreePanel {
  @bindable()
  public dataSource: UITreeModel[];

  private rootNode: UITreeModel;

  constructor(protected element: Element) {}

  protected bind(): void {
    this.rootNode = new UITreeModel({ children: this.dataSource });
  }

  protected dataSourceChanged(): void {
    this.rootNode = new UITreeModel({ children: this.dataSource });
  }
}
