var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject } from 'aurelia-framework';
import { Validator, ValidationRules } from "aurelia-validation";
import { UILanguage } from '../elements/inputs/ui-markdown';
import { UIUtils } from "./ui-utils";
import * as _ from "lodash";
export function loadValidators() {
    let validator = UIUtils.lazy(Validator);
    ValidationRules
        .customRule('url', (value, obj) => value === null || value === undefined || value === '' || (/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/).test(value), '\${$displayName } is not a valid url.');
    ValidationRules
        .customRule('phone', (value, obj) => value === null || value === undefined || value === '' || PhoneLib.isValid(value), '\${$displayName } is not a valid phone number.');
    ValidationRules
        .customRule('number', (value, obj, min, max) => value === null || value === undefined || value === '' || (isNumber(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)), '\${$displayName} must be an number value between \${$config.min} and \${$config.max}.', (min, max) => ({ min, max }));
    ValidationRules
        .customRule('decimal', (value, obj, min, max) => value === null || value === undefined || value === '' || (isDecimal(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)), '\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.', (min, max) => ({ min, max }));
    ValidationRules
        .customRule('language', (map, obj, langs = '') => {
        let promises = [];
        map.__errored__ = [];
        _.forEach(map, (model, key) => {
            if (model && key != '__errored__') {
                promises.push(validator.validateObject(model)
                    .then(e => {
                    if (_.filter(e, ['valid', false]).length > 0) {
                        map.__errored__.push(key);
                        return true;
                    }
                    return false;
                }));
            }
        });
        return Promise.all(promises).then(e => _.filter(e).length == 0);
    }, 'Some language entries contain invalid values');
}
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
