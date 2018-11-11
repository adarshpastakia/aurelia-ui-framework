export declare namespace UIFormat {
    function toHTML(md: any): string;
    function date(dt: AnyObject, ft?: string): string;
    function time(dt: AnyObject, ft?: string): string;
    function datetime(dt: AnyObject, ft?: string): string;
    function dateToISO(dt: any): string;
    function utcDate(dt: any): string;
    function age(dt: AnyObject): string;
    function fromNow(dt: AnyObject): string;
    function number(nm: AnyObject, fm?: string): string;
    function currency(nm: AnyObject, sy?: string, fm?: string): string;
    function percent(nm: AnyObject): string;
}
