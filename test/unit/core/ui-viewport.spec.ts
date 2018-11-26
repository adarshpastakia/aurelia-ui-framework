/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { Container, DOM, PLATFORM } from "aurelia-framework";
import { StageComponent } from "aurelia-testing";
import { UIApplication } from "aurelia-ui-framework";
// tslint:disable-next-line
import { UIInternal } from "aurelia-ui-framework/utils/ui-internal";

describe("ui-viewport", () => {
  let component;

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-viewport view-model.ref="viewport">
            <ui-viewport-header></ui-viewport-header>
            <ui-viewport-footer></ui-viewport-footer>
            <ui-section>
              <ui-section-head><ui-menubar></ui-menubar></ui-section-head>
              <ui-section-foot><ui-toolbar></ui-toolbar></ui-section-foot>
              <ui-icon icon="mdi-account" flip-on-rtl></ui-icon>
              <ui-svg-icon icon="cross2" class="temp-icon"></ui-svg-icon>
              <ui-svg-icon icon="cross" class="temp-icon"></ui-svg-icon>
              <ui-flag icon="AE" size="md"></ui-flag>
            </ui-section>
          </ui-viewport>
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

  it("should have viewport", done => {
    component.waitForElement(".ui-viewport").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should have viewport header", done => {
    component.waitForElement(".ui-viewport__header").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should have viewport", done => {
    component.waitForElement(".ui-viewport__footer").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should test broadcast onClick", done => {
    component.waitForElement(".ui-viewport__floating-container").then(el => {
      el.dispatchEvent(UIInternal.createEvent("mouseup"));
      // expect(UIInternal.broadcast).not.toBeCalled();
      component.element.dispatchEvent(UIInternal.createEvent("mouseup"));
      // expect(UIInternal.broadcast).toBeCalledWith(UIInternal.EVT_VIEWPORT_CLICK, expect.anything());
      done();
    });
  });

  it("should test broadcast onResize", done => {
    component.waitForElement(".ui-viewport").then(el => {
      window.dispatchEvent(UIInternal.createEvent("resize"));
      // expect(UIInternal.broadcast).toBeCalledWith(UIInternal.EVT_VIEWPORT_RESIZE);
      done();
    });
  });

  it("should have containers", done => {
    component.waitForElement(".ui-viewport").then(el => {
      const app: UIApplication = Container.instance.get(UIApplication);
      expect(app.config.AlertContainer).not.toBeNull();
      expect(app.config.DialogContainer).not.toBeNull();
      expect(app.config.FloatingContainer).not.toBeNull();
      expect(app.config.TaskbarContainer).not.toBeNull();
      expect(app.config.ToastContainer).not.toBeNull();
      done();
    });
  });
});
