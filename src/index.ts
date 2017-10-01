import { FrameworkConfiguration, Container } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import { ValidationRules, Validator, ValidationController, validateTrigger } from 'aurelia-validation';
import { UIValidationRenderer, loadValidators } from "./utils/ui-validation";
import { UIConstants } from "./utils/ui-constants";
import { UIUtils, lodashMixins } from "./utils/ui-utils";

import 'lodash';
import 'moment';
import 'numeral';

import './libs/countries';
import './libs/currencies';
import './libs/filetypes';
import './libs/phonelib';
import './libs/window';

import * as ld from "lodash";
import * as km from "kramed";
import * as mm from "moment";
import * as nm from "numeral";

export var _ = ld;
export var kramed = km;
export var moment = mm;
export var numeral = nm;

export * from './utils/ui-application';
export * from './utils/ui-constants';
export * from './utils/ui-dialog';
export * from './utils/ui-event';
export * from './utils/ui-format';
export * from './utils/ui-http';

export * from './data/ui-data-source';
export * from './data/ui-data-model';
export * from './data/ui-tree-model';
export { UIValidationRenderer } from './utils/ui-validation';
// TODO: Remove utils export, private for framework only
export * from './utils/ui-utils';

// import './elements/core/ui-grid';
// import './elements/core/ui-page';
// import './elements/core/ui-viewport';
//
// import './elements/inputs/ui-button';
// import './elements/inputs/ui-date';
// import './elements/inputs/ui-form';
// import './elements/inputs/ui-input';
// import './elements/inputs/ui-lists';
// import './elements/inputs/ui-markdown';
// import './elements/inputs/ui-options';
// import './elements/inputs/ui-phone';
// import './elements/inputs/ui-textarea';
//
// import './elements/components/ui-alerts';
// import './elements/components/ui-bars';
// import './elements/components/ui-breadcrumb';
// import './elements/components/ui-datagrid';
// import './elements/components/ui-dg-columns';
// import './elements/components/ui-drawer';
// import './elements/components/ui-dropdown';
// import './elements/components/ui-menu';
// import './elements/components/ui-panel';
// import './elements/components/ui-sidebar';
// import './elements/components/ui-tab';
// import './elements/components/ui-tree';
//
// import './attributes/ui-badge';
// import './attributes/ui-ribbon';
// import './attributes/ui-tooltip';
// import './attributes/md-view';
//
// import './value-converters/ui-lodash';
// import './value-converters/ui-text';
//
// import 'text!./ui-glyphs.html';

export interface UIConfig {
  title(t: string): UIConfig;
  subTitle(t: string): UIConfig;
  version(t: string): UIConfig;
  appKey(t: string): UIConfig;

  apiUrl(t: string): UIConfig;
  apiHeaders(t: any): UIConfig;
  sendAuthHeader(t: boolean): UIConfig;

  languages(l: Array<any>): UIConfig;
}

export function configure(config: { container: Container, globalResources?: (...resources: string[]) => any }, configCallback) {
  UIUtils.auContainer = config.container;
  document.documentElement.classList.add(window.browserAgent());

  ValidationController.prototype.validateTrigger = validateTrigger.changeOrBlur;
  config.container.registerHandler('ui-validator', container => container.get(UIValidationRenderer));
  if (config.globalResources) {
    // Core Elements
    config.globalResources(
      PLATFORM.moduleName('./elements/core/ui-grid'),
      PLATFORM.moduleName('./elements/core/ui-page'),
      PLATFORM.moduleName('./elements/core/ui-viewport')
    );
    // Input Elements
    config.globalResources(
      PLATFORM.moduleName('./elements/inputs/ui-button'),
      PLATFORM.moduleName('./elements/inputs/ui-date'),
      PLATFORM.moduleName('./elements/inputs/ui-form'),
      PLATFORM.moduleName('./elements/inputs/ui-input'),
      PLATFORM.moduleName('./elements/inputs/ui-lists'),
      PLATFORM.moduleName('./elements/inputs/ui-options'),
      PLATFORM.moduleName('./elements/inputs/ui-phone'),
      PLATFORM.moduleName('./elements/inputs/ui-textarea'),
      PLATFORM.moduleName('./elements/inputs/ui-markdown')
    );
    // Components
    config.globalResources(
      PLATFORM.moduleName('./elements/components/ui-alerts'),
      PLATFORM.moduleName('./elements/components/ui-bars'),
      PLATFORM.moduleName('./elements/components/ui-breadcrumb'),
      PLATFORM.moduleName('./elements/components/ui-datagrid'),
      PLATFORM.moduleName('./elements/components/ui-dg-columns'),
      PLATFORM.moduleName('./elements/components/ui-drawer'),
      PLATFORM.moduleName('./elements/components/ui-dropdown'),
      PLATFORM.moduleName('./elements/components/ui-menu'),
      PLATFORM.moduleName('./elements/components/ui-panel'),
      PLATFORM.moduleName('./elements/components/ui-sidebar'),
      PLATFORM.moduleName('./elements/components/ui-tab'),
      PLATFORM.moduleName('./elements/components/ui-tree')
    );
    // Attributes
    config.globalResources(
      PLATFORM.moduleName('./attributes/ui-badge'),
      PLATFORM.moduleName('./attributes/ui-ribbon'),
      PLATFORM.moduleName('./attributes/ui-tooltip'),
      PLATFORM.moduleName('./attributes/md-view')
    );
    // Value Converters
    config.globalResources(
      PLATFORM.moduleName('./value-converters/ui-lodash'),
      PLATFORM.moduleName('./value-converters/ui-text')
    );
  }
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
    sendAuthHeader: (t) => {
      UIConstants.Http.AuthorizationHeader = t;
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
