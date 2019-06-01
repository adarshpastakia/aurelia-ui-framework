/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { autoinject, computedFrom } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { UIApplication } from "aurelia-ui-framework";
import { ButtonRoutes } from "../buttons/routes";
import { DataRoutes } from "../data/routes";
import { FormRoutes } from "../form/routes";
import { GuideRoutes } from "../guide/routes";
import { LayoutRoutes } from "../layout/routes";
import { LibRoutes } from "../libs/routes";
import { OverlayRoutes } from "../overlay/routes";
import { PanelRoutes } from "../panels/routes";
import { StyleRoutes } from "../style/routes";

@autoinject()
export class DocsPage {
  protected router: Router;

  protected dir = "ltr";
  protected theme = "light";

  constructor(private app: UIApplication) {
  }

  protected configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.map([
      ...GuideRoutes,
      ...StyleRoutes,
      ...LibRoutes,
      ...LayoutRoutes,
      ...ButtonRoutes,
      ...FormRoutes,
      ...PanelRoutes,
      ...DataRoutes,
      ...OverlayRoutes
    ]);
  }

  @computedFrom("dir")
  get dirIcon() {
    return this.dir === "ltr" ? "mdi-format-textdirection-r-to-l" : "mdi-format-textdirection-l-to-r";
  }

  @computedFrom("theme")
  get themeIcon() {
    return this.theme === "light" ? "mdi-lightbulb-outline" : "mdi-lightbulb";
  }

  protected toggleDir() {
    this.dir = this.dir === "ltr" ? "rtl" : "ltr";
    document.documentElement.dir = this.dir;
  }

  protected toggleTheme(): void {
    this.theme = this.theme === "light" ? "dark" : "light";
    if (this.theme === "light") {
      document.documentElement.classList.add("theme-light");
      document.documentElement.classList.remove("theme-dark");
    } else {
      document.documentElement.classList.add("theme-dark");
      document.documentElement.classList.remove("theme-light");
    }
  }
}
