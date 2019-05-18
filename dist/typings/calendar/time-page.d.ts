export declare class TimePage {
    private element;
    time: Date;
    constructor(element: Element);
    hour: string;
    minute: number;
    readonly ampm: "am" | "pm";
    protected switchAmpm(): void;
    private fireChange;
}
