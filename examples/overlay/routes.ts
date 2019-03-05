/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./notification");
PLATFORM.moduleName("./dialog");

const group = "Overlays";

export const OverlayRoutes = [
  {
    moduleId: "overlay/dialog",
    name: "dialog",
    route: "dialog",
    title: "Dialog Service",
    group,
    nav: true
  },
  {
    moduleId: "overlay/notification",
    name: "notification",
    route: "notification",
    title: "Notification Service",
    group,
    nav: true
  }
];
