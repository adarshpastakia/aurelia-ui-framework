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
  <div class="ui-input__tags" click.trigger="inputEl.focus()">
  <template if.bind="multiple">
    <div class="ui-tag" repeat.for="m of model">
      <span with.bind="{m}" show.one-time="buildOption(m, __el, true) & debounce" ref="__el"></span>
      <span class="ui-tag__close" click.trigger="removeValue(m)">&#x00D7;</span></div>
  </template>
  <input ref="$parent.inputEl" role="combo" size="1" placeholder.bind="placeholder" disabled.bind="disabled || isDisabled || isPlain"
    readonly.bind="readonly" value.two-way="inputValue" input.trigger="filterOptions() & debounce" keydown.trigger="checkKeyEvent($event)"
    change.trigger="false" focus.trigger="toggleDrop(true)" blur.trigger="[canToggleDrop($event), resetQuery()]" />
  </div>
</template>`)
@processContent((compiler, resources, node, instruction) => {
  instruction.inheritBindingContext = true;
  return true;
})
export class ListInput {}
