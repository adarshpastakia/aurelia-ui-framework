//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { UITreeModel } from "aurelia-ui-framework";
import * as _ from "lodash";

export class TreePanel {
  treeModel;
  countries = _.mapKeys(window.Countries.list, 'iso3');

  constructor() {
    this.makeTeeModel();
  }

  makeTeeModel() {
    var ct = [];
    _.forEach(_.chain(window.Countries.list).sortBy('continent').groupBy('continent').value(), (v: any, k: string) => {
      let c = {
        id: _.camelCase(k),
        text: k,
        icon: 'glyph-icon-folder-open',
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
    var tm = [{
      id: 'ctries', text: 'Countries',
      icon: 'glyph-icon-folder-open',
      closedIcon: 'glyph-icon-folder-closed', children: ct
    }, {
      id: 'noleafs', text: 'Node with no childs',
      icon: 'glyph-icon-folder-open',
      closedIcon: 'glyph-icon-folder-closed', children: []
    }];
    this.treeModel = new UITreeModel(tm);
  }

}
