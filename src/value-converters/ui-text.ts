/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

// tslint:disable
import { valueConverter } from "aurelia-framework";
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import { UIFormat } from "../utils/ui-format";

const getPhone = (value = "", country = "us") => {
  const number = parsePhoneNumberFromString(value || "", country as CountryCode);
  return number ? number : {
    country: "",
    formatNational: () => "",
    formatInternational: () => ""
  };
};

@valueConverter("json")
export class JsonValueConverter {
  public toView(value: AnyObject): string {
    return JSON.stringify(value);
  }
}

@valueConverter("md")
export class MarkdownValueConverter {
  public toView(value: string): string {
    return UIFormat.toHTML(value || "");
  }
}

@valueConverter("phone")
export class PhoneValueConverter {
  public toView(value: string, country = ""): string {
    return getPhone(value, country).formatInternational();
  }
}

@valueConverter("phoneLocal")
export class PhoneLocalValueConverter {
  public toView(value: string, country = "us"): string {
    return getPhone(value, country).formatNational();
  }
}

@valueConverter("phoneHtml")
export class PhoneHtmlValueConverter {
  public toView(value: string, country = ""): string {
    const phoneNumber = getPhone(value, country);
    return `<span class="ui-flag ${phoneNumber.country}"></span>&nbsp;${phoneNumber.formatInternational()}`;
  }
}

@valueConverter("phoneLocalHtml")
export class PhoneLocalHtmlValueConverter {
  public toView(value: string, country = "us"): string {
    const phoneNumber = getPhone(value, country);
    return `<span class="ui-flag ${phoneNumber.country}"></span>&nbsp;${phoneNumber.formatNational()}`;
  }
}

// Dates
@valueConverter("date")
export class DateValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.date(value, format);
  }
}

@valueConverter("time")
export class TimeValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.time(value, format);
  }
}

@valueConverter("datetime")
export class DatetimeValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.datetime(value, format);
  }
}

@valueConverter("fromnow")
export class FromNowValueConverter {
  public toView(value: string): string {
    return UIFormat.fromNow(value);
  }
}

@valueConverter("age")
export class AgeValueConverter {
  public toView(value: string): string {
    return UIFormat.age(value);
  }
}

@valueConverter("utc")
export class UtcValueConverter {
  public toView(value: string): string {
    return UIFormat.utcDate(value);
  }
}

@valueConverter("iso")
export class IsoValueConverter {
  public toView(value: string): string {
    return UIFormat.dateToISO(value);
  }
}

// Numbers
@valueConverter("number")
export class NumberValueConverter {
  public toView(value: string, format?: string): string {
    return UIFormat.number(value, format);
  }
}

@valueConverter("currency")
export class CurrencyValueConverter {
  public toView(value: string, symbol?: string, format?: string): string {
    return UIFormat.currency(value, symbol, format);
  }
}

@valueConverter("percent")
export class PercentValueConverter {
  public toView(value: string): string {
    return UIFormat.percent(value);
  }
}
