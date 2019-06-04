import { UIColumn } from "./ui-column";
export declare class HeaderCell {
    private element;
    column: UIColumn;
    sortBy: string;
    sortOrder: string;
    constructor(element: Element);
    protected fireSortEvent(): void;
}
