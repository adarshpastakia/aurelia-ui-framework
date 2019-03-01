/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class TogglePage {
  protected toggleHtml = `<template>
  
  <!-- Checkboxes -->
  <ui-field label="Checkbox Group">
    <ui-option-group>
      <ui-checkbox checked.c="...">Label</ui-checkbox">
      ...
    </ui-option-group>
  </ui-field>

  <!-- Radios -->
  <ui-field label="Redio Group" value.bind="..." name="groupName">
    <ui-option-group>
      <ui-radio model.bind="...">Label</ui-radio">
      ...
    </ui-option-group>
  </ui-field>

  <!-- Toggles -->
  <ui-field label="Toggle Group">
    <ui-option-group>
      <ui-toggle model.bind="...">Label</ui-toggle">
      ...
    </ui-option-group>
  </ui-field>

</template>`;

  protected groupAttrs = {
    title: "ui-option-group",
    attrs: [
      {
        name: "value",
        values: "AnyObject",
        description: "Value of radio group"
      },
      {
        name: "name",
        values: "string",
        description: "Radio grouping name"
      },
      {
        name: "matcher",
        values: "(a,b) => boolean",
        description: "Value matcher"
      },
      {
        name: "disabled",
        values: "boolean",
        description: "Disable input"
      }
    ],
    events: [
      {
        name: "change",
        params: "null",
        description: "Check changed"
      }
    ]
  };
  protected checkboxAttrs = {
    title: "ui-checkbox",
    attrs: [
      {
        name: "checked",
        values: "boolean | AnyObject",
        description: "Checked"
      },
      {
        name: "model",
        values: "AnyObject",
        description: "Value when checked"
      },
      {
        name: "matcher",
        values: "(a,b) => boolean",
        description: "Value matcher"
      },
      {
        name: "disabled",
        values: "boolean",
        description: "Disable input"
      }
    ],
    events: [
      {
        name: "change",
        params: "null",
        description: "Check changed"
      }
    ]
  };
  protected radioAttrs = {
    title: "ui-radio",
    aattrs: [
      {
        name: "checked",
        values: "boolean",
        description: "Checked"
      },
      {
        name: "model",
        values: "AnyObject",
        description: "Value when checked"
      },
      {
        name: "name",
        values: "string",
        description: "Radio grouping name"
      },
      {
        name: "matcher",
        values: "(a,b) => boolean",
        description: "Value matcher"
      },
      {
        name: "disabled",
        values: "boolean",
        description: "Disable input"
      }
    ],
    events: [
      {
        name: "change",
        params: "null",
        description: "Check changed"
      }
    ]
  };
  protected toggleAttrs = {
    title: "ui-toggle",
    attrs: [
      {
        name: "checked",
        values: "boolean | AnyObject",
        description: "Checked"
      },
      {
        name: "model",
        values: "AnyObject",
        description: "Value when checked"
      },
      {
        name: "matcher",
        values: "(a,b) => boolean",
        description: "Value matcher"
      },
      {
        name: "disabled",
        values: "boolean",
        description: "Disable input"
      },
      {
        name: "label-on",
        values: "string",
        description: "On label"
      },
      {
        name: "label-off",
        values: "string",
        description: "Off label"
      },
      {
        name: "width",
        values: "px em rem",
        description: "Toggle switch width"
      }
    ],
    events: [
      {
        name: "change",
        params: "null",
        description: "Check changed"
      }
    ]
  };
}
