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
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'basic'],
        moduleId: './basic',
        title: 'Basic Inputs',
        nav: false,
        auth: false,
        name: 'basic'
      }]);
  }
}