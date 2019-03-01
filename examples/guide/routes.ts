/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./start");
PLATFORM.moduleName("./theme");
PLATFORM.moduleName("./components");

const group = "Guides";

export const GuideRoutes = [
  {
    moduleId: "guide/start",
    name: "get-started",
    route: "get-started",
    title: "Get Started",
    group,
    nav: true
  },
  {
    moduleId: "guide/theme",
    name: "theming",
    route: "theming",
    title: "Theming",
    group,
    nav: true
  },
  {
    moduleId: "guide/components",
    name: "components",
    route: "",
    title: "Components",
    group,
    nav: true
  }
];
