/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, computedFrom, customElement, inlineView } from "aurelia-framework";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import { UIInternal } from "../utils/ui-internal";
import view from "./time-page.html";

@customElement("time-page")
@inlineView(view)
export class TimePage {
  @bindable()
  public time: Date = new Date();

  constructor(private element: Element) {}

  @computedFrom("time")
  get hour(): string {
    const hr = getHours(this.time);
    return `${hr === 0 || hr === 12 ? 12 : hr > 12 ? hr - 12 : hr}`;
  }
  set hour(hour: string) {
    const newHr = parseInt(hour === "12" ? "0" : hour, 10);
    const hr = getHours(this.time);
    this.time = setHours(this.time, hr < 12 ? newHr : newHr + 12);
    this.fireChange();
  }

  @computedFrom("time")
  get minute(): number {
    return getMinutes(this.time);
  }
  set minute(min: number) {
    this.time = setMinutes(this.time, min);
    this.fireChange();
  }

  @computedFrom("time")
  get ampm() {
    return getHours(this.time) < 12 ? "am" : "pm";
  }
  protected switchAmpm() {
    const hr = getHours(this.time);
    this.time = setHours(this.time, hr < 12 ? hr + 12 : hr - 12);
    this.fireChange();
  }

  private fireChange() {
    this.element.dispatchEvent(UIInternal.createEvent("change", this.time));
  }
}
