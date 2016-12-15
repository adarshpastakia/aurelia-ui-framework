// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';

@autoinject()
export class HomeView {
  constructor() { }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model, route) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() { }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  core = [
    { label: 'Font Glyphs', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Responsive Layout', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Viewport', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Page', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Section', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Content', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 }
  ]

  inputs = [
    { label: 'Button', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Text', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Multiline', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Phone', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'List', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Combo', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Tag', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Date', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Radio', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Checkbox', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Switch', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Language', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Markdown', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 },
    { label: 'Validation', s: 1, c: 1, o: 1, f: 1, e: 1, i: 0 }
  ]

  comps = [
    { label: 'Menu', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Menubar', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Panel', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Dialog', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Alerts', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 },
    { label: 'Drawer', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Toolbar', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Sidebar', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Statsbar', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Breadcrumbs', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Tab Panel', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Tree Panel', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Datagrid', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 }
  ]

  features = [
    { label: 'Application', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Http Client', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Data Model', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Event Handling', s: 1, c: 1, o: 1, f: 1, e: 1, i: 1 },
    { label: 'Value Converters', s: 1, c: 1, o: 1, f: 1, e: 1, i: 2 }
  ]
}