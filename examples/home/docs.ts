/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { autoinject } from "aurelia-framework";
import { Router, RouterConfiguration } from "aurelia-router";
import { UIApplication } from "aurelia-ui-framework";
import { ButtonRoutes } from "../buttons/routes";
import { CoreRoutes } from "../core/routes";
import { FormRoutes } from "../form/routes";
import { GuideRoutes } from "../guide/routes";
import { LibRoutes } from "../libs/routes";
import { OverlayRoutes } from "../overlay/routes";
import { PanelRoutes } from "../panels/routes";
import { StyleRoutes } from "../style/routes";

@autoinject()
export class DocsPage {
  protected router: Router;

  constructor(private app: UIApplication) {}

  protected configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.map([
      ...GuideRoutes,
      ...StyleRoutes,
      ...LibRoutes,
      ...CoreRoutes,
      ...ButtonRoutes,
      ...FormRoutes,
      ...PanelRoutes,
      ...OverlayRoutes
    ]);
  }
}
