/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, customAttribute } from "aurelia-framework";
import { UITether } from "../utils/ui-tether";

let TooltipEl: HTMLDivElement & { tether?: UITether.Tether };

@autoinject()
@customAttribute("ui-tooltip")
export class UITooltip {
  @bindable({ primaryProperty: true })
  public value = "";
  @bindable()
  public theme = "";
  @bindable()
  public position = "";

  private timer;
  private parentEl: Element | HTMLElement;

  constructor(private element: Element) {}

  protected attached(): void {
    if (this.element.nodeType === Node.ELEMENT_NODE) {
      this.parentEl = this.element;
    }
    if (this.element.nodeType === Node.COMMENT_NODE) {
      this.parentEl = this.element.previousElementSibling;
    }

    if (!TooltipEl) {
      TooltipEl = document.createElement("div");
      TooltipEl.className = "ui-tooltip";
      TooltipEl.tether = UITether.tether(this.parentEl, TooltipEl, {
        anchorPosition: "tc",
        attachToViewport: true,
        position: "bc",
        resize: false
      });
    }

    this.parentEl.addEventListener("mouseenter", this.showFn);
    this.parentEl.addEventListener("mouseleave", this.hideFn);
  }

  protected detached(): void {
    this.hide();
    this.parentEl.removeEventListener("mouseenter", this.showFn);
    this.parentEl.removeEventListener("mouseleave", this.hideFn);
  }

  protected show(): void {
    if (isEmpty(this.value)) {
      return;
    }
    TooltipEl.className = `ui-tooltip ui-theme--${this.theme}`;
    TooltipEl.innerHTML = this.value;
    TooltipEl.tether.updatePosition(this.parentEl);
    this.timer = setTimeout(() => (TooltipEl.dataset.open = "true"), 700);
  }

  protected hide() {
    clearTimeout(this.timer);
    TooltipEl.dataset.open = "false";
  }

  private showFn = () => this.show();
  private hideFn = () => this.hide();
}
