/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";
import { Colors } from "../resources/colors";

export class IconsPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };
  protected colors = ["default", ...Colors.base, ...Colors.light, ...Colors.dark];

  protected iconHtml = `<template>
  <!-- Using with font based icons -->
  <ui-icon icon="mdi mdi-home"></ui-icon>
  <ui-icon icon="fa fa-home"></ui-icon>

  <!-- Using with other components -->
  <ui-button icon="mdi mdi-home">...</ui-button>
  <ui-menu-item icon="fa fa-home">...</ui-menu-item>

  <!-- Using with icon images -->
  <ui-icon><img src="..."/></ui-icon>

  <!-- Flag icons -->
  <ui-flag code="AE"></ui-flag>
</template>`;

  protected iconAttrs = {
    title: "ui-icon",
    attrs: [
      {
        name: "icon",
        values: "string",
        description: "Font icon class"
      },
      {
        name: "size",
        default: "nm",
        values: "sm | nm | md | lg",
        description: "Icon size"
      },
      {
        name: "round",
        values: "<b>none</b>",
        description: "Rounded icon"
      },
      {
        name: "flip-on-rtl",
        values: "<b>none</b>",
        description: "Flip horzontally for RTL display"
      }
    ]
  };
  protected flagAttrs = {
    title: "ui-flag",
    attrs: [
      {
        name: "code",
        values: "string",
        description: "ISO2 | IOS3 Country code"
      },
      {
        name: "size",
        default: "nm",
        values: "sm | nm | md | lg",
        description: "Icon size"
      },
      {
        name: "round",
        values: "<b>none</b>",
        description: "Rounded icon"
      }
    ]
  };
}
