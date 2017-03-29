//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT

import {autoinject, bindable, bindingMode, computedFrom} from 'aurelia-framework';
import * as _ from "lodash";

export class UITreeModel {
  id: any;
  text: string;
  level: number;
  extra: any;

  icon: string;
  openIcon: string;
  closedIcon: string;

  root: boolean;
  leaf: boolean;
  active: boolean;
  childActive: boolean;
  expanded: boolean;

  children: Array<UITreeModel> = [];

  // 0=false, 1=true, 2=partial
  checked: number;

  parent: UITreeModel = null;

  isVisible: boolean = true;

  private __checkLevel = 0;

  constructor(level: number,
    maxLevels: number,
    checkLevel: number,
    model: any,
    parent?: UITreeModel) {

    this.id = model.id;
    this.text = model.name || model.text;
    this.level = level;
    this.extra = model.extra;

    this.icon = model.icon;
    this.openIcon = model.openIcon;
    this.closedIcon = model.closedIcon;

    this.root = level == -1;
    this.leaf = (model.children || []).length == 0 || level == maxLevels;
    this.active = model.active || false;
    this.expanded = model.expanded || false;

    this.checked = model.checked ? 1 : 0;
    this.parent = parent;

    this.__checkLevel = checkLevel;

    if (level < maxLevels && (model.children || []).length > 0) {
      _.each(
        model.children, (m: any) => {
          this.children.push(new UITreeModel(level + 1, maxLevels, checkLevel, m, this));
        });
    }
    this.updatePartial();
  }

  set isChecked(v) {
    this.checked = v = v ? 1 : 0;
    _.forEach(
      this.children, (c: UITreeModel) => {
        c.updateChild('checked', v);
      });
    if (this.parent && this.parent.updatePartial) {
      this.parent.updatePartial();
    }
  }

  get data(): any {
    return {
      id: this.id,
      text: this.text,
      level: this.level,
      extra: this.extra
    }
  }

  expandToggle(v) {
    _.forEach(
      this.children, (c: UITreeModel) => {
        c.expanded = v;
        if (v === false) c.updateChild('expanded', false);
      });
  }

  updateChild(prop, v) {
    this[prop] = v;
    _.forEach(
      this.children, (c: UITreeModel) => {
        c.updateChild(prop, v);
      });
  }

  updatePartial() {
    if (this.children && this.children.length > 0) {
      var c = _.countBy(this.children, 'checked');
      var v = 2;
      if (!c[1] && !c[2]) {
        v = 0;
      }
      if (!c[0] && !c[2]) {
        v = 1;
      }
      this.checked = v;
    }

    if (this.parent && this.parent.updatePartial) {
      this.parent.updatePartial();
    }
  }

  @computedFrom('leaf', 'icon')
  get isLeaf() {
    return this.leaf && !this.icon;
  }
}

export class UITreeOptions {
  // show maximum of ? levels
  maxLevels: number = 99;
  maxCount: number = 0;

  // show checkboxes
  showCheckbox: boolean = false;
  // show checkbox only at ? level, -1/null all levels
  checkboxLevel: number = -1;

  showRoot: boolean = false;
  rootLabel: string = 'Root';

  selectionLevel: number = -1;

  constructor(obj = {}) {
    Object.assign(this, obj)
  }
}

export interface UITreePanel {
  getChecked();
}
