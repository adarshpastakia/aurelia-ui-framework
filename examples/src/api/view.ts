//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class ApiView {
  constructor() { }

  router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      {
        route: 'application',
        moduleId: './application',
        title: 'Application',
        nav: true,
        auth: false,
        name: 'application'
      }, {
        route: 'http',
        moduleId: './http',
        title: 'Http Service',
        nav: true,
        auth: false,
        name: 'http'
      }, {
        route: 'event',
        moduleId: './event',
        title: 'Event Management',
        nav: true,
        auth: false,
        name: 'event'
      }, {
        route: 'datamodel',
        moduleId: './datamodel',
        title: 'Data Model',
        nav: true,
        auth: false,
        name: 'datamodel'
      }, {
        route: 'datasource',
        moduleId: './datasource',
        title: 'Data Source',
        nav: true,
        auth: false,
        name: 'datasource'
      }
    ]);
  }
}
