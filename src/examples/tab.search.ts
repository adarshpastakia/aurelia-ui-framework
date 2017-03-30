//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {UIUtils, UITreeOptions, UIEvent} from '../resources/index';

@autoinject()
export class TabSearch {
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

  treeModel = [
    {
      text: 'Membership Type',
      expanded: true,
      children: [
        { text: 'Free (18)', checked: true },
        { text: 'Basic (18)', checked: true },
        { text: 'Premium (18)', checked: false },
        { text: 'Platinum (18)', checked: false }
      ]
    },
    {
      text: 'Expiration',
      expanded: true,
      children: [
        { text: '-3 Months (9)' },
        { text: '-2 Months (11)' },
        { text: '-1 Months (4)' },
        { text: '0 Months (4)' },
        { text: '+1 Months (2)' },
        { text: '+2 Months (27)' },
        { text: '+3 Months (42)' },
      ]
    }, {
      text: 'Member Since',
      expanded: true,
      children: [
        { text: 'New (4)' },
        { text: '1 Year (2)' },
        { text: '2 Years (27)' },
        { text: '3 Years (42)' },
      ]
    }
  ];
  treeOptions = new UITreeOptions({
    showCheckbox: true,
    checkboxLevel: 1,
    maxCount: 5
  });

  searchTree;
  treeToggle(v) {
    v ? this.searchTree.expandAll() : this.searchTree.collapseAll();
  }

  isExporting = false;
  doExport() {
    this.isExporting = true;
    setTimeout(() => {
      UIUtils.toast({ message: 'Results exported', glyph: 'glyph-alert-notif' });
      this.isExporting = false;
    }, 1000);
  }

  isSaving = false;
  saveQuery() {
    this.isSaving = true;
    UIEvent.fireEvent('mouseup', document.body);
    setTimeout(() => {
      UIUtils.toast({ message: 'Search query saved', glyph: 'glyph-alert-notif', theme: 'success' });
      this.isSaving = false;
    }, 1000);
  }
}
