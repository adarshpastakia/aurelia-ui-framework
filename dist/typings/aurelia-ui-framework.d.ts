import { Container } from 'aurelia-framework';
import 'lodash';
import 'moment';
import 'numeral';
import './libs/countries';
import './libs/currencies';
import './libs/filetypes';
import './libs/phonelib';
import './libs/window';
import * as ld from "lodash";
import * as mm from "moment";
export declare var _: ld.LoDashStatic;
export declare var kramed: KramedStatic;
export declare var moment: typeof mm;
export declare var numeral: any;
export * from './utils/ui-application';
export * from './utils/ui-constants';
export * from './utils/ui-dialog';
export * from './utils/ui-event';
export * from './utils/ui-format';
export * from './utils/ui-http';
export * from './data/ui-data-source';
export * from './data/ui-data-model';
export * from './data/ui-tree-model';
export * from './utils/ui-utils';
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
export declare function configure(config: {
    container: Container;
    globalResources?: (...resources: string[]) => any;
}, configCallback: any): void;
