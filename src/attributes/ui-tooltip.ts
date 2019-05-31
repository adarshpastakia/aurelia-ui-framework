/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { autoinject, bindable, customAttribute } from "aurelia-framework";
import { UITether } from "../utils/ui-tether";

/*** Global tooltip container ***/
let TooltipEl: HTMLDivElement & { tether?: UITether.Tether };

/*** Id seed ***/
let seed = 0;

@autoinject()
@customAttribute("ui-tooltip")
export class UITooltip {
  /**
   * Tooltip value
   * `ui-tooltip="Tooltip string"`
   */
  @bindable({ primaryProperty: true })
  public value = "";

  /**
   * Tooltip theme
   * `ui-tooltip.bind="{theme:''; value:''}`
   */
  @bindable()
  public theme = "";

  /**
   * Tooltip position
   * @unused
   * @values "left" | "right" | "top" | "bottom"
   * `ui-tooltip.bind="{theme:''; value:''}`
   */
  @bindable()
  public position: "left" | "right" | "top" | "bottom" = "bottom";

  /*** Start private props ***/
  private id = `tooltip-${seed++}`;

  private timer;
  private parentEl: Element | HTMLElement;

  /*** End private props ***/

  constructor(protected element: Element) {
  }

  protected attached(): void {
    /*** Find parent element ***/
    if (this.element.nodeType === Node.ELEMENT_NODE) {
      this.parentEl = this.element;
    }
    if (this.element.nodeType === Node.COMMENT_NODE) {
      this.parentEl = this.element.previousElementSibling;
    }

    /*** Create tooltip container ***/
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

    /*** Attach event listeners ***/
    this.parentEl.addEventListener("mouseenter", this.showFn);
    this.parentEl.addEventListener("mouseleave", this.hideFn);
  }

  protected detached(): void {
    /*** Hide tooltip ***/
    this.hide();
    /*** Detach event listeners ***/
    this.parentEl.removeEventListener("mouseenter", this.showFn);
    this.parentEl.removeEventListener("mouseleave", this.hideFn);
  }

  protected show(): void {
    /*** Ignore if now value ***/
    if (isEmpty(this.value)) {
      return;
    }
    /*** Update tooltip container ***/
    TooltipEl.className = `ui-tooltip ui-theme--${this.theme}`;
    TooltipEl.innerHTML = this.value;
    TooltipEl.dataset.id = this.id;
    TooltipEl.dataset.pos = this.position;

    /*** Update tooltip tether ***/
    let anchorPosition: UITether.Position = "tc";
    let position: UITether.Position = "bc";
    switch (this.position) {
      case "right":
        anchorPosition = "cr";
        position = "cl";
        break;
      case "left":
        anchorPosition = "cl";
        position = "cr";
        break;
      case "bottom":
        anchorPosition = "bc";
        position = "tc";
        break;
    }
    TooltipEl.tether.updatePosition(this.parentEl, { position, anchorPosition });

    /*** Set display timeout ***/
    this.timer = setTimeout(() => (TooltipEl.dataset.open = "true"), 500);
  }

  protected hide() {
    /*** Clear display timeout ***/
    clearTimeout(this.timer);
    /*** Hide tooltip ***/
    TooltipEl.dataset.open = "false";
  }

  protected valueChanged() {
    /*** Update tooltip if visible tooltip is this.id ***/
    if (TooltipEl && TooltipEl.dataset.open === "true" && TooltipEl.dataset.id === this.id) {
      this.show();
    }
  }

  /*** Event handler callbacks ***/
  private showFn = () => this.show();
  private hideFn = () => this.hide();
}
