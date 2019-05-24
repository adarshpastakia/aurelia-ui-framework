/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { auconfig } from "../../jest-pretest";

describe("valueConverter/ui-text", () => {
  let component;

  const dt = new Date();
  dt.setHours(dt.getHours() - 2);

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<ui-viewport view-model.ref="viewport">
        <div id="json">\${{ a: "a" } | json}</div>
        <div id="markdownBlank" innerhtml.bind='"" | md'></div>
        <div id="markdown" innerhtml.bind='"# Hello" | md'></div>
        <div id="phoneBlank">\${"" | phone}</div>
        <div id="phone">\${phone | phone}</div>
        <div id="phoneCountry">\${phoneLocal | phone:phoneCountry}</div>
        <div id="phoneLocalBlank">\${"" | phoneLocal}</div>
        <div id="phoneLocal">\${phone | phoneLocal}</div>
        <div id="phoneLocalCountry">\${phoneLocal | phoneLocal:phoneCountry}</div>
        <div id="phoneHtmlBlank" innerhtml.bind='"" | phoneHtml'></div>
        <div id="phoneHtml" innerhtml.bind='phone | phoneHtml'></div>
        <div id="phoneHtmlCountry" innerhtml.bind='phoneLocal | phoneHtml:phoneCountry'></div>
        <div id="phoneHtmlLocalBlank" innerhtml.bind='"" | phoneLocalHtml'></div>
        <div id="phoneHtmlLocal" innerhtml.bind='phone | phoneLocalHtml'></div>
        <div id="phoneHtmlLocalCountry" innerhtml.bind='phoneLocal | phoneLocalHtml:phoneCountry'></div>
        <div id="date">\${"2018-01-01T00:00:00.000" | date}</div>
        <div id="time">\${"2018-01-01T00:00:00.000" | time}</div>
        <div id="datetime">\${"2018-01-01T00:00:00.000" | datetime}</div>
        <div id="utc">\${"2018-01-01T00:00:00.000" | utc}</div>
        <div id="iso">\${"2018-01-01T00:00:00.000" | iso}</div>
        <div id="age">\${date | age}</div>
        <div id="fromNow">\${date | fromnow}</div>
        <div id="number">\${91824 | number}</div>
        <div id="currency">\${91824 | currency}</div>
        <div id="percent">\${92.4 | percent}</div>
        </ui-viewport>`
      )
      .boundTo({
        date: dt,
        phone: "+971503182424",
        phoneCountry: "AE",
        phoneLocal: "0503182424"
      });

    component.bootstrap(aurelia => {
      auconfig(aurelia);
    });

    await component.create(bootstrap);
  });

  afterAll(() => {
    component.dispose();
  });

  it("should format json", done => {
    component.waitForElement("#json").then(el => {
      expect(el.innerHTML).toBe('{"a":"a"}');
      done();
    });
  });

  it("should format markdown", done => {
    component.waitForElements("#markdownBlank, #markdown h1").then(el => {
      expect(el[0].innerHTML).toBe("");
      expect(el[1].innerHTML).toBe("Hello");
      done();
    });
  });

  it("should format phone", done => {
    component.waitForElements("#phoneBlank, #phone, #phoneCountry").then(el => {
      expect(el[0].innerHTML).toBe("");
      expect(el[2].innerHTML).toBe("+971 50 318 2424");
      expect(el[1].innerHTML).toBe("+971 50 318 2424");
      done();
    });
  });

  it("should format phone local", done => {
    component.waitForElements("#phoneLocalBlank, #phoneLocal, #phoneLocalCountry").then(el => {
      expect(el[0].innerHTML).toBe("");
      expect(el[2].innerHTML).toBe("050 318 2424");
      expect(el[1].innerHTML).toBe("050 318 2424");
      done();
    });
  });

  it("should format phone HTML", done => {
    component
      .waitForElements("#phoneHtmlBlank span, #phoneHtml span, #phoneHtmlCountry span")
      .then(el => {
        expect(el[0].className).toBe("ui-flag ");
        expect(el[1].className).toBe("ui-flag AE");
        expect(el[2].className).toBe("ui-flag AE");
        done();
      });
  });

  it("should format phone local HTML", done => {
    component
      .waitForElements(
        "#phoneHtmlLocalBlank span, #phoneHtmlLocal span, #phoneHtmlLocalCountry span"
      )
      .then(el => {
        expect(el[0].className).toBe("ui-flag ");
        expect(el[1].className).toBe("ui-flag AE");
        expect(el[2].className).toBe("ui-flag AE");
        done();
      });
  });

  it("should format dates", done => {
    component.waitForElements("#date, #time, #datetime, #utc, #iso, #age, #fromNow").then(el => {
      expect(el[0].innerHTML).toBe("01 Jan 2018");
      expect(el[1].innerHTML).toBe("12:00 AM");
      expect(el[2].innerHTML).toBe("01 Jan 2018 12:00 AM");
      expect(el[3].innerHTML).not.toBeNull();
      expect(el[4].innerHTML).not.toBeNull();
      expect(el[5].innerHTML).toBe("2 hours");
      expect(el[6].innerHTML).toBe("about 2 hours ago");
      done();
    });
  });

  it("should format numbers", done => {
    component.waitForElements("#number, #currency, #percent").then(el => {
      expect(el[0].innerHTML).toBe("91,824");
      expect(el[1].innerHTML).toBe("$ 91,824.00");
      expect(el[2].innerHTML).toBe("92.40%");
      done();
    });
  });
});
