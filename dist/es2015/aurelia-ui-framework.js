import { autoinject, Container, computedFrom, singleton, CompositionEngine, ViewCompiler } from 'aurelia-framework';
import { ValidationController, validateTrigger, ValidationRules } from 'aurelia-validation';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { a as UIAppConfig } from './chunk.js';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk2.js';
import { a as __decorate, b as __metadata } from './chunk3.js';
import { getLogger } from 'aurelia-logging';
import { metadata } from 'aurelia-metadata';
import { json, HttpClient } from 'aurelia-fetch-client';
import 'date-fns';
import 'kramed';
import 'numeral';
export { a as UIFormat } from './chunk4.js';

const registerValidators = (container) => {
    container.get(ValidationController).validateTrigger = validateTrigger.changeOrBlur;
    ValidationRules.customRule("url", (value, obj) => value === null ||
        value === undefined ||
        value === "" ||
        /^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/.test(value), "\${$displayName} is not a valid url.");
    ValidationRules.customRule("phone", (value, obj) => value === null || value === undefined || value === "" || parsePhoneNumberFromString(value).isValid(), "\${$displayName} is not a valid phone number.");
    ValidationRules.customRule("number", (value, obj, min, max) => value === null ||
        value === undefined ||
        value === "" ||
        (isNumber(value) &&
            value >= (isEmpty(min) ? Number.MIN_VALUE : min) &&
            value <= (isEmpty(max) ? Number.MAX_VALUE : max)), "\${$displayName} must be an number value between \${$config.min} and \${$config.max}.", (min, max) => ({ min, max }));
    ValidationRules.customRule("decimal", (value, obj, min, max) => value === null ||
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
      for(i of property.split('.')) key = key[i];
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

module.exports = {
  toIso2: function(c) {
    var ctry = this.find(c);
    return ctry
      ? ctry.iso2
      : null;
  },
  toIso3: function(c) {
    var ctry = this.find(c);
    return ctry
      ? ctry.iso3
      : null;
  },
  find: function(c) {
    return this.list.find(function(ct) {
      return (ct.iso3.toLowerCase() === c.toLowerCase() || ct.iso2.toLowerCase() == c.toLowerCase());
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

var _Countries = /*#__PURE__*/Object.freeze({

});

/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

String.prototype.interpolate = function(model) {
  return this.replace(/\${([^{}]*)}/g, function(a, b) {
    var r = model[b];
    return typeof r === "string" || typeof r === "number" ? r : a;
  });
};

String.prototype.ascii = function() {
  str = this.toString();
  if (isEmpty(str)) return "";
  var conversions = {};
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
  for (var i in conversions) {
    var re = new RegExp(conversions[i], "g");
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

const UA_EDGE = "ua-edge";
const UA_OPERA = "ua-opera";
const UA_CHROME = "ua-chrome";
const UA_SAFARI = "ua-safari";
const UA_FIREFOX = "ua-firefox";
const UA_UNKNOWN = "ua-unknown";

browserAgent = function() {
  var ua = (navigator.userAgent || "").toLowerCase();
  if (ua.indexOf("opr") >= 0) return UA_OPERA;
  else if (ua.indexOf("edge") >= 0) return UA_EDGE;
  else if (ua.indexOf("chrome") >= 0) return UA_CHROME;
  else if (ua.indexOf("safari") >= 0) return UA_SAFARI;
  else if (ua.indexOf("firefox") >= 0) return UA_FIREFOX;
  else return UA_UNKNOWN;
};

isTrue = function(b) {
  return /^(true|yes|1|y|on)$/i.test(b);
};
isFalse = function(b) {
  return /^(false|no|0|n|off)$/i.test(b);
};
isNull = function(a) {
  return a === undefined || a === null;
};
isEmpty = function(a) {
  if (typeof a === "number") return false;
  if (typeof a === "boolean") return false;
  if (a instanceof Map || a instanceof Set) return a.size === 0;
  return a === undefined || a === null || a === "" || a.length === 0 || Object.keys(a).length == 0;
};
isArray = Array.isArray;
isDate = function(a) {
  return a instanceof Date;
};
isString = function(a) {
  return typeof a === "string";
};
isNumber = function(a) {
  return typeof a === "number" && Number.isInteger(a);
};
isDecimal = function(a) {
  return typeof a === "number";
};
isObject = function(a) {
  return a && typeof a === "object";
};
isFunction = function(a) {
  return typeof a === "function";
};

fn = () => null;
getView = el => (el.au && el.au.controller ? el.au.controller.view : null);
getViewModel = el => (el.au && el.au.controller ? el.au.controller.viewModel : null);
getSlotViewModel = el => el.au["au-slot"].container.parent.viewModel;
getComposeViewModel = el =>
  el.au && el.au.controller ? el.au.controller.viewModel.currentViewModel : null;

isRtl = function(el) {
  rtl = false;
  do {
    if ((el.dir || el.style.direction) == "rtl") return true;
    if ((el.dir || el.style.direction) == "ltr") return false;
    el = el.parentElement;
  } while (el != null);
  return false;
};

hasParent = function(el, parent) {
  do {
    if (el === parent) return true;
    el = el.parentElement;
  } while (el !== null);
  return false;
};

getParentByTag = function(el, selector, last) {
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

getParentByClass = function(el, selector, last) {
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

convertToPx = function(size, context) {
  var baseSize = "1";
  if ((size + "").indexOf("em") > -1)
    baseSize = getComputedStyle(context || document.documentElement).fontSize;
  if ((size + "").indexOf("rem") > -1)
    baseSize = getComputedStyle(document.documentElement).fontSize;
  if ((size + "").indexOf("vw") > -1 || (size + "").indexOf("%") > -1)
    baseSize = innerWidth / 100;
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

let UIHttpService = class UIHttpService {
    constructor(httpClient, appConfig) {
        this.httpClient = httpClient;
        this.appConfig = appConfig;
        this.logger = getLogger("UIHttpService");
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
            body: json(body),
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
            body: json(body),
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
            body: json(body),
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
UIHttpService = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [HttpClient, UIAppConfig])
], UIHttpService);

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
        this.metadata = metadata.getOrCreateOwn(metadata.properties, ModelMetadata, Object.getPrototypeOf(this));
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
                value: Container.instance.get(UIHttpService),
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
                value: getLogger(this.constructor.name)
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
            Promise.reject(ERROR_CODES.REJECTED);
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
            Promise.reject(ERROR_CODES.REJECTED);
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
            Promise.reject(ERROR_CODES.REJECTED);
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
    postGet(response) {
    }
    postSave(response) {
    }
    postDelete(response) {
    }
    generateId() {
        return Math.round(Math.random() * new Date().getTime()).toString(18);
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
            Promise.reject(e);
            this.busy = false;
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
            Promise.reject(e);
            this.busy = false;
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
            Promise.reject(e);
            this.busy = false;
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
            Promise.reject(e);
            this.busy = false;
        });
    }
    doUpdate() {
        this.id = this[this.idProperty] || this.generateId();
        this.metadata.dirtyProps = [];
        this.metadata.original = Object.assign({}, this.serialize());
        this.metadata.updated = Object.assign({}, this.serialize());
    }
}
__decorate([
    computedFrom("metadata.dirtyProps.length"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], UIDataModel.prototype, "isDirty", null);
__decorate([
    computedFrom("metadata.dirtyProps.length"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataModel.prototype, "dirtyProps", null);
function serializable(defaultValue = null) {
    return (target, property) => {
        if (!property) {
            throw Error("Decorator should be used on property only!");
        }
        const meta = metadata.getOrCreateOwn(metadata.properties, ModelMetadata, target);
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

let UIApplication = class UIApplication {
    constructor(config) {
        this.config = config;
        this.logger = getLogger("UIApplication");
    }
    log(tag, ...rest) {
        this.logger.info(tag, ...rest);
    }
    debug(tag, ...rest) {
        this.logger.debug(tag, ...rest);
    }
};
UIApplication = __decorate([
    singleton(),
    autoinject(),
    __metadata("design:paramtypes", [UIAppConfig])
], UIApplication);

let UIDialogService = class UIDialogService {
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
        this.openDialog(viewModel, model);
    }
    openModal(viewModel, model) {
        this.openDialog(viewModel, model, true);
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
            document.addEventListener("mouseup", e => this.stopDrag(e));
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
        this.dragObject = Object.assign({}, startObject, { dlgHeight: startObject.dialog.dialogEl.offsetHeight, dlgWidth: startObject.dialog.dialogEl.offsetWidth, isDragging: true, left: parseInt(startObject.dialog.position.left, 10), maxHeight: this.appConfig.DialogContainer.anchor.offsetHeight, maxWidth: this.appConfig.DialogContainer.anchor.offsetWidth, top: parseInt(startObject.dialog.position.top, 10) });
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
    stopDrag($event) {
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
        if (isString(instruction.viewModel)) {
            return this.compositionEngine.ensureViewModel(instruction);
        }
        return Promise.resolve(instruction);
    }
};
UIDialogService = __decorate([
    autoinject(),
    singleton(),
    __metadata("design:paramtypes", [UIAppConfig,
        Container,
        CompositionEngine])
], UIDialogService);

var alertView = "<div class=\"ui-dialog__wrapper\" data-modal.bind=\"true\" ref=\"__el\" keydown.delegate=\"__keyCheck($event.keyCode)\">\n  <input blur.trigger=\"$event.target.focus()\" readonly.one-time=\"true\" tabindex=\"0\" css.bind=\"{opacity:0}\" ref=\"keyEl\">\n  <div class=\"ui-panel-base ui-dialog\" ui-border=\"xy ${theme}\" data-active.bind=\"true\" css.bind=\"{minWidth: '18rem'}\">\n    <div class=\"ui-panel__body\" ref=\"vmElement\">\n      <ui-row ui-color.bind=\"theme\">\n        <ui-col ui-padding=\"sm\" size=\"auto\" if.bind=\"icon\" ui-font=\"xl\">\n          <ui-icon icon.bind=\"icon\"></ui-icon>\n        </ui-col>\n        <ui-col ui-padding=\"sm\" size=\"fill\">\n          <div if.bind=\"title\" ui-weight=\"medium\" innerhtml.bind=\"title\"></div>\n          <div innerhtml.bind=\"message\"></div>\n        </ui-col>\n      </ui-row>\n    </div>\n    <div class=\"ui-footer\" ui-padding=\"y--sm\" ui-align=\"center\">\n      <ui-button if.bind=\"type!=='alert'\" click.trigger=\"__close(false)\" ui-theme.bind=\"theme\" type=\"outline\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${cancelLabel}</ui-button>\n      <ui-button click.trigger=\"__close(true)\" ui-theme.bind=\"theme\" type=\"solid\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${okLabel}</ui-button>\n    </div>\n  </div>\n</div>\n";

var toastView = "<div class=\"${class} ui-alert\" data-open=\"false\" ui-theme.bind=\"theme\" ref=\"__el\">\n    <div class=\"ui-alert__wrapper\">\n      <div if.bind=\"icon\" class=\"ui-alert__icon\"><ui-icon icon.bind=\"icon\"></ui-icon></div>\n      <div if.bind=\"title\" class=\"ui-alert__title\" innerhtml.bind=\"title\"></div>\n      <div class=\"ui-alert__body\" innerhtml.bind=\"message\"></div>\n      <div class=\"ui-alert__close\" click.trigger=\"__close(false)\">\n        <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n      </div>\n      <div class=\"ui-alert__footer\" if.bind=\"type==='confirm'\">\n        <a click.trigger=\"__close(false)\">${cancelLabel}</a>\n        <a click.trigger=\"__close(true)\" ui-weight=\"bold\">${okLabel}</a>\n      </div>\n      <div if.bind=\"autoClose\" class=\"ui-alert__progress\" css.bind=\"{transitionDuration: timeout+'ms'}\"></div>\n    </div>\n  </div>\n\n";

let UINotificationService = class UINotificationService {
    constructor(appConfig, container, compiler) {
        this.appConfig = appConfig;
        this.container = container;
        this.compiler = compiler;
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
            const cfg = Object.assign({ autoClose: true, cancelLabel: "Cancel", okLabel: "OK", theme: "default", timeout: 5000, type: "default", class: forToastNotification ? "ui-toast" : "ui-message" }, config);
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
            UIInternal.queueTask(() => (view.firstChild.dataset.open = "true"));
        });
    }
    createAlert(config) {
        return new Promise(resolve => {
            const cfg = Object.assign({ cancelLabel: "Cancel", okLabel: "OK", theme: "default", type: "alert" }, config);
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
            cfg.keyEl.focus();
        });
    }
};
UINotificationService = __decorate([
    singleton(),
    autoinject(),
    __metadata("design:paramtypes", [UIAppConfig,
        Container,
        ViewCompiler])
], UINotificationService);

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
var UIResources;
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
})(UIResources || (UIResources = {}));
const RESOURCE_LOADER = {
    viewport: () => import('./ui-viewport.js').then(m => m.Viewport),
    page: () => import('./ui-page.js').then(m => m.Page),
    icons: () => import('./ui-icons.js').then(m => m.Icons),
    responsive: () => import('./ui-responsive.js').then(m => m.Responsive),
    shared: () => import('./ui-shared.js').then(m => m.Shared),
    attributes: () => import('./ui-attributes.js').then(m => m.Attributes),
    valueconverters: () => import('./value-converters.js').then(m => m.ValueConverters),
    [UIResources.Buttons]: () => import('./ui-buttons.js').then(m => m.Buttons),
    [UIResources.Calendar]: () => import('./ui-calendar.js').then(m => m.Calendar),
    [UIResources.Card]: () => import('./ui-card.js').then(m => m.Card),
    [UIResources.DataPanel]: () => import('./ui-data-panels.js').then(m => m.DataPanels),
    [UIResources.Forms]: () => import('./ui-forms.js').then(m => m.Forms),
    [UIResources.Gridder]: () => import('./ui-gridder.js').then(m => m.Gridder),
    [UIResources.Lists]: () => import('./ui-lists.js').then(m => m.Lists),
    [UIResources.Menus]: () => import('./ui-menus.js').then(m => m.Menus),
    [UIResources.Panel]: () => import('./ui-panels.js').then(m => m.Panels),
    [UIResources.TabPanel]: () => import('./ui-tab-panel.js').then(m => m.TabPanel)
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
        this.useResource(UIResources.Buttons);
        this.useResource(UIResources.Calendar);
        this.useResource(UIResources.Card);
        this.useResource(UIResources.DataPanel);
        this.useResource(UIResources.Forms);
        this.useResource(UIResources.Gridder);
        this.useResource(UIResources.Lists);
        this.useResource(UIResources.Menus);
        this.useResource(UIResources.Panel);
        this.useResource(UIResources.TabPanel);
    }
    useResource(resource) {
        this.resources.push(resource);
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
    Container.instance = auConfig.container;
    auConfig.container.registerHandler("ui-validator", container => container.get(UIValidationRenderer));
    registerValidators(auConfig.container);
    let loadResources;
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

export { Countries, UIApplication, UIDataModel, UIDialogService, UIFrameworkConfig, UIHttpService, UINotificationService, UIResources, broadcast, configure, queueMicroTask, queueTask, serializable, subscribe, subscribeOnce };
//# sourceMappingURL=aurelia-ui-framework.js.map
