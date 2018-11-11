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
//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { computedFrom, Container } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { metadata as Metadata } from "aurelia-metadata";
import { UIHttpService } from "../utils/ui-http";
import { UIInternal } from "../utils/ui-internal";
var ERROR_CODES = {
    NO_API: { errorCode: "AUF-DM:000", message: "API route required" },
    REJECTED: { errorCode: "AUF-DM:001", message: "REST call rejected" },
    UNKNOWNID: { errorCode: "AUF-DM:002", message: "Data model not loaded" }
};
var UIDataModel = /** @class */ (function () {
    function UIDataModel(id) {
        this.busy = false;
        this.idProperty = "id";
        this.loaded = false;
        this.metadata = Metadata.getOrCreateOwn(Metadata.properties, ModelMetadata, Object.getPrototypeOf(this));
        Object.defineProperties(this, this.metadata.propertyDefs);
        this.metadata.original = __assign({}, this.serialize());
        this.metadata.updated = __assign({}, this.serialize());
        Object.defineProperties(this, {
            apiSlug: {
                enumerable: false,
                writable: true
            },
            busy: {
                enumerable: false
            },
            httpClient: {
                enumerable: false,
                value: Container.instance.get(UIHttpService),
                writable: false
            },
            id: {
                enumerable: true,
                writable: true
            },
            idProperty: {
                enumerable: false,
                writable: true
            },
            loaded: {
                enumerable: false
            },
            logger: {
                enumerable: false,
                value: getLogger(this.constructor.name)
            },
            metadata: {
                enumerable: false
            }
        });
        this.logger.info("Model created");
        if (id) {
            this.get(id);
        }
    }
    Object.defineProperty(UIDataModel.prototype, "isDirty", {
        get: function () {
            return !!this.metadata.dirtyProps.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDataModel.prototype, "dirtyProps", {
        get: function () {
            var ret = {};
            this.metadata.dirtyProps.forEach(function (prop) { return (ret[prop] = true); });
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    UIDataModel.serializeObject = function (o) {
        var _this = this;
        var pojo = {};
        if (o instanceof UIDataModel) {
            return o.serialize();
        }
        else if (o instanceof Map) {
            o.forEach(function (obj, key) { return (pojo[key] = _this.serializeProperty(obj)); });
        }
        else {
            Object.keys(o).forEach(function (key) { return (pojo[key] = _this.serializeProperty(o[key])); });
        }
        return pojo;
    };
    UIDataModel.serializeProperty = function (p) {
        if (isObject(p)) {
            return this.serializeObject(p);
        }
        else if (isArray(p)) {
            return p.join(",");
        }
        else {
            return isEmpty(p) ? null : p;
        }
    };
    /**
     * @description Get record by id
     * @param any record id
     */
    UIDataModel.prototype.get = function (id) {
        var _this = this;
        if (!this.apiSlug) {
            return Promise.reject(ERROR_CODES.NO_API);
        }
        return this.callPreHook("preGet", id)
            .then(function (result) {
            if (result !== false) {
                return _this.doGet(id);
            }
            Promise.reject(ERROR_CODES.REJECTED);
        })
            .then(function (response) { return _this.postGet(response); });
    };
    /**
     * @description Save record, perform post if not loaded else perform a put
     */
    UIDataModel.prototype.save = function () {
        var _this = this;
        if (!this.apiSlug) {
            return Promise.reject(ERROR_CODES.NO_API);
        }
        return this.callPreHook("preSave")
            .then(function (result) {
            if (result !== false) {
                if (_this.loaded) {
                    return _this.doPut();
                }
                else {
                    return _this.doPost();
                }
            }
            Promise.reject(ERROR_CODES.REJECTED);
        })
            .then(function (response) {
            _this.loaded = true;
            _this.postSave(response);
        });
    };
    /**
     * @description Delete record
     */
    UIDataModel.prototype.delete = function () {
        var _this = this;
        if (!this.apiSlug) {
            return Promise.reject(ERROR_CODES.NO_API);
        }
        if (!this.loaded) {
            return Promise.reject(ERROR_CODES.UNKNOWNID);
        }
        return this.callPreHook("preDelete")
            .then(function (result) {
            if (result !== false) {
                return _this.doDelete();
            }
            Promise.reject(ERROR_CODES.REJECTED);
        })
            .then(function (response) {
            _this.postDelete(response);
            _this.dispose();
        });
    };
    /**
     * @description Update local copy
     */
    UIDataModel.prototype.update = function () {
        this.metadata.updated = __assign({}, this.serialize());
    };
    /**
     * @description Reset changes to original values
     */
    UIDataModel.prototype.reset = function () {
        this.metadata.updated = __assign({}, this.metadata.original);
        this.discard();
    };
    /**
     * @description Reset changes to previously updated values
     */
    UIDataModel.prototype.discard = function () {
        var _this = this;
        this.metadata.dirtyProps = [];
        var updated = __assign({}, this.metadata.updated);
        this.metadata.serializableProps.forEach(function (prop) { return (_this[prop] = updated[prop]); });
    };
    /**
     * @description add any observer / disposable object
     */
    UIDataModel.prototype.addObserver = function (ob) {
        this.metadata.observers.push(ob);
    };
    /**
     * @description Observe a property for changes
     */
    UIDataModel.prototype.observe = function (property, callback) {
        this.metadata.observers.push(UIInternal.observe(this, property, callback));
    };
    /**
     * @description Dispose the data model, ensuring to dispose all added observers
     */
    UIDataModel.prototype.dispose = function () {
        this.logger.info("Model Disposing");
        while (this.metadata.observers && this.metadata.observers.length) {
            this.metadata.observers.pop().dispose();
        }
    };
    /**
     * @description Serialize the data model into a POJO
     */
    UIDataModel.prototype.serialize = function () {
        var _this = this;
        var POJO = {};
        this.metadata.serializableProps.forEach(function (prop) { return (POJO[prop] = UIDataModel.serializeProperty(_this[prop])); });
        return POJO;
    };
    /**
     * @description Deserialize POJO object into the data model properties
     */
    UIDataModel.prototype.deserialize = function (json) {
        var _this = this;
        this.loaded = true;
        if (json[this.idProperty]) {
            this.internalId = json[this.idProperty];
        }
        this.metadata.original = __assign({}, json);
        this.metadata.updated = __assign({}, json);
        Object.keys(json).forEach(function (prop) { return (_this[prop] = json[prop]); });
    };
    // Pre/Post hooks for fetch calls
    UIDataModel.prototype.preGet = function () {
        //
    };
    UIDataModel.prototype.preSave = function () {
        //
    };
    UIDataModel.prototype.preDelete = function () {
        //
    };
    UIDataModel.prototype.postGet = function (response) {
        //
    };
    UIDataModel.prototype.postSave = function (response) {
        //
    };
    UIDataModel.prototype.postDelete = function (response) {
        //
    };
    UIDataModel.prototype.generateId = function () {
        return Math.round(Math.random() * new Date().getTime()).toString(18);
    };
    UIDataModel.prototype.propertyGetter = function (prop) {
        return function () {
            return this["_" + prop];
        };
    };
    UIDataModel.prototype.propertySetter = function (prop) {
        return function (v) {
            this["_" + prop] = v;
            this.updateDirty(prop, v);
            return v;
        };
    };
    UIDataModel.prototype.updateDirty = function (prop, value) {
        var hasDirty = this.metadata.dirtyProps.indexOf(prop) > -1;
        var isDirty = this.metadata.original[prop] !== (value === "" ? null : value);
        if (!hasDirty && isDirty) {
            this.metadata.dirtyProps.push(prop);
        }
        if (hasDirty && !isDirty) {
            this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
        }
    };
    UIDataModel.prototype.callPreHook = function (hook, data) {
        var result = this[hook](data);
        if (result instanceof Promise) {
            return result;
        }
        if (result !== null && result !== undefined) {
            return Promise.resolve(result);
        }
        return Promise.resolve(true);
    };
    UIDataModel.prototype.doGet = function (id) {
        var _this = this;
        // TODO: call deserailize after fetch
        this.busy = true;
        return this.httpClient
            .json(this.apiSlug + id)
            .then(function (json) {
            _this.deserialize(json);
            _this.busy = false;
            return json;
        })
            .catch(function (e) {
            Promise.reject(e);
            _this.busy = false;
        });
    };
    UIDataModel.prototype.doPost = function () {
        var _this = this;
        // TODO: call doUpdate after fetch
        this.busy = true;
        return this.httpClient
            .post(this.apiSlug, this.serialize())
            .then(function (json) {
            _this.deserialize(json);
            _this.busy = false;
            return json;
        })
            .catch(function (e) {
            Promise.reject(e);
            _this.busy = false;
        });
    };
    UIDataModel.prototype.doPut = function () {
        var _this = this;
        // TODO: call doUpdate after fetch
        this.busy = true;
        return this.httpClient
            .put(this.apiSlug + this.internalId, this.serialize())
            .then(function (json) {
            _this.deserialize(json);
            _this.busy = false;
            return json;
        })
            .catch(function (e) {
            Promise.reject(e);
            _this.busy = false;
        });
    };
    UIDataModel.prototype.doDelete = function () {
        var _this = this;
        // TODO: call dispose after fetch
        this.busy = true;
        return this.httpClient
            .delete(this.apiSlug + this.internalId)
            .then(function (json) {
            _this.busy = false;
            return json;
        })
            .catch(function (e) {
            Promise.reject(e);
            _this.busy = false;
        });
    };
    UIDataModel.prototype.doUpdate = function () {
        this.id = this[this.idProperty] || this.generateId();
        this.metadata.dirtyProps = [];
        this.metadata.original = __assign({}, this.serialize());
        this.metadata.updated = __assign({}, this.serialize());
    };
    __decorate([
        computedFrom("metadata.dirtyProps.length"),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], UIDataModel.prototype, "isDirty", null);
    __decorate([
        computedFrom("metadata.dirtyProps.length"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UIDataModel.prototype, "dirtyProps", null);
    return UIDataModel;
}());
export { UIDataModel };
export function serializable(defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return function (target, property) {
        if (!property) {
            throw Error("Decorator should be used on property only!");
        }
        var meta = Metadata.getOrCreateOwn(Metadata.properties, ModelMetadata, target);
        meta.serializableProps.push(property);
        meta.propertyDefs[property] = {
            enumerable: true,
            get: target.propertyGetter(property),
            set: target.propertySetter(property)
        };
        meta.propertyDefs["_" + property] = {
            enumerable: false,
            value: defaultValue,
            writable: true
        };
    };
}
var ModelMetadata = /** @class */ (function () {
    function ModelMetadata() {
        this.serializableProps = [];
        this.dirtyProps = [];
        this.observers = [];
        this.propertyDefs = {};
        this.updated = {};
        this.original = {};
    }
    return ModelMetadata;
}());
