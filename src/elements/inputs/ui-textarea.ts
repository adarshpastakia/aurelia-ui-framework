//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, bindingMode, inlineView } from 'aurelia-framework';
import { UIBaseInput } from "./ui-input";
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@autoinject()
@inlineView(`<template class="ui-input-wrapper"><div role="input" class="ui-input-control ui-textarea" dir.bind="dir"><span class="ui-error" if.bind="errors"><ui-glyph glyph="glyph-invalid"></ui-glyph><ul class="ui-error-list"><li repeat.for="err of errors" innerhtml.bind="err"></li></ul></span>
  <textarea ref="inputEl" value.bind="value" rows.bind="rows" maxlength.bind="maxlength" dir.bind="dir"
    focus.trigger="fireEvent($event)" blur.trigger="fireEvent($event)"
    input.trigger="fireEvent($event)" change.trigger="fireEvent($event)"
    keyup.trigger="checkList($event)" keydown.trigger="checkInput($event)" placeholder.bind="placeholder"
    disabled.bind="isDisabled" readonly.bind="readonly"></textarea>
  <ul class="ui-list-container ui-floating" ref="dropdown"><li class="ui-list-item" mouseover.trigger="hilightItem($event)" repeat.for="item of acList" innerhtml.bind="item" data-value.bind="item" click.trigger="replace(item)"></li></ul>
  <span class="ui-clear" if.bind="clear && value" click.trigger="clearInput()">&times;</span>
  <span class="ui-counter" if.bind="counter" innerhtml.bind="value.length + ' of ' + maxlength"></span></div>
  <div class="ui-input-info" if.bind="helpText" innerhtml.bind="helpText"></div>
</template>`)
@customElement('ui-textarea')
export class UITextarea extends UIBaseInput {
  constructor(public element: Element) {
    super();
    this.clear = element.hasAttribute('clear');
    this.counter = element.hasAttribute('counter');
  }

  bind(bindingContext: Object, overrideContext: Object) {
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

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';

  @bindable() dir = '';
  @bindable() rows = 5;
  @bindable() errors = null;
  @bindable() maxlength = 5000;
  @bindable() disabled = false;
  @bindable() readonly = false;
  @bindable() placeholder = '';
  @bindable() autoComplete = '';
  @bindable() helpText = '';

  @bindable() beforeReplace;

  private clear = false;
  private counter = false;

  private ignore = false;

  private tether;
  private obMouseup;

  private dropdown;

  private acList = [];
  private acShow = false;

  valueChanged(newValue) { }

  autoCompleteChanged(newValue) {
    if (_.isString(newValue)) newValue = newValue.split(',');
    this.autoComplete = newValue.sort();
  }

  hilightItem(evt) {
    let h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
    if (h !== null) h.classList.remove('ui-hilight');
    evt.target.classList.add('ui-hilight');
  }

  checkList(evt) {
    if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0) return true;
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
    if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0) return true;
    let code = (evt.keyCode || evt.which);

    if (code == 9) this.closeAutoComplete();

    if (this.acShow) {
      if (code == 13) {
        let h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
        if (h !== null) this.replace(h.dataset.value);
        this.acShow = false;
        return false;
      }

      if (code === 38) {
        let prev;
        let h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
        // if found hilight or selected get previous
        if (h !== null) h = <HTMLElement>h.previousElementSibling;
        // if no hilight get first
        if (h === null) h = this.dropdown.querySelector('.ui-list-item');
        if (h != null) {
          if (prev != null) prev.classList.remove('ui-hilight');
          h.classList.add('ui-hilight');
        }
        evt.preventDefault();
        return false;
      }
      else if (code === 40) {
        let prev;
        let h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
        // if found hilight or selected get previous
        if (h !== null) h = <HTMLElement>h.nextElementSibling;
        // if no hilight get first
        if (h === null) h = this.dropdown.querySelector('.ui-list-item');
        if (h != null) {
          if (prev != null) prev.classList.remove('ui-hilight');
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
      this.value = (pre + post);//.replace(/\s{2,}/g, ' ');
      setTimeout(() => this.inputEl.setSelectionRange(pre.length, pre.length), 100);
    }
    this.closeAutoComplete();
  }

  closeAutoComplete() {
    this.acShow = false;
    this.dropdown.classList.remove('ui-open');
  }

  // Compute autoComplete
  properties = [
    'direction', // RTL support
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

  isBrowser = (typeof window !== 'undefined');
  isFirefox = (this.isBrowser && window['mozInnerScreenX'] != null);

  getCaretCoordinates() {
    let element: any = this.inputEl;
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

    // mirrored div
    var div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);

    var style = div.style;
    var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle; // currentStyle for IE < 9

    // default textarea styles
    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT')
      style.wordWrap = 'break-word'; // only for textarea-s

    // position off-screen
    style.position = 'absolute'; // required to return coordinates properly
    if (!debug)
      style.visibility = 'hidden'; // not 'display: none' because we want rendering

    // transfer the element's properties to the div
    _.forEach(this.properties, prop => {
      style[prop] = computed[prop];
    });

    if (this.isFirefox) {
      // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
      if (element.scrollHeight > parseInt(computed.height))
        style.overflowY = 'scroll';
    } else {
      style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
    }

    div.textContent = element.value.substring(0, position);
    // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
    if (element.nodeName === 'INPUT')
      div.textContent = div.textContent.replace(/\s/g, '\u00a0');

    var span = document.createElement('span');
    // Wrapping must be replicated *exactly*, including when a long word gets
    // onto the next line, with whitespace at the end of the line before (#7).
    // The  *only* reliable way to do that is to copy the *entire* rest of the
    // textarea's content into the <span> created at the caret position.
    // for inputs, just '.' would be enough, but why bother?
    span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
    div.appendChild(span);

    var coordinates = {
      top: (span.offsetTop + parseInt(computed['borderTopWidth']) + 20 - element.scrollTop) + 'px',
      left: (span.offsetLeft + parseInt(computed['borderLeftWidth'])) + 'px'
    };

    if (debug) {
      span.style.backgroundColor = '#aaa';
    } else {
      document.body.removeChild(div);
    }

    return coordinates;
  }
}
