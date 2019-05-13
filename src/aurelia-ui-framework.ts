/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { Container, FrameworkConfiguration } from "aurelia-framework";
import { registerValidators, UIValidationRenderer } from "./forms/ui-validation";
import "./libs/array";
import _Countries from "./libs/countries";
import "./libs/string";
import "./libs/window";
import { UIAppConfig } from "./utils/ui-app-config";
import { UIInternal } from "./utils/ui-internal";

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

export enum UIResources {
  Buttons = "buttons",
  Card = "card",
  Panel = "panel",
  Menus = "menus",
  Forms = "forms",
  Lists = "lists",
  TabPanel = "tabpanel",
  DataPanel = "datapanel",
  Calendar = "calendar",
  Gridder = "gridder"
}

const RESOURCE_LOADER: Record<string, () => Promise<AnyObject>> = {
  viewport: () => import("./viewport/ui-viewport").then(m => m.Viewport),
  page: () => import("./page/ui-page").then(m => m.Page),
  icons: () => import("./icons/ui-icons").then(m => m.Icons),
  responsive: () => import("./responsive/ui-responsive").then(m => m.Responsive),
  shared: () => import("./shared/ui-shared").then(m => m.Shared),
  attributes: () => import("./attributes/ui-attributes").then(m => m.Attributes),
  valueconverters: () => import("./value-converters/value-converters").then(m => m.ValueConverters),
  [UIResources.Buttons]: () => import("./buttons/ui-buttons").then(m => m.Buttons),
  [UIResources.Calendar]: () => import("./calendar/ui-calendar").then(m => m.Calendar),
  [UIResources.Card]: () => import("./card/ui-card").then(m => m.Card),
  [UIResources.DataPanel]: () => import("./data/ui-data-panels").then(m => m.DataPanels),
  [UIResources.Forms]: () => import("./forms/ui-forms").then(m => m.Forms),
  [UIResources.Gridder]: () => import("./gridder/ui-gridder").then(m => m.Gridder),
  [UIResources.Lists]: () => import("./lists/ui-lists").then(m => m.Lists),
  [UIResources.Menus]: () => import("./menus/ui-menus").then(m => m.Menus),
  [UIResources.Panel]: () => import("./panels/ui-panels").then(m => m.Panels),
  [UIResources.TabPanel]: () => import("./tab-panel/ui-tab-panel").then(m => m.TabPanel)
};

/**
 * UIFrameworkConfig
 * @description : Framework configuration
 * @function setApiBaseUrl(v: string);
 * @function setApiHeaders(v: KeyValue);
 * @function setKeyValue(k: string, v: AnyObject);
 */
export class UIFrameworkConfig {
  private resources = [
    "viewport",
    "page",
    "icons",
    "responsive",
    "shared",
    "attributes",
    "valueconverters"
  ];

  constructor(
    private auConfig: FrameworkConfiguration,
    loadResources: (callback: () => Promise<void>) => void
  ) {
    loadResources(() => this.loadResources());
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

  public useStandardResources() {
    this.useResource(UIResources.Buttons);
    this.useResource(UIResources.Calendar);
    this.useResource(UIResources.Card);
    this.useResource(UIResources.DataPanel);
    this.useResource(UIResources.Forms);
    this.useResource(UIResources.Gridder);
    this.useResource(UIResources.Lists);
    this.useResource(UIResources.Menus);
    this.useResource(UIResources.Panel);
    this.useResource(UIResources.TabPanel);
  }

  public useResource(resource: UIResources) {
    this.resources.push(resource);
    return this;
  }

  private loadResources() {
    return Promise.all(this.resources.map(name => RESOURCE_LOADER[name]())).then(modules => {
      this.auConfig.globalResources(
        modules.reduce((a, m) => {
          a.push(...m);
          return a;
        }, [])
      );
    });
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

  let loadResources = () => Promise.resolve();
  const config = new UIFrameworkConfig(auConfig, fn => {
    loadResources = fn;
  });
  if (isFunction(configCallback)) {
    configCallback(config);
  } else {
    config.useStandardResources();
  }
  auConfig.singleton(UIAppConfig, AppConfig);
  return loadResources();
}
