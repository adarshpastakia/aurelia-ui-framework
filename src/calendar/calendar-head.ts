/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
import view from "./calendar-head.html";

@customElement("calendar-head")
@inlineView(view)
export class CalendarHead {
  public static TITLE = "title";

  @bindable()
  public showFirstLast: boolean = false;
  @bindable()
  public disablePrev: boolean = false;
  @bindable()
  public disableNext: boolean = false;
  @bindable()
  public disableFirst: boolean = false;
  @bindable()
  public disableLast: boolean = false;
}
