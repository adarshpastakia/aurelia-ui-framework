/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("x-blockquote")
@inlineView(`<template class="x-blockquote \${type}">
<div class="x-blockquote__icon"><i class="mdi \${icon}"></i></div>
<div class="x-blockquote__body"><slot></slot></div>
</template>`)
export class Blockquote {
  @bindable()
  public type: "info" | "alert" | "warning" = "info";

  get icon() {
    switch (this.type) {
      case "warning":
        return "mdi-alert";
      case "alert":
        return "mdi-alert-circle";
      default:
        return "mdi-information";
    }
  }
}
