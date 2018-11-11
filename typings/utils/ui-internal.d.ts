/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Subscription } from "aurelia-event-aggregator";
import { Task, View } from "aurelia-framework";
export declare namespace UIInternal {
    const EVT_VIEWPORT_CLICK = "EVT_VIEWPORT_CLICK";
    const EVT_VIEWPORT_RESIZE = "EVT_VIEWPORT_RESIZE";
    function queueTask(task: () => AnyObject | Task): void;
    function queueMicroTask(task: () => AnyObject | Task): void;
    function broadcast(name: string, data?: AnyObject): void;
    function subscribe(name: string, callback: AnyObject): Subscription;
    function subscribeOnce(name: string, callback: AnyObject): Subscription;
    function observe(data: AnyObject, property: string, callback: AnyObject): Subscription;
    function createEvent<T = {}>(name: string, data?: T): CustomEvent;
    function fireCallbackEvent(vm: AnyObject, event: string, data?: AnyObject): Promise<boolean>;
    function invokeLifecycle(instance: any, name: any, model?: any): Promise<AnyObject>;
    function compileTemplate(tpl: string, viewModel?: AnyObject): View;
}
