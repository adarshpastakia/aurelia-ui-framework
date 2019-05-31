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

describe("ui-internal", () => {
  let component;
  const vm: AnyObject = {};

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<ui-viewport view-model.ref="viewport"><ui-icon view-model.ref="testVM" event.trigger="eventCallback($event)" icon.call="callback($event)"></ui-icon></ui-viewport>`
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

  it("queueTask", done => {
    expect(UIInternal.queueTask).not.toBeNull();
    UIInternal.queueTask(() => done());
  });

  it("queueMicroTask", done => {
    expect(UIInternal.queueMicroTask).not.toBeNull();
    UIInternal.queueMicroTask(() => done());
  });

  it("subscribe", done => {
    expect(UIInternal.broadcast).not.toBeNull();

    UIInternal.subscribe("test", data => {
      expect(data).toBeTruthy();
      done();
    });
    UIInternal.broadcast("test", true);
  });

  it("subscribeOnce", done => {
    expect(UIInternal.broadcast).not.toBeNull();

    UIInternal.subscribeOnce("test", data => {
      expect(data).toBeTruthy();
      done();
    });
    UIInternal.broadcast("test", true);
  });

  it("event trigger", done => {
    expect(vm.testVM).not.toBeNull();

    vm.eventCallback = evt => {
      expect(evt.detail).toBeTruthy();
    };
    UIInternal.fireCallbackEvent(vm.testVM, "event", true).then(done);
  });

  it("event callback", done => {
    expect(vm.testVM).not.toBeNull();

    vm.callback = evt => {
      expect(evt).toBeTruthy();
      return Promise.resolve();
    };
    UIInternal.fireCallbackEvent(vm.testVM, "icon", true).then(done);
  });

  it("compile view", done => {
    const view = UIInternal.compileTemplate(`<template><p>\${title}</p></template>`, {
      title: "Test compile"
    });
    expect(view).not.toBeNull();

    vm.viewport.appConfig.DialogContainer.add(
      UIInternal.compileTemplate(`<template><button>Click</button></template>`)
    );
    vm.viewport.appConfig.DialogContainer.add(view);

    component.waitForElements("p, button").then(els => {
      expect(els).not.toBeNull();
      expect(els.length).toBe(2);
      expect(els[0].innerHTML).toBe("Click");
      expect(els[1].innerHTML).toBe("Test compile");
      done();
    });
  });
});
