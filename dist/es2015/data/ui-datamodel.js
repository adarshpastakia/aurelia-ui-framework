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
import * as _ from "lodash";
export class UIDataModel {
    constructor(id) {
        this.busy = false;
        this.loaded = false;
        this.idProperty = 'id';
        this.metadata = Metadata.get(Metadata.properties, Object.getPrototypeOf(this));
        Object.defineProperties(this, this.metadata.propertyDefs);
        this.metadata.original = _.cloneDeep(this.serialize());
        this.metadata.updated = _.cloneDeep(this.serialize());
        Object.defineProperties(this, {
            '_id': {
                enumerable: false,
                writable: true
            },
            'id': {
                get: this.propertyGetter('id'),
                set: this.propertySetter('id'),
                enumerable: true
            },
            apiUrl: {
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
        if (!this.apiUrl)
            throw Error('API route required');
    }
    save() {
        if (!this.apiUrl)
            throw Error('API route required');
        this.id = this[this.idProperty] || this.generateId();
        this.metadata.dirtyProps = [];
        this.metadata.original = _.cloneDeep(this.serialize());
        this.metadata.updated = _.cloneDeep(this.serialize());
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
    serialize() {
        const POJO = {};
        this.metadata.serializableProps.forEach(prop => POJO[prop] = UIDataModel.serializeProperty(this[prop]));
        return POJO;
    }
    deserialize(json) {
        this.metadata.original = _.cloneDeep(json);
        this.metadata.updated = _.cloneDeep(json);
        this.metadata.serializableProps.forEach(prop => this[prop] = json[prop]);
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
    isPropDirty(prop) {
        return !!(~this.metadata.dirtyProps.indexOf(prop));
    }
    getDirtyProps() {
        return this.metadata.dirtyProps;
    }
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
        const isDirty = this.metadata.original[prop] !== value;
        if (!hasDirty && isDirty)
            this.metadata.dirtyProps.push(prop);
        if (hasDirty && !isDirty)
            this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
    }
}
__decorate([
    computedFrom('metadata.dirtyProps'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDataModel.prototype, "isDirty", null);
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
