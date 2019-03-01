/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./notification");

const group = "Overlays";

export const OverlayRoutes = [
  {
    moduleId: "overlay/notification",
    name: "notification",
    route: "notification",
    title: "Notification Service",
    group,
    nav: true
  }
];
