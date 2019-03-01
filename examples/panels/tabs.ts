/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";

export class TabPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected tabHtml = `<template>

  <ui-tab-panel>
    <ui-tab label="...">...</ui-tab>
    <ui-tab view="...">...</ui-tab>
    <ui-tab view-model="...">...</ui-tab>
  </ui-tab-panel>

</template>`;

  protected tabAttrs = {
    title: "ui-tab-panel",
    attrs: [
      {
        name: "tabs",
        default: "",
        values: "UITabConfig",
        description: "List of tabs passed via attribute or described in the panel body"
      },
      {
        name: "active",
        values: "string",
        description: "Active tab id"
      },
      {
        name: "align",
        default: "top",
        values: "top | bottom",
        description: "Align tabbar to bottom"
      },
      {
        name: "no-border",
        values: "<b>none</b>",
        description: "Borderless tab body"
      }
    ],
    events: [
      {
        name: "change",
        params: "id",
        description: "Tab changed"
      },
      {
        name: "beforechange",
        params: "{activeTab, newTab, activeViewModel}",
        description:
          "Berfore changing tab¬, return false to prevent. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      },
      {
        name: "close",
        params: "id",
        description: "Tab closed"
      },
      {
        name: "beforeclose",
        params: "id",
        description:
          "Close tab, return false to prevent. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      }
    ]
  };
}
