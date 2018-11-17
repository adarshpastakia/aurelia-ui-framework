/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import Icons from "./ui-icons.json";

@customElement("ui-icon")
@inlineView(`<template ui-font.bind="size" class="ui-icon \${icon}"></template>`)
export class UIIcon {
  @bindable()
  public icon: string = "";
  @bindable()
  public size: string = "nm";

  constructor(protected element: Element) {
    if (element.hasAttribute("flip-on-rtl")) {
      element.classList.add("flip-on-rtl");
    }
  }
}

@customElement("ui-flag")
@inlineView(`<template ui-font.bind="size" class="ui-flag \${code}"></template>`)
export class UIFlag {
  @bindable()
  public code: string = "";
  @bindable()
  public size: string = "nm";
}

@containerless()
@customElement("ui-svg-icon")
@inlineView(
  `<template><svg ref="vmElement" slot="svg-icon" class="ui-icon \${class}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d.bind="iconPath" /></svg></template>`
)
export class UISvgIcon {
  @bindable()
  public icon: string = "";
  @bindable()
  public class: string = "";

  private iconPath: string = "";

  protected bind(): void {
    this.iconChanged();
  }

  protected iconChanged() {
    this.iconPath = Icons[this.icon];

    if (!this.iconPath) {
      this.iconPath = Icons.unknown;
    }
  }
}
