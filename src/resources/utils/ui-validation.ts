// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, DOM} from 'aurelia-framework';
import {ValidationRules, RenderInstruction, ValidationError} from "aurelia-validation";
import {UILanguage} from '../elements/inputs/ui-markdown';

@autoinject()
export class UIValidationRenderer {
  render(instruction: RenderInstruction) {
    for (let { error, elements } of instruction.unrender) {
      for (let element of elements) {
        this.remove(element, error);
      }
    }

    for (let { error, elements } of instruction.render) {
      for (let element of elements) {
        this.add(element, error);
      }
    }
  }

  add(element: Element, error: ValidationError) {
    element.classList.add('ui-invalid');
    element.classList.remove('ui-valid');

    try {
      let vm = element.au.controller.viewModel;
      if (!vm.errors) vm.errors = [];
      if (element.au.controller.viewModel && element.au.controller.viewModel instanceof UILanguage) {
        let ms = error.message.split('|');
        console.log(error);
        vm.errors.push(error);
        vm.errored = error.object[error.propertyName].__errored__;
      }
      else
        vm.errors.push(error);
    } catch (E) { }
  }

  remove(element: Element, error: ValidationError) {
    element.classList.remove('ui-invalid');
    element.classList.add('ui-valid');

    try {
      let vm = element.au.controller.viewModel;
      let i = vm.errors.length;
      while (i--) {
        let message: any = vm.errors[i];
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
    } catch (E) { }
  }
}