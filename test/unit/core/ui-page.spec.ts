/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { auconfig } from "../../jest-pretest";

describe("ui-page", () => {
  let component;

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-page page-title="Page Title">
            <ui-section centered>
              <ui-content css.bind="{width:'3em',height:'3em'}">
                <p>Hello</p>
              </ui-content>
            </ui-section>
          </ui-page>
        </div>`
      )
      .boundTo({});

    component.bootstrap(aurelia => {
      auconfig(aurelia);
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
