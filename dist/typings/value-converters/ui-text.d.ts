export declare class JsonValueConverter {
    toView(value: any): string;
}
export declare class MarkdownValueConverter {
    toView(value: string): string;
}
export declare class PhoneValueConverter {
    toView(value: string, country?: string): string;
}
export declare class DateValueConverter {
    toView(value: string, format?: string): any;
}
export declare class TimeValueConverter {
    toView(value: string, format?: string): any;
}
export declare class DatetimeValueConverter {
    toView(value: string, format?: string): any;
}
export declare class FromNowValueConverter {
    toView(value: string): string;
}
export declare class UtcValueConverter {
    toView(value: string): any;
}
export declare class NumberValueConverter {
    toView(value: string, format?: string): string;
}
export declare class CurrencyValueConverter {
    toView(value: string, symbol?: string, format?: string): string;
}
export declare class PercentValueConverter {
    toView(value: string): string;
}
