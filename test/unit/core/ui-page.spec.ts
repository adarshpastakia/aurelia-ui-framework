/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { PLATFORM } from "aurelia-framework";
import { StageComponent } from "aurelia-testing";

describe("ui-page", () => {
  let component;

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-page page-title="Page Title">
            <ui-section centered><p>Hello</p></ui-section>
          </ui-page>
        </div>`
      )
      .boundTo({});

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration().plugin(PLATFORM.moduleName("aurelia-ui-framework"));
    });

    await component.create(bootstrap);
  });

  afterAll(() => {
    component.dispose();
  });

  it("should have page", done => {
    component.waitForElement(".ui-page").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should have page title", done => {
    component.waitForElement(".ui-page__title").then(el => {
      expect(el).not.toBeNull();
      expect(el.innerHTML).toBe("Page Title");
      done();
    });
  });

  it("should have section centered", done => {
    component.waitForElement(".ui-section").then(el => {
      expect(el).not.toBeNull();
      expect(el.className).toContain("ui-section--centered");
      done();
    });
  });
});
