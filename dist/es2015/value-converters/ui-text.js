import { UIFormat } from "../utils/ui-format";
export class JsonValueConverter {
    toView(value) {
        return JSON.stringify(value);
    }
}
export class MarkdownValueConverter {
    toView(value) {
        return UIFormat.toHTML(value || '');
    }
}
export class PhoneValueConverter {
    toView(value, country = '') {
        return PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
    }
}
export class DateValueConverter {
    toView(value, format) {
        return UIFormat.date(value, format);
    }
}
export class TimeValueConverter {
    toView(value, format) {
        return UIFormat.time(value, format);
    }
}
export class DatetimeValueConverter {
    toView(value, format) {
        return UIFormat.datetime(value, format);
    }
}
export class FromNowValueConverter {
    toView(value) {
        return UIFormat.fromNow(value);
    }
}
export class UtcValueConverter {
    toView(value) {
        return UIFormat.utcDate(value);
    }
}
export class NumberValueConverter {
    toView(value, format) {
        return UIFormat.number(value, format);
    }
}
export class CurrencyValueConverter {
    toView(value, symbol, format) {
        return UIFormat.currency(value, symbol, format);
    }
}
export class PercentValueConverter {
    toView(value) {
        return UIFormat.percent(value);
    }
}
