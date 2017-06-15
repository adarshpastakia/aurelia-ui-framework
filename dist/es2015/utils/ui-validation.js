var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject } from 'aurelia-framework';
import { UILanguage } from '../elements/inputs/ui-markdown';
let UIValidationRenderer = class UIValidationRenderer {
    render(instruction) {
        for (let { result, elements } of instruction.unrender) {
            for (let element of elements) {
                this.remove(element, result);
            }
        }
        for (let { result, elements } of instruction.render) {
            for (let element of elements) {
                this.add(element, result);
            }
        }
    }
    add(element, result) {
        if (result.valid) {
            return;
        }
        element.classList.add('ui-invalid');
        element.classList.remove('ui-valid');
        try {
            let vm = element.au.controller.viewModel;
            if (!vm.errors)
                vm.errors = [];
            if (~vm.errors.indexOf(result))
                return;
            if (element.au.controller.viewModel && element.au.controller.viewModel instanceof UILanguage) {
                let ms = result.message.split('|');
                vm.errors.push(result);
                vm.errored = result.object[result.propertyName].__errored__;
            }
            else
                vm.errors.push(result);
        }
        catch (E) { }
    }
    remove(element, result) {
        element.classList.remove('ui-invalid');
        element.classList.add('ui-valid');
        try {
            let vm = element.au.controller.viewModel;
            let i = vm.errors.length;
            while (i--) {
                let message = vm.errors[i];
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
    }
};
UIValidationRenderer = __decorate([
    autoinject()
], UIValidationRenderer);
export { UIValidationRenderer };
