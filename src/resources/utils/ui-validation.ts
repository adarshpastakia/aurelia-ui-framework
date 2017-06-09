//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, DOM} from 'aurelia-framework';
import {ValidationRules, RenderInstruction, ValidateResult} from "aurelia-validation";
import {UILanguage} from '../elements/inputs/ui-markdown';

@autoinject()
export class UIValidationRenderer {
  render(instruction: RenderInstruction) {
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

  add(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }
    element.classList.add('ui-invalid');
    element.classList.remove('ui-valid');

    try {
      let vm = element.au.controller.viewModel;
      if (!vm.errors) vm.errors = [];

      if (~vm.errors.indexOf(result)) return;

      if (element.au.controller.viewModel && element.au.controller.viewModel instanceof UILanguage) {
        let ms = result.message.split('|');
        vm.errors.push(result);
        vm.errored = result.object[result.propertyName].__errored__;
      }
      else
        vm.errors.push(result);
    } catch (E) { }
  }

  remove(element: Element, result: ValidateResult) {
    element.classList.remove('ui-invalid');
    element.classList.add('ui-valid');

    try {
      let vm = element.au.controller.viewModel;
      let i = vm.errors.length;
      while (i--) {
        let message: any = vm.errors[i];
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
    } catch (E) { }
  }
}
