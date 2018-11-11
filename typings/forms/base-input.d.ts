import { UIDrop } from "../core/ui-drop";
export declare class BaseInput {
    protected element: Element;
    value: AnyObject;
    protected inputEl: HTMLInputElement | HTMLTextAreaElement;
    protected errors: string | string[];
    protected maxlength: number;
    protected allowClear: boolean;
    protected showCounter: boolean;
    protected readonly: string | boolean;
    protected disabled: string | boolean;
    protected isDisabled: string | boolean;
    protected dropHandle: string;
    protected dropEl: UIDrop;
    constructor(element: Element);
    focus(): void;
    disable(b: boolean): void;
    readonly classes: string;
    protected bind(): void;
    protected clear(): void;
    protected fireEnter($event: KeyboardEvent): boolean;
    protected canToggleDrop(evt: FocusEvent): void;
    protected toggleDrop(open?: boolean): boolean;
    private isTrue;
}
