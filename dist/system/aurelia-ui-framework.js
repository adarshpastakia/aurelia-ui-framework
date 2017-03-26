System.register(["aurelia-pal", "aurelia-validation", "./utils/ui-validation", "./utils/ui-constants", "./utils/ui-utils", "lodash", "moment", "numeral", "./libs/countries", "./libs/currencies", "./libs/filetypes", "./libs/phonelib", "./libs/window", "kramed", "./utils/ui-application", "./utils/ui-dialog", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "./utils/ui-model", "./utils/ui-tree-model", "./elements/core/ui-grid", "./elements/core/ui-page", "./elements/core/ui-viewport", "./elements/inputs/ui-button", "./elements/inputs/ui-date", "./elements/inputs/ui-form", "./elements/inputs/ui-input", "./elements/inputs/ui-lists", "./elements/inputs/ui-markdown", "./elements/inputs/ui-options", "./elements/inputs/ui-phone", "./elements/inputs/ui-textarea", "./elements/components/ui-alerts", "./elements/components/ui-bars", "./elements/components/ui-breadcrumb", "./elements/components/ui-datagrid", "./elements/components/ui-dg-columns", "./elements/components/ui-drawer", "./elements/components/ui-dropdown", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-sidebar", "./elements/components/ui-tab", "./elements/components/ui-tree", "./attributes/ui-badge", "./attributes/md-view", "./value-converters/ui-lodash", "./value-converters/ui-text", "text!./ui-glyphs.html"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config, configCallback) {
        ui_utils_1.UIUtils.auContainer = config.container;
        aurelia_validation_1.ValidationController.prototype.validateTrigger = aurelia_validation_1.validateTrigger.changeOrBlur;
        config.container.registerHandler('ui-validator', function (container) { return container.get(ui_validation_1.UIValidationRenderer); });
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-grid'), aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-page'), aurelia_pal_1.PLATFORM.moduleName('./elements/core/ui-viewport'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-button'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-date'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-form'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-input'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-lists'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-options'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-phone'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-textarea'), aurelia_pal_1.PLATFORM.moduleName('./elements/inputs/ui-markdown'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-alerts'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-bars'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-breadcrumb'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-datagrid'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dg-columns'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-drawer'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-dropdown'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-menu'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-panel'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-sidebar'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-tab'), aurelia_pal_1.PLATFORM.moduleName('./elements/components/ui-tree'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./attributes/ui-badge'), aurelia_pal_1.PLATFORM.moduleName('./attributes/md-view'));
        config.globalResources(aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-lodash'), aurelia_pal_1.PLATFORM.moduleName('./value-converters/ui-text'));
        var Configure = {
            title: function (t) {
                ui_constants_1.UIConstants.App.Title = t;
                return Configure;
            },
            version: function (t) {
                ui_constants_1.UIConstants.App.Version = t;
                return Configure;
            },
            appKey: function (t) {
                ui_constants_1.UIConstants.App.Key = t;
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
        var validator = ui_utils_1.UIUtils.lazy(aurelia_validation_1.Validator);
        aurelia_validation_1.ValidationRules
            .customRule('phone', function (value, obj) { return value === null || value === undefined || value === '' || PhoneLib.isValid(value); }, '\${$displayName } is not a valid phone number.');
        aurelia_validation_1.ValidationRules
            .customRule('number', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (Number.isInteger(value) && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be an number value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('decimal', function (value, obj, min, max) { return value === null || value === undefined || value === '' || (isNumber(value) && Math.floor(value % 1) === 0 && value >= (isEmpty(min) ? Number.MIN_VALUE : min) && value <= (isEmpty(max) ? Number.MAX_VALUE : max)); }, '\${$displayName} must be a decimal value between \${$config.min} and \${$config.max}.', function (min, max) { return ({ min: min, max: max }); });
        aurelia_validation_1.ValidationRules
            .customRule('language', function (map, obj, langs) {
            if (langs === void 0) { langs = ''; }
            var promises = [];
            map.__errored__ = [];
            _.forEach(map, function (model, key) {
                if (model && key != '__errored__') {
                    promises.push(validator.validateObject(model)
                        .then(function (e) {
                        if (_.filter(e, ['valid', false]).length > 0) {
                            map.__errored__.push(key);
                            return true;
                        }
                        return false;
                    }));
                }
            });
            return Promise.all(promises).then(function (e) { return _.filter(e).length == 0; });
        }, 'Some language entries contain invalid values');
        _.mixin({
            'findByValues': function (collection, property, values) {
                if (_.isArray(collection)) {
                    return _.filter(collection, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    });
                }
                else {
                    var ret_1 = [];
                    _.forEach(collection, function (list) {
                        ret_1.concat(_.filter(list, function (item) {
                            return _.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_1;
                }
            },
            'removeByValues': function (collection, property, values) {
                if (_.isArray(collection)) {
                    return _.remove(collection, function (item) {
                        return _.indexOf(values, item[property] + '') > -1;
                    }) || [];
                }
                else {
                    var ret_2 = [];
                    _.forEach(collection, function (list, key) {
                        ret_2 = ret_2.concat(_.remove(list, function (item) {
                            return _.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_2;
                }
            },
            'findDeep': function (collection, property, value) {
                if (_.isArray(collection)) {
                    return _.find(collection, function (item) {
                        return item[property] + '' === value + '';
                    });
                }
                else {
                    var ret_3;
                    _.forEach(collection, function (item) {
                        ret_3 = _.find(item, function (v) {
                            return v[property] + '' === value + '';
                        });
                        return ret_3 === undefined;
                    });
                    return ret_3 || {};
                }
            },
            'findChildren': function (collection, listProperty, property, value) {
                var ret;
                _.forEach(collection, function (item) {
                    ret = _.find(item[listProperty], function (v) {
                        return v[property] + '' === value + '';
                    });
                    return ret === undefined;
                });
                return ret || {};
            }
        });
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
            function (ui_model_1_1) {
                exportStar_1(ui_model_1_1);
            },
            function (ui_tree_model_1_1) {
                exportStar_1(ui_tree_model_1_1);
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
            function (_32) {
            },
            function (_33) {
            },
            function (_34) {
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
