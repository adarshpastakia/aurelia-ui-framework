/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";
import { Countries } from "aurelia-ui-framework";
import zxcvbn from "zxcvbn";

export class InputPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected countries = Countries.list;
  protected calculateStrength = zxcvbn;

  protected inputHtml = `<template>
  
  <!-- Simple input -->
  <ui-field label="Simple Input">
    <ui-input value.bind="..."></ui-input>
  </ui-field>

  <!-- Input with icon prefix -->
  <ui-field label="Input Addon">
    <ui-input value.bind="...">
      <ui-input-addon icon="mdi mdi-account"></ui-input-addon>
    </ui-input>
  </ui-field>

  <!-- Input with button -->
  <ui-field label="Input Addon Button">
    <ui-input value.bind="..." type="password">
      <ui-input-addon>
        <ui-button sizd="sm" type="tool" icon="mdi mdi-eye" ui-tooltip="Show Password"></ui-button>
      </ui-input-addon>
    </ui-input>
  </ui-field>

</template>`;

  protected inputAttrs = {
    title: "ui-input",
    attrs: [
      {
        name: "value",
        values: "string",
        description: "Text input"
      },
      {
        name: "number",
        values: "number",
        description: "Numeric input"
      },
      {
        name: "type",
        values: "text | number | email | password | url",
        description: "Input type"
      },
      {
        name: "placeholder",
        values: "string",
        description: "Placeholder text"
      },
      {
        name: "maxlength",
        values: "number",
        description: "Maximum input length"
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
      {
        name: "counter",
        values: "<b>none</b>",
        description: "Show text counter"
      }
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
  protected phoneAttrs = {
    title: "ui-phone",
    attrs: [
      {
        name: "value",
        values: "string",
        description: "Phone number"
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
      }
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
  protected addonAttrs = {
    title: "ui-input-addon",
    attrs: [
      {
        name: "icon",
        values: "string",
        description: "Icon font class"
      },
      {
        name: "width",
        values: "px | em | rem",
        description: "Addon width"
      }
    ]
  };
}
