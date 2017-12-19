import { autoinject, inject, NewInstance } from 'aurelia-framework';
import { ValidationRules, ValidationController, Validator, validateTrigger } from "aurelia-validation";
// import { UIModel } from "aurelia-ui-framework";
import * as _ from "lodash";

@inject(NewInstance.of(ValidationController), Validator)
export class InputValidation {
  constructor(public controller: ValidationController) {
    this.model = new DataModel();
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
  }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  detached() {
    // this.model.dispose();
  }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  model: DataModel;

  salutations = ['Mr', 'Miss', 'Mrs', 'Dr', 'Prof'];
  countries = _.chain(window.Countries.list).sortBy(['continent', 'name']).groupBy('continent').value();

  validate() {
    this.controller.validate()
  }
}


export class DataModel {
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
  phoneType = '';
  phone = '';
  email = '';
  hasSecondContact = false;
  secondContactType = '';
  secondContact = '';

  constructor() {
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
      .displayName('Address')
      .required()
      .ensure(m => m.city)
      .required()
      .ensure(m => m.country)
      .required()
      .ensure(m => m.email)
      .required()
      .email()
      .ensure(m => m.salutation)
      .required()
      .ensure(m => m.phoneType)
      .required()
      .ensure(m => m.phone)
      .required()
      .satisfiesRule('phone')
      .ensure(m => m.secondContactType)
      .required()
      .when(m => m.hasSecondContact)
      .ensure(m => m.secondContact)
      .required()
      .when(m => m.hasSecondContact)
      .satisfiesRule('phone')
      .on(this);
  }
}
