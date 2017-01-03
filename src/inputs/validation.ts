// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {ValidationRules, ValidationController, ValidationControllerFactory} from "aurelia-validation";
import {UIModel} from "../resources/utils/ui-model";

@autoinject()
export class InputValidation {
  constructor(public element: Element, controllerFactory: ValidationControllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.model = new DataModel();
  }

  // aurelia hooks
  canActivate(model) { return true; }
  activate(model) { return true; }
  bind(bindingContext) { }
  attached() { }
  detached() {
    this.model.dispose();
  }
  unbind() { }
  deactivate() { }
  // end aurelia hooks

  model: DataModel;

  salutations = ['Mr', 'Miss', 'Mrs', 'Dr', 'Prof'];
  countries = _.chain(window.Countries.list).sortBy(['continent', 'name']).groupBy('continent').value();

  controller;
  validate() {
    this.controller.validate()
  }
}


export class DataModel extends UIModel {
  salutation = '';
  firstName = '';
  lastName = '';
  latitude = '';
  longitude = '';
  address1 = '';
  address2 = '';
  city = '';
  state = '';
  country = '';
  phoneType = 'mobile';
  phone = '';
  email = '';
  hasSecondContact = false;
  secondContactType = 'home';
  secondContact = '';

  constructor() {
    super();
    ValidationRules
      .ensure((m: DataModel) => m.firstName)
      .required()
      .maxLength(99)
      .ensure(m => m.lastName)
      .required()
      .maxLength(99)
      .ensure(m => m.latitude)
      .satisfiesRule('decimal', -90, 90)
      .ensure(m => m.longitude)
      .satisfiesRule('decimal', -180, 180)
      .ensure(m => m.address1)
      .required()
      .ensure(m => m.city)
      .required()
      .ensure(m => m.country)
      .required()
      .ensure(m => m.email)
      .required()
      .email()
      .ensure(m => m.phone)
      .required()
      .satisfiesRule('phone')
      .ensure(m => m.secondContact)
      .required()
      .when(m => m.hasSecondContact)
      .satisfiesRule('phone')
      .on(this);
  }
}