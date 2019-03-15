/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

let order = 0;
export class GridderPage {
  protected colDefs = [
    { order: order++, colSpan: 8, rowSpan: 1, fixed: true },
    { order: order++, colSpan: 4, rowSpan: 4 },
    { order: order++, colSpan: 4, rowSpan: 3, fixed: true },
    { order: order++, colSpan: 4, rowSpan: 3, fixed: true },
    { order: order++, colSpan: 6, rowSpan: 6 },
    { order: order++, colSpan: 3, rowSpan: 2 },
    { order: order++, colSpan: 3, rowSpan: 2 },
    { order: order++, colSpan: 3, rowSpan: 2 },
    { order: order++, colSpan: 3, rowSpan: 2 },
    { order: order++, colSpan: 3, rowSpan: 2 },
    { order: order++, colSpan: 3, rowSpan: 2 }
  ];

  protected toggleExpand($event) {
    const el = getParentByTag($event.target, "ui-panel");
    el.classList.toggle("grid-expand");
  }
}
