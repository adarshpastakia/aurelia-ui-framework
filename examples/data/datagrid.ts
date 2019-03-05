/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Countries } from "aurelia-ui-framework";

export class TreePage {
  protected treeHtml = `<template>

  <!-- TODO -->

</template>`;

  protected datagridAttrs = {
    title: "ui-datagrid",
    attrs: [],
    events: []
  };

  protected countries = Countries.list;
}
