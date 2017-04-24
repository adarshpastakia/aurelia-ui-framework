//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {RouterConfiguration, Router} from "aurelia-router";

@autoinject()
export class ApiView {
  constructor(public element: Element) { }

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
        route: 'app',
        moduleId: './app',
        title: 'Application',
        nav: true,
        auth: false,
        name: 'app'
      }, {
        route: 'http',
        moduleId: './http',
        title: 'Http Client',
        nav: true,
        auth: false,
        name: 'http'
      }, {
        route: 'data',
        moduleId: './data',
        title: 'Data Model',
        nav: true,
        auth: false,
        name: 'data'
      }, {
        route: 'event',
        moduleId: './event',
        title: 'Event Handling',
        nav: true,
        auth: false,
        name: 'event'
      }
    ]);
  }
}
