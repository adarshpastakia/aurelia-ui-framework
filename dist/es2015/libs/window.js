// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

window.UA_EDGE = "ua-edge";
window.UA_OPERA = "ua-opera";
window.UA_CHROME = "ua-chrome";
window.UA_SAFARI = "ua-safari";
window.UA_FIREFOX = "ua-firefox";
window.UA_UNKNOWN = "ua-unknown";

window.browserAgent = function() {
  var ua = (navigator.userAgent || '').toLowerCase();
  if (ua.indexOf('opr') >= 0) return UA_OPERA;
  else if (ua.indexOf('edge') >= 0) return UA_EDGE;
  else if (ua.indexOf('chrome') >= 0) return UA_CHROME;
  else if (ua.indexOf('safari') >= 0) return UA_SAFARI;
  else if (ua.indexOf('firefox') >= 0) return UA_FIREFOX;
  else return UA_UNKNOWN;
}

window.isTrue = function(b) {
  return (/^(true|yes|1|y|on)$/i).test(b);
}
window.isFalse = function(b) {
  return (/^(false|no|0|n|off)$/i).test(b);
}
window.isEmpty = function(a) {
  if (typeof a === 'number') return false;
  return a === undefined || a === null || a === '' || a.length === 0 || Object.keys(a).length == 0;
}
window.isString = function(a) {
  return (typeof a === 'string');
}
window.isNumber = function(a) {
  return (typeof a === 'number');
}
window.isDecimal = function(a) {
  return (typeof a === 'number' && a % 1 > 0);
}
window.isFunction = function(a) {
  return (typeof a === 'function');
}

window.getParentByTag = function(el, selector, last) {
  do {
    if (last && last instanceof Element && el === last) return null;
    if (last && (typeof last) === 'string' && (el.classList.contains(last) || el.tagName.toLowerCase() === last.toLowerCase())) return null;
    if (el.tagName.toLowerCase() === selector.toLowerCase()) return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
}

window.getParentByClass = function(el, selector, last) {
  do {
    if (last && last instanceof Element && el === last) return null;
    if (last && (typeof last) === 'string' && (el.classList.contains(last) || el.tagName.toLowerCase() === last.toLowerCase())) return null;
    if (el.classList.contains(selector)) return el;
    el = el.parentElement;
  } while (el !== null);
  return null;
}

window.convertToPx = function(size, context) {
  var baseSize = '1';
  if ((size + '').indexOf('em') > -1) baseSize = getComputedStyle(context || document.documentElement).fontSize;
  if ((size + '').indexOf('rem') > -1) baseSize = getComputedStyle(document.documentElement).fontSize;
  return (parseFloat(size) * parseFloat(baseSize));
}

window.getAscii = function(str) {
  if (isEmpty(str)) return '';
  var conversions = {};
  conversions['ae'] = 'ä|æ|ǽ';
  conversions['oe'] = 'ö|œ';
  conversions['ue'] = 'ü';
  conversions['Ae'] = 'Ä';
  conversions['Ue'] = 'Ü';
  conversions['Oe'] = 'Ö';
  conversions['A'] = 'À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ';
  conversions['a'] = 'à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª';
  conversions['C'] = 'Ç|Ć|Ĉ|Ċ|Č';
  conversions['c'] = 'ç|ć|ĉ|ċ|č';
  conversions['D'] = 'Ð|Ď|Đ';
  conversions['d'] = 'ð|ď|đ';
  conversions['E'] = 'È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě';
  conversions['e'] = 'è|é|ê|ë|ē|ĕ|ė|ę|ě';
  conversions['G'] = 'Ĝ|Ğ|Ġ|Ģ';
  conversions['g'] = 'ĝ|ğ|ġ|ģ';
  conversions['H'] = 'Ĥ|Ħ';
  conversions['h'] = 'ĥ|ħ';
  conversions['I'] = 'Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ';
  conversions['i'] = 'ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı';
  conversions['J'] = 'Ĵ';
  conversions['j'] = 'ĵ';
  conversions['K'] = 'Ķ';
  conversions['k'] = 'ķ';
  conversions['L'] = 'Ĺ|Ļ|Ľ|Ŀ|Ł';
  conversions['l'] = 'ĺ|ļ|ľ|ŀ|ł';
  conversions['N'] = 'Ñ|Ń|Ņ|Ň';
  conversions['n'] = 'ñ|ń|ņ|ň|ŉ';
  conversions['O'] = 'Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ';
  conversions['o'] = 'ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º';
  conversions['R'] = 'Ŕ|Ŗ|Ř';
  conversions['r'] = 'ŕ|ŗ|ř';
  conversions['S'] = 'Ś|Ŝ|Ş|Š';
  conversions['s'] = 'ś|ŝ|ş|š|ſ';
  conversions['T'] = 'Ţ|Ť|Ŧ';
  conversions['t'] = 'ţ|ť|ŧ';
  conversions['U'] = 'Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ';
  conversions['u'] = 'ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ';
  conversions['Y'] = 'Ý|Ÿ|Ŷ';
  conversions['y'] = 'ý|ÿ|ŷ';
  conversions['W'] = 'Ŵ';
  conversions['w'] = 'ŵ';
  conversions['Z'] = 'Ź|Ż|Ž';
  conversions['z'] = 'ź|ż|ž';
  conversions['AE'] = 'Æ|Ǽ';
  conversions['ss'] = 'ß';
  conversions['IJ'] = 'Ĳ';
  conversions['ij'] = 'ĳ';
  conversions['OE'] = 'Œ';
  conversions['f'] = 'ƒ';
  for (var i in conversions) {
    var re = new RegExp(conversions[i], "g");
    str = str.replace(re, i);
  }
  return str;
}