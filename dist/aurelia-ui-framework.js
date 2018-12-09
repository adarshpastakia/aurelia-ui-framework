/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { Container, PLATFORM } from "aurelia-framework";
import { registerValidators, UIValidationRenderer } from "./forms/ui-validation";
import "./libs/array";
import "./libs/phonelib";
import "./libs/string";
import "./libs/window";
import { UIAppConfig } from "./utils/ui-app-config";
export { getValidationController } from "./forms/ui-validation";
export { Countries } from "./libs/countries";
export { Currencies } from "./libs/currencies";
export { FileTypes } from "./libs/filetypes";
export * from "./model/ui-tree-model";
export * from "./services/ui-alert";
export * from "./services/ui-application";
export * from "./services/ui-dialog";
export * from "./utils/ui-format";
export * from "./utils/ui-http";
var AppConfig = function () {
    //
};
AppConfig.prototype.AppTitle = "Aurelia UI Framework";
AppConfig.prototype.AppSubtitle = "A UI Framework built for Aurelia+Webpack";
AppConfig.prototype.AppVersion = "5.0.0";
AppConfig.prototype.ApiBaseUrl = "";
AppConfig.prototype.ApiHeaders = "";
/**
 * UIFrameworkConfig
 * @description : Framework configurator
 * @function setTitle(v: string);
 * @function setSubtitle(v: string);
 * @function setVersion(v: string);
 * @function setApiBaseUrl(v: string);
 * @function setApiHeaders(v: string | KeyValue);
 */
var UIFrameworkConfig = /** @class */ (function () {
    function UIFrameworkConfig(auConfig) {
        var _this = this;
        this.auConfig = auConfig;
        this.use = {
            all: function () {
                return _this.use
                    .buttons()
                    .forms()
                    .menus()
                    .data()
                    .panels()
                    .appbars();
            },
            buttons: function () {
                _this.loadFromModule(PLATFORM.moduleName("./buttons/ui-button"));
                _this.loadFromModule(PLATFORM.moduleName("./buttons/ui-button-group"));
                _this.loadFromModule(PLATFORM.moduleName("./buttons/ui-badge"));
                _this.loadFromModule(PLATFORM.moduleName("./attributes/ui-badge"));
                _this.loadFromModule(PLATFORM.moduleName("./attributes/ui-tooltip"));
                return _this.use;
            },
            forms: function () {
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-form"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-field"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-fieldset"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-input"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-textarea"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-select"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-list"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-checkbox"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-radio"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-toggle"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-phone"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-date"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-date-input"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-date-range"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-option-group"));
                _this.loadFromModule(PLATFORM.moduleName("./forms/ui-input-addons"));
                return _this.use;
            },
            panels: function () {
                _this.loadFromModule(PLATFORM.moduleName("./panels/ui-base"));
                _this.loadFromModule(PLATFORM.moduleName("./panels/ui-panel"));
                _this.loadFromModule(PLATFORM.moduleName("./panels/ui-card"));
                _this.loadFromModule(PLATFORM.moduleName("./panels/ui-tab-panel"));
                _this.loadFromModule(PLATFORM.moduleName("./panels/ui-card-body"));
                _this.loadFromModule(PLATFORM.moduleName("./panels/ui-alert"));
                _this.loadFromModule(PLATFORM.moduleName("./panels/ui-dialog"));
                return _this.use;
            },
            menus: function () {
                _this.loadFromModule(PLATFORM.moduleName("./menu/ui-menu"));
                _this.loadFromModule(PLATFORM.moduleName("./menu/ui-menubar"));
                _this.loadFromModule(PLATFORM.moduleName("./menu/ui-dropdown"));
                return _this.use;
            },
            data: function () {
                _this.loadFromModule(PLATFORM.moduleName("./data/ui-tree-panel"));
                return _this.use;
            },
            appbars: function () {
                _this.loadFromModule(PLATFORM.moduleName("./appbars/ui-toolbar"));
                _this.loadFromModule(PLATFORM.moduleName("./appbars/ui-sidebar"));
                _this.loadFromModule(PLATFORM.moduleName("./appbars/ui-drawer"));
                return _this.use;
            }
        };
        this.loadFromModule(PLATFORM.moduleName("./core/ui-viewport"));
        this.loadFromModule(PLATFORM.moduleName("./core/ui-responsive"));
        this.loadFromModule(PLATFORM.moduleName("./core/ui-page"));
        this.loadFromModule(PLATFORM.moduleName("./core/ui-icon"));
        this.loadFromModule(PLATFORM.moduleName("./core/ui-drop"));
        this.loadFromModule(PLATFORM.moduleName("./attributes/ui-helpers"));
        this.loadFromModule(PLATFORM.moduleName("./value-converters/ui-object"));
        this.loadFromModule(PLATFORM.moduleName("./value-converters/ui-text"));
    }
    UIFrameworkConfig.prototype.setTitle = function (v) {
        AppConfig.prototype.AppTitle = v;
        return this;
    };
    UIFrameworkConfig.prototype.setSubtitle = function (v) {
        AppConfig.prototype.AppSubtitle = v;
        return this;
    };
    UIFrameworkConfig.prototype.setVersion = function (v) {
        AppConfig.prototype.AppVersion = v;
        return this;
    };
    UIFrameworkConfig.prototype.setApiBaseUrl = function (v) {
        AppConfig.prototype.ApiBaseUrl = v;
        return this;
    };
    UIFrameworkConfig.prototype.setApiHeaders = function (v) {
        AppConfig.prototype.ApiHeaders = v;
        return this;
    };
    UIFrameworkConfig.prototype.loadFromModule = function (moduleName) {
        this.auConfig.globalResources(moduleName);
    };
    return UIFrameworkConfig;
}());
export { UIFrameworkConfig };
export function configure(auConfig, configCallback) {
    Container.instance = auConfig.container;
    auConfig.container.registerHandler("ui-validator", function (container) {
        return container.get(UIValidationRenderer);
    });
    registerValidators(auConfig.container);
    var config = new UIFrameworkConfig(auConfig);
    if (isFunction(configCallback)) {
        configCallback(config);
    }
    else {
        config.use.all();
    }
    auConfig.singleton(UIAppConfig, AppConfig);
}
