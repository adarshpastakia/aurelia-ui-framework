define(["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./ui-utils"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIEvent;
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
    })(UIEvent = exports.UIEvent || (exports.UIEvent = {}));
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3VpLWV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQVdBLElBQWMsT0FBTyxDQWdEcEI7SUFoREQsV0FBYyxPQUFPO1FBQ25CLG1CQUEwQixLQUFhLEVBQ3JDLE9BQW9CLEVBQ3BCLElBQVU7WUFFVixJQUFJLENBQUMsR0FBRyx1QkFBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN4RixNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBTmUsaUJBQVMsWUFNeEIsQ0FBQTtRQUdELElBQUksSUFBcUIsQ0FBQztRQUMxQixJQUFJLElBQW1CLENBQUM7UUFDeEIsSUFBSSxJQUFlLENBQUM7UUFFcEIsbUJBQTBCLEtBQWEsRUFBRSxJQUFVO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsMENBQWUsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBTGUsaUJBQVMsWUFLeEIsQ0FBQTtRQUVELG1CQUEwQixLQUFhLEVBQUUsUUFBUTtZQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxHQUFHLGtCQUFPLENBQUMsSUFBSSxDQUFDLDBDQUFlLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFMZSxpQkFBUyxZQUt4QixDQUFBO1FBRUQsaUJBQXdCLE1BQVcsRUFBRSxRQUFnQixFQUFFLFFBQVE7WUFDN0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNWLElBQUksR0FBRyxrQkFBTyxDQUFDLElBQUksQ0FBQyxpQ0FBYSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBTGUsZUFBTyxVQUt0QixDQUFBO1FBRUQsb0JBQTJCLE1BQVcsRUFBRSxRQUFRO1lBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsaUNBQWEsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBTGUsa0JBQVUsYUFLekIsQ0FBQTtRQUVELG1CQUEwQixFQUFFO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsNkJBQVMsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3BCLENBQUM7UUFMZSxpQkFBUyxZQUt4QixDQUFBO0lBQ0gsQ0FBQyxFQWhEYSxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFnRHBCIiwiZmlsZSI6InV0aWxzL3VpLWV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTZcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuXG5cbmltcG9ydCB7IEJpbmRpbmdFbmdpbmUsIFByb3BlcnR5T2JzZXJ2ZXIsIERPTSwgVGFza1F1ZXVlIH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IsIFN1YnNjcmlwdGlvbiB9IGZyb20gXCJhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3JcIjtcbmltcG9ydCB7VUlVdGlsc30gZnJvbSBcIi4vdWktdXRpbHNcIjtcblxuZXhwb3J0IG1vZHVsZSBVSUV2ZW50IHtcbiAgZXhwb3J0IGZ1bmN0aW9uIGZpcmVFdmVudChldmVudDogc3RyaW5nLFxuICAgIGVsZW1lbnQ6IEV2ZW50VGFyZ2V0LFxuICAgIGRhdGE/OiBhbnkpOiBhbnkge1xuXG4gICAgbGV0IGUgPSBET00uY3JlYXRlQ3VzdG9tRXZlbnQoZXZlbnQsIHsgYnViYmxlczogdHJ1ZSwgY2FuY2VsYWJsZTogdHJ1ZSwgZGV0YWlsOiBkYXRhIH0pO1xuICAgIHJldHVybiBlbGVtZW50LmRpc3BhdGNoRXZlbnQoZSk7XG4gIH1cblxuXG4gIHZhciBfX2VhOiBFdmVudEFnZ3JlZ2F0b3I7XG4gIHZhciBfX29iOiBCaW5kaW5nRW5naW5lO1xuICB2YXIgX190cTogVGFza1F1ZXVlO1xuXG4gIGV4cG9ydCBmdW5jdGlvbiBicm9hZGNhc3QoZXZlbnQ6IHN0cmluZywgZGF0YT86IGFueSkge1xuICAgIGlmICghX19lYSkge1xuICAgICAgX19lYSA9IFVJVXRpbHMubGF6eShFdmVudEFnZ3JlZ2F0b3IpO1xuICAgIH1cbiAgICBfX2VhLnB1Ymxpc2goZXZlbnQsIGRhdGEpO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHN1YnNjcmliZShldmVudDogc3RyaW5nLCBjYWxsYmFjayk6IFN1YnNjcmlwdGlvbiB7XG4gICAgaWYgKCFfX2VhKSB7XG4gICAgICBfX2VhID0gVUlVdGlscy5sYXp5KEV2ZW50QWdncmVnYXRvcik7XG4gICAgfVxuICAgIHJldHVybiBfX2VhLnN1YnNjcmliZShldmVudCwgY2FsbGJhY2spO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmUob2JqZWN0OiBhbnksIHByb3BlcnR5OiBzdHJpbmcsIGNhbGxiYWNrKTogU3Vic2NyaXB0aW9uIHtcbiAgICBpZiAoIV9fb2IpIHtcbiAgICAgIF9fb2IgPSBVSVV0aWxzLmxhenkoQmluZGluZ0VuZ2luZSk7XG4gICAgfVxuICAgIHJldHVybiBfX29iLnByb3BlcnR5T2JzZXJ2ZXIob2JqZWN0LCBwcm9wZXJ0eSkuc3Vic2NyaWJlKGNhbGxiYWNrKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0aW9uKG9iamVjdDogYW55LCBjYWxsYmFjayk6IFN1YnNjcmlwdGlvbiB7XG4gICAgaWYgKCFfX29iKSB7XG4gICAgICBfX29iID0gVUlVdGlscy5sYXp5KEJpbmRpbmdFbmdpbmUpO1xuICAgIH1cbiAgICByZXR1cm4gX19vYi5jb2xsZWN0aW9uT2JzZXJ2ZXIob2JqZWN0KS5zdWJzY3JpYmUoY2FsbGJhY2spO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIHF1ZXVlVGFzayhmbikge1xuICAgIGlmICghX190cSkge1xuICAgICAgX190cSA9IFVJVXRpbHMubGF6eShUYXNrUXVldWUpO1xuICAgIH1cbiAgICBfX3RxLnF1ZXVlVGFzayhmbilcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
