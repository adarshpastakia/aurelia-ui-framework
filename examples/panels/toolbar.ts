/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";
import { Colors } from "../resources/colors";

export class ToolbarPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected colors = ["default", "dark", ...Colors.base];

  protected toolbarHtml = `<template>
  <ui-page / ui-section>
    <ui-section-head / ui-section-foot>

      <ui-toolbar>
        <ui-icon icon="..."></ui-icon>

        <ui-text>...</ui-text>

        <ui-filler></ui-filler>

        <ui-button click.trigger="fn()">...</ui-button>
        <ui-divider></ui-divider>
        <ui-button click.trigger="fn()">...</ui-button>
      </ui-toolbar>
      
    </ui-section-head / ui-section-foot>
  </ui-page / ui-section>
</template>`;

  protected toolbarAttrs = {
    title: "ui-toolbar",
    attrs: [
      {
        name: "ui-theme",
        values: "theme value",
        description: "See theme helper for usage"
      },
      {
        name: "align-end",
        values: "<b>none</b>",
        description: "Align items to the end"
      }
    ]
  };
}
