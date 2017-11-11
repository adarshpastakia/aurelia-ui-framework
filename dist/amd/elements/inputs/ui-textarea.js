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
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div role=\"input\" class=\"ui-input-control ui-textarea\"><span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <textarea ref=\"inputEl\" value.bind=\"value\" rows.bind=\"rows\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keyup.trigger=\"checkList($event)\" keydown.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"></textarea>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><li class=\"ui-list-item\" mouseover.trigger=\"hilightItem($event)\" repeat.for=\"item of acList\" innerhtml.bind=\"item\" data-value.bind=\"item\" click.trigger=\"replace(item)\"></li></ul>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"value.length + ' of ' + maxlength\"></span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-textarea'),
            __metadata("design:paramtypes", [Element])
        ], UITextarea);
        return UITextarea;
    }(ui_input_1.UIBaseInput));
    exports.UITextarea = UITextarea;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS10ZXh0YXJlYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JBO1FBQWdDLDhCQUFXO1FBQ3pDLG9CQUFtQixPQUFnQjtZQUFuQyxZQUNFLGlCQUFPLFNBR1I7WUFKa0IsYUFBTyxHQUFQLE9BQU8sQ0FBUztZQXVCbUIsV0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVyRCxTQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsVUFBSSxHQUFHLENBQUMsQ0FBQztZQUNULFlBQU0sR0FBRyxJQUFJLENBQUM7WUFDZCxlQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLGNBQVEsR0FBRyxLQUFLLENBQUM7WUFDakIsY0FBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixpQkFBVyxHQUFHLEVBQUUsQ0FBQztZQUNqQixrQkFBWSxHQUFHLEVBQUUsQ0FBQztZQUNsQixjQUFRLEdBQUcsRUFBRSxDQUFDO1lBSWxCLFdBQUssR0FBRyxLQUFLLENBQUM7WUFDZCxhQUFPLEdBQUcsS0FBSyxDQUFDO1lBRWhCLFlBQU0sR0FBRyxLQUFLLENBQUM7WUFPZixZQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osWUFBTSxHQUFHLEtBQUssQ0FBQztZQXFHdkIsZ0JBQVUsR0FBRztnQkFDWCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsT0FBTztnQkFDUCxRQUFRO2dCQUNSLFdBQVc7Z0JBQ1gsV0FBVztnQkFFWCxnQkFBZ0I7Z0JBQ2hCLGtCQUFrQjtnQkFDbEIsbUJBQW1CO2dCQUNuQixpQkFBaUI7Z0JBQ2pCLGFBQWE7Z0JBRWIsWUFBWTtnQkFDWixjQUFjO2dCQUNkLGVBQWU7Z0JBQ2YsYUFBYTtnQkFFYixXQUFXO2dCQUNYLGFBQWE7Z0JBQ2IsWUFBWTtnQkFDWixhQUFhO2dCQUNiLFVBQVU7Z0JBQ1YsZ0JBQWdCO2dCQUNoQixZQUFZO2dCQUNaLFlBQVk7Z0JBRVosV0FBVztnQkFDWCxlQUFlO2dCQUNmLFlBQVk7Z0JBQ1os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RUMsT0FBTztXQUR4QixVQUFVLENBMlF0QjtRQUFELGlCQUFDO0tBM1FELEFBMlFDLENBM1ErQixzQkFBVyxHQTJRMUM7SUEzUVksZ0NBQVUiLCJmaWxlIjoiZWxlbWVudHMvaW5wdXRzL3VpLXRleHRhcmVhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuaW1wb3J0IHsgYXV0b2luamVjdCwgY3VzdG9tRWxlbWVudCwgYmluZGFibGUsIGJpbmRpbmdNb2RlLCBpbmxpbmVWaWV3IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgVUlCYXNlSW5wdXQgfSBmcm9tIFwiLi91aS1pbnB1dFwiO1xuaW1wb3J0IHsgVUlFdmVudCB9IGZyb20gXCIuLi8uLi91dGlscy91aS1ldmVudFwiO1xuaW1wb3J0IHsgVUlVdGlscyB9IGZyb20gXCIuLi8uLi91dGlscy91aS11dGlsc1wiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1pbnB1dC13cmFwcGVyXCI+PGRpdiByb2xlPVwiaW5wdXRcIiBjbGFzcz1cInVpLWlucHV0LWNvbnRyb2wgdWktdGV4dGFyZWFcIj48c3BhbiBjbGFzcz1cInVpLWVycm9yXCIgaWYuYmluZD1cImVycm9yc1wiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWludmFsaWRcIj48L3VpLWdseXBoPjx1bCBjbGFzcz1cInVpLWVycm9yLWxpc3RcIj48bGkgcmVwZWF0LmZvcj1cImVyciBvZiBlcnJvcnNcIiBpbm5lcmh0bWwuYmluZD1cImVyclwiPjwvbGk+PC91bD48L3NwYW4+XG4gIDx0ZXh0YXJlYSByZWY9XCJpbnB1dEVsXCIgdmFsdWUuYmluZD1cInZhbHVlXCIgcm93cy5iaW5kPVwicm93c1wiIG1heGxlbmd0aC5iaW5kPVwibWF4bGVuZ3RoXCIgZGlyLmJpbmQ9XCJkaXJcIlxuICAgIGZvY3VzLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGJsdXIudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCJcbiAgICBpbnB1dC50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIiBjaGFuZ2UudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCJcbiAgICBrZXl1cC50cmlnZ2VyPVwiY2hlY2tMaXN0KCRldmVudClcIiBrZXlkb3duLnRyaWdnZXI9XCJjaGVja0lucHV0KCRldmVudClcIiBwbGFjZWhvbGRlci5iaW5kPVwicGxhY2Vob2xkZXJcIlxuICAgIGRpc2FibGVkLmJpbmQ9XCJpc0Rpc2FibGVkXCIgcmVhZG9ubHkuYmluZD1cInJlYWRvbmx5XCI+PC90ZXh0YXJlYT5cbiAgPHVsIGNsYXNzPVwidWktbGlzdC1jb250YWluZXIgdWktZmxvYXRpbmdcIiByZWY9XCJkcm9wZG93blwiPjxsaSBjbGFzcz1cInVpLWxpc3QtaXRlbVwiIG1vdXNlb3Zlci50cmlnZ2VyPVwiaGlsaWdodEl0ZW0oJGV2ZW50KVwiIHJlcGVhdC5mb3I9XCJpdGVtIG9mIGFjTGlzdFwiIGlubmVyaHRtbC5iaW5kPVwiaXRlbVwiIGRhdGEtdmFsdWUuYmluZD1cIml0ZW1cIiBjbGljay50cmlnZ2VyPVwicmVwbGFjZShpdGVtKVwiPjwvbGk+PC91bD5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1jbGVhclwiIGlmLmJpbmQ9XCJjbGVhciAmJiB2YWx1ZVwiIGNsaWNrLnRyaWdnZXI9XCJjbGVhcklucHV0KClcIj4mdGltZXM7PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cInVpLWNvdW50ZXJcIiBpZi5iaW5kPVwiY291bnRlclwiIGlubmVyaHRtbC5iaW5kPVwidmFsdWUubGVuZ3RoICsgJyBvZiAnICsgbWF4bGVuZ3RoXCI+PC9zcGFuPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktaW5wdXQtaW5mb1wiIGlmLmJpbmQ9XCJoZWxwVGV4dFwiIGlubmVyaHRtbC5iaW5kPVwiaGVscFRleHRcIj48L2Rpdj5cbjwvdGVtcGxhdGU+YClcbkBjdXN0b21FbGVtZW50KCd1aS10ZXh0YXJlYScpXG5leHBvcnQgY2xhc3MgVUlUZXh0YXJlYSBleHRlbmRzIFVJQmFzZUlucHV0IHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuY2xlYXIgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY2xlYXInKTtcbiAgICB0aGlzLmNvdW50ZXIgPSBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY291bnRlcicpO1xuICB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICBzdXBlci5iaW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5hdXRvQ29tcGxldGVDaGFuZ2VkKHRoaXMuYXV0b0NvbXBsZXRlKTtcbiAgfVxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlciA9IFVJVXRpbHMudGV0aGVyKHRoaXMuZWxlbWVudCwgdGhpcy5kcm9wZG93biwgeyByZXNpemU6IGZhbHNlLCBwb3NpdGlvbjogJ3RsJyB9KTtcbiAgICB0aGlzLm9iTW91c2V1cCA9IFVJRXZlbnQuc3Vic2NyaWJlKCdtb3VzZWNsaWNrJywgKCkgPT4gdGhpcy5jbG9zZUF1dG9Db21wbGV0ZSgpKTtcbiAgfVxuICBkZXRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5vYk1vdXNldXAuZGlzcG9zZSgpO1xuICB9XG4gIC8vIHVuYmluZCgpIHsgfVxuICAvLyBlbmQgYXVyZWxpYSBob29rc1xuXG4gIEBiaW5kYWJsZSh7IGRlZmF1bHRCaW5kaW5nTW9kZTogYmluZGluZ01vZGUudHdvV2F5IH0pIHZhbHVlID0gJyc7XG5cbiAgQGJpbmRhYmxlKCkgZGlyID0gJyc7XG4gIEBiaW5kYWJsZSgpIHJvd3MgPSA1O1xuICBAYmluZGFibGUoKSBlcnJvcnMgPSBudWxsO1xuICBAYmluZGFibGUoKSBtYXhsZW5ndGggPSA1MDAwO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSByZWFkb25seSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBwbGFjZWhvbGRlciA9ICcnO1xuICBAYmluZGFibGUoKSBhdXRvQ29tcGxldGUgPSAnJztcbiAgQGJpbmRhYmxlKCkgaGVscFRleHQgPSAnJztcblxuICBAYmluZGFibGUoKSBiZWZvcmVSZXBsYWNlO1xuXG4gIHByaXZhdGUgY2xlYXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjb3VudGVyID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBpZ25vcmUgPSBmYWxzZTtcblxuICBwcml2YXRlIHRldGhlcjtcbiAgcHJpdmF0ZSBvYk1vdXNldXA7XG5cbiAgcHJpdmF0ZSBkcm9wZG93bjtcblxuICBwcml2YXRlIGFjTGlzdCA9IFtdO1xuICBwcml2YXRlIGFjU2hvdyA9IGZhbHNlO1xuXG4gIHZhbHVlQ2hhbmdlZChuZXdWYWx1ZSkgeyB9XG5cbiAgYXV0b0NvbXBsZXRlQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIGlmIChfLmlzU3RyaW5nKG5ld1ZhbHVlKSkgbmV3VmFsdWUgPSBuZXdWYWx1ZS5zcGxpdCgnLCcpO1xuICAgIHRoaXMuYXV0b0NvbXBsZXRlID0gbmV3VmFsdWUuc29ydCgpO1xuICB9XG5cbiAgaGlsaWdodEl0ZW0oZXZ0KSB7XG4gICAgbGV0IGggPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0udWktaGlsaWdodCcpO1xuICAgIGlmIChoICE9PSBudWxsKSBoLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWhpbGlnaHQnKTtcbiAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3VpLWhpbGlnaHQnKTtcbiAgfVxuXG4gIGNoZWNrTGlzdChldnQpIHtcbiAgICBpZiAoZXZ0LmN0cmxLZXkgfHwgZXZ0LmFsdEtleSB8fCBldnQubWV0YUtleSB8fCAoZXZ0LmtleUNvZGUgfHwgZXZ0LndoaWNoKSA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgbGV0IGNvZGUgPSAoZXZ0LmtleUNvZGUgfHwgZXZ0LndoaWNoKTtcblxuICAgIGxldCB0ZXh0ID0gdGhpcy5pbnB1dEVsLnZhbHVlLnN1YnN0cmluZygwLCB0aGlzLmlucHV0RWwuc2VsZWN0aW9uRW5kKTtcbiAgICBsZXQgcXVlcnkgPSB0ZXh0Lm1hdGNoKGV2YWwoYC9cXFxcYihbXFxcXGRcXFxcd1xcXFwtXXsxLH0pJC9gKSk7XG4gICAgaWYgKHF1ZXJ5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgcnggPSBuZXcgUmVnRXhwKGdldEFzY2lpKHF1ZXJ5WzFdKSwgJ2knKTtcbiAgICAgIHRoaXMuYWNMaXN0ID0gXy5maWx0ZXIodGhpcy5hdXRvQ29tcGxldGUsIHYgPT4ge1xuICAgICAgICBsZXQgYXNjID0gZ2V0QXNjaWkodik7XG4gICAgICAgIHJldHVybiByeC50ZXN0KGFzYyk7XG4gICAgICB9KTtcbiAgICAgIGlmICh0aGlzLmFjU2hvdyA9ICh0aGlzLmFjTGlzdC5sZW5ndGggPiAwKSkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRDYXJldENvb3JkaW5hdGVzKCk7XG4gICAgICAgIHRoaXMudGV0aGVyLnBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uc3R5bGUubWFyZ2luVG9wID0gcG9zLnRvcDtcbiAgICAgICAgdGhpcy5kcm9wZG93bi5zdHlsZS5tYXJnaW5MZWZ0ID0gcG9zLmxlZnQ7XG4gICAgICAgIHRoaXMuZHJvcGRvd24uY2xhc3NMaXN0LmFkZCgndWktb3BlbicpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNoZWNrSW5wdXQoZXZ0KSB7XG4gICAgaWYgKGV2dC5jdHJsS2V5IHx8IGV2dC5hbHRLZXkgfHwgZXZ0Lm1ldGFLZXkgfHwgKGV2dC5rZXlDb2RlIHx8IGV2dC53aGljaCkgPT09IDApIHJldHVybiB0cnVlO1xuICAgIGxldCBjb2RlID0gKGV2dC5rZXlDb2RlIHx8IGV2dC53aGljaCk7XG5cbiAgICBpZiAoY29kZSA9PSA5KSB0aGlzLmNsb3NlQXV0b0NvbXBsZXRlKCk7XG5cbiAgICBpZiAodGhpcy5hY1Nob3cpIHtcbiAgICAgIGlmIChjb2RlID09IDEzKSB7XG4gICAgICAgIGxldCBoID0gdGhpcy5kcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcudWktbGlzdC1pdGVtLnVpLWhpbGlnaHQnKTtcbiAgICAgICAgaWYgKGggIT09IG51bGwpIHRoaXMucmVwbGFjZShoLmRhdGFzZXQudmFsdWUpO1xuICAgICAgICB0aGlzLmFjU2hvdyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2RlID09PSAzOCkge1xuICAgICAgICBsZXQgcHJldjtcbiAgICAgICAgbGV0IGggPSBwcmV2ID0gdGhpcy5kcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcudWktbGlzdC1pdGVtLnVpLWhpbGlnaHQnKTtcbiAgICAgICAgLy8gaWYgZm91bmQgaGlsaWdodCBvciBzZWxlY3RlZCBnZXQgcHJldmlvdXNcbiAgICAgICAgaWYgKGggIT09IG51bGwpIGggPSA8SFRNTEVsZW1lbnQ+aC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAvLyBpZiBubyBoaWxpZ2h0IGdldCBmaXJzdFxuICAgICAgICBpZiAoaCA9PT0gbnVsbCkgaCA9IHRoaXMuZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnVpLWxpc3QtaXRlbScpO1xuICAgICAgICBpZiAoaCAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKHByZXYgIT0gbnVsbCkgcHJldi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1oaWxpZ2h0Jyk7XG4gICAgICAgICAgaC5jbGFzc0xpc3QuYWRkKCd1aS1oaWxpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNvZGUgPT09IDQwKSB7XG4gICAgICAgIGxldCBwcmV2O1xuICAgICAgICBsZXQgaCA9IHByZXYgPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0udWktaGlsaWdodCcpO1xuICAgICAgICAvLyBpZiBmb3VuZCBoaWxpZ2h0IG9yIHNlbGVjdGVkIGdldCBwcmV2aW91c1xuICAgICAgICBpZiAoaCAhPT0gbnVsbCkgaCA9IDxIVE1MRWxlbWVudD5oLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgLy8gaWYgbm8gaGlsaWdodCBnZXQgZmlyc3RcbiAgICAgICAgaWYgKGggPT09IG51bGwpIGggPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0nKTtcbiAgICAgICAgaWYgKGggIT0gbnVsbCkge1xuICAgICAgICAgIGlmIChwcmV2ICE9IG51bGwpIHByZXYuY2xhc3NMaXN0LnJlbW92ZSgndWktaGlsaWdodCcpO1xuICAgICAgICAgIGguY2xhc3NMaXN0LmFkZCgndWktaGlsaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVwbGFjZShzZWxlY3RlZCkge1xuICAgIGlmICghKGlzRnVuY3Rpb24odGhpcy5iZWZvcmVSZXBsYWNlKSAmJiAoc2VsZWN0ZWQgPSB0aGlzLmJlZm9yZVJlcGxhY2Uoc2VsZWN0ZWQpKSAhPT0gZmFsc2UpKSB7XG4gICAgICB2YXIgcHJlID0gdGhpcy5pbnB1dEVsLnZhbHVlLnN1YnN0cmluZygwLCB0aGlzLmlucHV0RWwuc2VsZWN0aW9uRW5kKTtcbiAgICAgIHZhciBwb3N0ID0gdGhpcy5pbnB1dEVsLnZhbHVlLnN1YnN0cmluZyh0aGlzLmlucHV0RWwuc2VsZWN0aW9uRW5kKTtcbiAgICAgIHByZSA9IHByZS5yZXBsYWNlKGV2YWwoYC9cXFxcYihbXFxcXGRcXFxcd1xcXFwtXXsxLH0pJC9gKSwgc2VsZWN0ZWQgKyAnICcpO1xuICAgICAgdGhpcy52YWx1ZSA9IChwcmUgKyBwb3N0KTsvLy5yZXBsYWNlKC9cXHN7Mix9L2csICcgJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaW5wdXRFbC5zZXRTZWxlY3Rpb25SYW5nZShwcmUubGVuZ3RoLCBwcmUubGVuZ3RoKSwgMTAwKTtcbiAgICB9XG4gICAgdGhpcy5jbG9zZUF1dG9Db21wbGV0ZSgpO1xuICB9XG5cbiAgY2xvc2VBdXRvQ29tcGxldGUoKSB7XG4gICAgdGhpcy5hY1Nob3cgPSBmYWxzZTtcbiAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgfVxuXG4gIC8vIENvbXB1dGUgYXV0b0NvbXBsZXRlXG4gIHByb3BlcnRpZXMgPSBbXG4gICAgJ2RpcmVjdGlvbicsIC8vIFJUTCBzdXBwb3J0XG4gICAgJ2JveFNpemluZycsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0JyxcbiAgICAnb3ZlcmZsb3dYJyxcbiAgICAnb3ZlcmZsb3dZJyxcblxuICAgICdib3JkZXJUb3BXaWR0aCcsXG4gICAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAgICdib3JkZXJCb3R0b21XaWR0aCcsXG4gICAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICAgJ2JvcmRlclN0eWxlJyxcblxuICAgICdwYWRkaW5nVG9wJyxcbiAgICAncGFkZGluZ1JpZ2h0JyxcbiAgICAncGFkZGluZ0JvdHRvbScsXG4gICAgJ3BhZGRpbmdMZWZ0JyxcblxuICAgICdmb250U3R5bGUnLFxuICAgICdmb250VmFyaWFudCcsXG4gICAgJ2ZvbnRXZWlnaHQnLFxuICAgICdmb250U3RyZXRjaCcsXG4gICAgJ2ZvbnRTaXplJyxcbiAgICAnZm9udFNpemVBZGp1c3QnLFxuICAgICdsaW5lSGVpZ2h0JyxcbiAgICAnZm9udEZhbWlseScsXG5cbiAgICAndGV4dEFsaWduJyxcbiAgICAndGV4dFRyYW5zZm9ybScsXG4gICAgJ3RleHRJbmRlbnQnLFxuICAgICd0ZXh0RGVjb3JhdGlvbicsXG5cbiAgICAnbGV0dGVyU3BhY2luZycsXG4gICAgJ3dvcmRTcGFjaW5nJyxcblxuICAgICd0YWJTaXplJyxcbiAgICAnTW96VGFiU2l6ZSdcblxuICBdO1xuXG4gIGlzQnJvd3NlciA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyk7XG4gIGlzRmlyZWZveCA9ICh0aGlzLmlzQnJvd3NlciAmJiB3aW5kb3dbJ21veklubmVyU2NyZWVuWCddICE9IG51bGwpO1xuXG4gIGdldENhcmV0Q29vcmRpbmF0ZXMoKSB7XG4gICAgbGV0IGVsZW1lbnQ6IGFueSA9IHRoaXMuaW5wdXRFbDtcbiAgICBsZXQgcG9zaXRpb24gPSB0aGlzLmlucHV0RWwuc2VsZWN0aW9uU3RhcnQ7XG4gICAgaWYgKCF0aGlzLmlzQnJvd3Nlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0ZXh0YXJlYS1jYXJldC1wb3NpdGlvbiNnZXRDYXJldENvb3JkaW5hdGVzIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBpbiBhIGJyb3dzZXInKTtcbiAgICB9XG5cbiAgICB2YXIgZGVidWcgPSBmYWxzZTtcbiAgICBpZiAoZGVidWcpIHtcbiAgICAgIHZhciBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2Jyk7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbWlycm9yZWQgZGl2XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pZCA9ICdpbnB1dC10ZXh0YXJlYS1jYXJldC1wb3NpdGlvbi1taXJyb3ItZGl2JztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICB2YXIgc3R5bGUgPSBkaXYuc3R5bGU7XG4gICAgdmFyIGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUgPyBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIDogZWxlbWVudC5jdXJyZW50U3R5bGU7IC8vIGN1cnJlbnRTdHlsZSBmb3IgSUUgPCA5XG5cbiAgICAvLyBkZWZhdWx0IHRleHRhcmVhIHN0eWxlc1xuICAgIHN0eWxlLndoaXRlU3BhY2UgPSAncHJlLXdyYXAnO1xuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSAnSU5QVVQnKVxuICAgICAgc3R5bGUud29yZFdyYXAgPSAnYnJlYWstd29yZCc7IC8vIG9ubHkgZm9yIHRleHRhcmVhLXNcblxuICAgIC8vIHBvc2l0aW9uIG9mZi1zY3JlZW5cbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7IC8vIHJlcXVpcmVkIHRvIHJldHVybiBjb29yZGluYXRlcyBwcm9wZXJseVxuICAgIGlmICghZGVidWcpXG4gICAgICBzdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7IC8vIG5vdCAnZGlzcGxheTogbm9uZScgYmVjYXVzZSB3ZSB3YW50IHJlbmRlcmluZ1xuXG4gICAgLy8gdHJhbnNmZXIgdGhlIGVsZW1lbnQncyBwcm9wZXJ0aWVzIHRvIHRoZSBkaXZcbiAgICBfLmZvckVhY2godGhpcy5wcm9wZXJ0aWVzLCBwcm9wID0+IHtcbiAgICAgIHN0eWxlW3Byb3BdID0gY29tcHV0ZWRbcHJvcF07XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5pc0ZpcmVmb3gpIHtcbiAgICAgIC8vIEZpcmVmb3ggbGllcyBhYm91dCB0aGUgb3ZlcmZsb3cgcHJvcGVydHkgZm9yIHRleHRhcmVhczogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTg0Mjc1XG4gICAgICBpZiAoZWxlbWVudC5zY3JvbGxIZWlnaHQgPiBwYXJzZUludChjb21wdXRlZC5oZWlnaHQpKVxuICAgICAgICBzdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJzsgLy8gZm9yIENocm9tZSB0byBub3QgcmVuZGVyIGEgc2Nyb2xsYmFyOyBJRSBrZWVwcyBvdmVyZmxvd1kgPSAnc2Nyb2xsJ1xuICAgIH1cblxuICAgIGRpdi50ZXh0Q29udGVudCA9IGVsZW1lbnQudmFsdWUuc3Vic3RyaW5nKDAsIHBvc2l0aW9uKTtcbiAgICAvLyB0aGUgc2Vjb25kIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGlucHV0IHR5cGU9XCJ0ZXh0XCIgdnMgdGV4dGFyZWE6IHNwYWNlcyBuZWVkIHRvIGJlIHJlcGxhY2VkIHdpdGggbm9uLWJyZWFraW5nIHNwYWNlcyAtIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEzNDAyMDM1LzEyNjkwMzdcbiAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJylcbiAgICAgIGRpdi50ZXh0Q29udGVudCA9IGRpdi50ZXh0Q29udGVudC5yZXBsYWNlKC9cXHMvZywgJ1xcdTAwYTAnKTtcblxuICAgIHZhciBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIC8vIFdyYXBwaW5nIG11c3QgYmUgcmVwbGljYXRlZCAqZXhhY3RseSosIGluY2x1ZGluZyB3aGVuIGEgbG9uZyB3b3JkIGdldHNcbiAgICAvLyBvbnRvIHRoZSBuZXh0IGxpbmUsIHdpdGggd2hpdGVzcGFjZSBhdCB0aGUgZW5kIG9mIHRoZSBsaW5lIGJlZm9yZSAoIzcpLlxuICAgIC8vIFRoZSAgKm9ubHkqIHJlbGlhYmxlIHdheSB0byBkbyB0aGF0IGlzIHRvIGNvcHkgdGhlICplbnRpcmUqIHJlc3Qgb2YgdGhlXG4gICAgLy8gdGV4dGFyZWEncyBjb250ZW50IGludG8gdGhlIDxzcGFuPiBjcmVhdGVkIGF0IHRoZSBjYXJldCBwb3NpdGlvbi5cbiAgICAvLyBmb3IgaW5wdXRzLCBqdXN0ICcuJyB3b3VsZCBiZSBlbm91Z2gsIGJ1dCB3aHkgYm90aGVyP1xuICAgIHNwYW4udGV4dENvbnRlbnQgPSBlbGVtZW50LnZhbHVlLnN1YnN0cmluZyhwb3NpdGlvbikgfHwgJy4nOyAvLyB8fCBiZWNhdXNlIGEgY29tcGxldGVseSBlbXB0eSBmYXV4IHNwYW4gZG9lc24ndCByZW5kZXIgYXQgYWxsXG4gICAgZGl2LmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgdmFyIGNvb3JkaW5hdGVzID0ge1xuICAgICAgdG9wOiAoc3Bhbi5vZmZzZXRUb3AgKyBwYXJzZUludChjb21wdXRlZFsnYm9yZGVyVG9wV2lkdGgnXSkgKyAyMCAtIGVsZW1lbnQuc2Nyb2xsVG9wKSArICdweCcsXG4gICAgICBsZWZ0OiAoc3Bhbi5vZmZzZXRMZWZ0ICsgcGFyc2VJbnQoY29tcHV0ZWRbJ2JvcmRlckxlZnRXaWR0aCddKSkgKyAncHgnXG4gICAgfTtcblxuICAgIGlmIChkZWJ1Zykge1xuICAgICAgc3Bhbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2FhYSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
