// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {RouterConfiguration, Router} from "aurelia-router";

@autoinject()
export class StylesView {
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

  router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      {
        route: 'prereq',
        moduleId: './prereq',
        title: 'Pre-Requisites',
        nav: true,
        auth: false,
        name: 'prereq'
      }, {
        route: ['', 'start'],
        moduleId: './start',
        title: 'Using the Framework',
        nav: true,
        auth: false,
        name: 'start'
      }, {
        route: 'i18n',
        moduleId: './i18n',
        title: 'Using I18N',
        nav: true,
        auth: false,
        name: 'i18n'
      }, {
        route: 'build',
        moduleId: './build',
        title: 'Building the App',
        nav: true,
        auth: false,
        name: 'build'
      }
    ]);
  }
}