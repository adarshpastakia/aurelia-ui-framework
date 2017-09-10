//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customAttribute, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';

class UIBadgeBase {
  constructor(element: Element, bg: string) {
    this.badgeEl = document.createElement('div');
    this.badgeEl.classList.add('ui-badge');
    // this.badgeEl.classList.add('ui-hidden');
    this.badgeEl.classList.add(bg);
    if (element.nodeType == Node.ELEMENT_NODE)
      element.appendChild(this.badgeEl);
    if (element.nodeType == Node.COMMENT_NODE)
      element.previousSibling.appendChild(this.badgeEl);
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { this.valueChanged(this.value); }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  badgeEl;
  value = '';
  valueChanged(newValue) {
    this.badgeEl.classList[newValue ? 'remove' : 'add']('ui-hidden');
    this.badgeEl.innerHTML = newValue;
  }
}



@autoinject()
@customAttribute('badge')
export class UIBadge extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-dark')
  }
}

@autoinject()
@customAttribute('badge-primary')
export class UIBadgePrimary extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-primary')
  }
}

@autoinject()
@customAttribute('badge-secondary')
export class UIBadgeSecondary extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-secondary')
  }
}

@autoinject()
@customAttribute('badge-info')
export class UIBadgeInfo extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-info')
  }
}

@autoinject()
@customAttribute('badge-danger')
export class UIBadgeDanger extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-danger')
  }
}

@autoinject()
@customAttribute('badge-success')
export class UIBadgeSuccess extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-success')
  }
}

@autoinject()
@customAttribute('badge-warning')
export class UIBadgeWarning extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-bg-warning')
  }
}
