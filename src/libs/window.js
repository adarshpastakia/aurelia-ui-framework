/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

const globalObject = global || window;

globalObject.UA_EDGE = "ua-edge";
globalObject.UA_OPERA = "ua-opera";
globalObject.UA_CHROME = "ua-chrome";
globalObject.UA_SAFARI = "ua-safari";
globalObject.UA_FIREFOX = "ua-firefox";
globalObject.UA_UNKNOWN = "ua-unknown";

globalObject.browserAgent = function() {
  const ua = (navigator.userAgent || "").toLowerCase();
  if (ua.indexOf("opr") >= 0) return UA_OPERA;
  else if (ua.indexOf("edge") >= 0) return UA_EDGE;
  else if (ua.indexOf("chrome") >= 0) return UA_CHROME;
  else if (ua.indexOf("safari") >= 0) return UA_SAFARI;
  else if (ua.indexOf("firefox") >= 0) return UA_FIREFOX;
  else return UA_UNKNOWN;
};

globalObject.isTrue = function(b) {
  return /^(true|yes|1|y|on)$/i.test(b);
};
globalObject.isFalse = function(b) {
  return /^(false|no|0|n|off)$/i.test(b);
};
globalObject.isNull = function(a) {
  return a === undefined || a === null;
};
globalObject.isEmpty = function(a) {
  if (typeof a === "number") return false;
  if (typeof a === "boolean") return false;
  if (a instanceof Map || a instanceof Set) return a.size === 0;
  return a === undefined || a === null || a === "" || a.length === 0 || Object.keys(a).length === 0;
};
globalObject.isArray = Array.isArray;
globalObject.isDate = function(a) {
  return a instanceof Date;
};
globalObject.isString = function(a) {
  return typeof a === "string";
};
globalObject.isNumber = function(a) {
  return typeof a === "number" && Number.isInteger(a);
};
globalObject.isDecimal = function(a) {
  return typeof a === "number";
};
globalObject.isObject = function(a) {
  return a && typeof a === "object";
};
globalObject.isFunction = function(a) {
  return typeof a === "function";
};

globalObject.fn = () => null;
globalObject.getView = el => (el.au && el.au.controller ? el.au.controller.view : null);
globalObject.getViewModel = el => (el.au && el.au.controller ? el.au.controller.viewModel : null);
globalObject.getSlotViewModel = el => el.au["au-slot"].container.parent.viewModel;
globalObject.getComposeViewModel = el =>
  el.au && el.au.controller ? el.au.controller.viewModel.currentViewModel : null;

globalObject.isRtl = function(el) {
  return window.getComputedStyle(el).direction === "rtl";
};

const isLastElement = (el, last) => {
  if (last && last instanceof Element && el === last) return true;
  else if (
    last &&
    typeof last === "string" &&
    (el.classList.contains(last) || el.tagName.toLowerCase() === last.toLowerCase())
  )
    return true;
  else
    return false;
};

globalObject.hasParent = function(el, parent, last) {
  do {
    if (parent && parent instanceof Element && el === parent) return true;
    if (
      parent &&
      typeof parent === "string" &&
      (el.classList.contains(parent) || el.tagName.toLowerCase() === parent.toLowerCase())
    )
      return true;
    if (isLastElement(el, last))
      return false;
    el = el.parentElement;
  } while (el !== null);
  return false;
};

globalObject.getParentByTag = function(el, selector, last) {
  do {
    if (isLastElement(el, last))
      return null;
    if (el.tagName.toLowerCase() === selector.toLowerCase()) return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
};

globalObject.getParentByClass = function(el, selector, last) {
  do {
    if (isLastElement(el, last))
      return null;
    if (el.classList.contains(selector)) return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
};

globalObject.convertToPx = function(size, context) {
  let baseSize = "1";
  if ((size + "").indexOf("em") > -1)
    baseSize = getComputedStyle(context || document.documentElement).fontSize;
  if ((size + "").indexOf("rem") > -1)
    baseSize = getComputedStyle(document.documentElement).fontSize;
  if ((size + "").indexOf("vw") > -1 || (size + "").indexOf("%") > -1)
    baseSize = window.innerWidth / 100;
  return parseFloat(size) * parseFloat(baseSize);
};

window.Event.prototype.stopEvent = function(preventDefault = true) {
  if (preventDefault) {
    this.preventDefault();
  }
  this.stopPropagation();
  this.stopImmediatePropagation();
};

window.CustomEvent.prototype.stopEvent = function(preventDefault = true) {
  if (preventDefault) {
    this.preventDefault();
  }
  this.stopPropagation();
  this.stopImmediatePropagation();
};
