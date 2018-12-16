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
  <div if.bind="$parent.innerOptions" mouseout.trigger="hilightIndex = -1">
    <template repeat.for="option of innerOptions">
      <div if.bind="option.__type==='group'" class="ui-list__title">\${option.label}</div>
      <div else class.bind="listClass(option, $index, value, hilightIndex)" with.bind="{option}" ref="__el" mouseover.trigger="hilightIndex = $index"
        show.one-time="buildOption(option, __el, !inputValue)" click.trigger="selectOption(option)" data-model.bind="option"></div>
    </template>
  </div>
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
