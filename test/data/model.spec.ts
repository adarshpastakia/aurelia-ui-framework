//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import { UIDataModel, serializable } from '../../src/data/ui-datamodel';

class MyModel extends UIDataModel {
  @serializable('hello') firstName: string;
  @serializable() lastName: string;

  apiUrl = '/api/user';
  tempCounter = 9;

  get(id) {
    this.id = id;
    this.firstName = 'Username';
    this.lastName = 'Surname';
    return Promise.resolve();
  }
}

describe('Data Model', () => {
  let model = new MyModel();

  it("should have firstName property", () => {
    expect(model.hasOwnProperty('firstName')).toEqual(true);
  });
  it("should have lastName property", () => {
    expect(model.hasOwnProperty('lastName')).toEqual(true);
  });
  it("should have firstName value hello", () => {
    expect(model.firstName).toEqual("hello");
  });
  it("should not be dirty", () => {
    expect(model.isDirty).toEqual(false);
  });
  it("should be dirty", () => {
    model.lastName = 'world';
    expect(model.isDirty).toEqual(true);
  });
  it("firstName should not be dirty", () => {
    expect(model.dirtyProps.firstName).toEqual(false);
  });
  it("lastName should be dirty", () => {
    expect(model.dirtyProps.lastName).toEqual(true);
  });
  it("reset lastName, should not be dirty", () => {
    model.lastName = null;
    expect(model.isDirty).toEqual(false);
  });
  it("set lastName and update, should be dirty", () => {
    model.lastName = "world";
    model.update();
    expect(model.isDirty).toEqual(true);
  });
  it("set lastName and reset, should not be dirty", () => {
    model.lastName = "world22";
    model.reset();
    expect(model.isDirty).toEqual(false);
  });
  it("set lastName and save, should not be dirty", () => {
    model.lastName = "world";
    model.save();
    expect(model.isDirty).toEqual(false);
  });
  it("get model by id", () => {
    let m = new MyModel(9);
    expect(m.id).toEqual(9);
  });
});
