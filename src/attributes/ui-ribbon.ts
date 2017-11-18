//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject, customAttribute, bindable } from 'aurelia-framework';
import { UIEvent } from "../utils/ui-event";
import { UIUtils } from "../utils/ui-utils";

@autoinject()
@customAttribute('ribbon')
export class UIRibbon {

  ribbon;
  constructor(public element: Element) {
    this.ribbon = document.createElement('div');
    this.ribbon.classList.add('ui-ribbon');
    element.appendChild(this.ribbon);

    element['style'].overflow = 'hidden';
  }

  bind(bindingContext: Object, overrideContext: Object) {
    if (isEmpty(this.message)) this.ribbon.classList.add('ui-hidden');
    this.ribbon.innerHTML = this.message;
    this.ribbon.className = 'ui-ribbon ui-' + this.theme;
  }

  @bindable({ primaryProperty: true }) message = '';
  @bindable() theme = 'dark';

  themeChanged(newValue) {
    this.ribbon.className = 'ui-ribbon ' + newValue;
  }
  messageChanged(newValue) {
    if (isEmpty(newValue)) return this.ribbon.classList.add('ui-hidden');
    this.ribbon.classList.remove('ui-hidden');
    this.ribbon.innerHTML = newValue;
  }
}
