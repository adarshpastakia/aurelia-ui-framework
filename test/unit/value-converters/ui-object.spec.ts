/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */

import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { auconfig } from "../../jest-pretest";

describe("valueConverter/ui-object", () => {
  let component;

  beforeAll(async () => {
    component = StageComponent.withResources()
      .inView(
        `<ui-viewport view-model.ref="viewport">
        <div repeat.for="i of '' | split" class="splitBlank">split</div>
        <div repeat.for="i of '1,2,3' | split" class="split">split</div>
        <div repeat.for="i of '1|2|3' | split:'|'" class="splitPipe">split</div>

        <div repeat.for="i of [1,2,3,4,5] | slice" class="slice">slice</div>
        <div repeat.for="i of [1,2,3,4,5] | slice:2" class="slice">slice</div>

        <div repeat.for="[i,key] of {} | objectMap" class="objectBlank">object</div>
        <div repeat.for="[i,key] of {a:1,b:2,c:3} | objectMap" class="objectMap">object</div>

        <div repeat.for="[i,key] of [{prop:1},{prop:2}] | group:'prop'" class="group">group</div>

        <div repeat.for="i of [] | sort" class="sortArray">sort</div>
        <div repeat.for="i of [9,4,2] | sort" class="sortArray">sort</div>
        <div repeat.for="i of [9,4,2] | sort:null:false" class="sortArray">sort</div>
        <div repeat.for="i of map | sort" class="sortArray">sort</div>

        <div repeat.for="i of [] | orderBy" class="orderByArray">orderBy</div>
        <div repeat.for="i of [2,4,9] | orderBy" class="orderByArray">orderBy</div>
        <div repeat.for="i of [2,4,9] | orderBy:null:false" class="orderByArray">orderBy</div>
        <div repeat.for="i of map | orderBy" class="orderByArray">orderBy</div>

        <div repeat.for="i of [] | filter" class="filterBlank">filter</div>
        <div repeat.for="i of [1,2,3] | filter" class="filterBlank">filter</div>
        <div repeat.for="i of [2,24,49] | filter:2" class="filter">filter</div>
        <div repeat.for="i of objectProp | filter:2:'prop'" class="filter">filterObject</div>
        <div repeat.for="i of map | filter:2" class="filter">filterMap</div>
        <div repeat.for="i of mapProp | filter:2:'prop'" class="filter">filterMapProp</div>

        </ui-viewport>`
      )
      .boundTo({
        map: new Map([["2", 24], ["3", 49], ["1", 2]]),
        mapProp: new Map([["a", { prop: 2 }], ["b", { prop: 24 }], ["c", { prop: 49 }]]),
        objectProp: [{ prop: 2 }, { prop: 24 }, { prop: 49 }]
      });

    component.bootstrap(aurelia => {
      auconfig(aurelia);
    });

    await component.create(bootstrap);
  });

  afterAll(() => {
    component.dispose();
  });

  it("should repeat using split", done => {
    component.waitForElements(".split").then(el => {
      expect(el).toHaveLength(3);
      done();
    });
  });

  it("should repeat using split |", done => {
    component.waitForElements(".splitPipe").then(el => {
      expect(el).toHaveLength(3);
      done();
    });
  });

  it("should repeat using slice", done => {
    component.waitForElements(".slice").then(el => {
      expect(el).toHaveLength(7);
      done();
    });
  });

  it("should repeat using objectMap", done => {
    component.waitForElements(".objectMap").then(el => {
      expect(el).toHaveLength(3);
      done();
    });
  });

  it("should repeat using group", done => {
    component.waitForElements(".group").then(el => {
      expect(el).toHaveLength(2);
      done();
    });
  });

  it("should repeat using sort", done => {
    component.waitForElements(".sortArray").then(el => {
      expect(el).toHaveLength(9);
      done();
    });
  });

  it("should repeat using orderBy", done => {
    component.waitForElements(".orderByArray").then(el => {
      expect(el).toHaveLength(9);
      done();
    });
  });

  it("should repeat using filter", done => {
    component.waitForElements(".filter").then(el => {
      expect(el).toHaveLength(8);
      done();
    });
  });
});
