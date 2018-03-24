var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { computedFrom } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import { metadata as Metadata } from 'aurelia-metadata';
import { UIHttpService } from "../utils/ui-http";
import { UIEvent } from "../utils/ui-event";
import { UIUtils } from "../utils/ui-utils";
import * as _ from "lodash";
const ERROR_CODES = {
    NO_API: { errorCode: 'AUF-DM:000', message: "API route required" },
    REJECTED: { errorCode: 'AUF-DM:001', message: "REST call rejected" },
    UNKNOWNID: { errorCode: 'AUF-DM:002', message: "Data model not loaded" }
};
export class UIDataModel {
    constructor(id) {
        this.busy = false;
        this.loaded = false;
        this.idProperty = 'id';
        this.metadata = Metadata.getOrCreateOwn(Metadata.properties, ModelMetadata, Object.getPrototypeOf(this));
        Object.defineProperties(this, this.metadata.propertyDefs);
        this.metadata.original = _.cloneDeep(this.serialize());
        this.metadata.updated = _.cloneDeep(this.serialize());
        Object.defineProperties(this, {
            id: {
                enumerable: true,
                writable: true
            },
            apiSlug: {
                enumerable: false,
                writable: true
            },
            idProperty: {
                enumerable: false,
                writable: true
            },
            loaded: {
                enumerable: false
            },
            busy: {
                enumerable: false
            },
            'httpClient': {
                value: UIUtils.lazy(UIHttpService),
                writable: false,
                enumerable: false
            },
            logger: {
                value: getLogger(this.constructor.name),
                enumerable: false
            },
            metadata: {
                enumerable: false
            }
        });
        this.logger.info('Model created');
        if (id)
            this.get(id);
    }
    get(id) {
        if (!this.apiSlug)
            return Promise.reject(ERROR_CODES.NO_API);
        ;
        return this.callPreHook('preGet', id)
            .then(result => {
            if (result !== false) {
                return this.doGet(id);
            }
            Promise.reject(ERROR_CODES.REJECTED);
        }).then(response => this.postGet(response));
    }
    save() {
        if (!this.apiSlug)
            return Promise.reject(ERROR_CODES.NO_API);
        return this.callPreHook('preSave')
            .then(result => {
            if (result !== false) {
                if (this.loaded)
                    return this.doPut();
                else
                    return this.doPost();
            }
            Promise.reject(ERROR_CODES.REJECTED);
        }).then(response => {
            this.loaded = true;
            this.postSave(response);
        });
    }
    delete() {
        if (!this.apiSlug)
            return Promise.reject(ERROR_CODES.NO_API);
        ;
        if (!this.loaded)
            return Promise.reject(ERROR_CODES.UNKNOWNID);
        ;
        return this.callPreHook('preDelete')
            .then(result => {
            if (result !== false) {
                return this.doDelete();
            }
            Promise.reject(ERROR_CODES.REJECTED);
        }).then(response => {
            this.postDelete(response);
            this.dispose();
        });
    }
    update() {
        this.metadata.updated = _.cloneDeep(this.serialize());
    }
    reset() {
        this.metadata.updated = Object.assign({}, this.metadata.original);
        this.discard();
    }
    discard() {
        this.metadata.dirtyProps = [];
        const updated = _.cloneDeep(this.metadata.updated);
        this.metadata.serializableProps.forEach(prop => this[prop] = updated[prop]);
    }
    addObserver(ob) {
        this.metadata.observers.push(ob);
    }
    observe(property, callback) {
        this.metadata.observers.push(UIEvent.observe(this, property, callback));
    }
    dispose() {
        this.logger.info("Model Disposing");
        while (this.metadata.observers && this.metadata.observers.length) {
            this.metadata.observers.pop().dispose();
        }
    }
    serialize() {
        const POJO = {};
        this.metadata.serializableProps.forEach(prop => POJO[prop] = UIDataModel.serializeProperty(this[prop]));
        return POJO;
    }
    deserialize(json) {
        this.loaded = true;
        if (json[this.idProperty])
            this._id = json[this.idProperty];
        this.metadata.original = _.cloneDeep(json);
        this.metadata.updated = _.cloneDeep(json);
        Object.keys(json)
            .forEach(prop => this[prop] = json[prop]);
    }
    static serializeObject(o) {
        let _pojo = {};
        if (o instanceof UIDataModel) {
            return o.serialize();
        }
        else if (o instanceof Map) {
            o.forEach((obj, key) => _pojo[key] = this.serializeProperty(obj));
        }
        else {
            Object.keys(o)
                .forEach((key) => _pojo[key] = this.serializeProperty(o[key]));
        }
        return _pojo;
    }
    static serializeProperty(p) {
        if (_.isObject(p)) {
            return this.serializeObject(p);
        }
        else if (_.isArray(p)) {
            return p.join(',');
        }
        else {
            return isEmpty(p) ? null : p;
        }
    }
    get isDirty() {
        return !!this.metadata.dirtyProps.length;
    }
    get dirtyProps() {
        const ret = {};
        this.metadata.dirtyProps.forEach(prop => ret[prop] = true);
        return ret;
    }
    preGet() { }
    preSave() { }
    preDelete() { }
    postGet(response) { }
    postSave(response) { }
    postDelete(response) { }
    generateId() {
        return Math.round(Math.random() * new Date().getTime()).toString(18);
    }
    propertyGetter(prop) {
        return function () {
            return this['_' + prop];
        };
    }
    propertySetter(prop) {
        return function (v) {
            this['_' + prop] = v;
            this.updateDirty(prop, v);
            return v;
        };
    }
    updateDirty(prop, value) {
        const hasDirty = !!(~this.metadata.dirtyProps.indexOf(prop));
        const isDirty = this.metadata.original[prop] !== (value === '' ? null : value);
        if (!hasDirty && isDirty)
            this.metadata.dirtyProps.push(prop);
        if (hasDirty && !isDirty)
            this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
    }
    callPreHook(hook, data) {
        let result = this[hook](data);
        if (result instanceof Promise) {
            return result;
        }
        if (result !== null && result !== undefined) {
            return Promise.resolve(result);
        }
        return Promise.resolve(true);
    }
    doGet(id) {
        this.busy = true;
        return this.httpClient.json(this.apiSlug + id)
            .then(json => {
            this.deserialize(json);
            this.busy = false;
            return json;
        })
            .catch(e => {
            Promise.reject(e);
            this.busy = false;
        });
    }
    doPost() {
        this.busy = true;
        return this.httpClient.post(this.apiSlug, this.serialize())
            .then(json => {
            this.deserialize(json);
            this.busy = false;
            return json;
        })
            .catch(e => {
            Promise.reject(e);
            this.busy = false;
        });
    }
    doPut() {
        this.busy = true;
        return this.httpClient.put(this.apiSlug + this._id, this.serialize())
            .then(json => {
            this.deserialize(json);
            this.busy = false;
            return json;
        })
            .catch(e => {
            Promise.reject(e);
            this.busy = false;
        });
    }
    doDelete() {
        this.busy = true;
        return this.httpClient.delete(this.apiSlug + this._id)
            .then(json => {
            this.busy = false;
            return json;
        })
            .catch(e => {
            Promise.reject(e);
            this.busy = false;
        });
    }
    doUpdate() {
        this.id = this[this.idProperty] || this.generateId();
        this.metadata.dirtyProps = [];
        this.metadata.original = _.cloneDeep(this.serialize());
        this.metadata.updated = _.cloneDeep(this.serialize());
    }
}
__decorate([
    computedFrom('metadata.dirtyProps.length'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], UIDataModel.prototype, "isDirty", null);
__decorate([
    computedFrom('metadata.dirtyProps.length'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataModel.prototype, "dirtyProps", null);
export function serializable(defaultValue = null) {
    return function (target, property) {
        if (!property)
            throw Error('Decorator should be used on property only!');
        const meta = Metadata.getOrCreateOwn(Metadata.properties, ModelMetadata, target);
        meta.serializableProps.push(property);
        meta.propertyDefs[property] = {
            get: target.propertyGetter(property),
            set: target.propertySetter(property),
            enumerable: true
        };
        meta.propertyDefs['_' + property] = {
            value: defaultValue,
            enumerable: false,
            writable: true
        };
    };
}
class ModelMetadata {
    constructor() {
        this.serializableProps = [];
        this.dirtyProps = [];
        this.observers = [];
        this.propertyDefs = {};
        this.updated = {};
        this.original = {};
    }
}
