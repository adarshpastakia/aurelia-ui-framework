/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bindable, child, computedFrom, customElement, inlineView } from "aurelia-framework";
import { IMenuItems } from "../menus/ui-menus";
import { UIDrop } from "../shared/ui-drop";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-button.html";

@customElement("ui-button")
@inlineView(view)
export class UIButton {
  /**
   * Button icon
   */
  @bindable()
  public icon: string = "";
  /**
   * Href for link type buttons
   */
  @bindable()
  public href: string = "";
  /**
   * Button label, used when button had dropdown
   */
  @bindable()
  public label: string = "";
  /**
   * Button size
   */
  @bindable()
  public size: "nm" | "sm" | "md" | "lg" = "nm";
  /**
   * Button type
   */
  @bindable()
  public type: "default" | "outline" | "solid" | "tool" = "default";
  /**
   * Button id
   */
  @bindable()
  public id: string = "";

  /**
   * Busy indicator
   */
  @bindable()
  public busy: boolean = false;
  /**
   * Active button
   */
  @bindable()
  public active: boolean = false;
  /**
   * Disabled
   */
  @bindable()
  public disabled: boolean = false;

  /**
   * Menu items to create auto dropdown
   */
  @bindable()
  public menuItems: IMenuItems[] | (() => IMenuItems[]);

  /*** Start private props ***/
  @child("div.ui-drop")
  protected elDropdown: Element;
  protected hasDrop: boolean = false;
  protected dropEl: UIDrop;

  protected badgeEl: HTMLAnchorElement;

  protected split: boolean = false;

  private elDisabled: boolean = false;

  /*** End private props ***/

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
      this.hasDrop = !!this.elDropdown || !!this.dropEl;
      if (this.hasDrop) {
        if (!this.dropEl) {
          this.dropEl = getSlotViewModel(this.elDropdown) as UIDrop;
        }
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

  protected fireClick($event): boolean {
    if (this.isDisabled || this.busy) {
      $event.stopEvent();
      return false;
    }
    if (!this.href) {
      if (this.hasDrop && !this.split) {
        return this.toggleDrop();
      } else {
        $event.stopEvent();
        return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
      }
    }
  }

  private toggleDrop(): boolean {
    const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
    const afterEvent = this.dropEl.isOpen ? "close" : "open";
    if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
      this.dropEl.toggleDrop();
      this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
    }
    return true;
  }
}
