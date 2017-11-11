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
    else if (element.hasAttribute('middle')) element.classList.add('ui-align-center');
    else if (element.hasAttribute('bottom')) element.classList.add('ui-align-end');
    else if (element.hasAttribute('stretch')) element.classList.add('ui-align-stretch');

    if (element.hasAttribute('start')) element.classList.add('ui-justify-start');
    else if (element.hasAttribute('center')) element.classList.add('ui-justify-center');
    else if (element.hasAttribute('end')) element.classList.add('ui-justify-end');
    else if (element.hasAttribute('between')) element.classList.add('ui-justify-betweeen');
    else if (element.hasAttribute('around')) element.classList.add('ui-justify-around');

    if (!element.hasAttribute('nogutter')) element.classList.add('ui-gutter');
    if (element.hasAttribute('nowrap')) element.classList.add('ui-nowrap');

    if (element.hasAttribute('vertical-reverse')) element.classList.add('ui-row-v-reverse');
    else if (element.hasAttribute('vertical')) element.classList.add('ui-row-v');
    else if (element.hasAttribute('reverse')) element.classList.add('ui-row-h-reverse');
    else element.classList.add('ui-row-h');
  }
}

@autoinject()
@customElement('ui-column')
@inlineView('<template class="ui-column"><slot></slot></template>')
export class UIColumn {
  constructor(public element: Element) {
    if (element.hasAttribute('top')) element.classList.add('ui-self-top');
    else if (element.hasAttribute('middle')) element.classList.add('ui-self-middle');
    else if (element.hasAttribute('bottom')) element.classList.add('ui-self-bottom');
    else if (element.hasAttribute('stretch')) element.classList.add('ui-self-stretch');

    if (element.hasAttribute('auto')) element.classList.add('ui-column-auto');
    else if (element.hasAttribute('fill')) element.classList.add('ui-column-fill');
    else if (element.hasAttribute('full')) element.classList.add('ui-column-full');
    else if (element.hasAttribute('form')) element.classList.add('ui-column-form');
  }
  bind() {
    if (this.size.length) {
      for (var size of this.size.split(' ')) {
        this.element.classList.add(`ui-column-${size}`);
      }
    }
    if (this.width) this.element['style'].flexBasis = this.width;

    if (this.row.length) {
      for (var row of this.row.split(' ')) {
        this.element.classList.add(`ui-row`);
        if (row === 'top') this.element.classList.add('ui-align-start');
        else if (row === 'middle') this.element.classList.add('ui-align-center');
        else if (row === 'bottom') this.element.classList.add('ui-align-end');
        else if (row === 'stretch') this.element.classList.add('ui-align-stretch');

        if (row === 'start') this.element.classList.add('ui-justify-start');
        else if (row === 'center') this.element.classList.add('ui-justify-center');
        else if (row === 'end') this.element.classList.add('ui-justify-end');
        else if (row === 'between') this.element.classList.add('ui-justify-betweeen');
        else if (row === 'around') this.element.classList.add('ui-justify-around');

        if (row !== 'nogutter') this.element.classList.add('ui-gutter');
        if (row === 'nowrap') this.element.classList.add('ui-nowrap');

        if (row === 'vertical-reverse') this.element.classList.add('ui-row-v-reverse');
        else if (row === 'vertical') this.element.classList.add('ui-row-v');
        else if (row === 'reverse') this.element.classList.add('ui-row-h-reverse');
        else if (row === 'row') this.element.classList.add('ui-row-h');
      }
    }
  }

  @bindable() size = '';
  @bindable() width = '';

  @bindable() row = '';
}
