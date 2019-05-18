export declare class UIPasswordMeter {
    score: number;
    hasPassword: boolean;
    tooltip: string;
    maxStrength: number;
    readonly strength: {
        "--password-strength": string;
    } | {
        "--password-strength": number;
    };
}
