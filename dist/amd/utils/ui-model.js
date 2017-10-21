var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-logging", "./ui-http", "./ui-event", "./ui-utils", "lodash"], function (require, exports, aurelia_framework_1, aurelia_logging_1, ui_http_1, ui_event_1, ui_utils_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIModel = (function () {
        function UIModel() {
            this.__observers__ = [];
            Object.defineProperties(this, {
                'httpClient': {
                    value: ui_utils_1.UIUtils.lazy(ui_http_1.UIHttpService),
                    writable: false,
                    enumerable: false
                },
                'logger': {
                    value: aurelia_logging_1.getLogger(this.constructor.name),
                    writable: false,
                    enumerable: false
                },
                'isDirtyProp': {
                    value: false,
                    writable: true,
                    enumerable: false
                },
                '__observers__': {
                    value: [],
                    writable: true,
                    enumerable: false
                },
                '__original__': {
                    value: {},
                    writable: true,
                    enumerable: false
                }
            });
            this.logger.info("Model Initialized");
        }
        UIModel_1 = UIModel;
        UIModel.prototype.init = function () {
            var _this = this;
            this.saveChanges();
            Object.keys(this)
                .filter(UIModel_1.isPropertyForSerialization)
                .forEach(function (key) { return _this.observe(key, function () { return _this.isDirtyProp = _this.isDirty(); }); });
            return this;
        };
        UIModel.prototype.get = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            throw new Error('Not implemented [get]');
        };
        UIModel.prototype.post = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            throw new Error('Not implemented [post]');
        };
        UIModel.prototype.put = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            throw new Error('Not implemented [put]');
        };
        UIModel.prototype.delete = function () {
            var rest = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rest[_i] = arguments[_i];
            }
            throw new Error('Not implemented [delete]');
        };
        UIModel.prototype.addObserver = function (ob) {
            this.__observers__.push(ob);
        };
        UIModel.prototype.observe = function (property, callback) {
            this.__observers__.push(ui_event_1.UIEvent.observe(this, property, callback));
        };
        UIModel.prototype.dispose = function () {
            this.logger.debug("Model Disposing");
            while (this.__observers__ && this.__observers__.length) {
                this.__observers__.pop().dispose();
            }
        };
        UIModel.prototype.deserialize = function (json) {
            var _this = this;
            this.__original__ = _.cloneDeep(json);
            Object.keys(this.__original__)
                .forEach(function (key) { return _this[key] = json[key]; });
        };
        UIModel.prototype.serialize = function () {
            try {
                return UIModel_1.serializeObject(this);
            }
            catch (e) {
                throw new Error("Error serializing object [" + this.constructor.name + "]");
            }
        };
        UIModel.serializeObject = function (o) {
            var _pojo = {};
            if (o instanceof Map) {
                o.forEach(function (obj, key) { return _pojo[key] = UIModel_1.serializeProperty(obj); });
            }
            else {
                Object.keys(o)
                    .filter(UIModel_1.isPropertyForSerialization)
                    .forEach(function (key) { return _pojo[key] = UIModel_1.serializeProperty(o[key]); });
            }
            return _pojo;
        };
        UIModel.serializeProperty = function (p) {
            if (p instanceof UIModel_1) {
                return p.serialize();
            }
            else if (_.isObject(p)) {
                return this.serializeObject(p);
            }
            else if (_.isArray(p)) {
                return p.join(',');
            }
            else {
                return isEmpty(p) ? null : p;
            }
        };
        UIModel.isPropertyForSerialization = function (propName) {
            return propName !== 'undefined' && propName !== "isDirtyProp" && !/^__/.test(propName);
        };
        UIModel.prototype.saveChanges = function () {
            this.__original__ = _.cloneDeep(this.serialize());
            this.isDirtyProp = false;
        };
        UIModel.prototype.discardChanges = function () {
            var _this = this;
            Object.keys(_.cloneDeep(this.__original__))
                .forEach(function (key) { return _this[key] = _this.__original__[key]; });
        };
        UIModel.prototype.isDirty = function () {
            var _this = this;
            this.logger.info("Checking dirty");
            if (_.isEmpty(this.__original__)) {
                Object.keys(this)
                    .filter(UIModel_1.isPropertyForSerialization)
                    .forEach(function (key) { return _this.__original__[key] = _this[key]; });
            }
            return this.checkDirty(this.__original__, this);
        };
        UIModel.prototype.checkDirty = function (o, t) {
            var _this = this;
            return !Object.keys(o)
                .every(function (key) {
                if (t[key] instanceof UIModel_1)
                    return !t[key].isDirtyObject();
                if (_.isArray(o[key]) && o[key].length != t[key].length)
                    return false;
                if (_.isArray(o[key]) || _.isObject(o[key]))
                    return !_this.checkDirty(o[key], t[key]);
                return t.hasOwnProperty(key) && (t[key] === o[key]);
            });
        };
        UIModel = UIModel_1 = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.transient(),
            __metadata("design:paramtypes", [])
        ], UIModel);
        return UIModel;
        var UIModel_1;
    }());
    exports.UIModel = UIModel;
});
