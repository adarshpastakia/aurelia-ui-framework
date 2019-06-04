/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { Container } from "aurelia-framework";
import { StageComponent } from "aurelia-testing";
import { UIDialogService } from "aurelia-ui-framework";
import { UIInternal } from "../../../src/utils/ui-internal";
import { auconfig } from "../../jest-pretest";
import {
  mockActivate,
  mockAttached,
  mockBind,
  mockCanActivate,
  mockCanDeactivate,
  mockDeactivate, mockDetached, mockUnbind,
  MyDialog
} from "./dialog";

describe("ui-dialog", () => {
  let component;

  const vm = { title: "My Dialog", icon: "my-icon" };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(`<div><ui-viewport></ui-viewport></div>`)
      .boundTo({});

    component.bootstrap(aurelia => {
      auconfig(aurelia);
    });

    await component.create(bootstrap);

    const dialogService: UIDialogService = Container.instance.get(UIDialogService);
    dialogService.open(MyDialog, vm);
  });

  afterAll(() => {
    component.dispose();
  });

  it("should have open dialog", done => {
    component.waitForElement("#dialog").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-dialog")).not.toBeNull();
      expect(el.querySelector(".ui-header__title").textContent).toBe(vm.title);
      expect(el.querySelector(".ui-header__icon .ui-icon").className).toContain(vm.icon);
      done();
    });
  });

  it("should call open lifecycle", done => {
    component.waitForElement("#dialog").then(el => {
      expect(mockCanActivate).toBeCalled();
      expect(mockActivate).toBeCalled();
      expect(mockActivate).toBeCalledWith(vm);
      expect(mockBind).toBeCalled();
      expect(mockAttached).toBeCalled();
      done();
    });
  });

  it("should call close lifecycle", done => {
    component.waitForElement("#dialog").then(el => {
      getViewModel(el).close("YES");
      UIInternal.queueMicroTask(() => {
        expect(mockCanDeactivate).toBeCalled();
        expect(mockCanDeactivate).toBeCalledWith("YES");
        expect(mockDeactivate).toBeCalled();
        expect(mockDetached).toBeCalled();
        expect(mockUnbind).toBeCalled();
        done();
      });
    });
  });
});
