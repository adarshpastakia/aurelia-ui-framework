var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", 'aurelia-framework', '../elements/inputs/ui-markdown'], function (require, exports, aurelia_framework_1, ui_markdown_1) {
    "use strict";
    var UIValidationRenderer = (function () {
        function UIValidationRenderer() {
        }
        UIValidationRenderer.prototype.render = function (instruction) {
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var _b = _a[_i], error = _b.error, elements = _b.elements;
                for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                    var element_1 = elements_1[_c];
                    this.remove(element_1, error);
                }
            }
            for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
                var _f = _e[_d], error = _f.error, elements = _f.elements;
                for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                    var element_2 = elements_2[_g];
                    this.add(element_2, error);
                }
            }
        };
        UIValidationRenderer.prototype.add = function (element, error) {
            element.classList.add('ui-invalid');
            element.classList.remove('ui-valid');
            try {
                var vm = element.au.controller.viewModel;
                if (!vm.errors)
                    vm.errors = [];
                if (element.au.controller.viewModel && element.au.controller.viewModel instanceof ui_markdown_1.UILanguage) {
                    var ms = error.message.split('|');
                    console.log(error);
                    vm.errors.push(error);
                    vm.errored = error.object[error.propertyName].__errored__;
                }
                else
                    vm.errors.push(error);
            }
            catch (E) { }
        };
        UIValidationRenderer.prototype.remove = function (element, error) {
            element.classList.remove('ui-invalid');
            element.classList.add('ui-valid');
            try {
                var vm = element.au.controller.viewModel;
                var i = vm.errors.length;
                while (i--) {
                    var message = vm.errors[i];
                    if (message.id == error.id) {
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
            aurelia_framework_1.autoinject(), 
            __metadata('design:paramtypes', [])
        ], UIValidationRenderer);
        return UIValidationRenderer;
    }());
    exports.UIValidationRenderer = UIValidationRenderer;
});
