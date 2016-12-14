// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-sidebar ui-row-vertical ui-row-stretch \${collapsed?'ui-collapse':''} \${position}" click.trigger="showOverlay($event)">
  <div class="ui-col-auto ui-row ui-row-end ui-row-middle ui-sidebar-head \${position=='start'?'':'ui-reverse'}" if.bind="collapsible || label">
  <div class="ui-col-fill ui-sidebar-title">\${label}</div>
  <a click.trigger="toggleCollapse($event)" class="ui-col-auto ui-sidebar-close" if.bind="collapsible"></a></div>
  <div class="ui-col-fill ui-sidebar-content \${contentCls}"><slot></slot></div>
</template>`)
@customElement('ui-sidebar')
export class UISidebar {
  constructor(public element: Element) {
    if (element.hasAttribute('scroll')) this.contentCls += ' ui-scroll';
    if (element.hasAttribute('padded')) this.contentCls += ' ui-pad-all';
    if (this.miniDisplay = element.hasAttribute('mini-display')) this.element.classList.add('ui-mini-display');
    this.collapsible = element.hasAttribute('collapsible');

    this.obClick = UIEvent.subscribe('mouseclick', () => {
      this.element.classList.remove('ui-show-overlay');
    });
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.collapsed = isTrue(this.collapsed);
    if (this.position == 'end') this.glyph = "arrow-right";
  }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() label = "";
  @bindable() collapsed = false;
  @bindable() position = "start";

  glyph = 'arrow-left';
  contentCls = '';
  private obClick;
  private miniDisplay = false;
  private collapsible = false;

  collapsedChanged(newValue) {
    this.glyph = (this.position == 'end' && !isTrue(newValue)) || (this.position == 'start' && isTrue(newValue)) ? "arrow-right" : "arrow-left";
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
}