/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, PLATFORM } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { UIApplication } from "aurelia-ui-framework";

@autoinject()
export class App {
  private router: Router;
  private hideTitle: boolean = false;
  private isRtl: boolean = false;
  private darkTheme: boolean = false;

  constructor(private app: UIApplication) {}

  protected configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.options.root = "/";
    config.options.pushState = true;
    config.title = this.app.config.AppTitle;
    config.map([
      {
        moduleId: PLATFORM.moduleName("./app/home"),
        name: "home",
        route: ["", "home"],
        title: "Home"
      },
      {
        moduleId: PLATFORM.moduleName("./tests/tester"),
        name: "tester",
        route: ["tester", "tester/:test?"],
        title: "Tester"
      }
    ]);
  }

  protected activate() {
    this.app.subscribe("hidetitle", b => (this.hideTitle = b));
  }

  protected toggleDir(): void {
    this.isRtl = !this.isRtl;
    document.documentElement.dir = this.isRtl ? "rtl" : "ltr";
  }

  protected toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    if (this.darkTheme) {
      document.documentElement.classList.add("theme-dark");
      document.documentElement.classList.remove("theme-light");
    } else {
      document.documentElement.classList.add("theme-light");
      document.documentElement.classList.remove("theme-dark");
    }
  }
}
