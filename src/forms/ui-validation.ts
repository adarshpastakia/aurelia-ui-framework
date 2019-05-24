/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { Container } from "aurelia-framework";
import {
  RenderInstruction,
  ValidateResult,
  validateTrigger,
  ValidationController,
  ValidationRules
} from "aurelia-validation";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const registerValidators = (container: Container) => {
  container.get(ValidationController).validateTrigger = validateTrigger.changeOrBlur;

  ValidationRules.customRule(
    "url",
    (value) =>
      value === null ||
      value === undefined ||
      value === "" ||
      /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(
        value
      ),
    "\${$displayName} is not a valid url."
  );
  ValidationRules.customRule(
    "phone",
    (value) =>
      value === null || value === undefined || value === "" || parsePhoneNumberFromString(value).isValid(),
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
