var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "lodash"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITextarea = (function (_super) {
        __extends(UITextarea, _super);
        function UITextarea(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.dir = '';
            _this.rows = 5;
            _this.errors = null;
            _this.maxlength = 5000;
            _this.disabled = false;
            _this.readonly = false;
            _this.placeholder = '';
            _this.autoComplete = '';
            _this.info = '';
            _this.clear = false;
            _this.counter = false;
            _this.ignore = false;
            _this.acList = [];
            _this.acShow = false;
            _this.properties = [
                'direction',
                'boxSizing',
                'width',
                'height',
                'overflowX',
                'overflowY',
                'borderTopWidth',
                'borderRightWidth',
                'borderBottomWidth',
                'borderLeftWidth',
                'borderStyle',
                'paddingTop',
                'paddingRight',
                'paddingBottom',
                'paddingLeft',
                'fontStyle',
                'fontVariant',
                'fontWeight',
                'fontStretch',
                'fontSize',
                'fontSizeAdjust',
                'lineHeight',
                'fontFamily',
                'textAlign',
                'textTransform',
                'textIndent',
                'textDecoration',
                'letterSpacing',
                'wordSpacing',
                'tabSize',
                'MozTabSize'
            ];
            _this.isBrowser = (typeof window !== 'undefined');
            _this.isFirefox = (_this.isBrowser && window['mozInnerScreenX'] != null);
            _this.clear = element.hasAttribute('clear');
            _this.counter = element.hasAttribute('counter');
            return _this;
        }
        UITextarea.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
            this.autoCompleteChanged(this.autoComplete);
        };
        UITextarea.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { resize: false, position: 'tl' });
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function () { return _this.closeAutoComplete(); });
        };
        UITextarea.prototype.detached = function () {
            this.tether.dispose();
            this.obMouseup.dispose();
        };
        UITextarea.prototype.valueChanged = function (newValue) { };
        UITextarea.prototype.autoCompleteChanged = function (newValue) {
            if (_.isString(newValue))
                newValue = newValue.split(',');
            this.autoComplete = newValue.sort();
        };
        UITextarea.prototype.hilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            evt.target.classList.add('ui-hilight');
        };
        UITextarea.prototype.checkList = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            var text = this.inputEl.value.substring(0, this.inputEl.selectionEnd);
            var query = text.match(eval("/\\b([\\d\\w\\-]{1,})$/"));
            if (query !== null) {
                var rx = new RegExp(getAscii(query[1]), 'i');
                this.acList = _.filter(this.autoComplete, function (v) {
                    var asc = getAscii(v);
                    return rx.test(asc);
                });
                if (this.acShow = (this.acList.length > 0)) {
                    var pos = this.getCaretCoordinates();
                    this.tether.position();
                    this.dropdown.style.marginTop = pos.top;
                    this.dropdown.style.marginLeft = pos.left;
                    this.dropdown.classList.add('ui-open');
                }
            }
            return true;
        };
        UITextarea.prototype.checkInput = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 9)
                this.closeAutoComplete();
            if (this.acShow) {
                if (code == 13) {
                    var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
                    if (h !== null)
                        this.replace(h.dataset.value);
                    this.acShow = false;
                    return false;
                }
                if (code === 38) {
                    var prev = void 0;
                    var h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
                    if (h !== null)
                        h = h.previousElementSibling;
                    if (h === null)
                        h = this.dropdown.querySelector('.ui-list-item');
                    if (h != null) {
                        if (prev != null)
                            prev.classList.remove('ui-hilight');
                        h.classList.add('ui-hilight');
                    }
                    evt.preventDefault();
                    return false;
                }
                else if (code === 40) {
                    var prev = void 0;
                    var h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
                    if (h !== null)
                        h = h.nextElementSibling;
                    if (h === null)
                        h = this.dropdown.querySelector('.ui-list-item');
                    if (h != null) {
                        if (prev != null)
                            prev.classList.remove('ui-hilight');
                        h.classList.add('ui-hilight');
                    }
                    evt.preventDefault();
                    return false;
                }
            }
            return true;
        };
        UITextarea.prototype.replace = function (selected) {
            var _this = this;
            if (!(isFunction(this.beforeReplace) && (selected = this.beforeReplace(selected)) !== false)) {
                var pre = this.inputEl.value.substring(0, this.inputEl.selectionEnd);
                var post = this.inputEl.value.substring(this.inputEl.selectionEnd);
                pre = pre.replace(eval("/\\b([\\d\\w\\-]{1,})$/"), selected + ' ');
                this.value = (pre + post);
                setTimeout(function () { return _this.inputEl.setSelectionRange(pre.length, pre.length); }, 100);
            }
            this.closeAutoComplete();
        };
        UITextarea.prototype.closeAutoComplete = function () {
            this.acShow = false;
            this.dropdown.classList.remove('ui-open');
        };
        UITextarea.prototype.getCaretCoordinates = function () {
            var element = this.inputEl;
            var position = this.inputEl.selectionStart;
            if (!this.isBrowser) {
                throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
            }
            var debug = false;
            if (debug) {
                var el = document.querySelector('#input-textarea-caret-position-mirror-div');
                if (el) {
                    el.parentNode.removeChild(el);
                }
            }
            var div = document.createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            document.body.appendChild(div);
            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT')
                style.wordWrap = 'break-word';
            style.position = 'absolute';
            if (!debug)
                style.visibility = 'hidden';
            _.forEach(this.properties, function (prop) {
                style[prop] = computed[prop];
            });
            if (this.isFirefox) {
                if (element.scrollHeight > parseInt(computed.height))
                    style.overflowY = 'scroll';
            }
            else {
                style.overflow = 'hidden';
            }
            div.textContent = element.value.substring(0, position);
            if (element.nodeName === 'INPUT')
                div.textContent = div.textContent.replace(/\s/g, '\u00a0');
            var span = document.createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);
            var coordinates = {
                top: (span.offsetTop + parseInt(computed['borderTopWidth']) + 20 - element.scrollTop) + 'px',
                left: (span.offsetLeft + parseInt(computed['borderLeftWidth'])) + 'px'
            };
            if (debug) {
                span.style.backgroundColor = '#aaa';
            }
            else {
                document.body.removeChild(div);
            }
            return coordinates;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "autoComplete", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "info", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "beforeReplace", void 0);
        UITextarea = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div role=\"input\" class=\"ui-input-control ui-textarea\"><span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <textarea ref=\"inputEl\" value.bind=\"value\" rows.bind=\"rows\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keyup.trigger=\"checkList($event)\" keydown.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"></textarea>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><li class=\"ui-list-item\" mouseover.trigger=\"hilightItem($event)\" repeat.for=\"item of acList\" innerhtml.bind=\"item\" data-value.bind=\"item\" click.trigger=\"replace(item)\"></li></ul>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"value.length + ' of ' + maxlength\"></span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-textarea'),
            __metadata("design:paramtypes", [Element])
        ], UITextarea);
        return UITextarea;
    }(ui_input_1.UIBaseInput));
    exports.UITextarea = UITextarea;
});
