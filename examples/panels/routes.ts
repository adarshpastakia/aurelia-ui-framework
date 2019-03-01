/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./panel");
PLATFORM.moduleName("./card");
PLATFORM.moduleName("./tabs");
PLATFORM.moduleName("./sidebar");
PLATFORM.moduleName("./alert");
PLATFORM.moduleName("./toolbar");

const group = "Panels";

export const PanelRoutes = [
  {
    moduleId: "panels/panel",
    name: "panel",
    route: "panel",
    title: "Panel",
    group,
    nav: true
  },
  {
    moduleId: "panels/card",
    name: "card",
    route: "card",
    title: "Card",
    group,
    nav: true
  },
  {
    moduleId: "panels/tabs",
    name: "tabs",
    route: "tabs",
    title: "Tab Panel",
    group,
    nav: true
  },
  {
    moduleId: "panels/sidebar",
    name: "sidebar",
    route: "sidebar",
    title: "Sidebar",
    group,
    nav: true
  },
  {
    moduleId: "panels/toolbar",
    name: "toolbar",
    route: "toolbar",
    title: "Toolbar",
    group,
    nav: true
  },
  {
    moduleId: "panels/alert",
    name: "message",
    route: "message",
    title: "Message Panel",
    group,
    nav: true
  }
];
