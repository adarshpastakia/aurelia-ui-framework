import { BaseInput } from "./base-input";
export declare class UIFileInput extends BaseInput {
    value: string;
    placeholder: string;
    errors: string | string[];
    maxFiles: number;
    readonly: string | boolean;
    disabled: string | boolean;
    protected files: any[];
    protected inputEl: HTMLInputElement & {
        draggedFiles: AnyObject[];
    };
    protected dragging: boolean;
    constructor(element: Element);
    protected attached(): void;
    protected dragEnter($event: any): boolean;
    protected dragExit($event: any): void;
    protected drop($event: any): boolean;
    protected fileChoose(evt: any): void;
    protected remove(index: any): void;
    private mutateFiles;
}
