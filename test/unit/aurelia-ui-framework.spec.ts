/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { Container, PLATFORM } from "aurelia-framework";
import { StageComponent } from "aurelia-testing";
import { UIApplication, UIFrameworkConfig } from "aurelia-ui-framework";

describe("aurelia-ui-framework test", () => {
  let component;

  const AppTitle = "Application Title";
  const AppSubtitle = "Application Subtitle";
  const AppVersion = "5.0.0";
  const AppBaseUrl = "/api";
  const AppHeaders = { "API-KEY": "KEY" };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(`<ui-viewport></ui-viewport>`)
      .boundTo({});

    component.bootstrap(aurelia => {
      aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName("aurelia-ui-framework"), (config: UIFrameworkConfig) => {
          config
            .setTitle(AppTitle)
            .setSubtitle(AppSubtitle)
            .setVersion(AppVersion)
            .setApiBaseUrl(AppBaseUrl)
            .setApiHeaders(AppHeaders)
            .use.all();
        });
    });

    await component.create(bootstrap);
  });

  afterAll(() => {
    component.dispose();
  });

  it("application has config", done => {
    const app = Container.instance.get(UIApplication);
    expect(app.config).not.toBeNull();
    done();
  });

  it("application has logging", done => {
    const app = Container.instance.get(UIApplication);
    app.log("Log Test", 99);
    expect(app.log).not.toBeNull();
    done();
  });

  it("application has debug logging", done => {
    const app = Container.instance.get(UIApplication);
    app.debug("Log Test", 99);
    expect(app.debug).not.toBeNull();
    done();
  });

  it("application config title", done => {
    const app: UIApplication = Container.instance.get(UIApplication);
    expect(app.config.AppTitle).toBe(AppTitle);
    done();
  });

  it("application config subtitle", done => {
    const app: UIApplication = Container.instance.get(UIApplication);
    expect(app.config.AppSubtitle).toBe(AppSubtitle);
    done();
  });

  it("application config version", done => {
    const app: UIApplication = Container.instance.get(UIApplication);
    expect(app.config.AppVersion).toBe(AppVersion);
    done();
  });

  it("application config base url", done => {
    const app: UIApplication = Container.instance.get(UIApplication);
    expect(app.config.ApiBaseUrl).toBe(AppBaseUrl);
    done();
  });

  it("application config headers", done => {
    const app: UIApplication = Container.instance.get(UIApplication);
    expect(app.config.ApiHeaders).toBe(AppHeaders);
    done();
  });
});
