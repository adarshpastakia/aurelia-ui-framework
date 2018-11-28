/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container } from "aurelia-framework";
import {
  RenderInstruction,
  ValidateResult,
  validateTrigger,
  ValidationControllerFactory,
  ValidationRules,
  Validator
} from "aurelia-validation";

export const getValidationController = (validator?: Validator) => {
  const controller = Container.instance
    .get(ValidationControllerFactory)
    .createForCurrentScope(validator);
  controller.validateTrigger = validateTrigger.changeOrBlur;
  return controller;
};

export const registerValidators = (container: Container) => {
  const validator = container.get(Validator);
  ValidationRules.customRule(
    "url",
    (value, obj) =>
      value === null ||
      value === undefined ||
      value === "" ||
      /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(
        value
      ),
    "\${$displayName} is not a valid url."
  );
  ValidationRules.customRule(
    "phone",
    (value, obj) =>
      value === null || value === undefined || value === "" || PhoneLib.isValid(value),
    "\${$displayName} is not a valid phone number."
  );
  ValidationRules.customRule(
    "number",
    (value, obj, min, max) =>
      value === null ||
      value === undefined ||
      value === "" ||
      (isNumber(value) &&
        value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
        value <= (isEmpty(max) ? Number.MAX_VALUE : max)),
    "\${$displayName} must be an number value between \${$config.min} and \${$config.max}.",
    (min, max) => ({ min, max })
  );
  ValidationRules.customRule(
    "decimal",
    (value, obj, min, max) =>
      value === null ||
      value === undefined ||
      value === "" ||
      (isDecimal(value) &&
        value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
        value <= (isEmpty(max) ? Number.MAX_VALUE : max)),
    "\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.",
    (min, max) => ({ min, max })
  );
};

export class UIValidationRenderer {
  protected render(instruction: RenderInstruction) {
    for (const { result, elements } of instruction.unrender) {
      for (const element of elements) {
        this.remove(element, result);
      }
    }

    for (const { result, elements } of instruction.render) {
      for (const element of elements) {
        this.add(element, result);
      }
    }
  }

  protected add(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    try {
      const vm = element.au.controller.viewModel;
      if (!vm.errors) {
        vm.errors = [];
      }

      if (vm.errors.indexOf(result) >= 0) {
        return;
      }

      vm.errors.push(result);
    } catch (E) {
      //
    }
  }

  protected remove(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    try {
      const vm = element.au.controller.viewModel;
      let i = vm.errors.length;
      while (i--) {
        const message: ValidateResult = vm.errors[i];
        if (message.id === result.id) {
          vm.errors.splice(i, 1);
          break;
        }
      }
      if (vm.errors.length === 0) {
        vm.errors = [];
      }
    } catch (E) {
      //
    }
  }
}
