var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-event", "./ui-utils", "lodash", "aurelia-metadata", "aurelia-framework"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1, _, aurelia_metadata_1, aurelia_framework_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
                return canActivate !== false ?
                    _this.compositionEngine.createController(instruction) :
                    Promise.reject(new Error('canActivate rejected'));
            })
                .then(function (controller) {
                controller.automate();
                var view = _this.createDialog(controller.viewModel);
                var childSlot = new aurelia_framework_2.ViewSlot(view['fragment'].querySelector('.ui-dialog'), true);
                childSlot.add(controller.view);
                childSlot.viewModel = controller.viewModel;
                var slot = new aurelia_framework_2.ViewSlot(ui_utils_1.UIUtils.dialogContainer, true);
                slot.add(view);
                (controller.viewModel['controller'] = controller).attached();
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
                if (force || canDeactivate !== false) {
                    dialog.controller.detached();
                    dialog.controller.unbind();
                    aurelia_framework_1.DOM.removeNode(dialog.dialogWrapperEl);
                    _.remove(_this.windows, ['uniqId', dialog.uniqId]);
                    if (!dialog.modal) {
                        aurelia_framework_1.DOM.removeNode(dialog.taskButtonEl);
                        _this.nextActive();
                    }
                    dialog.deactivate();
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3VpLWRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUF3QkE7UUFLRSx5QkFBb0IsUUFBc0IsRUFDaEMsU0FBb0IsRUFDcEIsU0FBd0IsRUFDeEIsaUJBQW9DLEVBQ3BDLGdCQUFrQztZQUp4QixhQUFRLEdBQVIsUUFBUSxDQUFjO1lBQ2hDLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBZTtZQUN4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7WUFQcEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1lBa0xwQixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixpQkFBWSxHQUFHLEtBQUssQ0FBQztZQUNyQixhQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsYUFBUSxHQUFHLENBQUMsQ0FBQztRQTlLckIsQ0FBQztRQUVPLG9DQUFVLEdBQWxCO1lBQUEsaUJBVUM7WUFUQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsa0JBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUM1QixrQkFBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO29CQUMxRixrQkFBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBQyxDQUFNLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQztvQkFDakcsa0JBQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBQyxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO2dCQUNsRixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLGtCQUFPLENBQUMsZ0JBQWdCLENBQUM7b0JBQUMsa0JBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFpQixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFyRixDQUFxRixDQUFDLENBQUM7WUFDakwsQ0FBQztRQUNILENBQUM7UUFFRCxvQ0FBVSxHQUFWLFVBQVcsRUFBRTtZQUNYLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQztnQkFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVELDhCQUFJLEdBQUosVUFBSyxFQUFFLEVBQUUsS0FBTTtZQUFmLGlCQWtDQztZQWpDQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFFbEIsSUFBSSxXQUFXLEdBQ2I7Z0JBQ0UsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO2dCQUN6QixjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7Z0JBQzVDLEtBQUssRUFBRSxLQUFLO2FBQ2IsQ0FBQztZQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztpQkFDbEMsSUFBSSxDQUFDLFVBQUEsY0FBYyxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsRUFBcEUsQ0FBb0UsQ0FBQztpQkFDNUYsSUFBSSxDQUFDLFVBQUEsV0FBVztnQkFDZixNQUFNLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFDO29CQUM1QixLQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDdEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxVQUFBLFVBQVU7Z0JBQ2QsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUV0QixJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxTQUFTLEdBQVEsSUFBSSw0QkFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3RGLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBRTNDLElBQUksSUFBSSxHQUFHLElBQUksNEJBQVEsQ0FBQyxrQkFBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFZixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRTdELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRUQsK0JBQUssR0FBTCxVQUFNLEVBQUUsRUFBRSxLQUFNO1lBQ2QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0MsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDO2dCQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1FBQ2YsQ0FBQztRQUVELGtDQUFRLEdBQVI7WUFBQSxpQkFFQztZQURDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVPLHNDQUFZLEdBQXBCLFVBQXFCLEVBQUU7WUFDckIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxRQUFRLENBQUMsQ0FBQztnQkFBQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7WUFFdEYsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMseTJCQVNkLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVPLDBDQUFnQixHQUF4QixVQUF5QixNQUFNO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRywrR0FBK0csQ0FBQztnQkFDaEosTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2dCQUNwQyxFQUFFLENBQUMsQ0FBQyxrQkFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztvQkFDN0Isa0JBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMxRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzFGLENBQUM7Z0JBRUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QixDQUFDO1FBQ0gsQ0FBQztRQUVPLHFDQUFXLEdBQW5CLFVBQW9CLE1BQU0sRUFBRSxLQUFhO1lBQXpDLGlCQW1CQztZQW5CMkIsc0JBQUEsRUFBQSxhQUFhO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUNwQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDO2lCQUNqRCxJQUFJLENBQUMsVUFBQSxhQUFhO2dCQUNqQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksYUFBYSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBRTNCLHVCQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztvQkFFdkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUNsQix1QkFBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ3BDLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztvQkFDcEIsQ0FBQztvQkFFRCxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3RCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyxzQ0FBWSxHQUFwQixVQUFxQixXQUFXO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sV0FBVyxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxXQUFXLENBQUMsU0FBUyxHQUFHLHlCQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDckUsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLE9BQU8sV0FBVyxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVPLHlDQUFlLEdBQXZCLFVBQXdCLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSztZQUMzQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDckQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQyxFQUFFLENBQUMsQ0FBQyxNQUFNLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakMsQ0FBQztnQkFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVPLHNDQUFZLEdBQXBCLFVBQXFCLE1BQU07WUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDNUQsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pDLENBQUM7UUFFTyxtQ0FBUyxHQUFqQixVQUFrQixNQUFNLEVBQUUsUUFBZ0I7WUFBMUMsaUJBU0M7WUFUeUIseUJBQUEsRUFBQSxnQkFBZ0I7WUFDeEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEtBQUssS0FBSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pFLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDbEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFBQyxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7WUFDbEUsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsQ0FBQztRQUNILENBQUM7UUFFTyxvQ0FBVSxHQUFsQjtZQUNFLElBQUksVUFBVSxDQUFDO1lBQ2YsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDSCxDQUFDO1FBWU8sbUNBQVMsR0FBakIsVUFBa0IsTUFBTTtZQUF4QixpQkF5Q0M7WUF4Q0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQUMsTUFBTSxDQUFDO1lBQzlELElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUVuRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLGtCQUFrQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkYsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztnQkFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLEtBQUssSUFBSTtnQkFDeEQsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4RCxNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEMsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbkMsQ0FBQztZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFbkUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUIsTUFBTSxDQUFDO1lBQ1QsQ0FBQztZQUVELGtCQUFPLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQVosQ0FBWSxDQUFDLENBQUM7WUFDM0Usa0JBQU8sQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsT0FBTyxFQUFFLEVBQWQsQ0FBYyxDQUFDLENBQUM7UUFDNUUsQ0FBQztRQUVPLGlDQUFPLEdBQWY7WUFBQSxpQkFXQztZQVZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sQ0FBQztZQUNULENBQUM7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUMsa0JBQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUVyQixrQkFBTyxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFaLENBQVksQ0FBQyxDQUFDO1lBQzlFLGtCQUFPLENBQUMsZUFBZSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFFTyw4QkFBSSxHQUFaLFVBQWEsTUFBTTtZQUNqQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQyxrQkFBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7WUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDckQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBRXJELENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFaEMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9ELElBQUksRUFBRSxHQUFHLGtCQUFPLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztZQUM3QyxJQUFJLEVBQUUsR0FBRyxrQkFBTyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUM7WUFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNkLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDUixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZCxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNOLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ1IsQ0FBQztnQkFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDTixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2xCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ04sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNsQixDQUFDO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3hFLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO29CQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7b0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM5QyxDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6RSxDQUFDO1FBdlNVLGVBQWU7WUFGM0IsOEJBQVUsRUFBRTtZQUNaLDZCQUFTLEVBQUU7NkNBTW9CLGdDQUFZO2dCQUNyQiw2QkFBUztnQkFDVCxpQ0FBYTtnQkFDTCxxQ0FBaUI7Z0JBQ2xCLG9DQUFnQjtXQVRqQyxlQUFlLENBd1MzQjtRQUFELHNCQUFDO0tBeFNELEFBd1NDLElBQUE7SUF4U1ksMENBQWU7SUEyUzVCO1FBREE7WUFnQ1UsV0FBTSxHQUFHLFlBQVUsVUFBUSxDQUFDLElBQUksRUFBSSxDQUFDO1lBTXJDLGFBQVEsR0FBRyxJQUFJLENBQUM7WUFDaEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFFcEIsZUFBVSxHQUFRO2dCQUN4QixHQUFHLEVBQUUsQ0FBQztnQkFDTixZQUFZLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPO2dCQUMzQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNO2dCQUN6QyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPO2FBQ2hDLENBQUM7WUFJSyxVQUFLLEdBQUcsUUFBUSxDQUFDO1lBQ2pCLFVBQUssR0FBRyxTQUFTLENBQUM7WUFDbEIsVUFBSyxHQUFHLE9BQU8sQ0FBQztZQUNoQixXQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLGFBQVEsR0FBRyxPQUFPLENBQUM7WUFDbkIsY0FBUyxHQUFHLE9BQU8sQ0FBQztZQUNwQixhQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ2xCLGNBQVMsR0FBRyxNQUFNLENBQUM7WUFDbkIsVUFBSyxHQUFZLEtBQUssQ0FBQztZQUN2QixjQUFTLEdBQVksSUFBSSxDQUFDO1lBQzFCLGNBQVMsR0FBWSxJQUFJLENBQUM7WUFDMUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7WUFDNUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7WUFDNUIsYUFBUSxHQUFZLElBQUksQ0FBQztZQUN6QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBZ0RwQyxDQUFDO3FCQWhIWSxRQUFRO1FBRW5CLHVCQUFJLEdBQUosVUFBSyxjQUF1QixFQUFFLGVBQXdCO1lBQ3BELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRCxJQUFJLEVBQUUsR0FBRyxrQkFBTyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUM7WUFDN0MsSUFBSSxFQUFFLEdBQUcsa0JBQU8sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO1lBRTlDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUM3RSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDakYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFaEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxVQUFRLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBUSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBUSxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVEsQ0FBQyxLQUFL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UUFBUSxDQUFDO2dCQUFDLE1BQU0sR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztZQUM3RCxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDakUsa0JBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQXJGTSxhQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ1QsY0FBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGFBQUksR0FBRyxDQUFDLENBQUM7UUFDVCxhQUFJLEdBQUcsQ0FBQyxDQUFDO1FBN0JMLFFBQVE7WUFEcEIsOEJBQVUsRUFBRTtXQUNBLFFBQVEsQ0FnSHBCO1FBQUQsZUFBQzs7S0FoSEQsQUFnSEMsSUFBQTtJQWhIWSw0QkFBUSIsImZpbGUiOiJ1dGlscy91aS1kaWFsb2cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBET00gfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4vdWktZXZlbnRcIjtcbmltcG9ydCB7IFVJVXRpbHMgfSBmcm9tIFwiLi91aS11dGlsc1wiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmltcG9ydCB7IE9yaWdpbiB9IGZyb20gXCJhdXJlbGlhLW1ldGFkYXRhXCI7XG5pbXBvcnQge1xuICBzaW5nbGV0b24sXG4gIENvbnRhaW5lcixcbiAgVmlld0NvbXBpbGVyLFxuICBWaWV3UmVzb3VyY2VzLFxuICBDb21wb3NpdGlvbkVuZ2luZSxcbiAgVGVtcGxhdGluZ0VuZ2luZSxcbiAgVmlld1Nsb3Rcbn0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBjaGlsZCB9IGZyb20gXCJhdXJlbGlhLXRlbXBsYXRpbmdcIjtcblxuQGF1dG9pbmplY3QoKVxuQHNpbmdsZXRvbigpXG5leHBvcnQgY2xhc3MgVUlEaWFsb2dTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhY3RpdmVXaW47XG4gIHByaXZhdGUgd2luZG93cyA9IFtdO1xuICBwcml2YXRlIGluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21waWxlcjogVmlld0NvbXBpbGVyLFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBDb250YWluZXIsXG4gICAgcHJpdmF0ZSByZXNvdXJjZXM6IFZpZXdSZXNvdXJjZXMsXG4gICAgcHJpdmF0ZSBjb21wb3NpdGlvbkVuZ2luZTogQ29tcG9zaXRpb25FbmdpbmUsXG4gICAgcHJpdmF0ZSB0ZW1wbGF0aW5nRW5naW5lOiBUZW1wbGF0aW5nRW5naW5lKSB7XG4gIH1cblxuICBwcml2YXRlIGluaXRpYWxpemUoKSB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIGlmIChVSVV0aWxzLmRpYWxvZ0NvbnRhaW5lcikge1xuICAgICAgICBVSVV0aWxzLmRpYWxvZ0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChlOiBhbnkpID0+IHRoaXMuY2xvc2VEaWFsb2coZS5kZXRhaWwpKTtcbiAgICAgICAgVUlVdGlscy5kaWFsb2dDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY29sbGFwc2UnLCAoZTogYW55KSA9PiB0aGlzLnRhc2tDbGljayhlLmRldGFpbCwgdHJ1ZSkpO1xuICAgICAgICBVSVV0aWxzLmRpYWxvZ0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4gdGhpcy5tb3ZlU3RhcnQoZSkpO1xuICAgICAgfVxuICAgICAgaWYgKFVJVXRpbHMudGFza2JhckNvbnRhaW5lcikgVUlVdGlscy50YXNrYmFyQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMudGFza0NsaWNrKChnZXRQYXJlbnRCeVRhZyhlLnRhcmdldCBhcyBFbGVtZW50LCAnYnV0dG9uJykgfHwgZS50YXJnZXQpWyd3aW5kb3cnXSkpO1xuICAgIH1cbiAgfVxuXG4gIG1ha2VBY3RpdmUoaWQpIHtcbiAgICBsZXQgd2luID0gXy5maW5kKHRoaXMud2luZG93cywgWydpZCcsIGlkXSk7XG4gICAgaWYgKHdpbikgdGhpcy5jaGFuZ2VBY3RpdmUod2luKTtcbiAgICByZXR1cm4gISF3aW47XG4gIH1cblxuICBzaG93KHZtLCBtb2RlbD8pIHtcbiAgICB0aGlzLmluaXRpYWxpemUoKTtcblxuICAgIGxldCBpbnN0cnVjdGlvbjogYW55ID1cbiAgICAgIHtcbiAgICAgICAgdmlld01vZGVsOiB2bSxcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmNvbnRhaW5lcixcbiAgICAgICAgY2hpbGRDb250YWluZXI6IHRoaXMuY29udGFpbmVyLmNyZWF0ZUNoaWxkKCksXG4gICAgICAgIG1vZGVsOiBtb2RlbFxuICAgICAgfTtcblxuICAgIHJldHVybiB0aGlzLmdldFZpZXdNb2RlbChpbnN0cnVjdGlvbilcbiAgICAgIC50aGVuKG5ld0luc3RydWN0aW9uID0+IHRoaXMuaW52b2tlTGlmZWN5Y2xlKG5ld0luc3RydWN0aW9uLnZpZXdNb2RlbCwgJ2NhbkFjdGl2YXRlJywgbW9kZWwpKVxuICAgICAgLnRoZW4oY2FuQWN0aXZhdGUgPT4ge1xuICAgICAgICByZXR1cm4gY2FuQWN0aXZhdGUgIT09IGZhbHNlID9cbiAgICAgICAgICB0aGlzLmNvbXBvc2l0aW9uRW5naW5lLmNyZWF0ZUNvbnRyb2xsZXIoaW5zdHJ1Y3Rpb24pIDpcbiAgICAgICAgICBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2NhbkFjdGl2YXRlIHJlamVjdGVkJykpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGNvbnRyb2xsZXIgPT4ge1xuICAgICAgICBjb250cm9sbGVyLmF1dG9tYXRlKCk7XG5cbiAgICAgICAgbGV0IHZpZXcgPSB0aGlzLmNyZWF0ZURpYWxvZyhjb250cm9sbGVyLnZpZXdNb2RlbCk7XG5cbiAgICAgICAgbGV0IGNoaWxkU2xvdDogYW55ID0gbmV3IFZpZXdTbG90KHZpZXdbJ2ZyYWdtZW50J10ucXVlcnlTZWxlY3RvcignLnVpLWRpYWxvZycpLCB0cnVlKTtcbiAgICAgICAgY2hpbGRTbG90LmFkZChjb250cm9sbGVyLnZpZXcpO1xuICAgICAgICBjaGlsZFNsb3Qudmlld01vZGVsID0gY29udHJvbGxlci52aWV3TW9kZWw7XG5cbiAgICAgICAgbGV0IHNsb3QgPSBuZXcgVmlld1Nsb3QoVUlVdGlscy5kaWFsb2dDb250YWluZXIsIHRydWUpO1xuICAgICAgICBzbG90LmFkZCh2aWV3KTtcblxuICAgICAgICAoY29udHJvbGxlci52aWV3TW9kZWxbJ2NvbnRyb2xsZXInXSA9IGNvbnRyb2xsZXIpLmF0dGFjaGVkKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplRGlhbG9nKGNvbnRyb2xsZXIudmlld01vZGVsKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgY2xvc2UoaWQsIGZvcmNlPykge1xuICAgIGxldCB3aW4gPSBfLmZpbmQodGhpcy53aW5kb3dzLCBbJ2lkJywgaWRdKTtcbiAgICBpZiAod2luKSB0aGlzLmNsb3NlRGlhbG9nKHdpbiwgZm9yY2UpO1xuICAgIHJldHVybiAhIXdpbjtcbiAgfVxuXG4gIGNsb3NlQWxsKCkge1xuICAgIF8uZm9yRWFjaCh0aGlzLndpbmRvd3MsIHdpbiA9PiB0aGlzLmNsb3NlRGlhbG9nKHdpbiwgdHJ1ZSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVEaWFsb2codm0pIHtcbiAgICBpZiAoISh2bSBpbnN0YW5jZW9mIFVJRGlhbG9nKSkgdGhyb3cgbmV3IEVycm9yKFwiVmlld01vZGVsIG11c3QgZXh0ZW5kIGZyb20gVUlEaWFsb2dcIik7XG5cbiAgICB2YXIgdmlld0ZhY3RvcnkgPSB0aGlzLmNvbXBpbGVyLmNvbXBpbGUoYDx0ZW1wbGF0ZT48ZGl2IGNsYXNzPVwiXFwke21vZGFsPyd1aS1tb2RhbCc6Jyd9IGF1LWFuaW1hdGUgdWktZGlhbG9nLXdyYXBwZXJcIiByZWY9XCJkaWFsb2dXcmFwcGVyRWxcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1kaWFsb2cgXFwke2lzQWN0aXZlPyd1aS1hY3RpdmUnOid1aS1pbmFjdGl2ZSd9XCIgcmVmPVwiZGlhbG9nRWxcIiBjc3MuYmluZD1cInBvc0N1cnJlbnRcIj5cbiAgICAgIDx1aS1oZWFkZXIgdGhlbWUuYmluZD1cInRoZW1lXCI+XG4gICAgICAgIDx1aS1oZWFkZXItdGl0bGUgZ2x5cGg9XCJcXCR7Z2x5cGh9XCI+XFwke3RpdGxlfTwvdWktaGVhZGVyLXRpdGxlPlxuICAgICAgICA8dWktaGVhZGVyLXRvb2wgbWluaW1pemUgY2xpY2sudHJpZ2dlcj1cImNvbGxhcHNlKCRldmVudClcIiBpZi5iaW5kPVwibWluaW1pemFibGUgJiYgIW1vZGFsXCI+PC91aS1oZWFkZXItdG9vbD5cbiAgICAgICAgPHVpLWhlYWRlci10b29sIGdseXBoPVwiXFwke2lzTWF4aW1pemVkPydnbHlwaC1kaWFsb2ctcmVzdG9yZSc6J2dseXBoLWRpYWxvZy1leHBhbmQnfVwiIGNsaWNrLnRyaWdnZXI9XCJleHBhbmQoJGV2ZW50KVwiIGlmLmJpbmQ9XCJtYXhpbWl6YWJsZVwiPjwvdWktaGVhZGVyLXRvb2w+XG4gICAgICAgIDx1aS1oZWFkZXItdG9vbCBjbG9zZSBjbGljay50cmlnZ2VyPVwiY2xvc2UoJGV2ZW50KVwiIGlmLmJpbmQ9XCJjbG9zYWJsZVwiPjwvdWktaGVhZGVyLXRvb2w+XG4gICAgICA8L3VpLWhlYWRlcj5cbiAgICAgIDx1aS1nbHlwaCBjbGFzcz1cInVpLXJlc2l6ZXJcIiBnbHlwaD1cImdseXBoLWRpYWxvZy1yZXNpemVcIiBpZi5iaW5kPVwicmVzaXphYmxlXCI+PC91aS1nbHlwaD5cbiAgICAgIDwvZGl2PjwvZGl2PjwvdGVtcGxhdGU+YCwgdGhpcy5yZXNvdXJjZXMpO1xuICAgIGxldCB2aWV3ID0gdmlld0ZhY3RvcnkuY3JlYXRlKHRoaXMuY29udGFpbmVyKTtcbiAgICB2aWV3LmJpbmQodm0pO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplRGlhbG9nKGRpYWxvZykge1xuICAgIHRoaXMud2luZG93cy5wdXNoKGRpYWxvZyk7XG4gICAgaWYgKCFkaWFsb2cubW9kYWwpIHtcbiAgICAgIGRpYWxvZy50YXNrQnV0dG9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIGRpYWxvZy50YXNrQnV0dG9uRWwuY2xhc3NMaXN0LmFkZCgndWktYWN0aXZlJyk7XG4gICAgICBkaWFsb2cudGFza0J1dHRvbkVsLmlubmVySFRNTCA9ICc8dWktZ2x5cGggY2xhc3M9XCIke2dseXBofVwiIGdseXBoPVwiJHtnbHlwaH1cIiBpZi5iaW5kPVwiZ2x5cGhcIj48L3VpLWdseXBoPjxzcGFuIGNsYXNzPVwidWktbGFiZWxcIj4ke3RpdGxlfTwvc3Bhbj4nO1xuICAgICAgZGlhbG9nLnRhc2tCdXR0b25FbC53aW5kb3cgPSBkaWFsb2c7XG4gICAgICBpZiAoVUlVdGlscy50YXNrYmFyQ29udGFpbmVyKSB7XG4gICAgICAgIFVJVXRpbHMudGFza2JhckNvbnRhaW5lci5hcHBlbmRDaGlsZChkaWFsb2cudGFza0J1dHRvbkVsKTtcbiAgICAgICAgdGhpcy50ZW1wbGF0aW5nRW5naW5lLmVuaGFuY2UoeyBlbGVtZW50OiBkaWFsb2cudGFza0J1dHRvbkVsLCBiaW5kaW5nQ29udGV4dDogZGlhbG9nIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNoYW5nZUFjdGl2ZShkaWFsb2cpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2xvc2VEaWFsb2coZGlhbG9nLCBmb3JjZSA9IGZhbHNlKSB7XG4gICAgaWYgKCFkaWFsb2cpIHJldHVybjtcbiAgICB0aGlzLmludm9rZUxpZmVjeWNsZShkaWFsb2csICdjYW5EZWFjdGl2YXRlJywgZm9yY2UpXG4gICAgICAudGhlbihjYW5EZWFjdGl2YXRlID0+IHtcbiAgICAgICAgaWYgKGZvcmNlIHx8IGNhbkRlYWN0aXZhdGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgZGlhbG9nLmNvbnRyb2xsZXIuZGV0YWNoZWQoKTtcbiAgICAgICAgICBkaWFsb2cuY29udHJvbGxlci51bmJpbmQoKTtcblxuICAgICAgICAgIERPTS5yZW1vdmVOb2RlKGRpYWxvZy5kaWFsb2dXcmFwcGVyRWwpO1xuXG4gICAgICAgICAgXy5yZW1vdmUodGhpcy53aW5kb3dzLCBbJ3VuaXFJZCcsIGRpYWxvZy51bmlxSWRdKTtcbiAgICAgICAgICBpZiAoIWRpYWxvZy5tb2RhbCkge1xuICAgICAgICAgICAgRE9NLnJlbW92ZU5vZGUoZGlhbG9nLnRhc2tCdXR0b25FbCk7XG4gICAgICAgICAgICB0aGlzLm5leHRBY3RpdmUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkaWFsb2cuZGVhY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld01vZGVsKGluc3RydWN0aW9uKSB7XG4gICAgaWYgKHR5cGVvZiBpbnN0cnVjdGlvbi52aWV3TW9kZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGluc3RydWN0aW9uLnZpZXdNb2RlbCA9IE9yaWdpbi5nZXQoaW5zdHJ1Y3Rpb24udmlld01vZGVsKS5tb2R1bGVJZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBpbnN0cnVjdGlvbi52aWV3TW9kZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21wb3NpdGlvbkVuZ2luZS5lbnN1cmVWaWV3TW9kZWwoaW5zdHJ1Y3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluc3RydWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgaW52b2tlTGlmZWN5Y2xlKGluc3RhbmNlLCBuYW1lLCBtb2RlbCkge1xuICAgIGlmIChpbnN0YW5jZSAmJiB0eXBlb2YgaW5zdGFuY2VbbmFtZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGxldCByZXN1bHQgPSBpbnN0YW5jZVtuYW1lXShtb2RlbCk7XG4gICAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VBY3RpdmUoZGlhbG9nKSB7XG4gICAgaWYgKCFpc0VtcHR5KHRoaXMuYWN0aXZlV2luKSkgdGhpcy5hY3RpdmVXaW4ubWFrZUluYWN0aXZlKCk7XG4gICAgKHRoaXMuYWN0aXZlV2luID0gZGlhbG9nKS5tYWtlQWN0aXZlKCk7XG4gIH1cblxuICBwcml2YXRlIHRhc2tDbGljayhkaWFsb2csIGZvcmNlTWluID0gZmFsc2UpIHtcbiAgICBpZiAoIWRpYWxvZykgcmV0dXJuO1xuICAgIGlmIChkaWFsb2cuaXNNaW5pbWl6ZWQgPT09IGZhbHNlICYmIGRpYWxvZy5pc0FjdGl2ZSA9PT0gdHJ1ZSB8fCBmb3JjZU1pbikge1xuICAgICAgZGlhbG9nLm1pbmltaXplKCk7XG4gICAgICBpZiAoZGlhbG9nLmlzQWN0aXZlKSBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiB0aGlzLm5leHRBY3RpdmUoKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5jaGFuZ2VBY3RpdmUoZGlhbG9nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5leHRBY3RpdmUoKSB7XG4gICAgbGV0IG5leHRBY3RpdmU7XG4gICAgaWYgKCFpc0VtcHR5KG5leHRBY3RpdmUgPSBfLmZpbmRMYXN0KHRoaXMud2luZG93cywgWydpc01pbmltaXplZCcsIGZhbHNlXSkpKSB7XG4gICAgICB0aGlzLmNoYW5nZUFjdGl2ZShuZXh0QWN0aXZlKTtcbiAgICB9XG4gIH1cblxuICAvKipcblx0ICogZGlhbG9nIG1vdmVcblx0ICovXG4gIHByaXZhdGUgX19pc0RyYWdnaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX19pc1Jlc2l6aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX19zdGFydFggPSAwO1xuICBwcml2YXRlIF9fc3RhcnRZID0gMDtcbiAgcHJpdmF0ZSBfX2RpYWxvZztcbiAgcHJpdmF0ZSBfX2lzUnRsO1xuXG4gIHByaXZhdGUgbW92ZVN0YXJ0KCRldmVudCkge1xuICAgIHRoaXMuX19kaWFsb2cgPSBnZXRQYXJlbnRCeUNsYXNzKCRldmVudC50YXJnZXQsICd1aS1kaWFsb2cnKTtcbiAgICBpZiAodGhpcy5fX2RpYWxvZyA9PT0gbnVsbCB8fCAhdGhpcy5fX2RpYWxvZy52aWV3U2xvdCkgcmV0dXJuO1xuICAgIGxldCBkaWFsb2c6IGFueSA9IHRoaXMuX19kaWFsb2cudmlld1Nsb3Qudmlld01vZGVsO1xuXG4gICAgaWYgKCRldmVudC5idXR0b24gIT0gMCB8fCBnZXRQYXJlbnRCeUNsYXNzKCRldmVudC50YXJnZXQsICd1aS1oZWFkZXItYnV0dG9uJykgIT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFkaWFsb2cubW9kYWwpIHRoaXMuY2hhbmdlQWN0aXZlKGRpYWxvZyk7XG4gICAgaWYgKGdldFBhcmVudEJ5Q2xhc3MoJGV2ZW50LnRhcmdldCwgJ3VpLXJlc2l6ZXInKSA9PT0gbnVsbCAmJlxuICAgICAgZ2V0UGFyZW50QnlDbGFzcygkZXZlbnQudGFyZ2V0LCAndWktaGVhZGVyJykgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9faXNSdGwgPSB3aW5kb3cuaXNSdGwoVUlVdGlscy5kaWFsb2dDb250YWluZXIpO1xuICAgIGlmICh0aGlzLl9faXNSdGwgJiYgIXRoaXMuX19kaWFsb2cuc3R5bGUucmlnaHQpIHtcbiAgICAgIHRoaXMuX19kaWFsb2cuc3R5bGUucmlnaHQgPSB0aGlzLl9fZGlhbG9nLnN0eWxlLmxlZnQ7XG4gICAgICB0aGlzLl9fZGlhbG9nLnN0eWxlLmxlZnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuX19pc1J0bCAmJiAhdGhpcy5fX2RpYWxvZy5zdHlsZS5sZWZ0KSB7XG4gICAgICB0aGlzLl9fZGlhbG9nLnN0eWxlLmxlZnQgPSB0aGlzLl9fZGlhbG9nLnN0eWxlLnJpZ2h0O1xuICAgICAgdGhpcy5fX2RpYWxvZy5zdHlsZS5yaWdodCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuX19zdGFydFggPSAoJGV2ZW50LnggfHwgJGV2ZW50LmNsaWVudFgpO1xuICAgIHRoaXMuX19zdGFydFkgPSAoJGV2ZW50LnkgfHwgJGV2ZW50LmNsaWVudFkpO1xuICAgIHRoaXMuX19pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICB0aGlzLl9faXNSZXNpemluZyA9ICRldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd1aS1yZXNpemVyJyk7XG5cbiAgICBpZiAodGhpcy5fX2lzUmVzaXppbmcgJiYgIWRpYWxvZy5yZXNpemFibGUpIHtcbiAgICAgIHRoaXMuX19pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9faXNSZXNpemluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIGlmICghdGhpcy5fX2lzUmVzaXppbmcgJiYgKCFkaWFsb2cuZHJhZ2dhYmxlIHx8IGRpYWxvZy5tb2RhbCkpIHtcbiAgICAgIHRoaXMuX19pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9faXNSZXNpemluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFVJVXRpbHMuZGlhbG9nQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB0aGlzLm1vdmUoZSkpO1xuICAgIFVJVXRpbHMuZGlhbG9nQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB0aGlzLm1vdmVFbmQoKSk7XG4gIH1cblxuICBwcml2YXRlIG1vdmVFbmQoKSB7XG4gICAgaWYgKCF0aGlzLl9faXNEcmFnZ2luZyB8fCB0aGlzLl9fZGlhbG9nID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fX2RpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCd1aS1kcmFnZ2luZycpO1xuICAgIFVJVXRpbHMuZGlhbG9nQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWRyYWdnaW5nJyk7XG4gICAgdGhpcy5fX2lzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9fZGlhbG9nID0gbnVsbDtcblxuICAgIFVJVXRpbHMuZGlhbG9nQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB0aGlzLm1vdmUoZSkpO1xuICAgIFVJVXRpbHMuZGlhbG9nQ29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB0aGlzLm1vdmVFbmQoKSk7XG4gIH1cblxuICBwcml2YXRlIG1vdmUoJGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLl9faXNEcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghVUlVdGlscy5kaWFsb2dDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCd1aS1kcmFnZ2luZycpKSB7XG4gICAgICB0aGlzLl9fZGlhbG9nLmNsYXNzTGlzdC5hZGQoJ3VpLWRyYWdnaW5nJyk7XG4gICAgICBVSVV0aWxzLmRpYWxvZ0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd1aS1kcmFnZ2luZycpO1xuICAgIH1cblxuICAgIGxldCB4ID0gKCRldmVudC54IHx8ICRldmVudC5jbGllbnRYKSAtIHRoaXMuX19zdGFydFg7XG4gICAgbGV0IHkgPSAoJGV2ZW50LnkgfHwgJGV2ZW50LmNsaWVudFkpIC0gdGhpcy5fX3N0YXJ0WTtcblxuICAgIHggPSAodGhpcy5fX2lzUnRsID8gLTEgOiAxKSAqIHg7XG5cbiAgICBsZXQgdCA9IGNvbnZlcnRUb1B4KHRoaXMuX19kaWFsb2cuc3R5bGUudG9wLCB0aGlzLl9fZGlhbG9nKTtcbiAgICBsZXQgbCA9IGNvbnZlcnRUb1B4KHRoaXMuX19kaWFsb2cuc3R5bGVbdGhpcy5fX2lzUnRsID8gJ3JpZ2h0JyA6ICdsZWZ0J10sIHRoaXMuX19kaWFsb2cpO1xuICAgIGxldCB3ID0gY29udmVydFRvUHgodGhpcy5fX2RpYWxvZy5zdHlsZS53aWR0aCwgdGhpcy5fX2RpYWxvZyk7XG4gICAgbGV0IGggPSBjb252ZXJ0VG9QeCh0aGlzLl9fZGlhbG9nLnN0eWxlLmhlaWdodCwgdGhpcy5fX2RpYWxvZyk7XG4gICAgbGV0IHB3ID0gVUlVdGlscy5kaWFsb2dDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHBoID0gVUlVdGlscy5kaWFsb2dDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuICAgIGlmICghdGhpcy5fX2lzUmVzaXppbmcpIHtcbiAgICAgIGlmIChsICsgeCA8IDApIHtcbiAgICAgICAgeCA9IDA7XG4gICAgICAgIGwgPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHQgKyB5IDwgMCkge1xuICAgICAgICB5ID0gMDtcbiAgICAgICAgdCA9IDA7XG4gICAgICB9XG4gICAgICBpZiAobCArIHggKyB3ICsgMTYgPiBwdykge1xuICAgICAgICB4ID0gMDtcbiAgICAgICAgbCA9IHB3IC0gdyAtIDE2O1xuICAgICAgfVxuICAgICAgaWYgKHQgKyB5ICsgaCArIDU0ID4gcGgpIHtcbiAgICAgICAgeSA9IDA7XG4gICAgICAgIHQgPSBwaCAtIGggLSA1NDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX19kaWFsb2cuc3R5bGUudG9wID0gKHQgKyB5KSArICdweCc7XG4gICAgICB0aGlzLl9fZGlhbG9nLnN0eWxlW3RoaXMuX19pc1J0bCA/ICdyaWdodCcgOiAnbGVmdCddID0gKGwgKyB4KSArICdweCc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaWYgKGwgKyB4ICsgdyArIDE2ID4gcHcpIHggPSAwO1xuICAgICAgaWYgKHQgKyB5ICsgaCArIDU0ID4gcGgpIHkgPSAwO1xuXG4gICAgICB0aGlzLl9fZGlhbG9nLnN0eWxlLndpZHRoID0gKHcgKyB4KSArICdweCc7XG4gICAgICB0aGlzLl9fZGlhbG9nLnN0eWxlLmhlaWdodCA9IChoICsgeSkgKyAncHgnO1xuICAgIH1cblxuICAgIHRoaXMuX19zdGFydFggPSB4ICE9PSAwID8gKCRldmVudC54IHx8ICRldmVudC5jbGllbnRYKSA6IHRoaXMuX19zdGFydFg7XG4gICAgdGhpcy5fX3N0YXJ0WSA9IHkgIT09IDAgPyAoJGV2ZW50LnkgfHwgJGV2ZW50LmNsaWVudFkpIDogdGhpcy5fX3N0YXJ0WTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5leHBvcnQgY2xhc3MgVUlEaWFsb2cge1xuICAvLyBhdXJlbGlhIGhvb2tzXG4gIGJpbmQoYmluZGluZ0NvbnRleHQ/OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dD86IE9iamVjdCkge1xuICAgIGxldCBpc1J0bCA9IHdpbmRvdy5pc1J0bChVSVV0aWxzLmRpYWxvZ0NvbnRhaW5lcik7XG4gICAgbGV0IHB3ID0gVUlVdGlscy5kaWFsb2dDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgbGV0IHBoID0gVUlVdGlscy5kaWFsb2dDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgdGhpcy5wb3NDdXJyZW50LndpZHRoID0gdGhpcy53aWR0aCB8fCB0aGlzLm1pbldpZHRoIHx8IHRoaXMucG9zQ3VycmVudC53aWR0aDtcbiAgICB0aGlzLnBvc0N1cnJlbnQuaGVpZ2h0ID0gdGhpcy5oZWlnaHQgfHwgdGhpcy5taW5IZWlnaHQgfHwgdGhpcy5wb3NDdXJyZW50LmhlaWdodDtcbiAgICB0aGlzLnBvc0N1cnJlbnRbJ21pbi13aWR0aCddID0gdGhpcy5taW5XaWR0aCB8fCB0aGlzLnBvc0N1cnJlbnRbJ21pbi13aWR0aCddO1xuICAgIHRoaXMucG9zQ3VycmVudFsnbWluLWhlaWdodCddID0gdGhpcy5taW5IZWlnaHQgfHwgdGhpcy5wb3NDdXJyZW50WydtaW4taGVpZ2h0J107XG4gICAgdGhpcy5wb3NDdXJyZW50WydtYXgtd2lkdGgnXSA9IHRoaXMubWF4V2lkdGggfHwgdGhpcy5wb3NDdXJyZW50WydtYXgtd2lkdGgnXTtcbiAgICB0aGlzLnBvc0N1cnJlbnRbJ21heC1oZWlnaHQnXSA9IHRoaXMubWF4SGVpZ2h0IHx8IHRoaXMucG9zQ3VycmVudFsnbWF4LWhlaWdodCddO1xuXG4gICAgaWYgKCF0aGlzLm1vZGFsKSB7XG4gICAgICB0aGlzLnBvc0N1cnJlbnQudG9wID0gKFVJRGlhbG9nLnBvc1kgPSAoVUlEaWFsb2cucG9zWSArIHBhcnNlSW50KHRoaXMucG9zQ3VycmVudC5oZWlnaHQpICsgMzIgPiBwaCkgPyAxMCA6IFVJRGlhbG9nLnBvc1kgKyAzMCkgKyAncHgnO1xuICAgICAgdGhpcy5wb3NDdXJyZW50LmxlZnQgPSB0aGlzLnBvc0N1cnJlbnQucmlnaHQgPSAoVUlEaWFsb2cucG9zWCA9IChVSURpYWxvZy5wb3NYICsgcGFyc2VJbnQodGhpcy5wb3NDdXJyZW50LndpZHRoKSArIDMyID4gcHcpID8gKFVJRGlhbG9nLnNlZWRYICs9IDYwKSA6IFVJRGlhbG9nLnBvc1ggKyAzMCkgKyAncHgnO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pZCkgdGhpcy5pZCA9IHRoaXMudW5pcUlkO1xuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIGlmICh0aGlzLm1heGltaXplZCkgdGhpcy5leHBhbmQobnVsbCk7XG4gIH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBzdGF0aWMgc2VlZCA9IDA7XG4gIHN0YXRpYyBzZWVkWCA9IDA7XG4gIHN0YXRpYyBwb3NYID0gMDtcbiAgc3RhdGljIHBvc1kgPSAwO1xuXG4gIHByaXZhdGUgdW5pcUlkID0gYHVpLXdpbi0ke1VJRGlhbG9nLnNlZWQrK31gO1xuXG4gIHByaXZhdGUgZGlhbG9nRWw7XG4gIHByaXZhdGUgdGFza0J1dHRvbkVsO1xuICBwcml2YXRlIGRpYWxvZ1dyYXBwZXJFbDtcblxuICBwcml2YXRlIGlzQWN0aXZlID0gdHJ1ZTtcbiAgcHJpdmF0ZSBpc01heGltaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIGlzTWluaW1pemVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBwb3NDdXJyZW50OiBhbnkgPSB7XG4gICAgdG9wOiAwLFxuICAgICdtaW4taGVpZ2h0JzogJzEwMHB4JywgJ21pbi13aWR0aCc6ICczMDBweCcsXG4gICAgJ21heC1oZWlnaHQnOiAnbm9uZScsICdtYXgtd2lkdGgnOiAnbm9uZScsXG4gICAgaGVpZ2h0OiAnNDAwcHgnLCB3aWR0aDogJzYwMHB4J1xuICB9O1xuXG4gIHB1YmxpYyBpZDtcbiAgcHVibGljIGdseXBoO1xuICBwdWJsaWMgdGl0bGUgPSAnRGlhbG9nJztcbiAgcHVibGljIHRoZW1lID0gJ3ByaW1hcnknO1xuICBwdWJsaWMgd2lkdGggPSAnNjAwcHgnO1xuICBwdWJsaWMgaGVpZ2h0ID0gJzQwMHB4JztcbiAgcHVibGljIG1pbldpZHRoID0gJzMwMHB4JztcbiAgcHVibGljIG1pbkhlaWdodCA9ICcxMDBweCc7XG4gIHB1YmxpYyBtYXhXaWR0aCA9ICdub25lJztcbiAgcHVibGljIG1heEhlaWdodCA9ICdub25lJztcbiAgcHVibGljIG1vZGFsOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBkcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBwdWJsaWMgcmVzaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIG1pbmltaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIG1heGltaXphYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIG1heGltaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGZvY3VzKCkge1xuICAgIFVJRXZlbnQucXVldWVUYXNrKCgpID0+IHtcbiAgICAgIGxldCBlbDogYW55ID0gdGhpcy5kaWFsb2dFbC5xdWVyeVNlbGVjdG9yKCdpbnB1dCx0ZXh0YXJlYScpO1xuICAgICAgaWYgKGVsICE9PSBudWxsKSBlbC5mb2N1cygpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFrZUFjdGl2ZSgpIHtcbiAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmlzTWluaW1pemVkID0gZmFsc2U7XG4gICAgdGhpcy5kaWFsb2dFbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1taW5pbWl6ZScpO1xuICAgIGlmICh0aGlzLnRhc2tCdXR0b25FbCkgdGhpcy50YXNrQnV0dG9uRWwuY2xhc3NMaXN0LmFkZCgndWktYWN0aXZlJyk7XG4gIH1cblxuICBtYWtlSW5hY3RpdmUoKSB7XG4gICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnRhc2tCdXR0b25FbCkgdGhpcy50YXNrQnV0dG9uRWwuY2xhc3NMaXN0LnJlbW92ZSgndWktYWN0aXZlJyk7XG4gIH1cblxuICBtaW5pbWl6ZSgpIHtcbiAgICB0aGlzLmlzTWluaW1pemVkID0gdHJ1ZTtcbiAgICB0aGlzLmRpYWxvZ0VsLmNsYXNzTGlzdC5hZGQoJ3VpLW1pbmltaXplJyk7XG4gICAgaWYgKHRoaXMudGFza0J1dHRvbkVsKSB0aGlzLnRhc2tCdXR0b25FbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1hY3RpdmUnKTtcbiAgfVxuXG4gIGV4cGFuZCgkZXZlbnQpIHtcbiAgICB0aGlzLmlzTWF4aW1pemVkID0gIXRoaXMuaXNNYXhpbWl6ZWQ7XG4gICAgaWYgKCRldmVudCkgJGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgdGhpcy5kaWFsb2dFbC5jbGFzc0xpc3QudG9nZ2xlKCd1aS1tYXhpbWl6ZScpO1xuICB9XG5cbiAgY29sbGFwc2UoJGV2ZW50KSB7XG4gICAgaWYgKCRldmVudCkgJGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2NvbGxhcHNlJywgdGhpcy5kaWFsb2dXcmFwcGVyRWwsIHRoaXMpO1xuICB9XG5cbiAgY2xvc2UoJGV2ZW50Pykge1xuICAgIGlmICgkZXZlbnQpICRldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIFVJRXZlbnQuZmlyZUV2ZW50KCdjbG9zZScsIHRoaXMuZGlhbG9nV3JhcHBlckVsLCB0aGlzKTtcbiAgfVxuXG4gIHRvYXN0KGNvbmZpZykge1xuICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykgY29uZmlnID0geyBtZXNzYWdlOiBjb25maWcgfTtcbiAgICBjb25maWcuY29udGFpbmVyID0gdGhpcy5kaWFsb2dFbC5xdWVyeVNlbGVjdG9yKCd1aS1kaWFsb2ctYm9keScpO1xuICAgIFVJVXRpbHMudG9hc3QoY29uZmlnKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
