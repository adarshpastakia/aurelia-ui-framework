//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, inlineView, containerless, Container, DOM, PLATFORM } from 'aurelia-framework';
import { AppRouter } from 'aurelia-router';
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
PLATFORM.moduleName('./ui-glyphs');

const CSS_PREFIX = 'ui-viewport';

@autoinject()
@inlineView(`<template class="${CSS_PREFIX} ui-row ui-row-v ui-align-stretch ui-nowrap">
  <compose view-model="./ui-glyphs"></compose>
  <slot name="ui-app-banner"></slot>
  <slot name="ui-app-header"></slot>
  <slot></slot>
  <div class="${CSS_PREFIX}-taskbar"><slot name="ui-app-taskbar"></slot><div class="${CSS_PREFIX}-taskbar-wrapper" ref="taskbarContainer"></div></div>
  <slot name="ui-app-footer"></slot>

  <div class="ui-dialog-container" ref="dialogContainer"></div>
  <div class="ui-overlay-container ui-row ui-row-v ui-align-end" ref="overlayContainer"></div>

  <ui-loader large busy.bind="router.isNavigating"></ui-loader>
</template>`)
@customElement('ui-viewport')
export class UIViewport {
  router;

  constructor(public element: Element) {
    var __resizeTimer;
    // Browser events hooks
    document.addEventListener('dragstart', (e: any) => getParentByClass(e.target, '.ui-draggable') != null);
    document.addEventListener('mouseup', (e: any) => UIEvent.broadcast('mouseclick', e));
    document.addEventListener('touchstart', (e: any) => UIEvent.broadcast('mouseclick', e));
    window.addEventListener('resize', (e: any) => {
      window.clearTimeout(__resizeTimer);
      window.setTimeout(() => UIEvent.broadcast('windowresize'), 500);
    });
    this.router = UIUtils.auContainer.get(AppRouter);
  }

  // aurelia hooks
  attached() {
    UIUtils.dialogContainer = this.dialogContainer;
    UIUtils.overlayContainer = this.overlayContainer;
    UIUtils.taskbarContainer = this.taskbarContainer;

    // Add browserAgent class to html element
    document.documentElement.classList.add(window.browserAgent());

    // Fire appready event
    UIEvent.fireEvent('appready', this.element);

    // Remove splash
    if (document.querySelector('.ui-splash')) DOM.removeNode(document.querySelector('.ui-splash'));
  }
  // detached() { }
  // unbind() { }
  // end aurelia hooks

  private dialogContainer;
  private overlayContainer;
  private taskbarContainer;
}

@autoinject()
@containerless()
@inlineView(`<template><router-view class="ui-router-view ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap \${class}" name="\${name}"></router-view></template>`)
@customElement('ui-router-view')
export class UIRouterView {
  constructor(public element: Element) { }
  @bindable() name = 'default';
  @bindable() class = '';
}

@autoinject()
@containerless()
@inlineView(`<template><div class="${CSS_PREFIX}-header ui-column-auto ui-row ui-row-h ui-align-center ui-nowrap \${class}" slot="ui-app-header"><slot></slot></div></template>`)
@customElement('ui-app-header')
export class UIAppHeader {
  constructor(public element: Element) { }
  @bindable() class = '';
}

@autoinject()
@containerless()
@inlineView(`<template><div class="${CSS_PREFIX}-banner ui-column-auto \${class}" slot="ui-app-banner"><slot></slot></div></template>`)
@customElement('ui-app-banner')
export class UIAppBanner {
  constructor(public element: Element) { }
  @bindable() class = '';
}

@autoinject()
@containerless()
@inlineView(`<template><div class="${CSS_PREFIX}-footer ui-column-auto ui-row ui-row-h ui-align-center ui-justify-between \${class}" slot="ui-app-footer"><slot></slot></div></template>`)
@customElement('ui-app-footer')
export class UIAppFooter {
  constructor(public element: Element) { }
  @bindable() class = '';
}

@autoinject()
@containerless()
@inlineView(`<template><div class="${CSS_PREFIX}-taskbar-tools \${class}" slot="ui-app-taskbar"><slot></slot></div></template>`)
@customElement('ui-app-quick-links')
export class UIAppQuickLinks {
  constructor(public element: Element) { }
  @bindable() class = '';
}

// App Title
@autoinject()
@containerless()
@customElement('ui-app-title')
@inlineView(`<template><a href.bind="href" class="${CSS_PREFIX}-title ui-row ui-row-h ui-align-center ui-nowrap \${class}"><img if.bind="src" src.bind="src" class="${CSS_PREFIX}-tile-image"/><span class="ui-column-auto"><slot></slot></span></a><div class="ui-column-fill"></div></template>`)
export class UIAppTitle {
  constructor(public element: Element) { }
  @bindable() href = '/';
  @bindable() src = '';
  @bindable() class = '';
}
