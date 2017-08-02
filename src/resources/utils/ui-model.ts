//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, transient} from 'aurelia-framework';
import {getLogger, Logger} from "aurelia-logging";
import {ValidationController, ValidationControllerFactory} from "aurelia-validation";
import {UIHttpService} from "./ui-http";
import {UIEvent} from "./ui-event";
import {UIUtils} from "./ui-utils";
import * as _ from "lodash";

@autoinject()
@transient()
export class UIModel {
  public logger: Logger;
  public httpClient: UIHttpService;

  public isDirtyProp: boolean;

  private __original__: any;
  private __observers__ = [];

  constructor() {
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

  init() {
    this.saveChanges();
    Object.keys(this)
      .filter(UIModel.isPropertyForSerialization)
      .forEach((key) => this.observe(key, () => this.isDirtyProp = this.isDirty()));

    return this;
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

  observe(property, callback) {
    this.__observers__.push(UIEvent.observe(this, property, callback));
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
      .forEach((key) => this[key] = json[key]);
  }

  serialize() {
    try {
      return UIModel.serializeObject(this);
    }
    catch (e) {
      throw new Error(`Error serializing object [${this.constructor.name}]`);
    }
  }

  static serializeObject(o) {
    let _pojo = {};
    if (o instanceof Map) {
      o.forEach((obj, key) => _pojo[key] = UIModel.serializeProperty(obj))
    }
    else {
      Object.keys(o)
        .filter(UIModel.isPropertyForSerialization)
        .forEach((key) => _pojo[key] = UIModel.serializeProperty(o[key]));
    }
    return _pojo;
  }

  static serializeProperty(p) {
    if (p instanceof UIModel) {
      return p.serialize();
    }
    else if (_.isObject(p)) {
      return this.serializeObject(p)
    }
    else if (_.isArray(p)) {
      return p.join(',');
    }
    else {
      return isEmpty(p) ? null : p;
    }
  }

  static isPropertyForSerialization(propName) {
    return propName !== 'undefined' && propName !== "isDirtyProp" && !/^__/.test(propName)
  }

  saveChanges() {
    this.__original__ = _.cloneDeep(this.serialize());
    this.isDirtyProp = false;
  }

  discardChanges() {
    Object.keys(_.cloneDeep(this.__original__))
      .forEach((key) => this[key] = this.__original__[key]);
  }

  isDirty() {
    this.logger.info("Checking dirty");
    if (_.isEmpty(this.__original__)) {
      Object.keys(this)
        .filter(UIModel.isPropertyForSerialization)
        .forEach((key) => this.__original__[key] = this[key]);
    }
    return this.checkDirty(this.__original__, this);
  }

  private checkDirty(o, t) {
    return !Object.keys(o)
      .every((key) => {
        if (t[key] instanceof UIModel) return !t[key].isDirtyObject();
        if (_.isArray(o[key]) && o[key].length != t[key].length) return false;
        if (_.isArray(o[key]) || _.isObject(o[key])) return !this.checkDirty(o[key], t[key]);

        return t.hasOwnProperty(key) && (t[key] === o[key]);
      });
  }
}
