//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject } from 'aurelia-framework';
import { RouterConfiguration, Router } from "aurelia-router";

@autoinject()
export class DgView {
  router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    config.map([
      {
        route: ['', 'basic'],
        moduleId: './basic',
        title: 'Basic',
        nav: true,
        auth: false,
        name: 'basic'
      }
    ]);
  }
}
