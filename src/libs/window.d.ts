/**
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

var Countries: ICountry;
var Currencies: KeyValue;
var FileTypes: KeyValue;
var FileData: any;

function browserAgent(): string;
function browserVersion(): string;

function fn(): void;
function getView(el: Element | HTMLElement): AnyObject;
function getViewModel(el: Element | HTMLElement): AnyObject;
function getSlotViewModel(el: Element | HTMLElement): AnyObject;
function getComposeViewModel(el: Element | HTMLElement): AnyObject;

function isTrue(b: any): arg is true;
function isFalse(b: any): arg is false;
function isNull(a: any): arg is null;
function isEmpty(a: any): arg is undefined;
const isArray = Array.isArray;
function isString(a: any): arg is String;
function isNumber(a: any): arg is number;
function isDecimal(a: any): arg is number;
function isObject(a: any): arg is AnyObject;
function isFunction(a: any): arg is AnyObject;

function isRtl(el: Element | HTMLElement): boolean;

function hasParent(element: Element | HTMLElement, parent: Element | HTMLElement): boolean;
function getParentByTag(
  element: Element | HTMLElement,
  selector: string,
  lastElement?: any
): Element;
function getParentByClass(
  element: Element | HTMLElement,
  selector: string,
  lastElement?: any
): Element;

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

interface Event {
  stopEvent(preventDefault?): void;
}

interface CustomEvent {
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

  list: Array<ICountry>;
}
