/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-pal";

PLATFORM.moduleName("./tree");
PLATFORM.moduleName("./grid");
PLATFORM.moduleName("./list");

const group = "Data Panels";

export const DataRoutes = [
  {
    moduleId: "data/grid",
    name: "datagrid",
    route: "datagrid",
    title: "Datagrid Panel",
    group,
    nav: true
  },
  {
    moduleId: "data/list",
    name: "datalist",
    route: "datalist",
    title: "Datalist Panel",
    group,
    nav: true
  },
  {
    moduleId: "data/tree",
    name: "datatree",
    route: "datatree",
    title: "Tree Panel",
    group,
    nav: true
  }
];
