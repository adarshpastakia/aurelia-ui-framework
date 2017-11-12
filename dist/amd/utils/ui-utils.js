define(["require", "exports", "aurelia-framework", "aurelia-metadata", "./ui-event", "lodash"], function (require, exports, aurelia_framework_1, aurelia_metadata_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lodashMixins() {
        _.mixin({
            'findByValues': function (collection, property, values) {
                if (_.isArray(collection)) {
                    return _.filter(collection, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    });
                }
                else {
                    var ret_1 = [];
                    _.forEach(collection, function (list) {
                        ret_1.concat(_.filter(list, function (item) {
                            return _.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_1;
                }
            },
            'removeByValues': function (collection, property, values) {
                if (_.isArray(collection)) {
                    return _.remove(collection, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    }) || [];
                }
                else {
                    var ret_2 = [];
                    _.forEach(collection, function (list, key) {
                        ret_2 = ret_2.concat(_.remove(list, function (item) {
                            return _.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_2;
                }
            },
            'findDeep': function (collection, property, value) {
                if (_.isArray(collection)) {
                    return _.find(collection, function (item) {
                        return item[property] + '' === value + '';
                    });
                }
                else {
                    var ret_3;
                    _.forEach(collection, function (item) {
                        ret_3 = _.find(item, function (v) {
                            return v[property] + '' === value + '';
                        });
                        return ret_3 === undefined;
                    });
                    return ret_3 || {};
                }
            },
            'findChildren': function (collection, listProperty, property, value) {
                var ret;
                _.forEach(collection, function (item) {
                    ret = _.find(item[listProperty], function (v) {
                        return v[property] + '' === value + '';
                    });
                    return ret === undefined;
                });
                return ret || {};
            }
        });
    }
    exports.lodashMixins = lodashMixins;
    var UIUtils;
    (function (UIUtils) {
        function lazy(T) {
            if (!this.auContainer) {
                throw new Error('UIUtils.Lazy::Container not set');
            }
            return aurelia_framework_1.Lazy.of(T).get(this.auContainer)();
        }
        UIUtils.lazy = lazy;
        function newInstance(T) {
            if (!this.auContainer) {
                throw new Error('UIUtils.newInstance::Container not provided');
            }
            return aurelia_framework_1.NewInstance.of(T).get(this.auContainer);
        }
        UIUtils.newInstance = newInstance;
        function tether(parent, child, opts) {
            opts = Object.assign({ resize: true, position: 'bl' }, opts);
            child.style.position = 'fixed';
            return new (function (el, dd, options) {
                var _this = this;
                this.listeners = [];
                this.dispose = function () {
                    _this.listeners.forEach(function (parent) {
                        parent.removeEventListener('scroll', _this.position);
                        parent.removeEventListener('touchstart', _this.position);
                    });
                    window.removeEventListener('resize', _this.position);
                };
                this.position = function (sizeWidth, topLeft) {
                    if (sizeWidth === void 0) { sizeWidth = false; }
                    if (topLeft === void 0) { topLeft = false; }
                    var isRtl = window.isRtl(el);
                    var pos = el.getBoundingClientRect();
                    if (options.resize)
                        dd.style.minWidth = pos.width + 'px';
                    el.classList.remove('ui-tether-top');
                    el.classList.remove('ui-tether-bottom');
                    el.classList.remove('ui-tether-left');
                    el.classList.remove('ui-tether-right');
                    dd.classList.remove('ui-tether-top');
                    dd.classList.remove('ui-tether-bottom');
                    dd.classList.remove('ui-tether-left');
                    dd.classList.remove('ui-tether-right');
                    var align = options.position.split('');
                    if (align[0] == 't') {
                        if (pos.top - dd.offsetHeight < 0) {
                            dd.classList.add('ui-tether-top');
                            el.classList.add('ui-tether-bottom');
                            dd.style.top = pos.bottom + 'px';
                            dd.style.transform = 'translateY(0)';
                        }
                        else {
                            el.classList.add('ui-tether-top');
                            dd.classList.add('ui-tether-bottom');
                            dd.style.top = pos.top + 'px';
                            dd.style.transform = 'translateY(-100%)';
                        }
                    }
                    else {
                        if (pos.bottom + dd.offsetHeight > window.innerHeight && pos.top >= dd.offsetHeight) {
                            el.classList.add('ui-tether-top');
                            dd.classList.add('ui-tether-bottom');
                            dd.style.top = pos.top + 'px';
                            dd.style.transform = 'translateY(-100%)';
                        }
                        else {
                            dd.classList.add('ui-tether-top');
                            el.classList.add('ui-tether-bottom');
                            dd.style.top = pos.bottom + 'px';
                            dd.style.transform = 'translateY(0)';
                        }
                    }
                    if (align[1] == 'c') {
                        dd.style.left = pos.left + (pos.width / 2) + 'px';
                        dd.style.transform += ' translateX(-50%)';
                    }
                    else if (align[1] == (isRtl ? 'l' : 'r')) {
                        if (pos.right - dd.offsetWidth < 0) {
                            dd.classList.add('ui-tether-left');
                            el.classList.add('ui-tether-left');
                            dd.style.left = pos.left + 'px';
                            dd.style.transform += ' translateX(0)';
                        }
                        else {
                            dd.classList.add('ui-tether-right');
                            el.classList.add('ui-tether-right');
                            dd.style.left = pos.right + 'px';
                            dd.style.transform += ' translateX(-100%)';
                        }
                    }
                    else {
                        if (pos.left + dd.offsetWidth > window.innerWidth) {
                            dd.classList.add('ui-tether-right');
                            el.classList.add('ui-tether-right');
                            dd.style.left = pos.right + 'px';
                            dd.style.transform += ' translateX(-100%)';
                        }
                        else {
                            dd.classList.add('ui-tether-left');
                            el.classList.add('ui-tether-left');
                            dd.style.left = pos.left + 'px';
                            dd.style.transform += ' translateX(0)';
                        }
                    }
                    dd.style.transform += ' translateZ(0)';
                };
                var parent = el.parentElement;
                do {
                    var cs = getComputedStyle(parent);
                    if (!(['scroll', 'auto'].indexOf(cs.overflowX) == -1 && ['scroll', 'auto'].indexOf(cs.overflowY) == -1)) {
                        this.listeners.push(parent);
                        parent.addEventListener('scroll', this.position);
                        parent.addEventListener('touchstart', this.position);
                    }
                    parent = parent.parentElement;
                } while (parent != null);
                window.addEventListener('resize', this.position);
                this.position();
            })(parent, child, opts);
        }
        UIUtils.tether = tether;
        function toast(options) {
            var opts = { container: this.overlayContainer, theme: 'dark', timeout: 5000, glyph: 'glyph-alert-info', message: '', title: '' };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            var toast = aurelia_framework_1.DOM.createElement('ui-toast');
            toast.classList.add("ui-" + opts.theme);
            toast.innerHTML = (opts.title ? "<h1>" + opts.title + "</h1>" : '') + "<p>" + opts.message + "</p>";
            if (opts.container.children.length > 0)
                opts.container.insertBefore(toast, opts.container.children[0]);
            else
                opts.container.appendChild(toast);
            var engine = this.lazy(aurelia_framework_1.TemplatingEngine);
            ui_event_1.UIEvent.queueTask(function () { return engine.enhance({
                element: toast, bindingContext: {
                    glyph: opts.glyph,
                    timeout: opts.timeout
                }
            }); });
        }
        UIUtils.toast = toast;
        function alert(options) {
            var opts = { glyph: 'glyph-alert-info', message: '', title: '', okLabel: 'OK', cancelLabel: 'Cancel', confirm: false };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            var alert = aurelia_framework_1.DOM.createElement('ui-alert');
            alert.innerHTML = (opts.title ? "<h1>" + opts.title + "</h1>" : '') + "<p>" + opts.message + "</p>";
            this.dialogContainer.appendChild(alert);
            var engine = this.lazy(aurelia_framework_1.TemplatingEngine);
            return new Promise(function (resolve, reject) {
                ui_event_1.UIEvent.queueTask(function () { return engine.enhance({
                    element: alert, bindingContext: {
                        glyph: opts.glyph,
                        okLabel: opts.okLabel,
                        cancelLabel: opts.cancelLabel,
                        confirm: opts.confirm,
                        closeCallback: function (b) {
                            resolve(b);
                        }
                    }
                }); });
            });
        }
        UIUtils.alert = alert;
        function confirm(options) {
            var opts = { glyph: 'glyph-alert-question', message: '', title: '', confirm: true };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            return UIUtils.alert(opts);
        }
        UIUtils.confirm = confirm;
        function prompt(options) {
            var opts = { glyph: 'glyph-alert-question', message: '', title: '', okLabel: 'OK', cancelLabel: 'Cancel', type: 'single', };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            var alert = aurelia_framework_1.DOM.createElement('ui-prompt');
            alert.innerHTML = (opts.title ? "<h1>" + opts.title + "</h1>" : '') + "<p>" + opts.message + "</p>";
            this.dialogContainer.appendChild(alert);
            var engine = this.lazy(aurelia_framework_1.TemplatingEngine);
            return new Promise(function (resolve, reject) {
                ui_event_1.UIEvent.queueTask(function () { return engine.enhance({
                    element: alert, bindingContext: {
                        type: opts.type,
                        glyph: opts.glyph,
                        okLabel: opts.okLabel,
                        cancelLabel: opts.cancelLabel,
                        closeCallback: function (value) {
                            resolve(value);
                        }
                    }
                }); });
            });
        }
        UIUtils.prompt = prompt;
        function loadView(url, parent, model) {
            var __compositionEngine = this.lazy(aurelia_framework_1.CompositionEngine);
            var instruction = {
                viewModel: url,
                container: this.auContainer,
                childContainer: this.auContainer.createChild(),
                model: model
            };
            return new Promise(function (resolve, reject) {
                __getViewModel(instruction)
                    .then(function (newInstruction) {
                    var viewModel = newInstruction.viewModel;
                    return __invokeLifecycle(viewModel, 'canActivate', instruction.model)
                        .then(function (canActivate) {
                        if (canActivate) {
                            return __compositionEngine.createController(instruction)
                                .then(function (controller) {
                                controller.automate();
                                var slot = new aurelia_framework_1.ViewSlot(parent, true);
                                slot.add(controller.view);
                                slot.attached();
                                resolve(controller.viewModel);
                                return true;
                            });
                        }
                        else {
                        }
                    });
                })
                    .catch(function (e) {
                });
            });
        }
        UIUtils.loadView = loadView;
        function __getViewModel(instruction) {
            var __compositionEngine = UIUtils.lazy(aurelia_framework_1.CompositionEngine);
            if (typeof instruction.viewModel === 'function') {
                instruction.viewModel = aurelia_metadata_1.Origin.get(instruction.viewModel).moduleId;
            }
            if (typeof instruction.viewModel === 'string') {
                return __compositionEngine.ensureViewModel(instruction);
            }
            return Promise.resolve(instruction);
        }
        function __invokeLifecycle(instance, name, model) {
            if (instance && typeof instance[name] === 'function') {
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
    })(UIUtils = exports.UIUtils || (exports.UIUtils = {}));
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLENBQUM7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQyxFQWhTYSxPQUFPLEdBQVAsZUFBTyxLQUFQLGVBQU8sUUFnU3BCIiwiZmlsZSI6InV0aWxzL3VpLXV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTZcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgQ29udGFpbmVyLCBMYXp5LCBOZXdJbnN0YW5jZSwgRE9NLCBUZW1wbGF0aW5nRW5naW5lLCBWaWV3Q29tcGlsZXIsIENvbXBvc2l0aW9uRW5naW5lLCBWaWV3LCBWaWV3UmVzb3VyY2VzLCBWaWV3U2xvdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgT3JpZ2luIH0gZnJvbSBcImF1cmVsaWEtbWV0YWRhdGFcIjtcbmltcG9ydCB7IFVJRXZlbnQgfSBmcm9tIFwiLi91aS1ldmVudFwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2Rhc2hNaXhpbnMoKSB7XG4gIC8vIExvRGFzaCBNaXhpbnNcbiAgXy5taXhpbih7XG4gICAgJ2ZpbmRCeVZhbHVlcyc6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHByb3BlcnR5LCB2YWx1ZXMpIHtcbiAgICAgIGlmIChfLmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gXy5pbmRleE9mKHZhbHVlcywgaXRlbVtwcm9wZXJ0eV0gKyAnJykgPiAtMTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGV0IHJldCA9IFtdO1xuICAgICAgICBfLmZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24obGlzdCkge1xuICAgICAgICAgIHJldC5jb25jYXQoXy5maWx0ZXIobGlzdCwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIF8uaW5kZXhPZih2YWx1ZXMsIGl0ZW1bcHJvcGVydHldICsgJycpID4gLTE7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9LFxuICAgICdyZW1vdmVCeVZhbHVlcyc6IGZ1bmN0aW9uKGNvbGxlY3Rpb24sIHByb3BlcnR5LCB2YWx1ZXMpIHtcbiAgICAgIGlmIChfLmlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmV0dXJuIF8ucmVtb3ZlKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gXy5pbmRleE9mKHZhbHVlcywgaXRlbVtwcm9wZXJ0eV0gKyAnJykgPiAtMTtcbiAgICAgICAgfSkgfHwgW107XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGV0IHJldCA9IFtdO1xuICAgICAgICBfLmZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24obGlzdCwga2V5KSB7XG4gICAgICAgICAgcmV0ID0gcmV0LmNvbmNhdChfLnJlbW92ZShsaXN0LCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5pbmRleE9mKHZhbHVlcywgaXRlbVtwcm9wZXJ0eV0gKyAnJykgPiAtMTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH0sXG4gICAgJ2ZpbmREZWVwJzogZnVuY3Rpb24oY29sbGVjdGlvbiwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgICBpZiAoXy5pc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBfLmZpbmQoY29sbGVjdGlvbiwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldHVybiBpdGVtW3Byb3BlcnR5XSArICcnID09PSB2YWx1ZSArICcnO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsZXQgcmV0O1xuICAgICAgICBfLmZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldCA9IF8uZmluZChpdGVtLCB2ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2W3Byb3BlcnR5XSArICcnID09PSB2YWx1ZSArICcnO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiByZXQgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQgfHwge307XG4gICAgICB9XG4gICAgfSxcbiAgICAnZmluZENoaWxkcmVuJzogZnVuY3Rpb24oY29sbGVjdGlvbiwgbGlzdFByb3BlcnR5LCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICAgIGxldCByZXQ7XG4gICAgICBfLmZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXQgPSBfLmZpbmQoaXRlbVtsaXN0UHJvcGVydHldLCB2ID0+IHtcbiAgICAgICAgICByZXR1cm4gdltwcm9wZXJ0eV0gKyAnJyA9PT0gdmFsdWUgKyAnJztcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXQgPT09IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJldCB8fCB7fTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgbW9kdWxlIFVJVXRpbHMge1xuICBleHBvcnQgdmFyIGF1Q29udGFpbmVyOiBDb250YWluZXI7XG4gIGV4cG9ydCB2YXIgZGlhbG9nQ29udGFpbmVyOiBFbGVtZW50O1xuICBleHBvcnQgdmFyIG92ZXJsYXlDb250YWluZXI6IEVsZW1lbnQ7XG4gIGV4cG9ydCB2YXIgdGFza2JhckNvbnRhaW5lcjogRWxlbWVudDtcblxuICBleHBvcnQgZnVuY3Rpb24gbGF6eShUKTogYW55IHtcbiAgICBpZiAoIXRoaXMuYXVDb250YWluZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVUlVdGlscy5MYXp5OjpDb250YWluZXIgbm90IHNldCcpO1xuICAgIH1cbiAgICByZXR1cm4gTGF6eS5vZihUKS5nZXQodGhpcy5hdUNvbnRhaW5lcikoKTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBuZXdJbnN0YW5jZShUKTogYW55IHtcbiAgICBpZiAoIXRoaXMuYXVDb250YWluZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVUlVdGlscy5uZXdJbnN0YW5jZTo6Q29udGFpbmVyIG5vdCBwcm92aWRlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gTmV3SW5zdGFuY2Uub2YoVCkuZ2V0KHRoaXMuYXVDb250YWluZXIpO1xuICB9XG5cbiAgLy8gRmxvYXRpbmcgVGV0aGVyXG4gIGV4cG9ydCBmdW5jdGlvbiB0ZXRoZXIocGFyZW50LCBjaGlsZCwgb3B0cz8pIHtcbiAgICBvcHRzID0gT2JqZWN0LmFzc2lnbih7IHJlc2l6ZTogdHJ1ZSwgcG9zaXRpb246ICdibCcgfSwgb3B0cyk7XG4gICAgY2hpbGQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuXG4gICAgcmV0dXJuIG5ldyAoZnVuY3Rpb24oZWwsIGRkLCBvcHRpb25zKSB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IFtdO1xuICAgICAgdGhpcy5kaXNwb3NlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5mb3JFYWNoKHBhcmVudCA9PiB7XG4gICAgICAgICAgcGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMucG9zaXRpb24pO1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5wb3NpdGlvbik7XG4gICAgICAgIH0pXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucG9zaXRpb24gPSAoc2l6ZVdpZHRoID0gZmFsc2UsIHRvcExlZnQgPSBmYWxzZSkgPT4ge1xuICAgICAgICBsZXQgaXNSdGwgPSB3aW5kb3cuaXNSdGwoZWwpO1xuICAgICAgICBsZXQgcG9zID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIGlmIChvcHRpb25zLnJlc2l6ZSkgZGQuc3R5bGUubWluV2lkdGggPSBwb3Mud2lkdGggKyAncHgnO1xuXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXRldGhlci10b3AnKTtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndWktdGV0aGVyLWJvdHRvbScpO1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS10ZXRoZXItbGVmdCcpO1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS10ZXRoZXItcmlnaHQnKTtcblxuICAgICAgICBkZC5jbGFzc0xpc3QucmVtb3ZlKCd1aS10ZXRoZXItdG9wJyk7XG4gICAgICAgIGRkLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLXRldGhlci1ib3R0b20nKTtcbiAgICAgICAgZGQuY2xhc3NMaXN0LnJlbW92ZSgndWktdGV0aGVyLWxlZnQnKTtcbiAgICAgICAgZGQuY2xhc3NMaXN0LnJlbW92ZSgndWktdGV0aGVyLXJpZ2h0Jyk7XG5cbiAgICAgICAgbGV0IGFsaWduID0gb3B0aW9ucy5wb3NpdGlvbi5zcGxpdCgnJyk7XG5cbiAgICAgICAgaWYgKGFsaWduWzBdID09ICd0Jykge1xuICAgICAgICAgIGlmIChwb3MudG9wIC0gZGQub2Zmc2V0SGVpZ2h0IDwgMCkge1xuICAgICAgICAgICAgZGQuY2xhc3NMaXN0LmFkZCgndWktdGV0aGVyLXRvcCcpO1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndWktdGV0aGVyLWJvdHRvbScpO1xuXG4gICAgICAgICAgICBkZC5zdHlsZS50b3AgPSBwb3MuYm90dG9tICsgJ3B4JztcbiAgICAgICAgICAgIGRkLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGVZKDApJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd1aS10ZXRoZXItdG9wJyk7XG4gICAgICAgICAgICBkZC5jbGFzc0xpc3QuYWRkKCd1aS10ZXRoZXItYm90dG9tJyk7XG5cbiAgICAgICAgICAgIGRkLnN0eWxlLnRvcCA9IHBvcy50b3AgKyAncHgnO1xuICAgICAgICAgICAgZGQuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVkoLTEwMCUpJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHBvcy5ib3R0b20gKyBkZC5vZmZzZXRIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgJiYgcG9zLnRvcCA+PSBkZC5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci10b3AnKTtcbiAgICAgICAgICAgIGRkLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci1ib3R0b20nKTtcblxuICAgICAgICAgICAgZGQuc3R5bGUudG9wID0gcG9zLnRvcCArICdweCc7XG4gICAgICAgICAgICBkZC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgtMTAwJSknO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRkLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci10b3AnKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci1ib3R0b20nKTtcblxuICAgICAgICAgICAgZGQuc3R5bGUudG9wID0gcG9zLmJvdHRvbSArICdweCc7XG4gICAgICAgICAgICBkZC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlWSgwKSc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFsaWduWzFdID09ICdjJykge1xuICAgICAgICAgIC8vIGRkLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci1yaWdodCcpO1xuICAgICAgICAgIC8vIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci1yaWdodCcpO1xuXG4gICAgICAgICAgZGQuc3R5bGUubGVmdCA9IHBvcy5sZWZ0ICsgKHBvcy53aWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICBkZC5zdHlsZS50cmFuc2Zvcm0gKz0gJyB0cmFuc2xhdGVYKC01MCUpJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhbGlnblsxXSA9PSAoaXNSdGwgPyAnbCcgOiAncicpKSB7XG4gICAgICAgICAgaWYgKHBvcy5yaWdodCAtIGRkLm9mZnNldFdpZHRoIDwgMCkge1xuICAgICAgICAgICAgZGQuY2xhc3NMaXN0LmFkZCgndWktdGV0aGVyLWxlZnQnKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci1sZWZ0Jyk7XG5cbiAgICAgICAgICAgIGRkLnN0eWxlLmxlZnQgPSBwb3MubGVmdCArICdweCc7XG4gICAgICAgICAgICBkZC5zdHlsZS50cmFuc2Zvcm0gKz0gJyB0cmFuc2xhdGVYKDApJztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkZC5jbGFzc0xpc3QuYWRkKCd1aS10ZXRoZXItcmlnaHQnKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci1yaWdodCcpO1xuXG4gICAgICAgICAgICBkZC5zdHlsZS5sZWZ0ID0gcG9zLnJpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIGRkLnN0eWxlLnRyYW5zZm9ybSArPSAnIHRyYW5zbGF0ZVgoLTEwMCUpJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKHBvcy5sZWZ0ICsgZGQub2Zmc2V0V2lkdGggPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICAgICAgZGQuY2xhc3NMaXN0LmFkZCgndWktdGV0aGVyLXJpZ2h0Jyk7XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd1aS10ZXRoZXItcmlnaHQnKTtcblxuICAgICAgICAgICAgZGQuc3R5bGUubGVmdCA9IHBvcy5yaWdodCArICdweCc7XG4gICAgICAgICAgICBkZC5zdHlsZS50cmFuc2Zvcm0gKz0gJyB0cmFuc2xhdGVYKC0xMDAlKSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGQuY2xhc3NMaXN0LmFkZCgndWktdGV0aGVyLWxlZnQnKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLXRldGhlci1sZWZ0Jyk7XG5cbiAgICAgICAgICAgIGRkLnN0eWxlLmxlZnQgPSBwb3MubGVmdCArICdweCc7XG4gICAgICAgICAgICBkZC5zdHlsZS50cmFuc2Zvcm0gKz0gJyB0cmFuc2xhdGVYKDApJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGQuc3R5bGUudHJhbnNmb3JtICs9ICcgdHJhbnNsYXRlWigwKSc7XG4gICAgICB9O1xuXG4gICAgICBsZXQgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDtcbiAgICAgIGRvIHtcbiAgICAgICAgbGV0IGNzID0gZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnQpO1xuICAgICAgICBpZiAoIShbJ3Njcm9sbCcsICdhdXRvJ10uaW5kZXhPZihjcy5vdmVyZmxvd1gpID09IC0xICYmIFsnc2Nyb2xsJywgJ2F1dG8nXS5pbmRleE9mKGNzLm92ZXJmbG93WSkgPT0gLTEpKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5lcnMucHVzaChwYXJlbnQpO1xuICAgICAgICAgIHBhcmVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLnBvc2l0aW9uKTtcbiAgICAgICAgICBwYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgfSB3aGlsZSAocGFyZW50ICE9IG51bGwpXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5wb3NpdGlvbik7XG5cbiAgICAgIHRoaXMucG9zaXRpb24oKTtcbiAgICB9KShwYXJlbnQsIGNoaWxkLCBvcHRzKTtcbiAgfVxuXG4gIC8vIFRvYXN0c1xuICBleHBvcnQgZnVuY3Rpb24gdG9hc3Qob3B0aW9uczogYW55KSB7XG4gICAgbGV0IG9wdHMgPSB7IGNvbnRhaW5lcjogdGhpcy5vdmVybGF5Q29udGFpbmVyLCB0aGVtZTogJ2RhcmsnLCB0aW1lb3V0OiA1MDAwLCBnbHlwaDogJ2dseXBoLWFsZXJ0LWluZm8nLCBtZXNzYWdlOiAnJywgdGl0bGU6ICcnIH07XG4gICAgaWYgKGlzU3RyaW5nKG9wdGlvbnMpKSBvcHRzLm1lc3NhZ2UgPSBvcHRpb25zO1xuICAgIGVsc2Ugb3B0cyA9IE9iamVjdC5hc3NpZ24ob3B0cywgb3B0aW9ucyk7XG4gICAgbGV0IHRvYXN0ID0gRE9NLmNyZWF0ZUVsZW1lbnQoJ3VpLXRvYXN0Jyk7XG4gICAgdG9hc3QuY2xhc3NMaXN0LmFkZChgdWktJHtvcHRzLnRoZW1lfWApO1xuICAgIHRvYXN0LmlubmVySFRNTCA9IGAke29wdHMudGl0bGUgPyBgPGgxPiR7b3B0cy50aXRsZX08L2gxPmA6ICcnfTxwPiR7b3B0cy5tZXNzYWdlfTwvcD5gO1xuICAgIGlmIChvcHRzLmNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGggPiAwKVxuICAgICAgb3B0cy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKHRvYXN0LCBvcHRzLmNvbnRhaW5lci5jaGlsZHJlblswXSk7XG4gICAgZWxzZVxuICAgICAgb3B0cy5jb250YWluZXIuYXBwZW5kQ2hpbGQodG9hc3QpO1xuXG4gICAgbGV0IGVuZ2luZSA9IHRoaXMubGF6eShUZW1wbGF0aW5nRW5naW5lKTtcbiAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiBlbmdpbmUuZW5oYW5jZSh7XG4gICAgICBlbGVtZW50OiB0b2FzdCwgYmluZGluZ0NvbnRleHQ6IHtcbiAgICAgICAgZ2x5cGg6IG9wdHMuZ2x5cGgsXG4gICAgICAgIHRpbWVvdXQ6IG9wdHMudGltZW91dFxuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIC8vIEFsZXJ0c1xuICBleHBvcnQgZnVuY3Rpb24gYWxlcnQob3B0aW9uczogYW55KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgbGV0IG9wdHMgPSB7IGdseXBoOiAnZ2x5cGgtYWxlcnQtaW5mbycsIG1lc3NhZ2U6ICcnLCB0aXRsZTogJycsIG9rTGFiZWw6ICdPSycsIGNhbmNlbExhYmVsOiAnQ2FuY2VsJywgY29uZmlybTogZmFsc2UgfTtcbiAgICBpZiAoaXNTdHJpbmcob3B0aW9ucykpIG9wdHMubWVzc2FnZSA9IG9wdGlvbnM7XG4gICAgZWxzZSBvcHRzID0gT2JqZWN0LmFzc2lnbihvcHRzLCBvcHRpb25zKTtcbiAgICBsZXQgYWxlcnQgPSBET00uY3JlYXRlRWxlbWVudCgndWktYWxlcnQnKTtcbiAgICBhbGVydC5pbm5lckhUTUwgPSBgJHtvcHRzLnRpdGxlID8gYDxoMT4ke29wdHMudGl0bGV9PC9oMT5gOiAnJ308cD4ke29wdHMubWVzc2FnZX08L3A+YDtcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChhbGVydCk7XG5cbiAgICBsZXQgZW5naW5lID0gdGhpcy5sYXp5KFRlbXBsYXRpbmdFbmdpbmUpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiBlbmdpbmUuZW5oYW5jZSh7XG4gICAgICAgIGVsZW1lbnQ6IGFsZXJ0LCBiaW5kaW5nQ29udGV4dDoge1xuICAgICAgICAgIGdseXBoOiBvcHRzLmdseXBoLFxuICAgICAgICAgIG9rTGFiZWw6IG9wdHMub2tMYWJlbCxcbiAgICAgICAgICBjYW5jZWxMYWJlbDogb3B0cy5jYW5jZWxMYWJlbCxcbiAgICAgICAgICBjb25maXJtOiBvcHRzLmNvbmZpcm0sXG4gICAgICAgICAgY2xvc2VDYWxsYmFjazogZnVuY3Rpb24oYikge1xuICAgICAgICAgICAgcmVzb2x2ZShiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjb25maXJtKG9wdGlvbnM6IGFueSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGxldCBvcHRzID0geyBnbHlwaDogJ2dseXBoLWFsZXJ0LXF1ZXN0aW9uJywgbWVzc2FnZTogJycsIHRpdGxlOiAnJywgY29uZmlybTogdHJ1ZSB9O1xuICAgIGlmIChpc1N0cmluZyhvcHRpb25zKSkgb3B0cy5tZXNzYWdlID0gb3B0aW9ucztcbiAgICBlbHNlIG9wdHMgPSBPYmplY3QuYXNzaWduKG9wdHMsIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIFVJVXRpbHMuYWxlcnQob3B0cyk7XG4gIH1cblxuICBleHBvcnQgZnVuY3Rpb24gcHJvbXB0KG9wdGlvbnM6IGFueSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgbGV0IG9wdHMgPSB7IGdseXBoOiAnZ2x5cGgtYWxlcnQtcXVlc3Rpb24nLCBtZXNzYWdlOiAnJywgdGl0bGU6ICcnLCBva0xhYmVsOiAnT0snLCBjYW5jZWxMYWJlbDogJ0NhbmNlbCcsIHR5cGU6ICdzaW5nbGUnLCB9O1xuICAgIGlmIChpc1N0cmluZyhvcHRpb25zKSkgb3B0cy5tZXNzYWdlID0gb3B0aW9ucztcbiAgICBlbHNlIG9wdHMgPSBPYmplY3QuYXNzaWduKG9wdHMsIG9wdGlvbnMpO1xuICAgIGxldCBhbGVydCA9IERPTS5jcmVhdGVFbGVtZW50KCd1aS1wcm9tcHQnKTtcbiAgICBhbGVydC5pbm5lckhUTUwgPSBgJHtvcHRzLnRpdGxlID8gYDxoMT4ke29wdHMudGl0bGV9PC9oMT5gOiAnJ308cD4ke29wdHMubWVzc2FnZX08L3A+YDtcbiAgICB0aGlzLmRpYWxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChhbGVydCk7XG5cbiAgICBsZXQgZW5naW5lID0gdGhpcy5sYXp5KFRlbXBsYXRpbmdFbmdpbmUpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBVSUV2ZW50LnF1ZXVlVGFzaygoKSA9PiBlbmdpbmUuZW5oYW5jZSh7XG4gICAgICAgIGVsZW1lbnQ6IGFsZXJ0LCBiaW5kaW5nQ29udGV4dDoge1xuICAgICAgICAgIHR5cGU6IG9wdHMudHlwZSxcbiAgICAgICAgICBnbHlwaDogb3B0cy5nbHlwaCxcbiAgICAgICAgICBva0xhYmVsOiBvcHRzLm9rTGFiZWwsXG4gICAgICAgICAgY2FuY2VsTGFiZWw6IG9wdHMuY2FuY2VsTGFiZWwsXG4gICAgICAgICAgY2xvc2VDYWxsYmFjazogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9XG5cblxuICAvLyBWaWV3IHJlYWxhdGVkIGhvb2tzXG4gIGV4cG9ydCBmdW5jdGlvbiBsb2FkVmlldyh1cmwsIHBhcmVudCwgbW9kZWw/KSB7XG4gICAgbGV0IF9fY29tcG9zaXRpb25FbmdpbmUgPSB0aGlzLmxhenkoQ29tcG9zaXRpb25FbmdpbmUpO1xuXG4gICAgbGV0IGluc3RydWN0aW9uOiBhbnkgPSB7XG4gICAgICB2aWV3TW9kZWw6IHVybCxcbiAgICAgIGNvbnRhaW5lcjogdGhpcy5hdUNvbnRhaW5lcixcbiAgICAgIGNoaWxkQ29udGFpbmVyOiB0aGlzLmF1Q29udGFpbmVyLmNyZWF0ZUNoaWxkKCksXG4gICAgICBtb2RlbDogbW9kZWxcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBfX2dldFZpZXdNb2RlbChpbnN0cnVjdGlvbilcbiAgICAgICAgLnRoZW4obmV3SW5zdHJ1Y3Rpb24gPT4ge1xuICAgICAgICAgIGxldCB2aWV3TW9kZWw6IGFueSA9IDxhbnk+bmV3SW5zdHJ1Y3Rpb24udmlld01vZGVsO1xuICAgICAgICAgIHJldHVybiBfX2ludm9rZUxpZmVjeWNsZSh2aWV3TW9kZWwsICdjYW5BY3RpdmF0ZScsIGluc3RydWN0aW9uLm1vZGVsKVxuICAgICAgICAgICAgLnRoZW4oY2FuQWN0aXZhdGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoY2FuQWN0aXZhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19jb21wb3NpdGlvbkVuZ2luZS5jcmVhdGVDb250cm9sbGVyKGluc3RydWN0aW9uKVxuICAgICAgICAgICAgICAgICAgLnRoZW4oY29udHJvbGxlciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuYXV0b21hdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNsb3QgPSBuZXcgVmlld1Nsb3QocGFyZW50LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5hZGQoY29udHJvbGxlci52aWV3KTtcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5hdHRhY2hlZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNvbnRyb2xsZXIudmlld01vZGVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfX2dldFZpZXdNb2RlbChpbnN0cnVjdGlvbikge1xuICAgIGxldCBfX2NvbXBvc2l0aW9uRW5naW5lID0gVUlVdGlscy5sYXp5KENvbXBvc2l0aW9uRW5naW5lKTtcblxuICAgIGlmICh0eXBlb2YgaW5zdHJ1Y3Rpb24udmlld01vZGVsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpbnN0cnVjdGlvbi52aWV3TW9kZWwgPSBPcmlnaW4uZ2V0KGluc3RydWN0aW9uLnZpZXdNb2RlbCkubW9kdWxlSWQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBpbnN0cnVjdGlvbi52aWV3TW9kZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gX19jb21wb3NpdGlvbkVuZ2luZS5lbnN1cmVWaWV3TW9kZWwoaW5zdHJ1Y3Rpb24pO1xuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5zdHJ1Y3Rpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gX19pbnZva2VMaWZlY3ljbGUoaW5zdGFuY2UsIG5hbWUsIG1vZGVsKSB7XG4gICAgaWYgKGluc3RhbmNlICYmIHR5cGVvZiBpbnN0YW5jZVtuYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgbGV0IHJlc3VsdCA9IGluc3RhbmNlW25hbWVdKG1vZGVsKTtcblxuICAgICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdCAhPT0gbnVsbCAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
