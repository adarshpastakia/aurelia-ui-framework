/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

@customElement("ui-drag-handle")
@inlineView(`<template class="ui-drag-handle" ui-color="gray"
    mousedown.trigger="fireDragEvent($event,'dragstart')" click.trigger="fireDragEvent($event,'dragend')"><ui-svg-icon icon="drag"></ui-svg-icon></template>`)
export class UIDragHandle {
  constructor(protected element: Element) {}

  protected fireDragEvent($event: UIEvent, evt) {
    this.element.dispatchEvent(UIInternal.createEvent(evt));
    return true;
  }
}
