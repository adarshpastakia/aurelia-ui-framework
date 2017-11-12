define(["require", "exports"], function (require, exports) {
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
