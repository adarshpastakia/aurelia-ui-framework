'use strict';

var aureliaFramework = require('aurelia-framework');
var aureliaEventAggregator = require('aurelia-event-aggregator');

(function (UIInternal) {
    UIInternal.EVT_VIEWPORT_CLICK = "EVT_VIEWPORT_CLICK";
    UIInternal.EVT_VIEWPORT_RESIZE = "EVT_VIEWPORT_RESIZE";
    function queueTask(task) {
        aureliaFramework.Container.instance.get(aureliaFramework.TaskQueue).queueTask(task);
    }
    UIInternal.queueTask = queueTask;
    function queueMicroTask(task) {
        aureliaFramework.Container.instance.get(aureliaFramework.TaskQueue).queueMicroTask(task);
    }
    UIInternal.queueMicroTask = queueMicroTask;
    function broadcast(name, data) {
        aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).publish(name, data);
    }
    UIInternal.broadcast = broadcast;
    function subscribe(name, callback) {
        return aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).subscribe(name, callback);
    }
    UIInternal.subscribe = subscribe;
    function subscribeOnce(name, callback) {
        return aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).subscribeOnce(name, callback);
    }
    UIInternal.subscribeOnce = subscribeOnce;
    function observe(data, property, callback) {
        return aureliaFramework.Container.instance
            .get(aureliaFramework.BindingEngine)
            .observe(data, property)
            .subscribe(callback);
    }
    UIInternal.observe = observe;
    function createEvent(name, data) {
        return aureliaFramework.DOM.createCustomEvent(name, {
            bubbles: true,
            cancelable: true,
            detail: data
        });
    }
    UIInternal.createEvent = createEvent;
    function fireCallbackEvent(vm, event, data) {
        var ret = isFunction(vm[event])
            ? vm[event](data)
            : vm.element.dispatchEvent(UIInternal.createEvent(event, data));
        if (ret instanceof Promise) {
            return ret;
        }
        else {
            return Promise.resolve(ret !== false);
        }
    }
    UIInternal.fireCallbackEvent = fireCallbackEvent;
    function invokeLifecycle(instance, name, model) {
        if (instance && typeof instance[name] === "function") {
            var result = instance[name](model);
            if (result instanceof Promise) {
                return result;
            }
            if (result !== null && result !== undefined) {
                return Promise.resolve(result);
            }
            return Promise.resolve(true);
        }
        return Promise.resolve(true);
    }
    UIInternal.invokeLifecycle = invokeLifecycle;
    function compileTemplate(tpl, viewModel, bindingContext) {
        if (viewModel === void 0) { viewModel = {}; }
        if (bindingContext === void 0) { bindingContext = {}; }
        var viewFactory = aureliaFramework.Container.instance
            .get(aureliaFramework.ViewCompiler)
            .compile(tpl, aureliaFramework.Container.instance.get(aureliaFramework.ViewResources));
        var view = viewFactory.create(aureliaFramework.Container.instance);
        view.bind(viewModel, bindingContext);
        return view;
    }
    UIInternal.compileTemplate = compileTemplate;
})(exports.UIInternal || (exports.UIInternal = {}));
//# sourceMappingURL=ui-internal.js.map
