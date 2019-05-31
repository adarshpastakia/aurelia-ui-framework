/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { computedFrom, Container } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { metadata as Metadata } from "aurelia-metadata";
import { UIHttpService } from "../utils/ui-http";
import { UIInternal } from "../utils/ui-internal";

const ERROR_CODES = {
  NO_API: { errorCode: "AUF-DM:000", message: "API route required" },
  REJECTED: { errorCode: "AUF-DM:001", message: "REST call rejected" },
  UNKNOWNID: { errorCode: "AUF-DM:002", message: "Data model not loaded" }
};

export class UIDataModel {
  @computedFrom("metadata.dirtyProps.length")
  get isDirty(): boolean {
    return !!this.metadata.dirtyProps.length;
  }

  @computedFrom("metadata.dirtyProps.length")
  get dirtyProps(): AnyObject {
    const ret = {};
    this.metadata.dirtyProps.forEach(prop => (ret[prop] = true));
    return ret;
  }

  public static serializeObject(o) {
    const pojo = {};
    if (o instanceof UIDataModel) {
      return o.serialize();
    } else if (o instanceof Map) {
      o.forEach((obj, key) => (pojo[key] = this.serializeProperty(obj)));
    } else {
      Object.keys(o).forEach(key => (pojo[key] = this.serializeProperty(o[key])));
    }
    return pojo;
  }

  public static serializeProperty(p: AnyObject) {
    if (isArray(p)) {
      return p.join(",");
    } else if (isObject(p)) {
      return this.serializeObject(p);
    } else {
      return isEmpty(p) ? null : p;
    }
  }

  public id;
  public busy = false;
  public logger;

  // ------ PROTECTED PROPS/METHODS
  protected apiSlug;
  protected idProperty = "id";

  // ------ PRIVATE PROPS/METHODS
  private metadata: ModelMetadata;
  private httpClient;
  private loaded = false;

  private internalId;

  constructor(id?) {
    this.metadata = Metadata.getOrCreateOwn(
      Metadata.properties,
      ModelMetadata,
      Object.getPrototypeOf(this)
    ) as ModelMetadata;
    Object.defineProperties(this, this.metadata.propertyDefs);

    this.metadata.original = { ...this.serialize() };
    this.metadata.updated = { ...this.serialize() };

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

  /**
   * @description Get record by id
   * @param any record id
   */
  public get(id) {
    if (!this.apiSlug) {
      return Promise.reject(ERROR_CODES.NO_API);
    }

    return this.callPreHook("preGet", id)
      .then(result => {
        if (result !== false) {
          return this.doGet(id);
        }
        return Promise.reject(ERROR_CODES.REJECTED);
      })
      .then(response => this.postGet(response));
  }

  /**
   * @description Save record, perform post if not loaded else perform a put
   */
  public save() {
    if (!this.apiSlug) {
      return Promise.reject(ERROR_CODES.NO_API);
    }

    return this.callPreHook("preSave")
      .then(result => {
        if (result !== false) {
          if (this.loaded) {
            return this.doPut();
          } else {
            return this.doPost();
          }
        }
        return Promise.reject(ERROR_CODES.REJECTED);
      })
      .then(response => {
        this.loaded = true;
        this.postSave(response);
      });
  }

  /**
   * @description Delete record
   */
  public delete() {
    if (!this.apiSlug) {
      return Promise.reject(ERROR_CODES.NO_API);
    }
    if (!this.loaded) {
      return Promise.reject(ERROR_CODES.UNKNOWNID);
    }

    return this.callPreHook("preDelete")
      .then(result => {
        if (result !== false) {
          return this.doDelete();
        }
        return Promise.reject(ERROR_CODES.REJECTED);
      })
      .then(response => {
        this.postDelete(response);
        this.dispose();
      });
  }

  /**
   * @description Update local copy
   */
  public update() {
    this.metadata.updated = { ...this.serialize() };
  }

  /**
   * @description Reset changes to original values
   */
  public reset() {
    this.metadata.updated = { ...this.metadata.original };
    this.discard();
  }

  /**
   * @description Reset changes to previously updated values
   */
  public discard() {
    this.metadata.dirtyProps = [];
    const updated = { ...this.metadata.updated };
    this.metadata.serializableProps.forEach(prop => (this[prop] = updated[prop]));
  }

  /**
   * @description add any observer / disposable object
   */
  public addObserver(ob) {
    this.metadata.observers.push(ob);
  }

  /**
   * @description Observe a property for changes
   */
  public observe(property, callback) {
    this.metadata.observers.push(UIInternal.observe(this, property, callback));
  }

  /**
   * @description Dispose the data model, ensuring to dispose all added observers
   */
  public dispose() {
    this.logger.info("Model Disposing");
    while (this.metadata.observers && this.metadata.observers.length) {
      this.metadata.observers.pop().dispose();
    }
  }

  /**
   * @description Serialize the data model into a POJO
   */
  public serialize() {
    const POJO = {};
    this.metadata.serializableProps.forEach(
      prop => (POJO[prop] = UIDataModel.serializeProperty(this[prop]))
    );
    return POJO;
  }

  /**
   * @description Deserialize POJO object into the data model properties
   */
  public deserialize(json) {
    this.loaded = true;
    if (json[this.idProperty]) {
      this.internalId = json[this.idProperty];
    }
    this.metadata.original = { ...json };
    this.metadata.updated = { ...json };
    Object.keys(json).forEach(prop => (this[prop] = json[prop]));
  }

  // Pre/Post hooks for fetch calls
  public preGet() {
    //
  }

  public preSave() {
    //
  }

  public preDelete() {
    //
  }

  public postGet(_: AnyObject) {
    //
  }

  public postSave(_: AnyObject) {
    //
  }

  public postDelete(_: AnyObject) {
    //
  }

  protected propertyGetter(prop) {
    return function() {
      return this["_" + prop];
    };
  }

  protected propertySetter(prop) {
    return function(v) {
      this["_" + prop] = v;
      this.updateDirty(prop, v);
      return v;
    };
  }

  private generateId() {
    return Math.round(Math.random() * new Date().getTime()).toString(18);
  }

  private updateDirty(prop, value) {
    const hasDirty = this.metadata.dirtyProps.indexOf(prop) > -1;
    const isDirty = this.metadata.original[prop] !== (value === "" ? null : value);
    if (!hasDirty && isDirty) {
      this.metadata.dirtyProps.push(prop);
    }
    if (hasDirty && !isDirty) {
      this.metadata.dirtyProps.splice(this.metadata.dirtyProps.indexOf(prop), 1);
    }
  }

  private callPreHook(hook, data?) {
    const result = this[hook](data);

    if (result instanceof Promise) {
      return result;
    }

    if (result !== null && result !== undefined) {
      return Promise.resolve(result);
    }

    return Promise.resolve(true);
  }

  private doGet(id) {
    this.busy = true;
    return this.httpClient
      .json(this.apiSlug + id)
      .then(json => {
        this.deserialize(json);
        this.busy = false;
        return json;
      })
      .catch(e => {
        this.busy = false;
        return Promise.reject(e);
      });
  }

  private doPost() {
    this.busy = true;
    return this.httpClient
      .post(this.apiSlug, this.serialize())
      .then(json => {
        this.deserialize(json);
        this.busy = false;
        return json;
      })
      .catch(e => {
        this.busy = false;
        return Promise.reject(e);
      });
  }

  private doPut() {
    this.busy = true;
    return this.httpClient
      .put(this.apiSlug + this.internalId, this.serialize())
      .then(json => {
        this.deserialize(json);
        this.busy = false;
        return json;
      })
      .catch(e => {
        this.busy = false;
        return Promise.reject(e);
      });
  }

  private doDelete() {
    this.busy = true;
    return this.httpClient
      .delete(this.apiSlug + this.internalId)
      .then(json => {
        this.busy = false;
        return json;
      })
      .catch(e => {
        this.busy = false;
        return Promise.reject(e);
      });
  }
}

export function serializable(defaultValue = null): AnyObject {
  return (target, property) => {
    if (!property) {
      throw Error("Decorator should be used on property only!");
    }

    const meta = Metadata.getOrCreateOwn(
      Metadata.properties,
      ModelMetadata,
      target
    ) as ModelMetadata;

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

// tslint:disable
class ModelMetadata {
  public serializableProps = [];
  public dirtyProps = [];
  public observers = [];
  public propertyDefs = {};

  public updated = {};
  public original = {};
}
