define(["require", "exports", "aurelia-validation", "./utils/ui-validation", "./utils/ui-constants", "./utils/ui-utils", "lodash", "kramed", "moment", "numeral", "./utils/ui-application", "./utils/ui-constants", "./utils/ui-dialog", "./utils/ui-event", "./utils/ui-format", "./utils/ui-http", "./utils/ui-model", "./utils/ui-tree-model", "./utils/ui-utils", "lodash", "moment", "numeral", "./libs/countries", "./libs/currencies", "./libs/filetypes", "./libs/phonelib", "./libs/window", "./elements/core/ui-grid", "./elements/core/ui-page", "./elements/core/ui-viewport", "./elements/inputs/ui-button", "./elements/inputs/ui-date", "./elements/inputs/ui-form", "./elements/inputs/ui-input", "./elements/inputs/ui-lists", "./elements/inputs/ui-markdown", "./elements/inputs/ui-options", "./elements/inputs/ui-phone", "./elements/inputs/ui-textarea", "./elements/components/ui-alerts", "./elements/components/ui-bars", "./elements/components/ui-breadcrumb", "./elements/components/ui-datagrid", "./elements/components/ui-dg-columns", "./elements/components/ui-drawer", "./elements/components/ui-dropdown", "./elements/components/ui-menu", "./elements/components/ui-panel", "./elements/components/ui-sidebar", "./elements/components/ui-tab", "./elements/components/ui-tree", "./attributes/ui-badge", "./value-converters/ui-lodash", "./value-converters/ui-text", "text!./elements/core/framework.html"], function (require, exports, aurelia_validation_1, ui_validation_1, ui_constants_1, ui_utils_1, ld, km, mm, nm, ui_application_1, ui_constants_2, ui_dialog_1, ui_event_1, ui_format_1, ui_http_1, ui_model_1, ui_tree_model_1, ui_utils_2) {
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
    __export(ui_model_1);
    __export(ui_tree_model_1);
    __export(ui_utils_2);
    function configure(config, configCallback) {
        ui_utils_1.UIUtils.auContainer = config.container;
        aurelia_validation_1.ValidationController.prototype.validateTrigger = aurelia_validation_1.validateTrigger.changeOrBlur;
        config.container.registerHandler('ui-validator', function (container) { return container.get(ui_validation_1.UIValidationRenderer); });
        config.globalResources([
            './elements/core/ui-grid',
            './elements/core/ui-page',
            './elements/core/ui-viewport'
        ]);
        config.globalResources([
            './elements/inputs/ui-button',
            './elements/inputs/ui-date',
            './elements/inputs/ui-form',
            './elements/inputs/ui-input',
            './elements/inputs/ui-lists',
            './elements/inputs/ui-options',
            './elements/inputs/ui-phone',
            './elements/inputs/ui-textarea',
            './elements/inputs/ui-markdown'
        ]);
        config.globalResources([
            './elements/components/ui-alerts',
            './elements/components/ui-bars',
            './elements/components/ui-breadcrumb',
            './elements/components/ui-datagrid',
            './elements/components/ui-dg-columns',
            './elements/components/ui-drawer',
            './elements/components/ui-dropdown',
            './elements/components/ui-menu',
            './elements/components/ui-panel',
            './elements/components/ui-sidebar',
            './elements/components/ui-tab',
            './elements/components/ui-tree'
        ]);
        config.globalResources([
            './attributes/ui-badge'
        ]);
        config.globalResources([
            './value-converters/ui-lodash',
            './value-converters/ui-text'
        ]);
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
            exports._.forEach(map, function (model, key) {
                if (model) {
                    promises.push(validator.validateObject(model)
                        .then(function (e) {
                        if (e.length > 0) {
                            map.__errored__.push(key);
                            return true;
                        }
                        return false;
                    }));
                }
            });
            return Promise.all(promises).then(function (e) { return exports._.filter(e).length == 0; });
        }, 'Some language entries contain invalid values');
        exports._.mixin({
            'findByValues': function (collection, property, values) {
                if (exports._.isArray(collection)) {
                    return exports._.filter(collection, function (item) {
                        return exports._.indexOf(values, item[property] + '') > -1;
                    });
                }
                else {
                    var ret_1 = [];
                    exports._.forEach(collection, function (list) {
                        ret_1.concat(exports._.filter(list, function (item) {
                            return exports._.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_1;
                }
            },
            'removeByValues': function (collection, property, values) {
                if (exports._.isArray(collection)) {
                    return exports._.remove(collection, function (item) {
                        return exports._.indexOf(values, item[property] + '') > -1;
                    }) || [];
                }
                else {
                    var ret_2 = [];
                    exports._.forEach(collection, function (list, key) {
                        ret_2 = ret_2.concat(exports._.remove(list, function (item) {
                            return exports._.indexOf(values, item[property] + '') > -1;
                        }));
                    });
                    return ret_2;
                }
            },
            'findDeep': function (collection, property, value) {
                if (exports._.isArray(collection)) {
                    return exports._.find(collection, function (item) {
                        return item[property] + '' === value + '';
                    });
                }
                else {
                    var ret_3;
                    exports._.forEach(collection, function (item) {
                        ret_3 = exports._.find(item, function (v) {
                            return v[property] + '' === value + '';
                        });
                        return ret_3 === undefined;
                    });
                    return ret_3 || {};
                }
            },
            'findChildren': function (collection, listProperty, property, value) {
                var ret;
                exports._.forEach(collection, function (item) {
                    ret = exports._.find(item[listProperty], function (v) {
                        return v[property] + '' === value + '';
                    });
                    return ret === undefined;
                });
                return ret || {};
            }
        });
    }
    exports.configure = configure;
});
