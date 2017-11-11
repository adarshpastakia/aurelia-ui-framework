//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import { autoinject, bindable, customElement, inlineView } from "aurelia-framework";

@customElement('ui-filler')
@inlineView('<template class="ui-column-fill"></template>')
export class UIFiller { }

@customElement('ui-container')
@inlineView('<template class="ui-container"><slot></slot></template>')
export class UIContainer {
  constructor(public element: Element) {
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
  }
}

@autoinject()
@customElement('ui-row')
@inlineView('<template class="ui-row"><slot></slot></template>')
export class UIRow {
  constructor(public element: Element) {
    if (element.hasAttribute('top')) element.classList.add('ui-align-start');
    if (element.hasAttribute('middle')) element.classList.add('ui-align-center');
    if (element.hasAttribute('bottom')) element.classList.add('ui-align-end');
    if (element.hasAttribute('stretch')) element.classList.add('ui-align-stretch');

    if (element.hasAttribute('start')) element.classList.add('ui-justify-start');
    if (element.hasAttribute('center')) element.classList.add('ui-justify-center');
    if (element.hasAttribute('end')) element.classList.add('ui-justify-end');
    if (element.hasAttribute('between')) element.classList.add('ui-justify-betweeen');
    if (element.hasAttribute('around')) element.classList.add('ui-justify-around');

    if (!element.hasAttribute('nogutter')) element.classList.add('ui-gutter');
    if (element.hasAttribute('nowrap')) element.classList.add('ui-nowrap');

    if (element.hasAttribute('vertical') && element.hasAttribute('reverse')) element.classList.add('ui-row-v-reverse');
    else if (element.hasAttribute('verical')) element.classList.add('ui-row-v');
    else if (element.hasAttribute('reverse')) element.classList.add('ui-row-h-reverse');
    else element.classList.add('ui-row-h');
  }
}

@autoinject()
@customElement('ui-column')
@inlineView('<template class="ui-column"><slot></slot></template>')
export class UIColumn {
  constructor(public element: Element) {
    if (element.hasAttribute('top')) element.classList.add('ui-align-top');
    if (element.hasAttribute('middle')) element.classList.add('ui-align-middle');
    if (element.hasAttribute('bottom')) element.classList.add('ui-align-bottom');
    if (element.hasAttribute('stretch')) element.classList.add('ui-align-stretch');

    if (element.hasAttribute('auto')) element.classList.add('ui-column-auto');
    if (element.hasAttribute('fill')) element.classList.add('ui-column-fill');
    if (element.hasAttribute('full')) element.classList.add('ui-column-full');
    if (element.hasAttribute('form')) element.classList.add('ui-column-form');
  }
  bind() {
    if (this.size.length) {
      for (var size of this.size.split(' ')) {
        this.element.classList.add(`ui-column-${size}`);
      }
    }
    if (this.width) this.element['style'].flexBasis = this.width;
  }

  @bindable() size = '';
  @bindable() width = '';
}
