//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { UIEvent } from "aurelia-ui-framework";
import * as _ from "lodash";

export class SampleTabbed {

  tabId = 0;
  tabActiveId = 0;

  tabTpl = {
    users: { view: './home.html', title: 'Users' },
    userform: { view: './home.html', title: 'New User' }
  }

  tabs = [];

  openNewTab(id) {
    const tab = _.clone(this.tabTpl[id]);
    tab.id = "tab" + (this.tabId++);
    this.tabs.push(tab)

    UIEvent.queueTask(() => this.tabActiveId = this.tabs.length);
  }

  removeTab(id) {
    _.remove(this.tabs, ['id', id]);
    console.log(id, this.tabs);
  }
}
