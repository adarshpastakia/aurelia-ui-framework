//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
export module UIConstants {

  export var AppKey = 'AUF';
  export var Title = 'Aurelia UI Framework';
  export var SubTitle = '';
  export var Version = '4.0.0';

  export var Http: { BaseUrl: string, Headers: any, AuthorizationHeader: any } = {
    BaseUrl: './',
    Headers: {},
    AuthorizationHeader: false
  }

  export var Languages = [
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
  ]
}
