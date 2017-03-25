export declare module UIFormat {
    function toHTML(md: any): string;
    function date(dt: any, ft?: string): any;
    function time(dt: any, ft?: string): any;
    function datetime(dt: any, ft?: string): any;
    function dateToISO(dt: any): any;
    function utcDate(dt: any): any;
    function age(dt: any): string;
    function fromNow(dt: any): string;
    function number(nm: any, fm?: string): string;
    function currency(nm: any, sy?: string, fm?: string): string;
    function percent(nm: any): string;
    function exRate(nm: any): string;
}
