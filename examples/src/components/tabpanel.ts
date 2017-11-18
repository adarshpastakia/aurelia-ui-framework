//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { autoinject } from 'aurelia-framework';
import { UIHttpService } from 'aurelia-ui-framework';
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class TabPanel {
  constructor(public httpClient: UIHttpService) { }

  wiki = '';
  source = '';
  activate() {
    this.httpClient.text('docs/components/tabpanel.md').then(md => this.wiki = md);
    this.httpClient.text('docs/components/tabpanel.example.md').then(md => this.source = md);
  }

  router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      {
        route: ['home', ''],
        moduleId: '../styles/home',
        title: 'Overview',
        nav: true,
        auth: false,
        name: 'home'
      }, {
        route: 'typo',
        moduleId: '../styles/typo',
        title: 'Typography',
        nav: true,
        auth: false,
        name: 'typo'
      }, {
        route: 'glyphs',
        moduleId: '../styles/glyphs',
        title: 'SVG Glyphs',
        nav: true,
        auth: false,
        name: 'glyphs'
      }, {
        route: 'flags',
        moduleId: '../styles/flags',
        title: 'Flag Icons',
        nav: true,
        auth: false,
        name: 'flag'
      }, {
        route: 'colors',
        moduleId: '../styles/colors',
        title: 'Color Charts',
        nav: true,
        auth: false,
        name: 'colors'
      }
    ]);
  }
}
