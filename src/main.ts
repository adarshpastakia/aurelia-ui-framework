import {Aurelia} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AppRouter} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import * as Backend from 'i18next-xhr-backend';
import environment from './environment';

import 'moment/min/locales.min';

// //Configure Bluebird Promises.
(<any>Promise).config({
  // longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-animator-css')
    .plugin('aurelia-validation')
    .plugin('aurelia-ui-virtualization')
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
        const router = aurelia.container.get(AppRouter);
        const eventAggregator = aurelia.container.get(EventAggregator);
        router.transformTitle = title => instance.tr(title);
        eventAggregator.subscribe('i18n:locale:changed', () => {
          router.updateTitle();
        });
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
