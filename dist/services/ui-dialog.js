var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, CompositionEngine, Container, singleton } from "aurelia-framework";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";
import { UIDialogElement } from "./../panels/ui-dialog";
var UIDialogService = /** @class */ (function () {
    function UIDialogService(appConfig, container, compositionEngine) {
        this.appConfig = appConfig;
        this.container = container;
        this.compositionEngine = compositionEngine;
        this.windows = [];
        this.initialized = false;
        this.dragObject = {
            dialog: undefined,
            dlgHeight: 0,
            dlgWidth: 0,
            isDragging: false,
            left: 0,
            maxHeight: 0,
            maxWidth: 0,
            startX: 0,
            startY: 0,
            top: 0
        };
    }
    UIDialogService.prototype.open = function (viewModel, model) {
        var _this = this;
        this.initialize();
        var instruction = {
            childContainer: this.container.createChild(),
            container: this.container,
            model: model,
            viewModel: viewModel
        };
        return new Promise(function (resolve) {
            _this.getViewModel(instruction)
                .then(function (newInstruction) {
                return UIInternal.invokeLifecycle(newInstruction.viewModel, "canActivate", model);
            })
                .then(function (canActivate) {
                return canActivate !== false
                    ? _this.compositionEngine.createController(instruction)
                    : Promise.reject(new Error("canActivate rejected"));
            })
                .then(function (controller) {
                controller.automate();
                var dialog = controller.view.controllers.find(function (c) { return c.viewModel instanceof UIDialogElement; });
                dialog.viewModel.viewController = controller;
                dialog.viewModel.returnPromise = resolve;
                _this.appConfig.DialogContainer.add(controller.view);
                if (dialog.viewModel.taskButton) {
                    _this.appConfig.TaskbarContainer.add(dialog.viewModel.taskButton);
                }
                controller.attached();
                if (_this.activeWin) {
                    _this.activeWin.active = false;
                }
                _this.windows.unshift((_this.activeWin = dialog.viewModel));
            });
        });
    };
    UIDialogService.prototype.initialize = function () {
        var _this = this;
        if (!this.initialized) {
            this.initialized = true;
            UIInternal.subscribe("dlg:close", function (d) { return _this.closeDialog(d); });
            UIInternal.subscribe("dlg:activate", function (d) { return _this.activate(d.dialog); });
            UIInternal.subscribe("dlg:minimize", function (d) { return _this.minimizeDialog(d.dialog); });
            UIInternal.subscribe("dlg:drag", function (d) { return _this.startDrag(d); });
            document.addEventListener("mousemove", function (e) { return _this.drag(e); });
            document.addEventListener("mouseup", function (e) { return _this.stopDrag(e); });
            if (this.appConfig.TaskbarContainer) {
                this.appConfig.TaskbarContainer.anchor.addEventListener("click", function (e) {
                    try {
                        var dialog = e.target.au.controller.scope.bindingContext;
                        if (dialog.minimized || dialog.active) {
                            dialog.minimize();
                        }
                        else {
                            _this.activate(dialog);
                        }
                    }
                    catch (ex) {
                        //
                    }
                });
            }
        }
    };
    UIDialogService.prototype.startDrag = function (startObject) {
        this.dragObject = __assign({}, startObject, { dlgHeight: startObject.dialog.dialogEl.offsetHeight, dlgWidth: startObject.dialog.dialogEl.offsetWidth, isDragging: true, left: parseInt(startObject.dialog.position.left, 10), maxHeight: this.appConfig.DialogContainer.anchor.offsetHeight, maxWidth: this.appConfig.DialogContainer.anchor.offsetWidth, top: parseInt(startObject.dialog.position.top, 10) });
    };
    UIDialogService.prototype.drag = function ($event) {
        if (this.dragObject.isDragging) {
            var leftDiff = ($event.x || $event.clientX) - this.dragObject.startX;
            var topDiff = ($event.y || $event.clientY) - this.dragObject.startY;
            if (this.dragObject.left + leftDiff + this.dragObject.dlgWidth > this.dragObject.maxWidth) {
                this.dragObject.dialog.position.left =
                    this.dragObject.maxWidth - this.dragObject.dlgWidth + "px";
            }
            else if (this.dragObject.left + leftDiff > 0) {
                this.dragObject.dialog.position.left = this.dragObject.left + leftDiff + "px";
            }
            if (this.dragObject.top + topDiff + this.dragObject.dlgHeight > this.dragObject.maxHeight) {
                this.dragObject.dialog.position.top =
                    this.dragObject.maxHeight - this.dragObject.dlgHeight + "px";
            }
            else if (this.dragObject.top + topDiff > 0) {
                this.dragObject.dialog.position.top = this.dragObject.top + topDiff + "px";
            }
        }
    };
    UIDialogService.prototype.stopDrag = function ($event) {
        if (this.dragObject.isDragging) {
            this.dragObject.isDragging = false;
        }
    };
    UIDialogService.prototype.minimizeDialog = function (dialog) {
        if (dialog) {
            if (dialog.minimized && this.activeWin === dialog) {
                this.activeWin = this.windows.find(function (d) { return !d.active && !d.minimized && d !== dialog; });
                this.activeWin ? (this.activeWin.active = true) : fn();
            }
            else {
                this.activate(dialog);
            }
        }
    };
    UIDialogService.prototype.closeDialog = function (detail) {
        var _this = this;
        if (detail && detail.dialog) {
            var dialog_1 = detail.dialog, result_1 = detail.result;
            UIInternal.invokeLifecycle(dialog_1.viewController.viewModel, "canDeactivate", result_1).then(function (canDeactivate) {
                if (canDeactivate !== false) {
                    UIInternal.invokeLifecycle(dialog_1.viewController.viewModel, "deactivate");
                    _this.appConfig.DialogContainer.remove(dialog_1.viewController.view);
                    if (dialog_1.taskButton) {
                        _this.appConfig.TaskbarContainer.remove(dialog_1.taskButton);
                    }
                    dialog_1.viewController.unbind();
                    dialog_1.returnPromise({ result: result_1, cancelled: result_1 === undefined });
                    _this.windows.remove(dialog_1);
                    _this.activeWin = _this.windows.find(function (win) { return !win.minimized; });
                    if (_this.activeWin) {
                        _this.activeWin.active = true;
                    }
                }
            });
        }
    };
    UIDialogService.prototype.activate = function (dialog) {
        if (this.activeWin) {
            this.activeWin.active = false;
        }
        this.activeWin = dialog;
        dialog.active = true;
    };
    UIDialogService.prototype.getViewModel = function (instruction) {
        if (isString(instruction.viewModel)) {
            return this.compositionEngine.ensureViewModel(instruction);
        }
        return Promise.resolve(instruction);
    };
    UIDialogService = __decorate([
        autoinject(),
        singleton(),
        __metadata("design:paramtypes", [UIAppConfig,
            Container,
            CompositionEngine])
    ], UIDialogService);
    return UIDialogService;
}());
export { UIDialogService };
