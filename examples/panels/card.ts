/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";

export class CardPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected cardHtml = `<template>

  <ui-card>
    <ui-card-media><img .../></ui-card-media>
    <ui-card-title>...</ui-card-title>
    <ui-card-meta>...</ui-card-meta>
    <ui-card-content ui-scroll ui-padding>....</ui-card-content>
    <ui-card-list>....</ui-card-list>
  </ui-card>

</template>`;

  protected cardAttrs = {
    title: "ui-card",
    attrs: [
      {
        name: "width",
        default: "unset",
        values: "px | em | rem",
        description: "Fixed width"
      },
      {
        name: "min-width",
        default: "8rem",
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
      }
    ]
  };
}
