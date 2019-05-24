/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
// tslint:disable-next-line
import { UIInternal } from "src/utils/ui-internal";
import { auconfig } from "../../jest-pretest";

describe("ui-panel", () => {
  let component;

  const vm = {
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
          <ui-panel id="panelWithActions" expandable collapsible closable collapsed.bind="collapsed">
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
      expect(el.querySelector(".ui-header__icon .ui-icon").className).toContain("head-icon");
      expect(el.querySelector(".ui-header__title").textContent).toBe("Header Title");
      done();
    });
  });

  it("should have panel with header", done => {
    component.waitForElement("#panelWithHeader").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-header__icon .ui-icon").className).toContain("head-icon");
      expect(el.querySelector(".ui-header__title").textContent).toBe("Header Title");
      expect(el.querySelector(".ui-header__actions")).not.toBeNull();
      expect(el.querySelector(".ui-header__actions button")).not.toBeNull();
      expect(el.querySelector(".ui-footer button")).not.toBeNull();
      done();
    });
  });

  it("should have panel collapsible", done => {
    component.waitForElement("#panelWithActions").then(el => {
      el.au.controller.viewModel.toggleCollapse(true);
      UIInternal.queueTask(() => {
        expect(el.au.controller.viewModel.collapsed).toBeTruthy();
        el.au.controller.viewModel.toggleCollapse(false);
        UIInternal.queueTask(() => {
          expect(el.au.controller.viewModel.collapsed).toBeFalsy();
          done();
        });
      });
    });
  });

  it("should have panel expandable", done => {
    component.waitForElement("#panelWithActions").then(el => {
      el.au.controller.viewModel.toggleExpand(true);
      UIInternal.queueTask(() => {
        expect(el.au.controller.viewModel.expanded).toBeTruthy();
        el.au.controller.viewModel.toggleExpand(false);
        UIInternal.queueTask(() => {
          expect(el.au.controller.viewModel.expanded).toBeFalsy();
          done();
        });
      });
    });
  });

  it("should have panel closable", done => {
    component.waitForElement("#panelWithActions").then(el => {
      el.au.controller.viewModel.beforeclose = () => false;
      el.au.controller.viewModel.close();
      expect(component.element.querySelector("#panelWithActions")).not.toBeNull();

      el.au.controller.viewModel.beforeclose = () => true;
      el.au.controller.viewModel.close();
      UIInternal.queueTask(() => {
        UIInternal.queueTask(() => {
          expect(component.element.querySelector("#panelWithActions")).toBeNull();
          done();
        });
      });
    });
  });
});
