"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ui_event_1 = require("./ui-event");
var ui_utils_1 = require("./ui-utils");
var _ = require("lodash");
var aurelia_metadata_1 = require("aurelia-metadata");
var aurelia_framework_2 = require("aurelia-framework");
var UIDialogService = (function () {
    function UIDialogService(compiler, container, resources, compositionEngine, templatingEngine) {
        this.compiler = compiler;
        this.container = container;
        this.resources = resources;
        this.compositionEngine = compositionEngine;
        this.templatingEngine = templatingEngine;
        this.windows = [];
        this.initialized = false;
        this.__isDragging = false;
        this.__isResizing = false;
        this.__startX = 0;
        this.__startY = 0;
    }
    UIDialogService.prototype.initialize = function () {
        var _this = this;
        if (!this.initialized) {
            this.initialized = true;
            if (ui_utils_1.UIUtils.dialogContainer) {
                ui_utils_1.UIUtils.dialogContainer.addEventListener('close', function (e) { return _this.closeDialog(e.detail); });
                ui_utils_1.UIUtils.dialogContainer.addEventListener('collapse', function (e) { return _this.taskClick(e.detail, true); });
                ui_utils_1.UIUtils.dialogContainer.addEventListener('mousedown', function (e) { return _this.moveStart(e); });
            }
            if (ui_utils_1.UIUtils.taskbarContainer)
                ui_utils_1.UIUtils.taskbarContainer.addEventListener('click', function (e) { return _this.taskClick((getParentByTag(e.target, 'button') || e.target)['window']); });
        }
    };
    UIDialogService.prototype.makeActive = function (id) {
        var win = _.find(this.windows, ['id', id]);
        if (win)
            this.changeActive(win);
        return !!win;
    };
    UIDialogService.prototype.show = function (vm, model) {
        var _this = this;
        this.initialize();
        var instruction = {
            viewModel: vm,
            container: this.container,
            childContainer: this.container.createChild(),
            model: model
        };
        return this.getViewModel(instruction)
            .then(function (newInstruction) { return _this.invokeLifecycle(newInstruction.viewModel, 'canActivate', model); })
            .then(function (canActivate) {
            return canActivate ?
                _this.compositionEngine.createController(instruction) :
                Promise.reject(false);
        })
            .then(function (controller) {
            controller.automate();
            var view = _this.createDialog(controller.viewModel);
            var childSlot = new aurelia_framework_2.ViewSlot(view['fragment'].querySelector('.ui-dialog'), true);
            childSlot.add(controller.view);
            childSlot.viewModel = controller.viewModel;
            childSlot.attached();
            controller.viewModel["childSlot"] = childSlot;
            var slot = new aurelia_framework_2.ViewSlot(ui_utils_1.UIUtils.dialogContainer, true);
            slot.add(view);
            slot.attached();
            _this.initializeDialog(controller.viewModel);
        });
    };
    UIDialogService.prototype.close = function (id, force) {
        var win = _.find(this.windows, ['id', id]);
        if (win)
            this.closeDialog(win, force);
        return !!win;
    };
    UIDialogService.prototype.closeAll = function () {
        var _this = this;
        _.forEach(this.windows, function (win) { return _this.closeDialog(win, true); });
    };
    UIDialogService.prototype.createDialog = function (vm) {
        if (!(vm instanceof UIDialog))
            throw new Error("ViewModel must extend from UIDialog");
        var viewFactory = this.compiler.compile("<template><div class=\"${modal?'ui-modal':''} au-animate ui-dialog-wrapper\" ref=\"dialogWrapperEl\">\n      <div class=\"ui-dialog ${isActive?'ui-active':'ui-inactive'}\" ref=\"dialogEl\" css.bind=\"posCurrent\">\n      <ui-header theme.bind=\"theme\">\n        <ui-header-title glyph=\"${glyph}\">${title}</ui-header-title>\n        <ui-header-tool minimize click.trigger=\"collapse($event)\" if.bind=\"minimizable && !modal\"></ui-header-tool>\n        <ui-header-tool glyph=\"${isMaximized?'glyph-dialog-restore':'glyph-dialog-expand'}\" click.trigger=\"expand($event)\" if.bind=\"maximizable\"></ui-header-tool>\n        <ui-header-tool close click.trigger=\"close($event)\" if.bind=\"closable\"></ui-header-tool>\n      </ui-header>\n      <ui-glyph class=\"ui-resizer\" glyph=\"glyph-dialog-resize\" if.bind=\"resizable\"></ui-glyph>\n      </div></div></template>", this.resources);
        var view = viewFactory.create(this.container);
        view.bind(vm);
        return view;
    };
    UIDialogService.prototype.initializeDialog = function (dialog) {
        this.windows.push(dialog);
        if (!dialog.modal) {
            dialog.taskButtonEl = document.createElement('button');
            dialog.taskButtonEl.classList.add('ui-active');
            dialog.taskButtonEl.innerHTML = '<ui-glyph class="${glyph}" glyph="${glyph}" if.bind="glyph"></ui-glyph><span class="ui-label">${title}</span>';
            dialog.taskButtonEl.window = dialog;
            if (ui_utils_1.UIUtils.taskbarContainer) {
                ui_utils_1.UIUtils.taskbarContainer.appendChild(dialog.taskButtonEl);
                this.templatingEngine.enhance({ element: dialog.taskButtonEl, bindingContext: dialog });
            }
            this.changeActive(dialog);
        }
    };
    UIDialogService.prototype.closeDialog = function (dialog, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!dialog)
            return;
        this.invokeLifecycle(dialog, 'canDeactivate', force)
            .then(function (canDeactivate) {
            if (force || canDeactivate) {
                dialog["childSlot"].detached();
                dialog.dialogWrapperEl.remove();
                _.remove(_this.windows, ['uniqId', dialog.uniqId]);
                if (!dialog.modal) {
                    aurelia_framework_1.DOM.removeNode(dialog.taskButtonEl);
                    _this.nextActive();
                }
                dialog["childSlot"].unbind();
                _this.invokeLifecycle(dialog, 'unbind', null);
                _this.invokeLifecycle(dialog, 'deactivate', null);
            }
        });
    };
    UIDialogService.prototype.getViewModel = function (instruction) {
        if (typeof instruction.viewModel === 'function') {
            instruction.viewModel = aurelia_metadata_1.Origin.get(instruction.viewModel).moduleId;
        }
        if (typeof instruction.viewModel === 'string') {
            return this.compositionEngine.ensureViewModel(instruction);
        }
        return Promise.resolve(instruction);
    };
    UIDialogService.prototype.invokeLifecycle = function (instance, name, model) {
        if (instance && typeof instance[name] === 'function') {
            var result = instance[name](model);
            if (result instanceof Promise) {
                return result;
            }
            if (result !== null && result !== undefined) {
                return Promise.resolve(result);
            }
            return Promise.resolve(true);
        }
        return Promise.resolve(true);
    };
    UIDialogService.prototype.changeActive = function (dialog) {
        if (!isEmpty(this.activeWin))
            this.activeWin.makeInactive();
        (this.activeWin = dialog).makeActive();
    };
    UIDialogService.prototype.taskClick = function (dialog, forceMin) {
        var _this = this;
        if (forceMin === void 0) { forceMin = false; }
        if (!dialog)
            return;
        if (dialog.isMinimized === false && dialog.isActive === true || forceMin) {
            dialog.minimize();
            if (dialog.isActive)
                ui_event_1.UIEvent.queueTask(function () { return _this.nextActive(); });
        }
        else {
            this.changeActive(dialog);
        }
    };
    UIDialogService.prototype.nextActive = function () {
        var nextActive;
        if (!isEmpty(nextActive = _.findLast(this.windows, ['isMinimized', false]))) {
            this.changeActive(nextActive);
        }
    };
    UIDialogService.prototype.moveStart = function ($event) {
        var _this = this;
        this.__dialog = getParentByClass($event.target, 'ui-dialog');
        if (this.__dialog === null || !this.__dialog.viewSlot)
            return;
        var dialog = this.__dialog.viewSlot.viewModel;
        if ($event.button != 0 || getParentByClass($event.target, 'ui-header-button') !== null) {
            return;
        }
        if (!dialog.modal)
            this.changeActive(dialog);
        if (getParentByClass($event.target, 'ui-resizer') === null &&
            getParentByClass($event.target, 'ui-header') === null) {
            return;
        }
        this.__isRtl = window.isRtl(ui_utils_1.UIUtils.dialogContainer);
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
        ui_utils_1.UIUtils.dialogContainer.addEventListener('mousemove', function (e) { return _this.move(e); });
        ui_utils_1.UIUtils.dialogContainer.addEventListener('mouseup', function () { return _this.moveEnd(); });
    };
    UIDialogService.prototype.moveEnd = function () {
        var _this = this;
        if (!this.__isDragging || this.__dialog == null) {
            return;
        }
        this.__dialog.classList.remove('ui-dragging');
        ui_utils_1.UIUtils.dialogContainer.classList.remove('ui-dragging');
        this.__isDragging = false;
        this.__dialog = null;
        ui_utils_1.UIUtils.dialogContainer.removeEventListener('mousemove', function (e) { return _this.move(e); });
        ui_utils_1.UIUtils.dialogContainer.removeEventListener('mouseup', function () { return _this.moveEnd(); });
    };
    UIDialogService.prototype.move = function ($event) {
        if (!this.__isDragging) {
            return;
        }
        if (!ui_utils_1.UIUtils.dialogContainer.classList.contains('ui-dragging')) {
            this.__dialog.classList.add('ui-dragging');
            ui_utils_1.UIUtils.dialogContainer.classList.add('ui-dragging');
        }
        var x = ($event.x || $event.clientX) - this.__startX;
        var y = ($event.y || $event.clientY) - this.__startY;
        x = (this.__isRtl ? -1 : 1) * x;
        var t = convertToPx(this.__dialog.style.top, this.__dialog);
        var l = convertToPx(this.__dialog.style[this.__isRtl ? 'right' : 'left'], this.__dialog);
        var w = convertToPx(this.__dialog.style.width, this.__dialog);
        var h = convertToPx(this.__dialog.style.height, this.__dialog);
        var pw = ui_utils_1.UIUtils.dialogContainer.offsetWidth;
        var ph = ui_utils_1.UIUtils.dialogContainer.offsetHeight;
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
            if (l + x + w + 16 > pw)
                x = 0;
            if (t + y + h + 54 > ph)
                y = 0;
            this.__dialog.style.width = (w + x) + 'px';
            this.__dialog.style.height = (h + y) + 'px';
        }
        this.__startX = x !== 0 ? ($event.x || $event.clientX) : this.__startX;
        this.__startY = y !== 0 ? ($event.y || $event.clientY) : this.__startY;
    };
    UIDialogService = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_2.singleton(),
        __metadata("design:paramtypes", [aurelia_framework_2.ViewCompiler,
            aurelia_framework_2.Container,
            aurelia_framework_2.ViewResources,
            aurelia_framework_2.CompositionEngine,
            aurelia_framework_2.TemplatingEngine])
    ], UIDialogService);
    return UIDialogService;
}());
exports.UIDialogService = UIDialogService;
var UIDialog = (function () {
    function UIDialog() {
        this.uniqId = "ui-win-" + UIDialog_1.seed++;
        this.isActive = true;
        this.isMaximized = false;
        this.isMinimized = false;
        this.posCurrent = {
            top: 0,
            'min-height': '100px', 'min-width': '300px',
            'max-height': 'none', 'max-width': 'none',
            height: '400px', width: '600px'
        };
        this.title = 'Dialog';
        this.theme = 'primary';
        this.width = '600px';
        this.height = '400px';
        this.minWidth = '300px';
        this.minHeight = '100px';
        this.maxWidth = 'none';
        this.maxHeight = 'none';
        this.modal = false;
        this.draggable = true;
        this.resizable = true;
        this.minimizable = true;
        this.maximizable = true;
        this.closable = true;
        this.maximized = false;
    }
    UIDialog_1 = UIDialog;
    UIDialog.prototype.bind = function (bindingContext, overrideContext) {
        var isRtl = window.isRtl(ui_utils_1.UIUtils.dialogContainer);
        var pw = ui_utils_1.UIUtils.dialogContainer.offsetWidth;
        var ph = ui_utils_1.UIUtils.dialogContainer.offsetHeight;
        this.posCurrent.width = this.width || this.minWidth || this.posCurrent.width;
        this.posCurrent.height = this.height || this.minHeight || this.posCurrent.height;
        this.posCurrent['min-width'] = this.minWidth || this.posCurrent['min-width'];
        this.posCurrent['min-height'] = this.minHeight || this.posCurrent['min-height'];
        this.posCurrent['max-width'] = this.maxWidth || this.posCurrent['max-width'];
        this.posCurrent['max-height'] = this.maxHeight || this.posCurrent['max-height'];
        if (!this.modal) {
            this.posCurrent.top = (UIDialog_1.posY = (UIDialog_1.posY + parseInt(this.posCurrent.height) + 32 > ph) ? 10 : UIDialog_1.posY + 30) + 'px';
            this.posCurrent.left = this.posCurrent.right = (UIDialog_1.posX = (UIDialog_1.posX + parseInt(this.posCurrent.width) + 32 > pw) ? (UIDialog_1.seedX += 60) : UIDialog_1.posX + 30) + 'px';
        }
        if (!this.id)
            this.id = this.uniqId;
    };
    UIDialog.prototype.attached = function () {
        if (this.maximized)
            this.expand(null);
    };
    UIDialog.prototype.focus = function () {
        var _this = this;
        ui_event_1.UIEvent.queueTask(function () {
            var el = _this.dialogEl.querySelector('input,textarea');
            if (el !== null)
                el.focus();
        });
    };
    UIDialog.prototype.makeActive = function () {
        this.isActive = true;
        this.isMinimized = false;
        this.dialogEl.classList.remove('ui-minimize');
        if (this.taskButtonEl)
            this.taskButtonEl.classList.add('ui-active');
    };
    UIDialog.prototype.makeInactive = function () {
        this.isActive = false;
        if (this.taskButtonEl)
            this.taskButtonEl.classList.remove('ui-active');
    };
    UIDialog.prototype.minimize = function () {
        this.isMinimized = true;
        this.dialogEl.classList.add('ui-minimize');
        if (this.taskButtonEl)
            this.taskButtonEl.classList.remove('ui-active');
    };
    UIDialog.prototype.expand = function ($event) {
        this.isMaximized = !this.isMaximized;
        if ($event)
            $event.cancelBubble = true;
        this.dialogEl.classList.toggle('ui-maximize');
    };
    UIDialog.prototype.collapse = function ($event) {
        if ($event)
            $event.cancelBubble = true;
        ui_event_1.UIEvent.fireEvent('collapse', this.dialogWrapperEl, this);
    };
    UIDialog.prototype.close = function ($event) {
        if ($event)
            $event.cancelBubble = true;
        ui_event_1.UIEvent.fireEvent('close', this.dialogWrapperEl, this);
    };
    UIDialog.prototype.toast = function (config) {
        if (typeof config === 'string')
            config = { message: config };
        config.container = this.dialogEl.querySelector('ui-dialog-body');
        ui_utils_1.UIUtils.toast(config);
    };
    UIDialog.seed = 0;
    UIDialog.seedX = 0;
    UIDialog.posX = 0;
    UIDialog.posY = 0;
    UIDialog = UIDialog_1 = __decorate([
        aurelia_framework_1.autoinject()
    ], UIDialog);
    return UIDialog;
    var UIDialog_1;
}());
exports.UIDialog = UIDialog;
