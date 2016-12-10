// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

@autoinject()
export class App {
  configureRouter(config: RouterConfiguration, router: Router) {
    // config.title = UIConstants.App.Title;
    config.mapUnknownRoutes('./home/404');
    config.map([
      {
        route: ['', 'home'],
        moduleId: './home/view',
        title: 'Home',
        nav: false,
        auth: false,
        name: 'home'
      }, {
        route: 'viewport',
        moduleId: './core/viewport',
        title: 'Viewport',
        nav: false,
        auth: false,
        name: 'viewport'
      }, {
        route: 'grid',
        moduleId: './core/grid',
        title: 'Responsive Layout',
        nav: false,
        auth: false,
        name: 'grid'
      }, {
        route: 'inputs',
        moduleId: './inputs/view',
        title: 'Basic Inputs',
        nav: false,
        auth: false,
        name: 'inputs'
      }]);
  }
}
