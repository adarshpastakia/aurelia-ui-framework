//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, useView, inlineView, containerless, Container, View, DOM} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {UIApplication} from "../../utils/ui-application";
import {UIUtils} from "../../utils/ui-utils";
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-viewport ui-fullscreen">
  <compose view="../../ui-glyphs.html"></compose>
  <slot name="ui-app-header"></slot>
  <slot></slot>
  <div class="ui-app-taskbar"><slot name="ui-app-taskbar"></slot><div class="ui-taskbutton-wrapper" ref="taskbarContainer"></div></div>
  <slot name="ui-app-footer"></slot>

  <div class="ui-dialog-container" ref="dialogContainer"></div>
  <div class="ui-overlay-container" ref="overlayContainer"></div>
</template>`)
@customElement('ui-viewport')
export class UIViewport {
  constructor(public element: Element, public httpClient: HttpClient, public app: UIApplication) {
    //if (element.hasAttribute('fullscreen')) element.classList.add('fullscreen');
    var __resizeTimer;
    // Browser events hooks
    document.ondragstart = (e: any) => getParentByClass(e.target, '.ui-draggable') != null;
    document.onmouseup = (e: any) => UIEvent.broadcast('mouseclick', e);
    document.ontouchstart = (e: any) => UIEvent.broadcast('mouseclick', e);
    window.onresize = (e: any) => {
      window.clearTimeout(__resizeTimer);
      window.setTimeout(() => UIEvent.broadcast('windowresize'), 500);
    }
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() {
    UIUtils.dialogContainer = this.dialogContainer;
    UIUtils.overlayContainer = this.overlayContainer;
    UIUtils.taskbarContainer = this.taskbarContainer;
    // Fire appready event
    UIEvent.fireEvent('appready', this.element);

    // Remove splash
    if (document.querySelector('.ui-splash')) DOM.removeNode(document.querySelector('.ui-splash'));
  }
  detached() { }
  unbind() { }
  // end aurelia hooks

  private dialogContainer;
  private overlayContainer;
  private taskbarContainer;
}

@autoinject()
@containerless()
@inlineView('<template><router-view class="ui-router-view"></router-view></template>')
@customElement('ui-router-view')
export class UIRouterView {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks
}

@autoinject()
@containerless()
@inlineView('<template><div class="ui-app-header ${class}" slot="ui-app-header"><slot></slot></div></template>')
@customElement('ui-app-header')
export class UIAppHeader {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() class = '';
}

@autoinject()
@containerless()
@inlineView('<template><div class="ui-app-footer ${class}" slot="ui-app-footer"><slot></slot></div></template>')
@customElement('ui-app-footer')
export class UIAppFooter {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() class = '';
}

@autoinject()
@containerless()
@inlineView('<template><div class="ui-app-taskbar-tools ${class}" slot="ui-app-taskbar"><slot></slot></div></template>')
@customElement('ui-app-quick-links')
export class UIAppQuickLinks {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() class = '';
}

// App Title
@autoinject()
@containerless()
@customElement('ui-app-title')
@inlineView('<template><a href="#/" class="ui-row ui-row-middle ui-app-title ${class}"><img class="ui-col-auto ui-app-logo" src.bind="src" if.bind="src"/>&nbsp;&nbsp;<span class="ui-col-auto"><slot></slot></span></a><div class="ui-col-fill"></div></template>')
export class UIAppTitle {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() src;
  @bindable() class = '';
}
