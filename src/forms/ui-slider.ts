/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, bindingMode, customElement, inlineView } from "aurelia-framework";

@customElement("ui-slider")
@inlineView(`<template class="ui-slider" css.bind="{'--slider-pos': (value-min)/(max-min)}">
<div class="ui-slider__bubble">\${value}</div>
<span class="ui-slider__min">\${min}</span>
<span class="ui-slider__max">\${max}</span>
<div class="ui-slider__bar">
  <input type="range" value.bind="value" step.bind="step" min.bind="min" max.bind="max" />
</div>
</template>`)
export class UISlider {
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: number = 0;
  @bindable()
  public min: number = 0;
  @bindable()
  public max: number = 100;
  @bindable()
  public step: number = 1;

  @bindable()
  public disabled: boolean = false;
}
