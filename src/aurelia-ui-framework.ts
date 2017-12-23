//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { ValidationController, validateTrigger } from 'aurelia-validation';

import { UIConstants } from "./utils/ui-constants";
import { UIUtils, lodashMixins } from "./utils/ui-utils";
import { UIValidationRenderer, loadValidators } from "./utils/ui-validation";
import "auf-utility-library";

import './elements/core/ui-glyphs';
import './elements/core/ui-grid';
import './elements/core/ui-page';
import './elements/core/ui-viewport';

import './elements/components/ui-alerts';
import './elements/components/ui-bars';
import './elements/components/ui-datagrid';
import './elements/components/ui-dg-columns';
import './elements/components/ui-drawer';
import './elements/components/ui-dropdown';
import './elements/components/ui-indicators';
import './elements/components/ui-menu';
import './elements/components/ui-panel';
import './elements/components/ui-sidebar';
import './elements/components/ui-tabpanel';
import './elements/components/ui-tree';

import './elements/inputs/ui-button';
import './elements/inputs/ui-date';
import './elements/inputs/ui-form';
import './elements/inputs/ui-input';
import './elements/inputs/ui-list';
import './elements/inputs/ui-markdown';
import './elements/inputs/ui-options';
import './elements/inputs/ui-phone';
import './elements/inputs/ui-textarea';

import './attributes/ui-badge';
import './attributes/ui-colors';
import './attributes/ui-ribbon';
import './attributes/ui-tooltip';

import './value-converters/ui-lodash';
import './value-converters/ui-text';

export * from './data/ui-datamodel';
export * from './data/ui-datasource';
export * from './data/ui-treemodel';

export * from './utils/ui-application';
export * from './utils/ui-constants';
export * from './utils/ui-dialog';
export * from './utils/ui-event';
export * from './utils/ui-format';
export * from './utils/ui-http';

export interface UIConfig {
  title(t: string): UIConfig;
  subTitle(t: string): UIConfig;
  version(t: string): UIConfig;
  appKey(t: string): UIConfig;

  apiUrl(t: string): UIConfig;
  apiHeaders(t: any): UIConfig;

  languages(l: Array<any>): UIConfig;
}

export function configure(config: FrameworkConfiguration, configCallback) {
  UIUtils.auContainer = config.container;

  ValidationController.prototype.validateTrigger = validateTrigger.changeOrBlur;
  config.container.registerHandler('ui-validator', container => container.get(UIValidationRenderer));

  config.globalResources([
    PLATFORM.moduleName('./elements/core/ui-grid'),
    PLATFORM.moduleName('./elements/core/ui-page'),
    PLATFORM.moduleName('./elements/core/ui-viewport')
  ]);

  config.globalResources([
    PLATFORM.moduleName('./elements/components/ui-alerts'),
    PLATFORM.moduleName('./elements/components/ui-bars'),
    PLATFORM.moduleName('./elements/components/ui-datagrid'),
    PLATFORM.moduleName('./elements/components/ui-dg-columns'),
    PLATFORM.moduleName('./elements/components/ui-drawer'),
    PLATFORM.moduleName('./elements/components/ui-dropdown'),
    PLATFORM.moduleName('./elements/components/ui-indicators'),
    PLATFORM.moduleName('./elements/components/ui-menu'),
    PLATFORM.moduleName('./elements/components/ui-panel'),
    PLATFORM.moduleName('./elements/components/ui-sidebar'),
    PLATFORM.moduleName('./elements/components/ui-tabpanel'),
    PLATFORM.moduleName('./elements/components/ui-tree')
  ]);

  config.globalResources([
    PLATFORM.moduleName('./elements/inputs/ui-button'),
    PLATFORM.moduleName('./elements/inputs/ui-date'),
    PLATFORM.moduleName('./elements/inputs/ui-form'),
    PLATFORM.moduleName('./elements/inputs/ui-input'),
    PLATFORM.moduleName('./elements/inputs/ui-list'),
    PLATFORM.moduleName('./elements/inputs/ui-markdown'),
    PLATFORM.moduleName('./elements/inputs/ui-options'),
    PLATFORM.moduleName('./elements/inputs/ui-phone'),
    PLATFORM.moduleName('./elements/inputs/ui-textarea')
  ]);

  config.globalResources([
    PLATFORM.moduleName('./attributes/ui-badge'),
    PLATFORM.moduleName('./attributes/ui-colors'),
    PLATFORM.moduleName('./attributes/ui-ribbon'),
    PLATFORM.moduleName('./attributes/ui-tooltip')
  ]);

  config.globalResources([
    PLATFORM.moduleName('./value-converters/ui-lodash'),
    PLATFORM.moduleName('./value-converters/ui-text')
  ]);

  var Configure = {
    title: (t) => {
      UIConstants.Title = t;
      return Configure;
    },
    subTitle: (t) => {
      UIConstants.SubTitle = t;
      return Configure;
    },
    version: (t) => {
      UIConstants.Version = t;
      return Configure;
    },
    appKey: (t) => {
      UIConstants.AppKey = t;
      return Configure;
    },
    apiUrl: (t) => {
      UIConstants.Http.BaseUrl = t;
      return Configure;
    },
    apiHeaders: (t) => {
      UIConstants.Http.Headers = t;
      return Configure;
    },
    languages: (l) => {
      UIConstants.Languages = l;
      return Configure;
    }
  };

  if (configCallback !== undefined && typeof configCallback === 'function') {
    configCallback(Configure);
  }

  loadValidators();
  lodashMixins();
}
