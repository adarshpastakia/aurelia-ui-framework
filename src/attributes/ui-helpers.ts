/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { autoinject, customAttribute } from "aurelia-framework";

@autoinject()
class BaseAttribute {
  protected prefix: string = "";
  protected value: string = "default";
  protected oldValue: string = "default";
  protected singular: boolean = false;

  constructor(protected element: Element) {}

  protected bind(): void {
    this.toggleClass();
  }

  protected valueChanged(): void {
    this.toggleClass();
  }

  protected toggleClass(): void {
    let el = this.element;
    const vm = getViewModel(this.element);
    if (vm && vm.vmElement) {
      el = vm.vmElement;
    }
    if (el.classList) {
      if (this.oldValue && !this.singular) {
        this.oldValue.split(",").forEach(p => el.classList.remove(`${this.prefix}--${p.trim()}`));
      } else {
        el.classList.remove(`${this.prefix}`);
      }
      this.oldValue = this.value;
      if (this.value && !this.singular) {
        this.value.split(",").forEach(p => el.classList.add(`${this.prefix}--${p.trim()}`));
      } else if (!isFalse(this.value)) {
        el.classList.add(`${this.prefix}`);
      }
    }
  }
}

@autoinject()
@customAttribute("ui-theme")
export class UITheme extends BaseAttribute {
  protected prefix = "ui-theme";
}

@autoinject()
@customAttribute("ui-bg")
export class UIBg extends BaseAttribute {
  protected prefix = "ui-bg";
}

@autoinject()
@customAttribute("ui-color")
export class UIColor extends BaseAttribute {
  protected prefix = "ui-color";
}

@autoinject()
@customAttribute("ui-hover")
export class UIHover extends BaseAttribute {
  protected prefix = "ui-hover";
}

@autoinject()
@customAttribute("ui-padding")
export class UIPadding extends BaseAttribute {
  protected prefix = "ui-padding";
}

@autoinject()
@customAttribute("ui-margin")
export class UIMargin extends BaseAttribute {
  protected prefix = "ui-margin";
}

@autoinject()
@customAttribute("ui-border")
export class UIBorder extends BaseAttribute {
  protected prefix = "ui-border";
}

@autoinject()
@customAttribute("ui-font")
export class UIFont extends BaseAttribute {
  protected prefix = "ui-font";
}

@autoinject()
@customAttribute("ui-weight")
export class UIWeight extends BaseAttribute {
  protected prefix = "ui-weight";
}

@autoinject()
@customAttribute("ui-text")
export class UIText extends BaseAttribute {
  protected prefix = "ui-text";
}

@autoinject()
@customAttribute("ui-align")
export class UIAlign extends BaseAttribute {
  protected prefix = "ui-align";
}

@autoinject()
@customAttribute("ui-gutter")
export class UIGutter extends BaseAttribute {
  protected prefix = "ui-gutter";
}

@autoinject()
@customAttribute("ui-hide")
export class UIHide extends BaseAttribute {
  protected prefix = "ui-hide";
}

@autoinject()
@customAttribute("ui-show")
export class UIShow extends BaseAttribute {
  protected prefix = "ui-show";
}

@autoinject()
@customAttribute("ui-clip")
export class UIClip extends BaseAttribute {
  protected prefix = "ui-clip";
  protected singular = true;

  protected bind(): void {
    super.bind();
    this.valueChanged();
  }

  protected valueChanged(): void {
    (this.element as HTMLElement).style.cssText = `--line-clamp: ${this.value};`;
  }
}

@autoinject()
@customAttribute("ui-paper")
export class UIPaper extends BaseAttribute {
  protected prefix = "ui-paper";
  protected singular = true;
}

@autoinject()
@customAttribute("ui-scroll")
export class UIScroll extends BaseAttribute {
  protected prefix = "ui-scroll";
}
