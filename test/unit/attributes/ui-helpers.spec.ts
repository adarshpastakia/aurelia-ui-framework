/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { auconfig } from "../../jest-pretest";

describe("ui-helpers", () => {
  let component;

  const vm = {
    paper: false,
    theme: "primary"
  };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<ui-viewport view-model.ref="viewport">
          <ui-viewport-header ui-bg="primary"></ui-viewport-header>
          <div id="el" ui-theme.bind="theme" ui-bg="primary" ui-color="primary" ui-padding="x sm@md" ui-margin="x sm@md"
            ui-border="sm primary" ui-font="lg" ui-weight="bold" ui-align="center" ui-text="upper" ui-hover="green"
            ui-gutter="sm" ui-hide="down@md" ui-show="up@xl" ui-clip="4" ui-scroll ui-paper.bind="paper" ui-shadow="1" ui-line="2" ui-link></div>
        </ui-viewport>`
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

  it("should apply helpers", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-theme--primary");
      vm.theme = "secondary";
      component.waitForElement("#el.ui-theme--secondary").then(el2 => {
        expect(el2.className).toContain("ui-theme--secondary");
        done();
      });
    });
  });

  it("should apply bg", done => {
    component.waitForElements(".ui-viewport__header, #el").then(els => {
      expect(els[0].className).toContain("ui-bg--primary");
      expect(els[1].className).toContain("ui-bg--primary");
      done();
    });
  });

  it("should apply color", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-color--primary");
      done();
    });
  });

  it("should apply hover", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-hover--green");
      done();
    });
  });

  it("should apply padding", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-padding--x");
      expect(el.className).toContain("ui-padding--sm@md");
      done();
    });
  });

  it("should apply margin", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-margin--x");
      expect(el.className).toContain("ui-margin--sm@md");
      done();
    });
  });

  it("should apply font styles", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-font--lg");
      expect(el.className).toContain("ui-weight--bold");
      expect(el.className).toContain("ui-align--center");
      expect(el.className).toContain("ui-text--upper");
      done();
    });
  });

  it("should apply border", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-border--sm");
      expect(el.className).toContain("ui-border--primary");
      done();
    });
  });

  it("should apply visibility", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-hide--down@md");
      expect(el.className).toContain("ui-show--up@xl");
      done();
    });
  });

  it("should apply scroll", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-scroll");
      done();
    });
  });

  it("should apply link", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-link");
      done();
    });
  });

  it("should apply lineHeight", done => {
    component.waitForElement("#el").then(el => {
      expect(el.style.lineHeight).toBe("2");
      done();
    });
  });

  it("should apply shadow", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).toContain("ui-shadow--1");
      done();
    });
  });

  it("should not apply paper", done => {
    component.waitForElement("#el").then(el => {
      expect(el.className).not.toContain("ui-paper");
      done();
    });
  });

  it("should apply paper", done => {
    vm.paper = true;
    component.waitForElement("#el.ui-paper").then(el => {
      expect(el.className).toContain("ui-paper");
      done();
    });
  });
});
