"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
var aurelia_validation_1 = require("aurelia-validation");
var ui_validation_1 = require("./utils/ui-validation");
var ui_constants_1 = require("./utils/ui-constants");
var ui_utils_1 = require("./utils/ui-utils");
require("lodash");
require("moment");
require("numeral");
require("./libs/countries");
require("./libs/currencies");
require("./libs/filetypes");
require("./libs/phonelib");
require("./libs/window");
var ld = require("lodash");
var km = require("kramed");
var mm = require("moment");
var nm = require("numeral");
exports._ = ld;
exports.kramed = km;
exports.moment = mm;
exports.numeral = nm;
__export(require("./utils/ui-application"));
__export(require("./utils/ui-constants"));
__export(require("./utils/ui-dialog"));
__export(require("./utils/ui-event"));
__export(require("./utils/ui-format"));
__export(require("./utils/ui-http"));
__export(require("./data/ui-data-source"));
__export(require("./data/ui-data-model"));
__export(require("./data/ui-tree-model"));
__export(require("./utils/ui-utils"));
function configure(config, configCallback) {
    ui_utils_1.UIUtils.auContainer = config.container;
    document.documentElement.classList.add(window.browserAgent());
    aurelia_validation_1.ValidationController.prototype.validateTrigger = aurelia_validation_1.validateTrigger.changeOrBlur;
    config.container.registerHandler('ui-validator', function (container) { return container.get(ui_validation_1.UIValidationRenderer); });
    if (config.globalResources) {
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-grid'), aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-page'), aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-viewport'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-button'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-date'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-form'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-input'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-lists'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-options'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-phone'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-textarea'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-markdown'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-alerts'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-bars'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-breadcrumb'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-datagrid'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dg-columns'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-drawer'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dropdown'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-menu'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-panel'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-sidebar'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-tab'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-tree'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-badge'), aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-ribbon'), aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-tooltip'), aurelia_pal_1.PLATFORM.moduleName('./attributes/md-view'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-lodash'), aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-text'));
    }
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
    ui_validation_1.loadValidators();
    ui_utils_1.lodashMixins();
}
exports.configure = configure;
