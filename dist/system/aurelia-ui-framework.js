System.register(["aurelia-pal", "aurelia-validation", "./utils/ui-validation", "./utils/ui-constants", "./utils/ui-utils", "lodash", "moment", "numeral", "./libs/countries", "./libs/currencies", "./libs/filetypes", "./libs/phonelib", "./libs/window", "kramed", "./utils/ui-application", "./utils/ui-dialog", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "./data/ui-data-source", "./data/ui-data-model", "./data/ui-tree-model"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    var aurelia_pal_1, aurelia_validation_1, ui_validation_1, ui_constants_1, ui_utils_1, ld, km, mm, nm, _, kramed, moment, numeral;
    var exportedNames_1 = {
        "_": true,
        "kramed": true,
        "moment": true,
        "numeral": true,
        "configure": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (aurelia_validation_1_1) {
                aurelia_validation_1 = aurelia_validation_1_1;
            },
            function (ui_validation_1_1) {
                ui_validation_1 = ui_validation_1_1;
            },
            function (ui_constants_1_1) {
                ui_constants_1 = ui_constants_1_1;
                exportStar_1(ui_constants_1_1);
            },
            function (ui_utils_1_1) {
                ui_utils_1 = ui_utils_1_1;
                exportStar_1(ui_utils_1_1);
            },
            function (ld_1) {
                ld = ld_1;
            },
            function (mm_1) {
                mm = mm_1;
            },
            function (nm_1) {
                nm = nm_1;
            },
            function (_1) {
            },
            function (_2) {
            },
            function (_3) {
            },
            function (_4) {
            },
            function (_5) {
            },
            function (km_1) {
                km = km_1;
            },
            function (ui_application_1_1) {
                exportStar_1(ui_application_1_1);
            },
            function (ui_dialog_1_1) {
                exportStar_1(ui_dialog_1_1);
            },
            function (ui_event_1_1) {
                exportStar_1(ui_event_1_1);
            },
            function (ui_format_1_1) {
                exportStar_1(ui_format_1_1);
            },
            function (ui_http_1_1) {
                exportStar_1(ui_http_1_1);
            },
            function (ui_data_source_1_1) {
                exportStar_1(ui_data_source_1_1);
            },
            function (ui_data_model_1_1) {
                exportStar_1(ui_data_model_1_1);
            },
            function (ui_tree_model_1_1) {
                exportStar_1(ui_tree_model_1_1);
            }
        ],
        execute: function () {
            exports_1("_", _ = ld);
            exports_1("kramed", kramed = km);
            exports_1("moment", moment = mm);
            exports_1("numeral", numeral = nm);
        }
    };
});
