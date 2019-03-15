/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { Container, inlineView } from "aurelia-framework";
import { StageComponent } from "aurelia-testing";
import { UIDialogService } from "aurelia-ui-framework";
import { auconfig } from "../../jest-pretest";

@inlineView(`<template>
<ui-dialog icon="head-icon" label="Header Title">
<ui-content>Tests</ui-content>
</ui-dialog>
</template>`)
class MyDialog {}

describe("ui-dialog", () => {
  let component;

  const vm = {};

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(`<div><ui-viewport></ui-viewport></div>`)
      .boundTo(vm);

    component.bootstrap(aurelia => {
      auconfig(aurelia);
    });

    await component.create(bootstrap);
  });

  afterAll(() => {
    component.dispose();
  });

  it("should have open dialog", done => {
    const dialogService: UIDialogService = Container.instance.get(UIDialogService);
    dialogService.open(MyDialog);

    component.waitForElement(".ui-dialog").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-header__icon .ui-icon").className).toContain("head-icon");
      // expect(el.querySelector(".ui-header__title").textContent).toBe("Header Title");
      done();
    });
  });
});
