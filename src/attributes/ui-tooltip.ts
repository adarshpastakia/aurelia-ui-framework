/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, bindable, customAttribute } from "aurelia-framework";
import { UITether } from "../utils/ui-tether";

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
  private tooltipEl: HTMLElement;
  private tether: UITether.Tether;

  constructor(private element: Element) {}

  protected attached(): void {
    if (this.element.nodeType === Node.ELEMENT_NODE) {
      this.parentEl = this.element;
    }
    if (this.element.nodeType === Node.COMMENT_NODE) {
      this.parentEl = this.element.previousElementSibling;
    }

    this.tooltipEl = document.createElement("span");
    this.tooltipEl.innerHTML = `<div class='ui-tooltip ui-theme--${this.theme}'>${
      this.value
    }</div>`;
    this.tether = UITether.tether(
      this.parentEl,
      this.tooltipEl.firstElementChild as HTMLDivElement,
      {
        anchorPosition: "tc",
        attachToViewport: true,
        position: "bc",
        resize: false
      }
    );

    this.parentEl.addEventListener("mouseenter", this.showFn);
    this.parentEl.addEventListener("mouseleave", this.hideFn);
  }

  protected detached(): void {
    this.hide();
    this.parentEl.removeEventListener("mouseenter", this.showFn);
    this.parentEl.removeEventListener("mouseleave", this.hideFn);
    if (this.tether) {
      this.tether.dispose();
    }
    this.tether = null;
  }

  protected show(): void {
    if (isEmpty(this.value)) {
      return;
    }
    this.tether.updatePosition();
    this.timer = setTimeout(() => (this.tooltipEl.dataset.open = "true"), 700);
  }

  protected hide() {
    clearTimeout(this.timer);
    this.tooltipEl.dataset.open = "false";
  }

  private showFn = () => this.show();
  private hideFn = () => this.hide();
}
