/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import AVATAR_F from "@images/avatar-female.svg";
import AVATAR_M from "@images/avatar-male.svg";
import { autoinject } from "aurelia-framework";
import { Countries } from "aurelia-ui-framework";
import { ValidationController, ValidationControllerFactory } from "aurelia-validation";
import { FormModel } from "./model";

@autoinject()
export class FormPage {
  protected images = {
    male: AVATAR_M,
    female: AVATAR_F
  };

  protected model = new FormModel();
  protected countries = Countries.list;

  protected formHtml = `<template>
  <ui-form>
  </ui-form>
</template>`;

  protected formAttrs = {
    title: "ui-form",
    attrs: [
      {
        name: "disabled",
        values: "boolean",
        description: "Disable all input fields"
      }
    ],
    events: [
      {
        name: "submit",
        params: "null",
        description: "Form submit event"
      }
    ]
  };
  protected fieldsetAttrs = {
    title: "ui-fieldset",
    attrs: [
      {
        name: "label",
        values: "string",
        description: "Fieldset legend"
      },
      {
        name: "checked",
        values: "boolean",
        description: "Enable/Disable fieldset using a checkbox"
      },
      {
        name: "disabled",
        values: "boolean",
        description: "Disable all input fields"
      },
      {
        name: "optional",
        values: "<b>none</b>",
        description: "Enable checkbox in legend to make child inputs optional"
      }
    ]
  };
  protected fieldAttrs = {
    title: "ui-field",
    attrs: [
      {
        name: "label",
        values: "string",
        description: "Fieldset legend"
      },
      {
        name: "width",
        values: "px | em | rem",
        description: "Fix field width"
      },
      {
        name: "plain",
        values: "boolean",
        description: "Make plain styled field. Use to toggle between display/editing"
      },
      {
        name: "required",
        values: "boolean",
        description: "Show required marker"
      },
      {
        name: "disabled",
        values: "boolean",
        description: "Disable all input fields"
      },
      {
        name: "nolabel",
        values: "<b>none</b>",
        description: "Hide field label"
      },
      {
        name: "inline",
        values: "<b>none</b>",
        description: "Inline layout field"
      }
    ]
  };

  constructor(protected validationController: ValidationController) {}

  protected validate() {
    this.validationController.validate();
  }

  protected reset() {
    this.model.reset();
    setTimeout(() => this.validationController.reset(), 200);
  }
}
