var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from 'aurelia-framework';
import { getLogger } from "aurelia-logging";
import { UIHttpService } from "./ui-http";
import { UIUtils } from "./ui-utils";
import * as _ from "lodash";
let UIModel = UIModel_1 = class UIModel {
    constructor() {
        this.__observers__ = [];
        Object.defineProperties(this, {
            'httpClient': {
                value: UIUtils.lazy(UIHttpService),
                writable: false,
                enumerable: false
            },
            'logger': {
                value: getLogger(this.constructor.name),
                writable: false,
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
    get(...rest) {
        throw new Error('Not implemented [get]');
    }
    post(...rest) {
        throw new Error('Not implemented [post]');
    }
    put(...rest) {
        throw new Error('Not implemented [put]');
    }
    delete(...rest) {
        throw new Error('Not implemented [delete]');
    }
    addObserver(ob) {
        this.__observers__.push(ob);
    }
    dispose() {
        this.logger.debug("Model Disposing");
        while (this.__observers__ && this.__observers__.length) {
            this.__observers__.pop().dispose();
        }
    }
    deserialize(json) {
        this.__original__ = _.cloneDeep(json);
        Object.keys(this.__original__)
            .forEach((key) => {
            this[key] = json[key];
        });
    }
    serialize() {
        try {
            return UIModel_1.serializeObject(this);
        }
        catch (e) {
            throw new Error(`Error serializing object [${this.constructor.name}]`);
        }
    }
    static serializeObject(o) {
        let _pojo = {};
        if (o instanceof Map) {
            o.forEach((obj, key) => {
                if (obj instanceof UIModel_1) {
                    _pojo[key] = obj.serialize();
                }
                if (_.isObject(obj)) {
                    _pojo[key] = this.serializeObject(obj);
                }
                else if (_.isArray(obj)) {
                    _pojo[key] = obj.join(',');
                }
                else {
                    _pojo[key] = isEmpty(obj) ? null : obj;
                }
            });
        }
        else {
            Object.keys(o)
                .forEach((key) => {
                if (key !== 'undefined' && !/^__/.test(key)) {
                    if (o[key] instanceof UIModel_1) {
                        _pojo[key] = o[key].serialize();
                    }
                    if (_.isObject(o[key])) {
                        _pojo[key] = this.serializeObject(o[key]);
                    }
                    else if (_.isArray(o[key])) {
                        _pojo[key] = o[key].join(',');
                    }
                    else {
                        _pojo[key] = isEmpty(o[key]) ? null : o[key];
                    }
                }
            });
        }
        return _pojo;
    }
    saveChanges() {
        this.__original__ = _.cloneDeep(this.serialize());
    }
    discardChanges() {
        Object.keys(_.cloneDeep(this.__original__))
            .forEach((key) => {
            this[key] = this.__original__[key];
        });
    }
    isDirty() {
        if (_.isEmpty(this.__original__)) {
            Object.keys(this)
                .forEach((key) => {
                if (key !== 'undefined' && !/^__/.test(key)) {
                    this.__original__[key] = this[key];
                }
            });
        }
        return this.checkDirty(this.__original__, this);
    }
    checkDirty(o, t) {
        return !Object.keys(o)
            .every((key) => {
            if (t[key] instanceof UIModel_1)
                return !t[key].isDirty();
            if (_.isArray(o[key]) && o[key].length != t[key].length)
                return false;
            if (_.isArray(o[key]) || _.isObject(o[key]))
                return !this.checkDirty(o[key], t[key]);
            return t.hasOwnProperty(key) && (t[key] === o[key]);
        });
    }
};
UIModel = UIModel_1 = __decorate([
    autoinject(),
    __metadata("design:paramtypes", [])
], UIModel);
export { UIModel };
var UIModel_1;
