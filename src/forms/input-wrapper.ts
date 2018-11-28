/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, containerless, inlineView, processContent } from "aurelia-framework";

@autoinject()
@containerless()
@inlineView(`<template>
  <div class="ui-input__error" if.bind="errors && errors.length">
    <ui-svg-icon icon="alert"></ui-svg-icon>
    <ul><li repeat.for="err of errors">\${err.message || err}</li></ul>
  </div>
  <div class="ui-input__counter" if.bind="showCounter && (value.length > 0 || maxlength > 0)">\${counter}</div>
  <div class="ui-input__clear" if.bind="allowClear && value.length > 0" click.trigger="clear()">
    <ui-svg-icon icon="cross"></ui-svg-icon></div>
  <div class="ui-input__drop-handle" if.bind="dropHandle" click.trigger="toggleDrop()">
    <ui-svg-icon icon.bind="dropHandle"></ui-svg-icon></div>
  <slot></slot>
</template>`)
@processContent((compiler, resources, node, instruction) => {
  instruction.inheritBindingContext = true;
  return true;
})
export class InputWrapper {}
