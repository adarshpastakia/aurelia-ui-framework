var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container } from "aurelia-framework";
import { validateTrigger, ValidationControllerFactory, ValidationRules, Validator } from "aurelia-validation";
export var getValidationController = function (validator) {
    var controller = Container.instance
        .get(ValidationControllerFactory)
        .createForCurrentScope(validator);
    controller.validateTrigger = validateTrigger.changeOrBlur;
    return controller;
};
export var registerValidators = function (container) {
    var validator = container.get(Validator);
    ValidationRules.customRule("url", function (value, obj) {
        return value === null ||
            value === undefined ||
            value === "" ||
            /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(value);
    }, "\${$displayName} is not a valid url.");
    ValidationRules.customRule("phone", function (value, obj) {
        return value === null || value === undefined || value === "" || PhoneLib.isValid(value);
    }, "\${$displayName} is not a valid phone number.");
    ValidationRules.customRule("number", function (value, obj, min, max) {
        return value === null ||
            value === undefined ||
            value === "" ||
            (isNumber(value) &&
                value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
                value <= (isEmpty(max) ? Number.MAX_VALUE : max));
    }, "\${$displayName} must be an number value between \${$config.min} and \${$config.max}.", function (min, max) { return ({ min: min, max: max }); });
    ValidationRules.customRule("decimal", function (value, obj, min, max) {
        return value === null ||
            value === undefined ||
            value === "" ||
            (isDecimal(value) &&
                value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
                value <= (isEmpty(max) ? Number.MAX_VALUE : max));
    }, "\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.", function (min, max) { return ({ min: min, max: max }); });
};
var UIValidationRenderer = /** @class */ (function () {
    function UIValidationRenderer() {
    }
    UIValidationRenderer.prototype.render = function (instruction) {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        try {
            for (var _e = __values(instruction.unrender), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = _f.value, result = _g.result, elements = _g.elements;
                try {
                    for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
                        var element = elements_1_1.value;
                        this.remove(element, result);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (elements_1_1 && !elements_1_1.done && (_b = elements_1.return)) _b.call(elements_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _h = __values(instruction.render), _j = _h.next(); !_j.done; _j = _h.next()) {
                var _k = _j.value, result = _k.result, elements = _k.elements;
                try {
                    for (var elements_2 = __values(elements), elements_2_1 = elements_2.next(); !elements_2_1.done; elements_2_1 = elements_2.next()) {
                        var element = elements_2_1.value;
                        this.add(element, result);
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (elements_2_1 && !elements_2_1.done && (_d = elements_2.return)) _d.call(elements_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    UIValidationRenderer.prototype.add = function (element, result) {
        if (result.valid) {
            return;
        }
        try {
            var vm = element.au.controller.viewModel;
            if (!vm.errors) {
                vm.errors = [];
            }
            if (vm.errors.indexOf(result) >= 0) {
                return;
            }
            vm.errors.push(result);
        }
        catch (E) {
            //
        }
    };
    UIValidationRenderer.prototype.remove = function (element, result) {
        if (result.valid) {
            return;
        }
        try {
            var vm = element.au.controller.viewModel;
            var i = vm.errors.length;
            while (i--) {
                var message = vm.errors[i];
                if (message.id === result.id) {
                    vm.errors.splice(i, 1);
                    break;
                }
            }
            if (vm.errors.length === 0) {
                vm.errors = [];
            }
        }
        catch (E) {
            //
        }
    };
    return UIValidationRenderer;
}());
export { UIValidationRenderer };
