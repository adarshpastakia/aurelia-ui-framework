//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, inlineView } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-sidebar ui-row ui-row-v ui-row-nowrap ui-align-stretch \${compact || collapsed || forceCollapse ?'ui-sidebar-collapse':''} ui-sidebar-\${position}" click.trigger="showOverlay($event)">
  <div class="ui-sidebar-head ui-row ui-row-h ui-row-nowrap ui-align-stretch" if.bind="!compact && (collapsible || label)">
  <div class="ui-sidebar-title ui-column-fill" ref="labelEl">\${label}</div>
  <a click.trigger="toggleCollapse($event)" class="ui-sidebar-close" if.bind="collapsible && !forceCollapse"><ui-glyph glyph.bind="glyph"></ui-glyph></a></div>
  <div class="ui-sidebar-content ui-column-fill \${bodyClass}" ref="contentEl"><slot></slot></div>
</template>`)
@customElement('ui-sidebar')
export class UISidebar {
  constructor(public element: Element) {
    if (this.miniDisplay = element.hasAttribute('mini-display')) element.classList.add('ui-sidebar-mini');
    if (this.compact = element.hasAttribute('compact')) {
      element.classList.add('ui-sidebar-compact');
      element.classList.add('ui-sidebar-mini');
    }
    this.collapsible = element.hasAttribute('collapsible');

    this.obResize = UIEvent.subscribe('windowresize', () => {
      this.forceCollapse = window.innerWidth <= 768;
    });
    this.obClick = UIEvent.subscribe('mouseclick', () => {
      this.element.classList.remove('ui-sidebar-show');
    });
    this.forceCollapse = window.innerWidth <= 768;
  }

  bind(bindingContext: Object, overrideContext: Object) {
    this.collapsed = !!(this.collapsed);
    if (this.position === 'end' && this.glyph === 'glyph-arrow-left') this.glyph = "glyph-arrow-right";

    if (this.element.hasAttribute('scroll')) this.bodyClass += ' ui-scroll';
    if (this.element.hasAttribute('flex')) this.bodyClass += ' ui-row ui-row-v ui-align-stretch ui-nowrap';
    if (this.element.hasAttribute('padded')) this.bodyClass += ' ui-pad-all';
    if (this.element.hasAttribute('compact')) this.bodyClass += ' ui-compact';

    if (this.width) this.element['style'].flexBasis = this.width;
  }
  attached() {
    if (this.label instanceof HTMLElement)[this.labelEl.innerHTML = '', this.labelEl.appendChild(this.label)];
  }
  detached() {
    if (this.obClick) this.obClick.dispose();
    if (this.obResize) this.obResize.dispose();
  }

  @bindable() label: any = "";
  @bindable() bodyClass: any = "";
  @bindable() width: any = "";
  @bindable() collapsed = false;
  @bindable() position = "start";

  glyph = 'glyph-arrow-left';
  private labelEl;
  private contentEl;
  private obClick;
  private obResize;
  private forceCollapse;
  private compact = false;
  private miniDisplay = false;
  private collapsible = false;

  collapsedChanged(newValue) {
    this.glyph = (this.position == 'end' && !(newValue)) || (this.position == 'start' && !!(newValue)) ? "glyph-arrow-right" : "glyph-arrow-left";
  }

  toggleCollapse($event) {
    this.collapsed = !this.collapsed;
    this.element.classList.remove('ui-sidebar-show');
    $event.cancelBubble = true;
    return true;
  }

  showOverlay($event) {
    if (this.miniDisplay || $event.target != this.element) return true;
    if (this.collapsed || this.forceCollapse)
      this.element.classList.add('ui-sidebar-show');
    else
      this.element.classList.remove('ui-sidebar-show');
  }
}
