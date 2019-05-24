/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { bindable, containerless, customElement, inlineView } from "aurelia-framework";
import Icons from "./svg-icons.json";

@containerless()
@customElement("ui-svg-icon")
@inlineView(
  `<template><svg ref="vmElement" slot="svg-icon" class="ui-icon ui-svg-icon \${class}" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="\${viewBox}"><path d.bind="iconPath"></path></svg></template>`
)
export class UISvgIcon {
  @bindable()
  public icon: string = "";
  @bindable()
  public class: string = "";

  @bindable()
  public viewBox = "0 0 24 24";

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
