/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { Container, inlineView, PLATFORM } from "aurelia-framework";
import { ComponentTester, StageComponent } from "aurelia-testing";
import { UIDialogService } from "aurelia-ui-framework";

@inlineView(`<template>
<ui-dialog icon="head-icon" label="Header Title">
<ui-content>Tests</ui-content>
</ui-dialog>
</template>`)
class MyDialog {}

describe("ui-dialog", () => {
  let component: ComponentTester;

  const vm = {};

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(`<div><ui-viewport></ui-viewport></div>`)
      .boundTo(vm);

    component.bootstrap(aurelia => {
      aurelia.use.standardConfiguration().plugin(PLATFORM.moduleName("aurelia-ui-framework"));
      return aurelia.use;
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
      expect(el.querySelector(".ui-header__title").textContent).toBe("Header Title");
      done();
    });
  });
});
