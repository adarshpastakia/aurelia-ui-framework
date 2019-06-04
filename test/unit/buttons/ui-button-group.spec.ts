/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { UIButton } from "../../../src/buttons/ui-button";
import { UIInternal } from "../../../src/utils/ui-internal";
import { auconfig } from "../../jest-pretest";

describe("ui-button-group", () => {
  let component;

  const vm = {
    value: "btn1",
    busy: false,
    disabled: false
  };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-viewport>
          
            <ui-button-group id="testGroup" separator="or" vertical toggle equal value.two-way="value">
              <ui-button id="btn1">One</ui-button>
              <ui-button id="btn2">Two</ui-button>
              <ui-button id="btn3">Three</ui-button>
            </ui-button-group>

          </ui-viewport>
        </div>`
      )
      .boundTo(vm);

    component.bootstrap(aurelia => {
      auconfig(aurelia);
    });

    await component.create(bootstrap);
  });

  afterAll(() => {
    component.dispose();
  });

  it("should have button group", done => {
    component.waitForElement("#testGroup").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should have value", done => {
    component.waitForElement("#testGroup").then(el => {
      expect(el.querySelector("#btn1").dataset.active).toBeTruthy();
      done();
    });
  });

  it("should change value on click", done => {
    component.waitForElement("#testGroup").then(el => {
      el.querySelector("#btn2 .ui-btn").click();
      UIInternal.queueMicroTask(() => {
        expect(vm.value).toBe("btn2");
        done();
      });
    });
  });

  it("should change value on bind", done => {
    component.waitForElement("#testGroup").then(el => {
      vm.value = "btn3";
      UIInternal.queueMicroTask(() => {
        expect(el.querySelector("#btn3").dataset.active).toBeTruthy();
        done();
      });
    });
  });
});
