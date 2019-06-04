import { inlineView } from "aurelia-templating";

export const mockCanActivate = jest.fn();
export const mockActivate = jest.fn();
export const mockBind = jest.fn();
export const mockAttached = jest.fn();
export const mockCanDeactivate = jest.fn();
export const mockDeactivate = jest.fn();
export const mockDetached = jest.fn();
export const mockUnbind = jest.fn();

@inlineView(`<template>
<ui-dialog id="dialog" icon.bind="model.icon" label.bind="model.title">
<ui-content>Tests</ui-content>
</ui-dialog>
</template>`)
export class MyDialog {
  protected model: KeyValue;

  constructor() {
    //
  }

  public canActivate() {
    mockCanActivate(...arguments);
    return true;
  }

  public activate(model) {
    this.model = model;
    mockActivate(...arguments);
  }

  public bind() {
    mockBind(...arguments);
  }

  public attached() {
    mockAttached(...arguments);
  }

  public canDeactivate() {
    mockCanDeactivate(...arguments);
    return true;
  }

  public deactivate() {
    mockDeactivate(...arguments);
  }

  public detached() {
    mockDetached(...arguments);
  }

  public unbind() {
    mockUnbind(...arguments);
  }
}
