/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class UIAlert {
    protected element: Element;
    icon: string;
    alertTitle: string;
    okLabel: string;
    cancelLabel: string;
    type: "alert" | "confirm";
    protected closeable: boolean;
    constructor(element: Element);
    protected close(result: boolean): void;
}
