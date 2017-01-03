import { PropertyObserver } from "aurelia-framework";
import { Subscription } from "aurelia-event-aggregator";
export declare module UIEvent {
    function fireEvent(event: string, element: EventTarget, data?: any): any;
    function broadcast(event: string, data?: any): void;
    function subscribe(event: string, callback: any): Subscription;
    function observe(object: any, property: string): PropertyObserver;
    function queueTask(fn: any): void;
}
