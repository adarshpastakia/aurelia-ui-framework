/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./viewport");
PLATFORM.moduleName("./page");
PLATFORM.moduleName("./responsive");

const group = "Layouts";

export const CoreRoutes = [
  {
    moduleId: "core/viewport",
    name: "viewport",
    route: "viewport",
    title: "Viewport",
    group,
    nav: true
  },
  {
    moduleId: "core/page",
    name: "page",
    route: "page",
    title: "Page",
    group,
    nav: true
  },
  {
    moduleId: "core/responsive",
    name: "responsive",
    route: "responsive",
    title: "Responsive Grid",
    group,
    nav: true
  }
];
