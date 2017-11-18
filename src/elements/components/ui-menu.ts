//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, inlineView, containerless, child } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";

@autoinject()
@inlineView(`
<template class="ui-menubar">
  <div class="ui-menubar-wrapper" ref="wrapper"><slot></slot></div>
  <div class="ui-menubar-toggle" ref="overflowToggle" show.bind="isOverflow" click.trigger="showOverflow($event)"><ui-glyph glyph="glyph-handle-overflow"></ui-glyph></div>
  <div class="ui-menu ui-menubar-overflow ui-floating" ref="overflow"></div>
</template>`)
@customElement('ui-menubar')
export class UIMenubar {
  constructor(public element: Element) { }

  attached() {
    this.obResize = UIEvent.subscribe('windowresize', () => this.arrange());
    this.obClick = UIEvent.subscribe('mouseclick', (evt) => {
      if (getParentByClass(evt.target, 'ui-menubar-toggle') == this.element) return;
      this.overflow.classList.remove('ui-open');
    });
    this.tether = UIUtils.tether(this.element, this.overflow, { resize: false, position: 'br' });
    window.setTimeout(() => this.arrange(), 100);
  }
  detached() {
    this.tether.dispose();
    this.obClick.dispose();
    this.obResize.dispose();
  }

  private tether;
  private isOverflow = false;

  private wrapper: Element;
  private overflow: Element;
  private overflowToggle: Element;

  private obClick;
  private obResize;

  arrange() {
    this.overflow.classList.remove('ui-open');
    for (let i = 0, c = this.overflow['children']; i < c.length; i++) {
      this.wrapper.appendChild(c[i]);
    }
    //TODO: Implement fix for RTL
    if (this.isOverflow = (this.wrapper.lastElementChild.offsetLeft + this.wrapper.lastElementChild.offsetWidth > this.wrapper.offsetWidth)) {
      for (let c = this.wrapper['children'], i = c.length - 1; i >= 0; i--) {
        if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
          if (this.overflow.hasChildNodes) this.overflow.insertBefore(c[i], this.overflow.childNodes[0]); else this.overflow.appendChild(c[i]);
        }
      }
    }
  }
  showOverflow(evt) {
    if (evt.button != 0) return true;
    if (!this.overflow.classList.contains('ui-open')) {
      this.overflow.classList.add('ui-open');
      this.tether.position();
    }
    else
      this.overflow.classList.remove('ui-open');
  }
}

@autoinject()
@inlineView('<template class="ui-menu"><slot></slot></template>')
@customElement('ui-menu')
export class UIMenu {
  constructor(public element: Element) { }
}


@autoinject()
@inlineView('<template class="ui-menu-section-title"><slot></slot></template>')
@customElement('ui-menu-section')
export class UIMenuTitle {
  constructor(public element: Element) { }
}

@autoinject()
@inlineView('<template class="ui-menu-section ${collapsible?\'ui-collapsible\':\'\'} ${collapsed?\'ui-collapsed\':\'\'}"><div mouseup.trigger="toggleCollapse($event)" if.bind="label" class="ui-menu-section-title ${hasActive?\'ui-has-active\':\'\'}"><ui-glyph glyph="glyph-chevron-down" if.bind="collapsible"></ui-glyph><span innerhtml.bind="label"></span></div><div class="ui-menu-section-body"><slot></slot></div></template>')
@customElement('ui-menu-group')
export class UIMenuGroup {
  constructor(public element: Element) {
    this.collapsible = element.hasAttribute('collapsible');
  }

  @bindable() label = '';
  @bindable() collapsed = false;
  @bindable() collapsible = false;

  @child('ui-menu-item.ui-active') hasActive;

  toggleCollapse(event) {
    this.collapsed = !this.collapsed;
    event.stopPropagation();
    event.preventDefault();
    return false;
  }
}

@autoinject()
@containerless()
@inlineView(`<template><a class="ui-menu-item \${active?'ui-active':''} \${disabled?'ui-disabled':''} \${class}" href.bind="href" click.trigger="click($event)">
    <ui-glyph if.bind="glyph" class="ui-menu-icon \${glyph}" glyph.bind="glyph"></ui-glyph><span class="ui-menu-label"><slot></slot><small if.bind="description">\${description}</small></span></a></template>`)
@customElement('ui-menu-item')
export class UIMenuItem {
  constructor(public element: Element) { }

  bind(bindingContext: Object, overrideContext: Object) {
    this.active = !!(this.active);
    this.disabled = !!(this.disabled);
  }

  @bindable() id = '';
  @bindable() description = '';
  @bindable() glyph = '';
  @bindable() class = '';
  @bindable() active = false;
  @bindable() disabled = false;
  @bindable() href = 'javascript:void(0)';

  private click(evt) {
    if (evt.button != 0) return true;
    evt.cancelBubble = true;
    evt.stopPropagation();
    if (this.href !== 'javascript:void(0)') return true;
    return UIEvent.fireEvent('click', this.element, this.id);
  }
}
