define('auf-utility-library/index',['require','exports','module','./libs/countries','./libs/currencies','./libs/filetypes','./libs/phonelib','./libs/window'],function (require, exports, module) {"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("./libs/countries");
require("./libs/currencies");
require("./libs/filetypes");
require("./libs/phonelib");
require("./libs/window");

});

;define('auf-utility-library', ['auf-utility-library/index'], function (main) { return main; });

window.Countries = {
  toIso2: function(c) {
    var ctry = this.find(c);
    return ctry ? ctry.iso2 : null;
  },
  toIso3: function(c) {
    var ctry = this.find(c);
    return ctry ? ctry.iso3 : null;
  },
  find: function(c) {
    return this.list.find(function(ct) {
      return (ct.iso3.toLowerCase() === c.toLowerCase() || ct.iso2.toLowerCase() == c.toLowerCase());
    });
  },
  list: [{
    "continent": "Europe",
    "iso2": "AD",
    "iso3": "AND",
    "name": "Andorra",
    "tld": ".ad",
    "currency": "EUR",
    "phone": "+376"
  }, {
    "continent": "Asia",
    "iso2": "AE",
    "iso3": "UAE",
    "name": "United Arab Emirates",
    "tld": ".ae",
    "currency": "AED",
    "phone": "+971"
  }, {
    "continent": "Asia",
    "iso2": "AF",
    "iso3": "AFG",
    "name": "Afghanistan",
    "tld": ".af",
    "currency": "AFN",
    "phone": "+93"
  }, {
    "continent": "North America",
    "iso2": "AG",
    "iso3": "ATG",
    "name": "Antigua And Barbuda",
    "tld": ".ag",
    "currency": "XCD",
    "phone": "+1268"
  }, {
    "continent": "North America",
    "iso2": "AI",
    "iso3": "AIA",
    "name": "Anguilla",
    "tld": ".ai",
    "currency": "XCD",
    "phone": "+1264"
  }, {
    "continent": "Europe",
    "iso2": "AL",
    "iso3": "ALB",
    "name": "Albania",
    "tld": ".al",
    "currency": "ALL",
    "phone": "+355"
  }, {
    "continent": "Asia",
    "iso2": "AM",
    "iso3": "ARM",
    "name": "Armenia",
    "tld": ".am",
    "currency": "AMD",
    "phone": "+374"
  }, {
    "continent": "Africa",
    "iso2": "AO",
    "iso3": "AGO",
    "name": "Angola",
    "tld": ".ao",
    "currency": "AOA",
    "phone": "+244"
  }, {
    "continent": "South America",
    "iso2": "AR",
    "iso3": "ARG",
    "name": "Argentina",
    "tld": ".ar",
    "currency": "ARS",
    "phone": "+54"
  }, {
    "continent": "Oceania",
    "iso2": "AS",
    "iso3": "ASM",
    "name": "American Samoa",
    "tld": ".as",
    "currency": "USD",
    "phone": "+1684"
  }, {
    "continent": "Europe",
    "iso2": "AT",
    "iso3": "AUT",
    "name": "Austria",
    "tld": ".at",
    "currency": "EUR",
    "phone": "+43"
  }, {
    "continent": "Oceania",
    "iso2": "AU",
    "iso3": "AUS",
    "name": "Australia",
    "tld": ".au",
    "currency": "AUD",
    "phone": "+61"
  }, {
    "continent": "North America",
    "iso2": "AW",
    "iso3": "ABW",
    "name": "Aruba",
    "tld": ".aw",
    "currency": "ANG",
    "phone": "+297"
  }, {
    "continent": "Asia",
    "iso2": "AZ",
    "iso3": "AZE",
    "name": "Azerbaijan",
    "tld": ".az",
    "currency": "AZN",
    "phone": "+994"
  }, {
    "continent": "Europe",
    "iso2": "BA",
    "iso3": "BIH",
    "name": "Bosnia And Herzegovina",
    "tld": ".ba",
    "currency": "BAM",
    "phone": "+387"
  }, {
    "continent": "North America",
    "iso2": "BB",
    "iso3": "BRB",
    "name": "Barbados",
    "tld": ".bb",
    "currency": "BBD",
    "phone": "+1246"
  }, {
    "continent": "Asia",
    "iso2": "BD",
    "iso3": "BGD",
    "name": "Bangladesh",
    "tld": ".bd",
    "currency": "BDT",
    "phone": "+880"
  }, {
    "continent": "Europe",
    "iso2": "BE",
    "iso3": "BEL",
    "name": "Belgium",
    "tld": ".be",
    "currency": "EUR",
    "phone": "+32"
  }, {
    "continent": "Africa",
    "iso2": "BF",
    "iso3": "BFA",
    "name": "Burkina Faso",
    "tld": ".bf",
    "currency": "XOF",
    "phone": "+226"
  }, {
    "continent": "Europe",
    "iso2": "BG",
    "iso3": "BGR",
    "name": "Bulgaria",
    "tld": ".bg",
    "currency": "BGN",
    "phone": "+359"
  }, {
    "continent": "Asia",
    "iso2": "BH",
    "iso3": "BHR",
    "name": "Bahrain",
    "tld": ".bh",
    "currency": "BHD",
    "phone": "+973"
  }, {
    "continent": "Africa",
    "iso2": "BI",
    "iso3": "BDI",
    "name": "Burundi",
    "tld": ".bi",
    "currency": "BIF",
    "phone": "+257"
  }, {
    "continent": "Africa",
    "iso2": "BJ",
    "iso3": "BEN",
    "name": "Benin",
    "tld": ".bj",
    "currency": "XOF",
    "phone": "+229"
  }, {
    "continent": "North America",
    "iso2": "BM",
    "iso3": "BMU",
    "name": "Bermuda",
    "tld": ".bm",
    "currency": "BMD",
    "phone": "+1441"
  }, {
    "continent": "Asia",
    "iso2": "BN",
    "iso3": "BRN",
    "name": "Brunei Darussalam",
    "tld": ".bn",
    "currency": "BND",
    "phone": "+673"
  }, {
    "continent": "South America",
    "iso2": "BO",
    "iso3": "BOL",
    "name": "Bolivia",
    "tld": ".bo",
    "currency": "BOB",
    "phone": "+591"
  }, {
    "continent": "South America",
    "iso2": "BR",
    "iso3": "BRA",
    "name": "Brazil",
    "tld": ".br",
    "currency": "BRL",
    "phone": "+55"
  }, {
    "continent": "North America",
    "iso2": "BS",
    "iso3": "BHS",
    "name": "Bahamas",
    "tld": ".bs",
    "currency": "BSD",
    "phone": "+1242"
  }, {
    "continent": "Asia",
    "iso2": "BT",
    "iso3": "BTN",
    "name": "Bhutan",
    "tld": ".bt",
    "currency": "BTN",
    "phone": "+975"
  }, {
    "continent": "Africa",
    "iso2": "BW",
    "iso3": "BWA",
    "name": "Botswana",
    "tld": ".bw",
    "currency": "BWP",
    "phone": "+267"
  }, {
    "continent": "Europe",
    "iso2": "BY",
    "iso3": "BLR",
    "name": "Belarus",
    "tld": ".by",
    "currency": "BYR",
    "phone": "+375"
  }, {
    "continent": "North America",
    "iso2": "BZ",
    "iso3": "BLZ",
    "name": "Belize",
    "tld": ".bz",
    "currency": "BZD",
    "phone": "+51"
  }, {
    "continent": "North America",
    "iso2": "CA",
    "iso3": "CAN",
    "name": "Canada",
    "tld": ".ca",
    "currency": "CAD",
    "phone": "+1"
  }, {
    "continent": "Africa",
    "iso2": "CD",
    "iso3": "COD",
    "name": "DR Congo",
    "tld": ".cd",
    "currency": "CDF",
    "phone": "+243"
  }, {
    "continent": "Africa",
    "iso2": "CF",
    "iso3": "CAF",
    "name": "Central African Republic",
    "tld": ".cf",
    "currency": "XAF",
    "phone": "+236"
  }, {
    "continent": "Africa",
    "iso2": "CG",
    "iso3": "COG",
    "name": "Congo",
    "tld": ".cg",
    "currency": "XAF",
    "phone": "+242"
  }, {
    "continent": "Europe",
    "iso2": "CH",
    "iso3": "CHE",
    "name": "Switzerland",
    "tld": ".ch",
    "currency": "CHF",
    "phone": "+41"
  }, {
    "continent": "Africa",
    "iso2": "CI",
    "iso3": "CIV",
    "name": "Côte D'ivoire",
    "tld": ".ci",
    "currency": "XOF",
    "phone": "+225"
  }, {
    "continent": "Oceania",
    "iso2": "CK",
    "iso3": "COK",
    "name": "Cook Islands",
    "tld": ".ck",
    "currency": "NZD",
    "phone": "+682"
  }, {
    "continent": "South America",
    "iso2": "CL",
    "iso3": "CHL",
    "name": "Chile",
    "tld": ".cl",
    "currency": "CLP",
    "phone": "+56"
  }, {
    "continent": "Africa",
    "iso2": "CM",
    "iso3": "CMR",
    "name": "Cameroon",
    "tld": ".cm",
    "currency": "XAF",
    "phone": "+237"
  }, {
    "continent": "Asia",
    "iso2": "CN",
    "iso3": "CHN",
    "name": "China",
    "tld": ".cn",
    "currency": "CNY",
    "phone": "+86"
  }, {
    "continent": "South America",
    "iso2": "CO",
    "iso3": "COL",
    "name": "Colombia",
    "tld": ".co",
    "currency": "COP",
    "phone": "+57"
  }, {
    "continent": "North America",
    "iso2": "CR",
    "iso3": "CRI",
    "name": "Costa Rica",
    "tld": ".cr",
    "currency": "CRC",
    "phone": "+56"
  }, {
    "continent": "North America",
    "iso2": "CU",
    "iso3": "CUB",
    "name": "Cuba",
    "tld": ".cu",
    "currency": "CUP",
    "phone": "+53"
  }, {
    "continent": "Africa",
    "iso2": "CV",
    "iso3": "CPV",
    "name": "Cape Verde",
    "tld": ".cv",
    "currency": "CVE",
    "phone": "+238"
  }, {
    "continent": "Asia",
    "iso2": "CY",
    "iso3": "CYP",
    "name": "Cyprus",
    "tld": ".cy",
    "currency": "CYP",
    "phone": "+357"
  }, {
    "continent": "Europe",
    "iso2": "CZ",
    "iso3": "CZE",
    "name": "Czech Republic",
    "tld": ".cz",
    "currency": "CZK",
    "phone": "+420"
  }, {
    "continent": "Europe",
    "iso2": "DE",
    "iso3": "DEU",
    "name": "Germany",
    "tld": ".de",
    "currency": "EUR",
    "phone": "+49"
  }, {
    "continent": "Africa",
    "iso2": "DJ",
    "iso3": "DJI",
    "name": "Djibouti",
    "tld": "dj",
    "currency": "DJF",
    "phone": "+253"
  }, {
    "continent": "Europe",
    "iso2": "DK",
    "iso3": "DNK",
    "name": "Denmark",
    "tld": ".dk",
    "currency": "DKK",
    "phone": "+45"
  }, {
    "continent": "North America",
    "iso2": "DM",
    "iso3": "DMA",
    "name": "Dominica",
    "tld": ".dm",
    "currency": "XCD",
    "phone": "+1767"
  }, {
    "continent": "South America",
    "iso2": "DO",
    "iso3": "DOM",
    "name": "Dominican Republic",
    "tld": ".do",
    "currency": "DOP",
    "phone": "+1809"
  }, {
    "continent": "Africa",
    "iso2": "DZ",
    "iso3": "DZA",
    "name": "Algeria",
    "tld": ".dz",
    "currency": "DZD",
    "phone": "+213"
  }, {
    "continent": "South America",
    "iso2": "EC",
    "iso3": "ECU",
    "name": "Ecuador",
    "tld": ".ec",
    "currency": "USD",
    "phone": "+593"
  }, {
    "continent": "Europe",
    "iso2": "EE",
    "iso3": "EST",
    "name": "Estonia",
    "tld": ".ee",
    "currency": "EEK",
    "phone": "+372"
  }, {
    "continent": "Africa",
    "iso2": "EG",
    "iso3": "EGY",
    "name": "Egypt",
    "tld": ".eg",
    "currency": "EGP",
    "phone": "+20"
  }, {
    "continent": "Africa",
    "iso2": "EH",
    "iso3": "ESH",
    "name": "Western Sahara",
    "tld": ".eh",
    "currency": "MAD",
    "phone": ""
  }, {
    "continent": "Africa",
    "iso2": "ER",
    "iso3": "ERI",
    "name": "Eritrea",
    "tld": ".er",
    "currency": "ERN",
    "phone": "+291"
  }, {
    "continent": "Europe",
    "iso2": "ES",
    "iso3": "ESP",
    "name": "Spain",
    "tld": ".es",
    "currency": "EUR",
    "phone": "+34"
  }, {
    "continent": "Africa",
    "iso2": "ET",
    "iso3": "ETH",
    "name": "Ethiopia",
    "tld": ".et",
    "currency": "ETB",
    "phone": "+251"
  }, {
    "continent": "Europe",
    "iso2": "FI",
    "iso3": "FIN",
    "name": "Finland",
    "tld": ".fi",
    "currency": "EUR",
    "phone": "+358"
  }, {
    "continent": "Oceania",
    "iso2": "FJ",
    "iso3": "FJI",
    "name": "Fiji",
    "tld": ".fj",
    "currency": "FJD",
    "phone": "+679"
  }, {
    "continent": "Oceania",
    "iso2": "FM",
    "iso3": "FSM",
    "name": "Micronesia",
    "tld": ".fm",
    "currency": "USD",
    "phone": "+691"
  }, {
    "continent": "Europe",
    "iso2": "FO",
    "iso3": "FRO",
    "name": "Faroe Islands",
    "tld": ".fo",
    "currency": "DKK",
    "phone": "+298"
  }, {
    "continent": "Europe",
    "iso2": "FR",
    "iso3": "FRA",
    "name": "France",
    "tld": ".fr",
    "currency": "EUR",
    "phone": "+33"
  }, {
    "continent": "Africa",
    "iso2": "GA",
    "iso3": "GAB",
    "name": "Gabon",
    "tld": ".ga",
    "currency": "XAF",
    "phone": "+241"
  }, {
    "continent": "Europe",
    "iso2": "GB",
    "iso3": "GBR",
    "name": "United Kingdom",
    "tld": ".gb",
    "currency": "GBP",
    "phone": "+44"
  }, {
    "continent": "North America",
    "iso2": "GD",
    "iso3": "GRD",
    "name": "Grenada",
    "tld": ".gd",
    "currency": "XCD",
    "phone": "+1473"
  }, {
    "continent": "Europe",
    "iso2": "GE",
    "iso3": "GEO",
    "name": "Georgia",
    "tld": ".ge",
    "currency": "GEL",
    "phone": "+995"
  }, {
    "continent": "South America",
    "iso2": "GF",
    "iso3": "GUF",
    "name": "French Guyana",
    "tld": ".gf",
    "currency": "EUR",
    "phone": "+594"
  }, {
    "continent": "Europe",
    "iso2": "GG",
    "iso3": "GGY",
    "name": "Guernsey",
    "tld": ".gg",
    "currency": "GGP",
    "phone": "+44"
  }, {
    "continent": "Africa",
    "iso2": "GH",
    "iso3": "GHA",
    "name": "Ghana",
    "tld": ".gh",
    "currency": "GHC",
    "phone": "+233"
  }, {
    "continent": "Africa",
    "iso2": "GI",
    "iso3": "GIB",
    "name": "Gibraltar",
    "tld": ".gi",
    "currency": "GIP",
    "phone": "+350"
  }, {
    "continent": "North America",
    "iso2": "GL",
    "iso3": "GRL",
    "name": "Greenland",
    "tld": ".gl",
    "currency": "DKK",
    "phone": "+299"
  }, {
    "continent": "Africa",
    "iso2": "GM",
    "iso3": "GMB",
    "name": "Gambia",
    "tld": ".gm",
    "currency": "GMD",
    "phone": "+220"
  }, {
    "continent": "Africa",
    "iso2": "GN",
    "iso3": "GIN",
    "name": "Guinea",
    "tld": ".gn",
    "currency": "GNF",
    "phone": "+224"
  }, {
    "continent": "North America",
    "iso2": "GP",
    "iso3": "GLP",
    "name": "Guadeloupe",
    "tld": ".gp",
    "currency": "EUR",
    "phone": "+590"
  }, {
    "continent": "Africa",
    "iso2": "GQ",
    "iso3": "GNQ",
    "name": "Equatorial Guinea",
    "tld": ".gq",
    "currency": "XAF",
    "phone": "+240"
  }, {
    "continent": "Europe",
    "iso2": "GR",
    "iso3": "GRC",
    "name": "Greece",
    "tld": ".gr",
    "currency": "EUR",
    "phone": "+30"
  }, {
    "continent": "North America",
    "iso2": "GT",
    "iso3": "GTM",
    "name": "Guatemala",
    "tld": ".gt",
    "currency": "GTQ",
    "phone": "+52"
  }, {
    "continent": "Asia",
    "iso2": "GU",
    "iso3": "GUM",
    "name": "Guam",
    "tld": ".gu",
    "currency": "USD",
    "phone": "+1671"
  }, {
    "continent": "Africa",
    "iso2": "GW",
    "iso3": "GNB",
    "name": "Guinea-bissau",
    "tld": ".gw",
    "currency": "XOF",
    "phone": "+245"
  }, {
    "continent": "South America",
    "iso2": "GY",
    "iso3": "GUY",
    "name": "Guyana",
    "tld": ".gy",
    "currency": "GYD",
    "phone": "+592"
  }, {
    "continent": "Asia",
    "iso2": "HK",
    "iso3": "HKG",
    "name": "Hong Kong",
    "tld": ".hk",
    "currency": "HNL",
    "phone": "+852"
  }, {
    "continent": "North America",
    "iso2": "HN",
    "iso3": "HND",
    "name": "Honduras",
    "tld": ".hn",
    "currency": "HNL",
    "phone": "+54"
  }, {
    "continent": "Europe",
    "iso2": "HR",
    "iso3": "HRV",
    "name": "Croatia",
    "tld": ".hr",
    "currency": "HRK",
    "phone": "+385"
  }, {
    "continent": "North America",
    "iso2": "HT",
    "iso3": "HTI",
    "name": "Haiti",
    "tld": ".ht",
    "currency": "USD",
    "phone": "+59"
  }, {
    "continent": "Europe",
    "iso2": "HU",
    "iso3": "HUN",
    "name": "Hungary",
    "tld": ".hu",
    "currency": "HUF",
    "phone": "+36"
  }, {
    "continent": "Asia",
    "iso2": "ID",
    "iso3": "IDN",
    "name": "Indonesia",
    "tld": ".id",
    "currency": "INR",
    "phone": "+62"
  }, {
    "continent": "Europe",
    "iso2": "IE",
    "iso3": "IRL",
    "name": "Ireland",
    "tld": ".ie",
    "currency": "EUR",
    "phone": "+353"
  }, {
    "continent": "Asia",
    "iso2": "IL",
    "iso3": "ISR",
    "name": "Israel",
    "tld": ".il",
    "currency": "ILS",
    "phone": "+972"
  }, {
    "continent": "Europe",
    "iso2": "IM",
    "iso3": "IMN",
    "name": "Isle Of Man",
    "tld": ".im",
    "currency": "IMP",
    "phone": "+44"
  }, {
    "continent": "Asia",
    "iso2": "IN",
    "iso3": "IND",
    "name": "India",
    "tld": ".in",
    "currency": "ISK",
    "phone": "+91"
  }, {
    "continent": "Asia",
    "iso2": "IQ",
    "iso3": "IRQ",
    "name": "Iraq",
    "tld": ".iq",
    "currency": "IDR",
    "phone": "+964"
  }, {
    "continent": "Asia",
    "iso2": "IR",
    "iso3": "IRN",
    "name": "Iran",
    "tld": ".ir",
    "currency": "IRR",
    "phone": "+98"
  }, {
    "continent": "Europe",
    "iso2": "IS",
    "iso3": "ISL",
    "name": "Iceland",
    "tld": ".is",
    "currency": "HUF",
    "phone": "+354"
  }, {
    "continent": "Europe",
    "iso2": "IT",
    "iso3": "ITA",
    "name": "Italy",
    "tld": ".it",
    "currency": "EUR",
    "phone": "+39"
  }, {
    "continent": "Europe",
    "iso2": "JE",
    "iso3": "JEY",
    "name": "Jersey",
    "tld": ".je",
    "currency": "JEP",
    "phone": "+44"
  }, {
    "continent": "North America",
    "iso2": "JM",
    "iso3": "JAM",
    "name": "Jamaica",
    "tld": ".jm",
    "currency": "JMD",
    "phone": "+1876"
  }, {
    "continent": "Asia",
    "iso2": "JO",
    "iso3": "JOR",
    "name": "Jordan",
    "tld": ".jo",
    "currency": "JOD",
    "phone": "+962"
  }, {
    "continent": "Asia",
    "iso2": "JP",
    "iso3": "JPN",
    "name": "Japan",
    "tld": ".jp",
    "currency": "JPY",
    "phone": "+81"
  }, {
    "continent": "Africa",
    "iso2": "KE",
    "iso3": "KEN",
    "name": "Kenya",
    "tld": ".ke",
    "currency": "KES",
    "phone": "+254"
  }, {
    "continent": "Asia",
    "iso2": "KG",
    "iso3": "KGZ",
    "name": "Kyrgyzstan",
    "tld": ".kg",
    "currency": "KGS",
    "phone": "+996"
  }, {
    "continent": "Asia",
    "iso2": "KH",
    "iso3": "KHM",
    "name": "Cambodia",
    "tld": ".kh",
    "currency": "KHR",
    "phone": "+855"
  }, {
    "continent": "Oceania",
    "iso2": "KI",
    "iso3": "KIR",
    "name": "Kiribati",
    "tld": ".ki",
    "currency": "AUD",
    "phone": "+686"
  }, {
    "continent": "Africa",
    "iso2": "KM",
    "iso3": "COM",
    "name": "Comoros",
    "tld": ".km",
    "currency": "KMF",
    "phone": "+269"
  }, {
    "continent": "North America",
    "iso2": "KN",
    "iso3": "KNA",
    "name": "Saint Kitts And Nevis",
    "tld": ".kn",
    "currency": "XCD",
    "phone": "+1869"
  }, {
    "continent": "Asia",
    "iso2": "KP",
    "iso3": "PRK",
    "name": "North Korea",
    "tld": ".kp",
    "currency": "KPW",
    "phone": "+850"
  }, {
    "continent": "Asia",
    "iso2": "KR",
    "iso3": "KOR",
    "name": "South Korea",
    "tld": ".kr",
    "currency": "KRW",
    "phone": "+82"
  }, {
    "continent": "Asia",
    "iso2": "KW",
    "iso3": "KWT",
    "name": "Kuwait",
    "tld": ".kw",
    "currency": "KWD",
    "phone": "+965"
  }, {
    "continent": "North America",
    "iso2": "KY",
    "iso3": "CYM",
    "name": "Cayman Islands",
    "tld": ".ky",
    "currency": "KYD",
    "phone": "+1345"
  }, {
    "continent": "Asia",
    "iso2": "KZ",
    "iso3": "KAZ",
    "name": "Kazakhstan",
    "tld": ".kz",
    "currency": "KZT",
    "phone": "+7"
  }, {
    "continent": "Asia",
    "iso2": "LA",
    "iso3": "LAO",
    "name": "Laos",
    "tld": ".la",
    "currency": "LAK",
    "phone": "+856"
  }, {
    "continent": "Asia",
    "iso2": "LB",
    "iso3": "LBN",
    "name": "Lebanon",
    "tld": ".lb",
    "currency": "LBP",
    "phone": "+961"
  }, {
    "continent": "South America",
    "iso2": "LC",
    "iso3": "LCA",
    "name": "Saint Lucia",
    "tld": ".lc",
    "currency": "XCD",
    "phone": "+1758"
  }, {
    "continent": "Europe",
    "iso2": "LI",
    "iso3": "LIE",
    "name": "Liechtenstein",
    "tld": ".li",
    "currency": "CHF",
    "phone": "+423"
  }, {
    "continent": "Asia",
    "iso2": "LK",
    "iso3": "LKA",
    "name": "Sri Lanka",
    "tld": ".lk",
    "currency": "LKR",
    "phone": "+94"
  }, {
    "continent": "Africa",
    "iso2": "LR",
    "iso3": "LBR",
    "name": "Liberia",
    "tld": ".lr",
    "currency": "LRD",
    "phone": "+231"
  }, {
    "continent": "Africa",
    "iso2": "LS",
    "iso3": "LSO",
    "name": "Lesotho",
    "tld": ".ls",
    "currency": "LSL",
    "phone": "+266"
  }, {
    "continent": "Europe",
    "iso2": "LT",
    "iso3": "LTU",
    "name": "Lithuania",
    "tld": ".lt",
    "currency": "LTL",
    "phone": "+370"
  }, {
    "continent": "Europe",
    "iso2": "LU",
    "iso3": "LUX",
    "name": "Luxembourg",
    "tld": ".lu",
    "currency": "EUR",
    "phone": "+352"
  }, {
    "continent": "Europe",
    "iso2": "LV",
    "iso3": "LVA",
    "name": "Latvia",
    "tld": ".lv",
    "currency": "LVL",
    "phone": "+371"
  }, {
    "continent": "Africa",
    "iso2": "LY",
    "iso3": "LBY",
    "name": "Libya",
    "tld": ".ly",
    "currency": "LYD",
    "phone": "+218"
  }, {
    "continent": "Africa",
    "iso2": "MA",
    "iso3": "MAR",
    "name": "Morocco",
    "tld": ".ma",
    "currency": "MAD",
    "phone": "+211"
  }, {
    "continent": "Europe",
    "iso2": "MC",
    "iso3": "MCO",
    "name": "Monaco",
    "tld": ".mc",
    "currency": "EUR",
    "phone": "+377"
  }, {
    "continent": "Europe",
    "iso2": "MD",
    "iso3": "MDA",
    "name": "Moldova",
    "tld": ".md",
    "currency": "MDL",
    "phone": "+373"
  }, {
    "continent": "Europe",
    "iso2": "ME",
    "iso3": "MNE",
    "name": "Montenegro",
    "tld": ".me",
    "currency": "",
    "phone": "+382"
  }, {
    "continent": "Africa",
    "iso2": "MG",
    "iso3": "MDG",
    "name": "Madagascar",
    "tld": ".mg",
    "currency": "MGA",
    "phone": "+261"
  }, {
    "continent": "Oceania",
    "iso2": "MH",
    "iso3": "MHL",
    "name": "Marshall Islands",
    "tld": ".mh",
    "currency": "USD",
    "phone": "+692"
  }, {
    "continent": "Europe",
    "iso2": "MK",
    "iso3": "MKD",
    "name": "Macedonia",
    "tld": ".mk",
    "currency": "MKD",
    "phone": "+389"
  }, {
    "continent": "Africa",
    "iso2": "ML",
    "iso3": "MLI",
    "name": "Mali",
    "tld": ".ml",
    "currency": "XOF",
    "phone": "+223"
  }, {
    "continent": "Asia",
    "iso2": "MM",
    "iso3": "MMR",
    "name": "Myanmar",
    "tld": ".mm",
    "currency": "MMK",
    "phone": "+95"
  }, {
    "continent": "Asia",
    "iso2": "MN",
    "iso3": "MNG",
    "name": "Mongolia",
    "tld": ".mn",
    "currency": "MNT",
    "phone": "+976"
  }, {
    "continent": "Asia",
    "iso2": "MO",
    "iso3": "MAC",
    "name": "Macao",
    "tld": ".mo",
    "currency": "MOP",
    "phone": "+853"
  }, {
    "continent": "North America",
    "iso2": "MQ",
    "iso3": "MTQ",
    "name": "Martinique",
    "tld": ".mq",
    "currency": "EUR",
    "phone": "+596"
  }, {
    "continent": "Africa",
    "iso2": "MR",
    "iso3": "MRT",
    "name": "Mauritania",
    "tld": ".mr",
    "currency": "MRO",
    "phone": "+222"
  }, {
    "continent": "North America",
    "iso2": "MS",
    "iso3": "MSR",
    "name": "Montserrat",
    "tld": ".ms",
    "currency": "XCD",
    "phone": "+1664"
  }, {
    "continent": "Europe",
    "iso2": "MT",
    "iso3": "MLT",
    "name": "Malta",
    "tld": ".mt",
    "currency": "EUR",
    "phone": "+356"
  }, {
    "continent": "Africa",
    "iso2": "MU",
    "iso3": "MUS",
    "name": "Mauritius",
    "tld": ".mu",
    "currency": "MUR",
    "phone": "+230"
  }, {
    "continent": "Asia",
    "iso2": "MV",
    "iso3": "MDV",
    "name": "Maldives",
    "tld": ".mv",
    "currency": "MVR",
    "phone": "+960"
  }, {
    "continent": "Africa",
    "iso2": "MW",
    "iso3": "MWI",
    "name": "Malawi",
    "tld": ".mw",
    "currency": "MWK",
    "phone": "+265"
  }, {
    "continent": "North America",
    "iso2": "MX",
    "iso3": "MEX",
    "name": "Mexico",
    "tld": ".mx",
    "currency": "MXN",
    "phone": "+52"
  }, {
    "continent": "Asia",
    "iso2": "MY",
    "iso3": "MYS",
    "name": "Malaysia",
    "tld": ".my",
    "currency": "MYR",
    "phone": "+60"
  }, {
    "continent": "Africa",
    "iso2": "MZ",
    "iso3": "MOZ",
    "name": "Mozambique",
    "tld": ".mz",
    "currency": "MZM",
    "phone": "+258"
  }, {
    "continent": "Africa",
    "iso2": "NA",
    "iso3": "NAM",
    "name": "Namibia",
    "tld": ".na",
    "currency": "ZAR",
    "phone": "+264"
  }, {
    "continent": "Africa",
    "iso2": "NE",
    "iso3": "NER",
    "name": "Niger",
    "tld": ".ne",
    "currency": "XOF",
    "phone": "+227"
  }, {
    "continent": "Africa",
    "iso2": "NG",
    "iso3": "NGA",
    "name": "Nigeria",
    "tld": ".ng",
    "currency": "NGN",
    "phone": "+234"
  }, {
    "continent": "North America",
    "iso2": "NI",
    "iso3": "NIC",
    "name": "Nicaragua",
    "tld": ".ni",
    "currency": "NIO",
    "phone": "+55"
  }, {
    "continent": "Europe",
    "iso2": "NL",
    "iso3": "NLD",
    "name": "Netherlands",
    "tld": ".nl",
    "currency": "EUR",
    "phone": "+31"
  }, {
    "continent": "Europe",
    "iso2": "NO",
    "iso3": "NOR",
    "name": "Norway",
    "tld": ".no",
    "currency": "NOK",
    "phone": "+47"
  }, {
    "continent": "Asia",
    "iso2": "NP",
    "iso3": "NPL",
    "name": "Nepal",
    "tld": ".np",
    "currency": "NPR",
    "phone": "+977"
  }, {
    "continent": "Oceania",
    "iso2": "NR",
    "iso3": "NRU",
    "name": "Nauru",
    "tld": ".nr",
    "currency": "AUD",
    "phone": "+674"
  }, {
    "continent": "Oceania",
    "iso2": "NZ",
    "iso3": "NZL",
    "name": "New Zealand",
    "tld": ".nz",
    "currency": "NZD",
    "phone": "+64"
  }, {
    "continent": "Asia",
    "iso2": "OM",
    "iso3": "OMN",
    "name": "Oman",
    "tld": ".om",
    "currency": "OMR",
    "phone": "+968"
  }, {
    "continent": "South America",
    "iso2": "PA",
    "iso3": "PAN",
    "name": "Panama",
    "tld": ".pa",
    "currency": "USD",
    "phone": "+57"
  }, {
    "continent": "South America",
    "iso2": "PE",
    "iso3": "PER",
    "name": "Peru",
    "tld": ".pe",
    "currency": "PEN",
    "phone": "+51"
  }, {
    "continent": "Oceania",
    "iso2": "PF",
    "iso3": "PYF",
    "name": "French Polynesia",
    "tld": ".pf",
    "currency": "XPF",
    "phone": "+689"
  }, {
    "continent": "Oceania",
    "iso2": "PG",
    "iso3": "PNG",
    "name": "Papua New Guinea",
    "tld": ".pg",
    "currency": "PGK",
    "phone": "+675"
  }, {
    "continent": "Asia",
    "iso2": "PH",
    "iso3": "PHL",
    "name": "Philippines",
    "tld": ".ph",
    "currency": "PHP",
    "phone": "+63"
  }, {
    "continent": "Asia",
    "iso2": "PK",
    "iso3": "PAK",
    "name": "Pakistan",
    "tld": ".pk",
    "currency": "PKR",
    "phone": "+92"
  }, {
    "continent": "Europe",
    "iso2": "PL",
    "iso3": "POL",
    "name": "Poland",
    "tld": ".pl",
    "currency": "PLN",
    "phone": "+48"
  }, {
    "continent": "North America",
    "iso2": "PM",
    "iso3": "SPM",
    "name": "Saint Pierre And Miquelon",
    "tld": ".pm",
    "currency": "EUR",
    "phone": "+508"
  }, {
    "continent": "Oceania",
    "iso2": "PN",
    "iso3": "PCN",
    "name": "Pitcairn",
    "tld": ".pn",
    "currency": "NZD",
    "phone": "+649"
  }, {
    "continent": "North America",
    "iso2": "PR",
    "iso3": "PRI",
    "name": "Puerto Rico",
    "tld": ".pr",
    "currency": "USD",
    "phone": "+1939"
  }, {
    "continent": "Asia",
    "iso2": "PS",
    "iso3": "PSE",
    "name": "Palestine",
    "tld": ".ps",
    "currency": "",
    "phone": "+970"
  }, {
    "continent": "Europe",
    "iso2": "PT",
    "iso3": "PRT",
    "name": "Portugal",
    "tld": ".pt",
    "currency": "EUR",
    "phone": "+351"
  }, {
    "continent": "Oceania",
    "iso2": "PW",
    "iso3": "PLW",
    "name": "Palau",
    "tld": ".pw",
    "currency": "USD",
    "phone": "+680"
  }, {
    "continent": "South America",
    "iso2": "PY",
    "iso3": "PRY",
    "name": "Paraguay",
    "tld": ".py",
    "currency": "PYG",
    "phone": "+595"
  }, {
    "continent": "Asia",
    "iso2": "QA",
    "iso3": "QAT",
    "name": "Qatar",
    "tld": ".qa",
    "currency": "QAR",
    "phone": "+974"
  }, {
    "continent": "Africa",
    "iso2": "RE",
    "iso3": "REU",
    "name": "Réunion",
    "tld": ".re",
    "currency": "EUR",
    "phone": "+262"
  }, {
    "continent": "Europe",
    "iso2": "RO",
    "iso3": "ROU",
    "name": "Romania",
    "tld": ".ro",
    "currency": "RON",
    "phone": "+40"
  }, {
    "continent": "Europe",
    "iso2": "RS",
    "iso3": "SRB",
    "name": "Serbia",
    "tld": ".cs",
    "currency": "",
    "phone": "+381"
  }, {
    "continent": "Asia",
    "iso2": "RU",
    "iso3": "RUS",
    "name": "Russia",
    "tld": ".ru",
    "currency": "RUB",
    "phone": "+7"
  }, {
    "continent": "Africa",
    "iso2": "RW",
    "iso3": "RWA",
    "name": "Rwanda",
    "tld": ".rw",
    "currency": "RWF",
    "phone": "+250"
  }, {
    "continent": "Asia",
    "iso2": "SA",
    "iso3": "SAU",
    "name": "Saudi Arabia",
    "tld": ".sa",
    "currency": "SAR",
    "phone": "+966"
  }, {
    "continent": "Oceania",
    "iso2": "SB",
    "iso3": "SLB",
    "name": "Solomon Islands",
    "tld": ".sb",
    "currency": "SBD",
    "phone": "+677"
  }, {
    "continent": "Africa",
    "iso2": "SC",
    "iso3": "SYC",
    "name": "Seychelles",
    "tld": ".sc",
    "currency": "SCR",
    "phone": "+248"
  }, {
    "continent": "Africa",
    "iso2": "SD",
    "iso3": "SDN",
    "name": "Sudan",
    "tld": ".sd",
    "currency": "SDD",
    "phone": "+249"
  }, {
    "continent": "Europe",
    "iso2": "SE",
    "iso3": "SWE",
    "name": "Sweden",
    "tld": ".se",
    "currency": "SEK",
    "phone": "+46"
  }, {
    "continent": "Asia",
    "iso2": "SG",
    "iso3": "SGP",
    "name": "Singapore",
    "tld": ".sg",
    "currency": "SGD",
    "phone": "+65"
  }, {
    "continent": "Africa",
    "iso2": "SH",
    "iso3": "SHN",
    "name": "Saint Helena",
    "tld": ".sh",
    "currency": "SHP",
    "phone": "+290"
  }, {
    "continent": "Europe",
    "iso2": "SI",
    "iso3": "SVN",
    "name": "Slovenia",
    "tld": ".si",
    "currency": "SIT",
    "phone": "+386"
  }, {
    "continent": "Europe",
    "iso2": "SK",
    "iso3": "SVK",
    "name": "Slovakia",
    "tld": ".sk",
    "currency": "SKK",
    "phone": "+421"
  }, {
    "continent": "Africa",
    "iso2": "SL",
    "iso3": "SLE",
    "name": "Sierra Leone",
    "tld": ".sl",
    "currency": "SLL",
    "phone": "+232"
  }, {
    "continent": "Europe",
    "iso2": "SM",
    "iso3": "SMR",
    "name": "San Marino",
    "tld": ".sm",
    "currency": "EUR",
    "phone": "+378"
  }, {
    "continent": "Africa",
    "iso2": "SN",
    "iso3": "SEN",
    "name": "Senegal",
    "tld": ".sn",
    "currency": "XOF",
    "phone": "+221"
  }, {
    "continent": "Africa",
    "iso2": "SO",
    "iso3": "SOM",
    "name": "Somalia",
    "tld": ".so",
    "currency": "SOS",
    "phone": "+252"
  }, {
    "continent": "South America",
    "iso2": "SR",
    "iso3": "SUR",
    "name": "Suriname",
    "tld": ".sr",
    "currency": "SRD",
    "phone": "+597"
  }, {
    "continent": "Africa",
    "iso2": "ST",
    "iso3": "STP",
    "name": "São Tomé And Príncipe",
    "tld": ".st",
    "currency": "STD",
    "phone": "+239"
  }, {
    "continent": "North America",
    "iso2": "SV",
    "iso3": "SLV",
    "name": "El Salvador",
    "tld": ".sv",
    "currency": "SVC",
    "phone": "+53"
  }, {
    "continent": "Asia",
    "iso2": "SY",
    "iso3": "SYR",
    "name": "Syria",
    "tld": ".sy",
    "currency": "SYP",
    "phone": "+963"
  }, {
    "continent": "Africa",
    "iso2": "SZ",
    "iso3": "SWZ",
    "name": "Swaziland",
    "tld": ".sz",
    "currency": "SZL",
    "phone": "+268"
  }, {
    "continent": "Africa",
    "iso2": "TD",
    "iso3": "TCD",
    "name": "Chad",
    "tld": ".td",
    "currency": "XAF",
    "phone": "+235"
  }, {
    "continent": "Africa",
    "iso2": "TG",
    "iso3": "TGO",
    "name": "Togo",
    "tld": ".tg",
    "currency": "XOF",
    "phone": "+228"
  }, {
    "continent": "Asia",
    "iso2": "TH",
    "iso3": "THA",
    "name": "Thailand",
    "tld": ".th",
    "currency": "THB",
    "phone": "+66"
  }, {
    "continent": "Asia",
    "iso2": "TJ",
    "iso3": "TJK",
    "name": "Tajikistan",
    "tld": ".tj",
    "currency": "RUB",
    "phone": "+992"
  }, {
    "continent": "Oceania",
    "iso2": "TL",
    "iso3": "TLS",
    "name": "East Timor",
    "tld": ".tl",
    "currency": "IDR",
    "phone": "+670"
  }, {
    "continent": "Asia",
    "iso2": "TM",
    "iso3": "TKM",
    "name": "Turkmenistan",
    "tld": ".tm",
    "currency": "TMM",
    "phone": "+993"
  }, {
    "continent": "Africa",
    "iso2": "TN",
    "iso3": "TUN",
    "name": "Tunisia",
    "tld": ".tn",
    "currency": "TND",
    "phone": "+216"
  }, {
    "continent": "Oceania",
    "iso2": "TO",
    "iso3": "TON",
    "name": "Tonga",
    "tld": ".to",
    "currency": "TOP",
    "phone": "+676"
  }, {
    "continent": "Asia",
    "iso2": "TR",
    "iso3": "TUR",
    "name": "Turkey",
    "tld": ".tr",
    "currency": "TRY",
    "phone": "+90"
  }, {
    "continent": "South America",
    "iso2": "TT",
    "iso3": "TTO",
    "name": "Trinidad And Tobago",
    "tld": ".tt",
    "currency": "TTD",
    "phone": "+1868"
  }, {
    "continent": "Oceania",
    "iso2": "TV",
    "iso3": "TUV",
    "name": "Tuvalu",
    "tld": ".tv",
    "currency": "TVD",
    "phone": "+688"
  }, {
    "continent": "Asia",
    "iso2": "TW",
    "iso3": "TWN",
    "name": "Taiwan",
    "tld": ".tw",
    "currency": "TWD",
    "phone": "+886"
  }, {
    "continent": "Africa",
    "iso2": "TZ",
    "iso3": "TZA",
    "name": "Tanzania",
    "tld": ".tz",
    "currency": "TZS",
    "phone": "+255"
  }, {
    "continent": "Europe",
    "iso2": "UA",
    "iso3": "UKR",
    "name": "Ukraine",
    "tld": ".ua",
    "currency": "UAH",
    "phone": "+380"
  }, {
    "continent": "Africa",
    "iso2": "UG",
    "iso3": "UGA",
    "name": "Uganda",
    "tld": ".ug",
    "currency": "UGX",
    "phone": "+256"
  }, {
    "continent": "North America",
    "iso2": "US",
    "iso3": "USA",
    "name": "United States",
    "tld": ".us",
    "currency": "USD",
    "phone": "+1"
  }, {
    "continent": "South America",
    "iso2": "UY",
    "iso3": "URY",
    "name": "Uruguay",
    "tld": ".uy",
    "currency": "UYU",
    "phone": "+598"
  }, {
    "continent": "Asia",
    "iso2": "UZ",
    "iso3": "UZB",
    "name": "Uzbekistan",
    "tld": ".uz",
    "currency": "UZS",
    "phone": "+998"
  }, {
    "continent": "South America",
    "iso2": "VC",
    "iso3": "VCT",
    "name": "Saint Vincent And The Grenadines",
    "tld": ".vc",
    "currency": "XCD",
    "phone": "+1784"
  }, {
    "continent": "South America",
    "iso2": "VE",
    "iso3": "VEN",
    "name": "Venezuela",
    "tld": ".ve",
    "currency": "VEB",
    "phone": "+58"
  }, {
    "continent": "North America",
    "iso2": "VG",
    "iso3": "VGB",
    "name": "Virgin Islands",
    "tld": " British",
    "currency": ".vg",
    "phone": "USD"
  }, {
    "continent": "South America",
    "iso2": "VI",
    "iso3": "VIR",
    "name": "Virgin Islands",
    "tld": " US",
    "currency": ".vi",
    "phone": "USD"
  }, {
    "continent": "Asia",
    "iso2": "VN",
    "iso3": "VNM",
    "name": "Vietnam",
    "tld": ".vn",
    "currency": "VND",
    "phone": "+84"
  }, {
    "continent": "Oceania",
    "iso2": "VU",
    "iso3": "VUT",
    "name": "Vanuatu",
    "tld": ".vu",
    "currency": "VUV",
    "phone": "+678"
  }, {
    "continent": "Oceania",
    "iso2": "WS",
    "iso3": "WSM",
    "name": "Samoa",
    "tld": ".ws",
    "currency": "WST",
    "phone": ""
  }, {
    "continent": "Asia",
    "iso2": "YE",
    "iso3": "YEM",
    "name": "Yemen",
    "tld": ".ye",
    "currency": "YER",
    "phone": "+967"
  }, {
    "continent": "Africa",
    "iso2": "YT",
    "iso3": "MYT",
    "name": "Mayotte",
    "tld": ".yt",
    "currency": "EUR",
    "phone": "+269"
  }, {
    "continent": "Africa",
    "iso2": "ZA",
    "iso3": "ZAF",
    "name": "South Africa",
    "tld": ".za",
    "currency": "ZAR",
    "phone": "+27"
  }, {
    "continent": "Africa",
    "iso2": "ZM",
    "iso3": "ZMB",
    "name": "Zambia",
    "tld": ".zm",
    "currency": "ZMK",
    "phone": "+260"
  }, {
    "continent": "Africa",
    "iso2": "ZW",
    "iso3": "ZWE",
    "name": "Zimbabwe",
    "tld": ".zw",
    "currency": "ZWD",
    "phone": "+263"
  }]
};

define("auf-utility-library/libs/countries", [],function(){});

window.Currencies = {
  "AED": "United Arab Emirates Dirham",
  "AFN": "Afghanistan Afghani",
  "ALL": "Albania Lek",
  "AMD": "Armenia Dram",
  "ANG": "Netherlands Antilles Guilder",
  "AOA": "Angola Kwanza",
  "ARS": "Argentina Peso",
  "AUD": "Australia Dollar",
  "AWG": "Aruba Guilder",
  "AZN": "Azerbaijan New Manat",
  "BAM": "Bosnia and Herzegovina Convertible Marka",
  "BBD": "Barbados Dollar",
  "BDT": "Bangladesh Taka",
  "BGN": "Bulgaria Lev",
  "BHD": "Bahrain Dinar",
  "BIF": "Burundi Franc",
  "BMD": "Bermuda Dollar",
  "BND": "Brunei Darussalam Dollar",
  "BOB": "Bolivia Boliviano",
  "BRL": "Brazil Real",
  "BSD": "Bahamas Dollar",
  "BTN": "Bhutan Ngultrum",
  "BWP": "Botswana Pula",
  "BYR": "Belarus Ruble",
  "BZD": "Belize Dollar",
  "CAD": "Canada Dollar",
  "CDF": "Congo/Kinshasa Franc",
  "CHF": "Switzerland Franc",
  "CLP": "Chile Peso",
  "CNY": "China Yuan Renminbi",
  "COP": "Colombia Peso",
  "CRC": "Costa Rica Colon",
  "CUC": "Cuba Convertible Peso",
  "CUP": "Cuba Peso",
  "CVE": "Cape Verde Escudo",
  "CZK": "Czech Republic Koruna",
  "DJF": "Djibouti Franc",
  "DKK": "Denmark Krone",
  "DOP": "Dominican Republic Peso",
  "DZD": "Algeria Dinar",
  "EGP": "Egypt Pound",
  "ERN": "Eritrea Nakfa",
  "ETB": "Ethiopia Birr",
  "EUR": "Euro Member Countries",
  "FJD": "Fiji Dollar",
  "FKP": "Falkland Islands (Malvinas) Pound",
  "GBP": "United Kingdom Pound",
  "GEL": "Georgia Lari",
  "GGP": "Guernsey Pound",
  "GHS": "Ghana Cedi",
  "GIP": "Gibraltar Pound",
  "GMD": "Gambia Dalasi",
  "GNF": "Guinea Franc",
  "GTQ": "Guatemala Quetzal",
  "GYD": "Guyana Dollar",
  "HKD": "Hong Kong Dollar",
  "HNL": "Honduras Lempira",
  "HRK": "Croatia Kuna",
  "HTG": "Haiti Gourde",
  "HUF": "Hungary Forint",
  "IDR": "Indonesia Rupiah",
  "ILS": "Israel Shekel",
  "IMP": "Isle of Man Pound",
  "INR": "India Rupee",
  "IQD": "Iraq Dinar",
  "IRR": "Iran Rial",
  "ISK": "Iceland Krona",
  "JEP": "Jersey Pound",
  "JMD": "Jamaica Dollar",
  "JOD": "Jordan Dinar",
  "JPY": "Japan Yen",
  "KES": "Kenya Shilling",
  "KGS": "Kyrgyzstan Som",
  "KHR": "Cambodia Riel",
  "KMF": "Comoros Franc",
  "KPW": "Korea (North) Won",
  "KRW": "Korea (South) Won",
  "KWD": "Kuwait Dinar",
  "KYD": "Cayman Islands Dollar",
  "KZT": "Kazakhstan Tenge",
  "LAK": "Laos Kip",
  "LBP": "Lebanon Pound",
  "LKR": "Sri Lanka Rupee",
  "LRD": "Liberia Dollar",
  "LSL": "Lesotho Loti",
  "LYD": "Libya Dinar",
  "MAD": "Morocco Dirham",
  "MDL": "Moldova Leu",
  "MGA": "Madagascar Ariary",
  "MKD": "Macedonia Denar",
  "MMK": "Myanmar (Burma) Kyat",
  "MNT": "Mongolia Tughrik",
  "MOP": "Macau Pataca",
  "MRO": "Mauritania Ouguiya",
  "MUR": "Mauritius Rupee",
  "MVR": "Maldives (Maldive Islands) Rufiyaa",
  "MWK": "Malawi Kwacha",
  "MXN": "Mexico Peso",
  "MYR": "Malaysia Ringgit",
  "MZN": "Mozambique Metical",
  "NAD": "Namibia Dollar",
  "NGN": "Nigeria Naira",
  "NIO": "Nicaragua Cordoba",
  "NOK": "Norway Krone",
  "NPR": "Nepal Rupee",
  "NZD": "New Zealand Dollar",
  "OMR": "Oman Rial",
  "PAB": "Panama Balboa",
  "PEN": "Peru Nuevo Sol",
  "PGK": "Papua New Guinea Kina",
  "PHP": "Philippines Peso",
  "PKR": "Pakistan Rupee",
  "PLN": "Poland Zloty",
  "PYG": "Paraguay Guarani",
  "QAR": "Qatar Riyal",
  "RON": "Romania New Leu",
  "RSD": "Serbia Dinar",
  "RUB": "Russia Ruble",
  "RWF": "Rwanda Franc",
  "SAR": "Saudi Arabia Riyal",
  "SBD": "Solomon Islands Dollar",
  "SCR": "Seychelles Rupee",
  "SDG": "Sudan Pound",
  "SEK": "Sweden Krona",
  "SGD": "Singapore Dollar",
  "SHP": "Saint Helena Pound",
  "SLL": "Sierra Leone Leone",
  "SOS": "Somalia Shilling",
  "SPL": "Seborga Luigino",
  "SRD": "Suriname Dollar",
  "STD": "São Tomé and Príncipe Dobra",
  "SVC": "El Salvador Colon",
  "SYP": "Syria Pound",
  "SZL": "Swaziland Lilangeni",
  "THB": "Thailand Baht",
  "TJS": "Tajikistan Somoni",
  "TMT": "Turkmenistan Manat",
  "TND": "Tunisia Dinar",
  "TOP": "Tonga Pa'anga",
  "TRY": "Turkey Lira",
  "TTD": "Trinidad and Tobago Dollar",
  "TVD": "Tuvalu Dollar",
  "TWD": "Taiwan New Dollar",
  "TZS": "Tanzania Shilling",
  "UAH": "Ukraine Hryvnia",
  "UGX": "Uganda Shilling",
  "USD": "United States Dollar",
  "UYU": "Uruguay Peso",
  "UZS": "Uzbekistan Som",
  "VEF": "Venezuela Bolivar",
  "VND": "Viet Nam Dong",
  "VUV": "Vanuatu Vatu",
  "WST": "Samoa Tala",
  "XAF": "Communauté Financière Africaine (BEAC) CFA Franc BEAC",
  "XCD": "East Caribbean Dollar",
  "XDR": "International Monetary Fund (IMF) Special Drawing Rights",
  "XOF": "Communauté Financière Africaine (BCEAO) Franc",
  "XPF": "Comptoirs Français du Pacifique (CFP) Franc",
  "YER": "Yemen Rial",
  "ZAR": "South Africa Rand",
  "ZMW": "Zambia Kwacha",
  "ZWD": "Zimbabwe Dollar"
}

define("auf-utility-library/libs/currencies", [],function(){});

window.FileTypes = {
  "text/vnd.in3d.3dml": "3dml",
  "video/3gpp2": "3g2",
  "video/3gpp": "3gp",
  "application/x-7z-compressed": "7z",
  "application/x-authorware-bin": "aab",
  "audio/x-aac": "aac",
  "application/x-authorware-map": "aam",
  "application/x-authorware-seg": "aas",
  "application/x-abiword": "abw",
  "application/pkix-attr-cert": "ac",
  "application/vnd.americandynamics.acc": "acc",
  "application/x-ace-compressed": "ace",
  "application/vnd.acucobol": "acu",
  "audio/adpcm": "adp",
  "application/vnd.audiograph": "aep",
  "application/vnd.ibm.modcap": "afp",
  "application/vnd.ahead.space": "ahead",
  "application/postscript": "ai",
  "audio/x-aiff": "aif",
  "application/vnd.adobe.air-application-installer-package+zip": "air",
  "application/vnd.dvb.ait": "ait",
  "application/vnd.amiga.ami": "ami",
  "application/vnd.android.package-archive": "apk",
  "application/x-ms-application": "application",
  "application/vnd.lotus-approach": "apr",
  "video/x-ms-asf": "asf",
  "application/vnd.accpac.simply.aso": "aso",
  "application/vnd.acucorp": "atc",
  "application/atom+xml": "atom, xml",
  "application/atomcat+xml": "atomcat",
  "application/atomsvc+xml": "atomsvc",
  "application/vnd.antix.game-component": "atx",
  "audio/basic": "au",
  "video/x-msvideo": "avi",
  "application/applixware": "aw",
  "application/vnd.airzip.filesecure.azf": "azf",
  "application/vnd.airzip.filesecure.azs": "azs",
  "application/vnd.amazon.ebook": "azw",
  "application/x-bcpio": "bcpio",
  "application/x-font-bdf": "bdf",
  "application/vnd.syncml.dm+wbxml": "bdm",
  "application/vnd.realvnc.bed": "bed",
  "application/vnd.fujitsu.oasysprs": "bh2",
  "application/octet-stream": "bin",
  "application/vnd.bmi": "bmi",
  "image/bmp": "bmp",
  "application/vnd.previewsystems.box": "box",
  "image/prs.btif": "btif",
  "application/x-bzip": "bz",
  "application/x-bzip2": "bz2",
  "text/x-c": "c",
  "application/vnd.cluetrust.cartomobile-config": "c11amc",
  "application/vnd.cluetrust.cartomobile-config-pkg": "c11amz",
  "application/vnd.clonk.c4group": "c4g",
  "application/vnd.ms-cab-compressed": "cab",
  "application/vnd.curl.car": "car",
  "application/vnd.ms-pki.seccat": "cat",
  "application/ccxml+xml,": "ccxml",
  "application/vnd.contact.cmsg": "cdbcmsg",
  "application/vnd.mediastation.cdkey": "cdkey",
  "application/cdmi-capability": "cdmia",
  "application/cdmi-container": "cdmic",
  "application/cdmi-domain": "cdmid",
  "application/cdmi-object": "cdmio",
  "application/cdmi-queue": "cdmiq",
  "chemical/x-cdx": "cdx",
  "application/vnd.chemdraw+xml": "cdxml",
  "application/vnd.cinderella": "cdy",
  "application/pkix-cert": "cer",
  "image/cgm": "cgm",
  "application/x-chat": "chat",
  "application/vnd.ms-htmlhelp": "chm",
  "application/vnd.kde.kchart": "chrt",
  "chemical/x-cif": "cif",
  "application/vnd.anser-web-certificate-issue-initiation": "cii",
  "application/vnd.ms-artgalry": "cil",
  "application/vnd.claymore": "cla",
  "application/java-vm": "class",
  "application/vnd.crick.clicker.keyboard": "clkk",
  "application/vnd.crick.clicker.palette": "clkp",
  "application/vnd.crick.clicker.template": "clkt",
  "application/vnd.crick.clicker.wordbank": "clkw",
  "application/vnd.crick.clicker": "clkx",
  "application/x-msclip": "clp",
  "application/vnd.cosmocaller": "cmc",
  "chemical/x-cmdf": "cmdf",
  "chemical/x-cml": "cml",
  "application/vnd.yellowriver-custom-menu": "cmp",
  "image/x-cmx": "cmx",
  "application/vnd.rim.cod": "cod",
  "application/x-cpio": "cpio",
  "application/mac-compactpro": "cpt",
  "application/x-mscardfile": "crd",
  "application/pkix-crl": "crl",
  "application/vnd.rig.cryptonote": "cryptonote",
  "application/x-csh": "csh",
  "chemical/x-csml": "csml",
  "application/vnd.commonspace": "csp",
  "text/css": "css",
  "text/csv": "csv",
  "application/cu-seeme": "cu",
  "text/vnd.curl": "curl",
  "application/prs.cww": "cww",
  "model/vnd.collada+xml": "dae",
  "application/vnd.mobius.daf": "daf",
  "application/davmount+xml": "davmount",
  "text/vnd.curl.dcurl": "dcurl",
  "application/vnd.oma.dd2+xml": "dd2",
  "application/vnd.fujixerox.ddd": "ddd",
  "application/x-debian-package": "deb",
  "application/x-x509-ca-cert": "der",
  "application/vnd.dreamfactory": "dfac",
  "application/x-director": "dir",
  "application/vnd.mobius.dis": "dis",
  "image/vnd.djvu": "djvu",
  "application/vnd.dna": "dna",
  "application/msword": "doc",
  "application/vnd.ms-word.document.macroenabled.12": "docm",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.ms-word.template.macroenabled.12": "dotm",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": "dotx",
  "application/vnd.osgi.dp": "dp",
  "application/vnd.dpgraph": "dpg",
  "audio/vnd.dra": "dra",
  "text/prs.lines.tag": "dsc",
  "application/dssc+der": "dssc",
  "application/x-dtbook+xml": "dtb",
  "application/xml-dtd": "dtd",
  "audio/vnd.dts": "dts",
  "audio/vnd.dts.hd": "dtshd",
  "application/x-dvi": "dvi",
  "model/vnd.dwf": "dwf",
  "image/vnd.dwg": "dwg",
  "image/vnd.dxf": "dxf",
  "application/vnd.spotfire.dxp": "dxp",
  "audio/vnd.nuera.ecelp4800": "ecelp4800",
  "audio/vnd.nuera.ecelp7470": "ecelp7470",
  "audio/vnd.nuera.ecelp9600": "ecelp9600",
  "application/vnd.novadigm.edm": "edm",
  "application/vnd.novadigm.edx": "edx",
  "application/vnd.picsel": "efif",
  "application/vnd.pg.osasli": "ei6",
  "message/rfc822": "eml",
  "application/emma+xml": "emma",
  "audio/vnd.digital-winds": "eol",
  "application/vnd.ms-fontobject": "eot",
  "application/epub+zip": "epub",
  "application/ecmascript": "es",
  "application/vnd.eszigno3+xml": "es3",
  "application/vnd.epson.esf": "esf",
  "text/x-setext": "etx",
  "application/x-msdownload": "exe",
  "application/exi": "exi",
  "application/vnd.novadigm.ext": "ext",
  "application/vnd.ezpix-album": "ez2",
  "application/vnd.ezpix-package": "ez3",
  "text/x-fortran": "f",
  "video/x-f4v": "f4v",
  "image/vnd.fastbidsheet": "fbs",
  "application/vnd.isac.fcs": "fcs",
  "application/vnd.fdf": "fdf",
  "application/vnd.denovo.fcselayout-link": "fe_launch",
  "application/vnd.fujitsu.oasysgp": "fg5",
  "image/x-freehand": "fh",
  "application/x-xfig": "fig",
  "video/x-fli": "fli",
  "application/vnd.micrografx.flo": "flo",
  "video/x-flv": "flv",
  "application/vnd.kde.kivio": "flw",
  "text/vnd.fmi.flexstor": "flx",
  "text/vnd.fly": "fly",
  "application/vnd.framemaker": "fm",
  "application/vnd.frogans.fnc": "fnc",
  "image/vnd.fpx": "fpx",
  "application/vnd.fsc.weblaunch": "fsc",
  "image/vnd.fst": "fst",
  "application/vnd.fluxtime.clip": "ftc",
  "application/vnd.anser-web-funds-transfer-initiation": "fti",
  "video/vnd.fvt": "fvt",
  "application/vnd.adobe.fxp": "fxp",
  "application/vnd.fuzzysheet": "fzs",
  "application/vnd.geoplan": "g2w",
  "image/g3fax": "g3",
  "application/vnd.geospace": "g3w",
  "application/vnd.groove-account": "gac",
  "model/vnd.gdl": "gdl",
  "application/vnd.dynageo": "geo",
  "application/vnd.geometry-explorer": "gex",
  "application/vnd.geogebra.file": "ggb",
  "application/vnd.geogebra.tool": "ggt",
  "application/vnd.groove-help": "ghf",
  "image/gif": "gif",
  "application/vnd.groove-identity-message": "gim",
  "application/vnd.gmx": "gmx",
  "application/x-gnumeric": "gnumeric",
  "application/vnd.flographit": "gph",
  "application/vnd.grafeq": "gqf",
  "application/srgs": "gram",
  "application/vnd.groove-injector": "grv",
  "application/srgs+xml": "grxml",
  "application/x-font-ghostscript": "gsf",
  "application/x-gtar": "gtar",
  "application/vnd.groove-tool-message": "gtm",
  "model/vnd.gtw": "gtw",
  "text/vnd.graphviz": "gv",
  "application/vnd.geonext": "gxt",
  "video/h261": "h261",
  "video/h263": "h263",
  "video/h264": "h264",
  "application/vnd.hal+xml": "hal",
  "application/vnd.hbci": "hbci",
  "application/x-hdf": "hdf",
  "application/winhlp": "hlp",
  "application/vnd.hp-hpgl": "hpgl",
  "application/vnd.hp-hpid": "hpid",
  "application/vnd.hp-hps": "hps",
  "application/mac-binhex40": "hqx",
  "application/vnd.kenameaapp": "htke",
  "text/html": "html",
  "application/vnd.yamaha.hv-dic": "hvd",
  "application/vnd.yamaha.hv-voice": "hvp",
  "application/vnd.yamaha.hv-script": "hvs",
  "application/vnd.intergeo": "i2g",
  "application/vnd.iccprofile": "icc",
  "x-conference/x-cooltalk": "ice",
  "image/x-icon": "ico",
  "text/calendar": "ics",
  "image/ief": "ief",
  "application/vnd.shana.informed.formdata": "ifm",
  "application/vnd.igloader": "igl",
  "application/vnd.insors.igm": "igm",
  "model/iges": "igs",
  "application/vnd.micrografx.igx": "igx",
  "application/vnd.shana.informed.interchange": "iif",
  "application/vnd.accpac.simply.imp": "imp",
  "application/vnd.ms-ims": "ims",
  "application/ipfix": "ipfix",
  "application/vnd.shana.informed.package": "ipk",
  "application/vnd.ibm.rights-management": "irm",
  "application/vnd.irepository.package+xml": "irp",
  "application/vnd.shana.informed.formtemplate": "itp",
  "application/vnd.immervision-ivp": "ivp",
  "application/vnd.immervision-ivu": "ivu",
  "text/vnd.sun.j2me.app-descriptor": "jad",
  "application/vnd.jam": "jam",
  "application/java-archive": "jar",
  "text/x-java-source,java": "java",
  "application/vnd.jisp": "jisp",
  "application/vnd.hp-jlyt": "jlt",
  "application/x-java-jnlp-file": "jnlp",
  "application/vnd.joost.joda-archive": "joda",
  "image/jpeg": "jpeg, jpg",
  "video/jpeg": "jpgv",
  "video/jpm": "jpm",
  "application/javascript": "js",
  "application/json": "json",
  "application/vnd.kde.karbon": "karbon",
  "application/vnd.kde.kformula": "kfo",
  "application/vnd.kidspiration": "kia",
  "application/vnd.google-earth.kml+xml": "kml",
  "application/vnd.google-earth.kmz": "kmz",
  "application/vnd.kinar": "kne",
  "application/vnd.kde.kontour": "kon",
  "application/vnd.kde.kpresenter": "kpr",
  "application/vnd.kde.kspread": "ksp",
  "image/ktx": "ktx",
  "application/vnd.kahootz": "ktz",
  "application/vnd.kde.kword": "kwd",
  "application/vnd.las.las+xml": "lasxml",
  "application/x-latex": "latex",
  "application/vnd.llamagraphics.life-balance.desktop": "lbd",
  "application/vnd.llamagraphics.life-balance.exchange+xml": "lbe",
  "application/vnd.hhe.lesson-player": "les",
  "application/vnd.route66.link66+xml": "link66",
  "application/vnd.ms-lrm": "lrm",
  "application/vnd.frogans.ltf": "ltf",
  "audio/vnd.lucent.voice": "lvp",
  "application/vnd.lotus-wordpro": "lwp",
  "application/mp21": "m21",
  "audio/x-mpegurl": "m3u",
  "application/vnd.apple.mpegurl": "m3u8",
  "video/x-m4v": "m4v",
  "application/mathematica": "ma",
  "application/mads+xml": "mads",
  "application/vnd.ecowin.chart": "mag",
  "application/mathml+xml": "mathml",
  "application/vnd.mobius.mbk": "mbk",
  "application/mbox": "mbox",
  "application/vnd.medcalcdata": "mc1",
  "application/vnd.mcd": "mcd",
  "text/vnd.curl.mcurl": "mcurl",
  "application/x-msaccess": "mdb",
  "image/vnd.ms-modi": "mdi",
  "application/metalink4+xml": "meta4",
  "application/mets+xml": "mets",
  "application/vnd.mfmp": "mfm",
  "application/vnd.osgeo.mapguide.package": "mgp",
  "application/vnd.proteus.magazine": "mgz",
  "audio/midi": "mid",
  "application/vnd.mif": "mif",
  "video/mj2": "mj2",
  "application/vnd.dolby.mlp": "mlp",
  "application/vnd.chipnuts.karaoke-mmd": "mmd",
  "application/vnd.smaf": "mmf",
  "image/vnd.fujixerox.edmics-mmr": "mmr",
  "application/x-msmoney": "mny",
  "application/mods+xml": "mods",
  "video/x-sgi-movie": "movie",
  "video/mp4": "mp4",
  "application/mp4": "mp4",
  "audio/mp4": "mp4a",
  "application/vnd.mophun.certificate": "mpc",
  "video/mpeg": "mpeg",
  "audio/mpeg": "mpga",
  "application/vnd.apple.installer+xml": "mpkg",
  "application/vnd.blueice.multipass": "mpm",
  "application/vnd.mophun.application": "mpn",
  "application/vnd.ms-project": "mpp",
  "application/vnd.ibm.minipay": "mpy",
  "application/vnd.mobius.mqy": "mqy",
  "application/marc": "mrc",
  "application/marcxml+xml": "mrcx",
  "application/mediaservercontrol+xml": "mscml",
  "application/vnd.mseq": "mseq",
  "application/vnd.epson.msf": "msf",
  "model/mesh": "msh",
  "application/vnd.mobius.msl": "msl",
  "application/vnd.muvee.style": "msty",
  "model/vnd.mts": "mts",
  "application/vnd.musician": "mus",
  "application/vnd.recordare.musicxml+xml": "musicxml",
  "application/x-msmediaview": "mvb",
  "application/vnd.mfer": "mwf",
  "application/mxf": "mxf",
  "application/vnd.recordare.musicxml": "mxl",
  "application/xv+xml": "mxml",
  "application/vnd.triscape.mxs": "mxs",
  "video/vnd.mpegurl": "mxu",
  "application/vnd.nokia.n-gage.symbian.install": "n-gage",
  "application/andrew-inset": "N/A",
  "text/n3": "n3",
  "application/vnd.wolfram.player": "nbp",
  "application/x-netcdf": "nc",
  "application/x-dtbncx+xml": "ncx",
  "application/vnd.nokia.n-gage.data": "ngdat",
  "application/vnd.neurolanguage.nlu": "nlu",
  "application/vnd.enliven": "nml",
  "application/vnd.noblenet-directory": "nnd",
  "application/vnd.noblenet-sealer": "nns",
  "application/vnd.noblenet-web": "nnw",
  "image/vnd.net-fpx": "npx",
  "application/vnd.lotus-notes": "nsf",
  "application/vnd.fujitsu.oasys2": "oa2",
  "application/vnd.fujitsu.oasys3": "oa3",
  "application/vnd.fujitsu.oasys": "oas",
  "application/x-msbinder": "obd",
  "application/oda": "oda",
  "application/vnd.oasis.opendocument.database": "odb",
  "application/vnd.oasis.opendocument.chart": "odc",
  "application/vnd.oasis.opendocument.formula": "odf",
  "application/vnd.oasis.opendocument.formula-template": "odft",
  "application/vnd.oasis.opendocument.graphics": "odg",
  "application/vnd.oasis.opendocument.image": "odi",
  "application/vnd.oasis.opendocument.text-master": "odm",
  "application/vnd.oasis.opendocument.presentation": "odp",
  "application/vnd.oasis.opendocument.spreadsheet": "ods",
  "application/vnd.oasis.opendocument.text": "odt",
  "audio/ogg": "oga",
  "video/ogg": "ogv",
  "application/ogg": "ogx",
  "application/onenote": "onetoc",
  "application/oebps-package+xml": "opf",
  "application/vnd.lotus-organizer": "org",
  "application/vnd.yamaha.openscoreformat": "osf",
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": "osfpvg",
  "application/vnd.oasis.opendocument.chart-template": "otc",
  "application/x-font-otf": "otf",
  "application/vnd.oasis.opendocument.graphics-template": "otg",
  "application/vnd.oasis.opendocument.text-web": "oth",
  "application/vnd.oasis.opendocument.image-template": "oti",
  "application/vnd.oasis.opendocument.presentation-template": "otp",
  "application/vnd.oasis.opendocument.spreadsheet-template": "ots",
  "application/vnd.oasis.opendocument.text-template": "ott",
  "application/vnd.openofficeorg.extension": "oxt",
  "text/x-pascal": "p",
  "application/pkcs10": "p10",
  "application/x-pkcs12": "p12",
  "application/x-pkcs7-certificates": "p7b",
  "application/pkcs7-mime": "p7m",
  "application/x-pkcs7-certreqresp": "p7r",
  "application/pkcs7-signature": "p7s",
  "application/pkcs8": "p8",
  "text/plain-bas": "par",
  "application/vnd.pawaafile": "paw",
  "application/vnd.powerbuilder6": "pbd",
  "image/x-portable-bitmap": "pbm",
  "application/x-font-pcf": "pcf",
  "application/vnd.hp-pcl": "pcl",
  "application/vnd.hp-pclxl": "pclxl",
  "application/vnd.curl.pcurl": "pcurl",
  "image/x-pcx": "pcx",
  "application/vnd.palm": "pdb",
  "application/pdf": "pdf",
  "application/x-font-type1": "pfa",
  "application/font-tdpfr": "pfr",
  "image/x-portable-graymap": "pgm",
  "application/x-chess-pgn": "pgn",
  "application/pgp-signature": "pgp",
  "image/x-pict": "pic",
  "application/pkixcmp": "pki",
  "application/pkix-pkipath": "pkipath",
  "application/vnd.3gpp.pic-bw-large": "plb",
  "application/vnd.mobius.plc": "plc",
  "application/vnd.pocketlearn": "plf",
  "application/pls+xml": "pls",
  "application/vnd.ctc-posml": "pml",
  "image/png": "png",
  "image/x-portable-anymap": "pnm",
  "application/vnd.macports.portpkg": "portpkg",
  "application/vnd.ms-powerpoint.template.macroenabled.12": "potm",
  "application/vnd.openxmlformats-officedocument.presentationml.template": "potx",
  "application/vnd.ms-powerpoint.addin.macroenabled.12": "ppam",
  "application/vnd.cups-ppd": "ppd",
  "image/x-portable-pixmap": "ppm",
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": "ppsm",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": "ppsx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": "pptm",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
  "application/x-mobipocket-ebook": "prc",
  "application/vnd.lotus-freelance": "pre",
  "application/pics-rules": "prf",
  "application/vnd.3gpp.pic-bw-small": "psb",
  "image/vnd.adobe.photoshop": "psd",
  "application/x-font-linux-psf": "psf",
  "application/pskc+xml": "pskcxml",
  "application/vnd.pvi.ptid1": "ptid",
  "application/x-mspublisher": "pub",
  "application/vnd.3gpp.pic-bw-var": "pvb",
  "application/vnd.3m.post-it-notes": "pwn",
  "audio/vnd.ms-playready.media.pya": "pya",
  "video/vnd.ms-playready.media.pyv": "pyv",
  "application/vnd.epson.quickanime": "qam",
  "application/vnd.intu.qbo": "qbo",
  "application/vnd.intu.qfx": "qfx",
  "application/vnd.publishare-delta-tree": "qps",
  "video/quicktime": "qt",
  "application/vnd.quark.quarkxpress": "qxd",
  "audio/x-pn-realaudio": "ram",
  "application/x-rar-compressed": "rar",
  "image/x-cmu-raster": "ras",
  "application/vnd.ipunplugged.rcprofile": "rcprofile",
  "application/rdf+xml": "rdf",
  "application/vnd.data-vision.rdz": "rdz",
  "application/vnd.businessobjects": "rep",
  "application/x-dtbresource+xml": "res",
  "image/x-rgb": "rgb",
  "application/reginfo+xml": "rif",
  "audio/vnd.rip": "rip",
  "application/resource-lists+xml": "rl",
  "image/vnd.fujixerox.edmics-rlc": "rlc",
  "application/resource-lists-diff+xml": "rld",
  "application/vnd.rn-realmedia": "rm",
  "audio/x-pn-realaudio-plugin": "rmp",
  "application/vnd.jcp.javame.midlet-rms": "rms",
  "application/relax-ng-compact-syntax": "rnc",
  "application/vnd.cloanto.rp9": "rp9",
  "application/vnd.nokia.radio-presets": "rpss",
  "application/vnd.nokia.radio-preset": "rpst",
  "application/sparql-query": "rq",
  "application/rls-services+xml": "rs",
  "application/rsd+xml": "rsd",
  "application/rss+xml": "rss, xml",
  "application/rtf": "rtf",
  "text/richtext": "rtx",
  "text/x-asm": "s",
  "application/vnd.yamaha.smaf-audio": "saf",
  "application/sbml+xml": "sbml",
  "application/vnd.ibm.secure-container": "sc",
  "application/x-msschedule": "scd",
  "application/vnd.lotus-screencam": "scm",
  "application/scvp-cv-request": "scq",
  "application/scvp-cv-response": "scs",
  "text/vnd.curl.scurl": "scurl",
  "application/vnd.stardivision.draw": "sda",
  "application/vnd.stardivision.calc": "sdc",
  "application/vnd.stardivision.impress": "sdd",
  "application/vnd.solent.sdkm+xml": "sdkm",
  "application/sdp": "sdp",
  "application/vnd.stardivision.writer": "sdw",
  "application/vnd.seemail": "see",
  "application/vnd.fdsn.seed": "seed",
  "application/vnd.sema": "sema",
  "application/vnd.semd": "semd",
  "application/vnd.semf": "semf",
  "application/java-serialized-object": "ser",
  "application/set-payment-initiation": "setpay",
  "application/set-registration-initiation": "setreg",
  "application/vnd.hydrostatix.sof-data": "sfd-hdstx",
  "application/vnd.spotfire.sfs": "sfs",
  "application/vnd.stardivision.writer-global": "sgl",
  "text/sgml": "sgml",
  "application/x-sh": "sh",
  "application/x-shar": "shar",
  "application/shf+xml": "shf",
  "application/vnd.symbian.install": "sis",
  "application/x-stuffit": "sit",
  "application/x-stuffitx": "sitx",
  "application/vnd.koan": "skp",
  "application/vnd.ms-powerpoint.slide.macroenabled.12": "sldm",
  "application/vnd.openxmlformats-officedocument.presentationml.slide": "sldx",
  "application/vnd.epson.salt": "slt",
  "application/vnd.stepmania.stepchart": "sm",
  "application/vnd.stardivision.math": "smf",
  "application/smil+xml": "smi",
  "application/x-font-snf": "snf",
  "application/vnd.yamaha.smaf-phrase": "spf",
  "application/x-futuresplash": "spl",
  "text/vnd.in3d.spot": "spot",
  "application/scvp-vp-response": "spp",
  "application/scvp-vp-request": "spq",
  "application/x-wais-source": "src",
  "application/sru+xml": "sru",
  "application/sparql-results+xml": "srx",
  "application/vnd.kodak-descriptor": "sse",
  "application/vnd.epson.ssf": "ssf",
  "application/ssml+xml": "ssml",
  "application/vnd.sailingtracker.track": "st",
  "application/vnd.sun.xml.calc.template": "stc",
  "application/vnd.sun.xml.draw.template": "std",
  "application/vnd.wt.stf": "stf",
  "application/vnd.sun.xml.impress.template": "sti",
  "application/hyperstudio": "stk",
  "application/vnd.ms-pki.stl": "stl",
  "application/vnd.pg.format": "str",
  "application/vnd.sun.xml.writer.template": "stw",
  "image/vnd.dvb.subtitle": "sub",
  "application/vnd.sus-calendar": "sus",
  "application/x-sv4cpio": "sv4cpio",
  "application/x-sv4crc": "sv4crc",
  "application/vnd.dvb.service": "svc",
  "application/vnd.svd": "svd",
  "image/svg+xml": "svg",
  "application/x-shockwave-flash": "swf",
  "application/vnd.aristanetworks.swi": "swi",
  "application/vnd.sun.xml.calc": "sxc",
  "application/vnd.sun.xml.draw": "sxd",
  "application/vnd.sun.xml.writer.global": "sxg",
  "application/vnd.sun.xml.impress": "sxi",
  "application/vnd.sun.xml.math": "sxm",
  "application/vnd.sun.xml.writer": "sxw",
  "text/troff": "t",
  "application/vnd.tao.intent-module-archive": "tao",
  "application/x-tar": "tar",
  "application/vnd.3gpp2.tcap": "tcap",
  "application/x-tcl": "tcl",
  "application/vnd.smart.teacher": "teacher",
  "application/tei+xml": "tei",
  "application/x-tex": "tex",
  "application/x-texinfo": "texinfo",
  "application/thraud+xml": "tfi",
  "application/x-tex-tfm": "tfm",
  "application/vnd.ms-officetheme": "thmx",
  "image/tiff": "tiff",
  "application/vnd.tmobile-livetv": "tmo",
  "application/x-bittorrent": "torrent",
  "application/vnd.groove-tool-template": "tpl",
  "application/vnd.trid.tpt": "tpt",
  "application/vnd.trueapp": "tra",
  "application/x-msterminal": "trm",
  "application/timestamped-data": "tsd",
  "text/tab-separated-values": "tsv",
  "application/x-font-ttf": "ttf",
  "text/turtle": "ttl",
  "application/vnd.simtech-mindmapper": "twd",
  "application/vnd.genomatix.tuxedo": "txd",
  "application/vnd.mobius.txf": "txf",
  "text/plain": "txt",
  "application/vnd.ufdl": "ufd",
  "application/vnd.umajin": "umj",
  "application/vnd.unity": "unityweb",
  "application/vnd.uoml+xml": "uoml",
  "text/uri-list": "uri",
  "application/x-ustar": "ustar",
  "application/vnd.uiq.theme": "utz",
  "text/x-uuencode": "uu",
  "audio/vnd.dece.audio": "uva",
  "video/vnd.dece.hd": "uvh",
  "image/vnd.dece.graphic": "uvi",
  "video/vnd.dece.mobile": "uvm",
  "video/vnd.dece.pd": "uvp",
  "video/vnd.dece.sd": "uvs",
  "video/vnd.uvvu.mp4": "uvu",
  "video/vnd.dece.video": "uvv",
  "application/x-cdlink": "vcd",
  "text/x-vcard": "vcf",
  "application/vnd.groove-vcard": "vcg",
  "text/x-vcalendar": "vcs",
  "application/vnd.vcx": "vcx",
  "application/vnd.visionary": "vis",
  "video/vnd.vivo": "viv",
  "application/vnd.visio": "vsd",
  "application/vnd.vsf": "vsf",
  "model/vnd.vtu": "vtu",
  "application/voicexml+xml": "vxml",
  "application/x-doom": "wad",
  "audio/x-wav": "wav",
  "audio/x-ms-wax": "wax",
  "image/vnd.wap.wbmp": "wbmp",
  "application/vnd.criticaltools.wbs+xml": "wbs",
  "application/vnd.wap.wbxml": "wbxml",
  "audio/webm": "weba",
  "video/webm": "webm",
  "image/webp": "webp",
  "application/vnd.pmi.widget": "wg",
  "application/widget": "wgt",
  "video/x-ms-wm": "wm",
  "audio/x-ms-wma": "wma",
  "application/x-ms-wmd": "wmd",
  "application/x-msmetafile": "wmf",
  "text/vnd.wap.wml": "wml",
  "application/vnd.wap.wmlc": "wmlc",
  "text/vnd.wap.wmlscript": "wmls",
  "application/vnd.wap.wmlscriptc": "wmlsc",
  "video/x-ms-wmv": "wmv",
  "video/x-ms-wmx": "wmx",
  "application/x-ms-wmz": "wmz",
  "application/x-font-woff": "woff",
  "application/vnd.wordperfect": "wpd",
  "application/vnd.ms-wpl": "wpl",
  "application/vnd.ms-works": "wps",
  "application/vnd.wqd": "wqd",
  "application/x-mswrite": "wri",
  "model/vrml": "wrl",
  "application/wsdl+xml": "wsdl",
  "application/wspolicy+xml": "wspolicy",
  "application/vnd.webturbo": "wtb",
  "video/x-ms-wvx": "wvx",
  "application/vnd.hzn-3d-crossword": "x3d",
  "application/x-silverlight-app": "xap",
  "application/vnd.xara": "xar",
  "application/x-ms-xbap": "xbap",
  "application/vnd.fujixerox.docuworks.binder": "xbd",
  "image/x-xbitmap": "xbm",
  "application/xcap-diff+xml": "xdf",
  "application/vnd.syncml.dm+xml": "xdm",
  "application/vnd.adobe.xdp+xml": "xdp",
  "application/dssc+xml": "xdssc",
  "application/vnd.fujixerox.docuworks": "xdw",
  "application/xenc+xml": "xenc",
  "application/patch-ops-error+xml": "xer",
  "application/vnd.adobe.xfdf": "xfdf",
  "application/vnd.xfdl": "xfdl",
  "application/xhtml+xml": "xhtml",
  "image/vnd.xiff": "xif",
  "application/vnd.ms-excel.addin.macroenabled.12": "xlam",
  "application/vnd.ms-excel": "xls",
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": "xlsb",
  "application/vnd.ms-excel.sheet.macroenabled.12": "xlsm",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel.template.macroenabled.12": "xltm",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": "xltx",
  "application/xml": "xml",
  "application/vnd.olpc-sugar": "xo",
  "application/xop+xml": "xop",
  "application/x-xpinstall": "xpi",
  "image/x-xpixmap": "xpm",
  "application/vnd.is-xpr": "xpr",
  "application/vnd.ms-xpsdocument": "xps",
  "application/vnd.intercon.formnet": "xpw",
  "application/xslt+xml": "xslt",
  "application/vnd.syncml+xml": "xsm",
  "application/xspf+xml": "xspf",
  "application/vnd.mozilla.xul+xml": "xul",
  "image/x-xwindowdump": "xwd",
  "chemical/x-xyz": "xyz",
  "text/yaml": "yaml",
  "application/yang": "yang",
  "application/yin+xml": "yin",
  "application/vnd.zzazz.deck+xml": "zaz",
  "application/zip": "zip",
  "application/vnd.zul": "zir",
  "application/vnd.handheld-entertainment+xml": "zmm"
}

define("auf-utility-library/libs/filetypes", [],function(){});

(function(){for(var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},l="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global?global:this,n=["String","prototype","repeat"],ba=0;ba<n.length-1;ba++){var ca=n[ba];ca in l||(l[ca]={});l=l[ca]}
var da=n[n.length-1],ea=l[da],fa=ea?ea:function(a){var b;if(null==this)throw new TypeError("The 'this' value for String.prototype.repeat must not be null or undefined");b=this+"";if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var c="";a;)if(a&1&&(c+=b),a>>>=1)b+=b;return c};fa!=ea&&null!=fa&&aa(l,da,{configurable:!0,writable:!0,value:fa});var ga=this;function p(a){return"string"==typeof a}
function q(a,b){var c=a.split("."),d=ga;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d[e]?d=d[e]:d=d[e]={}:d[e]=b}function r(a,b){function c(){}c.prototype=b.prototype;a.ma=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.la=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};function t(a,b){null!=a&&this.a.apply(this,arguments)}t.prototype.b="";t.prototype.set=function(a){this.b=""+a};t.prototype.a=function(a,b,c){this.b+=String(a);if(null!=b)for(var d=1;d<arguments.length;d++)this.b+=arguments[d];return this};function u(a){a.b=""}t.prototype.toString=function(){return this.b};var ha=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(p(a))return p(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};function ia(a,b){a.sort(b||ja)}function ja(a,b){return a>b?1:a<b?-1:0};function ka(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};function la(a,b){this.b=a;this.a={};for(var c=0;c<b.length;c++){var d=b[c];this.a[d.a]=d}}function ma(a){a=ka(a.a);ia(a,function(a,c){return a.a-c.a});return a};function na(a,b){this.a=a;this.g=!!b.u;this.b=b.c;this.j=b.type;this.i=!1;switch(this.b){case pa:case qa:case ra:case sa:case ta:case ua:case va:this.i=!0}this.f=b.defaultValue}var va=1,ua=2,pa=3,qa=4,ra=6,sa=16,ta=18;function v(){this.b={};this.f=this.h().a;this.a=this.g=null}v.prototype.has=function(a){return w(this,a.a)};v.prototype.get=function(a,b){return x(this,a.a,b)};v.prototype.set=function(a,b){y(this,a.a,b)};
function wa(a,b){for(var c=ma(a.h()),d=0;d<c.length;d++){var e=c[d],f=e.a;if(w(b,f)){a.a&&delete a.a[e.a];var g=11==e.b||10==e.b;if(e.g)for(var e=z(b,f),h=0;h<e.length;h++){var k=a,m=f,A=g?e[h].clone():e[h];k.b[m]||(k.b[m]=[]);k.b[m].push(A);k.a&&delete k.a[m]}else e=B(b,f),g?(g=B(a,f))?wa(g,e):y(a,f,e.clone()):y(a,f,e)}}}v.prototype.clone=function(){var a=new this.constructor;a!=this&&(a.b={},a.a&&(a.a={}),wa(a,this));return a};function w(a,b){return null!=a.b[b]}
function B(a,b){var c=a.b[b];if(null==c)return null;if(a.g){if(!(b in a.a)){var d=a.g,e=a.f[b];if(null!=c)if(e.g){for(var f=[],g=0;g<c.length;g++)f[g]=d.a(e,c[g]);c=f}else c=d.a(e,c);return a.a[b]=c}return a.a[b]}return c}function x(a,b,c){var d=B(a,b);return a.f[b].g?d[c||0]:d}function C(a,b){var c;if(w(a,b))c=x(a,b,void 0);else a:{c=a.f[b];if(void 0===c.f){var d=c.j;if(d===Boolean)c.f=!1;else if(d===Number)c.f=0;else if(d===String)c.f=c.i?"0":"";else{c=new d;break a}}c=c.f}return c}
function z(a,b){return B(a,b)||[]}function D(a,b){return a.f[b].g?w(a,b)?a.b[b].length:0:w(a,b)?1:0}function y(a,b,c){a.b[b]=c;a.a&&(a.a[b]=c)}function xa(a,b){delete a.b[b];a.a&&delete a.a[b]}function E(a,b){var c=[],d;for(d in b)0!=d&&c.push(new na(d,b[d]));return new la(a,c)};/*

 Protocol Buffer 2 Copyright 2008 Google Inc.
 All other code copyright its respective owners.
 Copyright (C) 2010 The Libphonenumber Authors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function F(){v.call(this)}r(F,v);var ya=null;function G(){v.call(this)}r(G,v);var za=null;function H(){v.call(this)}r(H,v);var Aa=null;
F.prototype.h=function(){var a=ya;a||(ya=a=E(F,{0:{name:"NumberFormat",ba:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,c:9,type:String},2:{name:"format",required:!0,c:9,type:String},3:{name:"leading_digits_pattern",u:!0,c:9,type:String},4:{name:"national_prefix_formatting_rule",c:9,type:String},6:{name:"national_prefix_optional_when_formatting",c:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",c:9,type:String}}));return a};F.h=F.prototype.h;
G.prototype.h=function(){var a=za;a||(za=a=E(G,{0:{name:"PhoneNumberDesc",ba:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",c:9,type:String},3:{name:"possible_number_pattern",c:9,type:String},9:{name:"possible_length",u:!0,c:5,type:Number},10:{name:"possible_length_local_only",u:!0,c:5,type:Number},6:{name:"example_number",c:9,type:String},7:{name:"national_number_matcher_data",c:12,type:String}}));return a};G.h=G.prototype.h;
H.prototype.h=function(){var a=Aa;a||(Aa=a=E(H,{0:{name:"PhoneMetadata",ba:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",c:11,type:G},2:{name:"fixed_line",c:11,type:G},3:{name:"mobile",c:11,type:G},4:{name:"toll_free",c:11,type:G},5:{name:"premium_rate",c:11,type:G},6:{name:"shared_cost",c:11,type:G},7:{name:"personal_number",c:11,type:G},8:{name:"voip",c:11,type:G},21:{name:"pager",c:11,type:G},25:{name:"uan",c:11,type:G},27:{name:"emergency",c:11,type:G},28:{name:"voicemail",c:11,type:G},
24:{name:"no_international_dialling",c:11,type:G},9:{name:"id",required:!0,c:9,type:String},10:{name:"country_code",c:5,type:Number},11:{name:"international_prefix",c:9,type:String},17:{name:"preferred_international_prefix",c:9,type:String},12:{name:"national_prefix",c:9,type:String},13:{name:"preferred_extn_prefix",c:9,type:String},15:{name:"national_prefix_for_parsing",c:9,type:String},16:{name:"national_prefix_transform_rule",c:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",c:8,defaultValue:!1,
type:Boolean},19:{name:"number_format",u:!0,c:11,type:F},20:{name:"intl_number_format",u:!0,c:11,type:F},22:{name:"main_country_for_code",c:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",c:9,type:String},26:{name:"leading_zero_possible",c:8,defaultValue:!1,type:Boolean}}));return a};H.h=H.prototype.h;function I(){}I.prototype.b=function(a){new a.b;throw Error("Unimplemented");};I.prototype.a=function(a,b){if(11==a.b||10==a.b)return b instanceof v?b:this.b(a.j.prototype.h(),b);if(14==a.b){if(p(b)&&Ba.test(b)){var c=Number(b);if(0<c)return c}return b}if(!a.i)return b;c=a.j;if(c===String){if("number"==typeof b)return String(b)}else if(c===Number&&p(b)&&("Infinity"===b||"-Infinity"===b||"NaN"===b||Ba.test(b)))return Number(b);return b};var Ba=/^-?[0-9]+$/;function Ca(){}r(Ca,I);Ca.prototype.b=function(a,b){var c=new a.b;c.g=this;c.b=b;c.a={};return c};function Da(){}r(Da,Ca);Da.prototype.a=function(a,b){return 8==a.b?!!b:I.prototype.a.apply(this,arguments)};function J(){v.call(this)}var Ea;r(J,v);var Fa={ka:1,ja:5,ia:10,ha:20};
J.prototype.h=function(){Ea||(Ea=E(J,{0:{name:"PhoneNumber",ba:"i18n.phonenumbers.PhoneNumber"},1:{name:"country_code",required:!0,c:5,type:Number},2:{name:"national_number",required:!0,c:4,type:Number},3:{name:"extension",c:9,type:String},4:{name:"italian_leading_zero",c:8,type:Boolean},8:{name:"number_of_leading_zeros",c:5,defaultValue:1,type:Number},5:{name:"raw_input",c:9,type:String},6:{name:"country_code_source",c:14,defaultValue:1,type:Fa},7:{name:"preferred_domestic_carrier_code",c:9,type:String}}));
return Ea};J.ctor=J;J.ctor.h=J.prototype.h;/*

 Copyright (C) 2010 The Libphonenumber Authors

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
var K={1:"US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],
86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],
253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],385:["HR"],386:["SI"],
387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],691:["FM"],
692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]},Ga={AC:[,[,,"[46]\\d{4}|[01589]\\d{5}",,,,,,,[5,6]],
[,,"6[2-467]\\d{3}",,,,"62889",,,[5]],[,,"4\\d{4}",,,,"40123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AC",247,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[01589]\\d{5}",,,,"542011",,,[6]],,,[,,,,,,,,,[-1]]],AD:[,[,,"[16]\\d{5,8}|[37-9]\\d{5}",,,,,,,[6,8,9]],[,,"[78]\\d{5}",,,,"712345",,,[6]],[,,"(?:3\\d|6(?:[0-8]|90\\d{2}))\\d{4}",,,,"312345",,,[6,9]],[,,"180[02]\\d{4}",,,,"18001234",,,[8]],[,,"[19]\\d{5}",,,,"912345",,,[6]],[,,,,,,,,,[-1]],
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AD",376,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[137-9]|6[0-8]"]],[,"(\\d{4})(\\d{4})","$1 $2",["180","180[02]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["690"]]],,[,,,,,,,,,[-1]],,,[,,"1800\\d{4}",,,,"18000000",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AE:[,[,,"[2-79]\\d{7,8}|800\\d{2,9}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"[2-4679][2-8]\\d{6}",,,,"22345678",,,[8],[7]],[,,"5[024-68]\\d{7}",,,,"501234567",,,[9]],[,,"400\\d{6}|800\\d{2,9}",,,,"800123456"],[,,"900[02]\\d{5}",
,,,"900234567",,,[9]],[,,"700[05]\\d{5}",,,,"700012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AE",971,"00","0",,,"0",,,,[[,"([2-4679])(\\d{3})(\\d{4})","$1 $2 $3",["[2-4679][2-8]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"([479]00)(\\d)(\\d{5})","$1 $2 $3",["[479]0"],"$1"],[,"([68]00)(\\d{2,9})","$1 $2",["60|8"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"600[25]\\d{5}",,,,"600212345",,,[9]],,,[,,,,,,,,,[-1]]],AF:[,[,,"[2-7]\\d{8}",,,,,,,[9],[7]],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",
,,,"234567890",,,,[7]],[,,"7(?:[014-9]\\d|2[89]|30)\\d{6}",,,,"701234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AF",93,"00","0",,,"0",,,,[[,"([2-7]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AG:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",,,,"2684601234",,,,[7]],[,,"268(?:464|7(?:2\\d|3[246]|64|7[0-689]|8[02-68]))\\d{4}",,,,"2684641234",,,,[7]],
[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"26848[01]\\d{4}",,,,"2684801234",,,,[7]],"AG",1,"011","1",,,"1",,,,,,[,,"26840[69]\\d{4}",,,,"2684061234",,,,[7]],,"268",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AI:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"2644(?:6[12]|9[78])\\d{4}",,,,"2644612345",,,,[7]],[,,"264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",,,,"2642351234",
,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AI",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"264",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AL:[,[,,"[2-57]\\d{7}|6\\d{8}|8\\d{5,7}|9\\d{5}",,,,,,,[6,7,8,9],[5]],[,,"(?:2(?:1(?:0[2-9]|[1-9]\\d)|[247]\\d{2}|[35][2-9]\\d|[68](?:0[2-9]|[1-9]\\d)|9(?:[089][2-9]|[1-7]\\d))|3(?:1(?:[04-9][2-9]|[1-3]\\d)|[2-6]\\d{2}|[79](?:[09][2-9]|[1-8]\\d)|8(?:0[2-9]|[1-9]\\d))|4\\d{3}|5(?:1(?:[05-9][2-9]|[1-4]\\d)|[2-578]\\d{2}|6(?:[06-9][2-9]|[1-5]\\d)|9(?:[089][2-9]|[1-7]\\d))|8(?:[19](?:[06-9][2-9]|[1-5]\\d)|[2-6]\\d{2}|[78](?:[089][2-9]|[1-7]\\d)))\\d{4}",
,,,"22345678",,,[8],[5,6,7]],[,,"6(?:[2-5][2-9]|[6-9]\\d)\\d{6}",,,,"661234567",,,[9]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"900\\d{3}",,,,"900123",,,[6]],[,,"808\\d{3}",,,,"808123",,,[6]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"AL",355,"00","0",,,"0",,,,[[,"(4)(\\d{3})(\\d{4})","$1 $2 $3",["4[0-6]"],"0$1"],[,"(6\\d)(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4[7-9]"],"0$1"],[,"(\\d{3})(\\d{3,5})","$1 $2",["[235][16-9]|8[016-9]|[79]"],
"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AM:[,[,,"[1-9]\\d{7}",,,,,,,[8],[5,6]],[,,"(?:1[0-2]\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2|47\\d)\\d{5}",,,,"10123456",,,,[5,6]],[,,"(?:4[1349]|55|77|9[1-9])\\d{6}",,,,"77123456"],[,,"800\\d{5}",,,,"80012345"],[,,"90[016]\\d{5}",,,,"90012345"],[,,"80[1-4]\\d{5}",,,,"80112345"],[,,,,,,,,,[-1]],[,,"60(?:2[078]|[3-7]\\d|8[0-5])\\d{4}",,,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",
["1|47"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["4[1349]|[5-7]|9[1-9]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[23]"],"(0$1)"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["8|90"],"0 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AO:[,[,,"[29]\\d{8}",,,,,,,[9]],[,,"2\\d(?:[26-9]\\d|\\d[26-9])\\d{5}",,,,"222123456"],[,,"9[1-49]\\d{7}",,,,"923123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})",
"$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AR:[,[,,"11\\d{8}|[2368]\\d{9}|9\\d{10}",,,,,,,[10,11],[6,7,8]],[,,"11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[067]\\d)|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[0124789]\\d|3[1-6]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:[78]\\d|0[0124-9]|[1-35]\\d|4[24-7]|6[02-9]|9[123678])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[0469]\\d|1[1568]|2[013-9]|3[145]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[013578]\\d|2[15-7]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}",
,,,"1123456789",,,[10],[6,7,8]],[,,"675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})",,,,"91123456789",,,,[6,7,8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"60[04579]\\d{7}",,,,"6001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?",
"9$1",,,[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{2})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(9)(11)(\\d{4})(\\d{4})","$2 15-$3-$4",["911"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9(?:2[234689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))",
"9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"],"0$1"],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9[23]"],"0$1"],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))",
"2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d{3})","$1",["1[012]|911"],"$1"]],[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(9)(11)(\\d{4})(\\d{4})","$1 $2 $3-$4",["911"]],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9(?:2[234689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578]))",
"9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9[23]"]],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["1"],"0$1",
,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[1-358]|5[138]|6[24]|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[456]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1239])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],
"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"810\\d{7}",,,,"8101234567",,,[10]],[,,"810\\d{7}",,,,"8101234567",,,[10]],,,[,,,,,,,,,[-1]]],AS:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",,,,"6846221234",,,,[7]],[,,"684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}",,,,"6847331234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",
,,,"5002345678"],[,,,,,,,,,[-1]],"AS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"684",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AT:[,[,,"[1-9]\\d{3,12}",,,,,,,[4,5,6,7,8,9,10,11,12,13],[3]],[,,"1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}",
,,,"1234567890",,,,[3]],[,,"6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}",,,,"664123456",,,[7,8,9,10,11,12,13]],[,,"800\\d{6,10}",,,,"800123456",,,[9,10,11,12,13]],[,,"9(?:0[01]|3[019])\\d{6,10}",,,,"900123456",,,[9,10,11,12,13]],[,,"8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}",,,,"810123456",,,[8,9,10,11,12,13]],[,,,,,,,,,[-1]],[,,"780\\d{6,10}",,,,"780123456",,,[9,10,11,12,13]],"AT",43,"00","0",,,"0",,,,[[,"(116\\d{3})","$1",["116"],"$1"],[,"(1)(\\d{3,12})","$1 $2",["1"],"0$1"],[,"(5\\d)(\\d{3,5})","$1 $2",
["5[079]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["5[079]"],"0$1"],[,"(5\\d)(\\d{4})(\\d{4,7})","$1 $2 $3",["5[079]"],"0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["316|46|51|732|6(?:5[0-3579]|[6-9])|7(?:[28]0)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:2[1-8]|35|4[1-8]|[5-79])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|720\\d{6,10}",,,,"50123",,,[5,6,7,8,9,10,11,12,13]],,,[,,,,
,,,,,[-1]]],AU:[,[,,"1\\d{4,9}|[2-578]\\d{8}",,,,,,,[5,6,7,8,9,10]],[,,"[237]\\d{8}|8(?:[6-8]\\d{3}|9(?:[02-9]\\d{2}|1(?:[0-57-9]\\d|6[0135-9])))\\d{4}",,,,"212345678",,,[9],[8]],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-3]\\d|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,"500\\d{6}",,,,"500123456",
,,[9]],[,,"550\\d{6}",,,,"550123456",,,[9]],"AU",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,[[,"([2378])(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[45]|14"],"0$1"],[,"(16)(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[38]0|90)","1(?:[38]00|90)"],"$1"],[,"(180)(2\\d{3})","$1 $2",["180","1802"],"$1"],[,"(19\\d)(\\d{3})","$1 $2",
["19[13]"],"$1"],[,"(19\\d{2})(\\d{4})","$1 $2",["19[679]"],"$1"],[,"(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"],"$1"]],,[,,"16\\d{3,7}",,,,"1612345",,,[5,6,7,8,9]],1,,[,,"1(?:3(?:00\\d{3}|45[0-4]|\\d)\\d{3}|80(?:0\\d{6}|2\\d{3}))",,,,"1300123456",,,[6,7,8,10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AW:[,[,,"[25-9]\\d{6}",,,,,,,[7]],[,,"5(?:2\\d|8[1-9])\\d{4}",,,,"5212345"],[,,"(?:5(?:6\\d|9[2-478])|6(?:[039]0|22|4[01]|6[0-2])|7[34]\\d|9(?:6[45]|9[4-8]))\\d{4}",,,,"5601234"],[,,"800\\d{4}",,,,"8001234"],
[,,"900\\d{4}",,,,"9001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"28\\d{5}|501\\d{4}",,,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AX:[,[,,"[15]\\d{6,9}|2\\d{4,9}|3\\d{5,9}|4\\d{7,10}|[67]\\d{7,9}|8\\d{7,8}",,,,,,,[5,6,7,8,9,10,11]],[,,"18[1-8]\\d{4,6}",,,,"181234567",,,[7,8,9]],[,,"4(?:[0-8]\\d{6,8}|9\\d{9})|50\\d{6,8}",,,,"412345678",,,[8,9,10,11]],[,,"800\\d{5,6}",,,,"800123456",,,[8,9]],[,,"[67]00\\d{5,6}",
,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AX",358,"00|99(?:[02469]|5(?:11|33|5[59]|88|9[09]))","0",,,"0",,"00",,,,[,,,,,,,,,[-1]],,,[,,"100\\d{4,6}|20(?:0\\d{4,6}|2[023]\\d{4,5}|9[89]\\d{1,6})|300\\d{3,7}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})",,,,"1001234",,,[5,6,7,8,9,10]],[,,"10(?:0\\d{4,6}|[1-9]\\d{5,7})|2(?:0(?:0\\d{4,6}|[13-8]\\d{5,7}|2(?:[023]\\d{4,5}|[14-9]\\d{4,6})|9(?:[0-7]\\d{4,6}|[89]\\d{1,6}))|9\\d{6,8})|3(?:0(?:0\\d{3,7}|[1-9]\\d{5,7})|93\\d{5,7})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})",
,,,"10112345",,,[5,6,7,8,9,10]],,,[,,,,,,,,,[-1]]],AZ:[,[,,"[1-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:1[28]\\d{3}|2(?:02|1[24]|2[2-4]|33|[45]2|6[23])\\d{2}|365(?:[0-46-9]\\d|5[0-35-9]))\\d{4}",,,,"123123456",,,,[7]],[,,"(?:36554|(?:4[04]|5[015]|60|7[07])\\d{3})\\d{4}",,,,"401234567"],[,,"88\\d{7}",,,,"881234567"],[,,"900200\\d{3}",,,,"900200123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["(?:1[28]|2(?:[45]2|[0-36])|365)"],
"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[4-8]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BA:[,[,,"[3-9]\\d{7,8}",,,,,,,[8,9],[6]],[,,"(?:[35]\\d|49)\\d{6}",,,,"30123456",,,[8],[6]],[,,"6(?:03|44|71|[1-356])\\d{6}",,,,"61123456"],[,,"8[08]\\d{6}",,,,"80123456",,,[8]],[,,"9[0246]\\d{6}",,,,"90123456",,,[8]],[,,"8[12]\\d{6}",,,,"82123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BA",
387,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6[047]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[23]\\d{5}",,,,"70223456",,,[8]],,,[,,,,,,,,,[-1]]],BB:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7(?:37|57)|9(?:1[89]|63))\\d{4}",,,,"2464123456",,,,[7]],[,,
"246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|8(?:[2-5]\\d|83))\\d{4}",,,,"2462501234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900\\d{7}|246976\\d{4}",,,,"9002123456",,,,[7]],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"24631\\d{5}",,,,"2463101234",,,,[7]],"BB",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"246",[,,,,,,,,,[-1]],[,,"246(?:292|367|4(?:1[7-9]|3[01]|44|67)|736)\\d{4}",,,,"2464301234",,,,[7]],,,[,,,,,,,,,[-1]]],BD:[,[,,"[2-79]\\d{5,9}|1\\d{9}|8[0-7]\\d{4,8}",
,,,,,,[6,7,8,9,10]],[,,"2(?:[45]\\d{3}|7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|41|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0167]|7[15]|8[0146-9]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8))|71\\d{2}|8(?:[18]\\d{2}|23\\d{2}|54\\d{2})|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}",
,,,"27111234",,,[6,7,8,9]],[,,"(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}",,,,"1812345678",,,[10]],[,,"80[03]\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"96(?:0[49]|1[0-4]|6[69])\\d{6}",,,,"9604123456",,,[10]],"BD",880,"00","0",,,"0",,,,[[,"(2)(\\d{7,8})","$1-$2",["2"],"0$1"],[,"(\\d{2})(\\d{4,6})","$1-$2",["[3-79]1"],"0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[016])"],
"0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["[3-79][2-9]|8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BE:[,[,,"[1-9]\\d{7,8}",,,,,,,[8,9]],[,,"(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}|80[2-8]\\d{5}",,,,"12345678",,,[8]],[,,"4(?:6[0135-8]|[79]\\d|8[3-9])\\d{6}",,,,"470123456",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"(?:70[2-467]|90[0-79])\\d{5}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BE",32,"00","0",,,
"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[6-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4[23]|9[2-4]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[156]|7[018]|8(?:0[1-9]|[1-79])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"78\\d{6}",,,,"78123456",,,[8]],,,[,,,,,,,,,[-1]]],BF:[,[,,"[25-7]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",
,,,"20491234"],[,,"(?:5[156]\\d|[67]\\d{2})\\d{5}",,,,"70123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BG:[,[,,"[23567]\\d{5,7}|[489]\\d{6,8}",,,,,,,[6,7,8,9],[4,5]],[,,"2\\d{5,7}|(?:[36]\\d|5[1-9]|8[1-6]|9[1-7])\\d{5,6}|(?:4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}",,,,"2123456",,,[6,7,8],[4,5]],[,,"(?:8[7-9]\\d|9(?:8\\d|99))\\d{6}|4(?:3[0789]|8\\d)\\d{5}",
,,,"48123456",,,[8,9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"BG",359,"00","0",,,"0",,,,[[,"(2)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(2)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[124-7]|70[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[124-7]|70[1-9]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[78]00"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})",
"$1 $2 $3",["999"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["48|8[7-9]|9[08]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BH:[,[,,"[136-9]\\d{7}",,,,,,,[8]],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d{2}))\\d{4}",,,,"17001234"],[,,"(?:3(?:[1-4679]\\d|5[013-69]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:[69]\\d|3[03-9]|7[0-6])))\\d{4}",
,,,"36001234"],[,,"80\\d{6}",,,,"80123456"],[,,"(?:87|9[014578])\\d{6}",,,,"90123456"],[,,"84\\d{6}",,,,"84123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BI:[,[,,"[267]\\d{7}",,,,,,,[8]],[,,"22\\d{6}",,,,"22201234"],[,,"(?:29|6[189]|7[124-9])\\d{6}",,,,"79561234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BI",257,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BJ:[,[,,"[2689]\\d{7}|7\\d{3}",,,,,,,[4,8]],[,,"2(?:02|1[037]|2[45]|3[68])\\d{5}",,,,"20211234",,,[8]],[,,"(?:6[1-8]|9[03-9])\\d{6}",,,,"90011234",,,[8]],[,,"7[3-5]\\d{2}",,,,"7312",,,[4]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"857[58]\\d{4}",,,,"85751234",,,[8]],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"81\\d{6}",,,,"81123456",
,,[8]],,,[,,,,,,,,,[-1]]],BL:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"590(?:2[7-9]|5[12]|87)\\d{4}",,,,"590271234"],[,,"690(?:0[0-7]|[1-9]\\d)\\d{4}",,,,"690301234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BL",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BM:[,[,,"[4589]\\d{9}",,,,,,,[10],[7]],[,,"441(?:2(?:02|23|61|[3479]\\d)|[46]\\d{2}|5(?:4\\d|60|89)|824)\\d{4}",,,,"4412345678",,,,[7]],[,,"441(?:[37]\\d|5[0-39])\\d{5}",
,,,"4413701234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"441",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BN:[,[,,"[2-578]\\d{6}",,,,,,,[7]],[,,"2(?:[013-9]\\d|2[0-7])\\d{4}|[3-5]\\d{6}",,,,"2345678"],[,,"22[89]\\d{4}|[78]\\d{6}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,
,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BN",673,"00",,,,,,,,[[,"([2-578]\\d{2})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BO:[,[,,"[23467]\\d{7}",,,,,,,[8],[7]],[,,"(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}",,,,"22123456",,,,[7]],[,,"[67]\\d{7}",,,,"71234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BO",591,"00(1\\d)?","0",,,"0(1\\d)?",,,,[[,"([234])(\\d{7})","$1 $2",["[234]"],,"0$CC $1"],[,"([67]\\d{7})","$1",["[67]"],,"0$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BQ:[,[,,"[347]\\d{6}",,,,,,,[7]],[,,"(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}",,,,"7151234"],[,,"(?:31(?:8[14-8]|9[14578])|416[145-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",,,,"3181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BQ",599,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BR:[,[,,"[1-46-9]\\d{7,10}|5(?:[0-4]\\d{7,9}|5(?:[2-8]\\d{7}|9\\d{7,8}))",,,,,,,[8,9,10,11]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",,,,"1123456789",,,[10],[8]],[,,"1[1-9](?:7|9\\d)\\d{7}|(?:2[12478]|3[1-578]|[4689][1-9]|5[13-5]|7[13-579])(?:[6-8]|9\\d?)\\d{7}",,,,"11961234567",,,[10,11],[8]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"(?:300|[59]00\\d?)\\d{6}",
,,,"300123456",,,[9,10]],[,,"(?:300\\d(?:\\d{2})?|40(?:0\\d|20))\\d{4}",,,,"40041234",,,[8,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{4})(\\d{4})","$1-$2",["[2-9](?:[1-9]|0[1-9])"],"$1"],[,"(\\d{5})(\\d{4})","$1-$2",["9(?:[1-9]|0[1-9])"],"$1"],[,"(\\d{3,5})","$1",["1[125689]"],"$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})",
"$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[1-5]|7[13-579])9"],"($1)","0 $CC ($1)"],[,"(\\d{4})(\\d{4})","$1-$2",["(?:300|40(?:0|20))"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"]],[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["(?:[14689][1-9]|2[12478]|3[1-578]|5[1-5]|7[13-579])9"],"($1)","0 $CC ($1)"],[,"(\\d{4})(\\d{4})","$1-$2",["(?:300|40(?:0|20))"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],
"0$1"]],[,,,,,,,,,[-1]],,,[,,"(?:300\\d|40(?:0\\d|20))\\d{4}",,,,"40041234",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BS:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[3467]|8[0-4]|9[2-467])|461|502|6(?:0[1-3]|12|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",,,,"2423456789",,,,[7]],[,,"242(?:3(?:5[79]|[79]5)|4(?:[2-4][1-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|99))\\d{4}",,,,"2423591234",,,,[7]],[,,"242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",
,,,"8002123456",,,,[7]],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"242",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BT:[,[,,"[1-8]\\d{6,7}",,,,,,,[7,8],[6]],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",,,,"2345678",,,[7],[6]],[,,"(?:1[67]|77)\\d{6}",,,,"17123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
"BT",975,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1|77"]],[,"([2-8])(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BW:[,[,,"[2-79]\\d{6,7}",,,,,,,[7,8]],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}",,,,"2401234",,,[7]],[,,"7(?:[1-6]\\d|7[014-8])\\d{5}",,,,"71123456",,,[8]],[,,,,,,
,,,[-1]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"79[12][01]\\d{4}",,,,"79101234",,,[8]],"BW",267,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],[,"(7\\d)(\\d{3})(\\d{3})","$1 $2 $3",["7"]],[,"(90)(\\d{5})","$1 $2",["9"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BY:[,[,,"[1-4]\\d{8}|800\\d{3,7}|[89]\\d{9,10}",,,,,,,[6,7,8,9,10,11],[5]],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",
,,,"152450911",,,[9],[5,6,7]],[,,"(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}",,,,"294911911",,,[9]],[,,"8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}",,,,"8011234567"],[,,"(?:810|902)\\d{7}",,,,"9021234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"249\\d{6}",,,,"249123456",,,[9]],"BY",375,"810","8",,,"8?0?",,"8~10",,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["17[0-3589]|2[4-9]|[34]","17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])",
"1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"],"8 0$1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],"8 0$1"],[,"([89]\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[01]|9"],"8 $1"],[,"(82\\d)(\\d{4})(\\d{4})","$1 $2 $3",["82"],"8 $1"],[,"(800)(\\d{3})","$1 $2",["800"],"8 $1"],[,"(800)(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"]],,[,,
,,,,,,,[-1]],,,[,,"8(?:0[13]|10|20\\d)\\d{7}|800\\d{3,7}|902\\d{7}",,,,"82012345678"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BZ:[,[,,"[2-8]\\d{6}|0\\d{10}",,,,,,,[7,11]],[,,"(?:2(?:[02]\\d|36)|[3-58][02]\\d|7(?:[02]\\d|32))\\d{4}",,,,"2221234",,,[7]],[,,"6[0-35-7]\\d{5}",,,,"6221234",,,[7]],[,,"0800\\d{7}",,,,"08001234123",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(0)(800)(\\d{4})(\\d{3})","$1-$2-$3-$4",["0"]]],
,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],CA:[,[,,"[2-9]\\d{9}|3\\d{6}",,,,,,,[7,10]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}|310\\d{4}",,,,"2042345678",,,[10],[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
,,,"2042345678",,,[10],[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}|310\\d{4}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456",,,[10]],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678",,,[10]],[,,,,,,,,,[-1]],"CA",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CC:[,[,,"[1458]\\d{5,9}",,,,,,,[6,7,9,10],[8]],[,,"89162\\d{4}",,,,"891621234",,,[9],[8]],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}",
,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0126]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{2})?\\d{4}",,,,"1300123456",,,[6,10]],[,,"500\\d{6}",,,,"500123456",,,[9]],[,,"550\\d{6}",,,,"550123456",,,[9]],"CC",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CD:[,[,,"[2-6]\\d{6}|[18]\\d{6,8}|9\\d{8}",,,,,,,[7,9]],[,,"1(?:2\\d{7}|\\d{6})|[2-6]\\d{6}",,,,"1234567"],
[,,"8(?:[0-2459]\\d{2}|8)\\d{5}|9[017-9]\\d{7}",,,,"991234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CD",243,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["12"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[0-2459]|9"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CF:[,[,,"[278]\\d{7}",,,,,,,[8]],[,,"2[12]\\d{6}",
,,,"21612345"],[,,"7[0257]\\d{6}",,,,"70012345"],[,,,,,,,,,[-1]],[,,"8776\\d{4}",,,,"87761234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CF",236,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CG:[,[,,"[028]\\d{8}",,,,,,,[9]],[,,"222[1-589]\\d{5}",,,,"222123456"],[,,"0[14-6]\\d{7}",,,,"061234567"],[,,,,,,,,,[-1]],[,,"80(?:0\\d{2}|11[01])\\d{4}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,
[-1]],"CG",242,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]],[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["800"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],CH:[,[,,"[2-9]\\d{8}|860\\d{9}",,,,,,,[9,12]],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",,,,"212345678",,,[9]],[,,"7[5-9]\\d{7}",,,,"781234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[016]\\d{6}",,,,"900123456",,,[9]],[,
,"84[0248]\\d{6}",,,,"840123456",,,[9]],[,,"878\\d{6}",,,,"878123456",,,[9]],[,,,,,,,,,[-1]],"CH",41,"00","0",,,"0",,,,[[,"([2-9]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]|[89]1"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["860"],"0$1"]],,[,,"74[0248]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"5[18]\\d{7}",,,,"581234567",,,[9]],,,[,,"860\\d{9}",,,,"860123456789",,,[12]]],CI:[,[,,"[02-8]\\d{7}",
,,,,,,[8]],[,,"(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",,,,"21234567"],[,,"(?:0[1-9]|4\\d|5[14-9]|6[015-79]|[78][4-9])\\d{6}",,,,"01234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],CK:[,[,,"[2-8]\\d{4}",,,,,,,[5]],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}",,,,"21234"],[,,"[5-8]\\d{4}",
,,,"71234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CL:[,[,,"(?:[2-9]|600|123)\\d{7,8}",,,,,,,[9,10,11],[7,8]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-2467]\\d{5})|(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|9[3-9])\\d{7}",,,,"221234567",,,[9],[7,8]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-2467]\\d{5})|(?:3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|9[3-9])\\d{7}",
,,,"961234567",,,[9],[8]],[,,"800\\d{6}|1230\\d{7}",,,,"800123456",,,[9,11]],[,,,,,,,,,[-1]],[,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,"44\\d{7}",,,,"441234567",,,[9]],"CL",56,"(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0","0",,,"0|(1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))",,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)","$CC ($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]"],"($1)","$CC ($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",
["9"],"0$1"],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"],"0$1"],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"],"$1"],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"],"$1"],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"$1"],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)","$CC ($1)"],[,"(\\d{4,5})","$1",["[1-9]"],"$1"]],[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)","$CC ($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]"],"($1)","$CC ($1)"],[,"(9)(\\d{4})(\\d{4})",
"$1 $2 $3",["9"],"0$1"],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"],"0$1"],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["60|8"],"$1"],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["60"],"$1"],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"$1"],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)","$CC ($1)"]],[,,,,,,,,,[-1]],,,[,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CM:[,[,,"[2368]\\d{7,8}",,,,,,,[8,9]],[,,"2(?:22|33|4[23])\\d{6}",,,,"222123456",,,[9]],[,,"6[5-9]\\d{7}",
,,,"671234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"88\\d{6}",,,,"88012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CM",237,"00",,,,,,,,[[,"([26])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|88"]],[,"(800)(\\d{2})(\\d{3})","$1 $2 $3",["80"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CN:[,[,,"[1-7]\\d{6,11}|8[0-357-9]\\d{6,9}|9\\d{7,10}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,
"21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-4689]|6[2368]|9[02-9])|8(?:078|1[236-8]|2[5-7]|3\\d|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})|80(?:29|6[03578]|7[018]|81)\\d{4}",
,,,"1012345678",,,,[5,6]],[,,"1(?:[38]\\d|4[57]|5[0-35-9]|7[0-35-8])\\d{8}",,,,"13123456789",,,[11]],[,,"(?:10)?800\\d{7}",,,,"8001234567",,,[10,12]],[,,"16[08]\\d{5}",,,,"16812345",,,[8]],[,,"400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",
,,,"4001234567",,,[7,8,9,10,11],[5,6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CN",86,"(1(?:[129]\\d{3}|79\\d{2}))?00","0",,,"(1(?:[129]\\d{3}|79\\d{2}))|0",,"00",,[[,"(80\\d{2})(\\d{4})","$1 $2",["80[2678]"],"0$1","$CC $1",1],[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{5,6})","$1",["100|95"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d{2}[19]","[3-9]\\d{2}(?:10|9[56])"],
"0$1","$CC $1"],[,"(\\d{3,4})(\\d{4})","$1 $2",["[2-9]"]],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-578]"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[[,"(80\\d{2})(\\d{4})","$1 $2",["80[2678]"],"0$1","$CC $1",1],[,"([48]00)(\\d{3})(\\d{4})",
"$1 $2 $3",["[48]00"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d{2}[19]","[3-9]\\d{2}(?:10|9[56])"],"0$1","$CC $1"],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:[1-9]|0[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1[3-578]"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[,,,,,,,,,[-1]],,,[,,"(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}",,,,"4001234567",
,,[10,11,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CO:[,[,,"(?:[13]\\d{0,3}|[24-8])\\d{7}",,,,,,,[8,10,11],[7]],[,,"[124-8][2-9]\\d{6}",,,,"12345678",,,[8],[7]],[,,"3(?:0[0-5]|1\\d|2[0-3]|5[01])\\d{7}",,,,"3211234567",,,[10]],[,,"1800\\d{7}",,,,"18001234567",,,[11]],[,,"19(?:0[01]|4[78])\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:44|56))?",,,,[[,"(\\d)(\\d{7})","$1 $2",["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]","1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"],
"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"],"0$1"]],[[,"(\\d)(\\d{7})","$1 $2",["1(?:8[2-9]|9[0-3]|[2-7])|[24-8]","1(?:8[2-9]|9(?:09|[1-3])|[2-7])|[24-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1 $2 $3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CR:[,[,,"[24-9]\\d{7,9}",,
,,,,,[8,10]],[,,"2[0-24-7]\\d{6}",,,,"22123456",,,[8]],[,,"5(?:0[01]|7[0-3])\\d{5}|6(?:[0-4]\\d{3}|500[01])\\d{3}|(?:7[0-3]|8[3-9])\\d{6}",,,,"83123456",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"90[059]\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"210[0-6]\\d{4}|4\\d{7}|5100\\d{4}",,,,"40001234",,,[8]],"CR",506,"00",,,,"(19(?:0[012468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["[89]0"],
,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CU:[,[,,"[2-57]\\d{5,7}",,,,,,,[6,7,8],[4,5]],[,,"2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}",,,,"71234567",,,,[4,5]],[,,"5\\d{7}",,,,"51234567",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CU",53,"119","0",,,"0",,,,[[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d{2})(\\d{4,6})","$1 $2",["[2-4]"],"(0$1)"],[,"(\\d)(\\d{7})",
"$1 $2",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CV:[,[,,"[259]\\d{6}",,,,,,,[7]],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",,,,"2211234"],[,,"(?:9\\d|59)\\d{5}",,,,"9911234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CV",238,"0",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CW:[,[,,"[169]\\d{6,7}",,,,,,,[7,8]],[,,"9(?:[48]\\d{2}|50\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}",
,,,"94151234",,,[8]],[,,"9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}",,,,"95181234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"60[0-2]\\d{4}",,,,"6001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-7]"]],[,"(9)(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],,[,,"955\\d{5}",,,,"95581234",,,[8]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CX:[,[,,"[1458]\\d{5,9}",,,,,,,[6,7,8,9,10]],[,,"89164\\d{4}",,,,"891641234",,,[9],[8]],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-2]\\d|3[0-57-9]|4[47-9]|5[0-25-9]|6[6-9]|7[02-9]|8[147-9]|9[017-9])\\d{6}",
,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"190[0126]\\d{6}",,,,"1900123456",,,[10]],[,,"13(?:00\\d{2})?\\d{4}",,,,"1300123456",,,[6,8,10]],[,,"500\\d{6}",,,,"500123456",,,[9]],[,,"550\\d{6}",,,,"550123456",,,[9]],"CX",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CY:[,[,,"[257-9]\\d{7}",,,,,,,[8]],[,,"2[2-6]\\d{6}",,,,"22345678"],[,,"9[4-79]\\d{6}",,,,"96123456"],
[,,"800\\d{5}",,,,"80001234"],[,,"90[09]\\d{5}",,,,"90012345"],[,,"80[1-9]\\d{5}",,,,"80112345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"CY",357,"00",,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:50|77)\\d{6}",,,,"77123456"],,,[,,,,,,,,,[-1]]],CZ:[,[,,"[2-8]\\d{8}|9\\d{8,11}",,,,,,,[9,10,11,12]],[,,"2\\d{8}|(?:3[1257-9]|4[16-9]|5[13-9])\\d{7}",,,,"212345678",,,[9]],[,,"(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}",,,,"601123456",,,[9]],[,,"800\\d{6}",,,,"800123456",
,,[9]],[,,"9(?:0[05689]|76)\\d{6}",,,,"900123456",,,[9]],[,,"8[134]\\d{7}",,,,"811234567",,,[9]],[,,"70[01]\\d{6}",,,,"700123456",,,[9]],[,,"9[17]0\\d{6}",,,,"910123456",,,[9]],"CZ",420,"00",,,,,,,,[[,"([2-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(96\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["96"]],[,"(9\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9[36]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"9(?:5\\d|7[234])\\d{6}",,,,"972123456",,,[9]],,,[,,"9(?:3\\d{9}|6\\d{7,10})",,,
,"93123456789"]],DE:[,[,,"[1-35-9]\\d{3,14}|4(?:[0-8]\\d{3,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})",,,,,,,[4,5,6,7,8,9,10,11,12,13,14,15],[3]],[,,"2\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|4(?:0\\d{3,12}|\\d{5,13})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|6(?:\\d{5,13}|9\\d{3,12})|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-8]\\d|9\\d?)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})",,,,"30123456",,,[5,6,7,8,9,10,11,12,13,14,15],[3,
4]],[,,"1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7\\d{8,9})",,,,"15123456789",,,[10,11]],[,,"800\\d{7,12}",,,,"8001234567890",,,[10,11,12,13,14,15]],[,,"137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})",,,,"9001234567",,,[10,11]],[,,"1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})",,,,"18012345",,,[7,8,9,10,11,12,13,14]],[,,"700\\d{8}",,,,"70012345678",,,[11]],[,,,,,,,,,[-1]],"DE",49,"00","0",,,"0",,,,[[,"(1\\d{2})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(15\\d{3})(\\d{6})","$1 $2",["15[0568]"],"0$1"],[,"(1\\d{3})(\\d{7})",
"$1 $2",["15"],"0$1"],[,"(\\d{2})(\\d{3,11})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,11})","$1 $2",["2(?:\\d1|0[2389]|1[24]|28|34)|3(?:[3-9][15]|40)|[4-8][1-9]1|9(?:06|[1-9]1)"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])","[24-6]|[7-9](?:\\d[1-9]|[1-9]\\d)|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|4[1246]|6[1-4]|7[1346]|8[13568]|9[1246])|6(?:0[356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))"],
"0$1"],[,"(3\\d{4})(\\d{1,10})","$1 $2",["3"],"0$1"],[,"(800)(\\d{7,12})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["(?:18|90)0|137","1(?:37|80)|900[1359]"],"0$1"],[,"(1\\d{2})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(18\\d{3})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(18\\d{2})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(18\\d)(\\d{8})","$1 $2",["18[2-579]"],"0$1"],[,"(700)(\\d{4})(\\d{4})","$1 $2 $3",["700"],"0$1"],[,"(138)(\\d{4})","$1 $2",["138"],"0$1"],[,"(15[013-68])(\\d{2})(\\d{8})",
"$1 $2 $3",["15[013-68]"],"0$1"],[,"(15[279]\\d)(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(1[67]\\d)(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"]],,[,,"16(?:4\\d{1,10}|[89]\\d{1,11})",,,,"16412345",,,[4,5,6,7,8,9,10,11,12,13,14]],,,[,,,,,,,,,[-1]],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})",,,,"18500123456",,,[8,9,10,11,12,13,14]],,,[,,"1(?:5(?:(?:2\\d55|7\\d99|9\\d33)\\d{7}|(?:[034568]00|113)\\d{8})|6(?:013|255|399)\\d{7,8}|7(?:[015]13|[234]55|[69]33|[78]99)\\d{7,8})",,,,"177991234567",
,,[12,13]]],DJ:[,[,,"[27]\\d{7}",,,,,,,[8]],[,,"2(?:1[2-5]|7[45])\\d{5}",,,,"21360003"],[,,"77\\d{6}",,,,"77831001"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DK:[,[,,"[2-9]\\d{7}",,,,,,,[8]],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"32123456"],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"20123456"],[,,"80\\d{6}",
,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DK",45,"00",,,,,,,1,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DM:[,[,,"[57-9]\\d{9}",,,,,,,[10],[7]],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}",,,,"7674201234",,,,[7]],[,,"767(?:2(?:[234689]5|7[5-7])|31[5-7]|61[2-7])\\d{4}",,,,"7672251234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],
[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"767",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DO:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"8(?:[04]9[2-9]\\d{6}|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d{2}|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9]))\\d{4})",
,,,"8092345678",,,,[7]],[,,"8[024]9[2-9]\\d{6}",,,,"8092345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DO",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"8[024]9",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DZ:[,[,,"(?:[1-4]|[5-9]\\d)\\d{7}",,,,,,,[8,9]],[,,"(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}|9619\\d{5}",,,,"12345678"],[,,"(?:5[4-6]|7[7-9])\\d{7}|6(?:[569]\\d|7[0-6])\\d{6}",
,,,"551234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"80[3-689]1\\d{5}",,,,"808123456",,,[9]],[,,"80[12]1\\d{5}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,"98[23]\\d{6}",,,,"983123456",,,[9]],"DZ",213,"00","0",,,"0",,,,[[,"([1-4]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"([5-8]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
EC:[,[,,"1\\d{9,10}|[2-8]\\d{7}|9\\d{8}",,,,,,,[8,9,10,11],[7]],[,,"[2-7][2-7]\\d{6}",,,,"22123456",,,[8],[7]],[,,"9(?:(?:39|[45][89]|7[7-9]|[89]\\d)\\d|6(?:[017-9]\\d|2[0-4]))\\d{5}",,,,"991234567",,,[9]],[,,"1800\\d{6,7}",,,,"18001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[2-7]890\\d{4}",,,,"28901234",,,[8]],"EC",593,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[247]|[356][2-8]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})",
"$1 $2 $3",["1"],"$1"]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[247]|[356][2-8]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["1"],"$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EE:[,[,,"1\\d{3,4}|[3-9]\\d{6,7}|800\\d{6,7}",,,,,,,[4,5,7,8,10]],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",,,,"3212345",,,[7]],[,,"(?:5\\d|8[1-5])\\d{6}|5(?:[02]\\d{2}|1(?:[0-8]\\d|95)|5[0-478]\\d|64[0-4]|65[1-589])\\d{3}",,,,"51234567",
,,[7,8]],[,,"800(?:0\\d{3}|1\\d|[2-9])\\d{3}",,,,"80012345",,,[7,8,10]],[,,"(?:40\\d{2}|900)\\d{4}",,,,"9001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"70[0-2]\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"EE",372,"00",,,,,,,,[[,"([3-79]\\d{2})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],[,"(70)(\\d{2})(\\d{4})","$1 $2 $3",["70"]],[,"(8000)(\\d{3})(\\d{3})","$1 $2 $3",["800","8000"]],[,"([458]\\d{3})(\\d{3,4})",
"$1 $2",["40|5|8(?:00|[1-5])","40|5|8(?:00[1-9]|[1-5])"]]],,[,,,,,,,,,[-1]],,,[,,"1\\d{3,4}|800[2-9]\\d{3}",,,,"8002123",,,[4,5,7]],[,,"1(?:2[01245]|3[0-6]|4[1-489]|5[0-59]|6[1-46-9]|7[0-27-9]|8[189]|9[012])\\d{1,2}",,,,"12123",,,[4,5]],,,[,,,,,,,,,[-1]]],EG:[,[,,"1\\d{4,9}|[2456]\\d{8}|3\\d{7}|[89]\\d{8,9}",,,,,,,[5,8,9,10],[7]],[,,"(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|[57][23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}|1[69]\\d{3}",
,,,"234567890",,,[5,8,9],[7]],[,,"1(?:0[0-269]|1[0-245]|2[0-278])\\d{7}",,,,"1001234567",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1[012]|[89]00"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1[35]|[4-6]|[89][2-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EH:[,[,
,"[5-9]\\d{8}",,,,,,,[9]],[,,"528[89]\\d{5}",,,,"528812345"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[07][07]|6[12]))\\d{6}",,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"EH",212,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"528[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ER:[,[,,"[178]\\d{6}",,,,,,,[7],[6]],[,,"1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}",,,,"8370362",,,,[6]],[,,"17[1-3]\\d{4}|7\\d{6}",
,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ER",291,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ES:[,[,,"[5-9]\\d{8}",,,,,,,[9]],[,,"8(?:[1356]\\d|[28][0-8]|[47][1-9])\\d{6}|9(?:[135]\\d{7}|[28][0-8]\\d{6}|4[1-9]\\d{6}|6(?:[0-8]\\d{6}|9(?:0(?:[0-57-9]\\d{4}|6(?:0[0-8]|1[1-9]|[2-9]\\d)\\d{2})|[1-9]\\d{5}))|7(?:[124-9]\\d{2}|3(?:[0-8]\\d|9[1-9]))\\d{4})",,,,"810123456"],
[,,"(?:6\\d{6}|7[1-48]\\d{5}|9(?:6906(?:09|10)|7390\\d{2}))\\d{2}",,,,"612345678"],[,,"[89]00\\d{6}",,,,"800123456"],[,,"80[367]\\d{6}",,,,"803123456"],[,,"90[12]\\d{6}",,,,"901123456"],[,,"70\\d{7}",,,,"701234567"],[,,,,,,,,,[-1]],"ES",34,"00",,,,,,,,[[,"([89]00)(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"([5-9]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[568]|[79][0-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"51\\d{7}",,,,"511234567"],,,[,,,,,,,,,[-1]]],ET:[,[,,"[1-59]\\d{8}",,,,,,,[9],[7]],
[,,"(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:18|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",
,,,"111112345",,,,[7]],[,,"9(?:[1-46-8]\\d|5[89])\\d{6}",,,,"911234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ET",251,"00","0",,,"0",,,,[[,"([1-59]\\d)(\\d{3})(\\d{4})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FI:[,[,,"[156]\\d{6,9}|2\\d{4,9}|3\\d{5,9}|4\\d{7,10}|7\\d{7,9}|[89]\\d{6,8}",,,,,,,[5,6,7,8,9,10,11]],[,,"1[3-79][1-8]\\d{4,6}|[235689][1-8]\\d{5,7}",,,,"131234567",,,[7,8,9]],[,,"4(?:[0-8]\\d{6,8}|9\\d{9})|50\\d{6,8}",
,,,"412345678",,,[8,9,10,11]],[,,"800\\d{5,6}",,,,"800123456",,,[8,9]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FI",358,"00|99(?:[02469]|5(?:11|33|5[59]|88|9[09]))","0",,,"0",,"00",,[[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[16-8]0|300)"],"0$1"],[,"(116\\d{3})","$1",["116"],"$1"],[,"(\\d{2})(\\d{3,9})","$1 $2",["1[3-9]|2[09]|4|50|7(?:[13]|5[03-9])"],"0$1"],[,"(75\\d{3})","$1",["75[12]"],"0$1"],[,"(\\d)(\\d{6,9})","$1 $2",["[25689][1-8]|3(?:0[1-9]|[1-8])"],
"0$1"],[,"(39\\d)(\\d{3})(\\d{3})","$1 $2 $3",["39"],"0$1"]],[[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[16-8]0|300)"],"0$1"],[,"(116\\d{3})","$1",["116"],"$1"],[,"(\\d{2})(\\d{3,9})","$1 $2",["1[3-9]|2[09]|4|50|7(?:[13]|5[03-9])"],"0$1"],[,"(\\d)(\\d{6,9})","$1 $2",["[25689][1-8]|3(?:0[1-9]|[1-8])"],"0$1"],[,"(39\\d)(\\d{3})(\\d{3})","$1 $2 $3",["39"],"0$1"]],[,,,,,,,,,[-1]],1,,[,,"100\\d{4,6}|20(?:0\\d{4,6}|2[023]\\d{4,5}|9[89]\\d{1,6})|300\\d{3,7}|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})",
,,,"1001234",,,[5,6,7,8,9,10]],[,,"10(?:0\\d{4,6}|[1-9]\\d{5,7})|2(?:0(?:0\\d{4,6}|[13-8]\\d{5,7}|2(?:[023]\\d{4,5}|[14-9]\\d{4,6})|9(?:[0-7]\\d{4,6}|[89]\\d{1,6}))|9\\d{6,8})|3(?:0(?:0\\d{3,7}|[1-9]\\d{5,7})|93\\d{5,7})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{5,6})",,,,"10112345",,,[5,6,7,8,9,10]],,,[,,,,,,,,,[-1]]],FJ:[,[,,"[35-9]\\d{6}|0\\d{10}",,,,,,,[7,11]],[,,"(?:3[0-5]|6[25-7]|8[58])\\d{5}",,,,"3212345",,,[7]],[,,"(?:5[018]|[79]\\d|8[034679])\\d{5}",,,,"7012345",,,[7]],[,
,"0800\\d{7}",,,,"08001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FJ",679,"0(?:0|52)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[35-9]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],FK:[,[,,"[2-7]\\d{4}",,,,,,,[5]],[,,"[2-47]\\d{4}",,,,"31234"],[,,"[56]\\d{4}",,,,"51234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FK",500,"00",,,,,,,,,,[,,,,,,,,,[-1]],
,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FM:[,[,,"[39]\\d{6}",,,,,,,[7]],[,,"3[2357]0[1-9]\\d{3}|9[2-6]\\d{5}",,,,"3201234"],[,,"3[2357]0[1-9]\\d{3}|9[2-7]\\d{5}",,,,"3501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FO:[,[,,"[2-9]\\d{5}",,,,,,,[6]],[,,"(?:20|[3-4]\\d|8[19])\\d{4}",,,,"201234"],[,,"(?:[27][1-9]|5\\d)\\d{4}",
,,,"211234"],[,,"80[257-9]\\d{3}",,,,"802123"],[,,"90(?:[1345][15-7]|2[125-7]|99)\\d{2}",,,,"901123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6[0-36]|88)\\d{4}",,,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",,,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FR:[,[,,"[1-9]\\d{8}",,,,,,,[9]],[,,"[1-5]\\d{8}",,,,"123456789"],[,,"(?:6\\d|7[3-9])\\d{7}",,,,"612345678"],[,,"80[0-5]\\d{6}",,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,
,"8(?:1[0-29]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"9\\d{8}",,,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(1\\d{2})(\\d{3})","$1 $2",["11"],"$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"80[6-9]\\d{6}",
,,,"806123456"],,,[,,,,,,,,,[-1]]],GA:[,[,,"0?\\d{7}",,,,,,,[7,8]],[,,"01\\d{6}",,,,"01441234",,,[8]],[,,"0?[2-7]\\d{6}",,,,"06031234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GA",241,"00",,,,,,,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],GB:[,[,,"\\d{7,10}",,,,,,,[7,9,10],[4,5,6,8]],[,,"2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{7}|1(?:(?:1(?:3[0-48]|[46][0-4]|5[0-26-9]|[78][0-49])|21[0-7]|31[0-8]|[4-69]1\\d))\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[28][02-57-9]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[2-46-8]\\d{2}|16977[23]\\d{3}",
,,,"1212345678",,,[9,10],[4,5,6,7,8]],[,,"7(?:[1-3]\\d{3}|4(?:[0-46-9]\\d{2}|5(?:[0-689]\\d|7[0-57-9]))|5(?:0[0-8]|[13-9]\\d|2[0-35-9])\\d|7(?:0(?:0[01]|[1-9]\\d)|[1-7]\\d{2}|8[02-9]\\d|9[0-689]\\d)|8(?:[014-9]\\d|[23][0-8])\\d|9(?:[024-9]\\d{2}|1(?:[02-9]\\d|1[028])|3[0-689]\\d))\\d{5}",,,,"7400123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",
,,[7,10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GB",44,"00","0"," x",,"0",,,,[[,"(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:1|\\d1)|3|9[018]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:387|5(?:24|39)|697|768|946)","1(?:3873|5(?:242|39[456])|697[347]|768[347]|9467)"],"0$1"],[,"(1\\d{3})(\\d{5,6})",
"$1 $2",["1"],"0$1"],[,"(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"],"0$1"],[,"(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1"],[,"([58]00)(\\d{6})","$1 $2",["[58]00"],"0$1"]],,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],1,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,
,,,,,,,,[-1]]],GD:[,[,,"[4589]\\d{9}",,,,,,,[10],[7]],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|68|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",,,,"4732691234",,,,[7]],[,,"473(?:4(?:0[2-79]|1[04-9]|20|58)|5(?:2[01]|3[3-8])|901)\\d{4}",,,,"4734031234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GD",1,"011","1",,,"1",,,,,,[,
,,,,,,,,[-1]],,"473",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GE:[,[,,"[34578]\\d{8}",,,,,,,[9],[6]],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",,,,"322123456",,,,[6]],[,,"5(?:14|5[01578]|68|7[0147-9]|9[0-35-9])\\d{6}",,,,"555123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"706\\d{6}",,,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[348]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})",
"$1 $2 $3",["7"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"706\\d{6}",,,,"706123456"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GF:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"594(?:10|2[012457-9]|3[0-57-9]|4[3-9]|5[7-9]|6[0-3]|9[014])\\d{4}",,,,"594101234"],[,,"694(?:[04][0-7]|1[0-5]|3[018]|[29]\\d)\\d{4}",,,,"694201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GF",594,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3 $4",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GG:[,[,,"[135789]\\d{6,9}",,,,,,,[7,9,10],[6]],[,,"1481[25-9]\\d{5}",,,,"1481256789",,,[10],[6]],[,,"7(?:781\\d|839\\d|911[17])\\d{5}",,,,"7781123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})|500\\d{6}",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",,,[7,10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",
,,,"5612345678",,,[10]],"GG",44,"00","0"," x",,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GH:[,[,,"[235]\\d{8}|8\\d{7}",,,,,,,[8,9],[7]],[,,"3(?:0(?:[237]\\d|80)|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",,,,"302345678",,,[9],[7]],[,,"(?:2[034678]\\d|5(?:[0457]\\d|6[01]))\\d{6}",
,,,"231234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GH",233,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GI:[,[,,"[2568]\\d{7}",,,,,,,[8]],[,,"2(?:00\\d{2}|1(?:6[24-7]\\d|90[0-2])|2(?:00\\d|2[2457]\\d|50[0-2]))\\d{3}",,,,"20012345"],[,,"(?:5[46-8]|62)\\d{6}",,,,"57123456"],
[,,,,,,,,,[-1]],[,,"88\\d{6}",,,,"88123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GI",350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GL:[,[,,"[1-689]\\d{5}",,,,,,,[6]],[,,"(?:19|3[1-6]|6[14689]|8[14-79]|9\\d)\\d{4}",,,,"321000"],[,,"[245][2-9]\\d{4}",,,,"221234"],[,,"80\\d{4}",,,,"801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[89]\\d{4}",,,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GM:[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:4(?:[23]\\d{2}|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6(?:[67]\\d)|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}",,,,"5661234"],[,,"[23679]\\d{6}",,,,"3012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GM",220,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GN:[,[,,"[367]\\d{7,8}",
,,,,,,[8,9]],[,,"30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}",,,,"30241234",,,[8]],[,,"6[02356]\\d{7}",,,,"601123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"722\\d{6}",,,,"722123456",,,[9]],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GP:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"590(?:0[13468]|1[012]|2[0-68]|3[28]|4[0-8]|5[579]|6[0189]|70|8[0-689]|9\\d)\\d{4}",
,,,"590201234"],[,,"690(?:0[0-7]|[1-9]\\d)\\d{4}",,,,"690301234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GP",590,"00","0",,,"0",,,,[[,"([56]90)(\\d{2})(\\d{4})","$1 $2-$3",,"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GQ:[,[,,"[23589]\\d{8}",,,,,,,[9]],[,,"3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}",,,,"333091234"],[,,"(?:222|55[15])\\d{6}",,,,"222123456"],[,,"80\\d[1-9]\\d{5}",,,,"800123456"],[,,"90\\d[1-9]\\d{5}",
,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GR:[,[,,"[26-9]\\d{9}",,,,,,,[10]],[,,"2(?:1\\d{2}|2(?:2[1-46-9]|3[1-8]|4[1-7]|5[1-4]|6[1-8]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|3[1245]|4[1-7]|5[13-9]|[269][1-6]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",
,,,"2123456789"],[,,"69\\d{8}",,,,"6912345678"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[19]\\d{7}",,,,"9091234567"],[,,"8(?:0[16]|12|25)\\d{7}",,,,"8011234567"],[,,"70\\d{8}",,,,"7012345678"],[,,,,,,,,,[-1]],"GR",30,"00",,,,,,,,[[,"([27]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["2[2-9]1|[689]"]],[,"(2\\d{3})(\\d{6})","$1 $2",["2[2-9][02-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GT:[,[,,"[2-7]\\d{7}|1[89]\\d{9}",,,,,,,[8,11]],
[,,"[267][2-9]\\d{6}",,,,"22456789",,,[8]],[,,"[345]\\d{7}",,,,"51234567",,,[8]],[,,"18[01]\\d{8}",,,,"18001112222",,,[11]],[,,"19\\d{9}",,,,"19001112222",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GU:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|47|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}",
,,,"6713001234",,,,[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:56|7[1-9]|8[236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[5-9])|7(?:[079]7|2[0167]|3[45]|47|8[789])|8(?:[2-5789]8|6[48])|9(?:2[29]|6[79]|7[179]|8[789]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GU",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],
,"671",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GW:[,[,,"(?:4(?:0\\d{5}|4\\d{7})|9\\d{8})",,,,,,,[7,9]],[,,"443\\d{6}",,,,"443201234",,,[9]],[,,"9(?:5(?:5\\d|6[0-2])|6(?:5[0-2]|6\\d|9[012])|77\\d)\\d{5}",,,,"955012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"40\\d{5}",,,,"4012345",,,[7]],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["44|9[567]"]],[,"(\\d{3})(\\d{4})","$1 $2",["40"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,
,[,,,,,,,,,[-1]]],GY:[,[,,"[2-46-9]\\d{6}",,,,,,,[7]],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}",,,,"2201234"],[,,"6\\d{6}",,,,"6091234"],[,,"(?:289|862)\\d{4}",,,,"2891234"],[,,"9008\\d{3}",,,,"9008123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HK:[,[,,"[235-7]\\d{7}|8\\d{7,8}|9\\d{4,10}",,,,,,,[5,
6,7,8,9,11]],[,,"(?:2(?:[13-8]\\d|2[013-9]|9[0-24-9])|3(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69]|89)|58[01])\\d{5}",,,,"21234567",,,[8]],[,,"(?:5(?:[1-59][0-46-9]|6[0-4689]|7[0-2469])|6(?:0[1-9]|[1459]\\d|[2368][0-57-9]|7[0-79])|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}",,,,"51234567",,,[8]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})",,,,"90012345678",,,[5,6,7,8,11]],[,,,,,,,,,[-1]],[,,"8(?:1[1-4679]|2[0-367]|3[02-47])\\d{5}",,,,"81123456",,,[8]],[,,,,,,,,,[-1]],
"HK",852,"00(?:[126-9]|30|5[09])?",,,,,,"00",,[[,"(\\d{4})(\\d{4})","$1 $2",["[235-7]|[89](?:0[1-9]|[1-9])"]],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["800"]],[,"(900)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["900"]],[,"(900)(\\d{2,5})","$1 $2",["900"]]],,[,,"7(?:1[0-369]|[23][0-37-9]|47|5[1578]|6[0235]|7[278]|8[236-9]|9[025-9])\\d{5}",,,,"71234567",,,[8]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HN:[,[,,"[237-9]\\d{7}",,,,,,,[8]],[,,"2(?:2(?:0[019]|1[1-36]|[23]\\d|4[04-6]|5[57]|7[01389]|8[0146-9]|9[012])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:16|4[03-5]|5\\d|6[4-6]|74)|6(?:[056]\\d|17|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034])|8(?:79|8[0-35789]|9[1-57-9]))\\d{4}",
,,,"22123456"],[,,"[37-9]\\d{7}",,,,"91234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HR:[,[,,"[1-7]\\d{5,8}|[89]\\d{6,8}",,,,,,,[6,7,8,9]],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"9(?:01\\d|[1259]\\d{2}|7(?:[0679]\\d|51)|8\\d{1,2})\\d{5}",,,,"921234567",,,[8,9]],[,,"80[01]\\d{4,6}",,,,
"800123456",,,[7,8,9]],[,,"6(?:[01]\\d{0,2}|[459]\\d{2})\\d{4}",,,,"611234",,,[6,7,8]],[,,,,,,,,,[-1]],[,,"7[45]\\d{6}",,,,"74123456",,,[8]],[,,,,,,,,,[-1]],"HR",385,"00","0",,,"0",,,,[[,"(1)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"([2-5]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(6[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],[,"([67]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],[,"(80[01])(\\d{2})(\\d{2,3})","$1 $2 $3",
["8"],"0$1"],[,"(80[01])(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:62\\d?|72)\\d{6}",,,,"62123456",,,[8,9]],,,[,,,,,,,,,[-1]]],HT:[,[,,"[2-489]\\d{7}",,,,,,,[8]],[,,"2(?:2\\d|5[1-5]|81|9[149])\\d{5}",,,,"22453300"],[,,"[34]\\d{7}",,,,"34101234"],[,,"8\\d{7}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:9(?:[67][0-4]|8[0-3589]|9\\d))\\d{5}",,,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3"]],,[,,,,,,,,,[-1]],
,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HU:[,[,,"[1-9]\\d{7,8}",,,,,,,[8,9],[6]],[,,"(?:1\\d|2[2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|7[2-9]|8[2-57-9]|9[2-69])\\d{6}",,,,"12345678",,,[8],[6]],[,,"(?:[257]0|3[01])\\d{7}",,,,"201234567",,,[9]],[,,"[48]0\\d{6}",,,,"80123456",,,[8]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"21\\d{7}",,,,"211234567",,,[9]],"HU",36,"00","06",,,"06",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})",
"$1 $2 $3",["[2-9]"],"($1)"]],,[,,,,,,,,,[-1]],,,[,,"[48]0\\d{6}",,,,"80123456",,,[8]],[,,"38\\d{7}",,,,"381234567",,,[9]],,,[,,,,,,,,,[-1]]],ID:[,[,,"(?:[1-79]\\d{6,10}|8\\d{7,11})",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"2(?:1(?:14\\d{3}|[0-8]\\d{6,7}|500\\d{3}|9\\d{6})|2\\d{6,8}|4\\d{7,8})|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:19?|[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",
,,,"612345678",,,[7,8,9,10,11],[5,6]],[,,"(?:2(?:1(?:3[145]|4[01]|5[1-469]|60|8[0359]|9\\d)|2(?:88|9[1256])|3[1-4]9|4(?:36|91)|5(?:1[349]|[2-4]9)|6[0-7]9|7(?:[1-36]9|4[39])|8[1-5]9|9[1-48]9)|3(?:19[1-3]|2[12]9|3[13]9|4(?:1[69]|39)|5[14]9|6(?:1[69]|2[89])|709)|4[13]19|5(?:1(?:19|8[39])|4[129]9|6[12]9)|6(?:19[12]|2(?:[23]9|77))|7(?:1[13]9|2[15]9|419|5(?:1[89]|29)|6[15]9|7[178]9))\\d{5,6}|8[1-35-9]\\d{7,10}",,,,"812345678",,,[9,10,11,12]],[,,"177\\d{6,8}|800\\d{5,7}",,,,"8001234567",,,[8,9,10,11]],[,
,"809\\d{7}",,,,"8091234567",,,[10]],[,,"804\\d{7}",,,,"8041234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ID",62,"0(?:0[1789]|10(?:00|1[67]))","0",,,"0",,,,[[,"(\\d{2})(\\d{5,8})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,8})","$1 $2",["[4579]|2[035-9]|[36][02-9]"],"(0$1)"],[,"(8\\d{2})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(8\\d{2})(\\d{4})(\\d{4,5})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(1)(500)(\\d{3})","$1 $2 $3",["15"],"$1"],[,"(177)(\\d{6,8})","$1 $2",["17"],"0$1"],
[,"(800)(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(804)(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(80\\d)(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80[79]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"8071\\d{6}",,,,"8071123456",,,[10]],[,,"1500\\d{3}|8071\\d{6}",,,,"8071123456",,,[7,10]],,,[,,,,,,,,,[-1]]],IE:[,[,,"[124-9]\\d{6,9}",,,,,,,[7,8,9,10],[5,6]],[,,"1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})",
,,,"2212345",,,,[5,6]],[,,"8(?:22\\d{6}|[35-9]\\d{7})",,,,"850123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}",,,,"1520123456",,,[10]],[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"700\\d{6}",,,,"700123456",,,[9]],[,,"76\\d{7}",,,,"761234567",,,[9]],"IE",353,"00","0",,,"0",,,,[[,"(1)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["40[24]|50[45]"],"(0$1)"],
[,"(48)(\\d{4})(\\d{4})","$1 $2 $3",["48"],"(0$1)"],[,"(818)(\\d{3})(\\d{3})","$1 $2 $3",["81"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[24-69]|7[14]"],"(0$1)"],[,"([78]\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["76|8[35-9]"],"0$1"],[,"(700)(\\d{3})(\\d{3})","$1 $2 $3",["70"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:8[059]|5)","1(?:8[059]0|5)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"818\\d{6}",,,,"818123456",,,[9]],,,[,,"8[35-9]\\d{8}",,,,"8501234567",
,,[10]]],IL:[,[,,"1\\d{6,11}|[2-589]\\d{3}(?:\\d{3,6})?|6\\d{3}|7\\d{6,9}",,,,,,,[4,7,8,9,10,11,12]],[,,"(?:153\\d{1,2}|[2-489])\\d{7}",,,,"21234567",,,[8,11,12],[7]],[,,"5(?:[02-47-9]\\d{2}|5(?:01|2[23]|3[2-4]|4[45]|5[5689]|6[6-8]|7[0178]|8[6-9]|9[2-9])|6[2-9]\\d)\\d{5}",,,,"501234567",,,[9]],[,,"1(?:80[019]\\d{3}|255)\\d{3}",,,,"1800123456",,,[7,10]],[,,"1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}",,,,"1919123456",,,[8,9,10]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,"7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6[58]\\d|7\\d{2}|8(?:2\\d|33|55|77|81)|9[2579]\\d)\\d{5}",
,,,"771234567",,,[9]],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"([2-489])(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"([57]\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],[,"(153)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["153"],"$1"],[,"(1)([7-9]\\d{2})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"],"$1"],[,"(1255)(\\d{3})","$1-$2",["125"],"$1"],[,"(1200)(\\d{3})(\\d{3})","$1-$2-$3",["120"],"$1"],[,"(1212)(\\d{2})(\\d{2})","$1-$2-$3",["121"],"$1"],[,"(1599)(\\d{6})","$1-$2",["15"],"$1"],[,"(\\d{4})",
"*$1",["[2-689]"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"1700\\d{6}|[2-689]\\d{3}",,,,"1700123456",,,[4,10]],[,,"[2-689]\\d{3}|1599\\d{6}",,,,"1599123456",,,[4,10]],,,[,,,,,,,,,[-1]]],IM:[,[,,"[135789]\\d{6,9}",,,,,,,[10],[6]],[,,"1624[5-8]\\d{5}",,,,"1624756789",,,,[6]],[,,"7(?:4576|[59]24\\d)\\d{5}",,,,"7924123456"],[,,"808162\\d{4}",,,,"8081624567"],[,,"(?:872299|90[0167]624)\\d{4}",,,,"9016247890"],[,,"8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}",,,,"8456247890"],[,,"70\\d{8}",,,,"7012345678"],[,,"56\\d{8}",
,,,"5612345678"],"IM",44,"00","0"," x",,"0",,,,,,[,,"7624[0-4689]\\d{5}",,,,"7624212345"],,,[,,,,,,,,,[-1]],[,,"3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],IN:[,[,,"008\\d{9}|1\\d{7,12}|[2-9]\\d{9,10}",,,,,,,[8,9,10,11,12,13],[6,7]],[,,"(?:11|2[02]|33|4[04]|79)[2-7]\\d{7}|80[2-467]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-467])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}",
,,,"1123456789",,,[10],[6,7,8]],[,,"(?:600[1-3]\\d|7(?:0\\d{3}|19[0-5]\\d|2(?:[0235679]\\d{2}|[14][017-9]\\d|8(?:[0-59]\\d|[678][089]))|3(?:[05-8]\\d{2}|1(?:[089]\\d|7[5-8])|2(?:[0-49][089]|[5-8]\\d)|3[017-9]\\d|4(?:[07-9]\\d|11)|9(?:[016-9]\\d|[2-5][089]))|4(?:0\\d{2}|1(?:[015-9]\\d|[23][089]|4[089])|2(?:0[089]|[1-7][089]|[89]\\d)|3(?:[0-8][089]|9\\d)|4(?:[089]\\d|11|7[02-8])|[56]\\d[089]|7(?:[089]\\d|11|7[02-8])|8(?:[0-24-7][089]|[389]\\d)|9(?:[0-6][089]|7[089]|[89]\\d))|5(?:[0346-8]\\d{2}|1(?:[07-9]\\d|11)|2(?:[04-9]\\d|[123][089])|5[017-9]\\d|9(?:[0-6][089]|[7-9]\\d))|6(?:0(?:[0-47]\\d|[5689][089])|(?:1[0-257-9]|[6-9]\\d)\\d|2(?:[0-4]\\d|[5-9][089])|3(?:[02-8][089]|[19]\\d)|4\\d[089]|5(?:[0-367][089]|[4589]\\d))|7(?:0(?:0[02-9]|[13-6][089]|[289]\\d|7[89])|[1-9]\\d{2})|8(?:[0-79]\\d{2}|8(?:[089]\\d|11|7[02-9]))|9(?:[089]\\d{2}|313|7(?:[02-8]\\d|9[07-9])))|8(?:0(?:[01589]\\d{2}|6[67]\\d|7(?:[02-8]\\d|9[05-9]))|1(?:[02-57-9]\\d{2}|1(?:[0-35-9]\\d|4[0-46-9])|6(?:[089]\\d|7[02-8]))|2(?:0(?:[089]\\d|7[02])|[14](?:[089]\\d|7[02-8])|[235-9]\\d{2})|3(?:[0357-9]\\d{2}|1(?:[089]\\d|7[02-6])|2(?:[09]\\d|77|8[0-689])|4(?:0[1-7]|[1-9]\\d)|6(?:[089]\\d|7[02-7]))|[45]\\d{3}|6(?:[02457-9]\\d{2}|1(?:[089]\\d|7[02-8])|3(?:[089]\\d|7[02-68])|6(?:[08]\\d|7[02-8]|9[01]))|7(?:0[07-9]\\d|[1-69]\\d{2}|[78](?:[089]\\d|7[02-8]))|8(?:[0-25-9]\\d{2}|3(?:[089]\\d|7[02-8])|4(?:[0489]\\d|7[02-68]))|9(?:[02-9]\\d{2}|1(?:[0289]\\d|7[2-6])))|9\\d{4})\\d{5}",
,,,"8123456789",,,[10]],[,,"00800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",,,,"1800123456"],[,,"186[12]\\d{9}",,,,"1861123456789",,,[13]],[,,"1860\\d{7}",,,,"18603451234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IN",91,"00","0",,,"0",,,,[[,"(\\d{5})(\\d{5})","$1 $2",["600|7(?:[02-8]|19|9[037-9])|8(?:0[015-9]|[1-9])|9","600|7(?:[078]|19[0-5]|2(?:[02356-9]|[14][017-9]|9[389])|3(?:[025-9]|1[07-9]|[34][017-9])|4(?:[0-35689]|[47][017-9])|5(?:[02346-9]|1[017-9]|5[017-9])|6(?:[02-9]|1[0-257-9])|9(?:[089]|31|7[02-9]))|8(?:0(?:[01589]|6[67]|7[02-9])|1(?:[0-57-9]|6[07-9])|2(?:0[07-9]|[14][07-9]|[235-9])|3(?:[03-57-9]|[126][07-9])|[45]|6(?:[02457-9]|[136][07-9])|7(?:[078][07-9]|[1-69])|8(?:[0-25-9]|3[07-9]|4[047-9])|9(?:[02-9]|1[027-9]))|9",
"600|7(?:0|19[0-5]|2(?:[0235679]|[14][017-9]|8(?:[0-569]|[78][089])|9[389])|3(?:[05-8]|1(?:[089]|7[5-9])|2(?:[5-8]|[0-49][089])|3[017-9]|4(?:[07-9]|11)|9(?:[01689]|[2345][089]|40|7[0189]))|4(?:[056]|1(?:[0135-9]|[23][089]|2[089]|4[089])|2(?:0[089]|[1-7][089]|[89])|3(?:[0-8][089]|9)|4(?:[089]|11|7[02-8])|7(?:[089]|11|7[02-8])|8(?:[0-24-7][089]|[389])|9(?:[0-7][089]|[89]))|5(?:[0346-9]|1[017-9]|2(?:[03-9]|[12][089])|5[017-9])|6(?:[0346-9]|1[0-257-9]|2(?:[0-4]\\d|[5-9][089])|5(?:[0-367][089]|[4589]))|7(?:0(?:[02-9]|1[089])|[1-9])|8(?:[0-79]|8(?:0[0189]|11|8[013-9]|9))|9(?:[089]|313|7(?:[02-8]|9[07-9])))|8(?:0(?:[01589]|6[67]|7(?:[02-8]|9[05-9]))|1(?:[02-57-9]|1(?:[0-35-9]|4[0-46-9])|6(?:[089]|7[02-8]))|2(?:0(?:[089]|7[02])|[14](?:[089]|7[02-8])|[235-9])|3(?:[0357-9]|1(?:[089]|7[02-6])|2(?:[09]|77|8[0-689])|4(?:0[1-7]|[1-9])|6(?:[089]|7[02-7]))|[45]|6(?:[02457-9]|1(?:[089]|7[02-8])|3(?:[089]|7[02-68])|6(?:[08]|7[02-8]|9[01]))|7(?:0[07-9]|[1-69]|7(?:[089]|7[02-8])|8(?:[089]|7[02-8]))|8(?:[0-25-9]|3(?:[089]|7[02-8])|4(?:[0489]|7[02-68]))|9(?:[02-9]|1(?:[0289]|7[2-6])))|9"],
"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-9]|80[2-46]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[59][14]|7[1257]|[68][1-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"],
"0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[23579]|[468][1-9])|[2-8]"],"0$1",,1],[,"(\\d{2})(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3 $4",["008"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],"$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3",["160","1600"],"$1",,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{3,4})(\\d{4})","$1 $2 $3",["186","1860"],"$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
"$1 $2 $3 $4",["18[06]"],"$1",,1]],,[,,,,,,,,,[-1]],,,[,,"00800\\d{7}|1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))",,,,"1800123456"],[,,"140\\d{7}",,,,"1409305260",,,[10]],1,,[,,,,,,,,,[-1]]],IO:[,[,,"3\\d{6}",,,,,,,[7]],[,,"37\\d{5}",,,,"3709100"],[,,"38\\d{5}",,,,"3801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
IQ:[,[,,"[1-7]\\d{7,9}",,,,,,,[8,9,10],[6,7]],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"7[3-9]\\d{8}",,,,"7912345678",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IQ",964,"00","0",,,"0",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"([2-6]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
,,[,,,,,,,,,[-1]]],IR:[,[,,"[1-8]\\d{9}|9(?:[0-4]\\d{8}|9\\d{2,8})",,,,,,,[4,5,6,7,8,9,10]],[,,"(?:(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])\\d{3}|94(?:000|11[1-7]|2\\d{2}|440))\\d{5}",,,,"2123456789",,,[10]],[,,"9(?:0[1-3]\\d{2}|[1-3]\\d{3}|9(?:0\\d{2}|99[89]))\\d{5}",,,,"9123456789",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:[2-6]0\\d|993)\\d{7}",,,,"9932123456",,,[10]],"IR",98,"00","0",,,"0",,,,[[,"(21)(\\d{3,5})","$1 $2",["21"],"0$1"],
[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"],[,"(\\d{3})(\\d{3})","$1 $2",["9990"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["9990"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"]],,[,,"943\\d{7}",,,,"9432123456",,,[10]],,,[,,"(?:9411[1-7]|94440)\\d{5}",,,,"9411110000",,,[10]],[,,"9990\\d{0,6}",,,,"9990123456"],,,[,,,,,,,,,[-1]]],IS:[,[,,"[4-9]\\d{6}|38\\d{7}",,,,,,,[7,9]],[,,"(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-79]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}",
,,,"4101234",,,[7]],[,,"38[589]\\d{6}|(?:6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|[67][0-69]|9\\d)|7(?:5[057]|[6-8]\\d)|8(?:2[0-59]|3[0-4]|[469]\\d|5[1-9]|88))\\d{4}",,,,"6111234"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"90\\d{5}",,,,"9011234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"49\\d{5}",,,,"4921234",,,[7]],"IS",354,"1(?:0(?:01|10|20)|100)|00",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(3\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"809\\d{4}",
,,,"8091234",,,[7]],,,[,,"(?:6(?:2[78]|49|8\\d)|8(?:7[0189]|80)|95[48])\\d{4}",,,,"6271234",,,[7]]],IT:[,[,,"[01589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9})",,,,,,,[6,7,8,9,10,11]],[,,"0(?:[26]\\d{4,9}|(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2346]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[34578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7})",
,,,"0212345678"],[,,"3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})",,,,"3123456789",,,[9,10,11]],[,,"80(?:0\\d{6}|3\\d{3})",,,,"800123456",,,[6,9]],[,,"0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{6}|[17]\\d{3})",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"IT",39,"00",,,,,,,,[[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|55"]],
[,"(0[26])(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(0[26])(\\d{4,6})","$1 $2",["0[26]"]],[,"(0\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],[,"(0\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["0[13-57-9][2-46-8]"]],[,"(0\\d{3})(\\d{2,6})","$1 $2",["0[13-57-9][2-46-8]"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13]|8(?:00|4[08]|9[59])","[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],
[,"(\\d{4})(\\d{4})","$1 $2",["894","894[5-9]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],1,,[,,"848\\d{6}",,,,"848123456",,,[9]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],JE:[,[,,"[135789]\\d{6,9}",,,,,,,[10],[6]],[,,"1534[0-24-8]\\d{5}",,,,"1534456789",,,,[6]],[,,"7(?:509\\d|7(?:00[378]|97[7-9])|829\\d|937\\d)\\d{5}",,,,"7797712345"],[,,"80(?:07(?:35|81)|8901)\\d{4}",,,,"8007354567"],[,,"(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}",,,,"9018105678"],[,,"8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}",
,,,"8447034567"],[,,"701511\\d{4}",,,,"7015115678"],[,,"56\\d{8}",,,,"5612345678"],"JE",44,"00","0"," x",,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456"],,,[,,,,,,,,,[-1]],[,,"3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],JM:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[027-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}",
,,,"8765123456",,,,[7]],[,,"876(?:2[14-9]\\d|[348]\\d{2}|5(?:0[3-9]|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}",,,,"8762101234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"JM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"876",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],JO:[,[,,"[235-9]\\d{7,8}",,,,,,,[8,
9]],[,,"(?:2(?:6(?:2[0-35-9]|3[0-57-8]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[50]0|3(?:00|33)|4(?:0[0125]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[17-8]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[02-39]))|87(?:[02]0|7[08]|90))\\d{4}",,,,"62001234",,,[8]],[,,"7(?:55|7[025-9]|8[0-25-9]|9[0-25-9])\\d{6}",
,,,"790123456",,,[9]],[,,"80\\d{6}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,"85\\d{6}",,,,"85012345",,,[8]],[,,"70\\d{7}",,,,"700123456",,,[9]],[,,,,,,,,,[-1]],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(7)(\\d{4})(\\d{4})","$1 $2 $3",["7[457-9]"],"0$1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["70|8[0158]|9"],"0$1"]],,[,,"74(?:66|77)\\d{5}",,,,"746612345",,,[9]],,,[,,,,,,,,,[-1]],[,,"8(?:10|8\\d)\\d{5}",,,,"88101234",,,[8]],,,[,,,,,,,,,[-1]]],
JP:[,[,,"[1-9]\\d{8,9}|00(?:[36]\\d{7,14}|7\\d{5,7}|8\\d{7})",,,,,,,[8,9,10,11,12,13,14,15,16,17]],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|2[2-9]\\d|[36][1-9]\\d|4(?:6[02-8]|[2-578]\\d|9[2-59])|5(?:6[1-9]|7[2-8]|[2-589]\\d)|7(?:3[4-9]|4[02-9]|[25-9]\\d)|8(?:3[2-9]|4[5-9]|5[1-9]|8[03-9]|[2679]\\d)|9(?:[679][1-9]|[2-58]\\d))\\d{6}",,,,"312345678",,,[9]],[,,"[7-9]0[1-9]\\d{7}",,,,"9012345678",,,[10]],[,,"120\\d{6}|800\\d{7}|00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})",
,,,"120123456"],[,,"990\\d{6}",,,,"990123456",,,[9]],[,,,,,,,,,[-1]],[,,"60\\d{7}",,,,"601234567",,,[9]],[,,"50[1-9]\\d{7}",,,,"5012345678",,,[10]],"JP",81,"010","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{4})(\\d{4})","$1-$2",["0077"],"$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})","$1-$2-$3",["0077"],"$1"],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["0088"],"$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",["00(?:37|66)"],
"$1"],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",["00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["00(?:37|66)"],"$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]0|80[1-9]"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))",
"1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],
"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"],
"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:9[14-79]|74|[34]7|[56]9)|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[2479][1-9]"],"0$1"]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]0|80[1-9]"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|5(?:76|97)|499|746|8(?:3[89]|63|47|51)|9(?:49|80|9[16])",
"1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:76|97)9|499[2468]|7468|8(?:3(?:8[78]|96)|636|477|51[24])|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|5(?:769|979[2-69])|499[2468]|7468|8(?:3(?:8[78]|96[2457-9])|636[2-57-9]|477|51[24])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:7[2-6]|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|[4-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6[56]))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
"1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:5[78]|7[2-4]|[0468][2-9])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[89][2-8]|[4-7]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:[3578]|20|4[04-9]|6(?:5[25]|60)))|3(?:7(?:[2-5]|6[0-59])|[3-6][2-9]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],
"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5(?:[2-589]|39)|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:[68]|20|9[178])|64|7[347])|5(?:[2-589]|39[67])|60|8(?:[46-9]|3[279]|2[124589])|9(?:[235-8]|93(?:31|4))"],
"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["2(?:9[14-79]|74|[34]7|[56]9)|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[2479][1-9]"],"0$1"]],[,,"20\\d{8}",,,,"2012345678",,,[10]],,,[,,"00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})",,,,"00777012"],[,,"570\\d{6}",,,,"570123456",,,[9]],1,,[,,,,,,,,,[-1]]],KE:[,[,,"20\\d{6,7}|[4-9]\\d{6,9}",,,,,,,[7,8,9,10]],[,,"20\\d{6,7}|4(?:0\\d{6,7}|[136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|2\\d{7}|6\\d{6,7})",
,,,"202012345",,,[7,8,9]],[,,"7(?:[0-3679]\\d|4[0-479]|5[0-6]|8[0-25-9])\\d{6}",,,,"712123456",,,[9]],[,,"800[24-8]\\d{5,6}",,,,"800223456",,,[9,10]],[,,"900[02-9]\\d{5}",,,,"900223456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KE",254,"000","0",,,"005|0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KG:[,[,
,"[235-8]\\d{8,9}",,,,,,,[9,10],[5,6]],[,,"(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",,,,"312123456",,,[9],[5,6]],[,,"(?:20[0-35]|5[124-7]\\d|7[07]\\d)\\d{6}",,,,"700123456",,,[9]],[,,"800\\d{6,7}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KG",996,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",
["[25-7]|31[25]"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[36]|[2-9])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KH:[,[,,"[1-9]\\d{7,9}",,,,,,,[8,9,10],[6,7]],[,,"(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}",,,,"23756789",,,[8,9],[6,7]],[,,"(?:1(?:[013-79]\\d|[28]\\d{1,2})|2[3-6]48|3(?:[18]\\d{2}|[2-6]48)|4[2-4]48|5[2-5]48|6(?:[016-9]\\d|[2-5]48)|7(?:[07-9]\\d|[16]\\d{2}|[2-5]48)|8(?:[013-79]\\d|8\\d{2})|9(?:6\\d{2}|7\\d{1,2}|[0-589]\\d))\\d{5}",
,,,"91234567",,,[8,9]],[,,"1800(?:1\\d|2[019])\\d{4}",,,,"1800123456",,,[10]],[,,"1900(?:1\\d|2[09])\\d{4}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["1\\d[1-9]|[2-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[89]0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KI:[,[,,"[2458]\\d{4}|3\\d{4,7}|7\\d{7}",,,,,,,[5,8]],[,,"(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}|7(?:27|31|5[0-4])\\d{5}",
,,,"31234"],[,,"7[23]0\\d{5}",,,,"72012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"30(?:0[01]\\d{2}|12(?:11|20))\\d{2}",,,,"30010000",,,[8]],"KI",686,"00",,,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KM:[,[,,"[3478]\\d{6}",,,,,,,[7]],[,,"7[4-7]\\d{5}",,,,"7712345"],[,,"[34]\\d{6}",,,,"3212345"],[,,,,,,,,,[-1]],[,,"(?:39[01]|8\\d{2})\\d{4}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})",
"$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KN:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}",,,,"8692361234",,,,[7]],[,,"869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}",,,,"8697652917",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KN",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],
,"869",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KP:[,[,,"1\\d{9}|[28]\\d{7}",,,,,,,[8,10],[6,7]],[,,"2\\d{7}|85\\d{6}",,,,"21234567",,,[8],[6,7]],[,,"19[123]\\d{7}",,,,"1921234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}",
,,,"23821234",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KR:[,[,,"007\\d{9,11}|[1-7]\\d{3,9}|8\\d{8}",,,,,,,[4,5,6,8,9,10,12,13,14],[3,7]],[,,"(?:2|3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})",,,,"22123456",,,[4,5,6,8,9,10],[3,7]],[,,"1[0-26-9]\\d{7,8}",,,,"1000000000",,,[9,10]],[,,"(?:00798\\d{0,2}|80)\\d{7}",,,,"801234567",,,[9,12,13,14]],[,,"60[2-9]\\d{6}",,,,"602345678",,,[9]],[,,,,,,,,,[-1]],[,,"50\\d{8}",,,,"5012345678",,,[10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"KR",82,"00(?:[124-68]|3\\d{2}|7(?:[0-8]\\d|9[0-79]))",
"0",,,"0(8[1-46-8]|85\\d{2})?",,,,[[,"(\\d{5})(\\d{3,4})(\\d{4})","$1 $2 $3",["00798"],"$1","0$CC-$1"],[,"(\\d{5})(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["00798"],"$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["1(?:0|1[19]|[69]9|5[458])|[57]0","1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1(?:[01]|5[1-4]|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]","1(?:[01]|5(?:[1-3]|4[56])|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d)(\\d{4})",
"$1-$2-$3",["131","1312"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["131","131[13-9]"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["13[2-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3-$4",["30"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})","$1-$2",["21[0-46-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})","$1-$2",["[3-6][1-9]1","[3-6][1-9]1(?:[0-46-9])"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})",
"$1-$2",["1(?:5[246-9]|6[04678]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"]],[[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["1(?:0|1[19]|[69]9|5[458])|[57]0","1(?:0|1[19]|[69]9|5(?:44|59|8))|[57]0"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1(?:[01]|5[1-4]|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]","1(?:[01]|5(?:[1-3]|4[56])|6[2-8]|[7-9])|[68]0|[3-6][1-9][1-9]"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d)(\\d{4})","$1-$2-$3",["131","1312"],"0$1",
"0$CC-$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["131","131[13-9]"],"0$1","0$CC-$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["13[2-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3-$4",["30"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})","$1-$2",["21[0-46-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})","$1-$2",["[3-6][1-9]1","[3-6][1-9]1(?:[0-46-9])"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[04678]|8[03579])",
"1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"]],[,,"15\\d{7,8}",,,,"1523456789",,,[9,10]],,,[,,"00798\\d{7,9}",,,,"007981234567",,,[12,13,14]],[,,"1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))\\d{4}",,,,"15441234",,,[8]],1,,[,,,,,,,,,[-1]]],KW:[,[,,"[12569]\\d{6,7}",,,,,,,[7,8]],[,,"(?:18\\d|2(?:[23]\\d{2}|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7])))\\d{4}",,,,"22345678"],[,,"(?:5(?:[05]\\d{2}|1[0-7]\\d|2(?:22|5[25])|66\\d)|6(?:0[034679]\\d|222|5[015-9]\\d|6\\d{2}|7[067]\\d|9[0369]\\d)|9(?:0[09]\\d|22\\d|4[01479]\\d|55\\d|6[0679]\\d|[79]\\d{2}|8[057-9]\\d))\\d{4}",
,,,"50012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})","$1 $2",["[16]|2(?:[0-35-9]|4[0-35-9])|9[024-9]|52[25]"]],[,"(\\d{3})(\\d{5})","$1 $2",["244|5(?:[015]|66)"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KY:[,[,,"[3589]\\d{9}",,,,,,,[10],[7]],[,,"345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}",,,,"3452221234",,,,[7]],
[,,"345(?:32[1-9]|5(?:1[67]|2[5-7]|4[6-8]|76)|9(?:1[67]|2[2-9]|3[689]))\\d{4}",,,,"3453231234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}|345976\\d{4}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KY",1,"011","1",,,"1",,,,,,[,,"345849\\d{4}",,,,"3458491234"],,"345",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KZ:[,[,,"(?:33\\d|7\\d{2}|80[09])\\d{7}",,,,,,,[10]],[,,"33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}",
,,,"7123456789"],[,,"7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}",,,,"7710009998"],[,,"800\\d{7}",,,,"8001234567"],[,,"809\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"751\\d{7}",,,,"7511234567"],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,,,,,,,,[-1]],,,[,,"751\\d{7}",,,,"7511234567"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LA:[,[,,"[2-8]\\d{7,9}",,,,,,,[8,9,10],[6]],[,,"(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}",,,,"21212862",,,[8,9],[6]],[,,"20(?:2[2389]|5[4-689]|7[6-8]|9[15-9])\\d{6}",
,,,"2023123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LA",856,"00","0",,,"0",,,,[[,"(20)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["20"],"0$1"],[,"([2-8]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(30)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LB:[,[,,"[13-9]\\d{6,7}",,,,,,,[7,8]],[,,"(?:[14-6]\\d{2}|7(?:[2-57]\\d|62|8[0-7]|9[04-9])|8[02-9]\\d|9\\d{2})\\d{4}",
,,,"1123456",,,[7]],[,,"(?:3\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3])|81\\d)\\d{5}",,,,"71123456"],[,,,,,,,,,[-1]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,"80\\d{6}",,,,"80123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-6]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]|9"],"0$1"],[,"([7-9]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[89][01]|7(?:[01]|6[013-9]|8[89]|9[1-3])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LC:[,
[,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"758(?:4(?:30|5[0-9]|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}",,,,"7584305678",,,,[7]],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2[0-8]))\\d{4}",,,,"7582845678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"LC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"758",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,
,,,,,,[-1]]],LI:[,[,,"6\\d{8}|[23789]\\d{6}",,,,,,,[7,9]],[,,"(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}",,,,"2345678",,,[7]],[,,"6(?:5(?:09|1\\d|20)|6(?:0[0-6]|10|2[06-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}",,,,"660234567"],[,,"80(?:02[28]|9\\d{2})\\d{2}",,,,"8002222",,,[7]],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}",,,,"9002222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LI",423,"00","0",,,"0|10(?:01|20|66)",,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3",
["[23789]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[56]"]],[,"(69)(7\\d{2})(\\d{4})","$1 $2 $3",["697"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"870(?:28|87)\\d{2}",,,,"8702812",,,[7]],,,[,,"697(?:42|56|[78]\\d)\\d{4}",,,,"697861234",,,[9]]],LK:[,[,,"[1-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:[189]1|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}",,,,"112345678",,,,[7]],[,,"7[0125-8]\\d{7}",,,,"712345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LK",94,"00",
"0",,,"0",,,,[[,"(\\d{2})(\\d{1})(\\d{6})","$1 $2 $3",["[1-689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LR:[,[,,"2\\d{7,8}|[378]\\d{8}|4\\d{6}|5\\d{6,8}",,,,,,,[7,8,9]],[,,"2\\d{7}",,,,"21234567",,,[8]],[,,"(?:20\\d{3}|330\\d{2}|4[67]\\d|5(?:55)?\\d{2}|77\\d{3}|88\\d{3})\\d{4}",,,,"770123456",,,[7,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"332(?:02|[25]\\d)\\d{4}",,,,"332021234",
,,[9]],"LR",231,"00","0",,,"0",,,,[[,"(2\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"([4-5])(\\d{3})(\\d{3})","$1 $2 $3",["[45]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23578]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LS:[,[,,"[2568]\\d{7}",,,,,,,[8]],[,,"2\\d{7}",,,,"22123456"],[,,"[56]\\d{7}",,,,"50123456"],[,,"800[256]\\d{4}",,,,"80021234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})",
"$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LT:[,[,,"[3-9]\\d{7}",,,,,,,[8]],[,,"(?:3[1478]|4[124-6]|52)\\d{6}",,,,"31234567"],[,,"6\\d{7}",,,,"61234567"],[,,"800\\d{5}",,,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"LT",370,"00","8",,,"[08]",,,,[[,"([34]\\d)(\\d{6})","$1 $2",["37|4(?:1|5[45]|6[2-4])"],"(8-$1)",,1],[,"([3-6]\\d{2})(\\d{5})","$1 $2",["3[148]|4(?:[24]|6[09])|528|6"],
"(8-$1)",,1],[,"([7-9]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",,1],[,"(5)(2\\d{2})(\\d{4})","$1 $2 $3",["52[0-79]"],"(8-$1)",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[67]\\d{5}",,,,"70712345"],,,[,,,,,,,,,[-1]]],LU:[,[,,"[24-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5[013-9]\\d{1,8})",,,,,,,[4,5,6,7,8,9,10,11]],[,,"(?:2[2-9]\\d{2,9}|(?:[3457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8})",,,,"27123456"],[,,"6[25-79][18]\\d{6}",,,,"628123456",,,[9]],[,,"800\\d{5}",,,,"80012345",
,,[8]],[,,"90[015]\\d{5}",,,,"90012345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"70\\d{6}",,,,"70123456",,,[8]],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})",,,,"20201234",,,[4,5,6,7,8,9,10]],"LU",352,"00",,,,"(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[2-5]|7[1-9]|[89](?:[1-9]|0[2-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})",
"$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})","$1 $2 $3 $4",["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:[1-9]|0[2-9])|9(?:[1-9]|0[2-46-9])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["70|80[01]|90[015]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6"],,"$CC $1"]],,[,,,,,,,,,[-1]],
,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LV:[,[,,"[2689]\\d{7}",,,,,,,[8]],[,,"6\\d{7}",,,,"63123456"],[,,"2\\d{7}",,,,"21234567"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,"81\\d{6}",,,,"81123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LV",371,"00",,,,,,,,[[,"([2689]\\d)(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LY:[,[,,"[25679]\\d{8}",,,,,,,[9],[7]],[,,"(?:2[1345]|5[1347]|6[123479]|71)\\d{7}",,,,"212345678",,,,[7]],
[,,"9[1-6]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LY",218,"00","0",,,"0",,,,[[,"([25679]\\d)(\\d{7})","$1-$2",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MA:[,[,,"[5-9]\\d{8}",,,,,,,[9]],[,,"5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])\\d|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])\\d|4[067]\\d{2}|5[03]\\d{2})\\d{4}",,,,"520123456"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[07][07]|6[12]))\\d{6}",,,
,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"MA",212,"00","0",,,"0",,,,[[,"([5-7]\\d{2})(\\d{6})","$1-$2",["5(?:2[015-7]|3[0-4])|[67]"],"0$1"],[,"([58]\\d{3})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|92)|892","5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|924)|892"],"0$1"],[,"(5\\d{4})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]"],"0$1"],[,"([5]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:4[067]|5[03])"],
"0$1"],[,"(8[09])(\\d{7})","$1-$2",["8(?:0|9[013-9])"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MC:[,[,,"[34689]\\d{7,8}",,,,,,,[8,9]],[,,"870\\d{5}|9[2-47-9]\\d{6}",,,,"99123456",,,[8]],[,,"3\\d{7}|4(?:4\\d|5[1-9])\\d{5}|6\\d{8}",,,,"612345678"],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MC",377,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"],"$1"],[,"(\\d{2})(\\d{3})(\\d{3})",
"$1 $2 $3",["4"],"0$1"],[,"(6)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["8"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"870\\d{5}",,,,"87012345",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MD:[,[,,"[235-9]\\d{7}",,,,,,,[8]],[,,"(?:2[1-9]\\d|3[1-79]\\d|5(?:33|5[257]))\\d{5}",,,,"22212345"],[,,"(?:562|6\\d{2}|7(?:[189]\\d|6[07]|7[457-9]))\\d{5}",,,,"62112345"],[,,"800\\d{5}",,,,"80012345"],[,,"90[056]\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],
[,,,,,,,,,[-1]],[,,"3[08]\\d{6}",,,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"([25-7]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["2[13-9]|[5-7]"],"0$1"],[,"([89]\\d{2})(\\d{5})","$1 $2",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"803\\d{5}",,,,"80312345"],,,[,,,,,,,,,[-1]]],ME:[,[,,"[2-9]\\d{7,8}",,,,,,,[8],[6]],[,,"(?:20[2-8]|3(?:0[2-7]|[12][235-7]|3[24-7])|4(?:0[2-467]|1[267])|5(?:0[2467]|1[267]|2[2367]))\\d{5}",,,,"30234567",,,,[6]],
[,,"6(?:00\\d|3[024]\\d|6[0-25]\\d|[7-9]\\d{2})\\d{4}",,,,"67622901"],[,,"80[0-258]\\d{5}",,,,"80080002"],[,,"(?:9(?:4[1568]|5[178]))\\d{5}",,,,"94515151"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"78[1-49]\\d{5}",,,,"78108780"],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-57-9]|6[036-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"77[1-9]\\d{5}",,,,"77273012"],,,[,,,,,,,,,[-1]]],MF:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"590(?:[02][79]|13|5[0-268]|[78]7)\\d{4}",,,,"590271234"],
[,,"690(?:0[0-7]|[1-9]\\d)\\d{4}",,,,"690301234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MF",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MG:[,[,,"[23]\\d{8}",,,,,,,[9],[7]],[,,"20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}",,,,"202123456",,,,[7]],[,,"3[2-49]\\d{7}",,,,"321234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"22\\d{7}",,,,"221234567"],
"MG",261,"00","0",,,"0",,,,[[,"([23]\\d)(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MH:[,[,,"[2-6]\\d{6}",,,,,,,[7]],[,,"(?:247|528|625)\\d{4}",,,,"2471234"],[,,"(?:235|329|45[56]|545)\\d{4}",,,,"2351234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"635\\d{4}",,,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})","$1-$2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
MK:[,[,,"[2-578]\\d{7}",,,,,,,[8],[6,7]],[,,"(?:2(?:[23]\\d|5[124578]|6[01])|3(?:1[3-6]|[23][2-6]|4[2356])|4(?:[23][2-6]|4[3-6]|5[256]|6[25-8]|7[24-6]|8[4-6]))\\d{5}",,,,"22212345",,,,[6,7]],[,,"7(?:[0-25-8]\\d{2}|32\\d|421)\\d{4}",,,,"72345678"],[,,"800\\d{5}",,,,"80012345"],[,,"5[02-9]\\d{6}",,,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"80123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MK",389,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([347]\\d)(\\d{3})(\\d{3})","$1 $2 $3",
["[347]"],"0$1"],[,"([58]\\d{2})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ML:[,[,,"[246-9]\\d{7}",,,,,,,[8]],[,,"(?:2(?:0(?:2\\d|7[0-8])|1(?:2[5-7]|[3-689]\\d))|44[1239]\\d)\\d{4}",,,,"20212345"],[,,"(?:2(?:079|17\\d)|[679]\\d{3}|8[239]\\d{2})\\d{4}",,,,"65012345"],[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ML",223,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",
["[246-9]"]],[,"(\\d{4})","$1",["67|74"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[246-9]"]]],[,,,,,,,,,[-1]],,,[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MM:[,[,,"[1478]\\d{5,7}|[256]\\d{5,8}|9(?:[279]\\d{0,2}|[58]|[34]\\d{1,2}|6\\d?)\\d{6}",,,,,,,[6,7,8,9,10],[5]],[,,"1(?:2\\d{1,2}|[3-5]\\d|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2[245-8]|3(?:[2-46]|56?)|[46][2-6]|5[3-5])\\d{4}|5(?:2(?:2(?:\\d{1,2})?|[3-8])|3[2-68]|4(?:21?|[4-8])|5[23]|6[2-4]|7[2-8]|8[24-7]|9[2-7])\\d{4}|6(?:0[23]|1(?:2(?:0|4\\d)?|[356])|2[2-6]|3[24-6]|4(?:2(?:4\\d)?|[3-6])|5[2-4]|6[2-8]|7(?:[2367]|4\\d|5\\d?|8[145]\\d)|8[245]|9(?:20?|4))\\d{4}|7(?:[04][24-8]|1(?:20?|[3-7])|22|3[2-4]|5[2-7])\\d{4}|8(?:1(?:2\\d{1,2}|[3-689]\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3[24]\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}",
,,,"1234567",,,[6,7,8,9],[5]],[,,"17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3(?:[0-36]|4[069])\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|61?\\d|7(?:3\\d|[6-9]\\d{2})|8\\d|9(?:1\\d|[5-7]\\d{2}|[089]))\\d{5}",,,,"92123456",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1333\\d{4}",,,,"13331234",,,[8]],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["1|2[245]"],"0$1"],[,"(2)(\\d{4})(\\d{4})","$1 $2 $3",["251"],"0$1"],[,
"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["67|81"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3,4})","$1 $2 $3",["[4-8]"],"0$1"],[,"(9)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(9)([34]\\d{4})(\\d{4})","$1 $2 $3",["9(?:3[0-36]|4[0-57-9])"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92[56]"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["93"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,
,,,,,[-1]]],MN:[,[,,"[12]\\d{7,9}|[57-9]\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}",,,,"50123456",,,,[6,7]],[,,"(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}",,,,"88123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"7[05-8]\\d{6}",,,,"75123456",,,[8]],"MN",976,"001","0",,,"0",,,,[[,"([12]\\d)(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"([12]2\\d)(\\d{5,6})","$1 $2",["[12]2[1-3]"],
"0$1"],[,"([12]\\d{3})(\\d{5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)2"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[57-9]"],"$1"],[,"([12]\\d{4})(\\d{4,5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)[4-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MO:[,[,,"[268]\\d{7}",,,,,,,[8]],[,,"(?:28[2-57-9]|8[2-57-9]\\d)\\d{5}",,,,"28212345"],[,,"6(?:[2356]\\d|8[158])\\d{5}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,
,,,,,,[-1]],"MO",853,"00",,,,,,,,[[,"([268]\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MP:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],
[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MP",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"670",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MQ:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"596(?:0[2-5]|[12]0|3[05-9]|4[024-8]|[5-7]\\d|89|9[4-8])\\d{4}",,,,"596301234"],[,,"696(?:[0-47-9]\\d|5[0-6]|6[0-4])\\d{4}",,,,"696201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MQ",596,"00","0",
,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MR:[,[,,"[2-48]\\d{7}",,,,,,,[8]],[,,"25[08]\\d{5}|35\\d{6}|45[1-7]\\d{5}",,,,"35123456"],[,,"[234][0-46-9]\\d{6}",,,,"22123456"],[,,"800\\d{5}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MR",222,"00",,,,,,,,[[,"([2-48]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,
,,,,[-1]]],MS:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"664491\\d{4}",,,,"6644912345",,,,[7]],[,,"66449[2-6]\\d{4}",,,,"6644923456",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"664",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MT:[,[,,"[2357-9]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:1[0-6]|3[1-4]|[69]\\d)|[1-357]\\d{2})\\d{4}",
,,,"21001234"],[,,"(?:7(?:210|[79]\\d{2})|9(?:2(?:1[01]|31)|696|8(?:1[1-3]|89|97)|9\\d{2}))\\d{4}",,,,"96961234"],[,,"800[3467]\\d{4}",,,,"80071234"],[,,"5(?:0(?:0(?:37|43)|6\\d{2}|70\\d|9[0168]\\d)|[12]\\d0[1-5])\\d{3}",,,,"50037123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3550\\d{4}",,,,"35501234"],"MT",356,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,"7117\\d{4}",,,,"71171234"],,,[,,,,,,,,,[-1]],[,,"501\\d{5}",,,,"50112345"],,,[,,,,,,,,,[-1]]],MU:[,[,,"[2-9]\\d{6,7}",,,,,,,[7,8]],[,,"(?:2(?:[03478]\\d|1[0-7]|6[1-69])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}",
,,,"2012345"],[,,"5(?:2[59]\\d|4(?:2[1-389]|4\\d|7[1-9]|9\\d)|7\\d{2}|8(?:[0-25689]\\d|4[3479]|7[15-8])|9[0-8]\\d)\\d{4}",,,,"52512345",,,[8]],[,,"80[012]\\d{4}",,,,"8001234",,,[7]],[,,"30\\d{5}",,,,"3012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3(?:20|9\\d)\\d{4}",,,,"3201234",,,[7]],"MU",230,"0(?:0|[2-7]0|33)",,,,,,"020",,[[,"([2-46-9]\\d{2})(\\d{4})","$1 $2",["[2-46-9]"]],[,"(5\\d{3})(\\d{4})","$1 $2",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MV:[,[,,"[346-8]\\d{6,9}|9(?:00\\d{7}|\\d{6})",
,,,,,,[7,10]],[,,"(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024568]|8[024689]|90))\\d{4}",,,,"6701234",,,[7]],[,,"(?:46[46]|7[3-9]\\d|9[15-9]\\d)\\d{4}",,,,"7712345",,,[7]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[3467]|9(?:[1-9]|0[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]00"]]],,[,,"781\\d{4}",,,,"7812345",,,[7]],,,[,,,,,,,,,[-1]],[,,"4[05]0\\d{4}",
,,,"4001234",,,[7]],,,[,,,,,,,,,[-1]]],MW:[,[,,"(?:1(?:\\d{2})?|[2789]\\d{2})\\d{6}",,,,,,,[7,9]],[,,"(?:1[2-9]|21\\d{2})\\d{5}",,,,"1234567"],[,,"(?:111|77\\d|88\\d|99\\d)\\d{6}",,,,"991234567",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1789]"],"0$1"]],,[,,,,,,,,,[-1]],
,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MX:[,[,,"[1-9]\\d{9,10}",,,,,,,[10,11],[7,8]],[,,"(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[2-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",
,,,"2221234567",,,[10],[7,8]],[,,"1(?:(?:33|55|81)\\d{8}|(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-8]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})",,,,"12221234567",,,[11]],[,,"8(?:00|88)\\d{7}",
,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,"300\\d{7}",,,,"3001234567",,,[10]],[,,"500\\d{7}",,,,"5001234567",,,[10]],[,,,,,,,,,[-1]],"MX",52,"0[09]","01",,,"0[12]|04[45](\\d{10})","1$1",,,[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","044 $2 $3 $4",["1(?:33|55|81)"],"$1",,1],[,"(1)(\\d{3})(\\d{3})(\\d{4})","044 $2 $3 $4",
["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"],"$1",,1]],[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3 $4",["1(?:33|55|81)"]],[,"(1)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],MY:[,[,,"[13-9]\\d{7,9}",,,,,,,[8,
9,10],[6,7]],[,,"(?:3[2-9]\\d|[4-9][2-9])\\d{6}",,,,"323456789",,,[8,9],[6,7]],[,,"1(?:1[1-5]\\d{2}|[02-4679][2-9]\\d|59\\d{2}|8(?:1[23]|[2-9]\\d))\\d{5}",,,,"123456789",,,[9,10]],[,,"1[378]00\\d{6}",,,,"1300123456",,,[10]],[,,"1600\\d{6}",,,,"1600123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"154\\d{7}",,,,"1541234567",,,[10]],"MY",60,"00","0",,,"0",,,,[[,"([4-79])(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(3)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"([18]\\d)(\\d{3})(\\d{3,4})","$1-$2 $3",
["1[02-46-9][1-9]|8"],"0$1"],[,"(1)([36-8]00)(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]0"]],[,"(11)(\\d{4})(\\d{4})","$1-$2 $3",["11"],"0$1"],[,"(15[49])(\\d{3})(\\d{4})","$1-$2 $3",["15"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MZ:[,[,,"[28]\\d{7,8}",,,,,,,[8,9]],[,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",,,,"21123456",,,[8]],[,,"8[2-7]\\d{7}",,,,"821234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,
,,[-1]],"MZ",258,"00",,,,,,,,[[,"([28]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-7]"]],[,"(80\\d)(\\d{3})(\\d{3})","$1 $2 $3",["80"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NA:[,[,,"[68]\\d{7,8}",,,,,,,[8,9]],[,,"6(?:1(?:17|2(?:[0189]\\d|[2-6]|7\\d?)|3(?:[01378]|2\\d)|4(?:[024]|10?|3[15]?)|69|7[014])|2(?:17|5(?:[0-36-8]|4\\d?)|69|70)|3(?:17|2(?:[0237]\\d?|[14-689])|34|6[289]|7[01]|81)|4(?:17|2(?:[012]|7\\d?)|4(?:[06]|1\\d?)|5(?:[01357]|[25]\\d?)|69|7[01])|5(?:17|2(?:[0459]|[23678]\\d?)|69|7[01])|6(?:17|2(?:5|6\\d?)|38|42|69|7[01])|7(?:17|2(?:[569]|[234]\\d?)|3(?:0\\d?|[13])|6[89]|7[01]))\\d{4}",
,,,"61221234"],[,,"(?:60|8[125])\\d{7}",,,,"811234567",,,[9]],[,,,,,,,,,[-1]],[,,"8701\\d{5}",,,,"870123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8(?:3\\d{2}|86)\\d{5}",,,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(8\\d)(\\d{3})(\\d{4})","$1 $2 $3",["8[1235]"],"0$1"],[,"(6\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(88)(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(870)(\\d{3})(\\d{3})","$1 $2 $3",["870"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
NC:[,[,,"[2-57-9]\\d{5}",,,,,,,[6]],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}",,,,"201234"],[,,"(?:5[0-4]|[79]\\d|8[0-79])\\d{4}",,,,"751234"],[,,,,,,,,,[-1]],[,,"36\\d{4}",,,,"366711"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NC",687,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-46-9]|5[0-4]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NE:[,[,,"[0289]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",
,,,"20201234"],[,,"(?:8[089]|9\\d)\\d{6}",,,,"93123456"],[,,"08\\d{6}",,,,"08123456"],[,,"09\\d{6}",,,,"09123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[289]|09"]],[,"(08)(\\d{3})(\\d{3})","$1 $2 $3",["08"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],NF:[,[,,"[13]\\d{5}",,,,,,,[6],[5]],[,,"(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}",,,,"106609",,,,[5]],[,,"3[58]\\d{4}",,,,"381234",,,,[5]],
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NF",672,"00",,,,,,,,[[,"(\\d{2})(\\d{4})","$1 $2",["1"]],[,"(\\d)(\\d{5})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NG:[,[,,"[1-6]\\d{5,8}|9\\d{5,9}|[78]\\d{5,13}",,,,,,,[7,8,10,11,12,13,14],[5,6]],[,,"[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}",,,,"12345678",
,,[7,8],[5,6]],[,,"(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[1-689]\\d|7[0-3])|8(?:0(?:1[01]|[2-9]\\d)|1(?:[0-8]\\d|9[01]))|90[235-9]\\d)\\d{6}",
,,,"8021234567",,,[8,10]],[,,"800\\d{7,11}",,,,"80017591759",,,[10,11,12,13,14]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NG",234,"009","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-6]|7(?:[1-79]|0[1-9])|8[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["70|8[01]|90[235-9]"],"0$1"],[,"([78]00)(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]00"],"0$1"],[,"([78]00)(\\d{5})(\\d{5,6})","$1 $2 $3",
["[78]00"],"0$1"],[,"(78)(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"700\\d{7,11}",,,,"7001234567",,,[10,11,12,13,14]],,,[,,,,,,,,,[-1]]],NI:[,[,,"[12578]\\d{7}",,,,,,,[8]],[,,"2\\d{7}",,,,"21234567"],[,,"5(?:5[0-7]\\d{5}|[78]\\d{6})|7[5-8]\\d{6}|8\\d{7}",,,,"81234567"],[,,"1800\\d{4}",,,,"18001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,
,,[-1]],,,[,,,,,,,,,[-1]]],NL:[,[,,"1\\d{4,8}|[2-7]\\d{8}|[89]\\d{6,9}",,,,,,,[5,6,7,8,9,10]],[,,"(?:1[0135-8]|2[02-69]|3[0-68]|4[0135-9]|[57]\\d|8[478])\\d{7}",,,,"101234567",,,[9]],[,,"6[1-58]\\d{7}",,,,"612345678",,,[9]],[,,"800\\d{4,7}",,,,"8001234",,,[7,8,9,10]],[,,"90[069]\\d{4,7}",,,,"9061234",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6760|85\\d{2})\\d{5}",,,,"851234567",,,[9]],"NL",31,"00","0",,,"0",,,,[[,"([1-578]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"],
"0$1"],[,"([1-5]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(6)(\\d{8})","$1 $2",["6[0-57-9]"],"0$1"],[,"(66)(\\d{7})","$1 $2",["66"],"0$1"],[,"(14)(\\d{3,4})","$1 $2",["14"],"$1"],[,"([89]0\\d)(\\d{4,7})","$1 $2",["80|9"],"0$1"]],,[,,"66\\d{7}",,,,"662345678",,,[9]],,,[,,"14\\d{3,4}",,,,"14123",,,[5,6]],[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])",,,,"14020",,,[5,
6]],,,[,,,,,,,,,[-1]]],NO:[,[,,"0\\d{4}|[2-9]\\d{7}",,,,,,,[5,8]],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",,,,"21234567",,,[8]],[,,"(?:4[015-8]|5[89]|87|9\\d)\\d{6}",,,,"40612345",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"NO",47,"00",,,,,,,,[[,"([489]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],[,"([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})",
"$1 $2 $3 $4",["[235-7]"]]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",,,,"01234"],1,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],NP:[,[,,"[1-8]\\d{7}|9(?:[1-69]\\d{6,8}|7[2-6]\\d{5,7}|8\\d{8})",,,,,,,[8,10],[6,7]],[,,"(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}",,,,"14567890",,,[8],[6,7]],[,,"9(?:6[013]|7[245]|8[0-24-6])\\d{7}",,,,"9841234567",,,[10]],[,,,,,,,,,[-1]],[,,,,
,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NP",977,"00","0",,,"0",,,,[[,"(1)(\\d{7})","$1-$2",["1[2-6]"],"0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-69]|7[15-9])"],"0$1"],[,"(9\\d{2})(\\d{7})","$1-$2",["9(?:6[013]|7[245]|8)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NR:[,[,,"[458]\\d{6}",,,,,,,[7]],[,,"(?:444|888)\\d{4}",,,,"4441234"],[,,"55[5-9]\\d{4}",,,,"5551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,
,,,,,,,,[-1]],"NR",674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NU:[,[,,"[1-5]\\d{3}",,,,,,,[4]],[,,"[34]\\d{3}",,,,"4002"],[,,"[125]\\d{3}",,,,"1234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NU",683,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NZ:[,[,,"6[235-9]\\d{6}|[2-57-9]\\d{7,10}",,,,,,,[8,9,10,11],[7]],[,,"(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}",
,,,"32345678",,,[8],[7]],[,,"2(?:[028]\\d{7,8}|1(?:[03]\\d{5,7}|[12457]\\d{5,6}|[689]\\d{5})|[79]\\d{7})",,,,"211234567",,,[8,9,10]],[,,"508\\d{6,7}|80\\d{6,8}",,,,"800123456",,,[8,9,10]],[,,"90\\d{7,9}",,,,"900123456",,,[9,10,11]],[,,,,,,,,,[-1]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,,,,,,,,[-1]],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"([34679])(\\d{3})(\\d{4})","$1-$2 $3",["[346]|7[2-57-9]|9[1-9]"],"0$1"],[,"(24099)(\\d{3})","$1 $2",["240","2409","24099"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})",
"$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:1[1-9]|[69]|7[0-35-9])|70|86"],"0$1"],[,"(2\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:10|74)|5|[89]0"],"0$1"]],,[,,"[28]6\\d{6,7}",,,,"26123456",,,[8,9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],OM:[,[,,"(?:5|[279]\\d)\\d{6}|800\\d{5,6}",,,,,,,[7,8,9]],[,,"2[2-6]\\d{6}",,,,"23123456",,,[8]],[,,"7[19]\\d{6}|9(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"92123456",,,[8]],[,
,"8007\\d{4,5}|500\\d{4}",,,,"80071234"],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"OM",968,"00",,,,,,,,[[,"(2\\d)(\\d{6})","$1 $2",["2"]],[,"([79]\\d{3})(\\d{4})","$1 $2",["[79]"]],[,"([58]00)(\\d{4,6})","$1 $2",["[58]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PA:[,[,,"[1-9]\\d{6,7}",,,,,,,[7,8]],[,,"(?:1(?:0[0-8]|1[49]|2[37]|3[0137]|4[147]|5[05]|6[58]|7[0167]|8[58]|9[139])|2(?:[0235679]\\d|1[0-7]|4[04-9]|8[028])|3(?:[09]\\d|1[014-7]|2[0-3]|3[03]|4[03-57]|55|6[068]|7[06-8]|8[06-9])|4(?:3[013-69]|4\\d|7[0-589])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-267]|3[06]|[469]0|5[06-9]|7[0-24-79]|8[7-9])|8(?:09|[34]\\d|5[0134]|8[02])|9(?:0[6-9]|1[016-8]|2[036-8]|3[3679]|40|5[0489]|6[06-9]|7[046-9]|8[36-8]|9[1-9]))\\d{4}",
,,,"2001234",,,[7]],[,,"(?:1[16]1|21[89]|8(?:1[01]|7[23]))\\d{4}|6(?:[024-9]\\d|1[0-5]|3[0-24-9])\\d{5}",,,,"60012345"],[,,"80[09]\\d{4}",,,,"8001234",,,[7]],[,,"(?:779|8(?:55|60|7[78])|9(?:00|81))\\d{4}",,,,"8601234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["6"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PE:[,[,,"[14-9]\\d{7,8}",,,,,,,[8,9],[6,7]],[,,"(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}",
,,,"11234567",,,[8],[6,7]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"805\\d{5}",,,,"80512345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"80[24]\\d{5}",,,,"80212345",,,[8]],[,,,,,,,,,[-1]],"PE",51,"19(?:1[124]|77|90)00","0"," Anexo ",,"0",,,,[[,"(1)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"([4-8]\\d)(\\d{6})","$1 $2",["[4-7]|8[2-4]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,
,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PF:[,[,,"4\\d{5,7}|8\\d{7}",,,,,,,[6,8]],[,,"4(?:[09][45689]\\d|4)\\d{4}",,,,"40412345"],[,,"8[79]\\d{6}",,,,"87123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[09]|8[79]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]]],,[,,,,,,,,,[-1]],,,[,,"44\\d{4}",,,,"441234",,,[6]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PG:[,[,,"[1-9]\\d{6,7}",,
,,,,,[7,8]],[,,"(?:3[0-2]\\d|4[257]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}",,,,"3123456",,,[7]],[,,"(?:20150|68\\d{2}|7(?:[0-689]\\d|75)\\d{2})\\d{3}",,,,"6812345"],[,,"180\\d{4}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"27[568]\\d{4}",,,,"2751234",,,[7]],"PG",675,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-689]|27"]],[,"(\\d{4})(\\d{4})","$1 $2",["20|7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PH:[,[,,
"2\\d{5,7}|[3-9]\\d{7,9}|1800\\d{7,9}",,,,,,,[6,8,9,10,11,12,13],[5,7]],[,,"2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})",,,,"21234567",,,[6,8,9,10],[5,7]],[,,"(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[235-9]|5[056]|6[5-7]|7[34-79]|89|9[4-9]))\\d{7}",,,,"9051234567",,,[10]],[,,"1800\\d{7,9}",,,,"180012345678",,,[11,12,13]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PH",63,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})",
"$1 $2 $3",["2"],"(0$1)"],[,"(2)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],[,"([3-8]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[3-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["81|9"],
"0$1"],[,"(1800)(\\d{3})(\\d{4})","$1 $2 $3",["1"]],[,"(1800)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PK:[,[,,"1\\d{8}|[2-8]\\d{5,11}|9(?:[013-9]\\d{4,9}|2\\d(?:111\\d{6}|\\d{3,7}))",,,,,,,[8,9,10,11,12],[6,7]],[,,"(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}",
,,,"2123456789",,,[9,10],[6,7,8]],[,,"3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}",,,,"3012345678",,,[10]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,"122\\d{6}",,,,"122044444",,,[9]],[,,,,,,,,,[-1]],"PK",92,"00","0",,,"0",,,,[[,"(\\d{2})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"],"(0$1)"],
[,"(\\d{3})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[349]|45|54|60|72|8[2-5]|9[2-9]","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"],"(0$1)"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{3})(\\d{6,7})","$1 $2",["2[349]|45|54|60|72|8[2-5]|9[2-9]","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d[2-9]"],"(0$1)"],[,"(3\\d{2})(\\d{7})","$1 $2",["3"],"0$1"],[,"([15]\\d{3})(\\d{5,6})",
"$1 $2",["58[12]|1"],"(0$1)"],[,"(586\\d{2})(\\d{5})","$1 $2",["586"],"(0$1)"],[,"([89]00)(\\d{3})(\\d{2})","$1 $2 $3",["[89]00"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",,,,"21111825888",,,[11,12]],,,[,,,,,,,,,[-1]]],PL:[,[,,"[12]\\d{6,8}|[3-57-9]\\d{8}|6\\d{5,8}",,,,,,,[6,7,8,9]],
[,,"(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])\\d{7}|[12]2\\d{5}",,,,"123456789",,,[7,9]],[,,"(?:5[0137]|6[069]|7[2389]|88)\\d{7}",,,,"512345678",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,"801\\d{6}",,,,"801234567",,,[9]],[,,,,,,,,,[-1]],[,,"39\\d{7}",,,,"391234567",,,[9]],"PL",48,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],[,"(\\d{2})(\\d{1})(\\d{4})",
"$1 $2 $3",["[12]2"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["26|39|5[0137]|6[0469]|7[02389]|8[08]"]],[,"(\\d{3})(\\d{2})(\\d{2,3})","$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})","$1 $2",["64"]]],,[,,"64\\d{4,7}",,,,"641234567"],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PM:[,[,,"[45]\\d{5}",,,,,,,[6]],[,,"41\\d{4}",,,,"411234"],[,,"55\\d{4}",,,,"551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PM",508,"00","0",,,"0",,,,[[,"([45]\\d)(\\d{2})(\\d{2})",
"$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PR:[,[,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"PR",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"787|939",[,,,,,,,,,[-1]],[,,,,,,,,
,[-1]],,,[,,,,,,,,,[-1]]],PS:[,[,,"[24589]\\d{7,8}|1(?:[78]\\d{8}|[49]\\d{2,3})",,,,,,,[4,5,8,9,10],[7]],[,,"(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}",,,,"22234567",,,[8],[7]],[,,"5[69]\\d{7}",,,,"599123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"1(?:4|9\\d)\\d{2}",,,,"19123",,,[4,5]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PS",970,"00","0",,,"0",,,,[[,"([2489])(2\\d{2})(\\d{4})","$1 $2 $3",["[2489]"],"0$1"],[,"(5[69]\\d)(\\d{3})(\\d{3})","$1 $2 $3",
["5"],"0$1"],[,"(1[78]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[78]"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PT:[,[,,"[2-46-9]\\d{8}",,,,,,,[9]],[,,"2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}",,,,"212345678"],[,,"9(?:[1236]\\d{2}|480)\\d{5}",,,,"912345678"],[,,"80[02]\\d{6}",,,,"800123456"],[,,"6(?:0[178]|4[68])\\d{6}|76(?:0[1-57]|1[2-47]|2[237])\\d{5}",,,,"760123456"],[,,"80(?:8\\d|9[1579])\\d{5}",,,,"808123456"],[,,"884[0-4689]\\d{5}",
,,,"884123456"],[,,"30\\d{7}",,,,"301234567"],"PT",351,"00",,,,,,,,[[,"(2\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"([2-46-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[3-9]|[346-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7(?:0(?:7\\d|8[17]))\\d{5}",,,,"707123456"],,,[,,"600\\d{6}",,,,"600110000"]],PW:[,[,,"[2-8]\\d{6}",,,,,,,[7]],[,,"2552255|(?:277|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76))\\d{4}",,,,"2771234"],[,,"(?:6[234689]0|77[45789])\\d{4}",,,,"6201234"],[,,,,,,,,,[-1]],
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PY:[,[,,"5[0-5]\\d{4,7}|[2-46-9]\\d{5,8}",,,,,,,[6,7,8,9],[5]],[,,"(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}",,,,
"212345678",,,[7,8,9],[5,6]],[,,"9(?:6[12]|[78][1-6]|9[1-5])\\d{6}",,,,"961456789",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8700[0-4]\\d{4}",,,,"870012345",,,[9]],"PY",595,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{5})","$1 $2",["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["(?:[26]1|3[289]|4[124678]|7[123]|8[1236])"],"(0$1)"],[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["9[1-9]"],"0$1"],
[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8700"]],[,"(\\d{3})(\\d{4,5})","$1 $2",["[2-8][1-9]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8][1-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[2-9]0\\d{4,7}",,,,"201234567"],,,[,,,,,,,,,[-1]]],QA:[,[,,"[2-8]\\d{6,7}",,,,,,,[7,8]],[,,"4[04]\\d{6}",,,,"44123456",,,[8]],[,,"[3567]\\d{7}",,,,"33123456",,,[8]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"QA",974,"00",,,,,,,,[[,"([28]\\d{2})(\\d{4})",
"$1 $2",["[28]"]],[,"([3-7]\\d{3})(\\d{4})","$1 $2",["[3-7]"]]],,[,,"2(?:[12]\\d|61)\\d{4}",,,,"2123456",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RE:[,[,,"[268]\\d{8}",,,,,,,[9]],[,,"262\\d{6}",,,,"262161234"],[,,"69[23]\\d{6}",,,,"692123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RE",262,"00","0",,,"0",,,,[[,"([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",,
"0$1"]],,[,,,,,,,,,[-1]],1,"262|6[49]|8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RO:[,[,,"[23]\\d{5,8}|[7-9]\\d{8}",,,,,,,[6,9]],[,,"2(?:1(?:\\d{7}|9\\d{3})|[3-6](?:\\d{7}|\\d9\\d{2}))|3(?:1\\d{4}(?:\\d{3})?|[3-6]\\d{7})",,,,"211234567"],[,,"7(?:[0-8]\\d{2}|99\\d)\\d{5}",,,,"712345678",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[036]\\d{6}",,,,"900123456",,,[9]],[,,"801\\d{6}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})",
"$1 $2 $3",["[23]1"],"0$1"],[,"(\\d{2})(\\d{4})","$1 $2",["[23]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23][3-7]|[7-9]"],"0$1"],[,"(2\\d{2})(\\d{3})","$1 $2",["2[3-6]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"37\\d{7}",,,,"372123456",,,[9]],,,[,,,,,,,,,[-1]]],RS:[,[,,"[126-9]\\d{4,11}|3(?:[0-79]\\d{3,10}|8[2-9]\\d{2,9})",,,,,,,[6,7,8,9,10,11,12],[5]],[,,"(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}",
,,,"10234567",,,[7,8,9,10,11,12],[5,6]],[,,"6(?:[0-689]|7\\d)\\d{6,7}",,,,"601234567",,,[8,9,10]],[,,"800\\d{3,9}",,,,"80012345"],[,,"(?:90[0169]|78\\d)\\d{3,7}",,,,"90012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RS",381,"00","0",,,"0",,,,[[,"([23]\\d{2})(\\d{4,9})","$1 $2",["(?:2[389]|39)0"],"0$1"],[,"([1-3]\\d)(\\d{5,10})","$1 $2",["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"],"0$1"],[,"(6\\d)(\\d{6,8})","$1 $2",["6"],"0$1"],[,"([89]\\d{2})(\\d{3,9})","$1 $2",["[89]"],"0$1"],[,"(7[26])(\\d{4,9})",
"$1 $2",["7[26]"],"0$1"],[,"(7[08]\\d)(\\d{4,9})","$1 $2",["7[08]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7[06]\\d{4,10}",,,,"700123456"],,,[,,,,,,,,,[-1]]],RU:[,[,,"[3489]\\d{9}",,,,,,,[10]],[,,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",,,,"3011234567"],[,,"9\\d{9}",,,,"9123456789"],[,,"80[04]\\d{7}",,,,"8001234567"],[,,"80[39]\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[1-79]"],"$1",,1],[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[34689]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[34689]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RW:[,[,,"[027-9]\\d{7,8}",
,,,,,,[8,9]],[,,"2[258]\\d{7}|06\\d{6}",,,,"250123456"],[,,"7[238]\\d{7}",,,,"720123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900\\d{6}",,,,"900123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RW",250,"00","0",,,"0",,,,[[,"(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"$1"],[,"([7-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"],[,"(0\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],SA:[,[,,"1\\d{7,8}|(?:[2-467]|92)\\d{7}|5\\d{8}|8\\d{9}",
,,,,,,[8,9,10],[7]],[,,"11\\d{7}|1?(?:2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",,,,"112345678",,,[8,9],[7]],[,,"(?:5(?:[013-689]\\d|7[0-26-8])|811\\d)\\d{6}",,,,"512345678",,,[9,10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,"92[05]\\d{6}",,,,"920012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SA",966,"00","0",,,"0",,,,[[,"([1-467])(\\d{3})(\\d{4})","$1 $2 $3",["[1-467]"],"0$1"],[,"(1\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[1-467]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"],
"0$1"],[,"(92\\d{2})(\\d{5})","$1 $2",["92"],"$1"],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"$1"],[,"(811)(\\d{3})(\\d{3,4})","$1 $2 $3",["81"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SB:[,[,,"[1-9]\\d{4,6}",,,,,,,[5,7]],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",,,,"40123",,,[5]],[,,"48\\d{3}|7(?:30|[46-8]\\d|5[025-9]|9[0-5])\\d{4}|8[4-9]\\d{5}|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])\\d{4}",,,,"7421234"],[,,"1[38]\\d{3}",
,,,"18123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[12]\\d{3}",,,,"51123",,,[5]],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["[7-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SC:[,[,,"[24689]\\d{5,6}",,,,,,,[7]],[,,"4[2-46]\\d{5}",,,,"4217123"],[,,"2[5-8]\\d{5}",,,,"2510123"],[,,"8000\\d{3}",,,,"8000000"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:64\\d|971)\\d{4}",,,,"6412345"],"SC",248,"0(?:[02]|10?)",,,,,,"00",,[[,"(\\d)(\\d{3})(\\d{3})",
"$1 $2 $3",["[246]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SD:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1(?:[125]\\d|8[3567])\\d{6}",,,,"121231234"],[,,"9[0-3569]\\d{7}",,,,"911231234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SE:[,[,,"[1-35-9]\\d{5,11}|4\\d{6,8}",,,,,,,[6,7,8,9,10,12]],[,
,"1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:[0246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:[03]\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8\\d{6,8}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})",
,,,"8123456",,,[7,8,9]],[,,"7[02369]\\d{7}",,,,"701234567",,,[9]],[,,"20\\d{4,7}",,,,"20123456",,,[6,7,8,9]],[,,"649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}",,,,"9001234567",,,[7,8,9,10]],[,,"77(?:0\\d{3}(?:\\d{3})?|[1-7]\\d{6})",,,,"771234567",,,[6,9]],[,,"75[1-8]\\d{6}",,,,"751234567",,,[9]],[,,,,,,,,,[-1]],"SE",46,"00","0",,,"0",,,,[[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"],"0$1"],
[,"([1-469]\\d)(\\d{3})(\\d{2})","$1-$2 $3",["1[136]|2[136]|3[356]|4[0246]|6[03]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],"0$1"],[,"(77)(\\d{2})(\\d{2})",
"$1-$2$3",["7"],"0$1"],[,"(20)(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9[034]"],"0$1"],[,"(9[034]\\d)(\\d{4})","$1-$2",["9[034]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["25[245]|67[3-6]"],"0$1"]],[[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],[,"([1-469]\\d)(\\d{3})(\\d{2})","$1 $2 $3",["1[136]|2[136]|3[356]|4[0246]|6[03]|90"]],
[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7"]],[,"(77)(\\d{2})(\\d{2})","$1 $2 $3",["7"]],[,"(20)(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})",
"$1 $2 $3 $4",["9[034]"]],[,"(9[034]\\d)(\\d{4})","$1 $2",["9[034]"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["25[245]|67[3-6]"]]],[,,"74[02-9]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"(?:25[245]|67[3-6])\\d{9}",,,,"254123456789",,,[12]]],SG:[,[,,"[36]\\d{7}|[17-9]\\d{7,10}",,,,,,,[8,10,11]],[,,"6[1-9]\\d{6}",,,,"61234567",,,[8]],[,,"(?:8[1-8]|9[0-8])\\d{6}",,,,"81234567",,,[8]],[,,"1?800\\d{7}",,,,"18001234567",,,[10,11]],[,,"1900\\d{7}",,,,"19001234567",
,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[12]\\d{6}",,,,"31234567",,,[8]],"SG",65,"0[0-3]\\d",,,,,,,,[[,"([3689]\\d{3})(\\d{4})","$1 $2",["[369]|8[1-9]"]],[,"(1[89]00)(\\d{3})(\\d{4})","$1 $2 $3",["1[89]"]],[,"(7000)(\\d{4})(\\d{3})","$1 $2 $3",["70"]],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["80"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7000\\d{7}",,,,"70001234567",,,[11]],,,[,,,,,,,,,[-1]]],SH:[,[,,"[256]\\d{4}",,,,,,,[4,5]],[,,"2(?:[0-57-9]\\d|6[4-9])\\d{2}",,,,"22158"],[,,"[56]\\d{4}",,,,"51234",
,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"262\\d{2}",,,,"26212",,,[5]],"SH",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SI:[,[,,"[1-7]\\d{6,7}|[89]\\d{4,7}",,,,,,,[5,6,7,8]],[,,"(?:1\\d|[25][2-8]|3[24-8]|4[24-8]|7[3-8])\\d{6}",,,,"11234567",,,[8],[7]],[,,"(?:[37][01]|4[0139]|51|6[48])\\d{6}",,,,"31234567",,,[8]],[,,"80\\d{4,6}",,,,"80123456",,,[6,7,8]],[,,"90\\d{4,6}|89[1-3]\\d{2,5}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,
,,,,[-1]],[,,"(?:59|8[1-3])\\d{6}",,,,"59012345",,,[8]],"SI",386,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|3[24-8]|4[24-8]|5[2-8]|7[3-8]"],"(0$1)"],[,"([3-7]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"([89][09])(\\d{3,6})","$1 $2",["[89][09]"],"0$1"],[,"([58]\\d{2})(\\d{5})","$1 $2",["59|8[1-3]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SJ:[,[,,"0\\d{4}|[45789]\\d{7}",,,,,,,[5,8]],[,,"79\\d{6}",,,,"79123456",
,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"41234567",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"SJ",47,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",,,,"01234"],1,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],SK:[,[,,"(?:[2-68]\\d{5,8}|9\\d{6,8})",,,,,,,[6,7,9]],[,,"2(?:1(?:6\\d{3,4}|7\\d{3})|[2-9]\\d{7})|[3-5][1-8](?:1(?:6\\d{2,3}|7\\d{3})|\\d{7})",
,,,"221234567"],[,,"9(?:0(?:[1-8]\\d|9[1-9])|(?:1[0-24-9]|[45]\\d)\\d)\\d{5}",,,,"912123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:[78]\\d{7}|00\\d{6})",,,,"900123456",,,[9]],[,,"8[5-9]\\d{7}",,,,"850123456",,,[9]],[,,,,,,,,,[-1]],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}",,,,"690123456",,,[9]],"SK",421,"00","0",,,"0",,,,[[,"(2)(1[67])(\\d{3,4})","$1 $2 $3",["21[67]"],"0$1"],[,"([3-5]\\d)(1[67])(\\d{2,3})","$1 $2 $3",["[3-5]"],"0$1"],[,"(2)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],
[,"([3-5]\\d)(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"],[,"([689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(9090)(\\d{3})","$1 $2",["9090"],"0$1"]],,[,,"9090\\d{3}",,,,"9090123",,,[7]],,,[,,"(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}|9090\\d{3}",,,,"800123456",,,[7,9]],[,,"96\\d{7}",,,,"961234567",,,[9]],,,[,,,,,,,,,[-1]]],SL:[,[,,"[2-9]\\d{7}",,,,,,,[8],[6]],[,,"[235]2[2-4][2-9]\\d{4}",,,,"22221234",,,,[6]],[,,"(?:2[15]|3[03-5]|4[04]|5[05]|66|7[6-9]|8[08]|99)\\d{6}",
,,,"25123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",,"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SM:[,[,,"[05-7]\\d{7,9}",,,,,,,[8,10],[6]],[,,"0549(?:8[0157-9]|9\\d)\\d{4}",,,,"0549886377",,,[10],[6]],[,,"6[16]\\d{6}",,,,"66661212",,,[8]],[,,,,,,,,,[-1]],[,,"7[178]\\d{6}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[158]\\d{6}",,,,"58001110",,,[8]],
"SM",378,"00",,,,"(?:0549)?([89]\\d{5})","0549$1",,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","$1 $2",["0"]],[,"(\\d{6})","0549 $1",["[89]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","($1) $2",["0"]],[,"(\\d{6})","(0549) $1",["[89]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],SN:[,[,,"[3789]\\d{8}",,,,,,,[9]],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",,,,"301012345"],[,,"7(?:[06-8]\\d|21|90)\\d{6}",
,,,"701234567"],[,,"800\\d{6}",,,,"800123456"],[,,"88[4689]\\d{6}",,,,"884123456"],[,,"81[02468]\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"39[01]\\d{6}|3392\\d{5}|93330\\d{4}",,,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SO:[,[,,"[1-9]\\d{5,8}",,,,,,,[6,7,8,9]],[,,"(?:1\\d{1,2}|2[0-79]\\d|3[0-46-8]?\\d|4[0-7]?\\d|59\\d|8[125])\\d{4}",
,,,"4012345",,,[6,7]],[,,"(?:15\\d|2(?:4\\d|8)|3[59]\\d{2}|4[89]\\d{2}|6[1-9]?\\d{2}|7(?:[1-8]\\d|9\\d{1,2})|8[08]\\d{2}|9(?:0[67]|[2-9])\\d)\\d{5}",,,,"71123456",,,[7,8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SO",252,"00","0",,,"0",,,,[[,"(\\d{6})","$1",["[134]"]],[,"(\\d)(\\d{6})","$1 $2",["2[0-79]|[13-5]"]],[,"(\\d)(\\d{7})","$1 $2",["24|[67]"]],[,"(\\d{2})(\\d{4})","$1 $2",["8[125]"]],[,"(\\d{2})(\\d{5,7})","$1 $2",["15|28|6[1-35-9]|799|9[2-9]"]],[,
"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3[59]|4[89]|6[24-6]|79|8[08]|90"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SR:[,[,,"[2-8]\\d{5,6}",,,,,,,[6,7]],[,,"(?:2[1-3]|3[0-7]|4\\d|5[2-58]|68\\d)\\d{4}",,,,"211234"],[,,"(?:7[124-7]|8[1-9])\\d{5}",,,,"7412345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"56\\d{4}",,,,"561234",,,[6]],"SR",597,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-4]|5[2-58]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",
["56"]],[,"(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SS:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"18\\d{7}",,,,"181234567"],[,,"(?:12|9[1257])\\d{7}",,,,"977123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ST:[,[,,"[29]\\d{6}",,,,,,,[7]],[,,"22\\d{5}",,,,"2221234"],
[,,"9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d{2})\\d{3}",,,,"9812345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SV:[,[,,"[267]\\d{7}|[89]\\d{6}(?:\\d{4})?",,,,,,,[7,8,11]],[,,"2[1-6]\\d{6}",,,,"21234567",,,[8]],[,,"[67]\\d{7}",,,,"70123456",,,[8]],[,,"800\\d{4}(?:\\d{4})?",,,,"8001234",,,[7,11]],[,,"900\\d{4}(?:\\d{4})?",,,,"9001234",,,[7,11]],[,
,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SV",503,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SX:[,[,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",,,,"7215425678",,,,[7]],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",,,,"7215205678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],
[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"SX",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"721",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SY:[,[,,"[1-59]\\d{7,8}",,,,,,,[8,9],[6,7]],[,,"(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}",,,,"112345678",,,,[6,7]],[,,"9(?:22|[3-589]\\d|6[024-9])\\d{6}",,,,"944567890",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,
[-1]],[,,,,,,,,,[-1]],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",,1],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SZ:[,[,,"[027]\\d{7}",,,,,,,[8]],[,,"2[2-5]\\d{6}",,,,"22171234"],[,,"7[6-8]\\d{6}",,,,"76123456"],[,,"0800\\d{4}",,,,"08001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[027]"]]],,[,,
,,,,,,,[-1]],,,[,,"0800\\d{4}",,,,"08001234"],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],TA:[,[,,"8\\d{3}",,,,,,,[4]],[,,"8\\d{3}",,,,"8999"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TA",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TC:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"649(?:712|9(?:4\\d|50))\\d{4}",,,,"6497121234",,,,[7]],[,,"649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}",,,,"6492311234",
,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,"64971[01]\\d{4}",,,,"6497101234",,,,[7]],"TC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"649",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TD:[,[,,"[2679]\\d{7}",,,,,,,[8]],[,,"22(?:[3789]0|5[0-5]|6[89])\\d{4}",,,,"22501234"],[,,"(?:6[023568]\\d|77\\d|9\\d{2})\\d{5}",,,,"63012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TG:[,[,,"[29]\\d{7}",,,,,,,[8]],[,,"2(?:2[2-7]|3[23]|44|55|66|77)\\d{5}",,,,"22212345"],[,,"9[0-36-9]\\d{6}",,,,"90112345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[29]"]]],,[,,,,,,,,,[-1]],
,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TH:[,[,,"[2-9]\\d{7,8}|1\\d{3}(?:\\d{5,6})?",,,,,,,[4,8,9,10]],[,,"(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",,,,"21234567",,,[8]],[,,"(?:14|6[1-6]|[89]\\d)\\d{7}",,,,"812345678",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"1900\\d{6}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"6[08]\\d{7}",,,,"601234567",,,[9]],"TH",66,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([13-9]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",
["14|[3-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"1\\d{3}",,,,"1100",,,[4]],[,,"1\\d{3}",,,,"1100",,,[4]],,,[,,,,,,,,,[-1]]],TJ:[,[,,"[3-57-9]\\d{8}",,,,,,,[9],[3,5,7]],[,,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",,,,"372123456",,,,[3,5,7]],[,,"(?:41[18]|(?:5[05]|77|88|9[0-35-9])\\d)\\d{6}",,,,"917123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TJ",992,"810","8",,,"8",,"8~10",,[[,"([349]\\d{2})(\\d{2})(\\d{4})",
"$1 $2 $3",["[34]7|91[78]"],"$1",,1],[,"([457-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[148]|[578]|9(?:1[59]|[0235-9])"],"$1",,1],[,"(331700)(\\d)(\\d{2})","$1 $2 $3",["331","3317","33170","331700"],"$1",,1],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3[1-5]","3(?:[1245]|3(?:[02-9]|1[0-589]))"],"$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TK:[,[,,"[2-47]\\d{3,6}",,,,,,,[4,5,6,7]],[,,"(?:2[2-4]|[34]\\d)\\d{2,5}",,,,"3101"],[,,"7[2-4]\\d{2,5}",,,,"7290"],[,,,,,,,,,[-1]],[,
,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TK",690,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TL:[,[,,"[2-489]\\d{6}|7\\d{6,7}",,,,,,,[7,8]],[,,"(?:2[1-5]|3[1-9]|4[1-4])\\d{5}",,,,"2112345",,,[7]],[,,"7[3-8]\\d{6}",,,,"77212345",,,[8]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,"70\\d{5}",,,,"7012345",,,[7]],[,,,,,,,,,[-1]],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]"]],[,"(\\d{4})(\\d{4})",
"$1 $2",["7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TM:[,[,,"[1-6]\\d{7}",,,,,,,[8]],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",,,,"12345678"],[,,"6[1-9]\\d{6}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TM",993,"810","8",,,"8",,"8~10",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["6"],
"8 $1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["13|[2-5]"],"(8 $1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TN:[,[,,"[2-57-9]\\d{7}",,,,,,,[8]],[,,"3(?:[012]\\d|6[0-4]|91)\\d{5}|7\\d{7}|81200\\d{3}",,,,"71234567"],[,,"(?:[259]\\d|4[0-6])\\d{6}",,,,"20123456"],[,,"8010\\d{4}",,,,"80101234"],[,,"88\\d{6}",,,,"88123456"],[,,"8[12]10\\d{4}",,,,"81101234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,,,,,,
,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TO:[,[,,"[02-8]\\d{4,6}",,,,,,,[5,7]],[,,"(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}",,,,"20123",,,[5]],[,,"(?:7[578]|8[47-9])\\d{5}",,,,"7715123",,,[7]],[,,"0800\\d{3}",,,,"0800222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[1-6]|7[0-4]|8[05]"]],[,"(\\d{3})(\\d{4})","$1 $2",["7[5-9]|8[47-9]"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]]],,[,,,,,,,,,[-1]],,,
[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],TR:[,[,,"[2-589]\\d{9}|444\\d{4}",,,,,,,[7,10]],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",,,,"2123456789",,,[10]],[,,"5(?:(?:0[1-7]|22|[34]\\d|5[1-59]|9[246])\\d{2}|6161)\\d{5}",,,,"5012345678",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TR",90,"00","0",,,"0",,,,
[[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4(?:[0-35-9]|4[0-35-9])"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5[02-69]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["51|[89]"],"0$1",,1],[,"(444)(\\d{1})(\\d{3})","$1 $2 $3",["444"]]],,[,,"512\\d{7}",,,,"5123456789",,,[10]],,,[,,"444\\d{4}",,,,"4441444",,,[7]],[,,"444\\d{4}|850\\d{7}",,,,"4441444"],,,[,,,,,,,,,[-1]]],TT:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"868(?:2(?:01|[23]\\d)|6(?:0[79]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",
,,,"8682211234",,,,[7]],[,,"868(?:2(?:6[6-9]|[789]\\d)|3(?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}",,,,"8682911234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"TT",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"868",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"868619\\d{4}",,,,"8686191234",,,,[7]]],TV:[,[,,"[279]\\d{4,6}",
,,,,,,[5,6,7]],[,,"2[02-9]\\d{3}",,,,"20123",,,[5]],[,,"(?:70\\d|90)\\d{4}",,,,"901234",,,[6,7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TV",688,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TW:[,[,,"2\\d{6,8}|[3-689]\\d{7,8}|7\\d{7,9}",,,,,,,[7,8,9,10]],[,,"2(?:[235-8]\\d{7}|4\\d{6,7})|[3-8]\\d{7,8}",,,,"221234567",,,[8,9]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"20(?:2|[013-9]\\d{2})\\d{4}",
,,,"203123456",,,[7,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"TW",886,"0(?:0[25679]|19)","0","#",,"0",,,,[[,"(20)(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],[,"(20)(\\d{3})(\\d{4})","$1 $2 $3",["20[013-9]"],"0$1"],[,"([2-8])(\\d{3,4})(\\d{4})","$1 $2 $3",["2[23-8]|[3-6]|[78][1-9]"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["80|9"],"0$1"],[,"(70)(\\d{4})(\\d{4})","$1 $2 $3",["70"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
TZ:[,[,,"\\d{9}",,,,,,,[7,9]],[,,"2[2-8]\\d{7}",,,,"222345678"],[,,"(?:6[2-9]|7[13-9])\\d{7}",,,,"621234567",,,[9]],[,,"80[08]\\d{6}",,,,"800123456",,,[9]],[,,"90\\d{7}",,,,"900123456",,,[9]],[,,"8(?:40|6[01])\\d{6}",,,,"840123456",,,[9]],[,,,,,,,,,[-1]],[,,"41\\d{7}",,,,"412345678",,,[9]],"TZ",255,"00[056]","0",,,"0",,,,[[,"([24]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"([67]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"],[,"([89]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[89]"],"0$1"]],
,[,,,,,,,,,[-1]],,,[,,"(?:8(?:[04]0|6[01])|90\\d)\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UA:[,[,,"[3-9]\\d{8}",,,,,,,[9],[5,6,7]],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",,,,"311234567",,,,[5,6,7]],[,,"(?:39|50|6[36-8]|7[13]|9[1-9])\\d{7}",,,,"391234567"],[,,"800\\d{6}",,,,"800123456"],[,,"900\\d{6}",,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"89\\d{7}",,,,"891234567"],"UA",380,"00","0",,,"0",,"0~0",,[[,"([3-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[38]9|4(?:[45][0-5]|87)|5(?:0|6[37]|7[37])|6[36-8]|7|9[1-9]",
"[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9]"],"0$1"],[,"([3-689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["3[1-8]2|4[13678]2|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90","3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[49]2|[12][29]|5[24])|8[0-8]|90"],"0$1"],[,"([3-6]\\d{3})(\\d{5})","$1 $2",["3(?:5[013-9]|[1-46-8])|4(?:[137][013-9]|6|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6[0135-9]|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])","3(?:5[013-9]|[1-46-8](?:22|[013-9]))|4(?:[137][013-9]|6(?:[013-9]|22)|[45][6-9]|8[4-6])|5(?:[1245][013-9]|6(?:3[02389]|[015689])|3|7[4-6])|6(?:[49][013-9]|5[0135-9]|[12][13-8])"],
"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UG:[,[,,"\\d{9}",,,,,,,[9],[5,6,7]],[,,"20(?:[0147]\\d{2}|2(?:40|[5-9]\\d)|3(?:0[0-4]|[23]\\d)|5[0-4]\\d|6[035-9]\\d|8[0-2]\\d)\\d{4}|[34]\\d{8}",,,,"312345678",,,,[5,6,7]],[,,"7(?:(?:0[0-7]|[15789]\\d|30|4[0-4])\\d|2(?:[03]\\d|60))\\d{5}",,,,"712345678"],[,,"800[123]\\d{5}",,,,"800123456"],[,,"90[123]\\d{6}",,,,"901123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{3})(\\d{6})",
"$1 $2",["[7-9]|20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["3|4(?:[1-5]|6[0-36-9])"],"0$1"],[,"(2024)(\\d{5})","$1 $2",["2024"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],US:[,[,,"[2-9]\\d{9}",,,,,,,[10],[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}",
,,,"2015550123",,,,[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[04589]|3[149]|4[08]|5[1-46]|6[0279]|7[026]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-37]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[02-9]|2[0457]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|28|3[0-25]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-3589]|8[0459]))[2-9]\\d{6}",
,,,"2015550123",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",,,,1],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",,,,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3"]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UY:[,[,,"[2489]\\d{6,7}",,,,,,,[7,8]],[,,"2\\d{7}|4[2-7]\\d{6}",,
,,"21231234",,,[8],[7]],[,,"9[1-9]\\d{6}",,,,"94231234",,,[8]],[,,"80[05]\\d{4}",,,,"8001234",,,[7]],[,,"90[0-8]\\d{4}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UY",598,"0(?:1[3-9]\\d|0)","0"," int. ",,"0",,"00",,[[,"(\\d{4})(\\d{4})","$1 $2",["[24]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9[1-9]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["[89]0"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UZ:[,[,,"[679]\\d{8}",,,,,,,[9],[7]],[,,"(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}",
,,,"662345678",,,,[7]],[,,"6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}",
,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UZ",998,"810","8",,,"8",,"8~10",,[[,"([679]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",,"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VA:[,[,,"(?:0(?:878\\d{5}|6698\\d{5})|[1589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9}))",,,,,,,[6,8,9,10,11]],[,,"06698\\d{5}",,,,"0669812345",,,[10]],[,,"3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})",,,,"3123456789",,,[9,10,11]],[,,"80(?:0\\d{6}|3\\d{3})",
,,,"800123456",,,[6,9]],[,,"0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{6}|[17]\\d{3})",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"VA",39,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,"848\\d{6}",,,,"848123456",,,[9]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],VC:[,[,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",
,,,"7842661234",,,,[7]],[,,"784(?:4(?:3[0-4]|5[45]|89|9[0-58])|5(?:2[6-9]|3[0-4]))\\d{4}",,,,"7844301234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"784",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VE:[,[,,"[24589]\\d{9}",,,,,,,[10],[7]],[,,"(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}",
,,,"2121234567",,,,[7]],[,,"4(?:1[24-8]|2[46])\\d{7}",,,,"4121234567"],[,,"800\\d{7}",,,,"8001234567"],[,,"900\\d{7}",,,,"9001234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",,"0$1","$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VG:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"284(?:(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}|496[0-5]\\d{3})",,,,"2842291234",,,,[7]],[,,"284(?:(?:3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|99)|54[0-57])\\d{4}|496[6-9]\\d{3})",
,,,"2843001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VG",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"284",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VI:[,[,,"[3589]\\d{9}",,,,,,,[10],[7]],[,,"340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",
,,,[7]],[,,"340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-589]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:00|22|33|44|66|77|88)[2-9]\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VI",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"340",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VN:[,[,,"[167]\\d{6,9}|[2-59]\\d{7,9}|8\\d{6,8}",
,,,,,,[7,8,9,10]],[,,"(?:2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|[48]\\d|5[124-9]?|6[0-39]?|7[0-7]?|9[0-4679])\\d|3(?:[0136]|[25][01])\\d|4\\d{2}|5(?:0[01]|[5-9])\\d|6(?:[0-46-8]|5[01])\\d|7(?:[02-79]|[18][01])\\d)\\d{6}|8(?:[2-5]\\d|6[236]|7[13])\\d{6}",,,,"2101234567",,,[9,10]],[,,"(?:9\\d|1(?:2\\d|6[2-9]|8[68]|99))\\d{7}|8(?:6[89]|8\\d|9[89])\\d{6}",,,,"912345678",,,[9,10]],[,,"1800\\d{4,6}",,,,"1800123456",,,[8,9,10]],[,,"1900\\d{4,6}",,,,"1900123456",,,[8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
[,,,,,,,,,[-1]],"VN",84,"00","0",,,"0",,,,[[,"([17]99)(\\d{4})","$1 $2",["[17]99"],"0$1",,1],[,"([48])(\\d{4})(\\d{4})","$1 $2 $3",["4|8(?:[2-5]|6[236]|7[13])"],"0$1",,1],[,"([235-7]\\d)(\\d{4})(\\d{3})","$1 $2 $3",["2[5-7]|3[0136]|5[5-9]|6[0-46-8]|7[02-79]"],"0$1",,1],[,"(80)(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(69\\d)(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"([235-7]\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["2(?:[0-489]|5[124-9]|6[0-39]|7[0-7])|3[25]|50|65|7[18]"],"0$1",,1],[,"([89]\\d)(\\d{3})(\\d{2})(\\d{2})",
"$1 $2 $3 $4",["8(?:8|9[89])|9"],"0$1",,1],[,"(1[2689]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1(?:[26]|8[68]|99)"],"0$1",,1],[,"(86[89])(\\d{3})(\\d{3})","$1 $2 $3",["86[89]"],"0$1",,1],[,"(1[89]00)(\\d{4,6})","$1 $2",["1[89]0"],"$1",,1]],,[,,,,,,,,,[-1]],,,[,,"[17]99\\d{4}|69\\d{5,6}",,,,"1992000",,,[7,8]],[,,"[17]99\\d{4}|69\\d{5,6}|80\\d{5}",,,,"1992000",,,[7,8]],,,[,,,,,,,,,[-1]]],VU:[,[,,"[2-57-9]\\d{4,6}",,,,,,,[5,7]],[,,"(?:2[02-9]\\d|3(?:[5-7]\\d|8[0-8])|48[4-9]|88\\d)\\d{2}",,,,"22123",,,[5]],
[,,"(?:5(?:7[2-5]|[0-689]\\d)|7[013-7]\\d)\\d{4}",,,,"5912345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[579]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"3[03]\\d{3}|900\\d{4}",,,,"30123"],,,[,,,,,,,,,[-1]]],WF:[,[,,"[4-8]\\d{5}",,,,,,,[6]],[,,"(?:50|68|72)\\d{4}",,,,"501234"],[,,"(?:50|68|72|8[23])\\d{4}",,,,"501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WF",
681,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"[48]0\\d{4}",,,,"401234"]],WS:[,[,,"[2-8]\\d{4,6}",,,,,,,[5,6,7]],[,,"(?:[2-5]\\d|6[1-9]|84\\d{2})\\d{3}",,,,"22123",,,[5,7]],[,,"(?:60|7[25-7]\\d)\\d{4}",,,,"601234",,,[6,7]],[,,"800\\d{3}",,,,"800123",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WS",685,"0",,,,,,,,[[,"(8\\d{2})(\\d{3,4})","$1 $2",["8"]],[,"(7\\d)(\\d{5})","$1 $2",["7"]],[,"(\\d{5})","$1",
["[2-6]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YE:[,[,,"[1-7]\\d{6,8}",,,,,,,[7,8,9],[6]],[,,"(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}",,,,"1234567",,,[7,8],[6]],[,,"7[0137]\\d{7}",,,,"712345678",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YE",967,"00","0",,,"0",,,,[[,"([1-7])(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7[0137]"],"0$1"]],
,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YT:[,[,,"[268]\\d{8}",,,,,,,[9]],[,,"269(?:6[0-4]|50)\\d{4}",,,,"269601234"],[,,"639\\d{6}",,,,"639123456"],[,,"80\\d{7}",,,,"801234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YT",262,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"269|63",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZA:[,[,,"[1-79]\\d{8}|8\\d{4,8}",,,,,,,[5,6,7,8,9]],[,,"(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",,,,"101234567",,,
[9]],[,,"(?:6\\d|7[0-46-9])\\d{7}|8(?:[1-4]\\d{1,5}|5\\d{5})\\d{2}",,,,"711234567"],[,,"80\\d{7}",,,,"801234567",,,[9]],[,,"86[2-9]\\d{6}|9[0-2]\\d{7}",,,,"862345678",,,[9]],[,,"860\\d{6}",,,,"860123456",,,[9]],[,,,,,,,,,[-1]],[,,"87\\d{7}",,,,"871234567",,,[9]],"ZA",27,"00","0",,,"0",,,,[[,"(860)(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-79]|8(?:[0-57]|6[1-9])"],
"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"861\\d{6}",,,,"861123456",,,[9]],,,[,,,,,,,,,[-1]]],ZM:[,[,,"[289]\\d{8}",,,,,,,[9]],[,,"21[1-8]\\d{6}",,,,"211234567"],[,,"9(?:5[034589]|[67]\\d)\\d{6}",,,,"955123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ZM",260,"00","0",,,"0",,,,[[,"([29]\\d)(\\d{7})","$1 $2",["[29]"],"0$1"],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
ZW:[,[,,"2(?:[012457-9]\\d{3,8}|6(?:[14]\\d{7}|\\d{4}))|[13-79]\\d{4,9}|8[06]\\d{8}",,,,,,,[5,6,7,8,9,10],[3,4]],[,,"(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|[36]7|75\\d|[69]8|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|6[14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|9\\d|[4-8])|2(?:0\\d{2}|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83|2582\\d)\\d{3}|(?:4\\d{6,7}|9[2-9]\\d{4,5})",
,,,"1312345",,,,[3,4]],[,,"7[1378]\\d{7}",,,,"711234567",,,[9]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"86(?:1[12]|30|44|55|77|8[367]|99)\\d{6}",,,,"8686123456",,,[10]],"ZW",263,"00","0",,,"0",,,,[[,"([49])(\\d{3})(\\d{2,4})","$1 $2 $3",["4|9[2-9]"],"0$1"],[,"(7\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["7"],"0$1"],[,"(86\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["86[24]"],"0$1"],[,"([2356]\\d{2})(\\d{3,5})","$1 $2",["2(?:0[45]|2[278]|[49]8|[78])|3(?:08|17|3[78]|7[1569]|8[37]|98)|5[15][78]|6(?:[29]8|[38]7|6[78]|75|[89]8)"],
"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|6[14]|7[35]|84)|329"],"0$1"],[,"([1-356]\\d)(\\d{3,5})","$1 $2",["1[3-9]|2[0569]|3[0-69]|5[05689]|6[0-46-9]"],"0$1"],[,"([235]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[23]9|54"],"0$1"],[,"([25]\\d{3})(\\d{3,5})","$1 $2",["(?:25|54)8","258[23]|5483"],"0$1"],[,"(8\\d{3})(\\d{6})","$1 $2",["86"],"0$1"],[,"(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],800:[,[,,"\\d{8}",
,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]],808:[,[,,"\\d{8}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,
,,,[-1]],1,,[,,,,,,,,,[-1]]],870:[,[,,"[35-7]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"(?:[356]\\d|7[6-8])\\d{7}",,,,"301234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],878:[,[,,"1\\d{11}",,,,,,,[12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"10\\d{10}",,,,"101234567890"],"001",
878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],881:[,[,,"[67]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"[67]\\d{8}",,,,"612345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],882:[,[,,"[13]\\d{6,11}",,,,,,,[7,8,9,10,11,12]],[,,,,,,,,,[-1]],[,,"3(?:2\\d{3}|37\\d{2}|4(?:2|7\\d{3}))\\d{4}",
,,,"3421234",,,[7,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15678]|9[0689])\\d{4}|6\\d{5,10})|3(?:45|9\\d{3})\\d{7}",,,,"390123456789"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["34[57]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["348"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{3,4})(\\d{4})",
"$1 $2 $3",["16"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["16|39"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"348[57]\\d{7}",,,,"34851234567",,,[11]]],883:[,[,,"51\\d{7}(?:\\d{3})?",,,,,,,[9,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"51(?:00\\d{5}(?:\\d{3})?|[13]0\\d{8})",,,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],[,
"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["51[13]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],888:[,[,,"\\d{11}",,,,,,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"\\d{11}",,,,"12345678901"],1,,[,,,,,,,,,[-1]]],979:[,[,,"\\d{9}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{9}",
,,,"123456789"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]]]};/*

 Copyright (C) 2010 The Libphonenumber Authors.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
function L(){this.a={}}L.a=function(){return L.b?L.b:L.b=new L};
var Ha={52:"1",54:"9"},Ia={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9"},Ja={0:"0",1:"1",2:"2",3:"3",
4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9",A:"2",B:"2",C:"2",D:"3",E:"3",F:"3",G:"4",H:"4",I:"4",J:"5",K:"5",L:"5",M:"6",
N:"6",O:"6",P:"7",Q:"7",R:"7",S:"7",T:"8",U:"8",V:"8",W:"9",X:"9",Y:"9",Z:"9"},Ka=RegExp("[+\uff0b]+"),M=RegExp("^[+\uff0b]+"),La=RegExp("([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9])"),Ma=RegExp("[+\uff0b0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]"),Na=/[\\\/] *x/,Oa=RegExp("[^0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9A-Za-z#]+$"),Pa=/(?:.*?[A-Za-z]){3}.*/,Qa=RegExp("(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\\.\uff0e]?[ \u00a0\\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)$",
"i"),Ra=RegExp("^[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{2}$|^[+\uff0b]*(?:[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e*]*[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]){3,}[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e*A-Za-z0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]*(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\\.\uff0e]?[ \u00a0\\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)?$",
"i"),Sa=/\D+/,Ta=/(\$\d)/,Ua=/^\(?\$1\)?$/;function Va(a){var b=a.search(Ma);0<=b?(a=a.substring(b),a=a.replace(Oa,""),b=a.search(Na),0<=b&&(a=a.substring(0,b))):a="";return a}function Wa(a){return 2>a.length?!1:N(Ra,a)}function Xa(a){return N(Pa,a)?Ya(a,Ja):Ya(a,Ia)}function Za(a){var b=Xa(a.toString());u(a);a.a(b)}function $a(a){return!!a&&(1!=D(a,9)||-1!=z(a,9)[0])}function Ya(a,b){for(var c=new t,d,e=a.length,f=0;f<e;++f)d=a.charAt(f),d=b[d.toUpperCase()],null!=d&&c.a(d);return c.toString()}
function O(a){return null!=a&&isNaN(a)&&a.toUpperCase()in Ga}
function P(a,b,c){if(0==x(b,2)&&w(b,5)){var d=C(b,5);if(0<d.length)return d}var d=C(b,1),e=R(b);if(0==c)return ab(d,0,e,"");if(!(d in K))return e;a=S(a,d,T(d));b=w(b,3)&&x(b,3).length?3==c?";ext="+x(b,3):w(a,13)?x(a,13)+C(b,3):" ext. "+C(b,3):"";a:{a=z(a,20).length&&2!=c?z(a,20):z(a,19);for(var f,g=a.length,h=0;h<g;++h){f=a[h];var k=D(f,3);if(!k||!e.search(x(f,3,k-1)))if(k=new RegExp(x(f,1)),N(k,e)){a=f;break a}}a=null}a&&(g=a,a=C(g,2),f=new RegExp(x(g,1)),C(g,5),g=C(g,4),e=2==c&&null!=g&&0<g.length?
e.replace(f,a.replace(Ta,g)):e.replace(f,a),3==c&&(e=e.replace(RegExp("^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]+"),""),e=e.replace(RegExp("[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]+","g"),"-")));return ab(d,c,e,b)}function S(a,b,c){return"001"==c?U(a,""+b):U(a,c)}
function R(a){var b=""+x(a,2);return w(a,4)&&x(a,4)&&0<C(a,8)?Array(C(a,8)+1).join("0")+b:b}function ab(a,b,c,d){switch(b){case 0:return"+"+a+c+d;case 1:return"+"+a+" "+c+d;case 3:return"tel:+"+a+"-"+c+d;default:return c+d}}function V(a,b){switch(b){case 4:return x(a,5);case 3:return x(a,4);case 1:return x(a,3);case 0:case 2:return x(a,2);case 5:return x(a,6);case 6:return x(a,8);case 7:return x(a,7);case 8:return x(a,21);case 9:return x(a,25);case 10:return x(a,28);default:return x(a,1)}}
function bb(a,b){var c=cb(a,b),c=S(a,C(b,1),c);if(!c)return-1;var d=R(b);return db(d,c)}function db(a,b){return W(a,x(b,1))?W(a,x(b,5))?4:W(a,x(b,4))?3:W(a,x(b,6))?5:W(a,x(b,8))?6:W(a,x(b,7))?7:W(a,x(b,21))?8:W(a,x(b,25))?9:W(a,x(b,28))?10:W(a,x(b,2))?x(b,18)||W(a,x(b,3))?2:0:!x(b,18)&&W(a,x(b,3))?1:-1:-1}function U(a,b){if(null==b)return null;b=b.toUpperCase();var c=a.a[b];if(!c){c=Ga[b];if(!c)return null;c=(new Da).b(H.h(),c);a.a[b]=c}return c}
function W(a,b){var c=a.length;return 0<D(b,9)&&-1==ha(z(b,9),c)?!1:N(C(b,2),a)}function cb(a,b){if(!b)return null;var c=C(b,1);if(c=K[c])if(1==c.length)c=c[0];else a:{for(var d=R(b),e,f=c.length,g=0;g<f;g++){e=c[g];var h=U(a,e);if(w(h,23)){if(!d.search(x(h,23))){c=e;break a}}else if(-1!=db(d,h)){c=e;break a}}c=null}else c=null;return c}function T(a){return(a=K[a])?a[0]:"ZZ"}function eb(a,b){var c=U(a,b);if(!c)throw Error("Invalid region code: "+b);return C(c,10)}
function X(a,b,c,d){var e=V(c,d),f=D(e,9)?z(e,9):z(x(c,1),9),e=z(e,10);if(2==d)if($a(V(c,0)))a=V(c,1),$a(a)&&(f=f.concat(D(a,9)?z(a,9):z(x(c,1),9)),ia(f),e.length?(e=e.concat(z(a,10)),ia(e)):e=z(a,10));else return X(a,b,c,1);if(-1==f[0])return 5;b=b.length;if(-1<ha(e,b))return 4;c=f[0];return c==b?0:c>b?2:f[f.length-1]<b?3:-1<ha(f,b,1)?0:5}
function fb(a,b){var c=a.toString();if(!c.length||"0"==c.charAt(0))return 0;for(var d,e=c.length,f=1;3>=f&&f<=e;++f)if(d=parseInt(c.substring(0,f),10),d in K)return b.a(c.substring(f)),d;return 0}
function gb(a,b,c,d,e,f){if(!b.length)return 0;b=new t(b);var g;c&&(g=x(c,11));null==g&&(g="NonMatch");var h=b.toString();if(h.length)if(M.test(h))h=h.replace(M,""),u(b),b.a(Xa(h)),g=1;else{h=new RegExp(g);Za(b);g=b.toString();if(g.search(h))g=!1;else{var h=g.match(h)[0].length,k=g.substring(h).match(La);k&&null!=k[1]&&0<k[1].length&&"0"==Ya(k[1],Ia)?g=!1:(u(b),b.a(g.substring(h)),g=!0)}g=g?5:20}else g=20;e&&y(f,6,g);if(20!=g){if(2>=b.b.length)throw Error("Phone number too short after IDD");if(a=
fb(b,d))return y(f,1,a),a;throw Error("Invalid country calling code");}if(c&&(g=C(c,10),h=""+g,k=b.toString(),!k.lastIndexOf(h,0)&&(h=new t(k.substring(h.length)),k=x(c,1),k=new RegExp(C(k,2)),hb(h,c,null),h=h.toString(),!N(k,b.toString())&&N(k,h)||3==X(a,b.toString(),c,-1))))return d.a(h),e&&y(f,6,10),y(f,1,g),g;y(f,1,0);return 0}
function hb(a,b,c){var d=a.toString(),e=d.length,f=x(b,15);if(e&&null!=f&&f.length){var g=new RegExp("^(?:"+f+")");if(e=g.exec(d)){var f=new RegExp(C(x(b,1),2)),h=N(f,d),k=e.length-1;b=x(b,16);if(null!=b&&b.length&&null!=e[k]&&e[k].length){if(d=d.replace(g,b),!h||N(f,d))c&&0<k&&c.a(e[1]),a.set(d)}else if(!h||N(f,d.substring(e[0].length)))c&&0<k&&null!=e[k]&&c.a(e[1]),a.set(d.substring(e[0].length))}}}
function Y(a,b,c){if(!O(c)&&0<b.length&&"+"!=b.charAt(0))throw Error("Invalid country calling code");return ib(a,b,c,!0)}
function ib(a,b,c,d){if(null==b)throw Error("The string supplied did not seem to be a phone number");if(250<b.length)throw Error("The string supplied is too long to be a phone number");var e=new t,f=b.indexOf(";phone-context=");if(0<=f){var g=f+15;if("+"==b.charAt(g)){var h=b.indexOf(";",g);0<h?e.a(b.substring(g,h)):e.a(b.substring(g))}g=b.indexOf("tel:");e.a(b.substring(0<=g?g+4:0,f))}else e.a(Va(b));f=e.toString();g=f.indexOf(";isub=");0<g&&(u(e),e.a(f.substring(0,g)));if(!Wa(e.toString()))throw Error("The string supplied did not seem to be a phone number");
f=e.toString();if(!(O(c)||null!=f&&0<f.length&&M.test(f)))throw Error("Invalid country calling code");f=new J;d&&y(f,5,b);a:{b=e.toString();g=b.search(Qa);if(0<=g&&Wa(b.substring(0,g)))for(var h=b.match(Qa),k=h.length,m=1;m<k;++m)if(null!=h[m]&&0<h[m].length){u(e);e.a(b.substring(0,g));b=h[m];break a}b=""}0<b.length&&y(f,3,b);b=U(a,c);g=new t;h=0;k=e.toString();try{h=gb(a,k,b,g,d,f)}catch(A){if("Invalid country calling code"==A.message&&M.test(k)){if(k=k.replace(M,""),h=gb(a,k,b,g,d,f),!h)throw A;
}else throw A;}h?(e=T(h),e!=c&&(b=S(a,h,e))):(Za(e),g.a(e.toString()),null!=c?(h=C(b,10),y(f,1,h)):d&&xa(f,6));if(2>g.b.length)throw Error("The string supplied is too short to be a phone number");b&&(c=new t,e=new t(g.toString()),hb(e,b,c),2!=X(a,e.toString(),b,-1)&&(g=e,d&&0<c.toString().length&&y(f,7,c.toString())));a=g.toString();d=a.length;if(2>d)throw Error("The string supplied is too short to be a phone number");if(17<d)throw Error("The string supplied is too long to be a phone number");if(1<
a.length&&"0"==a.charAt(0)){y(f,4,!0);for(d=1;d<a.length-1&&"0"==a.charAt(d);)d++;1!=d&&y(f,8,d)}y(f,2,parseInt(a,10));return f}function N(a,b){var c="string"==typeof a?b.match("^(?:"+a+")$"):b.match(a);return c&&c[0].length==b.length?!0:!1};function jb(a){this.ca=RegExp("\u2008");this.ea="";this.m=new t;this.w="";this.i=new t;this.v=new t;this.j=!0;this.$=this.o=this.ga=!1;this.da=L.a();this.s=0;this.b=new t;this.aa=!1;this.l="";this.a=new t;this.f=[];this.fa=a;this.g=kb(this,this.fa)}var lb=new H;y(lb,11,"NA");
var mb=/\[([^\[\]])*\]/g,nb=/\d(?=[^,}][^,}])/g,ob=RegExp("^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]*(\\$\\d[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\\[\\]/~\u2053\u223c\uff5e]*)+$"),pb=/[- ]/;function kb(a,b){var c=O(b)?eb(a.da,b):0;return(c=U(a.da,T(c)))?c:lb}
function qb(a){for(var b=a.f.length,c=0;c<b;++c){var d=a.f[c],e=C(d,1);if(a.w==e)return!1;var f;f=a;var g=d,h=C(g,1);if(-1!=h.indexOf("|"))f=!1;else{h=h.replace(mb,"\\d");h=h.replace(nb,"\\d");u(f.m);var k;k=f;var g=C(g,2),m="999999999999999".match(h)[0];m.length<k.a.b.length?k="":(k=m.replace(new RegExp(h,"g"),g),k=k.replace(RegExp("9","g"),"\u2008"));0<k.length?(f.m.a(k),f=!0):f=!1}if(f)return a.w=e,a.aa=pb.test(x(d,4)),a.s=0,!0}return a.j=!1}
function rb(a,b){for(var c=[],d=b.length-3,e=a.f.length,f=0;f<e;++f){var g=a.f[f];D(g,3)?(g=x(g,3,Math.min(d,D(g,3)-1)),b.search(g)||c.push(a.f[f])):c.push(a.f[f])}a.f=c}function sb(a,b){a.ea=tb(a,b);return a.ea}
function tb(a,b){a.i.a(b);var c=b;if(La.test(c)||1==a.i.b.length&&Ka.test(c)){var c=b,d;"+"==c?(d=c,a.v.a(c)):(d=Ia[c],a.v.a(d),a.a.a(d));b=d}else a.j=!1,a.ga=!0;if(!a.j){if(!a.ga)if(ub(a)){if(vb(a))return wb(a)}else if(0<a.l.length&&(c=a.a.toString(),u(a.a),a.a.a(a.l),a.a.a(c),c=a.b.toString(),d=c.lastIndexOf(a.l),u(a.b),a.b.a(c.substring(0,d))),a.l!=xb(a))return a.b.a(" "),wb(a);return a.i.toString()}switch(a.v.b.length){case 0:case 1:case 2:return a.i.toString();case 3:if(ub(a))a.$=!0;else return a.l=
xb(a),yb(a);default:if(a.$)return vb(a)&&(a.$=!1),a.b.toString()+a.a.toString();if(0<a.f.length){c=zb(a,b);d=Ab(a);if(0<d.length)return d;rb(a,a.a.toString());return qb(a)?Bb(a):a.j?Z(a,c):a.i.toString()}return yb(a)}}function wb(a){a.j=!0;a.$=!1;a.f=[];a.s=0;u(a.m);a.w="";return yb(a)}function Ab(a){for(var b=a.a.toString(),c=a.f.length,d=0;d<c;++d){var e=a.f[d],f=C(e,1);if((new RegExp("^(?:"+f+")$")).test(b))return a.aa=pb.test(x(e,4)),b=b.replace(new RegExp(f,"g"),x(e,2)),Z(a,b)}return""}
function Z(a,b){var c=a.b.b.length;return a.aa&&0<c&&" "!=a.b.toString().charAt(c-1)?a.b+" "+b:a.b+b}function yb(a){var b=a.a.toString();if(3<=b.length){for(var c=a.o&&0<D(a.g,20)?z(a.g,20):z(a.g,19),d=c.length,e=0;e<d;++e){var f=c[e],g;(g=!w(a.g,12)||a.o||x(f,6))||(g=C(f,4),g=!g.length||Ua.test(g));g&&ob.test(C(f,2))&&a.f.push(f)}rb(a,b);b=Ab(a);return 0<b.length?b:qb(a)?Bb(a):a.i.toString()}return Z(a,b)}
function Bb(a){var b=a.a.toString(),c=b.length;if(0<c){for(var d="",e=0;e<c;e++)d=zb(a,b.charAt(e));return a.j?Z(a,d):a.i.toString()}return a.b.toString()}
function xb(a){var b=a.a.toString(),c=0,d;1!=x(a.g,10)?d=!1:(d=a.a.toString(),d="1"==d.charAt(0)&&"0"!=d.charAt(1)&&"1"!=d.charAt(1));d?(c=1,a.b.a("1").a(" "),a.o=!0):w(a.g,15)&&(d=new RegExp("^(?:"+x(a.g,15)+")"),(d=b.match(d))&&null!=d[0]&&0<d[0].length&&(a.o=!0,c=d[0].length,a.b.a(b.substring(0,c))));u(a.a);a.a.a(b.substring(c));return b.substring(0,c)}
function ub(a){var b=a.v.toString(),c=new RegExp("^(?:\\+|"+x(a.g,11)+")");return(c=b.match(c))&&null!=c[0]&&0<c[0].length?(a.o=!0,c=c[0].length,u(a.a),a.a.a(b.substring(c)),u(a.b),a.b.a(b.substring(0,c)),"+"!=b.charAt(0)&&a.b.a(" "),!0):!1}function vb(a){if(!a.a.b.length)return!1;var b=new t,c=fb(a.a,b);if(!c)return!1;u(a.a);a.a.a(b.toString());b=T(c);"001"==b?a.g=U(a.da,""+c):b!=a.fa&&(a.g=kb(a,b));a.b.a(""+c).a(" ");a.l="";return!0}
function zb(a,b){var c=a.m.toString();if(0<=c.substring(a.s).search(a.ca)){var d=c.search(a.ca),c=c.replace(a.ca,b);u(a.m);a.m.a(c);a.s=d;return c.substring(0,a.s+1)}1==a.f.length&&(a.j=!1);a.w="";return a.i.toString()};function Cb(a,b,c){try{var d=L.a(),e;a:{if(O(a)){var f=V(U(d,a),b);try{if(w(f,6)){var g=x(f,6);e=ib(d,g,a,!1);break a}}catch(h){}}e=null}return P(d,e,c?2:1)}catch(h){return""}}function Db(a,b){try{var c=L.a(),d=Y(c,a,b);return bb(c,d)}catch(e){return-99}}q("PhoneLib",{});q("PhoneLib.format",function(a,b,c){try{var d=L.a(),e=Y(d,a,b||"");c="undefined"==typeof c?1:c;return 0==c?P(d,e,1).replace(/[\-\(\)\s\.]/g,"").replace("ext",","):P(d,e,c)}catch(f){return""}});q("PhoneLib.getType",Db);
q("PhoneLib.isValid",function(a,b){try{var c=L.a(),d=Y(c,a,b),e;var f=cb(c,d),g=C(d,1),h=S(c,g,f);if(!h||"001"!=f&&g!=eb(c,f))e=!1;else{var k=R(d);e=-1!=db(k,h)}return e}catch(m){return!1}});
q("PhoneLib.getError",function(a,b){try{var c=L.a(),d;var e=Y(c,a,b),f=R(e),g=C(e,1);if(g in K){var h=S(c,g,T(g));d=X(c,f,h,-1)}else d=1;return d}catch(k){return"Invalid country calling code"==k?1:"The string supplied did not seem to be a phone number"==k?4:"Phone number too short after IDD"==k||"The string supplied is too short to be a phone number"==k?2:"The string supplied is too long to be a phone number"==k?3:-99}});q("PhoneLib.getExample",Cb);
q("PhoneLib.formatInput",function(a,b,c,d,e){try{var f=a.replace(/\D/g,""),g=new jb(b);b="";var h;"+"==a.substr(0,1)&&(f="+"+f);for(var k=0;k<f.length;k++){h=sb(g,f.charAt(k));if(d&&b&&h.length<=b.length&&-1==h.indexOf(" ")){h=-1;break}b=h}" "==b.charAt(b.length-1)&&(b=b.substr(0,b.length-1));if(c&&!a.split(" ext. ")[1]){var m=sb(g,"5");" "==m.charAt(m.length-1)&&(m=m.substr(0,m.length-1));if(isNaN(parseFloat(m.substr(m.length-2,1))))return m.substr(0,m.length-1);if(d&&b&&m.length<=b.length&&-1==
m.indexOf(" ")&&!e)return b+" ext. "}-1==h&&(b+=" ext. "+f.substring(k,f.length));return b}catch(A){return a}});q("PhoneLib.getIso2Code",function(a,b){try{var c=L.a(),d=Y(c,a,b);return T(C(d,1))}catch(e){return""}});q("PhoneLib.getDialingCode",function(a){var b=L.a();return O(a)?eb(b,a):0});
q("PhoneLib.getNumberInfo",function(a,b){try{var c=L.a(),d=Y(c,a,b),e=R(d),f,g,h=x(d,3),k=Db(a,b),m;a:{var A;w(d,3)?(A=d.clone(),xa(A,3)):A=d;var Q=P(c,A,1).split(Sa);Q[0].length||Q.shift();if(2>=Q.length)m=0;else{if(1==bb(c,d)){var oa,Eb=C(d,1);oa=Ha[Eb]||"";if(""!=oa){m=Q[2].length+oa.length;break a}}m=Q[1].length}}0<m?(f=e.substring(0,m),g=e.substring(m),null!=Cb(b,k,!0).match(/^(0)|(\(0)/)&&(f="0"+f)):(f="",g=e);return{countryCode:x(d,1),areaCode:f,phone:g,ext:h}}catch(Fb){return null}});
q("PhoneLib.TYPE",{FIXED_LINE:0,MOBILE:1,FIXED_LINE_OR_MOBILE:2,TOLL_FREE:3,PREMIUM_RATE:4,SHARED_COST:5,VOIP:6,PERSONAL_NUMBER:7,PAGER:8,UAN:9,VOICEMAIL:10,UNKNOWN:-1});q("PhoneLib.ERROR",{IS_POSSIBLE:0,INVALID_COUNTRY_CODE:1,TOO_SHORT:2,TOO_LONG:3,NOT_A_NUMBER:4});q("PhoneLib.FORMAT",{FULL:0,INTERNATIONAL:1,NATIONAL:2,LINK:3});})();

define("auf-utility-library/libs/phonelib", [],function(){});

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
  if (typeof a === 'boolean') return false;
  return a === undefined || a === null || a === '' || a.length === 0 || Object.keys(a).length == 0;
}
window.isString = function(a) {
  return (typeof a === 'string');
}
window.isNumber = function(a) {
  return (typeof a === 'number' && Number.isInteger(a));
}
window.isDecimal = function(a) {
  return (typeof a === 'number');
}
window.isFunction = function(a) {
  return (typeof a === 'function');
}

window.isRtl = function(el) {
  rtl = false;
  do {
    if ((el.dir || el.style.direction) == "rtl") return true;
    if ((el.dir || el.style.direction) == "ltr") return false;
    el = el.parentElement;
  } while (el != null);
  return false;
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

define("auf-utility-library/libs/window", [],function(){});

define('aurelia-ui-framework/aurelia-ui-framework',["require", "exports", "aurelia-pal", "aurelia-validation", "./utils/ui-constants", "./utils/ui-utils", "./utils/ui-validation", "./data/ui-datamodel", "./utils/ui-application", "./utils/ui-constants", "./utils/ui-dialog", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "auf-utility-library", "./elements/core/ui-glyphs", "./elements/core/ui-grid", "./elements/core/ui-page", "./elements/core/ui-viewport", "./elements/components/ui-alerts", "./elements/components/ui-bars", "./elements/components/ui-drawer", "./elements/components/ui-dropdown", "./elements/components/ui-indicators", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-sidebar", "./elements/components/ui-tabpanel", "./elements/inputs/ui-button", "./elements/inputs/ui-date", "./elements/inputs/ui-form", "./elements/inputs/ui-input", "./elements/inputs/ui-markdown", "./elements/inputs/ui-options", "./elements/inputs/ui-phone", "./elements/inputs/ui-textarea", "./attributes/ui-badge", "./attributes/ui-colors", "./attributes/ui-ribbon", "./attributes/ui-tooltip", "./value-converters/ui-lodash", "./value-converters/ui-text"], function (require, exports, aurelia_pal_1, aurelia_validation_1, ui_constants_1, ui_utils_1, ui_validation_1, ui_datamodel_1, ui_application_1, ui_constants_2, ui_dialog_1, ui_event_1, ui_format_1, ui_http_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(ui_datamodel_1);
    __export(ui_application_1);
    __export(ui_constants_2);
    __export(ui_dialog_1);
    __export(ui_event_1);
    __export(ui_format_1);
    __export(ui_http_1);
    function configure(config, configCallback) {
        ui_utils_1.UIUtils.auContainer = config.container;
        aurelia_validation_1.ValidationController.prototype.validateTrigger = aurelia_validation_1.validateTrigger.changeOrBlur;
        config.container.registerHandler('ui-validator', function (container) { return container.get(ui_validation_1.UIValidationRenderer); });
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-grid'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-page'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-viewport')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-alerts'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-bars'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-drawer'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dropdown'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-indicators'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-menu'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-panel'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-sidebar'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-tabpanel')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-button'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-date'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-form'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-input'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-markdown'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-options'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-phone'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-textarea')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-badge'),
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-colors'),
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-ribbon'),
            aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-tooltip')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-lodash'),
            aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-text')
        ]);
        var Configure = {
            title: function (t) {
                ui_constants_1.UIConstants.Title = t;
                return Configure;
            },
            subTitle: function (t) {
                ui_constants_1.UIConstants.SubTitle = t;
                return Configure;
            },
            version: function (t) {
                ui_constants_1.UIConstants.Version = t;
                return Configure;
            },
            appKey: function (t) {
                ui_constants_1.UIConstants.AppKey = t;
                return Configure;
            },
            apiUrl: function (t) {
                ui_constants_1.UIConstants.Http.BaseUrl = t;
                return Configure;
            },
            apiHeaders: function (t) {
                ui_constants_1.UIConstants.Http.Headers = t;
                return Configure;
            },
            sendAuthHeader: function (t) {
                ui_constants_1.UIConstants.Http.AuthorizationHeader = t;
                return Configure;
            },
            languages: function (l) {
                ui_constants_1.UIConstants.Languages = l;
                return Configure;
            }
        };
        if (configCallback !== undefined && typeof configCallback === 'function') {
            configCallback(Configure);
        }
        ui_validation_1.loadValidators();
        ui_utils_1.lodashMixins();
    }
    exports.configure = configure;
});

;define('aurelia-ui-framework', ['aurelia-ui-framework/aurelia-ui-framework'], function (main) { return main; });

define('aurelia-ui-framework/utils/ui-constants',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIConstants;
    (function (UIConstants) {
        UIConstants.AppKey = 'AUF';
        UIConstants.Title = 'Aurelia UI Framework';
        UIConstants.SubTitle = '';
        UIConstants.Version = '4.0.0';
        UIConstants.Http = {
            BaseUrl: './',
            Headers: {},
            AuthorizationHeader: false
        };
        UIConstants.Languages = [
            { id: 'ar', name: 'العربية (Arabic)', rtl: true },
            { id: 'de', name: 'Deutsch (German)' },
            { id: 'el', name: 'ελληνικά (Greek)' },
            { id: 'en', name: 'English' },
            { id: 'es', name: 'Español (Spanish)' },
            { id: 'fr', name: 'Français (French)' },
            { id: 'hi', name: 'हिंदी (Hindi)' },
            { id: 'id', name: 'Bahasa (Indonesia)' },
            { id: 'it', name: 'Italiano (Italian)' },
            { id: 'ja', name: '日本語 (Japanese)' },
            { id: 'ko', name: '한국어 (Korean)' },
            { id: 'ms', name: 'Malay (Malaysian)' },
            { id: 'nl', name: 'Nederlands (Dutch)' },
            { id: 'pt', name: 'Português (Portuguese)' },
            { id: 'pt-br', name: 'Português (Brasil)' },
            { id: 'ru', name: 'Русский (Russian)' },
            { id: 'th', name: 'ภาษาไทย (Thai)' },
            { id: 'tl', name: 'Tagalog (Philipines)' },
            { id: 'tw', name: '繁體中文 (Traditional Chinese)' },
            { id: 'vi', name: 'Tiếng Việt (Vietnamese)' },
            { id: 'zh', name: '简体中文 (Simplified Chinese)' }
        ];
    })(UIConstants = exports.UIConstants || (exports.UIConstants = {}));
});

define('aurelia-ui-framework/utils/ui-utils',["require", "exports", "aurelia-framework", "aurelia-metadata", "./ui-event", "lodash"], function (require, exports, aurelia_framework_1, aurelia_metadata_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lodashMixins() {
        _.mixin({
            'findByValues': function (collection, property, values) {
                if (_.isArray(collection)) {
                    return _.filter(collection, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    });
                }
                else {
                    var ret_1 = [];
                    _.forEach(collection, function (list) {
                        ret_1.concat(_.filter(list, function (item) {
                            return _.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_1;
                }
            },
            'removeByValues': function (collection, property, values) {
                if (_.isArray(collection)) {
                    return _.remove(collection, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    }) || [];
                }
                else {
                    var ret_2 = [];
                    _.forEach(collection, function (list, key) {
                        ret_2 = ret_2.concat(_.remove(list, function (item) {
                            return _.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_2;
                }
            },
            'findDeep': function (collection, property, value) {
                if (_.isArray(collection)) {
                    return _.find(collection, function (item) {
                        return item[property] + '' === value + '';
                    });
                }
                else {
                    var ret_3;
                    _.forEach(collection, function (item) {
                        ret_3 = _.find(item, function (v) {
                            return v[property] + '' === value + '';
                        });
                        return ret_3 === undefined;
                    });
                    return ret_3 || {};
                }
            },
            'findChildren': function (collection, listProperty, property, value) {
                var ret;
                _.forEach(collection, function (item) {
                    ret = _.find(item[listProperty], function (v) {
                        return v[property] + '' === value + '';
                    });
                    return ret === undefined;
                });
                return ret || {};
            }
        });
    }
    exports.lodashMixins = lodashMixins;
    var UIUtils;
    (function (UIUtils) {
        function lazy(T) {
            if (!this.auContainer) {
                throw new Error('UIUtils.Lazy::Container not set');
            }
            return aurelia_framework_1.Lazy.of(T).get(this.auContainer)();
        }
        UIUtils.lazy = lazy;
        function newInstance(T) {
            if (!this.auContainer) {
                throw new Error('UIUtils.newInstance::Container not provided');
            }
            return aurelia_framework_1.NewInstance.of(T).get(this.auContainer);
        }
        UIUtils.newInstance = newInstance;
        function tether(parent, child, opts) {
            opts = Object.assign({ resize: true, position: 'bl' }, opts);
            child.style.position = 'fixed';
            return new (function (el, dd, options) {
                var _this = this;
                this.listeners = [];
                this.dispose = function () {
                    _this.listeners.forEach(function (parent) {
                        parent.removeEventListener('scroll', _this.position);
                        parent.removeEventListener('touchstart', _this.position);
                    });
                    window.removeEventListener('resize', _this.position);
                };
                this.position = function (sizeWidth, topLeft) {
                    if (sizeWidth === void 0) { sizeWidth = false; }
                    if (topLeft === void 0) { topLeft = false; }
                    var isRtl = window.isRtl(el);
                    var pos = el.getBoundingClientRect();
                    if (options.resize)
                        dd.style.minWidth = pos.width + 'px';
                    el.classList.remove('ui-tether-top');
                    el.classList.remove('ui-tether-bottom');
                    el.classList.remove('ui-tether-left');
                    el.classList.remove('ui-tether-right');
                    dd.classList.remove('ui-tether-top');
                    dd.classList.remove('ui-tether-bottom');
                    dd.classList.remove('ui-tether-left');
                    dd.classList.remove('ui-tether-right');
                    var align = options.position.split('');
                    if (align[0] == 'c') {
                        dd.style.top = pos.top + (pos.height / 2) + 'px';
                        dd.style.transform += ' translateY(-50%)';
                    }
                    else if (align[0] == 't') {
                        if (pos.top - dd.offsetHeight < 0) {
                            dd.classList.add('ui-tether-top');
                            el.classList.add('ui-tether-bottom');
                            dd.style.top = pos.bottom + 'px';
                            dd.style.transform = 'translateY(0)';
                        }
                        else {
                            el.classList.add('ui-tether-top');
                            dd.classList.add('ui-tether-bottom');
                            dd.style.top = pos.top + 'px';
                            dd.style.transform = 'translateY(-100%)';
                        }
                    }
                    else {
                        if (pos.bottom + dd.offsetHeight > window.innerHeight && pos.top >= dd.offsetHeight) {
                            el.classList.add('ui-tether-top');
                            dd.classList.add('ui-tether-bottom');
                            dd.style.top = pos.top + 'px';
                            dd.style.transform = 'translateY(-100%)';
                        }
                        else {
                            dd.classList.add('ui-tether-top');
                            el.classList.add('ui-tether-bottom');
                            dd.style.top = pos.bottom + 'px';
                            dd.style.transform = 'translateY(0)';
                        }
                    }
                    if (align[1] == 'c') {
                        dd.style.left = pos.left + (pos.width / 2) + 'px';
                        dd.style.transform += ' translateX(-50%)';
                    }
                    else if (align[1] == (isRtl ? 'l' : 'r')) {
                        if (pos.right - dd.offsetWidth < 0) {
                            dd.classList.add('ui-tether-left');
                            el.classList.add('ui-tether-left');
                            dd.style.left = pos.left + 'px';
                            dd.style.transform += ' translateX(0)';
                        }
                        else {
                            dd.classList.add('ui-tether-right');
                            el.classList.add('ui-tether-right');
                            dd.style.left = pos.right + 'px';
                            dd.style.transform += ' translateX(-100%)';
                        }
                    }
                    else {
                        if (pos.left + dd.offsetWidth > window.innerWidth) {
                            dd.classList.add('ui-tether-right');
                            el.classList.add('ui-tether-right');
                            dd.style.left = pos.right + 'px';
                            dd.style.transform += ' translateX(-100%)';
                        }
                        else {
                            dd.classList.add('ui-tether-left');
                            el.classList.add('ui-tether-left');
                            dd.style.left = pos.left + 'px';
                            dd.style.transform += ' translateX(0)';
                        }
                    }
                    dd.style.transform += ' translateZ(0)';
                };
                var parent = el.parentElement;
                do {
                    var cs = getComputedStyle(parent);
                    if (!(['scroll', 'auto'].indexOf(cs.overflowX) == -1 && ['scroll', 'auto'].indexOf(cs.overflowY) == -1)) {
                        this.listeners.push(parent);
                        parent.addEventListener('scroll', this.position);
                        parent.addEventListener('touchstart', this.position);
                    }
                    parent = parent.parentElement;
                } while (parent != null);
                window.addEventListener('resize', this.position);
                this.position();
            })(parent, child, opts);
        }
        UIUtils.tether = tether;
        function toast(options) {
            var opts = { container: this.overlayContainer, theme: 'dark', timeout: 5000, glyph: 'glyph-alert-info', message: '', title: '' };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            var toast = aurelia_framework_1.DOM.createElement('ui-toast');
            toast.classList.add("ui-" + opts.theme);
            toast.innerHTML = (opts.title ? "<h1>" + opts.title + "</h1>" : '') + "<p>" + opts.message + "</p>";
            if (opts.container.children.length > 0)
                opts.container.insertBefore(toast, opts.container.children[0]);
            else
                opts.container.appendChild(toast);
            var engine = this.lazy(aurelia_framework_1.TemplatingEngine);
            ui_event_1.UIEvent.queueTask(function () { return engine.enhance({
                element: toast, bindingContext: {
                    glyph: opts.glyph,
                    timeout: opts.timeout
                }
            }); });
        }
        UIUtils.toast = toast;
        function alert(options) {
            var opts = { glyph: 'glyph-alert-info', message: '', title: '', okLabel: 'OK', cancelLabel: 'Cancel', confirm: false };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            var alert = aurelia_framework_1.DOM.createElement('ui-alert');
            alert.innerHTML = (opts.title ? "<h1>" + opts.title + "</h1>" : '') + "<p>" + opts.message + "</p>";
            this.dialogContainer.appendChild(alert);
            var engine = this.lazy(aurelia_framework_1.TemplatingEngine);
            return new Promise(function (resolve, reject) {
                ui_event_1.UIEvent.queueTask(function () { return engine.enhance({
                    element: alert, bindingContext: {
                        glyph: opts.glyph,
                        okLabel: opts.okLabel,
                        cancelLabel: opts.cancelLabel,
                        confirm: opts.confirm,
                        closeCallback: function (b) {
                            resolve(b);
                        }
                    }
                }); });
            });
        }
        UIUtils.alert = alert;
        function confirm(options) {
            var opts = { glyph: 'glyph-alert-question', message: '', title: '', confirm: true };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            return UIUtils.alert(opts);
        }
        UIUtils.confirm = confirm;
        function prompt(options) {
            var opts = { glyph: 'glyph-alert-question', message: '', title: '', okLabel: 'OK', cancelLabel: 'Cancel', type: 'single', };
            if (isString(options))
                opts.message = options;
            else
                opts = Object.assign(opts, options);
            var alert = aurelia_framework_1.DOM.createElement('ui-prompt');
            alert.innerHTML = (opts.title ? "<h1>" + opts.title + "</h1>" : '') + "<p>" + opts.message + "</p>";
            this.dialogContainer.appendChild(alert);
            var engine = this.lazy(aurelia_framework_1.TemplatingEngine);
            return new Promise(function (resolve, reject) {
                ui_event_1.UIEvent.queueTask(function () { return engine.enhance({
                    element: alert, bindingContext: {
                        type: opts.type,
                        glyph: opts.glyph,
                        okLabel: opts.okLabel,
                        cancelLabel: opts.cancelLabel,
                        closeCallback: function (value) {
                            resolve(value);
                        }
                    }
                }); });
            });
        }
        UIUtils.prompt = prompt;
        function loadView(url, parent, model) {
            var __compositionEngine = this.lazy(aurelia_framework_1.CompositionEngine);
            var instruction = {
                viewModel: url,
                container: this.auContainer,
                childContainer: this.auContainer.createChild(),
                model: model
            };
            return new Promise(function (resolve, reject) {
                __getViewModel(instruction)
                    .then(function (newInstruction) {
                    var viewModel = newInstruction.viewModel;
                    return __invokeLifecycle(viewModel, 'canActivate', instruction.model)
                        .then(function (canActivate) {
                        if (canActivate) {
                            return __compositionEngine.createController(instruction)
                                .then(function (controller) {
                                controller.automate();
                                var slot = new aurelia_framework_1.ViewSlot(parent, true);
                                slot.add(controller.view);
                                slot.attached();
                                resolve(controller.viewModel);
                                return true;
                            });
                        }
                        else {
                        }
                    });
                })
                    .catch(function (e) {
                });
            });
        }
        UIUtils.loadView = loadView;
        function __getViewModel(instruction) {
            var __compositionEngine = UIUtils.lazy(aurelia_framework_1.CompositionEngine);
            if (typeof instruction.viewModel === 'function') {
                instruction.viewModel = aurelia_metadata_1.Origin.get(instruction.viewModel).moduleId;
            }
            if (typeof instruction.viewModel === 'string') {
                return __compositionEngine.ensureViewModel(instruction);
            }
            return Promise.resolve(instruction);
        }
        function __invokeLifecycle(instance, name, model) {
            if (instance && typeof instance[name] === 'function') {
                var result = instance[name](model);
                if (result instanceof Promise) {
                    return result;
                }
                if (result !== null && result !== undefined) {
                    return Promise.resolve(result);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        }
    })(UIUtils = exports.UIUtils || (exports.UIUtils = {}));
});

define('aurelia-ui-framework/utils/ui-event',["require", "exports", "aurelia-framework", "aurelia-event-aggregator", "./ui-utils"], function (require, exports, aurelia_framework_1, aurelia_event_aggregator_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIEvent;
    (function (UIEvent) {
        function fireEvent(event, element, data) {
            var e = aurelia_framework_1.DOM.createCustomEvent(event, { bubbles: true, cancelable: true, detail: data });
            return element.dispatchEvent(e);
        }
        UIEvent.fireEvent = fireEvent;
        var __ea;
        var __ob;
        var __tq;
        function broadcast(event, data) {
            if (!__ea) {
                __ea = ui_utils_1.UIUtils.lazy(aurelia_event_aggregator_1.EventAggregator);
            }
            __ea.publish(event, data);
        }
        UIEvent.broadcast = broadcast;
        function subscribe(event, callback) {
            if (!__ea) {
                __ea = ui_utils_1.UIUtils.lazy(aurelia_event_aggregator_1.EventAggregator);
            }
            return __ea.subscribe(event, callback);
        }
        UIEvent.subscribe = subscribe;
        function observe(object, property, callback) {
            if (!__ob) {
                __ob = ui_utils_1.UIUtils.lazy(aurelia_framework_1.BindingEngine);
            }
            return __ob.propertyObserver(object, property).subscribe(callback);
        }
        UIEvent.observe = observe;
        function collection(object, callback) {
            if (!__ob) {
                __ob = ui_utils_1.UIUtils.lazy(aurelia_framework_1.BindingEngine);
            }
            return __ob.collectionObserver(object).subscribe(callback);
        }
        UIEvent.collection = collection;
        function queueTask(fn) {
            if (!__tq) {
                __tq = ui_utils_1.UIUtils.lazy(aurelia_framework_1.TaskQueue);
            }
            __tq.queueTask(fn);
        }
        UIEvent.queueTask = queueTask;
    })(UIEvent = exports.UIEvent || (exports.UIEvent = {}));
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-ui-framework/utils/ui-validation',["require", "exports", "aurelia-framework", "aurelia-validation", "../elements/inputs/ui-markdown", "./ui-utils", "lodash"], function (require, exports, aurelia_framework_1, aurelia_validation_1, ui_markdown_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function loadValidators() {
        var validator = ui_utils_1.UIUtils.lazy(aurelia_validation_1.Validator);
        aurelia_validation_1.ValidationRules
            .customRule('url', function (value, obj) { return value === null || value === undefined || value === '' || (/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/).test(value); }, '\${$displayName } is not a valid url.');
        aurelia_validation_1.ValidationRules
            .customRule('phone', function (value, obj) { return value === null || value === undefined || value === '' || PhoneLib.isValid(value); }, '\${$displayName } is not a valid phone number.');
        aurelia_validation_1.ValidationRules
            .customRule('number', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (isNumber(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be an number value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('decimal', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (isDecimal(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('language', function (map, obj, langs) {
            if (langs === void 0) { langs = ''; }
            var promises = [];
            map.__errored__ = [];
            _.forEach(map, function (model, key) {
                if (model && key != '__errored__') {
                    promises.push(validator.validateObject(model)
                        .then(function (e) {
                        if (_.filter(e, ['valid', false]).length > 0) {
                            map.__errored__.push(key);
                            return true;
                        }
                        return false;
                    }));
                }
            });
            return Promise.all(promises).then(function (e) { return _.filter(e).length == 0; });
        }, 'Some language entries contain invalid values');
    }
    exports.loadValidators = loadValidators;
    var UIValidationRenderer = (function () {
        function UIValidationRenderer() {
        }
        UIValidationRenderer.prototype.render = function (instruction) {
            for (var _i = 0, _a = instruction.unrender; _i < _a.length; _i++) {
                var _b = _a[_i], result = _b.result, elements = _b.elements;
                for (var _c = 0, elements_1 = elements; _c < elements_1.length; _c++) {
                    var element = elements_1[_c];
                    this.remove(element, result);
                }
            }
            for (var _d = 0, _e = instruction.render; _d < _e.length; _d++) {
                var _f = _e[_d], result = _f.result, elements = _f.elements;
                for (var _g = 0, elements_2 = elements; _g < elements_2.length; _g++) {
                    var element = elements_2[_g];
                    this.add(element, result);
                }
            }
        };
        UIValidationRenderer.prototype.add = function (element, result) {
            if (result.valid) {
                return;
            }
            element.classList.add('ui-invalid');
            element.classList.remove('ui-valid');
            try {
                var vm = element.au.controller.viewModel;
                if (!vm.errors)
                    vm.errors = [];
                if (~vm.errors.indexOf(result))
                    return;
                if (element.au.controller.viewModel && element.au.controller.viewModel instanceof ui_markdown_1.UILanguage) {
                    var ms = result.message.split('|');
                    vm.errors.push(result);
                    vm.errored = result.object[result.propertyName].__errored__;
                }
                else
                    vm.errors.push(result);
            }
            catch (E) { }
        };
        UIValidationRenderer.prototype.remove = function (element, result) {
            element.classList.remove('ui-invalid');
            element.classList.add('ui-valid');
            try {
                var vm = element.au.controller.viewModel;
                var i = vm.errors.length;
                while (i--) {
                    var message = vm.errors[i];
                    if (message.id == result.id) {
                        vm.errors.splice(i, 1);
                        break;
                    }
                }
                if (vm.errors.length == 0) {
                    vm.errors = null;
                    vm.errored = [];
                    element.classList.remove('ui-invalid');
                    element.classList.add('ui-valid');
                }
            }
            catch (E) { }
        };
        UIValidationRenderer = __decorate([
            aurelia_framework_1.autoinject()
        ], UIValidationRenderer);
        return UIValidationRenderer;
    }());
    exports.UIValidationRenderer = UIValidationRenderer;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-markdown',["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "../../utils/ui-constants", "lodash"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, ui_constants_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIMarkdown = (function (_super) {
        __extends(UIMarkdown, _super);
        function UIMarkdown(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.dir = '';
            _this.rows = 15;
            _this.errors = null;
            _this.maxlength = 5000;
            _this.disabled = false;
            _this.readonly = false;
            _this.placeholder = '';
            _this.autoComplete = '';
            _this.info = '';
            _this.clear = false;
            _this.counter = false;
            _this.ignore = false;
            _this.help = false;
            _this.preview = false;
            _this.disableTools = false;
            _this.clear = element.hasAttribute('clear');
            _this.counter = element.hasAttribute('counter');
            return _this;
        }
        UIMarkdown.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
        };
        UIMarkdown.prototype.toolClicked = function (evt) {
            var _this = this;
            var btn;
            if (!(btn = getParentByTag(evt.target, 'ui-button')))
                return;
            if (!(btn = btn['dataset']["id"]))
                return;
            var val = this.value || '';
            var diff = 0, start = this.inputEl.selectionStart, end = this.inputEl.selectionEnd, sub = val.substr(start, end - start) || 'EditThis';
            switch (btn) {
                case 'h1':
                    diff = 3;
                    this.value = val.substr(0, start) + ("\n# " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h2':
                    diff = 4;
                    this.value = val.substr(0, start) + ("\n## " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h3':
                    diff = 5;
                    this.value = val.substr(0, start) + ("\n### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h4':
                    diff = 6;
                    this.value = val.substr(0, start) + ("\n#### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h5':
                    diff = 7;
                    this.value = val.substr(0, start) + ("\n##### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h6':
                    diff = 8;
                    this.value = val.substr(0, start) + ("\n###### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'b':
                    diff = 3;
                    this.value = val.substr(0, start) + (" " + sub + " ") + val.substr(end);
                    break;
                case 'i':
                    diff = 2;
                    this.value = val.substr(0, start) + (" _" + sub + "_ ") + val.substr(end);
                    break;
                case 's':
                    diff = 3;
                    this.value = val.substr(0, start) + (" ~~" + sub + "~~ ") + val.substr(end);
                    break;
                case 'a':
                    diff = 2;
                    this.value = val.substr(0, start) + (" [" + sub + "](Link_Url_Here) ") + val.substr(end);
                    break;
                case 'img':
                    diff = 3;
                    this.value = val.substr(0, start) + (" ![" + sub + "](Image_Url_Here) ") + val.substr(end);
                    break;
                case 'ul':
                    diff = 2;
                    sub = sub.replace(/^.+$/gm, function (t) { return "* " + t; });
                    this.value = val.substr(0, start) + (sub + "\n") + val.substr(end);
                    break;
                case 'ol':
                    var i = 1;
                    diff = 3;
                    sub = sub.replace(/^.+$/gm, function (t) { return (i++ == 1 ? '1.' : '*') + " " + t; });
                    this.value = val.substr(0, start) + (sub + "\n") + val.substr(end);
                    break;
                case 'help':
                    this.preview = false;
                    this.disableTools = this.help = !this.help;
                    break;
                case 'preview':
                    this.help = false;
                    this.disableTools = this.preview = !this.preview;
                    break;
            }
            this.inputEl.focus();
            if (sub == 'EditThis' && btn != 'preview' && btn != 'help')
                ui_event_1.UIEvent.queueTask(function () { return _this.inputEl.setSelectionRange(start + diff, start + diff + sub.length); });
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "autoComplete", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "info", void 0);
        UIMarkdown = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-markdown'),
            aurelia_framework_1.inlineView("<template class=\"ui-md-editor ui-input-wrapper\" dir.bind=\"dir\"><ui-toolbar start click.trigger=\"toolClicked($event)\">\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button data-id=\"h1\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H1</ui-button>\n  <ui-button data-id=\"h2\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H2</ui-button>\n  <ui-button data-id=\"h3\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H3</ui-button>\n  <ui-button data-id=\"h4\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H4</ui-button>\n  <ui-button data-id=\"h5\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H5</ui-button>\n  <ui-button data-id=\"h6\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H6</ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-bold\" data-id=\"b\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-italic\" data-id=\"i\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-strike\" data-id=\"s\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-link\" data-id=\"a\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-image\" data-id=\"img\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-list\" data-id=\"ul\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-number\" data-id=\"ol\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-help\" data-id=\"help\" disabled.bind=\"disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-preview\" data-id=\"preview\" disabled.bind=\"disabled||readonly\" square small light></ui-button>\n  </div></ui-toolbar>\n  <div class=\"ui-watermark ${preview?'preview':''} ${help?'help':''}\">\n  <div role=\"input\" class=\"ui-input-control ui-textarea\"><span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <textarea ref=\"inputEl\" value.bind=\"value\" rows.bind=\"rows\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    placeholder.bind=\"placeholder\" disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"></textarea>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"value.length + ' of ' + maxlength\"></span>\n  </div>\n\n  <div class='ui-md-preview ui-pad-all ui-markdown' show.bind=\"help\" dir=\"ltr\">\n  <h2 class=\"ui-small-caps ui-text-primary ui-strong\">Markdown Syntax</h2>\n  <hr/>\n  <p>Add a blank line to create a separate paragraph</p>\n  <hr/>\n  <p class=\"ui-text-primary\">Headers</p>\n\n  <div>\n      <span>H1 <code class=\"ui-selectable\"># Header</code> <h1 class=\"ui-inline\">Header</h1></span>\n      <br/>\n      <span>H2 <code class=\"ui-selectable\">## Header</code> <h2 class=\"ui-inline\">Header</h2></span>\n      <br/>\n      <span>H3 <code class=\"ui-selectable\">### Header</code> <h3 class=\"ui-inline\">Header</h3></span>\n      <br/>\n      <span>H4 <code class=\"ui-selectable\">#### Header</code> <h4 class=\"ui-inline\">Header</h4></span>\n      <br/>\n      <span>H5 <code class=\"ui-selectable\">##### Header</code> <h5 class=\"ui-inline\">Header</h5></span>\n      <br/>\n      <span>H6 <code class=\"ui-selectable\">###### Header</code> <h6 class=\"ui-inline\">Header</h6></span>\n      <br/>\n  </div>\n\n  <p class=\"ui-text-primary\">Styles</p>\n\n  <p>\n      <span>Italic <code class=\"ui-selectable\">_Italic Text_</code>: <i>Italic</i></span>\n      <br/>\n      <span>Bold <code class=\"ui-selectable\">__Bold Text__</code>: <b>Bold</b></span>\n      <br/>\n      <span>Strikethrough <code class=\"ui-selectable\">~~Strikethrough~~</code>: <del>Strikethrough</del></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Links</p>\n\n  <p>\n      <code class=\"ui-selectable\">[link text](link URL)</code>\n      <br/>\n      <em>any url will be converted to a link, use the above to display custom text instead of url in the link.</em>\n      <br/>\n      <span>eg. <code>&lt;a href=\"url\">Link Text&lt;/a></code></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Images</p>\n\n  <p>\n      <code class=\"ui-selectable\">![alt text](image URL)</code>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Lists</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <br/>\n      <span><code class=\"ui-selectable\">1. list item</code>: 1. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 2. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 3. list item</span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Tables</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">|Head|Head |Head|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|:---|:---:|---:|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <br/>\n      <table>\n          <thead>\n              <tr>\n                  <th class=\"ui-text-start\">Head</th>\n                  <th class=\"ui-text-center\">Head</th>\n                  <th class=\"ui-text-end\">Head</th>\n              </tr>\n          </thead>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n      </table>\n  </p>\n  <br/>\n  <br/></div>\n\n  <div class=\"ui-md-preview ui-pad-all ui-markdown\" dir.bind=\"dir\" show.bind=\"preview\" innerhtml.bind=\"value | markdown\" dir.bind=\"dir\"></div>\n\n  </div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UIMarkdown);
        return UIMarkdown;
    }(ui_input_1.UIBaseInput));
    exports.UIMarkdown = UIMarkdown;
    var UILanguage = (function () {
        function UILanguage(element) {
            this.element = element;
            this.value = '';
            this.dir = '';
            this.errors = null;
            this.disabled = false;
            this.readonly = false;
            this.info = '';
            this.placeholder = '';
            this.errored = [];
            this.show = false;
            this.selectedList = [];
            this.availableList = [];
        }
        UILanguage.prototype.bind = function (bindingContext, overrideContext) {
            this.languagesChanged(this.languages);
        };
        UILanguage.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-list-container') == _this.element) {
                    clearTimeout(_this.closing);
                    return true;
                }
                _this.closeDropdown();
            });
        };
        UILanguage.prototype.detached = function () {
            this.tether.dispose();
            this.obMouseup.dispose();
        };
        UILanguage.prototype.valueChanged = function (newValue) {
            var l = _.find(this.selectedList, ['id', newValue]) || {};
            this.dir = (l.rtl ? 'rtl' : 'ltr');
            this.elValue = l.name;
        };
        UILanguage.prototype.languagesChanged = function (newValue) {
            var _this = this;
            this.selectedList = [];
            this.availableList = _.clone(ui_constants_1.UIConstants.Languages);
            if (!isEmpty(newValue)) {
                var langs = isString(newValue) ? newValue.split(',') : newValue;
                _.forEach(langs, function (l) { return _this.selectedList = _this.selectedList.concat(_.remove(_this.availableList, ['id', l])); });
                this.value = langs[0];
            }
        };
        UILanguage.prototype.fireEvent = function (evt) {
            var _this = this;
            evt.stopPropagation();
            var el = getParentByClass(this.element, 'ui-input-group');
            if (evt.type === 'focus') {
                this.inputEl.select();
                this.element.classList.add('ui-focus');
                if (el)
                    el.classList.add('ui-focus');
                if (this.show)
                    this.openDropdown();
            }
            if (evt.type === 'blur') {
                this.element.classList.remove('ui-focus');
                if (el)
                    el.classList.remove('ui-focus');
                this.closing = setTimeout(function () { return _this.closeDropdown(); }, 500);
            }
            ui_event_1.UIEvent.fireEvent(evt.type, this.element, this.value);
        };
        UILanguage.prototype.hilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            evt.target.classList.add('ui-hilight');
        };
        UILanguage.prototype.unhilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
        };
        UILanguage.prototype.scrollIntoView = function () {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h == null)
                h = this.dropdown.querySelector('.ui-list-item.ui-selected');
            this.dropdown.scrollTop = (h !== null ? h.offsetTop - (this.dropdown.offsetHeight / 2) : 0);
        };
        UILanguage.prototype.openDropdown = function () {
            if (this.readonly || this.disabled)
                return true;
            this.dropdown.isOpen = true;
            this.dropdown.classList.add('ui-open');
            this.tether.position();
            this.scrollIntoView();
        };
        UILanguage.prototype.closeDropdown = function () {
            if (!this.dropdown)
                return;
            this.dropdown.isOpen = false;
            this.dropdown.classList.remove('ui-open');
        };
        UILanguage.prototype.toggleDropdown = function (evt, forceClose) {
            if (forceClose === void 0) { forceClose = false; }
            evt.stopPropagation();
            evt.cancelBubble = true;
            this.dropdown.isOpen ? this.closeDropdown() : this.openDropdown();
        };
        UILanguage.prototype.addLanguage = function (model) {
            ui_event_1.UIEvent.fireEvent('add', this.element, model);
            this.selectedList = this.selectedList.concat(_.remove(this.availableList, ['id', model.id]));
            this.value = model.id;
            this.closeDropdown();
        };
        UILanguage.prototype.removeLanguage = function (model) {
            ui_event_1.UIEvent.fireEvent('remove', this.element, model);
            this.availableList = this.availableList.concat(_.remove(this.selectedList, ['id', model.id]));
            this.value = this.selectedList.length > 0 ? this.selectedList[0].id : '';
        };
        UILanguage.prototype.fireSelect = function (model) {
            this.value = model.id;
            this.closeDropdown();
            this.unhilightItem(null);
            ui_event_1.UIEvent.fireEvent('change', this.element, model);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "info", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "languages", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "placeholder", void 0);
        UILanguage = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-list\"><div role=\"input\" class=\"ui-input-control\">\n  <span class=\"ui-input-addon\" click.trigger=\"openDropdown($event, show=true, inputEl.focus())\"><ui-glyph glyph=\"glyph-language\"></ui-glyph></span>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type.bind=\"type\" value.bind=\"elValue\" size=\"10\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    change.trigger=\"fireEvent($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"true\" mouseup.trigger=\"![$event.stopPropagation(), show=true, openDropdown()]\"/>\n  <span class=\"ui-input-addon ui-dropdown-handle\" mouseup.trigger=\"![show=true, toggleDropdown($event)]\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n\n  <div class=\"ui-list-container ui-floating\" ref=\"dropdown\">\n    <div class=\"ui-list-group\" t=\"Selected\">Selected</div>\n    <div class=\"ui-lang-item\" repeat.for=\"item of selectedList | sort:'id'\">\n      <div class=\"ui-list-item ${item.id==value?'ui-selected':''} ${item.disabled?'ui-disabled':''}\"\n      mouseover.delegate=\"hilightItem($event)\" click.trigger=\"fireSelect(item)\"><ui-glyph glyph=\"glyph-invalid\" class=\"ui-text-warning\" if.bind=\"errored.indexOf(item.id)>-1\"></ui-glyph> ${item.name}</div>\n      <a click.trigger=\"removeLanguage(item)\"><ui-glyph class=\"ui-text-danger ui-font-big\" glyph=\"glyph-tree-collapse\"></ui-glyph></a>\n    </div>\n    <div class=\"ui-list-group\" t=\"Available\">Available</div>\n    <div class=\"ui-lang-item\" repeat.for=\"item of availableList | sort:'id'\" click.trigger=\"addLanguage(item)\">\n      <div class=\"ui-list-item ${item.disabled?'ui-disabled':''}\" innerhtml.bind=\"item.name\"\n      mouseover.delegate=\"hilightItem($event)\"></div>\n      <ui-glyph class=\"ui-text-info ui-font-big\" glyph=\"glyph-tree-expand\"></ui-glyph>\n    </div>\n    </template>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-language'),
            __metadata("design:paramtypes", [Element])
        ], UILanguage);
        return UILanguage;
    }());
    exports.UILanguage = UILanguage;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-input',["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIBaseInput = (function () {
        function UIBaseInput() {
            this.value = '';
            this.disabled = false;
            this.readonly = false;
            this.isDisabled = false;
        }
        UIBaseInput.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            this.element['focus'] = function () { return _this.focus(); };
            this.disabledChanged(this.disabled);
            this.readonlyChanged(this.readonly);
        };
        UIBaseInput.prototype.disabledChanged = function (newValue) {
            this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
        };
        UIBaseInput.prototype.readonlyChanged = function (newValue) {
            this.element.classList[(this.readonly = !!newValue) ? 'add' : 'remove']('ui-readonly');
        };
        UIBaseInput.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIBaseInput.prototype.clearInput = function () {
            this.value = '';
            this.inputEl.focus();
            ui_event_1.UIEvent.fireEvent('input', this.element, this.value);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIBaseInput.prototype.focus = function () {
            this.inputEl.focus();
        };
        UIBaseInput.prototype.fireEvent = function (evt) {
            evt.stopPropagation();
            var el = getParentByClass(this.element, 'ui-input-group');
            if (evt.type === 'focus') {
                this.inputEl.select();
                this.element.classList.add('ui-focus');
                if (el)
                    el.classList.add('ui-focus');
            }
            if (evt.type === 'blur') {
                if (getParentByClass(document.activeElement, 'ui-input-group'))
                    return;
                this.element.classList.remove('ui-focus');
                if (el)
                    el.classList.remove('ui-focus');
            }
            ui_event_1.UIEvent.fireEvent(evt.type, this.element, this.value);
        };
        return UIBaseInput;
    }());
    exports.UIBaseInput = UIBaseInput;
    var UIInput = (function (_super) {
        __extends(UIInput, _super);
        function UIInput(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.dir = '';
            _this.width = 'auto';
            _this.errors = null;
            _this.maxlength = 1000;
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
            _this.placeholder = '';
            _this.type = 'text';
            _this.clear = false;
            _this.counter = false;
            _this.clear = element.hasAttribute('clear');
            _this.counter = element.hasAttribute('counter');
            if (element.hasAttribute('url'))
                _this.type = 'url';
            if (element.hasAttribute('file'))
                _this.type = 'file';
            if (element.hasAttribute('email'))
                _this.type = 'email';
            if (element.hasAttribute('number') || element.hasAttribute('number.bind'))
                _this.type = 'number';
            if (element.hasAttribute('decimal') || element.hasAttribute('decimal.bind'))
                _this.type = 'number';
            if (element.hasAttribute('password'))
                _this.type = 'password';
            return _this;
        }
        UIInput.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
            if (!isNaN(this.number))
                this.numberChanged(this.number);
            if (!isNaN(this.decimal))
                this.decimalChanged(this.decimal);
            if (this.element.hasAttribute('readonly'))
                this.readonly = true;
            if (this.element.hasAttribute('disabled'))
                this.isDisabled = this.disabled = true;
        };
        UIInput.prototype.valueChanged = function (newValue) {
            if (this.type === 'number') {
                var num = parseFloat(newValue);
                this.decimal = this.number = isNaN(num) ? null : num;
                if (!this.number && this.number !== 0) {
                    this.value = '';
                }
            }
        };
        UIInput.prototype.numberChanged = function (newValue) {
            this.value = (!newValue && newValue !== 0) ? '' : newValue;
        };
        UIInput.prototype.decimalChanged = function (newValue) {
            this.value = (!newValue && newValue !== 0) ? '' : newValue;
        };
        UIInput.prototype.fireEvent = function (evt) {
            if (evt.type === 'input') {
                if (this.type === 'email')
                    this.value = this.value.toLowerCase();
            }
            _super.prototype.fireEvent.call(this, evt);
        };
        UIInput.prototype.checkInput = function (evt) {
            evt.stopPropagation();
            var code = evt.keyCode || evt.which;
            if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8)
                return true;
            if (code == 13)
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element);
            if (this.type == 'email')
                return /[a-zA-Z0-9\@\-\.\_\&\+\$]/.test(String.fromCharCode(code));
            if (this.type == 'url')
                return /[a-zA-Z0-9\/\-\.\_\?\#\%\=\$\;\:\{\[\]\}\&\+]/.test(String.fromCharCode(code));
            if (this.type == 'number') {
                return /[0-9\.\-]/.test(String.fromCharCode(code));
            }
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIInput.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIInput.prototype, "number", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIInput.prototype, "decimal", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInput.prototype, "placeholder", void 0);
        UIInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\" css.bind=\"{width: width}\"><div role=\"input\" class=\"ui-input-control\" dir.bind=\"dir\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type.bind=\"type\" value.bind=\"value\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\" step=\"any\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keypress.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\" size=\"1\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"maxlength - value.length\"></span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-input'),
            __metadata("design:paramtypes", [Element])
        ], UIInput);
        return UIInput;
    }(UIBaseInput));
    exports.UIInput = UIInput;
    var UIFileInput = (function () {
        function UIFileInput(element) {
            this.element = element;
            this.maxFiles = 10;
            this.fileTypes = '';
            this.files = [];
            this.dragging = false;
        }
        UIFileInput.prototype.attached = function () {
            this.files = [];
            this.inputEl.value = '';
            this.inputEl.draggedFiles = this.files;
        };
        UIFileInput.prototype.dragEnter = function ($event) {
            this.dragging = true;
            $event.preventDefault();
            return false;
        };
        UIFileInput.prototype.dragExit = function ($event) {
            this.dragging = false;
        };
        UIFileInput.prototype.drop = function ($event) {
            this.dragging = false;
            $event.preventDefault();
            var dt = $event.dataTransfer;
            var files = dt.files;
            for (var i = 0; i < files.length; i++) {
                var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.FileTypes[files[i].type] || 'txt' };
                if (this.files.length == this.maxFiles)
                    this.files.splice(0, 1);
                this.files.push(f);
            }
            ui_event_1.UIEvent.fireEvent('change', this.element, this.files.length);
        };
        UIFileInput.prototype.fileChoose = function (evt) {
            evt.stopPropagation();
            var files = this.inputEl.files;
            for (var i = 0; i < files.length; i++) {
                var f = { file: files[i], name: files[i].name, size: files[i].size || 0, ext: window.FileTypes[files[i].type] || 'txt' };
                if (this.files.length == this.maxFiles)
                    this.files.splice(0, 1);
                this.files.push(f);
            }
            ui_event_1.UIEvent.fireEvent('change', this.element, this.files.length);
        };
        UIFileInput.prototype.remove = function (index) {
            this.files.splice(index, 1);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.files.length);
        };
        UIFileInput.FILE_IMAGES = 'png,jpg,jpeg,tiff';
        UIFileInput.FILE_DOCS = 'doc,docx,xls,xlsx,ppt,pptx,csv,rtf,txt,pdf';
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFileInput.prototype, "maxFiles", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFileInput.prototype, "fileTypes", void 0);
        UIFileInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-file-input\">\n  <div class=\"ui-control-wrapper\">\n    <div class=\"ui-file-drop-zone ${dragging?'dragging':''}\" ref=\"dropZone\" click.trigger=\"inputEl.click()\"\n      dragover.trigger=\"dragEnter($event)\" dragleave.trigger=\"dragExit($event)\" drop.trigger=\"drop($event)\">\n    <span><i class=\"fi-ui-upload-white\"></i> Drop files here<br/>or<br/>click to browse</span>\n    </div>\n    <input type=\"file\" ref=\"inputEl\" class=\"ui-file-input-el\" change.trigger=\"fileChoose($event)\" />\n    <div class=\"ui-file-list\">\n      <p repeat.for=\"file of files\" class=\"ui-row ui-row-h ui-nowrap ui-align-center\">\n      <a click.trigger=\"remove($index)\"><ui-glyph glyph=\"glyph-dialog-close\" class=\"ui-text-danger\"></ui-glyph></a>\n      <span class=\"ui-row ui-row-h ui-nowrap ui-align-center\"><ui-glyph glyph=\"glyph-icon-file\" class=\"ui-text-muted ui-font-large\"></ui-glyph><span>${file.name}<br/>(<small innerhtml.bind=\"file.size | number:'0.00b'\"></small>)</span></span></p>\n    </div>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-file'),
            __metadata("design:paramtypes", [Element])
        ], UIFileInput);
        return UIFileInput;
    }());
    exports.UIFileInput = UIFileInput;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/data/ui-datamodel',["require", "exports", "aurelia-framework", "aurelia-logging", "aurelia-metadata", "lodash"], function (require, exports, aurelia_framework_1, aurelia_logging_1, aurelia_metadata_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDataModel = (function () {
        function UIDataModel(id) {
            this.busy = false;
            this.loaded = false;
            this.idProperty = 'id';
            this.metadata = aurelia_metadata_1.metadata.get(aurelia_metadata_1.metadata.properties, Object.getPrototypeOf(this));
            Object.defineProperties(this, this.metadata.propertyDefs);
            this.metadata.original = _.cloneDeep(this.serialize());
            this.metadata.updated = _.cloneDeep(this.serialize());
            Object.defineProperties(this, {
                id: {
                    enumerable: true,
                    writable: true
                },
                apiUrl: {
                    enumerable: false,
                    writable: true
                },
                idProperty: {
                    enumerable: false,
                    writable: true
                },
                loaded: {
                    enumerable: false
                },
                busy: {
                    enumerable: false
                },
                logger: {
                    value: aurelia_logging_1.getLogger(this.constructor.name),
                    enumerable: false
                },
                metadata: {
                    enumerable: false
                }
            });
            this.logger.info('Model created');
            if (id)
                this.get(id);
        }
        UIDataModel.prototype.get = function (id) {
            var _this = this;
            if (!this.apiUrl)
                return Promise.reject({ errorCode: 'AUF-DM:000', message: "API route required" });
            ;
            return this.callPreHook('preGet', id)
                .then(function (result) {
                if (result !== false) {
                    return _this.doGet(id);
                }
                Promise.reject({ errorCode: 'AUF-DM:001', message: "Get rejected" });
            }).then(function (response) { return _this.postGet(response); });
        };
        UIDataModel.prototype.save = function () {
            var _this = this;
            if (!this.apiUrl)
                return Promise.reject({ errorCode: 'AUF-DM:000', message: "API route required" });
            return this.callPreHook('preSave')
                .then(function (result) {
                if (result !== false) {
                    if (_this.loaded)
                        return _this.doPut();
                    else
                        return _this.doPost();
                }
                Promise.reject({ errorCode: 'AUF-DM:002', message: "Save rejected" });
            }).then(function (response) {
                _this.loaded = true;
                _this.deserialize(_this.serialize());
                _this.postSave(response);
            });
        };
        UIDataModel.prototype.delete = function () {
            var _this = this;
            if (!this.apiUrl)
                return Promise.reject({ errorCode: 'AUF-DM:000', message: "API route required" });
            ;
            if (!this.loaded)
                return Promise.reject({ errorCode: 'AUF-DM:009', message: "Unknown id for model object" });
            ;
            return this.callPreHook('preDelete')
                .then(function (result) {
                if (result !== false) {
                    return _this.doDelete();
                }
                Promise.reject({ errorCode: 'AUF-DM:003', message: "Delete rejected" });
            }).then(function (response) { return _this.postDelete(response); });
        };
        UIDataModel.prototype.preGet = function () { };
        UIDataModel.prototype.preSave = function () { };
        UIDataModel.prototype.preDelete = function () { };
        UIDataModel.prototype.postGet = function (response) { };
        UIDataModel.prototype.postSave = function (response) { };
        UIDataModel.prototype.postDelete = function (response) { };
        UIDataModel.prototype.update = function () {
            this.metadata.updated = _.cloneDeep(this.serialize());
        };
        UIDataModel.prototype.reset = function () {
            this.metadata.updated = Object.assign({}, this.metadata.original);
            this.discard();
        };
        UIDataModel.prototype.discard = function () {
            var _this = this;
            this.metadata.dirtyProps = [];
            var updated = _.cloneDeep(this.metadata.updated);
            this.metadata.serializableProps.forEach(function (prop) { return _this[prop] = updated[prop]; });
        };
        UIDataModel.prototype.serialize = function () {
            var _this = this;
            var POJO = {};
            this.metadata.serializableProps.forEach(function (prop) { return POJO[prop] = UIDataModel.serializeProperty(_this[prop]); });
            return POJO;
        };
        UIDataModel.prototype.deserialize = function (json) {
            var _this = this;
            this.loaded = true;
            this.metadata.original = _.cloneDeep(json);
            this.metadata.updated = _.cloneDeep(json);
            this.metadata.serializableProps.forEach(function (prop) { return _this[prop] = json[prop]; });
        };
        UIDataModel.serializeObject = function (o) {
            var _this = this;
            var _pojo = {};
            if (o instanceof UIDataModel) {
                return o.serialize();
            }
            else if (o instanceof Map) {
                o.forEach(function (obj, key) { return _pojo[key] = _this.serializeProperty(obj); });
            }
            else {
                Object.keys(o)
                    .forEach(function (key) { return _pojo[key] = _this.serializeProperty(o[key]); });
            }
            return _pojo;
        };
        UIDataModel.serializeProperty = function (p) {
            if (_.isObject(p)) {
                return this.serializeObject(p);
            }
            else if (_.isArray(p)) {
                return p.join(',');
            }
            else {
                return isEmpty(p) ? null : p;
            }
        };
        Object.defineProperty(UIDataModel.prototype, "isDirty", {
            get: function () {
                return !!this.metadata.dirtyProps.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIDataModel.prototype, "dirtyProps", {
            get: function () {
                var ret = {};
                this.metadata.dirtyProps.forEach(function (prop) { return ret[prop] = true; });
                return ret;
            },
            enumerable: true,
            configurable: true
        });
        UIDataModel.prototype.generateId = function () {
            return Math.round(Math.random() * new Date().getTime()).toString(18);
        };
        UIDataModel.prototype.propertyGetter = function (prop) {
            return function () {
                return this['_' + prop];
            };
        };
        UIDataModel.prototype.propertySetter = function (prop) {
            return function (v) {
                this['_' + prop] = v;
                this.updateDirty(prop, v);
                return v;
            };
        };
        UIDataModel.prototype.updateDirty = function (prop, value) {
            var hasDirty = !!(~this.metadata.dirtyProps.indexOf(prop));
            var isDirty = this.metadata.original[prop] !== (value === '' ? null : value);
            if (!hasDirty && isDirty)
                this.metadata.dirtyProps.push(prop);
            if (hasDirty && !isDirty)
                this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
        };
        UIDataModel.prototype.callPreHook = function (hook, data) {
            var result = this[hook](data);
            if (result instanceof Promise) {
                return result;
            }
            if (result !== null && result !== undefined) {
                return Promise.resolve(result);
            }
            return Promise.resolve(true);
        };
        UIDataModel.prototype.doGet = function (id) {
        };
        UIDataModel.prototype.doPost = function () {
        };
        UIDataModel.prototype.doPut = function () {
        };
        UIDataModel.prototype.doDelete = function () {
        };
        UIDataModel.prototype.doUpdate = function () {
            this.id = this[this.idProperty] || this.generateId();
            this.metadata.dirtyProps = [];
            this.metadata.original = _.cloneDeep(this.serialize());
            this.metadata.updated = _.cloneDeep(this.serialize());
        };
        __decorate([
            aurelia_framework_1.computedFrom('metadata.dirtyProps.length'),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [])
        ], UIDataModel.prototype, "isDirty", null);
        __decorate([
            aurelia_framework_1.computedFrom('metadata.dirtyProps.length'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UIDataModel.prototype, "dirtyProps", null);
        return UIDataModel;
    }());
    exports.UIDataModel = UIDataModel;
    function serializable(defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return function (target, property) {
            if (!property)
                throw Error('Decorator should be used on property only!');
            var meta = aurelia_metadata_1.metadata.getOrCreateOwn(aurelia_metadata_1.metadata.properties, ModelMetadata, target);
            meta.serializableProps.push(property);
            meta.propertyDefs[property] = {
                get: target.propertyGetter(property),
                set: target.propertySetter(property),
                enumerable: true
            };
            meta.propertyDefs['_' + property] = {
                value: defaultValue,
                enumerable: false,
                writable: true
            };
        };
    }
    exports.serializable = serializable;
    var ModelMetadata = (function () {
        function ModelMetadata() {
            this.serializableProps = [];
            this.dirtyProps = [];
            this.observers = [];
            this.propertyDefs = {};
            this.updated = {};
            this.original = {};
        }
        return ModelMetadata;
    }());
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/utils/ui-application',["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-logging", "./ui-utils", "./ui-event", "./ui-constants"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_logging_1, ui_utils_1, ui_event_1, ui_constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIApplication = (function () {
        function UIApplication(router) {
            this.router = router;
            this.isBusy = false;
            this.constants = ui_constants_1.UIConstants;
            this.sharedState = {};
            this.logger = aurelia_logging_1.getLogger('UIApplication');
            this.logger.info('Initialized');
        }
        UIApplication.prototype.navigate = function (hash, options) {
            this.logger.info("navigate::" + hash);
            this.router.navigate(hash, options);
        };
        UIApplication.prototype.navigateTo = function (route, params, options) {
            if (params === void 0) { params = {}; }
            this.logger.info("navigateTo::" + route);
            this.router.navigateToRoute(route, params, options);
        };
        UIApplication.prototype.routeActive = function (route) {
            return route.isActive || route.href == location.hash ||
                location.hash.indexOf(route.config.redirect || 'QWER') > -1;
        };
        Object.defineProperty(UIApplication.prototype, "AuthUser", {
            get: function () {
                return this.authUser;
            },
            set: function (v) {
                this.authUser = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIApplication.prototype, "AuthToken", {
            get: function () {
                return this.authToken;
            },
            set: function (v) {
                this.authToken = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIApplication.prototype, "Authenticated", {
            get: function () {
                return this.autenticated;
            },
            set: function (v) {
                this.autenticated = v;
            },
            enumerable: true,
            configurable: true
        });
        UIApplication.prototype.login = function (user, route) {
            this.AuthUser = user.username;
            this.AuthToken = user.token;
            this.Authenticated = true;
            this.persist('AppUsername', user.username);
            this.persist('AppToken', user.remember ? user.token : null);
            this.navigateTo(route || 'home');
            ui_event_1.UIEvent.broadcast('auf:login');
        };
        UIApplication.prototype.logout = function () {
            this.AuthUser = null;
            this.AuthToken = null;
            ui_event_1.UIEvent.broadcast('auf:logout');
            this.persist('AppToken', null);
            this.Authenticated = false;
            this.navigateTo('login');
        };
        UIApplication.prototype.shared = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (value === '§') {
                return this.sharedState[key];
            }
            else if (value === null) {
                delete this.sharedState[key];
            }
            else {
                this.sharedState[key] = value;
            }
            return null;
        };
        UIApplication.prototype.session = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (window.sessionStorage) {
                if (value === '§') {
                    return JSON.parse(window.sessionStorage.getItem(ui_constants_1.UIConstants.AppKey + ':' + key));
                }
                else if (value === null) {
                    window.sessionStorage.removeItem(ui_constants_1.UIConstants.AppKey + ':' + key);
                }
                else {
                    window.sessionStorage.setItem(ui_constants_1.UIConstants.AppKey + ':' + key, JSON.stringify(value));
                }
            }
            return null;
        };
        UIApplication.prototype.clearSession = function () {
            if (window.sessionStorage)
                window.sessionStorage.clear();
        };
        UIApplication.prototype.persist = function (key, value) {
            if (value === void 0) { value = '§'; }
            if (window.localStorage) {
                if (value === '§') {
                    return JSON.parse(window.localStorage.getItem(ui_constants_1.UIConstants.AppKey + ':' + key));
                }
                else if (value === null) {
                    window.localStorage.removeItem(ui_constants_1.UIConstants.AppKey + ':' + key);
                }
                else {
                    window.localStorage.setItem(ui_constants_1.UIConstants.AppKey + ':' + key, JSON.stringify(value));
                }
            }
            return null;
        };
        UIApplication.prototype.clearPersist = function () {
            if (window.localStorage)
                window.localStorage.clear();
        };
        UIApplication.prototype.info = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.info.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.warn = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.warn.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.debug = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.debug.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.error = function (tag, msg) {
            var rest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                rest[_i - 2] = arguments[_i];
            }
            this.logger.error.apply(this.logger, [tag + "::" + msg].concat(rest));
        };
        UIApplication.prototype.toast = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            if (container)
                config.container = container;
            ui_utils_1.UIUtils.toast(config);
        };
        UIApplication.prototype.toastSuccess = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            config.theme = 'success';
            config.glyph = config.glyph || 'glyph-alert-exclaim';
            if (container)
                config.container = container;
            ui_utils_1.UIUtils.toast(config);
        };
        UIApplication.prototype.toastError = function (config, container) {
            if (typeof config === 'string')
                config = { message: config };
            config.theme = 'danger';
            config.glyph = config.glyph || 'glyph-alert-error';
            if (container)
                config.container = container;
            ui_utils_1.UIUtils.toast(config);
        };
        UIApplication.prototype.alert = function (config) {
            return ui_utils_1.UIUtils.alert(config);
        };
        UIApplication.prototype.confirm = function (config) {
            return ui_utils_1.UIUtils.confirm(config);
        };
        UIApplication.prototype.prompt = function (config) {
            if (typeof config === 'string')
                config = { message: config };
            return ui_utils_1.UIUtils.prompt(config);
        };
        UIApplication = __decorate([
            aurelia_framework_1.singleton(),
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_router_1.Router])
        ], UIApplication);
        return UIApplication;
    }());
    exports.UIApplication = UIApplication;
    var AuthInterceptor = (function () {
        function AuthInterceptor(appState) {
            this.appState = appState;
            this.logger = aurelia_logging_1.getLogger('AuthInterceptor');
            this.logger.info('Initialized');
            ui_event_1.UIEvent.subscribe('auf:unauthorized', function () { return appState.navigateTo('login', { status: 401 }); });
        }
        AuthInterceptor.prototype.run = function (routingContext, next) {
            if (routingContext.getAllInstructions()
                .some(function (i) { return i.config.auth; })) {
                if (!this.appState.Authenticated) {
                    this.logger.warn('Not authenticated');
                    var url = routingContext.router.generate('login', { status: 401 });
                    this.appState.Authenticated = false;
                    this.appState.session('AppCurrentRoute', [routingContext.config.route, routingContext.params]);
                    this.appState.session('AppCurrentFragment', routingContext.fragment);
                    return next.reject(new aurelia_router_1.Redirect(url));
                }
            }
            return next();
        };
        AuthInterceptor = __decorate([
            aurelia_framework_1.singleton(),
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [UIApplication])
        ], AuthInterceptor);
        return AuthInterceptor;
    }());
    exports.AuthInterceptor = AuthInterceptor;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/utils/ui-dialog',["require", "exports", "aurelia-framework", "./ui-event", "./ui-utils", "lodash", "aurelia-metadata", "aurelia-framework"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1, _, aurelia_metadata_1, aurelia_framework_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDialogService = (function () {
        function UIDialogService(compiler, container, resources, compositionEngine, templatingEngine) {
            this.compiler = compiler;
            this.container = container;
            this.resources = resources;
            this.compositionEngine = compositionEngine;
            this.templatingEngine = templatingEngine;
            this.windows = [];
            this.initialized = false;
            this.__isDragging = false;
            this.__isResizing = false;
            this.__startX = 0;
            this.__startY = 0;
        }
        UIDialogService.prototype.initialize = function () {
            var _this = this;
            if (!this.initialized) {
                this.initialized = true;
                if (ui_utils_1.UIUtils.dialogContainer) {
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('close', function (e) { return _this.closeDialog(e.detail); });
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('collapse', function (e) { return _this.taskClick(e.detail, true); });
                    ui_utils_1.UIUtils.dialogContainer.addEventListener('mousedown', function (e) { return _this.moveStart(e); });
                }
                if (ui_utils_1.UIUtils.taskbarContainer)
                    ui_utils_1.UIUtils.taskbarContainer.addEventListener('click', function (e) { return _this.taskClick((getParentByTag(e.target, 'button') || e.target)['window']); });
            }
        };
        UIDialogService.prototype.makeActive = function (id) {
            var win = _.find(this.windows, ['id', id]);
            if (win)
                this.changeActive(win);
            return !!win;
        };
        UIDialogService.prototype.show = function (vm, model) {
            var _this = this;
            this.initialize();
            var instruction = {
                viewModel: vm,
                container: this.container,
                childContainer: this.container.createChild(),
                model: model
            };
            return this.getViewModel(instruction)
                .then(function (newInstruction) { return _this.invokeLifecycle(newInstruction.viewModel, 'canActivate', model); })
                .then(function (canActivate) {
                return canActivate !== false ?
                    _this.compositionEngine.createController(instruction) :
                    Promise.reject(new Error('canActivate rejected'));
            })
                .then(function (controller) {
                controller.automate();
                var view = _this.createDialog(controller.viewModel);
                var childSlot = new aurelia_framework_2.ViewSlot(view['fragment'].querySelector('.ui-dialog'), true);
                childSlot.add(controller.view);
                childSlot.viewModel = controller.viewModel;
                var slot = new aurelia_framework_2.ViewSlot(ui_utils_1.UIUtils.dialogContainer, true);
                slot.add(view);
                (controller.viewModel['controller'] = controller).attached();
                _this.initializeDialog(controller.viewModel);
            });
        };
        UIDialogService.prototype.close = function (id, force) {
            var win = _.find(this.windows, ['id', id]);
            if (win)
                this.closeDialog(win, force);
            return !!win;
        };
        UIDialogService.prototype.closeAll = function () {
            var _this = this;
            _.forEach(this.windows, function (win) { return _this.closeDialog(win, true); });
        };
        UIDialogService.prototype.createDialog = function (vm) {
            if (!(vm instanceof UIDialog))
                throw new Error("ViewModel must extend from UIDialog");
            var viewFactory = this.compiler.compile("<template><div class=\"${modal?'ui-modal':''} au-animate ui-dialog-wrapper\" ref=\"dialogWrapperEl\">\n      <div class=\"ui-dialog ${isActive?'ui-active':'ui-inactive'}\" ref=\"dialogEl\" css.bind=\"posCurrent\">\n      <ui-header theme.bind=\"theme\">\n        <ui-header-title glyph=\"${glyph}\">${title}</ui-header-title>\n        <ui-header-tool minimize click.trigger=\"collapse($event)\" if.bind=\"minimizable && !modal\"></ui-header-tool>\n        <ui-header-tool glyph=\"${isMaximized?'glyph-dialog-restore':'glyph-dialog-expand'}\" click.trigger=\"expand($event)\" if.bind=\"maximizable\"></ui-header-tool>\n        <ui-header-tool close click.trigger=\"close($event)\" if.bind=\"closable\"></ui-header-tool>\n      </ui-header>\n      <ui-glyph class=\"ui-resizer\" glyph=\"glyph-dialog-resize\" if.bind=\"resizable\"></ui-glyph>\n      </div></div></template>", this.resources);
            var view = viewFactory.create(this.container);
            view.bind(vm);
            return view;
        };
        UIDialogService.prototype.initializeDialog = function (dialog) {
            this.windows.push(dialog);
            if (!dialog.modal) {
                dialog.taskButtonEl = document.createElement('button');
                dialog.taskButtonEl.classList.add('ui-active');
                dialog.taskButtonEl.innerHTML = '<ui-glyph class="${glyph}" glyph="${glyph}" if.bind="glyph"></ui-glyph><span class="ui-label">${title}</span>';
                dialog.taskButtonEl.window = dialog;
                if (ui_utils_1.UIUtils.taskbarContainer) {
                    ui_utils_1.UIUtils.taskbarContainer.appendChild(dialog.taskButtonEl);
                    this.templatingEngine.enhance({ element: dialog.taskButtonEl, bindingContext: dialog });
                }
                this.changeActive(dialog);
            }
        };
        UIDialogService.prototype.closeDialog = function (dialog, force) {
            var _this = this;
            if (force === void 0) { force = false; }
            if (!dialog)
                return;
            this.invokeLifecycle(dialog, 'canDeactivate', force)
                .then(function (canDeactivate) {
                if (force || canDeactivate !== false) {
                    dialog.controller.detached();
                    dialog.controller.unbind();
                    aurelia_framework_1.DOM.removeNode(dialog.dialogWrapperEl);
                    _.remove(_this.windows, ['uniqId', dialog.uniqId]);
                    if (!dialog.modal) {
                        aurelia_framework_1.DOM.removeNode(dialog.taskButtonEl);
                        _this.nextActive();
                    }
                    dialog.deactivate();
                }
            });
        };
        UIDialogService.prototype.getViewModel = function (instruction) {
            if (typeof instruction.viewModel === 'function') {
                instruction.viewModel = aurelia_metadata_1.Origin.get(instruction.viewModel).moduleId;
            }
            if (typeof instruction.viewModel === 'string') {
                return this.compositionEngine.ensureViewModel(instruction);
            }
            return Promise.resolve(instruction);
        };
        UIDialogService.prototype.invokeLifecycle = function (instance, name, model) {
            if (instance && typeof instance[name] === 'function') {
                var result = instance[name](model);
                if (result instanceof Promise) {
                    return result;
                }
                if (result !== null && result !== undefined) {
                    return Promise.resolve(result);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        };
        UIDialogService.prototype.changeActive = function (dialog) {
            if (!isEmpty(this.activeWin))
                this.activeWin.makeInactive();
            (this.activeWin = dialog).makeActive();
        };
        UIDialogService.prototype.taskClick = function (dialog, forceMin) {
            var _this = this;
            if (forceMin === void 0) { forceMin = false; }
            if (!dialog)
                return;
            if (dialog.isMinimized === false && dialog.isActive === true || forceMin) {
                dialog.minimize();
                if (dialog.isActive)
                    ui_event_1.UIEvent.queueTask(function () { return _this.nextActive(); });
            }
            else {
                this.changeActive(dialog);
            }
        };
        UIDialogService.prototype.nextActive = function () {
            var nextActive;
            if (!isEmpty(nextActive = _.findLast(this.windows, ['isMinimized', false]))) {
                this.changeActive(nextActive);
            }
        };
        UIDialogService.prototype.moveStart = function ($event) {
            var _this = this;
            this.__dialog = getParentByClass($event.target, 'ui-dialog');
            if (this.__dialog === null || !this.__dialog.viewSlot)
                return;
            var dialog = this.__dialog.viewSlot.viewModel;
            if ($event.button != 0 || getParentByClass($event.target, 'ui-header-button') !== null) {
                return;
            }
            if (!dialog.modal)
                this.changeActive(dialog);
            if (getParentByClass($event.target, 'ui-resizer') === null &&
                getParentByClass($event.target, 'ui-header') === null) {
                return;
            }
            this.__isRtl = window.isRtl(ui_utils_1.UIUtils.dialogContainer);
            if (this.__isRtl && !this.__dialog.style.right) {
                this.__dialog.style.right = this.__dialog.style.left;
                this.__dialog.style.left = null;
            }
            if (!this.__isRtl && !this.__dialog.style.left) {
                this.__dialog.style.left = this.__dialog.style.right;
                this.__dialog.style.right = null;
            }
            this.__startX = ($event.x || $event.clientX);
            this.__startY = ($event.y || $event.clientY);
            this.__isDragging = true;
            this.__isResizing = $event.target.classList.contains('ui-resizer');
            if (this.__isResizing && !dialog.resizable) {
                this.__isDragging = false;
                this.__isResizing = false;
                return;
            }
            else if (!this.__isResizing && (!dialog.draggable || dialog.modal)) {
                this.__isDragging = false;
                this.__isResizing = false;
                return;
            }
            ui_utils_1.UIUtils.dialogContainer.addEventListener('mousemove', function (e) { return _this.move(e); });
            ui_utils_1.UIUtils.dialogContainer.addEventListener('mouseup', function () { return _this.moveEnd(); });
        };
        UIDialogService.prototype.moveEnd = function () {
            var _this = this;
            if (!this.__isDragging || this.__dialog == null) {
                return;
            }
            this.__dialog.classList.remove('ui-dragging');
            ui_utils_1.UIUtils.dialogContainer.classList.remove('ui-dragging');
            this.__isDragging = false;
            this.__dialog = null;
            ui_utils_1.UIUtils.dialogContainer.removeEventListener('mousemove', function (e) { return _this.move(e); });
            ui_utils_1.UIUtils.dialogContainer.removeEventListener('mouseup', function () { return _this.moveEnd(); });
        };
        UIDialogService.prototype.move = function ($event) {
            if (!this.__isDragging) {
                return;
            }
            if (!ui_utils_1.UIUtils.dialogContainer.classList.contains('ui-dragging')) {
                this.__dialog.classList.add('ui-dragging');
                ui_utils_1.UIUtils.dialogContainer.classList.add('ui-dragging');
            }
            var x = ($event.x || $event.clientX) - this.__startX;
            var y = ($event.y || $event.clientY) - this.__startY;
            x = (this.__isRtl ? -1 : 1) * x;
            var t = convertToPx(this.__dialog.style.top, this.__dialog);
            var l = convertToPx(this.__dialog.style[this.__isRtl ? 'right' : 'left'], this.__dialog);
            var w = convertToPx(this.__dialog.style.width, this.__dialog);
            var h = convertToPx(this.__dialog.style.height, this.__dialog);
            var pw = ui_utils_1.UIUtils.dialogContainer.offsetWidth;
            var ph = ui_utils_1.UIUtils.dialogContainer.offsetHeight;
            if (!this.__isResizing) {
                if (l + x < 0) {
                    x = 0;
                    l = 0;
                }
                if (t + y < 0) {
                    y = 0;
                    t = 0;
                }
                if (l + x + w + 16 > pw) {
                    x = 0;
                    l = pw - w - 16;
                }
                if (t + y + h + 54 > ph) {
                    y = 0;
                    t = ph - h - 54;
                }
                this.__dialog.style.top = (t + y) + 'px';
                this.__dialog.style[this.__isRtl ? 'right' : 'left'] = (l + x) + 'px';
            }
            else {
                if (l + x + w + 16 > pw)
                    x = 0;
                if (t + y + h + 54 > ph)
                    y = 0;
                this.__dialog.style.width = (w + x) + 'px';
                this.__dialog.style.height = (h + y) + 'px';
            }
            this.__startX = x !== 0 ? ($event.x || $event.clientX) : this.__startX;
            this.__startY = y !== 0 ? ($event.y || $event.clientY) : this.__startY;
        };
        UIDialogService = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_2.singleton(),
            __metadata("design:paramtypes", [aurelia_framework_2.ViewCompiler,
                aurelia_framework_2.Container,
                aurelia_framework_2.ViewResources,
                aurelia_framework_2.CompositionEngine,
                aurelia_framework_2.TemplatingEngine])
        ], UIDialogService);
        return UIDialogService;
    }());
    exports.UIDialogService = UIDialogService;
    var UIDialog = (function () {
        function UIDialog() {
            this.uniqId = "ui-win-" + UIDialog_1.seed++;
            this.isActive = true;
            this.isMaximized = false;
            this.isMinimized = false;
            this.posCurrent = {
                top: 0,
                'min-height': '100px', 'min-width': '300px',
                'max-height': 'none', 'max-width': 'none',
                height: '400px', width: '600px'
            };
            this.title = 'Dialog';
            this.theme = 'primary';
            this.width = '600px';
            this.height = '400px';
            this.minWidth = '300px';
            this.minHeight = '100px';
            this.maxWidth = 'none';
            this.maxHeight = 'none';
            this.modal = false;
            this.draggable = true;
            this.resizable = true;
            this.minimizable = true;
            this.maximizable = true;
            this.closable = true;
            this.maximized = false;
        }
        UIDialog_1 = UIDialog;
        UIDialog.prototype.bind = function (bindingContext, overrideContext) {
            var isRtl = window.isRtl(ui_utils_1.UIUtils.dialogContainer);
            var pw = ui_utils_1.UIUtils.dialogContainer.offsetWidth;
            var ph = ui_utils_1.UIUtils.dialogContainer.offsetHeight;
            this.posCurrent.width = this.width || this.minWidth || this.posCurrent.width;
            this.posCurrent.height = this.height || this.minHeight || this.posCurrent.height;
            this.posCurrent['min-width'] = this.minWidth || this.posCurrent['min-width'];
            this.posCurrent['min-height'] = this.minHeight || this.posCurrent['min-height'];
            this.posCurrent['max-width'] = this.maxWidth || this.posCurrent['max-width'];
            this.posCurrent['max-height'] = this.maxHeight || this.posCurrent['max-height'];
            if (!this.modal) {
                this.posCurrent.top = (UIDialog_1.posY = (UIDialog_1.posY + parseInt(this.posCurrent.height) + 32 > ph) ? 10 : UIDialog_1.posY + 30) + 'px';
                this.posCurrent.left = this.posCurrent.right = (UIDialog_1.posX = (UIDialog_1.posX + parseInt(this.posCurrent.width) + 32 > pw) ? (UIDialog_1.seedX += 60) : UIDialog_1.posX + 30) + 'px';
            }
            if (!this.id)
                this.id = this.uniqId;
        };
        UIDialog.prototype.attached = function () {
            if (this.maximized)
                this.expand(null);
        };
        UIDialog.prototype.focus = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var el = _this.dialogEl.querySelector('input,textarea');
                if (el !== null)
                    el.focus();
            });
        };
        UIDialog.prototype.makeActive = function () {
            this.isActive = true;
            this.isMinimized = false;
            this.dialogEl.classList.remove('ui-minimize');
            if (this.taskButtonEl)
                this.taskButtonEl.classList.add('ui-active');
        };
        UIDialog.prototype.makeInactive = function () {
            this.isActive = false;
            if (this.taskButtonEl)
                this.taskButtonEl.classList.remove('ui-active');
        };
        UIDialog.prototype.minimize = function () {
            this.isMinimized = true;
            this.dialogEl.classList.add('ui-minimize');
            if (this.taskButtonEl)
                this.taskButtonEl.classList.remove('ui-active');
        };
        UIDialog.prototype.expand = function ($event) {
            this.isMaximized = !this.isMaximized;
            if ($event)
                $event.cancelBubble = true;
            this.dialogEl.classList.toggle('ui-maximize');
        };
        UIDialog.prototype.collapse = function ($event) {
            if ($event)
                $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('collapse', this.dialogWrapperEl, this);
        };
        UIDialog.prototype.close = function ($event) {
            if ($event)
                $event.cancelBubble = true;
            ui_event_1.UIEvent.fireEvent('close', this.dialogWrapperEl, this);
        };
        UIDialog.prototype.toast = function (config) {
            if (typeof config === 'string')
                config = { message: config };
            config.container = this.dialogEl.querySelector('ui-dialog-body');
            ui_utils_1.UIUtils.toast(config);
        };
        UIDialog.seed = 0;
        UIDialog.seedX = 0;
        UIDialog.posX = 0;
        UIDialog.posY = 0;
        UIDialog = UIDialog_1 = __decorate([
            aurelia_framework_1.autoinject()
        ], UIDialog);
        return UIDialog;
        var UIDialog_1;
    }());
    exports.UIDialog = UIDialog;
});

define('aurelia-ui-framework/utils/ui-format',["require", "exports", "kramed", "moment", "numeral"], function (require, exports, kramed, moment, numeral) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIFormat;
    (function (UIFormat) {
        function toHTML(md) {
            return kramed(md).replace(/(\<a href=)/gi, '<a target="_blank" href=');
        }
        UIFormat.toHTML = toHTML;
        function date(dt, ft) {
            if (ft === void 0) { ft = 'DD MMM YYYY'; }
            var x;
            return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
        }
        UIFormat.date = date;
        function time(dt, ft) {
            if (ft === void 0) { ft = 'hh:mm A'; }
            var x;
            return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
        }
        UIFormat.time = time;
        function datetime(dt, ft) {
            if (ft === void 0) { ft = 'DD MMM YYYY hh:mm A'; }
            var x;
            return !dt || !(x = moment(dt)).isValid() ? null : x.format(ft);
        }
        UIFormat.datetime = datetime;
        function dateToISO(dt) {
            var x;
            return !dt || !(x = moment(dt)).isValid() ? null : x.toISOString();
        }
        UIFormat.dateToISO = dateToISO;
        function utcDate(dt) {
            var x;
            return !dt || !(x = moment(dt)).isValid() ? null : x.utc();
        }
        UIFormat.utcDate = utcDate;
        function age(dt) {
            var x;
            return !dt || !(x = moment(dt)).isValid() ? '' : x.fromNow(true);
        }
        UIFormat.age = age;
        function fromNow(dt) {
            var x;
            return !dt || !(x = moment(dt)).isValid() ? '' : x.fromNow(false);
        }
        UIFormat.fromNow = fromNow;
        function number(nm, fm) {
            if (fm === void 0) { fm = '0,0[.]00'; }
            var ret = nm === null || isNaN(nm) ? '' : numeral(nm).format(fm);
            if (fm.indexOf('{') === 0) {
                var minlen = fm.length - 2;
                if (ret.length < minlen) {
                    ret = Array(minlen - ret.length + 1).join('0') + ret;
                }
            }
            return ret;
        }
        UIFormat.number = number;
        function currency(nm, sy, fm) {
            if (sy === void 0) { sy = '$'; }
            if (fm === void 0) { fm = '$ 0,0.00'; }
            return nm === null || isNaN(nm) ? '' :
                numeral(nm)
                    .format(fm)
                    .replace('$', sy);
        }
        UIFormat.currency = currency;
        function percent(nm) {
            return nm === null || isNaN(nm) ? '' :
                numeral(nm > 1 ? nm / 100 : nm)
                    .format('0.00%');
        }
        UIFormat.percent = percent;
        function exRate(nm) {
            return nm === null || isNaN(nm) ? '' :
                numeral(nm > 0 ? 1 / nm : nm)
                    .format('0.0000[a]');
        }
        UIFormat.exRate = exRate;
    })(UIFormat = exports.UIFormat || (exports.UIFormat = {}));
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/utils/ui-http',["require", "exports", "aurelia-framework", "aurelia-logging", "aurelia-fetch-client", "aurelia-event-aggregator", "./ui-application", "./ui-constants"], function (require, exports, aurelia_framework_1, aurelia_logging_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, ui_application_1, ui_constants_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIHttpService = (function () {
        function UIHttpService(httpClient, app, eventAggregator) {
            this.httpClient = httpClient;
            this.app = app;
            this.eventAggregator = eventAggregator;
            this.logger = aurelia_logging_1.getLogger('UIHttpService');
            this.logger.info('Initialized');
            var self = this;
            httpClient.configure(function (config) {
                config
                    .withBaseUrl(ui_constants_1.UIConstants.Http.BaseUrl)
                    .withInterceptor({
                    request: function (request) {
                        self.logger.info("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        self.logger.info("Response " + response.status + " " + response.url);
                        if (response instanceof TypeError) {
                            return Promise.reject({ errorCode: '0xFFFF', message: response['message'] });
                        }
                        if (response.status == 401 && ~response.url.indexOf(self.httpClient.baseUrl)) {
                            eventAggregator.publish('auf:unauthorized', null);
                        }
                        else if (response.status >= 400) {
                            return response.text()
                                .then(function (resp) {
                                var json = {};
                                try {
                                    json = JSON.parse(resp);
                                }
                                catch (e) { }
                                var message = json.message || json.error || '0xFFFF';
                                var errorCode = json.errorCode || json.error || 'Network Error!!';
                                return Promise.reject({ errorCode: errorCode, message: message });
                            });
                        }
                        return response;
                    }
                });
            });
        }
        UIHttpService.prototype.setBaseUrl = function (url) {
            this.httpClient.baseUrl = url;
        };
        UIHttpService.buildQueryString = function (json) {
            return Object.keys(json)
                .map(function (k) { return escape(k) + "=" + escape(json[k]); })
                .join('&');
        };
        UIHttpService.prototype.get = function (slug, headers) {
            if (headers === void 0) { headers = true; }
            return this.json(slug, headers);
        };
        UIHttpService.prototype.json = function (slug, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("get [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.text = function (slug, headers) {
            if (headers === void 0) { headers = false; }
            this.logger.info("text [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return resp.text(); });
        };
        UIHttpService.prototype.blob = function (slug, headers) {
            if (headers === void 0) { headers = false; }
            this.logger.info("text [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'get',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return resp.blob(); });
        };
        UIHttpService.prototype.patch = function (slug, obj, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("patch [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'patch',
                body: aurelia_fetch_client_1.json(obj),
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.put = function (slug, obj, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("put [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'put',
                body: aurelia_fetch_client_1.json(obj),
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.post = function (slug, obj, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("post [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'post',
                body: aurelia_fetch_client_1.json(obj),
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.delete = function (slug, headers) {
            var _this = this;
            if (headers === void 0) { headers = true; }
            this.logger.info("delete [" + slug + "]");
            return this.httpClient
                .fetch(slug, {
                method: 'delete',
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.upload = function (slug, form, headers) {
            if (headers === void 0) { headers = true; }
            this.logger.info("upload [" + slug + "]");
            return this.__upload('post', slug, form, headers);
        };
        UIHttpService.prototype.reupload = function (slug, form, headers) {
            if (headers === void 0) { headers = true; }
            this.logger.info("reupload [" + slug + "]");
            return this.__upload('put', slug, form, headers);
        };
        UIHttpService.prototype.__upload = function (method, slug, form, headers) {
            var _this = this;
            var data = new FormData();
            for (var i = 0, q = form.querySelectorAll('input'); i < q.length; i++) {
                if (q[i].type == 'file') {
                    var files = q[i]['draggedFiles'] || q[i].files;
                    for (var x = 0; x < files.length; x++) {
                        data.append(q[i].name || ('file' + (i + 1) + (x + 1)), (files[x].file || files[x]), files[x].name);
                    }
                }
                else {
                    data.append(q[i].name || ('input' + (i + 1)), q[i].value);
                }
            }
            return this.httpClient
                .fetch(slug, {
                method: method,
                body: data,
                mode: 'cors',
                headers: this.__getHeaders(headers)
            })
                .then(function (resp) { return _this.__getResponse(resp); });
        };
        UIHttpService.prototype.__getResponse = function (response) {
            if (response.status === 204)
                return null;
            return response.text().then(function (text) {
                try {
                    return JSON.parse(text);
                }
                catch (e) {
                    return {};
                }
            });
        };
        UIHttpService.prototype.__getHeaders = function (override) {
            if (override === void 0) { override = true; }
            var headers = {
                'X-Requested-With': 'Fetch',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };
            Object.assign(headers, ui_constants_1.UIConstants.Http.Headers || {});
            if (override !== false && ui_constants_1.UIConstants.Http.AuthorizationHeader && !isEmpty(this.app.AuthUser)) {
                var token = this.app.AuthUser + ":" + this.app.AuthToken;
                var hash = btoa(token);
                headers['Authorization'] = "Basic " + hash;
            }
            if (typeof override == 'object') {
                Object.assign(headers, override || {});
            }
            return headers;
        };
        UIHttpService = __decorate([
            aurelia_framework_1.autoinject(),
            __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient,
                ui_application_1.UIApplication,
                aurelia_event_aggregator_1.EventAggregator])
        ], UIHttpService);
        return UIHttpService;
    }());
    exports.UIHttpService = UIHttpService;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define('aurelia-ui-framework/elements/core/ui-glyphs',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIGlyphs = (function () {
        function UIGlyphs() {
        }
        UIGlyphs = __decorate([
            aurelia_framework_1.inlineView("<template>\n  <svg style=\"position: absolute; width: 0; height: 0; overflow: hidden;\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n  <defs>\n  <symbol id=\"glyph-loader\" viewBox=\"0 0 32 32\">\n  <title>loader</title>\n  <path d=\"M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zM25.546 25.546c-2.55 2.55-5.94 3.954-9.546 3.954s-6.996-1.404-9.546-3.954-3.954-5.94-3.954-9.546c0-3.606 1.404-6.996 3.954-9.546l2.121 2.121c0 0 0 0 0 0-4.094 4.094-4.094 10.755 0 14.849 1.983 1.983 4.62 3.075 7.425 3.075s5.441-1.092 7.425-3.075c4.094-4.094 4.094-10.755 0-14.849l2.121-2.121c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546z\"></path>\n  </symbol>\n  <symbol id=\"glyph-busy\" viewBox=\"0 0 32 32\">\n  <title>busy</title>\n  <path d=\"M16 32c-4.274 0-8.292-1.664-11.314-4.686s-4.686-7.040-4.686-11.314c0-3.026 0.849-5.973 2.456-8.522 1.563-2.478 3.771-4.48 6.386-5.791l1.344 2.682c-2.126 1.065-3.922 2.693-5.192 4.708-1.305 2.069-1.994 4.462-1.994 6.922 0 7.168 5.832 13 13 13s13-5.832 13-13c0-2.459-0.69-4.853-1.994-6.922-1.271-2.015-3.066-3.643-5.192-4.708l1.344-2.682c2.615 1.31 4.824 3.313 6.386 5.791 1.607 2.549 2.456 5.495 2.456 8.522 0 4.274-1.664 8.292-4.686 11.314s-7.040 4.686-11.314 4.686z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-image\" viewBox=\"0 0 32 32\">\n  <title>icon-image</title>\n  <path d=\"M30 4h-28c-1.105 0-2 0.896-2 2v20c0 1.105 0.895 2 2 2h28c1.105 0 2-0.895 2-2v-20c0-1.104-0.895-2-2-2zM30 26h-28v-20h28v20zM6.293 23.707c0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l5.49-5.49 3.355 1.678c0.433 0.217 0.958 0.093 1.247-0.295l5.152-6.869 3.216 4.824c0.305 0.459 0.926 0.581 1.387 0.277 0.46-0.307 0.584-0.927 0.277-1.387l-4-6c-0.18-0.271-0.48-0.435-0.805-0.445-0.314-0.011-0.634 0.141-0.827 0.4l-5.498 7.332-3.254-1.627c-0.383-0.193-0.848-0.117-1.154 0.188l-6 6c-0.391 0.39-0.391 1.023 0 1.414zM8 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zM8 10c1.105 0 2 0.895 2 2s-0.895 2-2 2-2-0.895-2-2 0.894-2 2-2z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-email\" viewBox=\"0 0 32 32\">\n  <title>icon-email</title>\n  <path d=\"M28 5.5h-24c-2.209 0-4 1.792-4 4v13c0 2.209 1.791 4 4 4h24c2.209 0 4-1.791 4-4v-13c0-2.208-1.791-4-4-4zM2 10.75l6.999 5.25-6.999 5.25v-10.5zM30 22.5c0 1.104-0.898 2-2 2h-24c-1.103 0-2-0.896-2-2l7.832-5.875 4.368 3.277c0.533 0.398 1.166 0.6 1.8 0.6 0.633 0 1.266-0.201 1.799-0.6l4.369-3.277 7.832 5.875zM30 21.25l-7-5.25 7-5.25v10.5zM17.199 19.102c-0.349 0.262-0.763 0.4-1.199 0.4s-0.851-0.139-1.2-0.4l-12.8-9.602c0-1.103 0.897-2 2-2h24c1.102 0 2 0.897 2 2l-12.801 9.602z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-edit\" viewBox=\"0 0 32 32\">\n  <title>icon-edit</title>\n  <path d=\"M30.829 4l-2.828-2.828c-0.781-0.781-1.806-1.172-2.829-1.172s-2.047 0.391-2.828 1.172l-17.172 17.172c-0.78 0.781-3.17 3.803-3.171 4.826l-2 8.83 8.828-2c0 0 4.047-2.391 4.828-3.172l17.173-17.172c1.562-1.562 1.562-4.096-0-5.656zM8.079 28.119l-5.428 1.23 1.299-5.738c0.018-0.082 0.032-0.166 0.040-0.248 0.004-0.012 0.015-0.029 0.019-0.041l4.522 4.523c-0.151 0.091-0.303 0.183-0.453 0.273zM12.246 25.41c-0.226 0.215-1.010 0.744-1.967 1.354l-5.181-5.182c0.531-0.729 1.123-1.461 1.487-1.824l12.931-12.93 5.656 5.656-12.926 12.926zM29.415 8.242l-2.829 2.828-5.656-5.657 2.829-2.828c0.377-0.379 0.879-0.586 1.413-0.586s1.037 0.209 1.415 0.586l2.828 2.828c0.378 0.377 0.585 0.879 0.585 1.414-0 0.533-0.208 1.037-0.585 1.414z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-placeholder\" viewBox=\"0 0 32 32\">\n  <title>icon-placeholder</title>\n  <path d=\"M30.032 25.554l-9.231-3.175c0.268-0.353 0.54-0.716 0.813-1.089 3.363-4.602 5.069-8.17 5.069-10.606 0-5.891-4.793-10.684-10.684-10.684s-10.683 4.793-10.683 10.684c0 2.436 1.705 6.004 5.069 10.606 0.275 0.376 0.549 0.742 0.819 1.098l-9.236 3.166c-0.359 0.123-0.6 0.46-0.6 0.839s0.241 0.717 0.599 0.84l13.72 4.719c0.094 0.032 0.191 0.048 0.289 0.048s0.195-0.016 0.288-0.048l13.767-4.719c0.359-0.123 0.6-0.46 0.6-0.839s-0.241-0.717-0.599-0.84zM24.908 10.684c0 3.845-5.92 11.376-8.908 14.776-2.988-3.399-8.908-10.928-8.908-14.776 0-4.912 3.996-8.908 8.908-8.908s8.908 3.996 8.908 8.908zM15.977 30.173l-10.986-3.779 7.37-2.526c1.63 2.038 2.911 3.442 2.984 3.522 0.168 0.184 0.406 0.288 0.655 0.288s0.487-0.105 0.655-0.288c0.073-0.080 1.358-1.487 2.992-3.531l7.363 2.532-11.033 3.782z\"></path>\n  <path d=\"M16 14.727c2.516 0 4.563-2.047 4.563-4.563s-2.047-4.564-4.564-4.564-4.564 2.047-4.564 4.564 2.047 4.564 4.564 4.564zM18.788 10.164c0 1.537-1.25 2.788-2.788 2.788s-2.788-1.251-2.788-2.788c0-1.537 1.251-2.788 2.788-2.788s2.788 1.251 2.788 2.788z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-preview\" viewBox=\"0 0 32 32\">\n  <title>icon-preview</title>\n  <path d=\"M30.115 30.787l-3.912-3.912c1.824-2.305 1.436-5.651-0.869-7.474s-5.651-1.436-7.475 0.868c-1.823 2.305-1.435 5.652 0.869 7.475 1.935 1.529 4.665 1.529 6.599 0l3.913 3.913c0.247 0.235 0.635 0.227 0.87-0.012 0.24-0.241 0.24-0.616 0.005-0.857zM22.049 27.663c-2.249-0.006-4.073-1.825-4.073-4.074s1.824-4.072 4.073-4.072c2.25 0 4.073 1.823 4.073 4.072s-1.824 4.074-4.073 4.074z\"></path>\n  <path d=\"M8.222 13.611h15.556v1.944h-15.556v-1.944z\"></path>\n  <path d=\"M8.222 17.5h7.777v1.944h-7.777v-1.944z\"></path>\n  <path d=\"M8.222 5.833h15.556v1.944h-15.556v-1.944z\"></path>\n  <path d=\"M25.722 0h-19.445c-2.149 0-3.889 1.74-3.889 3.889v23.334c0 2.146 1.74 3.889 3.889 3.889h10.432v-1.945h-10.432c-1.071 0-1.944-0.87-1.944-1.944v-23.334c0-1.072 0.874-1.944 1.944-1.944h19.444c1.075 0 1.945 0.872 1.945 1.944v14.361h1.944v-14.361c0-2.149-1.742-3.889-3.889-3.889z\"></path>\n  <path d=\"M8.222 9.722h15.556v1.944h-15.556v-1.944z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-key\" viewBox=\"0 0 32 32\">\n  <title>icon-key</title>\n  <path d=\"M2 29c0-0.154 0.039-0.452 0.293-0.707l13.326-13.325-0.68-1.302c-0.622-1.193-0.939-2.427-0.939-3.666 0-4.411 3.588-8 8-8s8 3.589 8 8-3.588 8-8 8c-0.535 0-1.074-0.055-1.604-0.161l-2.396-0.485v2.646h-4v4h-4v4h-4.586l-1.707 1.707c-0.256 0.255-0.553 0.293-0.707 0.293s-0.451-0.038-0.707-0.293c-0.254-0.255-0.293-0.553-0.293-0.707zM26 10c0-2.206-1.795-4-4-4s-4 1.794-4 4 1.795 4 4 4 4-1.794 4-4zM0 29c0 0.767 0.293 1.535 0.879 2.121 1.172 1.172 3.070 1.172 4.242 0l1.121-1.121h5.758v-4h4v-4h4v-2.201c0.647 0.131 1.315 0.201 2 0.201 5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.478-10 10c0 1.665 0.445 3.211 1.166 4.592l-12.287 12.287c-0.586 0.586-0.879 1.354-0.879 2.121v0zM24 10c0 1.104-0.895 2-2 2s-2-0.896-2-2 0.895-2 2-2 2 0.896 2 2v0z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-lock\" viewBox=\"0 0 32 32\">\n  <title>icon-lock</title>\n  <path d=\"M27 9.999h-2v-2c0-4.418-3.582-8-8-8h-2c-4.418 0-8 3.582-8 8v2h-2c-2.209 0-4 1.791-4 4.001v14c0 2.21 1.791 4 4 4h22c2.209 0 4-1.79 4-4v-14c0-2.21-1.791-4-4-4zM9 8c0-3.309 2.691-6 6-6h2c3.308 0 6 2.691 6 6v1.999h-2v-2c0-2.206-1.795-4-4-4h-2c-2.205 0-4 1.794-4 4v2h-2v-2zM19 8v1.999h-6v-2c0-1.104 0.895-2 2-2h2c1.105 0 2 0.896 2 2zM29 28c0 1.102-0.896 2-2 2h-22c-1.103 0-2-0.898-2-2v-14c0-1.102 0.897-2 2-2h22c1.104 0 2 0.898 2 2v14zM16 16c-1.656 0-3 1.343-3 3 0 1.305 0.838 2.403 2 2.817v3.183c0 0.553 0.447 1 1 1s1-0.447 1-1v-3.183c1.162-0.413 2-1.512 2-2.817 0-1.657-1.344-3-3-3z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-print\" viewBox=\"0 0 32 32\">\n  <title>icon-print</title>\n  <path d=\"M20 26h-8v2h8v-2zM20 18h-8v2h8v-2zM20 22h-8v2h8v-2zM27 12c-0.553 0-1 0.447-1 1s0.447 1 1 1 1-0.447 1-1-0.447-1-1-1zM27 16c-0.553 0-1 0.447-1 1s0.447 1 1 1 1-0.447 1-1-0.447-1-1-1zM27 20c-0.553 0-1 0.447-1 1s0.447 1 1 1 1-0.447 1-1-0.447-1-1-1zM28 8h-4v-4c0-2.209-1.791-4-4-4h-8c-2.209 0-4 1.791-4 4v4h-4c-2.209 0-4 1.791-4 4v10c0 2.209 1.791 4 4 4h4v2c0 2.209 1.791 4 4 4h8c2.209 0 4-1.791 4-4v-2h4c2.209 0 4-1.791 4-4v-10c0-2.209-1.791-4-4-4zM10 4c0-1.103 0.898-2 2-2h8c1.102 0 2 0.897 2 2v4h-12v-4zM22 26v2c0 1.104-0.898 2-2 2h-8c-1.102 0-2-0.896-2-2v-12h12v10zM30 22c0 1.104-0.898 2-2 2h-4v-10h-16v10h-4c-1.103 0-2-0.896-2-2v-10c0-1.104 0.897-2 2-2h24c1.102 0 2 0.896 2 2v10z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-edit-page\" viewBox=\"0 0 32 32\">\n  <title>icon-edit-page</title>\n  <path d=\"M2 28v-24c0-1.103 0.898-2 2-2h20c1.104 0 2 0.897 2 2v11.758l2-2v-9.758c0-2.209-1.791-4-4-4h-20c-2.209 0-4 1.791-4 4v24c0 2.209 1.791 4 4 4h11v-2h-11c-1.101 0-2-0.896-2-2zM22 6h-16v2h16v-2zM22 10h-16v2h16v-2zM22 14h-16v2h16v-2zM6 20h8v-2h-8v2zM31.414 18l-1.414-1.414c-0.391-0.391-0.902-0.586-1.414-0.586s-1.023 0.195-1.414 0.586l-8.586 8.586c-0.391 0.39-1.586 1.901-1.586 2.413l-1 4.415 4.414-1c0 0 2.023-1.195 2.414-1.586l8.586-8.586c0.781-0.781 0.781-2.048 0-2.828zM22.123 28.705c-0.113 0.108-0.505 0.372-0.983 0.677l-2.591-2.591c0.266-0.364 0.561-0.73 0.744-0.912l6.465-6.465 2.828 2.828-6.463 6.463z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-page\" viewBox=\"0 0 32 32\">\n  <title>icon-page</title>\n  <path d=\"M26 0h-20c-2.209 0-4 1.791-4 4v24c0 2.209 1.791 4 4 4h20c2.209 0 4-1.791 4-4v-24c0-2.209-1.791-4-4-4zM28 28c0 1.104-0.896 2-2 2h-20c-1.101 0-2-0.896-2-2v-24c0-1.103 0.899-2 2-2h20c1.104 0 2 0.897 2 2v24zM8 8h16v-2h-16v2zM8 12h16v-2h-16v2zM8 16h16v-2h-16v2zM8 20h8v-2h-8v2z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-cog\" viewBox=\"0 0 32 32\">\n  <title>icon-cog</title>\n  <path d=\"M17.684 32h-3.368c-1.314 0-2.383-1.070-2.383-2.384v-3.655c-0.034-0.013-0.068-0.028-0.101-0.042l-2.584 2.584c-0.451 0.451-1.049 0.698-1.686 0.698s-1.235-0.247-1.685-0.698l-2.381-2.381c-0.929-0.929-0.929-2.441 0-3.37l2.584-2.584c-0.014-0.035-0.029-0.069-0.043-0.102h-3.654c-1.314 0-2.383-1.070-2.384-2.383v-3.368c0.001-1.314 1.070-2.383 2.384-2.383h3.655c0.013-0.034 0.028-0.068 0.042-0.102l-2.585-2.584c-0.929-0.93-0.929-2.441 0-3.371l2.381-2.381c0.451-0.45 1.048-0.698 1.685-0.698s1.236 0.248 1.686 0.698l2.584 2.584c0.034-0.014 0.069-0.029 0.102-0.042v-3.654c0-1.314 1.069-2.384 2.383-2.384h3.368c1.314 0 2.383 1.069 2.383 2.383v3.655c0.034 0.014 0.068 0.028 0.102 0.042l2.585-2.585c0.451-0.45 1.049-0.698 1.685-0.698s1.235 0.247 1.685 0.697l2.382 2.382c0.45 0.45 0.698 1.049 0.697 1.686 0 0.637-0.248 1.235-0.699 1.685l-2.584 2.584c0.014 0.034 0.029 0.068 0.042 0.101h3.656c1.314 0.001 2.383 1.069 2.383 2.382l-0.001 3.368c0 0.636-0.247 1.235-0.698 1.685s-1.048 0.698-1.684 0.698v0h-3.656c-0.014 0.035-0.029 0.069-0.043 0.102l2.585 2.585c0.929 0.929 0.929 2.441 0 3.371l-2.381 2.381c-0.451 0.45-1.048 0.698-1.685 0.698s-1.236-0.248-1.686-0.699l-2.584-2.584c-0.034 0.014-0.069 0.029-0.102 0.042v3.655c0 1.315-1.069 2.384-2.383 2.384zM11.621 23.75c0.15 0 0.301 0.035 0.442 0.105 0.389 0.195 0.781 0.359 1.166 0.486 0.403 0.134 0.676 0.511 0.676 0.936v4.339c0 0.227 0.185 0.412 0.411 0.412h3.368c0.226 0 0.411-0.185 0.411-0.412v-4.339c0-0.424 0.273-0.802 0.676-0.936 0.385-0.128 0.778-0.292 1.165-0.486 0.38-0.192 0.839-0.116 1.14 0.183l3.070 3.070c0.105 0.105 0.227 0.121 0.292 0.121s0.186-0.016 0.291-0.12l2.381-2.38c0.16-0.161 0.16-0.421-0-0.583l-3.070-3.070c-0.3-0.3-0.375-0.76-0.184-1.14 0.195-0.388 0.359-0.781 0.487-1.167 0.134-0.403 0.511-0.676 0.935-0.676h4.34c0.148 0 0.246-0.074 0.291-0.12s0.12-0.142 0.12-0.291l0-3.367c0-0.227-0.185-0.412-0.413-0.412h-4.339c-0.424 0-0.802-0.272-0.935-0.675-0.129-0.387-0.292-0.78-0.487-1.166-0.191-0.38-0.116-0.839 0.184-1.14l3.071-3.071c0.105-0.105 0.12-0.227 0.12-0.291s-0.015-0.186-0.12-0.291l-2.381-2.381c-0.104-0.104-0.227-0.12-0.291-0.12s-0.187 0.015-0.292 0.12l-3.070 3.071c-0.301 0.3-0.76 0.376-1.14 0.183-0.386-0.195-0.779-0.358-1.164-0.486-0.403-0.134-0.676-0.511-0.676-0.936v-4.339c-0-0.227-0.185-0.412-0.412-0.412h-3.368c-0.226 0-0.411 0.185-0.411 0.412v4.339c0 0.425-0.273 0.802-0.676 0.936-0.386 0.128-0.778 0.292-1.166 0.487-0.38 0.192-0.839 0.116-1.14-0.184l-3.070-3.070c-0.106-0.105-0.228-0.121-0.292-0.121s-0.186 0.016-0.291 0.12l-2.381 2.381c-0.16 0.16-0.16 0.421 0 0.583l3.070 3.070c0.3 0.3 0.375 0.76 0.184 1.139-0.195 0.389-0.359 0.781-0.487 1.167-0.134 0.403-0.51 0.676-0.935 0.676h-4.339c-0.227 0.001-0.412 0.184-0.412 0.412v3.367c0 0.228 0.185 0.413 0.412 0.413h4.339c0.425 0 0.801 0.272 0.935 0.674 0.129 0.387 0.293 0.78 0.487 1.167 0.191 0.38 0.116 0.839-0.184 1.14l-3.070 3.070c-0.16 0.161-0.16 0.421 0 0.582l2.381 2.381c0.104 0.105 0.227 0.12 0.291 0.12s0.187-0.015 0.292-0.12l3.070-3.070c0.189-0.19 0.441-0.29 0.697-0.29zM16 20.703c-2.593 0-4.703-2.11-4.703-4.703s2.11-4.704 4.703-4.704 4.703 2.11 4.703 4.704c0 2.593-2.11 4.703-4.703 4.703zM16 13.269c-1.506 0-2.731 1.224-2.731 2.731s1.225 2.731 2.731 2.731c1.506-0 2.731-1.226 2.731-2.732s-1.226-2.731-2.731-2.731z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-trash\" viewBox=\"0 0 32 32\">\n  <title>icon-trash</title>\n  <path d=\"M30.479 5.521c-0.125-0.125-0.285-0.187-0.479-0.187h-6.438l-1.458-3.479c-0.208-0.514-0.583-0.952-1.125-1.313s-1.091-0.542-1.646-0.542h-6.667c-0.555 0-1.104 0.18-1.646 0.542s-0.917 0.799-1.125 1.313l-1.458 3.479h-6.438c-0.195 0-0.354 0.063-0.479 0.187s-0.187 0.285-0.187 0.479v1.333c0 0.194 0.062 0.354 0.187 0.479s0.285 0.187 0.479 0.187h2v19.834c0 1.153 0.326 2.136 0.979 2.948s1.438 1.219 2.354 1.219h17.334c0.917 0 1.702-0.42 2.354-1.26s0.979-1.837 0.979-2.99v-19.751h2c0.194 0 0.354-0.062 0.479-0.187s0.188-0.285 0.188-0.479v-1.333c0-0.194-0.063-0.354-0.187-0.479zM12.354 2.895c0.097-0.125 0.215-0.202 0.354-0.229h6.604c0.139 0.028 0.257 0.104 0.354 0.229l1 2.438h-9.334l1.021-2.438zM25.334 27.75c0 0.305-0.048 0.587-0.146 0.844s-0.198 0.444-0.302 0.562c-0.104 0.118-0.177 0.177-0.219 0.177h-17.334c-0.042 0-0.114-0.059-0.219-0.177s-0.205-0.306-0.302-0.562c-0.097-0.257-0.146-0.538-0.146-0.844v-19.751h18.667v19.751z\"></path>\n  <path d=\"M10 25.334h1.333c0.195 0 0.354-0.062 0.479-0.187s0.187-0.285 0.187-0.479v-12c0-0.194-0.063-0.354-0.187-0.479s-0.284-0.187-0.479-0.187h-1.333c-0.195 0-0.354 0.062-0.479 0.187s-0.187 0.285-0.187 0.479v12c0 0.195 0.062 0.354 0.187 0.479s0.285 0.187 0.479 0.187z\"></path>\n  <path d=\"M15.333 25.334h1.333c0.195 0 0.354-0.062 0.479-0.187s0.187-0.285 0.187-0.479v-12c0-0.194-0.062-0.354-0.187-0.479s-0.284-0.187-0.479-0.187h-1.333c-0.194 0-0.354 0.062-0.479 0.187s-0.187 0.285-0.187 0.479v12c0 0.195 0.062 0.354 0.187 0.479s0.285 0.187 0.479 0.187z\"></path>\n  <path d=\"M20.667 25.334h1.333c0.195 0 0.355-0.062 0.479-0.187s0.187-0.285 0.187-0.479v-12c0-0.194-0.062-0.354-0.187-0.479s-0.285-0.187-0.479-0.187h-1.333c-0.195 0-0.354 0.062-0.48 0.187s-0.187 0.285-0.187 0.479v12c0 0.195 0.062 0.354 0.187 0.479s0.285 0.187 0.48 0.187z\"></path>\n  </symbol>\n  <symbol id=\"glyph-alert-error\" viewBox=\"0 0 32 32\">\n  <title>alert-error</title>\n  <path d=\"M16 0c-8.836 0-16 6.268-16 14 0 5.154 3.192 9.646 7.932 12.076v5.924l4.388-4.387c1.183 0.244 2.411 0.387 3.68 0.387 8.837 0 16-6.268 16-14s-7.163-14-16-14zM22.717 18.642l-2.121 2.121-4.596-4.597-4.596 4.596-2.121-2.121 4.597-4.596-4.597-4.597 2.121-2.121 4.596 4.597 4.597-4.596 2.121 2.121-4.597 4.596 4.596 4.597z\"></path>\n  </symbol>\n  <symbol id=\"glyph-alert-exclaim\" viewBox=\"0 0 32 32\">\n  <title>alert-exclaim</title>\n  <path d=\"M16 0c-8.837 0-16 6.268-16 14 0 5.154 3.192 9.646 7.932 12.076v5.924l4.388-4.387c1.182 0.244 2.41 0.387 3.68 0.387 8.836 0 16-6.268 16-14s-7.164-14-16-14zM16.014 22.905c-1.404 0-2.341-1.014-2.341-2.365 0-1.379 0.963-2.367 2.341-2.367s2.288 0.988 2.313 2.367c0 1.352-0.91 2.365-2.313 2.365zM17.495 16.874h-2.964l-0.597-11.779h4.134l-0.573 11.779z\"></path>\n  </symbol>\n  <symbol id=\"glyph-alert-info\" viewBox=\"0 0 32 32\">\n  <title>alert-info</title>\n  <path d=\"M16 0c-8.837 0-16 6.268-16 14 0 5.154 3.192 9.646 7.932 12.076v5.924l4.388-4.387c1.182 0.244 2.41 0.387 3.68 0.387 8.836 0 16-6.268 16-14s-7.164-14-16-14zM15.988 4.874c1.273 0 2.080 0.858 2.105 2.002 0 1.092-0.832 1.976-2.131 1.976-1.248 0-2.080-0.884-2.054-1.976-0.027-1.145 0.805-2.002 2.080-2.002zM17.963 23.127h-3.952v-12.715h3.952v12.715z\"></path>\n  </symbol>\n  <symbol id=\"glyph-alert-notif\" viewBox=\"0 0 32 32\">\n  <title>alert-notif</title>\n  <path d=\"M16 0c-8.836 0-15.999 7.164-15.999 16s7.163 16 15.999 16 16-7.164 16-16-7.164-16-16-16zM16 24.848c-1.148 0-2.080-0.931-2.080-2.080h4.159c0 1.149-0.931 2.080-2.080 2.080zM23.028 20.683h-0.001c0 0.769-0.623 0.82-1.392 0.82h-11.272c-0.769 0-1.392-0.051-1.392-0.82v-0.132c0-0.553 0.325-1.027 0.791-1.251l0.442-3.814c0-2.792 1.974-5.122 4.603-5.672v-1.481c0-0.658 0.534-1.192 1.192-1.192s1.192 0.534 1.192 1.192v1.481c2.628 0.55 4.603 2.88 4.603 5.672l0.442 3.814c0.467 0.225 0.791 0.698 0.791 1.251v0.132z\"></path>\n  </symbol>\n  <symbol id=\"glyph-alert-question\" viewBox=\"0 0 32 32\">\n  <title>alert-question</title>\n  <path d=\"M16 0c-8.837 0-16 6.268-16 14 0 5.154 3.192 9.646 7.932 12.076v5.924l4.388-4.387c1.182 0.244 2.41 0.387 3.68 0.387 8.836 0 16-6.268 16-14s-7.164-14-16-14zM15.312 23.048c-1.378 0-2.314-1.014-2.314-2.365 0-1.379 0.962-2.367 2.314-2.367 1.404 0 2.314 0.988 2.34 2.367-0.001 1.351-0.936 2.365-2.34 2.365zM17.132 16.626v0.468h-3.459l-0.025-0.676c-0.078-1.326 0.363-2.678 1.534-4.082 0.832-0.988 1.509-1.82 1.509-2.704 0-0.91-0.6-1.508-1.899-1.56-0.857 0-1.898 0.312-2.574 0.78l-0.884-2.834c0.937-0.546 2.496-1.066 4.342-1.066 3.434 0 4.992 1.898 4.992 4.056 0 1.976-1.221 3.276-2.209 4.368-0.964 1.066-1.353 2.080-1.327 3.25z\"></path>\n  </symbol>\n  <symbol id=\"glyph-arrow-down\" viewBox=\"0 0 32 32\">\n  <title>arrow-down</title>\n  <path d=\"M5.031 21.048l10.078 10.079 0.009-0.009 0.882 0.882 0.882-0.882 0.010 0.010 10.078-10.080-1.782-1.781-7.928 7.928v-27.195h-2.52v27.194l-7.928-7.927z\"></path>\n  </symbol>\n  <symbol id=\"glyph-arrow-left\" viewBox=\"0 0 32 32\">\n  <title>arrow-left</title>\n  <path d=\"M10.952 5.031l-10.078 10.078 0.007 0.010-0.881 0.881 0.881 0.881-0.008 0.014 10.079 10.074 1.782-1.781-7.932-7.93h27.198v-2.519h-27.193l7.927-7.927z\"></path>\n  </symbol>\n  <symbol id=\"glyph-arrow-right\" viewBox=\"0 0 32 32\">\n  <title>arrow-right</title>\n  <path d=\"M21.051 26.969l10.075-10.075-0.007-0.013 0.881-0.881-0.881-0.881 0.008-0.011-10.076-10.077-1.781 1.781 7.924 7.927h-27.194v2.519h27.193l-7.923 7.93z\"></path>\n  </symbol>\n  <symbol id=\"glyph-arrow-up\" viewBox=\"0 0 32 32\">\n  <title>arrow-up</title>\n  <path d=\"M26.969 10.952l-10.075-10.078-0.013 0.007-0.881-0.881-0.881 0.881-0.011-0.008-10.078 10.079 1.782 1.782 7.927-7.932v27.198h2.519v-27.193l7.93 7.927z\"></path>\n  </symbol>\n  <symbol id=\"glyph-calendar\" viewBox=\"0 0 32 32\">\n  <title>calendar</title>\n  <path d=\"M30.4 2.133h-3.733v-1.6c0-0.295-0.238-0.533-0.533-0.533h-3.734c-0.295 0-0.534 0.238-0.534 0.533v1.6h-11.733v-1.6c0-0.295-0.238-0.533-0.533-0.533h-3.733c-0.295 0-0.533 0.238-0.533 0.533v1.6h-3.734c-0.295 0-0.533 0.238-0.533 0.533v28.801c0 0.295 0.238 0.533 0.533 0.533h28.8c0.295 0 0.533-0.238 0.533-0.533v-28.801c0.001-0.294-0.238-0.533-0.533-0.533zM22.934 1.067h2.666v3.2h-2.666v-3.2zM6.4 1.067h2.667v3.2h-2.667v-3.2zM2.133 3.2h3.2v1.6c0 0.295 0.238 0.534 0.533 0.534h3.733c0.295 0 0.533-0.239 0.533-0.534v-1.6h11.733v1.6c0 0.295 0.239 0.534 0.534 0.534h3.733c0.295 0 0.533-0.239 0.533-0.534v-1.6h3.199v4.8h-27.733v-4.8zM2.133 30.934v-21.867h27.733v21.867h-27.733z\"></path>\n  <path d=\"M20.267 12.267h-14.399v15.466h20.266v-15.466h-5.867zM16.533 13.333h3.733v3.733h-3.733v-3.733zM20.267 21.866h-3.733v-3.732h3.733v3.732zM11.733 18.134h3.733v3.732h-3.733v-3.732zM11.733 13.333h3.733v3.733h-3.733v-3.733zM6.933 13.333h3.733v3.733h-3.733v-3.733zM6.933 18.134h3.733v3.732h-3.733v-3.732zM10.667 26.667h-3.733v-3.733h3.733v3.733zM15.467 26.667h-3.733v-3.733h3.733v3.733zM20.267 26.667h-3.733v-3.733h3.733v3.733zM25.066 26.667h-3.733v-3.733h3.733v3.733zM25.066 21.866h-3.733v-3.732h3.733v3.732zM25.066 13.333v3.733h-3.733v-3.733h3.733z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-double-down\" viewBox=\"0 0 32 32\">\n  <title>caret-double-down</title>\n  <path d=\"M0 16l15.997 16 16.003-16h-16.003z\"></path>\n  <path d=\"M0 0l15.997 16 16.003-16z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-double-left\" viewBox=\"0 0 32 32\">\n  <title>caret-double-left</title>\n  <path d=\"M16 0l-16 15.997 16 16.003v-16.003z\"></path>\n  <path d=\"M32 0l-16 15.997 16 16.003z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-double-right\" viewBox=\"0 0 32 32\">\n  <title>caret-double-right</title>\n  <path d=\"M16 32l16-15.997-16-16.003v16.003z\"></path>\n  <path d=\"M0 32l16-15.997-16-16.003z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-double-up\" viewBox=\"0 0 32 32\">\n  <title>caret-double-up</title>\n  <path d=\"M32 16l-15.997-16-16.003 16h16.003z\"></path>\n  <path d=\"M32 32l-15.997-16-16.003 16z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-down\" viewBox=\"0 0 32 32\">\n  <title>caret-down</title>\n  <path d=\"M15.997 24l16.003-16h-32z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-left\" viewBox=\"0 0 32 32\">\n  <title>caret-left</title>\n  <path d=\"M8 15.997l16 16.003v-32z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-right\" viewBox=\"0 0 32 32\">\n  <title>caret-right</title>\n  <path d=\"M24 16.003l-16-16.003v32z\"></path>\n  </symbol>\n  <symbol id=\"glyph-caret-up\" viewBox=\"0 0 32 32\">\n  <title>caret-up</title>\n  <path d=\"M16.003 8l-16.003 16h32z\"></path>\n  </symbol>\n  <symbol id=\"glyph-check-off\" viewBox=\"0 0 32 32\">\n  <title>check-off</title>\n  <path d=\"M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM28 28h-24v-24h24v24z\"></path>\n  </symbol>\n  <symbol id=\"glyph-check-on\" viewBox=\"0 0 32 32\">\n  <title>check-on</title>\n  <path d=\"M28 0h-24c-2.2 0-4 1.8-4 4v24c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4v-24c0-2.2-1.8-4-4-4zM14 24.828l-7.414-7.414 2.828-2.828 4.586 4.586 9.586-9.586 2.828 2.828-12.414 12.414z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-double-down\" viewBox=\"0 0 32 32\">\n  <title>chevron-double-down</title>\n  <path d=\"M4.485 13.973l-3.256 3.254 14.769 14.773 14.773-14.773-3.26-3.254-11.513 11.515z\"></path>\n  <path d=\"M4.485 0l-3.256 3.257 14.769 14.77 14.773-14.77-3.26-3.257-11.513 11.514z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-double-left\" viewBox=\"0 0 32 32\">\n  <title>chevron-double-left</title>\n  <path d=\"M18.026 4.485l-3.255-3.256-14.771 14.769 14.771 14.773 3.255-3.26-11.512-11.513z\"></path>\n  <path d=\"M32 4.485l-3.257-3.256-14.771 14.769 14.771 14.773 3.257-3.26-11.512-11.513z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-double-right\" viewBox=\"0 0 32 32\">\n  <title>chevron-double-right</title>\n  <path d=\"M13.973 27.511l3.254 3.26 14.773-14.771-14.773-14.771-3.254 3.256 11.515 11.515z\"></path>\n  <path d=\"M0 27.511l3.257 3.26 14.77-14.771-14.77-14.771-3.257 3.256 11.514 11.515z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-double-up\" viewBox=\"0 0 32 32\">\n  <title>chevron-double-up</title>\n  <path d=\"M27.511 18.026l3.26-3.255-14.771-14.771-14.771 14.771 3.256 3.255 11.515-11.512z\"></path>\n  <path d=\"M27.511 32l3.26-3.257-14.771-14.771-14.771 14.771 3.256 3.257 11.515-11.512z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-down\" viewBox=\"0 0 32 32\">\n  <title>chevron-down</title>\n  <path d=\"M0 9.766l15.999 15.997 16.001-15.997-3.528-3.529-12.473 12.476-12.471-12.476z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-left\" viewBox=\"0 0 32 32\">\n  <title>chevron-left</title>\n  <path d=\"M22.241 0l-16.004 15.999 16.004 16.001 3.522-3.528-12.469-12.473 12.469-12.471z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-right\" viewBox=\"0 0 32 32\">\n  <title>chevron-right</title>\n  <path d=\"M9.766 32l15.997-15.999-15.997-16.001-3.529 3.528 12.476 12.473-12.476 12.471z\"></path>\n  </symbol>\n  <symbol id=\"glyph-chevron-up\" viewBox=\"0 0 32 32\">\n  <title>chevron-up</title>\n  <path d=\"M32 22.239l-15.999-16.003-16.001 16.003 3.528 3.525 12.473-12.47 12.472 12.47z\"></path>\n  </symbol>\n  <symbol id=\"glyph-dialog-close\" viewBox=\"0 0 32 32\">\n  <title>dialog-close</title>\n  <path d=\"M32 3.374l-3.374-3.374-12.626 12.626-12.626-12.626-3.374 3.374 12.626 12.626-12.626 12.626 3.374 3.374 12.626-12.626 12.626 12.626 3.374-3.374-12.626-12.626z\"></path>\n  </symbol>\n  <symbol id=\"glyph-dialog-expand\" viewBox=\"0 0 32 32\">\n  <title>dialog-expand</title>\n  <path d=\"M28.57 0h-9.14v3.428h6.718l-9.978 9.977 2.426 2.424 9.974-9.975v6.718h3.43v-12.572z\"></path>\n  <path d=\"M13.405 16.171l-9.977 9.977v-6.718h-3.428v12.57h12.572v-3.43h-6.718l9.974-9.974z\"></path>\n  </symbol>\n  <symbol id=\"glyph-dialog-minimize\" viewBox=\"0 0 32 32\">\n  <title>dialog-minimize</title>\n  <path d=\"M0 13.5h32v5h-32v-5z\"></path>\n  </symbol>\n  <symbol id=\"glyph-dialog-resize\" viewBox=\"0 0 32 32\">\n  <title>dialog-resize</title>\n  <path d=\"M13.401 32l18.599-18.599v-2.801l-21.4 21.4h2.801z\"></path>\n  <path d=\"M19.401 32l12.599-12.599v-2.801l-15.4 15.4h2.801z\"></path>\n  <path d=\"M25.4 32l6.6-6.6v-2.8l-9.4 9.4h2.8z\"></path>\n  <path d=\"M31.4 32l0.6-0.6v-2.8l-3.4 3.4h2.8z\"></path>\n  </symbol>\n  <symbol id=\"glyph-dialog-restore\" viewBox=\"0 0 32 32\">\n  <title>dialog-restore</title>\n  <path d=\"M2.19 17.239v3.426h6.718l-8.908 8.909 2.424 2.426 8.91-8.909v6.719h3.43v-12.571h-3.43z\"></path>\n  <path d=\"M32 2.424l-2.427-2.424-8.927 8.928v-6.719h-3.431v12.573h12.572v-3.428h-6.714z\"></path>\n  </symbol>\n  <symbol id=\"glyph-funnel\" viewBox=\"0 0 32 32\">\n  <title>funnel</title>\n  <path d=\"M0 4l12 12v12l8-2v-10l12-12h-32z\"></path>\n  </symbol>\n  <symbol id=\"glyph-handle-drag\" viewBox=\"0 0 32 32\">\n  <title>handle-drag</title>\n  <path d=\"M7.158 5.5h17.684v3.315h-17.684v-3.315z\"></path>\n  <path d=\"M7.158 14.342h17.684v3.316h-17.684v-3.316z\"></path>\n  <path d=\"M7.158 23.184h17.684v3.316h-17.684v-3.316z\"></path>\n  </symbol>\n  <symbol id=\"glyph-handle-menu\" viewBox=\"0 0 32 32\">\n  <title>handle-menu</title>\n  <path d=\"M0 2.285h32v4.572h-32v-4.572z\"></path>\n  <path d=\"M0 13.715h32v4.57h-32v-4.57z\"></path>\n  <path d=\"M0 25.145h32v4.57h-32v-4.57z\"></path>\n  </symbol>\n  <symbol id=\"glyph-handle-overflow\" viewBox=\"0 0 32 32\">\n  <title>handle-overflow</title>\n  <path d=\"M12.571 12.572h6.857v6.857h-6.857v-6.857z\"></path>\n  <path d=\"M12.571 25.145h6.857v6.855h-6.857v-6.855z\"></path>\n  <path d=\"M12.571 0h6.857v6.857h-6.857v-6.857z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-close-all\" viewBox=\"0 0 32 32\">\n  <title>icon-close-all</title>\n  <path d=\"M9.409 11.682l-2.728 2.728 4.091 4.090-4.091 4.090 2.729 2.729 4.091-4.091 4.090 4.090 2.728-2.728-4.090-4.090 4.091-4.090-2.729-2.729-4.091 4.090-4.091-4.089z\"></path>\n  <path d=\"M6.929 1.929h23.141v23.141h-3.070v1.93h5v-27h-27v5h1.929v-3.071z\"></path>\n  <path d=\"M27 32v-27h-27v27h27zM1.929 6.929h23.141v23.141h-23.142l0.001-23.141z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-cloud-download\" viewBox=\"0 0 32 32\">\n  <title>icon-cloud-download</title>\n  <path d=\"M20.396 23.31l-2.403 2.404-0.637 1.341v-13.013h-2.656v12.947l-0.611-1.248-2.43-2.43-1.806 1.686 6.175 6.175 6.121-6.108z\"></path>\n  <path d=\"M24.659 7.322h-0.133c-1.427-3.878-5.11-6.465-9.242-6.493-5.478-0.037-9.949 4.374-9.986 9.852 0 0.212 0 0.412 0 0.624-2.955 0.029-5.328 2.449-5.298 5.404s2.449 5.328 5.404 5.298h6.639v-2.656h-6.639c-1.496 0-2.709-1.213-2.709-2.709s1.213-2.709 2.709-2.709c0.345 0 2.656 0.106 2.656 0.106s-0.12-2.735-0.12-3.36c-0.054-3.465 2.352-6.484 5.742-7.204 3.917-0.833 7.767 1.668 8.599 5.584l0.279 1.235 1.248-0.226c0.28-0.057 0.564-0.088 0.85-0.093 2.589 0 4.687 2.099 4.687 4.687s-2.099 4.687-4.687 4.687h-4.648v2.656h4.648c4.054-0.001 7.34-3.287 7.341-7.341 0.001-4.056-3.286-7.344-7.341-7.345z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-cloud-upload\" viewBox=\"0 0 32 32\">\n  <title>icon-cloud-upload</title>\n  <path d=\"M16.028 11.379l-6.122 6.108 1.753 1.753 2.457-2.47 0.584-1.474v13.226h2.656v-13.212l0.544 1.447 2.496 2.483 1.74-1.739z\"></path>\n  <path d=\"M24.659 9.971h-0.133c-1.427-3.878-5.11-6.465-9.242-6.493-5.478-0.037-9.949 4.374-9.986 9.852 0 0.212 0 0.412 0 0.624-2.955 0.029-5.328 2.449-5.298 5.404s2.449 5.328 5.404 5.298h6.639v-2.656h-6.639c-1.485 0-2.689-1.204-2.689-2.689s1.204-2.689 2.689-2.689l2.656 0.066c0 0-0.12-2.735-0.12-3.36-0.054-3.465 2.352-6.484 5.742-7.204 3.917-0.833 7.767 1.668 8.599 5.584l0.279 1.235 1.248-0.226c0.28-0.057 0.564-0.088 0.85-0.093 2.589 0 4.687 2.099 4.687 4.687s-2.099 4.687-4.687 4.687h-4.648v2.656h4.648c4.054-0.001 7.34-3.287 7.341-7.341 0.001-4.056-3.286-7.344-7.341-7.345z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-collapse-all\" viewBox=\"0 0 32 32\">\n  <title>icon-collapse-all</title>\n  <path d=\"M6.929 1.929h23.142v23.142h-3.071v1.929h5v-27h-27v5h1.929z\"></path>\n  <path d=\"M27 32v-27h-27v27h27zM1.929 6.929h23.142v23.142h-23.143v-23.142z\"></path>\n  <path d=\"M11.571 20.429h9.643v-3.858h-15.428v3.858z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-download\" viewBox=\"0 0 32 32\">\n  <title>icon-download</title>\n  <path d=\"M21.264 13.6l-2.88 2.88-0.784 1.872v-15.952h-3.2v15.92l-0.848-1.904-2.816-2.832-2.048 2.16 7.312 7.313 7.328-7.329z\"></path>\n  <path d=\"M28.8 20v6.4h-25.6v-6.4h-3.2v9.6h32v-9.6z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-expand-all\" viewBox=\"0 0 32 32\">\n  <title>icon-expand-all</title>\n  <path d=\"M15.429 10.786h-3.858v5.785h-5.785v3.858h5.785v5.785h3.858v-5.785h5.785v-3.858h-5.785z\"></path>\n  <path d=\"M6.929 1.929h23.142v23.142h-3.071v1.929h5v-27h-27v5h1.929z\"></path>\n  <path d=\"M27 32v-27h-27v27h27zM1.929 6.929h23.142v23.142h-23.143v-23.142z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-file\" viewBox=\"0 0 32 32\">\n  <title>icon-file</title>\n  <path d=\"M22.667 11.733h-13.333c-0.294 0-0.533 0.238-0.533 0.533s0.239 0.533 0.533 0.533h13.333c0.294 0 0.533-0.238 0.533-0.533s-0.239-0.533-0.533-0.533z\"></path>\n  <path d=\"M9.333 8.533h5.333c0.294 0 0.533-0.238 0.533-0.533s-0.239-0.533-0.533-0.533h-5.333c-0.294 0-0.533 0.238-0.533 0.533s0.239 0.533 0.533 0.533z\"></path>\n  <path d=\"M22.667 16h-13.333c-0.294 0-0.533 0.238-0.533 0.533s0.239 0.533 0.533 0.533h13.333c0.294 0 0.533-0.238 0.533-0.533s-0.239-0.533-0.533-0.533z\"></path>\n  <path d=\"M22.667 20.267h-13.333c-0.294 0-0.533 0.238-0.533 0.533s0.239 0.533 0.533 0.533h13.333c0.294 0 0.533-0.238 0.533-0.533s-0.239-0.533-0.533-0.533z\"></path>\n  <path d=\"M22.667 24.533h-13.333c-0.294 0-0.533 0.238-0.533 0.533s0.239 0.533 0.533 0.533h13.333c0.294 0 0.533-0.238 0.533-0.533s-0.239-0.533-0.533-0.533z\"></path>\n  <path d=\"M20.754 0h-17.287v32h25.067v-24.221l-7.779-7.779zM21.067 1.821l5.646 5.646h-5.646v-5.646zM4.533 30.933v-29.867h15.467v7.467h7.467v22.4h-22.933z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-folder-closed\" viewBox=\"0 0 32 32\">\n  <title>icon-folder-closed</title>\n  <path d=\"M30.389 6.133h-15.445v-2.656c0-0.888-0.722-1.611-1.611-1.611h-11.723c-0.889 0-1.611 0.722-1.611 1.611v25.045c0 0.888 0.722 1.611 1.611 1.611h28.779c0.888 0 1.611-0.722 1.611-1.611v-20.779c0-0.889-0.722-1.611-1.611-1.611zM30.933 28.523c0 0.3-0.244 0.544-0.544 0.544h-28.779c-0.3 0-0.544-0.244-0.544-0.544v-16.523h29.867v16.523zM1.067 10.933v-7.456c0-0.3 0.244-0.544 0.544-0.544h11.723c0.3 0 0.544 0.244 0.544 0.544v3.723h16.512c0.3 0 0.544 0.244 0.544 0.544v3.189h-29.867z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-folder-open\" viewBox=\"0 0 32 32\">\n  <title>icon-folder-open</title>\n  <path d=\"M31.837 12.498c-0.129-0.15-0.317-0.237-0.515-0.237h-1.434v-7.602c0-0.521-0.424-0.944-0.944-0.944h-16.379l-1.327-2.212c-0.169-0.283-0.48-0.459-0.81-0.459h-7.37c-0.521 0-0.944 0.424-0.944 0.944v10.272h-1.434c-0.198 0-0.386 0.086-0.514 0.236s-0.187 0.348-0.157 0.545l2.627 17.338c0.052 0.334 0.334 0.576 0.671 0.576h25.389c0.338 0 0.62-0.242 0.671-0.577l2.626-17.334c0.030-0.196-0.026-0.395-0.155-0.545zM3.181 2.113h7.175l1.327 2.212c0.169 0.283 0.48 0.459 0.81 0.459h16.326v7.478h-1.068v-3.739h-23.502v3.739h-1.068v-10.148zM26.683 12.261h-21.365v-2.671h21.365v2.671zM28.36 29.888h-24.72l-2.508-16.558h29.737l-2.509 16.558z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-minus\" viewBox=\"0 0 32 32\">\n  <title>icon-minus</title>\n  <path d=\"M0 13.5h32v5h-32v-5z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-no\" viewBox=\"0 0 32 32\">\n  <title>icon-no</title>\n  <path d=\"M31.495 3.051l-2.546-2.546-12.949 12.949-12.949-12.949-2.546 2.546 12.949 12.949-12.949 12.949 2.546 2.546 12.949-12.949 12.949 12.949 2.546-2.546-12.949-12.949z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-plus\" viewBox=\"0 0 32 32\">\n  <title>icon-plus</title>\n  <path d=\"M32 13.5h-13.5v-13.5h-5v13.5h-13.5v5h13.5v13.5h5v-13.5h13.5z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-upload\" viewBox=\"0 0 32 32\">\n  <title>icon-upload</title>\n  <path d=\"M23.328 9.729l-7.328-7.329-7.312 7.313 2.048 2.16 2.816-2.832 0.848-1.904v15.92h3.2v-15.952l0.784 1.872 2.88 2.88 2.064-2.128z\"></path>\n  <path d=\"M28.8 20v6.4h-25.6v-6.4h-3.2v9.6h32v-9.6h-3.2z\"></path>\n  </symbol>\n  <symbol id=\"glyph-icon-yes\" viewBox=\"0 0 32 32\">\n  <title>icon-yes</title>\n  <path d=\"M10.182 23.091l-7.637-7.636-2.545 2.545 10.182 10.182 21.818-21.818-2.546-2.546z\"></path>\n  </symbol>\n  <symbol id=\"glyph-invalid\" viewBox=\"0 0 32 32\">\n  <title>invalid</title>\n  <path d=\"M16 0c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13c7.18 0 13 5.82 13 13s-5.82 13-13 13z\"></path>\n  <path d=\"M17.381 18.65l0.527-10.871h-3.816l0.553 10.871z\"></path>\n  <path d=\"M16.012 19.852c-1.271 0-2.16 0.912-2.16 2.188 0 1.248 0.864 2.188 2.16 2.188s2.136-0.938 2.136-2.188c-0.023-1.276-0.863-2.188-2.136-2.188z\"></path>\n  </symbol>\n  <symbol id=\"glyph-language\" viewBox=\"0 0 32 32\">\n  <title>language</title>\n  <path d=\"M11.99 17.246v-1.319c-0.736-0.502-1.433-1.098-2.074-1.805-1.859 1.796-3.639 2.935-3.839 3.062l-0.169 0.104-1.024-1.637 0.167-0.107c0.021-0.015 1.832-1.162 3.661-2.954-1.679-2.449-2.325-4.916-2.35-5.022l-0.050-0.189 1.872-0.481 0.046 0.19c0.004 0.021 0.538 1.995 1.834 4.027 1.282-1.558 2.028-3.059 2.218-4.475h-7.86v-2.1h4.333v-1.169h2.020v1.167h4.333v2.103h-0.872c-0.203 1.968-1.203 4.006-2.978 6.066 0.238 0.268 0.483 0.513 0.732 0.747v-0.989c0-0.703 0.568-1.271 1.271-1.271h5.656v-10.004c0-0.176-0.14-0.318-0.317-0.318h-18.282c-0.176 0-0.318 0.142-0.318 0.318v18.279c0 0.178 0.142 0.318 0.318 0.318h11.672v-2.541z\"></path>\n  <path d=\"M22.432 17.805h-0.035c-0.176 0.696-0.348 1.578-0.539 2.254l-0.695 2.482h2.585l-0.726-2.482c-0.21-0.695-0.418-1.561-0.59-2.254z\"></path>\n  <path d=\"M31.682 12.213h-18.279c-0.175 0-0.318 0.142-0.318 0.318v18.281c0 0.176 0.143 0.315 0.318 0.315h18.279c0.178 0 0.318-0.14 0.318-0.315v-18.281c0-0.174-0.141-0.318-0.318-0.318zM25.033 27.518l-0.901-3.004h-3.348l-0.835 3.004h-2.738l3.573-11.689h3.467l3.624 11.689h-2.842z\"></path>\n  <path d=\"M8.228 20.588h-2.54v4.224l2.103 2.083h4.726v-2.541h-4.289z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-bold\" viewBox=\"0 0 32 32\">\n  <title>md-bold</title>\n  <path d=\"M4.475 31.999v-1.071c0.809-0.47 1.479-0.949 2.012-1.421 0.091-0.745 0.152-1.657 0.184-2.734 0.062-2.229 0.092-6.27 0.092-12.132 0-1.567-0.040-4.013-0.117-7.332-0.046-2.559-0.129-4.023-0.251-4.387-0.077-0.229-0.19-0.388-0.343-0.48-0.318-0.211-1.46-0.379-3.426-0.501v-1.895c0.333 0 0.686 0.006 1.050 0.021l3.154 0.092c1.035 0.016 2.323 0.025 3.86 0.025 1.524 0 2.718-0.016 3.588-0.046 2.192-0.091 3.625-0.138 4.292-0.138 2.518 0 4.455 0.261 5.813 0.778 1.366 0.518 2.363 1.268 2.994 2.25 0.632 0.978 0.944 2.082 0.944 3.3 0 1.31-0.356 2.528-1.079 3.654-0.729 1.126-1.65 2.002-2.777 2.626-0.674 0.379-2.161 0.891-4.475 1.53 2.768 0.334 4.699 0.778 5.789 1.326s1.962 1.405 2.617 2.569c0.655 1.163 0.979 2.465 0.979 3.896 0 1.506-0.337 2.875-1.003 4.099-0.674 1.225-1.534 2.274-2.594 3.137-1.059 0.87-2.273 1.559-3.646 2.074-1.372 0.508-3.079 0.761-5.136 0.761l-7.675-0.133c-1.237-0.001-2.85 0.041-4.846 0.132zM13.131 13.224l1.326 0.024c1.038 0 1.996-0.085 2.881-0.25 0.882-0.168 1.597-0.462 2.143-0.882 0.551-0.417 1.013-1.041 1.386-1.87 0.374-0.828 0.561-1.788 0.561-2.868 0-1.096-0.215-2.030-0.643-2.798-0.429-0.767-0.98-1.316-1.665-1.644-0.686-0.328-1.714-0.493-3.086-0.493-0.989 0-1.888 0.062-2.693 0.184-0.092 1.097-0.147 2.36-0.162 3.793l-0.043 3.539v3.265h-0.005zM13.224 29.442c0.502 0.109 1.447 0.158 2.834 0.158 1.885 0 3.413-0.622 4.576-1.858 1.169-1.243 1.748-3.021 1.748-5.334 0-1.648-0.298-2.976-0.912-3.998-0.605-1.022-1.414-1.743-2.417-2.159-1.011-0.419-2.395-0.627-4.161-0.627-0.624 0-1.209 0.030-1.761 0.092v10.414l0.046 2.719c0.001 0.070 0.016 0.275 0.047 0.593z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-head\" viewBox=\"0 0 32 32\">\n  <title>md-head</title>\n  <path d=\"M9.236 0v12.818h13.535v-12.818h5.834v32h-5.834v-14.1h-13.535v14.099h-5.841v-31.999h5.841z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-help\" viewBox=\"0 0 32 32\">\n  <title>md-help</title>\n  <path d=\"M12.49 21.895l-0.090-1.17c-0.226-2.34 0.585-4.815 2.699-7.38 1.71-2.025 2.835-3.6 2.835-5.354 0-1.89-1.17-3.15-3.689-3.195-1.575 0-3.375 0.495-4.5 1.35l-1.35-3.96c1.62-1.035 4.229-1.845 7.064-1.845 5.58 0 8.145 3.24 8.145 6.84 0 3.24-1.979 5.49-3.915 7.694-1.755 2.071-2.475 3.915-2.385 6.075l0.045 0.945h-4.859zM11.365 28.15c0-2.070 1.439-3.512 3.42-3.512 2.024 0 3.375 1.441 3.42 3.512 0 1.979-1.35 3.51-3.42 3.51-2.025 0-3.42-1.531-3.42-3.51z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-image\" viewBox=\"0 0 32 32\">\n  <title>md-image</title>\n  <path d=\"M30.934 3.2h-29.868c-0.587 0-1.066 0.408-1.066 0.914v23.773c0 0.502 0.479 0.914 1.066 0.914h29.867c0.59 0 1.066-0.412 1.066-0.914v-23.773c0.001-0.506-0.476-0.914-1.065-0.914zM30.4 27.199h-28.8v-22.399h28.8v22.399z\"></path>\n  <path d=\"M26.52 25.066h1.918l-6.151-10.796-2.451 4.302-10.652-10.348-5.622 16.842h12.573z\"></path>\n  <path d=\"M28.267 9.6c0 1.473-1.194 2.667-2.667 2.667s-2.667-1.194-2.667-2.667c0-1.473 1.194-2.667 2.667-2.667s2.667 1.194 2.667 2.667z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-italic\" viewBox=\"0 0 32 32\">\n  <title>md-italic</title>\n  <path d=\"M8.081 32l0.136-1.337c1.644-0.062 2.586-0.158 2.828-0.292 0.164-0.091 0.316-0.255 0.453-0.498 0.256-0.486 0.735-2.538 1.438-6.165 0.702-3.634 1.57-8.608 2.612-14.928 0.529-3.199 0.793-5.22 0.793-6.064 0-0.483-0.091-0.815-0.273-0.997-0.18-0.178-0.535-0.295-1.063-0.341l-2.692-0.112 0.224-1.266 6.721 0.091c1.058 0 2.613-0.030 4.661-0.091l-0.085 1.267c-1.604 0.077-2.516 0.159-2.741 0.25-0.163 0.061-0.291 0.152-0.382 0.271-0.152 0.183-0.274 0.483-0.365 0.905-0.479 2.142-1.154 5.718-2.011 10.729l-1.86 10.43c-0.482 2.941-0.722 4.812-0.722 5.615 0 0.407 0.106 0.668 0.315 0.79 0.422 0.243 1.646 0.376 3.663 0.407l-0.158 1.336c-2.137-0.122-4.054-0.183-5.744-0.183-1.689-0.001-3.606 0.061-5.748 0.183z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-link\" viewBox=\"0 0 32 32\">\n  <title>md-link</title>\n  <path d=\"M13.704 19.961c-0.426 0-0.852-0.163-1.177-0.488-3.044-3.044-3.044-7.998 0-11.042l6.144-6.144c1.475-1.475 3.436-2.287 5.521-2.287s4.046 0.812 5.521 2.287c3.045 3.044 3.045 7.998 0 11.042l-2.809 2.809c-0.649 0.649-1.703 0.649-2.353 0s-0.65-1.704 0-2.354l2.809-2.809c1.746-1.747 1.746-4.589 0-6.335-0.847-0.846-1.972-1.312-3.168-1.312-1.197 0-2.322 0.466-3.168 1.312l-6.144 6.144c-1.747 1.747-1.747 4.589 0 6.336 0.65 0.649 0.649 1.703 0 2.353-0.325 0.325-0.751 0.488-1.176 0.488v0z\"></path>\n  <path d=\"M7.808 32c-2.085 0-4.046-0.812-5.521-2.287-3.044-3.044-3.044-7.998 0-11.042l2.808-2.809c0.65-0.649 1.704-0.649 2.354 0s0.65 1.704 0 2.354l-2.809 2.809c-1.747 1.747-1.747 4.589 0 6.336 0.846 0.846 1.971 1.312 3.168 1.312s2.322-0.466 3.168-1.312l6.144-6.144c1.747-1.747 1.747-4.589 0-6.336-0.65-0.649-0.65-1.703 0-2.353s1.703-0.65 2.354 0c3.044 3.044 3.044 7.998 0 11.042l-6.145 6.144c-1.475 1.474-3.435 2.286-5.521 2.286v0z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-list\" viewBox=\"0 0 32 32\">\n  <title>md-list</title>\n  <path d=\"M0 13.333h5.866v5.333h-5.866v-5.333z\"></path>\n  <path d=\"M11.2 13.333h20.8v5.333h-20.8v-5.333z\"></path>\n  <path d=\"M0 24.533h5.866v5.334h-5.866v-5.334z\"></path>\n  <path d=\"M11.2 24.533h20.8v5.334h-20.8v-5.334z\"></path>\n  <path d=\"M0 2.134h5.866v5.333h-5.866v-5.333z\"></path>\n  <path d=\"M11.2 2.134h20.8v5.333h-20.8v-5.333z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-number\" viewBox=\"0 0 32 32\">\n  <title>md-number</title>\n  <path d=\"M9.638 13.198h22.362v5.733h-22.362v-5.733z\"></path>\n  <path d=\"M9.638 25.24h22.362v5.732h-22.362v-5.732z\"></path>\n  <path d=\"M9.638 1.156h22.362v5.734h-22.362v-5.734z\"></path>\n  <path d=\"M1.798 2.168h0.017v4.722h1.348v-5.961h-1.154l-1.577 0.733 0.228 1.046z\"></path>\n  <path d=\"M2.017 17.764l0.549-0.453c0.861-0.772 1.587-1.571 1.587-2.569 0-1.082-0.743-1.869-2.091-1.869-0.808 0-1.504 0.274-1.953 0.614l0.395 1c0.312-0.238 0.762-0.496 1.274-0.496 0.688 0 0.979 0.386 0.979 0.872-0.018 0.697-0.65 1.367-1.953 2.532l-0.769 0.697v0.84h4.228v-1.146h-2.246v-0.022z\"></path>\n  <path d=\"M2.917 27.803v-0.021c0.734-0.256 1.089-0.75 1.089-1.383 0-0.816-0.706-1.488-1.979-1.488-0.771 0-1.485 0.221-1.843 0.453l0.284 1.008c0.249-0.148 0.762-0.361 1.247-0.361 0.586 0 0.88 0.268 0.88 0.625 0 0.502-0.596 0.68-1.062 0.688h-0.543v1h0.57c0.614 0 1.201 0.268 1.201 0.855 0 0.447-0.368 0.795-1.092 0.795-0.57 0-1.137-0.24-1.385-0.367l-0.284 1.045c0.348 0.219 1 0.418 1.769 0.418 1.513 0 2.438-0.766 2.438-1.82 0.001-0.779-0.576-1.32-1.29-1.447z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-preview\" viewBox=\"0 0 32 32\">\n  <title>md-preview</title>\n  <path d=\"M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z\"></path>\n  </symbol>\n  <symbol id=\"glyph-md-strike\" viewBox=\"0 0 32 32\">\n  <title>md-strike</title>\n  <path d=\"M27.629 19.637h-1.429c-0.103-0.541-0.261-1.045-0.477-1.508-0.416-0.901-0.948-1.628-1.6-2.182-0.65-0.557-1.653-1.036-3.006-1.438-1.442-0.276-3.064-0.53-4.869-0.771-1.805-0.238-3.103-0.492-3.894-0.768-1.155-0.404-1.955-0.94-2.403-1.61s-0.671-1.616-0.671-2.843c0-2.032 0.624-3.687 1.873-4.96 1.249-1.276 2.918-1.916 5.007-1.916 1.616 0 3.164 0.419 4.652 1.254 0.621 0.419 1.112 0.888 1.47 1.41 0.088 0.199 0.152 1.412 0.193 3.633h1.471c0.047-1.529 0.112-2.687 0.2-3.472 0.082-0.785 0.229-1.635 0.428-2.543-1.255-0.626-2.604-1.101-4.053-1.431-1.452-0.33-2.791-0.492-4.015-0.492-2.033 0-3.917 0.419-5.658 1.254-1.738 0.839-3.049 2.009-3.936 3.516-0.885 1.509-1.33 3.111-1.33 4.813 0 1.168 0.22 2.259 0.659 3.27 0.442 1.008 1.014 1.822 1.719 2.443 0.709 0.621 1.811 1.16 3.311 1.62 1.125 0.246 2.49 0.469 4.090 0.674 1.603 0.199 2.669 0.346 3.203 0.434 0.85 0.171 1.564 0.473 2.145 0.894 0.281 0.209 0.52 0.452 0.731 0.719h-17.068v2.595h17.976c0.027 0.274 0.065 0.538 0.065 0.832 0 1.243-0.282 2.405-0.845 3.496s-1.453 1.969-2.684 2.638c-1.225 0.674-2.566 1.010-4.022 1.010-0.997 0-2.024-0.174-3.095-0.513-1.067-0.339-1.919-0.724-2.552-1.157-0.635-0.433-1.034-0.841-1.201-1.221-0.167-0.381-0.284-1.626-0.357-3.73h-1.47c-0.043 3.102-0.181 5.345-0.41 6.728 2.321 1.123 4.911 1.685 7.768 1.685 3.776 0 6.858-1.065 9.237-3.198 2.119-1.898 3.287-4.086 3.523-6.563h1.323v-2.602z\"></path>\n  </symbol>\n  <symbol id=\"glyph-radio-off\" viewBox=\"0 0 32 32\">\n  <title>radio-off</title>\n  <path d=\"M16 0c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z\"></path>\n  </symbol>\n  <symbol id=\"glyph-radio-on\" viewBox=\"0 0 32 32\">\n  <title>radio-on</title>\n  <path d=\"M16 0c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z\"></path>\n  <path d=\"M16 8c-4.419 0-8 3.581-8 8s3.581 8 8 8c4.419 0 8-3.581 8-8s-3.581-8-8-8z\"></path>\n  </symbol>\n  <symbol id=\"glyph-refresh\" viewBox=\"0 0 32 32\">\n  <title>refresh</title>\n  <path d=\"M32.050 11.987h-12.037l4.499-4.499c-2.273-2.274-5.297-3.526-8.512-3.526s-6.238 1.252-8.512 3.526c-2.274 2.273-3.526 5.296-3.526 8.512 0 3.215 1.252 6.238 3.526 8.512 2.273 2.273 5.296 3.525 8.512 3.525 3.215 0 6.238-1.252 8.512-3.525 0.19-0.189 0.371-0.385 0.548-0.585l3.020 2.643c-2.942 3.358-7.264 5.48-12.079 5.48-8.864 0-16.050-7.186-16.050-16.050s7.186-16.050 16.050-16.050c4.432 0 8.444 1.797 11.348 4.702l4.702-4.702v12.037z\"></path>\n  </symbol>\n  <symbol id=\"glyph-search\" viewBox=\"0 0 32 32\">\n  <title>search</title>\n  <path d=\"M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z\"></path>\n  </symbol>\n  <symbol id=\"glyph-time\" viewBox=\"0 0 32 32\">\n  <title>time</title>\n  <path d=\"M16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16zM16 30.934c-8.234 0-14.934-6.7-14.934-14.934s6.7-14.934 14.934-14.934 14.934 6.7 14.934 14.934-6.7 14.934-14.934 14.934z\"></path>\n  <path d=\"M16 3.2c-0.294 0-0.534 0.238-0.534 0.534v12.266h-8c-0.294 0-0.534 0.238-0.534 0.534s0.238 0.534 0.534 0.534h8.534c0.294 0 0.534-0.238 0.534-0.534v-12.8c0-0.294-0.238-0.534-0.534-0.534z\"></path>\n  </symbol>\n  <symbol id=\"glyph-tree-check-off\" viewBox=\"0 0 32 32\">\n  <title>tree-check-off</title>\n  <path d=\"M27.2 4.8v22.4h-22.4v-22.4h22.4zM30 2h-28v28h28v-28z\"></path>\n  </symbol>\n  <symbol id=\"glyph-tree-check-on\" viewBox=\"0 0 32 32\">\n  <title>tree-check-on</title>\n  <path d=\"M2 2v28h28v-28h-28zM27.2 27.2h-22.4v-22.4h22.4v22.4z\"></path>\n  <path d=\"M13.9 23.17l11.37-11.37-2.97-2.969-8.4 8.399-4.2-4.2-2.97 2.97 4.201 4.2z\"></path>\n  </symbol>\n  <symbol id=\"glyph-tree-check-partial\" viewBox=\"0 0 32 32\">\n  <title>tree-check-partial</title>\n  <path d=\"M2 2v28h28v-28h-28zM27.203 27.203h-22.402v-22.402h22.402v22.402z\"></path>\n  <path d=\"M9 9h14v14h-14v-14z\"></path>\n  </symbol>\n  <symbol id=\"glyph-tree-collapse\" viewBox=\"0 0 32 32\">\n  <title>tree-collapse</title>\n  <path d=\"M6 6v20h20v-20h-20zM24 24h-16v-16h16v16z\"></path>\n  <path d=\"M10 14.5h12v3h-12v-3z\"></path>\n  </symbol>\n  <symbol id=\"glyph-tree-expand\" viewBox=\"0 0 32 32\">\n  <title>tree-expand</title>\n  <path d=\"M6 6v20h20v-20h-20zM24 24h-16v-16h16v16z\"></path>\n  <path d=\"M14.5 22.104h3v-4.5h4.358v-3h-4.358v-4.5h-3v4.5h-4.642v3h4.642z\"></path>\n  </symbol>\n  </defs>\n  </svg>\n</template>")
        ], UIGlyphs);
        return UIGlyphs;
    }());
    exports.UIGlyphs = UIGlyphs;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/core/ui-grid',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIFiller = (function () {
        function UIFiller() {
        }
        UIFiller = __decorate([
            aurelia_framework_1.customElement('ui-filler'),
            aurelia_framework_1.inlineView('<template class="ui-column-fill"></template>')
        ], UIFiller);
        return UIFiller;
    }());
    exports.UIFiller = UIFiller;
    var UIContainer = (function () {
        function UIContainer(element) {
            this.element = element;
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UIContainer = __decorate([
            aurelia_framework_1.customElement('ui-container'),
            aurelia_framework_1.inlineView('<template class="ui-container"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIContainer);
        return UIContainer;
    }());
    exports.UIContainer = UIContainer;
    var UIRow = (function () {
        function UIRow(element) {
            this.element = element;
            if (element.hasAttribute('top'))
                element.classList.add('ui-align-start');
            else if (element.hasAttribute('middle'))
                element.classList.add('ui-align-center');
            else if (element.hasAttribute('bottom'))
                element.classList.add('ui-align-end');
            else if (element.hasAttribute('stretch'))
                element.classList.add('ui-align-stretch');
            if (element.hasAttribute('start'))
                element.classList.add('ui-justify-start');
            else if (element.hasAttribute('center'))
                element.classList.add('ui-justify-center');
            else if (element.hasAttribute('end'))
                element.classList.add('ui-justify-end');
            else if (element.hasAttribute('between'))
                element.classList.add('ui-justify-betweeen');
            else if (element.hasAttribute('around'))
                element.classList.add('ui-justify-around');
            if (!element.hasAttribute('nogutter'))
                element.classList.add('ui-gutter');
            if (element.hasAttribute('nowrap'))
                element.classList.add('ui-nowrap');
            if (element.hasAttribute('vertical-reverse'))
                element.classList.add('ui-row-v-reverse');
            else if (element.hasAttribute('vertical'))
                element.classList.add('ui-row-v');
            else if (element.hasAttribute('reverse'))
                element.classList.add('ui-row-h-reverse');
            else
                element.classList.add('ui-row-h');
        }
        UIRow = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-row'),
            aurelia_framework_1.inlineView('<template class="ui-row"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIRow);
        return UIRow;
    }());
    exports.UIRow = UIRow;
    var UIColumn = (function () {
        function UIColumn(element) {
            this.element = element;
            this.size = '';
            this.width = '';
            this.row = '';
            if (element.hasAttribute('top'))
                element.classList.add('ui-self-top');
            else if (element.hasAttribute('middle'))
                element.classList.add('ui-self-middle');
            else if (element.hasAttribute('bottom'))
                element.classList.add('ui-self-bottom');
            else if (element.hasAttribute('stretch'))
                element.classList.add('ui-self-stretch');
            if (element.hasAttribute('auto'))
                element.classList.add('ui-column-auto');
            else if (element.hasAttribute('fill'))
                element.classList.add('ui-column-fill');
            else if (element.hasAttribute('full'))
                element.classList.add('ui-column-full');
            else if (element.hasAttribute('form'))
                element.classList.add('ui-column-form');
        }
        UIColumn.prototype.bind = function () {
            if (this.size.length) {
                for (var _i = 0, _a = this.size.split(' '); _i < _a.length; _i++) {
                    var size = _a[_i];
                    this.element.classList.add("ui-column-" + size);
                }
            }
            if (this.width)
                this.element['style'].flexBasis = this.width;
            if (this.row.length) {
                for (var _b = 0, _c = this.row.split(' '); _b < _c.length; _b++) {
                    var row = _c[_b];
                    this.element.classList.add("ui-row");
                    if (row === 'top')
                        this.element.classList.add('ui-align-start');
                    else if (row === 'middle')
                        this.element.classList.add('ui-align-center');
                    else if (row === 'bottom')
                        this.element.classList.add('ui-align-end');
                    else if (row === 'stretch')
                        this.element.classList.add('ui-align-stretch');
                    if (row === 'start')
                        this.element.classList.add('ui-justify-start');
                    else if (row === 'center')
                        this.element.classList.add('ui-justify-center');
                    else if (row === 'end')
                        this.element.classList.add('ui-justify-end');
                    else if (row === 'between')
                        this.element.classList.add('ui-justify-betweeen');
                    else if (row === 'around')
                        this.element.classList.add('ui-justify-around');
                    if (row !== 'nogutter')
                        this.element.classList.add('ui-gutter');
                    if (row === 'nowrap')
                        this.element.classList.add('ui-nowrap');
                    if (row === 'vertical-reverse')
                        this.element.classList.add('ui-row-v-reverse');
                    else if (row === 'vertical')
                        this.element.classList.add('ui-row-v');
                    else if (row === 'reverse')
                        this.element.classList.add('ui-row-h-reverse');
                    else if (row === 'row')
                        this.element.classList.add('ui-row-h');
                }
            }
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIColumn.prototype, "row", void 0);
        UIColumn = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-column'),
            aurelia_framework_1.inlineView('<template class="ui-column"><slot></slot></template>'),
            __metadata("design:paramtypes", [Element])
        ], UIColumn);
        return UIColumn;
    }());
    exports.UIColumn = UIColumn;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/core/ui-page',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIPage = (function () {
        function UIPage(element) {
            this.element = element;
            this.pageClass = '';
            if (element.hasAttribute('animate'))
                element.classList.add('au-animate');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPage.prototype, "pageClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPage.prototype, "pageTitle", void 0);
        UIPage = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-page'),
            aurelia_framework_1.inlineView("\n<template class=\"ui-page ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap\">\n  <div class=\"ui-page-title ui-column-auto\" if.bind=\"pageTitle\" innerhtml.bind=\"pageTitle\"></div>\n  <div class=\"ui-page-body ui-column-fill ui-row ui-row-v ui-align-stretch ${pageClass}\"><slot></slot></div>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UIPage);
        return UIPage;
    }());
    exports.UIPage = UIPage;
    var UISection = (function () {
        function UISection(element) {
            this.element = element;
            if (element.hasAttribute('animate'))
                element.classList.add('au-animate');
            if (element.hasAttribute('row-layout'))
                element.classList.add('ui-row-h');
            else
                element.classList.add('ui-row-v');
            if (element.hasAttribute('center'))
                element.classList.add('ui-justify-center');
            if (element.hasAttribute('middle'))
                element.classList.add('ui-align-center');
        }
        UISection = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-section'),
            aurelia_framework_1.inlineView("<template class=\"ui-section ui-column-fill ui-row ui-align-stretch ui-nowrap\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UISection);
        return UISection;
    }());
    exports.UISection = UISection;
    var UIContent = (function () {
        function UIContent(element) {
            this.element = element;
            if (element.hasAttribute('animate'))
                element.classList.add('au-animate');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
        }
        UIContent = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-content'),
            aurelia_framework_1.inlineView("<template class=\"ui-content ui-column-fill\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIContent);
        return UIContent;
    }());
    exports.UIContent = UIContent;
    var UIGlyph = (function () {
        function UIGlyph(element) {
            this.element = element;
            this.glyph = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIGlyph.prototype, "glyph", void 0);
        UIGlyph = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-glyph'),
            aurelia_framework_1.inlineView("<template class=\"ui-icon ${glyph}\"><svg if.bind=\"glyph\"><use tabindex=\"-1\" x=\"0\" y=\"0\" xlink:href=\"#${glyph}\"/></svg></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIGlyph);
        return UIGlyph;
    }());
    exports.UIGlyph = UIGlyph;
    var UIDivider = (function () {
        function UIDivider() {
        }
        UIDivider = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-divider'),
            aurelia_framework_1.inlineView("<template class=\"ui-divider\"></template>")
        ], UIDivider);
        return UIDivider;
    }());
    exports.UIDivider = UIDivider;
    var UILoader = (function () {
        function UILoader(element) {
            this.busy = false;
            if (element.hasAttribute('small'))
                element.classList.add('ui-small');
            if (element.hasAttribute('large'))
                element.classList.add('ui-large');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UILoader.prototype, "busy", void 0);
        UILoader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-loader'),
            aurelia_framework_1.inlineView("<template class=\"ui-loader\" show.bind=\"busy\">\n  <div class=\"ui-loader-el\">\n    <ui-glyph class=\"ui-anim-loader\" glyph=\"glyph-busy\"></ui-glyph>\n  </div>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UILoader);
        return UILoader;
    }());
    exports.UILoader = UILoader;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/core/ui-viewport',["require", "exports", "aurelia-framework", "aurelia-router", "../../utils/ui-event", "../../utils/ui-utils"], function (require, exports, aurelia_framework_1, aurelia_router_1, ui_event_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CSS_PREFIX = 'ui-viewport';
    var UIViewport = (function () {
        function UIViewport(element) {
            this.element = element;
            var __resizeTimer;
            document.addEventListener('dragstart', function (e) { return getParentByClass(e.target, '.ui-draggable') != null; });
            document.addEventListener('mouseup', function (e) { return ui_event_1.UIEvent.broadcast('mouseclick', e); });
            document.addEventListener('touchstart', function (e) { return ui_event_1.UIEvent.broadcast('mouseclick', e); });
            window.addEventListener('resize', function (e) {
                window.clearTimeout(__resizeTimer);
                window.setTimeout(function () { return ui_event_1.UIEvent.broadcast('windowresize'); }, 500);
            });
            this.router = ui_utils_1.UIUtils.auContainer.get(aurelia_router_1.AppRouter);
        }
        UIViewport.prototype.attached = function () {
            ui_utils_1.UIUtils.dialogContainer = this.dialogContainer;
            ui_utils_1.UIUtils.overlayContainer = this.overlayContainer;
            ui_utils_1.UIUtils.taskbarContainer = this.taskbarContainer;
            document.documentElement.classList.add(window.browserAgent());
            ui_event_1.UIEvent.fireEvent('appready', this.element);
            if (document.querySelector('.ui-splash'))
                aurelia_framework_1.DOM.removeNode(document.querySelector('.ui-splash'));
        };
        UIViewport = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"" + CSS_PREFIX + " ui-row ui-row-v ui-align-stretch ui-nowrap\">\n  <compose view-model=\"./ui-glyphs\"></compose>\n  <slot name=\"ui-app-banner\"></slot>\n  <slot name=\"ui-app-header\"></slot>\n  <slot></slot>\n  <div class=\"" + CSS_PREFIX + "-taskbar\"><slot name=\"ui-app-taskbar\"></slot><div class=\"" + CSS_PREFIX + "-taskbar-wrapper\" ref=\"taskbarContainer\"></div></div>\n  <slot name=\"ui-app-footer\"></slot>\n\n  <div class=\"ui-dialog-container\" ref=\"dialogContainer\"></div>\n  <div class=\"ui-overlay-container ui-row ui-row-v ui-align-end\" ref=\"overlayContainer\"></div>\n\n  <ui-loader large busy.bind=\"router.isNavigating\"></ui-loader>\n</template>"),
            aurelia_framework_1.customElement('ui-viewport'),
            __metadata("design:paramtypes", [Element])
        ], UIViewport);
        return UIViewport;
    }());
    exports.UIViewport = UIViewport;
    var UIRouterView = (function () {
        function UIRouterView(element) {
            this.element = element;
            this.name = 'default';
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRouterView.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRouterView.prototype, "class", void 0);
        UIRouterView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><router-view class=\"ui-router-view ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap ${class}\" name=\"${name}\"></router-view></template>"),
            aurelia_framework_1.customElement('ui-router-view'),
            __metadata("design:paramtypes", [Element])
        ], UIRouterView);
        return UIRouterView;
    }());
    exports.UIRouterView = UIRouterView;
    var UIAppHeader = (function () {
        function UIAppHeader(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppHeader.prototype, "class", void 0);
        UIAppHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-header ui-column-auto ui-row ui-row-h ui-align-center ui-nowrap ${class}\" slot=\"ui-app-header\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-header'),
            __metadata("design:paramtypes", [Element])
        ], UIAppHeader);
        return UIAppHeader;
    }());
    exports.UIAppHeader = UIAppHeader;
    var UIAppBanner = (function () {
        function UIAppBanner(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppBanner.prototype, "class", void 0);
        UIAppBanner = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-banner ui-column-auto ${class}\" slot=\"ui-app-banner\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-banner'),
            __metadata("design:paramtypes", [Element])
        ], UIAppBanner);
        return UIAppBanner;
    }());
    exports.UIAppBanner = UIAppBanner;
    var UIAppFooter = (function () {
        function UIAppFooter(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppFooter.prototype, "class", void 0);
        UIAppFooter = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-footer ui-column-auto ui-row ui-row-h ui-align-center ui-justify-between ${class}\" slot=\"ui-app-footer\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-footer'),
            __metadata("design:paramtypes", [Element])
        ], UIAppFooter);
        return UIAppFooter;
    }());
    exports.UIAppFooter = UIAppFooter;
    var UIAppQuickLinks = (function () {
        function UIAppQuickLinks(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppQuickLinks.prototype, "class", void 0);
        UIAppQuickLinks = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"" + CSS_PREFIX + "-taskbar-tools ${class}\" slot=\"ui-app-taskbar\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-app-quick-links'),
            __metadata("design:paramtypes", [Element])
        ], UIAppQuickLinks);
        return UIAppQuickLinks;
    }());
    exports.UIAppQuickLinks = UIAppQuickLinks;
    var UIAppTitle = (function () {
        function UIAppTitle(element) {
            this.element = element;
            this.href = '/';
            this.src = '';
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppTitle.prototype, "href", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppTitle.prototype, "src", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAppTitle.prototype, "class", void 0);
        UIAppTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-app-title'),
            aurelia_framework_1.inlineView("<template><a href.bind=\"href\" class=\"" + CSS_PREFIX + "-title ui-row ui-row-h ui-align-center ui-nowrap ${class}\"><img if.bind=\"src\" src.bind=\"src\" class=\"" + CSS_PREFIX + "-tile-image\"/><span class=\"ui-column-auto\"><slot></slot></span></a><div class=\"ui-column-fill\"></div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIAppTitle);
        return UIAppTitle;
    }());
    exports.UIAppTitle = UIAppTitle;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-alerts',["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIToast = (function () {
        function UIToast(element) {
            this.element = element;
            this.show = true;
            this.glyph = '';
            this.timeout = 0;
        }
        UIToast.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            if (bindingContext)
                Object.assign(this, bindingContext);
            ui_event_1.UIEvent.queueTask(function () {
                _this.element.classList.add('ui-open');
                if (!isNaN(_this.timeout) && parseInt(_this.timeout + '') > 0) {
                    setTimeout(function () { return _this.startClose(); }, parseInt(_this.timeout + ''));
                }
            });
        };
        UIToast.prototype.startClose = function (force) {
            var _this = this;
            if (ui_event_1.UIEvent.fireEvent('close', this.element) !== false) {
                this.element.classList.remove('ui-open');
                setTimeout(function () { return aurelia_framework_1.DOM.removeNode(_this.element); }, 500);
            }
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIToast.prototype, "show", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIToast.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIToast.prototype, "timeout", void 0);
        UIToast = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-toast'),
            aurelia_framework_1.inlineView("<template class=\"ui-toast\" click.trigger=\"startClose()\"><div class=\"ui-wrapper\">\n  <ui-glyph glyph.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-message\"><slot><slot></span><span class=\"ui-close\">&times;</span>\n</div></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIToast);
        return UIToast;
    }());
    exports.UIToast = UIToast;
    var UIAlert = (function () {
        function UIAlert(element) {
            this.element = element;
            this.glyph = '';
            this.okLabel = 'OK';
            this.cancelLabel = 'Cancel';
            this.confirm = false;
            this.confirm = element.hasAttribute('confirm');
        }
        UIAlert.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            if (bindingContext)
                Object.assign(this, bindingContext);
            ui_event_1.UIEvent.queueTask(function () {
                _this.element.classList.add('ui-open');
                if (_this.focusBlock)
                    _this.focusBlock.focus();
            });
        };
        UIAlert.prototype.closeAlert = function (b) {
            var _this = this;
            this.element.classList.remove('ui-open');
            setTimeout(function () {
                if (_this.closeCallback)
                    _this.closeCallback(b);
                aurelia_framework_1.DOM.removeNode(_this.element);
            }, 100);
        };
        UIAlert.prototype.cancelBlur = function ($event) {
            $event.preventDefault();
            this.focusBlock.focus();
            return false;
        };
        UIAlert.prototype.checkKey = function ($event) {
            var key = ($event.keyCode || $event.which);
            if (key == 13)
                this.closeAlert(true);
            if (key == 27)
                this.closeAlert(false);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "okLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "cancelLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIAlert.prototype, "closeCallback", void 0);
        UIAlert = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-alert-shim\"><div class=\"ui-alert\">\n  <div class=\"ui-wrapper\">\n  <input style=\"position:absolute;opacity:0;\" ref=\"focusBlock\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"/>\n  <ui-glyph glyph.bind=\"glyph\" class.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-message\"><slot><slot></span></div>\n  <div class=\"ui-button-bar\"><button click.trigger=\"closeAlert(true)\" t.bind=\"okLabel\">${okLabel}</button><button show.bind=\"confirm\" click.trigger=\"closeAlert(false)\" t.bind=\"cancelLabel\">${cancelLabel}</button></div>\n  </div></template>"),
            aurelia_framework_1.customElement('ui-alert'),
            __metadata("design:paramtypes", [Element])
        ], UIAlert);
        return UIAlert;
    }());
    exports.UIAlert = UIAlert;
    var UIPrompt = (function () {
        function UIPrompt(element) {
            this.element = element;
            this.glyph = '';
            this.okLabel = 'OK';
            this.cancelLabel = 'Cancel';
            this.changed = false;
            this.multiline = false;
            this.value = '';
            this.multiline = element.hasAttribute('multiline');
        }
        UIPrompt.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            if (bindingContext)
                Object.assign(this, bindingContext);
            ui_event_1.UIEvent.queueTask(function () {
                _this.element.classList.add('ui-open');
                if (_this.focusBlock)
                    _this.focusBlock.focus();
            });
        };
        UIPrompt.prototype.closeAlert = function (b) {
            var _this = this;
            if (b && isEmpty(this.value))
                return this.changed = true;
            this.element.classList.remove('ui-open');
            setTimeout(function () {
                if (_this.closeCallback)
                    _this.closeCallback(b ? _this.value : null);
                aurelia_framework_1.DOM.removeNode(_this.element);
            }, 100);
        };
        UIPrompt.prototype.cancelBlur = function ($event) {
            $event.preventDefault();
            this.focusBlock.focus();
            return false;
        };
        UIPrompt.prototype.checkKey = function ($event) {
            var key = ($event.keyCode || $event.which);
            if (!this.multiline && key == 13)
                this.closeAlert(true);
            if (key == 27)
                this.closeAlert(false);
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPrompt.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPrompt.prototype, "okLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPrompt.prototype, "cancelLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPrompt.prototype, "closeCallback", void 0);
        UIPrompt = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-alert-shim\"><div class=\"ui-alert\">\n  <div class=\"ui-wrapper\">\n  <ui-glyph glyph.bind=\"glyph\" class.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>\n  <span class=\"ui-message\"><slot><slot></span></div>\n  <ui-input-group>\n    <ui-input class=\"${changed && value==''?'ui-invalid':''}\" errors.bind=\"changed && value==''?['Value needed']:null\" if.bind=\"!multiline\" ref=\"focusBlock\" value.bind=\"value\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"></ui-input>\n    <ui-textarea class=\"${changed && value==''?'ui-invalid':''}\" errors.bind=\"changed && value==''?['Value needed']:null\" if.bind=\"multiline\" rows=\"4\" ref=\"focusBlock\" value.bind=\"value\" keydown.trigger=\"checkKey($event)\" blur.trigger=\"cancelBlur($event)\"></ui-textarea>\n  </ui-input-group>\n  <div class=\"ui-button-bar\"><button click.trigger=\"closeAlert(true)\" t.bind=\"okLabel\">${okLabel}</button><button click.trigger=\"closeAlert(false)\" t.bind=\"cancelLabel\">${cancelLabel}</button></div>\n  </div></template>"),
            aurelia_framework_1.customElement('ui-prompt'),
            __metadata("design:paramtypes", [Element])
        ], UIPrompt);
        return UIPrompt;
    }());
    exports.UIPrompt = UIPrompt;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-bars',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIToolbar = (function () {
        function UIToolbar(element) {
            this.element = element;
            if (element.hasAttribute('start'))
                element.classList.add('ui-start');
        }
        UIToolbar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-toolbar\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-toolbar'),
            __metadata("design:paramtypes", [Element])
        ], UIToolbar);
        return UIToolbar;
    }());
    exports.UIToolbar = UIToolbar;
    var UIStatsbar = (function () {
        function UIStatsbar(element) {
            this.element = element;
            if (element.hasAttribute('small'))
                element.classList.add('ui-small');
            if (element.hasAttribute('icon-top'))
                element.classList.add('ui-icon-top');
            if (element.hasAttribute('icon-end'))
                element.classList.add('ui-icon-end');
            if (element.hasAttribute('vertical'))
                element.classList.add('ui-vertical');
            if (element.hasAttribute('icon-only'))
                element.classList.add('ui-icon-only');
        }
        UIStatsbar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-statsbar\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-statsbar'),
            __metadata("design:paramtypes", [Element])
        ], UIStatsbar);
        return UIStatsbar;
    }());
    exports.UIStatsbar = UIStatsbar;
    var UIStat = (function () {
        function UIStat(element) {
            this.element = element;
            this.glyph = '';
            this.label = '';
            if (element.hasAttribute('icon-end'))
                element.classList.add('ui-icon-end');
            if (element.hasAttribute('icon-only'))
                element.classList.add('ui-icon-only');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIStat.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIStat.prototype, "label", void 0);
        UIStat = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-stat\"><ui-glyph glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph>\n  <div><div class=\"ui-stat-value\"><slot></slot></div><div class=\"ui-stat-label\" innerhtml.bind=\"label\" if.bind=\"label\"></div></div></template>"),
            aurelia_framework_1.customElement('ui-stat'),
            __metadata("design:paramtypes", [Element])
        ], UIStat);
        return UIStat;
    }());
    exports.UIStat = UIStat;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-drawer',["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDrawer = (function () {
        function UIDrawer(element) {
            var _this = this;
            this.element = element;
            this.css = {
                show: 'ui-drawer-show',
                fluid: 'ui-drawer-fluid',
                large: 'ui-drawer-large'
            };
            this.width = '';
            this.bodyClass = '';
            this.contentClass = "";
            this.position = "start";
            this.closeGlyph = 'glyph-arrow-left';
            if (element.hasAttribute('fluid'))
                this.element.classList.add(this.css.fluid);
            if (element.hasAttribute('large'))
                this.element.classList.add(this.css.large);
            if (element.hasAttribute('close-on-click'))
                element.addEventListener('mouseup', function (e) { if (e.button == 0)
                    _this.closeDrawer(); });
        }
        UIDrawer.prototype.bind = function (bindingContext, overrideContext) {
            if (this.element.hasAttribute('scroll'))
                this.bodyClass += ' ui-scroll';
            if (this.element.hasAttribute('padded'))
                this.bodyClass += ' ui-pad-all';
            if (this.position == 'end' && this.closeGlyph === 'glyph-arrow-left')
                this.closeGlyph = 'glyph-arrow-right';
            if (this.width)
                this.contentEl['style'].flexBasis = this.width;
        };
        UIDrawer.prototype.closeDrawer = function () {
            if (ui_event_1.UIEvent.fireEvent('beforeclose', this.element) !== false) {
                this.element.classList.remove(this.css.show);
                ui_event_1.UIEvent.fireEvent('close', this.element);
            }
        };
        UIDrawer.prototype.openDrawer = function () {
            if (ui_event_1.UIEvent.fireEvent('beforeopen', this.element) !== false) {
                this.element.classList.add(this.css.show);
                ui_event_1.UIEvent.fireEvent('open', this.element);
            }
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "bodyClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "contentClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "position", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawer.prototype, "closeGlyph", void 0);
        UIDrawer = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-drawer ui-drawer-${position}\">\n  <div ref=\"contentEl\" class=\"ui-drawer-content ui-row ui-row-v ui-align-stretch ui-nowrap ${contentClass}\">\n    <a class=\"ui-drawer-close\" click.trigger=\"closeDrawer()\"><ui-glyph glyph.bind=\"closeGlyph\"></ui-glyph></a>\n    <slot name=\"drawer-head\"></slot>\n    <div class=\"ui-drawer-body ${bodyClass}\"><slot></slot></div>\n    <slot name=\"drawer-foot\"></slot>\n  </div>\n  <div class=\"ui-drawer-shim\" click.trigger=\"closeDrawer()\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-drawer'),
            __metadata("design:paramtypes", [Element])
        ], UIDrawer);
        return UIDrawer;
    }());
    exports.UIDrawer = UIDrawer;
    var UIDrawerToggle = (function () {
        function UIDrawerToggle(element) {
            this.element = element;
            this.glyph = 'glyph-handle-menu';
        }
        UIDrawerToggle.prototype.openDrawer = function (evt) {
            if (!this.drawer)
                throw Error('Drawer element required');
            if (evt.button != 0)
                return true;
            evt.stopPropagation();
            evt.cancelBubble = true;
            if (this.drawer && this.drawer.au.controller) {
                this.drawer.au.controller.viewModel.openDrawer();
            }
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawerToggle.prototype, "drawer", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDrawerToggle.prototype, "glyph", void 0);
        UIDrawerToggle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-drawer-toggle" click.trigger="openDrawer($event)"><slot><ui-glyph glyph.bind="glyph"></ui-glyph></slot></template>'),
            aurelia_framework_1.customElement('ui-drawer-toggle'),
            __metadata("design:paramtypes", [Element])
        ], UIDrawerToggle);
        return UIDrawerToggle;
    }());
    exports.UIDrawerToggle = UIDrawerToggle;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-dropdown',["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDropdown = (function () {
        function UIDropdown(element) {
            this.element = element;
            this.items = [];
            this.value = '';
            this.width = '5em';
            this.model = null;
            this.disabled = false;
            this.defaultText = 'Select';
            this.glyph = '';
            this.display = '';
            this.isDisabled = false;
        }
        UIDropdown.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
        };
        UIDropdown.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-dropdown') == _this.element)
                    return true;
                _this.element.classList.remove('ui-open');
            });
            this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (e) { return _this.localeChanged(); });
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
        };
        UIDropdown.prototype.detached = function () {
            this.tether.dispose();
            this.obMouseup.dispose();
            this.obLocale.dispose();
        };
        UIDropdown.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.selected)
                this.selected.element.classList.remove('ui-selected');
            var it = this.items.find(function (it) { return it.value == newValue; });
            if (it) {
                if (it.value != newValue)
                    this.value = it.value;
                this.display = it.element.innerText;
                (this.selected = it).element.classList.add('ui-selected');
                ui_event_1.UIEvent.queueTask(function () { return ui_event_1.UIEvent.fireEvent('change', _this.element, _this.value); });
            }
            else {
                this.display = this.defaultText;
                this.glyph = '';
            }
        };
        UIDropdown.prototype.localeChanged = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var it = _this.items.find(function (it) { return it.value == _this.value; });
                if (it)
                    _this.display = it.element.innerText;
            });
        };
        UIDropdown.prototype.disabledChanged = function (newValue) {
            this.element.classList[(this.isDisabled = this.disabled = !!newValue) ? 'add' : 'remove']('ui-disabled');
        };
        UIDropdown.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIDropdown.prototype.select = function (evt) {
            var _this = this;
            var params = { value: evt.detail.value, model: evt.detail.model };
            if (typeof this.beforeselect === "function") {
                var ret = this.beforeselect(params);
                if (ret instanceof Promise)
                    ret.then(function (b) {
                        if (b !== false) {
                            _this.doChange(params);
                        }
                    });
                else if (ret !== false) {
                    this.doChange(params);
                }
            }
            else if (ui_event_1.UIEvent.fireEvent('beforeselect', this.element, params) !== false) {
                this.doChange(params);
            }
        };
        UIDropdown.prototype.doChange = function (params) {
            this.value = params.value;
            this.model = params.model;
        };
        UIDropdown.prototype.toggleDropdown = function (evt) {
            this.element.classList[this.element.classList.contains('ui-open') ? 'remove' : 'add']('ui-open');
            this.tether.position();
        };
        __decorate([
            aurelia_framework_1.children('.ui-list-item'),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "items", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "defaultText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDropdown.prototype, "beforeselect", void 0);
        UIDropdown = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-dropdown\" select.trigger=\"select($event)\" click.trigger=\"toggleDropdown($event)\" css.bind=\"{'min-width':width}\">\n  <div class=\"ui-label\">\n  <div class=\"ui-addon-icon\" if.bind=\"glyph\"><ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\"></ui-glyph></div>\n  <ui-glyph class=\"ui-invalid-icon\" glyph=\"glyph-invalid\"></ui-glyph><span>${display}</span>\n  <ui-glyph class=\"ui-caret\" glyph=\"glyph-caret-down\"></ui-glyph></div>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><slot></slot></ul></template>"),
            aurelia_framework_1.customElement('ui-dropdown'),
            __metadata("design:paramtypes", [Element])
        ], UIDropdown);
        return UIDropdown;
    }());
    exports.UIDropdown = UIDropdown;
    var UIListGroup = (function () {
        function UIListGroup(element) {
            this.element = element;
            this.label = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListGroup.prototype, "label", void 0);
        UIListGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><div class=\"ui-list-group\" if.bind=\"label\" innerhtml.bind=\"label\"></div><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-list-group'),
            __metadata("design:paramtypes", [Element])
        ], UIListGroup);
        return UIListGroup;
    }());
    exports.UIListGroup = UIListGroup;
    var UIListItem = (function () {
        function UIListItem(element) {
            this.element = element;
            this.glyph = '';
            this.value = '';
        }
        UIListItem.prototype.hilightItem = function (evt) {
            var h = this.element.parentElement.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            evt.target.classList.add('ui-hilight');
        };
        UIListItem.prototype.unhilightItem = function (evt) {
            evt.target.classList.remove('ui-hilight');
        };
        UIListItem.prototype.fireSelect = function (evt) {
            ui_event_1.UIEvent.fireEvent('select', this.element, { value: this.value, model: this.model });
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListItem.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListItem.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIListItem.prototype, "value", void 0);
        UIListItem = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-list-item\" click.trigger=\"fireSelect($event)\" mouseover.trigger=\"hilightItem($event)\" mouseout.trigger=\"unhilightItem($event)\">\n  <ui-glyph class.bind=\"glyph\" glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph><span if.bind=\"glyph\">&nbsp;</span><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-list-item'),
            __metadata("design:paramtypes", [Element])
        ], UIListItem);
        return UIListItem;
    }());
    exports.UIListItem = UIListItem;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-indicators',["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIChip = (function () {
        function UIChip(element) {
            this.element = element;
            this.id = '';
            this.label = '';
            this.color = '';
            this.width = 'auto';
            this.canClose = false;
            if (element.hasAttribute('large'))
                element.classList.add('ui-large');
            if (element.hasAttribute('small'))
                element.classList.add('ui-small');
            this.canClose = element.hasAttribute('removable') || element.hasAttribute('remove.trigger');
        }
        UIChip.prototype.remove = function () {
            ui_event_1.UIEvent.fireEvent('remove', this.element, this.id);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "color", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIChip.prototype, "width", void 0);
        UIChip = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-chip\" css.bind=\"{minWidth:width}\"><span class=\"ui-chip-label\" css.bind=\"{backgroundColor:color}\">${label}</span><span class=\"ui-chip-value\"><slot></slot></span><a click.trigger=\"remove()\" class=\"ui-chip-close\" if.bind=\"canClose\">&times</a></template>"),
            aurelia_framework_1.customElement('ui-chip'),
            __metadata("design:paramtypes", [Element])
        ], UIChip);
        return UIChip;
    }());
    exports.UIChip = UIChip;
    var UIBreadcrumb = (function () {
        function UIBreadcrumb(element) {
            this.element = element;
        }
        UIBreadcrumb.prototype.fireChange = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            if (!isEmpty($event.detail))
                ui_event_1.UIEvent.fireEvent('change', this.element, $event.detail);
            return false;
        };
        UIBreadcrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-breadcrumb\" click.delegate=\"fireChange($event)\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-breadcrumb'),
            __metadata("design:paramtypes", [Element])
        ], UIBreadcrumb);
        return UIBreadcrumb;
    }());
    exports.UIBreadcrumb = UIBreadcrumb;
    var UICrumb = (function () {
        function UICrumb(element) {
            this.element = element;
            this.id = '';
            this.href = 'javascript:;';
        }
        UICrumb.prototype.fireClick = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            ui_event_1.UIEvent.fireEvent('click', this.element, this.id);
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICrumb.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICrumb.prototype, "href", void 0);
        UICrumb = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-crumb\"><a href=\"crumb.href || 'javascript:;'\" click.trigger=\"fireClick($event)\"><slot></slot></a></template>"),
            aurelia_framework_1.customElement('ui-crumb'),
            __metadata("design:paramtypes", [Element])
        ], UICrumb);
        return UICrumb;
    }());
    exports.UICrumb = UICrumb;
    var UIPager = (function () {
        function UIPager(element) {
            this.element = element;
            this.page = 0;
            this.style = "chevron";
            this.totalPages = 1;
        }
        UIPager.prototype.bind = function (bindingContext, overrideContext) {
            if (this.store)
                this.totalPages = this.store.totalPages;
        };
        UIPager.prototype.fireChange = function () {
            if (this.store)
                this.store.loadPage(this.page);
            ui_event_1.UIEvent.fireEvent('change', this.element, this.page);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPager.prototype, "page", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "store", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "style", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPager.prototype, "totalPages", void 0);
        UIPager = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-pager\">\n  <a class=\"pg-first ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=0)\"><ui-glyph glyph=\"glyph-${style}-double-left\"></ui-glyph></a>\n  <a class=\"pg-prev ${page==0?'disabled':''}\" click.trigger=\"fireChange(page=page-1)\" click.trigger=\"fireChange(page=totalPages)\"><ui-glyph glyph=\"glyph-${style}-left\"></ui-glyph></a>\n  <span class=\"pg-input\">${page+1} of ${totalPages}</span>\n  <a class=\"pg-next ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=page+1)\"><ui-glyph glyph=\"glyph-${style}-right\"></ui-glyph></a>\n  <a class=\"pg-last ${page+1>=totalPages?'disabled':''}\" click.trigger=\"fireChange(page=totalPages-1)\"><ui-glyph glyph=\"glyph-${style}-double-right\"></ui-glyph></a>\n</template>"),
            aurelia_framework_1.customElement('ui-pager'),
            __metadata("design:paramtypes", [Element])
        ], UIPager);
        return UIPager;
    }());
    exports.UIPager = UIPager;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-menu',["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIMenubar = (function () {
        function UIMenubar(element) {
            this.element = element;
            this.isOverflow = false;
        }
        UIMenubar.prototype.attached = function () {
            var _this = this;
            this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () { return _this.arrange(); });
            this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-menubar-toggle') == _this.element)
                    return;
                _this.overflow.classList.remove('ui-open');
            });
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.overflow, { resize: false, position: 'br' });
            window.setTimeout(function () { return _this.arrange(); }, 100);
        };
        UIMenubar.prototype.detached = function () {
            this.tether.dispose();
            this.obClick.dispose();
            this.obResize.dispose();
        };
        UIMenubar.prototype.arrange = function () {
            this.overflow.classList.remove('ui-open');
            for (var i = 0, c = this.overflow['children']; i < c.length; i++) {
                this.wrapper.appendChild(c[i]);
            }
            if (this.isOverflow = (this.wrapper.lastElementChild.offsetLeft + this.wrapper.lastElementChild.offsetWidth > this.wrapper.offsetWidth)) {
                for (var c = this.wrapper['children'], i = c.length - 1; i >= 0; i--) {
                    if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
                        if (this.overflow.hasChildNodes)
                            this.overflow.insertBefore(c[i], this.overflow.childNodes[0]);
                        else
                            this.overflow.appendChild(c[i]);
                    }
                }
            }
        };
        UIMenubar.prototype.showOverflow = function (evt) {
            if (evt.button != 0)
                return true;
            if (!this.overflow.classList.contains('ui-open')) {
                this.overflow.classList.add('ui-open');
                this.tether.position();
            }
            else
                this.overflow.classList.remove('ui-open');
        };
        UIMenubar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("\n<template class=\"ui-menubar\">\n  <div class=\"ui-menubar-wrapper\" ref=\"wrapper\"><slot></slot></div>\n  <div class=\"ui-menubar-toggle\" ref=\"overflowToggle\" show.bind=\"isOverflow\" click.trigger=\"showOverflow($event)\"><ui-glyph glyph=\"glyph-handle-overflow\"></ui-glyph></div>\n  <div class=\"ui-menu ui-menubar-overflow ui-floating\" ref=\"overflow\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-menubar'),
            __metadata("design:paramtypes", [Element])
        ], UIMenubar);
        return UIMenubar;
    }());
    exports.UIMenubar = UIMenubar;
    var UIMenu = (function () {
        function UIMenu(element) {
            this.element = element;
        }
        UIMenu = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-menu"><slot></slot></template>'),
            aurelia_framework_1.customElement('ui-menu'),
            __metadata("design:paramtypes", [Element])
        ], UIMenu);
        return UIMenu;
    }());
    exports.UIMenu = UIMenu;
    var UIMenuTitle = (function () {
        function UIMenuTitle(element) {
            this.element = element;
        }
        UIMenuTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-menu-section-title"><slot></slot></template>'),
            aurelia_framework_1.customElement('ui-menu-section'),
            __metadata("design:paramtypes", [Element])
        ], UIMenuTitle);
        return UIMenuTitle;
    }());
    exports.UIMenuTitle = UIMenuTitle;
    var UIMenuGroup = (function () {
        function UIMenuGroup(element) {
            this.element = element;
            this.label = '';
            this.collapsed = false;
            this.collapsible = false;
            this.collapsible = element.hasAttribute('collapsible');
        }
        UIMenuGroup.prototype.toggleCollapse = function (event) {
            this.collapsed = !this.collapsed;
            event.stopPropagation();
            event.preventDefault();
            return false;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "collapsible", void 0);
        __decorate([
            aurelia_framework_1.child('ui-menu-item.ui-active'),
            __metadata("design:type", Object)
        ], UIMenuGroup.prototype, "hasActive", void 0);
        UIMenuGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-menu-section ${collapsible?\'ui-collapsible\':\'\'} ${collapsed?\'ui-collapsed\':\'\'}"><div mouseup.trigger="toggleCollapse($event)" if.bind="label" class="ui-menu-section-title ${hasActive?\'ui-has-active\':\'\'}"><ui-glyph glyph="glyph-chevron-down" if.bind="collapsible"></ui-glyph><span innerhtml.bind="label"></span></div><div class="ui-menu-section-body"><slot></slot></div></template>'),
            aurelia_framework_1.customElement('ui-menu-group'),
            __metadata("design:paramtypes", [Element])
        ], UIMenuGroup);
        return UIMenuGroup;
    }());
    exports.UIMenuGroup = UIMenuGroup;
    var UIMenuItem = (function () {
        function UIMenuItem(element) {
            this.element = element;
            this.id = '';
            this.description = '';
            this.glyph = '';
            this.class = '';
            this.active = false;
            this.disabled = false;
            this.href = 'javascript:void(0)';
        }
        UIMenuItem.prototype.bind = function (bindingContext, overrideContext) {
            this.active = !!(this.active);
            this.disabled = !!(this.disabled);
        };
        UIMenuItem.prototype.click = function (evt) {
            if (evt.button != 0)
                return true;
            evt.cancelBubble = true;
            evt.stopPropagation();
            if (this.href !== 'javascript:void(0)')
                return true;
            return ui_event_1.UIEvent.fireEvent('click', this.element, this.id);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "description", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "active", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMenuItem.prototype, "href", void 0);
        UIMenuItem = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><a class=\"ui-menu-item ${active?'ui-active':''} ${disabled?'ui-disabled':''} ${class}\" href.bind=\"href\" click.trigger=\"click($event)\">\n    <ui-glyph if.bind=\"glyph\" class=\"ui-menu-icon ${glyph}\" glyph.bind=\"glyph\"></ui-glyph><span class=\"ui-menu-label\"><slot></slot><small if.bind=\"description\">${description}</small></span></a></template>"),
            aurelia_framework_1.customElement('ui-menu-item'),
            __metadata("design:paramtypes", [Element])
        ], UIMenuItem);
        return UIMenuItem;
    }());
    exports.UIMenuItem = UIMenuItem;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-panel',["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIPanel = (function () {
        function UIPanel(element) {
            this.element = element;
            this.height = 'auto';
            this.minheight = 'auto';
            this.maxheight = 'auto';
            this.expanded = false;
            this.collapsed = false;
        }
        UIPanel.prototype.bind = function (bindingContext, overrideContext) {
            this.collapsed = !!(this.collapsed) || this.element.hasAttribute('collapsed');
        };
        UIPanel.prototype.close = function () {
            var _this = this;
            if (isFunction(this.beforeclose)) {
                var ret = this.beforeclose();
                if (ret instanceof Promise)
                    ret.then(function (b) {
                        if (b) {
                            _this.remove();
                        }
                    });
                else if (ret !== false) {
                    this.remove();
                }
            }
            else if (ui_event_1.UIEvent.fireEvent('beforeclose', this.element) !== false) {
                this.remove();
            }
        };
        UIPanel.prototype.remove = function () {
            aurelia_framework_1.DOM.removeNode(this.element);
            ui_event_1.UIEvent.fireEvent('close', this.element);
        };
        UIPanel.prototype.collapse = function () {
            this.collapsed = true;
        };
        UIPanel.prototype.expand = function () {
            this.expanded = !this.expanded;
        };
        UIPanel.prototype.restore = function () {
            this.expanded = !this.expanded;
        };
        UIPanel.prototype.toggleCollapse = function () {
            var _this = this;
            setTimeout(function () { return _this.collapsed = !_this.collapsed; }, 200);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "minheight", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "maxheight", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "expanded", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPanel.prototype, "beforeclose", void 0);
        UIPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-panel ${collapsed?'ui-collapse':''} ${expanded?'ui-expand':''}\" css.bind=\"{'max-height': maxheight,'min-height': minheight,'height':height}\" collapse.trigger=\"toggleCollapse()\" expand.trigger=\"expand()\" restore.trigger=\"expand()\" close.trigger=\"close()\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-panel'),
            __metadata("design:paramtypes", [Element])
        ], UIPanel);
        return UIPanel;
    }());
    exports.UIPanel = UIPanel;
    var UIPanelBody = (function () {
        function UIPanelBody(element) {
            this.element = element;
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
        }
        UIPanelBody = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-panel-body\" css.bind=\"{'max-height': maxheight,'min-height': minheight,'flex-basis':height}\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-panel-body'),
            __metadata("design:paramtypes", [Element])
        ], UIPanelBody);
        return UIPanelBody;
    }());
    exports.UIPanelBody = UIPanelBody;
    var UIPanelGroup = (function () {
        function UIPanelGroup(element) {
            this.element = element;
            this.allowtoggle = false;
            this.allowtoggle = element.hasAttribute('toggle');
        }
        UIPanelGroup.prototype.attached = function () {
            if (_.find(this.panels, ['collapsed', false]) == null)
                this.panels[0].collapsed = false;
        };
        UIPanelGroup.prototype.uncollapse = function () {
            var panel = _.find(this.panels, ['collapsed', false]);
            if (this.allowtoggle && panel)
                panel.collapsed = true;
        };
        __decorate([
            aurelia_framework_1.children('ui-panel'),
            __metadata("design:type", Object)
        ], UIPanelGroup.prototype, "panels", void 0);
        UIPanelGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-panel-group\" collapse.delegate=\"uncollapse()\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-panel-group'),
            __metadata("design:paramtypes", [Element])
        ], UIPanelGroup);
        return UIPanelGroup;
    }());
    exports.UIPanelGroup = UIPanelGroup;
    var UIHeader = (function () {
        function UIHeader(element) {
            this.element = element;
        }
        UIHeader = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-header\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-header'),
            __metadata("design:paramtypes", [Element])
        ], UIHeader);
        return UIHeader;
    }());
    exports.UIHeader = UIHeader;
    var UIHeaderTool = (function () {
        function UIHeaderTool(element) {
            this.element = element;
            this.glyph = '';
            this.disabled = false;
            this.type = 'tool';
            if (element.hasAttribute('close'))
                this.type = "close";
            if (element.hasAttribute('refresh'))
                this.type = "refresh";
            if (element.hasAttribute('collapse'))
                this.type = "collapse";
            if (element.hasAttribute('expand'))
                this.type = "expand";
            if (element.hasAttribute('restore'))
                this.type = "restore";
            if (element.hasAttribute('minimize'))
                this.type = "minimize";
            if (element.hasAttribute('close'))
                this.glyph = "glyph-dialog-close";
            if (element.hasAttribute('refresh'))
                this.glyph = "glyph-refresh";
            if (element.hasAttribute('collapse'))
                this.glyph = "glyph-chevron-up";
            if (element.hasAttribute('expand'))
                this.glyph = "glyph-dialog-expand";
            if (element.hasAttribute('restore'))
                this.glyph = "glyph-dialog-restore";
            if (element.hasAttribute('minimize'))
                this.glyph = "glyph-dialog-minimize";
        }
        UIHeaderTool.prototype.bind = function (bindingContext, overrideContext) {
            this.disabled = !!(this.disabled);
        };
        UIHeaderTool.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    _this.element.classList.remove('ui-open');
                    _this.dropdown.classList.remove('ui-open');
                });
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { position: 'br' });
            }
        };
        UIHeaderTool.prototype.detached = function () {
            if (this.tether)
                this.tether.dispose();
            if (this.obMouseup)
                this.obMouseup.dispose();
            if (this.dropdown)
                aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UIHeaderTool.prototype.fireEvent = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.cancelBubble = true;
                if (this.element.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.element.classList.remove('ui-open');
                    this.dropdown.classList.remove('ui-open');
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.element) !== false) {
                        this.element.classList.add('ui-open');
                        this.dropdown.classList.add('ui-open');
                        this.tether.position();
                    }
                }
                return false;
            }
            return ui_event_1.UIEvent.fireEvent(this.type, this.element);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTool.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTool.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTool.prototype, "disabled", void 0);
        UIHeaderTool = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-header-tool\"><button disabled.bind=\"disabled\" tabindex=\"-1\" class=\"ui-header-button ui-${type}\" click.trigger=\"fireEvent($event)\">\n  <slot><ui-glyph glyph.bind=\"glyph\"></ui-glyph></slot></button></template>"),
            aurelia_framework_1.customElement('ui-header-tool'),
            __metadata("design:paramtypes", [Element])
        ], UIHeaderTool);
        return UIHeaderTool;
    }());
    exports.UIHeaderTool = UIHeaderTool;
    var UIHeaderTitle = (function () {
        function UIHeaderTitle(element) {
            this.element = element;
            this.glyph = '';
            if (this.element.hasAttribute('icon-hilight'))
                this.element.classList.add('ui-icon-hilight');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIHeaderTitle.prototype, "glyph", void 0);
        UIHeaderTitle = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-header-title ui-inline-block ui-col-fill\"><div class=\"ui-title-icon\"><ui-glyph glyph.bind=\"glyph\" if.bind=\"glyph\"></ui-glyph></div><div class=\"ui-title\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-header-title'),
            __metadata("design:paramtypes", [Element])
        ], UIHeaderTitle);
        return UIHeaderTitle;
    }());
    exports.UIHeaderTitle = UIHeaderTitle;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-sidebar',["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UISidebar = (function () {
        function UISidebar(element) {
            var _this = this;
            this.element = element;
            this.label = "";
            this.bodyClass = "";
            this.width = "";
            this.collapsed = false;
            this.position = "start";
            this.glyph = 'glyph-arrow-left';
            this.compact = false;
            this.miniDisplay = false;
            this.collapsible = false;
            if (this.miniDisplay = element.hasAttribute('mini-display'))
                element.classList.add('ui-sidebar-mini');
            if (this.compact = element.hasAttribute('compact')) {
                element.classList.add('ui-sidebar-compact');
                element.classList.add('ui-sidebar-mini');
            }
            this.collapsible = element.hasAttribute('collapsible');
            this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () {
                _this.forceCollapse = window.innerWidth <= 768;
            });
            this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () {
                _this.element.classList.remove('ui-sidebar-show');
            });
            this.forceCollapse = window.innerWidth <= 768;
        }
        UISidebar.prototype.bind = function (bindingContext, overrideContext) {
            this.collapsed = !!(this.collapsed);
            if (this.position === 'end' && this.glyph === 'glyph-arrow-left')
                this.glyph = "glyph-arrow-right";
            if (this.element.hasAttribute('scroll'))
                this.bodyClass += ' ui-scroll';
            if (this.element.hasAttribute('flex'))
                this.bodyClass += ' ui-row ui-row-v ui-align-stretch ui-nowrap';
            if (this.element.hasAttribute('padded'))
                this.bodyClass += ' ui-pad-all';
            if (this.width)
                this.element['style'].flexBasis = this.width;
        };
        UISidebar.prototype.attached = function () {
            if (this.label instanceof HTMLElement)
                [this.labelEl.innerHTML = '', this.labelEl.appendChild(this.label)];
        };
        UISidebar.prototype.detached = function () {
            if (this.obClick)
                this.obClick.dispose();
            if (this.obResize)
                this.obResize.dispose();
        };
        UISidebar.prototype.collapsedChanged = function (newValue) {
            this.glyph = (this.position == 'end' && !(newValue)) || (this.position == 'start' && !!(newValue)) ? "glyph-arrow-right" : "glyph-arrow-left";
        };
        UISidebar.prototype.toggleCollapse = function ($event) {
            this.collapsed = !this.collapsed;
            this.element.classList.remove('ui-sidebar-show');
            $event.cancelBubble = true;
            return true;
        };
        UISidebar.prototype.showOverlay = function ($event) {
            if (this.miniDisplay || $event.target != this.element)
                return true;
            if (this.collapsed || this.forceCollapse)
                this.element.classList.add('ui-sidebar-show');
            else
                this.element.classList.remove('ui-sidebar-show');
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "bodyClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "collapsed", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISidebar.prototype, "position", void 0);
        UISidebar = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-sidebar ui-row ui-row-v ui-row-nowrap ui-align-stretch ${compact || collapsed || forceCollapse ?'ui-sidebar-collapse':''} ui-sidebar-${position}\" click.trigger=\"showOverlay($event)\">\n  <div class=\"ui-sidebar-head ui-row ui-row-h ui-row-nowrap ui-align-stretch\" if.bind=\"!compact && (collapsible || label)\">\n  <div class=\"ui-sidebar-title ui-column-fill\" ref=\"labelEl\">${label}</div>\n  <a click.trigger=\"toggleCollapse($event)\" class=\"ui-sidebar-close\" if.bind=\"collapsible && !forceCollapse\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></a></div>\n  <div class=\"ui-sidebar-content ui-column-fill ${bodyClass}\" ref=\"contentEl\"><slot></slot></div>\n</template>"),
            aurelia_framework_1.customElement('ui-sidebar'),
            __metadata("design:paramtypes", [Element])
        ], UISidebar);
        return UISidebar;
    }());
    exports.UISidebar = UISidebar;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/components/ui-tabpanel',["require", "exports", "aurelia-framework", "../../utils/ui-utils", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_utils_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITabbarStart = (function () {
        function UITabbarStart() {
        }
        UITabbarStart = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-tabbar-start'),
            aurelia_framework_1.inlineView("<template><div slot=\"ui-tabbar-start\" class=\"ui-tabbar-links\"><slot></slot></div></template>")
        ], UITabbarStart);
        return UITabbarStart;
    }());
    exports.UITabbarStart = UITabbarStart;
    var UITabbarEnd = (function () {
        function UITabbarEnd() {
        }
        UITabbarEnd = __decorate([
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-tabbar-end'),
            aurelia_framework_1.inlineView("<template><div slot=\"ui-tabbar-end\" class=\"ui-tabbar-links\"><slot></slot></div></template>")
        ], UITabbarEnd);
        return UITabbarEnd;
    }());
    exports.UITabbarEnd = UITabbarEnd;
    var UITabbarToggle = (function () {
        function UITabbarToggle(element) {
            this.element = element;
            this.disabled = false;
            this.isDisabled = false;
        }
        UITabbarToggle.prototype.attached = function () {
            var _this = this;
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    _this.element.classList.remove('ui-open');
                    _this.dropdown.classList.remove('ui-open');
                });
                this.element.classList.add('ui-btn-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            }
        };
        UITabbarToggle.prototype.detached = function () {
            if (this.tether)
                this.tether.dispose();
            if (this.obMouseup)
                this.obMouseup.dispose();
            if (this.dropdown)
                aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UITabbarToggle.prototype.toggleDropdown = function (evt) {
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.cancelBubble = true;
                if (this.element.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.element.classList.remove('ui-open');
                    this.dropdown.classList.remove('ui-open');
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.element) !== false) {
                        this.element.classList.add('ui-open');
                        this.dropdown.classList.add('ui-open');
                        this.tether.position();
                    }
                }
                return false;
            }
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabbarToggle.prototype, "disabled", void 0);
        UITabbarToggle = __decorate([
            aurelia_framework_1.customElement('ui-tabbar-toggle'),
            aurelia_framework_1.inlineView("<template class=\"ui-tabbar-toggle ui-tab-button ${disabled?'ui-disabled':''}\" click.trigger=\"toggleDropdown($event)\"><slot></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UITabbarToggle);
        return UITabbarToggle;
    }());
    exports.UITabbarToggle = UITabbarToggle;
    var UITabPanel = (function () {
        function UITabPanel(element) {
            this.element = element;
            this.isOverflow = false;
            this.height = "auto";
            this.tabs = [];
            this.activeTab = 0;
            this.noTabs = false;
            if (element.hasAttribute('bottom'))
                element.classList.add('ui-bottom');
            if (element.hasAttribute('noborder'))
                element.classList.add('ui-noborder');
            this.noTabs = element.hasAttribute('notabs');
        }
        UITabPanel.prototype.attached = function () {
            var _this = this;
            if (!this.noTabs) {
                this.obResize = ui_event_1.UIEvent.subscribe('windowresize', function () { return _this.arrange(); });
                this.obClick = ui_event_1.UIEvent.subscribe('mouseclick', function () { return _this.overflow.classList.remove('ui-open'); });
                this.tether = ui_utils_1.UIUtils.tether(this.overflowToggle, this.overflow, { resize: false, position: 'br' });
                window.setTimeout(function () { return _this.arrange(); }, 500);
            }
        };
        UITabPanel.prototype.detached = function () {
            if (!this.noTabs) {
                this.tether.dispose();
                this.obClick.dispose();
                this.obResize.dispose();
            }
        };
        UITabPanel.prototype.tabsChanged = function () {
            var _this = this;
            if (!this.activeTabEl && this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                this.activateTab(_.find(this.tabs, ['disabled', false]));
            ui_event_1.UIEvent.queueTask(function () { return _this.arrange(); });
        };
        UITabPanel.prototype.activeTabChanged = function (newValue) {
            if (this.tabs.length == 0)
                return;
            var tab = (_.find(this.tabs, ['id', newValue]) || this.tabs[newValue] || this.activeTabEl);
            if (this.activeTabEl)
                this.activeTabEl.active = false;
            (this.activeTabEl = tab).active = true;
        };
        UITabPanel.prototype.close = function (id, force) {
            if (force === void 0) { force = false; }
            var tab = _.find(this.tabs, ['id', id]);
            if (tab)
                force ? this.doClose(tab) : this.closeTab(tab);
        };
        UITabPanel.prototype.closeTab = function (tab) {
            var _this = this;
            tab.canDeactivate()
                .then(function (b) {
                if (b === true) {
                    if (typeof tab.beforeclose === "function") {
                        var ret = tab.beforeclose(tab);
                        if (ret instanceof Promise)
                            ret.then(function (b) {
                                if (b !== false) {
                                    _this.doClose(tab);
                                }
                            });
                        else if (ret !== false) {
                            _this.doClose(tab);
                        }
                    }
                    else if (ui_event_1.UIEvent.fireEvent('beforeclose', tab.element, tab) !== false) {
                        _this.doClose(tab);
                    }
                }
            });
        };
        UITabPanel.prototype.doClose = function (tab) {
            _.remove(this.tabs, ['id', tab.id]);
            if (this.tabs.length > 0 && _.find(this.tabs, ['active', true]) == null)
                this.activateTab(_.findLast(this.tabs, ['disabled', false]));
            tab.remove();
            ui_event_1.UIEvent.fireEvent('closed', this.element, tab);
        };
        UITabPanel.prototype.activateTab = function (newTab) {
            if (this.activeTabEl)
                this.activeTabEl.active = false;
            (this.activeTabEl = newTab).active = true;
            this.activeTab = newTab.id;
            ui_event_1.UIEvent.fireEvent('activate', newTab.element, newTab);
        };
        UITabPanel.prototype.canActivate = function (id) {
            var tab = _.find(this.tabs, ['id', id]);
            if (tab) {
                if (this.activeTabEl)
                    this.activeTabEl.active = false;
                (this.activeTabEl = tab).active = true;
                return true;
            }
            return false;
        };
        UITabPanel.prototype.arrange = function () {
            if (!this.wrapper)
                return;
            this.overflow.classList.remove('ui-open');
            for (var i = 0, c = this.overflow['children']; i < c.length; i++) {
                this.wrapper.insertBefore(c[i], this.overflowToggle);
            }
            if (this.tabs.length > 0 && (this.isOverflow = (this.wrapper.lastElementChild.previousElementSibling.offsetLeft + this.wrapper.lastElementChild.previousElementSibling.offsetWidth > this.wrapper.offsetWidth))) {
                for (var c = this.wrapper['children'], i = c.length - 2; i >= 0; i--) {
                    if (c[i].offsetLeft + c[i].offsetWidth > this.wrapper.offsetWidth) {
                        if (this.overflow.hasChildNodes)
                            this.overflow.insertBefore(c[i], this.overflow.childNodes[0]);
                        else
                            this.overflow.appendChild(c[i]);
                    }
                }
            }
        };
        UITabPanel.prototype.showOverflow = function (evt) {
            if (evt.button != 0)
                return true;
            if (!this.overflow.classList.contains('ui-open')) {
                this.overflow.classList.add('ui-open');
                this.tether.position();
            }
            else
                this.overflow.classList.remove('ui-open');
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "height", void 0);
        __decorate([
            aurelia_framework_1.children('ui-tab'),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "tabs", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITabPanel.prototype, "activeTab", void 0);
        UITabPanel = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab-panel\" css.bind=\"{'min-height': height}\"><div class=\"ui-tabbar\">\n  <slot name=\"ui-tabbar-start\"></slot>\n  <div class=\"ui-tabbar-buttons\" ref=\"wrapper\" if.bind=\"!noTabs\">\n    <a click.trigger=\"activateTab(tab)\" repeat.for=\"tab of tabs\" class=\"ui-tab-button ${tab.active?'ui-active':''} ${tab.disabled?'ui-disabled':''}\">\n      <div><ui-glyph if.bind=\"tab.glyph\" class=\"ui-tab-icon ${tab.glyphClass}\" glyph.bind=\"tab.glyph\"></ui-glyph>\n      <span class=\"ui-label\" if.bind=\"tab.label\" innerhtml.bind=\"tab.label\"></span></div>\n      <span if.bind=\"tab.closeable\" class=\"ui-close\" click.trigger=\"closeTab(tab)\">&nbsp;&times;</span>\n    </a>\n    <div class=\"ui-tabbar-toggle ui-tab-button\" ref=\"overflowToggle\" show.bind=\"isOverflow\" click.trigger=\"showOverflow($event)\"><ui-glyph glyph=\"glyph-handle-overflow\"></ui-glyph></div>\n  </div>\n  <slot name=\"ui-tabbar-end\"></slot>\n  <div class=\"ui-menu ui-tabbar-overflow ui-floating\" ref=\"overflow\"></div>\n  </div><div class=\"ui-tab-panel-body\"><slot></slot></div></template>"),
            aurelia_framework_1.customElement('ui-tab-panel'),
            __metadata("design:paramtypes", [Element])
        ], UITabPanel);
        return UITabPanel;
    }());
    exports.UITabPanel = UITabPanel;
    var UITab = (function () {
        function UITab(element) {
            this.element = element;
            this.id = '';
            this.glyph = '';
            this.label = '';
            this.glyphClass = '';
            this.disabled = false;
            this.active = false;
            this.closeable = false;
            if (element.hasAttribute('flex'))
                element.classList.add('ui-flexed');
            if (element.hasAttribute('scroll'))
                element.classList.add('ui-scroll');
            if (element.hasAttribute('padded'))
                element.classList.add('ui-pad-all');
            this.id = 'tab-' + (UITab_1.seed++);
            this.closeable = element.hasAttribute('closeable');
        }
        UITab_1 = UITab;
        UITab.prototype.bind = function (bindingContext, overrideContext) {
            this.disabled = this.disabled || this.element.hasAttribute('disabled');
        };
        UITab.prototype.remove = function () {
            try {
                if (this.viewModel)
                    this.viewModel.detached();
            }
            catch (e) { }
            aurelia_framework_1.DOM.removeNode(this.element);
            try {
                if (this.viewModel)
                    this.viewModel.unbind();
            }
            catch (e) { }
        };
        UITab.prototype.canDeactivate = function () {
            var instance = this.viewModel;
            if (instance && typeof instance.canDeactivate === 'function') {
                var result = instance.canDeactivate();
                if (result instanceof Promise) {
                    return result;
                }
                if (result !== null && result !== undefined) {
                    return Promise.resolve(result);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(true);
        };
        Object.defineProperty(UITab.prototype, "viewModel", {
            get: function () {
                if (this.element.firstElementChild && this.element.firstElementChild.tagName.toLowerCase() == 'compose')
                    return this.element.firstElementChild.au.compose.viewModel.currentViewModel;
                return null;
            },
            enumerable: true,
            configurable: true
        });
        UITab.seed = 0;
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "id", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "glyphClass", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITab.prototype, "beforeclose", void 0);
        UITab = UITab_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tab ${active?'ui-active':''}\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-tab'),
            __metadata("design:paramtypes", [Element])
        ], UITab);
        return UITab;
        var UITab_1;
    }());
    exports.UITab = UITab;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-button',["require", "exports", "aurelia-framework", "../../utils/ui-event", "../../utils/ui-utils", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIButton = (function () {
        function UIButton(element) {
            this.element = element;
            this.glyph = '';
            this.label = '';
            this.value = '';
            this.width = 'auto';
            this.splitTheme = '';
            this.splitGlyph = 'glyph-caret-down';
            this.busy = false;
            this.disabled = false;
            this.hasLabel = true;
            this.split = false;
            this.isDisabled = false;
            if (this.element.hasAttribute('icon-top'))
                this.element.classList.add('ui-icon-top');
            if (this.element.hasAttribute('icon-end'))
                this.element.classList.add('ui-icon-end');
            else
                this.element.classList.add('ui-icon-start');
            if (this.element.hasAttribute('icon-hilight'))
                this.element.classList.add('ui-icon-hilight');
            if (this.element.hasAttribute('xlarge'))
                this.element.classList.add('ui-size-xl');
            if (this.element.hasAttribute('large'))
                this.element.classList.add('ui-size-lg');
            if (this.element.hasAttribute('small'))
                this.element.classList.add('ui-size-sm');
            this.split = this.element.hasAttribute('split');
        }
        UIButton.prototype.bind = function (bindingContext, overrideContext) {
            if (this.form)
                this.dropdown = this.form;
            this.disabledChanged(this.disabled);
        };
        UIButton.prototype.attached = function () {
            var _this = this;
            this.hasLabel = !!(this.label || this.labelEl.childNodes[0].length);
            if (this.dropdown) {
                this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                    if (getParentByClass(evt.target, 'ui-button') == _this.element)
                        return;
                    if (_this.form && getParentByClass(evt.target, 'ui-floating') == _this.dropdown)
                        return;
                    _this.hideDropdown();
                });
                this.element.classList.add('ui-btn-dropdown');
                this.dropdown.classList.add('ui-floating');
                this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { position: this.split ? 'br' : 'bl' });
            }
        };
        UIButton.prototype.detached = function () {
            if (this.tether)
                this.tether.dispose();
            if (this.obMouseup)
                this.obMouseup.dispose();
            if (this.dropdown)
                aurelia_framework_1.DOM.removeNode(this.dropdown);
        };
        UIButton.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIButton.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UIButton.prototype.hideDropdown = function () {
            this.element.classList.remove('ui-open');
            this.dropdown.classList.remove('ui-open');
            return true;
        };
        UIButton.prototype.toggleDropdown = function (evt, isSplit) {
            if (this.split && !isSplit)
                return this.hideDropdown();
            if (evt.button != 0)
                return true;
            if (this.dropdown) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.cancelBubble = true;
                if (this.element.classList.contains('ui-open')) {
                    ui_event_1.UIEvent.fireEvent('menuhide', this.element);
                    this.hideDropdown();
                }
                else {
                    if (ui_event_1.UIEvent.fireEvent('menuopen', this.element) !== false) {
                        this.element.classList.add('ui-open');
                        this.dropdown.classList.add('ui-open');
                        if (this.form && this.form.focus)
                            this.form.focus();
                        this.tether.position();
                    }
                }
                return false;
            }
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "glyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "label", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "splitTheme", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "splitGlyph", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "dropdown", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "form", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "busy", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButton.prototype, "disabled", void 0);
        UIButton = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-button ${busy?'ui-busy':''}\" css.bind=\"{width: width}\">\n  <a role=\"button\" tabindex=\"-1\" class=\"ui-button-el\" click.trigger=\"toggleDropdown($event, false)\" data-value=\"${value}\" ref=\"buttonEl\">\n    <div class=\"ui-busy-icon\"><ui-glyph glyph=\"glyph-busy\" class=\"ui-anim-busy\"></ui-glyph></div>\n    <div class=\"ui-button-icon\" if.bind=\"glyph\"><ui-glyph glyph.bind=\"glyph\"></ui-glyph></div>\n    <div class=\"ui-button-label\" ref=\"labelEl\" show.bind=\"hasLabel\"><slot>${label}</slot></div>\n    <div class=\"ui-button-caret\" if.bind=\"!split && !form && dropdown\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></div>\n  </a>\n  <a role=\"button\" tabindex=\"-1\" class=\"ui-button-el ui-${splitTheme}\" if.bind=\"split\" click.trigger=\"toggleDropdown($event, true)\">\n    <div class=\"ui-button-splitter\"></div>\n    <div class=\"ui-button-caret\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></div>\n  </a>\n</template>"),
            aurelia_framework_1.customElement('ui-button'),
            __metadata("design:paramtypes", [Element])
        ], UIButton);
        return UIButton;
    }());
    exports.UIButton = UIButton;
    var UIButtonGroup = (function () {
        function UIButtonGroup(element) {
            this.element = element;
            this.buttons = [];
            this.value = '';
            this.separator = '';
            this.disabled = false;
            this.size = '';
            if (this.element.hasAttribute('vertical'))
                this.element.classList.add('ui-vertical');
            else
                this.element.classList.add('ui-horizontal');
            if (this.element.hasAttribute('toggle'))
                this.element.classList.add('ui-toggle');
            if (this.element.hasAttribute('separator'))
                this.element.classList.add('ui-has-separator');
            if (this.element.hasAttribute('small'))
                this.size = 'ui-size-sm';
            if (this.element.hasAttribute('large'))
                this.size = 'ui-size-lg';
            if (this.element.hasAttribute('xlarge'))
                this.size = 'ui-size-xl';
        }
        UIButtonGroup.prototype.attached = function () {
            this.buttonsChanged();
        };
        UIButtonGroup.prototype.buttonsChanged = function () {
            var _this = this;
            this.valueChanged(this.value);
            if (this.size)
                this.buttons.forEach(function (b) { return b.element.classList.add(_this.size); });
            if (this.separator)
                this.buttons.forEach(function (b) { return b.element.dataset.separator = _this.separator; });
        };
        UIButtonGroup.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.active)
                this.active.element.classList.remove('ui-active');
            if (this.buttons.length > 0 && (this.active = _.find(this.buttons, function (b) { return b.value === _this.value; })))
                this.active.element.classList.add('ui-active');
            ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIButtonGroup.prototype.clickEvent = function (evt) {
            if (evt.target.dataset['value'])
                this.value = evt.target.dataset['value'];
        };
        __decorate([
            aurelia_framework_1.children('ui-button'),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "buttons", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "separator", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIButtonGroup.prototype, "disabled", void 0);
        UIButtonGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-button-group ${disabled?'ui-disabled':''}\" click.trigger=\"clickEvent($event)\" data-separator.bind=\"separator\"><slot></slot></template>"),
            aurelia_framework_1.customElement('ui-button-group'),
            __metadata("design:paramtypes", [Element])
        ], UIButtonGroup);
        return UIButtonGroup;
    }());
    exports.UIButtonGroup = UIButtonGroup;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-date',["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "moment"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, moment) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDateView = (function () {
        function UIDateView(element) {
            var _this = this;
            this.element = element;
            this.date = '';
            this.type = 'd';
            this.title = "";
            this.datePage = 0;
            this.timePage = 0;
            this.hour = 0;
            this.minute = 0;
            this.dates = [];
            this.months = [];
            this.weekdays = [];
            this.disablePrev = false;
            this.disableNext = false;
            this.disableHrUp = false;
            this.disableHrDn = false;
            this.disableMnUp = false;
            this.disableMnDn = false;
            if (element.hasAttribute('time'))
                this.type = 't';
            if (element.hasAttribute('datetime'))
                this.type = 'dt';
            this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (payload) { return _this.buildDatePage(payload.newValue); });
        }
        UIDateView.prototype.bind = function (bindingContext, overrideContext) {
            if (this.date && moment(this.date).isValid())
                this.date = moment(this.date).toISOString();
            if (this.date && moment(this.date).isValid())
                this.current = moment(this.date);
            else if (this.minDate && moment(this.minDate).isValid() && moment().isBefore(this.minDate))
                this.current = moment(this.minDate);
            else if (this.maxDate && moment(this.maxDate).isValid() && moment().isAfter(this.maxDate))
                this.current = moment(this.maxDate);
            else
                this.current = moment();
        };
        UIDateView.prototype.attached = function () {
            this.buildDatePage();
        };
        UIDateView.prototype.detached = function () {
            this.obLocale.dispose();
        };
        UIDateView.prototype.dateChanged = function (newValue) {
            if (newValue && moment(newValue).isValid()) {
                var time = moment(newValue).second(0).millisecond(0);
                this.hour = time.hour();
                this.minute = time.minute();
            }
            this.refresh();
        };
        UIDateView.prototype.minDateChanged = function (newValue) {
            if (this.date && moment(this.date).isBefore(this.minDate, 'date'))
                this.date = newValue;
            this.buildDatePage();
        };
        UIDateView.prototype.maxDateChanged = function (newValue) {
            if (this.date && moment(this.date).isAfter(this.maxDate, 'date'))
                this.date = newValue;
            this.buildDatePage();
        };
        UIDateView.prototype.refresh = function () {
            if (this.date && moment(this.date).isValid()) {
                if (this.minDate && moment(this.date).isBefore(this.minDate, 'date'))
                    this.date = this.minDate;
                else if (this.maxDate && moment(this.date).isAfter(this.maxDate, 'date'))
                    this.date = this.maxDate;
                this.current = moment(this.date);
            }
            else
                this.current = moment();
            this.buildDatePage();
        };
        UIDateView.prototype.dateClass = function (dt) {
            var c = '';
            if (!dt.isSame(this.current, 'month'))
                c += ' muted ';
            if (dt.isSame(moment(), 'day'))
                c += ' today';
            if (this.date && dt.isSame(this.date, 'day'))
                c += ' selected';
            if (this.minDate && dt.isBefore(this.minDate, 'day'))
                c += ' disabled';
            if (this.maxDate && dt.isAfter(this.maxDate, 'day'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.monthClass = function (mn) {
            var c = '', m = moment(this.current.toISOString()).month(mn);
            if (this.date && m.isSame(this.date, 'month'))
                c += ' selected';
            if (this.minDate && m.isBefore(this.minDate, 'month'))
                c += ' disabled';
            if (this.maxDate && m.isAfter(this.maxDate, 'month'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.yearClass = function (yr) {
            var c = '', y = moment(this.current.toISOString()).year(yr);
            if (this.date && y.isSame(this.date, 'year'))
                c += ' selected';
            if (this.minDate && y.isBefore(this.minDate, 'year'))
                c += ' disabled';
            if (this.maxDate && y.isAfter(this.maxDate, 'year'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.hourClass = function (hr) {
            var c = '', y = moment(this.current.toISOString()).hour(hr);
            if (this.date && y.isSame(this.date, 'hour'))
                c += ' selected';
            if (this.minDate && y.isBefore(this.minDate, 'hour'))
                c += ' disabled';
            if (this.maxDate && y.isAfter(this.maxDate, 'hour'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.minuteClass = function (mn) {
            var c = '', y = moment(this.current.toISOString()).minute(mn);
            if (this.date && y.isSame(this.date, 'minute'))
                c += ' selected';
            if (this.minDate && y.isBefore(this.minDate, 'minute'))
                c += ' disabled';
            if (this.maxDate && y.isAfter(this.maxDate, 'minute'))
                c += ' disabled';
            return c;
        };
        UIDateView.prototype.buildDatePage = function (newLocale) {
            if (!this.current.isValid || !this.current.isValid())
                return;
            if (newLocale)
                moment.locale(newLocale);
            if (this.datePage == 0) {
                this.weekdays = moment.weekdaysMin();
                this.title = moment(this.current.toISOString()).format('MMMM YYYY');
                var start = moment(this.current).startOf('month');
                var end = moment(this.current).endOf('month');
                if (start.day() < 3)
                    start.add(-7, 'day');
                start.add(start.day() * -1, 'day');
                end = end.add(6 - end.day(), 'day');
                this.dates = [];
                for (var w = 0; w < 6; w++) {
                    var wk = { wk: moment(start).add(w, 'week').week(), dt: [] };
                    for (var d = 0; d < 7; d++) {
                        wk.dt.push(moment(start).add(w, 'week').add(d, 'day'));
                    }
                    this.dates.push(wk);
                }
                if (this.minDate)
                    this.disablePrev = start.isBefore(this.minDate, 'month');
                if (this.maxDate)
                    this.disableNext = end.isAfter(this.maxDate, 'month');
            }
            if (this.datePage == 1) {
                this.months = moment.months();
                this.title = moment(this.current.toISOString()).format('YYYY');
                var start = moment(this.current).startOf('year');
                var end = moment(this.current).endOf('year');
                if (this.minDate)
                    this.disablePrev = start.isBefore(this.minDate, 'month');
                if (this.maxDate)
                    this.disableNext = end.isAfter(this.maxDate, 'month');
            }
            if (this.datePage == 2) {
                this.decade = (this.current.year() - (this.current.year() % 20)) + 1;
                this.title = this.decade + '-' + (this.decade + 20);
                this.disablePrev = (this.minDate && this.decade <= moment(this.minDate).year());
                this.disableNext = (this.maxDate && this.decade + 20 >= moment(this.maxDate).year());
            }
            if (this.type != 'd' && this.timePage == 0) {
                var time = moment(this.current).hour(this.hour).minute(this.minute).second(0).millisecond(0);
                if (this.minDate)
                    this.disableHrDn = time.isSameOrBefore(this.minDate, 'hour');
                if (this.maxDate)
                    this.disableHrUp = time.isSameOrAfter(this.maxDate, 'hour');
                if (this.minDate)
                    this.disableMnDn = time.isSameOrBefore(this.minDate, 'minute');
                if (this.maxDate)
                    this.disableMnUp = time.isSameOrAfter(this.maxDate, 'minute');
                if (this.minDate && time.isSameOrBefore(this.minDate, 'hour'))
                    this.hour = moment(this.minDate).hour();
                if (this.maxDate && time.isSameOrAfter(this.maxDate, 'hour'))
                    this.hour = moment(this.maxDate).hour();
                if (this.minDate && time.isSameOrBefore(this.minDate, 'minute'))
                    this.minute = moment(this.minDate).minute();
                if (this.maxDate && time.isSameOrAfter(this.maxDate, 'minute'))
                    this.minute = moment(this.maxDate).minute();
            }
        };
        UIDateView.prototype.clicked = function (evt) {
            var changed = false;
            if (evt.target.classList.contains('disabled'))
                return;
            if (evt.target.classList.contains('today')) {
                this.current = moment();
                changed = true;
            }
            else if (evt.target.classList.contains('date')) {
                this.current = moment(evt.target['date']);
                changed = true;
            }
            else if (evt.target.classList.contains('month')) {
                this.current.month(evt.target['month']);
                this.datePage = 0;
            }
            else if (evt.target.classList.contains('year')) {
                this.current.year(evt.target['year']);
                this.datePage = 1;
            }
            else if (evt.target.classList.contains('next')) {
                if (this.datePage == 0) {
                    this.current = moment(this.current).add(1, 'month');
                }
                else if (this.datePage == 1) {
                    this.current = moment(this.current).add(1, 'year');
                }
                else if (this.datePage == 2) {
                    this.current = moment(this.current).add(20, 'year');
                }
            }
            else if (evt.target.classList.contains('prev')) {
                if (this.datePage == 0) {
                    this.current = moment(this.current).add(-1, 'month');
                }
                else if (this.datePage == 1) {
                    this.current = moment(this.current).add(-1, 'year');
                }
                else if (this.datePage == 2) {
                    this.current = moment(this.current).add(-20, 'year');
                }
            }
            else if (evt.target.classList.contains('title')) {
                if (this.datePage != 2)
                    this.datePage++;
            }
            else if (evt.target.classList.contains('cancel')) {
                this.datePage = 0;
                this.timePage = 0;
            }
            else if (evt.target.classList.contains('hour-up')) {
                this.hour == 23 ? this.hour = 0 : this.hour++;
                changed = true;
            }
            else if (evt.target.classList.contains('hour-dn')) {
                this.hour == 0 ? this.hour = 23 : this.hour--;
                changed = true;
            }
            else if (evt.target.classList.contains('minute-up')) {
                this.minute == 59 ? this.minute = 0 : this.minute++;
                changed = true;
            }
            else if (evt.target.classList.contains('minute-dn')) {
                this.minute == 0 ? this.minute = 59 : this.minute--;
                changed = true;
            }
            else if (evt.target.classList.contains('hour')) {
                this.timePage = 1;
            }
            else if (evt.target.classList.contains('minute')) {
                this.timePage = 2;
            }
            else if (evt.target.classList.contains('hr')) {
                this.hour = evt.target['hour'];
                this.timePage = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('mn')) {
                this.minute = evt.target['minute'];
                this.timePage = 0;
                changed = true;
            }
            else if (evt.target.classList.contains('tt')) {
                this.hour = this.hour + (this.hour > 11 ? -12 : 12);
                this.timePage = 0;
                changed = true;
            }
            this.buildDatePage();
            if (changed) {
                this.date = moment(this.current).hour(this.type == 'd' ? 0 : this.hour).minute(this.type == 'd' ? 0 : this.minute).second(0).millisecond(0).utc().toISOString();
                ui_event_1.UIEvent.fireEvent('change', this.element, moment(this.date));
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "maxDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateView.prototype, "type", void 0);
        UIDateView = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-date-view\" click.trigger=\"clicked($event)\">\n  <div class=\"ui-dv-date-wrapper\" if.bind=\"type!='t'\">\n    <div class=\"ui-dv-header\">\n      <a class=\"prev ${disablePrev?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-left\"></ui-glyph></a>\n      <a class=\"title\">${title}<ui-glyph glyph=\"glyph-caret-up\" if.bind=\"datePage!=2\"></ui-glyph></a>\n      <a class=\"next ${disableNext?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-right\"></ui-glyph></a>\n    </div>\n    <div class=\"ui-dv-container\">\n      <div class=\"weekdays\" if.bind=\"datePage==0\">\n        <span class=\"week\">#</span>\n        <span repeat.for=\"d of weekdays\">${d}</span>\n      </div>\n      <div repeat.for=\"w of dates\" class=\"dates\" if.bind=\"datePage==0\">\n        <span class=\"week\">${w.wk}</span>\n        <span repeat.for=\"d of w.dt\" date.bind=\"d\" class=\"date hover ${dateClass(d, current, minDate, maxDate)}\">${d.date()}</span>\n      </div>\n      <div repeat.for=\"w of 4\" class=\"months\" if.bind=\"datePage==1\">\n        <span repeat.for=\"d of 3\" month.bind=\"(w*3)+d\" class=\"month hover ${monthClass((w*3)+d, current, minDate, maxDate)}\">${months[(w*3)+d]}</span>\n      </div>\n      <div repeat.for=\"w of 5\" class=\"years\" if.bind=\"datePage==2\">\n          <span repeat.for=\"d of 4\" year.bind=\"(w*4)+d+decade\" class=\"year hover ${yearClass((w*4)+d+decade, current, minDate, maxDate)}\">${(w*4)+d+decade}</span>\n      </div>\n    </div>\n    <div class=\"ui-dv-footer\">\n      <a class=\"today\" if.bind=\"datePage==0\">Today</a>\n      <a class=\"cancel\" if.bind=\"datePage!=0\">Cancel</a>\n    </div>\n  </div>\n  <div class=\"ui-dv-time-wrapper\" if.bind=\"type!='d'\">\n    <div class=\"time\" if.bind=\"timePage==0\">\n      <div><ui-glyph glyph=\"glyph-time\"></ui-glyph></div>\n      <div>\n        <a class=\"hour-up ${disableHrUp?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-up\"></ui-glyph></a>\n        <a class=\"hour\">${(hour>11?hour-12:hour)==0?'12':(hour>11?hour-12:hour) | number:'{00}'}</a>\n        <a class=\"hour-dn ${disableHrDn?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></a>\n      </div>\n      <div>:</div>\n      <div>\n        <a class=\"minute-up ${disableMnUp?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-up\"></ui-glyph></a>\n        <a class=\"minute\">${minute | number:'{00}'}</a>\n        <a class=\"minute-dn ${disableMnDn?'disabled':''}\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></a>\n      </div>\n      <div><a class=\"tt\">${hour>11?'PM':'AM'}</a></div>\n    </div>\n    <div class=\"numbers hours\" if.bind=\"timePage==1\" repeat.for=\"r of 2\">\n      <span repeat.for=\"h of 6\" hour.bind=\"((r*6)+(h+1)==12?0:(r*6)+(h+1))+(hour>11?12:0)\" class=\"hr hover}\"\">${(r*6)+h+1 | number:'{00}'}</span>\n    </div>\n    <div class=\"numbers minutes\" if.bind=\"timePage==2\" repeat.for=\"r of 2\">\n      <span repeat.for=\"m of 6\" minute.bind=\"(r*30)+(m*5)\" class=\"mn hover}\"\">${(r*30)+(m*5) | number:'{00}'}</span>\n    </div>\n    <div if.bind=\"timePage!=0\">\n      <a class=\"cancel\">Cancel</a>\n    </div>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-date-view'),
            __metadata("design:paramtypes", [Element])
        ], UIDateView);
        return UIDateView;
    }());
    exports.UIDateView = UIDateView;
    var UIDateInput = (function (_super) {
        __extends(UIDateInput, _super);
        function UIDateInput(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.date = '';
            _this.format = 'DD MMM YYYY';
            _this.dir = '';
            _this.width = 'auto';
            _this.errors = null;
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
            _this.placeholder = '';
            _this.type = 'd';
            _this.elValue = '';
            _this.show = false;
            _this.clear = false;
            _this.ignore = false;
            _this.clear = element.hasAttribute('clear');
            if (element.hasAttribute('time')) {
                _this.type = 't';
                _this.format = 'hh:mm A';
            }
            if (element.hasAttribute('datetime')) {
                _this.type = 'dt';
                _this.format = 'DD MMM YYYY hh:mm A';
            }
            _this.obLocale = ui_event_1.UIEvent.subscribe('i18n:locale:changed', function (payload) { return _this.updateInputValue(payload.newValue); });
            return _this;
        }
        UIDateInput.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
            if (!isEmpty(this.date) && moment(this.date).isValid()) {
                this.date = moment(this.date).toISOString();
                this.elValue = moment(this.date).format(this.format);
            }
        };
        UIDateInput.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { resize: false });
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-date-view') == _this.dropdown)
                    return true;
                _this.closeDropdown();
            });
        };
        UIDateInput.prototype.detached = function () {
            this.tether.dispose();
            this.obLocale.dispose();
            this.obMouseup.dispose();
        };
        UIDateInput.prototype.clearInput = function () {
            this.date = '';
            this.inputEl.focus();
        };
        UIDateInput.prototype.dateChanged = function (newValue) {
            if (newValue && moment(newValue).isValid())
                this.elValue = moment(newValue).format(this.format);
            else
                this.elValue = '';
            if (this.dropdown.isOpen)
                this.inputEl.focus();
            if (this.type == 'd')
                this.closeDropdown();
            ui_event_1.UIEvent.fireEvent('change', this.element, newValue || null);
        };
        UIDateInput.prototype.updateInputValue = function (newLocale) {
            if (newLocale)
                moment.locale(newLocale);
            if (this.date && moment(this.date).isValid())
                this.elValue = moment(this.date).format(this.format);
            else
                this.elValue = '';
        };
        UIDateInput.prototype.openDropdown = function () {
            if (this.readonly || this.disabled)
                return true;
            this.dropdown.isOpen = true;
            this.dropdown.classList.remove('ui-hidden');
            this.dropdown.au.controller.viewModel.refresh();
            this.tether.position();
            this.inputEl.focus();
        };
        UIDateInput.prototype.closeDropdown = function () {
            this.dropdown.isOpen = false;
            this.dropdown.classList.add('ui-hidden');
            this.dropdown.au.controller.viewModel.datePage = 0;
        };
        UIDateInput.prototype.toggleDropdown = function (evt, forceClose) {
            if (forceClose === void 0) { forceClose = false; }
            evt.stopPropagation();
            evt.cancelBubble = true;
            this.show || this.dropdown.isOpen ? this.closeDropdown() : this.openDropdown();
            this.show = !this.show;
        };
        UIDateInput.prototype.fireEvent = function (evt) {
            evt.stopPropagation();
            var el = getParentByClass(this.element, 'ui-input-group');
            if (evt.type === 'focus') {
                this.inputEl.select();
                this.element.classList.add('ui-focus');
                if (el)
                    el.classList.add('ui-focus');
            }
            if (evt.type === 'blur') {
                this.element.classList.remove('ui-focus');
                if (el)
                    el.classList.remove('ui-focus');
            }
            ui_event_1.UIEvent.fireEvent(evt.type, this.element, this.date);
        };
        UIDateInput.prototype.keyDown = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            if (this.readonly || this.disabled)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 13 && !this.dropdown.isOpen) {
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element, this);
            }
            if (code === 9) {
                this.closeDropdown();
                return true;
            }
            if (code === 38) {
                if (this.date && this.maxDate && moment(this.date).add(1, 'day').isAfter(this.maxDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(1, 'day').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 40) {
                if (this.date && this.minDate && moment(this.date).add(-1, 'day').isBefore(this.minDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(-1, 'day').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 37) {
                if (this.date && this.minDate && moment(this.date).add(-1, 'month').isBefore(this.minDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(-1, 'month').toISOString();
                else
                    this.date = moment().toISOString();
            }
            if (code === 39) {
                if (this.date && this.maxDate && moment(this.date).add(1, 'month').isAfter(this.maxDate, 'date'))
                    return;
                else if (this.date && moment(this.date).isValid())
                    this.date = moment(this.date).add(1, 'month').toISOString();
                else
                    this.date = moment().toISOString();
            }
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "date", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "minDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "maxDate", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "format", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "width", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDateInput.prototype, "placeholder", void 0);
        UIDateInput = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-date\"><div role=\"input\" class=\"ui-input-control\" dir.bind=\"dir\"><slot></slot>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" value.bind=\"elValue\" size=\"1\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    change.trigger=\"fireEvent($event)\" keydown.trigger=\"keyDown($event)\" click.trigger=\"openDropdown($event, show=true)\"\n    placeholder.bind=\"placeholder\" disabled.bind=\"isDisabled\" readonly.bind=\"!allowSearch || readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && date\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-input-addon\" click.trigger=\"toggleDropdown($event)\"><ui-glyph glyph=\"glyph-calendar\"></ui-glyph></span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n  <ui-date-view ref=\"dropdown\" type.bind=\"type\" class=\"ui-hidden floating\" date.bind=\"date\" min-date.bind=\"minDate\" max-date.bind=\"maxDate\"></ui-date-view>\n</template>"),
            aurelia_framework_1.customElement('ui-date'),
            __metadata("design:paramtypes", [Element])
        ], UIDateInput);
        return UIDateInput;
    }(ui_input_1.UIBaseInput));
    exports.UIDateInput = UIDateInput;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-form',["require", "exports", "aurelia-framework", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIForm = (function () {
        function UIForm(element) {
            this.element = element;
            this.class = '';
        }
        UIForm.prototype.attached = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var el = _this.formEl.querySelector('input,textarea');
                if (el !== null)
                    el.focus();
                if (_this.busy)
                    _this.busyChanged(_this.busy);
                if (_this.disabled)
                    _this.disabledChanged(_this.disabled);
            });
        };
        UIForm.prototype.busyChanged = function (newValue) {
            this.disableInputs(!!newValue || this.disabled);
        };
        UIForm.prototype.disabledChanged = function (newValue) {
            this.disableInputs(!!newValue);
        };
        UIForm.prototype.disableInputs = function (newValue) {
            _.forEach(this.inputEls, function (el) {
                try {
                    el.au.controller.viewModel.disable(!!newValue);
                }
                catch (e) {
                }
            });
        };
        UIForm.prototype.fireSubmit = function () {
            if (!this.busy)
                ui_event_1.UIEvent.fireEvent('submit', this.element);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIForm.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UIForm.prototype, "busy", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UIForm.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.children('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown'),
            __metadata("design:type", Object)
        ], UIForm.prototype, "inputEls", void 0);
        UIForm = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.customElement('ui-form'),
            aurelia_framework_1.inlineView("<template><form class=\"ui-form ${class}\" ref=\"formEl\" validation-renderer=\"ui-validator\" enterpressed.trigger=\"fireSubmit()\" submit.trigger=\"return false\"><slot></slot></form></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIForm);
        return UIForm;
    }());
    exports.UIForm = UIForm;
    var UIFieldset = (function () {
        function UIFieldset(element) {
            this.element = element;
            this.class = '';
            this.legend = '';
            this.checked = true;
            this.collapsible = false;
            this.collapsible = element.hasAttribute('checked') || element.hasAttribute('checked.bind');
        }
        UIFieldset.prototype.bind = function (bindingContext, overrideContext) {
            this.checked = this.checked || this.element.hasAttribute('checked');
        };
        UIFieldset.prototype.attached = function () {
            this.checkedChanged(this.checked);
            if (this.disabled)
                this.disabledChanged(this.disabled);
        };
        UIFieldset.prototype.checkedChanged = function (newValue) {
            this.fieldsetEl.classList[!!newValue ? 'remove' : 'add']('ui-collapse');
            this.disableInputs(!newValue);
        };
        UIFieldset.prototype.disabledChanged = function (newValue) {
            this.disableInputs(!!newValue);
        };
        UIFieldset.prototype.disableInputs = function (newValue) {
            _.forEach(this.inputEls, function (el) {
                try {
                    el.au.controller.viewModel.disable(!!newValue);
                }
                catch (e) {
                }
            });
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "legend", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Boolean)
        ], UIFieldset.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.children('ui-button,ui-combo,ui-date,ui-input,ui-textarea,ui-phone,ui-language,ui-markdown,ui-checkbox,ui-radio,ui-switch,ui-tag,ui-list,ui-dropdown'),
            __metadata("design:type", Object)
        ], UIFieldset.prototype, "inputEls", void 0);
        UIFieldset = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView('<template><fieldset class="ui-fieldset" ref="fieldsetEl"><legend if.bind="legend"><span if.bind="!collapsible">\${legend}</span><ui-checkbox if.bind="collapsible" checked.bind="checked">\${legend}</ui-checkbox></legend><div><slot></slot></div></fieldset></template>'),
            aurelia_framework_1.customElement('ui-fieldset'),
            __metadata("design:paramtypes", [Element])
        ], UIFieldset);
        return UIFieldset;
    }());
    exports.UIFieldset = UIFieldset;
    var UIInputGroup = (function () {
        function UIInputGroup(element) {
            this.element = element;
            this.width = '4em';
            if (element.hasAttribute('plain'))
                element.classList.add('ui-plain');
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputGroup.prototype, "width", void 0);
        UIInputGroup = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-group\"><slot name=\"inputLabel\"></slot>\n  <div css.bind=\"{'flex-basis':width}\"><div class=\"ui-group-wrapper\"><slot></slot></div><slot name=\"inputInfo\"></slot></div></template>"),
            aurelia_framework_1.customElement('ui-input-group'),
            __metadata("design:paramtypes", [Element])
        ], UIInputGroup);
        return UIInputGroup;
    }());
    exports.UIInputGroup = UIInputGroup;
    var UIInputInfo = (function () {
        function UIInputInfo(element) {
            this.element = element;
            this.class = '';
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputInfo.prototype, "class", void 0);
        UIInputInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView('<template><div slot="inputInfo" class="ui-input-info \${class}"><slot></slot></div></template>'),
            aurelia_framework_1.customElement('ui-input-info'),
            __metadata("design:paramtypes", [Element])
        ], UIInputInfo);
        return UIInputInfo;
    }());
    exports.UIInputInfo = UIInputInfo;
    var UIInputAddon = (function () {
        function UIInputAddon(element) {
            this.element = element;
            this.glyph = '';
            if (element.hasAttribute('end'))
                element.classList.add('ui-end');
            else
                element.classList.add('ui-start');
        }
        UIInputAddon.prototype.focusEl = function () {
            var el = this.element.nextElementSibling;
            if (el && el['focus'])
                ui_event_1.UIEvent.queueTask(function () { return el['focus'](); });
            return true;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputAddon.prototype, "glyph", void 0);
        UIInputAddon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-input-addon'),
            aurelia_framework_1.inlineView("<template class=\"ui-input-addon\" click.trigger=\"focusEl()\"><slot><ui-glyph glyph.bind=\"glyph\"></ui-glyph></slot></template>"),
            __metadata("design:paramtypes", [Element])
        ], UIInputAddon);
        return UIInputAddon;
    }());
    exports.UIInputAddon = UIInputAddon;
    var UIInputLabel = (function () {
        function UIInputLabel(element) {
            this.element = element;
            this.for = '';
            this.class = '';
            this.width = '8em';
        }
        UIInputLabel_1 = UIInputLabel;
        UIInputLabel.prototype.bind = function (bindingContext, overrideContext) {
            if (this.element.hasAttribute('align-top'))
                this.class += ' ui-align-top';
            if (this.element.hasAttribute('required'))
                this.class += ' ui-required';
            if (this.element.hasAttribute('align-top'))
                this.width = '100%';
        };
        UIInputLabel.prototype.attached = function () {
            if (isEmpty(this.for)) {
                var el = this.label.parentElement.querySelector('input:not([type="checkbox"]):not([type="radio"]),textarea');
                if (el) {
                    if (!el.id)
                        el.id = 'ui-input-' + (UIInputLabel_1.seed++);
                    this.for = el.id;
                }
            }
        };
        UIInputLabel.seed = 1;
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputLabel.prototype, "for", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputLabel.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIInputLabel.prototype, "width", void 0);
        UIInputLabel = UIInputLabel_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.containerless(),
            aurelia_framework_1.inlineView("<template><label ref=\"label\" slot=\"inputLabel\" class=\"ui-input-label ${class}\" for.bind=\"for\" css.bind=\"{'flex-basis':width}\"><span><slot></slot></span></label></template>"),
            aurelia_framework_1.customElement('ui-input-label'),
            __metadata("design:paramtypes", [Element])
        ], UIInputLabel);
        return UIInputLabel;
        var UIInputLabel_1;
    }());
    exports.UIInputLabel = UIInputLabel;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-options',["require", "exports", "aurelia-framework", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIOptionGroup = (function () {
        function UIOptionGroup(element) {
            this.element = element;
            this.value = '';
            this.name = '';
            this.cols = 'auto';
            if (element.hasAttribute('vertical'))
                element.classList.add('ui-vertical');
            this.name = "ui-optgroup-" + (UIOptionGroup_1.seed++);
        }
        UIOptionGroup_1 = UIOptionGroup;
        UIOptionGroup.prototype.bind = function (bindingContext, overrideContext) {
            this.valueChanged(this.value);
        };
        UIOptionGroup.prototype.attached = function () {
            var els = this.element.querySelectorAll('input[type="radio"]');
            for (var i = 0; i < els.length; i++)
                els[i]['name'] = this.name;
        };
        UIOptionGroup.prototype.valueChanged = function (newValue) {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var opt = _this.element.querySelector("input[value=\"" + newValue + "\"]");
                if (opt != null)
                    opt['checked'] = true;
            });
        };
        UIOptionGroup.prototype.changed = function ($event) {
            this.value = $event.detail;
        };
        UIOptionGroup.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIOptionGroup.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIOptionGroup.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIOptionGroup.prototype, "cols", void 0);
        UIOptionGroup = UIOptionGroup_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView('<template class="ui-input-group ui-option-group cols-\${cols}"><slot name="inputLabel"></slot><div class="ui-group-wrapper" change.trigger="changed($event)"><slot></slot></div></template>'),
            aurelia_framework_1.customElement('ui-option-group'),
            __metadata("design:paramtypes", [Element])
        ], UIOptionGroup);
        return UIOptionGroup;
        var UIOptionGroup_1;
    }());
    exports.UIOptionGroup = UIOptionGroup;
    var UICheckbox = (function () {
        function UICheckbox(element) {
            this.element = element;
            this.checked = false;
            this.disabled = false;
            this.for = '';
            this.isDisabled = false;
            this.for = 'ui-checkbox-' + (UICheckbox_1.seed++);
        }
        UICheckbox_1 = UICheckbox;
        UICheckbox.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
            this.checked = this.checked || this.element.hasAttribute('checked');
        };
        UICheckbox.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UICheckbox.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UICheckbox.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UICheckbox.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UICheckbox.prototype, "disabled", void 0);
        UICheckbox = UICheckbox_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-option ui-checkbox\"><input type=\"checkbox\" id.bind=\"for\" disabled.bind=\"disabled\" checked.bind=\"checked\"/>\n  <ui-glyph glyph.bind=\"checked?'glyph-check-on':'glyph-check-off'\"></ui-glyph>\n  <label for.bind=\"for\" class=\"ui-option-label\"><slot></slot></label></template>"),
            aurelia_framework_1.customElement('ui-checkbox'),
            __metadata("design:paramtypes", [Element])
        ], UICheckbox);
        return UICheckbox;
        var UICheckbox_1;
    }());
    exports.UICheckbox = UICheckbox;
    var UIRadio = (function () {
        function UIRadio(element) {
            this.element = element;
            this.checked = false;
            this.name = '';
            this.value = '';
            this.disabled = false;
            this.for = '';
            this.isDisabled = false;
            this.for = 'ui-radio-' + (UIRadio_1.seed++);
        }
        UIRadio_1 = UIRadio;
        UIRadio.prototype.bind = function (bindingContext, overrideContext) {
            this.disabledChanged(this.disabled);
        };
        UIRadio.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UIRadio.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UIRadio.prototype.changed = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            return ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UIRadio.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "name", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRadio.prototype, "disabled", void 0);
        UIRadio = UIRadio_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-option ui-radio\"><input type=\"radio\" name=\"${name}\" id.bind=\"for\" value.bind=\"value\"\n  disabled.bind=\"disabled\" checked.bind=\"checked\" change.trigger=\"changed($event)\"/>\n  <ui-glyph class=\"off\" glyph=\"glyph-radio-off\"></ui-glyph><ui-glyph class=\"on\" glyph=\"glyph-radio-on\"></ui-glyph>\n  <label for.bind=\"for\" class=\"ui-option-label\"><slot></slot></label></template>"),
            aurelia_framework_1.customElement('ui-radio'),
            __metadata("design:paramtypes", [Element])
        ], UIRadio);
        return UIRadio;
        var UIRadio_1;
    }());
    exports.UIRadio = UIRadio;
    var UISwitch = (function () {
        function UISwitch(element) {
            this.element = element;
            this.checked = false;
            this.value = '';
            this.size = 'auto';
            this.class = '';
            this.onLabel = 'on';
            this.offLabel = 'off';
            this.onValue = true;
            this.offValue = false;
            this.disabled = false;
            this.for = '';
            this.isDisabled = false;
            this.for = 'ui-switch-' + (UISwitch_1.seed++);
        }
        UISwitch_1 = UISwitch;
        UISwitch.prototype.bind = function (bindingContext, overrideContext) {
            this.checked = this.checked || this.element.hasAttribute('checked') || (this.value == this.onValue);
            this.value = !!(this.checked) ? this.onValue : this.offValue;
            this.disabledChanged(this.disabled);
        };
        UISwitch.prototype.checkedChanged = function (newValue) {
            this.value = newValue ? this.onValue : this.offValue;
        };
        UISwitch.prototype.valueChanged = function (newValue) {
            this.checked = newValue === this.onValue;
        };
        UISwitch.prototype.disable = function (b) {
            this.element.classList[(this.isDisabled = (b || this.disabled)) ? 'add' : 'remove']('ui-disabled');
        };
        UISwitch.prototype.disabledChanged = function (newValue) {
            this.disable(this.disabled = !!newValue);
        };
        UISwitch.prototype.fireChange = function ($event) {
            $event.cancelBubble = true;
            $event.stopPropagation();
            this.value = this.checked ? this.onValue : this.offValue;
            return ui_event_1.UIEvent.fireEvent('change', this.element, this.value);
        };
        UISwitch.seed = 1;
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "checked", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "size", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "class", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "onLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "offLabel", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "onValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "offValue", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UISwitch.prototype, "disabled", void 0);
        UISwitch = UISwitch_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-option ui-switch-control\">\n<div class=\"ui-switch\" css.bind=\"{width: size}\">\n  <input class=\"ui-switch-input\" type=\"checkbox\" id.bind=\"for\" disabled.bind=\"disabled\" checked.bind=\"checked\" change.trigger=\"fireChange($event)\"/>\n  <label class=\"ui-switch-inner\" for.bind=\"for\" data-on=\"${onLabel}\" data-off=\"${offLabel}\"></label>\n  <div class=\"ui-switch-handle\"></div>\n</div><label class=\"ui-option-label\" for.bind=\"for\"><slot></slot></label>\n</template>"),
            aurelia_framework_1.customElement('ui-switch'),
            __metadata("design:paramtypes", [Element])
        ], UISwitch);
        return UISwitch;
        var UISwitch_1;
    }());
    exports.UISwitch = UISwitch;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-phone',["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIPhone = (function (_super) {
        __extends(UIPhone, _super);
        function UIPhone(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.errors = null;
            _this.country = '';
            _this.disabled = false;
            _this.readonly = false;
            _this.helpText = '';
            _this.clear = false;
            _this.national = false;
            _this.placeholder = '';
            _this.ignore = false;
            _this.clear = element.hasAttribute('clear');
            if (_this.national = element.hasAttribute('country') || element.hasAttribute('country.bind'))
                _this.country = 'us';
            return _this;
        }
        UIPhone.prototype.bind = function (bindingContext, overrideContext) {
            var _this = this;
            _super.prototype.bind.apply(this, arguments);
            this.countryChanged(this.country);
            ui_event_1.UIEvent.queueTask(function () { return _this.valueChanged(_this.value); });
        };
        UIPhone.prototype.valueChanged = function (newValue) {
            if (this.ignore)
                return;
            this.formatPhone(newValue);
        };
        UIPhone.prototype.countryChanged = function (newValue) {
            var ct;
            this.placeholder = PhoneLib.getExample(newValue || 'us', PhoneLib.TYPE.FIXED_LINE_OR_MOBILE, this.national);
            this.prefixEl.className = 'ui-flag ' + newValue;
            this.formatPhone(this.inputEl.value);
        };
        UIPhone.prototype.formatPhone = function (val) {
            var _this = this;
            this.ignore = true;
            this.inputEl.value = PhoneLib.formatInput(val, this.country);
            this.phone = PhoneLib.getNumberInfo(val, this.country);
            this.value = PhoneLib.format(val, this.country, PhoneLib.FORMAT.FULL);
            if (!this.national)
                this.prefixEl.className = 'ui-flag ' + PhoneLib.getIso2Code(val);
            setTimeout(function () { return _this.ignore = false; }, 100);
        };
        UIPhone.prototype.fireEvent = function (evt) {
            if (evt.type === 'input') {
                var val = this.inputEl.value;
                var len = val.length;
                var start = evt.target.selectionStart;
                if (val == '' || val == '+')
                    val = '';
                else if (!this.national && !(/^\+/.test(val)))
                    val = '+' + val;
                this.formatPhone(val);
                if (len < this.inputEl.value.length)
                    start += (this.inputEl.value.length - len);
                try {
                    evt.target.setSelectionRange(start, start);
                }
                catch (e) { }
            }
            _super.prototype.fireEvent.call(this, evt);
        };
        UIPhone.prototype.checkInput = function (evt) {
            evt.stopPropagation();
            var code = evt.keyCode || evt.which;
            if (evt.ctrlKey || evt.metaKey || evt.altKey || code == 9 || code == 8)
                return true;
            if (code == 13)
                return ui_event_1.UIEvent.fireEvent('enterpressed', this.element);
            return /[0-9]/.test(String.fromCharCode(code));
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "phone", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "country", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIPhone.prototype, "helpText", void 0);
        UIPhone = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div role=\"input\" class=\"ui-input-control ui-phone\"><span ref=\"prefixEl\"></span>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type=\"tel\" dir=\"ltr\" size=\"1\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keypress.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"/>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-phone'),
            __metadata("design:paramtypes", [Element])
        ], UIPhone);
        return UIPhone;
    }(ui_input_1.UIBaseInput));
    exports.UIPhone = UIPhone;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/elements/inputs/ui-textarea',["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "lodash"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITextarea = (function (_super) {
        __extends(UITextarea, _super);
        function UITextarea(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.dir = '';
            _this.rows = 5;
            _this.errors = null;
            _this.maxlength = 5000;
            _this.disabled = false;
            _this.readonly = false;
            _this.placeholder = '';
            _this.autoComplete = '';
            _this.helpText = '';
            _this.clear = false;
            _this.counter = false;
            _this.ignore = false;
            _this.acList = [];
            _this.acShow = false;
            _this.properties = [
                'direction',
                'boxSizing',
                'width',
                'height',
                'overflowX',
                'overflowY',
                'borderTopWidth',
                'borderRightWidth',
                'borderBottomWidth',
                'borderLeftWidth',
                'borderStyle',
                'paddingTop',
                'paddingRight',
                'paddingBottom',
                'paddingLeft',
                'fontStyle',
                'fontVariant',
                'fontWeight',
                'fontStretch',
                'fontSize',
                'fontSizeAdjust',
                'lineHeight',
                'fontFamily',
                'textAlign',
                'textTransform',
                'textIndent',
                'textDecoration',
                'letterSpacing',
                'wordSpacing',
                'tabSize',
                'MozTabSize'
            ];
            _this.isBrowser = (typeof window !== 'undefined');
            _this.isFirefox = (_this.isBrowser && window['mozInnerScreenX'] != null);
            _this.clear = element.hasAttribute('clear');
            _this.counter = element.hasAttribute('counter');
            return _this;
        }
        UITextarea.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
            this.autoCompleteChanged(this.autoComplete);
        };
        UITextarea.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown, { resize: false, position: 'tl' });
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function () { return _this.closeAutoComplete(); });
        };
        UITextarea.prototype.detached = function () {
            this.tether.dispose();
            this.obMouseup.dispose();
        };
        UITextarea.prototype.valueChanged = function (newValue) { };
        UITextarea.prototype.autoCompleteChanged = function (newValue) {
            if (_.isString(newValue))
                newValue = newValue.split(',');
            this.autoComplete = newValue.sort();
        };
        UITextarea.prototype.hilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            evt.target.classList.add('ui-hilight');
        };
        UITextarea.prototype.checkList = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            var text = this.inputEl.value.substring(0, this.inputEl.selectionEnd);
            var query = text.match(eval("/\\b([\\d\\w\\-]{1,})$/"));
            if (query !== null) {
                var rx = new RegExp(getAscii(query[1]), 'i');
                this.acList = _.filter(this.autoComplete, function (v) {
                    var asc = getAscii(v);
                    return rx.test(asc);
                });
                if (this.acShow = (this.acList.length > 0)) {
                    var pos = this.getCaretCoordinates();
                    this.tether.position();
                    this.dropdown.style.marginTop = pos.top;
                    this.dropdown.style.marginLeft = pos.left;
                    this.dropdown.classList.add('ui-open');
                }
            }
            return true;
        };
        UITextarea.prototype.checkInput = function (evt) {
            if (evt.ctrlKey || evt.altKey || evt.metaKey || (evt.keyCode || evt.which) === 0)
                return true;
            var code = (evt.keyCode || evt.which);
            if (code == 9)
                this.closeAutoComplete();
            if (this.acShow) {
                if (code == 13) {
                    var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
                    if (h !== null)
                        this.replace(h.dataset.value);
                    this.acShow = false;
                    return false;
                }
                if (code === 38) {
                    var prev = void 0;
                    var h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
                    if (h !== null)
                        h = h.previousElementSibling;
                    if (h === null)
                        h = this.dropdown.querySelector('.ui-list-item');
                    if (h != null) {
                        if (prev != null)
                            prev.classList.remove('ui-hilight');
                        h.classList.add('ui-hilight');
                    }
                    evt.preventDefault();
                    return false;
                }
                else if (code === 40) {
                    var prev = void 0;
                    var h = prev = this.dropdown.querySelector('.ui-list-item.ui-hilight');
                    if (h !== null)
                        h = h.nextElementSibling;
                    if (h === null)
                        h = this.dropdown.querySelector('.ui-list-item');
                    if (h != null) {
                        if (prev != null)
                            prev.classList.remove('ui-hilight');
                        h.classList.add('ui-hilight');
                    }
                    evt.preventDefault();
                    return false;
                }
            }
            return true;
        };
        UITextarea.prototype.replace = function (selected) {
            var _this = this;
            if (!(isFunction(this.beforeReplace) && (selected = this.beforeReplace(selected)) !== false)) {
                var pre = this.inputEl.value.substring(0, this.inputEl.selectionEnd);
                var post = this.inputEl.value.substring(this.inputEl.selectionEnd);
                pre = pre.replace(eval("/\\b([\\d\\w\\-]{1,})$/"), selected + ' ');
                this.value = (pre + post);
                setTimeout(function () { return _this.inputEl.setSelectionRange(pre.length, pre.length); }, 100);
            }
            this.closeAutoComplete();
        };
        UITextarea.prototype.closeAutoComplete = function () {
            this.acShow = false;
            this.dropdown.classList.remove('ui-open');
        };
        UITextarea.prototype.getCaretCoordinates = function () {
            var element = this.inputEl;
            var position = this.inputEl.selectionStart;
            if (!this.isBrowser) {
                throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
            }
            var debug = false;
            if (debug) {
                var el = document.querySelector('#input-textarea-caret-position-mirror-div');
                if (el) {
                    el.parentNode.removeChild(el);
                }
            }
            var div = document.createElement('div');
            div.id = 'input-textarea-caret-position-mirror-div';
            document.body.appendChild(div);
            var style = div.style;
            var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
            style.whiteSpace = 'pre-wrap';
            if (element.nodeName !== 'INPUT')
                style.wordWrap = 'break-word';
            style.position = 'absolute';
            if (!debug)
                style.visibility = 'hidden';
            _.forEach(this.properties, function (prop) {
                style[prop] = computed[prop];
            });
            if (this.isFirefox) {
                if (element.scrollHeight > parseInt(computed.height))
                    style.overflowY = 'scroll';
            }
            else {
                style.overflow = 'hidden';
            }
            div.textContent = element.value.substring(0, position);
            if (element.nodeName === 'INPUT')
                div.textContent = div.textContent.replace(/\s/g, '\u00a0');
            var span = document.createElement('span');
            span.textContent = element.value.substring(position) || '.';
            div.appendChild(span);
            var coordinates = {
                top: (span.offsetTop + parseInt(computed['borderTopWidth']) + 20 - element.scrollTop) + 'px',
                left: (span.offsetLeft + parseInt(computed['borderLeftWidth'])) + 'px'
            };
            if (debug) {
                span.style.backgroundColor = '#aaa';
            }
            else {
                document.body.removeChild(div);
            }
            return coordinates;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "autoComplete", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "helpText", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITextarea.prototype, "beforeReplace", void 0);
        UITextarea = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper\"><div role=\"input\" class=\"ui-input-control ui-textarea\" dir.bind=\"dir\"><span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <textarea ref=\"inputEl\" value.bind=\"value\" rows.bind=\"rows\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    keyup.trigger=\"checkList($event)\" keydown.trigger=\"checkInput($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"></textarea>\n  <ul class=\"ui-list-container ui-floating\" ref=\"dropdown\"><li class=\"ui-list-item\" mouseover.trigger=\"hilightItem($event)\" repeat.for=\"item of acList\" innerhtml.bind=\"item\" data-value.bind=\"item\" click.trigger=\"replace(item)\"></li></ul>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"value.length + ' of ' + maxlength\"></span></div>\n  <div class=\"ui-input-info\" if.bind=\"helpText\" innerhtml.bind=\"helpText\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-textarea'),
            __metadata("design:paramtypes", [Element])
        ], UITextarea);
        return UITextarea;
    }(ui_input_1.UIBaseInput));
    exports.UITextarea = UITextarea;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/attributes/ui-badge',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIBadgeBase = (function () {
        function UIBadgeBase(element, bg) {
            this.value = '';
            this.badgeEl = document.createElement('div');
            this.badgeEl.classList.add('ui-badge');
            this.badgeEl.classList.add(bg);
            if (element.nodeType == Node.ELEMENT_NODE) {
                this.parentEl = element;
            }
            if (element.nodeType == Node.COMMENT_NODE) {
                this.parentEl = element.previousSibling;
            }
        }
        UIBadgeBase.prototype.attached = function () {
            if (this.parentEl.classList.contains('ui-button')) {
                this.parentEl.firstElementChild.appendChild(this.badgeEl);
            }
            else {
                this.parentEl.appendChild(this.badgeEl);
            }
            this.parentEl.classList.add('ui-has-badge');
        };
        UIBadgeBase.prototype.bind = function (bindingContext, overrideContext) { this.valueChanged(this.value); };
        UIBadgeBase.prototype.valueChanged = function (newValue) {
            this.badgeEl.classList[newValue ? 'remove' : 'add']('ui-hidden');
            this.badgeEl.dataset['value'] = newValue;
        };
        UIBadgeBase = __decorate([
            aurelia_framework_1.noView(),
            __metadata("design:paramtypes", [Element, String])
        ], UIBadgeBase);
        return UIBadgeBase;
    }());
    exports.UIBadgeBase = UIBadgeBase;
    var UIBadge = (function (_super) {
        __extends(UIBadge, _super);
        function UIBadge(element) {
            var _this = _super.call(this, element, 'ui-gray') || this;
            _this.element = element;
            _this.theme = 'gray';
            _this.value = '';
            return _this;
        }
        UIBadge.prototype.bind = function () {
            this.valueChanged(this.value);
            this.badgeEl.className = "ui-badge ui-" + this.theme;
        };
        UIBadge.prototype.themeChanged = function (newValue) {
            this.badgeEl.className = "ui-badge ui-" + newValue;
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIBadge.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UIBadge.prototype, "value", void 0);
        UIBadge = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge'),
            __metadata("design:paramtypes", [Element])
        ], UIBadge);
        return UIBadge;
    }(UIBadgeBase));
    exports.UIBadge = UIBadge;
    var UIBadgeDark = (function (_super) {
        __extends(UIBadgeDark, _super);
        function UIBadgeDark(element) {
            var _this = _super.call(this, element, 'ui-dark') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeDark = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-dark'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeDark);
        return UIBadgeDark;
    }(UIBadgeBase));
    exports.UIBadgeDark = UIBadgeDark;
    var UIBadgePrimary = (function (_super) {
        __extends(UIBadgePrimary, _super);
        function UIBadgePrimary(element) {
            var _this = _super.call(this, element, 'ui-primary') || this;
            _this.element = element;
            return _this;
        }
        UIBadgePrimary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-primary'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgePrimary);
        return UIBadgePrimary;
    }(UIBadgeBase));
    exports.UIBadgePrimary = UIBadgePrimary;
    var UIBadgeSecondary = (function (_super) {
        __extends(UIBadgeSecondary, _super);
        function UIBadgeSecondary(element) {
            var _this = _super.call(this, element, 'ui-secondary') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeSecondary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeSecondary);
        return UIBadgeSecondary;
    }(UIBadgeBase));
    exports.UIBadgeSecondary = UIBadgeSecondary;
    var UIBadgeInfo = (function (_super) {
        __extends(UIBadgeInfo, _super);
        function UIBadgeInfo(element) {
            var _this = _super.call(this, element, 'ui-info') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-info'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeInfo);
        return UIBadgeInfo;
    }(UIBadgeBase));
    exports.UIBadgeInfo = UIBadgeInfo;
    var UIBadgeDanger = (function (_super) {
        __extends(UIBadgeDanger, _super);
        function UIBadgeDanger(element) {
            var _this = _super.call(this, element, 'ui-danger') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeDanger = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-danger'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeDanger);
        return UIBadgeDanger;
    }(UIBadgeBase));
    exports.UIBadgeDanger = UIBadgeDanger;
    var UIBadgeSuccess = (function (_super) {
        __extends(UIBadgeSuccess, _super);
        function UIBadgeSuccess(element) {
            var _this = _super.call(this, element, 'ui-success') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeSuccess = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-success'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeSuccess);
        return UIBadgeSuccess;
    }(UIBadgeBase));
    exports.UIBadgeSuccess = UIBadgeSuccess;
    var UIBadgeWarning = (function (_super) {
        __extends(UIBadgeWarning, _super);
        function UIBadgeWarning(element) {
            var _this = _super.call(this, element, 'ui-warning') || this;
            _this.element = element;
            return _this;
        }
        UIBadgeWarning = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('badge-warning'),
            __metadata("design:paramtypes", [Element])
        ], UIBadgeWarning);
        return UIBadgeWarning;
    }(UIBadgeBase));
    exports.UIBadgeWarning = UIBadgeWarning;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/attributes/ui-colors',["require", "exports", "aurelia-framework", "../elements/inputs/ui-button"], function (require, exports, aurelia_framework_1, ui_button_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIColorBase = (function () {
        function UIColorBase(element) {
            this.element = element;
            this.prefix = '';
            this.value = 'default';
            this.oldValue = '';
            if (element['au'] && element['au'].controller)
                this.vm = element['au'].controller.viewModel;
            if (element.nodeType == Node.ELEMENT_NODE) {
                this.parentEl = element;
            }
            if (element.nodeType == Node.COMMENT_NODE) {
                this.parentEl = element.previousSibling;
            }
        }
        UIColorBase.prototype.attached = function () {
            this.changeTheme(this.oldValue, this.value);
        };
        UIColorBase.prototype.valueChanged = function (newValue) {
            this.changeTheme(this.oldValue, newValue);
        };
        UIColorBase.prototype.changeTheme = function (oldTheme, newTheme) {
            var el;
            if (this.vm instanceof ui_button_1.UIButton) {
                if (!this.vm.buttonEl)
                    return;
                el = this.vm.buttonEl;
                if (!this.vm.splitTheme || this.vm.splitTheme === oldTheme)
                    this.vm.splitTheme = newTheme;
            }
            else if (this.vm instanceof ui_button_1.UIButtonGroup) {
                if (!this.vm.buttons)
                    return;
                this.vm.buttons.forEach(function (b) {
                    b.element.classList.remove("ui-" + oldTheme);
                    b.element.classList.add("ui-" + newTheme);
                });
            }
            else {
                el = this.element;
            }
            if (el && el.classList) {
                el.classList.remove("ui-" + this.prefix + oldTheme);
                el.classList.add("ui-" + this.prefix + newTheme);
            }
            this.oldValue = newTheme;
        };
        UIColorBase = __decorate([
            aurelia_framework_1.noView(),
            __metadata("design:paramtypes", [Element])
        ], UIColorBase);
        return UIColorBase;
    }());
    exports.UIColorBase = UIColorBase;
    var UIColorTheme = (function (_super) {
        __extends(UIColorTheme, _super);
        function UIColorTheme(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIColorTheme = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('theme'),
            __metadata("design:paramtypes", [Element])
        ], UIColorTheme);
        return UIColorTheme;
    }(UIColorBase));
    exports.UIColorTheme = UIColorTheme;
    var UIThemePrimary = (function (_super) {
        __extends(UIThemePrimary, _super);
        function UIThemePrimary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemePrimary.prototype.bind = function () {
            this.value = 'primary';
        };
        UIThemePrimary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('primary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemePrimary);
        return UIThemePrimary;
    }(UIColorBase));
    exports.UIThemePrimary = UIThemePrimary;
    var UIThemeSecondary = (function (_super) {
        __extends(UIThemeSecondary, _super);
        function UIThemeSecondary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeSecondary.prototype.bind = function () {
            this.value = 'secondary';
        };
        UIThemeSecondary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSecondary);
        return UIThemeSecondary;
    }(UIColorBase));
    exports.UIThemeSecondary = UIThemeSecondary;
    var UIThemeMuted = (function (_super) {
        __extends(UIThemeMuted, _super);
        function UIThemeMuted(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeMuted.prototype.bind = function () {
            this.value = 'muted';
        };
        UIThemeMuted = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('muted'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeMuted);
        return UIThemeMuted;
    }(UIColorBase));
    exports.UIThemeMuted = UIThemeMuted;
    var UIThemeDark = (function (_super) {
        __extends(UIThemeDark, _super);
        function UIThemeDark(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeDark.prototype.bind = function () {
            this.value = 'dark';
        };
        UIThemeDark = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('dark'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDark);
        return UIThemeDark;
    }(UIColorBase));
    exports.UIThemeDark = UIThemeDark;
    var UIThemeInfo = (function (_super) {
        __extends(UIThemeInfo, _super);
        function UIThemeInfo(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeInfo.prototype.bind = function () {
            this.value = 'info';
        };
        UIThemeInfo = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('info'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeInfo);
        return UIThemeInfo;
    }(UIColorBase));
    exports.UIThemeInfo = UIThemeInfo;
    var UIThemeDanger = (function (_super) {
        __extends(UIThemeDanger, _super);
        function UIThemeDanger(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeDanger.prototype.bind = function () {
            this.value = 'danger';
        };
        UIThemeDanger = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('danger'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDanger);
        return UIThemeDanger;
    }(UIColorBase));
    exports.UIThemeDanger = UIThemeDanger;
    var UIThemeSuccess = (function (_super) {
        __extends(UIThemeSuccess, _super);
        function UIThemeSuccess(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeSuccess.prototype.bind = function () {
            this.value = 'success';
        };
        UIThemeSuccess = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('success'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSuccess);
        return UIThemeSuccess;
    }(UIColorBase));
    exports.UIThemeSuccess = UIThemeSuccess;
    var UIThemeWarning = (function (_super) {
        __extends(UIThemeWarning, _super);
        function UIThemeWarning(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            return _this;
        }
        UIThemeWarning.prototype.bind = function () {
            this.value = 'warning';
        };
        UIThemeWarning = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('warning'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeWarning);
        return UIThemeWarning;
    }(UIColorBase));
    exports.UIThemeWarning = UIThemeWarning;
    var UIColorThemeBg = (function (_super) {
        __extends(UIColorThemeBg, _super);
        function UIColorThemeBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIColorThemeBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-theme'),
            __metadata("design:paramtypes", [Element])
        ], UIColorThemeBg);
        return UIColorThemeBg;
    }(UIColorBase));
    exports.UIColorThemeBg = UIColorThemeBg;
    var UIThemePrimaryBg = (function (_super) {
        __extends(UIThemePrimaryBg, _super);
        function UIThemePrimaryBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemePrimaryBg.prototype.bind = function () {
            this.value = 'primary';
        };
        UIThemePrimaryBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-primary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemePrimaryBg);
        return UIThemePrimaryBg;
    }(UIColorBase));
    exports.UIThemePrimaryBg = UIThemePrimaryBg;
    var UIThemeSecondaryBg = (function (_super) {
        __extends(UIThemeSecondaryBg, _super);
        function UIThemeSecondaryBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeSecondaryBg.prototype.bind = function () {
            this.value = 'secondary';
        };
        UIThemeSecondaryBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSecondaryBg);
        return UIThemeSecondaryBg;
    }(UIColorBase));
    exports.UIThemeSecondaryBg = UIThemeSecondaryBg;
    var UIThemeMutedBg = (function (_super) {
        __extends(UIThemeMutedBg, _super);
        function UIThemeMutedBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeMutedBg.prototype.bind = function () {
            this.value = 'muted';
        };
        UIThemeMutedBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-muted'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeMutedBg);
        return UIThemeMutedBg;
    }(UIColorBase));
    exports.UIThemeMutedBg = UIThemeMutedBg;
    var UIThemeDarkBg = (function (_super) {
        __extends(UIThemeDarkBg, _super);
        function UIThemeDarkBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeDarkBg.prototype.bind = function () {
            this.value = 'dark';
        };
        UIThemeDarkBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-dark'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDarkBg);
        return UIThemeDarkBg;
    }(UIColorBase));
    exports.UIThemeDarkBg = UIThemeDarkBg;
    var UIThemeLightBg = (function (_super) {
        __extends(UIThemeLightBg, _super);
        function UIThemeLightBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeLightBg.prototype.bind = function () {
            this.value = 'light';
        };
        UIThemeLightBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-light'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeLightBg);
        return UIThemeLightBg;
    }(UIColorBase));
    exports.UIThemeLightBg = UIThemeLightBg;
    var UIThemeInfoBg = (function (_super) {
        __extends(UIThemeInfoBg, _super);
        function UIThemeInfoBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeInfoBg.prototype.bind = function () {
            this.value = 'info';
        };
        UIThemeInfoBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-info'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeInfoBg);
        return UIThemeInfoBg;
    }(UIColorBase));
    exports.UIThemeInfoBg = UIThemeInfoBg;
    var UIThemeDangerBg = (function (_super) {
        __extends(UIThemeDangerBg, _super);
        function UIThemeDangerBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeDangerBg.prototype.bind = function () {
            this.value = 'danger';
        };
        UIThemeDangerBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-danger'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDangerBg);
        return UIThemeDangerBg;
    }(UIColorBase));
    exports.UIThemeDangerBg = UIThemeDangerBg;
    var UIThemeSuccessBg = (function (_super) {
        __extends(UIThemeSuccessBg, _super);
        function UIThemeSuccessBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeSuccessBg.prototype.bind = function () {
            this.value = 'success';
        };
        UIThemeSuccessBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-success'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSuccessBg);
        return UIThemeSuccessBg;
    }(UIColorBase));
    exports.UIThemeSuccessBg = UIThemeSuccessBg;
    var UIThemeWarningBg = (function (_super) {
        __extends(UIThemeWarningBg, _super);
        function UIThemeWarningBg(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'bg-';
            return _this;
        }
        UIThemeWarningBg.prototype.bind = function () {
            this.value = 'warning';
        };
        UIThemeWarningBg = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('bg-warning'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeWarningBg);
        return UIThemeWarningBg;
    }(UIColorBase));
    exports.UIThemeWarningBg = UIThemeWarningBg;
    var UIColorThemeText = (function (_super) {
        __extends(UIColorThemeText, _super);
        function UIColorThemeText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIColorThemeText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-theme'),
            __metadata("design:paramtypes", [Element])
        ], UIColorThemeText);
        return UIColorThemeText;
    }(UIColorBase));
    exports.UIColorThemeText = UIColorThemeText;
    var UIThemePrimaryText = (function (_super) {
        __extends(UIThemePrimaryText, _super);
        function UIThemePrimaryText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemePrimaryText.prototype.bind = function () {
            this.value = 'primary';
        };
        UIThemePrimaryText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-primary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemePrimaryText);
        return UIThemePrimaryText;
    }(UIColorBase));
    exports.UIThemePrimaryText = UIThemePrimaryText;
    var UIThemeSecondaryText = (function (_super) {
        __extends(UIThemeSecondaryText, _super);
        function UIThemeSecondaryText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeSecondaryText.prototype.bind = function () {
            this.value = 'secondary';
        };
        UIThemeSecondaryText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSecondaryText);
        return UIThemeSecondaryText;
    }(UIColorBase));
    exports.UIThemeSecondaryText = UIThemeSecondaryText;
    var UIThemeMutedText = (function (_super) {
        __extends(UIThemeMutedText, _super);
        function UIThemeMutedText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeMutedText.prototype.bind = function () {
            this.value = 'muted';
        };
        UIThemeMutedText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-muted'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeMutedText);
        return UIThemeMutedText;
    }(UIColorBase));
    exports.UIThemeMutedText = UIThemeMutedText;
    var UIThemeDarkText = (function (_super) {
        __extends(UIThemeDarkText, _super);
        function UIThemeDarkText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeDarkText.prototype.bind = function () {
            this.value = 'dark';
        };
        UIThemeDarkText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-dark'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDarkText);
        return UIThemeDarkText;
    }(UIColorBase));
    exports.UIThemeDarkText = UIThemeDarkText;
    var UIThemeLightText = (function (_super) {
        __extends(UIThemeLightText, _super);
        function UIThemeLightText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeLightText.prototype.bind = function () {
            this.value = 'light';
        };
        UIThemeLightText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-light'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeLightText);
        return UIThemeLightText;
    }(UIColorBase));
    exports.UIThemeLightText = UIThemeLightText;
    var UIThemeInfoText = (function (_super) {
        __extends(UIThemeInfoText, _super);
        function UIThemeInfoText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeInfoText.prototype.bind = function () {
            this.value = 'info';
        };
        UIThemeInfoText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-info'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeInfoText);
        return UIThemeInfoText;
    }(UIColorBase));
    exports.UIThemeInfoText = UIThemeInfoText;
    var UIThemeDangerText = (function (_super) {
        __extends(UIThemeDangerText, _super);
        function UIThemeDangerText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeDangerText.prototype.bind = function () {
            this.value = 'danger';
        };
        UIThemeDangerText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-danger'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeDangerText);
        return UIThemeDangerText;
    }(UIColorBase));
    exports.UIThemeDangerText = UIThemeDangerText;
    var UIThemeSuccessText = (function (_super) {
        __extends(UIThemeSuccessText, _super);
        function UIThemeSuccessText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeSuccessText.prototype.bind = function () {
            this.value = 'success';
        };
        UIThemeSuccessText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-success'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeSuccessText);
        return UIThemeSuccessText;
    }(UIColorBase));
    exports.UIThemeSuccessText = UIThemeSuccessText;
    var UIThemeWarningText = (function (_super) {
        __extends(UIThemeWarningText, _super);
        function UIThemeWarningText(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.prefix = 'text-';
            return _this;
        }
        UIThemeWarningText.prototype.bind = function () {
            this.value = 'warning';
        };
        UIThemeWarningText = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('text-warning'),
            __metadata("design:paramtypes", [Element])
        ], UIThemeWarningText);
        return UIThemeWarningText;
    }(UIColorBase));
    exports.UIThemeWarningText = UIThemeWarningText;
});

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/attributes/ui-ribbon',["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIRibbon = (function () {
        function UIRibbon(element) {
            this.element = element;
            this.message = '';
            this.theme = 'dark';
            this.ribbon = document.createElement('div');
            this.ribbon.classList.add('ui-ribbon');
            element.appendChild(this.ribbon);
            element['style'].overflow = 'hidden';
        }
        UIRibbon.prototype.bind = function (bindingContext, overrideContext) {
            if (isEmpty(this.message))
                this.ribbon.classList.add('ui-hidden');
            this.ribbon.innerHTML = this.message;
            this.ribbon.className = 'ui-ribbon ui-' + this.theme;
        };
        UIRibbon.prototype.themeChanged = function (newValue) {
            this.ribbon.className = 'ui-ribbon ' + newValue;
        };
        UIRibbon.prototype.messageChanged = function (newValue) {
            if (isEmpty(newValue))
                return this.ribbon.classList.add('ui-hidden');
            this.ribbon.classList.remove('ui-hidden');
            this.ribbon.innerHTML = newValue;
        };
        __decorate([
            aurelia_framework_1.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UIRibbon.prototype, "message", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIRibbon.prototype, "theme", void 0);
        UIRibbon = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('ribbon'),
            __metadata("design:paramtypes", [Element])
        ], UIRibbon);
        return UIRibbon;
    }());
    exports.UIRibbon = UIRibbon;
});

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('aurelia-ui-framework/attributes/ui-tooltip',["require", "exports", "aurelia-framework", "../utils/ui-utils"], function (require, exports, aurelia_framework_1, ui_utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITooltipBase = (function () {
        function UITooltipBase(element) {
            this.element = element;
            this.theme = 'light';
            this.value = '';
        }
        UITooltipBase_1 = UITooltipBase;
        UITooltipBase.prototype.attached = function () {
            var _this = this;
            if (!UITooltipBase_1.tooltipEl) {
                var el = UITooltipBase_1.tooltipEl = document.createElement('div');
                el.classList.add('ui-tooltip');
                ui_utils_1.UIUtils.overlayContainer.appendChild(el);
            }
            this.element.addEventListener('mouseenter', function () { return _this.show(); });
            this.element.addEventListener('mouseleave', function () { return _this.hide(); });
        };
        UITooltipBase.prototype.detached = function () { this.hide(); };
        UITooltipBase.prototype.unbind = function () { this.hide(); };
        UITooltipBase.prototype.show = function () {
            if (isEmpty(this.value))
                return;
            var el = UITooltipBase_1.tooltipEl;
            el.className = 'ui-tooltip ui-' + this.theme;
            el.innerHTML = this.value;
            this.tether = ui_utils_1.UIUtils.tether(this.element, el, { resize: false, position: 'tc' });
            this.timer = setTimeout(function () { return el.classList.add('ui-show'); }, 700);
        };
        UITooltipBase.prototype.hide = function () {
            clearTimeout(this.timer);
            if (this.tether)
                this.tether.dispose();
            UITooltipBase_1.tooltipEl.className = 'ui-tooltip';
            this.tether = null;
        };
        UITooltipBase = UITooltipBase_1 = __decorate([
            aurelia_framework_1.noView(),
            __metadata("design:paramtypes", [Element])
        ], UITooltipBase);
        return UITooltipBase;
        var UITooltipBase_1;
    }());
    exports.UITooltipBase = UITooltipBase;
    var UITooltip = (function (_super) {
        __extends(UITooltip, _super);
        function UITooltip(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'light';
            _this.value = '';
            return _this;
        }
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITooltip.prototype, "theme", void 0);
        __decorate([
            aurelia_framework_1.bindable({ primaryProperty: true }),
            __metadata("design:type", Object)
        ], UITooltip.prototype, "value", void 0);
        UITooltip = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip'),
            __metadata("design:paramtypes", [Element])
        ], UITooltip);
        return UITooltip;
    }(UITooltipBase));
    exports.UITooltip = UITooltip;
    var UITooltipDark = (function (_super) {
        __extends(UITooltipDark, _super);
        function UITooltipDark(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'dark';
            return _this;
        }
        UITooltipDark = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip-dark'),
            __metadata("design:paramtypes", [Element])
        ], UITooltipDark);
        return UITooltipDark;
    }(UITooltipBase));
    exports.UITooltipDark = UITooltipDark;
    var UITooltipPrimary = (function (_super) {
        __extends(UITooltipPrimary, _super);
        function UITooltipPrimary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'primary';
            return _this;
        }
        UITooltipPrimary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip-primary'),
            __metadata("design:paramtypes", [Element])
        ], UITooltipPrimary);
        return UITooltipPrimary;
    }(UITooltipBase));
    exports.UITooltipPrimary = UITooltipPrimary;
    var UITooltipSecondary = (function (_super) {
        __extends(UITooltipSecondary, _super);
        function UITooltipSecondary(element) {
            var _this = _super.call(this, element) || this;
            _this.element = element;
            _this.theme = 'secondary';
            return _this;
        }
        UITooltipSecondary = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customAttribute('tooltip-secondary'),
            __metadata("design:paramtypes", [Element])
        ], UITooltipSecondary);
        return UITooltipSecondary;
    }(UITooltipBase));
    exports.UITooltipSecondary = UITooltipSecondary;
});

define('aurelia-ui-framework/value-converters/ui-lodash',["require", "exports", "lodash"], function (require, exports, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SplitValueConverter = (function () {
        function SplitValueConverter() {
        }
        SplitValueConverter.prototype.toView = function (object, char) {
            if (char === void 0) { char = ','; }
            return (object || '').split(new RegExp("[" + char + "]"));
        };
        return SplitValueConverter;
    }());
    exports.SplitValueConverter = SplitValueConverter;
    var KeysValueConverter = (function () {
        function KeysValueConverter() {
        }
        KeysValueConverter.prototype.toView = function (object) {
            if (isEmpty(object))
                return [];
            return Object.keys(object);
        };
        return KeysValueConverter;
    }());
    exports.KeysValueConverter = KeysValueConverter;
    var GroupValueConverter = (function () {
        function GroupValueConverter() {
        }
        GroupValueConverter.prototype.toView = function (object, property) {
            var a = [];
            var g = _.groupBy(object, property);
            _.forEach(g, function (v, k) { return a.push({ key: k, items: v }); });
            return a;
        };
        return GroupValueConverter;
    }());
    exports.GroupValueConverter = GroupValueConverter;
    var FilterValueConverter = (function () {
        function FilterValueConverter() {
        }
        FilterValueConverter.prototype.toView = function (object, property, value) {
            if (object === void 0) { object = []; }
            return _.filter(object, [property, value]);
        };
        return FilterValueConverter;
    }());
    exports.FilterValueConverter = FilterValueConverter;
    var SortValueConverter = (function () {
        function SortValueConverter() {
        }
        SortValueConverter.prototype.toView = function (value, property) {
            return _.sortBy(value, property);
        };
        return SortValueConverter;
    }());
    exports.SortValueConverter = SortValueConverter;
});

define('aurelia-ui-framework/value-converters/ui-text',["require", "exports", "../utils/ui-format"], function (require, exports, ui_format_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var JsonValueConverter = (function () {
        function JsonValueConverter() {
        }
        JsonValueConverter.prototype.toView = function (value) {
            return JSON.stringify(value);
        };
        return JsonValueConverter;
    }());
    exports.JsonValueConverter = JsonValueConverter;
    var MarkdownValueConverter = (function () {
        function MarkdownValueConverter() {
        }
        MarkdownValueConverter.prototype.toView = function (value) {
            return ui_format_1.UIFormat.toHTML(value || '');
        };
        return MarkdownValueConverter;
    }());
    exports.MarkdownValueConverter = MarkdownValueConverter;
    var PhoneValueConverter = (function () {
        function PhoneValueConverter() {
        }
        PhoneValueConverter.prototype.toView = function (value, country) {
            if (country === void 0) { country = ''; }
            return PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
        };
        return PhoneValueConverter;
    }());
    exports.PhoneValueConverter = PhoneValueConverter;
    var DateValueConverter = (function () {
        function DateValueConverter() {
        }
        DateValueConverter.prototype.toView = function (value, format) {
            return ui_format_1.UIFormat.date(value, format);
        };
        return DateValueConverter;
    }());
    exports.DateValueConverter = DateValueConverter;
    var TimeValueConverter = (function () {
        function TimeValueConverter() {
        }
        TimeValueConverter.prototype.toView = function (value, format) {
            return ui_format_1.UIFormat.time(value, format);
        };
        return TimeValueConverter;
    }());
    exports.TimeValueConverter = TimeValueConverter;
    var DatetimeValueConverter = (function () {
        function DatetimeValueConverter() {
        }
        DatetimeValueConverter.prototype.toView = function (value, format) {
            return ui_format_1.UIFormat.datetime(value, format);
        };
        return DatetimeValueConverter;
    }());
    exports.DatetimeValueConverter = DatetimeValueConverter;
    var FromNowValueConverter = (function () {
        function FromNowValueConverter() {
        }
        FromNowValueConverter.prototype.toView = function (value) {
            return ui_format_1.UIFormat.fromNow(value);
        };
        return FromNowValueConverter;
    }());
    exports.FromNowValueConverter = FromNowValueConverter;
    var UtcValueConverter = (function () {
        function UtcValueConverter() {
        }
        UtcValueConverter.prototype.toView = function (value) {
            return ui_format_1.UIFormat.utcDate(value);
        };
        return UtcValueConverter;
    }());
    exports.UtcValueConverter = UtcValueConverter;
    var NumberValueConverter = (function () {
        function NumberValueConverter() {
        }
        NumberValueConverter.prototype.toView = function (value, format) {
            return ui_format_1.UIFormat.number(value, format);
        };
        return NumberValueConverter;
    }());
    exports.NumberValueConverter = NumberValueConverter;
    var CurrencyValueConverter = (function () {
        function CurrencyValueConverter() {
        }
        CurrencyValueConverter.prototype.toView = function (value, symbol, format) {
            return ui_format_1.UIFormat.currency(value, symbol, format);
        };
        return CurrencyValueConverter;
    }());
    exports.CurrencyValueConverter = CurrencyValueConverter;
    var PercentValueConverter = (function () {
        function PercentValueConverter() {
        }
        PercentValueConverter.prototype.toView = function (value) {
            return ui_format_1.UIFormat.percent(value);
        };
        return PercentValueConverter;
    }());
    exports.PercentValueConverter = PercentValueConverter;
});
