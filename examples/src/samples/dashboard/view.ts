//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class SampleAdmin {
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
        route: '', redirect: 'home'
      },
      {
        route: 'home',
        moduleId: './dashboard',
        title: 'Dashboard',
        nav: true,
        auth: false,
        name: 'home'
      }
    ]);
  }
}
