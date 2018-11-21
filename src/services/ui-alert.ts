/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, Container, singleton, View, ViewCompiler } from "aurelia-framework";
import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";
import { UIAlertConfig } from "./ui-alert";

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
export class UIAlertService {
  constructor(
    private appConfig: UIAppConfig,
    private container: Container,
    private compiler: ViewCompiler
  ) {}

  public alert(
    message: string | UIAlertConfig,
    title: string,
    config: UIAlertConfig = {}
  ): Promise<boolean> {
    config = this.buildConfig(message, title, config);
    config.type = "alert";
    return this.createAlert(config);
  }

  public confirm(
    message: string | UIAlertConfig,
    title: string,
    config: UIAlertConfig = {}
  ): Promise<boolean> {
    config = this.buildConfig(message, title, config);
    config.type = "confirm";
    return this.createAlert(config);
  }

  public toast(
    message: string | UIAlertConfig,
    title: string,
    config: UIAlertConfig = {}
  ): Promise<boolean> {
    return this.createToast(this.buildConfig(message, title, config));
  }

  public notification(
    message: string | UIAlertConfig,
    title: string,
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

  private createToast(config, forNotification?: boolean): Promise<boolean> {
    return new Promise(resolve => {
      const cfg = {
        autoClose: true,
        cancelLabel: "Cancel",
        okLabel: "OK",
        theme: "default",
        timeout: 5000,
        type: "default",
        ...config
      };
      cfg.autoClose = cfg.type !== "confirm" && cfg.autoClose;
      const tpl = `<template><div class="${
        forNotification ? "ui-notification" : "ui-toast"
      } ui-alert" ui-theme.bind="theme" ref="__el">
        <div if.bind="icon" class="ui-alert__icon"><ui-icon icon.bind="icon"></ui-icon></div>
        <div if.bind="title" class="ui-alert__title" innerhtml.bind="title"></div>
        <div class="ui-alert__body" innerhtml.bind="message"></div>
        <div class="ui-alert__close" click.trigger="__close(false)"><ui-svg-icon icon="cross"></ui-svg-icon></div>
        <div class="ui-alert__footer" if.bind="type==='confirm'">
        <a click.trigger="__close(false)">\${cancelLabel}</a>
        <a click.trigger="__close(true)" ui-weight="bold">\${okLabel}</a>
        </div>
        <div if.bind="autoClose" class="ui-alert__progress" css.bind="{transitionDuration: timeout+'ms'}"></div>
        </div></template>`;
      const viewFactory = this.compiler.compile(tpl);
      const view = viewFactory.create(this.container);
      cfg.__close = b => {
        (view as View & { firstChild: Element }).firstChild.classList.remove("ui-alert--show");
        resolve(b !== false);
        setTimeout(() => {
          view.removeNodes();
        }, 500);
      };
      view.bind({ ...cfg });
      view.appendNodesTo(
        forNotification ? this.appConfig.ToastContainer : this.appConfig.AlertContainer
      );

      if (cfg.autoClose) {
        setTimeout(cfg.__close, cfg.timeout);
      }

      UIInternal.queueTask(() =>
        (view as View & { firstChild: Element }).firstChild.classList.add("ui-alert--show")
      );
    });
  }

  private createAlert(config): Promise<boolean> {
    return new Promise(resolve => {
      const cfg = {
        cancelLabel: "Cancel",
        okLabel: "OK",
        theme: "default",
        type: "alert",
        ...config
      };
      const tpl = `<template><div class="ui-dialog__wrapper" data-modal.bind="true" ref="__el" keydown.delegate="__keyCheck($event.keyCode)">
        <input blur.trigger="$event.target.focus()" readonly.one-time="true" tabindex="0" css.bind="{opacity:0}" ref="keyEl"/>
        <div class="ui-panel-base ui-dialog" ui-border="xy,\${theme}" data-active.bind="true" css.bind="{minWidth: '18rem', boxShadow:'0 0 12px 0 var(--color-'+theme+')'}">
          <div class="ui-panel__body" ref="vmElement">
            <ui-row ui-color.bind="theme">
              <ui-col ui-padding="sm" size="auto" if.bind="icon" ui-font="xl"><ui-icon icon.bind="icon"></ui-icon></ui-col>
              <ui-col ui-padding="sm" size="fill">
                <div if.bind="title" ui-weight="medium" innerhtml.bind="title"></div>
                <div innerhtml.bind="message"></div>
              </ui-col>
            </ui-row>
          </div>
          <div class="ui-footer" ui-padding="y--sm" ui-align="center">
          <ui-button if.bind="type!=='alert'" click.trigger="__close(false)" ui-theme.bind="theme" type="outline" size="sm" css.bind="{minWidth:'4rem'}">\${cancelLabel}</ui-button>
          <ui-button click.trigger="__close(true)" ui-theme.bind="theme" type="solid" size="sm" css.bind="{minWidth:'4rem'}">\${okLabel}</ui-button>
          </div>  
        </div>    
        </div></template>`;
      const viewFactory = this.compiler.compile(tpl);
      const view = viewFactory.create(this.container);
      cfg.__keyCheck = key => {
        if (key === 13 || (key === 27 && cfg.type === "alert")) {
          cfg.__close(true);
        } else if (key === 27) {
          cfg.__close(false);
        }
      };
      cfg.__close = b => {
        (view as View & { firstChild: Element }).firstChild.classList.remove("ui-alert--show");
        resolve(b !== false);
        setTimeout(() => {
          this.appConfig.DialogContainer.remove(view);
        }, 0);
      };
      view.bind(cfg);
      this.appConfig.DialogContainer.add(view);
      cfg.keyEl.focus();
    });
  }
}
