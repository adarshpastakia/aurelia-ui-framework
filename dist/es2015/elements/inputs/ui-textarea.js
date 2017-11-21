var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { UIBaseInput } from "./ui-input";
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";
let UITextarea = class UITextarea extends UIBaseInput {
    constructor(element) {
        super();
        this.element = element;
        this.value = '';
        this.dir = '';
        this.rows = 5;
        this.errors = null;
        this.maxlength = 5000;
        this.disabled = false;
        this.readonly = false;
        this.placeholder = '';
        this.autoComplete = '';
        this.helpText = '';
        this.clear = false;
        this.counter = false;
        this.ignore = false;
        this.acList = [];
        this.acShow = false;
        this.properties = [
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
        this.isBrowser = (typeof window !== 'undefined');
        this.isFirefox = (this.isBrowser && window['mozInnerScreenX'] != null);
        this.clear = element.hasAttribute('clear');
        this.counter = element.hasAttribute('counter');
    }
    bind(bindingContext, overrideContext) {
        super.bind.apply(this, arguments);
        this.autoCompleteChanged(this.autoComplete);
    }
    attached() {
        this.tether = UIUtils.tether(this.element, this.dropdown, { resize: false, position: 'tl' });
        this.obMouseup = UIEvent.subscribe('mouseclick', () => this.closeAutoComplete());
    }
    detached() {
        this.tether.dispose();
        this.obMouseup.dispose();
    }
    valueChanged(newValue) { }
    autoCompleteChanged(newValue) {
        if (_.isString(newValue))
            newValue = newValue.split(',');
        this.autoComplete = newValue.sort();
    }
    hilightItem(evt) {
        let h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
        if (h !== null)
            h.classList.remove('ui-hilight');
        evt.target.classList.add('ui-hilight');
    }
    checkList(evt) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
            return true;
        let code = (evt.keyCode || evt.which);
        let text = this.inputEl.value.substring(0, this.inputEl.selectionEnd);
        let query = text.match(eval(`/\\b([\\d\\w\\-]{1,})$/`));
        if (query !== null) {
            var rx = new RegExp(query[1].ascii(), 'i');
            this.acList = _.filter(this.autoComplete, v => {
                let asc = v.ascii();
                return rx.test(asc);
            });
            if (this.acShow = (this.acList.length > 0)) {
                let pos = this.getCaretCoordinates();
                this.tether.position();
                this.dropdown.style.marginTop = pos.top;
                this.dropdown.style.marginLeft = pos.left;
                this.dropdown.classList.add('ui-open');
            }
        }
        return true;
    }
    checkInput(evt) {
        if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
            return true;
        let code = (evt.keyCode || evt.which);
        if (code == 9)
            this.closeAutoComplete();
        if (this.acShow) {
            if (code == 13) {
                let h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
                if (h !== null)
                    this.replace(h.dataset.value);
                this.acShow = false;
                return false;
            }
            if (code === 38) {
                let prev;
                let h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
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
                let prev;
                let h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
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
    }
    replace(selected) {
        if (!(isFunction(this.beforeReplace) && (selected = this.beforeReplace(selected)) !== false)) {
            var pre = this.inputEl.value.substring(0, this.inputEl.selectionEnd);
            var post = this.inputEl.value.substring(this.inputEl.selectionEnd);
            pre = pre.replace(eval(`/\\b([\\d\\w\\-]{1,})$/`), selected + ' ');
            this.value = (pre + post);
            setTimeout(() => this.inputEl.setSelectionRange(pre.length, pre.length), 100);
        }
        this.closeAutoComplete();
    }
    closeAutoComplete() {
        this.acShow = false;
        this.dropdown.classList.remove('ui-open');
    }
    getCaretCoordinates() {
        let element = this.inputEl;
        let position = this.inputEl.selectionStart;
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
        _.forEach(this.properties, prop => {
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
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UITextarea.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "dir", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "rows", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "maxlength", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "readonly", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "placeholder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "autoComplete", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "helpText", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITextarea.prototype, "beforeReplace", void 0);
UITextarea = __decorate([
    autoinject(),
    inlineView(`<template class="ui-input-wrapper"><div role="input" class="ui-input-control ui-textarea" dir.bind="dir"><span class="ui-error" if.bind="errors"><ui-glyph glyph="glyph-invalid"></ui-glyph><ul class="ui-error-list"><li repeat.for="err of errors" innerhtml.bind="err"></li></ul></span>
  <textarea ref="inputEl" value.bind="value" rows.bind="rows" maxlength.bind="maxlength" dir.bind="dir"
    focus.trigger="fireEvent($event)" blur.trigger="fireEvent($event)"
    input.trigger="fireEvent($event)" change.trigger="fireEvent($event)"
    keyup.trigger="checkList($event)" keydown.trigger="checkInput($event)" placeholder.bind="placeholder"
    disabled.bind="isDisabled" readonly.bind="readonly"></textarea>
  <ul class="ui-list-container ui-floating" ref="dropdown"><li class="ui-list-item" mouseover.trigger="hilightItem($event)" repeat.for="item of acList" innerhtml.bind="item" data-value.bind="item" click.trigger="replace(item)"></li></ul>
  <span class="ui-clear" if.bind="clear && value" click.trigger="clearInput()">&times;</span>
  <span class="ui-counter" if.bind="counter" innerhtml.bind="value.length + ' of ' + maxlength"></span></div>
  <div class="ui-input-info" if.bind="helpText" innerhtml.bind="helpText"></div>
</template>`),
    customElement('ui-textarea'),
    __metadata("design:paramtypes", [Element])
], UITextarea);
export { UITextarea };
