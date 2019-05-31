/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { UIInternal } from "../../../src/utils/ui-internal";
import { auconfig } from "../../jest-pretest";

describe("ui-panel", () => {
  let component;

  const vm = {
    expanded: false,
    collapsed: false
  };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-panel id="panelNoHeader" label="Header Title" icon="head-icon">
            <ui-content>Panel Content</ui-content>
          </ui-panel>
          <ui-panel id="panelWithHeader">
            <ui-header label="Header Title" icon="head-icon">
              <ui-header-actions><button>Click</button></ui-header-actions>
            </ui-header>
            <ui-content>Panel Content</ui-content>
            <ui-footer>
              <ui-toolbar align-end>
                <ui-text>Text</ui-text>
                <button>Test</button>
              </ui-toolbar>
            </ui-footer>
          </ui-panel>
          <ui-panel id="panelWithActions" expandable collapsible closable collapsed.bind="collapsed" expanded.bind="expanded">
            <ui-content>Panel Content</ui-content>
          </ui-panel>
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

  it("should have panel", done => {
    component.waitForElement("#panelNoHeader").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-header__icon .ui-icon").classList).toContain("head-icon");
      expect(el.querySelector(".ui-header__title").textContent).toBe("Header Title");
      done();
    });
  });

  it("should have panel with header", done => {
    component.waitForElement("#panelWithHeader").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-header__icon .ui-icon").classList).toContain("head-icon");
      expect(el.querySelector(".ui-header__title").textContent).toBe("Header Title");
      expect(el.querySelector(".ui-header__actions")).not.toBeNull();
      expect(el.querySelector(".ui-header__actions button")).not.toBeNull();
      expect(el.querySelector(".ui-footer button")).not.toBeNull();
      done();
    });
  });

  it("should have panel collapsible", done => {
    component.waitForElement("#panelWithActions").then(el => {
      const viewModel = getViewModel(el);
      vm.collapsed = true;
      UIInternal.queueMicroTask(() => {
        expect(viewModel.collapsed).toBeTruthy();
        vm.collapsed = false;
        UIInternal.queueMicroTask(() => {
          expect(viewModel.collapsed).toBeFalsy();
          done();
        });
      });
    });
  });

  it("should have panel expandable", done => {
    component.waitForElement("#panelWithActions").then(el => {
      const viewModel = getViewModel(el);
      vm.expanded = true;
      UIInternal.queueMicroTask(() => {
        expect(viewModel.expanded).toBeTruthy();
        vm.expanded = false;
        UIInternal.queueMicroTask(() => {
          expect(viewModel.expanded).toBeFalsy();
          done();
        });
      });
    });
  });

  it("should have panel closable", done => {
    component.waitForElement("#panelWithActions").then(el => {
      const viewModel = getViewModel(el);
      viewModel.beforeclose = () => false;
      viewModel.close();
      expect(component.element.querySelector("#panelWithActions")).not.toBeNull();

      viewModel.beforeclose = () => true;
      viewModel.close();
      UIInternal.queueMicroTask(() => {
        UIInternal.queueMicroTask(() => {
          expect(component.element.querySelector("#panelWithActions")).toBeNull();
          done();
        });
      });
    });
  });
});
