System.register(["aurelia-framework", "../elements/inputs/ui-markdown"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ui_markdown_1, UIValidationRenderer;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_markdown_1_1) {
                ui_markdown_1 = ui_markdown_1_1;
            }
        ],
        execute: function () {
            UIValidationRenderer = (function () {
                function UIValidationRenderer() {
                }
                UIValidationRenderer.prototype.render = function (instruction) {
                    for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                        var _b = _a[_i], result = _b.result, elements = _b.elements;
                        for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                            var element = elements_1[_c];
                            this.remove(element, result);
                        }
                    }
                    for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
                        var _f = _e[_d], result = _f.result, elements = _f.elements;
                        for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                            var element = elements_2[_g];
                            this.add(element, result);
                        }
                    }
                };
                UIValidationRenderer.prototype.add = function (element, result) {
                    if (result.valid) {
                        return;
                    }
                    element.classList.add('ui-invalid');
                    element.classList.remove('ui-valid');
                    try {
                        var vm = element.au.controller.viewModel;
                        if (!vm.errors)
                            vm.errors = [];
                        if (~vm.errors.indexOf(result))
                            return;
                        if (element.au.controller.viewModel && element.au.controller.viewModel instanceof ui_markdown_1.UILanguage) {
                            var ms = result.message.split('|');
                            vm.errors.push(result);
                            vm.errored = result.object[result.propertyName].__errored__;
                        }
                        else
                            vm.errors.push(result);
                    }
                    catch (E) { }
                };
                UIValidationRenderer.prototype.remove = function (element, result) {
                    element.classList.remove('ui-invalid');
                    element.classList.add('ui-valid');
                    try {
                        var vm = element.au.controller.viewModel;
                        var i = vm.errors.length;
                        while (i--) {
                            var message = vm.errors[i];
                            if (message.id == result.id) {
                                vm.errors.splice(i, 1);
                                break;
                            }
                        }
                        if (vm.errors.length == 0) {
                            vm.errors = null;
                            vm.errored = [];
                            element.classList.remove('ui-invalid');
                            element.classList.add('ui-valid');
                        }
                    }
                    catch (E) { }
                };
                UIValidationRenderer = __decorate([
                    aurelia_framework_1.autoinject()
                ], UIValidationRenderer);
                return UIValidationRenderer;
            }());
            exports_1("UIValidationRenderer", UIValidationRenderer);
        }
    };
});
