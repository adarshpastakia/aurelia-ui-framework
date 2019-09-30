(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aurelia-framework'), require('aurelia-validation'), require('libphonenumber-js'), require('aurelia-event-aggregator'), require('aurelia-logging'), require('aurelia-metadata'), require('aurelia-fetch-client'), require('date-fns'), require('kramed'), require('numeral'), require('aurelia-router'), require('resize-observer-polyfill'), require('libphonenumber-js/examples.mobile.json')) :
  typeof define === 'function' && define.amd ? define(['exports', 'aurelia-framework', 'aurelia-validation', 'libphonenumber-js', 'aurelia-event-aggregator', 'aurelia-logging', 'aurelia-metadata', 'aurelia-fetch-client', 'date-fns', 'kramed', 'numeral', 'aurelia-router', 'resize-observer-polyfill', 'libphonenumber-js/examples.mobile.json'], factory) :
  (global = global || self, factory((global.au = global.au || {}, global.au.uiFramework = {}), global.au, global.au.validation, global.libphonenumberJs, global.au, global.au, global.au, global.au, global.dateFns, global.kramed, global.numeral, global.au, global.ResizeObserver, global.examples));
}(this, function (exports, aureliaFramework, aureliaValidation, libphonenumberJs, aureliaEventAggregator, aureliaLogging, aureliaMetadata, aureliaFetchClient, dateFns, kramed, numeral, aureliaRouter, ResizeObserver, examples) { 'use strict';

  kramed = kramed && kramed.hasOwnProperty('default') ? kramed['default'] : kramed;
  numeral = numeral && numeral.hasOwnProperty('default') ? numeral['default'] : numeral;
  ResizeObserver = ResizeObserver && ResizeObserver.hasOwnProperty('default') ? ResizeObserver['default'] : ResizeObserver;
  examples = examples && examples.hasOwnProperty('default') ? examples['default'] : examples;

  const registerValidators = (container) => {
      container.get(aureliaValidation.ValidationController).validateTrigger = aureliaValidation.validateTrigger.changeOrBlur;
      aureliaValidation.ValidationRules.customRule("url", (value) => value === null ||
          value === undefined ||
          value === "" ||
          /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(value), "\${$displayName} is not a valid url.");
      aureliaValidation.ValidationRules.customRule("phone", (value) => value === null || value === undefined || value === "" || libphonenumberJs.parsePhoneNumberFromString(value).isValid(), "\${$displayName} is not a valid phone number.");
      aureliaValidation.ValidationRules.customRule("number", (value, obj, min, max) => value === null ||
          value === undefined ||
          value === "" ||
          (isNumber(value) &&
              value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
              value <= (isEmpty(max) ? Number.MAX_VALUE : max)), "\${$displayName} must be an number value between \${$config.min} and \${$config.max}.", (min, max) => ({ min, max }));
      aureliaValidation.ValidationRules.customRule("decimal", (value, obj, min, max) => value === null ||
          value === undefined ||
          value === "" ||
          (isDecimal(value) &&
              value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
              value <= (isEmpty(max) ? Number.MAX_VALUE : max)), "\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.", (min, max) => ({ min, max }));
  };
  class UIValidationRenderer {
      render(instruction) {
          for (const { result, elements } of instruction.unrender) {
              for (const element of elements) {
                  this.remove(element, result);
              }
          }
          for (const { result, elements } of instruction.render) {
              for (const element of elements) {
                  this.add(element, result);
              }
          }
      }
      add(element, result) {
          if (result.valid) {
              return;
          }
          try {
              const vm = element.au.controller.viewModel;
              if (!vm.errors) {
                  vm.errors = [];
              }
              if (vm.errors.indexOf(result) >= 0) {
                  return;
              }
              vm.errors.push(result);
          }
          catch (E) {
          }
      }
      remove(element, result) {
          if (result.valid) {
              return;
          }
          try {
              const vm = element.au.controller.viewModel;
              let i = vm.errors.length;
              while (i--) {
                  const message = vm.errors[i];
                  if (message.id === result.id) {
                      vm.errors.splice(i, 1);
                      break;
                  }
              }
              if (vm.errors.length === 0) {
                  vm.errors = [];
              }
          }
          catch (E) {
          }
      }
  }

  /**
   * @author    : Adarsh Pastakia
   * @version   : 5.0.0
   * @copyright : 2018
   * @license   : MIT
   */

  Object.defineProperty(Object.prototype, "forEach", {
    writable: true,
    value: function(callback) {
      Object.entries(this).forEach(entry => callback(entry[1], entry[0]));
    }
  });

  Object.defineProperty(Array.prototype, "last", {
    writable: true,
    value: function() {
      return this.length > 0 ? this[this.length - 1] : null;
    }
  });

  /**
   * @param matcher: value or matcher function
   * @param prop: property to use for getting indexOf
   */
  Object.defineProperty(Array.prototype, "index", {
    writable: true,
    value: function(matcher, prop) {
      if (prop) {
        const flatMap = this.map(o => o[prop]);
        return flatMap.indexOf(matcher);
      } else if (isFunction(matcher)) {
        let index = -1;
        for (let i = 0; i < this.length; i--) {
          if (matcher(this[i])) {
            index = i;
            break;
          }
        }
        return index;
      } else {
        return this.indexOf(matcher);
      }
    }
  });

  /**
   * @param matcher: value or matcher function
   * @param prop: property to use for getting lastIndexOf
   */
  Object.defineProperty(Array.prototype, "lastIndex", {
    writable: true,
    value: function(matcher, prop) {
      if (prop) {
        const flatMap = this.map(o => o[prop]);
        return flatMap.lastIndexOf(matcher);
      } else if (isFunction(matcher)) {
        let index = -1;
        for (let i = this.length - 1; i >= 0; i--) {
          if (matcher(this[i])) {
            index = i;
            break;
          }
        }
        return index;
      } else {
        return this.lastIndexOf(matcher);
      }
    }
  });

  Object.defineProperty(Array.prototype, "remove", {
    writable: true,
    value: function(obj) {
      const idx = this.indexOf(obj);
      if (idx !== -1) {
        this.splice(idx, 1);
      }
      return idx !== -1;
    }
  });

  Object.defineProperty(Array.prototype, "groupBy", {
    writable: true,
    value: function(property) {
      if (isEmpty(property)) {
        throw new Error("Missing property to groupBy");
      }
      if (isEmpty(this)) {
        return new Map();
      }
      return this.reduce((a, b) => {
        let key = b;
        for(const i of property.split('.')) key = key[i];
        if (!a.has(key)) {
          a.set(key, []);
        }
        a.get(key).push(b);
        return a;
      }, new Map());
    }
  });
  Object.defineProperty(Array.prototype, "sortBy", {
    writable: true,
    value: function(property, isAscending = true) {
      if (isEmpty(this)) {
        return [];
      }
      let sorter = (a, b) => ((a < b && isAscending) || (a > b && !isAscending) ? -1 : 1);
      if (typeof property === "string") {
        sorter = (a, b) =>
          (a[property] || "").toString().localeCompare((b[property] || "").toString()) *
            (isAscending ? 1 : -1) ===
          -1
            ? -1
            : 1;
      } else if (isArray(property)) {
        sorter = (a, b) => {
          for (const p of property) {
            if (a[p] !== undefined && b[p] !== undefined) {
              if (a[p].toString().localeCompare(b[p].toString()) !== 0) {
                return a[p].toString().localeCompare(b[p].toString()) * (isAscending ? 1 : -1) === -1
                  ? -1
                  : 1;
              }
            }
          }
        };
      }
      return this.sort(sorter);
    }
  });

  var _Countries = {
    toIso2: function(c) {
      const ctry = this.find(c);
      return ctry
        ? ctry.iso2
        : null;
    },
    toIso3: function(c) {
      const ctry = this.find(c);
      return ctry
        ? ctry.iso3
        : null;
    },
    find: function(c) {
      return this.list.find(function(ct) {
        return (ct.iso3.toLowerCase() === c.toLowerCase() || ct.iso2.toLowerCase() === c.toLowerCase());
      });
    },
    list: [
      {
        continent: "Asia",
        iso2: "AF",
        iso3: "AFG",
        name: "Afghanistan",
        fullname: "The Islamic Republic of Afghanistan",
        capital: "Kabul",
        tld: ".af",
        currency: "AFN",
        phone: "+93"
      },
      {
        continent: "Europe",
        iso2: "AL",
        iso3: "ALB",
        name: "Albania",
        fullname: "The Republic of Albania",
        capital: "Tirana",
        tld: ".al",
        currency: "ALL",
        phone: "+355"
      },
      {
        continent: "Africa",
        iso2: "DZ",
        iso3: "DZA",
        name: "Algeria",
        fullname: "The People's Democratic Republic of Algeria",
        capital: "Algiers",
        tld: ".dz",
        currency: "DZD",
        phone: "+213"
      },
      {
        continent: "Oceania",
        iso2: "AS",
        iso3: "ASM",
        name: "American Samoa",
        fullname: "American Samoa",
        capital: "Pago Pago",
        tld: ".as",
        currency: "USD",
        phone: "+1684"
      },
      {
        continent: "Europe",
        iso2: "AD",
        iso3: "AND",
        name: "Andorra",
        fullname: "The Principality of Andorra",
        capital: "Andorra la Vella",
        tld: ".ad",
        currency: "EUR",
        phone: "+376"
      },
      {
        continent: "Africa",
        iso2: "AO",
        iso3: "AGO",
        name: "Angola",
        fullname: "The Republic of Angola",
        capital: "Luanda",
        tld: ".ao",
        currency: "AOA",
        phone: "+244"
      },
      {
        continent: "North America",
        iso2: "AI",
        iso3: "AIA",
        name: "Anguilla",
        fullname: "Anguilla",
        capital: "The Valley",
        tld: ".ai",
        currency: "XCD",
        phone: "+1264"
      },
      {
        continent: "North America",
        iso2: "AG",
        iso3: "ATG",
        name: "Antigua And Barbuda",
        fullname: "Antigua and Barbuda",
        capital: "Saint John’s",
        tld: ".ag",
        currency: "XCD",
        phone: "+1268"
      },
      {
        continent: "South America",
        iso2: "AR",
        iso3: "ARG",
        name: "Argentina",
        fullname: "The Argentine Republic",
        capital: "Buenos Aires",
        tld: ".ar",
        currency: "ARS",
        phone: "+54"
      },
      {
        continent: "Asia",
        iso2: "AM",
        iso3: "ARM",
        name: "Armenia",
        fullname: "The Republic of Armenia",
        capital: "Yerevan",
        tld: ".am",
        currency: "AMD",
        phone: "+374"
      },
      {
        continent: "North America",
        iso2: "AW",
        iso3: "ABW",
        name: "Aruba",
        fullname: "Aruba",
        capital: "Oranjestad",
        tld: ".aw",
        currency: "ANG",
        phone: "+297"
      },
      {
        continent: "Oceania",
        iso2: "AU",
        iso3: "AUS",
        name: "Australia",
        fullname: "Australia",
        capital: "Canberra",
        tld: ".au",
        currency: "AUD",
        phone: "+61"
      },
      {
        continent: "Europe",
        iso2: "AT",
        iso3: "AUT",
        name: "Austria",
        fullname: "The Republic of Austria",
        capital: "Vienna",
        tld: ".at",
        currency: "EUR",
        phone: "+43"
      },
      {
        continent: "Asia",
        iso2: "AZ",
        iso3: "AZE",
        name: "Azerbaijan",
        fullname: "The Republic of Azerbaijan",
        capital: "Baku",
        tld: ".az",
        currency: "AZN",
        phone: "+994"
      },
      {
        continent: "North America",
        iso2: "BS",
        iso3: "BHS",
        name: "Bahamas",
        fullname: "The Commonwealth of the Bahamas",
        capital: "Nassau",
        tld: ".bs",
        currency: "BSD",
        phone: "+1242"
      },
      {
        continent: "Asia",
        iso2: "BH",
        iso3: "BHR",
        name: "Bahrain",
        fullname: "The Kingdom of Bahrain",
        capital: "Manama",
        tld: ".bh",
        currency: "BHD",
        phone: "+973"
      },
      {
        continent: "Asia",
        iso2: "BD",
        iso3: "BGD",
        name: "Bangladesh",
        fullname: "The People's Republic of Bangladesh",
        capital: "Dhaka",
        tld: ".bd",
        currency: "BDT",
        phone: "+880"
      },
      {
        continent: "North America",
        iso2: "BB",
        iso3: "BRB",
        name: "Barbados",
        fullname: "Barbados",
        capital: "Bridgetown",
        tld: ".bb",
        currency: "BBD",
        phone: "+1246"
      },
      {
        continent: "Europe",
        iso2: "BY",
        iso3: "BLR",
        name: "Belarus",
        fullname: "The Republic of Belarus",
        capital: "Minsk",
        tld: ".by",
        currency: "BYR",
        phone: "+375"
      },
      {
        continent: "Europe",
        iso2: "BE",
        iso3: "BEL",
        name: "Belgium",
        fullname: "The Kingdom of Belgium",
        capital: "Brussels",
        tld: ".be",
        currency: "EUR",
        phone: "+32"
      },
      {
        continent: "North America",
        iso2: "BZ",
        iso3: "BLZ",
        name: "Belize",
        fullname: "Belize",
        capital: "Belmopan",
        tld: ".bz",
        currency: "BZD",
        phone: "+51"
      },
      {
        continent: "Africa",
        iso2: "BJ",
        iso3: "BEN",
        name: "Benin",
        fullname: "The Republic of Benin",
        capital: "Porto-novo",
        tld: ".bj",
        currency: "XOF",
        phone: "+229"
      },
      {
        continent: "North America",
        iso2: "BM",
        iso3: "BMU",
        name: "Bermuda",
        fullname: "Bermuda",
        capital: "Hamilton",
        tld: ".bm",
        currency: "BMD",
        phone: "+1441"
      },
      {
        continent: "Asia",
        iso2: "BT",
        iso3: "BTN",
        name: "Bhutan",
        fullname: "The Kingdom of Bhutan",
        capital: "Thimphu",
        tld: ".bt",
        currency: "BTN",
        phone: "+975"
      },
      {
        continent: "South America",
        iso2: "BO",
        iso3: "BOL",
        name: "Bolivia",
        fullname: "The Plurinational State of Bolivia",
        capital: "La Paz",
        tld: ".bo",
        currency: "BOB",
        phone: "+591"
      },
      {
        continent: "Europe",
        iso2: "BA",
        iso3: "BIH",
        name: "Bosnia And Herzegovina",
        fullname: "Bosnia and Herzegovina",
        capital: "Sarajevo",
        tld: ".ba",
        currency: "BAM",
        phone: "+387"
      },
      {
        continent: "Africa",
        iso2: "BW",
        iso3: "BWA",
        name: "Botswana",
        fullname: "The Republic of Botswana",
        capital: "Gaborone",
        tld: ".bw",
        currency: "BWP",
        phone: "+267"
      },
      {
        continent: "South America",
        iso2: "BR",
        iso3: "BRA",
        name: "Brazil",
        fullname: "The Federative Republic of Brazil",
        capital: "Brasilia",
        tld: ".br",
        currency: "BRL",
        phone: "+55"
      },
      {
        continent: "Asia",
        iso2: "BN",
        iso3: "BRN",
        name: "Brunei Darussalam",
        fullname: "Brunei Darussalam",
        capital: "Bandar Seri Begawan",
        tld: ".bn",
        currency: "BND",
        phone: "+673"
      },
      {
        continent: "Europe",
        iso2: "BG",
        iso3: "BGR",
        name: "Bulgaria",
        fullname: "The Republic of Bulgaria",
        capital: "Sofia",
        tld: ".bg",
        currency: "BGN",
        phone: "+359"
      },
      {
        continent: "Africa",
        iso2: "BF",
        iso3: "BFA",
        name: "Burkina Faso",
        fullname: "Burkina Faso",
        capital: "Ouagadougou",
        tld: ".bf",
        currency: "XOF",
        phone: "+226"
      },
      {
        continent: "Africa",
        iso2: "BI",
        iso3: "BDI",
        name: "Burundi",
        fullname: "The Republic of Burundi",
        capital: "Bujumbura",
        tld: ".bi",
        currency: "BIF",
        phone: "+257"
      },
      {
        continent: "Asia",
        iso2: "KH",
        iso3: "KHM",
        name: "Cambodia",
        fullname: "The Kingdom of Cambodia",
        capital: "Phnom Penh",
        tld: ".kh",
        currency: "KHR",
        phone: "+855"
      },
      {
        continent: "Africa",
        iso2: "CM",
        iso3: "CMR",
        name: "Cameroon",
        fullname: "The Republic of Cameroon",
        capital: "Yaounde",
        tld: ".cm",
        currency: "XAF",
        phone: "+237"
      },
      {
        continent: "North America",
        iso2: "CA",
        iso3: "CAN",
        name: "Canada",
        fullname: "Canada",
        capital: "Ottawa",
        tld: ".ca",
        currency: "CAD",
        phone: "+1"
      },
      {
        continent: "Africa",
        iso2: "CV",
        iso3: "CPV",
        name: "Cape Verde",
        fullname: "Republic of Cabo Verde",
        capital: "Praia",
        tld: ".cv",
        currency: "CVE",
        phone: "+238"
      },
      {
        continent: "North America",
        iso2: "KY",
        iso3: "CYM",
        name: "Cayman Islands",
        fullname: "Cayman Islands",
        capital: "George Town",
        tld: ".ky",
        currency: "KYD",
        phone: "+1345"
      },
      {
        continent: "Africa",
        iso2: "CF",
        iso3: "CAF",
        name: "Central African Republic",
        fullname: "The Central African Republic",
        capital: "Bangui",
        tld: ".cf",
        currency: "XAF",
        phone: "+236"
      },
      {
        continent: "Africa",
        iso2: "TD",
        iso3: "TCD",
        name: "Chad",
        fullname: "The Republic of Chad",
        capital: "n'Djamena",
        tld: ".td",
        currency: "XAF",
        phone: "+235"
      },
      {
        continent: "South America",
        iso2: "CL",
        iso3: "CHL",
        name: "Chile",
        fullname: "The Republic of Chile",
        capital: "Santiago",
        tld: ".cl",
        currency: "CLP",
        phone: "+56"
      },
      {
        continent: "Asia",
        iso2: "CN",
        iso3: "CHN",
        name: "China",
        fullname: "The People's Republic of China",
        capital: "Beijing",
        tld: ".cn",
        currency: "CNY",
        phone: "+86"
      },
      {
        continent: "South America",
        iso2: "CO",
        iso3: "COL",
        name: "Colombia",
        fullname: "The Republic of Colombia",
        capital: "Bogotá",
        tld: ".co",
        currency: "COP",
        phone: "+57"
      },
      {
        continent: "Africa",
        iso2: "KM",
        iso3: "COM",
        name: "Comoros",
        fullname: "The Union of the Comoros",
        capital: "Moroni",
        tld: ".km",
        currency: "KMF",
        phone: "+269"
      },
      {
        continent: "Africa",
        iso2: "CG",
        iso3: "COG",
        name: "Congo",
        fullname: "The Republic of the Congo",
        capital: "Brazzaville",
        tld: ".cg",
        currency: "XAF",
        phone: "+242"
      },
      {
        continent: "Oceania",
        iso2: "CK",
        iso3: "COK",
        name: "Cook Islands",
        fullname: "The Cook Islands",
        capital: "Avarua",
        tld: ".ck",
        currency: "NZD",
        phone: "+682"
      },
      {
        continent: "North America",
        iso2: "CR",
        iso3: "CRI",
        name: "Costa Rica",
        fullname: "The Republic of Costa Rica",
        capital: "San Jose",
        tld: ".cr",
        currency: "CRC",
        phone: "+56"
      },
      {
        continent: "Africa",
        iso2: "CI",
        iso3: "CIV",
        name: "Côte D'ivoire",
        fullname: "The Republic of Côte d'Ivoire",
        capital: "Yamoussoukro",
        tld: ".ci",
        currency: "XOF",
        phone: "+225"
      },
      {
        continent: "Europe",
        iso2: "HR",
        iso3: "HRV",
        name: "Croatia",
        fullname: "The Republic of Croatia",
        capital: "Zagreb",
        tld: ".hr",
        currency: "HRK",
        phone: "+385"
      },
      {
        continent: "North America",
        iso2: "CU",
        iso3: "CUB",
        name: "Cuba",
        fullname: "The Republic of Cuba",
        capital: "Havana",
        tld: ".cu",
        currency: "CUP",
        phone: "+53"
      },
      {
        continent: "Asia",
        iso2: "CY",
        iso3: "CYP",
        name: "Cyprus",
        fullname: "The Republic of Cyprus",
        capital: "Nicosia",
        tld: ".cy",
        currency: "CYP",
        phone: "+357"
      },
      {
        continent: "Europe",
        iso2: "CZ",
        iso3: "CZE",
        name: "Czech Republic",
        fullname: "The Czech Republic",
        capital: "Prague",
        tld: ".cz",
        currency: "CZK",
        phone: "+420"
      },
      {
        continent: "Europe",
        iso2: "DK",
        iso3: "DNK",
        name: "Denmark",
        fullname: "The Kingdom of Denmark",
        capital: "Copenhagen",
        tld: ".dk",
        currency: "DKK",
        phone: "+45"
      },
      {
        continent: "Africa",
        iso2: "DJ",
        iso3: "DJI",
        name: "Djibouti",
        fullname: "The Republic of Djibouti",
        capital: "Djibouti",
        tld: "dj",
        currency: "DJF",
        phone: "+253"
      },
      {
        continent: "North America",
        iso2: "DM",
        iso3: "DMA",
        name: "Dominica",
        fullname: "The Commonwealth of Dominica",
        capital: "Roseau",
        tld: ".dm",
        currency: "XCD",
        phone: "+1767"
      },
      {
        continent: "South America",
        iso2: "DO",
        iso3: "DOM",
        name: "Dominican Republic",
        fullname: "The Dominican Republic",
        capital: "Santo Domingo",
        tld: ".do",
        currency: "DOP",
        phone: "+1809"
      },
      {
        continent: "Africa",
        iso2: "CD",
        iso3: "COD",
        name: "DR Congo",
        fullname: "The Democratic Republic of the Congo",
        capital: "Kinshasa",
        tld: ".cd",
        currency: "CDF",
        phone: "+243"
      },
      {
        continent: "Oceania",
        iso2: "TL",
        iso3: "TLS",
        name: "East Timor",
        fullname: "The Democratic Republic of Timor-Leste",
        capital: "Dilli",
        tld: ".tl",
        currency: "IDR",
        phone: "+670"
      },
      {
        continent: "South America",
        iso2: "EC",
        iso3: "ECU",
        name: "Ecuador",
        fullname: "The Republic of Ecuador",
        capital: "Quito",
        tld: ".ec",
        currency: "USD",
        phone: "+593"
      },
      {
        continent: "Africa",
        iso2: "EG",
        iso3: "EGY",
        name: "Egypt",
        fullname: "The Arab Republic of Egypt",
        capital: "Cairo",
        tld: ".eg",
        currency: "EGP",
        phone: "+20"
      },
      {
        continent: "North America",
        iso2: "SV",
        iso3: "SLV",
        name: "El Salvador",
        fullname: "The Republic of el Salvador",
        capital: "San Salvador",
        tld: ".sv",
        currency: "SVC",
        phone: "+53"
      },
      {
        continent: "Africa",
        iso2: "GQ",
        iso3: "GNQ",
        name: "Equatorial Guinea",
        fullname: "The Republic of Equatorial Guinea",
        capital: "Malabo",
        tld: ".gq",
        currency: "XAF",
        phone: "+240"
      },
      {
        continent: "Africa",
        iso2: "ER",
        iso3: "ERI",
        name: "Eritrea",
        fullname: "The State of Eritrea",
        capital: "Asmara",
        tld: ".er",
        currency: "ERN",
        phone: "+291"
      },
      {
        continent: "Europe",
        iso2: "EE",
        iso3: "EST",
        name: "Estonia",
        fullname: "The Republic of Estonia",
        capital: "Tallinn",
        tld: ".ee",
        currency: "EEK",
        phone: "+372"
      },
      {
        continent: "Africa",
        iso2: "ET",
        iso3: "ETH",
        name: "Ethiopia",
        fullname: "The Federal Democratic Republic of Ethiopia",
        capital: "Addis Ababa",
        tld: ".et",
        currency: "ETB",
        phone: "+251"
      },
      {
        continent: "Europe",
        iso2: "FO",
        iso3: "FRO",
        name: "Faroe Islands",
        fullname: "Faroe Islands",
        capital: "Palikir",
        tld: ".fo",
        currency: "DKK",
        phone: "+298"
      },
      {
        continent: "Oceania",
        iso2: "FJ",
        iso3: "FJI",
        name: "Fiji",
        fullname: "The Republic of Fiji",
        capital: "Suva",
        tld: ".fj",
        currency: "FJD",
        phone: "+679"
      },
      {
        continent: "Europe",
        iso2: "FI",
        iso3: "FIN",
        name: "Finland",
        fullname: "The Republic of Finland",
        capital: "Helsinki",
        tld: ".fi",
        currency: "EUR",
        phone: "+358"
      },
      {
        continent: "Europe",
        iso2: "FR",
        iso3: "FRA",
        name: "France",
        fullname: "The French Republic",
        capital: "Paris",
        tld: ".fr",
        currency: "EUR",
        phone: "+33"
      },
      {
        continent: "South America",
        iso2: "GF",
        iso3: "GUF",
        name: "French Guyana",
        fullname: "French Guyana",
        capital: "Cayenne",
        tld: ".gf",
        currency: "EUR",
        phone: "+594"
      },
      {
        continent: "Oceania",
        iso2: "PF",
        iso3: "PYF",
        name: "French Polynesia",
        fullname: "French Polynesia",
        capital: "Papeete",
        tld: ".pf",
        currency: "XPF",
        phone: "+689"
      },
      {
        continent: "Africa",
        iso2: "GA",
        iso3: "GAB",
        name: "Gabon",
        fullname: "The Gabonese Republic",
        capital: "Libreville",
        tld: ".ga",
        currency: "XAF",
        phone: "+241"
      },
      {
        continent: "Africa",
        iso2: "GM",
        iso3: "GMB",
        name: "Gambia",
        fullname: "The Republic of the Gambia",
        capital: "Banjul",
        tld: ".gm",
        currency: "GMD",
        phone: "+220"
      },
      {
        continent: "Europe",
        iso2: "GE",
        iso3: "GEO",
        name: "Georgia",
        fullname: "Georgia",
        capital: "Tbilisi",
        tld: ".ge",
        currency: "GEL",
        phone: "+995"
      },
      {
        continent: "Europe",
        iso2: "DE",
        iso3: "DEU",
        name: "Germany",
        fullname: "The Federal Republic of Germany",
        capital: "Berlin",
        tld: ".de",
        currency: "EUR",
        phone: "+49"
      },
      {
        continent: "Africa",
        iso2: "GH",
        iso3: "GHA",
        name: "Ghana",
        fullname: "The Republic of Ghana",
        capital: "Accra",
        tld: ".gh",
        currency: "GHC",
        phone: "+233"
      },
      {
        continent: "Africa",
        iso2: "GI",
        iso3: "GIB",
        name: "Gibraltar",
        fullname: "Gibraltar",
        capital: "Gibraltar",
        tld: ".gi",
        currency: "GIP",
        phone: "+350"
      },
      {
        continent: "Europe",
        iso2: "GR",
        iso3: "GRC",
        name: "Greece",
        fullname: "The Hellenic Republic",
        capital: "Athens",
        tld: ".gr",
        currency: "EUR",
        phone: "+30"
      },
      {
        continent: "North America",
        iso2: "GL",
        iso3: "GRL",
        name: "Greenland",
        fullname: "Greenland",
        capital: "Nuuk",
        tld: ".gl",
        currency: "DKK",
        phone: "+299"
      },
      {
        continent: "North America",
        iso2: "GD",
        iso3: "GRD",
        name: "Grenada",
        fullname: "Grenada",
        capital: "Saint George’s",
        tld: ".gd",
        currency: "XCD",
        phone: "+1473"
      },
      {
        continent: "North America",
        iso2: "GP",
        iso3: "GLP",
        name: "Guadeloupe",
        fullname: "Guadeloupe",
        capital: "Basse-Terre",
        tld: ".gp",
        currency: "EUR",
        phone: "+590"
      },
      {
        continent: "Asia",
        iso2: "GU",
        iso3: "GUM",
        name: "Guam",
        fullname: "Guam",
        capital: "Hagåtña",
        tld: ".gu",
        currency: "USD",
        phone: "+1671"
      },
      {
        continent: "North America",
        iso2: "GT",
        iso3: "GTM",
        name: "Guatemala",
        fullname: "The Republic of Guatemala",
        capital: "Guatemala City",
        tld: ".gt",
        currency: "GTQ",
        phone: "+52"
      },
      {
        continent: "Europe",
        iso2: "GG",
        iso3: "GGY",
        name: "Guernsey",
        fullname: "Guernsey",
        capital: "St. Peter Port",
        tld: ".gg",
        currency: "GGP",
        phone: "+44"
      },
      {
        continent: "Africa",
        iso2: "GN",
        iso3: "GIN",
        name: "Guinea",
        fullname: "The Republic of Guinea",
        capital: "Conakry",
        tld: ".gn",
        currency: "GNF",
        phone: "+224"
      },
      {
        continent: "Africa",
        iso2: "GW",
        iso3: "GNB",
        name: "Guinea-bissau",
        fullname: "The Republic of Guinea-bissau",
        capital: "Bissau",
        tld: ".gw",
        currency: "XOF",
        phone: "+245"
      },
      {
        continent: "South America",
        iso2: "GY",
        iso3: "GUY",
        name: "Guyana",
        fullname: "The Republic of Guyana",
        capital: "Georgetown",
        tld: ".gy",
        currency: "GYD",
        phone: "+592"
      },
      {
        continent: "North America",
        iso2: "HT",
        iso3: "HTI",
        name: "Haiti",
        fullname: "The Republic of Haiti",
        capital: "Port-au-prince",
        tld: ".ht",
        currency: "USD",
        phone: "+59"
      },
      {
        continent: "North America",
        iso2: "HN",
        iso3: "HND",
        name: "Honduras",
        fullname: "The Republic of Honduras",
        capital: "Tegucigalpa",
        tld: ".hn",
        currency: "HNL",
        phone: "+54"
      },
      {
        continent: "Asia",
        iso2: "HK",
        iso3: "HKG",
        name: "Hong Kong",
        fullname: "Hong Kong Special Administrative Region of the People's Republic of China",
        capital: "Hong Kong",
        tld: ".hk",
        currency: "HNL",
        phone: "+852"
      },
      {
        continent: "Europe",
        iso2: "HU",
        iso3: "HUN",
        name: "Hungary",
        fullname: "Hungary",
        capital: "Budapest",
        tld: ".hu",
        currency: "HUF",
        phone: "+36"
      },
      {
        continent: "Europe",
        iso2: "IS",
        iso3: "ISL",
        name: "Iceland",
        fullname: "The Republic of Iceland",
        capital: "Reykjavik",
        tld: ".is",
        currency: "ISK",
        phone: "+354"
      },
      {
        continent: "Asia",
        iso2: "IN",
        iso3: "IND",
        name: "India",
        fullname: "The Republic of India",
        capital: "New Delhi",
        tld: ".in",
        currency: "INR",
        phone: "+91"
      },
      {
        continent: "Asia",
        iso2: "ID",
        iso3: "IDN",
        name: "Indonesia",
        fullname: "The Republic of Indonesia",
        capital: "Jakarta",
        tld: ".id",
        currency: "IDR",
        phone: "+62"
      },
      {
        continent: "Asia",
        iso2: "IR",
        iso3: "IRN",
        name: "Iran",
        fullname: "The Islamic Republic of Iran",
        capital: "Tehran",
        tld: ".ir",
        currency: "IRR",
        phone: "+98"
      },
      {
        continent: "Asia",
        iso2: "IQ",
        iso3: "IRQ",
        name: "Iraq",
        fullname: "The Republic of Iraq",
        capital: "Baghdad",
        tld: ".iq",
        currency: "IQD",
        phone: "+964"
      },
      {
        continent: "Europe",
        iso2: "IE",
        iso3: "IRL",
        name: "Ireland",
        fullname: "Ireland",
        capital: "Dublin",
        tld: ".ie",
        currency: "EUR",
        phone: "+353"
      },
      {
        continent: "Europe",
        iso2: "IM",
        iso3: "IMN",
        name: "Isle Of Man",
        fullname: "Isle Of Man",
        capital: "Douglas",
        tld: ".im",
        currency: "IMP",
        phone: "+44"
      },
      {
        continent: "Asia",
        iso2: "IL",
        iso3: "ISR",
        name: "Israel",
        fullname: "The State of Israel",
        capital: "Tel Aviv",
        tld: ".il",
        currency: "ILS",
        phone: "+972"
      },
      {
        continent: "Europe",
        iso2: "IT",
        iso3: "ITA",
        name: "Italy",
        fullname: "The Republic of Italy",
        capital: "Rome",
        tld: ".it",
        currency: "EUR",
        phone: "+39"
      },
      {
        continent: "North America",
        iso2: "JM",
        iso3: "JAM",
        name: "Jamaica",
        fullname: "Jamaica",
        capital: "Kingston",
        tld: ".jm",
        currency: "JMD",
        phone: "+1876"
      },
      {
        continent: "Asia",
        iso2: "JP",
        iso3: "JPN",
        name: "Japan",
        fullname: "Japan",
        capital: "Tokyo",
        tld: ".jp",
        currency: "JPY",
        phone: "+81"
      },
      {
        continent: "Europe",
        iso2: "JE",
        iso3: "JEY",
        name: "Jersey",
        fullname: "Jersey",
        capital: "Saint Helier",
        tld: ".je",
        currency: "JEP",
        phone: "+44"
      },
      {
        continent: "Asia",
        iso2: "JO",
        iso3: "JOR",
        name: "Jordan",
        fullname: "The Hashemite Kingdom of Jordan",
        capital: "Amman",
        tld: ".jo",
        currency: "JOD",
        phone: "+962"
      },
      {
        continent: "Asia",
        iso2: "KZ",
        iso3: "KAZ",
        name: "Kazakhstan",
        fullname: "The Republic of Kazakhstan",
        capital: "Astana",
        tld: ".kz",
        currency: "KZT",
        phone: "+7"
      },
      {
        continent: "Africa",
        iso2: "KE",
        iso3: "KEN",
        name: "Kenya",
        fullname: "The Republic of Kenya",
        capital: "Nairobi",
        tld: ".ke",
        currency: "KES",
        phone: "+254"
      },
      {
        continent: "Oceania",
        iso2: "KI",
        iso3: "KIR",
        name: "Kiribati",
        fullname: "The Republic of Kiribati",
        capital: "Tarawa Atoll",
        tld: ".ki",
        currency: "AUD",
        phone: "+686"
      },
      {
        continent: "Asia",
        iso2: "KW",
        iso3: "KWT",
        name: "Kuwait",
        fullname: "The State of Kuwait",
        capital: "Kuwait City",
        tld: ".kw",
        currency: "KWD",
        phone: "+965"
      },
      {
        continent: "Asia",
        iso2: "KG",
        iso3: "KGZ",
        name: "Kyrgyzstan",
        fullname: "The Kyrgyz Republic",
        capital: "Bishkek",
        tld: ".kg",
        currency: "KGS",
        phone: "+996"
      },
      {
        continent: "Asia",
        iso2: "LA",
        iso3: "LAO",
        name: "Laos",
        fullname: "The Lao People's Democratic Republic",
        capital: "Vientiane",
        tld: ".la",
        currency: "LAK",
        phone: "+856"
      },
      {
        continent: "Europe",
        iso2: "LV",
        iso3: "LVA",
        name: "Latvia",
        fullname: "The Republic of Latvia",
        capital: "Riga",
        tld: ".lv",
        currency: "LVL",
        phone: "+371"
      },
      {
        continent: "Asia",
        iso2: "LB",
        iso3: "LBN",
        name: "Lebanon",
        fullname: "The Lebanese Republic",
        capital: "Beirut",
        tld: ".lb",
        currency: "LBP",
        phone: "+961"
      },
      {
        continent: "Africa",
        iso2: "LS",
        iso3: "LSO",
        name: "Lesotho",
        fullname: "The Kingdom of Lesotho",
        capital: "Maseru",
        tld: ".ls",
        currency: "LSL",
        phone: "+266"
      },
      {
        continent: "Africa",
        iso2: "LR",
        iso3: "LBR",
        name: "Liberia",
        fullname: "The Republic of Liberia",
        capital: "Monrovia",
        tld: ".lr",
        currency: "LRD",
        phone: "+231"
      },
      {
        continent: "Africa",
        iso2: "LY",
        iso3: "LBY",
        name: "Libya",
        fullname: "Libya",
        capital: "Tripoli",
        tld: ".ly",
        currency: "LYD",
        phone: "+218"
      },
      {
        continent: "Europe",
        iso2: "LI",
        iso3: "LIE",
        name: "Liechtenstein",
        fullname: "The Principality of Liechtenstein",
        capital: "Vaduz",
        tld: ".li",
        currency: "CHF",
        phone: "+423"
      },
      {
        continent: "Europe",
        iso2: "LT",
        iso3: "LTU",
        name: "Lithuania",
        fullname: "The Republic of Lithuania",
        capital: "Vilnius",
        tld: ".lt",
        currency: "LTL",
        phone: "+370"
      },
      {
        continent: "Europe",
        iso2: "LU",
        iso3: "LUX",
        name: "Luxembourg",
        fullname: "The Grand Duchy of Luxembourg",
        capital: "Luxembourg",
        tld: ".lu",
        currency: "EUR",
        phone: "+352"
      },
      {
        continent: "Asia",
        iso2: "MO",
        iso3: "MAC",
        name: "Macao",
        fullname: "Macao Special Administrative Region of the People's Republic of China",
        capital: "Macao",
        tld: ".mo",
        currency: "MOP",
        phone: "+853"
      },
      {
        continent: "Europe",
        iso2: "MK",
        iso3: "MKD",
        name: "Macedonia",
        fullname: "The Former Yugoslav Republic of Macedonia",
        capital: "Skopje",
        tld: ".mk",
        currency: "MKD",
        phone: "+389"
      },
      {
        continent: "Africa",
        iso2: "MG",
        iso3: "MDG",
        name: "Madagascar",
        fullname: "The Republic of Madagascar",
        capital: "Antananarivo",
        tld: ".mg",
        currency: "MGA",
        phone: "+261"
      },
      {
        continent: "Africa",
        iso2: "MW",
        iso3: "MWI",
        name: "Malawi",
        fullname: "The Republic of Malawi",
        capital: "Lilongwe",
        tld: ".mw",
        currency: "MWK",
        phone: "+265"
      },
      {
        continent: "Asia",
        iso2: "MY",
        iso3: "MYS",
        name: "Malaysia",
        fullname: "Malaysia",
        capital: "Kuala Lumpur",
        tld: ".my",
        currency: "MYR",
        phone: "+60"
      },
      {
        continent: "Asia",
        iso2: "MV",
        iso3: "MDV",
        name: "Maldives",
        fullname: "The Republic of Maldives",
        capital: "Male",
        tld: ".mv",
        currency: "MVR",
        phone: "+960"
      },
      {
        continent: "Africa",
        iso2: "ML",
        iso3: "MLI",
        name: "Mali",
        fullname: "The Republic of Mali",
        capital: "Bamako",
        tld: ".ml",
        currency: "XOF",
        phone: "+223"
      },
      {
        continent: "Europe",
        iso2: "MT",
        iso3: "MLT",
        name: "Malta",
        fullname: "The Republic of Malta",
        capital: "Valletta",
        tld: ".mt",
        currency: "EUR",
        phone: "+356"
      },
      {
        continent: "Oceania",
        iso2: "MH",
        iso3: "MHL",
        name: "Marshall Islands",
        fullname: "The Republic of the Marshall Islands",
        capital: "Majuro",
        tld: ".mh",
        currency: "USD",
        phone: "+692"
      },
      {
        continent: "North America",
        iso2: "MQ",
        iso3: "MTQ",
        name: "Martinique",
        fullname: "Martinique",
        capital: "Fort-de-France",
        tld: ".mq",
        currency: "EUR",
        phone: "+596"
      },
      {
        continent: "Africa",
        iso2: "MR",
        iso3: "MRT",
        name: "Mauritania",
        fullname: "The Islamic Republic of Mauritania",
        capital: "Nouakchott",
        tld: ".mr",
        currency: "MRO",
        phone: "+222"
      },
      {
        continent: "Africa",
        iso2: "MU",
        iso3: "MUS",
        name: "Mauritius",
        fullname: "The Republic of Mauritius",
        capital: "Port Louis",
        tld: ".mu",
        currency: "MUR",
        phone: "+230"
      },
      {
        continent: "Africa",
        iso2: "YT",
        iso3: "MYT",
        name: "Mayotte",
        fullname: "The Department of Mayotte",
        capital: "Mamoudzou",
        tld: ".yt",
        currency: "EUR",
        phone: "+269"
      },
      {
        continent: "North America",
        iso2: "MX",
        iso3: "MEX",
        name: "Mexico",
        fullname: "The United Mexican States",
        capital: "Mexico City",
        tld: ".mx",
        currency: "MXN",
        phone: "+52"
      },
      {
        continent: "Oceania",
        iso2: "FM",
        iso3: "FSM",
        name: "Micronesia",
        fullname: "The Federated States of Micronesia",
        capital: "Palikir",
        tld: ".fm",
        currency: "USD",
        phone: "+691"
      },
      {
        continent: "Europe",
        iso2: "MD",
        iso3: "MDA",
        name: "Moldova",
        fullname: "The Republic of Moldova",
        capital: "Chisinau",
        tld: ".md",
        currency: "MDL",
        phone: "+373"
      },
      {
        continent: "Europe",
        iso2: "MC",
        iso3: "MCO",
        name: "Monaco",
        fullname: "The Principality of Monaco",
        capital: "Monaco",
        tld: ".mc",
        currency: "EUR",
        phone: "+377"
      },
      {
        continent: "Asia",
        iso2: "MN",
        iso3: "MNG",
        name: "Mongolia",
        fullname: "Mongolia",
        capital: "Ulaanbaatar",
        tld: ".mn",
        currency: "MNT",
        phone: "+976"
      },
      {
        continent: "Europe",
        iso2: "ME",
        iso3: "MNE",
        name: "Montenegro",
        fullname: "Montenegro",
        capital: "Podgorica",
        tld: ".me",
        currency: "EUR",
        phone: "+382"
      },
      {
        continent: "North America",
        iso2: "MS",
        iso3: "MSR",
        name: "Montserrat",
        fullname: "Montserrat",
        capital: "Plymouth",
        tld: ".ms",
        currency: "XCD",
        phone: "+1664"
      },
      {
        continent: "Africa",
        iso2: "MA",
        iso3: "MAR",
        name: "Morocco",
        fullname: "The Kingdom of Morocco",
        capital: "Rabat",
        tld: ".ma",
        currency: "MAD",
        phone: "+211"
      },
      {
        continent: "Africa",
        iso2: "MZ",
        iso3: "MOZ",
        name: "Mozambique",
        fullname: "The Republic of Mozambique",
        capital: "Maputo",
        tld: ".mz",
        currency: "MZM",
        phone: "+258"
      },
      {
        continent: "Asia",
        iso2: "MM",
        iso3: "MMR",
        name: "Myanmar",
        fullname: "The Republic of the Union of Myanmar",
        capital: "Nypyidaw",
        tld: ".mm",
        currency: "MMK",
        phone: "+95"
      },
      {
        continent: "Africa",
        iso2: "NA",
        iso3: "NAM",
        name: "Namibia",
        fullname: "The Republic of Namibia",
        capital: "Windhoek",
        tld: ".na",
        currency: "ZAR",
        phone: "+264"
      },
      {
        continent: "Oceania",
        iso2: "NR",
        iso3: "NRU",
        name: "Nauru",
        fullname: "The Republic of Nauru",
        capital: "Yaren District",
        tld: ".nr",
        currency: "AUD",
        phone: "+674"
      },
      {
        continent: "Asia",
        iso2: "NP",
        iso3: "NPL",
        name: "Nepal",
        fullname: "The Federal Democratic Republic of Nepal",
        capital: "Kathmandu",
        tld: ".np",
        currency: "NPR",
        phone: "+977"
      },
      {
        continent: "Europe",
        iso2: "NL",
        iso3: "NLD",
        name: "Netherlands",
        fullname: "The Kingdom of the Netherlands",
        capital: "Amsterdam",
        tld: ".nl",
        currency: "EUR",
        phone: "+31"
      },
      {
        continent: "Oceania",
        iso2: "NZ",
        iso3: "NZL",
        name: "New Zealand",
        fullname: "New Zealand",
        capital: "Wellington",
        tld: ".nz",
        currency: "NZD",
        phone: "+64"
      },
      {
        continent: "North America",
        iso2: "NI",
        iso3: "NIC",
        name: "Nicaragua",
        fullname: "The Republic of Nicaragua",
        capital: "Managua",
        tld: ".ni",
        currency: "NIO",
        phone: "+55"
      },
      {
        continent: "Africa",
        iso2: "NE",
        iso3: "NER",
        name: "Niger",
        fullname: "The Republic of the Niger",
        capital: "Niamey",
        tld: ".ne",
        currency: "XOF",
        phone: "+227"
      },
      {
        continent: "Africa",
        iso2: "NG",
        iso3: "NGA",
        name: "Nigeria",
        fullname: "The Federal Republic of Nigeria",
        capital: "Abuja",
        tld: ".ng",
        currency: "NGN",
        phone: "+234"
      },
      {
        continent: "Asia",
        iso2: "KP",
        iso3: "PRK",
        name: "North Korea",
        fullname: "The Democratic People's Republic of Korea",
        capital: "Pyongyang",
        tld: ".kp",
        currency: "KPW",
        phone: "+850"
      },
      {
        continent: "Europe",
        iso2: "NO",
        iso3: "NOR",
        name: "Norway",
        fullname: "The Kingdom of Norway",
        capital: "Oslo",
        tld: ".no",
        currency: "NOK",
        phone: "+47"
      },
      {
        continent: "Asia",
        iso2: "OM",
        iso3: "OMN",
        name: "Oman",
        fullname: "The Sultanate of Oman",
        capital: "Muscat",
        tld: ".om",
        currency: "OMR",
        phone: "+968"
      },
      {
        continent: "Asia",
        iso2: "PK",
        iso3: "PAK",
        name: "Pakistan",
        fullname: "The Islamic Republic of Pakistan",
        capital: "Islamabad",
        tld: ".pk",
        currency: "PKR",
        phone: "+92"
      },
      {
        continent: "Oceania",
        iso2: "PW",
        iso3: "PLW",
        name: "Palau",
        fullname: "The Republic of Palau",
        capital: "Ngerulmud",
        tld: ".pw",
        currency: "USD",
        phone: "+680"
      },
      {
        continent: "Asia",
        iso2: "PS",
        iso3: "PSE",
        name: "Palestine",
        fullname: "The State of Palestine",
        capital: "Ramallah",
        tld: ".ps",
        currency: "",
        phone: "+970"
      },
      {
        continent: "South America",
        iso2: "PA",
        iso3: "PAN",
        name: "Panama",
        fullname: "The Republic of Panama",
        capital: "Panama City",
        tld: ".pa",
        currency: "USD",
        phone: "+57"
      },
      {
        continent: "Oceania",
        iso2: "PG",
        iso3: "PNG",
        name: "Papua New Guinea",
        fullname: "Independent State of Papua New Guinea",
        capital: "Port Moresby",
        tld: ".pg",
        currency: "PGK",
        phone: "+675"
      },
      {
        continent: "South America",
        iso2: "PY",
        iso3: "PRY",
        name: "Paraguay",
        fullname: "The Republic of Paraguay",
        capital: "Asunción",
        tld: ".py",
        currency: "PYG",
        phone: "+595"
      },
      {
        continent: "South America",
        iso2: "PE",
        iso3: "PER",
        name: "Peru",
        fullname: "The Republic of Peru",
        capital: "Lima",
        tld: ".pe",
        currency: "PEN",
        phone: "+51"
      },
      {
        continent: "Asia",
        iso2: "PH",
        iso3: "PHL",
        name: "Philippines",
        fullname: "The Republic of the Philippines",
        capital: "Manila",
        tld: ".ph",
        currency: "PHP",
        phone: "+63"
      },
      {
        continent: "Oceania",
        iso2: "PN",
        iso3: "PCN",
        name: "Pitcairn",
        fullname: "Pitcairn",
        capital: "Adamstown",
        tld: ".pn",
        currency: "NZD",
        phone: "+649"
      },
      {
        continent: "Europe",
        iso2: "PL",
        iso3: "POL",
        name: "Poland",
        fullname: "The Republic of Poland",
        capital: "Warsaw",
        tld: ".pl",
        currency: "PLN",
        phone: "+48"
      },
      {
        continent: "Europe",
        iso2: "PT",
        iso3: "PRT",
        name: "Portugal",
        fullname: "The Portuguese Republic",
        capital: "Lisbon",
        tld: ".pt",
        currency: "EUR",
        phone: "+351"
      },
      {
        continent: "North America",
        iso2: "PR",
        iso3: "PRI",
        name: "Puerto Rico",
        fullname: "The Commonwealth of Puerto Rico",
        capital: "San Juan",
        tld: ".pr",
        currency: "USD",
        phone: "+1939"
      },
      {
        continent: "Asia",
        iso2: "QA",
        iso3: "QAT",
        name: "Qatar",
        fullname: "The State of Qatar",
        capital: "Doha",
        tld: ".qa",
        currency: "QAR",
        phone: "+974"
      },
      {
        continent: "Africa",
        iso2: "RE",
        iso3: "REU",
        name: "Réunion",
        fullname: "Réunion",
        capital: "Saint-Denis",
        tld: ".re",
        currency: "EUR",
        phone: "+262"
      },
      {
        continent: "Europe",
        iso2: "RO",
        iso3: "ROU",
        name: "Romania",
        fullname: "Romania",
        capital: "Bucharest",
        tld: ".ro",
        currency: "RON",
        phone: "+40"
      },
      {
        continent: "Asia",
        iso2: "RU",
        iso3: "RUS",
        name: "Russia",
        fullname: "The Russian Federation",
        capital: "Moscow",
        tld: ".ru",
        currency: "RUB",
        phone: "+7"
      },
      {
        continent: "Africa",
        iso2: "RW",
        iso3: "RWA",
        name: "Rwanda",
        fullname: "The Republic of Rwanda",
        capital: "Kigali",
        tld: ".rw",
        currency: "RWF",
        phone: "+250"
      },
      {
        continent: "Africa",
        iso2: "SH",
        iso3: "SHN",
        name: "Saint Helena",
        fullname: "Saint Helena",
        capital: "Jamestown",
        tld: ".sh",
        currency: "SHP",
        phone: "+290"
      },
      {
        continent: "North America",
        iso2: "KN",
        iso3: "KNA",
        name: "Saint Kitts And Nevis",
        fullname: "Saint Kitts and Nevis",
        capital: "Basseterre",
        tld: ".kn",
        currency: "XCD",
        phone: "+1869"
      },
      {
        continent: "South America",
        iso2: "LC",
        iso3: "LCA",
        name: "Saint Lucia",
        fullname: "Saint Lucia",
        capital: "Castries",
        tld: ".lc",
        currency: "XCD",
        phone: "+1758"
      },
      {
        continent: "North America",
        iso2: "PM",
        iso3: "SPM",
        name: "Saint Pierre And Miquelon",
        fullname: "Saint Pierre And Miquelon",
        capital: "Saint-Pierre",
        tld: ".pm",
        currency: "EUR",
        phone: "+508"
      },
      {
        continent: "South America",
        iso2: "VC",
        iso3: "VCT",
        name: "Saint Vincent And The Grenadines",
        fullname: "Saint Vincent and the Grenadines",
        capital: "Kingstown",
        tld: ".vc",
        currency: "XCD",
        phone: "+1784"
      },
      {
        continent: "Oceania",
        iso2: "WS",
        iso3: "WSM",
        name: "Samoa",
        fullname: "The Independent State of Samoa",
        capital: "Apia",
        tld: ".ws",
        currency: "WST",
        phone: "+685"
      },
      {
        continent: "Europe",
        iso2: "SM",
        iso3: "SMR",
        name: "San Marino",
        fullname: "The Republic of San Marino",
        capital: "San Marino",
        tld: ".sm",
        currency: "EUR",
        phone: "+378"
      },
      {
        continent: "Africa",
        iso2: "ST",
        iso3: "STP",
        name: "São Tomé and Príncipe",
        fullname: "The Democratic Republic of São Tomé and Príncipe",
        capital: "São Tomé",
        tld: ".st",
        currency: "STD",
        phone: "+239"
      },
      {
        continent: "Asia",
        iso2: "SA",
        iso3: "SAU",
        name: "Saudi Arabia",
        fullname: "The Kingdom of Saudi Arabia",
        capital: "Riyadh",
        tld: ".sa",
        currency: "SAR",
        phone: "+966"
      },
      {
        continent: "Africa",
        iso2: "SN",
        iso3: "SEN",
        name: "Senegal",
        fullname: "The Republic of Senegal",
        capital: "Dakar",
        tld: ".sn",
        currency: "XOF",
        phone: "+221"
      },
      {
        continent: "Europe",
        iso2: "RS",
        iso3: "SRB",
        name: "Serbia",
        fullname: "The Republic of Serbia",
        capital: "Belgrade",
        tld: ".cs",
        currency: "EUR",
        phone: "+381"
      },
      {
        continent: "Africa",
        iso2: "SC",
        iso3: "SYC",
        name: "Seychelles",
        fullname: "The Republic of Seychelles",
        capital: "Victoria",
        tld: ".sc",
        currency: "SCR",
        phone: "+248"
      },
      {
        continent: "Africa",
        iso2: "SL",
        iso3: "SLE",
        name: "Sierra Leone",
        fullname: "The Republic of Sierra Leone",
        capital: "Freetown",
        tld: ".sl",
        currency: "SLL",
        phone: "+232"
      },
      {
        continent: "Asia",
        iso2: "SG",
        iso3: "SGP",
        name: "Singapore",
        fullname: "The Republic of Singapore",
        capital: "Singapore",
        tld: ".sg",
        currency: "SGD",
        phone: "+65"
      },
      {
        continent: "Europe",
        iso2: "SK",
        iso3: "SVK",
        name: "Slovakia",
        fullname: "The Slovak Republic",
        capital: "Bratislava",
        tld: ".sk",
        currency: "SKK",
        phone: "+421"
      },
      {
        continent: "Europe",
        iso2: "SI",
        iso3: "SVN",
        name: "Slovenia",
        fullname: "The Republic of Slovenia",
        capital: "Ljubljana",
        tld: ".si",
        currency: "SIT",
        phone: "+386"
      },
      {
        continent: "Oceania",
        iso2: "SB",
        iso3: "SLB",
        name: "Solomon Islands",
        fullname: "Solomon Islands",
        capital: "Honiara",
        tld: ".sb",
        currency: "SBD",
        phone: "+677"
      },
      {
        continent: "Africa",
        iso2: "SO",
        iso3: "SOM",
        name: "Somalia",
        fullname: "The Federal Republic of Somalia",
        capital: "Mogadishu",
        tld: ".so",
        currency: "SOS",
        phone: "+252"
      },
      {
        continent: "Africa",
        iso2: "ZA",
        iso3: "ZAF",
        name: "South Africa",
        fullname: "The Republic of South Africa",
        capital: "Pretoria",
        tld: ".za",
        currency: "ZAR",
        phone: "+27"
      },
      {
        continent: "Asia",
        iso2: "KR",
        iso3: "KOR",
        name: "South Korea",
        fullname: "The Republic of Korea",
        capital: "Seoul",
        tld: ".kr",
        currency: "KRW",
        phone: "+82"
      },
      {
        continent: "Africa",
        iso2: "SS",
        iso3: "SSD",
        name: "South Sudan",
        fullname: "The Republic of South Sudan",
        capital: "Juba",
        tld: ".ss",
        currency: "SSP",
        phone: "+221"
      },
      {
        continent: "Europe",
        iso2: "ES",
        iso3: "ESP",
        name: "Spain",
        fullname: "The Kingdom of Spain",
        capital: "Madrid",
        tld: ".es",
        currency: "EUR",
        phone: "+34"
      },
      {
        continent: "Asia",
        iso2: "LK",
        iso3: "LKA",
        name: "Sri Lanka",
        fullname: "The Democratic Socialist Republic of Sri Lanka",
        capital: "Colombo",
        tld: ".lk",
        currency: "LKR",
        phone: "+94"
      },
      {
        continent: "Africa",
        iso2: "SD",
        iso3: "SDN",
        name: "Sudan",
        fullname: "The Republic of the Sudan",
        capital: "Khartoum",
        tld: ".sd",
        currency: "SDD",
        phone: "+249"
      },
      {
        continent: "South America",
        iso2: "SR",
        iso3: "SUR",
        name: "Suriname",
        fullname: "The Republic of Suriname",
        capital: "Paramaribo",
        tld: ".sr",
        currency: "SRD",
        phone: "+597"
      },
      {
        continent: "Africa",
        iso2: "SZ",
        iso3: "SWZ",
        name: "Swaziland",
        fullname: "The Kingdom of Swaziland",
        capital: "Mbabane",
        tld: ".sz",
        currency: "SZL",
        phone: "+268"
      },
      {
        continent: "Europe",
        iso2: "SE",
        iso3: "SWE",
        name: "Sweden",
        fullname: "The Kingdom of Sweden",
        capital: "Stockholm",
        tld: ".se",
        currency: "SEK",
        phone: "+46"
      },
      {
        continent: "Europe",
        iso2: "CH",
        iso3: "CHE",
        name: "Switzerland",
        fullname: "The Swiss Confederation",
        capital: "Bern",
        tld: ".ch",
        currency: "CHF",
        phone: "+41"
      },
      {
        continent: "Asia",
        iso2: "SY",
        iso3: "SYR",
        name: "Syria",
        fullname: "The Syrian Arab Republic",
        capital: "Damascus",
        tld: ".sy",
        currency: "SYP",
        phone: "+963"
      },
      {
        continent: "Asia",
        iso2: "TW",
        iso3: "TWN",
        name: "Taiwan",
        fullname: "Taiwan",
        capital: "Taipei",
        tld: ".tw",
        currency: "TWD",
        phone: "+886"
      },
      {
        continent: "Asia",
        iso2: "TJ",
        iso3: "TJK",
        name: "Tajikistan",
        fullname: "The Republic of Tajikistan",
        capital: "Dushanbe",
        tld: ".tj",
        currency: "RUB",
        phone: "+992"
      },
      {
        continent: "Africa",
        iso2: "TZ",
        iso3: "TZA",
        name: "Tanzania",
        fullname: "The United Republic of Tanzania",
        capital: "Dar es Salaam",
        tld: ".tz",
        currency: "TZS",
        phone: "+255"
      },
      {
        continent: "Asia",
        iso2: "TH",
        iso3: "THA",
        name: "Thailand",
        fullname: "The Kingdom of Thailand",
        capital: "Bangkok",
        tld: ".th",
        currency: "THB",
        phone: "+66"
      },
      {
        continent: "Africa",
        iso2: "TG",
        iso3: "TGO",
        name: "Togo",
        fullname: "The Togolese Republic",
        capital: "Lomé",
        tld: ".tg",
        currency: "XOF",
        phone: "+228"
      },
      {
        continent: "Oceania",
        iso2: "TO",
        iso3: "TON",
        name: "Tonga",
        fullname: "The Kingdom of Tonga",
        capital: "Nukuʻalofa",
        tld: ".to",
        currency: "TOP",
        phone: "+676"
      },
      {
        continent: "South America",
        iso2: "TT",
        iso3: "TTO",
        name: "Trinidad And Tobago",
        fullname: "The Republic of Trinidad and Tobago",
        capital: "Port of Spain",
        tld: ".tt",
        currency: "TTD",
        phone: "+1868"
      },
      {
        continent: "Africa",
        iso2: "TN",
        iso3: "TUN",
        name: "Tunisia",
        fullname: "The Republic of Tunisia",
        capital: "Tunis",
        tld: ".tn",
        currency: "TND",
        phone: "+216"
      },
      {
        continent: "Asia",
        iso2: "TR",
        iso3: "TUR",
        name: "Turkey",
        fullname: "The Republic of Turkey",
        capital: "Ankara",
        tld: ".tr",
        currency: "TRY",
        phone: "+90"
      },
      {
        continent: "Asia",
        iso2: "TM",
        iso3: "TKM",
        name: "Turkmenistan",
        fullname: "Turkmenistan",
        capital: "Ashgabat",
        tld: ".tm",
        currency: "TMM",
        phone: "+993"
      },
      {
        continent: "Oceania",
        iso2: "TV",
        iso3: "TUV",
        name: "Tuvalu",
        fullname: "Tuvalu",
        capital: "Funafuti",
        tld: ".tv",
        currency: "TVD",
        phone: "+688"
      },
      {
        continent: "Africa",
        iso2: "UG",
        iso3: "UGA",
        name: "Uganda",
        fullname: "The Republic of Uganda",
        capital: "Kampala",
        tld: ".ug",
        currency: "UGX",
        phone: "+256"
      },
      {
        continent: "Europe",
        iso2: "UA",
        iso3: "UKR",
        name: "Ukraine",
        fullname: "Ukraine",
        capital: "Kiev",
        tld: ".ua",
        currency: "UAH",
        phone: "+380"
      },
      {
        continent: "Asia",
        iso2: "AE",
        iso3: "UAE",
        name: "United Arab Emirates",
        fullname: "The United Arab Emirates",
        capital: "Abu Dhabi",
        tld: ".ae",
        currency: "AED",
        phone: "+971"
      },
      {
        continent: "Europe",
        iso2: "GB",
        iso3: "GBR",
        name: "United Kingdom",
        fullname: "The United Kingdom of Great Britain and Northern Ireland",
        capital: "London",
        tld: ".gb",
        currency: "GBP",
        phone: "+44"
      },
      {
        continent: "North America",
        iso2: "US",
        iso3: "USA",
        name: "United States",
        fullname: "The United States of America",
        capital: "Washington, D.C.",
        tld: ".us",
        currency: "USD",
        phone: "+1"
      },
      {
        continent: "South America",
        iso2: "UY",
        iso3: "URY",
        name: "Uruguay",
        fullname: "The Eastern Republic of Uruguay",
        capital: "Montevideo",
        tld: ".uy",
        currency: "UYU",
        phone: "+598"
      },
      {
        continent: "Asia",
        iso2: "UZ",
        iso3: "UZB",
        name: "Uzbekistan",
        fullname: "The Republic of Uzbekistan",
        capital: "Tashkent",
        tld: ".uz",
        currency: "UZS",
        phone: "+998"
      },
      {
        continent: "Oceania",
        iso2: "VU",
        iso3: "VUT",
        name: "Vanuatu",
        fullname: "The Republic of Vanuatu",
        capital: "Port Vila",
        tld: ".vu",
        currency: "VUV",
        phone: "+678"
      },
      {
        continent: "South America",
        iso2: "VE",
        iso3: "VEN",
        name: "Venezuela",
        fullname: "The Bolivarian Republic of Venezuela",
        capital: "Caracas",
        tld: ".ve",
        currency: "VEB",
        phone: "+58"
      },
      {
        continent: "Asia",
        iso2: "VN",
        iso3: "VNM",
        name: "Vietnam",
        fullname: "The Socialist Republic of Viet Nam",
        capital: "Hanoi",
        tld: ".vn",
        currency: "VND",
        phone: "+84"
      },
      {
        continent: "North America",
        iso2: "VG",
        iso3: "VGB",
        name: "Virgin Islands, British",
        fullname: "British Virgin Islands",
        capital: "Road Town",
        tld: ".vg",
        currency: "USD",
        phone: "+1284"
      },
      {
        continent: "South America",
        iso2: "VI",
        iso3: "VIR",
        name: "Virgin Islands, US",
        fullname: "U.S. Virgin Islands",
        capital: "Charlotte Amalie",
        tld: ".vi",
        currency: "USD",
        phone: "+1340"
      },
      {
        continent: "Africa",
        iso2: "EH",
        iso3: "ESH",
        name: "Western Sahara",
        fullname: "Western Sahara",
        capital: "El-Aaiún",
        tld: ".eh",
        currency: "MAD",
        phone: "+212"
      },
      {
        continent: "Asia",
        iso2: "YE",
        iso3: "YEM",
        name: "Yemen",
        fullname: "The Republic of Yemen",
        capital: "Sana’a",
        tld: ".ye",
        currency: "YER",
        phone: "+967"
      },
      {
        continent: "Africa",
        iso2: "ZM",
        iso3: "ZMB",
        name: "Zambia",
        fullname: "The Republic of Zambia",
        capital: "Lusaka",
        tld: ".zm",
        currency: "ZMK",
        phone: "+260"
      },
      {
        continent: "Africa",
        iso2: "ZW",
        iso3: "ZWE",
        name: "Zimbabwe",
        fullname: "The Republic of Zimbabwe",
        capital: "Harare",
        tld: ".zw",
        currency: "ZWD",
        phone: "+263"
      }
    ]
  };

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

  class UIAppConfig {
  }

  var UIInternal;
  (function (UIInternal) {
      UIInternal.EVT_VIEWPORT_CLICK = "EVT_VIEWPORT_CLICK";
      UIInternal.EVT_VIEWPORT_RESIZE = "EVT_VIEWPORT_RESIZE";
      function queueTask(task) {
          aureliaFramework.Container.instance.get(aureliaFramework.TaskQueue).queueTask(task);
      }
      UIInternal.queueTask = queueTask;
      function queueMicroTask(task) {
          aureliaFramework.Container.instance.get(aureliaFramework.TaskQueue).queueMicroTask(task);
      }
      UIInternal.queueMicroTask = queueMicroTask;
      function broadcast(name, data) {
          aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).publish(name, data);
      }
      UIInternal.broadcast = broadcast;
      function subscribe(name, callback) {
          return aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).subscribe(name, callback);
      }
      UIInternal.subscribe = subscribe;
      function subscribeOnce(name, callback) {
          return aureliaFramework.Container.instance.get(aureliaEventAggregator.EventAggregator).subscribeOnce(name, callback);
      }
      UIInternal.subscribeOnce = subscribeOnce;
      function observe(data, property, callback) {
          return aureliaFramework.Container.instance
              .get(aureliaFramework.BindingEngine)
              .observe(data, property)
              .subscribe(callback);
      }
      UIInternal.observe = observe;
      function createEvent(name, data) {
          return aureliaFramework.DOM.createCustomEvent(name, {
              bubbles: true,
              cancelable: true,
              detail: data
          });
      }
      UIInternal.createEvent = createEvent;
      function fireCallbackEvent(vm, event, data) {
          const ret = isFunction(vm[event])
              ? vm[event](data)
              : vm.element.dispatchEvent(UIInternal.createEvent(event, data));
          if (ret instanceof Promise) {
              return ret;
          }
          else {
              return Promise.resolve(ret !== false);
          }
      }
      UIInternal.fireCallbackEvent = fireCallbackEvent;
      function invokeLifecycle(instance, name, model) {
          if (instance && typeof instance[name] === "function") {
              const result = instance[name](model);
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
      UIInternal.invokeLifecycle = invokeLifecycle;
      function compileTemplate(tpl, viewModel = {}, bindingContext = {}) {
          const viewFactory = aureliaFramework.Container.instance
              .get(aureliaFramework.ViewCompiler)
              .compile(tpl, aureliaFramework.Container.instance.get(aureliaFramework.ViewResources));
          const view = viewFactory.create(aureliaFramework.Container.instance);
          view.bind(viewModel, bindingContext);
          return view;
      }
      UIInternal.compileTemplate = compileTemplate;
  })(UIInternal || (UIInternal = {}));

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __decorate(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
      else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
  }

  function __metadata(metadataKey, metadataValue) {
      if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }

  function __awaiter(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  exports.UIHttpService = class UIHttpService {
      constructor(httpClient, appConfig) {
          this.httpClient = httpClient;
          this.appConfig = appConfig;
          this.logger = aureliaLogging.getLogger("UIHttpService");
          this.logger.info("Initialized");
          httpClient.configure(config => {
              config.withBaseUrl(appConfig.ApiBaseUrl).withInterceptor({
                  request(request) {
                      this.logger.info(`Requesting ${request.method} ${request.url}`);
                      return request;
                  },
                  response(response) {
                      this.logger.info(`Response ${response.status} ${response.url}`);
                      if (response instanceof TypeError) {
                          return Promise.reject({
                              errorCode: "500",
                              message: response.message || "Network Error!!"
                          });
                      }
                      if (response.status === 401 && response.url.includes(this.httpClient.baseUrl)) {
                          UIInternal.broadcast("auf:unauthorized", null);
                      }
                      else if (response.status >= 400) {
                          return response.text().then(resp => {
                              let body = {};
                              try {
                                  body = JSON.parse(resp);
                              }
                              catch (e) {
                                  this.logger.debug(e.stack);
                              }
                              const errorCode = body.errorCode || body.error || "500";
                              const message = body.message || body.error || "Network Error!!";
                              return Promise.reject({ errorCode, message });
                          });
                      }
                      return response;
                  }
              });
          });
      }
      setBaseUrl(url) {
          this.httpClient.baseUrl = url;
      }
      json(slug, query = null, headers = true) {
          this.logger.info(`get [${slug}]`);
          return this.httpClient
              .fetch(slug + this.buildQueryString(query), {
              headers: this.__getHeaders(headers),
              method: "get",
              mode: "cors"
          })
              .then(resp => this.__getResponse(resp));
      }
      text(slug, query = null, headers = false) {
          this.logger.info(`text [${slug}]`);
          return this.httpClient
              .fetch(slug + this.buildQueryString(query), {
              headers: this.__getHeaders(headers),
              method: "get",
              mode: "cors"
          })
              .then(resp => resp.text());
      }
      blob(slug, query = null, headers = false) {
          this.logger.info(`text [${slug}]`);
          return this.httpClient
              .fetch(slug + this.buildQueryString(query), {
              headers: this.__getHeaders(headers),
              method: "get",
              mode: "cors"
          })
              .then(resp => resp.blob());
      }
      patch(slug, body, headers = true) {
          this.logger.info(`patch [${slug}]`);
          return this.httpClient
              .fetch(slug, {
              body: aureliaFetchClient.json(body),
              headers: this.__getHeaders(headers),
              method: "patch",
              mode: "cors"
          })
              .then(resp => this.__getResponse(resp));
      }
      put(slug, body, headers = true) {
          this.logger.info(`put [${slug}]`);
          return this.httpClient
              .fetch(slug, {
              body: aureliaFetchClient.json(body),
              headers: this.__getHeaders(headers),
              method: "put",
              mode: "cors"
          })
              .then(resp => this.__getResponse(resp));
      }
      post(slug, body, headers = true) {
          this.logger.info(`post [${slug}]`);
          return this.httpClient
              .fetch(slug, {
              body: aureliaFetchClient.json(body),
              headers: this.__getHeaders(headers),
              method: "post",
              mode: "cors"
          })
              .then(resp => this.__getResponse(resp));
      }
      delete(slug, headers = true) {
          this.logger.info(`delete [${slug}]`);
          return this.httpClient
              .fetch(slug, {
              headers: this.__getHeaders(headers),
              method: "delete",
              mode: "cors"
          })
              .then(resp => this.__getResponse(resp));
      }
      upload(slug, form, headers = true) {
          this.logger.info(`upload [${slug}]`);
          return this.__upload("post", slug, form, headers);
      }
      reupload(slug, form, headers = true) {
          this.logger.info(`reupload [${slug}]`);
          return this.__upload("put", slug, form, headers);
      }
      buildQueryString(query) {
          if (!query) {
              return "";
          }
          return ("?" +
              Object.keys(query)
                  .map(k => escape(k) + "=" + escape(isObject(query[k]) ? JSON.stringify(query[k]) : query[k]))
                  .join("&"));
      }
      __upload(method, slug, form, headers) {
          const body = new FormData();
          for (let i = 0, q = form.querySelectorAll("input"); i < q.length; i++) {
              if (q[i].type === "file") {
                  const files = q[i]["draggedFiles"] || q[i].files;
                  for (let x = 0; x < files.length; x++) {
                      body.append(q[i].name || "file" + (i + 1) + (x + 1), files[x].file || files[x], files[x].name);
                  }
              }
              else {
                  body.append(q[i].name || "input" + (i + 1), q[i].value);
              }
          }
          return this.httpClient
              .fetch(slug, {
              body,
              headers: this.__getHeaders(headers),
              method,
              mode: "cors"
          })
              .then(resp => this.__getResponse(resp));
      }
      __getResponse(response) {
          if (response.status === 204) {
              return null;
          }
          return response.text().then(text => {
              try {
                  return JSON.parse(text);
              }
              catch (e) {
                  return {};
              }
          });
      }
      __getHeaders(override = true) {
          const headers = {
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "X-Requested-With": "Fetch"
          };
          Object.assign(headers, this.appConfig.ApiHeaders || {});
          if (override !== false) {
              if (isFunction(this.appConfig.AuthorizationHeader)) {
                  Object.assign(headers, this.appConfig.AuthorizationHeader() || {});
              }
              if (isObject(this.appConfig.AuthorizationHeader)) {
                  Object.assign(headers, this.appConfig.AuthorizationHeader || {});
              }
          }
          if (isObject(override)) {
              Object.assign(headers, override || {});
          }
          return headers;
      }
  };
  exports.UIHttpService = __decorate([
      aureliaFramework.autoinject(),
      __metadata("design:paramtypes", [aureliaFetchClient.HttpClient, UIAppConfig])
  ], exports.UIHttpService);

  const ERROR_CODES = {
      NO_API: { errorCode: "AUF-DM:000", message: "API route required" },
      REJECTED: { errorCode: "AUF-DM:001", message: "REST call rejected" },
      UNKNOWNID: { errorCode: "AUF-DM:002", message: "Data model not loaded" }
  };
  class UIDataModel {
      constructor(id) {
          this.busy = false;
          this.idProperty = "id";
          this.loaded = false;
          this.metadata = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.properties, ModelMetadata, Object.getPrototypeOf(this));
          Object.defineProperties(this, this.metadata.propertyDefs);
          this.metadata.original = Object.assign({}, this.serialize());
          this.metadata.updated = Object.assign({}, this.serialize());
          Object.defineProperties(this, {
              apiSlug: {
                  enumerable: false,
                  writable: true
              },
              busy: {
                  enumerable: false
              },
              httpClient: {
                  enumerable: false,
                  value: aureliaFramework.Container.instance.get(exports.UIHttpService),
                  writable: false
              },
              id: {
                  enumerable: true,
                  writable: true
              },
              idProperty: {
                  enumerable: false,
                  writable: true
              },
              loaded: {
                  enumerable: false
              },
              logger: {
                  enumerable: false,
                  value: aureliaLogging.getLogger(this.constructor.name)
              },
              metadata: {
                  enumerable: false
              }
          });
          this.logger.info("Model created");
          if (id) {
              this.get(id);
          }
      }
      get isDirty() {
          return !!this.metadata.dirtyProps.length;
      }
      get dirtyProps() {
          const ret = {};
          this.metadata.dirtyProps.forEach(prop => (ret[prop] = true));
          return ret;
      }
      static serializeObject(o) {
          const pojo = {};
          if (o instanceof UIDataModel) {
              return o.serialize();
          }
          else if (o instanceof Map) {
              o.forEach((obj, key) => (pojo[key] = this.serializeProperty(obj)));
          }
          else {
              Object.keys(o).forEach(key => (pojo[key] = this.serializeProperty(o[key])));
          }
          return pojo;
      }
      static serializeProperty(p) {
          if (isArray(p)) {
              return p.join(",");
          }
          else if (isObject(p)) {
              return this.serializeObject(p);
          }
          else {
              return isEmpty(p) ? null : p;
          }
      }
      get(id) {
          if (!this.apiSlug) {
              return Promise.reject(ERROR_CODES.NO_API);
          }
          return this.callPreHook("preGet", id)
              .then(result => {
              if (result !== false) {
                  return this.doGet(id);
              }
              return Promise.reject(ERROR_CODES.REJECTED);
          })
              .then(response => this.postGet(response));
      }
      save() {
          if (!this.apiSlug) {
              return Promise.reject(ERROR_CODES.NO_API);
          }
          return this.callPreHook("preSave")
              .then(result => {
              if (result !== false) {
                  if (this.loaded) {
                      return this.doPut();
                  }
                  else {
                      return this.doPost();
                  }
              }
              return Promise.reject(ERROR_CODES.REJECTED);
          })
              .then(response => {
              this.loaded = true;
              this.postSave(response);
          });
      }
      delete() {
          if (!this.apiSlug) {
              return Promise.reject(ERROR_CODES.NO_API);
          }
          if (!this.loaded) {
              return Promise.reject(ERROR_CODES.UNKNOWNID);
          }
          return this.callPreHook("preDelete")
              .then(result => {
              if (result !== false) {
                  return this.doDelete();
              }
              return Promise.reject(ERROR_CODES.REJECTED);
          })
              .then(response => {
              this.postDelete(response);
              this.dispose();
          });
      }
      update() {
          this.metadata.updated = Object.assign({}, this.serialize());
      }
      reset() {
          this.metadata.updated = Object.assign({}, this.metadata.original);
          this.discard();
      }
      discard() {
          this.metadata.dirtyProps = [];
          const updated = Object.assign({}, this.metadata.updated);
          this.metadata.serializableProps.forEach(prop => (this[prop] = updated[prop]));
      }
      addObserver(ob) {
          this.metadata.observers.push(ob);
      }
      observe(property, callback) {
          this.metadata.observers.push(UIInternal.observe(this, property, callback));
      }
      dispose() {
          this.logger.info("Model Disposing");
          while (this.metadata.observers && this.metadata.observers.length) {
              this.metadata.observers.pop().dispose();
          }
      }
      serialize() {
          const POJO = {};
          this.metadata.serializableProps.forEach(prop => (POJO[prop] = UIDataModel.serializeProperty(this[prop])));
          return POJO;
      }
      deserialize(json) {
          this.loaded = true;
          if (json[this.idProperty]) {
              this.internalId = json[this.idProperty];
          }
          this.metadata.original = Object.assign({}, json);
          this.metadata.updated = Object.assign({}, json);
          Object.keys(json).forEach(prop => (this[prop] = json[prop]));
      }
      preGet() {
      }
      preSave() {
      }
      preDelete() {
      }
      postGet(_) {
      }
      postSave(_) {
      }
      postDelete(_) {
      }
      propertyGetter(prop) {
          return function () {
              return this["_" + prop];
          };
      }
      propertySetter(prop) {
          return function (v) {
              this["_" + prop] = v;
              this.updateDirty(prop, v);
              return v;
          };
      }
      generateId() {
          return Math.round(Math.random() * new Date().getTime()).toString(18);
      }
      updateDirty(prop, value) {
          const hasDirty = this.metadata.dirtyProps.indexOf(prop) > -1;
          const isDirty = this.metadata.original[prop] !== (value === "" ? null : value);
          if (!hasDirty && isDirty) {
              this.metadata.dirtyProps.push(prop);
          }
          if (hasDirty && !isDirty) {
              this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
          }
      }
      callPreHook(hook, data) {
          const result = this[hook](data);
          if (result instanceof Promise) {
              return result;
          }
          if (result !== null && result !== undefined) {
              return Promise.resolve(result);
          }
          return Promise.resolve(true);
      }
      doGet(id) {
          this.busy = true;
          return this.httpClient
              .json(this.apiSlug + id)
              .then(json => {
              this.deserialize(json);
              this.busy = false;
              return json;
          })
              .catch(e => {
              this.busy = false;
              return Promise.reject(e);
          });
      }
      doPost() {
          this.busy = true;
          return this.httpClient
              .post(this.apiSlug, this.serialize())
              .then(json => {
              this.deserialize(json);
              this.busy = false;
              return json;
          })
              .catch(e => {
              this.busy = false;
              return Promise.reject(e);
          });
      }
      doPut() {
          this.busy = true;
          return this.httpClient
              .put(this.apiSlug + this.internalId, this.serialize())
              .then(json => {
              this.deserialize(json);
              this.busy = false;
              return json;
          })
              .catch(e => {
              this.busy = false;
              return Promise.reject(e);
          });
      }
      doDelete() {
          this.busy = true;
          return this.httpClient
              .delete(this.apiSlug + this.internalId)
              .then(json => {
              this.busy = false;
              return json;
          })
              .catch(e => {
              this.busy = false;
              return Promise.reject(e);
          });
      }
  }
  __decorate([
      aureliaFramework.computedFrom("metadata.dirtyProps.length"),
      __metadata("design:type", Boolean),
      __metadata("design:paramtypes", [])
  ], UIDataModel.prototype, "isDirty", null);
  __decorate([
      aureliaFramework.computedFrom("metadata.dirtyProps.length"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIDataModel.prototype, "dirtyProps", null);
  function serializable(defaultValue = null) {
      return (target, property) => {
          if (!property) {
              throw Error("Decorator should be used on property only!");
          }
          const meta = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.properties, ModelMetadata, target);
          meta.serializableProps.push(property);
          meta.propertyDefs[property] = {
              enumerable: true,
              get: target.propertyGetter(property),
              set: target.propertySetter(property)
          };
          meta.propertyDefs["_" + property] = {
              enumerable: false,
              value: defaultValue,
              writable: true
          };
      };
  }
  class ModelMetadata {
      constructor() {
          this.serializableProps = [];
          this.dirtyProps = [];
          this.observers = [];
          this.propertyDefs = {};
          this.updated = {};
          this.original = {};
      }
  }

  exports.UIApplication = class UIApplication {
      constructor(config) {
          this.config = config;
          this.logger = aureliaLogging.getLogger("UIApplication");
      }
      log(tag, ...rest) {
          this.logger.info(tag, ...rest);
      }
      debug(tag, ...rest) {
          this.logger.debug(tag, ...rest);
      }
  };
  exports.UIApplication = __decorate([
      aureliaFramework.singleton(),
      aureliaFramework.autoinject(),
      __metadata("design:paramtypes", [UIAppConfig])
  ], exports.UIApplication);

  exports.UIDialogService = class UIDialogService {
      constructor(appConfig, container, compositionEngine) {
          this.appConfig = appConfig;
          this.container = container;
          this.compositionEngine = compositionEngine;
          this.windows = [];
          this.initialized = false;
          this.dragObject = {
              dialog: undefined,
              dlgHeight: 0,
              dlgWidth: 0,
              isDragging: false,
              left: 0,
              maxHeight: 0,
              maxWidth: 0,
              startX: 0,
              startY: 0,
              top: 0
          };
      }
      open(viewModel, model) {
          return this.openDialog(viewModel, model);
      }
      openModal(viewModel, model) {
          return this.openDialog(viewModel, model, true);
      }
      openDialog(viewModel, model, modal = false) {
          this.initialize();
          const instruction = {
              childContainer: this.container.createChild(),
              container: this.container,
              model,
              viewModel
          };
          return new Promise(resolve => {
              this.getViewModel(instruction)
                  .then(newInstruction => UIInternal.invokeLifecycle(newInstruction.viewModel, "canActivate", model))
                  .then(canActivate => {
                  return canActivate !== false
                      ? this.compositionEngine.createController(instruction)
                      : Promise.reject(new Error("canActivate rejected"));
              })
                  .then(controller => {
                  controller.automate();
                  const dialog = controller.view.controllers.find(c => c.viewModel);
                  dialog.viewModel.modal = modal;
                  dialog.viewModel.viewController = controller;
                  dialog.viewModel.returnPromise = resolve;
                  this.appConfig.DialogContainer.add(controller.view);
                  if (dialog.viewModel.taskButton) {
                      this.appConfig.TaskbarContainer.add(dialog.viewModel.taskButton);
                  }
                  controller.attached();
                  if (this.activeWin) {
                      this.activeWin.active = false;
                  }
                  this.windows.unshift((this.activeWin = dialog.viewModel));
              });
          });
      }
      initialize() {
          if (!this.initialized) {
              this.initialized = true;
              UIInternal.subscribe("dlg:close", d => this.closeDialog(d));
              UIInternal.subscribe("dlg:activate", d => this.activate(d.dialog));
              UIInternal.subscribe("dlg:minimize", d => this.minimizeDialog(d.dialog));
              UIInternal.subscribe("dlg:drag", d => this.startDrag(d));
              document.addEventListener("mousemove", e => this.drag(e));
              document.addEventListener("mouseup", () => this.stopDrag());
              if (this.appConfig.TaskbarContainer) {
                  this.appConfig.TaskbarContainer.anchor.addEventListener("click", (e) => {
                      try {
                          const dialog = e.target.au.controller.scope.bindingContext;
                          if (dialog.minimized || dialog.active) {
                              dialog.minimize();
                          }
                          else {
                              this.activate(dialog);
                          }
                      }
                      catch (ex) {
                      }
                  });
              }
          }
      }
      startDrag(startObject) {
          this.dragObject = Object.assign(Object.assign({}, startObject), { dlgHeight: startObject.dialog.dialogEl.offsetHeight, dlgWidth: startObject.dialog.dialogEl.offsetWidth, isDragging: true, left: parseInt(startObject.dialog.position.left, 10), maxHeight: this.appConfig.DialogContainer.anchor.offsetHeight, maxWidth: this.appConfig.DialogContainer.anchor.offsetWidth, top: parseInt(startObject.dialog.position.top, 10) });
      }
      drag($event) {
          if (this.dragObject.isDragging) {
              const leftDiff = ($event.x || $event.clientX) - this.dragObject.startX;
              const topDiff = ($event.y || $event.clientY) - this.dragObject.startY;
              if (this.dragObject.left + leftDiff + this.dragObject.dlgWidth > this.dragObject.maxWidth) {
                  this.dragObject.dialog.position.left =
                      this.dragObject.maxWidth - this.dragObject.dlgWidth + "px";
              }
              else if (this.dragObject.left + leftDiff > 0) {
                  this.dragObject.dialog.position.left = this.dragObject.left + leftDiff + "px";
              }
              if (this.dragObject.top + topDiff + this.dragObject.dlgHeight > this.dragObject.maxHeight) {
                  this.dragObject.dialog.position.top =
                      this.dragObject.maxHeight - this.dragObject.dlgHeight + "px";
              }
              else if (this.dragObject.top + topDiff > 0) {
                  this.dragObject.dialog.position.top = this.dragObject.top + topDiff + "px";
              }
          }
      }
      stopDrag() {
          if (this.dragObject.isDragging) {
              this.dragObject.isDragging = false;
          }
      }
      minimizeDialog(dialog) {
          if (dialog) {
              if (dialog.minimized && this.activeWin === dialog) {
                  this.activeWin = this.windows.find(d => !d.active && !d.minimized && d !== dialog);
                  this.activeWin ? (this.activeWin.active = true) : fn();
              }
              else {
                  this.activate(dialog);
              }
          }
      }
      closeDialog(detail) {
          if (detail && detail.dialog) {
              const { dialog, result } = detail;
              UIInternal.invokeLifecycle(dialog.viewController.viewModel, "canDeactivate", result).then(canDeactivate => {
                  if (canDeactivate !== false) {
                      UIInternal.invokeLifecycle(dialog.viewController.viewModel, "deactivate");
                      this.appConfig.DialogContainer.remove(dialog.viewController.view);
                      if (dialog.taskButton) {
                          this.appConfig.TaskbarContainer.remove(dialog.taskButton);
                      }
                      dialog.viewController.unbind();
                      dialog.returnPromise({ result, cancelled: result === undefined });
                      this.windows.remove(dialog);
                      this.activeWin = this.windows.find(win => !win.minimized);
                      if (this.activeWin) {
                          this.activeWin.active = true;
                      }
                  }
              });
          }
      }
      activate(dialog) {
          if (this.activeWin) {
              this.activeWin.active = false;
          }
          this.activeWin = dialog;
          dialog.active = true;
      }
      getViewModel(instruction) {
          if (isFunction(instruction.viewModel)) {
              const moduleId = aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
              if (moduleId) {
                  instruction.viewModel = moduleId;
              }
          }
          return this.compositionEngine.ensureViewModel(instruction);
      }
  };
  exports.UIDialogService = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.singleton(),
      __metadata("design:paramtypes", [UIAppConfig,
          aureliaFramework.Container,
          aureliaFramework.CompositionEngine])
  ], exports.UIDialogService);

  var alertView = "<div class=\"ui-dialog__wrapper\" data-modal.bind=\"true\" ref=\"__el\" keydown.delegate=\"__keyCheck($event.keyCode)\">\n  <!--suppress HtmlFormInputWithoutLabel -->\n  <input blur.trigger=\"$event.target.focus()\" readonly.one-time=\"true\" tabindex=\"0\" css.bind=\"{opacity:0}\" ref=\"keyEl\">\n  <div class=\"ui-panel-base ui-dialog\" ui-border=\"xy ${theme}\" data-active.bind=\"true\" css.bind=\"{minWidth: '18rem'}\">\n    <div class=\"ui-panel__body\" ref=\"vmElement\">\n      <ui-row ui-color.bind=\"theme\">\n        <ui-col ui-padding=\"sm\" size=\"auto\" if.bind=\"icon\" ui-font=\"xl\">\n          <ui-icon icon.bind=\"icon\"></ui-icon>\n        </ui-col>\n        <ui-col ui-padding=\"sm\" size=\"fill\">\n          <div if.bind=\"title\" ui-weight=\"medium\" innerhtml.bind=\"title\"></div>\n          <div class=\"ui-alert__body\" innerhtml.bind=\"message\"></div>\n        </ui-col>\n      </ui-row>\n    </div>\n    <div class=\"ui-footer\" ui-padding=\"y--sm\" ui-align=\"center\">\n      <ui-button if.bind=\"type!=='alert'\" click.trigger=\"__close(false)\" ui-theme.bind=\"theme\" type=\"outline\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${cancelLabel}\n      </ui-button>\n      <ui-button click.trigger=\"__close(true)\" ui-theme.bind=\"theme\" type=\"solid\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${okLabel}\n      </ui-button>\n    </div>\n  </div>\n</div>\n";

  var toastView = "<div class=\"${className} ui-alert\" data-open=\"false\" ui-theme.bind=\"theme\" ref=\"__el\" bindable=\"theme,title,icon,timeout,cancelLabel,okLabel,type,__close,autoClose\">\n  <div class=\"ui-alert__wrapper\">\n    <div if.bind=\"icon\" class=\"ui-alert__icon\">\n      <ui-icon icon.bind=\"icon\"></ui-icon>\n    </div>\n    <div if.bind=\"title\" class=\"ui-alert__title\" innerhtml.bind=\"title\"></div>\n    <div class=\"ui-alert__body\" innerhtml.bind=\"message\"></div>\n    <div class=\"ui-alert__close\" click.trigger=\"__close(false)\">\n      <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-alert__footer\" if.bind=\"type==='confirm'\">\n      <a click.trigger=\"__close(false)\">${cancelLabel}</a>\n      <a click.trigger=\"__close(true)\" ui-weight=\"bold\">${okLabel}</a>\n    </div>\n    <div if.bind=\"autoClose\" class=\"ui-alert__progress\" css.bind=\"{transitionDuration: timeout+'ms'}\"></div>\n  </div>\n</div>\n";

  exports.UINotificationService = class UINotificationService {
      constructor(appConfig, container, compiler, templatingEngine) {
          this.appConfig = appConfig;
          this.container = container;
          this.compiler = compiler;
          this.templatingEngine = templatingEngine;
      }
      alert(message, title, config = {}) {
          config = this.buildConfig(message, title, config);
          config.type = "alert";
          return this.createAlert(config);
      }
      confirm(message, title, config = {}) {
          config = this.buildConfig(message, title, config);
          config.type = "confirm";
          return this.createAlert(config);
      }
      message(message, title, config = {}) {
          return this.createToast(this.buildConfig(message, title, config));
      }
      toast(message, title, config = {}) {
          return this.createToast(this.buildConfig(message, title, config), true);
      }
      buildConfig(message, title, config = {}) {
          if (isObject(message)) {
              config = message;
          }
          if (isString(message)) {
              config.message = message;
          }
          if (isString(title)) {
              config.title = title;
          }
          return config;
      }
      createToast(config, forToastNotification) {
          return new Promise(resolve => {
              const cfg = Object.assign(Object.assign({ autoClose: true, cancelLabel: "Cancel", okLabel: "OK", theme: "default", timeout: 5000, type: "default", className: forToastNotification ? "ui-toast" : "ui-message" }, config), { message: `<div>${config.message}</div>` });
              cfg.autoClose = cfg.type !== "confirm" && cfg.autoClose;
              const viewFactory = this.compiler.compile(`<template>${toastView}</template>`);
              const view = viewFactory.create(this.container);
              cfg.__close = b => {
                  view.firstChild.dataset.open = "false";
                  resolve(b !== false);
                  setTimeout(() => {
                      view.removeNodes();
                  }, 500);
              };
              view.bind(Object.assign({}, cfg));
              view.appendNodesTo(forToastNotification ? this.appConfig.ToastContainer : this.appConfig.AlertContainer);
              if (cfg.autoClose) {
                  setTimeout(cfg.__close, cfg.timeout);
              }
              UIInternal.queueTask(() => {
                  const el = view.firstChild;
                  setTimeout(() => el.dataset.open = "true", 50);
                  this.templatingEngine.enhance({
                      element: el.querySelector(".ui-alert__body > div")
                  });
              });
          });
      }
      createAlert(config) {
          return new Promise(resolve => {
              const cfg = Object.assign(Object.assign({ cancelLabel: "Cancel", okLabel: "OK", theme: "default", type: "alert" }, config), { message: `<div>${config.message}</div>` });
              const viewFactory = this.compiler.compile(`<template>${alertView}</template>`);
              const view = viewFactory.create(this.container);
              cfg.__keyCheck = key => {
                  if (key === 13 || (key === 27 && cfg.type === "alert")) {
                      cfg.__close(true);
                  }
                  else if (key === 27) {
                      cfg.__close(false);
                  }
              };
              cfg.__close = b => {
                  view.firstChild.classList.remove("ui-alert--show");
                  resolve(b !== false);
                  setTimeout(() => {
                      this.appConfig.DialogContainer.remove(view);
                  }, 0);
              };
              view.bind(cfg);
              this.appConfig.DialogContainer.add(view);
              UIInternal.queueTask(() => {
                  const el = view.firstChild;
                  this.templatingEngine.enhance({
                      element: el.querySelector(".ui-alert__body > div")
                  });
              });
              cfg.keyEl.focus();
          });
      }
  };
  exports.UINotificationService = __decorate([
      aureliaFramework.singleton(),
      aureliaFramework.autoinject(),
      __metadata("design:paramtypes", [UIAppConfig,
          aureliaFramework.Container,
          aureliaFramework.ViewCompiler,
          aureliaFramework.TemplatingEngine])
  ], exports.UINotificationService);

  (function (UIFormat) {
      function toHTML(md) {
          return kramed(md, {
              gfm: true,
              tables: true,
              breaks: true,
              pedantic: false,
              sanitize: false,
              smartLists: true,
              smartypants: false
          }).replace(/(<a href=)/gi, '<a class="ui-link" target="_blank" href=');
      }
      UIFormat.toHTML = toHTML;
      function parseDate(dt) {
          return typeof dt === "string" ? dateFns.parseISO(dt) : dt;
      }
      function date(dt, ft = "dd MMM yyyy") {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, ft, { useAdditionalDayOfYearTokens: true, useAdditionalWeekYearTokens: true });
      }
      UIFormat.date = date;
      function time(dt, ft = "hh:mm a") {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, ft, { useAdditionalDayOfYearTokens: true, useAdditionalWeekYearTokens: true });
      }
      UIFormat.time = time;
      function datetime(dt, ft = "dd MMM yyyy hh:mm a") {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, ft, { useAdditionalDayOfYearTokens: true, useAdditionalWeekYearTokens: true });
      }
      UIFormat.datetime = datetime;
      function utcDate(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt) ? null : dateFns.toDate(dt).toISOString();
      }
      UIFormat.utcDate = utcDate;
      function dateToISO(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt)
              ? null
              : dateFns.format(dt, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", {
                  useAdditionalDayOfYearTokens: true,
                  useAdditionalWeekYearTokens: true
              });
      }
      UIFormat.dateToISO = dateToISO;
      function age(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt) ? "" : dateFns.formatDistanceStrict(dt, new Date());
      }
      UIFormat.age = age;
      function fromNow(dt) {
          dt = parseDate(dt);
          return !dt || !dateFns.isValid(dt) ? "" : dateFns.formatDistance(dt, new Date(), { addSuffix: true });
      }
      UIFormat.fromNow = fromNow;
      function number(nm, fm = "0,0[.]00") {
          return nm === null || isNaN(nm) ? "" : numeral(nm).format(fm);
      }
      UIFormat.number = number;
      function currency(nm, sy = "$", fm = "$ 0,0.00") {
          return nm === null || isNaN(nm)
              ? ""
              : numeral(nm)
                  .format(fm)
                  .replace("$", sy);
      }
      UIFormat.currency = currency;
      function percent(nm) {
          return nm === null || isNaN(nm) ? "" : numeral(nm > 1 ? nm / 100 : nm).format("0.00%");
      }
      UIFormat.percent = percent;
  })(exports.UIFormat || (exports.UIFormat = {}));

  const Countries = _Countries;
  const queueTask = UIInternal.queueTask;
  const queueMicroTask = UIInternal.queueMicroTask;
  const broadcast = UIInternal.broadcast;
  const subscribe = UIInternal.subscribe;
  const subscribeOnce = UIInternal.subscribeOnce;
  const AppConfig = () => {
  };
  AppConfig.prototype.ApiBaseUrl = "";
  AppConfig.prototype.ApiHeaders = "";
  (function (UIResources) {
      UIResources["Buttons"] = "buttons";
      UIResources["Card"] = "card";
      UIResources["Panel"] = "panel";
      UIResources["Menus"] = "menus";
      UIResources["Forms"] = "forms";
      UIResources["Lists"] = "lists";
      UIResources["TabPanel"] = "tabpanel";
      UIResources["DataPanel"] = "datapanel";
      UIResources["Calendar"] = "calendar";
      UIResources["Gridder"] = "gridder";
  })(exports.UIResources || (exports.UIResources = {}));
  const RESOURCE_LOADER = {
      viewport: () => Promise.resolve().then(function () { return uiViewport; }).then(m => m.Viewport),
      page: () => Promise.resolve().then(function () { return uiPage; }).then(m => m.Page),
      icons: () => Promise.resolve().then(function () { return uiIcons; }).then(m => m.Icons),
      responsive: () => Promise.resolve().then(function () { return uiResponsive; }).then(m => m.Responsive),
      shared: () => Promise.resolve().then(function () { return uiShared; }).then(m => m.Shared),
      attributes: () => Promise.resolve().then(function () { return uiAttributes; }).then(m => m.Attributes),
      valueconverters: () => Promise.resolve().then(function () { return valueConverters; }).then(m => m.ValueConverters),
      [exports.UIResources.Buttons]: () => Promise.resolve().then(function () { return uiButtons; }).then(m => m.Buttons),
      [exports.UIResources.Calendar]: () => Promise.resolve().then(function () { return uiCalendar; }).then(m => m.Calendar),
      [exports.UIResources.Card]: () => Promise.resolve().then(function () { return uiCard; }).then(m => m.Card),
      [exports.UIResources.DataPanel]: () => Promise.resolve().then(function () { return uiDataPanels; }).then(m => m.DataPanels),
      [exports.UIResources.Forms]: () => Promise.resolve().then(function () { return uiForms; }).then(m => m.Forms),
      [exports.UIResources.Gridder]: () => Promise.resolve().then(function () { return uiGridder; }).then(m => m.Gridder),
      [exports.UIResources.Lists]: () => Promise.resolve().then(function () { return uiLists; }).then(m => m.Lists),
      [exports.UIResources.Menus]: () => Promise.resolve().then(function () { return uiMenus; }).then(m => m.Menus),
      [exports.UIResources.Panel]: () => Promise.resolve().then(function () { return uiPanels; }).then(m => m.Panels),
      [exports.UIResources.TabPanel]: () => Promise.resolve().then(function () { return uiTabPanel; }).then(m => m.TabPanel)
  };
  class UIFrameworkConfig {
      constructor(auConfig, loadResources) {
          this.auConfig = auConfig;
          this.resources = [
              "viewport",
              "page",
              "icons",
              "responsive",
              "shared",
              "attributes",
              "valueconverters"
          ];
          loadResources(() => this.loadResources());
      }
      setApiBaseUrl(v) {
          AppConfig.prototype.ApiBaseUrl = v;
          return this;
      }
      setApiHeaders(v) {
          AppConfig.prototype.ApiHeaders = v;
          return this;
      }
      setKeyValue(key, v) {
          AppConfig.prototype[key] = v;
          return this;
      }
      useStandardResources() {
          this.useResource(exports.UIResources.Buttons);
          this.useResource(exports.UIResources.Calendar);
          this.useResource(exports.UIResources.Card);
          this.useResource(exports.UIResources.DataPanel);
          this.useResource(exports.UIResources.Forms);
          this.useResource(exports.UIResources.Gridder);
          this.useResource(exports.UIResources.Lists);
          this.useResource(exports.UIResources.Menus);
          this.useResource(exports.UIResources.Panel);
          this.useResource(exports.UIResources.TabPanel);
      }
      useResource(resource) {
          this.resources.push(resource);
          return this;
      }
      loadResources() {
          return Promise.all(this.resources.map(name => RESOURCE_LOADER[name]())).then(modules => {
              this.auConfig.globalResources(modules.reduce((a, m) => {
                  a.push(...m);
                  return a;
              }, []));
          });
      }
  }
  function configure(auConfig, configCallback) {
      aureliaFramework.Container.instance = auConfig.container;
      auConfig.container.registerHandler("ui-validator", container => container.get(UIValidationRenderer));
      registerValidators(auConfig.container);
      let loadResources = () => Promise.resolve();
      const config = new UIFrameworkConfig(auConfig, fn => {
          loadResources = fn;
      });
      if (isFunction(configCallback)) {
          configCallback(config);
      }
      else {
          config.useStandardResources();
      }
      auConfig.singleton(UIAppConfig, AppConfig);
      return loadResources();
  }

  let UIRouterView = class UIRouterView {
      constructor() {
          this.name = "";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIRouterView.prototype, "name", void 0);
  UIRouterView = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-router-view"),
      aureliaFramework.inlineView(`<template><router-view swap-order="with" name.bind="name" class="ui-router-view" ref="vmElement"></router-view></template>`)
  ], UIRouterView);

  let UIViewportFooter = class UIViewportFooter {
      constructor() {
          this.dir = "ltr";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIViewportFooter.prototype, "dir", void 0);
  UIViewportFooter = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-viewport-footer"),
      aureliaFramework.inlineView(`<template><footer dir.bind="dir" class="ui-viewport__footer" slot="ui-viewport__footer" ref="vmElement"><slot></slot></footer></template>`)
  ], UIViewportFooter);

  let UIViewportHeader = class UIViewportHeader {
      constructor() {
          this.dir = "ltr";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIViewportHeader.prototype, "dir", void 0);
  UIViewportHeader = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-viewport-header"),
      aureliaFramework.inlineView(`<template><header dir.bind="dir" class="ui-viewport__header" slot="ui-viewport__header" ref="vmElement"><slot></slot></header></template>`)
  ], UIViewportHeader);

  var view = "<template class=\"ui-viewport\" role=\"main\">\n  <slot name=\"ui-viewport__header\"></slot>\n  <div class=\"ui-viewport__body\">\n    <slot></slot>\n    <div class=\"ui-viewport__dialog-container\" ref=\"dialogContainer\"></div>\n    <div class=\"ui-viewport__alert-container\" ref=\"appConfig.AlertContainer\"></div>\n    <div class=\"ui-viewport__toast-container\" ref=\"appConfig.ToastContainer\"></div>\n  </div>\n  <section role=\"tablist\" class=\"ui-viewport__taskbar\">\n    <div class=\"ui-viewport__taskbar--start\"><slot name=\"taskbar-start\"></slot></div>\n    <div class=\"ui-viewport__taskbar__wrapper\" ref=\"taskbarContainer\"></div>\n    <div class=\"ui-viewport__taskbar--end\"><slot name=\"taskbar-links\"></slot></div>\n  </section>\n  <slot name=\"ui-viewport__footer\"></slot>\n  <div class=\"ui-viewport__floating-container\" ref=\"appConfig.FloatingContainer\"></div>\n  <ui-loader busy.bind=\"router.isNavigating\"></ui-loader>\n</template>\n";

  let UIViewport = class UIViewport {
      constructor(appConfig, router) {
          this.appConfig = appConfig;
          this.router = router;
          window.addEventListener("resize", () => UIInternal.broadcast(UIInternal.EVT_VIEWPORT_RESIZE));
          document.addEventListener("mouseup", $event => this.broadcastEvent($event));
      }
      attached() {
          this.appConfig.DialogContainer = new aureliaFramework.ViewSlot(this.dialogContainer, true);
          this.appConfig.TaskbarContainer = new aureliaFramework.ViewSlot(this.taskbarContainer, true);
          this.appConfig.DialogContainer.attached();
          this.appConfig.TaskbarContainer.attached();
      }
      broadcastEvent($event) {
          if (!hasParent($event.target, this.appConfig.FloatingContainer)) {
              UIInternal.broadcast(UIInternal.EVT_VIEWPORT_CLICK, $event.target);
          }
      }
  };
  UIViewport = __decorate([
      aureliaFramework.customElement("ui-viewport"),
      aureliaFramework.inlineView(view),
      __metadata("design:paramtypes", [UIAppConfig, aureliaRouter.AppRouter])
  ], UIViewport);
  const Viewport = [UIViewport, UIViewportHeader, UIViewportFooter, UIRouterView];

  var uiViewport = /*#__PURE__*/Object.freeze({
    Viewport: Viewport
  });

  let UIContent = class UIContent {
      constructor(element) {
          this.element = element;
      }
      attached() {
          this.obResize = new ResizeObserver(() => this.element.dispatchEvent(UIInternal.createEvent("resize", this.element.getBoundingClientRect())));
          this.obResize.observe(this.element);
      }
      detached() {
          this.obResize.disconnect();
      }
  };
  UIContent = __decorate([
      aureliaFramework.customElement("ui-content"),
      aureliaFramework.inlineView(`<template class="ui-section__content" ref="vmElement"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIContent);

  let UISection = class UISection {
      constructor(element) {
          if (element.hasAttribute("centered")) {
              element.classList.add("ui-section--centered");
          }
      }
  };
  UISection = __decorate([
      aureliaFramework.customElement("ui-section"),
      aureliaFramework.inlineView(`<template class="ui-section au-animate animate-slide-in-right animate-slide-out-left" role="main"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UISection);

  let UISectionFoot = class UISectionFoot {
  };
  UISectionFoot = __decorate([
      aureliaFramework.customElement("ui-section-foot"),
      aureliaFramework.inlineView(`<template class="ui-section__foot"><slot></slot></template>`)
  ], UISectionFoot);

  let UISectionHead = class UISectionHead {
  };
  UISectionHead = __decorate([
      aureliaFramework.customElement("ui-section-head"),
      aureliaFramework.inlineView(`<template class="ui-section__head"><slot></slot></template>`)
  ], UISectionHead);

  let UIPage = class UIPage {
      constructor() {
          this.pageTitle = "";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPage.prototype, "pageTitle", void 0);
  UIPage = __decorate([
      aureliaFramework.customElement("ui-page"),
      aureliaFramework.inlineView(`<template class="ui-page au-animate animate-slide-in-right animate-slide-out-left" role="main">
  <div class="ui-page__title" if.bind="pageTitle">\${pageTitle}</div>
  <slot name="page-alert"></slot>
  <div class="ui-page__body"><slot></slot></div>
</template>`)
  ], UIPage);
  const Page = [UIPage, UISection, UISectionHead, UISectionFoot, UIContent];

  var uiPage = /*#__PURE__*/Object.freeze({
    Page: Page
  });

  let UIAvatar = class UIAvatar {
      constructor(element) {
          this.element = element;
          this.icon = "";
          this.size = "nm";
          if (element.hasAttribute("round")) {
              element.classList.add("ui-avatar--round");
          }
          if (element.hasAttribute("flip-on-rtl")) {
              element.classList.add("flip-on-rtl");
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIAvatar.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIAvatar.prototype, "size", void 0);
  UIAvatar = __decorate([
      aureliaFramework.customElement("ui-avatar"),
      aureliaFramework.inlineView(`<template class="ui-avatar"><slot><ui-icon ui-font.bind="size" icon.bind="icon"></ui-icon></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIAvatar);

  let UIFlag = class UIFlag {
      constructor(element) {
          this.element = element;
          this.code = "";
          this.size = "nm";
          if (element.hasAttribute("round")) {
              element.classList.add("ui-icon--round");
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIFlag.prototype, "code", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIFlag.prototype, "size", void 0);
  UIFlag = __decorate([
      aureliaFramework.customElement("ui-flag"),
      aureliaFramework.inlineView(`<template ui-font.bind="size" class="ui-flag \${code}"></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIFlag);

  let UIIcon = class UIIcon {
      constructor(element) {
          this.element = element;
          this.icon = "";
          this.size = "nm";
          if (element.hasAttribute("round")) {
              element.classList.add("ui-icon--round");
          }
          if (element.hasAttribute("flip-on-rtl")) {
              element.classList.add("flip-on-rtl");
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIIcon.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIIcon.prototype, "size", void 0);
  UIIcon = __decorate([
      aureliaFramework.customElement("ui-icon"),
      aureliaFramework.inlineView(`<template ui-font.bind="size" class="ui-icon \${icon}"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIIcon);

  var none = " ";
  var unknown = "M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z";
  var loader = "M8.111,1.747C9.299,1.254,10.62,1,12,1c6.075,0,11,4.925,11,11s-4.925,11-11,11S1,18.075,1,12c0-1.38,0.254-2.701,0.718-3.918c0.526,0.526,1.11,0.882,1.732,1.098C3.158,10.067,3,11.015,3,12c0,4.971,4.029,9,9,9s9-4.029,9-9s-4.029-9-9-9c-0.985,0-1.933,0.158-2.82,0.451C8.964,2.828,8.608,2.244,8.111,1.747z M4.929,2.929c1.105,0,2,0.896,2,2c0,1.105-0.895,2-2,2c-1.104,0-2-0.895-2-2C2.929,3.824,3.824,2.929,4.929,2.929z";
  var busy = "M16,13V11H21V13H16M14.83,7.76L17.66,4.93L19.07,6.34L16.24,9.17L14.83,7.76M11,16H13V21H11V16M11,3H13V8H11V3M4.93,17.66L7.76,14.83L9.17,16.24L6.34,19.07L4.93,17.66M4.93,6.34L6.34,4.93L9.17,7.76L7.76,9.17L4.93,6.34M8,13H3V11H8V13M19.07,17.66L17.66,19.07L14.83,16.24L16.24,14.83L19.07,17.66Z";
  var alert = "M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z";
  var cross = "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z";
  var caret = "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z";
  var minus = "M19,13H5V11H19V13Z";
  var plus = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";
  var menu = "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z";
  var help = "M10,19H13V22H10V19M12,2C17.35,2.22 19.68,7.62 16.5,11.67C15.67,12.67 14.33,13.33 13.67,14.17C13,15 13,16 13,17H10C10,15.33 10,13.92 10.67,12.92C11.33,11.92 12.67,11.33 13.5,10.67C15.92,8.43 15.32,5.26 12,5A3,3 0 0,0 9,8H6A6,6 0 0,1 12,2Z";
  var expand = "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z";
  var collapse = "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z";
  var drag = "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z";
  var resizer = "M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z";
  var calendar = "M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z";
  var clock = "M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z";
  var ellipsis = "M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z";
  var overflow = "M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z";
  var file = "M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z";
  var upload = "M14,13V17H10V13H7L12,8L17,13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z";
  var pinned = "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z";
  var unpinned = "M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12M8.8,14L10,12.8V4H14V12.8L15.2,14H8.8Z";
  var Icons = {
  	none: none,
  	"check-off": "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  	"check-on": "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z",
  	"radio-off": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  	"radio-on": "M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z",
  	"radio-check": "M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z",
  	unknown: unknown,
  	loader: loader,
  	busy: busy,
  	alert: alert,
  	cross: cross,
  	caret: caret,
  	minus: minus,
  	plus: plus,
  	menu: menu,
  	help: help,
  	expand: expand,
  	collapse: collapse,
  	drag: drag,
  	resizer: resizer,
  	calendar: calendar,
  	clock: clock,
  	ellipsis: ellipsis,
  	overflow: overflow,
  	"folder-closed": "M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z",
  	"folder-open": "M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z",
  	"folder-empty": "M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z",
  	file: file,
  	upload: upload,
  	pinned: pinned,
  	unpinned: unpinned,
  	"collapse-start": "M11.92,19.92L4,12L11.92,4.08L13.33,5.5L7.83,11H22V13H7.83L13.34,18.5L11.92,19.92M4,12V2H2V22H4V12Z",
  	"collapse-end": "M12.08,4.08L20,12L12.08,19.92L10.67,18.5L16.17,13H2V11H16.17L10.67,5.5L12.08,4.08M20,12V22H22V2H20V12Z",
  	"expand-start": "M4,2H2V22H4V13H18.17L12.67,18.5L14.08,19.92L22,12L14.08,4.08L12.67,5.5L18.17,11H4V2Z",
  	"expand-end": "M20,22H22V2H20V11H5.83L11.33,5.5L9.92,4.08L2,12L9.92,19.92L11.33,18.5L5.83,13H20V22Z",
  	"page-first": "M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z",
  	"page-last": "M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z",
  	"page-previous": "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
  	"page-next": "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
  	"tree-expand": "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z",
  	"tree-collapse": "M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z",
  	"tree-closed": "M10,17L15,12L10,7V17Z",
  	"tree-open": "M7,10L12,15L17,10H7Z",
  	"tree-check-on": "M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",
  	"tree-check-off": "M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
  	"tree-check-half": "M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,17H7V7H17V17Z",
  	"dlg-minimize": "M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z",
  	"dlg-help": "M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z",
  	"dlg-close": "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
  	"dlg-expand": "M12,1.998c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10c5.522,0,10-4.477,10-10C22,6.475,17.521,1.998,12,1.998z M7.757,16.244V9.171l7.071,7.073H7.757z M16.242,14.83l-7.07-7.073h7.07V14.83z",
  	"dlg-collapse": "M12,1.998c-5.523,0-10,4.477-10,10c0,5.523,4.477,10,10,10c5.522,0,10-4.477,10-10C22,6.475,17.521,1.998,12,1.998z M11.646,19.428l-7.07-7.073h7.07V19.428z M12.354,11.645V4.572l7.07,7.072H12.354z"
  };

  let UISvgIcon = class UISvgIcon {
      constructor() {
          this.icon = "";
          this.class = "";
          this.viewBox = "0 0 24 24";
          this.iconPath = "";
      }
      bind() {
          this.iconChanged();
      }
      iconChanged() {
          this.iconPath = Icons[this.icon];
          if (!this.iconPath) {
              this.iconPath = Icons.unknown;
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISvgIcon.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISvgIcon.prototype, "class", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UISvgIcon.prototype, "viewBox", void 0);
  UISvgIcon = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-svg-icon"),
      aureliaFramework.inlineView(`<template><svg ref="vmElement" slot="svg-icon" class="ui-icon ui-svg-icon \${class}" xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="\${viewBox}"><path d.bind="iconPath"></path></svg></template>`)
  ], UISvgIcon);

  const Icons$1 = [UIIcon, UIFlag, UISvgIcon, UIAvatar];

  var uiIcons = /*#__PURE__*/Object.freeze({
    Icons: Icons$1
  });

  let UICol = class UICol {
      constructor(element) {
          this.element = element;
          this.size = "";
          this.width = "unset";
          this.maxWidth = "unset";
          this.minWidth = "unset";
          this.align = "";
          if (element.hasAttribute("content-stretch")) {
              element.classList.add("content-stretch");
          }
      }
      get sizes() {
          return this.size
              .split(" ")
              .map(s => `ui-col--${s.trim()}`)
              .join(" ");
      }
      get classes() {
          const classes = ["ui-col"];
          if (this.align) {
              classes.push(`ui-col--${this.align}`);
          }
          if (this.size) {
              classes.push(this.sizes);
          }
          return classes.join(" ");
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICol.prototype, "size", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICol.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICol.prototype, "maxWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICol.prototype, "minWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICol.prototype, "align", void 0);
  __decorate([
      aureliaFramework.computedFrom("align", "size"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], UICol.prototype, "classes", null);
  UICol = __decorate([
      aureliaFramework.customElement("ui-col"),
      aureliaFramework.inlineView(`<template class.bind='classes' css.bind="{ width, maxWidth, minWidth}"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UICol);

  let UIContainer = class UIContainer {
      constructor(element) {
          this.element = element;
          if (element.hasAttribute("fluid")) {
              element.classList.add("ui-container--fluid");
          }
      }
  };
  UIContainer = __decorate([
      aureliaFramework.customElement("ui-container"),
      aureliaFramework.inlineView(`<template class='ui-container'><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIContainer);

  let UIGrid = class UIGrid {
      constructor(element) {
          this.element = element;
          this.size = "nm";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIGrid.prototype, "size", void 0);
  UIGrid = __decorate([
      aureliaFramework.customElement("ui-grid"),
      aureliaFramework.inlineView(`<template class='ui-grid ui-grid--\${size}'><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIGrid);

  let UIRow = class UIRow {
      constructor(element) {
          this.element = element;
          this.halign = "";
          this.valign = "";
          if (element.hasAttribute("vertical") && element.hasAttribute("reverse")) {
              element.classList.add("ui-row--vertical--reverse");
          }
          else if (element.hasAttribute("vertical")) {
              element.classList.add("ui-row--vertical");
          }
          else if (element.hasAttribute("reverse")) {
              element.classList.add("ui-row--reverse");
          }
          if (element.hasAttribute("nowrap")) {
              element.classList.add("ui-row--nowrap");
          }
          if (element.hasAttribute("auto")) {
              element.classList.add("ui-row--auto");
          }
      }
      get classes() {
          const classes = ["ui-row"];
          if (this.halign) {
              classes.push(`ui-row--${this.halign}`);
          }
          if (this.valign) {
              classes.push(`ui-row--${this.valign}`);
          }
          return classes.join(" ");
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIRow.prototype, "halign", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIRow.prototype, "valign", void 0);
  __decorate([
      aureliaFramework.computedFrom("halign", "valign"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], UIRow.prototype, "classes", null);
  UIRow = __decorate([
      aureliaFramework.customElement("ui-row"),
      aureliaFramework.inlineView(`<template class.bind='classes'><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIRow);

  const Responsive = [UIContainer, UIRow, UICol, UIGrid];

  var uiResponsive = /*#__PURE__*/Object.freeze({
    Responsive: Responsive
  });

  let UIDivider = class UIDivider {
  };
  UIDivider = __decorate([
      aureliaFramework.customElement("ui-divider"),
      aureliaFramework.inlineView("<template class='ui-divider'><slot></slot></template>")
  ], UIDivider);

  let UIDragHandle = class UIDragHandle {
      constructor(element) {
          this.element = element;
      }
      fireDragEvent($event, evt) {
          this.element.dispatchEvent(UIInternal.createEvent(evt));
          return true;
      }
  };
  UIDragHandle = __decorate([
      aureliaFramework.customElement("ui-drag-handle"),
      aureliaFramework.inlineView(`<template class="ui-drag-handle" ui-color="gray"
    mousedown.trigger="fireDragEvent($event,'dragstart')" click.trigger="fireDragEvent($event,'dragend')"><ui-svg-icon icon="drag"></ui-svg-icon></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIDragHandle);

  var UITether;
  (function (UITether) {
      function tether(anchorEl, dropdownEl, config = Config) {
          return attach(anchorEl, dropdownEl, Object.assign(Object.assign({}, Config), config));
      }
      UITether.tether = tether;
      const Config = {
          anchorPosition: "bl",
          attachToViewport: false,
          position: "tl",
          resize: true
      };
      const logger = aureliaLogging.getLogger("UITether");
      function updatePosition(anchorEl, dropdownEl, scrollerEl, config) {
          const anchorRect = anchorEl.getBoundingClientRect();
          const dropdownRect = dropdownEl.getBoundingClientRect();
          const scrollerRect = scrollerEl.getBoundingClientRect();
          if (config.resize !== false) {
              dropdownEl.style.minWidth = anchorRect.width + "px";
          }
          const [posY, posX] = config.position.split("");
          const [anchorY, anchorX] = config.anchorPosition.split("");
          const rtl = isRtl(scrollerEl);
          let x = 0;
          let y = 0;
          let clientHeight = document.body.clientHeight;
          let clientWidth = document.body.clientWidth;
          let clientX = 0;
          let clientY = 0;
          logger.debug("tether", {
              rtl,
              anchorRect,
              anchorX,
              anchorY,
              dropdownRect,
              posX,
              posY
          });
          if (!config.attachToViewport) {
              clientHeight = scrollerRect.bottom;
              clientWidth = scrollerRect.right;
              clientX = scrollerRect.left;
              clientY = scrollerRect.top;
          }
          if (anchorX === (rtl ? "r" : "l")) {
              x = anchorRect.left;
          }
          else if (anchorX === (rtl ? "l" : "r")) {
              x = anchorRect.right;
          }
          else if (anchorX === "c") {
              x = anchorRect.left + anchorRect.width / 2;
          }
          if (anchorY === "t") {
              y = anchorRect.top;
          }
          else if (anchorY === "b") {
              y = anchorRect.bottom;
          }
          else if (anchorY === "c") {
              y = anchorRect.top + anchorRect.height / 2;
          }
          if (posX === (rtl ? "l" : "r")) {
              x -= dropdownRect.width;
          }
          if (posX === "c") {
              x -= dropdownRect.width / 2;
          }
          if (posY === "b") {
              y -= dropdownRect.height;
          }
          if (posY === "c") {
              y -= dropdownRect.height / 2;
          }
          logger.debug("tether2", { x, y });
          if (x + dropdownRect.width > clientWidth) {
              x = anchorRect.right - dropdownRect.width;
          }
          else if (x < clientX) {
              x = anchorRect.left;
          }
          if (y + dropdownRect.height > clientHeight) {
              y =
                  posY === "t" && anchorY === "b" ? anchorRect.top - dropdownRect.height - 2 : anchorRect.bottom;
          }
          else if (y < clientY) {
              y =
                  posY === "b" && anchorY === "t" ? anchorRect.bottom - dropdownRect.height : anchorRect.top;
          }
          logger.debug("tether3", { x, y });
          if (!config.attachToViewport) {
              x -= scrollerRect.left - scrollerEl.scrollLeft + 2;
              y -= scrollerRect.top - scrollerEl.scrollTop + 1;
              logger.debug("tether4", { x, y });
              if (rtl && scrollerEl.scrollHeight > scrollerEl.offsetHeight) {
                  x -= 5;
              }
              logger.debug("tether5", { x, y });
          }
          dropdownEl.style.transform = `translate(${x}px, ${y}px)`;
      }
      function scrollHandler(scrollCallbacks = new Set()) {
          scrollCallbacks.forEach(c => c());
      }
      function getParentScroller(el) {
          const styles = ["scroll", "auto"];
          el = el.parentElement;
          do {
              const style = window.getComputedStyle(el);
              if (styles.includes(style.overflow) ||
                  styles.includes(style.overflowX) ||
                  styles.includes(style.overflowY)) {
                  return el;
              }
              el = el.parentElement;
          } while (el !== null);
          return null;
      }
      function initScroller(anchorEl, scrollCallback) {
          const scroller = getParentScroller(anchorEl) || document.body;
          if (!scroller.scrollHandler) {
              scroller.scrollHandler = () => scrollHandler(scroller.scrollCallbacks);
              scroller.addEventListener("scroll", scroller.scrollHandler);
              scroller.scrollCallbacks = new Set();
          }
          scroller.scrollCallbacks.add(scrollCallback);
          return scroller;
      }
      function attach(anchorEl, dropdownEl, config) {
          const container = aureliaFramework.Container.instance.get(UIAppConfig).FloatingContainer;
          config.attachToViewport ? container.appendChild(dropdownEl.parentElement || dropdownEl) : fn();
          let scroller;
          const scrollCallback = () => {
              if (dropdownEl.parentElement.dataset.open) {
                  updatePosition(anchorEl, dropdownEl, scroller, config);
              }
          };
          scroller = initScroller(anchorEl, scrollCallback);
          return {
              dispose: () => {
                  scroller.scrollCallbacks.delete(scrollCallback);
                  if (dropdownEl.parentElement === aureliaFramework.Container.instance.get(UIAppConfig).FloatingContainer) {
                      aureliaFramework.DOM.removeNode(dropdownEl);
                  }
                  else {
                      aureliaFramework.DOM.removeNode(dropdownEl.parentElement);
                  }
              },
              updatePosition: (newAnchorEl, newConfig = {}) => {
                  anchorEl = newAnchorEl || anchorEl;
                  scroller = initScroller(anchorEl, scrollCallback);
                  updatePosition(anchorEl, dropdownEl, scroller, Object.assign(Object.assign({}, config), newConfig));
              }
          };
      }
  })(UITether || (UITether = {}));

  let UIDrop = class UIDrop {
      constructor(element) {
          this.element = element;
          this.class = "";
          this.isOpen = false;
          this.stretch = true;
          this.closeOnClick = true;
          this.attachToViewport = false;
          this.position = element.getAttribute("position") || "tl";
          this.anchorPosition = element.getAttribute("anchor") || "bl";
          this.closeOnClick = !isFalse(element.getAttribute("close-on-click"));
          this.attachToViewport = element.hasAttribute("attach-to-viewport");
      }
      tether(anchorEl) {
          this.tetherObj = UITether.tether((this.anchorEl = anchorEl), this.vmElement, {
              anchorPosition: this.anchorPosition,
              attachToViewport: this.attachToViewport,
              position: this.position,
              resize: this.stretch
          });
      }
      updatePosition() {
          this.tetherObj.updatePosition();
      }
      toggleDrop(open) {
          this.disposeListeners();
          this.vmElement.dataset.show = "false";
          this.isOpen = open === undefined ? !this.isOpen : open;
          if (this.isOpen) {
              this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, t => this.canClose(t));
              this.obViewportResize = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_RESIZE, () => this.updatePosition());
              this.obResize = new ResizeObserver(() => this.updatePosition());
              this.obResize.observe(this.vmElement);
              this.obResize.observe(this.anchorEl);
              this.element.dispatchEvent(UIInternal.createEvent("open"));
              UIInternal.queueMicroTask(() => {
                  this.tetherObj.updatePosition();
                  this.vmElement.dataset.show = "true";
              });
          }
      }
      closeDrop() {
          UIInternal.queueTask(() => {
              this.isOpen = false;
              this.disposeListeners();
              this.element.dispatchEvent(UIInternal.createEvent("close"));
          });
      }
      disposeListeners() {
          if (this.obClick) {
              this.obClick.dispose();
          }
          if (this.obResize) {
              this.obResize.disconnect();
          }
          if (this.obViewportResize) {
              this.obViewportResize.dispose();
          }
      }
      detached() {
          this.disposeListeners();
          if (this.tetherObj) {
              this.tetherObj.dispose();
          }
      }
      close($event) {
          if (this.closeOnClick) {
              this.closeDrop();
          }
          else {
              $event.stopEvent(true);
          }
      }
      canClose(t) {
          if (!hasParent(t, this.vmElement) && !hasParent(t, this.anchorEl)) {
              this.closeDrop();
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDrop.prototype, "class", void 0);
  UIDrop = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-drop"),
      aureliaFramework.inlineView(`<template><div slot="ui-drop" class="ui-drop" click.delegate="closeDrop()" data-open.bind="isOpen">
  <div ref="vmElement" class="ui-drop__body \${class}" click.delegate="close($event)"><slot></slot></div>
  </div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIDrop);

  let UIFiller = class UIFiller {
  };
  UIFiller = __decorate([
      aureliaFramework.customElement("ui-filler"),
      aureliaFramework.inlineView("<template class='ui-col ui-col--fill'></template>")
  ], UIFiller);

  let UILoader = class UILoader {
      constructor() {
          this.busy = false;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UILoader.prototype, "busy", void 0);
  UILoader = __decorate([
      aureliaFramework.customElement("ui-loader"),
      aureliaFramework.inlineView(`<template><div ref="vmElement" class="ui-loader" if.bind="busy">
  <div><ui-svg-icon icon="loader" class="ui-anim--spin"></ui-svg-icon></div>
</div></template>`)
  ], UILoader);

  let UITextDivider = class UITextDivider {
  };
  UITextDivider = __decorate([
      aureliaFramework.customElement("ui-text-divider"),
      aureliaFramework.inlineView("<template><fieldset class='ui-text-divider'><legend ref='vmElement'><slot></slot></legend></fieldset></template>")
  ], UITextDivider);

  const Shared = [UIDivider, UIDrop, UIFiller, UILoader, UITextDivider, UIDragHandle];

  var uiShared = /*#__PURE__*/Object.freeze({
    Shared: Shared
  });

  let UIBadge = class UIBadge {
      constructor(element) {
          this.element = element;
          this.value = "";
          this.icon = "";
          this.theme = "";
          this.tooltip = "";
      }
      attached() {
          if (this.value || this.icon) {
              const vm = getViewModel(this.element);
              const view = UIInternal.compileTemplate(`<template><div class="ui-badge" ui-theme.bind="theme" ui-tooltip.bind="tooltip">
        <ui-icon icon.bind="icon" if.bind="icon"></ui-icon>\${value}
      </div></template>`, this);
              (vm ? (vm.badgeEl ? vm.badgeEl : vm.vmElement) : this.element).appendChild(view.fragment);
              view.attached();
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ primaryProperty: true }),
      __metadata("design:type", String)
  ], UIBadge.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIBadge.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIBadge.prototype, "theme", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIBadge.prototype, "tooltip", void 0);
  UIBadge = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-badge"),
      __metadata("design:paramtypes", [Element])
  ], UIBadge);

  let BaseAttribute = class BaseAttribute {
      constructor(element) {
          this.element = element;
          this.prefix = "";
          this.value = "default";
          this.oldValue = "default";
          this.singular = false;
      }
      bind() {
          this.toggleClass();
      }
      valueChanged() {
          this.toggleClass();
      }
      toggleClass() {
          let el = this.element;
          const vm = getViewModel(this.element);
          if (vm && vm.vmElement) {
              el = vm.vmElement;
          }
          if (el.classList) {
              if (this.oldValue && !this.singular) {
                  this.oldValue.split(" ").forEach(p => el.classList.remove(`${this.prefix}--${p.trim()}`));
              }
              else {
                  el.classList.remove(`${this.prefix}`);
              }
              this.oldValue = this.value;
              if (this.value && !this.singular) {
                  this.value.split(" ").forEach(p => el.classList.add(`${this.prefix}--${p.trim()}`));
              }
              else if (!isFalse(this.value)) {
                  el.classList.add(`${this.prefix}`);
              }
          }
      }
  };
  BaseAttribute = __decorate([
      aureliaFramework.autoinject(),
      __metadata("design:paramtypes", [Element])
  ], BaseAttribute);
  let UITheme = class UITheme extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-theme";
      }
  };
  UITheme = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-theme")
  ], UITheme);
  let UIBg = class UIBg extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-bg";
      }
  };
  UIBg = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-bg")
  ], UIBg);
  let UIColor = class UIColor extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-color";
      }
  };
  UIColor = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-color")
  ], UIColor);
  let UIHover = class UIHover extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-hover";
      }
  };
  UIHover = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-hover")
  ], UIHover);
  let UIShadow = class UIShadow extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-shadow";
      }
  };
  UIShadow = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-shadow")
  ], UIShadow);
  let UIPadding = class UIPadding extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-padding";
      }
  };
  UIPadding = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-padding")
  ], UIPadding);
  let UIMargin = class UIMargin extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-margin";
      }
  };
  UIMargin = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-margin")
  ], UIMargin);
  let UIBorder = class UIBorder extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-border";
      }
  };
  UIBorder = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-border")
  ], UIBorder);
  let UIFont = class UIFont extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-font";
      }
  };
  UIFont = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-font")
  ], UIFont);
  let UIWeight = class UIWeight extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-weight";
      }
  };
  UIWeight = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-weight")
  ], UIWeight);
  let UIText = class UIText extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-text";
      }
  };
  UIText = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-text")
  ], UIText);
  let UIAlign = class UIAlign extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-align";
      }
  };
  UIAlign = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-align")
  ], UIAlign);
  let UIGutter = class UIGutter extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-gutter";
      }
  };
  UIGutter = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-gutter")
  ], UIGutter);
  let UIHide = class UIHide extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-hide";
      }
  };
  UIHide = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-hide")
  ], UIHide);
  let UIShow = class UIShow extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-show";
      }
  };
  UIShow = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-show")
  ], UIShow);
  let UIClip = class UIClip extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-clip";
          this.singular = true;
      }
      bind() {
          super.bind();
          this.valueChanged();
      }
      valueChanged() {
          this.element.style.cssText = `--line-clamp: ${this.value};`;
      }
  };
  UIClip = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-clip")
  ], UIClip);
  let UILine = class UILine extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-line";
          this.singular = true;
      }
      bind() {
          super.bind();
          this.valueChanged();
      }
      valueChanged() {
          this.element.style.cssText = `line-height: ${this.value};`;
      }
  };
  UILine = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-line")
  ], UILine);
  let UIPaper = class UIPaper extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-paper";
          this.singular = true;
      }
  };
  UIPaper = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-paper")
  ], UIPaper);
  let UILink = class UILink extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-link";
          this.singular = true;
      }
  };
  UILink = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-link")
  ], UILink);
  let UIScroll = class UIScroll extends BaseAttribute {
      constructor() {
          super(...arguments);
          this.prefix = "ui-scroll";
      }
  };
  UIScroll = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-scroll")
  ], UIScroll);

  var Helpers = /*#__PURE__*/Object.freeze({
    get UITheme () { return UITheme; },
    get UIBg () { return UIBg; },
    get UIColor () { return UIColor; },
    get UIHover () { return UIHover; },
    get UIShadow () { return UIShadow; },
    get UIPadding () { return UIPadding; },
    get UIMargin () { return UIMargin; },
    get UIBorder () { return UIBorder; },
    get UIFont () { return UIFont; },
    get UIWeight () { return UIWeight; },
    get UIText () { return UIText; },
    get UIAlign () { return UIAlign; },
    get UIGutter () { return UIGutter; },
    get UIHide () { return UIHide; },
    get UIShow () { return UIShow; },
    get UIClip () { return UIClip; },
    get UILine () { return UILine; },
    get UIPaper () { return UIPaper; },
    get UILink () { return UILink; },
    get UIScroll () { return UIScroll; }
  });

  let TooltipEl;
  let seed = 0;
  let UITooltip = class UITooltip {
      constructor(element) {
          this.element = element;
          this.value = "";
          this.theme = "";
          this.position = "bottom";
          this.id = `tooltip-${seed++}`;
          this.showFn = () => this.show();
          this.hideFn = () => this.hide();
      }
      attached() {
          if (this.element.nodeType === Node.ELEMENT_NODE) {
              this.parentEl = this.element;
          }
          if (this.element.nodeType === Node.COMMENT_NODE) {
              this.parentEl = this.element.previousElementSibling;
          }
          if (!TooltipEl) {
              TooltipEl = document.createElement("div");
              TooltipEl.className = "ui-tooltip";
              TooltipEl.tether = UITether.tether(this.parentEl, TooltipEl, {
                  anchorPosition: "tc",
                  attachToViewport: true,
                  position: "bc",
                  resize: false
              });
          }
          this.parentEl.addEventListener("mouseenter", this.showFn);
          this.parentEl.addEventListener("mouseleave", this.hideFn);
      }
      detached() {
          this.hide();
          this.parentEl.removeEventListener("mouseenter", this.showFn);
          this.parentEl.removeEventListener("mouseleave", this.hideFn);
      }
      show() {
          if (isEmpty(this.value)) {
              return;
          }
          TooltipEl.className = `ui-tooltip ui-theme--${this.theme}`;
          TooltipEl.innerHTML = this.value;
          TooltipEl.dataset.id = this.id;
          TooltipEl.dataset.pos = this.position;
          let anchorPosition = "tc";
          let position = "bc";
          switch (this.position) {
              case "right":
                  anchorPosition = "cr";
                  position = "cl";
                  break;
              case "left":
                  anchorPosition = "cl";
                  position = "cr";
                  break;
              case "bottom":
                  anchorPosition = "bc";
                  position = "tc";
                  break;
          }
          TooltipEl.tether.updatePosition(this.parentEl, { position, anchorPosition });
          this.timer = setTimeout(() => (TooltipEl.dataset.open = "true"), 500);
      }
      hide() {
          clearTimeout(this.timer);
          TooltipEl.dataset.open = "false";
      }
      valueChanged() {
          if (TooltipEl && TooltipEl.dataset.open === "true" && TooltipEl.dataset.id === this.id) {
              this.show();
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ primaryProperty: true }),
      __metadata("design:type", Object)
  ], UITooltip.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITooltip.prototype, "theme", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITooltip.prototype, "position", void 0);
  UITooltip = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customAttribute("ui-tooltip"),
      __metadata("design:paramtypes", [Element])
  ], UITooltip);

  const Attributes = [UIBadge, UITooltip, ...Object.keys(Helpers).map(k => Helpers[k])];

  var uiAttributes = /*#__PURE__*/Object.freeze({
    Attributes: Attributes
  });

  let SplitValueConverter = class SplitValueConverter {
      toView(object, char = ",") {
          return (object || "").split(new RegExp(`[${char}]`));
      }
  };
  SplitValueConverter = __decorate([
      aureliaFramework.valueConverter("split")
  ], SplitValueConverter);
  let ObjectMapValueConverter = class ObjectMapValueConverter {
      toView(object) {
          if (isEmpty(object)) {
              return new Map();
          }
          const map = new Map();
          object.forEach((value, key) => map.set(key, value));
          return map;
      }
  };
  ObjectMapValueConverter = __decorate([
      aureliaFramework.valueConverter("objectMap")
  ], ObjectMapValueConverter);
  let GroupValueConverter = class GroupValueConverter {
      toView(array, property) {
          return array.groupBy(property);
      }
  };
  GroupValueConverter = __decorate([
      aureliaFramework.valueConverter("group")
  ], GroupValueConverter);
  let SliceValueConverter = class SliceValueConverter {
      toView(array, end = 0) {
          return end === 0 ? array : array.slice(0, end);
      }
  };
  SliceValueConverter = __decorate([
      aureliaFramework.valueConverter("slice")
  ], SliceValueConverter);
  let FilterValueConverter = class FilterValueConverter {
      toView(array, value, property) {
          if (isEmpty(array)) {
              return [];
          }
          if (isEmpty(value)) {
              return array;
          }
          if (array instanceof Map) {
              const map = new Map();
              array.forEach((v, k) => {
                  k.toString().includes(value) ||
                      (property
                          ? v[property].toString().includes(value.toString())
                          : v.toString().includes(value.toString()))
                      ? map.set(k, v)
                      : fn();
              });
              return map;
          }
          else {
              return array.filter(o => property
                  ? o[property].toString().includes(value.toString())
                  : o.toString().includes(value.toString()));
          }
      }
  };
  FilterValueConverter = __decorate([
      aureliaFramework.valueConverter("filter")
  ], FilterValueConverter);
  let OrderByValueConverter = class OrderByValueConverter {
      toView(array, property, isAscending = true) {
          if (isEmpty(array)) {
              return [];
          }
          let up = 1;
          let down = -1;
          if (!isAscending) {
              up = -1;
              down = 1;
          }
          if (array instanceof Map) {
              return new Map([...array].sort((a, b) => (a[0] > b[0] ? up : down)));
          }
          return [...array].sort((a, b) => (a[property] > b[property] ? up : down));
      }
  };
  OrderByValueConverter = __decorate([
      aureliaFramework.valueConverter("orderBy")
  ], OrderByValueConverter);
  let SortValueConverter = class SortValueConverter {
      toView(array, property, isAscending = true) {
          if (isEmpty(array)) {
              return [];
          }
          if (array instanceof Map) {
              return new Map([...array].sortBy("0", isAscending));
          }
          return [...array].sortBy(property, isAscending);
      }
  };
  SortValueConverter = __decorate([
      aureliaFramework.valueConverter("sort")
  ], SortValueConverter);

  const getPhone = (value = "", country = "us") => {
      const number = libphonenumberJs.parsePhoneNumberFromString(value || "", country);
      return number ? number : {
          country: "",
          formatNational: () => "",
          formatInternational: () => ""
      };
  };
  let JsonValueConverter = class JsonValueConverter {
      toView(value) {
          return JSON.stringify(value);
      }
  };
  JsonValueConverter = __decorate([
      aureliaFramework.valueConverter("json")
  ], JsonValueConverter);
  let MarkdownValueConverter = class MarkdownValueConverter {
      toView(value) {
          return exports.UIFormat.toHTML(value || "");
      }
  };
  MarkdownValueConverter = __decorate([
      aureliaFramework.valueConverter("md")
  ], MarkdownValueConverter);
  let PhoneValueConverter = class PhoneValueConverter {
      toView(value, country = "") {
          return getPhone(value, country).formatInternational();
      }
  };
  PhoneValueConverter = __decorate([
      aureliaFramework.valueConverter("phone")
  ], PhoneValueConverter);
  let PhoneLocalValueConverter = class PhoneLocalValueConverter {
      toView(value, country = "us") {
          return getPhone(value, country).formatNational();
      }
  };
  PhoneLocalValueConverter = __decorate([
      aureliaFramework.valueConverter("phoneLocal")
  ], PhoneLocalValueConverter);
  let PhoneHtmlValueConverter = class PhoneHtmlValueConverter {
      toView(value, country = "") {
          const phoneNumber = getPhone(value, country);
          return `<span class="ui-flag ${phoneNumber.country}"></span>&nbsp;${phoneNumber.formatInternational()}`;
      }
  };
  PhoneHtmlValueConverter = __decorate([
      aureliaFramework.valueConverter("phoneHtml")
  ], PhoneHtmlValueConverter);
  let PhoneLocalHtmlValueConverter = class PhoneLocalHtmlValueConverter {
      toView(value, country = "us") {
          const phoneNumber = getPhone(value, country);
          return `<span class="ui-flag ${phoneNumber.country}"></span>&nbsp;${phoneNumber.formatNational()}`;
      }
  };
  PhoneLocalHtmlValueConverter = __decorate([
      aureliaFramework.valueConverter("phoneLocalHtml")
  ], PhoneLocalHtmlValueConverter);
  let DateValueConverter = class DateValueConverter {
      toView(value, format) {
          return exports.UIFormat.date(value, format);
      }
  };
  DateValueConverter = __decorate([
      aureliaFramework.valueConverter("date")
  ], DateValueConverter);
  let TimeValueConverter = class TimeValueConverter {
      toView(value, format) {
          return exports.UIFormat.time(value, format);
      }
  };
  TimeValueConverter = __decorate([
      aureliaFramework.valueConverter("time")
  ], TimeValueConverter);
  let DatetimeValueConverter = class DatetimeValueConverter {
      toView(value, format) {
          return exports.UIFormat.datetime(value, format);
      }
  };
  DatetimeValueConverter = __decorate([
      aureliaFramework.valueConverter("datetime")
  ], DatetimeValueConverter);
  let FromNowValueConverter = class FromNowValueConverter {
      toView(value) {
          return exports.UIFormat.fromNow(value);
      }
  };
  FromNowValueConverter = __decorate([
      aureliaFramework.valueConverter("fromnow")
  ], FromNowValueConverter);
  let AgeValueConverter = class AgeValueConverter {
      toView(value) {
          return exports.UIFormat.age(value);
      }
  };
  AgeValueConverter = __decorate([
      aureliaFramework.valueConverter("age")
  ], AgeValueConverter);
  let UtcValueConverter = class UtcValueConverter {
      toView(value) {
          return exports.UIFormat.utcDate(value);
      }
  };
  UtcValueConverter = __decorate([
      aureliaFramework.valueConverter("utc")
  ], UtcValueConverter);
  let IsoValueConverter = class IsoValueConverter {
      toView(value) {
          return exports.UIFormat.dateToISO(value);
      }
  };
  IsoValueConverter = __decorate([
      aureliaFramework.valueConverter("iso")
  ], IsoValueConverter);
  let NumberValueConverter = class NumberValueConverter {
      toView(value, format) {
          return exports.UIFormat.number(value, format);
      }
  };
  NumberValueConverter = __decorate([
      aureliaFramework.valueConverter("number")
  ], NumberValueConverter);
  let CurrencyValueConverter = class CurrencyValueConverter {
      toView(value, symbol, format) {
          return exports.UIFormat.currency(value, symbol, format);
      }
  };
  CurrencyValueConverter = __decorate([
      aureliaFramework.valueConverter("currency")
  ], CurrencyValueConverter);
  let PercentValueConverter = class PercentValueConverter {
      toView(value) {
          return exports.UIFormat.percent(value);
      }
  };
  PercentValueConverter = __decorate([
      aureliaFramework.valueConverter("percent")
  ], PercentValueConverter);

  const ValueConverters = [
      FilterValueConverter,
      GroupValueConverter,
      ObjectMapValueConverter,
      SliceValueConverter,
      SortValueConverter,
      SplitValueConverter,
      OrderByValueConverter,
      AgeValueConverter,
      CurrencyValueConverter,
      DateValueConverter,
      DatetimeValueConverter,
      FromNowValueConverter,
      JsonValueConverter,
      MarkdownValueConverter,
      NumberValueConverter,
      PercentValueConverter,
      PhoneHtmlValueConverter,
      PhoneLocalHtmlValueConverter,
      PhoneLocalValueConverter,
      PhoneValueConverter,
      TimeValueConverter,
      UtcValueConverter,
      IsoValueConverter
  ];

  var valueConverters = /*#__PURE__*/Object.freeze({
    ValueConverters: ValueConverters
  });

  var view$1 = "<template class=\"ui-btn__wrapper\" data-disabled.bind=\"isDisabled\" data-busy.bind=\"busy\" data-type.bind=\"type\" data-size.bind=\"size\" data-active.bind=\"active\">\n  <div class=\"ui-btn__inner\">\n    <a ref=\"badgeEl\" class=\"ui-btn\" click.trigger=\"fireClick($event)\" data-active.bind=\"active\" data-open.bind=\"!split && dropEl.isOpen\">\n      <div class=\"ui-btn__icon\" if.bind=\"busy\">\n        <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      </div>\n      <slot name=\"svg-icon\"></slot>\n      <div class=\"ui-btn__icon\" if.bind=\"icon && !busy\">\n        <ui-icon icon.bind=\"icon\"></ui-icon>\n      </div>\n      <div class=\"ui-btn__label\"><slot>${label}</slot></div>\n      <div class=\"ui-btn__caret\" if.bind=\"hasDrop && !split\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </div>\n    </a>\n    <template if.bind=\"hasDrop && split\">\n      <div class=\"ui-btn__divider\"></div>\n      <a class=\"ui-btn ui-btn__caret ui-btn__caret--split\" data-open.bind=\"split && dropEl.isOpen\" click.trigger=\"toggleDrop()\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </a>\n    </template>\n  </div>\n  <slot name=\"ui-drop\">\n    <ui-drop view-model.ref=\"dropEl\" if.bind=\"menuItems\">\n      <ui-menu if.bind=\"dropEl.isOpen\" menu-items.bind=\"menuItems\"></ui-menu>\n    </ui-drop>\n  </slot>\n</template>\n";

  let UIButton = class UIButton {
      constructor(element) {
          this.element = element;
          this.icon = "";
          this.href = "";
          this.label = "";
          this.size = "nm";
          this.type = "default";
          this.id = "";
          this.busy = false;
          this.active = false;
          this.disabled = false;
          this.hasDrop = false;
          this.split = false;
          this.elDisabled = false;
          if (element.hasAttribute("icon-hilight")) {
              element.classList.add("ui-btn__icon--hilight");
          }
          if (element.hasAttribute("icon-end")) {
              element.classList.add("ui-btn__icon--end");
          }
          if (element.hasAttribute("icon-top")) {
              element.classList.add("ui-btn__icon--top");
          }
          if (element.hasAttribute("no-caret")) {
              element.classList.add("ui-btn__caret--hide");
          }
          if (element.hasAttribute("block")) {
              element.classList.add("ui-btn--block");
          }
          this.split = element.hasAttribute("split");
      }
      get isDisabled() {
          return this.disabled || this.elDisabled;
      }
      disable(disabled) {
          this.elDisabled = disabled;
      }
      attached() {
          UIInternal.queueTask(() => {
              this.hasDrop = !!this.elDropdown || !!this.dropEl;
              if (this.hasDrop) {
                  if (!this.dropEl) {
                      this.dropEl = getSlotViewModel(this.elDropdown);
                  }
                  this.dropEl.tether(this.element);
              }
          });
          this.hrefChanged();
      }
      hrefChanged() {
          if (this.badgeEl) {
              if (this.href) {
                  this.badgeEl.href = this.href;
              }
              else if (this.badgeEl.attributes.getNamedItem("href")) {
                  this.badgeEl.attributes.removeNamedItem("href");
              }
          }
      }
      fireClick($event) {
          if (this.isDisabled || this.busy) {
              $event.stopEvent();
              return false;
          }
          if (!this.href) {
              if (this.hasDrop && !this.split) {
                  return this.toggleDrop();
              }
              else {
                  $event.stopEvent();
                  return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
              }
          }
      }
      toggleDrop() {
          const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
          const afterEvent = this.dropEl.isOpen ? "close" : "open";
          if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
              this.dropEl.toggleDrop();
              this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
          }
          return true;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButton.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButton.prototype, "href", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButton.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButton.prototype, "size", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButton.prototype, "type", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButton.prototype, "id", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIButton.prototype, "busy", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIButton.prototype, "active", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIButton.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIButton.prototype, "menuItems", void 0);
  __decorate([
      aureliaFramework.child("div.ui-drop"),
      __metadata("design:type", Element)
  ], UIButton.prototype, "elDropdown", void 0);
  __decorate([
      aureliaFramework.computedFrom("disabled", "elDisabled"),
      __metadata("design:type", Boolean),
      __metadata("design:paramtypes", [])
  ], UIButton.prototype, "isDisabled", null);
  UIButton = __decorate([
      aureliaFramework.customElement("ui-button"),
      aureliaFramework.inlineView(view$1),
      __metadata("design:paramtypes", [Element])
  ], UIButton);

  let UIButtonGroup = class UIButtonGroup {
      constructor(element) {
          this.element = element;
          this.value = "";
          this.separator = "";
          this.size = "nm";
          this.type = "default";
          this.disabled = false;
          this.toggle = false;
          this.elDisabled = false;
          if (element.hasAttribute("equal")) {
              element.classList.add("ui-btn__group--equal");
          }
          if (element.hasAttribute("vertical")) {
              element.classList.add("ui-btn__group--vertical");
          }
          this.toggle = element.hasAttribute("toggle");
      }
      get isDisabled() {
          return this.disabled || this.elDisabled;
      }
      disable(disabled) {
          this.elDisabled = disabled;
      }
      attached() {
          if (this.separator) {
              this.element.classList.add("ui-btn__group--with-separator");
          }
          if (this.toggle) {
              UIInternal.queueTask(() => this.valueChanged(this.value, ""));
          }
      }
      buttonsChanged() {
          this.buttons.forEach(b => {
              b.element.dataset.separator = this.separator;
          });
      }
      valueChanged(newValue, oldValue) {
          if (this.buttons) {
              const btn = this.buttons.find(b => b.id === newValue);
              if (btn) {
                  if (this.currentSelected) {
                      this.currentSelected.active = false;
                  }
                  (this.currentSelected = btn).active = true;
              }
              else {
                  this.value = oldValue;
              }
          }
      }
      buttonClicked($event) {
          $event.stopEvent();
          if ($event.detail && this.toggle) {
              this.value = $event.detail;
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", String)
  ], UIButtonGroup.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButtonGroup.prototype, "separator", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButtonGroup.prototype, "size", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIButtonGroup.prototype, "type", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIButtonGroup.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.child("ui-button[data-active='true']"),
      __metadata("design:type", UIButton)
  ], UIButtonGroup.prototype, "currentSelected", void 0);
  __decorate([
      aureliaFramework.children("ui-button"),
      __metadata("design:type", Array)
  ], UIButtonGroup.prototype, "buttons", void 0);
  __decorate([
      aureliaFramework.computedFrom("disabled", "elDisabled"),
      __metadata("design:type", Boolean),
      __metadata("design:paramtypes", [])
  ], UIButtonGroup.prototype, "isDisabled", null);
  UIButtonGroup = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customElement("ui-button-group"),
      aureliaFramework.inlineView(`<template class="ui-btn__group" click.delegate="buttonClicked($event)" data-disabled.bind="isDisabled" data-size.bind="size" data-type.bind="type"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIButtonGroup);

  let UITag = class UITag {
      constructor(element) {
          this.element = element;
          this.id = "";
          this.label = "";
          this.icon = "";
          this.href = "";
          this.size = "nm";
          this.type = "normal";
          this.closeable = false;
          this.style = "normal";
      }
      close() {
          UIInternal.fireCallbackEvent(this, "beforeclose", this.id).then(b => b ? this.remove() : undefined);
      }
      bind() {
          this.hrefChanged();
          this.closeable = !isFalse(this.closeable);
      }
      hrefChanged() {
          if (this.vmElement) {
              if (this.href) {
                  this.vmElement.href = this.href;
              }
              else if (this.vmElement.attributes.getNamedItem("href")) {
                  this.vmElement.attributes.removeNamedItem("href");
              }
          }
      }
      fireClick($event) {
          if (!this.href) {
              $event.stopEvent();
              return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
          }
      }
      remove() {
          this.element.dispatchEvent(UIInternal.createEvent("close", this.id));
          UIInternal.queueTask(() => aureliaFramework.DOM.removeNode(this.vmElement));
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITag.prototype, "id", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITag.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITag.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITag.prototype, "href", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITag.prototype, "size", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITag.prototype, "type", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UITag.prototype, "closeable", void 0);
  UITag = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-tag"),
      aureliaFramework.inlineView(`<template><a class="ui-tag ui-tag--\${type} ui-tag--\${size}" click.delegate="fireClick($event)" ref="vmElement">
    <div class="ui-tag__label">\${label}</div>
    <div class="ui-tag__icon"><slot name="avatar"><ui-icon if.bind="icon" icon.bind="icon"></ui-icon></slot></div>
    <div class="ui-tag__value"><slot></slot></div>
    <div class="ui-tag__close" if.bind="closeable" click.trigger="[$event.stopEvent(), close()]">&times;</div>
  </a></template>`),
      __metadata("design:paramtypes", [Element])
  ], UITag);

  const Buttons = [UIButton, UIButtonGroup, UITag];

  var uiButtons = /*#__PURE__*/Object.freeze({
    Buttons: Buttons
  });

  var view$2 = "<template class=\"ui-calendar__header\">\n  <a class=\"ui-calendar__tool first\" data-tool=\"first\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.firstDisabled\" ui-tooltip.bind=\"config.firstTooltip\"><ui-svg-icon icon=\"page-first\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool prev\" data-tool=\"prev\" data-disabled.bind=\"config.prevDisabled\" ui-tooltip.bind=\"config.prevTooltip\"><ui-svg-icon icon=\"page-previous\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__title\" data-tool=\"title\"><slot></slot></a>\n  <a class=\"ui-calendar__tool next\" data-tool=\"next\" data-disabled.bind=\"config.nextDisabled\" ui-tooltip.bind=\"config.nextTooltip\"><ui-svg-icon icon=\"page-next\"></ui-svg-icon></a>\n  <a class=\"ui-calendar__tool last\" data-tool=\"last\" if.bind=\"showFirstLast\" data-disabled.bind=\"config.lastDisabled\" ui-tooltip.bind=\"config.lastTooltip\"><ui-svg-icon icon=\"page-last\"></ui-svg-icon></a>\n</template>\n";

  let CalendarHead = class CalendarHead {
      constructor() {
          this.showFirstLast = false;
          this.config = {};
      }
  };
  CalendarHead.TITLE = "title";
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], CalendarHead.prototype, "showFirstLast", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], CalendarHead.prototype, "config", void 0);
  CalendarHead = __decorate([
      aureliaFramework.customElement("calendar-head"),
      aureliaFramework.inlineView(view$2)
  ], CalendarHead);

  var CALENDAR_VIEWS;
  (function (CALENDAR_VIEWS) {
      CALENDAR_VIEWS[CALENDAR_VIEWS["DAYS"] = 0] = "DAYS";
      CALENDAR_VIEWS[CALENDAR_VIEWS["MONTHS"] = 1] = "MONTHS";
      CALENDAR_VIEWS[CALENDAR_VIEWS["YEARS"] = 2] = "YEARS";
      CALENDAR_VIEWS[CALENDAR_VIEWS["DECADES"] = 3] = "DECADES";
  })(CALENDAR_VIEWS || (CALENDAR_VIEWS = {}));
  var CALENDAR_NAVIGATION;
  (function (CALENDAR_NAVIGATION) {
      CALENDAR_NAVIGATION["FIRST"] = "first";
      CALENDAR_NAVIGATION["LAST"] = "last";
      CALENDAR_NAVIGATION["PREV"] = "prev";
      CALENDAR_NAVIGATION["NEXT"] = "next";
  })(CALENDAR_NAVIGATION || (CALENDAR_NAVIGATION = {}));
  var CALENDAR_GRAIN;
  (function (CALENDAR_GRAIN) {
      CALENDAR_GRAIN["DAY"] = "$day";
      CALENDAR_GRAIN["WEEK"] = "$week";
      CALENDAR_GRAIN["MONTH"] = "$month";
      CALENDAR_GRAIN["YEAR"] = "$year";
  })(CALENDAR_GRAIN || (CALENDAR_GRAIN = {}));
  const parseDate = (date) => {
      if (isString(date)) {
          const dt = dateFns.startOfMinute(new Date());
          if (date.startsWith(CALENDAR_GRAIN.DAY)) {
              return dateFns.addDays(dt, parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
          }
          else if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
              return dateFns.addWeeks(dt, parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10));
          }
          else if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
              return dateFns.addMonths(dt, parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10));
          }
          else if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
              return dateFns.addYears(dt, parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10));
          }
          else {
              return dateFns.parseISO(date);
          }
      }
      else if (date) {
          return date;
      }
      return null;
  };
  const parseRange = (date) => {
      if (isString(date)) {
          const before = date.includes("-");
          if (date.startsWith(CALENDAR_GRAIN.DAY)) {
              const today = dateFns.startOfDay(new Date());
              const diff = dateFns.addDays(new Date(), parseInt(date.replace(CALENDAR_GRAIN.DAY, "") || "0", 10));
              return before ? [diff, today] : [today, diff];
          }
          if (date.startsWith(CALENDAR_GRAIN.WEEK)) {
              const start = dateFns.startOfWeek(new Date());
              const end = dateFns.endOfWeek(new Date());
              const diff = parseInt(date.replace(CALENDAR_GRAIN.WEEK, "") || "0", 10);
              return [dateFns.addWeeks(start, diff), dateFns.addWeeks(end, diff)];
          }
          if (date.startsWith(CALENDAR_GRAIN.MONTH)) {
              const start = dateFns.startOfMonth(new Date());
              const end = dateFns.endOfMonth(new Date());
              const diff = parseInt(date.replace(CALENDAR_GRAIN.MONTH, "") || "0", 10);
              return [dateFns.addMonths(start, diff), dateFns.addMonths(end, diff)];
          }
          if (date.startsWith(CALENDAR_GRAIN.YEAR)) {
              const start = dateFns.startOfYear(new Date());
              const end = dateFns.endOfYear(new Date());
              const diff = parseInt(date.replace(CALENDAR_GRAIN.YEAR, "") || "0", 10);
              return [dateFns.addYears(start, diff), dateFns.addYears(end, diff)];
          }
      }
      else if (isArray(date)) {
          return [dateFns.parseISO(date[0]), dateFns.parseISO(date[1])];
      }
      return null;
  };
  const getTitle = (month, view) => {
      if (view === CALENDAR_VIEWS.DAYS) {
          return dateFns.format(month, "MMMM yyyy");
      }
      if (view === CALENDAR_VIEWS.MONTHS) {
          return dateFns.format(month, "yyyy");
      }
      if (view === CALENDAR_VIEWS.YEARS) {
          return dateFns.format(dateFns.startOfDecade(month), "yyyy") + "-" + dateFns.format(dateFns.endOfDecade(month), "yyyy");
      }
      return "-";
  };
  const changeMonth = (month, view, grain) => {
      if (view === CALENDAR_VIEWS.DAYS) {
          switch (grain) {
              case CALENDAR_NAVIGATION.FIRST:
                  return dateFns.addMonths(month, -12);
              case CALENDAR_NAVIGATION.LAST:
                  return dateFns.addMonths(month, 12);
              case CALENDAR_NAVIGATION.PREV:
                  return dateFns.addMonths(month, -1);
              case CALENDAR_NAVIGATION.NEXT:
                  return dateFns.addMonths(month, 1);
          }
      }
      if (view === CALENDAR_VIEWS.MONTHS) {
          switch (grain) {
              case CALENDAR_NAVIGATION.PREV:
                  return dateFns.addYears(month, -1);
              case CALENDAR_NAVIGATION.NEXT:
                  return dateFns.addYears(month, 1);
          }
      }
      if (view === CALENDAR_VIEWS.YEARS) {
          switch (grain) {
              case CALENDAR_NAVIGATION.PREV:
                  return dateFns.addYears(month, -10);
              case CALENDAR_NAVIGATION.NEXT:
                  return dateFns.addYears(month, 10);
          }
      }
      return month;
  };
  const buildHeaderConfig = (month, view, config) => {
      if (view === CALENDAR_VIEWS.DAYS) {
          return {
              firstDisabled: isBeforeMin(month, dateFns.startOfYear(config.minDate), -12),
              lastDisabled: isAfterMax(month, dateFns.endOfYear(config.maxDate), 12),
              prevDisabled: isBeforeMin(month, dateFns.startOfMonth(config.minDate), -1),
              nextDisabled: isAfterMax(month, dateFns.endOfMonth(config.maxDate), 1),
              firstTooltip: dateFns.format(dateFns.addMonths(month, -12), "MMM yyyy"),
              lastTooltip: dateFns.format(dateFns.addMonths(month, 12), "MMM yyyy"),
              prevTooltip: dateFns.format(dateFns.addMonths(month, -1), "MMM yyyy"),
              nextTooltip: dateFns.format(dateFns.addMonths(month, 1), "MMM yyyy")
          };
      }
      if (view === CALENDAR_VIEWS.MONTHS) {
          return {
              prevDisabled: isBeforeMin(month, dateFns.startOfYear(config.minDate), -12),
              nextDisabled: isAfterMax(month, dateFns.endOfYear(config.maxDate), 12),
              prevTooltip: dateFns.format(dateFns.addYears(month, -1), "yyyy"),
              nextTooltip: dateFns.format(dateFns.addYears(month, 1), "yyyy")
          };
      }
      if (view === CALENDAR_VIEWS.YEARS) {
          const start = dateFns.startOfDecade(month);
          const end = dateFns.endOfDecade(month);
          return {
              prevDisabled: isBeforeMin(month, dateFns.startOfDecade(config.minDate), -120),
              nextDisabled: isAfterMax(month, dateFns.endOfDecade(config.maxDate), 120),
              prevTooltip: dateFns.format(dateFns.addYears(start, -10), "yyyy") + "-" + dateFns.format(dateFns.addYears(start, -1), "yyyy"),
              nextTooltip: dateFns.format(dateFns.addYears(end, 1), "yyyy") + "-" + dateFns.format(dateFns.addYears(end, 10), "yyyy")
          };
      }
  };
  const isBeforeMin = (month, minDate, n = 0) => {
      return dateFns.isValid(minDate) ? dateFns.isBefore(dateFns.addMonths(dateFns.startOfDay(month), n), dateFns.startOfDay(minDate)) : false;
  };
  const isAfterMax = (month, maxDate, n = 0) => {
      return dateFns.isValid(maxDate) ? dateFns.isAfter(dateFns.addMonths(dateFns.startOfDay(month), n), dateFns.startOfDay(maxDate)) : false;
  };
  const isDisabled = (config, date) => {
      let min = config.minDate;
      let max = config.maxDate;
      if (config.page === CALENDAR_VIEWS.DAYS) {
          min = dateFns.startOfDay(min);
          max = dateFns.startOfDay(max);
      }
      if (config.page === CALENDAR_VIEWS.MONTHS) {
          min = dateFns.startOfMonth(dateFns.startOfDay(min));
          max = dateFns.endOfMonth(dateFns.startOfDay(max));
      }
      if (config.page === CALENDAR_VIEWS.YEARS) {
          min = dateFns.startOfYear(dateFns.startOfDay(min));
          max = dateFns.startOfYear(dateFns.startOfDay(max));
      }
      if (dateFns.isBefore(date, min)) {
          return true;
      }
      if (dateFns.isAfter(date, max)) {
          return true;
      }
      if (config.page === CALENDAR_VIEWS.DAYS && config.disabled) {
          const { disabled } = config;
          if (isArray(disabled)) {
              return disabled.includes(dateFns.startOfDay(date).toISOString());
          }
          else if (isFunction(disabled)) {
              return disabled({ date });
          }
      }
      return false;
  };

  var view$3 = "<template data-page=\"days\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <span class=\"ui-calendar__page__head\">#</span>\n      <span class=\"ui-calendar__page__head\" repeat.for=\"w of 7\">${weekTitle(w)}</span>\n    </div>\n    <div class=\"ui-calendar__page__row\" repeat.for=\"w of 6\">\n      <span class=\"ui-calendar__page__cell week\">${weekNumber(w, month)}</span>\n      <a repeat.for=\"d of 7\" with.bind=\"getDate(w, d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell date ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

  let DaysPage = class DaysPage {
      constructor() {
          this.isAttached = false;
      }
      attached() {
          this.isAttached = true;
      }
      monthChanged(newMonth) {
          this.month = newMonth || new Date();
          const start = dateFns.startOfMonth(this.month);
          this.pageStart = dateFns.startOfWeek(dateFns.startOfMonth(this.month));
          if (dateFns.getDay(start) < 3) {
              this.pageStart = dateFns.addWeeks(this.pageStart, -1);
          }
      }
      weekTitle(week) {
          return dateFns.format(dateFns.setDay(new Date(), week), "E").substr(0, 2);
      }
      weekNumber(week) {
          return dateFns.format(dateFns.addWeeks(this.pageStart, week), "ww");
      }
      getDate(week, day) {
          const date = dateFns.addDays(dateFns.addWeeks(this.pageStart, week), day);
          const classes = [];
          if (!dateFns.isSameMonth(this.month, date)) {
              classes.push("date-other");
          }
          if (dateFns.isSameDay(new Date(), date)) {
              classes.push("date-today");
          }
          if (this.config) {
              if (isArray(this.config.date)) {
                  if (dateFns.isAfter(dateFns.startOfDay(date), this.config.date[0]) &&
                      dateFns.isBefore(dateFns.endOfDay(date), this.config.date[1])) {
                      classes.push("select-hilight");
                  }
                  if (dateFns.isSameDay(date, this.config.date[0])) {
                      classes.push("select-start");
                  }
                  if (dateFns.isSameDay(date, this.config.date[1])) {
                      classes.push("select-end");
                  }
              }
              if (isDate(this.config.date) && dateFns.isSameDay(date, this.config.date)) {
                  classes.push("selected");
              }
              if (isDisabled(this.config, date)) {
                  classes.push("disabled");
              }
          }
          return { date, label: dateFns.format(date, "dd"), classes: classes.join(" ") };
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Date)
  ], DaysPage.prototype, "month", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], DaysPage.prototype, "config", void 0);
  DaysPage = __decorate([
      aureliaFramework.customElement("days-page"),
      aureliaFramework.inlineView(view$3)
  ], DaysPage);

  var view$4 = "<template data-page=\"months\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getMonth(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell month ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

  let MonthsPage = class MonthsPage {
      constructor() {
          this.isAttached = false;
      }
      attached() {
          this.isAttached = true;
      }
      getMonth(month) {
          const date = dateFns.setMonth(this.month, month);
          const classes = [];
          if (this.config) {
              if (isDate(this.config.date) && dateFns.isSameMonth(date, this.config.date)) {
                  classes.push("selected");
              }
              if (isDisabled(Object.assign({ disabled: [] }, this.config), date)) {
                  classes.push("disabled");
              }
          }
          return { date, label: dateFns.format(date, "MMM"), classes: classes.join(" ") };
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Date)
  ], MonthsPage.prototype, "month", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], MonthsPage.prototype, "config", void 0);
  MonthsPage = __decorate([
      aureliaFramework.customElement("months-page"),
      aureliaFramework.inlineView(view$4)
  ], MonthsPage);

  var view$5 = "<template data-page=\"time\" class=\"ui-calendar__clock\">\n  <ui-slider min=\"1\" max=\"12\" value.to-view=\"hour\" change.trigger=\"hour = $event.target.value & debounce\"></ui-slider>\n  <ui-slider min=\"0\" max=\"59\" value.to-view=\"minute\" change.trigger=\"minute = $event.target.value & debounce\"></ui-slider>\n\n  <div class=\"ui-calendar__clock__ampm\" data-value.bind=\"ampm\" click.trigger=\"switchAmpm()\">\n    <div></div>\n  </div>\n</template>\n";

  let TimePage = class TimePage {
      constructor(element) {
          this.element = element;
          this.time = new Date();
      }
      get hour() {
          const hr = dateFns.getHours(this.time);
          return `${hr === 0 || hr === 12 ? 12 : hr > 12 ? hr - 12 : hr}`;
      }
      set hour(hour) {
          const newHr = parseInt(hour === "12" ? "0" : hour, 10);
          const hr = dateFns.getHours(this.time);
          this.time = dateFns.setHours(this.time, hr < 12 ? newHr : newHr + 12);
          this.fireChange();
      }
      get minute() {
          return dateFns.getMinutes(this.time);
      }
      set minute(min) {
          this.time = dateFns.setMinutes(this.time, min);
          this.fireChange();
      }
      get ampm() {
          return dateFns.getHours(this.time) < 12 ? "am" : "pm";
      }
      switchAmpm() {
          const hr = dateFns.getHours(this.time);
          this.time = dateFns.setHours(this.time, hr < 12 ? hr + 12 : hr - 12);
          this.fireChange();
      }
      fireChange() {
          this.element.dispatchEvent(UIInternal.createEvent("change", this.time));
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Date)
  ], TimePage.prototype, "time", void 0);
  __decorate([
      aureliaFramework.computedFrom("time"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [String])
  ], TimePage.prototype, "hour", null);
  __decorate([
      aureliaFramework.computedFrom("time"),
      __metadata("design:type", Number),
      __metadata("design:paramtypes", [Number])
  ], TimePage.prototype, "minute", null);
  __decorate([
      aureliaFramework.computedFrom("time"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], TimePage.prototype, "ampm", null);
  TimePage = __decorate([
      aureliaFramework.customElement("time-page"),
      aureliaFramework.inlineView(view$5),
      __metadata("design:paramtypes", [Element])
  ], TimePage);

  var view$6 = "<template class=\"ui-calendar\">\n  <calendar-head click.delegate=\"headerClicked($event)\" config.bind=\"headerOptions\" show-first-last.bind=\"currentPage === VIEWS.DAYS\">${title}\n  </calendar-head>\n  <days-page if.bind=\"currentPage === VIEWS.DAYS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectDate($event)\"></days-page>\n  <months-page if.bind=\"currentPage === VIEWS.MONTHS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></months-page>\n  <years-page if.bind=\"currentPage === VIEWS.YEARS\" month.bind=\"month\" config.to-view=\"config\" click.delegate=\"selectMonth($event)\"></years-page>\n  <time-page time.bind=\"time\" change.trigger=\"timeChanged($event.detail)\"></time-page>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset === date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || currentPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

  var view$7 = "<template data-page=\"years\" class=\"ui-calendar__page\">\n  <template if.bind=\"isAttached\">\n    <div class=\"ui-calendar__page__row\">\n      <a repeat.for=\"d of 12\" with.bind=\"getYear(d, month, config)\" data-date.bind=\"date\" class=\"ui-calendar__page__cell year ${classes}\">${label}\n      </a>\n    </div>\n  </template>\n</template>\n";

  let YearsPage = class YearsPage {
      constructor() {
          this.isAttached = false;
      }
      attached() {
          this.isAttached = true;
      }
      monthChanged(newMonth) {
          this.month = newMonth || new Date();
          this.pageStart = dateFns.addYears(dateFns.startOfDecade(this.month), -1);
      }
      getYear(year) {
          const date = dateFns.addYears(this.pageStart, year);
          const classes = [];
          if (year === 0 || year === 11) {
              classes.push("date-other");
          }
          if (this.config) {
              if (isDate(this.config.date) && dateFns.isSameYear(date, this.config.date)) {
                  classes.push("selected");
              }
              if (isDisabled(Object.assign({ disabled: [] }, this.config), date)) {
                  classes.push("disabled");
              }
          }
          return { date, label: dateFns.format(date, "yyyy"), classes: classes.join(" ") };
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Date)
  ], YearsPage.prototype, "month", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], YearsPage.prototype, "config", void 0);
  YearsPage = __decorate([
      aureliaFramework.customElement("years-page"),
      aureliaFramework.inlineView(view$7)
  ], YearsPage);

  let UIDatePicker = class UIDatePicker {
      constructor() {
          this.format = "dd MMM yyyy HH:mm";
          this.datePresets = [];
          this.currentPage = CALENDAR_VIEWS.DAYS;
          this.month = dateFns.startOfMonth(new Date());
          this.time = dateFns.parseISO("2018-01-01T00:00:00.000");
          this.VIEWS = CALENDAR_VIEWS;
      }
      bind() {
          this.dateChanged();
      }
      dateChanged() {
          this.selectedDate = parseDate(this.date);
          if (dateFns.isValid(this.selectedDate)) {
              this.time = new Date(this.selectedDate);
              this.month = dateFns.startOfMonth(this.selectedDate);
              const preset = this.datePresets.find(p => p.preset === this.date);
              this.dateLabel = preset ? preset.label : exports.UIFormat.datetime(this.selectedDate, this.format);
          }
      }
      get config() {
          return {
              date: this.selectedDate,
              page: this.currentPage,
              minDate: parseDate(this.minDate),
              maxDate: parseDate(this.maxDate),
              disabled: this.disabledDatesList
          };
      }
      get title() {
          return getTitle(this.month, this.currentPage);
      }
      get headerOptions() {
          return buildHeaderConfig(this.month, this.currentPage, this.config);
      }
      get disabledDatesList() {
          if (isArray(this.disabledDates)) {
              return this.disabledDates.map(d => {
                  const dt = parseDate(d);
                  return !isEmpty(dt) ? dateFns.startOfDay(dt).toISOString() : null;
              });
          }
          return this.disabledDates;
      }
      headerClicked($event) {
          const target = $event.target;
          if (target.dataset.tool) {
              if (target.dataset.tool === CalendarHead.TITLE) {
                  if (this.currentPage !== CALENDAR_VIEWS.YEARS) {
                      this.currentPage++;
                  }
              }
              else {
                  this.month = changeMonth(this.month, this.currentPage, target.dataset.tool);
              }
          }
      }
      selectDate($event) {
          const target = $event.target;
          if (target.dataset.date) {
              this.updateDate(dateFns.startOfDay(new Date(target.dataset.date)));
          }
      }
      timeChanged(newTime) {
          this.updateDate(this.date ? parseDate(this.date) : new Date(), newTime);
      }
      selectMonth($event) {
          const target = $event.target;
          if (target.dataset.date) {
              this.month = new Date(target.dataset.date);
              this.currentPage--;
          }
      }
      cancelSelection() {
          this.currentPage = CALENDAR_VIEWS.DAYS;
      }
      selectPreset(preset) {
          this.cancelSelection();
          this.date = preset;
      }
      updateDate(dt, tm = this.time) {
          dt.setHours(tm.getHours());
          dt.setMinutes(tm.getMinutes());
          this.date = dt.toISOString();
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", String)
  ], UIDatePicker.prototype, "date", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDatePicker.prototype, "minDate", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDatePicker.prototype, "maxDate", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIDatePicker.prototype, "disabledDates", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDatePicker.prototype, "format", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIDatePicker.prototype, "datePresets", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.fromView }),
      __metadata("design:type", String)
  ], UIDatePicker.prototype, "dateLabel", void 0);
  __decorate([
      aureliaFramework.computedFrom("selectedDate", "currentPage", "minDate", "maxDate", "disabledDates"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIDatePicker.prototype, "config", null);
  __decorate([
      aureliaFramework.computedFrom("month", "currentPage"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], UIDatePicker.prototype, "title", null);
  __decorate([
      aureliaFramework.computedFrom("month", "currentPage", "minDate", "maxDate"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIDatePicker.prototype, "headerOptions", null);
  UIDatePicker = __decorate([
      aureliaFramework.customElement("ui-date-picker"),
      aureliaFramework.inlineView(view$6),
      aureliaFramework.viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
  ], UIDatePicker);

  var view$8 = "<template class=\"ui-calendar\">\n  <div class=\"ui-calendar__range\">\n    <div>\n      <calendar-head click.delegate=\"startHeaderClicked($event)\" config.bind=\"startHeaderOptions\" show-first-last.bind=\"startPage === VIEWS.DAYS\">${startTitle}\n      </calendar-head>\n      <days-page if.bind=\"startPage === VIEWS.DAYS\" month.bind=\"startMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"startPage === VIEWS.MONTHS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></months-page>\n      <years-page if.bind=\"startPage === VIEWS.YEARS\" month.bind=\"startMonth\" config.to-view=\"config\" click.delegate=\"selectStartMonth($event)\"></years-page>\n    </div>\n    <ui-divider></ui-divider>\n    <div>\n      <calendar-head click.delegate=\"endHeaderClicked($event)\" config.bind=\"endHeaderOptions\" show-first-last.bind=\"endPage === VIEWS.DAYS\">${endTitle}\n      </calendar-head>\n      <days-page if.bind=\"endPage === VIEWS.DAYS\" month.bind=\"endMonth\" config.to-view=\"config\" mouseover.delegate=\"hilightDate($event)\" click.delegate=\"selectDate($event)\"></days-page>\n      <months-page if.bind=\"endPage === VIEWS.MONTHS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></months-page>\n      <years-page if.bind=\"endPage === VIEWS.YEARS\" month.bind=\"endMonth\" config.to-view=\"config\" click.delegate=\"selectEndMonth($event)\"></years-page>\n    </div>\n  </div>\n  <div class=\"ui-calendar__footer\">\n    <div class=\"ui-calendar__tags\">\n      <a class=\"ui-calendar__tag\" repeat.for=\"preset of datePresets\" data-active.bind=\"preset.preset === date\" click.trigger=\"selectPreset(preset.preset)\">${preset.label}</a>\n    </div>\n    <a if.bind=\"selecting || startPage !== VIEWS.DAYS || endPage !== VIEWS.DAYS\" class=\"ui-calendar__tag cancel\" click.trigger=\"cancelSelection()\">Cancel</a>\n  </div>\n</template>\n";

  let UIRangePicker = class UIRangePicker {
      constructor() {
          this.format = "dd MMM yyyy";
          this.datePresets = [];
          this.startMonth = dateFns.startOfMonth(new Date());
          this.endMonth = dateFns.startOfMonth(dateFns.addMonths(new Date(), 1));
          this.startPage = CALENDAR_VIEWS.DAYS;
          this.endPage = CALENDAR_VIEWS.DAYS;
          this.VIEWS = CALENDAR_VIEWS;
      }
      bind() {
          this.dateChanged();
      }
      dateChanged() {
          this.selectedDate = parseRange(this.date);
          if (this.selectedDate) {
              this.startMonth = dateFns.startOfMonth(this.selectedDate[0]);
              this.endMonth = dateFns.startOfMonth(this.selectedDate[1]);
              const preset = this.datePresets.find(p => p.preset === this.date);
              this.dateLabel = preset
                  ? preset.label
                  : `${exports.UIFormat.date(this.selectedDate[0], this.format)} ~ ${exports.UIFormat.date(this.selectedDate[1], this.format)}`;
          }
      }
      get config() {
          return {
              date: this.selecting ? [this.selecting, this.hilight] : this.selectedDate,
              minDate: parseDate(this.minDate),
              maxDate: parseDate(this.maxDate),
              disabled: []
          };
      }
      get startTitle() {
          return getTitle(this.startMonth, this.startPage);
      }
      get endTitle() {
          return getTitle(this.endMonth, this.endPage);
      }
      get startHeaderOptions() {
          return buildHeaderConfig(this.startMonth, this.startPage, Object.assign(Object.assign({}, this.config), { page: this.startPage }));
      }
      get endHeaderOptions() {
          return buildHeaderConfig(this.endMonth, this.endPage, Object.assign(Object.assign({}, this.config), { page: this.endPage }));
      }
      startHeaderClicked($event) {
          const target = $event.target;
          if (target.dataset.tool) {
              if (target.dataset.tool === CalendarHead.TITLE) {
                  if (this.startPage !== CALENDAR_VIEWS.YEARS) {
                      this.startPage++;
                  }
              }
              else {
                  this.startMonth = changeMonth(this.startMonth, this.startPage, target.dataset.tool);
                  if (dateFns.isSameMonth(this.startMonth, this.endMonth) ||
                      dateFns.isAfter(this.startMonth, this.endMonth)) {
                      this.endMonth = dateFns.addMonths(this.startMonth, 1);
                  }
              }
          }
      }
      endHeaderClicked($event) {
          const target = $event.target;
          if (target.dataset.tool) {
              if (target.dataset.tool === CalendarHead.TITLE) {
                  if (this.endPage !== CALENDAR_VIEWS.YEARS) {
                      this.endPage++;
                  }
              }
              else {
                  this.endMonth = changeMonth(this.endMonth, this.endPage, target.dataset.tool);
                  if (dateFns.isSameMonth(this.startMonth, this.endMonth) ||
                      dateFns.isBefore(this.endMonth, this.startMonth)) {
                      this.startMonth = dateFns.addMonths(this.endMonth, -1);
                  }
              }
          }
      }
      selectDate($event) {
          const target = $event.target;
          if (target.dataset.date) {
              const date = new Date(target.dataset.date);
              if (this.selecting) {
                  this.date = dateFns.isBefore(date, this.selecting)
                      ? [dateFns.startOfDay(date).toISOString(), dateFns.endOfDay(this.selecting).toISOString()]
                      : [dateFns.startOfDay(this.selecting).toISOString(), dateFns.endOfDay(date).toISOString()];
                  this.selecting = null;
              }
              else {
                  this.selecting = date;
              }
          }
      }
      selectStartMonth($event) {
          const target = $event.target;
          if (target.dataset.date) {
              this.startMonth = new Date(target.dataset.date);
              this.startPage--;
              if (dateFns.isSameMonth(this.startMonth, this.endMonth) || dateFns.isAfter(this.startMonth, this.endMonth)) {
                  this.endMonth = dateFns.addMonths(this.startMonth, 1);
              }
          }
      }
      selectEndMonth($event) {
          const target = $event.target;
          if (target.dataset.date) {
              this.endMonth = new Date(target.dataset.date);
              this.endPage--;
              if (dateFns.isSameMonth(this.startMonth, this.endMonth) || dateFns.isBefore(this.endMonth, this.startMonth)) {
                  this.startMonth = dateFns.addMonths(this.endMonth, -1);
              }
          }
      }
      cancelSelection() {
          this.selecting = null;
          this.startPage = CALENDAR_VIEWS.DAYS;
          this.endPage = CALENDAR_VIEWS.DAYS;
      }
      hilightDate($event) {
          const target = $event.target;
          if (target.dataset.date) {
              this.hilight = new Date(target.dataset.date);
          }
      }
      selectPreset(preset) {
          this.cancelSelection();
          this.date = preset;
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIRangePicker.prototype, "date", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIRangePicker.prototype, "minDate", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIRangePicker.prototype, "maxDate", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIRangePicker.prototype, "format", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIRangePicker.prototype, "datePresets", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.fromView }),
      __metadata("design:type", String)
  ], UIRangePicker.prototype, "dateLabel", void 0);
  __decorate([
      aureliaFramework.computedFrom("selectedDate", "hilight", "selecting", "minDate", "maxDate", "disabledDates"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIRangePicker.prototype, "config", null);
  __decorate([
      aureliaFramework.computedFrom("startMonth", "startPage"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], UIRangePicker.prototype, "startTitle", null);
  __decorate([
      aureliaFramework.computedFrom("endMonth", "endPage"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], UIRangePicker.prototype, "endTitle", null);
  __decorate([
      aureliaFramework.computedFrom("startMonth", "startPage", "minDate", "maxDate"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIRangePicker.prototype, "startHeaderOptions", null);
  __decorate([
      aureliaFramework.computedFrom("endMonth", "endPage", "minDate", "maxDate"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIRangePicker.prototype, "endHeaderOptions", null);
  UIRangePicker = __decorate([
      aureliaFramework.customElement("ui-range-picker"),
      aureliaFramework.inlineView(view$8),
      aureliaFramework.viewResources(CalendarHead, DaysPage, MonthsPage, YearsPage, TimePage)
  ], UIRangePicker);

  const Calendar = [UIDatePicker, UIRangePicker];

  var uiCalendar = /*#__PURE__*/Object.freeze({
    Calendar: Calendar
  });

  let UICardContent = class UICardContent {
      constructor(element) {
          this.element = element;
          if (element.hasAttribute("fill")) {
              element.classList.add("ui-card__content--fill");
          }
      }
  };
  UICardContent = __decorate([
      aureliaFramework.customElement("ui-card-content"),
      aureliaFramework.inlineView("<template class='ui-card__content'><slot></slot></template>"),
      __metadata("design:paramtypes", [Element])
  ], UICardContent);

  let UICardList = class UICardList {
      constructor(element) {
          this.element = element;
      }
  };
  UICardList = __decorate([
      aureliaFramework.customElement("ui-card-list"),
      aureliaFramework.inlineView("<template class='ui-card__list'><slot></slot></template>"),
      __metadata("design:paramtypes", [Element])
  ], UICardList);

  let UICardMedia = class UICardMedia {
      constructor(element) {
          this.element = element;
          if (element.hasAttribute("top")) {
              element.classList.add("ui-card__media--top");
          }
      }
  };
  UICardMedia = __decorate([
      aureliaFramework.customElement("ui-card-media"),
      aureliaFramework.inlineView("<template class='ui-card__media'><slot></slot></template>"),
      __metadata("design:paramtypes", [Element])
  ], UICardMedia);

  let UICardMeta = class UICardMeta {
      constructor(element) {
          this.element = element;
      }
  };
  UICardMeta = __decorate([
      aureliaFramework.customElement("ui-card-meta"),
      aureliaFramework.inlineView("<template class='ui-card__meta'><slot></slot></template>"),
      __metadata("design:paramtypes", [Element])
  ], UICardMeta);

  let UICardTitle = class UICardTitle {
      constructor(element) {
          this.element = element;
      }
  };
  UICardTitle = __decorate([
      aureliaFramework.customElement("ui-card-title"),
      aureliaFramework.inlineView("<template class='ui-card__title'><slot></slot></template>"),
      __metadata("design:paramtypes", [Element])
  ], UICardTitle);

  let UICard = class UICard {
      constructor(element) {
          this.element = element;
          this.width = "";
          this.minWidth = "8rem";
          this.maxWidth = "100vw";
          this.height = "";
          this.minHeight = "unset";
          this.maxHeight = "100vh";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICard.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICard.prototype, "minWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICard.prototype, "maxWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICard.prototype, "height", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICard.prototype, "minHeight", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UICard.prototype, "maxHeight", void 0);
  UICard = __decorate([
      aureliaFramework.customElement("ui-card"),
      aureliaFramework.inlineView(`<template class='ui-panel-base ui-card' css.bind='{width, minWidth, maxWidth, height, minHeight, maxHeight}'>
<slot name="panel-header"></slot>
<div class="ui-card__body"><slot></slot></div>
<slot name="panel-footer"></slot>
</template>`),
      __metadata("design:paramtypes", [Element])
  ], UICard);
  const Card = [UICard, UICardContent, UICardMeta, UICardMedia, UICardList, UICardTitle];

  var uiCard = /*#__PURE__*/Object.freeze({
    Card: Card
  });

  let UIColumn = class UIColumn {
      constructor(element) {
          this.element = element;
          this.label = "";
          this.width = "250px";
          this.minWidth = "80px";
          this.maxWidth = "600px";
          this.type = "text";
          this.align = "start";
          this.locked = false;
          this.resizeable = false;
          this.sortable = false;
          this.noPadding = false;
          this.onDrag = $event => this.resize($event);
          this.onDragEnd = $event => this.stopResize($event);
          this.template = element.querySelector("template");
          this.sortable = element.hasAttribute("sortable");
          this.resizeable = element.hasAttribute("resizeable");
          this.noPadding = element.hasAttribute("no-padding");
      }
      get css() {
          return {
              width: this.width,
              minWidth: this.minWidth,
              maxWidth: this.maxWidth
          };
      }
      compileCell(el, record) {
          if (el) {
              el.innerHTML = "";
              const tpl = this.template
                  ? this.template.outerHTML
                  : `<template><span innerhtml.bind="$value"></span></template>`;
              const model = {
                  $record: record,
                  $value: this.processValue(record)
              };
              const view = UIInternal.compileTemplate(tpl, model, this.owningView.bindingContext);
              view.appendNodesTo(el);
              view.attached();
          }
          return true;
      }
      created(owningView) {
          this.owningView = owningView;
      }
      bind() {
          if (!this.template && !this.label) {
              this.label = this.element.innerHTML || "";
          }
      }
      startResize($event) {
          $event.stopEvent();
          this.startX = $event.x || $event.clientX;
          this.isResizing = true;
          this.isRtl = isRtl(this.element);
          document.addEventListener("mousemove", this.onDrag);
          document.addEventListener("mouseup", this.onDragEnd);
      }
      resize($event) {
          $event.stopEvent();
          const x = $event.x || $event.clientX;
          const diff = x - this.startX;
          const newWidth = convertToPx(this.width) + (diff * (this.isRtl ? -1 : 1));
          if (newWidth < convertToPx(this.maxWidth) && newWidth > convertToPx(this.minWidth)) {
              UIInternal.queueTask(() => {
                  this.width = newWidth + "px";
                  this.startX = x;
              });
          }
      }
      stopResize($event) {
          $event.stopEvent();
          this.isResizing = false;
          document.removeEventListener("mousemove", this.onDrag);
          document.removeEventListener("mouseup", this.onDragEnd);
      }
      processValue(record) {
          let value = record[this.dataId] || "";
          if (isFunction(this.value)) {
              value = this.value({ record, value });
          }
          if (isFunction(this.format)) {
              value = this.value({ record, value });
          }
          else {
              switch (this.type) {
                  case "date":
                      value = exports.UIFormat.date(value, this.format);
                      break;
                  case "time":
                      value = exports.UIFormat.time(value, this.format);
                      break;
                  case "datetime":
                      value = exports.UIFormat.datetime(value, this.format);
                      break;
                  case "number":
                      value = exports.UIFormat.number(value, this.format);
                      break;
                  case "currency":
                      value = exports.UIFormat.currency(value, this.format);
                      break;
              }
          }
          return value;
      }
  };
  __decorate([
      aureliaFramework.computedFrom("width", "minWidth", "maxWidth"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIColumn.prototype, "css", null);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIColumn.prototype, "dataId", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIColumn.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIColumn.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIColumn.prototype, "minWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIColumn.prototype, "maxWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIColumn.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIColumn.prototype, "format", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIColumn.prototype, "type", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIColumn.prototype, "align", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIColumn.prototype, "locked", void 0);
  UIColumn = __decorate([
      aureliaFramework.customElement("ui-column"),
      aureliaFramework.processContent(false),
      aureliaFramework.noView(),
      __metadata("design:paramtypes", [Element])
  ], UIColumn);

  class UIDataSource {
      constructor(dataOrApi, options = {}) {
          this.isPaginated = false;
          this.pageNo = 0;
          this.totalPages = 0;
          this.recordsPerPage = 50;
          this.sortByOrder = "asc";
          this.data = [];
          this.original = [];
          this.options = {
              rootProperty: "",
              dataProperty: "data",
              pageProperty: "pageno",
              countProperty: "total",
              sortProperty: "sortBy",
              orderProperty: "sortOrder",
              perPageProperty: "pageCount"
          };
          this.options = Object.assign(Object.assign({}, this.options), options);
          this.isPaginated = options.paginated;
          this.recordsPerPage = options.recordsPerPage || 50;
          this.sortByProperty = options.defaultSortProperty;
          this.sortByOrder = options.defaultSortOrder || "asc";
          if (isArray(dataOrApi)) {
              this.original = dataOrApi;
              this.performFilter();
          }
          else {
              this.apiSlug = dataOrApi;
          }
      }
      sortBy(property) {
          if (this.sortByProperty === property) {
              this.sortByOrder = this.sortByOrder === "asc" ? "desc" : "asc";
          }
          else {
              this.sortByProperty = property;
              this.sortByOrder = "asc";
          }
          this.performFilter();
      }
      performFilter() {
          let data = [...this.original];
          if (this.sortByProperty) {
              data = data.sortBy(this.sortByProperty, this.sortByOrder === "asc");
          }
          if (this.isPaginated) {
              this.totalPages = Math.ceil(data.length / this.recordsPerPage);
              data = data.splice(this.pageNo * this.recordsPerPage, this.recordsPerPage);
          }
          this.data = data;
      }
  }

  let BodyCell = class BodyCell {
      attached() {
          this.recordChanged();
          if (this.column.noPadding) {
              this.el.style.paddingTop = 0;
              this.el.style.paddingBottom = 0;
          }
      }
      recordChanged() {
          this.column.compileCell(this.el, this.record);
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", UIColumn)
  ], BodyCell.prototype, "column", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], BodyCell.prototype, "record", void 0);
  BodyCell = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.inlineView(`<template>
        <div class="ui-datagrid__cell" css.bind="column.css" data-resizing.bind="column.isResizing">
          <div class="ui-datagrid__cell__wrapper" ref="el" ui-align.bind="column.align"></div>
        </div>
      </template>`)
  ], BodyCell);

  let HeaderCell = class HeaderCell {
      constructor(element) {
          this.element = element;
      }
      fireSortEvent() {
          if (this.column.sortable) {
              this.element.dispatchEvent(UIInternal.createEvent("sort"));
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", UIColumn)
  ], HeaderCell.prototype, "column", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], HeaderCell.prototype, "sortBy", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], HeaderCell.prototype, "sortOrder", void 0);
  HeaderCell = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.inlineView(`<template>
        <div class="ui-datagrid__cell" css.bind="css" with.bind="column">
          <div class="ui-datagrid__cell__wrapper" innerhtml.bind="label"
            click.trigger="fireSortEvent()"></div>
          <div class="ui-datagrid__cell__sorter" 
            data-sort.bind="sortBy === dataId ? sortOrder : ''">
            <i if.bind="sortable"></i>
            <i if.bind="sortable"></i>
          </div>
          <div class="ui-datagrid__cell__resizer" if.bind="resizeable" mousedown.trigger="startResize($event)"></div>
        </div>
      </template>`),
      __metadata("design:paramtypes", [Element])
  ], HeaderCell);

  var view$9 = "<template class=\"ui-datagrid\">\n  <div show.bind=\"false\">\n    <slot></slot>\n  </div>\n\n  <div class=\"ui-datagrid__head\">\n    <div class=\"ui-datagrid__row\">\n      <div class=\"ui-datagrid__row__wrapper\">\n        <div class=\"ui-datagrid__row__locked--start\">\n          <div class=\"ui-datagrid__cell\" css.bind=\"{width: '42px'}\" if.bind=\"checkable\">\n            <div class=\"ui-datagrid__cell__wrapper\">\n              <ui-checkbox checked.to-view=\"selected.length === ds.data.length ? true : selected.length === 0 ? false : '__2__'\" change.trigger=\"toggleSelectionAll($event)\"></ui-checkbox>\n            </div>\n          </div>\n          <div class=\"ui-datagrid__cell\" css.bind=\"{width: '42px'}\" if.bind=\"showCounter\"></div>\n          <template repeat.for=\"col of columns | filter:'start':'locked'\">\n            <header-cell column.bind=\"col\" sort.trigger=\"ds.sortBy(col.dataId)\" sort-by.bind=\"ds.sortByProperty\" sort-order.bind=\"ds.sortByOrder\"></header-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__row__scrolling\">\n          <template repeat.for=\"col of columns | filter:false:'locked'\">\n            <header-cell column.bind=\"col\" sort.trigger=\"ds.sortBy(col.dataId)\" sort-by.bind=\"ds.sortByProperty\" sort-order.bind=\"ds.sortByOrder\"></header-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__cell ui-datagrid__cell--filler\"></div>\n        <div class=\"ui-datagrid__row__locked--end\">\n          <template repeat.for=\"col of columns | filter:'end':'locked'\">\n            <header-cell column.bind=\"col\" sort.trigger=\"ds.sortBy(col.dataId)\" sort-by.bind=\"ds.sortByProperty\" sort-order.bind=\"ds.sortByOrder\"></header-cell>\n          </template>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"ui-datagrid__body\" ref=\"dgBody\">\n    <div class=\"ui-datagrid__row ${$even ? 'ui-datagrid__row--even':'ui-datagrid__row--odd'}\" virtual-repeat.for=\"record of ds.data\">\n      <div class=\"ui-datagrid__row__wrapper ${selected.includes(record) ? 'ui-datagrid__row--selected' : ''}\">\n        <div class=\"ui-datagrid__row__locked--start\">\n          <div class=\"ui-datagrid__cell ui-datagrid__cell--head\" css.bind=\"{width: '42px'}\" if.bind=\"checkable\">\n            <div class=\"ui-datagrid__cell__wrapper\">\n              <ui-checkbox checked.to-view=\"selected.includes(record)\" change.trigger=\"toggleSelection($event, record)\"></ui-checkbox>\n            </div>\n          </div>\n          <div class=\"ui-datagrid__cell ui-datagrid__cell--head\" css.bind=\"{width: '42px'}\" if.bind=\"showCounter\">\n            <div class=\"ui-datagrid__cell__wrapper\">\n              <span css.bind=\"{fontSize:'.8em'}\">${$index + 1}</span>\n            </div>\n          </div>\n          <template repeat.for=\"col of columns | filter:'start':'locked'\">\n            <body-cell column.bind=\"col\" record.bind=\"record\"></body-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__row__scrolling\">\n          <template repeat.for=\"col of columns | filter:false:'locked'\">\n            <body-cell column.bind=\"col\" record.bind=\"record\"></body-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__cell ui-datagrid__cell--filler\"></div>\n        <div class=\"ui-datagrid__row__locked--end\">\n          <template repeat.for=\"col of columns | filter:'end':'locked'\">\n            <body-cell column.bind=\"col\" record.bind=\"record\"></body-cell>\n          </template>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"ui-datagrid__foot\"></div>\n</template>\n";

  let UIDataGrid = class UIDataGrid {
      constructor(element) {
          this.element = element;
          this.selected = [];
          this.showCounter = element.hasAttribute("counter");
      }
      attached() {
          this.checkable = this.checkable || this.element.hasAttribute("checkable");
      }
      dataSourceChanged() {
          if (isArray(this.dataSource)) {
              this.ds = new UIDataSource(this.dataSource);
          }
          if (this.dataSource instanceof UIDataSource) {
              this.ds = this.dataSource;
          }
      }
      toggleSelection($event, record) {
          if (!this.selected) {
              this.selected = [];
          }
          this.selected = $event.detail.checked
              ? [...this.selected, record]
              : this.selected.filter(r => r !== record);
      }
      toggleSelectionAll($event) {
          this.selected = this.selected.length === 0 ? [...this.ds.data] : [];
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIDataGrid.prototype, "dataSource", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIDataGrid.prototype, "checkable", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Array)
  ], UIDataGrid.prototype, "selected", void 0);
  __decorate([
      aureliaFramework.children("ui-column"),
      __metadata("design:type", Object)
  ], UIDataGrid.prototype, "columns", void 0);
  UIDataGrid = __decorate([
      aureliaFramework.customElement("ui-datagrid"),
      aureliaFramework.viewResources(HeaderCell, BodyCell),
      aureliaFramework.inlineView(view$9),
      __metadata("design:paramtypes", [Element])
  ], UIDataGrid);

  let UIDataCard = class UIDataCard {
      constructor(element) {
          this.element = element;
          this.open = false;
      }
      attached() {
          this.hrefChanged();
      }
      hrefChanged() {
          if (this.vmElement) {
              if (this.href) {
                  this.vmElement.href = this.href;
              }
              else if (this.element.hasAttribute("click.trigger")) {
                  this.vmElement.href = "javascript:;";
              }
              else if (this.vmElement.attributes.getNamedItem("href")) {
                  this.vmElement.attributes.removeNamedItem("href");
              }
          }
      }
      toggleExpand() {
          this.open = !this.open;
          if (this.open) {
              setTimeout(() => this.vmElement.scrollIntoView({ inline: "nearest" }), 500);
          }
      }
      fireClick($event) {
          if (hasParent($event.target, "ui-datalist__toolbox", "ui-datalist__card")) {
              $event.stopEvent();
              return false;
          }
          if (!this.href) {
              return this.element.dispatchEvent(UIInternal.createEvent("click"));
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDataCard.prototype, "href", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIDataCard.prototype, "actions", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIDataCard.prototype, "open", void 0);
  UIDataCard = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-data-card"),
      aureliaFramework.inlineView(`<template><a class="ui-datalist__card" ref="vmElement" data-open.bind="open" click.trigger="fireClick($event)">
  <slot name="panel-header"></slot>
  <slot></slot>
  <div class="ui-datalist__toolbox">
    <slot name="card-actions"></slot>
    <ui-button-group vertical if.bind="actions">
      <ui-button type="tool" no-caret>
        <ui-svg-icon icon="overflow"></ui-svg-icon>
        <ui-drop anchor="br" position="tr">
          <ui-menu menu-items.bind="actions"></ui-menu>
        </ui-drop>
      </ui-button>
      <ui-button type="tool" click.trigger="toggleExpand()">
        <ui-svg-icon icon="caret"></ui-svg-icon>
      </ui-button>
    </ui-button-group>
  </div>
  <slot name="panel-footer"></slot>
</a></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIDataCard);

  var view$a = "<template class=\"ui-datalist ui-scroll--y\">\n  <slot></slot>\n  <div class=\"ui-datalist__wrapper\">\n\n    <template repeat.for=\"record of dataSource\">\n      <div ref=\"el\" show.one-time=\"compileTemplate(el, record)\"></div>\n    </template>\n\n  </div>\n  <div class=\"ui-datalist__loader\" if.bind=\"isLoading\">\n    <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n  </div>\n</template>\n";

  let UIDataList = class UIDataList {
      constructor(element) {
          this.template = element.querySelector("template");
          if (element.hasAttribute("vertical")) {
              element.classList.add("ui-datalist--vertical");
          }
      }
      created(owningView) {
          this.owningView = owningView;
      }
      compileTemplate(el, record) {
          if (el) {
              const tpl = `<template>${this.template.innerHTML}</template>`;
              const model = {
                  $record: record
              };
              const tplView = UIInternal.compileTemplate(tpl, model, this.owningView.bindingContext);
              tplView.insertNodesBefore(el);
              tplView.attached();
              el.remove();
          }
          return true;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIDataList.prototype, "dataSource", void 0);
  UIDataList = __decorate([
      aureliaFramework.customElement("ui-data-list"),
      aureliaFramework.processContent(false),
      aureliaFramework.inlineView(view$a),
      __metadata("design:paramtypes", [Element])
  ], UIDataList);

  let UIDataTable = class UIDataTable {
  };
  UIDataTable = __decorate([
      aureliaFramework.customElement("ui-data-table"),
      aureliaFramework.inlineView(`<template class="ui-datalist__table"><slot></slot></template>`)
  ], UIDataTable);

  let NODE_ID = 0;
  class UITreeModel {
      constructor(children, maxNodes = 0) {
          this.maxNodes = maxNodes;
          this.children = [];
          this.nodes = [];
          this.children = children.map(child => new UITreeNode(child));
          this.nodes = this.getExpandedTree(this.children.sortBy("label"));
      }
      filter(query) {
          const filtered = this.filterNodes(this.children, query);
          this.nodes = this.getExpandedTree(filtered.sortBy("label"));
      }
      toggleExpand(index) {
          const node = this.nodes[index];
          node.expanded = !node.expanded;
          if (node.expanded) {
              const injectedChildren = this.getChildren(node);
              this.nodes = [
                  ...this.nodes.slice(0, index + 1),
                  ...injectedChildren,
                  ...this.nodes.slice(index + 1)
              ];
          }
          else {
              let lastIndex = this.nodes.lastIndex(node.id, "parentId");
              while (this.nodes[lastIndex].expanded) {
                  lastIndex = this.nodes.lastIndex(this.nodes[lastIndex].id, "parentId");
              }
              this.nodes = [...this.nodes.slice(0, index + 1), ...this.nodes.slice(lastIndex + 1)];
          }
      }
      toggleMore(index) {
          const node = this.nodes[index];
          node.showingMore = !node.showingMore;
          const parentIndex = this.nodes.index(node.parentId, "id");
          let injectedChildren = this.nodes[parentIndex].children.sortBy("label");
          if (!node.showingMore) {
              if (injectedChildren.length === 0) {
                  injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
              }
              if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                  injectedChildren = [...injectedChildren.slice(0, this.maxNodes)];
              }
          }
          this.nodes = [
              ...this.nodes.slice(0, parentIndex + 1),
              ...injectedChildren,
              this.nodes[index],
              ...this.nodes.slice(index + 1)
          ];
      }
      getChecked() {
          const checked = [];
          this.getCheckedNodes(this.children, checked);
          return checked;
      }
      getCheckedNodes(nodes, checked) {
          nodes.forEach(node => {
              if (node.checked === 1) {
                  checked.push(node);
              }
              if (node.children) {
                  this.getCheckedNodes(node.childNodes, checked);
              }
          });
      }
      getExpandedTree(children) {
          const nodes = [];
          children.forEach(child => {
              nodes.push(child);
              if (child.expanded) {
                  nodes.push(...this.getExpandedTree(this.getChildren(child)));
              }
          });
          return nodes;
      }
      filterNodes(nodes, query) {
          return nodes.filter(child => {
              let retVal = !query ||
                  child.label
                      .ascii()
                      .toLocaleLowerCase()
                      .includes(query.ascii().toLocaleLowerCase());
              if (!child.leaf) {
                  child.filtered = this.filterNodes(child.childNodes, query);
                  retVal = retVal || child.filtered.length > 0;
              }
              return retVal;
          });
      }
      getChildren(node) {
          let injectedChildren = node.children.sortBy("label");
          if (injectedChildren.length === 0) {
              injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
          }
          if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
              injectedChildren = [
                  ...injectedChildren.slice(0, this.maxNodes),
                  new UITreeNode({ id: "node-more", leaf: true }, node)
              ];
          }
          return injectedChildren;
      }
  }
  class UITreeNode {
      constructor(node, parent) {
          this.parent = parent;
          this.childNodes = [];
          this.filtered = null;
          this.level = 0;
          this.checked = 0;
          this.id = node.id || `node__${NODE_ID++}`;
          this.label = node.label;
          this.model = node.model;
          this.icon = node.icon;
          this.iconOpen = node.iconOpen;
          this.iconClosed = node.iconClosed;
          this.leaf = !!node.leaf;
          this.expanded = node.expanded;
          this.disabled = node.disabled;
          if (parent) {
              this.level = parent.level + 1;
              this.parentId = parent.id;
          }
          if (node.children) {
              this.childNodes = node.children.map(child => new UITreeNode(child, this));
          }
      }
      get nodeIcon() {
          return (this.leaf ? this.icon : this.expanded ? this.iconOpen : this.iconClosed) || this.icon;
      }
      get checkIcon() {
          return this.checked === 2
              ? "tree-check-half"
              : this.checked
                  ? "tree-check-on"
                  : "tree-check-off";
      }
      get expandIcon() {
          return this.expanded ? "tree-collapse" : "tree-expand";
      }
      get children() {
          return this.filtered || this.childNodes;
      }
      toggleCheck() {
          this.checked = this.checked ? 0 : 1;
          this.children.forEach((c) => {
              c.updateChild("checked", this.checked);
          });
          if (this.parent && this.parent.updatePartial) {
              this.parent.updatePartial();
          }
      }
      updatePartial() {
          const allChecked = this.children.every(node => node.checked === 1);
          const allUnchecked = this.children.every(node => node.checked === 0);
          this.checked = allChecked ? 1 : allUnchecked ? 0 : 2;
          if (this.parent && this.parent.updatePartial) {
              this.parent.updatePartial();
          }
      }
      updateChild(prop, v) {
          this[prop] = v;
          this.children.forEach((c) => {
              c.updateChild(prop, v);
          });
      }
  }
  __decorate([
      aureliaFramework.computedFrom("leaf", "icon", "expanded", "iconOpen", "iconClosed"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UITreeNode.prototype, "nodeIcon", null);
  __decorate([
      aureliaFramework.computedFrom("checked"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UITreeNode.prototype, "checkIcon", null);
  __decorate([
      aureliaFramework.computedFrom("expanded"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UITreeNode.prototype, "expandIcon", null);

  var view$b = "<template class=\"ui-tree__node ${isSelected ? 'ui-tree--selected':''}\">\n  <div class=\"ui-tree__spacer\" repeat.for=\"i of node.level\"></div>\n  <template if.bind=\"node.id !== 'node-more' && node.id !== 'node-empty'\">\n    <div class=\"ui-tree__expander\" click.trigger=\"tree.toggleExpand(index)\" if.bind=\"!node.leaf\">\n      <ui-svg-icon icon.bind=\"node.expandIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__checkbox\" click.trigger=\"tree.toggleCheck(node)\" if.bind=\"tree.checkable !== false && node.level >= tree.checkable\">\n      <ui-svg-icon icon.bind=\"node.checkIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__icon\">\n      <ui-svg-icon if.bind=\"node.loading\" icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      <ui-icon else class.bind=\"node.nodeIcon\"></ui-icon>\n    </div>\n    <div class=\"ui-tree__label\" click.trigger=\"tree.select(node)\">${node.label}</div>\n  </template>\n  <template if.bind=\"node.id === 'node-more'\">\n    <a class=\"ui-tree__show-more\" click.trigger=\"tree.toggleMore(index)\">\n      <span if.bind=\"node.showingMore\">${tree.labelLess}</span>\n      <span else>${tree.labelMore}</span>\n    </a>\n  </template>\n  <template if.bind=\"node.id === 'node-empty'\">\n    <div class=\"ui-tree__no-children\" ui-color=\"gray\">${tree.labelEmpty}</div>\n  </template>\n</template>\n";

  let TreeNode = class TreeNode {
      get isSelected() {
          return this.tree.value === this.node.id;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", UITreeNode)
  ], TreeNode.prototype, "node", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], TreeNode.prototype, "index", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", UITreePanel)
  ], TreeNode.prototype, "tree", void 0);
  __decorate([
      aureliaFramework.computedFrom("tree.value", "node.id"),
      __metadata("design:type", Boolean),
      __metadata("design:paramtypes", [])
  ], TreeNode.prototype, "isSelected", null);
  TreeNode = __decorate([
      aureliaFramework.inlineView(view$b)
  ], TreeNode);

  let UITreePanel = class UITreePanel {
      constructor(element) {
          this.element = element;
          this.value = undefined;
          this.model = undefined;
          this.labelSearch = "Search...";
          this.labelEmpty = "No Items";
          this.labelLess = "Show Less...";
          this.labelMore = "Show More...";
          this.checkable = false;
          this.searchable = false;
          this.checkable = element.hasAttribute("checkable");
          this.searchable = element.hasAttribute("searchable");
      }
      select(node) {
          if (this.checkable !== false) {
              if (node.level >= this.checkable) {
                  node.toggleCheck();
                  this.getCheckedValues();
                  this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
              }
          }
          else {
              return UIInternal.fireCallbackEvent(this, "beforeselect").then(b => b ? this.changeSelection(node) : false);
          }
      }
      bind() {
          this.rootNode = new UITreeModel(this.options, this.maxNodes);
      }
      optionsChanged() {
          this.rootNode = new UITreeModel(this.options, this.maxNodes);
      }
      toggleExpand(index) {
          this.rootNode.toggleExpand(index);
      }
      toggleMore(index) {
          this.rootNode.toggleMore(index);
      }
      toggleCheck(node) {
          node.toggleCheck();
          this.getCheckedValues();
          this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
      }
      getCheckedValues() {
          this.value = [];
          this.model = [];
          this.rootNode.getChecked().forEach(checkedNode => {
              if (checkedNode.level >= this.checkable) {
                  this.value.push(checkedNode.id);
                  this.model.push(checkedNode.model);
              }
          });
      }
      searchTextChanged(query) {
          this.rootNode.filter(query);
      }
      changeSelection(node) {
          this.value = node.id;
          this.model = node.model;
          this.element.dispatchEvent(UIInternal.createEvent("select", this.value));
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UITreePanel.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UITreePanel.prototype, "model", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UITreePanel.prototype, "options", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITreePanel.prototype, "labelSearch", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITreePanel.prototype, "labelEmpty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITreePanel.prototype, "labelLess", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITreePanel.prototype, "labelMore", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UITreePanel.prototype, "maxNodes", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITreePanel.prototype, "checkable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UITreePanel.prototype, "searchable", void 0);
  UITreePanel = __decorate([
      aureliaFramework.customElement("ui-tree-panel"),
      aureliaFramework.viewResources(TreeNode),
      aureliaFramework.inlineView(`<template class="ui-tree__panel"><ui-field nolabel class="ui-tree__search" if.bind="searchable">
  <ui-input type="search" placeholder="\${labelSearch}" value.bind="searchText" 
  clear.trigger="searchTextChanged()" input.trigger="searchTextChanged(searchText) & debounce:200">
    <ui-input-addon class="ui-text-muted"><ui-icon icon="mdi mdi-magnify"></ui-icon></ui-input-addon></ui-input></ui-field>
  <div class="ui-tree__container" nodeclick.delegate="itemClicked($event.detail)" nodeover.delegate="itemOver($event.detail)" nodeout.delegate="itemOut($event.detail)">
    <tree-node virtual-repeat.for="child of rootNode.nodes" node.bind="child" tree.bind="$parent" index.bind="$index"></tree-node>
  </div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UITreePanel);

  const DataPanels = [UITreePanel, UIDataGrid, UIColumn, UIDataList, UIDataCard, UIDataTable];

  var uiDataPanels = /*#__PURE__*/Object.freeze({
    DataPanels: DataPanels
  });

  var view$c = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" data-checked=\"${checked}\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"check-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"tree-check-half\"></ui-svg-icon>\n    <ui-svg-icon icon=\"check-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

  let UICheckbox = class UICheckbox {
      constructor(element) {
          this.element = element;
          this.disabled = false;
          this.isDisabled = false;
      }
      disable(b) {
          this.isDisabled = b;
      }
      bind() {
          if (this.checked === "true") {
              this.checked = true;
          }
      }
      checkChanged($event) {
          $event.stopPropagation();
          this.element.dispatchEvent(UIInternal.createEvent("change", this));
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UICheckbox.prototype, "checked", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UICheckbox.prototype, "model", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UICheckbox.prototype, "matcher", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UICheckbox.prototype, "disabled", void 0);
  UICheckbox = __decorate([
      aureliaFramework.customElement("ui-checkbox"),
      aureliaFramework.inlineView(view$c),
      __metadata("design:paramtypes", [Element])
  ], UICheckbox);

  let UIField = class UIField {
      constructor(element) {
          this.element = element;
          this.label = "";
          this.plain = false;
          this.required = false;
          this.disabled = false;
          this.width = "auto";
          if (element.hasAttribute("nolabel")) {
              element.classList.add("ui-field--nolabel");
          }
          if (element.hasAttribute("inline")) {
              element.classList.add("ui-field--inline");
          }
      }
      focus() {
          const el = this.element.querySelector("input, textarea");
          if (el !== null) {
              el.focus();
          }
      }
      get classes() {
          const classes = [];
          if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
              classes.push("ui-field--plain");
          }
          if (this.required === "" || this.required === "required" || isTrue(this.required)) {
              classes.push("ui-field--required");
          }
          return classes.join(" ");
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIField.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIField.prototype, "plain", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIField.prototype, "required", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIField.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIField.prototype, "width", void 0);
  __decorate([
      aureliaFramework.computedFrom("plain", "required"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], UIField.prototype, "classes", null);
  UIField = __decorate([
      aureliaFramework.customElement("ui-field"),
      aureliaFramework.inlineView(`<template aria-required.bind="required" aria-disabled.bind="disabled" class="ui-field \${classes}" css.bind="{width}">
<label class="ui-field__label" role="text" click.trigger="focus()">\${label}</label>
<slot></slot>
</template>`),
      __metadata("design:paramtypes", [Element])
  ], UIField);

  let UIFieldWrapper = class UIFieldWrapper {
      constructor() {
          this.plain = false;
      }
      get classes() {
          const classes = [];
          if (this.plain === "" || this.plain === "plain" || isTrue(this.plain)) {
              classes.push("ui-field__wrapper--plain");
          }
          return classes.join(" ");
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIFieldWrapper.prototype, "plain", void 0);
  __decorate([
      aureliaFramework.computedFrom("plain"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], UIFieldWrapper.prototype, "classes", null);
  UIFieldWrapper = __decorate([
      aureliaFramework.customElement("ui-field-wrapper"),
      aureliaFramework.inlineView(`<template class="ui-field__wrapper \${classes}">
  <slot></slot>
  </template>`)
  ], UIFieldWrapper);

  var view$d = "<template>\n  <fieldset class=\"ui-fieldset ${class}\" data-open.bind=\"!optional || checked\" ref=\"vmElement\">\n    <legend if.bind=\"label\">\n      <ui-checkbox if.bind=\"optional\" checked.bind=\"checked\">${label}</ui-checkbox>\n      <span if.bind=\"!optional\">${label}</span>\n    </legend>\n    <div class=\"ui-fieldset__body\">\n      <slot></slot>\n    </div>\n  </fieldset>\n</template>\n";

  let UIFieldset = class UIFieldset {
      constructor(element) {
          this.checked = false;
          this.label = "";
          this.class = "";
          this.disabled = false;
          this.fields = [];
          this.optional = false;
          this.optional = element.hasAttribute("optional");
      }
      bind() {
          this.optional = this.optional || !!this.checked;
      }
      attached() {
          UIInternal.queueTask(() => {
              this.fields = this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle");
              this.disabledChanged();
          });
      }
      disabledChanged() {
          this.fields.forEach(el => el.au.controller.viewModel.disable(!!this.disabled));
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Boolean)
  ], UIFieldset.prototype, "checked", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIFieldset.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIFieldset.prototype, "class", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIFieldset.prototype, "disabled", void 0);
  UIFieldset = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-fieldset"),
      aureliaFramework.inlineView(view$d),
      __metadata("design:paramtypes", [Element])
  ], UIFieldset);

  class BaseInput {
      constructor(element) {
          this.element = element;
          this.maxlength = 0;
          this.allowClear = false;
          this.showCounter = false;
          this.readonly = false;
          this.disabled = false;
          this.isDisabled = false;
          this.allowClear = element.hasAttribute("clear") || element.hasAttribute("clear.trigger");
          this.showCounter = element.hasAttribute("counter");
      }
      focus() {
          this.inputEl.focus();
      }
      disable(b) {
          this.isDisabled = b;
      }
      get classes() {
          const classes = [];
          if (this.errors && this.errors.length > 0) {
              classes.push("ui-input--invalid");
          }
          if (this.isTrue("readonly")) {
              classes.push("ui-input--readonly");
          }
          if (this.isTrue("disabled") || this.isDisabled) {
              classes.push("ui-input--disabled");
          }
          return classes.join(" ");
      }
      bind() {
          this.readonly = this.isTrue("readonly");
          this.disabled = this.isTrue("disabled");
      }
      clear() {
          this.value = "";
          this.inputEl.focus();
          this.element.dispatchEvent(UIInternal.createEvent("clear"));
          this.element.dispatchEvent(UIInternal.createEvent("change"));
      }
      fireEnter($event) {
          if ($event.keyCode === 13) {
              $event.stopEvent();
              this.element.dispatchEvent(UIInternal.createEvent("enterpressed", this.value));
          }
          return true;
      }
      canToggleDrop(evt) {
          if (evt.relatedTarget && evt.relatedTarget !== this.inputEl) {
              this.toggleDrop(false);
          }
      }
      toggleDrop(open) {
          if (open === true && this.dropEl.isOpen) {
              UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
              return;
          }
          const beforeEvent = this.dropEl.isOpen && !open ? "beforeclose" : "beforeopen";
          const afterEvent = this.dropEl.isOpen && !open ? "close" : "open";
          if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
              this.dropEl.toggleDrop(open);
              this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
              if (this.dropEl.isOpen) {
                  this.inputEl.select();
                  return true;
              }
              else {
                  return false;
              }
          }
      }
      isTrue(prop) {
          return this[prop] === "" || this[prop] === prop || isTrue(this[prop]);
      }
  }
  __decorate([
      aureliaFramework.computedFrom("isDisabled", "disabled", "readonly", "errors", "errors.length"),
      __metadata("design:type", String),
      __metadata("design:paramtypes", [])
  ], BaseInput.prototype, "classes", null);

  var view$e = "<template>\n  <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n    <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n    <ul>\n      <li repeat.for=\"err of errors\">${err.message || err}</li>\n    </ul>\n  </div>\n  <div class=\"ui-input__counter\" if.bind=\"showCounter && (value.length > 0 || maxlength > 0)\">\n    ${counter}\n  </div>\n  <div class=\"ui-input__clear\" if.bind=\"allowClear && value.length > 0\" click.trigger=\"clear()\">\n    <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n  </div>\n  <div class=\"ui-input__drop-handle\" if.bind=\"dropHandle\" click.trigger=\"toggleDrop()\">\n    <ui-svg-icon icon.bind=\"dropHandle\"></ui-svg-icon>\n  </div>\n  <slot></slot>\n</template>\n";

  let InputWrapper = class InputWrapper {
  };
  InputWrapper = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.inlineView(view$e),
      aureliaFramework.processContent((compiler, resources, node, instruction) => {
          instruction.inheritBindingContext = true;
          return true;
      })
  ], InputWrapper);

  var view$f = "<template class=\"ui-input ui-input-file ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <div ref=\"dropZone\" if.bind=\"maxFiles>1\" class=\"ui-input-file__dropzone ${dragging?'dragging':''}\" click.trigger=\"inputEl.click()\" dragover.trigger=\"dragEnter($event)\" dragleave.trigger=\"dragExit($event)\" drop.trigger=\"drop($event)\">\n      <ui-svg-icon icon=\"upload\"></ui-svg-icon>\n      <span>Drop files here<br>or click to browse</span>\n    </div>\n    <input type=\"file\" ref=\"inputEl\" role=\"file\" size=\"1\" change.trigger=\"fileChoose($event)\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n  <div class=\"ui-input-file__list\" if.bind=\"maxFiles>1\">\n    <div repeat.for=\"file of files\">\n      <a click.trigger=\"remove($index)\"><ui-svg-icon icon=\"cross\" ui-color=\"red\"></ui-svg-icon></a>\n      <label>${file.name}</label>\n      <span ui-color=\"muted\">(<small innerhtml.bind=\"file.size | number:'0.00b'\"></small>)</span>\n    </div>\n  </div>\n</template>\n";

  let UIFileInput = class UIFileInput extends BaseInput {
      constructor(element) {
          super(element);
          this.value = "";
          this.placeholder = "";
          this.maxFiles = 1;
          this.readonly = false;
          this.disabled = false;
          this.files = [];
          this.dragging = false;
      }
      attached() {
          this.files = [];
          this.inputEl.value = "";
          this.inputEl.draggedFiles = this.files;
      }
      dragEnter($event) {
          this.dragging = true;
          $event.preventDefault();
          return false;
      }
      dragExit() {
          this.dragging = false;
      }
      drop($event) {
          this.dragging = false;
          $event.preventDefault();
          this.mutateFiles($event.dataTransfer.files);
          return false;
      }
      fileChoose(evt) {
          evt.stopPropagation();
          this.mutateFiles(this.inputEl.files);
      }
      remove(index) {
          this.files.splice(index, 1);
          this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
      }
      mutateFiles(files) {
          for (const file of files) {
              const f = {
                  file,
                  name: file.name,
                  size: file.size || 0,
                  ext: file.type
              };
              if (this.files.length === this.maxFiles) {
                  this.files.splice(0, 1);
              }
              this.files.push(f);
          }
          this.element.dispatchEvent(UIInternal.createEvent("change", this.files.length));
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", String)
  ], UIFileInput.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIFileInput.prototype, "placeholder", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIFileInput.prototype, "errors", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UIFileInput.prototype, "maxFiles", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIFileInput.prototype, "readonly", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIFileInput.prototype, "disabled", void 0);
  UIFileInput = __decorate([
      aureliaFramework.customElement("ui-file"),
      aureliaFramework.viewResources(InputWrapper),
      aureliaFramework.inlineView(view$f),
      __metadata("design:paramtypes", [Element])
  ], UIFileInput);

  let UIForm = class UIForm {
      constructor(element) {
          this.element = element;
          this.disabled = false;
      }
      attached() {
          UIInternal.queueTask(() => {
              const el = this.vmElement.querySelector("[autofocus] input, [autofocus] textarea");
              if (el !== null) {
                  el.focus();
              }
              this.disabledChanged();
          });
      }
      disabledChanged() {
          if (this.vmElement) {
              const fields = this.vmElement.querySelectorAll("ui-input,ui-textarea,ui-button,ui-checkbox,ui-radio,ui-toggle,ui-select,ui-list,ui-date-input");
              fields.forEach(el => el.au.controller.viewModel.disable(!!this.disabled));
          }
      }
      fireSubmit() {
          this.element.dispatchEvent(UIInternal.createEvent("submit"));
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIForm.prototype, "disabled", void 0);
  UIForm = __decorate([
      aureliaFramework.customElement("ui-form"),
      aureliaFramework.inlineView(`<template class="ui-block"><form ref="vmElement" role="form" aria-disabled.bind="disabled" class="ui-form"
   enterpressed.delegate="fireSubmit($event)" validation-renderer="ui-validator"><slot></slot></form></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIForm);

  var view$g = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\" type.bind=\"type\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

  let UIInput = class UIInput extends BaseInput {
      constructor(element) {
          super(element);
          this.value = "";
          this.number = null;
          this.type = "text";
          this.placeholder = "";
          this.autocomplete = "";
          this.maxlength = 0;
          this.readonly = false;
          this.disabled = false;
          this.ignoreChange = false;
          if (element.hasAttribute("number") || element.hasAttribute("number.bind")) {
              this.type = "number";
          }
      }
      attached() {
          this.maxlengthChanged();
      }
      valueChanged() {
          if (!this.ignoreChange && this.type === "number") {
              this.ignoreChange = true;
              this.number = isNaN(this.value) ? null : parseFloat(this.value);
              UIInternal.queueTask(() => (this.ignoreChange = false));
          }
      }
      numberChanged() {
          if (!this.ignoreChange && this.type === "number") {
              this.ignoreChange = true;
              this.value = this.number.toString();
              UIInternal.queueTask(() => (this.ignoreChange = false));
          }
      }
      get counter() {
          if (this.maxlength) {
              return `${this.maxlength - (this.value ? this.value.length : 0)}`;
          }
          else {
              return `${this.value ? this.value.length : 0}`;
          }
      }
      maxlengthChanged() {
          if (this.inputEl) {
              this.inputEl.removeAttribute("maxLength");
              if (this.maxlength > 0) {
                  this.inputEl.maxLength = this.maxlength;
              }
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", String)
  ], UIInput.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Number)
  ], UIInput.prototype, "number", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIInput.prototype, "type", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIInput.prototype, "placeholder", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIInput.prototype, "autocomplete", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UIInput.prototype, "maxlength", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIInput.prototype, "errors", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIInput.prototype, "readonly", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIInput.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.computedFrom("value", "maxlength"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIInput.prototype, "counter", null);
  UIInput = __decorate([
      aureliaFramework.customElement("ui-input"),
      aureliaFramework.viewResources(InputWrapper),
      aureliaFramework.inlineView(view$g),
      __metadata("design:paramtypes", [Element])
  ], UIInput);

  var UIInputAddon_1;
  let UIInputAddon = UIInputAddon_1 = class UIInputAddon {
      constructor(element) {
          this.element = element;
          this.width = "auto";
          this.icon = "";
          if (element.hasAttribute("align-end")) {
              element.classList.add("ui-input__addon--end");
          }
      }
      focusInput() {
          try {
              let el = this.element;
              if (getViewModel(el.nextElementSibling) instanceof UIInputAddon_1) {
                  el = el.nextElementSibling;
              }
              const vm = getViewModel(el.nextElementSibling);
              if (vm instanceof BaseInput) {
                  vm.focus();
              }
              else if (el.nextElementSibling instanceof HTMLInputElement) {
                  el.nextElementSibling.focus();
              }
          }
          catch (e) {
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIInputAddon.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIInputAddon.prototype, "icon", void 0);
  UIInputAddon = UIInputAddon_1 = __decorate([
      aureliaFramework.customElement("ui-input-addon"),
      aureliaFramework.inlineView(`<template class="ui-input__addon" click.trigger="focusInput() & debounce:10" css.bind="{width}"><slot><ui-icon icon.bind="icon"></ui-icon></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIInputAddon);

  let UIInputInfo = class UIInputInfo {
      constructor(element) {
          this.element = element;
      }
  };
  UIInputInfo = __decorate([
      aureliaFramework.customElement("ui-input-info"),
      aureliaFramework.inlineView(`<template class="ui-input__info"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIInputInfo);

  var view$h = "<template class=\"ui-option\" data-disabled.bind=\"isDisabled || disabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"radio\" name.bind=\"name\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <ui-svg-icon icon=\"radio-off\"></ui-svg-icon>\n    <ui-svg-icon icon=\"radio-on\"></ui-svg-icon>\n    <span>\n      <slot></slot>\n    </span>\n  </label>\n</template>\n";

  let UIRadio = class UIRadio {
      constructor(element) {
          this.element = element;
          this.name = "optGroup";
          this.disabled = false;
          this.isDisabled = false;
      }
      disable(b) {
          this.isDisabled = b;
      }
      checkChanged($event) {
          $event.stopPropagation();
          this.element.dispatchEvent(UIInternal.createEvent("change", this));
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIRadio.prototype, "checked", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIRadio.prototype, "model", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneTime }),
      __metadata("design:type", String)
  ], UIRadio.prototype, "name", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIRadio.prototype, "matcher", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIRadio.prototype, "disabled", void 0);
  UIRadio = __decorate([
      aureliaFramework.customElement("ui-radio"),
      aureliaFramework.inlineView(view$h),
      __metadata("design:paramtypes", [Element])
  ], UIRadio);

  let UIOptionGroup = class UIOptionGroup {
      constructor() {
          this.value = false;
          this.name = "optGroup";
          this.disabled = false;
          this.options = [];
      }
      optionsChanged() {
          if (this.options !== null) {
              this.options.forEach(element => {
                  if (element instanceof UIRadio) {
                      element.name = this.name;
                  }
                  element.matcher = this.matcher;
              });
              this.valueChanged();
          }
      }
      checkChanged($event) {
          if (this.value !== false) {
              UIInternal.queueTask(() => {
                  this.value = $event.detail.checked;
              });
          }
      }
      disabledChanged() {
          this.options.forEach(el => el.disable(!!this.disabled));
      }
      valueChanged() {
          if (this.options && this.value !== false) {
              UIInternal.queueTask(() => {
                  this.options.forEach(element => (element.checked = this.value));
              });
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIOptionGroup.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIOptionGroup.prototype, "name", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIOptionGroup.prototype, "matcher", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIOptionGroup.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.children("ui-radio, ui-checkbox, ui-toggle"),
      __metadata("design:type", Array)
  ], UIOptionGroup.prototype, "options", void 0);
  UIOptionGroup = __decorate([
      aureliaFramework.customElement("ui-option-group"),
      aureliaFramework.inlineView(`<template class="ui-option__group \${disabled ? 'ui-option--disabled' : ''}" change.trigger="checkChanged($event)"><slot></slot></template>`)
  ], UIOptionGroup);

  let UIPasswordMeter = class UIPasswordMeter {
      constructor() {
          this.score = 0;
          this.hasPassword = false;
          this.tooltip = "";
          this.maxStrength = 4;
      }
      get strength() {
          if (this.hasPassword) {
              const s = (this.score / this.maxStrength) * 100;
              return { "--password-strength": `${s || 5}%` };
          }
          return { "--password-strength": 0 };
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UIPasswordMeter.prototype, "score", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIPasswordMeter.prototype, "hasPassword", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPasswordMeter.prototype, "tooltip", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UIPasswordMeter.prototype, "maxStrength", void 0);
  __decorate([
      aureliaFramework.computedFrom("score", "maxStrength", "hasPassword"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIPasswordMeter.prototype, "strength", null);
  UIPasswordMeter = __decorate([
      aureliaFramework.customElement("ui-password-meter"),
      aureliaFramework.inlineView(`<template class="ui-password-meter" css.bind="strength" ui-tooltip.bind="tooltip"></template>`)
  ], UIPasswordMeter);

  var view$i = "<template class=\"ui-input ui-phone ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <ui-input-addon>\n      <ui-flag code.bind=\"inputCountry\"></ui-flag>\n    </ui-input-addon>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"inputEl\" role=\"textbox\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" autocomplete.bind=\"autocomplete\" keypress.trigger=\"fireEnter($event)\">\n  </input-wrapper>\n</template>\n";

  let UIPhone = class UIPhone extends BaseInput {
      constructor(element) {
          super(element);
          this.value = "";
          this.type = "any";
          this.country = "";
          this.readonly = false;
          this.disabled = false;
          this.inputValue = "";
          this.inputCountry = "";
          this.placeholder = "";
          this.ignoreChange = false;
          this.showCounter = false;
      }
      attached() {
          this.countryChanged();
      }
      valueChanged() {
          if (!this.ignoreChange) {
              this.ignoreChange = true;
              this.update(this.value);
              UIInternal.queueTask(() => (this.ignoreChange = false));
          }
      }
      countryChanged() {
          this.inputCountry = this.country;
          const examplePhone = libphonenumberJs.getExampleNumber((this.country || "US"), examples);
          this.placeholder = !!this.country ? examplePhone.formatNational() : examplePhone.formatInternational();
      }
      inputValueChanged() {
          if (!this.ignoreChange) {
              this.ignoreChange = true;
              let val = `${this.inputValue}`;
              if (!this.country && val !== "" && !val.startsWith("+")) {
                  val = `+${val}`;
              }
              this.update(val);
              UIInternal.queueTask(() => (this.ignoreChange = false));
          }
      }
      update(value) {
          const newInput = new libphonenumberJs.AsYouType(this.country);
          this.inputValue = newInput.input(value);
          this.inputCountry = this.country || newInput.country;
          if (newInput.getNumber()) {
              this.value = newInput.getNumber().number.toString();
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", String)
  ], UIPhone.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPhone.prototype, "type", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPhone.prototype, "country", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIPhone.prototype, "errors", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIPhone.prototype, "readonly", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIPhone.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.observable(),
      __metadata("design:type", Object)
  ], UIPhone.prototype, "inputValue", void 0);
  UIPhone = __decorate([
      aureliaFramework.customElement("ui-phone"),
      aureliaFramework.viewResources(InputWrapper),
      aureliaFramework.inlineView(view$i),
      __metadata("design:paramtypes", [Element])
  ], UIPhone);

  let UISlider = class UISlider {
      constructor() {
          this.value = 0;
          this.min = 0;
          this.max = 100;
          this.step = 1;
          this.disabled = false;
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Number)
  ], UISlider.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UISlider.prototype, "min", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UISlider.prototype, "max", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UISlider.prototype, "step", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UISlider.prototype, "disabled", void 0);
  UISlider = __decorate([
      aureliaFramework.customElement("ui-slider"),
      aureliaFramework.inlineView(`<template class="ui-slider" css.bind="{'--slider-pos': (value-min)/(max-min)}">
<div class="ui-slider__bubble">\${value}</div>
<span class="ui-slider__min">\${min}</span>
<span class="ui-slider__max">\${max}</span>
<div class="ui-slider__bar">
  <input type="range" value.bind="value" step.bind="step" min.bind="min" max.bind="max" />
</div>
</template>`)
  ], UISlider);

  var view$j = "<template class=\"ui-input ui-input--textarea ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <textarea class=\"ui-input__control\" ref=\"inputEl\" role=\"textbox\" rows.bind=\"rows\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"value\"></textarea>\n  </input-wrapper>\n</template>\n";

  let UITextarea = class UITextarea extends BaseInput {
      constructor(element) {
          super(element);
          this.value = "";
          this.number = null;
          this.placeholder = "";
          this.rows = 4;
          this.maxlength = 0;
          this.readonly = false;
          this.disabled = false;
      }
      get counter() {
          if (this.maxlength) {
              return `${this.value ? this.value.length : 0} of ${this.maxlength}`;
          }
          else {
              return `${this.value ? this.value.length : 0}`;
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", String)
  ], UITextarea.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Number)
  ], UITextarea.prototype, "number", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITextarea.prototype, "placeholder", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UITextarea.prototype, "rows", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Number)
  ], UITextarea.prototype, "maxlength", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITextarea.prototype, "errors", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITextarea.prototype, "readonly", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITextarea.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.computedFrom("value", "maxlength"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UITextarea.prototype, "counter", null);
  UITextarea = __decorate([
      aureliaFramework.customElement("ui-textarea"),
      aureliaFramework.viewResources(InputWrapper),
      aureliaFramework.inlineView(view$j),
      __metadata("design:paramtypes", [Element])
  ], UITextarea);

  var view$k = "<template class=\"ui-option\" data-disabled.bind=\"disabled || isDisabled\">\n  <label class=\"ui-option__control\">\n    <input size=\"1\" type=\"checkbox\" checked.bind=\"checked\" model.bind=\"model\" matcher.bind=\"matcher\" disabled.bind=\"disabled\" change.trigger=\"checkChanged($event)\">\n    <div class=\"ui-option__toggle\" css.bind=\"{'--toggle-on': labelOn, '--toggle-off': labelOff, width}\"></div>\n    <span><slot></slot></span>\n  </label>\n</template>\n";

  let UIToggle = class UIToggle {
      constructor(element) {
          this.element = element;
          this.disabled = false;
          this.labelOn = "";
          this.labelOff = "";
          this.isDisabled = false;
      }
      disable(b) {
          this.isDisabled = b;
      }
      bind() {
          if (isTrue(this.checked)) {
              this.checked = true;
          }
      }
      checkChanged($event) {
          $event.stopPropagation();
          this.element.dispatchEvent(UIInternal.createEvent("change", this));
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIToggle.prototype, "checked", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIToggle.prototype, "model", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIToggle.prototype, "matcher", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIToggle.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIToggle.prototype, "labelOn", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIToggle.prototype, "labelOff", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIToggle.prototype, "width", void 0);
  UIToggle = __decorate([
      aureliaFramework.customElement("ui-toggle"),
      aureliaFramework.inlineView(view$k),
      __metadata("design:paramtypes", [Element])
  ], UIToggle);

  const Forms = [
      UICheckbox,
      UIField,
      UIFieldWrapper,
      UIFieldset,
      UIForm,
      UIInput,
      UIInputAddon,
      UIInputInfo,
      UIOptionGroup,
      UIPhone,
      UIRadio,
      UITextarea,
      UIToggle,
      UIPasswordMeter,
      UISlider,
      UIFileInput
  ];

  var uiForms = /*#__PURE__*/Object.freeze({
    Forms: Forms
  });

  var GridderUtils;
  (function (GridderUtils) {
      GridderUtils.minHeight = 100;
      let dropEl;
      let startX;
      let startY;
      let colSpan;
      let rowSpan;
      function startMove($event) {
          GridderUtils.dragEl = getParentByTag($event.target, "ui-gridder-cell");
          GridderUtils.dragEl.setAttribute("draggable", "true");
          if ($event.dataTransfer) {
              $event.dataTransfer.setData("text/plain", "drag");
          }
          GridderUtils.dragEl.style.zIndex = "2";
          GridderUtils.dragEl.style.opacity = "0.5";
          updateGhost(GridderUtils.dragEl);
          GridderUtils.dragEl.originalIndex = GridderUtils.cells.indexOf(getViewModel(GridderUtils.dragEl));
          return true;
      }
      GridderUtils.startMove = startMove;
      function move($event) {
          const current = getParentByTag($event.target, "ui-gridder-cell");
          current.setAttribute("draggable", "false");
          if (isTrue(current.dataset.allowDrop)) {
              $event.preventDefault();
              dropEl = current;
              updateGhost(dropEl);
          }
      }
      GridderUtils.move = move;
      function finishMove($event) {
          if (dropEl) {
              $event.preventDefault();
              if (dropEl !== GridderUtils.dragEl) {
                  const newIndex = GridderUtils.cells.indexOf(getViewModel(dropEl));
                  newIndex === GridderUtils.cells.length - 1
                      ? GridderUtils.dragEl.parentElement.appendChild(GridderUtils.dragEl)
                      : GridderUtils.dragEl.parentElement.insertBefore(GridderUtils.dragEl, newIndex > GridderUtils.dragEl.originalIndex ? dropEl.nextElementSibling : dropEl);
              }
          }
          GridderUtils.dragEl.style.zIndex = "unset";
          GridderUtils.dragEl.style.opacity = "1";
          GridderUtils.dragEl = null;
          dropEl = null;
      }
      GridderUtils.finishMove = finishMove;
      function startResize($event) {
          GridderUtils.dragEl = $event.target.parentElement;
          updateGhost(GridderUtils.dragEl);
          startX = $event.clientX || $event.x;
          startY = $event.clientY || $event.y;
          colSpan = parseInt(GridderUtils.dragEl.style.gridColumnEnd.replace("span ", ""), 10) || 1;
          rowSpan = parseInt(GridderUtils.dragEl.style.gridRowEnd.replace("span ", ""), 10) || 1;
          document.addEventListener("mousemove", resize);
          document.addEventListener("mouseup", stopResize);
      }
      GridderUtils.startResize = startResize;
      const resize = ($event) => {
          const x = $event.clientX || $event.x;
          const y = $event.clientY || $event.y;
          GridderUtils.ghost.style.width = GridderUtils.ghost.startWidth + (x - startX) + "px";
          GridderUtils.ghost.style.height = GridderUtils.ghost.startHeight + (y - startY) + "px";
          if (Math.round((x - startX) / GridderUtils.minWidth) > 0) {
              GridderUtils.dragEl.style.gridColumnEnd = `span ${colSpan + Math.round((x - startX) / GridderUtils.minWidth)}`;
          }
          else if (Math.round((startX - x) / GridderUtils.minWidth) > 0) {
              GridderUtils.dragEl.style.gridColumnEnd = `span ${colSpan - Math.round((startX - x) / GridderUtils.minWidth)}`;
          }
          else {
              GridderUtils.dragEl.style.gridColumnEnd = `span ${colSpan}`;
          }
          if (Math.round((y - startY) / GridderUtils.minHeight) > 0) {
              GridderUtils.dragEl.style.gridRowEnd = `span ${rowSpan + Math.round((y - startY) / GridderUtils.minHeight)}`;
          }
          else if (Math.round((startY - y) / GridderUtils.minHeight) > 0) {
              GridderUtils.dragEl.style.gridRowEnd = `span ${rowSpan - Math.round((startY - y) / GridderUtils.minHeight)}`;
          }
          else {
              GridderUtils.dragEl.style.gridRowEnd = `span ${rowSpan}`;
          }
          GridderUtils.ghost.style.top = GridderUtils.dragEl.offsetTop + "px";
          GridderUtils.ghost.style.left = GridderUtils.dragEl.offsetLeft + "px";
      };
      const stopResize = () => {
          GridderUtils.dragEl = null;
          document.removeEventListener("mousemove", resize);
          document.removeEventListener("mouseup", stopResize);
      };
      function updateGhost(el) {
          UIInternal.queueTask(() => {
              GridderUtils.ghost.startWidth = el.offsetWidth;
              GridderUtils.ghost.startHeight = el.offsetHeight;
              GridderUtils.ghost.style.top = el.offsetTop + "px";
              GridderUtils.ghost.style.left = el.offsetLeft + "px";
              GridderUtils.ghost.style.width = el.offsetWidth + "px";
              GridderUtils.ghost.style.height = el.offsetHeight + "px";
          });
      }
  })(GridderUtils || (GridderUtils = {}));

  class BasePanel {
      constructor() {
          this.pinned = false;
          this.expanded = false;
          this.collapsed = false;
          this.closeable = false;
          this.expandable = false;
          this.collapsible = false;
      }
      close() {
          return UIInternal.fireCallbackEvent(this, "beforeclose").then(b => (b ? this.remove() : false));
      }
      bind() {
          this.closeable = !isFalse(this.closeable);
          this.expandable = !isFalse(this.expandable);
          this.collapsible = !isFalse(this.collapsible);
      }
      toggleExpand(expand) {
          this.expanded = expand;
          this.element.dispatchEvent(UIInternal.createEvent("expand", this.expanded));
      }
      toggleCollapse(collapse) {
          this.collapsed = collapse;
      }
      remove() {
          this.element.dispatchEvent(UIInternal.createEvent("close"));
          UIInternal.queueTask(() => aureliaFramework.DOM.removeNode(this.element));
          return true;
      }
  }

  var view$l = "<template class=\"ui-gridder__cell\" data-allow-drop.bind=\"!pinned\" dragenter.trigger=\"utils.move($event)\">\n  <div ref=\"vmElement\" class=\"ui-panel-base ui-panel\" data-expanded.bind=\"expanded\">\n    <div class=\"ui-panel__header\" data-autohide.bind=\"autoHideHeader\">\n      <ui-drag-handle if.bind=\"moveable && !pinned\"></ui-drag-handle>\n      <ui-header>\n        <slot name=\"header-icon\">\n          <ui-header-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-header-icon>\n        </slot>\n        <ui-header-title if.bind=\"label\">${label}</ui-header-title>\n\n        <slot name=\"header-actions\"></slot>\n      </ui-header>\n      <div class=\"ui-panel__header__actions\" if.bind=\"closeable || expandable || pinnable\">\n        <ui-divider></ui-divider>\n        <template if.bind=\"pinnable\">\n          <ui-button type=\"tool\" click.trigger=\"togglePinned(!pinned)\" active.bind=\"pinned\">\n            <ui-svg-icon icon.bind=\"pinned?'pinned':'unpinned'\"></ui-svg-icon>\n          </ui-button>\n        </template>\n        <template if.bind=\"expandable\">\n          <ui-button type=\"tool\" click.trigger=\"toggleExpand(!expanded)\">\n            <ui-svg-icon icon.bind=\"expanded?'collapse':'expand'\"></ui-svg-icon>\n          </ui-button>\n        </template>\n        <template if.bind=\"closeable\">\n          <ui-button type=\"tool\" click.trigger=\"close()\">\n            <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n          </ui-button>\n        </template>\n      </div>\n    </div>\n    <div class=\"ui-panel__body\">\n      <slot></slot>\n    </div>\n    <slot name=\"panel-footer\"></slot>\n  </div>\n\n  <div if.bind=\"resizeable\" class=\"ui-gridder__resize\" mousedown.trigger=\"utils.startResize($event)\"></div>\n</template>\n";

  let UIGridderCell = class UIGridderCell extends BasePanel {
      constructor(element) {
          super();
          this.element = element;
          this.label = "";
          this.icon = "";
          this.pinned = false;
          this.expanded = false;
          this.closeable = false;
          this.expandable = false;
          this.moveable = false;
          this.pinnable = false;
          this.resizeable = false;
          this.autoHideHeader = false;
          this.utils = GridderUtils;
      }
      bind() {
          super.bind();
          this.moveable = !isFalse(this.moveable);
          this.pinnable = !isFalse(this.pinnable);
          this.resizeable = !isFalse(this.resizeable);
          this.autoHideHeader = !isFalse(this.autoHideHeader);
      }
      attached() {
          this.element.style.gridArea = `
    ${this.config.row || "auto"} / 
    ${this.config.col || "auto"} / 
    span ${this.config.rowSpan} / 
    span ${this.config.colSpan}`;
      }
      togglePinned(pinned) {
          this.pinned = pinned;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIGridderCell.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIGridderCell.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIGridderCell.prototype, "config", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "pinned", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "expanded", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "closeable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "expandable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "moveable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "pinnable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "resizeable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIGridderCell.prototype, "autoHideHeader", void 0);
  UIGridderCell = __decorate([
      aureliaFramework.customElement("ui-gridder-cell"),
      aureliaFramework.inlineView(view$l),
      __metadata("design:paramtypes", [Element])
  ], UIGridderCell);

  var view$m = "<template class=\"ui-gridder\">\n  <div class=\"ui-gridder__container\" dragstart.trigger=\"startDrag($event)\" dragend.trigger=\"stopDrag($event)\">\n    <slot></slot>\n\n    <div class=\"ui-gridder__ghost\" ref=\"ghost\" show.bind=\"!!utils.dragEl\"></div>\n\n    <div class=\"ui-gridder__overlay\" if.bind=\"!!utils.dragEl\">\n      <template repeat.for=\"row of utils.rowCount\">\n        <template repeat.for=\"col of utils.colCount\">\n          <div class=\"ui-gridder__cell\" data-row.bind=\"row\" data-col.bind=\"col\"></div> </template></template>\n    </div>\n  </div>\n</template>\n";

  let UIGridder = class UIGridder {
      constructor(element) {
          this.element = element;
          this.utils = GridderUtils;
      }
      created(owningView) {
          this.owningView = owningView;
      }
      attached() {
          GridderUtils.colCount = 12;
          GridderUtils.minWidth = Math.floor(this.element.offsetWidth / GridderUtils.colCount);
          GridderUtils.ghost = this.ghost;
      }
      cellsChanged() {
          UIInternal.queueTask(() => {
              GridderUtils.cells = this.cells;
              GridderUtils.rowCount = Math.floor(this.element.firstElementChild.offsetHeight / GridderUtils.minHeight);
          });
      }
      startDrag($event) {
          GridderUtils.startMove($event);
          return true;
      }
      stopDrag($event) {
          GridderUtils.finishMove($event);
          return true;
      }
  };
  __decorate([
      aureliaFramework.children("ui-gridder-cell"),
      __metadata("design:type", Object)
  ], UIGridder.prototype, "cells", void 0);
  UIGridder = __decorate([
      aureliaFramework.customElement("ui-gridder"),
      aureliaFramework.inlineView(view$m),
      __metadata("design:paramtypes", [Element])
  ], UIGridder);
  const Gridder = [UIGridder, UIGridderCell];

  var uiGridder = /*#__PURE__*/Object.freeze({
    Gridder: Gridder
  });

  var view$n = "<template class=\"ui-dropdown\">\n  <a data-active.bind=\"active\" disabled.bind=\"disabled\" click.trigger=\"toggleDrop($event)\" class=\"ui-dropdown__link\" data-open.bind=\"dropEl.isOpen\" data-disabled.bind=\"disabled\">\n    <ui-icon class=\"ui-dropdown__icon\" icon=\"${iconPrefix} ${model[iconProperty]}\" if.bind=\"iconProperty\"></ui-icon>\n    <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n      <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n      <ul>\n        <li repeat.for=\"err of errors\">${err}</li>\n      </ul>\n    </div>\n    <span class=\"ui-dropdown__label\">${selectedLabel}</span>\n    <ui-svg-icon class=\"ui-dropdown__caret\" icon=\"caret\"></ui-svg-icon>\n  </a>\n  <ui-drop view-model.ref=\"dropEl\" close-on-click=\"${!multiple}\">\n    <div>\n      <template repeat.for=\"option of options\">\n        <div class=\"ui-list__item ${(option[valueProperty] || option) === value?'ui-list__item--selected':''}\" click.trigger=\"select(option)\">\n          <ui-icon if.bind=\"iconProperty\" icon=\"${iconPrefix} ${option[iconProperty]}\"></ui-icon>\n          ${option[labelProperty] || option}\n        </div>\n      </template>\n    </div>\n  </ui-drop>\n</template>\n";

  let UIDropdown = class UIDropdown {
      constructor(element) {
          this.element = element;
          this.value = undefined;
          this.name = "";
          this.placeholder = "Select";
          this.labelProperty = "";
          this.valueProperty = "";
          this.iconProperty = "";
          this.iconPrefix = "";
          this.disabled = false;
          this.multiple = false;
          this.model = undefined;
      }
      attached() {
          this.dropEl.tether(this.element);
          this.valueChanged();
      }
      valueChanged() {
          if (this.options) {
              this.model = this.options.find(o => (o[this.valueProperty] || o) === this.value);
          }
      }
      select(model) {
          this.model = model;
          this.value = this.model[this.valueProperty] || this.model;
      }
      get selectedLabel() {
          return !isNull(this.model) ? this.model[this.labelProperty] || this.model : this.placeholder;
      }
      toggleDrop($event) {
          $event.stopEvent();
          const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
          const afterEvent = this.dropEl.isOpen ? "close" : "open";
          if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
              this.dropEl.toggleDrop();
              this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIDropdown.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIDropdown.prototype, "errors", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDropdown.prototype, "name", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDropdown.prototype, "placeholder", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDropdown.prototype, "labelProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDropdown.prototype, "valueProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDropdown.prototype, "iconProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDropdown.prototype, "iconPrefix", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIDropdown.prototype, "options", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIDropdown.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIDropdown.prototype, "multiple", void 0);
  __decorate([
      aureliaFramework.computedFrom("model"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIDropdown.prototype, "selectedLabel", null);
  UIDropdown = __decorate([
      aureliaFramework.customElement("ui-dropdown"),
      aureliaFramework.inlineView(view$n),
      __metadata("design:paramtypes", [Element])
  ], UIDropdown);

  var view$o = "<template>\n  <div if.bind=\"$parent.innerOptions\" mouseout.trigger=\"hilightIndex = -1\">\n    <template repeat.for=\"option of innerOptions\">\n      <div if.bind=\"option.__type==='group'\" class=\"ui-list__title\">${option.label}</div>\n      <div else class.bind=\"listClass(option, $index, value, hilightIndex)\" with.bind=\"{option}\" ref=\"__el\" mouseover.trigger=\"hilightIndex = $index\" show.one-time=\"buildOption(option, __el, !inputValue)\" click.trigger=\"selectOption(option)\" data-model.bind=\"option\"></div>\n    </template>\n  </div>\n  <div if.bind=\"isLoading\" ui-padding ui-align=\"center\" ui-font=\"lg\" ui-color=\"gray\">\n    <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n  </div>\n  <div if.bind=\"isLoaded && innerOptions.length === 0\" ui-padding ui-color=\"gray\" ui-font=\"sm\">\n    ${noOptionsText}\n  </div>\n</template>\n";

  let ListContainer = class ListContainer {
  };
  ListContainer = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.inlineView(view$o),
      aureliaFramework.processContent((compiler, resources, node, instruction) => {
          instruction.inheritBindingContext = true;
          return true;
      })
  ], ListContainer);

  var view$p = "<template>\n  <div class=\"ui-input__tags\" click.trigger=\"inputEl.focus()\">\n    <template if.bind=\"multiple\">\n      <div class=\"ui-tag\" repeat.for=\"m of model\">\n        <span with.bind=\"{m}\" show.one-time=\"buildOption(m, __el, true) & debounce\" ref=\"__el\"></span>\n        <span class=\"ui-tag__close\" click.trigger=\"removeOption(m)\">&#x00D7;</span>\n      </div>\n    </template>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"$parent.inputEl\" role=\"combo\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" input.trigger=\"filterOptions() & debounce\" keydown.trigger=\"checkKeyEvent($event)\" change.trigger=\"false\" focus.trigger=\"toggleDrop(true)\" blur.trigger=\"[canToggleDrop($event), resetQuery(true)] & debounce\">\n  </div>\n</template>\n";

  let ListInput = class ListInput {
  };
  ListInput = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.inlineView(view$p),
      aureliaFramework.processContent((compiler, resources, node, instruction) => {
          instruction.inheritBindingContext = true;
          return true;
      })
  ], ListInput);

  const KEY_DOWN = 40;
  const KEY_UP = 38;
  const BACKSPACE = 8;
  const ENTER = 13;
  class ListMaker extends BaseInput {
      constructor() {
          super(...arguments);
          this.value = undefined;
          this.model = undefined;
          this.name = "";
          this.placeholder = "";
          this.labelProperty = "";
          this.valueProperty = "";
          this.groupProperty = "";
          this.options = [];
          this.readonly = false;
          this.disabled = false;
          this.noOptionsText = "No Options";
          this.multiple = false;
          this.inputValue = "";
          this.isLoaded = false;
          this.isLoading = false;
          this.isGrouped = false;
          this.isFiltered = false;
          this.ignoreChange = false;
          this.allowAny = false;
          this.hilightIndex = -1;
      }
      valueChanged() {
          if (this.ignoreChange) {
              return;
          }
          if (!this.valueProperty) {
              this.model = this.value;
              if (!this.multiple) {
                  this.inputValue = this.value ? this.value[this.labelProperty] || this.value : "";
              }
              return;
          }
          if (this.options && !isNull(this.value)) {
              if (this.multiple) {
                  this.model = this.options.filter(o => {
                      if (this.matcher) {
                          return this.value.some(value => {
                              return this.matcher({ option: o, value });
                          });
                      }
                      else {
                          return this.value.includes(o[this.valueProperty] || o);
                      }
                  });
              }
              else {
                  this.model = this.options.find(o => {
                      if (this.matcher) {
                          return this.matcher({ option: o, value: this.value });
                      }
                      else {
                          return this.value === (o[this.valueProperty] || o);
                      }
                  });
              }
          }
          else {
              this.model = null;
              this.inputValue = "";
          }
          if (!this.dropEl) {
              UIInternal.queueTask(() => {
                  const selected = this.listContainer.querySelector(".ui-list__item--selected");
                  if (selected) {
                      selected.scrollIntoView({ block: "nearest" });
                  }
              });
          }
          this.resetQuery();
      }
      toggleDrop(open) {
          if (this.dropEl) {
              if (open === true && this.dropEl.isOpen) {
                  UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
                  return;
              }
              if (super.toggleDrop(open)) {
                  this.loadOptions();
              }
          }
      }
      loadOptions() {
          if (this.query) {
              this.fetchOptions();
          }
          else {
              this.buildOptions(this.options);
          }
      }
      filterOptions() {
          this.isFiltered = !!this.inputValue;
          if (this.query) {
              this.fetchOptions(this.inputValue);
          }
          else {
              const query = this.inputValue.ascii().toLowerCase();
              const options = this.options.filter(o => (o[this.labelProperty] || o)
                  .toString()
                  .ascii()
                  .toLowerCase()
                  .includes(query));
              this.buildOptions(options);
          }
      }
      selectOption(model) {
          this.ignoreChange = true;
          this.hilightIndex = -1;
          if (this.multiple) {
              if (!(this.value || []).includes(model[this.valueProperty] || model)) {
                  this.value = this.value
                      ? [...this.value, model[this.valueProperty] || model]
                      : [model[this.valueProperty] || model];
                  this.model = this.model ? [...this.model, model] : [model];
              }
              this.inputValue = "";
              this.inputEl.focus();
              this.inputEl.select();
          }
          else {
              if (this.labelProperty) {
                  model.$label = model[this.labelProperty] || model;
              }
              this.value = model[this.valueProperty] || model;
              this.model = model;
              this.resetQuery();
              if (this.dropEl) {
                  this.dropEl.closeDrop();
              }
          }
          if (this.isFiltered) {
              this.isFiltered = false;
              this.loadOptions();
          }
          this.element.dispatchEvent(UIInternal.createEvent("change", this.value));
          this.element.dispatchEvent(UIInternal.createEvent("select", this.model));
          setTimeout(() => (this.ignoreChange = false), 500);
      }
      removeOption(model) {
          this.ignoreChange = true;
          this.model = [...this.model.filter(m => m !== model)];
          this.value = this.value.filter(m => m !== (model[this.valueProperty] || model));
          setTimeout(() => (this.ignoreChange = false), 500);
      }
      resetQuery(clearFilter) {
          this.hilightIndex = -1;
          if (this.multiple) {
              this.inputValue = "";
          }
          else {
              this.inputValue = this.model
                  ? (this.model[this.labelProperty] || this.model).replace("<u>", "").replace("</u>", "")
                  : "";
          }
          if (clearFilter && this.isFiltered) {
              this.isFiltered = false;
              this.loadOptions();
          }
      }
      clear() {
          this.model = null;
          this.value = null;
          this.inputValue = "";
          this.inputEl.focus();
          if (this.isFiltered) {
              this.loadOptions();
          }
      }
      listClass(option, index) {
          const classes = ["ui-list__item"];
          option.__selected = false;
          if (!this.multiple) {
              if (this.matcher) {
                  if (this.matcher({ option, value: this.value })) {
                      option.__selected = true;
                      classes.push("ui-list__item--selected");
                  }
              }
              else if ((option[this.valueProperty] || option) === this.value) {
                  option.__selected = true;
                  classes.push("ui-list__item--selected");
              }
          }
          else if (this.multiple && this.value) {
              if (this.matcher) {
                  this.value.forEach(value => {
                      if (this.matcher({ option, value })) {
                          option.__selected = true;
                          classes.push("ui-list__item--disabled");
                      }
                  });
              }
              else if (this.value.includes(option[this.valueProperty] || option)) {
                  option.__selected = true;
                  classes.push("ui-list__item--disabled");
              }
          }
          if (this.hilightIndex === index) {
              classes.push("ui-list__item--hilight");
          }
          return classes.join(" ");
      }
      buildOption(option, el, unmark = false) {
          if (el) {
              el.innerHTML = "";
              const tpl = this.template
                  ? this.template.outerHTML
                  : `<template><div innerhtml.bind="$label"></div></template>`;
              const model = {
                  $label: this.isFiltered && !unmark
                      ? this.markOption(option)
                      : option[this.labelProperty] || option,
                  $model: option,
                  $value: option[this.valueProperty] || option
              };
              const view = UIInternal.compileTemplate(tpl, model);
              view.appendNodesTo(el);
          }
          return true;
      }
      checkKeyEvent($event) {
          if ([KEY_DOWN, KEY_UP].includes($event.keyCode)) {
              if (this.dropEl && !this.dropEl.isOpen) {
                  this.dropEl.toggleDrop();
              }
              if ($event.keyCode === KEY_DOWN) {
                  this.hilightIndex =
                      this.hilightIndex === -1 && this.model
                          ? this.innerOptions.indexOf(this.model)
                          : this.hilightIndex >= this.innerOptions.length || this.hilightIndex < -1
                              ? -1
                              : this.hilightIndex;
                  while (this.hilightIndex + 1 !== this.innerOptions.length &&
                      (this.innerOptions[this.hilightIndex + 1].__type === "group" ||
                          this.innerOptions[this.hilightIndex + 1].__selected ||
                          this.innerOptions[this.hilightIndex + 1].__disabled)) {
                      this.hilightIndex++;
                  }
                  this.hilightIndex = this.hilightIndex + 1;
              }
              if ($event.keyCode === KEY_UP) {
                  this.hilightIndex =
                      this.hilightIndex === -1 && this.model
                          ? this.innerOptions.indexOf(this.model)
                          : this.hilightIndex === -1
                              ? this.innerOptions.length
                              : this.hilightIndex;
                  while (this.hilightIndex - 1 > 0 &&
                      (this.innerOptions[this.hilightIndex - 1].__type === "group" ||
                          this.innerOptions[this.hilightIndex - 1].__selected ||
                          this.innerOptions[this.hilightIndex - 1].__disabled)) {
                      this.hilightIndex--;
                  }
                  this.hilightIndex = this.hilightIndex - 1;
              }
              UIInternal.queueTask(() => {
                  const selected = this.listContainer.querySelector(".ui-list__item--hilight");
                  if (selected) {
                      selected.scrollIntoView({ block: "nearest" });
                  }
              });
              $event.stopEvent();
          }
          else if (this.hilightIndex !== -1 && $event.keyCode === ENTER) {
              this.selectOption(this.innerOptions[this.hilightIndex]);
              $event.stopEvent();
          }
          else if (this.allowAny && !!this.inputValue.trim() && $event.keyCode === ENTER) {
              this.selectOption(this.inputValue);
              $event.stopEvent();
          }
          else if (this.multiple && $event.keyCode === BACKSPACE) {
              if (this.model.length > 0 && this.inputValue.length === 0) {
                  $event.stopEvent();
                  this.removeOption(this.model.last());
              }
          }
          else {
              this.fireEnter($event);
          }
          return true;
      }
      fetchOptions(query) {
          return __awaiter(this, void 0, void 0, function* () {
              this.showLoading();
              const result = yield this.query({ query });
              if (!this.options) {
                  this.options = result;
              }
              this.buildOptions(result || []);
          });
      }
      showLoading() {
          this.isLoaded = false;
          this.isLoading = true;
          this.innerOptions = [];
          if (this.dropEl) {
              UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
          }
      }
      buildOptions(options, silent = false) {
          if (!silent) {
              this.showLoading();
          }
          const optionsClone = options.map(o => (isString(o) ? `${o}` : Object.assign({}, o)));
          UIInternal.queueTask(() => {
              this.isLoading = false;
              if (this.groupProperty) {
                  const groups = optionsClone
                      .sortBy([this.groupProperty, this.labelProperty])
                      .groupBy(this.groupProperty);
                  groups.forEach((items, label) => this.innerOptions.push({ __type: "group", label }, ...items));
              }
              else {
                  this.innerOptions = optionsClone.sortBy(this.labelProperty);
              }
              this.isLoaded = true;
              UIInternal.queueTask(() => {
                  const selected = this.listContainer.querySelector(".ui-list__item--selected");
                  if (selected) {
                      selected.scrollIntoView({ block: "nearest" });
                  }
              });
              if (this.dropEl) {
                  UIInternal.queueTask(() => this.dropEl.updatePosition());
              }
          });
      }
      markOption(option) {
          let lbl = option[this.labelProperty] || `${option}`;
          if (isEmpty(this.inputValue)) {
              return lbl;
          }
          const rx = new RegExp(this.inputValue, "i");
          const asc = lbl.toString().ascii();
          if (rx.test(asc)) {
              const start = asc.search(rx);
              lbl =
                  lbl.substr(0, start) +
                      "<u>" +
                      lbl.substr(start, this.inputValue.length) +
                      "</u>" +
                      lbl.substr(start + this.inputValue.length);
          }
          return lbl;
      }
  }

  var view$q = "<template class=\"ui-input ui-list ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper model.bind=\"$this\">\n    <slot></slot>\n    <list-input></list-input>\n    <div class=\"ui-list__container\" ref=\"listContainer\" css.bind=\"{height}\">\n      <list-container></list-container>\n    </div>\n  </input-wrapper>\n</template>\n";

  let UIList = class UIList extends ListMaker {
      constructor(element) {
          super(element);
          this.element = element;
          this.value = undefined;
          this.model = undefined;
          this.name = "";
          this.height = "20em";
          this.placeholder = "";
          this.labelProperty = "";
          this.valueProperty = "";
          this.groupProperty = "";
          this.readonly = false;
          this.disabled = false;
          this.noOptionsText = "No Options";
          this.multiple = element.hasAttribute("multiple");
          this.allowAny = element.hasAttribute("allow-any");
          this.template = this.element.querySelector("template");
      }
      bind() {
          if (!isNull(this.model)) {
              if (this.multiple) {
                  this.value = this.multiple
                      ? this.model.map(o => o[this.valueProperty] || o)
                      : this.model[this.labelProperty] || this.model;
              }
          }
          this.isGrouped = !!this.groupProperty;
          this.valueChanged();
      }
      attached() {
          this.loadOptions();
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIList.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIList.prototype, "model", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIList.prototype, "errors", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIList.prototype, "name", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIList.prototype, "height", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIList.prototype, "placeholder", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIList.prototype, "labelProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIList.prototype, "valueProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIList.prototype, "groupProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIList.prototype, "query", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIList.prototype, "options", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIList.prototype, "readonly", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIList.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIList.prototype, "noOptionsText", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIList.prototype, "matcher", void 0);
  UIList = __decorate([
      aureliaFramework.customElement("ui-list"),
      aureliaFramework.viewResources(InputWrapper, ListInput, ListContainer),
      aureliaFramework.inlineView(view$q),
      __metadata("design:paramtypes", [Element])
  ], UIList);

  var view$r = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <list-input></list-input>\n  </input-wrapper>\n  <ui-drop view-model.ref=\"dropEl\" multiple.bind=\"multiple\" class=\"ui-list\" close.trigger=\"resetQuery()\">\n    <div ref=\"listContainer\" class=\"ui-list__container\">\n      <list-container></list-container>\n    </div>\n  </ui-drop>\n</template>\n";

  let UISelect = class UISelect extends ListMaker {
      constructor(element) {
          super(element);
          this.element = element;
          this.value = undefined;
          this.model = undefined;
          this.name = "";
          this.placeholder = "";
          this.labelProperty = "";
          this.valueProperty = "";
          this.groupProperty = "";
          this.readonly = false;
          this.disabled = false;
          this.noOptionsText = "No Options";
          this.dropHandle = "caret";
          this.multiple = element.hasAttribute("multiple");
          this.allowAny = element.hasAttribute("allow-any");
          this.template = this.element.querySelector("template");
      }
      attached() {
          this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
          this.dropEl.closeOnClick = !this.multiple;
          this.dropEl.tether(this.element);
      }
      bind() {
          if (!isNull(this.model)) {
              if (this.multiple) {
                  this.value = this.multiple
                      ? this.model.map(o => o[this.valueProperty] || o)
                      : this.model[this.labelProperty] || this.model;
              }
          }
          this.isGrouped = !!this.groupProperty;
          this.valueChanged();
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UISelect.prototype, "value", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UISelect.prototype, "model", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UISelect.prototype, "errors", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISelect.prototype, "name", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISelect.prototype, "placeholder", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISelect.prototype, "labelProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISelect.prototype, "valueProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISelect.prototype, "groupProperty", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UISelect.prototype, "query", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UISelect.prototype, "options", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UISelect.prototype, "readonly", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UISelect.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISelect.prototype, "noOptionsText", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UISelect.prototype, "matcher", void 0);
  UISelect = __decorate([
      aureliaFramework.customElement("ui-select"),
      aureliaFramework.viewResources(InputWrapper, ListInput, ListContainer),
      aureliaFramework.inlineView(view$r),
      __metadata("design:paramtypes", [Element])
  ], UISelect);

  const Lists = [UIList, UISelect, UIDropdown];

  var uiLists = /*#__PURE__*/Object.freeze({
    Lists: Lists
  });

  let UIBreadcrumbs = class UIBreadcrumbs {
      constructor(element) {
          this.element = element;
          this.items = [];
          this.hasOverflow = false;
          this.obResize = new ResizeObserver(() => this.calculateOverflow());
          this.obResize.observe(element);
      }
      attached() {
          UIInternal.queueTask(() => this.calculateOverflow());
      }
      detached() {
          this.obResize.disconnect();
      }
      calculateOverflow() {
          this.resetOverflow();
          if (this.wrapperEl.offsetWidth > this.element.offsetWidth) {
              this.hasOverflow = true;
              while (this.wrapperEl.offsetWidth > this.element.offsetWidth - 50) {
                  this.overflowEl.appendChild(this.wrapperEl.firstElementChild);
              }
          }
          else {
              this.hasOverflow = false;
          }
      }
      resetOverflow() {
          this.hasOverflow = false;
          const currentFirstChild = this.wrapperEl.firstElementChild;
          this.overflowEl.children.forEach(child => {
              this.wrapperEl.insertBefore(child, currentFirstChild);
          });
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UIBreadcrumbs.prototype, "items", void 0);
  UIBreadcrumbs = __decorate([
      aureliaFramework.customElement("ui-breadcrumbs"),
      aureliaFramework.inlineView(`<template class="ui-breadcrumbs">
  <div class="ui-breadcrumbs__overflow" show.bind="hasOverflow">
  <ui-button type="tool" size="xs" no-caret ui-theme="secondary">
    <ui-svg-icon class="ui-btn__icon" icon="ellipsis"></ui-svg-icon>
    <ui-drop close-on-click="false"><ui-menu ref="overflowEl"></ui-menu></ui-drop>
  </ui-button>
  </div>
  <div class="ui-breadcrumbs__wrapper" ref="wrapperEl">
  <template repeat.for="item of items">
    <template if.bind="item.href">
    <a class="ui-breadcrumbs__link" href.bind="item.href"><ui-icon if.bind="item.icon" icon.bind="item.icon"></ui-icon>\${item.label}</a>
    </template>
    <template else>
    <span class="ui-breadcrumbs__label"><ui-icon if.bind="item.icon" icon.bind="item.icon"></ui-icon>\${item.label}</span>
    </template>
  </template>
  </div>
</template>`),
      __metadata("design:paramtypes", [Element])
  ], UIBreadcrumbs);

  let MenuItem = class MenuItem {
      constructor() {
          this.noitemsLabel = "No Menu";
      }
      onClick($event) {
          if (this.item.items) {
              $event.stopPropagation();
          }
          if (this.item.handler) {
              this.item.handler();
          }
          return true;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], MenuItem.prototype, "item", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], MenuItem.prototype, "noitemsLabel", void 0);
  MenuItem = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("menu-item"),
      aureliaFramework.inlineView(`<template>
  <template if.bind="item.group">
    <ui-menu-group label.bind="item.group">
      <menu-item repeat.for="groupItem of item.items" item.bind="groupItem"></menu-item>
    </ui-menu-group>
  </template>
  <template if.bind="item.label">
    <ui-menu-item label.bind="item.label" href.bind="item.href"
    icon.bind="item.icon" icon-color.bind="item.iconColor" ui-badge="value.bind:item.badge; theme.bind:item.badgeTheme;"
    disabled.bind="typeof item.disabled === 'function' ? item.disabled() : item.disabled"
    active.bind="typeof item.active === 'function' ? item.active() : item.active"
    hide.bind="typeof item.hidden === 'function' ? item.hidden() : item.hidden"
    click.delegate="onClick($event)">
      <ui-drop view-model.ref="dropEl" if.bind="item.items">
        <ui-menu if.bind="dropEl.isOpen" menu-items.bind="item.items" noitems-label.bind="noitemsLabel"></ui-menu>
      </ui-drop>
    </ui-menu-item>
  </template>
  <template if.bind="item === '-'">
    <ui-divider></ui-divider>
  </template>
</template>`)
  ], MenuItem);

  let UIMenu = class UIMenu {
      constructor(element) {
          this.element = element;
          this.noitemsLabel = "No Menu";
          this.isLoading = false;
      }
      attached() {
          this.loadMenuItems();
          UIInternal.queueTask(() => {
              const active = this.element.querySelector(".ui-menu__item__link[data-active='true']");
              if (active) {
                  active.scrollIntoView({ block: "center", inline: "nearest" });
              }
          });
      }
      loadMenuItems() {
          if (isFunction(this.menuItems)) {
              this.isLoading = true;
              const ret = this.menuItems();
              if (ret instanceof Promise) {
                  ret.then(items => {
                      this.items = items;
                      this.isLoading = false;
                  });
              }
              else {
                  this.items = ret;
                  this.isLoading = false;
              }
          }
          else if (isArray(this.menuItems)) {
              this.items = this.menuItems;
          }
          else {
              this.items = undefined;
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIMenu.prototype, "menuItems", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIMenu.prototype, "noitemsLabel", void 0);
  UIMenu = __decorate([
      aureliaFramework.customElement("ui-menu"),
      aureliaFramework.viewResources(MenuItem),
      aureliaFramework.inlineView(`<template class="ui-menu"><slot>
  <div if.bind="isLoading" ui-padding="xs" ui-align="center"><ui-svg-icon icon="busy" class="ui-anim--spin"></ui-svg-icon></div>
  <template if.bind="!isLoading && items && items.length">
    <menu-item repeat.for="item of items" item.bind="item" noitems-label.bind="noitemsLabel"></menu-item>
  </template>
  <template if.bind="!isLoading && items && items.length===0">
    <div ui-padding="xs" ui-color="muted" ui-font="sm" innerhtml.bind="noitemsLabel"></div>
  </template>
</slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIMenu);

  let UIMenuGroup = class UIMenuGroup {
      constructor(element) {
          this.element = element;
          this.label = "";
          this.collapsed = false;
      }
      attached() {
          if (this.element.hasAttribute("collapsible")) {
              this.vmElement.classList.add("ui-menu__group--collapsible");
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIMenuGroup.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIMenuGroup.prototype, "collapsed", void 0);
  UIMenuGroup = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-menu-group"),
      aureliaFramework.inlineView(`<template><fieldset class="ui-menu__group" data-collapsed.bind="collapsed" ref="vmElement">
    <legend class="ui-menu__group__label" if.bind="label" innerhtml.bind="label" click.trigger="collapsed = !collapsed"></legend>
    <div class="ui-menu__group__container"><slot></slot></div>
  </fieldset></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIMenuGroup);

  var view$s = "<template class=\"ui-menu__item\" value.bind=\"value\">\n  <a ref=\"badgeEl\" data-active.bind=\"active\" data-disabled.bind=\"disabled\" click.trigger=\"fireClick($event)\" class=\"ui-menu__item__link\" data-open.bind=\"!split && dropEl.isOpen\">\n    <ui-icon class=\"ui-menu__item__icon\" icon.bind=\"icon\" if.bind=\"icon\" ui-color.bind=\"iconColor\"></ui-icon>\n    <span class=\"ui-menu__item__label\">\n      <slot>${label}</slot>\n    </span>\n    <ui-svg-icon if.bind=\"!split && hasDrop\" class=\"ui-menu__item__caret\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <a data-active.bind=\"split && dropEl.isOpen\" class=\"ui-menu__item__caret ui-menu__item__caret--split\" if.bind=\"split && hasDrop\" click.trigger=\"toggleDrop()\" data-open.bind=\"split && dropEl.isOpen\">\n    <ui-svg-icon class=\"ui-icon__caret split\" icon.bind=\"dropIcon\"></ui-svg-icon>\n  </a>\n  <slot name=\"ui-drop\"></slot>\n</template>\n";

  let UIMenuItem = class UIMenuItem {
      constructor(element) {
          this.element = element;
          this.label = "";
          this.href = "";
          this.icon = "";
          this.iconColor = "";
          this.active = false;
          this.disabled = false;
          this.dropIcon = "caret";
          this.isInMenubar = false;
          this.hasDrop = false;
          this.split = element.hasAttribute("split");
      }
      attached() {
          UIInternal.queueTask(() => {
              this.hasDrop = !!this.elDropdown;
              this.isInMenubar = hasParent(this.element, "ui-menu__bar");
              const isInDropdown = hasParent(this.element, "ui-drop__body");
              if (this.hasDrop) {
                  this.dropEl = getSlotViewModel(this.elDropdown);
                  if (isInDropdown || !this.isInMenubar) {
                      this.dropIcon = "page-next";
                      this.dropEl.position = "tl";
                      this.dropEl.anchorPosition = "tr";
                      this.dropEl.stretch = false;
                      this.dropEl.attachToViewport = isInDropdown;
                  }
                  this.dropEl.tether(this.element);
              }
          });
          this.hrefChanged();
      }
      hrefChanged() {
          if (this.badgeEl) {
              if (this.href) {
                  this.badgeEl.href = this.href;
              }
              else if (this.badgeEl.attributes.getNamedItem("href")) {
                  this.badgeEl.attributes.removeNamedItem("href");
              }
          }
      }
      activeChanged() {
          if (this.active) {
              this.element.scrollIntoView({ block: "center", inline: "nearest" });
          }
      }
      fireClick($event) {
          if (!this.href) {
              if (this.hasDrop && !this.split) {
                  return this.toggleDrop();
              }
              return this.element.dispatchEvent(UIInternal.createEvent("click", this.id));
          }
      }
      toggleDrop() {
          const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
          const afterEvent = this.dropEl.isOpen ? "close" : "open";
          if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
              this.dropEl.toggleDrop();
              this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
          }
          return false;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIMenuItem.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIMenuItem.prototype, "href", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIMenuItem.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIMenuItem.prototype, "iconColor", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIMenuItem.prototype, "id", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIMenuItem.prototype, "active", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIMenuItem.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.child(".ui-drop"),
      __metadata("design:type", Element)
  ], UIMenuItem.prototype, "elDropdown", void 0);
  UIMenuItem = __decorate([
      aureliaFramework.customElement("ui-menu-item"),
      aureliaFramework.inlineView(view$s),
      __metadata("design:paramtypes", [Element])
  ], UIMenuItem);

  const calculateOverflow = (wrapperEl, overflowEl) => {
      const isRtl = window.getComputedStyle(wrapperEl).direction === "rtl";
      resetOverflow(wrapperEl, overflowEl);
      while (wrapperEl.lastElementChild && isOutOfBounds(wrapperEl, wrapperEl.lastElementChild, isRtl)) {
          !!overflowEl.firstElementChild
              ? overflowEl.insertBefore(wrapperEl.lastElementChild, overflowEl.firstElementChild)
              : overflowEl.appendChild(wrapperEl.lastElementChild);
      }
      return !!overflowEl.children.length;
  };
  const resetOverflow = (wrapperEl, overflowEl) => {
      overflowEl.children.forEach(child => {
          wrapperEl.appendChild(child);
      });
  };
  const isOutOfBounds = (wrapperEl, itemEl, isRtl) => {
      return isRtl
          ? itemEl.getBoundingClientRect().left < wrapperEl.getBoundingClientRect().left
          : itemEl.getBoundingClientRect().right > wrapperEl.getBoundingClientRect().right;
  };

  let UIMenubar = class UIMenubar {
      constructor(element) {
          this.element = element;
          this.hasOverflow = false;
          this.obResize = new ResizeObserver(() => this.calculateOverflow());
          this.obResize.observe(element);
      }
      attached() {
          UIInternal.queueTask(() => this.calculateOverflow());
      }
      detached() {
          this.obResize.disconnect();
      }
      calculateOverflow() {
          this.hasOverflow = calculateOverflow(this.wrapperEl, this.overflowEl);
      }
  };
  UIMenubar = __decorate([
      aureliaFramework.customElement("ui-menubar"),
      aureliaFramework.inlineView(`<template class="ui-menu__bar">
  <div class="ui-menu__bar__wrapper" ref="wrapperEl"><slot></slot></div>
  <ui-button type="tool" size="xs" no-caret class="ui-menu__overflow" ui-theme="secondary" show.bind="hasOverflow">
    <ui-svg-icon class="ui-btn__icon" icon="overflow"></ui-svg-icon>
    <ui-drop close-on-click="false"><ui-menu ref="overflowEl"></ui-menu></ui-drop>
  </ui-button>
</template>`),
      __metadata("design:paramtypes", [Element])
  ], UIMenubar);

  const Menus = [UIMenu, UIMenuGroup, UIMenuItem, UIMenubar, UIBreadcrumbs];

  var uiMenus = /*#__PURE__*/Object.freeze({
    Menus: Menus
  });

  var view$t = "<template>\n  <div ref=\"vmElement\" slot=\"page-alert\" class=\"ui-alert ui-alert--inline\" data-open.bind=\"open\">\n    <div class=\"ui-alert__wrapper\">\n      <div if.bind=\"icon\" class=\"ui-alert__icon\">\n        <ui-icon icon.bind=\"icon\"></ui-icon>\n      </div>\n      <div if.bind=\"alertTitle\" class=\"ui-alert__title\" innerhtml.bind=\"alertTitle\"></div>\n      <div class=\"ui-alert__body\"><slot></slot></div>\n      <div class=\"ui-alert__close\" click.trigger=\"close(false)\" if.bind=\"closeable\">\n        <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n      </div>\n      <div class=\"ui-alert__footer\" if.bind=\"type==='confirm'\">\n        <a click.trigger=\"close(false)\">${cancelLabel}</a>\n        <a click.trigger=\"close(true)\" ui-weight=\"bold\">${okLabel}</a>\n      </div>\n    </div>\n  </div>\n</template>\n";

  let UIAlert = class UIAlert {
      constructor(element) {
          this.element = element;
          this.open = false;
          this.icon = "";
          this.alertTitle = "";
          this.okLabel = "OK";
          this.cancelLabel = "Cancel";
          this.type = "alert";
          this.closeable = false;
          this.closeable = element.hasAttribute("closeable");
      }
      close(result) {
          if (this.element.dispatchEvent(UIInternal.createEvent("close", result)) !== false) {
              this.open = false;
          }
      }
  };
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Object)
  ], UIAlert.prototype, "open", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIAlert.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIAlert.prototype, "alertTitle", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIAlert.prototype, "okLabel", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIAlert.prototype, "cancelLabel", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIAlert.prototype, "type", void 0);
  UIAlert = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-alert"),
      aureliaFramework.inlineView(view$t),
      __metadata("design:paramtypes", [Element])
  ], UIAlert);

  var view$u = "<template class=\"ui-dialog__wrapper\" data-modal.bind=\"modal\" data-minimized.bind=\"minimized\" data-active.bind=\"active\" mousedown.trigger=\"activate()\">\n  <div class=\"ui-panel-base ui-dialog\" css.bind=\"css\" ref=\"dialogEl\">\n    <div class=\"ui-panel__header\" mousedown.delegate=\"startDrag($event)\">\n      <slot name=\"panel-header\">\n        <ui-header>\n          <ui-header-icon icon.bind=\"icon\" if.bind=\"icon\"></ui-header-icon>\n          <ui-header-title>${label}</ui-header-title>\n        </ui-header>\n      </slot>\n      <div class=\"ui-panel__header__actions\" if.bind=\"!hideToolbox\" mousedown.delegate=\"false\">\n        <ui-divider></ui-divider>\n        <ui-button if.bind=\"help\" class=\"ui-dlg--tool\" ui-theme=\"info\" type=\"tool\">\n          <ui-svg-icon ui-color=\"blue\" view-box=\"2 2 20 20\" icon=\"dlg-help\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"!maximizable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"maximized = !maximized\">\n          <ui-svg-icon ui-color=\"teal\" view-box=\"2 2 20 20\" icon.bind=\"maximized?'dlg-collapse':'dlg-expand'\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"modal || !minimizable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"minimize()\">\n          <ui-svg-icon ui-color=\"yellow\" view-box=\"2 2 20 20\" icon=\"dlg-minimize\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"!closeable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"close()\">\n          <ui-svg-icon ui-color=\"red\" view-box=\"2 2 20 20\" icon=\"dlg-close\"></ui-svg-icon>\n        </ui-button>\n      </div>\n    </div>\n    <div class=\"ui-panel__body\" ref=\"vmElement\">\n      <slot></slot>\n    </div>\n    <slot name=\"panel-footer\"></slot>\n  </div>\n</template>\n";

  let UIDialogElement = class UIDialogElement {
      constructor(element) {
          this.element = element;
          this.label = "Dialog";
          this.icon = "";
          this.width = "50vw";
          this.minWidth = "36rem";
          this.maxWidth = "100%";
          this.height = "50vh";
          this.minHeight = "32rem";
          this.maxHeight = "100%";
          this.help = false;
          this.modal = false;
          this.closeable = true;
          this.maximizable = true;
          this.minimizable = true;
          this.hideToolbox = false;
          this.active = true;
          this.minimized = false;
          this.maximized = false;
          this.position = {
              bottom: "auto",
              left: "0",
              right: "auto",
              top: "0"
          };
          this.help = element.hasAttribute("help.trigger");
      }
      cancel() {
          this.close();
      }
      close(result) {
          UIInternal.broadcast("dlg:close", { dialog: this, result });
      }
      minimize() {
          this.minimized = !this.minimized;
          this.active = !this.minimized;
          UIInternal.broadcast("dlg:minimize", { dialog: this });
      }
      activate() {
          UIInternal.broadcast("dlg:activate", { dialog: this });
      }
      bind() {
          if (this.modal) {
              this.position = { bottom: "auto", left: "auto", right: "auto", top: "auto" };
          }
      }
      attached() {
          if (!this.modal) {
              const iconEl = this.element.querySelector(".ui-header__icon .ui-icon");
              if (iconEl) {
                  this.icon = iconEl.au.controller.viewModel.icon;
              }
              this.taskButton = UIInternal.compileTemplate(`<template><ui-button size="sm" ui-theme="primary" type.bind="active?'solid':'default'" label.bind="label" icon.bind="icon"></ui-button></template>`, this);
          }
      }
      startDrag($event) {
          if ($event.button === 0) {
              $event.stopEvent();
              UIInternal.broadcast("dlg:drag", {
                  dialog: this,
                  startX: $event.x || $event.clientX,
                  startY: $event.y || $event.clientY
              });
          }
      }
      get css() {
          const pos = Object.assign({ height: this.height, maxHeight: this.maxHeight, maxWidth: this.maxWidth, minHeight: this.minHeight, minWidth: this.minWidth, width: this.width }, this.position);
          if (this.maximized) {
              pos.top = pos.left = pos.right = pos.bottom = "0";
              pos.width = pos.height = "auto";
          }
          return pos;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIDialogElement.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIDialogElement.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDialogElement.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDialogElement.prototype, "minWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDialogElement.prototype, "maxWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDialogElement.prototype, "height", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDialogElement.prototype, "minHeight", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDialogElement.prototype, "maxHeight", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.toView }),
      __metadata("design:type", Object)
  ], UIDialogElement.prototype, "help", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.oneTime }),
      __metadata("design:type", Boolean)
  ], UIDialogElement.prototype, "modal", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.toView }),
      __metadata("design:type", Boolean)
  ], UIDialogElement.prototype, "closeable", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.toView }),
      __metadata("design:type", Boolean)
  ], UIDialogElement.prototype, "maximizable", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.toView }),
      __metadata("design:type", Boolean)
  ], UIDialogElement.prototype, "minimizable", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.toView }),
      __metadata("design:type", Boolean)
  ], UIDialogElement.prototype, "hideToolbox", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIDialogElement.prototype, "beforeclose", void 0);
  __decorate([
      aureliaFramework.computedFrom("width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "minimized", "maximized", "position.left", "position.top"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UIDialogElement.prototype, "css", null);
  UIDialogElement = __decorate([
      aureliaFramework.customElement("ui-dialog"),
      aureliaFramework.inlineView(view$u),
      __metadata("design:paramtypes", [Element])
  ], UIDialogElement);

  let UIDrawer = class UIDrawer {
      constructor(element) {
          this.element = element;
          this.align = "start";
          this.width = "24rem";
          this.maxWidth = "40vw";
          this.push = false;
          this.closeOnClick = false;
          this.isAttached = false;
          this.push = element.hasAttribute("push");
          this.closeOnClick =
              element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
          this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target => !this.closeOnClick && hasParent(target, "ui-drawer__body", "ui-drawer")
              ? undefined
              : (element.dataset.peek = "false"));
      }
      attached() {
          UIInternal.queueTask(() => this.element.nextElementSibling.style.setProperty("--drawer-width", this.width));
          this.isAttached = true;
      }
      detached() {
          if (this.obClick) {
              this.obClick.dispose();
          }
      }
      widthChanged() {
          if (this.isAttached) {
              this.element.nextElementSibling.style.setProperty("--drawer-width", this.width);
          }
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDrawer.prototype, "align", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDrawer.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIDrawer.prototype, "maxWidth", void 0);
  UIDrawer = __decorate([
      aureliaFramework.customElement("ui-drawer"),
      aureliaFramework.inlineView(`<template class="ui-drawer" data-push.bind="push" data-align.bind="align">
<div class="ui-drawer__shim"></div>
<div class="ui-drawer__body" css.bind="{width, maxWidth}">
  <slot></slot>
</div>
</template>
`),
      __metadata("design:paramtypes", [Element])
  ], UIDrawer);

  let UIDrawerToggle = class UIDrawerToggle {
      toggleOpen() {
          this.drawer.dataset.peek = `${!isTrue(this.drawer.dataset.peek)}`;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", HTMLElement)
  ], UIDrawerToggle.prototype, "drawer", void 0);
  UIDrawerToggle = __decorate([
      aureliaFramework.customElement("ui-drawer-toggle"),
      aureliaFramework.inlineView("<template class='ui-drawer__toggler' click.trigger='toggleOpen()'><slot><ui-svg-icon icon='menu'></ui-svg-icon></slot></template>")
  ], UIDrawerToggle);

  let UIFooter = class UIFooter {
      constructor(element) {
          this.element = element;
      }
  };
  UIFooter = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-footer"),
      aureliaFramework.inlineView(`<template><div class="ui-footer" slot="panel-footer" ref="vmElement"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIFooter);

  let UIHeader = class UIHeader {
      constructor(element) {
          this.element = element;
          this.label = "";
          this.icon = "";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIHeader.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UIHeader.prototype, "icon", void 0);
  UIHeader = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-header"),
      aureliaFramework.inlineView(`<template><div class="ui-header" slot="panel-header" ref="vmElement">
  <slot name="header-icon"><div class="ui-header__icon" if.bind="icon"><ui-icon icon.bind="icon"></ui-icon></div></slot>
  <slot name="header-title"><div class="ui-header__title" if.bind="label" innerhtml.bind="label"></div></slot>
  <slot name="header-actions"></slot>
  </div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIHeader);

  let UIHeaderActions = class UIHeaderActions {
      constructor(element) {
          this.element = element;
      }
  };
  UIHeaderActions = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-header-actions"),
      aureliaFramework.inlineView(`<template><div ref="vmElement" slot="header-actions" class="ui-header__actions"><slot></slot></div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIHeaderActions);

  let UIHeaderIcon = class UIHeaderIcon {
      constructor(element) {
          this.element = element;
          this.icon = "";
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIHeaderIcon.prototype, "icon", void 0);
  UIHeaderIcon = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-header-icon"),
      aureliaFramework.inlineView(`<template><div ref="vmElement" slot="header-icon" class='ui-header__icon'><slot><ui-icon icon.bind="icon"></ui-icon></slot></div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIHeaderIcon);

  let UIHeaderTitle = class UIHeaderTitle {
      constructor(element) {
          this.element = element;
      }
  };
  UIHeaderTitle = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-header-title"),
      aureliaFramework.inlineView(`<template><div ref="vmElement" slot="header-title" class='ui-header__title'><slot></slot></div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIHeaderTitle);

  var view$v = "<template class=\"ui-panel-base ui-panel\" css.bind=\"{width, minWidth, maxWidth}\" data-expanded.bind=\"expanded\" data-collapsed.bind=\"collapsed\">\n  <div class=\"ui-panel__header\">\n    <slot name=\"panel-header\">\n      <ui-header>\n        <slot name=\"header-icon\" slot=\"header-icon\">\n          <ui-header-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-header-icon>\n        </slot>\n        <slot name=\"header-title\" slot=\"header-title\">\n          <ui-header-title if.bind=\"label\">${label}</ui-header-title>\n        </slot>\n        <slot name=\"header-actions\"></slot>\n      </ui-header>\n    </slot>\n    <div class=\"ui-panel__header__actions\" if.bind=\"collapsible || closeable || expandable\">\n      <ui-divider></ui-divider>\n      <template if.bind=\"expandable\">\n        <ui-button type=\"tool\" click.trigger=\"toggleExpand(!expanded)\">\n          <ui-svg-icon icon.bind=\"expanded?'collapse':'expand'\"></ui-svg-icon>\n        </ui-button>\n      </template>\n      <template if.bind=\"collapsible && !expanded\">\n        <ui-button type=\"tool\" click.trigger=\"toggleCollapse(!collapsed)\">\n          <ui-svg-icon icon.bind=\"collapsed?'plus':'minus'\"></ui-svg-icon>\n        </ui-button>\n      </template>\n      <template if.bind=\"closeable\">\n        <ui-button type=\"tool\" click.trigger=\"close()\">\n          <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n        </ui-button>\n      </template>\n    </div>\n  </div>\n  <div class=\"ui-panel__body\" css.bind=\"{height, minHeight, maxHeight}\">\n    <slot></slot>\n  </div>\n  <slot name=\"panel-footer\"></slot>\n</template>\n";

  let UIPanel = class UIPanel extends BasePanel {
      constructor(element) {
          super();
          this.element = element;
          this.label = "";
          this.icon = "";
          this.collapsed = false;
          this.expanded = false;
          this.width = "";
          this.minWidth = "16rem";
          this.maxWidth = "100vw";
          this.height = "";
          this.minHeight = "unset";
          this.maxHeight = "100vh";
          this.closeable = false;
          this.expandable = false;
          this.collapsible = false;
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Boolean)
  ], UIPanel.prototype, "collapsed", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Boolean)
  ], UIPanel.prototype, "expanded", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "minWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "maxWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "height", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "minHeight", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UIPanel.prototype, "maxHeight", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UIPanel.prototype, "beforeclose", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIPanel.prototype, "closeable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIPanel.prototype, "expandable", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UIPanel.prototype, "collapsible", void 0);
  UIPanel = __decorate([
      aureliaFramework.customElement("ui-panel"),
      aureliaFramework.inlineView(view$v),
      __metadata("design:paramtypes", [Element])
  ], UIPanel);

  var view$w = "<template class=\"ui-sidebar\" click.delegate=\"headTrigger === 'toggle' ? collapsed = false : peek = true\" data-peek.bind=\"peek\" data-collapsed.bind=\"collapsed\" data-position.bind=\"position\" data-align.bind=\"align\">\n  <div class=\"ui-sidebar__titlebar\" ui-bg.bind=\"titleBg\" ui-color.bind=\"titleColor\" ui-weight.bind=\"titleWeight\" if.bind=\"collapsible || label\" click.trigger=\"[collapsed = collapsible && !collapsed, $event.stopEvent()]\" css.bind=\"{width}\">\n    <div class=\"ui-sidebar__toggler\" if.bind=\"collapsible\">\n      <ui-svg-icon icon.bind=\"toggleIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-sidebar__title\" ui-color.bind=\"collapsed ? titleBg : ''\">\n      <slot name=\"sidebar-title\"><span if.bind=\"label\" innerhtml.bind=\"label\"></span></slot>\n    </div>\n  </div>\n  <div class=\"ui-sidebar__body\" css.bind=\"{width, maxWidth, minWidth}\" ref=\"bodyEl\">\n    <slot></slot>\n  </div>\n  <div class=\"ui-sidebar__resizer\" if.bind=\"resizeable\" data-resizing.bind=\"isResizing\" mousedown.trigger=\"startResize($event)\"></div>\n</template>\n";

  let UISidebar = class UISidebar {
      constructor(element) {
          this.element = element;
          this.position = "start";
          this.width = "24rem";
          this.maxWidth = "40vw";
          this.minWidth = "4rem";
          this.align = "top";
          this.headTrigger = "peek";
          this.collapsed = false;
          this.peek = false;
          this.resizeable = false;
          this.collapsible = false;
          this.closeOnClick = false;
          this.startX = 0;
          this.isResizing = false;
          this.doResize = e => this.resize(e);
          this.endResize = () => this.stopResize();
          this.resizeable = element.hasAttribute("resizeable");
          this.collapsible = element.hasAttribute("collapsible");
          this.closeOnClick =
              element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
          this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target => !this.peek || (!this.closeOnClick && hasParent(target, "ui-sidebar__body", "ui-sidebar"))
              ? undefined
              : UIInternal.queueTask(() => (this.peek = false)));
      }
      detached() {
          if (this.obClick) {
              this.obClick.dispose();
          }
      }
      get toggleIcon() {
          return `${this.collapsed ? "expand" : "collapse"}-${this.position}`;
      }
      startResize($event) {
          if ($event.button === 0 && !this.isResizing) {
              this.startX = $event.x || $event.clientX;
              this.isResizing = true;
              document.addEventListener("mousemove", this.doResize);
              document.addEventListener("mouseup", this.endResize);
              $event.stopEvent();
          }
      }
      resize($event) {
          if (this.isResizing) {
              let diff = ($event.x || $event.clientX) - this.startX;
              if (this.position === "end") {
                  diff = -1 * diff;
              }
              if (isRtl(this.element)) {
                  diff = -1 * diff;
              }
              const newWidth = this.bodyEl.offsetWidth + diff;
              if (newWidth <= convertToPx(this.maxWidth) && newWidth >= convertToPx(this.minWidth)) {
                  this.width = newWidth + "px";
                  this.startX = $event.x || $event.clientX;
              }
              $event.stopEvent();
          }
      }
      stopResize() {
          this.isResizing = false;
          document.removeEventListener("mousemove", this.doResize);
          document.removeEventListener("mouseup", this.endResize);
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "position", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "width", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "maxWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "minWidth", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "titleBg", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "titleColor", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "titleWeight", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "align", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UISidebar.prototype, "headTrigger", void 0);
  __decorate([
      aureliaFramework.bindable({ defaultBindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", Boolean)
  ], UISidebar.prototype, "collapsed", void 0);
  __decorate([
      aureliaFramework.computedFrom("collapsed", "position"),
      __metadata("design:type", Object),
      __metadata("design:paramtypes", [])
  ], UISidebar.prototype, "toggleIcon", null);
  UISidebar = __decorate([
      aureliaFramework.customElement("ui-sidebar"),
      aureliaFramework.inlineView(view$w),
      __metadata("design:paramtypes", [Element])
  ], UISidebar);

  let UIToolbar = class UIToolbar {
      constructor(element) {
          this.element = element;
          if (element.hasAttribute("align-end")) {
              element.classList.add("ui-row--end");
          }
      }
  };
  UIToolbar = __decorate([
      aureliaFramework.customElement("ui-toolbar"),
      aureliaFramework.inlineView(`<template class="ui-toolbar"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UIToolbar);

  const Panels = [
      UIHeader,
      UIHeaderIcon,
      UIHeaderTitle,
      UIHeaderActions,
      UIFooter,
      UIDrawer,
      UIDrawerToggle,
      UISidebar,
      UIToolbar,
      UIPanel,
      UIDialogElement,
      UIAlert
  ];

  var uiPanels = /*#__PURE__*/Object.freeze({
    Panels: Panels
  });

  let tabSeed = 0;
  let UITab = class UITab {
      constructor(element) {
          this.element = element;
          this.id = "";
          this.label = "";
          this.icon = "";
          this.active = false;
          this.disabled = false;
          this.closeable = false;
          this.id = `tab__${tabSeed++}`;
      }
      bind() {
          this.closeable = !isFalse(this.closeable);
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITab.prototype, "id", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITab.prototype, "label", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITab.prototype, "icon", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UITab.prototype, "active", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UITab.prototype, "disabled", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITab.prototype, "view", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITab.prototype, "model", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Object)
  ], UITab.prototype, "viewModel", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Boolean)
  ], UITab.prototype, "closeable", void 0);
  UITab = __decorate([
      aureliaFramework.customElement("ui-tab"),
      aureliaFramework.inlineView(`<template class="ui-tab" data-active.bind="active" data-hide.bind="!!view || !!viewModel"><slot></slot></template>`),
      __metadata("design:paramtypes", [Element])
  ], UITab);

  let UITabbarEnd = class UITabbarEnd {
      constructor(element) {
          this.element = element;
      }
  };
  UITabbarEnd = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-tabbar-end"),
      aureliaFramework.inlineView(`<template><div slot="tabbar-end"><slot></slot></div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UITabbarEnd);

  var view$x = "<template class=\"ui-tab__panel\" data-align.bind=\"align\">\n  <div class=\"ui-tab__bar\">\n    <div class=\"ui-tab__bar__start\">\n      <slot name=\"tabbar-start\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__wrapper\" ref=\"wrapperEl\">\n      <!-- repeat tabs -->\n      <template repeat.for=\"tab of tabs\">\n        <div class=\"ui-tab__button\" data-id.bind=\"tab.id\" data-active.bind=\"tab.active\" data-disabled.bind=\"tab.disabled\" click.trigger=\"activateTab(tab.id)\" ui-tooltip.bind=\"tab.label\">\n          <span class=\"ui-tab__button__icon\" if.bind=\"tab.icon\">\n            <ui-icon icon.bind=\"tab.icon\"></ui-icon>\n          </span>\n          <span class=\"ui-tab__button__label\" innerhtml.bind=\"tab.label\"></span>\n          <span class=\"ui-tab__button__close\" if.bind=\"tab.closeable\" click.trigger=\"[closeTab(tab.id), $event.stopEvent()]\">\n            <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n          </span>\n        </div>\n      </template>\n    </div>\n    <div class=\"ui-tab__bar__end\">\n      <slot name=\"tabbar-end\"></slot>\n    </div>\n    <div class=\"ui-tab__bar__overflow\" show.bind=\"hasOverflow\">\n      <ui-button no-caret type=\"link\" ui-theme=\"secondary\" size=\"sm\">\n        <ui-svg-icon class=\"ui-btn__icon\" icon=\"overflow\"></ui-svg-icon>\n        <ui-drop><ui-menu ref=\"overflowEl\"></ui-menu></ui-drop>\n      </ui-button>\n    </div>\n  </div>\n  <div class=\"ui-tab__body\">\n    <slot></slot>\n\n    <compose view-model.ref=\"composeVm\" class=\"ui-section\" view.bind=\"activeTab.view\" model.bind=\"activeTab.model\" view-model.bind=\"activeTab.viewModel\"></compose>\n  </div>\n</template>\n";

  let UITabbarStart = class UITabbarStart {
      constructor(element) {
          this.element = element;
      }
  };
  UITabbarStart = __decorate([
      aureliaFramework.containerless(),
      aureliaFramework.customElement("ui-tabbar-start"),
      aureliaFramework.inlineView(`<template><div slot="tabbar-start"><slot></slot></div></template>`),
      __metadata("design:paramtypes", [Element])
  ], UITabbarStart);

  let UITabPanel = class UITabPanel {
      constructor(element) {
          this.element = element;
          this.tabs = [];
          this.align = "top";
          this.hasOverflow = false;
          this.isAttached = false;
          if (element.hasAttribute("no-border")) {
              element.classList.add("ui-tab__panel--noborder");
          }
      }
      activateTab(id) {
          return __awaiter(this, void 0, void 0, function* () {
              let result = true;
              if (this.composeVm.currentViewModel) {
                  result = yield UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate");
              }
              if (result) {
                  return UIInternal.fireCallbackEvent(this, "beforechange", {
                      activeTab: this.activeTab.id,
                      activeViewModel: this.composeVm.currentViewModel,
                      newTab: id
                  }).then(b => (b ? this.activate(id) : undefined));
              }
              else {
                  return Promise.resolve(false);
              }
          });
      }
      closeTab(id) {
          return __awaiter(this, void 0, void 0, function* () {
              const tab = this.tabs.find(t => t.id === id);
              let result = true;
              if (this.activeTab.id === id && this.composeVm.currentViewModel) {
                  result = yield UIInternal.invokeLifecycle(this.composeVm.currentViewModel, "canDeactivate");
              }
              if (result) {
                  return UIInternal.fireCallbackEvent(this, "beforeclose", tab.id).then(b => b ? this.remove(id) : false);
              }
              else {
                  return Promise.resolve(false);
              }
          });
      }
      created(owningView) {
          this.owningView = owningView;
      }
      attached() {
          this.composeVm.owningView = this.owningView;
          this.composeVm.viewResources = this.owningView.resources;
          this.obResize = new ResizeObserver(() => this.calculateOverflow());
          this.obResize.observe(this.element);
          this.isAttached = true;
          this.tabsChanged();
      }
      detached() {
          this.obResize.disconnect();
      }
      innerTabsChanged() {
          this.tabs = this.innerTabs || this.tabs;
          this.tabsChanged();
      }
      tabsChanged() {
          if (this.isAttached) {
              this.active = (this.tabs.find(tab => tab.active) || {}).id;
              if (!this.active) {
                  this.activeTab = this.tabs.find(tab => !tab.disabled) || {};
                  this.active = this.activeTab.id;
                  this.activeTab.active = true;
              }
              UIInternal.queueTask(() => this.calculateOverflow());
          }
      }
      activate(id) {
          const newTab = this.tabs.find(tab => tab.id === id);
          if (newTab && !newTab.disabled) {
              this.element.dispatchEvent(UIInternal.createEvent("change", id));
              if (this.activeTab) {
                  this.activeTab.active = false;
              }
              this.activeTab = newTab;
              this.active = this.activeTab.id;
              this.activeTab.active = true;
              return true;
          }
          return false;
      }
      remove(id) {
          const tab = this.tabs.find(t => t.id === id);
          this.element.dispatchEvent(UIInternal.createEvent("close", id));
          this.overflowEl.innerHTML = "";
          UIInternal.queueTask(() => {
              this.tabs = [...this.tabs.splice(this.tabs.indexOf(tab), 1)];
          });
          if (tab.element) {
              UIInternal.queueTask(() => aureliaFramework.DOM.removeNode(tab.element));
          }
          return true;
      }
      calculateOverflow() {
          this.hasOverflow = calculateOverflow(this.wrapperEl, this.overflowEl);
      }
  };
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Array)
  ], UITabPanel.prototype, "tabs", void 0);
  __decorate([
      aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.twoWay }),
      __metadata("design:type", String)
  ], UITabPanel.prototype, "active", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", String)
  ], UITabPanel.prototype, "align", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UITabPanel.prototype, "beforechange", void 0);
  __decorate([
      aureliaFramework.bindable(),
      __metadata("design:type", Function)
  ], UITabPanel.prototype, "beforeclose", void 0);
  __decorate([
      aureliaFramework.children("ui-tab"),
      __metadata("design:type", Array)
  ], UITabPanel.prototype, "innerTabs", void 0);
  __decorate([
      aureliaFramework.bindable({ bindingMode: aureliaFramework.bindingMode.toView }),
      __metadata("design:type", Object)
  ], UITabPanel.prototype, "activeTab", void 0);
  UITabPanel = __decorate([
      aureliaFramework.autoinject(),
      aureliaFramework.customElement("ui-tab-panel"),
      aureliaFramework.inlineView(view$x),
      __metadata("design:paramtypes", [Element])
  ], UITabPanel);
  const TabPanel = [UITabPanel, UITab, UITabbarStart, UITabbarEnd];

  var uiTabPanel = /*#__PURE__*/Object.freeze({
    TabPanel: TabPanel
  });

  exports.Countries = Countries;
  exports.UIDataModel = UIDataModel;
  exports.UIFrameworkConfig = UIFrameworkConfig;
  exports.broadcast = broadcast;
  exports.configure = configure;
  exports.queueMicroTask = queueMicroTask;
  exports.queueTask = queueTask;
  exports.serializable = serializable;
  exports.subscribe = subscribe;
  exports.subscribeOnce = subscribeOnce;

}));
//# sourceMappingURL=aurelia-ui-framework.js.map
