/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./form");
PLATFORM.moduleName("./inputs");
PLATFORM.moduleName("./lists");
PLATFORM.moduleName("./toggles");
PLATFORM.moduleName("./date");

const group = "Form Controls";

export const FormRoutes = [
  {
    moduleId: "form/form",
    name: "form",
    route: "form",
    title: "Form Element",
    group,
    nav: true
  },
  {
    moduleId: "form/inputs",
    name: "inputs",
    route: "inputs",
    title: "Basic Inputs",
    group,
    nav: true
  },
  {
    moduleId: "form/lists",
    name: "lists",
    route: "lists",
    title: "List Inputs",
    group,
    nav: true
  },
  {
    moduleId: "form/date",
    name: "date",
    route: "date",
    title: "Date/Time",
    group,
    nav: true
  },
  {
    moduleId: "form/toggles",
    name: "toggles",
    route: "toggles",
    title: "Toggle Inputs",
    group,
    nav: true
  }
];
