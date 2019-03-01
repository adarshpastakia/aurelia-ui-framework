/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";

export class PanelPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected panelHtml = `<template>

  <ui-panel label="..." icon="...">
    <ui-content ui-scroll ui-padding>....</ui-content>
  </ui-panel>

  <ui-panel ui-theme="dark">
    <ui-header label="...">
      <ui-header-icon ui-bg="black" icon="..."></ui-header-icon>
      <ui-header-actions>
        <ui-button type="tool" icon="..."></ui-button>
      </ui-header-actions>
    </ui-header>
    <ui-content ui-scroll ui-padding>....</ui-content>
    <ui-footer>...</ui-footer>
  </ui-panel>

</template>`;

  protected panelAttrs = {
    title: "ui-panel",
    attrs: [
      {
        name: "ui-theme",
        values: "theme value",
        description: "Apply theme to the panel header"
      },
      {
        name: "label",
        values: "string",
        description: "Header label"
      },
      {
        name: "icon",
        values: "string",
        description: "Header icon"
      },
      {
        name: "width",
        default: "unset",
        values: "px | em | rem",
        description: "Fixed width"
      },
      {
        name: "min-width",
        default: "16rem",
        values: "px | em | rem",
        description: "Minimum width"
      },
      {
        name: "max-width",
        default: "100vw",
        values: "px | em | rem",
        description: "Maximum width"
      },
      {
        name: "height",
        default: "unset",
        values: "px | em | rem",
        description: "Fixed height"
      },
      {
        name: "min-height",
        default: "unset",
        values: "px | em | rem",
        description: "Minimum height"
      },
      {
        name: "max-height",
        default: "100vh",
        values: "px | em | rem",
        description: "Maximum height"
      },
      {
        name: "collapsed",
        default: "false",
        values: "true | false",
        description: "Collapse sidebar"
      },
      {
        name: "closeable",
        values: "<b>none</b>",
        description: "Enable close"
      },
      {
        name: "collapsible",
        values: "<b>none</b>",
        description: "Enable collapse"
      }
    ],
    events: [
      {
        name: "close",
        params: "null",
        description: "Panel closed"
      },
      {
        name: "beforeclose",
        params: "null",
        description:
          "Close tag, return false to prevent. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      }
    ]
  };
}
