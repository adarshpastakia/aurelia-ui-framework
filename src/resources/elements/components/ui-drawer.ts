//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';

@autoinject()
@inlineView(`<template class="ui-drawer \${position}">
  <div class="ui-drawer-content ui-row-vertical ui-align-stretch">
    <a class="ui-drawer-close ui-col-auto" click.trigger="closeDrawer()"><ui-glyph glyph.bind="glyph"></ui-glyph></a>
    <div class="ui-drawer-body ui-col-fill \${bodyCls}"><slot></slot></div>
  </div>
  <div class="ui-drawer-shim" click.trigger="closeDrawer()"></div>
</template>`)
@customElement('ui-drawer')
export class UIDrawer {
  constructor(public element: Element) {
    if (element.hasAttribute('close-on-click')) element.addEventListener('mouseup', (e: any) => { if (e.button == 0) this.closeDrawer(); });
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    if (this.element.hasAttribute('scroll')) this.bodyCls += ' ui-scroll';
    if (this.element.hasAttribute('padded')) this.bodyCls += ' ui-pad-all';

    if (this.position == 'end') this.glyph = 'glyph-arrow-right';
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() position = "start";

  private glyph = 'glyph-arrow-left';
  private bodyCls = '';

  closeDrawer() {
    this.element.classList.remove('show');
  }
}

@autoinject()
@inlineView('<template class="ui-drawer-toggle ui-link" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>')
@customElement('ui-drawer-toggle')
export class UIDrawerToggle {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() drawer;
  @bindable() glyph = 'glyph-handle-menu';

  openDrawer(evt) {
    if (evt.button != 0) return true;
    evt.stopPropagation();
    evt.cancelBubble = true;
    if (this.drawer && this.drawer.classList) {
      this.drawer.classList.add('show');
    }
  }
}
