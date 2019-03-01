/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";
import { Colors } from "../resources/colors";

export class AlertPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };
  protected colors = ["default", ...Colors.base];

  protected alertHtml = `<template>
  <ui-page>
  
    <ui-alert close.trigger="fn()">...</ui-alert>
    
  </ui-page>
</template>`;

  protected alertAttrs = {
    title: "ui-alert",
    attrs: [
      {
        name: "ui-theme",
        values: "theme value",
        description: "See theme helper for usage"
      },
      {
        name: "type",
        values: "alert | confirm",
        description: "Alert type"
      },
      {
        name: "icon",
        values: "string",
        description: "Icon font class"
      },
      {
        name: "alert-title",
        values: "string",
        description: "Title"
      },
      {
        name: "ok-label",
        values: "string",
        description: "Label for ok button"
      },
      {
        name: "cancel-label",
        values: "string",
        description: "Label for cancel button"
      },
    ],
    events: [
      {
        name: "close",
        params: "null",
        description:
          "Close alert, return false to prevent. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      }
    ]
  };
}
