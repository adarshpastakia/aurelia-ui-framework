/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./typo");
PLATFORM.moduleName("./lists");
PLATFORM.moduleName("./colors");

const group = "Styling";

export const StyleRoutes = [
  {
    moduleId: "style/typo",
    name: "typo",
    route: "typo",
    title: "Typography",
    group,
    nav: true
  },
  {
    moduleId: "style/lists",
    name: "list-styles",
    route: "list-styles",
    title: "Lists",
    group,
    nav: true
  },
  {
    moduleId: "style/colors",
    name: "colors",
    route: "colors",
    title: "Colors",
    group,
    nav: true
  }
];
