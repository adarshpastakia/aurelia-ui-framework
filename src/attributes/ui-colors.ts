//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customAttribute, bindable, noView } from 'aurelia-framework';
import { UIButton, UIButtonGroup } from "../elements/inputs/ui-button";

@noView()
export class UIColorBase {
  constructor(public element: Element) {
    if (element['au'] && element['au'].controller) this.vm = element['au'].controller.viewModel;
    if (element.nodeType == Node.ELEMENT_NODE) {
      this.parentEl = element;
    }
    if (element.nodeType == Node.COMMENT_NODE) {
      this.parentEl = element.previousSibling;
    }
  }

  vm;
  parentEl;
  prefix = '';
  value = 'default';

  attached() {
    this.valueChanged(this.value);
  }

  valueChanged(newTheme, oldTheme = '') {
    let el;
    if (this.vm instanceof UIButton) {
      if (!this.vm.buttonEl) return;
      el = this.vm.buttonEl;
      if (!this.vm.splitTheme || this.vm.splitTheme === oldTheme) this.vm.splitTheme = newTheme;
    }
    else if (this.vm instanceof UIButtonGroup) {
      if (!this.vm.buttons) return;
      this.vm.buttons.forEach(b => {
        b.element.classList.remove(`ui-${oldTheme}`);
        b.element.classList.add(`ui-${newTheme}`);
      });
    }
    else {
      el = this.element;
    }
    if (el && el.classList) {
      el.classList.remove(`ui-${this.prefix}${oldTheme}`);
      el.classList.add(`ui-${this.prefix}${newTheme}`);
    }
  }
}

@autoinject()
@customAttribute('theme')
export class UIColorTheme extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
}
@autoinject()
@customAttribute('primary')
export class UIThemePrimary extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'primary';
  }
}

@autoinject()
@customAttribute('secondary')
export class UIThemeSecondary extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'secondary';
  }
}

@autoinject()
@customAttribute('muted')
export class UIThemeMuted extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'muted';
  }
}

@autoinject()
@customAttribute('dark')
export class UIThemeDark extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'dark';
  }
}

@autoinject()
@customAttribute('info')
export class UIThemeInfo extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'info';
  }
}

@autoinject()
@customAttribute('danger')
export class UIThemeDanger extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'danger';
  }
}

@autoinject()
@customAttribute('success')
export class UIThemeSuccess extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'success';
  }
}

@autoinject()
@customAttribute('warning')
export class UIThemeWarning extends UIColorBase {
  constructor(public element: Element) {
    super(element);
  }
  bind() {
    this.value = 'warning';
  }
}


@autoinject()
@customAttribute('bg-theme')
export class UIColorThemeBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
}
@autoinject()
@customAttribute('bg-primary')
export class UIThemePrimaryBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'primary';
  }
}

@autoinject()
@customAttribute('bg-secondary')
export class UIThemeSecondaryBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'secondary';
  }
}

@autoinject()
@customAttribute('bg-muted')
export class UIThemeMutedBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'muted';
  }
}

@autoinject()
@customAttribute('bg-dark')
export class UIThemeDarkBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'dark';
  }
}

@autoinject()
@customAttribute('bg-light')
export class UIThemeLightBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'light';
  }
}

@autoinject()
@customAttribute('bg-info')
export class UIThemeInfoBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'info';
  }
}

@autoinject()
@customAttribute('bg-danger')
export class UIThemeDangerBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'danger';
  }
}

@autoinject()
@customAttribute('bg-success')
export class UIThemeSuccessBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'success';
  }
}

@autoinject()
@customAttribute('bg-warning')
export class UIThemeWarningBg extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'bg-';
  }
  bind() {
    this.value = 'warning';
  }
}



@autoinject()
@customAttribute('text-theme')
export class UIColorThemeText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
}
@autoinject()
@customAttribute('text-primary')
export class UIThemePrimaryText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'primary';
  }
}

@autoinject()
@customAttribute('text-secondary')
export class UIThemeSecondaryText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'secondary';
  }
}

@autoinject()
@customAttribute('text-muted')
export class UIThemeMutedText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'muted';
  }
}

@autoinject()
@customAttribute('text-dark')
export class UIThemeDarkText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'dark';
  }
}

@autoinject()
@customAttribute('text-light')
export class UIThemeLightText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'light';
  }
}

@autoinject()
@customAttribute('text-info')
export class UIThemeInfoText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'info';
  }
}

@autoinject()
@customAttribute('text-danger')
export class UIThemeDangerText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'danger';
  }
}

@autoinject()
@customAttribute('text-success')
export class UIThemeSuccessText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'success';
  }
}

@autoinject()
@customAttribute('text-warning')
export class UIThemeWarningText extends UIColorBase {
  constructor(public element: Element) {
    super(element);
    this.prefix = 'text-';
  }
  bind() {
    this.value = 'warning';
  }
}
