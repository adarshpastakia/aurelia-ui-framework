import { Container, TaskQueue, BindingEngine, DOM, ViewCompiler, ViewResources } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

var UIInternal;
(function (UIInternal) {
    UIInternal.EVT_VIEWPORT_CLICK = "EVT_VIEWPORT_CLICK";
    UIInternal.EVT_VIEWPORT_RESIZE = "EVT_VIEWPORT_RESIZE";
    function queueTask(task) {
        Container.instance.get(TaskQueue).queueTask(task);
    }
    UIInternal.queueTask = queueTask;
    function queueMicroTask(task) {
        Container.instance.get(TaskQueue).queueMicroTask(task);
    }
    UIInternal.queueMicroTask = queueMicroTask;
    function broadcast(name, data) {
        Container.instance.get(EventAggregator).publish(name, data);
    }
    UIInternal.broadcast = broadcast;
    function subscribe(name, callback) {
        return Container.instance.get(EventAggregator).subscribe(name, callback);
    }
    UIInternal.subscribe = subscribe;
    function subscribeOnce(name, callback) {
        return Container.instance.get(EventAggregator).subscribeOnce(name, callback);
    }
    UIInternal.subscribeOnce = subscribeOnce;
    function observe(data, property, callback) {
        return Container.instance
            .get(BindingEngine)
            .observe(data, property)
            .subscribe(callback);
    }
    UIInternal.observe = observe;
    function createEvent(name, data) {
        return DOM.createCustomEvent(name, {
            bubbles: true,
            cancelable: true,
            detail: data
        });
    }
    UIInternal.createEvent = createEvent;
    function fireCallbackEvent(vm, event, data) {
        const ret = isFunction(vm[event])
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
            const result = instance[name](model);
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
    function compileTemplate(tpl, viewModel = {}, bindingContext = {}) {
        const viewFactory = Container.instance
            .get(ViewCompiler)
            .compile(tpl, Container.instance.get(ViewResources));
        const view = viewFactory.create(Container.instance);
        view.bind(viewModel, bindingContext);
        return view;
    }
    UIInternal.compileTemplate = compileTemplate;
})(UIInternal || (UIInternal = {}));

export { UIInternal as U };
//# sourceMappingURL=ui-internal.js.map
