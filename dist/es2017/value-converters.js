import { valueConverter } from 'aurelia-framework';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { a as __decorate } from './chunk3.js';
import 'date-fns';
import 'kramed';
import 'numeral';
import { a as UIFormat } from './chunk4.js';

let SplitValueConverter = class SplitValueConverter {
    toView(object, char = ",") {
        return (object || "").split(new RegExp(`[${char}]`));
    }
};
SplitValueConverter = __decorate([
    valueConverter("split")
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
    valueConverter("objectMap")
], ObjectMapValueConverter);
let GroupValueConverter = class GroupValueConverter {
    toView(array, property) {
        return array.groupBy(property);
    }
};
GroupValueConverter = __decorate([
    valueConverter("group")
], GroupValueConverter);
let SliceValueConverter = class SliceValueConverter {
    toView(array, end = 0) {
        return end === 0 ? array : array.slice(0, end);
    }
};
SliceValueConverter = __decorate([
    valueConverter("slice")
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
    valueConverter("filter")
], FilterValueConverter);
let OrderByValueConverter = class OrderByValueConverter {
    toView(array, property, isAscending = true) {
        if (isEmpty(array)) {
            return [];
        }
        if (array instanceof Map) {
            return new Map([...array].sort((a, b) => (a[property] > b[property] ? 1 : -1)));
        }
        return [...array].sort((a, b) => (a[property] > b[property] ? 1 : -1));
    }
};
OrderByValueConverter = __decorate([
    valueConverter("orderBy")
], OrderByValueConverter);
let SortValueConverter = class SortValueConverter {
    toView(array, property, isAscending = true) {
        if (isEmpty(array)) {
            return [];
        }
        if (array instanceof Map) {
            return new Map([...array].sortBy("0", !!property));
        }
        return [...array].sortBy(property, isAscending && !!property !== false);
    }
};
SortValueConverter = __decorate([
    valueConverter("sort")
], SortValueConverter);

const getPhone = (value = "", country = "us") => {
    const number = parsePhoneNumberFromString(value || "", country);
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
    valueConverter("json")
], JsonValueConverter);
let MarkdownValueConverter = class MarkdownValueConverter {
    toView(value) {
        return UIFormat.toHTML(value || "");
    }
};
MarkdownValueConverter = __decorate([
    valueConverter("md")
], MarkdownValueConverter);
let PhoneValueConverter = class PhoneValueConverter {
    toView(value, country = "") {
        return getPhone(value, country).formatInternational();
    }
};
PhoneValueConverter = __decorate([
    valueConverter("phone")
], PhoneValueConverter);
let PhoneLocalValueConverter = class PhoneLocalValueConverter {
    toView(value, country = "us") {
        return getPhone(value, country).formatNational();
    }
};
PhoneLocalValueConverter = __decorate([
    valueConverter("phoneLocal")
], PhoneLocalValueConverter);
let PhoneHtmlValueConverter = class PhoneHtmlValueConverter {
    toView(value, country = "") {
        const phoneNumber = getPhone(value, country);
        return `<span class="ui-flag ${phoneNumber.country}"></span>&nbsp;${phoneNumber.formatInternational()}`;
    }
};
PhoneHtmlValueConverter = __decorate([
    valueConverter("phoneHtml")
], PhoneHtmlValueConverter);
let PhoneLocalHtmlValueConverter = class PhoneLocalHtmlValueConverter {
    toView(value, country = "us") {
        const phoneNumber = getPhone(value, country);
        return `<span class="ui-flag ${phoneNumber.country}"></span>&nbsp;${phoneNumber.formatNational()}`;
    }
};
PhoneLocalHtmlValueConverter = __decorate([
    valueConverter("phoneLocalHtml")
], PhoneLocalHtmlValueConverter);
let DateValueConverter = class DateValueConverter {
    toView(value, format) {
        return UIFormat.date(value, format);
    }
};
DateValueConverter = __decorate([
    valueConverter("date")
], DateValueConverter);
let TimeValueConverter = class TimeValueConverter {
    toView(value, format) {
        return UIFormat.time(value, format);
    }
};
TimeValueConverter = __decorate([
    valueConverter("time")
], TimeValueConverter);
let DatetimeValueConverter = class DatetimeValueConverter {
    toView(value, format) {
        return UIFormat.datetime(value, format);
    }
};
DatetimeValueConverter = __decorate([
    valueConverter("datetime")
], DatetimeValueConverter);
let FromNowValueConverter = class FromNowValueConverter {
    toView(value) {
        return UIFormat.fromNow(value);
    }
};
FromNowValueConverter = __decorate([
    valueConverter("fromnow")
], FromNowValueConverter);
let AgeValueConverter = class AgeValueConverter {
    toView(value) {
        return UIFormat.age(value);
    }
};
AgeValueConverter = __decorate([
    valueConverter("age")
], AgeValueConverter);
let UtcValueConverter = class UtcValueConverter {
    toView(value) {
        return UIFormat.utcDate(value);
    }
};
UtcValueConverter = __decorate([
    valueConverter("utc")
], UtcValueConverter);
let IsoValueConverter = class IsoValueConverter {
    toView(value) {
        return UIFormat.dateToISO(value);
    }
};
IsoValueConverter = __decorate([
    valueConverter("iso")
], IsoValueConverter);
let NumberValueConverter = class NumberValueConverter {
    toView(value, format) {
        return UIFormat.number(value, format);
    }
};
NumberValueConverter = __decorate([
    valueConverter("number")
], NumberValueConverter);
let CurrencyValueConverter = class CurrencyValueConverter {
    toView(value, symbol, format) {
        return UIFormat.currency(value, symbol, format);
    }
};
CurrencyValueConverter = __decorate([
    valueConverter("currency")
], CurrencyValueConverter);
let PercentValueConverter = class PercentValueConverter {
    toView(value) {
        return UIFormat.percent(value);
    }
};
PercentValueConverter = __decorate([
    valueConverter("percent")
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

export { ValueConverters };
//# sourceMappingURL=value-converters.js.map
