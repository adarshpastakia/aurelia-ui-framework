/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

const UA_EDGE = "ua-edge";
const UA_OPERA = "ua-opera";
const UA_CHROME = "ua-chrome";
const UA_SAFARI = "ua-safari";
const UA_FIREFOX = "ua-firefox";
const UA_UNKNOWN = "ua-unknown";

window.browserAgent = function() {
  var ua = (navigator.userAgent || "").toLowerCase();
  if (ua.indexOf("opr") >= 0) return UA_OPERA;
  else if (ua.indexOf("edge") >= 0) return UA_EDGE;
  else if (ua.indexOf("chrome") >= 0) return UA_CHROME;
  else if (ua.indexOf("safari") >= 0) return UA_SAFARI;
  else if (ua.indexOf("firefox") >= 0) return UA_FIREFOX;
  else return UA_UNKNOWN;
};

window.isTrue = function(b) {
  return /^(true|yes|1|y|on)$/i.test(b);
};
window.isFalse = function(b) {
  return /^(false|no|0|n|off)$/i.test(b);
};
window.isNull = function(a) {
  return a === undefined || a === null;
};
window.isEmpty = function(a) {
  if (typeof a === "number") return false;
  if (typeof a === "boolean") return false;
  if (a instanceof Map || a instanceof Set) return a.size === 0;
  return a === undefined || a === null || a === "" || a.length === 0 || Object.keys(a).length == 0;
};
window.isArray = Array.isArray;
window.isDate = function(a) {
  return a instanceof Date;
};
window.isString = function(a) {
  return typeof a === "string";
};
window.isNumber = function(a) {
  return typeof a === "number" && Number.isInteger(a);
};
window.isDecimal = function(a) {
  return typeof a === "number";
};
window.isObject = function(a) {
  return a && typeof a === "object";
};
window.isFunction = function(a) {
  return typeof a === "function";
};

window.fn = () => null;
window.getView = el => (el.au && el.au.controller ? el.au.controller.view : null);
window.getViewModel = el => (el.au && el.au.controller ? el.au.controller.viewModel : null);
window.getSlotViewModel = el => el.au["au-slot"].container.parent.viewModel;
window.getComposeViewModel = el =>
  el.au && el.au.controller ? el.au.controller.viewModel.currentViewModel : null;

window.isRtl = function(el) {
  rtl = false;
  do {
    if ((el.dir || el.style.direction) == "rtl") return true;
    if ((el.dir || el.style.direction) == "ltr") return false;
    el = el.parentElement;
  } while (el != null);
  return false;
};

window.hasParent = function(el, parent) {
  do {
    if (el === parent) return true;
    el = el.parentElement;
  } while (el !== null);
  return false;
};

window.getParentByTag = function(el, selector, last) {
  do {
    if (last && last instanceof Element && el === last) return null;
    if (
      last &&
      typeof last === "string" &&
      (el.classList.contains(last) || el.tagName.toLowerCase() === last.toLowerCase())
    )
      return null;
    if (el.tagName.toLowerCase() === selector.toLowerCase()) return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
};

window.getParentByClass = function(el, selector, last) {
  do {
    if (last && last instanceof Element && el === last) return null;
    if (
      last &&
      typeof last === "string" &&
      (el.classList.contains(last) || el.tagName.toLowerCase() === last.toLowerCase())
    )
      return null;
    if (el.classList.contains(selector)) return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
};

window.convertToPx = function(size, context) {
  var baseSize = "1";
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
