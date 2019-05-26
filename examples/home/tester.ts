/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { autoinject } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";
import { Countries, UINotificationService } from "aurelia-ui-framework";

let order = 0;

@autoinject()
export class Tester {
  protected countries = Countries.list;

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

  constructor(private notificationService: UINotificationService) {
  }


  public notif(record: KeyValue) {
    this.notificationService.alert({
      message: `Clicked: <ui-flag code="${record.iso2}"></ui-flag> ${record.name}`,
      theme: "info",
      autoClose: false
    });
  }

  // protected ghost: HTMLElement & { startWidth: number; startHeight: number };
  // protected gridder: HTMLElement;

  // private dragEl: HTMLElement & { originalIndex?: number };
  // private dropEl;

  // private startX;
  // private startY;
  // private colSpan;
  // private rowSpan;

  // private colCount;
  // private minWidth;
  // private minHeight = 100;

  // private cells;

  // protected attached() {
  //   this.colCount = 12; // Math.floor(this.gridder.offsetWidth / 180);
  //   this.minWidth = Math.floor(this.gridder.offsetWidth / this.colCount);

  //   // @ts-ignore
  //   this.cells = [...this.gridder.querySelectorAll(".ui-gridder__cell")];
  //   this.cells.forEach((cell, i) => {
  //     cell.style.gridArea = `auto / auto / span ${this.colDefs[i].rowSpan} / span ${
  //       this.colDefs[i].colSpan
  //     }`;
  //   });
  // }

  // protected startMove($event: DragEvent) {
  //   this.dragEl = $event.target;
  //   this.dragEl.style.opacity = "0.5";
  //   this.updateGhost(this.dragEl);
  //   this.dragEl.originalIndex = this.cells.indexOf(this.dragEl);
  //   return true;
  // }
  // protected tempMove($event: MouseEvent) {
  //   const current = getParentByTag($event.target, "ui-panel") as HTMLElement;
  //   if (isTrue(current.dataset.allowDrop)) {
  //     $event.preventDefault();
  //     this.dropEl = current;
  //     this.updateGhost(this.dropEl);
  //   }
  // }
  // protected finishMove($event: MouseEvent) {
  //   if (this.dropEl) {
  //     $event.preventDefault();
  //     if (this.dropEl !== this.dragEl) {
  //       const newIndex = this.cells.indexOf(this.dropEl);

  //       newIndex === this.cells.length - 1
  //         ? this.dragEl.parentElement.appendChild(this.dragEl)
  //         : this.dragEl.parentElement.insertBefore(
  //             this.dragEl,
  //             this.dragEl.originalIndex > newIndex ? this.dropEl : this.dropEl.nextSibling
  //           );
  //     }

  //     // @ts-ignore
  //     this.cells = [...this.gridder.querySelectorAll(".ui-gridder__cell")];
  //   }
  //   this.dragEl.style.opacity = "1";
  //   this.dragEl = null;
  //   this.dropEl = null;
  // }

  // protected startResize($event: MouseEvent) {
  //   this.dragEl = $event.target.parentElement;
  //   this.updateGhost(this.dragEl);
  //   this.startX = $event.clientX || $event.x;
  //   this.startY = $event.clientY || $event.y;
  //   this.colSpan = parseInt(this.dragEl.style.gridColumnEnd.replace("span ", ""), 10);
  //   this.rowSpan = parseInt(this.dragEl.style.gridRowEnd.replace("span ", ""), 10);

  //   document.addEventListener("mousemove", this.drag);
  //   document.addEventListener("mouseup", this.stopDrag);
  // }

  // private drag = ($event: MouseEvent) => {
  //   const x = $event.clientX || $event.x;
  //   const y = $event.clientY || $event.y;

  //   this.ghost.style.width = this.ghost.startWidth + (x - this.startX) + "px";
  //   this.ghost.style.height = this.ghost.startHeight + (y - this.startY) + "px";

  //   if (Math.round((x - this.startX) / this.minWidth) > 0) {
  //     this.dragEl.style.gridColumnEnd = `span ${this.colSpan +
  //       Math.round((x - this.startX) / this.minWidth)}`;
  //   } else if (Math.round((this.startX - x) / this.minWidth) > 0) {
  //     this.dragEl.style.gridColumnEnd = `span ${this.colSpan -
  //       Math.round((this.startX - x) / this.minWidth)}`;
  //   } else {
  //     this.dragEl.style.gridColumnEnd = `span ${this.colSpan}`;
  //   }
  //   if (Math.round((y - this.startY) / this.minHeight) > 0) {
  //     this.dragEl.style.gridRowEnd = `span ${this.rowSpan +
  //       Math.round((y - this.startY) / this.minHeight)}`;
  //   } else if (Math.round((this.startY - y) / this.minHeight) > 0) {
  //     this.dragEl.style.gridRowEnd = `span ${this.rowSpan -
  //       Math.round((this.startY - y) / this.minHeight)}`;
  //   } else {
  //     this.dragEl.style.gridRowEnd = `span ${this.rowSpan}`;
  //   }

  //   this.ghost.style.top = this.dragEl.offsetTop + "px";
  //   this.ghost.style.left = this.dragEl.offsetLeft + "px";
  // };

  // private stopDrag = ($event: MouseEvent) => {
  //   this.dragEl = null;
  //   document.removeEventListener("mousemove", this.drag);
  //   document.removeEventListener("mouseup", this.stopDrag);
  // };

  // private updateGhost(el) {
  //   queueTask(() => {
  //     this.ghost.startWidth = el.offsetWidth;
  //     this.ghost.startHeight = el.offsetHeight;
  //     this.ghost.style.top = el.offsetTop + "px";
  //     this.ghost.style.left = el.offsetLeft + "px";
  //     this.ghost.style.width = el.offsetWidth + "px";
  //     this.ghost.style.height = el.offsetHeight + "px";
  //   });
  // }
}
