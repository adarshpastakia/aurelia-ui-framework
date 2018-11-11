/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

interface PhoneLibStatic {
  format(phone: string, code?: string, format?: number): string;
  getType(phone: string, code?: string): number;
  isValid(phone: string, code?: string): boolean;
  getError(phone: string, code?: string): number;
  getExample(code: string, type?: number, national?: boolean): string;
  formatInput(phone: string, code?: string, suf?: boolean, ext?: boolean): string;
  getIso2Code(phone: string, code?: string): string;
  getDialingCode(code: string): string;
  getNumberInfo(phone: string, code?: string): any;

  TYPE: UIPhoneLib.TYPE;
  ERROR: UIPhoneLib.ERROR;
  FORMAT: typeof UIPhoneLib.FORMAT;
}

enum TYPE {
  FIXED_LINE = 0,
  MOBILE = 1,
  FIXED_LINE_OR_MOBILE = 2,
  TOLL_FREE = 3,
  PREMIUM_RATE = 4,
  SHARED_COST = 5,
  VOIP = 6,
  PERSONAL_NUMBER = 7,
  PAGER = 8,
  UAN = 9,
  VOICEMAIL = 10,
  UNKNOWN = -1
}


enum ERROR {
  IS_POSSIBLE = 0,
  INVALID_COUNTRY_CODE = 1,
  TOO_SHORT = 2,
  TOO_LONG = 3,
  NOT_A_NUMBER = 4
}

enum FORMAT {
  FULL = 0,
  INTERNATIONAL = 1,
  NATIONAL = 2,
  LINK = 3
}

declare var PhoneLib: PhoneLibStatic;

declare module 'PhoneLib' {
  export = PhoneLib;
}

