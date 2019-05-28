/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import {
  autoinject,
  Container,
  singleton,
  TemplatingEngine,
  View,
  ViewCompiler
} from "aurelia-framework";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";
import alertView from "./alert-view.html";
import toastView from "./toast-view.html";

export interface UIAlertConfig {
  icon?: string;
  title?: string;
  message?: string;
  timeout?: number;
  autoClose?: boolean;
  parent?: Element;
  okLabel?: string;
  cancelLabel?: string;
  type?: "alert" | "confirm" | "prompt";
  theme?: "primary" | "secondary" | "gray" | "info" | "danger" | "success" | "warning";
}

@singleton()
@autoinject()
export class UINotificationService {
  constructor(
    private appConfig: UIAppConfig,
    private container: Container,
    private compiler: ViewCompiler,
    private templatingEngine: TemplatingEngine
  ) {
  }

  public alert(
    message: string | UIAlertConfig,
    title?: string,
    config: UIAlertConfig = {}
  ): Promise<boolean> {
    config = this.buildConfig(message, title, config);
    config.type = "alert";
    return this.createAlert(config);
  }

  public confirm(
    message: string | UIAlertConfig,
    title?: string,
    config: UIAlertConfig = {}
  ): Promise<boolean> {
    config = this.buildConfig(message, title, config);
    config.type = "confirm";
    return this.createAlert(config);
  }

  public message(
    message: string | UIAlertConfig,
    title?: string,
    config: UIAlertConfig = {}
  ): Promise<boolean> {
    return this.createToast(this.buildConfig(message, title, config));
  }

  public toast(
    message: string | UIAlertConfig,
    title?: string,
    config: UIAlertConfig = {}
  ): Promise<boolean> {
    return this.createToast(this.buildConfig(message, title, config), true);
  }

  private buildConfig(
    message: string | UIAlertConfig,
    title: string,
    config: UIAlertConfig = {}
  ): UIAlertConfig {
    if (isObject(message)) {
      config = message as UIAlertConfig;
    }
    if (isString(message)) {
      config.message = message as string;
    }
    if (isString(title)) {
      config.title = title;
    }
    return config;
  }

  private createToast(config, forToastNotification?: boolean): Promise<boolean> {
    return new Promise(resolve => {
      const cfg = {
        autoClose: true,
        cancelLabel: "Cancel",
        okLabel: "OK",
        theme: "default",
        timeout: 5000,
        type: "default",
        className: forToastNotification ? "ui-toast" : "ui-message",
        ...config,
        message: `<div>${config.message}</div>`
      };
      cfg.autoClose = cfg.type !== "confirm" && cfg.autoClose;
      const viewFactory = this.compiler.compile(`<template>${toastView}</template>`);
      const view = viewFactory.create(this.container);
      cfg.__close = b => {
        (view as View & { firstChild: HTMLElement }).firstChild.dataset.open = "false";
        resolve(b !== false);
        setTimeout(() => {
          view.removeNodes();
        }, 500);
      };
      view.bind({ ...cfg });
      view.appendNodesTo(
        forToastNotification ? this.appConfig.ToastContainer : this.appConfig.AlertContainer
      );

      if (cfg.autoClose) {
        setTimeout(cfg.__close, cfg.timeout);
      }

      UIInternal.queueTask(() => {
        const el = (view as View & { firstChild: HTMLElement }).firstChild;
        setTimeout(() => el.dataset.open = "true", 50);
        this.templatingEngine.enhance({
          element: el.querySelector(".ui-alert__body > div")
        });
      });
    });
  }

  private createAlert(config): Promise<boolean> {
    return new Promise(resolve => {
      const cfg = {
        cancelLabel: "Cancel",
        okLabel: "OK",
        theme: "default",
        type: "alert",
        ...config,
        message: `<div>${config.message}</div>`
      };
      const viewFactory = this.compiler.compile(`<template>${alertView}</template>`);
      const view = viewFactory.create(this.container);
      cfg.__keyCheck = key => {
        if (key === 13 || (key === 27 && cfg.type === "alert")) {
          cfg.__close(true);
        } else if (key === 27) {
          cfg.__close(false);
        }
      };
      cfg.__close = b => {
        (view as View & { firstChild: HTMLElement }).firstChild.classList.remove("ui-alert--show");
        resolve(b !== false);
        setTimeout(() => {
          this.appConfig.DialogContainer.remove(view);
        }, 0);
      };
      view.bind(cfg);
      this.appConfig.DialogContainer.add(view);

      UIInternal.queueTask(() => {
        const el = (view as View & { firstChild: HTMLElement }).firstChild;
        this.templatingEngine.enhance({
          element: el.querySelector(".ui-alert__body > div")
        });
      });

      cfg.keyEl.focus();
    });
  }
}
