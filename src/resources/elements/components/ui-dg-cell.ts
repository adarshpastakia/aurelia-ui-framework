import { autoinject, customElement, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM } from 'aurelia-framework';
import { UIFormat } from "../../utils/ui-format";
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";

@inlineView(
    `<template>
     <span>Test</span>
    </template>`
)
@customElement('ui-dg-cell')
export class UIDgCell {
    constructor(public element: Element) {

    }
    @bindable() record;
    @bindable() parent;

    @bindable() editMode;

}