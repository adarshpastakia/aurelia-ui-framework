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
  <template if.bind="$parent.innerOptions && !$parent.isGrouped">
  <div class.bind="listClass(option, value)" with.bind="{option}" repeat.for="option of innerOptions" ref="__el"
    show.one-time="buildOption(option, __el, !inputValue)" click.trigger="selectOption(option)" data-model.bind="option"></div>
  </template>
  <template if.bind="$parent.innerOptions && $parent.isGrouped">
    <template repeat.for="[key, options] of innerOptions">
      <div class="ui-list__title">\${key}</div>
      <template repeat.for="option of options">
        <div class.bind="listClass(option, value)" with.bind="{option}" ref="__el" show.one-time="buildOption(option, __el, !inputValue)"
          click.trigger="selectOption(option)" data-model.bind="option"></div>
      </template>
    </template>
  </template>
  <div if.bind="isLoading" ui-padding ui-align="center" ui-font="lg" ui-color="gray">
  <ui-svg-icon icon="busy" class="ui-anim--spin"></ui-svg-icon>
  </div>
  <div if.bind="isLoaded && innerOptions.length === 0" ui-padding ui-color="gray" ui-font="sm">\${noOptionsText}</div>
</template>`)
@processContent((compiler, resources, node, instruction) => {
  instruction.inheritBindingContext = true;
  return true;
})
export class ListContainer {}
