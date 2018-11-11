/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
export declare class JsonValueConverter {
    toView(value: AnyObject): string;
}
export declare class MarkdownValueConverter {
    toView(value: string): string;
}
export declare class PhoneValueConverter {
    toView(value: string, country?: string): string;
}
export declare class PhoneLocalValueConverter {
    toView(value: string, country?: string): string;
}
export declare class PhoneHtmlValueConverter {
    toView(value: string, country?: string): string;
}
export declare class PhoneLocalHtmlValueConverter {
    toView(value: string, country?: string): string;
}
export declare class DateValueConverter {
    toView(value: string, format?: string): string;
}
export declare class TimeValueConverter {
    toView(value: string, format?: string): string;
}
export declare class DatetimeValueConverter {
    toView(value: string, format?: string): string;
}
export declare class FromNowValueConverter {
    toView(value: string): string;
}
export declare class AgeValueConverter {
    toView(value: string): string;
}
export declare class UtcValueConverter {
    toView(value: string): string;
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
