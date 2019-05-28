/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { customElement, inlineView } from "aurelia-framework";

@customElement("ui-data-table")
@inlineView(`<template class="ui-datalist__table"><slot></slot></template>`)
export class UIDataTable {
}
