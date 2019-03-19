/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Container, FrameworkConfiguration } from "aurelia-framework";
// Modules
import { Attributes } from "./attributes";
import { Buttons } from "./buttons";
import { Calendar } from "./calendar";
import { Card } from "./card";
import { DataPanels } from "./data";
import { Forms } from "./forms";
import { registerValidators, UIValidationRenderer } from "./forms/ui-validation";
import { Gridder } from "./gridder";
import { Icons } from "./icons";
import "./libs/array";
import { Countries as _Countries } from "./libs/countries";
import "./libs/phonelib";
import "./libs/string";
import "./libs/window";
import { Lists } from "./lists";
import { Menus } from "./menus";
import { Page } from "./page";
import { Panels } from "./panels";
import { Responsive } from "./responsive";
import { Shared } from "./shared";
import { TabPanel } from "./tab-panel";
import { UIAppConfig } from "./utils/ui-app-config";
import { UIInternal } from "./utils/ui-internal";
import { ValueConverters } from "./value-converters";
import { Viewport } from "./viewport";
import { ValidationController, validateTrigger } from "aurelia-validation";

export * from "./models/ui-data-model";
export * from "./services/ui-application";
export * from "./services/ui-dialog";
export * from "./services/ui-notification";
export * from "./utils/ui-format";
export * from "./utils/ui-http";

export const Countries: ICountry = _Countries;

export const queueTask = UIInternal.queueTask;
export const queueMicroTask = UIInternal.queueMicroTask;
export const broadcast = UIInternal.broadcast;
export const subscribe = UIInternal.subscribe;
export const subscribeOnce = UIInternal.subscribeOnce;

const AppConfig = () => {
  //
};
AppConfig.prototype.ApiBaseUrl = "";
AppConfig.prototype.ApiHeaders = "";

/**
 * UIFrameworkConfig
 * @description : Framework configuration
 * @function setApiBaseUrl(v: string);
 * @function setApiHeaders(v: KeyValue);
 * @function setKeyValue(k: string, v: AnyObject);
 */
export class UIFrameworkConfig {
  public use = {
    all: () => {
      this.loadFromModule(Buttons);
      this.loadFromModule(Card);
      this.loadFromModule(Panels);
      this.loadFromModule(Menus);
      this.loadFromModule(Forms);
      this.loadFromModule(Lists);
      this.loadFromModule(TabPanel);
      this.loadFromModule(DataPanels);
      this.loadFromModule(Calendar);
      this.loadFromModule(Gridder);
    }
  };

  constructor(private auConfig: FrameworkConfiguration) {
    this.loadFromModule(Viewport);
    this.loadFromModule(Page);
    this.loadFromModule(Icons);
    this.loadFromModule(Responsive);
    this.loadFromModule(Shared);
    this.loadFromModule(Attributes);
    this.loadFromModule(ValueConverters);
  }

  public setApiBaseUrl(v: string): UIFrameworkConfig {
    AppConfig.prototype.ApiBaseUrl = v;
    return this;
  }
  public setApiHeaders(v: KeyValue): UIFrameworkConfig {
    AppConfig.prototype.ApiHeaders = v;
    return this;
  }
  public setKeyValue(key: string, v: AnyObject): UIFrameworkConfig {
    AppConfig.prototype[key] = v;
    return this;
  }

  private loadFromModule(moduleName) {
    this.auConfig.globalResources(moduleName);
  }
}

export function configure(
  auConfig: FrameworkConfiguration,
  configCallback: (config: UIFrameworkConfig) => void
) {
  Container.instance = auConfig.container;

  auConfig.container.registerHandler("ui-validator", container =>
    container.get(UIValidationRenderer)
  );
  registerValidators(auConfig.container);

  const config = new UIFrameworkConfig(auConfig);
  if (isFunction(configCallback)) {
    configCallback(config);
  } else {
    config.use.all();
  }

  auConfig.singleton(UIAppConfig, AppConfig);
}
