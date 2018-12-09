/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container } from "aurelia-framework";
import { RenderInstruction, ValidateResult, Validator } from "aurelia-validation";
export declare const getValidationController: (validator?: Validator) => any;
export declare const registerValidators: (container: Container) => void;
export declare class UIValidationRenderer {
    protected render(instruction: RenderInstruction): void;
    protected add(element: Element, result: ValidateResult): void;
    protected remove(element: Element, result: ValidateResult): void;
}
