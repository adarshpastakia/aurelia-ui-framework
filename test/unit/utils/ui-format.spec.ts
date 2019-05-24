/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { UIFormat } from "aurelia-ui-framework";

describe("ui-format", () => {
  it("should format date", done => {
    expect(UIFormat.date("2018-01-01T00:00:00.000Z", "dd MM yyyy")).toBe("01 01 2018");
    expect(UIFormat.date("Invalid")).toBeNull();
    done();
  });

  it("should format time", done => {
    expect(UIFormat.time("2018-01-01T00:00:00.000")).toBe("12:00 AM");
    expect(UIFormat.time("Invalid", "HH mm")).toBeNull();
    done();
  });

  it("should format date/time", done => {
    expect(UIFormat.datetime("2018-01-01T00:00:00.000")).toBe("01 Jan 2018 12:00 AM");
    expect(UIFormat.datetime("Invalid", "HH mm")).toBeNull();
    done();
  });

  it("should format dateISO", done => {
    const dt = new Date();
    expect(UIFormat.dateToISO(dt)).not.toBeNull();
    expect(UIFormat.dateToISO("Invalid")).toBeNull();
    done();
  });

  it("should format dateUTC", done => {
    const dt = new Date();
    expect(UIFormat.utcDate(dt)).toBe(dt.toISOString());
    expect(UIFormat.utcDate("Invalid")).toBeNull();
    done();
  });

  it("should format date age", done => {
    const dt = new Date();
    dt.setHours(dt.getHours() - 2);
    expect(UIFormat.age(dt)).toBe("2 hours");
    expect(UIFormat.age("Invalid")).toBe("");
    done();
  });

  it("should format date from", done => {
    const dt = new Date();
    dt.setHours(dt.getHours() + 2);
    expect(UIFormat.fromNow(dt)).toBe("in about 2 hours");
    dt.setHours(dt.getHours() - 4);
    expect(UIFormat.fromNow(dt)).toBe("about 2 hours ago");
    expect(UIFormat.fromNow("Invalid")).toBe("");
    done();
  });

  it("should format number", done => {
    expect(UIFormat.number(91824)).toBe("91,824");
    expect(UIFormat.number(91824.36)).toBe("91,824.36");
    expect(UIFormat.number(9, "{0000}")).toBe("0009");
    expect(UIFormat.number("Invalid")).toBe("");
    done();
  });

  it("should format percentage", done => {
    expect(UIFormat.percent(0.2418)).toBe("24.18%");
    expect(UIFormat.percent(18.24)).toBe("18.24%");
    expect(UIFormat.percent("Invalid")).toBe("");
    done();
  });

  it("should format currency", done => {
    expect(UIFormat.currency(91824.36, "AED")).toBe("AED 91,824.36");
    expect(UIFormat.currency(91824.36, "$", "$ 0.00")).toBe("$ 91824.36");
    expect(UIFormat.currency("Invalid")).toBe("");
    done();
  });

  it("should format html", done => {
    expect(UIFormat.toHTML("# Hello")).toBe(`<h1 id="hello">Hello</h1>\n`);
    done();
  });
});
