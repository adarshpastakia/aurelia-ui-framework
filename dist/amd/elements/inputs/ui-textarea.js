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
            _this.helpText = '';
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
        ], UITextarea.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "beforeReplace", void 0);
        UITextarea = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div role=\"input\" class=\"ui-input-control ui-textarea\" dir.bind=\"dir\"><span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <textarea ref=\"inputEl\" value.bind=\"value\" rows.bind=\"rows\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keyup.trigger=\"checkList($event)\" keydown.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"></textarea>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><li class=\"ui-list-item\" mouseover.trigger=\"hilightItem($event)\" repeat.for=\"item of acList\" innerhtml.bind=\"item\" data-value.bind=\"item\" click.trigger=\"replace(item)\"></li></ul>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"value.length + ' of ' + maxlength\"></span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-textarea'),
            __metadata("design:paramtypes", [Element])
        ], UITextarea);
        return UITextarea;
    }(ui_input_1.UIBaseInput));
    exports.UITextarea = UITextarea;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS10ZXh0YXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JBO1FBQWdDLDhCQUFXO1FBQ3pDLG9CQUFtQixPQUFnQjtZQUFuQyxZQUNFLGlCQUFPLFNBR1I7WUFKa0IsYUFBTyxHQUFQLE9BQU8sQ0FBUztZQXVCbUIsV0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVyRCxTQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsVUFBSSxHQUFHLENBQUMsQ0FBQztZQUNULFlBQU0sR0FBRyxJQUFJLENBQUM7WUFDZCxlQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLGNBQVEsR0FBRyxLQUFLLENBQUM7WUFDakIsY0FBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixpQkFBVyxHQUFHLEVBQUUsQ0FBQztZQUNqQixrQkFBWSxHQUFHLEVBQUUsQ0FBQztZQUNsQixjQUFRLEdBQUcsRUFBRSxDQUFDO1lBSWxCLFdBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxhQUFPLEdBQUcsS0FBSyxDQUFDO1lBRWhCLFlBQU0sR0FBRyxLQUFLLENBQUM7WUFPZixZQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osWUFBTSxHQUFHLEtBQUssQ0FBQztZQXFHdkIsZ0JBQVUsR0FBRztnQkFDWCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsT0FBTztnQkFDUCxRQUFRO2dCQUNSLFdBQVc7Z0JBQ1gsV0FBVztnQkFFWCxnQkFBZ0I7Z0JBQ2hCLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGFBQWE7Z0JBRWIsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGVBQWU7Z0JBQ2YsYUFBYTtnQkFFYixXQUFXO2dCQUNYLGFBQWE7Z0JBQ2IsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsZ0JBQWdCO2dCQUNoQixZQUFZO2dCQUNaLFlBQVk7Z0JBRVosV0FBVztnQkFDWCxlQUFlO2dCQUNmLFlBQVk7Z0JBQ1osZ0JBQWdCO2dCQUVoQixlQUFlO2dCQUNmLGFBQWE7Z0JBRWIsU0FBUztnQkFDVCxZQUFZO2FBRWIsQ0FBQztZQUVGLGVBQVMsR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsQ0FBQyxDQUFDO1lBQzVDLGVBQVMsR0FBRyxDQUFDLEtBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUE3TGhFLEtBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7O1FBQ2pELENBQUM7UUFJRCx5QkFBSSxHQUFKLFVBQUssY0FBc0IsRUFBRSxlQUF1QjtZQUNsRCxpQkFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFDRCw2QkFBUSxHQUFSO1lBQUEsaUJBR0M7WUFGQyxJQUFJLENBQUMsTUFBTSxHQUFHLGtCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxrQkFBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDbkYsQ0FBQztRQUNELDZCQUFRLEdBQVI7WUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQztRQStCRCxpQ0FBWSxHQUFaLFVBQWEsUUFBUSxJQUFJLENBQUM7UUFFMUIsd0NBQW1CLEdBQW5CLFVBQW9CLFFBQVE7WUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxDQUFDO1FBRUQsZ0NBQVcsR0FBWCxVQUFZLEdBQUc7WUFDYixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7Z0JBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDakQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCw4QkFBUyxHQUFULFVBQVUsR0FBRztZQUNYLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUYsSUFBSSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV0QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFVBQUEsQ0FBQztvQkFDekMsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7b0JBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO29CQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO1lBQ0gsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsK0JBQVUsR0FBVixVQUFXLEdBQUc7WUFDWixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQzlGLElBQUksSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUV4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsMEJBQTBCLENBQUMsQ0FBQztvQkFDaEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQzt3QkFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO29CQUNwQixNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNmLENBQUM7Z0JBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLElBQUksSUFBSSxTQUFBLENBQUM7b0JBQ1QsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBRXZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7d0JBQUMsQ0FBQyxHQUFnQixDQUFDLENBQUMsc0JBQXNCLENBQUM7b0JBRTFELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7d0JBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDOzRCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN0RCxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztvQkFDRCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztnQkFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLElBQUksSUFBSSxTQUFBLENBQUM7b0JBQ1QsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7b0JBRXZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7d0JBQUMsQ0FBQyxHQUFnQixDQUFDLENBQUMsa0JBQWtCLENBQUM7b0JBRXRELEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUM7d0JBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDOzRCQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN0RCxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDaEMsQ0FBQztvQkFDRCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELDRCQUFPLEdBQVAsVUFBUSxRQUFRO1lBQWhCLGlCQVNDO1lBUkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDbkUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO2dCQUMxQixVQUFVLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQXRELENBQXNELEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEYsQ0FBQztZQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNCLENBQUM7UUFFRCxzQ0FBaUIsR0FBakI7WUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQStDRCx3Q0FBbUIsR0FBbkI7WUFDRSxJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ2hDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0ZBQWdGLENBQUMsQ0FBQztZQUNwRyxDQUFDO1lBRUQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO2dCQUM3RSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNQLEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDO1lBQ0gsQ0FBQztZQUdELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsR0FBRyxDQUFDLEVBQUUsR0FBRywwQ0FBMEMsQ0FBQztZQUNwRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUvQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3RCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7WUFHMUYsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO1lBR2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQzVCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2dCQUNULEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1lBRzlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFBLElBQUk7Z0JBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFFbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuRCxLQUFLLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztZQUMvQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDNUIsQ0FBQztZQUVELEdBQUcsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBRXZELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDO2dCQUMvQixHQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUU3RCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBTTFDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdEIsSUFBSSxXQUFXLEdBQUc7Z0JBQ2hCLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJO2dCQUM1RixJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSTthQUN2RSxDQUFDO1lBRUYsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7WUFDdEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFsUHFEO1lBQXJELDRCQUFRLENBQUMsRUFBRSxrQkFBa0IsRUFBRSwrQkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDOztpREFBWTtRQUVyRDtZQUFYLDRCQUFRLEVBQUU7OytDQUFVO1FBQ1Q7WUFBWCw0QkFBUSxFQUFFOztnREFBVTtRQUNUO1lBQVgsNEJBQVEsRUFBRTs7a0RBQWU7UUFDZDtZQUFYLDRCQUFRLEVBQUU7O3FEQUFrQjtRQUNqQjtZQUFYLDRCQUFRLEVBQUU7O29EQUFrQjtRQUNqQjtZQUFYLDRCQUFRLEVBQUU7O29EQUFrQjtRQUNqQjtZQUFYLDRCQUFRLEVBQUU7O3VEQUFrQjtRQUNqQjtZQUFYLDRCQUFRLEVBQUU7O3dEQUFtQjtRQUNsQjtZQUFYLDRCQUFRLEVBQUU7O29EQUFlO1FBRWQ7WUFBWCw0QkFBUSxFQUFFOzt5REFBZTtRQXBDZixVQUFVO1lBYnRCLDhCQUFVLEVBQUU7WUFDWiw4QkFBVSxDQUFDLHN6Q0FVQSxDQUFDO1lBQ1osaUNBQWEsQ0FBQyxhQUFhLENBQUM7NkNBRUMsT0FBTztXQUR4QixVQUFVLENBMlF0QjtRQUFELGlCQUFDO0tBM1FELEFBMlFDLENBM1ErQixzQkFBVyxHQTJRMUM7SUEzUVksZ0NBQVUiLCJmaWxlIjoiZWxlbWVudHMvaW5wdXRzL3VpLXRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBpbmxpbmVWaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlCYXNlSW5wdXQgfSBmcm9tIFwiLi91aS1pbnB1dFwiO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuaW1wb3J0IHsgVUlVdGlscyB9IGZyb20gXCIuLi8uLi91dGlscy91aS11dGlsc1wiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1pbnB1dC13cmFwcGVyXCI+PGRpdiByb2xlPVwiaW5wdXRcIiBjbGFzcz1cInVpLWlucHV0LWNvbnRyb2wgdWktdGV4dGFyZWFcIiBkaXIuYmluZD1cImRpclwiPjxzcGFuIGNsYXNzPVwidWktZXJyb3JcIiBpZi5iaW5kPVwiZXJyb3JzXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtaW52YWxpZFwiPjwvdWktZ2x5cGg+PHVsIGNsYXNzPVwidWktZXJyb3ItbGlzdFwiPjxsaSByZXBlYXQuZm9yPVwiZXJyIG9mIGVycm9yc1wiIGlubmVyaHRtbC5iaW5kPVwiZXJyXCI+PC9saT48L3VsPjwvc3Bhbj5cbiAgPHRleHRhcmVhIHJlZj1cImlucHV0RWxcIiB2YWx1ZS5iaW5kPVwidmFsdWVcIiByb3dzLmJpbmQ9XCJyb3dzXCIgbWF4bGVuZ3RoLmJpbmQ9XCJtYXhsZW5ndGhcIiBkaXIuYmluZD1cImRpclwiXG4gICAgZm9jdXMudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCIgYmx1ci50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIlxuICAgIGlucHV0LnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGNoYW5nZS50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIlxuICAgIGtleXVwLnRyaWdnZXI9XCJjaGVja0xpc3QoJGV2ZW50KVwiIGtleWRvd24udHJpZ2dlcj1cImNoZWNrSW5wdXQoJGV2ZW50KVwiIHBsYWNlaG9sZGVyLmJpbmQ9XCJwbGFjZWhvbGRlclwiXG4gICAgZGlzYWJsZWQuYmluZD1cImlzRGlzYWJsZWRcIiByZWFkb25seS5iaW5kPVwicmVhZG9ubHlcIj48L3RleHRhcmVhPlxuICA8dWwgY2xhc3M9XCJ1aS1saXN0LWNvbnRhaW5lciB1aS1mbG9hdGluZ1wiIHJlZj1cImRyb3Bkb3duXCI+PGxpIGNsYXNzPVwidWktbGlzdC1pdGVtXCIgbW91c2VvdmVyLnRyaWdnZXI9XCJoaWxpZ2h0SXRlbSgkZXZlbnQpXCIgcmVwZWF0LmZvcj1cIml0ZW0gb2YgYWNMaXN0XCIgaW5uZXJodG1sLmJpbmQ9XCJpdGVtXCIgZGF0YS12YWx1ZS5iaW5kPVwiaXRlbVwiIGNsaWNrLnRyaWdnZXI9XCJyZXBsYWNlKGl0ZW0pXCI+PC9saT48L3VsPlxuICA8c3BhbiBjbGFzcz1cInVpLWNsZWFyXCIgaWYuYmluZD1cImNsZWFyICYmIHZhbHVlXCIgY2xpY2sudHJpZ2dlcj1cImNsZWFySW5wdXQoKVwiPiZ0aW1lczs8L3NwYW4+XG4gIDxzcGFuIGNsYXNzPVwidWktY291bnRlclwiIGlmLmJpbmQ9XCJjb3VudGVyXCIgaW5uZXJodG1sLmJpbmQ9XCJ2YWx1ZS5sZW5ndGggKyAnIG9mICcgKyBtYXhsZW5ndGhcIj48L3NwYW4+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1pbnB1dC1pbmZvXCIgaWYuYmluZD1cImhlbHBUZXh0XCIgaW5uZXJodG1sLmJpbmQ9XCJoZWxwVGV4dFwiPjwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLXRleHRhcmVhJylcbmV4cG9ydCBjbGFzcyBVSVRleHRhcmVhIGV4dGVuZHMgVUlCYXNlSW5wdXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGVhciA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjbGVhcicpO1xuICAgIHRoaXMuY291bnRlciA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb3VudGVyJyk7XG4gIH1cblxuICAvLyBhdXJlbGlhIGhvb2tzXG4gIC8vIGNyZWF0ZWQob3duaW5nVmlldzogVmlldywgbXlWaWV3OiBWaWV3KSB7IH1cbiAgYmluZChiaW5kaW5nQ29udGV4dDogT2JqZWN0LCBvdmVycmlkZUNvbnRleHQ6IE9iamVjdCkge1xuICAgIHN1cGVyLmJpbmQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLmF1dG9Db21wbGV0ZUNoYW5nZWQodGhpcy5hdXRvQ29tcGxldGUpO1xuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMudGV0aGVyID0gVUlVdGlscy50ZXRoZXIodGhpcy5lbGVtZW50LCB0aGlzLmRyb3Bkb3duLCB7IHJlc2l6ZTogZmFsc2UsIHBvc2l0aW9uOiAndGwnIH0pO1xuICAgIHRoaXMub2JNb3VzZXVwID0gVUlFdmVudC5zdWJzY3JpYmUoJ21vdXNlY2xpY2snLCAoKSA9PiB0aGlzLmNsb3NlQXV0b0NvbXBsZXRlKCkpO1xuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIHRoaXMudGV0aGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm9iTW91c2V1cC5kaXNwb3NlKCk7XG4gIH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgdmFsdWUgPSAnJztcblxuICBAYmluZGFibGUoKSBkaXIgPSAnJztcbiAgQGJpbmRhYmxlKCkgcm93cyA9IDU7XG4gIEBiaW5kYWJsZSgpIGVycm9ycyA9IG51bGw7XG4gIEBiaW5kYWJsZSgpIG1heGxlbmd0aCA9IDUwMDA7XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIHJlYWRvbmx5ID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIHBsYWNlaG9sZGVyID0gJyc7XG4gIEBiaW5kYWJsZSgpIGF1dG9Db21wbGV0ZSA9ICcnO1xuICBAYmluZGFibGUoKSBoZWxwVGV4dCA9ICcnO1xuXG4gIEBiaW5kYWJsZSgpIGJlZm9yZVJlcGxhY2U7XG5cbiAgcHJpdmF0ZSBjbGVhciA9IGZhbHNlO1xuICBwcml2YXRlIGNvdW50ZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIGlnbm9yZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgdGV0aGVyO1xuICBwcml2YXRlIG9iTW91c2V1cDtcblxuICBwcml2YXRlIGRyb3Bkb3duO1xuXG4gIHByaXZhdGUgYWNMaXN0ID0gW107XG4gIHByaXZhdGUgYWNTaG93ID0gZmFsc2U7XG5cbiAgdmFsdWVDaGFuZ2VkKG5ld1ZhbHVlKSB7IH1cblxuICBhdXRvQ29tcGxldGVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgaWYgKF8uaXNTdHJpbmcobmV3VmFsdWUpKSBuZXdWYWx1ZSA9IG5ld1ZhbHVlLnNwbGl0KCcsJyk7XG4gICAgdGhpcy5hdXRvQ29tcGxldGUgPSBuZXdWYWx1ZS5zb3J0KCk7XG4gIH1cblxuICBoaWxpZ2h0SXRlbShldnQpIHtcbiAgICBsZXQgaCA9IHRoaXMuZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnVpLWxpc3QtaXRlbS51aS1oaWxpZ2h0Jyk7XG4gICAgaWYgKGggIT09IG51bGwpIGguY2xhc3NMaXN0LnJlbW92ZSgndWktaGlsaWdodCcpO1xuICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LmFkZCgndWktaGlsaWdodCcpO1xuICB9XG5cbiAgY2hlY2tMaXN0KGV2dCkge1xuICAgIGlmIChldnQuY3RybEtleSB8fCBldnQuYWx0S2V5IHx8IGV2dC5tZXRhS2V5IHx8IChldnQua2V5Q29kZSB8fCBldnQud2hpY2gpID09PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICBsZXQgY29kZSA9IChldnQua2V5Q29kZSB8fCBldnQud2hpY2gpO1xuXG4gICAgbGV0IHRleHQgPSB0aGlzLmlucHV0RWwudmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMuaW5wdXRFbC5zZWxlY3Rpb25FbmQpO1xuICAgIGxldCBxdWVyeSA9IHRleHQubWF0Y2goZXZhbChgL1xcXFxiKFtcXFxcZFxcXFx3XFxcXC1dezEsfSkkL2ApKTtcbiAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgIHZhciByeCA9IG5ldyBSZWdFeHAoZ2V0QXNjaWkocXVlcnlbMV0pLCAnaScpO1xuICAgICAgdGhpcy5hY0xpc3QgPSBfLmZpbHRlcih0aGlzLmF1dG9Db21wbGV0ZSwgdiA9PiB7XG4gICAgICAgIGxldCBhc2MgPSBnZXRBc2NpaSh2KTtcbiAgICAgICAgcmV0dXJuIHJ4LnRlc3QoYXNjKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuYWNTaG93ID0gKHRoaXMuYWNMaXN0Lmxlbmd0aCA+IDApKSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldENhcmV0Q29vcmRpbmF0ZXMoKTtcbiAgICAgICAgdGhpcy50ZXRoZXIucG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5zdHlsZS5tYXJnaW5Ub3AgPSBwb3MudG9wO1xuICAgICAgICB0aGlzLmRyb3Bkb3duLnN0eWxlLm1hcmdpbkxlZnQgPSBwb3MubGVmdDtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QuYWRkKCd1aS1vcGVuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2hlY2tJbnB1dChldnQpIHtcbiAgICBpZiAoZXZ0LmN0cmxLZXkgfHwgZXZ0LmFsdEtleSB8fCBldnQubWV0YUtleSB8fCAoZXZ0LmtleUNvZGUgfHwgZXZ0LndoaWNoKSA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgbGV0IGNvZGUgPSAoZXZ0LmtleUNvZGUgfHwgZXZ0LndoaWNoKTtcblxuICAgIGlmIChjb2RlID09IDkpIHRoaXMuY2xvc2VBdXRvQ29tcGxldGUoKTtcblxuICAgIGlmICh0aGlzLmFjU2hvdykge1xuICAgICAgaWYgKGNvZGUgPT0gMTMpIHtcbiAgICAgICAgbGV0IGggPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0udWktaGlsaWdodCcpO1xuICAgICAgICBpZiAoaCAhPT0gbnVsbCkgdGhpcy5yZXBsYWNlKGguZGF0YXNldC52YWx1ZSk7XG4gICAgICAgIHRoaXMuYWNTaG93ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvZGUgPT09IDM4KSB7XG4gICAgICAgIGxldCBwcmV2O1xuICAgICAgICBsZXQgaCA9IHByZXYgPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0udWktaGlsaWdodCcpO1xuICAgICAgICAvLyBpZiBmb3VuZCBoaWxpZ2h0IG9yIHNlbGVjdGVkIGdldCBwcmV2aW91c1xuICAgICAgICBpZiAoaCAhPT0gbnVsbCkgaCA9IDxIVE1MRWxlbWVudD5oLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIC8vIGlmIG5vIGhpbGlnaHQgZ2V0IGZpcnN0XG4gICAgICAgIGlmIChoID09PSBudWxsKSBoID0gdGhpcy5kcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcudWktbGlzdC1pdGVtJyk7XG4gICAgICAgIGlmIChoICE9IG51bGwpIHtcbiAgICAgICAgICBpZiAocHJldiAhPSBudWxsKSBwcmV2LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWhpbGlnaHQnKTtcbiAgICAgICAgICBoLmNsYXNzTGlzdC5hZGQoJ3VpLWhpbGlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoY29kZSA9PT0gNDApIHtcbiAgICAgICAgbGV0IHByZXY7XG4gICAgICAgIGxldCBoID0gcHJldiA9IHRoaXMuZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnVpLWxpc3QtaXRlbS51aS1oaWxpZ2h0Jyk7XG4gICAgICAgIC8vIGlmIGZvdW5kIGhpbGlnaHQgb3Igc2VsZWN0ZWQgZ2V0IHByZXZpb3VzXG4gICAgICAgIGlmIChoICE9PSBudWxsKSBoID0gPEhUTUxFbGVtZW50PmgubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAvLyBpZiBubyBoaWxpZ2h0IGdldCBmaXJzdFxuICAgICAgICBpZiAoaCA9PT0gbnVsbCkgaCA9IHRoaXMuZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnVpLWxpc3QtaXRlbScpO1xuICAgICAgICBpZiAoaCAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKHByZXYgIT0gbnVsbCkgcHJldi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1oaWxpZ2h0Jyk7XG4gICAgICAgICAgaC5jbGFzc0xpc3QuYWRkKCd1aS1oaWxpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXBsYWNlKHNlbGVjdGVkKSB7XG4gICAgaWYgKCEoaXNGdW5jdGlvbih0aGlzLmJlZm9yZVJlcGxhY2UpICYmIChzZWxlY3RlZCA9IHRoaXMuYmVmb3JlUmVwbGFjZShzZWxlY3RlZCkpICE9PSBmYWxzZSkpIHtcbiAgICAgIHZhciBwcmUgPSB0aGlzLmlucHV0RWwudmFsdWUuc3Vic3RyaW5nKDAsIHRoaXMuaW5wdXRFbC5zZWxlY3Rpb25FbmQpO1xuICAgICAgdmFyIHBvc3QgPSB0aGlzLmlucHV0RWwudmFsdWUuc3Vic3RyaW5nKHRoaXMuaW5wdXRFbC5zZWxlY3Rpb25FbmQpO1xuICAgICAgcHJlID0gcHJlLnJlcGxhY2UoZXZhbChgL1xcXFxiKFtcXFxcZFxcXFx3XFxcXC1dezEsfSkkL2ApLCBzZWxlY3RlZCArICcgJyk7XG4gICAgICB0aGlzLnZhbHVlID0gKHByZSArIHBvc3QpOy8vLnJlcGxhY2UoL1xcc3syLH0vZywgJyAnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pbnB1dEVsLnNldFNlbGVjdGlvblJhbmdlKHByZS5sZW5ndGgsIHByZS5sZW5ndGgpLCAxMDApO1xuICAgIH1cbiAgICB0aGlzLmNsb3NlQXV0b0NvbXBsZXRlKCk7XG4gIH1cblxuICBjbG9zZUF1dG9Db21wbGV0ZSgpIHtcbiAgICB0aGlzLmFjU2hvdyA9IGZhbHNlO1xuICAgIHRoaXMuZHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZSgndWktb3BlbicpO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSBhdXRvQ29tcGxldGVcbiAgcHJvcGVydGllcyA9IFtcbiAgICAnZGlyZWN0aW9uJywgLy8gUlRMIHN1cHBvcnRcbiAgICAnYm94U2l6aW5nJyxcbiAgICAnd2lkdGgnLFxuICAgICdoZWlnaHQnLFxuICAgICdvdmVyZmxvd1gnLFxuICAgICdvdmVyZmxvd1knLFxuXG4gICAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICAgJ2JvcmRlckJvdHRvbVdpZHRoJyxcbiAgICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgICAnYm9yZGVyU3R5bGUnLFxuXG4gICAgJ3BhZGRpbmdUb3AnLFxuICAgICdwYWRkaW5nUmlnaHQnLFxuICAgICdwYWRkaW5nQm90dG9tJyxcbiAgICAncGFkZGluZ0xlZnQnLFxuXG4gICAgJ2ZvbnRTdHlsZScsXG4gICAgJ2ZvbnRWYXJpYW50JyxcbiAgICAnZm9udFdlaWdodCcsXG4gICAgJ2ZvbnRTdHJldGNoJyxcbiAgICAnZm9udFNpemUnLFxuICAgICdmb250U2l6ZUFkanVzdCcsXG4gICAgJ2xpbmVIZWlnaHQnLFxuICAgICdmb250RmFtaWx5JyxcblxuICAgICd0ZXh0QWxpZ24nLFxuICAgICd0ZXh0VHJhbnNmb3JtJyxcbiAgICAndGV4dEluZGVudCcsXG4gICAgJ3RleHREZWNvcmF0aW9uJyxcblxuICAgICdsZXR0ZXJTcGFjaW5nJyxcbiAgICAnd29yZFNwYWNpbmcnLFxuXG4gICAgJ3RhYlNpemUnLFxuICAgICdNb3pUYWJTaXplJ1xuXG4gIF07XG5cbiAgaXNCcm93c2VyID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKTtcbiAgaXNGaXJlZm94ID0gKHRoaXMuaXNCcm93c2VyICYmIHdpbmRvd1snbW96SW5uZXJTY3JlZW5YJ10gIT0gbnVsbCk7XG5cbiAgZ2V0Q2FyZXRDb29yZGluYXRlcygpIHtcbiAgICBsZXQgZWxlbWVudDogYW55ID0gdGhpcy5pbnB1dEVsO1xuICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuaW5wdXRFbC5zZWxlY3Rpb25TdGFydDtcbiAgICBpZiAoIXRoaXMuaXNCcm93c2VyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RleHRhcmVhLWNhcmV0LXBvc2l0aW9uI2dldENhcmV0Q29vcmRpbmF0ZXMgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIGluIGEgYnJvd3NlcicpO1xuICAgIH1cblxuICAgIHZhciBkZWJ1ZyA9IGZhbHNlO1xuICAgIGlmIChkZWJ1Zykge1xuICAgICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LXRleHRhcmVhLWNhcmV0LXBvc2l0aW9uLW1pcnJvci1kaXYnKTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtaXJyb3JlZCBkaXZcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmlkID0gJ2lucHV0LXRleHRhcmVhLWNhcmV0LXBvc2l0aW9uLW1pcnJvci1kaXYnO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgIHZhciBzdHlsZSA9IGRpdi5zdHlsZTtcbiAgICB2YXIgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkgOiBlbGVtZW50LmN1cnJlbnRTdHlsZTsgLy8gY3VycmVudFN0eWxlIGZvciBJRSA8IDlcblxuICAgIC8vIGRlZmF1bHQgdGV4dGFyZWEgc3R5bGVzXG4gICAgc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUtd3JhcCc7XG4gICAgaWYgKGVsZW1lbnQubm9kZU5hbWUgIT09ICdJTlBVVCcpXG4gICAgICBzdHlsZS53b3JkV3JhcCA9ICdicmVhay13b3JkJzsgLy8gb25seSBmb3IgdGV4dGFyZWEtc1xuXG4gICAgLy8gcG9zaXRpb24gb2ZmLXNjcmVlblxuICAgIHN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJzsgLy8gcmVxdWlyZWQgdG8gcmV0dXJuIGNvb3JkaW5hdGVzIHByb3Blcmx5XG4gICAgaWYgKCFkZWJ1ZylcbiAgICAgIHN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJzsgLy8gbm90ICdkaXNwbGF5OiBub25lJyBiZWNhdXNlIHdlIHdhbnQgcmVuZGVyaW5nXG5cbiAgICAvLyB0cmFuc2ZlciB0aGUgZWxlbWVudCdzIHByb3BlcnRpZXMgdG8gdGhlIGRpdlxuICAgIF8uZm9yRWFjaCh0aGlzLnByb3BlcnRpZXMsIHByb3AgPT4ge1xuICAgICAgc3R5bGVbcHJvcF0gPSBjb21wdXRlZFtwcm9wXTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmlzRmlyZWZveCkge1xuICAgICAgLy8gRmlyZWZveCBsaWVzIGFib3V0IHRoZSBvdmVyZmxvdyBwcm9wZXJ0eSBmb3IgdGV4dGFyZWFzOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05ODQyNzVcbiAgICAgIGlmIChlbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcnNlSW50KGNvbXB1dGVkLmhlaWdodCkpXG4gICAgICAgIHN0eWxlLm92ZXJmbG93WSA9ICdzY3JvbGwnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nOyAvLyBmb3IgQ2hyb21lIHRvIG5vdCByZW5kZXIgYSBzY3JvbGxiYXI7IElFIGtlZXBzIG92ZXJmbG93WSA9ICdzY3JvbGwnXG4gICAgfVxuXG4gICAgZGl2LnRleHRDb250ZW50ID0gZWxlbWVudC52YWx1ZS5zdWJzdHJpbmcoMCwgcG9zaXRpb24pO1xuICAgIC8vIHRoZSBzZWNvbmQgc3BlY2lhbCBoYW5kbGluZyBmb3IgaW5wdXQgdHlwZT1cInRleHRcIiB2cyB0ZXh0YXJlYTogc3BhY2VzIG5lZWQgdG8gYmUgcmVwbGFjZWQgd2l0aCBub24tYnJlYWtpbmcgc3BhY2VzIC0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTM0MDIwMzUvMTI2OTAzN1xuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSU5QVVQnKVxuICAgICAgZGl2LnRleHRDb250ZW50ID0gZGl2LnRleHRDb250ZW50LnJlcGxhY2UoL1xccy9nLCAnXFx1MDBhMCcpO1xuXG4gICAgdmFyIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgLy8gV3JhcHBpbmcgbXVzdCBiZSByZXBsaWNhdGVkICpleGFjdGx5KiwgaW5jbHVkaW5nIHdoZW4gYSBsb25nIHdvcmQgZ2V0c1xuICAgIC8vIG9udG8gdGhlIG5leHQgbGluZSwgd2l0aCB3aGl0ZXNwYWNlIGF0IHRoZSBlbmQgb2YgdGhlIGxpbmUgYmVmb3JlICgjNykuXG4gICAgLy8gVGhlICAqb25seSogcmVsaWFibGUgd2F5IHRvIGRvIHRoYXQgaXMgdG8gY29weSB0aGUgKmVudGlyZSogcmVzdCBvZiB0aGVcbiAgICAvLyB0ZXh0YXJlYSdzIGNvbnRlbnQgaW50byB0aGUgPHNwYW4+IGNyZWF0ZWQgYXQgdGhlIGNhcmV0IHBvc2l0aW9uLlxuICAgIC8vIGZvciBpbnB1dHMsIGp1c3QgJy4nIHdvdWxkIGJlIGVub3VnaCwgYnV0IHdoeSBib3RoZXI/XG4gICAgc3Bhbi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKHBvc2l0aW9uKSB8fCAnLic7IC8vIHx8IGJlY2F1c2UgYSBjb21wbGV0ZWx5IGVtcHR5IGZhdXggc3BhbiBkb2Vzbid0IHJlbmRlciBhdCBhbGxcbiAgICBkaXYuYXBwZW5kQ2hpbGQoc3Bhbik7XG5cbiAgICB2YXIgY29vcmRpbmF0ZXMgPSB7XG4gICAgICB0b3A6IChzcGFuLm9mZnNldFRvcCArIHBhcnNlSW50KGNvbXB1dGVkWydib3JkZXJUb3BXaWR0aCddKSArIDIwIC0gZWxlbWVudC5zY3JvbGxUb3ApICsgJ3B4JyxcbiAgICAgIGxlZnQ6IChzcGFuLm9mZnNldExlZnQgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyTGVmdFdpZHRoJ10pKSArICdweCdcbiAgICB9O1xuXG4gICAgaWYgKGRlYnVnKSB7XG4gICAgICBzcGFuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICcjYWFhJztcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkaXYpO1xuICAgIH1cblxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
