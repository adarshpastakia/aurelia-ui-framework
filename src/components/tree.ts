//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {UIEvent} from "../resources/utils/ui-event";
import {UITreeOptions} from "../resources/utils/ui-tree-model";
import * as _ from "lodash";

@autoinject()
export class TreeComponent {
  constructor() {
    this.makeTeeModel();
  }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  treeModel = [];
  treeOpts = new UITreeOptions({
    showCheckbox: true,
    selectionLevel: 1,
    checkboxLevel: 0,
    maxCount: 0
  });
  treeSelected = null;
  countries = _.mapKeys(window.Countries.list, 'iso3');

  makeTeeModel() {
    var ct = [{
      id: 'noleafs', text: 'Node with no childs',
      openIcon: 'glyph-icon-folder-open',
      closedIcon: 'glyph-icon-folder-closed', children: []
    }];
    _.forEach(_.chain(window.Countries.list).sortBy('continent').groupBy('continent').value(), (v: any, k: string) => {
      let c = {
        id: _.camelCase(k),
        text: k,
        openIcon: 'glyph-icon-folder-open',
        closedIcon: 'glyph-icon-folder-closed',
        expanded: k == 'Asia',
        children: []
      }
      _.forEach(_.sortBy(v, 'name'), (o: any) => {
        c.children.push({
          id: o.iso3,
          text: o.name,
          leaf: true,
          icon: `ui-flag ${o.iso3}`
        })
      });
      ct.push(c);
    });
    this.treeModel = ct;
  }

  clearSelection() {
    this.treeSelected = null;
    this.treeOpts.showCheckbox = !this.treeOpts.showCheckbox;
  }

  tree;
  treeCheck = [];
  getCheckTree() {
    this.treeCheck = this.tree.getCheckedTree();
  }
}
