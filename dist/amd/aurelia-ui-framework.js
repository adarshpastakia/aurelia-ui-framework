define(["require", "exports", "aurelia-pal", "aurelia-validation", "./utils/ui-validation", "./utils/ui-constants", "./utils/ui-utils", "lodash", "kramed", "moment", "numeral", "./utils/ui-application", "./utils/ui-constants", "./utils/ui-dialog", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "./data/ui-data-source", "./data/ui-data-model", "./data/ui-tree-model", "./utils/ui-utils", "lodash", "moment", "numeral", "./libs/countries", "./libs/currencies", "./libs/filetypes", "./libs/phonelib", "./libs/window"], function (require, exports, aurelia_pal_1, aurelia_validation_1, ui_validation_1, ui_constants_1, ui_utils_1, ld, km, mm, nm, ui_application_1, ui_constants_2, ui_dialog_1, ui_event_1, ui_format_1, ui_http_1, ui_data_source_1, ui_data_model_1, ui_tree_model_1, ui_utils_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._ = ld;
    exports.kramed = km;
    exports.moment = mm;
    exports.numeral = nm;
    __export(ui_application_1);
    __export(ui_constants_2);
    __export(ui_dialog_1);
    __export(ui_event_1);
    __export(ui_format_1);
    __export(ui_http_1);
    __export(ui_data_source_1);
    __export(ui_data_model_1);
    __export(ui_tree_model_1);
    __export(ui_utils_2);
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
});
