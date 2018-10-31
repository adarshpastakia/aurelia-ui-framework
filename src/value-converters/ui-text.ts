/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { UIFormat } from "../utils/ui-format";

export class JsonValueConverter {
  public toView(value: AnyObject): string {
    return JSON.stringify(value);
  }
}

export class MarkdownValueConverter {
  public toView(value: string): string {
    return UIFormat.toHTML(value || '');
  }
}

export class PhoneValueConverter {
  public toView(value: string, country = ''): string {
    return PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL);
  }
}

export class PhoneLocalValueConverter {
  public toView(value: string, country = 'us'): string {
    return PhoneLib.format(value || '', country, PhoneLib.FORMAT.NATIONAL);
  }
}

export class PhoneHtmlValueConverter {
  public toView(value: string, country = ''): string {
    const code = PhoneLib.getIso2Code(value || '', country);
    return `<span class="ui-flag ${code}"></span>&nbsp;${PhoneLib.format(value || '', country, PhoneLib.FORMAT.INTERNATIONAL)}`;
  }
}

export class PhoneLocalHtmlValueConverter {
  public toView(value: string, country = 'us'): string {
    const code = PhoneLib.getIso2Code(value || '', country);
    return `<span class="ui-flag ${code}"></span>&nbsp;${PhoneLib.format(value || '', country, PhoneLib.FORMAT.NATIONAL)}`;
  }
}

// Dates
export class DateValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.date(value, format);
  }
}
export class TimeValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.time(value, format);
  }
}
export class DatetimeValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.datetime(value, format);
  }
}
export class FromNowValueConverter {
  public toView(value: string): string {
    return UIFormat.fromNow(value);
  }
}
export class AgeValueConverter {
  public toView(value: string): string {
    return UIFormat.age(value);
  }
}
export class UtcValueConverter {
  public toView(value: string): string {
    return UIFormat.utcDate(value);
  }
}

// Numbers
export class NumberValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.number(value, format);
  }
}
export class CurrencyValueConverter {
  public toView(value: string, symbol?: string, format?: string): string {
    return UIFormat.currency(value, symbol, format);
  }
}
export class PercentValueConverter {
  public toView(value: string): string {
    return UIFormat.percent(value);
  }
}
