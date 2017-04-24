//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT

declare const UA_EDGE;
declare const UA_OPERA;
declare const UA_CHROME;
declare const UA_SAFARI;
declare const UA_FIREFOX;
declare const UA_UNKNOWN

declare var Countries: ICountry;
declare var Currencies: any;
declare var FileTypes: any;
declare var FileData: any;

declare function browserAgent(): string;
declare function browserVersion(): string;

declare function isTrue(b: any): boolean;
declare function isFalse(b: any): boolean;
declare function isEmpty(a: any): boolean;
declare function isString(a: any): boolean;
declare function isNumber(a: any): boolean;
declare function isDecimal(a: any): boolean;
declare function isFunction(a: any): boolean;

declare function isRtl(el: Element | HTMLElement): boolean;

declare function getParentByTag(element: Element, selector: string, lastElement?: any): Element;
declare function getParentByClass(element: Element, selector: string, lastElement?: any): Element;

declare function convertToPx(size, context?): number;

declare function getAscii(str: string): string;

declare function escape(v: string): string;
declare function unescape(v: string): string;

declare interface Element {
  au: any;

  offsetLeft: number;
  offsetTop: number;
  offsetWidth: number;
  offsetHeight: number;

  children: HTMLCollection;
}

declare interface ICountryItem {
  continent: string;
  iso3: string;
  iso2: string;
  name: string;
  tld: string;
  currency: string;
  phone: number;
}

declare interface ICountry {
  find(iso: string): ICountryItem;
  toIso2(iso3: string): string;
  toIso3(iso2: string): string;

  list: Array<ICountry>;
}

declare interface Window {
  UA_EDGE;
  UA_OPERA;
  UA_CHROME;
  UA_SAFARI;
  UA_FIREFOX;
  UA_UNKNOWN;

  Countries: ICountry;
  Currencies: any;
  FileTypes: any;


  browserAgent(): string;
  browserVersion(): string;

  isTrue(b: any): boolean;
  isFalse(b: any): boolean;
  isEmpty(a: any): boolean;
  isString(a: any): boolean;
  isNumber(a: any): boolean;
  isDecimal(a: any): boolean;
  isFunction(a: any): boolean;

  isRtl(el: Element | HTMLElement): boolean;

  getParentByTag(element: Element, selector: string, lastElement?: any): Element;
  getParentByClass(element: Element, selector: string, lastElement?: any): Element;

  convertToPx(size, context?): number;

  getAscii(str: string): string;

  escape(v: string): string;
  unescape(v: string): string;
}
