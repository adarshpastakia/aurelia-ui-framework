//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, children, inlineView, DOM } from 'aurelia-framework';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template class="ui-panel \${collapsed?'ui-collapse':''} \${expanded?'ui-expand':''}" css.bind="{'max-height': maxheight,'min-height': minheight,'height':height, 'width': width}" collapse.trigger="toggleCollapse()" expand.trigger="expand()" restore.trigger="expand()" close.trigger="close()"><slot></slot></template>`)
@customElement('ui-panel')
export class UIPanel {
  constructor(public element: Element) { }

  bind(bindingContext: Object, overrideContext: Object) {
    this.collapsed = !!(this.collapsed) || this.element.hasAttribute('collapsed');
  }

  @bindable() width = 'auto';
  @bindable() height = 'auto';
  @bindable() minheight = 'auto';
  @bindable() maxheight = 'auto';

  @bindable({ defaultBindingMode: bindingMode.twoWay }) expanded = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) collapsed = false;

  @bindable() beforeclose: any;

  close() {
    if (isFunction(this.beforeclose)) {
      let ret = this.beforeclose();
      if (ret instanceof Promise) ret.then(b => {
        if (b) {
          this.remove();
        }
      });
      else if (ret !== false) {
        this.remove();
      }
    }
    else if (UIEvent.fireEvent('beforeclose', this.element) !== false) {
      this.remove();
    }
  }
  remove() {
    DOM.removeNode(this.element);
    UIEvent.fireEvent('close', this.element)
  }
  collapse() {
    this.collapsed = true;
  }
  expand() {
    this.expanded = !this.expanded;
  }
  restore() {
    this.expanded = !this.expanded;
  }

  private toggleCollapse() {
    setTimeout(() => this.collapsed = !this.collapsed, 200);
  }
}

@autoinject()
@inlineView(`<template class="ui-panel-body" css.bind="{'max-height': maxheight,'min-height': minheight,'flex-basis':height}"><slot></slot></template>`)
@customElement('ui-panel-body')
export class UIPanelBody {
  constructor(public element: Element) {
    if (element.hasAttribute('flex')) element.classList.add('ui-flexed');
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
    if (element.hasAttribute('compact')) element.classList.add('ui-compact');
  }
}

@autoinject()
@inlineView(`<template class="ui-panel-group" collapse.delegate="uncollapse()"><slot></slot></template>`)
@customElement('ui-panel-group')
export class UIPanelGroup {
  constructor(public element: Element) {
    this.allowtoggle = element.hasAttribute('toggle');
  }
  attached() {
    if (_.find(this.panels, ['collapsed', false]) == null) this.panels[0].collapsed = false;
  }
  @children('ui-panel') panels;

  private allowtoggle = false;

  private uncollapse() {
    let panel: any = _.find(this.panels, ['collapsed', false])
    if (this.allowtoggle && panel) panel.collapsed = true;
  }
}

@autoinject()
@inlineView(`<template class="ui-header"><slot></slot></template>`)
@customElement('ui-header')
export class UIHeader {
  constructor(public element: Element) {
  }
}

@autoinject()
@inlineView(`<template class="ui-header-tool"><button disabled.bind="disabled" tabindex="-1" class="ui-header-button ui-\${type}" click.trigger="fireEvent($event)">
  <slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></button></template>`)
@customElement('ui-header-tool')
export class UIHeaderTool {
  constructor(public element: Element) {
    if (element.hasAttribute('close')) this.type = "close";
    if (element.hasAttribute('refresh')) this.type = "refresh";
    if (element.hasAttribute('collapse')) this.type = "collapse";
    if (element.hasAttribute('expand')) this.type = "expand";
    if (element.hasAttribute('restore')) this.type = "restore";
    if (element.hasAttribute('minimize')) this.type = "minimize";

    if (element.hasAttribute('close')) this.glyph = "glyph-dialog-close";
    if (element.hasAttribute('refresh')) this.glyph = "glyph-refresh";
    if (element.hasAttribute('collapse')) this.glyph = "glyph-chevron-up";
    if (element.hasAttribute('expand')) this.glyph = "glyph-dialog-expand";
    if (element.hasAttribute('restore')) this.glyph = "glyph-dialog-restore";
    if (element.hasAttribute('minimize')) this.glyph = "glyph-dialog-minimize";
  }

  bind(bindingContext: Object, overrideContext: Object) {
    this.disabled = !!(this.disabled);
  }
  attached() {
    if (this.dropdown) {
      this.obMouseup = UIEvent.subscribe('mouseclick', (evt) => {
        if (getParentByClass(evt.target, 'ui-button') == this.element) return;
        this.element.classList.remove('ui-open');
        this.dropdown.classList.remove('ui-open');
      });
      this.dropdown.classList.add('ui-floating');
      this.tether = UIUtils.tether(this.element, this.dropdown, { position: 'br' });
    }
  }
  detached() {
    if (this.tether) this.tether.dispose();
    if (this.obMouseup) this.obMouseup.dispose();
    if (this.dropdown) DOM.removeNode(this.dropdown);
  }

  @bindable() glyph = '';
  @bindable() dropdown;
  @bindable() disabled = false;

  private tether;
  private obMouseup;

  private type = 'tool';

  private fireEvent(evt) {
    if (evt.button != 0) return true;

    if (this.dropdown) {
      evt.preventDefault();
      evt.stopPropagation();
      evt.cancelBubble = true;
      if (this.element.classList.contains('ui-open')) {
        UIEvent.fireEvent('menuhide', this.element);
        this.element.classList.remove('ui-open');
        this.dropdown.classList.remove('ui-open');
      }
      else {
        if (UIEvent.fireEvent('menuopen', this.element) !== false) {
          this.element.classList.add('ui-open');
          this.dropdown.classList.add('ui-open');
          this.tether.position();
        }
      }
      return false;
    }
    return UIEvent.fireEvent(this.type, this.element);
  }
}

@autoinject()
@inlineView(`<template class="ui-header-title ui-inline-block ui-col-fill"><div class="ui-title-icon"><ui-glyph glyph.bind="glyph" if.bind="glyph"></ui-glyph></div><div class="ui-title"><slot></slot></div></template>`)
@customElement('ui-header-title')
export class UIHeaderTitle {
  constructor(public element: Element) {
    if (this.element.hasAttribute('icon-hilight')) this.element.classList.add('ui-icon-hilight');
  }

  @bindable() glyph = '';
}
