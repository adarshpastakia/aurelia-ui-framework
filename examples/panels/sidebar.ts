/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";

export class SidebarPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected sidebarHtml = `<template>
  <ui-page / ui-section>
  
    <ui-sidebar label="Sidebar Title" resizeable>
    
      <ui-content / ui-section>...</ui-content / ui-section>

    </ui-sidebar>

    <ui-content>...</ui-content>
  </ui-page / ui-section>
</template>`;

  protected sidebarAttrs = {
    title: "ui-sidebar",
    attrs: [
      {
        name: "label",
        values: "string",
        description: "Titlebar label"
      },
      {
        name: "position",
        default: "start",
        values: "start | end",
        description: "Sidebar placement"
      },
      {
        name: "align",
        default: "top",
        values: "top | bottom",
        description: "Sidebar title placement"
      },
      {
        name: "width",
        default: "24rem",
        values: "px | em | rem",
        description: "Fixed width"
      },
      {
        name: "min-width",
        default: "4rem",
        values: "px | em | rem",
        description: "Minimum width"
      },
      {
        name: "max-width",
        default: "40vw",
        values: "px | em | rem",
        description: "Maximum width"
      },
      {
        name: "collapsed",
        default: "false",
        values: "true | false",
        description: "Collapse sidebar"
      },
      {
        name: "head-trigger",
        default: "peek",
        values: "peek | toggle",
        description: "Head trigger when collapsed. Peek to slideout, toggle to uncollapse"
      },
      {
        name: "title-bg",
        values: "color value",
        description: "Titlebar background"
      },
      {
        name: "title-color",
        values: "color value",
        description: "Titlebar color"
      },
      {
        name: "title-weight",
        values: "thin | normal | medium | bold",
        description: "Titlebar font weight"
      },
      {
        name: "resizeable",
        values: "<b>none</b>",
        description: "Enable resize"
      },
      {
        name: "collapsible",
        values: "<b>none</b>",
        description: "Enable collapse"
      }
    ]
  };
}
