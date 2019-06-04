import { UIColumn } from "./ui-column";
export declare class BodyCell {
    column: UIColumn;
    record: KeyValue;
    protected el: any;
    protected attached(): void;
    protected recordChanged(): void;
}
