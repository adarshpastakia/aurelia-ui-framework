//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject, TemplatingEngine} from 'aurelia-framework';
import {UITreeOptions, UIEvent, UIUtils} from "../resources/index";

@autoinject()
export class CompTabs {
  constructor(private templatingEngine: TemplatingEngine) {
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

  tabPanel;
  tabActive;
  tabs = []
  seed = 0;
  addTab() {
    let id = 'tab' + (this.seed++);
    this.tabs.push({ id: id, viewModel: '../inputs/basic', model: {}, label: 'Editor Tab', extras: 'padded scroll closeable' });
    UIEvent.queueTask(() => this.tabActive = id);
  }

  beforeClose() {
    return UIUtils.confirm("Are you sure?");
  }
}
