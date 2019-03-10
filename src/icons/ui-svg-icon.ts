/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import Icons from "./ui-icons.json";

@containerless()
@customElement("ui-svg-icon")
@inlineView(
  `<template><svg ref="vmElement" slot="svg-icon" class="ui-icon ui-svg-icon \${class}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d.bind="iconPath" /></svg></template>`
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
