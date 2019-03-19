/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { PLATFORM } from "aurelia-framework";

let order = 0;
export class GridderPage {
  protected colDefs = [
    { order: order++, colSpan: 8, rowSpan: 1, col: 1, row: 1, pinned: true },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 4,
      rowSpan: 4,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    },
    { order: order++, colSpan: 4, rowSpan: 3, col: 1, row: 2, pinned: true },
    { order: order++, colSpan: 4, rowSpan: 3, col: 5, row: 2, pinned: true },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 6,
      rowSpan: 6,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 3,
      rowSpan: 2,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 3,
      rowSpan: 2,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 3,
      rowSpan: 2,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 3,
      rowSpan: 2,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 3,
      rowSpan: 2,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    },
    {
      view: PLATFORM.moduleName("./cell.html"),
      order: order++,
      colSpan: 3,
      rowSpan: 2,
      resizeable: true,
      moveable: true,
      pinnable: true,
      closeable: true,
      headAutoHide: false,
      expandable: true
    }
  ];
}
