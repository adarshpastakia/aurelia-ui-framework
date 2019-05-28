/**
import default from "../../aurelia_project/environments/dev";
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

const UA_EDGE;
const UA_OPERA;
const UA_CHROME;
const UA_SAFARI;
const UA_FIREFOX;
const UA_UNKNOWN;

const FileData: any;

function browserAgent(): string;
function browserVersion(): string;

function fn(): void;
function isNaN(value: string): boolean;
function getView(el: Element | HTMLElement): AnyObject;
function getViewModel(el: Element | HTMLElement): AnyObject;
function getSlotViewModel(el: Element | HTMLElement): AnyObject;
function getComposeViewModel(el: Element | HTMLElement): AnyObject;

function isTrue(arg: any): arg is true;
function isFalse(arg: any): arg is false;
function isNull(arg: any): boolean;
function isEmpty(arg: any): boolean;
function isDate(arg: any): arg is Date;
function isArray(arg: any): arg is Array<any>;
function isString(arg: any): arg is String;
function isNumber(arg: any): arg is number;
function isDecimal(arg: any): arg is number;
function isObject(arg: any): arg is AnyObject;
function isFunction(arg: any): arg is Function;

function isRtl(el: Element | HTMLElement): boolean;

function hasParent(
  element: Element | HTMLElement,
  parent: string | Element | HTMLElement,
  lastElement?: string | Element | HTMLElement
): boolean;
function getParentByTag(
  element: Element | HTMLElement,
  selector: string,
  lastElement?: string | Element | HTMLElement
): HTMLElement | undefined;
function getParentByClass(
  element: Element | HTMLElement,
  selector: string,
  lastElement?: string | Element | HTMLElement
): HTMLElement | undefined;

function convertToPx(size, context?): number;

function escape(v: string): string;
function unescape(v: string): string;

type AnyObject = Array | Object | string | number | boolean | undefined;

interface KeyValue {
  [key: string]: AnyObject;
}

module "*.json" {
  const value: KeyValue;
  export default value;
}
module "*.png" {
  export default value;
}
module "*.svg" {
  export default value;
}
module "*.html" {
  export default value;
}

interface Event {
  stopEvent(preventDefault?): void;
}

interface MouseEvent {
  target: HTMLElement;
}

interface CustomEvent {
  detail: AnyObject;
  stopEvent(preventDefault?): void;
}

interface Element {
  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;
  offsetHeight: number;

  children: HTMLCollection;

  au: {
    controller: {
      controllers: AnyObject[];
      view: View;
      viewModel: AnyObject;
    };
  };
}

interface ICountryItem {
  continent: string;
  iso3: string;
  iso2: string;
  name: string;
  fullname: string;
  capital: string;
  tld: string;
  currency: string;
  phone: string;
}

interface ICountry {
  find(iso: string): ICountryItem;
  toIso2(iso3: string): string;
  toIso3(iso2: string): string;

  list: Array<ICountryItem>;
}
