/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";
import { Colors } from "../resources/colors";

export class TagPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };
  protected colors = ["default", ...Colors.base, ...Colors.light, ...Colors.light];

  protected tagHtml = `<template>
  <ui-tag click.trigger="fn()">...</ui-tag>

  <ui-tag label="..." click.trigger="fn()">...</ui-tag>

  <ui-tag label="..." click.trigger="fn()">
    <img slot="avatar"/>
    ...
  </ui-tag>
</template>`;

  protected tagAttrs = {
    title: "ui-tag",
    attrs: [
      {
        name: "ui-theme",
        values: "theme value",
        description: "See theme helper for usage"
      },
      {
        name: "id",
        values: "string",
        description: "Tag id to be passed as detail for events"
      },
      {
        name: "type",
        default: "normal",
        values: "normal | solid",
        description: "Tag type"
      },
      {
        name: "size",
        default: "nm",
        values: "sm | nm | md | lg",
        description: "Tag size"
      },
      {
        name: "icon",
        values: "string",
        description: "Icon font class"
      },
      {
        name: "label",
        values: "string",
        description: "Tag label"
      },
      {
        name: "value",
        values: "string",
        description: "Tag value"
      },
      {
        name: "href",
        values: "string",
        description: "Href to create a link tag"
      },
      {
        name: "closeable",
        values: "<b>none</b>",
        description: "Allow tag to be removed"
      }
    ],
    events: [
      {
        name: "click",
        params: "id",
        description: "Tag click"
      },
      {
        name: "close",
        params: "null",
        description: "Tag removed"
      },
      {
        name: "beforeclose",
        params: "null",
        description:
          "Remove tag, return false to prevent. To return a promise use <code>.call</code> instead of <code>.trigger</code>"
      }
    ]
  };
}
