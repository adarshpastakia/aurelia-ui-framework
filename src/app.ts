// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

@autoinject()
export class App {
  router: Router;
  configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;
    // config.title = UIConstants.App.Title;
    config.mapUnknownRoutes({
      route: '404',
      moduleId: './home/view',
      activationStrategy: 'replace',
      settings: { data: '404' }
    });
    config.map([
      {
        route: ['', 'home'],
        moduleId: './home/view',
        title: 'Home',
        nav: false,
        auth: false,
        name: 'home'
      }, {
        route: 'start',
        moduleId: './home/start',
        title: 'Getting Started',
        nav: true,
        auth: false,
        settings: { section: 'Framework' },
        name: 'start'
      }, {
        route: 'example',
        moduleId: './home/example',
        title: 'App Example',
        nav: true,
        auth: false,
        settings: { section: 'Framework' },
        name: 'example'
      }, {
        route: 'theme/*path',
        moduleId: './styles/view',
        nav: false,
        auth: false,
        name: 'theme'
      }, {
        route: 'inputs/*path',
        moduleId: './inputs/view',
        nav: false,
        auth: false,
        name: 'inputs'
      }, {
        route: 'theme-home',
        redirect: 'theme/home',
        title: 'Overview',
        nav: true,
        auth: false,
        settings: { section: 'Theming' },
        name: 'theme'
      }, {
        route: 'theme-typo',
        redirect: 'theme/typo',
        title: 'Typography',
        nav: true,
        auth: false,
        settings: { section: 'Theming' },
        name: 'theme'
      }, {
        route: 'theme-glyphs',
        redirect: 'theme/glyphs',
        title: 'Icon Glyphs',
        nav: true,
        auth: false,
        settings: { section: 'Theming' },
        name: 'glyphs'
      }, {
        route: 'theme-flags',
        redirect: 'theme/flags',
        title: 'Flag Icons',
        nav: true,
        auth: false,
        settings: { section: 'Theming' },
        name: 'theme'
      }, {
        route: 'viewport',
        moduleId: './core/viewport',
        title: 'Viewport',
        nav: true,
        auth: false,
        settings: { section: 'Core Elements' },
        name: 'viewport'
      }, {
        route: 'pages',
        moduleId: './core/pages',
        title: 'Pages',
        nav: true,
        auth: false,
        settings: { section: 'Core Elements' },
        name: 'pages'
      }, {
        route: 'grid',
        moduleId: './core/grid',
        title: 'Responsive Grid',
        nav: true,
        auth: false,
        settings: { section: 'Core Elements' },
        name: 'grid'
      }, {
        route: 'inputs-buttons',
        redirect: 'inputs/buttons',
        title: 'Buttons',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'buttons'
      }, {
        route: 'inputs-basic',
        redirect: 'inputs/basic',
        title: 'Text Inputs',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'inputs'
      }, {
        route: 'inputs-option',
        redirect: 'inputs/options',
        title: 'Option Inputs',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'option'
      }, {
        route: 'inputs-list',
        redirect: 'inputs/lists',
        title: 'List Inputs',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'list'
      }, {
        route: 'inputs-date',
        redirect: 'inputs/dates',
        title: 'Date/Time Inputs',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'date'
      }, {
        route: 'inputs-content',
        redirect: 'inputs/content',
        title: 'Content Editor',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'content'
      }, {
        route: 'inputs-validation',
        redirect: 'inputs/validation',
        title: 'Validation',
        nav: true,
        auth: false,
        settings: { section: 'Input Elements' },
        name: 'validation'
      }, {
        route: 'menus',
        moduleId: './components/menus',
        title: 'Menus',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'menus'
      }, {
        route: 'drawer',
        moduleId: './components/drawers',
        title: 'Drawers',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'drawer'
      }, {
        route: 'sidebar',
        moduleId: './components/sidebar',
        title: 'Sidebar',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'sidebar'
      }, {
        route: 'toolbar',
        moduleId: './components/toolbars',
        title: 'Toolbar',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'toolbar'
      }, {
        route: 'statsbar',
        moduleId: './components/statsbar',
        title: 'Statsbar',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'statsbar'
      }, {
        route: 'panels',
        moduleId: './components/panels',
        title: 'Panels',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'panels'
      }, {
        route: 'dialog',
        moduleId: './components/dialog',
        title: 'Dialogs',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'dialog'
      }, {
        route: 'datagrid',
        moduleId: './components/datagrid',
        title: 'Datagrid',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'datagrid'
      }, {
        route: 'breadcrumbs',
        moduleId: './components/breadcrumbs',
        title: 'Breadcrumbs',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'breadcrumbs'
      }, {
        route: 'tabs',
        moduleId: './components/tabs',
        title: 'Tab Panel',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'tabs'
      }, {
        route: 'tree',
        moduleId: './components/tree',
        title: 'Tree Panel',
        nav: true,
        auth: false,
        settings: { section: 'UI Components' },
        name: 'tree'
      }]);
  }
}
