/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./icons");
PLATFORM.moduleName("./countries");

const group = "Resources";
export const LibRoutes = [
  {
    moduleId: "libs/icons",
    name: "icons",
    route: "icons",
    title: "Icons",
    group,
    nav: true
  },
  {
    moduleId: "libs/countries",
    name: "countries",
    route: "countries",
    title: "Country List",
    group,
    nav: true
  }
];
