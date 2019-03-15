/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { auconfig } from "../../jest-pretest";

describe("ui-card", () => {
  let component;

  const vm = {
    collapsed: false
  };

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<div>
          <ui-card>
            <ui-header label="Header Title" icon="head-icon">
              <ui-header-actions><button>Click</button></ui-header-actions>
            </ui-header>
            <ui-card-title>Card Title</ui-card-title>
            <ui-card-media top>Card Media</ui-card-title>
            <ui-card-media>Card Media</ui-card-title>
            <ui-card-meta>Card Meta</ui-card-title>
            <ui-card-content fill>Card Content</ui-card-content>
            <ui-card-content>Card Content</ui-card-content>
            <ui-card-list>Card List</ui-card-list>
            <ui-footer><button>Test</button></ui-footer>
          </ui-card>
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

  it("should have card", done => {
    component.waitForElement(".ui-card").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector(".ui-header__icon .ui-icon").className).toContain("head-icon");
      expect(el.querySelector(".ui-header__title").textContent).toBe("Header Title");
      expect(el.querySelector(".ui-card__title").textContent).toContain("Card Title");
      expect(el.querySelector(".ui-card__meta").textContent).toContain("Card Meta");
      expect(el.querySelector(".ui-card__content").textContent).toContain("Card Content");
      expect(el.querySelector(".ui-card__list").textContent).toContain("Card List");
      expect(el.querySelector(".ui-card__media").textContent).toContain("Card Media");
      done();
    });
  });
});
