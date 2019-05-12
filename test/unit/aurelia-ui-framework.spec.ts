/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { Container } from "aurelia-framework";
import { StageComponent } from "aurelia-testing";
import { UIApplication, UIFrameworkConfig } from "aurelia-ui-framework";
import { auconfig } from "../jest-pretest";

describe("aurelia-ui-framework test", () => {
  let component;

  const AppBaseUrl = "/api";
  const AppHeaders = { "API-KEY": "KEY" };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(`<ui-viewport></ui-viewport>`)
      .boundTo({});

    component.bootstrap(aurelia => {
      auconfig(aurelia, (config: UIFrameworkConfig) => {
        config
          .setApiBaseUrl(AppBaseUrl)
          .setApiHeaders(AppHeaders)
          .setKeyValue("title", "Test Title");
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
