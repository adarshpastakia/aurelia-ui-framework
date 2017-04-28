System.register(["./ui-utils", "aurelia-framework", "aurelia-event-aggregator"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ui_utils_1, aurelia_framework_1, aurelia_event_aggregator_1, UIEvent;
    return {
        setters: [
            function (ui_utils_1_1) {
                ui_utils_1 = ui_utils_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            }
        ],
        execute: function () {
            (function (UIEvent) {
                function fireEvent(event, element, data) {
                    var e = aurelia_framework_1.DOM.createCustomEvent(event, { bubbles: true, cancelable: true, detail: data });
                    return element.dispatchEvent(e);
                }
                UIEvent.fireEvent = fireEvent;
                var __ea;
                var __ob;
                var __tq;
                function broadcast(event, data) {
                    if (!__ea) {
                        __ea = ui_utils_1.UIUtils.lazy(aurelia_event_aggregator_1.EventAggregator);
                    }
                    __ea.publish(event, data);
                }
                UIEvent.broadcast = broadcast;
                function subscribe(event, callback) {
                    if (!__ea) {
                        __ea = ui_utils_1.UIUtils.lazy(aurelia_event_aggregator_1.EventAggregator);
                    }
                    return __ea.subscribe(event, callback);
                }
                UIEvent.subscribe = subscribe;
                function observe(object, property, callback) {
                    if (!__ob) {
                        __ob = ui_utils_1.UIUtils.lazy(aurelia_framework_1.BindingEngine);
                    }
                    return __ob.propertyObserver(object, property).subscribe(callback);
                }
                UIEvent.observe = observe;
                function collection(object, callback) {
                    if (!__ob) {
                        __ob = ui_utils_1.UIUtils.lazy(aurelia_framework_1.BindingEngine);
                    }
                    return __ob.collectionObserver(object).subscribe(callback);
                }
                UIEvent.collection = collection;
                function queueTask(fn) {
                    if (!__tq) {
                        __tq = ui_utils_1.UIUtils.lazy(aurelia_framework_1.TaskQueue);
                    }
                    __tq.queueTask(fn);
                }
                UIEvent.queueTask = queueTask;
            })(UIEvent || (UIEvent = {}));
            exports_1("UIEvent", UIEvent);
        }
    };
});
