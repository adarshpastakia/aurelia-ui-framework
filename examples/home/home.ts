/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import AURELIA from "@images/dev-aurelia.svg";
import GIT from "@images/dev-github.svg";
import SASS from "@images/dev-sass.svg";
import TS from "@images/dev-ts.svg";
import GRID from "@images/feature-grid.svg";
import INPUT from "@images/feature-input.svg";
import LAYOUT from "@images/feature-layout.svg";
import THEME from "@images/feature-theme.svg";
import { autoinject } from "aurelia-framework";
import { broadcast, UIApplication } from "aurelia-ui-framework";

@autoinject()
export class AppHome {
  protected images = {
    layout: LAYOUT,
    theme: THEME,
    input: INPUT,
    grid: GRID,
    aurelia: AURELIA,
    ts: TS,
    git: GIT,
    sass: SASS
  };
  private titleHidden = true;

  constructor(private app: UIApplication) {}

  protected activate() {
    broadcast("hidetitle", true);
  }
  protected deactivate() {
    broadcast("hidetitle", false);
  }

  protected hideTitle(b) {
    if (this.titleHidden !== b) {
      broadcast("hidetitle", (this.titleHidden = b));
    }
  }
}
