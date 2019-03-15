/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { auconfig } from "../../jest-pretest";

describe("ui-responsive", () => {
  let component;

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-grid size="md"></ui-grid>
          <ui-container id="container">
            <ui-row halign="center" valign="middle" nowrap>
              <ui-col size="auto" align="start"></ui-col>
              <ui-col size="2"></ui-col>
              <ui-col size="4 2@md"></ui-col>
            </ui-row>
            <ui-row reverse>
              <ui-col content-stretch></ui-col>
            </ui-row>
          </ui-container>
          <ui-container id="containerFluid" fluid>
            <ui-row halign="center" valign="middle" vertical auto>
              <ui-col></ui-col>
            </ui-row>
            <ui-row halign="center" valign="middle" vertical reverse>
              <ui-col></ui-col>
            </ui-row>
          </ui-container>
        </div>`
      )
      .boundTo({});

    component.bootstrap(aurelia => {
      auconfig(aurelia);
    });

    await component.create(bootstrap);
  });

  afterAll(() => {
    component.dispose();
  });

  it("should have container", done => {
    component.waitForElement(".ui-container").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should have fluid container", done => {
    component.waitForElement(".ui-container--fluid").then(el => {
      expect(el).not.toBeNull();
      done();
    });
  });

  it("should have 4 rows", done => {
    component.waitForElements(".ui-row").then(el => {
      expect(el).toHaveLength(4);
      done();
    });
  });
});
