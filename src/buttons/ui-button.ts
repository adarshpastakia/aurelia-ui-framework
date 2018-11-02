/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bindable, child, computedFrom, customElement } from "aurelia-framework";
import { UIDrop } from "../core/ui-drop";
import { UIInternal } from "../utils/ui-internal";

@customElement("ui-button")
export class UIButton {
  @bindable()
  public icon: string = "";
  @bindable()
  public href: string = "";
  @bindable()
  public label: string = "";
  @bindable()
  public size: string = "nm";
  @bindable()
  public type: string = "default";
  @bindable()
  public value: string = "";

  @bindable()
  public busy: boolean = false;
  @bindable()
  public active: boolean = false;
  @bindable()
  public disabled: boolean = false;

  @child("div.ui-drop")
  protected elDropdown: Element;
  protected hasDrop: boolean = false;
  protected dropEl: UIDrop;

  protected badgeEl: HTMLAnchorElement;

  protected split: boolean = false;

  private elDisabled: boolean = false;

  constructor(public element: Element) {
    if (element.hasAttribute("icon-hilight")) {
      element.classList.add("ui-btn__icon--hilight");
    }
    if (element.hasAttribute("icon-end")) {
      element.classList.add("ui-btn__icon--end");
    }
    if (element.hasAttribute("icon-top")) {
      element.classList.add("ui-btn__icon--top");
    }
    if (element.hasAttribute("no-caret")) {
      element.classList.add("ui-btn__caret--hide");
    }
    if (element.hasAttribute("block")) {
      element.classList.add("ui-btn--block");
    }
    this.split = element.hasAttribute("split");
  }

  @computedFrom("disabled", "elDisabled")
  get isDisabled(): boolean {
    return this.disabled || this.elDisabled;
  }

  public disable(disabled: boolean): void {
    this.elDisabled = disabled;
  }

  protected attached() {
    UIInternal.queueTask(() => {
      this.hasDrop = !!this.elDropdown;
      if (this.hasDrop) {
        this.dropEl = getSlotViewModel(this.elDropdown) as UIDrop;
        this.dropEl.tether(this.element);
      }
    });

    this.hrefChanged();
  }

  protected hrefChanged(): void {
    if (this.badgeEl) {
      if (this.href) {
        this.badgeEl.href = this.href;
      } else if (this.badgeEl.attributes.getNamedItem("href")) {
        this.badgeEl.attributes.removeNamedItem("href");
      }
    }
  }

  protected fireClick($event: MouseEvent): boolean {
    if (!this.href) {
      $event.stopEvent();

      if (this.hasDrop && !this.split) {
        this.toggleDrop();
      }
      return this.element.dispatchEvent(UIInternal.createEvent("click", this.value));
    }
  }

  private toggleDrop(): void {
    const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
    const afterEvent = this.dropEl.isOpen ? "close" : "open";
    if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
      this.dropEl.toggleDrop();
      this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
    }
  }
}
