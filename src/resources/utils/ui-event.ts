// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT


import {UIUtils} from "./ui-utils";
import {BindingEngine, PropertyObserver, DOM, TaskQueue} from "aurelia-framework";
import {EventAggregator, Subscription} from "aurelia-event-aggregator";

export module UIEvent {
  export function fireEvent(event: string,
    element: EventTarget,
    data?: any): any {

    let e = DOM.createCustomEvent(event, { bubbles: true, cancelable: true, detail: data });
    return element.dispatchEvent(e);
  }


  var __ea: EventAggregator;
  var __ob: BindingEngine;
  var __tq: TaskQueue;

  export function broadcast(event: string, data?: any) {
    if (!__ea) {
      __ea = UIUtils.lazy(EventAggregator);
    }
    __ea.publish(event, data);
  }

  export function subscribe(event: string, callback): Subscription {
    if (!__ea) {
      __ea = UIUtils.lazy(EventAggregator);
    }
    return __ea.subscribe(event, callback);
  }

  export function observe(object: any, property: string): PropertyObserver {
    if (!__ob) {
      __ob = UIUtils.lazy(BindingEngine);
    }
    return __ob.propertyObserver(object, property);
  }

  export function queueTask(fn) {
    if (!__tq) {
      __tq = UIUtils.lazy(TaskQueue);
    }
    __tq.queueTask(fn)
  }
}
