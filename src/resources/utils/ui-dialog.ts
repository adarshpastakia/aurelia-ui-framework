//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM } from 'aurelia-framework';
import { UIEvent } from "./ui-event";
import { UIUtils } from "./ui-utils";
import * as _ from "lodash";

import { Origin } from "aurelia-metadata";
import {
  singleton,
  Container,
  ViewCompiler,
  ViewResources,
  CompositionEngine,
  TemplatingEngine,
  ViewSlot
} from "aurelia-framework";
import { child } from "aurelia-templating";

@autoinject()
@singleton()
export class UIDialogService {
  private activeWin;
  private windows = [];
  private initialized = false;

  constructor(private compiler: ViewCompiler,
    private container: Container,
    private resources: ViewResources,
    private compositionEngine: CompositionEngine,
    private templatingEngine: TemplatingEngine) {
  }

  private initialize() {
    if (!this.initialized) {
      this.initialized = true;
      if (UIUtils.dialogContainer) {
        UIUtils.dialogContainer.addEventListener('close', (e: any) => this.closeDialog(e.detail));
        UIUtils.dialogContainer.addEventListener('collapse', (e: any) => this.taskClick(e.detail, true));
        UIUtils.dialogContainer.addEventListener('mousedown', (e) => this.moveStart(e));
      }
      if (UIUtils.taskbarContainer) UIUtils.taskbarContainer.addEventListener('click', (e) => this.taskClick((getParentByTag(e.target as Element, 'button') || e.target)['window']));
    }
  }

  makeActive(id) {
    let win = _.find(this.windows, ['id', id]);
    if (win) this.changeActive(win);
    return !!win;
  }

  show(vm, model?) {
    this.initialize();

    let instruction: any =
      {
        viewModel: vm,
        container: this.container,
        childContainer: this.container.createChild(),
        model: model
      };

    return this.getViewModel(instruction)
      .then(newInstruction => this.invokeLifecycle(newInstruction.viewModel, 'canActivate', model))
      .then(canActivate => {
        return canActivate ?
          this.compositionEngine.createController(instruction) :
          Promise.reject(false);
      })
      .then(controller => {
        controller.automate();

        let view = this.createDialog(controller.viewModel);

        let childSlot: any = new ViewSlot(view['fragment'].querySelector('.ui-dialog'), true);
        childSlot.add(controller.view);
        childSlot.viewModel = controller.viewModel;
        childSlot.attached();

        controller.viewModel["childSlot"] = childSlot;

        let slot = new ViewSlot(UIUtils.dialogContainer, true);
        slot.add(view);
        slot.attached();

        this.initializeDialog(controller.viewModel);
      });
  }

  close(id, force?) {
    let win = _.find(this.windows, ['id', id]);
    if (win) this.closeDialog(win, force);
    return !!win;
  }

  closeAll() {
    _.forEach(this.windows, win => this.closeDialog(win, true));
  }

  private createDialog(vm) {
    if (!(vm instanceof UIDialog)) throw new Error("ViewModel must extend from UIDialog");

    var viewFactory = this.compiler.compile(`<template><div class="\${modal?'ui-modal':''} au-animate ui-dialog-wrapper" ref="dialogWrapperEl">
      <div class="ui-dialog \${isActive?'ui-active':'ui-inactive'}" ref="dialogEl" css.bind="posCurrent">
      <ui-header theme.bind="theme">
        <ui-header-title glyph="\${glyph}">\${title}</ui-header-title>
        <ui-header-tool minimize click.trigger="collapse($event)" if.bind="minimizable && !modal"></ui-header-tool>
        <ui-header-tool glyph="\${isMaximized?'glyph-dialog-restore':'glyph-dialog-expand'}" click.trigger="expand($event)" if.bind="maximizable"></ui-header-tool>
        <ui-header-tool close click.trigger="close($event)" if.bind="closable"></ui-header-tool>
      </ui-header>
      <ui-glyph class="ui-resizer" glyph="glyph-dialog-resize" if.bind="resizable"></ui-glyph>
      </div></div></template>`, this.resources);
    let view = viewFactory.create(this.container);
    view.bind(vm);
    return view;
  }

  private initializeDialog(dialog) {
    this.windows.push(dialog);
    if (!dialog.modal) {
      dialog.taskButtonEl = document.createElement('button');
      dialog.taskButtonEl.classList.add('ui-active');
      dialog.taskButtonEl.innerHTML = '<ui-glyph class="${glyph}" glyph="${glyph}" if.bind="glyph"></ui-glyph><span class="ui-label">${title}</span>';
      dialog.taskButtonEl.window = dialog;
      if (UIUtils.taskbarContainer) {
        UIUtils.taskbarContainer.appendChild(dialog.taskButtonEl);
        this.templatingEngine.enhance({ element: dialog.taskButtonEl, bindingContext: dialog });
      }

      this.changeActive(dialog);
    }
  }

  private closeDialog(dialog, force = false) {
    if (!dialog) return;
    this.invokeLifecycle(dialog, 'canDeactivate', force)
      .then(canDeactivate => {
        if (force || canDeactivate) {
          // this.invokeLifecycle(dialog.childSlot, 'detached', null);
          // this.invokeLifecycle(dialog, 'detached', null);
          dialog["childSlot"].detached();

          dialog.dialogWrapperEl.remove();

          _.remove(this.windows, ['uniqId', dialog.uniqId]);
          if (!dialog.modal) {
            DOM.removeNode(dialog.taskButtonEl);
            this.nextActive();
          }

          dialog["childSlot"].unbind();
          this.invokeLifecycle(dialog, 'unbind', null);
          this.invokeLifecycle(dialog, 'deactivate', null);
        }
      });
  }

  private getViewModel(instruction) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = Origin.get(instruction.viewModel).moduleId;
    }
    if (typeof instruction.viewModel === 'string') {
      return this.compositionEngine.ensureViewModel(instruction);
    }
    return Promise.resolve(instruction);
  }

  private invokeLifecycle(instance, name, model) {
    if (instance && typeof instance[name] === 'function') {
      let result = instance[name](model);
      if (result instanceof Promise) {
        return result;
      }
      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }
      return Promise.resolve(true);
    }
    return Promise.resolve(true);
  }

  private changeActive(dialog) {
    if (!isEmpty(this.activeWin)) this.activeWin.makeInactive();
    (this.activeWin = dialog).makeActive();
  }

  private taskClick(dialog, forceMin = false) {
    if (!dialog) return;
    if (dialog.isMinimized === false && dialog.isActive === true || forceMin) {
      dialog.minimize();
      if (dialog.isActive) UIEvent.queueTask(() => this.nextActive());
    }
    else {
      this.changeActive(dialog);
    }
  }

  private nextActive() {
    let nextActive;
    if (!isEmpty(nextActive = _.findLast(this.windows, ['isMinimized', false]))) {
      this.changeActive(nextActive);
    }
  }

  /**
	 * dialog move
	 */
  private __isDragging = false;
  private __isResizing = false;
  private __startX = 0;
  private __startY = 0;
  private __dialog;
  private __isRtl;

  private moveStart($event) {
    this.__dialog = getParentByClass($event.target, 'ui-dialog');
    if (this.__dialog === null || !this.__dialog.viewSlot) return;
    let dialog: any = this.__dialog.viewSlot.viewModel;

    if ($event.button != 0 || getParentByClass($event.target, 'ui-header-button') !== null) {
      return;
    }
    if (!dialog.modal) this.changeActive(dialog);
    if (getParentByClass($event.target, 'ui-resizer') === null &&
      getParentByClass($event.target, 'ui-header') === null) {
      return;
    }

    this.__isRtl = window.isRtl(UIUtils.dialogContainer);
    if (this.__isRtl && !this.__dialog.style.right) {
      this.__dialog.style.right = this.__dialog.style.left;
      this.__dialog.style.left = null;
    }
    if (!this.__isRtl && !this.__dialog.style.left) {
      this.__dialog.style.left = this.__dialog.style.right;
      this.__dialog.style.right = null;
    }
    this.__startX = ($event.x || $event.clientX);
    this.__startY = ($event.y || $event.clientY);
    this.__isDragging = true;
    this.__isResizing = $event.target.classList.contains('ui-resizer');

    if (this.__isResizing && !dialog.resizable) {
      this.__isDragging = false;
      this.__isResizing = false;
      return;
    }
    else if (!this.__isResizing && (!dialog.draggable || dialog.modal)) {
      this.__isDragging = false;
      this.__isResizing = false;
      return;
    }

    UIUtils.dialogContainer.addEventListener('mousemove', (e) => this.move(e));
    UIUtils.dialogContainer.addEventListener('mouseup', () => this.moveEnd());
  }

  private moveEnd() {
    if (!this.__isDragging || this.__dialog == null) {
      return;
    }
    this.__dialog.classList.remove('ui-dragging');
    UIUtils.dialogContainer.classList.remove('ui-dragging');
    this.__isDragging = false;
    this.__dialog = null;

    UIUtils.dialogContainer.removeEventListener('mousemove', (e) => this.move(e));
    UIUtils.dialogContainer.removeEventListener('mouseup', () => this.moveEnd());
  }

  private move($event) {
    if (!this.__isDragging) {
      return;
    }

    if (!UIUtils.dialogContainer.classList.contains('ui-dragging')) {
      this.__dialog.classList.add('ui-dragging');
      UIUtils.dialogContainer.classList.add('ui-dragging');
    }

    let x = ($event.x || $event.clientX) - this.__startX;
    let y = ($event.y || $event.clientY) - this.__startY;

    x = (this.__isRtl ? -1 : 1) * x;

    let t = convertToPx(this.__dialog.style.top, this.__dialog);
    let l = convertToPx(this.__dialog.style[this.__isRtl ? 'right' : 'left'], this.__dialog);
    let w = convertToPx(this.__dialog.style.width, this.__dialog);
    let h = convertToPx(this.__dialog.style.height, this.__dialog);
    let pw = UIUtils.dialogContainer.offsetWidth;
    let ph = UIUtils.dialogContainer.offsetHeight;
    if (!this.__isResizing) {
      if (l + x < 0) {
        x = 0;
        l = 0;
      }
      if (t + y < 0) {
        y = 0;
        t = 0;
      }
      if (l + x + w + 16 > pw) {
        x = 0;
        l = pw - w - 16;
      }
      if (t + y + h + 54 > ph) {
        y = 0;
        t = ph - h - 54;
      }
      this.__dialog.style.top = (t + y) + 'px';
      this.__dialog.style[this.__isRtl ? 'right' : 'left'] = (l + x) + 'px';
    }
    else {
      if (l + x + w + 16 > pw) x = 0;
      if (t + y + h + 54 > ph) y = 0;

      this.__dialog.style.width = (w + x) + 'px';
      this.__dialog.style.height = (h + y) + 'px';
    }

    this.__startX = x !== 0 ? ($event.x || $event.clientX) : this.__startX;
    this.__startY = y !== 0 ? ($event.y || $event.clientY) : this.__startY;
  }
}

@autoinject()
export class UIDialog {
  // aurelia hooks
  bind(bindingContext?: Object, overrideContext?: Object) {
    let isRtl = window.isRtl(UIUtils.dialogContainer);
    let pw = UIUtils.dialogContainer.offsetWidth;
    let ph = UIUtils.dialogContainer.offsetHeight;

    this.posCurrent.width = this.width || this.minWidth || this.posCurrent.width;
    this.posCurrent.height = this.height || this.minHeight || this.posCurrent.height;
    this.posCurrent['min-width'] = this.minWidth || this.posCurrent['min-width'];
    this.posCurrent['min-height'] = this.minHeight || this.posCurrent['min-height'];
    this.posCurrent['max-width'] = this.maxWidth || this.posCurrent['max-width'];
    this.posCurrent['max-height'] = this.maxHeight || this.posCurrent['max-height'];

    if (!this.modal) {
      this.posCurrent.top = (UIDialog.posY = (UIDialog.posY + parseInt(this.posCurrent.height) + 32 > ph) ? 10 : UIDialog.posY + 30) + 'px';
      this.posCurrent.left = this.posCurrent.right = (UIDialog.posX = (UIDialog.posX + parseInt(this.posCurrent.width) + 32 > pw) ? (UIDialog.seedX += 60) : UIDialog.posX + 30) + 'px';
    }

    if (!this.id) this.id = this.uniqId;
  }
  attached() {
    if (this.maximized) this.expand(null);
  }
  // end aurelia hooks

  static seed = 0;
  static seedX = 0;
  static posX = 0;
  static posY = 0;

  private uniqId = `ui-win-${UIDialog.seed++}`;

  private dialogEl;
  private taskButtonEl;
  private dialogWrapperEl;

  private isActive = true;
  private isMaximized = false;
  private isMinimized = false;

  private posCurrent: any = {
    top: 0,
    'min-height': '100px', 'min-width': '300px',
    'max-height': 'none', 'max-width': 'none',
    height: '400px', width: '600px'
  };

  public id;
  public glyph;
  public title = 'Dialog';
  public theme = 'primary';
  public width = '600px';
  public height = '400px';
  public minWidth = '300px';
  public minHeight = '100px';
  public maxWidth = 'none';
  public maxHeight = 'none';
  public modal: boolean = false;
  public draggable: boolean = true;
  public resizable: boolean = true;
  public minimizable: boolean = true;
  public maximizable: boolean = true;
  public closable: boolean = true;
  public maximized: boolean = false;

  focus() {
    UIEvent.queueTask(() => {
      let el: any = this.dialogEl.querySelector('input,textarea');
      if (el !== null) el.focus();
    });
  }

  makeActive() {
    this.isActive = true;
    this.isMinimized = false;
    this.dialogEl.classList.remove('ui-minimize');
    if (this.taskButtonEl) this.taskButtonEl.classList.add('ui-active');
  }

  makeInactive() {
    this.isActive = false;
    if (this.taskButtonEl) this.taskButtonEl.classList.remove('ui-active');
  }

  minimize() {
    this.isMinimized = true;
    this.dialogEl.classList.add('ui-minimize');
    if (this.taskButtonEl) this.taskButtonEl.classList.remove('ui-active');
  }

  expand($event) {
    this.isMaximized = !this.isMaximized;
    if ($event) $event.cancelBubble = true;
    this.dialogEl.classList.toggle('ui-maximize');
  }

  collapse($event) {
    if ($event) $event.cancelBubble = true;
    UIEvent.fireEvent('collapse', this.dialogWrapperEl, this);
  }

  close($event?) {
    if ($event) $event.cancelBubble = true;
    UIEvent.fireEvent('close', this.dialogWrapperEl, this);
  }

  toast(config) {
    if (typeof config === 'string') config = { message: config };
    config.container = this.dialogEl.querySelector('ui-dialog-body');
    UIUtils.toast(config);
  }
}
