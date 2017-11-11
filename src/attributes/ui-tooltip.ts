//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customAttribute, bindable, noView } from 'aurelia-framework';
import { UIEvent } from "../utils/ui-event";
import { UIUtils } from "../utils/ui-utils";

@noView()
export class UITooltipBase {
  static tooltipEl;

  constructor(public element: Element) { }
  attached() {
    if (!UITooltipBase.tooltipEl) {
      let el = UITooltipBase.tooltipEl = document.createElement('div');
      el.classList.add('ui-tooltip');
      UIUtils.overlayContainer.appendChild(el);
    }

    this.element.addEventListener('mouseenter', () => this.show());
    this.element.addEventListener('mouseleave', () => this.hide());
  }
  detached() { this.hide(); }
  unbind() { this.hide(); }

  theme = 'light';
  value = '';

  private tether;
  private timer;

  show() {
    if (isEmpty(this.value)) return;
    let el = UITooltipBase.tooltipEl;
    el.className = 'ui-tooltip ui-' + this.theme;
    el.innerHTML = this.value;
    this.tether = UIUtils.tether(this.element, el, { resize: false, position: 'tc' });
    this.timer = setTimeout(() => el.classList.add('ui-show'), 700);
  }
  hide() {
    clearTimeout(this.timer);
    if (this.tether) this.tether.dispose();
    UITooltipBase.tooltipEl.className = 'ui-tooltip';
    this.tether = null;
  }
}

@autoinject()
@customAttribute('tooltip')
export class UITooltip extends UITooltipBase {
  constructor(public element: Element) { super(element); }

  @bindable() theme = 'light';
  @bindable({ primaryProperty: true }) value = '';
}

@autoinject()
@customAttribute('tooltip-dark')
export class UITooltipDark extends UITooltipBase {
  constructor(public element: Element) {
    super(element);
    this.theme = 'dark';
  }
}

@autoinject()
@customAttribute('tooltip-primary')
export class UITooltipPrimary extends UITooltipBase {
  constructor(public element: Element) {
    super(element);
    this.theme = 'primary';
  }
}

@autoinject()
@customAttribute('tooltip-secondary')
export class UITooltipSecondary extends UITooltipBase {
  constructor(public element: Element) {
    super(element);
    this.theme = 'secondary';
  }
}
