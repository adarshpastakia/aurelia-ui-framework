/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Countries } from "aurelia-ui-framework";

export class TreePage {
  protected treeHtml = `<template>

  <ui-tree-panel></ui-tree-panel>

</template>`;

  protected treeAttrs = {
    title: "ui-tree-panel",
    attrs: [],
    events: []
  };

  protected countryTree = [];

  constructor() {
    this.countryTree.push({
      children: [],
      iconClosed: "mdi mdi-folder-outline",
      iconOpen: "mdi mdi-folder-open",
      label: "No Items"
    });
    Countries.list.groupBy("continent").forEach((v, k) => {
      this.countryTree.push({
        children: v.map(c => ({
          icon: `ui-flag ${c.iso2}`,
          id: c.iso2,
          label: c.name,
          leaf: true
        })),
        expanded: k === "Asia",
        iconClosed: "mdi mdi-folder-outline",
        iconOpen: "mdi mdi-folder-open",
        label: k
      });
    });
  }
}
