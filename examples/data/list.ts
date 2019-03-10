/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class DatalistPage {
  protected actions = [
    { icon: "mdi mdi-pencil", label: "Edit" },
    { icon: "mdi mdi-delete", iconColor: "red", label: "Delete" },
    "-",
    { icon: "mdi mdi-settings", iconColor: "gray", label: "Settings" }
  ];

  protected datalistHtml = `<template>

  <!-- TODO -->

</template>`;

  protected datalistAttrs = {
    title: "ui-datalist",
    attrs: [],
    events: []
  };
}
