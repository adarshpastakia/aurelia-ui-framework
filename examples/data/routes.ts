/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./tree");
PLATFORM.moduleName("./datagrid");

const group = "Data Panels";

export const DataRoutes = [
  {
    moduleId: "data/tree",
    name: "datatree",
    route: "datatree",
    title: "Tree Panel",
    group,
    nav: true
  },
  {
    moduleId: "data/datagrid",
    name: "datagrid",
    route: "datagrid",
    title: "Datagrid Panel",
    group,
    nav: true
  }
];
