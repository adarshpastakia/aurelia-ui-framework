//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

@autoinject()
export class InputView {
  constructor() { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      {
        route: 'buttons',
        moduleId: './buttons',
        title: 'Buttons',
        nav: true,
        auth: false,
        name: 'buttons'
      }, {
        route: 'basic',
        moduleId: './basic',
        title: 'Text Inputs',
        nav: true,
        auth: false,
        name: 'basic'
      }, {
        route: 'options',
        moduleId: './options',
        title: 'Option Inputs',
        nav: true,
        auth: false,
        name: 'options'
      }, {
        route: 'lists',
        moduleId: './lists',
        title: 'List Inputs',
        nav: true,
        auth: false,
        name: 'lists'
      }, {
        route: 'dates',
        moduleId: './dates',
        title: 'Date/Time Inputs',
        nav: true,
        auth: false,
        name: 'dates'
      }, {
        route: 'content',
        moduleId: './content',
        title: 'Content Editor',
        nav: true,
        auth: false,
        name: 'content'
      }, {
        route: 'validation',
        moduleId: './validation',
        title: 'Validation',
        nav: true,
        auth: false,
        name: 'validation'
      }
    ]);
  }
}
