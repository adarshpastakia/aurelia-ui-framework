//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {UIEvent, UIUtils} from '../resources/index';

@autoinject()
export class TabbedLayout {
  constructor() { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model, route) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  seed = 0;
  tabs = [];
  tabPanel;
  tabActive;

  tabItems = {
    search: { id: 'search', label: 'Search', glyph: 'icon-moon-search', viewModel: './tab.search' },
    members: { id: 'members', label: 'Members', glyph: 'icon-moon-users', view: './tab.members.html' },
    salesform: { label: 'Sales Form', glyph: 'icon-moon-insert-template', viewModel: './tab.salesform' },
    sales: { label: 'Sales History', glyph: 'icon-moon-stats-bars', viewModel: './tab.sales' }
  }

  openTab(id) {
    let tab = Object.assign({}, this.tabItems[id]);
    if (!tab.id) tab.id = id + (this.seed++);
    if (this.tabPanel.canActivate(id)) return;
    this.tabs.push(tab);
    UIEvent.queueTask(() => this.tabActive = tab.id);
  }

  closeTab(id) {
    this.tabPanel.close(id, true);
  }
}
