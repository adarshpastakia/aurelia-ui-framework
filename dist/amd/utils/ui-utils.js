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
        var dialogContainerSlot;
        function getDialogContainerSlot() {
            if (!dialogContainerSlot) {
                dialogContainerSlot = new aurelia_framework_1.ViewSlot(UIUtils.dialogContainer, true);
                dialogContainerSlot.attached();
            }
            return dialogContainerSlot;
        }
        UIUtils.getDialogContainerSlot = getDialogContainerSlot;
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
            opts = Object.assign({ resize: true, position: 'bl', oppEdge: false }, opts);
            child.style.position = 'fixed';
            return new (function (el, dd, options) {
                var _this = this;
                this.listeners = [];
                this.align = options.position;
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
                    var align = _this.align.split('');
                    if (align[0] == 'c') {
                        dd.style.top = pos.top + (pos.height / 2) + 'px';
                        dd.style.transform = ' translateY(-50%)';
                    }
                    else if (align[0] == 't') {
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
                            dd.style.transform += options.oppEdge ? ' translateX(-100%)' : ' translateX(0)';
                        }
                        else {
                            dd.classList.add('ui-tether-right');
                            el.classList.add('ui-tether-right');
                            dd.style.left = pos.right + 'px';
                            dd.style.transform += options.oppEdge ? ' translateX(0)' : ' translateX(-100%)';
                        }
                    }
                    else {
                        if (pos.left + dd.offsetWidth > window.innerWidth) {
                            dd.classList.add('ui-tether-right');
                            el.classList.add('ui-tether-right');
                            dd.style.left = pos.right + 'px';
                            dd.style.transform += options.oppEdge ? ' translateX(0)' : ' translateX(-100%)';
                        }
                        else {
                            dd.classList.add('ui-tether-left');
                            el.classList.add('ui-tether-left');
                            dd.style.left = pos.left + 'px';
                            dd.style.transform += options.oppEdge ? ' translateX(-100%)' : ' translateX(0)';
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
