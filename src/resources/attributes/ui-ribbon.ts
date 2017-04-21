//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject, customAttribute, bindable} from 'aurelia-framework';
import {UIEvent} from "../utils/ui-event";
import {UIUtils} from "../utils/ui-utils";

@autoinject()
@customAttribute('ribbon')
export class UIRibbon {

  ribbon;
  constructor(public element: Element) {
    this.ribbon = document.createElement('div');
    this.ribbon.classList.add('ui-ribbon');
    element.appendChild(this.ribbon);

    element['style'].overflow = 'hidden';
    element['style'].position = 'relative';
  }

  // aurelia hooks
  // created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.ribbon.innerHTML = this.message;
    this.ribbon.className = 'ui-ribbon ' + this.theme;
  }
  // attached() { }
  // detached() { }
  // unbind() { }
  // end aurelia hooks
  //
  @bindable({ primaryProperty: true }) message = '';
  @bindable() theme = 'dark';

  themeChanged(newValue) {
    this.ribbon.className = 'ui-ribbon ' + newValue;
  }
  messageChanged(newValue) {
    this.ribbon.innerHTML = newValue;
  }
}
