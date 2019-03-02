/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./button");
PLATFORM.moduleName("./menus");
PLATFORM.moduleName("./tags");
PLATFORM.moduleName("./breadcrumbs");

const group = "Buttons / Menus";

export const ButtonRoutes = [
  {
    moduleId: "buttons/button",
    name: "button",
    route: "button",
    title: "Button",
    group,
    nav: true
  },
  {
    moduleId: "buttons/menus",
    name: "menus",
    route: "menus",
    title: "Menus",
    group,
    nav: true
  },
  {
    moduleId: "buttons/tags",
    name: "tags",
    route: "tags",
    title: "Tags",
    group,
    nav: true
  },
  {
    moduleId: "buttons/breadcrumbs",
    name: "breadcrumbs",
    route: "breadcrumbs",
    title: "Breadcrumbs",
    group,
    nav: true
  }
];
