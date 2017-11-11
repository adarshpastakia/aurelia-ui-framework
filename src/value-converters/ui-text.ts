//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import { UIFormat } from "../utils/ui-format";

export class JsonValueConverter {
  toView(value: any) {
    return JSON.stringify(value);
  }
}

export class MarkdownValueConverter {
  toView(value: string) {
    return UIFormat.toHTML(value || '');
  }
}

export class PhoneValueConverter {
  toView(value: string, country = '') {
    return PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
  }
}

// Dates
export class DateValueConverter {
  toView(value: string, format?: string) {
    return UIFormat.date(value, format);
  }
}
export class TimeValueConverter {
  toView(value: string, format?: string) {
    return UIFormat.time(value, format);
  }
}
export class DatetimeValueConverter {
  toView(value: string, format?: string) {
    return UIFormat.datetime(value, format);
  }
}
export class FromNowValueConverter {
  toView(value: string) {
    return UIFormat.fromNow(value);
  }
}
export class UtcValueConverter {
  toView(value: string) {
    return UIFormat.utcDate(value);
  }
}

// Numbers
export class NumberValueConverter {
  toView(value: string, format?: string) {
    return UIFormat.number(value, format);
  }
}
export class CurrencyValueConverter {
  toView(value: string, symbol?: string, format?: string) {
    return UIFormat.currency(value, symbol, format);
  }
}
export class PercentValueConverter {
  toView(value: string) {
    return UIFormat.percent(value);
  }
}
