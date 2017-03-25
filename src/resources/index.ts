import {FrameworkConfiguration} from 'aurelia-framework';
import {ValidationRules, Validator, ValidationController, validateTrigger} from 'aurelia-validation';
import {UIValidationRenderer} from "./utils/ui-validation";
import {UIConstants} from "./utils/ui-constants";
import {UIUtils} from "./utils/ui-utils";

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
export * from './utils/ui-model';
export * from './utils/ui-tree-model';
export * from './utils/ui-utils';

import './elements/core/ui-grid';
import './elements/core/ui-page';
import './elements/core/ui-viewport';

import './elements/inputs/ui-button';
import './elements/inputs/ui-date';
import './elements/inputs/ui-form';
import './elements/inputs/ui-input';
import './elements/inputs/ui-lists';
import './elements/inputs/ui-markdown';
import './elements/inputs/ui-options';
import './elements/inputs/ui-phone';
import './elements/inputs/ui-textarea';

import './elements/components/ui-alerts';
import './elements/components/ui-bars';
import './elements/components/ui-breadcrumb';
import './elements/components/ui-datagrid';
import './elements/components/ui-dg-columns';
import './elements/components/ui-drawer';
import './elements/components/ui-dropdown';
import './elements/components/ui-menu';
import './elements/components/ui-panel';
import './elements/components/ui-sidebar';
import './elements/components/ui-tab';
import './elements/components/ui-tree';

import './attributes/ui-badge';
import './attributes/md-view';

import './value-converters/ui-lodash';
import './value-converters/ui-text';

import 'text!./ui-glyphs.html';

export interface UIConfig {
  title(t: string): UIConfig;
  version(t: string): UIConfig;
  appKey(t: string): UIConfig;

  apiUrl(t: string): UIConfig;
  apiHeaders(t: any): UIConfig;
  sendAuthHeader(t: boolean): UIConfig;

  languages(l: Array<any>): UIConfig;
}

export function configure(config: FrameworkConfiguration, configCallback) {
  UIUtils.auContainer = config.container;

  ValidationController.prototype.validateTrigger = validateTrigger.changeOrBlur;
  config.container.registerHandler('ui-validator', container => container.get(UIValidationRenderer));
  // Core Elements
  config.globalResources([
    './elements/core/ui-grid',
    './elements/core/ui-page',
    './elements/core/ui-viewport'
  ]);
  // Input Elements
  config.globalResources([
    './elements/inputs/ui-button',
    './elements/inputs/ui-date',
    './elements/inputs/ui-form',
    './elements/inputs/ui-input',
    './elements/inputs/ui-lists',
    './elements/inputs/ui-options',
    './elements/inputs/ui-phone',
    './elements/inputs/ui-textarea',
    './elements/inputs/ui-markdown'
  ]);
  // Components
  config.globalResources([
    './elements/components/ui-alerts',
    './elements/components/ui-bars',
    './elements/components/ui-breadcrumb',
    './elements/components/ui-datagrid',
    './elements/components/ui-dg-columns',
    './elements/components/ui-drawer',
    './elements/components/ui-dropdown',
    './elements/components/ui-menu',
    './elements/components/ui-panel',
    './elements/components/ui-sidebar',
    './elements/components/ui-tab',
    './elements/components/ui-tree'
  ]);
  // Attributes
  config.globalResources([
    './attributes/ui-badge',
    './attributes/md-view'
  ]);
  // Value Converters
  config.globalResources([
    './value-converters/ui-lodash',
    './value-converters/ui-text'
  ]);

  var Configure = {
    title: (t) => {
      UIConstants.App.Title = t;
      return Configure;
    },
    version: (t) => {
      UIConstants.App.Version = t;
      return Configure;
    },
    appKey: (t) => {
      UIConstants.App.Key = t;
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

  // Validation Rules
  let validator = UIUtils.lazy(Validator);
  ValidationRules
    .customRule('phone', (value, obj) => value === null || value === undefined || value === '' || PhoneLib.isValid(value), '\${$displayName } is not a valid phone number.');
  ValidationRules
    .customRule('number', (value, obj, min, max) => value === null || value === undefined || value === '' || (Number.isInteger(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)),
    '\${$displayName} must be an number value between \${$config.min} and \${$config.max}.', (min, max) => ({ min, max }));
  ValidationRules
    .customRule('decimal', (value, obj, min, max) => value === null || value === undefined || value === '' || (isNumber(value) && Math.floor(value % 1) === 0 && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)),
    '\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.', (min, max) => ({ min, max }));
  ValidationRules
    .customRule('language', (map, obj, langs = '') => {
      let promises = [];
      map.__errored__ = [];
      _.forEach(map, (model, key) => {
        if (model && key != '__errored__') {
          promises.push(validator.validateObject(model)
            .then(e => {
              if (_.filter(e, ['valid', false]).length > 0) {
                map.__errored__.push(key);
                return true;
              }
              return false;
            }));
        }
      });
      return Promise.all(promises).then(e => _.filter(e).length == 0);
    }, 'Some language entries contain invalid values');

  // LoDash Mixins
  _.mixin({
    'findByValues': function(collection, property, values) {
      if (_.isArray(collection)) {
        return _.filter(collection, function(item) {
          return _.indexOf(values, item[property] + '') > -1;
        });
      }
      else {
        let ret = [];
        _.forEach(collection, function(list) {
          ret.concat(_.filter(list, function(item) {
            return _.indexOf(values, item[property] + '') > -1;
          }));
        });
        return ret;
      }
    },
    'removeByValues': function(collection, property, values) {
      if (_.isArray(collection)) {
        return _.remove(collection, function(item) {
          return _.indexOf(values, item[property] + '') > -1;
        }) || [];
      }
      else {
        let ret = [];
        _.forEach(collection, function(list, key) {
          ret = ret.concat(_.remove(list, function(item) {
            return _.indexOf(values, item[property] + '') > -1;
          }));
        });
        return ret;
      }
    },
    'findDeep': function(collection, property, value) {
      if (_.isArray(collection)) {
        return _.find(collection, function(item) {
          return item[property] + '' === value + '';
        });
      }
      else {
        let ret;
        _.forEach(collection, function(item) {
          ret = _.find(item, v => {
            return v[property] + '' === value + '';
          });
          return ret === undefined;
        });
        return ret || {};
      }
    },
    'findChildren': function(collection, listProperty, property, value) {
      let ret;
      _.forEach(collection, function(item) {
        ret = _.find(item[listProperty], v => {
          return v[property] + '' === value + '';
        });
        return ret === undefined;
      });
      return ret || {};
    }
  });
}
