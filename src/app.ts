//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import {UIApplication} from "./resources/utils/ui-application";
import {UIConstants} from "./resources/utils/ui-constants";
import {UIEvent} from "./resources/utils/ui-event";
import * as moment from "moment";

@autoinject()
export class App {
  router: Router;
  constants = UIConstants;

  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.title = UIConstants.Title;
    config.mapUnknownRoutes({
      route: '404', moduleId: './home/view', activationStrategy: 'replace', settings: { data: '404' }
    });
    config.map([
      {
        route: ['', 'home'], moduleId: './home/view', nav: false, auth: false, name: 'home'
      }, {
        route: 'start', moduleId: './start/view', title: 'nav.titleStart', nav: true, auth: false, settings: { section: 'nav.sectionFramework' }, name: 'start'
      }, {
        route: 'example', moduleId: './home/example', title: 'nav.titleExamples', nav: true, auth: false, settings: { section: 'nav.sectionFramework' }, name: 'example'
      }, {
        route: 'theme/*path', moduleId: './styles/view', title: 'nav.sectionTheming', nav: false, auth: false, name: 'theme'
      }, {
        route: 'inputs/*path', moduleId: './inputs/view', title: 'nav.sectionInputs', nav: false, auth: false, name: 'inputs'
      }, {
        route: 'api/*path', moduleId: './api/view', title: 'nav.sectionApi', nav: false, auth: false, name: 'api'
      }, {
        route: 'theme-home', redirect: 'theme/home', title: 'nav.titleOverview', nav: true, auth: false, settings: { section: 'nav.sectionTheming' }, name: 'theme'
      }, {
        route: 'theme-typo', redirect: 'theme/typo', title: 'nav.titleTypo', nav: true, auth: false, settings: { section: 'nav.sectionTheming' }, name: 'theme'
      }, {
        route: 'theme-glyphs', redirect: 'theme/glyphs', title: 'nav.titleGlyphs', nav: true, auth: false, settings: { section: 'nav.sectionTheming' }, name: 'glyphs'
      }, {
        route: 'theme-flags', redirect: 'theme/flags', title: 'nav.titleFlags', nav: true, auth: false, settings: { section: 'nav.sectionTheming' }, name: 'theme'
      }, {
        route: 'viewport', moduleId: './core/viewport', title: 'nav.titleViewport', nav: true, auth: false, settings: { section: 'nav.sectionCore' }, name: 'viewport'
      }, {
        route: 'pages', moduleId: './core/pages', title: 'nav.titlePages', nav: true, auth: false, settings: { section: 'nav.sectionCore' }, name: 'pages'
      }, {
        route: 'grid', moduleId: './core/grid', title: 'nav.titleGrid', nav: true, auth: false, settings: { section: 'nav.sectionCore' }, name: 'grid'
      }, {
        route: 'inputs-buttons', redirect: 'inputs/buttons', title: 'nav.titleButtons', nav: true, auth: false, settings: { section: 'nav.sectionInputs' }, name: 'buttons'
      }, {
        route: 'inputs-basic', redirect: 'inputs/basic', title: 'nav.titleText', nav: true, auth: false, settings: { section: 'nav.sectionInputs' }, name: 'inputs'
      }, {
        route: 'inputs-option', redirect: 'inputs/options', title: 'nav.titleOption', nav: true, auth: false, settings: { section: 'nav.sectionInputs' }, name: 'option'
      }, {
        route: 'inputs-list', redirect: 'inputs/lists', title: 'nav.titleLists', nav: true, auth: false, settings: { section: 'nav.sectionInputs' }, name: 'list'
      }, {
        route: 'inputs-date', redirect: 'inputs/dates', title: 'nav.titleDate', nav: true, auth: false, settings: { section: 'nav.sectionInputs' }, name: 'date'
      }, {
        route: 'inputs-content', redirect: 'inputs/content', title: 'nav.titleMarkdown', nav: true, auth: false, settings: { section: 'nav.sectionInputs' }, name: 'content'
      }, {
        route: 'inputs-validation', redirect: 'inputs/validation', title: 'nav.titleValidation', nav: true, auth: false, settings: { section: 'nav.sectionInputs' }, name: 'validation'
      }, {
        route: 'menus', moduleId: './components/menus', title: 'nav.titleMenus', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'menus'
      }, {
        route: 'drawer', moduleId: './components/drawers', title: 'nav.titleDrawer', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'drawer'
      }, {
        route: 'sidebar', moduleId: './components/sidebar', title: 'nav.titleSidebar', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'sidebar'
      }, {
        route: 'toolbar', moduleId: './components/toolbars', title: 'nav.titleToolbar', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'toolbar'
      }, {
        route: 'statsbar', moduleId: './components/statsbar', title: 'nav.titleStats', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'statsbar'
      }, {
        route: 'panels', moduleId: './components/panels', title: 'nav.titlePanels', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'panels'
      }, {
        route: 'dialogs', moduleId: './components/dialogs', title: 'nav.titleDialogs', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'dialogs'
      }, {
        route: 'alerts', moduleId: './components/alerts', title: 'nav.titleAlerts', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'alerts'
      }, {
        route: 'datagrid', moduleId: './components/datagrid', title: 'nav.titleDatagrid', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'datagrid'
      }, {
        route: 'breadcrumbs', moduleId: './components/breadcrumbs', title: 'nav.titleCrumbs', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'breadcrumbs'
      }, {
        route: 'tabs', moduleId: './components/tabs', title: 'nav.titleTabs', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'tabs'
      }, {
        route: 'tree', moduleId: './components/tree', title: 'nav.titleTree', nav: true, auth: false, settings: { section: 'nav.sectionComponents' }, name: 'tree'
      }, {
        route: 'api-app', redirect: 'api/app', title: 'nav.titleApp', nav: true, auth: false, settings: { section: 'nav.sectionApi' }, name: 'app'
      }, {
        route: 'api-http', redirect: 'api/http', title: 'nav.titleHttp', nav: true, auth: false, settings: { section: 'nav.sectionApi' }, name: 'http'
      }, {
        route: 'api-data', redirect: 'api/data', title: 'nav.titleData', nav: true, auth: false, settings: { section: 'nav.sectionApi' }, name: 'data'
      }, {
        route: 'api-event', redirect: 'api/event', title: 'nav.titleEvent', nav: true, auth: false, settings: { section: 'nav.sectionApi' }, name: 'event'
      }]);
  }


  constructor(public element: Element, public i18n: I18N, public app: UIApplication) {
    UIEvent.subscribe('i18n:locale:changed', payload => this.i18n.updateTranslations(this.element));
    this.i18n.setLocale(this.currentLocale = app.persist('locale') || 'en');
  }

  attached() {
    // Load initial translations
    this.i18n.updateTranslations(this.element)
  }

  currentLocale;
  updateLocale() {
    this.app.isBusy = true;
    this.i18n.setLocale(this.currentLocale).then(() => {
      this.app.persist('locale', this.currentLocale);
      setTimeout(() => this.app.isBusy = false, 50);
    });
  }
}
