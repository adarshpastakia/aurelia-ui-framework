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

describe("ui-button", () => {
  let component;

  const vm = {
    href: "test",
    busy: false,
    disabled: false,
    callback: jest.fn()
  };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-viewport>
            <ui-button id="testButton" href.bind="href" busy.bind="busy" disabled.bind="disabled" click.trigger="callback()"></ui-button>
            
            <ui-button id="noLabel" icon="mdi mdi-account"></ui-button>
            <ui-button id="noIcon">Test Label</ui-button>
            <ui-button id="withBadge" ui-badge="9">Test Label</ui-button>
            
            <ui-button id="iconEnd" icon="mdi mdi-account" icon-end>Test</ui-button>
            <ui-button id="iconTop" icon="mdi mdi-account" icon-top>Test</ui-button>
            <ui-button id="iconHilight" icon="mdi mdi-account" icon-hilight>Test</ui-button>
            <ui-button id="block" icon="mdi mdi-account" block>Test</ui-button>
            <ui-button id="noCaret" icon="mdi mdi-account" no-caret>Test</ui-button>
            
            <ui-button id="withDrop"><ui-drop><p>Test</p></ui-drop></ui-button>

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

  it("should have button", done => {
    component.waitForElement("#testButton").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should have have href", done => {
    component.waitForElement("#testButton .ui-btn").then(el => {
      expect(el).not.toBeNull();
      expect(el).toHaveAttribute("href", vm.href);
      vm.href = "";
      UIInternal.queueMicroTask(() => {
        expect(el).not.toHaveAttribute("href");
        done();
      });
    });
  });

  it("should receive click event", done => {
    component.waitForElement("#testButton").then(el => {
      el.querySelector(".ui-btn").click();
      expect(vm.callback).toBeCalled();
      done();
    });
  });

  it("should be busy", done => {
    component.waitForElement("#testButton").then(el => {
      const viewModel: UIButton = getViewModel(el);
      expect(viewModel.busy).toBeFalsy();
      vm.busy = true;
      UIInternal.queueMicroTask(() => {
        expect(viewModel.busy).toBeTruthy();
        done();
      });
    });
  });

  it("should be disabled", done => {
    component.waitForElement("#testButton").then(el => {
      const viewModel: UIButton = getViewModel(el);
      expect(viewModel.isDisabled).toBeFalsy();
      vm.disabled = true;
      UIInternal.queueMicroTask(() => {
        expect(viewModel.isDisabled).toBeTruthy();

        vm.disabled = false;
        viewModel.disable(true);
        UIInternal.queueMicroTask(() => {
          expect(viewModel.isDisabled).toBeTruthy();
          done();
        });
      });
    });
  });

  it("should not fire click when busy", done => {
    component.waitForElement("#testButton").then(el => {
      const viewModel = getViewModel(el);
      vm.busy = true;
      vm.callback = jest.fn();
      UIInternal.queueMicroTask(() => {
        viewModel.badgeEl.click();
        expect(vm.callback).not.toBeCalled();
        done();
      });
    });
  });

  it("should not fire click when disabled", done => {
    component.waitForElement("#testButton").then(el => {
      const viewModel = getViewModel(el);
      vm.disabled = true;
      vm.callback = jest.fn();
      UIInternal.queueMicroTask(() => {
        viewModel.badgeEl.click();
        expect(vm.callback).not.toBeCalled();
        done();
      });
    });
  });

  it("should have badge", done => {
    component.waitForElement("#withBadge").then(el => {
      expect(el.querySelector(".ui-badge")).not.toBeNull();
      done();
    });
  });

  it("should have icon only", done => {
    component.waitForElement("#noLabel").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-btn__icon")).not.toBeNull();
      expect(el.querySelector(".ui-btn__label")).toHaveTextContent("");
      done();
    });
  });

  it("should have label only", done => {
    component.waitForElement("#noIcon").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-btn__icon")).toBeNull();
      expect(el.querySelector(".ui-btn__label")).toHaveTextContent("Test Label");
      done();
    });
  });

  it("should have icon end", done => {
    component.waitForElement("#iconEnd").then(el => {
      expect(el).not.toBeNull();
      expect(el.classList).toContain("ui-btn__icon--end");
      done();
    });
  });

  it("should have icon top", done => {
    component.waitForElement("#iconTop").then(el => {
      expect(el).not.toBeNull();
      expect(el.classList).toContain("ui-btn__icon--top");
      done();
    });
  });

  it("should have icon hilight", done => {
    component.waitForElement("#iconHilight").then(el => {
      expect(el).not.toBeNull();
      expect(el.classList).toContain("ui-btn__icon--hilight");
      done();
    });
  });

  it("should have no caret", done => {
    component.waitForElement("#noCaret").then(el => {
      expect(el).not.toBeNull();
      expect(el.classList).toContain("ui-btn__caret--hide");
      done();
    });
  });

  it("should have block", done => {
    component.waitForElement("#block").then(el => {
      expect(el).not.toBeNull();
      expect(el.classList).toContain("ui-btn--block");
      done();
    });
  });

  it("should have dropdown", done => {
    component.waitForElement("#withDrop").then(el => {
      expect(el).not.toBeNull();
      vm.callback = jest.fn();
      UIInternal.queueMicroTask(() => {
        const viewModel = getViewModel(el);
        expect(viewModel.hasDrop).toBeTruthy();
        expect(el.querySelector(".ui-btn__caret")).not.toBeNull();
        viewModel.badgeEl.click();
        expect(vm.callback).not.toBeCalled();
        done();
      });
    });
  });
});
