import { autoinject, customElement, bindable, bindingMode, inlineView, useView, containerless, View, DOM, BindingEngine } from 'aurelia-framework';
import { UIFormat } from "../../utils/ui-format";
import { UIEvent } from "../../utils/ui-event";
import { UIUtils } from "../../utils/ui-utils";
import * as _ from "lodash";
import * as moment from 'moment';

@autoinject()
@inlineView(
    `<template>
            <div if.bind="col.type=='normal'">
            <span if.bind="!record.isEditing || !col.editable" class="\${col.class}" innerhtml.bind='col.getValue(record[col.dataId],record)'></span>
            <span if.bind="record.isEditing && col.dataType == 'text' && col.editable">
                <ui-input value.bind="record[col.dataId]"></ui-input>
            </span>
            <span if.bind="record.isEditing && col.editable && (col.dataType == 'number' || col.dataType == 'currency'  || col.dataType == 'percent' || col.dataType == 'exrate')">
                <ui-input decimal decimal.bind="record[col.dataId]"></ui-input>
            </span>
            <span if.bind="record.isEditing &&  col.editable && col.dataType == 'email'">
                <ui-input email value.bind="record[col.dataId]"></ui-input>
            </span>
            <span if.bind="record.isEditing &&  col.editable && col.dataType == 'url'">
                <ui-input url value.bind="record[col.dataId]"></ui-input>
            </span>
            <span if.bind="record.isEditing &&  col.editable && (col.dataType == 'date' || col.dataType == 'fromnow' || col.dataType == 'age')">
                <ui-date date date.bind="record[col.dataId]"></ui-date>
            </span>
            <span if.bind="record.isEditing &&  col.editable && col.dataType == 'time'">
                <ui-date time date.bind="record[col.dataId]"></ui-date>
            </span>
            <span if.bind="record.isEditing && col.editable && col.dataType == 'datetime'">
                <ui-date datetime date.bind="record[col.dataId]"></ui-date>
            </span>
        </div>
        <div if.bind="col.type=='glyph'" title.bind="col.getTooltip(record[col.dataId],record)"><ui-glyph class="\${col.class} \${col.getGlyph(record[col.dataId],record)}" glyph.bind="col.getGlyph(record[col.dataId],record)"></ui-glyph></div>
        <div if.bind="col.type=='link'"><a class="ui-link \${col.class} \${col.isDisabled(record[col.dataId],record)?'ui-disabled':''}" click.trigger="col.fireClick($event,record[col.dataId],record)"><ui-glyph glyph.bind="col.getGlyph(record[col.dataId],record)" if.bind="col.glyph"></ui-glyph> <span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></a></div>
        <div if.bind="col.type=='button'" class="btn-fix"><ui-button click.trigger="col.fireClick($event,record[col.dataId],record)"  theme.bind="col.getTheme(record[col.dataId],record)" small square glyph.bind="col.getGlyph(record[col.dataId],record)" disabled.bind="col.isDisabled(record[col.dataId],record)" dropdown.bind="dropdown" menuopen.trigger="col.fireMenuOpen($event, record)"><span innerhtml.bind="col.getLabel(record[col.dataId],record)"></span></ui-button></div>
    </template>`
)
@customElement('ui-dg-cell')
export class UIDgCell {
    constructor(public element: Element, public bindingEngine: BindingEngine) { }

    @bindable() record;
    @bindable() parent;
    @bindable() col;

    private dateType = ['date', 'time', 'age', 'datetime', 'fromnow'];

    private observerDisposer;

    attached() {
        //if (this.col.editable) {
            this.observerDisposer = this.bindingEngine
                .propertyObserver(this.record, this.col.dataId)
                .subscribe((n, o) => {
                    this.handleValueChange(n, o);
                });
            if (this.checkChanges())
                this.element.classList.add('ui-value-changed');
       // }
    }
    detached() {
        if(this.observerDisposer)
            this.observerDisposer.dispose();
    }

    handleValueChange(n, o) {
        let name = this.col.dataId;
        let ov = this.record._original_ && this.record._original_[name] ? this.record._original_[name] :o;// this.col.getValue(o, this.record);
        let nv = n;//this.col.getValue(n, this.record);
        let isChanged = false;
        if (this.dateType.indexOf(this.col.dataType) != -1) {
            isChanged = !moment(ov).isSame(nv);
        }
        else {
            isChanged = nv != ov;
        }
        if (isChanged) {
            console.log('DATA CHANGED:', name, ':', ov, '===>', nv);
            this.element.classList.add('ui-value-changed');
            this.record.isDirty = true;
            if (!this.record._original_) {
                this.record._original_ = {};
            } if (!this.record._original_[name]) {
                this.record._original_[name] = ov;
            }
            this.parent.pushChanges(this.record);
        } else {
            this.element.classList.remove('ui-value-changed');
        }
        // if(this.col.summary){
            
        // }
    }

    checkChanges() {
        return this.record.isDirty && this.record._original_ && this.record._original_[this.col.dataId]
    }

}