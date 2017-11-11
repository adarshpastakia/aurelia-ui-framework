"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
var ui_constants_1 = require("./utils/ui-constants");
var ui_utils_1 = require("./utils/ui-utils");
require("./elements/core/ui-glyphs");
require("./elements/core/ui-grid");
require("./elements/core/ui-page");
require("./elements/core/ui-viewport");
require("./elements/components/ui-alerts");
require("./elements/components/ui-bars");
require("./elements/components/ui-drawer");
require("./elements/components/ui-dropdown");
require("./elements/components/ui-indicators");
require("./elements/components/ui-menu");
require("./elements/components/ui-panel");
require("./elements/components/ui-sidebar");
require("./elements/components/ui-tabpanel");
require("./elements/inputs/ui-button");
require("./elements/inputs/ui-form");
require("./elements/inputs/ui-input");
require("./elements/inputs/ui-options");
require("./attributes/ui-badge");
require("./attributes/ui-colors");
require("./attributes/ui-ribbon");
require("./attributes/ui-tooltip");
require("./value-converters/ui-lodash");
require("./value-converters/ui-text");
__export(require("./utils/ui-application"));
__export(require("./utils/ui-constants"));
__export(require("./utils/ui-event"));
__export(require("./utils/ui-format"));
__export(require("./utils/ui-http"));
function configure(config, configCallback) {
    ui_utils_1.UIUtils.auContainer = config.container;
    document.documentElement.classList.add(window.browserAgent());
    config.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-grid'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-page'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-viewport')
    ]);
    config.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-alerts'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-bars'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-drawer'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dropdown'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-indicators'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-menu'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-panel'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-sidebar'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-tabpanel')
    ]);
    config.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-button'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-form'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-input'),
        aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-options')
    ]);
    config.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-badge'),
        aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-colors'),
        aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-ribbon'),
        aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-tooltip')
    ]);
    config.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-lodash'),
        aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-text')
    ]);
    var Configure = {
        title: function (t) {
            ui_constants_1.UIConstants.Title = t;
            return Configure;
        },
        subTitle: function (t) {
            ui_constants_1.UIConstants.SubTitle = t;
            return Configure;
        },
        version: function (t) {
            ui_constants_1.UIConstants.Version = t;
            return Configure;
        },
        appKey: function (t) {
            ui_constants_1.UIConstants.AppKey = t;
            return Configure;
        },
        apiUrl: function (t) {
            ui_constants_1.UIConstants.Http.BaseUrl = t;
            return Configure;
        },
        apiHeaders: function (t) {
            ui_constants_1.UIConstants.Http.Headers = t;
            return Configure;
        },
        sendAuthHeader: function (t) {
            ui_constants_1.UIConstants.Http.AuthorizationHeader = t;
            return Configure;
        },
        languages: function (l) {
            ui_constants_1.UIConstants.Languages = l;
            return Configure;
        }
    };
    if (configCallback !== undefined && typeof configCallback === 'function') {
        configCallback(Configure);
    }
    ui_utils_1.lodashMixins();
}
exports.configure = configure;
