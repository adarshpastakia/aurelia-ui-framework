import {FrameworkConfiguration} from 'aurelia-framework';

import 'lodash';
import 'moment';
import 'numeral';

import './libs/window';
import './libs/phonelib';
import './libs/countries';
import './libs/currencies';
import './libs/filetypes';

import * as ld from "lodash";
import * as km from "kramed";
import * as mm from "moment";
import * as nm from "numeral";

export var _ = ld;
export var kramed = km;
export var moment = mm;
export var numeral = nm;

export * from './utils/ui-utils';
export * from './utils/ui-event';

import './elements/core/ui-viewport';

import './elements/core/ui-grid';
import './elements/core/ui-page';

import './elements/inputs/ui-form';
import './elements/inputs/ui-input';
import './elements/inputs/ui-textarea';

import './elements/components/ui-panel';
import './elements/components/ui-drawer';
import './elements/components/ui-dropdown';

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
    './elements/inputs/ui-input',
    './elements/inputs/ui-phone',
    './elements/inputs/ui-options',
    './elements/inputs/ui-textarea'
  ]);
  // Components
  config.globalResources([
    './elements/components/ui-panel',
    './elements/components/ui-drawer',
    './elements/components/ui-dropdown'
  ]);
}
