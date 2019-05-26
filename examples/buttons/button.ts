/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Colors } from "../resources/colors";

export class ButtonPage {
  protected colors = ["default", ...Colors.base];

  protected buttonHtml = `<template>
  <ui-button click.trigger="fn()">...</ui-button>

  <ui-button label="..." click.trigger="fn()">
    <ui-drop>...</ui-drop>
  </ui-button>
</template>`;

  protected buttonAttrs = {
    title: "ui-button",
    attrs: [
      {
        name: "ui-theme",
        values: "theme value",
        description: "See theme helper for usage"
      },
      {
        name: "id",
        values: "string",
        description: "Button id, used with toggle button group"
      },
      {
        name: "type",
        default: "normal",
        values: "normal | outline | solid | tool",
        description: "Button type"
      },
      {
        name: "size",
        default: "nm",
        values: "sm | nm | md | lg",
        description: "Button size"
      },
      {
        name: "icon",
        values: "string",
        description: "Icon font class"
      },
      {
        name: "label",
        values: "string",
        description: "Button label, use this attribute for buttons with dropdown"
      },
      {
        name: "href",
        values: "string",
        description: "Button href to create a link button"
      },
      {
        name: "disabled",
        default: "false",
        values: "boolean",
        description: "Disable button and prevent all actions"
      },
      {
        name: "busy",
        default: "false",
        values: "boolean",
        description: "Show busy icon"
      },
      {
        name: "block",
        values: "<b>none</b>",
        description: "Make a fullwidth button"
      },
      {
        name: "icon-end",
        values: "<b>none</b>",
        description: "Align icon to the end"
      },
      {
        name: "icon-top",
        values: "<b>none</b>",
        description: "Align icon to the top"
      },
      {
        name: "icon-hilight",
        values: "<b>none</b>",
        description: "Darken icon background"
      },
      {
        name: "no-caret",
        values: "<b>none</b>",
        description: "Hide caret for dropdown enabled buttons"
      },
      {
        name: "split",
        values: "<b>none</b>",
        description: "Add a split button for dropdown enabled buttons"
      }
    ],
    events: [
      {
        name: "click",
        params: "id",
        description: "Button click"
      },
      {
        name: "open",
        params: "null",
        description: "Button dropdown on open"
      },
      {
        name: "close",
        params: "null",
        description: "Button dropdown on close"
      },
      {
        name: "beforeopen",
        params: "null",
        description:
          "Button dropdown before open, return false to prevent open. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      },
      {
        name: "beforeclose",
        params: "null",
        description:
          "Button dropdown before close, return false to prevent close. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      }
    ]
  };

  protected dropAttrs = {
    title: "ui-drop",
    attrs: [
      {
        name: "close-on-click",
        default: "true",
        values: "true | false",
        description: "Close dropdown when clicked"
      },
      {
        name: "attach-to-viewport",
        values: "<b>none</b>",
        description:
          "Use this when the button is child of another dropdown, this will prevent the parent dropdown from closing when clicked"
      }
    ]
  };

  protected actionItems = () => new Promise(resolve => {
    setTimeout(() => resolve([
      { label: "Menu Item", icon: "mdi mdi-music" },
      { label: "Menu Item", icon: "mdi mdi-music" },
      {
        label: "Menu Item", icon: "mdi mdi-music", items: () => new Promise(resolvein => {
          setTimeout(() => resolvein([
            { label: "Menu Item", icon: "mdi mdi-music" },
            { label: "Menu Item", icon: "mdi mdi-music" },
            { label: "Menu Item", icon: "mdi mdi-music" }
          ]), 2000);
        })
      }
    ]), 2000);
  });
}
