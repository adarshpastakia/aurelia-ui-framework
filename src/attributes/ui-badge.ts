//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customAttribute, bindable, noView } from 'aurelia-framework';

@noView()
export class UIBadgeBase {
  constructor(element: Element, bg: string) {
    this.badgeEl = document.createElement('div');
    this.badgeEl.classList.add('ui-badge');
    this.badgeEl.classList.add(bg);

    if (element.nodeType == Node.ELEMENT_NODE) {
      this.parentEl = element;
    }
    if (element.nodeType == Node.COMMENT_NODE) {
      this.parentEl = element.previousSibling;
    }
  }

  parentEl;
  attached() {
    if (this.parentEl.classList.contains('ui-button')) {
      this.parentEl.firstElementChild.appendChild(this.badgeEl);
    } else {
      this.parentEl.appendChild(this.badgeEl);
    }
    this.parentEl.classList.add('ui-has-badge');
  }

  bind(bindingContext: Object, overrideContext: Object) { this.valueChanged(this.value); }

  badgeEl;
  value = '';
  valueChanged(newValue) {
    this.badgeEl.classList[newValue ? 'remove' : 'add']('ui-hidden');
    this.badgeEl.dataset['value'] = newValue;
  }
}

@autoinject()
@customAttribute('badge')
export class UIBadge extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-gray')
  }

  @bindable() theme = 'gray';
  @bindable({ primaryProperty: true }) value = '';

  bind() {
    this.valueChanged(this.value);
    this.badgeEl.className = `ui-badge ui-${this.theme}`
  }
  themeChanged(newValue) {
    this.badgeEl.className = `ui-badge ui-${newValue}`
  }
}

@autoinject()
@customAttribute('badge-dark')
export class UIBadgeDark extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-dark')
  }
}

@autoinject()
@customAttribute('badge-primary')
export class UIBadgePrimary extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-primary')
  }
}

@autoinject()
@customAttribute('badge-secondary')
export class UIBadgeSecondary extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-secondary')
  }
}

@autoinject()
@customAttribute('badge-info')
export class UIBadgeInfo extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-info')
  }
}

@autoinject()
@customAttribute('badge-danger')
export class UIBadgeDanger extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-danger')
  }
}

@autoinject()
@customAttribute('badge-success')
export class UIBadgeSuccess extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-success')
  }
}

@autoinject()
@customAttribute('badge-warning')
export class UIBadgeWarning extends UIBadgeBase {
  constructor(public element: Element) {
    super(element, 'ui-warning')
  }
}
