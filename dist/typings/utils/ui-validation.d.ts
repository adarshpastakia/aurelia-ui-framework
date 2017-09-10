import { RenderInstruction, ValidateResult } from "aurelia-validation";
export declare function loadValidators(): void;
export declare class UIValidationRenderer {
    render(instruction: RenderInstruction): void;
    add(element: Element, result: ValidateResult): void;
    remove(element: Element, result: ValidateResult): void;
}
