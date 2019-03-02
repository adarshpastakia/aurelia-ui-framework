/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Colors } from "../resources/colors";

export class ButtonPage {
  protected colors = ["default", ...Colors.base];

  protected crumbs = [
    { href: "/docs", icon: "mdi mdi-home", label: "Home" },
    { href: "/docs/form", label: "Forms" },
    { href: "/docs/inputs", label: "Inputs" },
    { href: "/docs/lists", label: "Lists" },
    { href: "/docs/button", label: "Buttons" },
    { href: "/docs/tags", label: "Tags" },
    { label: "Breadcrumbs" }
  ];

  protected breadcrumbHtml = `<template>
  <ui-breadcrumbs items="[...]">...</ui-breadcrumbs>
</template>`;

  protected breadcrumbAttrs = {
    title: "ui-breadcrumbs",
    attrs: [
      {
        name: "items",
        values: "[]",
        description: "Breadcrumb items"
      }
    ]
  };
}
