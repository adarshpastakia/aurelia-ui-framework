/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, child, customElement, inlineView } from "aurelia-framework";
import { UIDrop } from "../shared/ui-drop";
import { UIInternal } from "../utils/ui-internal";
import view from "./ui-menu-item.html";

@customElement("ui-menu-item")
@inlineView(view)
export class UIMenuItem {
  @bindable()
  public label: string = "";
  @bindable()
  public href: string = "";
  @bindable()
  public icon: string = "";
  @bindable()
  public iconColor: string = "";
  @bindable()
  public id: string;

  @bindable()
  public active: boolean = false;
  @bindable()
  public disabled: boolean = false;

  protected split: boolean;
  protected dropIcon: string = "caret";
  protected isInMenubar: boolean = false;

  @child(".ui-drop")
  protected elDropdown: Element;
  protected hasDrop: boolean = false;
  protected dropEl: UIDrop;

  protected badgeEl: HTMLAnchorElement;

  constructor(protected element: Element) {
    this.split = element.hasAttribute("split");
  }

  protected attached() {
    UIInternal.queueTask(() => {
      this.hasDrop = !!this.elDropdown;
      this.isInMenubar = hasParent(this.element, "ui-menu__bar");
      const isInDropdown = hasParent(this.element, "ui-drop__body");
      if (this.hasDrop) {
        this.dropEl = getSlotViewModel(this.elDropdown) as UIDrop;
        if (isInDropdown || !this.isInMenubar) {
          this.dropIcon = "page-next";
          this.dropEl.position = "tl";
          this.dropEl.anchorPosition = "tr";
          this.dropEl.stretch = false;
          this.dropEl.attachToViewport = isInDropdown;
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

  protected activeChanged(): void {
    if (this.active) {
      this.element.scrollIntoView({ block: "center", inline: "nearest" });
    }
  }

  protected fireClick($event: MouseEvent): boolean {
    if (!this.href) {
      if (this.hasDrop && !this.split) {
        return this.toggleDrop();
      }
      return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
    }
  }

  private toggleDrop(): boolean {
    const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
    const afterEvent = this.dropEl.isOpen ? "close" : "open";
    if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
      this.dropEl.toggleDrop();
      this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
    }
    return false;
  }
}
