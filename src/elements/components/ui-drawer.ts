//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, inlineView } from 'aurelia-framework';
import { UIEvent } from '../../utils/ui-event';

@autoinject()
@inlineView(`<template class="ui-drawer ui-drawer-\${position}">
  <div ref="contentEl" class="ui-drawer-content ui-row ui-row-v ui-align-stretch ui-nowrap \${contentClass}">
    <a class="ui-drawer-close" click.trigger="closeDrawer()"><ui-glyph glyph.bind="closeGlyph"></ui-glyph></a>
    <slot name="drawer-head"></slot>
    <div class="ui-drawer-body \${bodyClass}"><slot></slot></div>
    <slot name="drawer-foot"></slot>
  </div>
  <div class="ui-drawer-shim" click.trigger="closeDrawer()"></div>
</template>`)
@customElement('ui-drawer')
export class UIDrawer {
  css = {
    show: 'ui-drawer-show',
    fluid: 'ui-drawer-fluid',
    large: 'ui-drawer-large'
  };

  constructor(public element: Element) {
    if (element.hasAttribute('fluid')) this.element.classList.add(this.css.fluid);
    if (element.hasAttribute('large')) this.element.classList.add(this.css.large);
    if (element.hasAttribute('close-on-click')) element.addEventListener('mouseup', (e: any) => { if (e.button == 0) this.closeDrawer(); });
  }
  bind(bindingContext: Object, overrideContext: Object) {
    if (this.element.hasAttribute('scroll')) this.bodyClass += ' ui-scroll';
    if (this.element.hasAttribute('padded')) this.bodyClass += ' ui-pad-all';
    if (this.element.hasAttribute('compact')) this.bodyClass += 'ui-compact';

    if (this.position == 'end' && this.closeGlyph === 'glyph-arrow-left') this.closeGlyph = 'glyph-arrow-right';

    if (this.width) this.contentEl['style'].flexBasis = this.width;
  }

  private contentEl;

  @bindable() width = '';
  @bindable() bodyClass = '';
  @bindable() contentClass = "";
  @bindable() position = "start";
  @bindable() closeGlyph = 'glyph-arrow-left';

  closeDrawer() {
    if (UIEvent.fireEvent('beforeclose', this.element) !== false) {
      this.element.classList.remove(this.css.show);
      UIEvent.fireEvent('close', this.element);
    }
  }
  openDrawer() {
    if (UIEvent.fireEvent('beforeopen', this.element) !== false) {
      this.element.classList.add(this.css.show);
      UIEvent.fireEvent('open', this.element);
    }
  }
}

@autoinject()
@inlineView('<template class="ui-drawer-toggle" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>')
@customElement('ui-drawer-toggle')
export class UIDrawerToggle {
  constructor(public element: Element) { }

  @bindable() drawer;
  @bindable() glyph = 'glyph-handle-menu';

  openDrawer(evt) {
    if (!this.drawer) throw Error('Drawer element required');
    if (evt.button != 0) return true;
    evt.stopPropagation();
    evt.cancelBubble = true;
    if (this.drawer && this.drawer.au.controller) {
      this.drawer.au.controller.viewModel.openDrawer();
    }
  }
}
