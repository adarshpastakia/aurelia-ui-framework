//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {autoinject, bindable, containerless, customElement, inlineView} from "aurelia-framework";

@customElement('ui-filler')
@inlineView('<template class="ui-col-fill"></template>')
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
    if (element.hasAttribute('top')) element.classList.add('ui-row-top');
    if (element.hasAttribute('middle')) element.classList.add('ui-row-middle');
    if (element.hasAttribute('bottom')) element.classList.add('ui-row-bottom');
    if (element.hasAttribute('stretch')) element.classList.add('ui-row-stretch');

    if (element.hasAttribute('start')) element.classList.add('ui-row-start');
    if (element.hasAttribute('center')) element.classList.add('ui-row-center');
    if (element.hasAttribute('end')) element.classList.add('ui-row-end');
    if (element.hasAttribute('spaced')) element.classList.add('ui-row-spaced');

    if (element.hasAttribute('reverse')) element.classList.add('ui-row-reverse');
  }
}

@autoinject()
@customElement('ui-row-column')
@inlineView('<template class="ui-row-vertical"><slot></slot></template>')
export class UIColumnRow {
  constructor(public element: Element) {
    if (element.hasAttribute('top')) element.classList.add('ui-row-start');
    if (element.hasAttribute('middle')) element.classList.add('ui-row-center');
    if (element.hasAttribute('bottom')) element.classList.add('ui-row-end');
    if (element.hasAttribute('stretch')) element.classList.add('ui-row-stretch');

    if (element.hasAttribute('start')) element.classList.add('ui-row-top');
    if (element.hasAttribute('center')) element.classList.add('ui-row-middle');
    if (element.hasAttribute('end')) element.classList.add('ui-row-bottom');
    if (element.hasAttribute('spaced')) element.classList.add('ui-row-spaced');

    if (element.hasAttribute('reverse')) element.classList.add('ui-row-reverse');
  }
}

@autoinject()
@customElement('ui-column')
@inlineView('<template class="ui-column"><slot></slot></template>')
export class UIColumn {
  constructor(public element: Element) {
    if (element.hasAttribute('top')) element.classList.add('ui-col-top');
    if (element.hasAttribute('middle')) element.classList.add('ui-col-middle');
    if (element.hasAttribute('bottom')) element.classList.add('ui-col-bottom');
    if (element.hasAttribute('stretch')) element.classList.add('ui-col-stretch');

    if (element.hasAttribute('auto')) element.classList.add('ui-col-auto');
    if (element.hasAttribute('fill')) element.classList.add('ui-col-fill');
    if (element.hasAttribute('full')) element.classList.add('ui-col-full');
    if (element.hasAttribute('form')) element.classList.add('ui-col-form');

    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
  }
  bind() {
    for (var size of this.size.split(' ')) {
      this.element.classList.add(`ui-col-${size}`);
    }
    if (this.width) this.element['style'].flexBasis = this.width;
  }

  @bindable() size = '';
  @bindable() width = '';
}
