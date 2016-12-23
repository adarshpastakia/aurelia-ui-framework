// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';

@autoinject()
export class CompDatagrid {
  constructor(public element: Element) { }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  data = [
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 1 },
    { text: 'Hello World', date: '2016-12-25', number: 1248, currency: 1248.49, true: 0 }
  ]

  clicked() {
    console.log('clicked');
    return true;
  }
}