import { Container } from "aurelia-framework";
import { RenderInstruction, ValidateResult } from "aurelia-validation";
export declare const registerValidators: (container: Container) => void;
export declare class UIValidationRenderer {
    protected render(instruction: RenderInstruction): void;
    protected add(element: Element, result: ValidateResult): void;
    protected remove(element: Element, result: ValidateResult): void;
}
