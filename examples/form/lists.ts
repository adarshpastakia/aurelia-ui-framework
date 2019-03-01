/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";
import { Countries } from "aurelia-ui-framework";

export class InputPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected countries = Countries.list;

  protected listHtml = `<template>
  
  <!-- Simple input -->
  <ui-field label="Simple Input">
    <ui-list options.bind="[]" value.bind="..."></ui-input>
  </ui-field>

</template>`;

  protected selectAttrs = {
    title: "ui-select",
    attrs: [
      {
        name: "value",
        values: "string",
        description: "Text input"
      },
      {
        name: "placeholder",
        values: "string",
        description: "Placeholder text"
      },
      {
        name: "options",
        values: "Array<AnyObject>",
        description: "Options list"
      },
      {
        name: "query",
        values: "({query}) => OptionsArray",
        description: "Query callback"
      },
      {
        name: "value-property",
        values: "string",
        description: "Value property"
      },
      {
        name: "display-property",
        values: "string",
        description: "Display text property"
      },
      {
        name: "group-property",
        values: "string",
        description: "Grouping property"
      },
      {
        name: "readonly",
        values: "boolean",
        description: "Readonly input"
      },
      {
        name: "disabled",
        values: "boolean",
        description: "Disable input"
      },
      {
        name: "clear",
        values: "<b>none</b>",
        description: "Show clear button"
      },
    ],
    events: [
      {
        name: "change",
        params: "null",
        description: "Input change"
      },
      {
        name: "clear",
        params: "null",
        description: "Input cleared"
      },
      {
        name: "enterpressed",
        params: "null",
        description: "Enter key pressed"
      }
    ]
  };
}
