export declare namespace GridderUtils {
    let ghost: HTMLElement & {
        startWidth: number;
        startHeight: number;
    };
    let dragEl: HTMLElement & {
        originalIndex?: number;
    };
    let colCount: any;
    let rowCount: any;
    let minWidth: any;
    let minHeight: number;
    let cells: any;
    function startMove($event: DragEvent): boolean;
    function move($event: DragEvent): void;
    function finishMove($event: DragEvent): void;
    function startResize($event: MouseEvent): void;
}
