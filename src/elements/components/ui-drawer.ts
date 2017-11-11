//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, inlineView } from 'aurelia-framework';
import { UIEvent } from '../../utils/ui-event';

@autoinject()
@inlineView(`<template class="ui-drawer ui-drawer-\${position}">
  <div class="ui-drawer-content ui-row ui-row-v ui-align-stretch ui-nowrap">
    <a class="ui-drawer-close" click.trigger="closeDrawer()"><ui-glyph glyph.bind="closeGlyph"></ui-glyph></a>
    <div class="ui-drawer-body \${bodyCls}"><slot></slot></div>
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
    if (this.element.hasAttribute('scroll')) this.bodyCls += ' ui-scroll';
    if (this.element.hasAttribute('padded')) this.bodyCls += ' ui-pad-all';

    if (this.position == 'end' && this.closeGlyph === 'glyph-arrow-left') this.closeGlyph = 'glyph-arrow-right';
  }

  @bindable() position = "start";
  @bindable() closeGlyph = 'glyph-arrow-left';

  private bodyCls = '';
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
