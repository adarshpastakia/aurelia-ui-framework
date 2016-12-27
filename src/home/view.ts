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

  sections = {
    theming: [
      { link: "#/theme/home", title: "home:theming.titleOverview", desc: "home:theming.descOverview" },
      { link: "#/theme/typo", title: "home:theming.titleTypo", desc: "home:theming.descTypo" },
      { link: "#/theme/glyphs", title: "home:theming.titleGlyphs", desc: "home:theming.descGlyphs" },
      { link: "#/theme/flags", title: "home:theming.titleFlags", desc: "home:theming.descFlags" }
    ],

    core: [
      { link: "#/core/viewport", title: "home:core.titleViewport", desc: "home:core.descViewport" },
      { link: "#/core/pages", title: "home:core.titlePages", desc: "home:core.descPages" },
      { link: "#/core/grid", title: "home:core.titleGrid", desc: "home:core.descGrid" }
    ],

    inputs: [
      { link: "#/inputs/buttons", title: "home:inputs.titleButtons", desc: "home:inputs.descButtons" },
      { link: "#/inputs/basic", title: "home:inputs.titleText", desc: "home:inputs.descText" },
      { link: "#/inputs/basic", title: "home:inputs.titleMulti", desc: "home:inputs.descMulti" },
      { link: "#/inputs/options", title: "home:inputs.titleOption", desc: "home:inputs.descOption" },
      { link: "#/inputs/lists", title: "home:inputs.titleLists", desc: "home:inputs.descLists" },
      { link: "#/inputs/dates", title: "home:inputs.titleDate", desc: "home:inputs.descDate" },
      { link: "#/inputs/content", title: "home:inputs.titleMd", desc: "home:inputs.descMd" },
      { link: "#/inputs/validation", title: "home:inputs.titleValidation", desc: "home:inputs.descValidation" }
    ],

    comps: [
      { link: "#/menus/", "title": "home:comps.titleMenus", "desc": "home:comps.descMenus" },
      { link: "#/drawer/", "title": "home:comps.titleDrawer", "desc": "home:comps.descDrawer" },
      { link: "#/sidebar/", "title": "home:comps.titleSidebar", "desc": "home:comps.descSidebar" },
      { link: "#/toolbar/", "title": "home:comps.titleToolbar", "desc": "home:comps.descToolbar" },
      { link: "#/statsbar/", "title": "home:comps.titleStats", "desc": "home:comps.descStats" },
      { link: "#/panels/", "title": "home:comps.titlePanels", "desc": "home:comps.descPanels" },
      { link: "#/dialogs/", "title": "home:comps.titleDialogs", "desc": "home:comps.descDialogs" },
      { link: "#/alerts/", "title": "home:comps.titleAlerts", "desc": "home:comps.descAlerts" },
      { link: "#/breadcrumbs/", "title": "home:comps.titleCrumbs", "desc": "home:comps.descCrumbs" },
      { link: "#/tabs/", "title": "home:comps.titleTabs", "desc": "home:comps.descTabs" },
      { link: "#/tree/", "title": "home:comps.titleTree", "desc": "home:comps.descTree" },
      { link: "#/datagrid/", "title": "home:comps.titleGrid", "desc": "home:comps.descGrid" }
    ],

    apis: [
      { link: "#/api/app/", "title": "home:apis.titleApp", "desc": "home:apis.descApp" },
      { link: "#/api/http/", "title": "home:apis.titleHttp", "desc": "home:apis.descHttp" },
      { link: "#/api/data/", "title": "home:apis.titleData", "desc": "home:apis.descData" },
      { link: "#/api/event/", "title": "home:apis.titleEvent", "desc": "home:apis.descEvent" }
    ]
  }

  core = [
    { label: 'home:support.titleGlyphs', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleGrid', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleViewport', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titlePage', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleSection', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleContent', s: 1, c: 1, o: 1, f: 1, e: 1 }
  ]

  inputs = [
    { label: 'home:support.titleButton', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleText', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleMultiline', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titlePhone', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleList', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleCombo', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleTag', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleDate', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleRadio', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleCheckbox', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleSwitch', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleLanguage', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleMarkdown', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleValidation', s: 1, c: 1, o: 1, f: 1, e: 1 }
  ]

  comps = [
    { label: 'home:support.titleMenu', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleMenubar', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titlePanel', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleDialog', s: 1, c: 1, o: 1, f: 1, e: 2 },
    { label: 'home:support.titleAlerts', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleDrawer', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleToolbar', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleSidebar', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleStatsbar', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleCrumbs', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleTabs', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleTree', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleDatagrid', s: 1, c: 1, o: 1, f: 1, e: 1 }
  ]

  features = [
    { label: 'home:support.titleApp', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleHttp', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleData', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleEvent', s: 1, c: 1, o: 1, f: 1, e: 1 },
    { label: 'home:support.titleConvert', s: 1, c: 1, o: 1, f: 1, e: 1 }
  ]
}