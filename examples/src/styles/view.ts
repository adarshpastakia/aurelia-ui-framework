//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class StylesView {
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
        route: 'home',
        moduleId: './home',
        title: 'Overview',
        nav: true,
        auth: false,
        name: 'home'
      }, {
        route: 'typo',
        moduleId: './typo',
        title: 'Typography',
        nav: true,
        auth: false,
        name: 'typo'
      }, {
        route: 'glyphs',
        moduleId: './glyphs',
        title: 'SVG Glyphs',
        nav: true,
        auth: false,
        name: 'glyphs'
      }, {
        route: 'flags',
        moduleId: './flags',
        title: 'Flag Icons',
        nav: true,
        auth: false,
        name: 'flag'
      }, {
        route: 'colors',
        moduleId: './colors',
        title: 'Color Charts',
        nav: true,
        auth: false,
        name: 'colors'
      }
    ]);
  }
}
