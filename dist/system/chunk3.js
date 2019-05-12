System.register(['aurelia-framework', 'aurelia-event-aggregator'], function (exports, module) {
  'use strict';
  var Container, TaskQueue, BindingEngine, DOM, ViewCompiler, ViewResources, EventAggregator;
  return {
    setters: [function (module) {
      Container = module.Container;
      TaskQueue = module.TaskQueue;
      BindingEngine = module.BindingEngine;
      DOM = module.DOM;
      ViewCompiler = module.ViewCompiler;
      ViewResources = module.ViewResources;
    }, function (module) {
      EventAggregator = module.EventAggregator;
    }],
    execute: function () {

      exports('a', void 0);

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
          function compileTemplate(tpl, viewModel) {
              if (viewModel === void 0) { viewModel = {}; }
              var viewFactory = Container.instance
                  .get(ViewCompiler)
                  .compile(tpl, Container.instance.get(ViewResources));
              var view = viewFactory.create(Container.instance);
              view.bind(viewModel);
              return view;
          }
          UIInternal.compileTemplate = compileTemplate;
      })(UIInternal || (UIInternal = exports('a', {})));

    }
  };
});
//# sourceMappingURL=chunk3.js.map
