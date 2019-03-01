/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class Responsive {
  protected gridHtml = `<template>
  <ui-container>
    <ui-row halign="..." valiagn="...">
      <ui-col size="auto">...</ui-col>
      <ui-col size="6@md 3@lg">...</ui-col>
      <ui-col size="fill">...</ui-col>
  </ui-container>
</template>`;

  protected containerAttrs = {
    title: "ui-container",
    attrs: [
      {
        name: "fluid",
        default: "",
        values: "<b>none</b>",
        description: "Full width container"
      },
      {
        name: "ui-gutter",
        default: "nm",
        values: "0 | xs | sm | nm | md | lg",
        description: "Gutter gap between columns"
      }
    ]
  };

  protected rowAttrs = {
    title: "ui-row",
    attrs: [
      {
        name: "halign",
        default: "start",
        values: "start | center | end | spaced | even",
        description: "Gutter gap between columns"
      },
      {
        name: "valign",
        default: "stretch",
        values: "top | middle | bottom | stretch",
        description: "Vertical layout"
      },
      {
        name: "vertical",
        default: "",
        values: "<b>none</b>",
        description: "Vertical layout"
      },
      {
        name: "reverse",
        default: "",
        values: "<b>none</b>",
        description: "Reverse the order of columns"
      },
      {
        name: "nowrap",
        default: "",
        values: "<b>none</b>",
        description: "Prevent wrapping"
      },
      {
        name: "ui-gutter",
        default: "0",
        values: "0 | xs | sm | nm | md | lg",
        description: "Gutter gap between columns. When placed within a container will take the gutter gap from the container"
      }
    ]
  };

  protected colAttrs = {
    title: "ui-col",
    attrs: [
      {
        name: "align",
        default: "stretch",
        values: "top | middle | bottom | stretch",
        description: "Vertical layout"
      },
      {
        name: "size",
        default: "100%",
        values: "auto | fill | [1-12] | [1-12]@[xs | sm | md | lg | xl | xxl]",
        description: "Resonsive width"
      },
      {
        name: "width",
        default: "unset",
        values: "px | em | rem | %",
        description: "Fixed width"
      },
      {
        name: "min-width",
        default: "unset",
        values: "px | em | rem | %",
        description: "Minimum width"
      },
      {
        name: "max-width",
        default: "unset",
        values: "px | em | rem | %",
        description: "Maximum width"
      },
      {
        name: "content-stretch",
        default: "",
        values: "<b>none</b>",
        description: "Stretch height of first-child to fill column. Useful when placing cards or panels within columns"
      }
    ]
  };
}
