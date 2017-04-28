//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {RouterConfiguration, Router} from "aurelia-router";

@autoinject()
export class DatagridView {
  constructor() { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model, route) { return true; }
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
        route: ['', 'basic'],
        moduleId: './basic',
        title: 'Basic Datagrid',
        nav: true,
        auth: false,
        name: 'basic'
      }, {
        route: 'virtual',
        moduleId: './virtual',
        title: 'Large Data',
        nav: true,
        auth: false,
        name: 'virtual'
      }, {
        route: 'expand',
        moduleId: './expand',
        title: 'Expanding Rows',
        nav: true,
        auth: false,
        name: 'expand'
      }, {
        route: 'form',
        moduleId: './form',
        title: 'Editable Form',
        nav: true,
        auth: false,
        name: 'form'
      }, {
        route: 'editable',
        moduleId: './editable',
        title: 'Editable Rows',
        nav: true,
        auth: false,
        name: 'editable'
      }
    ]);
  }
}
