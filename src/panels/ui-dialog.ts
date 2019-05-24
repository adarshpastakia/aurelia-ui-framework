/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, computedFrom, customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-dialog.html";

@customElement("ui-dialog")
@inlineView(view)
export class UIDialogElement {
  @bindable()
  public label = "Dialog";
  @bindable()
  public icon = "";

  @bindable()
  public width: string = "50vw";
  @bindable()
  public minWidth: string = "36rem";
  @bindable()
  public maxWidth: string = "100%";
  @bindable()
  public height: string = "50vh";
  @bindable()
  public minHeight: string = "32rem";
  @bindable()
  public maxHeight: string = "100%";

  @bindable({ defaultBindingMode: bindingMode.toView })
  public help: boolean | (() => void) = false;
  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public modal: boolean = false;
  @bindable({ defaultBindingMode: bindingMode.toView })
  public closeable: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.toView })
  public maximizable: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.toView })
  public minimizable: boolean = true;
  @bindable({ defaultBindingMode: bindingMode.toView })
  public hideToolbox: boolean = false;

  @bindable()
  public beforeclose: () => Promise<boolean> | boolean;

  public returnPromise: (arg: { result?: AnyObject; cancelled?: boolean }) => void;

  protected active: boolean = true;
  protected minimized: boolean = false;
  protected maximized: boolean = false;

  private position = {
    bottom: "auto",
    left: "0",
    right: "auto",
    top: "0"
  };

  private taskButton;

  constructor(protected element: Element) {
    this.help = element.hasAttribute("help.trigger");
  }

  public cancel(): void {
    this.close();
  }

  public close(result?: AnyObject): void {
    UIInternal.broadcast("dlg:close", { dialog: this, result });
  }

  public minimize(): void {
    this.minimized = !this.minimized;
    this.active = !this.minimized;
    UIInternal.broadcast("dlg:minimize", { dialog: this });
  }

  public activate(): void {
    UIInternal.broadcast("dlg:activate", { dialog: this });
  }

  protected bind(): void {
    if (this.modal) {
      this.position = { bottom: "auto", left: "auto", right: "auto", top: "auto" };
    }
  }

  protected attached(): void {
    if (!this.modal) {
      const iconEl = this.element.querySelector(".ui-header__icon .ui-icon");
      if (iconEl) {
        this.icon = iconEl.au.controller.viewModel.icon;
      }
      this.taskButton = UIInternal.compileTemplate(
        `<template><ui-button size="sm" ui-theme="primary" type.bind="active?'solid':'default'" label.bind="label" icon.bind="icon"></ui-button></template>`,
        this
      );
    }
  }

  protected startDrag($event: MouseEvent): void {
    if ($event.button === 0) {
      $event.stopEvent();
      UIInternal.broadcast("dlg:drag", {
        dialog: this,
        startX: $event.x || $event.clientX,
        startY: $event.y || $event.clientY
      });
    }
  }

  @computedFrom(
    "width",
    "minWidth",
    "maxWidth",
    "height",
    "minHeight",
    "maxHeight",
    "minimized",
    "maximized",
    "position.left",
    "position.top"
  )
  get css() {
    const pos = {
      height: this.height,
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      minHeight: this.minHeight,
      minWidth: this.minWidth,
      width: this.width,
      ...this.position
    };

    if (this.maximized) {
      pos.top = pos.left = pos.right = pos.bottom = "0";
      pos.width = pos.height = "auto";
    }

    return pos;
  }
}
