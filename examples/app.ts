/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { autoinject, PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { subscribe, UIApplication } from "aurelia-ui-framework";

@autoinject()
export class App {
  protected router: Router;
  protected hideTitle: boolean = false;

  private darkTheme = false;

  constructor(private app: UIApplication) {}

  protected configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.options.root = ".";
    config.options.pushState = true;
    config.title = this.app.config.title;
    config.map([
      {
        moduleId: PLATFORM.moduleName("./home/home"),
        name: "home",
        route: ["", "home"],
        title: "Home",
        nav: false
      },
      {
        moduleId: PLATFORM.moduleName("./home/docs"),
        name: "docs",
        route: "docs",
        title: "Documentation",
        nav: false
      }
    ]);
  }

  protected activate() {
    subscribe("hidetitle", b => (this.hideTitle = b));
  }

  protected toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      document.documentElement.classList.add("ui-theme-dark");
    } else {
      document.documentElement.classList.remove("ui-theme-dark");
    }
  }
}
