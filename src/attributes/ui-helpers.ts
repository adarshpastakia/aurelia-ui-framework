/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
// tslint:disable
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
    /*** Get element viewModel, if containerless must contain ref=vmElement ***/
    const vm = getViewModel(this.element);
    if (vm && vm.vmElement) {
      el = vm.vmElement;
    }
    /*** Check is valid HTMLElement and has classList prop ***/
    if (el.classList) {
      /*** Remove old className ***/
      if (this.oldValue && !this.singular) {
        this.oldValue.split(" ").forEach(p => el.classList.remove(`${this.prefix}--${p.trim()}`));
      } else {
        el.classList.remove(`${this.prefix}`);
      }
      /*** Set current as oldValue to clear later ***/
      this.oldValue = this.value;
      /*** Add new className ***/
      if (this.value && !this.singular) {
        this.value.split(" ").forEach(p => el.classList.add(`${this.prefix}--${p.trim()}`));
      } else if (!isFalse(this.value)) {
        el.classList.add(`${this.prefix}`);
      }
    }
  }
}

@autoinject()
@customAttribute("ui-theme")
/**
 * Set theme
 */
export class UITheme extends BaseAttribute {
  protected prefix = "ui-theme";
}

@autoinject()
@customAttribute("ui-bg")
/**
 * Set background color
 */
export class UIBg extends BaseAttribute {
  protected prefix = "ui-bg";
}

@autoinject()
@customAttribute("ui-color")
/**
 * Set text color
 */
export class UIColor extends BaseAttribute {
  protected prefix = "ui-color";
}

@autoinject()
@customAttribute("ui-hover")
/**
 * Set hover color
 */
export class UIHover extends BaseAttribute {
  protected prefix = "ui-hover";
}

@autoinject()
@customAttribute("ui-shadow")
/**
 * Set shadow level (0-4)
 */
export class UIShadow extends BaseAttribute {
  protected prefix = "ui-shadow";
}

@autoinject()
@customAttribute("ui-padding")
/**
 * Set padding
 */
export class UIPadding extends BaseAttribute {
  protected prefix = "ui-padding";
}

@autoinject()
@customAttribute("ui-margin")
/**
 * Set margin
 */
export class UIMargin extends BaseAttribute {
  protected prefix = "ui-margin";
}

@autoinject()
@customAttribute("ui-border")
/**
 * Set border
 */
export class UIBorder extends BaseAttribute {
  protected prefix = "ui-border";
}

@autoinject()
@customAttribute("ui-font")
/**
 * Set font
 */
export class UIFont extends BaseAttribute {
  protected prefix = "ui-font";
}

@autoinject()
@customAttribute("ui-weight")
/**
 * Set font weight
 */
export class UIWeight extends BaseAttribute {
  protected prefix = "ui-weight";
}

@autoinject()
@customAttribute("ui-text")
/**
 * Set text transformation
 */
export class UIText extends BaseAttribute {
  protected prefix = "ui-text";
}

@autoinject()
@customAttribute("ui-align")
/**
 * Set text alignment
 */
export class UIAlign extends BaseAttribute {
  protected prefix = "ui-align";
}

@autoinject()
@customAttribute("ui-gutter")
/**
 * Set gutter spacing for responsive grid
 */
export class UIGutter extends BaseAttribute {
  protected prefix = "ui-gutter";
}

@autoinject()
@customAttribute("ui-hide")
/**
 * Set responsive hide
 */
export class UIHide extends BaseAttribute {
  protected prefix = "ui-hide";
}

@autoinject()
@customAttribute("ui-show")
/**
 * Set responsive show
 */
export class UIShow extends BaseAttribute {
  protected prefix = "ui-show";
}

@autoinject()
@customAttribute("ui-clip")
/**
 * Clip text lines
 */
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
@customAttribute("ui-line")
/**
 * Set line height
 */
export class UILine extends BaseAttribute {
  protected prefix = "ui-line";
  protected singular = true;

  protected bind(): void {
    super.bind();
    this.valueChanged();
  }

  protected valueChanged(): void {
    (this.element as HTMLElement).style.cssText = `line-height: ${this.value};`;
  }
}

@autoinject()
@customAttribute("ui-paper")
/**
 * Add paper styling
 */
export class UIPaper extends BaseAttribute {
  protected prefix = "ui-paper";
  protected singular = true;
}

@autoinject()
@customAttribute("ui-link")
/**
 * Add link styling
 */
export class UILink extends BaseAttribute {
  protected prefix = "ui-link";
  protected singular = true;
}

@autoinject()
@customAttribute("ui-scroll")
/**
 * Set scrolling
 */
export class UIScroll extends BaseAttribute {
  protected prefix = "ui-scroll";
}
