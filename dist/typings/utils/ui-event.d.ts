import { Subscription } from "aurelia-event-aggregator";
export declare module UIEvent {
    const I18N_CHANGE_EVENT = "i18n:locale:changed";
    function fireEvent(event: string, element: EventTarget, data?: any): any;
    function broadcast(event: string, data?: any): void;
    function subscribe(event: string, callback: any): Subscription;
    function observe(object: any, property: string, callback: any): Subscription;
    function collection(object: any, callback: any): Subscription;
    function queueTask(fn: any): void;
}
