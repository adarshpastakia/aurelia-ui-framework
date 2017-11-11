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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3VpLWNvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFLQSxJQUFjLFdBQVcsQ0FvQ3hCO0lBcENELFdBQWMsV0FBVztRQUVaLGtCQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsaUJBQUssR0FBRyxzQkFBc0IsQ0FBQztRQUMvQixvQkFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLG1CQUFPLEdBQUcsT0FBTyxDQUFDO1FBRWxCLGdCQUFJLEdBQUc7WUFDaEIsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsRUFBRTtZQUNYLG1CQUFtQixFQUFFLEtBQUs7U0FDM0IsQ0FBQTtRQUVVLHFCQUFTLEdBQUc7WUFDckIsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFO1lBQ2pELEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUN0QyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUM3QixFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ3ZDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDdkMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN4QyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDcEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDbEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUN2QyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3hDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDNUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUMzQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ3ZDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDcEMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUMxQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLDRCQUE0QixFQUFFO1lBQ2hELEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUU7WUFDN0MsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSwyQkFBMkIsRUFBRTtTQUNoRCxDQUFBO0lBQ0gsQ0FBQyxFQXBDYSxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQW9DeEIiLCJmaWxlIjoidXRpbHMvdWktY29uc3RhbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9cbi8vIEBkZXNjcmlwdGlvbiA6XG4vLyBAYXV0aG9yICAgICAgOiBBZGFyc2ggUGFzdGFraWFcbi8vIEBjb3B5cmlnaHQgICA6IDIwMTdcbi8vIEBsaWNlbnNlICAgICA6IE1JVFxuZXhwb3J0IG1vZHVsZSBVSUNvbnN0YW50cyB7XG5cbiAgZXhwb3J0IHZhciBBcHBLZXkgPSAnQVVGJztcbiAgZXhwb3J0IHZhciBUaXRsZSA9ICdBdXJlbGlhIFVJIEZyYW1ld29yayc7XG4gIGV4cG9ydCB2YXIgU3ViVGl0bGUgPSAnJztcbiAgZXhwb3J0IHZhciBWZXJzaW9uID0gJzQuMC4wJztcblxuICBleHBvcnQgdmFyIEh0dHAgPSB7XG4gICAgQmFzZVVybDogJy4vJyxcbiAgICBIZWFkZXJzOiB7fSxcbiAgICBBdXRob3JpemF0aW9uSGVhZGVyOiBmYWxzZVxuICB9XG5cbiAgZXhwb3J0IHZhciBMYW5ndWFnZXMgPSBbXG4gICAgeyBpZDogJ2FyJywgbmFtZTogJ9in2YTYudix2KjZitipIChBcmFiaWMpJywgcnRsOiB0cnVlIH0sXG4gICAgeyBpZDogJ2RlJywgbmFtZTogJ0RldXRzY2ggKEdlcm1hbiknIH0sXG4gICAgeyBpZDogJ2VsJywgbmFtZTogJ861zrvOu863zr3Ouc66zqwgKEdyZWVrKScgfSxcbiAgICB7IGlkOiAnZW4nLCBuYW1lOiAnRW5nbGlzaCcgfSxcbiAgICB7IGlkOiAnZXMnLCBuYW1lOiAnRXNwYcOxb2wgKFNwYW5pc2gpJyB9LFxuICAgIHsgaWQ6ICdmcicsIG5hbWU6ICdGcmFuw6dhaXMgKEZyZW5jaCknIH0sXG4gICAgeyBpZDogJ2hpJywgbmFtZTogJ+CkueCkv+CkguCkpuClgCAoSGluZGkpJyB9LFxuICAgIHsgaWQ6ICdpZCcsIG5hbWU6ICdCYWhhc2EgKEluZG9uZXNpYSknIH0sXG4gICAgeyBpZDogJ2l0JywgbmFtZTogJ0l0YWxpYW5vIChJdGFsaWFuKScgfSxcbiAgICB7IGlkOiAnamEnLCBuYW1lOiAn5pel5pys6KqeIChKYXBhbmVzZSknIH0sXG4gICAgeyBpZDogJ2tvJywgbmFtZTogJ+2VnOq1reyWtCAoS29yZWFuKScgfSxcbiAgICB7IGlkOiAnbXMnLCBuYW1lOiAnTWFsYXkgKE1hbGF5c2lhbiknIH0sXG4gICAgeyBpZDogJ25sJywgbmFtZTogJ05lZGVybGFuZHMgKER1dGNoKScgfSxcbiAgICB7IGlkOiAncHQnLCBuYW1lOiAnUG9ydHVndcOqcyAoUG9ydHVndWVzZSknIH0sXG4gICAgeyBpZDogJ3B0LWJyJywgbmFtZTogJ1BvcnR1Z3XDqnMgKEJyYXNpbCknIH0sXG4gICAgeyBpZDogJ3J1JywgbmFtZTogJ9Cg0YPRgdGB0LrQuNC5IChSdXNzaWFuKScgfSxcbiAgICB7IGlkOiAndGgnLCBuYW1lOiAn4Lig4Liy4Lip4Liy4LmE4LiX4LiiIChUaGFpKScgfSxcbiAgICB7IGlkOiAndGwnLCBuYW1lOiAnVGFnYWxvZyAoUGhpbGlwaW5lcyknIH0sXG4gICAgeyBpZDogJ3R3JywgbmFtZTogJ+e5gemrlOS4reaWhyAoVHJhZGl0aW9uYWwgQ2hpbmVzZSknIH0sXG4gICAgeyBpZDogJ3ZpJywgbmFtZTogJ1Rp4bq/bmcgVmnhu4d0IChWaWV0bmFtZXNlKScgfSxcbiAgICB7IGlkOiAnemgnLCBuYW1lOiAn566A5L2T5Lit5paHIChTaW1wbGlmaWVkIENoaW5lc2UpJyB9XG4gIF1cbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=
