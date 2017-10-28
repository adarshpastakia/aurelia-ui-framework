//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, noView, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";


@inlineView('<template class="ui-affix-point"></template>')
@customElement('ui-affix-point')
export class UIAffixPoint { }

@containerless()
@inlineView('<template><div class="ui-affix-content" slot="affix-content"><slot></slot></div></template>')
@customElement('ui-affix-content')
export class UIAffixContent { }

@autoinject()
@inlineView(`<template class="ui-sidebar ui-row-vertical ui-row-stretch \${collapsed?'ui-collapse':''} \${position}" click.trigger="showOverlay($event)">
  <div class="ui-col-auto ui-row ui-row-end ui-row-middle ui-sidebar-head \${position=='start'?'':'ui-reverse'}" if.bind="collapsible || label">
  <div class="ui-col-fill ui-sidebar-title">\${label}</div>
  <a click.trigger="toggleCollapse($event)" class="ui-col-auto ui-sidebar-close" if.bind="collapsible"><ui-glyph glyph.bind="glyph"></ui-glyph></a></div>
  <slot name="affix-content"></slot>
  <div class="ui-col-fill ui-sidebar-content \${contentCls}" ref="contentEl" scroll.trigger="watchScroll($event) & debounce"><slot></slot></div>
</template>`)
@customElement('ui-sidebar')
export class UISidebar {
  constructor(public element: Element) {
    if (element.hasAttribute('scroll')) this.contentCls += ' ui-scroll';
    if (element.hasAttribute('flex')) this.contentCls += ' ui-row-vertical';
    if (element.hasAttribute('padded')) this.contentCls += ' ui-pad-all';
    if (element.hasAttribute('small')) element.classList.add('ui-small');
    if (this.miniDisplay = element.hasAttribute('mini-display')) element.classList.add('ui-mini-display');
    this.collapsible = element.hasAttribute('collapsible');

    this.obClick = UIEvent.subscribe('mouseclick', () => {
      element.classList.remove('ui-show-overlay');
    });
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.collapsed = !!this.collapsed;
    if (this.position == 'end') this.glyph = "glyph-arrow-right";
  }
  attached() {
    this.affixPoint = this.element.querySelector('.ui-affix-point');
    this.affixEl = this.element.querySelector('.ui-affix-content');
  }
  detached() {
    if (this.obClick) this.obClick.dispose();
  }
  // unbind() { }
  // end aurelia hooks

  @bindable() label = "";
  @bindable() collapsed = false;
  @bindable() position = "start";

  glyph = 'glyph-arrow-left';
  contentCls = '';
  private affixEl;
  private affixPoint;
  private contentEl;
  private obClick;
  private miniDisplay = false;
  private collapsible = false;

  collapsedChanged(newValue) {
    this.glyph = (this.position == 'end' && !newValue) || (this.position == 'start' && newValue) ? "glyph-arrow-right" : "glyph-arrow-left";
  }

  toggleCollapse($event) {
    this.collapsed = !this.collapsed;
    this.element.classList.remove('ui-show-overlay');
    $event.cancelBubble = true;
    return true;
  }

  showOverlay($event) {
    if (this.miniDisplay || $event.target != this.element) return true;
    if (this.collapsed)
      this.element.classList.add('ui-show-overlay');
    else
      this.element.classList.remove('ui-show-overlay');
  }

  watchScroll(e) {
    if (this.affixEl) {
      let point = 0;
      if (this.affixPoint) point = this.affixPoint.offsetTop;
      if (this.contentEl.scrollTop > point) this.affixEl.classList.add('ui-animate');
      else this.affixEl.classList.remove('ui-animate');
    }
  }
}
