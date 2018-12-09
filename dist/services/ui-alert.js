var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, Container, singleton, ViewCompiler } from "aurelia-framework";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";
var UIAlertService = /** @class */ (function () {
    function UIAlertService(appConfig, container, compiler) {
        this.appConfig = appConfig;
        this.container = container;
        this.compiler = compiler;
    }
    UIAlertService.prototype.alert = function (message, title, config) {
        if (config === void 0) { config = {}; }
        config = this.buildConfig(message, title, config);
        config.type = "alert";
        return this.createAlert(config);
    };
    UIAlertService.prototype.confirm = function (message, title, config) {
        if (config === void 0) { config = {}; }
        config = this.buildConfig(message, title, config);
        config.type = "confirm";
        return this.createAlert(config);
    };
    UIAlertService.prototype.toast = function (message, title, config) {
        if (config === void 0) { config = {}; }
        return this.createToast(this.buildConfig(message, title, config));
    };
    UIAlertService.prototype.notification = function (message, title, config) {
        if (config === void 0) { config = {}; }
        return this.createToast(this.buildConfig(message, title, config), true);
    };
    UIAlertService.prototype.buildConfig = function (message, title, config) {
        if (config === void 0) { config = {}; }
        if (isObject(message)) {
            config = message;
        }
        if (isString(message)) {
            config.message = message;
        }
        if (isString(title)) {
            config.title = title;
        }
        return config;
    };
    UIAlertService.prototype.createToast = function (config, forNotification) {
        var _this = this;
        return new Promise(function (resolve) {
            var cfg = __assign({ autoClose: true, cancelLabel: "Cancel", okLabel: "OK", theme: "default", timeout: 5000, type: "default" }, config);
            cfg.autoClose = cfg.type !== "confirm" && cfg.autoClose;
            var tpl = "<template><div class=\"" + (forNotification ? "ui-notification" : "ui-toast") + " ui-alert\" ui-theme.bind=\"theme\" ref=\"__el\">\n        <div if.bind=\"icon\" class=\"ui-alert__icon\"><ui-icon icon.bind=\"icon\"></ui-icon></div>\n        <div if.bind=\"title\" class=\"ui-alert__title\" innerhtml.bind=\"title\"></div>\n        <div class=\"ui-alert__body\" innerhtml.bind=\"message\"></div>\n        <div class=\"ui-alert__close\" click.trigger=\"__close(false)\"><ui-svg-icon icon=\"cross\"></ui-svg-icon></div>\n        <div class=\"ui-alert__footer\" if.bind=\"type==='confirm'\">\n        <a click.trigger=\"__close(false)\">${cancelLabel}</a>\n        <a click.trigger=\"__close(true)\" ui-weight=\"bold\">${okLabel}</a>\n        </div>\n        <div if.bind=\"autoClose\" class=\"ui-alert__progress\" css.bind=\"{transitionDuration: timeout+'ms'}\"></div>\n        </div></template>";
            var viewFactory = _this.compiler.compile(tpl);
            var view = viewFactory.create(_this.container);
            cfg.__close = function (b) {
                view.firstChild.classList.remove("ui-alert--show");
                resolve(b !== false);
                setTimeout(function () {
                    view.removeNodes();
                }, 500);
            };
            view.bind(__assign({}, cfg));
            view.appendNodesTo(forNotification ? _this.appConfig.ToastContainer : _this.appConfig.AlertContainer);
            if (cfg.autoClose) {
                setTimeout(cfg.__close, cfg.timeout);
            }
            UIInternal.queueTask(function () {
                return view.firstChild.classList.add("ui-alert--show");
            });
        });
    };
    UIAlertService.prototype.createAlert = function (config) {
        var _this = this;
        return new Promise(function (resolve) {
            var cfg = __assign({ cancelLabel: "Cancel", okLabel: "OK", theme: "default", type: "alert" }, config);
            var tpl = "<template><div class=\"ui-dialog__wrapper\" data-modal.bind=\"true\" ref=\"__el\" keydown.delegate=\"__keyCheck($event.keyCode)\">\n        <input blur.trigger=\"$event.target.focus()\" readonly.one-time=\"true\" tabindex=\"0\" css.bind=\"{opacity:0}\" ref=\"keyEl\"/>\n        <div class=\"ui-panel-base ui-dialog\" ui-border=\"xy,${theme}\" data-active.bind=\"true\" css.bind=\"{minWidth: '18rem', boxShadow:'0 0 12px 0 var(--color-'+theme+')'}\">\n          <div class=\"ui-panel__body\" ref=\"vmElement\">\n            <ui-row ui-color.bind=\"theme\">\n              <ui-col ui-padding=\"sm\" size=\"auto\" if.bind=\"icon\" ui-font=\"xl\"><ui-icon icon.bind=\"icon\"></ui-icon></ui-col>\n              <ui-col ui-padding=\"sm\" size=\"fill\">\n                <div if.bind=\"title\" ui-weight=\"medium\" innerhtml.bind=\"title\"></div>\n                <div innerhtml.bind=\"message\"></div>\n              </ui-col>\n            </ui-row>\n          </div>\n          <div class=\"ui-footer\" ui-padding=\"y--sm\" ui-align=\"center\">\n          <ui-button if.bind=\"type!=='alert'\" click.trigger=\"__close(false)\" ui-theme.bind=\"theme\" type=\"outline\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${cancelLabel}</ui-button>\n          <ui-button click.trigger=\"__close(true)\" ui-theme.bind=\"theme\" type=\"solid\" size=\"sm\" css.bind=\"{minWidth:'4rem'}\">${okLabel}</ui-button>\n          </div>  \n        </div>    \n        </div></template>";
            var viewFactory = _this.compiler.compile(tpl);
            var view = viewFactory.create(_this.container);
            cfg.__keyCheck = function (key) {
                if (key === 13 || (key === 27 && cfg.type === "alert")) {
                    cfg.__close(true);
                }
                else if (key === 27) {
                    cfg.__close(false);
                }
            };
            cfg.__close = function (b) {
                view.firstChild.classList.remove("ui-alert--show");
                resolve(b !== false);
                setTimeout(function () {
                    _this.appConfig.DialogContainer.remove(view);
                }, 0);
            };
            view.bind(cfg);
            _this.appConfig.DialogContainer.add(view);
            cfg.keyEl.focus();
        });
    };
    UIAlertService = __decorate([
        singleton(),
        autoinject(),
        __metadata("design:paramtypes", [UIAppConfig,
            Container,
            ViewCompiler])
    ], UIAlertService);
    return UIAlertService;
}());
export { UIAlertService };
