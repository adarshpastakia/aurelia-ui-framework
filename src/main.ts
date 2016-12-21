import {Aurelia} from 'aurelia-framework';
import {AppRouter} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import * as Backend from 'i18next-xhr-backend';
import environment from './environment';

//Configure Bluebird Promises.
(<any>Promise).config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-validation')
    .plugin('aurelia-i18n', (instance) => {
      // register backend plugin
      instance.i18next.use(Backend);

      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        ns: ['common', 'home'],
        defaultNS: 'common',
        attributes: ['t', 'i18n'],
        lng: 'en',
        fallbackLng: 'en',
        debug: false
      }).then(() => {
        aurelia.container.get(AppRouter).transformTitle = title => instance.tr(title);
      });
    })
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
