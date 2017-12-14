System.register(["aurelia-pal", "aurelia-validation", "./utils/ui-constants", "./utils/ui-utils", "./utils/ui-validation", "auf-utility-library", "./elements/core/ui-glyphs", "./elements/core/ui-grid", "./elements/core/ui-page", "./elements/core/ui-viewport", "./elements/components/ui-alerts", "./elements/components/ui-bars", "./elements/components/ui-datagrid", "./elements/components/ui-dg-columns", "./elements/components/ui-drawer", "./elements/components/ui-dropdown", "./elements/components/ui-indicators", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-sidebar", "./elements/components/ui-tabpanel", "./elements/inputs/ui-button", "./elements/inputs/ui-date", "./elements/inputs/ui-form", "./elements/inputs/ui-input", "./elements/inputs/ui-list", "./elements/inputs/ui-markdown", "./elements/inputs/ui-options", "./elements/inputs/ui-phone", "./elements/inputs/ui-textarea", "./attributes/ui-badge", "./attributes/ui-colors", "./attributes/ui-ribbon", "./attributes/ui-tooltip", "./value-converters/ui-lodash", "./value-converters/ui-text", "./data/ui-datamodel", "./data/ui-datasource", "./utils/ui-application", "./utils/ui-dialog", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config, configCallback) {
        ui_utils_1.UIUtils.auContainer = config.container;
        aurelia_validation_1.ValidationController.prototype.validateTrigger = aurelia_validation_1.validateTrigger.changeOrBlur;
        config.container.registerHandler('ui-validator', function (container) { return container.get(ui_validation_1.UIValidationRenderer); });
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-grid'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-page'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-viewport')
        ]);
        config.globalResources([
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-alerts'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-bars'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-datagrid'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dg-columns'),
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
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-date'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-form'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-input'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-list'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-markdown'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-options'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-phone'),
            aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-textarea')
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
    var aurelia_pal_1, aurelia_validation_1, ui_constants_1, ui_utils_1, ui_validation_1;
    var exportedNames_1 = {
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
            function (ui_constants_1_1) {
                ui_constants_1 = ui_constants_1_1;
                exportStar_1(ui_constants_1_1);
            },
            function (ui_utils_1_1) {
                ui_utils_1 = ui_utils_1_1;
            },
            function (ui_validation_1_1) {
                ui_validation_1 = ui_validation_1_1;
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
            function (_6) {
            },
            function (_7) {
            },
            function (_8) {
            },
            function (_9) {
            },
            function (_10) {
            },
            function (_11) {
            },
            function (_12) {
            },
            function (_13) {
            },
            function (_14) {
            },
            function (_15) {
            },
            function (_16) {
            },
            function (_17) {
            },
            function (_18) {
            },
            function (_19) {
            },
            function (_20) {
            },
            function (_21) {
            },
            function (_22) {
            },
            function (_23) {
            },
            function (_24) {
            },
            function (_25) {
            },
            function (_26) {
            },
            function (_27) {
            },
            function (_28) {
            },
            function (_29) {
            },
            function (_30) {
            },
            function (_31) {
            },
            function (ui_datamodel_1_1) {
                exportStar_1(ui_datamodel_1_1);
            },
            function (ui_datasource_1_1) {
                exportStar_1(ui_datasource_1_1);
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
            }
        ],
        execute: function () {
        }
    };
});
