/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

String.prototype.interpolate = function(model) {
  return this.replace(/\${([^{}]*)}/g, function(a, b) {
    const r = model[b];
    return typeof r === "string" || typeof r === "number" ? r : a;
  });
};

String.prototype.ascii = function() {
  let str = this.toString();
  if (isEmpty(str)) return "";
  const conversions = {};
  conversions["ae"] = "ä|æ|ǽ";
  conversions["oe"] = "ö|œ";
  conversions["ue"] = "ü";
  conversions["Ae"] = "Ä";
  conversions["Ue"] = "Ü";
  conversions["Oe"] = "Ö";
  conversions["A"] = "À|Á|Â|Ã|Ä|Å|Ǻ|Ā|Ă|Ą|Ǎ";
  conversions["a"] = "à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª";
  conversions["C"] = "Ç|Ć|Ĉ|Ċ|Č";
  conversions["c"] = "ç|ć|ĉ|ċ|č";
  conversions["D"] = "Ð|Ď|Đ";
  conversions["d"] = "ð|ď|đ";
  conversions["E"] = "È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě";
  conversions["e"] = "è|é|ê|ë|ē|ĕ|ė|ę|ě";
  conversions["G"] = "Ĝ|Ğ|Ġ|Ģ";
  conversions["g"] = "ĝ|ğ|ġ|ģ";
  conversions["H"] = "Ĥ|Ħ";
  conversions["h"] = "ĥ|ħ";
  conversions["I"] = "Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ";
  conversions["i"] = "ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı";
  conversions["J"] = "Ĵ";
  conversions["j"] = "ĵ";
  conversions["K"] = "Ķ";
  conversions["k"] = "ķ";
  conversions["L"] = "Ĺ|Ļ|Ľ|Ŀ|Ł";
  conversions["l"] = "ĺ|ļ|ľ|ŀ|ł";
  conversions["N"] = "Ñ|Ń|Ņ|Ň";
  conversions["n"] = "ñ|ń|ņ|ň|ŉ";
  conversions["O"] = "Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ";
  conversions["o"] = "ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º";
  conversions["R"] = "Ŕ|Ŗ|Ř";
  conversions["r"] = "ŕ|ŗ|ř";
  conversions["S"] = "Ś|Ŝ|Ş|Š";
  conversions["s"] = "ś|ŝ|ş|š|ſ";
  conversions["T"] = "Ţ|Ť|Ŧ";
  conversions["t"] = "ţ|ť|ŧ";
  conversions["U"] = "Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ";
  conversions["u"] = "ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ";
  conversions["Y"] = "Ý|Ÿ|Ŷ";
  conversions["y"] = "ý|ÿ|ŷ";
  conversions["W"] = "Ŵ";
  conversions["w"] = "ŵ";
  conversions["Z"] = "Ź|Ż|Ž";
  conversions["z"] = "ź|ż|ž";
  conversions["AE"] = "Æ|Ǽ";
  conversions["ss"] = "ß";
  conversions["IJ"] = "Ĳ";
  conversions["ij"] = "ĳ";
  conversions["OE"] = "Œ";
  conversions["f"] = "ƒ";
  for (const i in conversions) {
    const re = new RegExp(conversions[i], "g");
    str = str.replace(re, i);
  }
  return str;
};
