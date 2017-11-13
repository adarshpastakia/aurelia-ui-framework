//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, transient, computedFrom } from 'aurelia-framework';
import { getLogger, Logger } from 'aurelia-logging';
import { metadata as Metadata } from 'aurelia-metadata';
import * as _ from "lodash";

export class UIDataModel {
  private metadata: ModelMetadata;
  public logger;

  constructor(id?) {
    this.metadata = Metadata.get(Metadata.properties, Object.getPrototypeOf(this)) as ModelMetadata;
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
      logger: {
        value: getLogger(this.constructor.name),
        enumerable: false
      },
      metadata: {
        enumerable: false
      }
    });

    this.logger.info('Model created');

    if (id) this.get(id);
  }

  id;
  busy = false;
  loaded = false;

  get(id) {
    if (!this.apiSlug) throw Error('API route required');
    // TODO: Return fetch promise
  }

  save() {
    if (!this.apiSlug) throw Error('API route required');
    // TODO: Check if id is null post else put
    // TODO: Return fetch promise
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
    const POJO = {}
    this.metadata.serializableProps.forEach(prop => POJO[prop] = UIDataModel.serializeProperty(this[prop]));
    return POJO;
  }

  static serializeObject(o) {
    let _pojo = {};
    if (o instanceof UIDataModel) {
      return o.serialize();
    }
    else if (o instanceof Map) {
      o.forEach((obj, key) => _pojo[key] = this.serializeProperty(obj))
    }
    else {
      Object.keys(o)
        .forEach((key) => _pojo[key] = this.serializeProperty(o[key]));
    }
    return _pojo;
  }

  static serializeProperty(p) {
    if (_.isObject(p)) {
      return this.serializeObject(p)
    }
    else if (_.isArray(p)) {
      return p.join(',');
    }
    else {
      return isEmpty(p) ? null : p;
    }
  }

  @computedFrom('metadata.dirtyProps')
  get isDirty() {
    return !!this.metadata.dirtyProps.length;
  }

  dirtyProp(prop) {
    return !!(~this.metadata.dirtyProps.indexOf(prop));
  }

  // ------ PROTECTED PROPS/METHODS
  protected apiSlug;
  protected idProperty = 'id';

  // ------ PRIVATE PROPS/METHODS
  private _id;

  private generateId() {
    return Math.round(Math.random() * new Date().getTime()).toString(18);
  }

  private propertyGetter(prop) {
    return function() {
      return this['_' + prop]
    }
  }

  private propertySetter(prop) {
    return function(v) {
      this['_' + prop] = v;
      this.updateDirty(prop, v);
      return v;
    }
  }

  private updateDirty(prop, value) {
    const hasDirty = !!(~this.metadata.dirtyProps.indexOf(prop));
    const isDirty = this.metadata.original[prop] !== value;
    if (!hasDirty && isDirty) this.metadata.dirtyProps.push(prop);
    if (hasDirty && !isDirty) this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
  }
}

export function serializable(defaultValue = null): any {
  return function(target, property) {
    if (!property) throw Error('Decorator should be used on property only!');

    const meta = Metadata.getOrCreateOwn(Metadata.properties, ModelMetadata, target) as ModelMetadata;

    meta.serializableProps.push(property);
    meta.propertyDefs[property] = {
      get: target.propertyGetter(property),
      set: target.propertySetter(property),
      enumerable: true
    }
    meta.propertyDefs['_' + property] = {
      value: defaultValue,
      enumerable: false,
      writable: true
    }
  };
}

class ModelMetadata {
  serializableProps = [];
  dirtyProps = [];
  observers = [];
  propertyDefs = {};

  updated = {};
  original = {};
}
