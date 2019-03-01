import { serializable, UIDataModel } from "aurelia-ui-framework";
import { ValidationRules } from "aurelia-validation";

export class FormModel extends UIDataModel {
  @serializable()
  public salutaion: string = "";
  @serializable()
  public firstName: string = "";
  @serializable()
  public lastName: string = "";

  @serializable()
  public username: string = "";
  @serializable()
  public password: string = "";

  @serializable()
  public address: string = "";
  @serializable()
  public country: string = "";

  @serializable()
  public email: string = "";

  @serializable()
  public phoneMobile: string = "";
  @serializable()
  public phoneLocal: string = "";

  public rules = ValidationRules.ensure("salutation")
    .required()
    .ensure("firstName")
    .required()
    .ensure("lastName")
    .required()
    .ensure("username")
    .required()
    .ensure("password")
    .required()
    .ensure("address")
    .required()
    .ensure("country")
    .required()
    .ensure("email")
    .required()
    .satisfiesRule("email")
    .ensure("phoneMobile")
    .required()
    .satisfiesRule("phone")
    .ensure("phoneLocal")
    .required()
    .satisfiesRule("phone")
    .on(this);
}
