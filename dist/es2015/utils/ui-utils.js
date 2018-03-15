import { Lazy, NewInstance, DOM, TemplatingEngine, CompositionEngine, ViewSlot } from "aurelia-framework";
import { Origin } from "aurelia-metadata";
import { UIEvent } from "./ui-event";
import * as _ from "lodash";
export function lodashMixins() {
    _.mixin({
        'findByValues': function (collection, property, values) {
            if (_.isArray(collection)) {
                return _.filter(collection, function (item) {
                    return _.indexOf(values, item[property] + '') > -1;
                });
            }
            else {
                let ret = [];
                _.forEach(collection, function (list) {
                    ret.concat(_.filter(list, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    }));
                });
                return ret;
            }
        },
        'removeByValues': function (collection, property, values) {
            if (_.isArray(collection)) {
                return _.remove(collection, function (item) {
                    return _.indexOf(values, item[property] + '') > -1;
                }) || [];
            }
            else {
                let ret = [];
                _.forEach(collection, function (list, key) {
                    ret = ret.concat(_.remove(list, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    }));
                });
                return ret;
            }
        },
        'findDeep': function (collection, property, value) {
            if (_.isArray(collection)) {
                return _.find(collection, function (item) {
                    return item[property] + '' === value + '';
                });
            }
            else {
                let ret;
                _.forEach(collection, function (item) {
                    ret = _.find(item, v => {
                        return v[property] + '' === value + '';
                    });
                    return ret === undefined;
                });
                return ret || {};
            }
        },
        'findChildren': function (collection, listProperty, property, value) {
            let ret;
            _.forEach(collection, function (item) {
                ret = _.find(item[listProperty], v => {
                    return v[property] + '' === value + '';
                });
                return ret === undefined;
            });
            return ret || {};
        }
    });
}
export var UIUtils;
(function (UIUtils) {
    var dialogContainerSlot;
    function getDialogContainerSlot() {
        if (!dialogContainerSlot) {
            dialogContainerSlot = new ViewSlot(UIUtils.dialogContainer, true);
            dialogContainerSlot.attached();
        }
        return dialogContainerSlot;
    }
    UIUtils.getDialogContainerSlot = getDialogContainerSlot;
    function lazy(T) {
        if (!this.auContainer) {
            throw new Error('UIUtils.Lazy::Container not set');
        }
        return Lazy.of(T).get(this.auContainer)();
    }
    UIUtils.lazy = lazy;
    function newInstance(T) {
        if (!this.auContainer) {
            throw new Error('UIUtils.newInstance::Container not provided');
        }
        return NewInstance.of(T).get(this.auContainer);
    }
    UIUtils.newInstance = newInstance;
    function tether(parent, child, opts) {
        opts = Object.assign({ resize: true, position: 'bl', oppEdge: false }, opts);
        child.style.position = 'fixed';
        return new (function (el, dd, options) {
            this.listeners = [];
            this.align = options.position;
            this.dispose = () => {
                this.listeners.forEach(parent => {
                    parent.removeEventListener('scroll', this.position);
                    parent.removeEventListener('touchstart', this.position);
                });
                window.removeEventListener('resize', this.position);
            };
            this.position = (sizeWidth = false, topLeft = false) => {
                let isRtl = window.isRtl(el);
                let pos = el.getBoundingClientRect();
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
                let align = this.align.split('');
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
            let parent = el.parentElement;
            do {
                let cs = getComputedStyle(parent);
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
        let opts = { container: this.overlayContainer, theme: 'dark', timeout: 5000, glyph: 'glyph-alert-info', message: '', title: '' };
        if (isString(options))
            opts.message = options;
        else
            opts = Object.assign(opts, options);
        let toast = DOM.createElement('ui-toast');
        toast.classList.add(`ui-${opts.theme}`);
        toast.innerHTML = `${opts.title ? `<h1>${opts.title}</h1>` : ''}<p>${opts.message}</p>`;
        if (opts.container.children.length > 0)
            opts.container.insertBefore(toast, opts.container.children[0]);
        else
            opts.container.appendChild(toast);
        let engine = this.lazy(TemplatingEngine);
        UIEvent.queueTask(() => engine.enhance({
            element: toast, bindingContext: {
                glyph: opts.glyph,
                timeout: opts.timeout
            }
        }));
    }
    UIUtils.toast = toast;
    function alert(options) {
        let opts = { glyph: 'glyph-alert-info', message: '', title: '', okLabel: 'OK', cancelLabel: 'Cancel', confirm: false };
        if (isString(options))
            opts.message = options;
        else
            opts = Object.assign(opts, options);
        let alert = DOM.createElement('ui-alert');
        alert.innerHTML = `${opts.title ? `<h1>${opts.title}</h1>` : ''}<p>${opts.message}</p>`;
        this.dialogContainer.appendChild(alert);
        let engine = this.lazy(TemplatingEngine);
        return new Promise((resolve, reject) => {
            UIEvent.queueTask(() => engine.enhance({
                element: alert, bindingContext: {
                    glyph: opts.glyph,
                    okLabel: opts.okLabel,
                    cancelLabel: opts.cancelLabel,
                    confirm: opts.confirm,
                    closeCallback: function (b) {
                        resolve(b);
                    }
                }
            }));
        });
    }
    UIUtils.alert = alert;
    function confirm(options) {
        let opts = { glyph: 'glyph-alert-question', message: '', title: '', confirm: true };
        if (isString(options))
            opts.message = options;
        else
            opts = Object.assign(opts, options);
        return UIUtils.alert(opts);
    }
    UIUtils.confirm = confirm;
    function prompt(options) {
        let opts = { glyph: 'glyph-alert-question', message: '', title: '', okLabel: 'OK', cancelLabel: 'Cancel', type: 'single', };
        if (isString(options))
            opts.message = options;
        else
            opts = Object.assign(opts, options);
        let alert = DOM.createElement('ui-prompt');
        alert.innerHTML = `${opts.title ? `<h1>${opts.title}</h1>` : ''}<p>${opts.message}</p>`;
        this.dialogContainer.appendChild(alert);
        let engine = this.lazy(TemplatingEngine);
        return new Promise((resolve, reject) => {
            UIEvent.queueTask(() => engine.enhance({
                element: alert, bindingContext: {
                    type: opts.type,
                    glyph: opts.glyph,
                    okLabel: opts.okLabel,
                    cancelLabel: opts.cancelLabel,
                    closeCallback: function (value) {
                        resolve(value);
                    }
                }
            }));
        });
    }
    UIUtils.prompt = prompt;
    function loadView(url, parent, model) {
        let __compositionEngine = this.lazy(CompositionEngine);
        let instruction = {
            viewModel: url,
            container: this.auContainer,
            childContainer: this.auContainer.createChild(),
            model: model
        };
        return new Promise((resolve, reject) => {
            __getViewModel(instruction)
                .then(newInstruction => {
                let viewModel = newInstruction.viewModel;
                return __invokeLifecycle(viewModel, 'canActivate', instruction.model)
                    .then(canActivate => {
                    if (canActivate) {
                        return __compositionEngine.createController(instruction)
                            .then(controller => {
                            controller.automate();
                            let slot = new ViewSlot(parent, true);
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
                .catch(e => {
            });
        });
    }
    UIUtils.loadView = loadView;
    function __getViewModel(instruction) {
        let __compositionEngine = UIUtils.lazy(CompositionEngine);
        if (typeof instruction.viewModel === 'function') {
            instruction.viewModel = Origin.get(instruction.viewModel).moduleId;
        }
        if (typeof instruction.viewModel === 'string') {
            return __compositionEngine.ensureViewModel(instruction);
        }
        return Promise.resolve(instruction);
    }
    function __invokeLifecycle(instance, name, model) {
        if (instance && typeof instance[name] === 'function') {
            let result = instance[name](model);
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
})(UIUtils || (UIUtils = {}));
