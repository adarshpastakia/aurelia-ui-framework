import {FrameworkConfiguration} from 'aurelia-framework';

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

export * from './utils/ui-event';
export * from './utils/ui-format';
export * from './utils/ui-tree-model';
export * from './utils/ui-utils';

import './elements/core/ui-grid';
import './elements/core/ui-page';
import './elements/core/ui-viewport';

import './elements/inputs/ui-button';
import './elements/inputs/ui-form';
import './elements/inputs/ui-input';
import './elements/inputs/ui-lists';
import './elements/inputs/ui-options';
import './elements/inputs/ui-phone';
import './elements/inputs/ui-textarea';

import './elements/components/ui-bars';
import './elements/components/ui-breadcrumb';
import './elements/components/ui-drawer';
import './elements/components/ui-dropdown';
import './elements/components/ui-menu';
import './elements/components/ui-panel';
import './elements/components/ui-alerts';
import './elements/components/ui-sidebar';
import './elements/components/ui-tab';
import './elements/components/ui-tree';

export function configure(config: FrameworkConfiguration) {
  // Core Elements
  config.globalResources([
    './elements/core/ui-viewport',
    './elements/core/ui-grid',
    './elements/core/ui-page'
  ]);
  // Input Elements
  config.globalResources([
    './elements/inputs/ui-form',
    './elements/inputs/ui-button',
    './elements/inputs/ui-input',
    './elements/inputs/ui-phone',
    './elements/inputs/ui-lists',
    './elements/inputs/ui-options',
    './elements/inputs/ui-textarea'
  ]);
  // Components
  config.globalResources([
    './elements/components/ui-panel',
    './elements/components/ui-tab',
    './elements/components/ui-bars',
    './elements/components/ui-menu',
    './elements/components/ui-tree',
    './elements/components/ui-alerts',
    './elements/components/ui-drawer',
    './elements/components/ui-sidebar',
    './elements/components/ui-dropdown',
    './elements/components/ui-breadcrumb'
  ]);
  // Value Converters
  config.globalResources([
    './value-converters/ui-text',
    './value-converters/ui-lodash'
  ]);

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
