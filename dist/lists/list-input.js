var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, containerless, inlineView, processContent } from "aurelia-framework";
var ListInput = /** @class */ (function () {
    function ListInput() {
    }
    ListInput = __decorate([
        autoinject(),
        containerless(),
        inlineView("<template>\n  <div class=\"ui-input__tags\" click.trigger=\"inputEl.focus()\">\n  <template if.bind=\"multiple\">\n    <div class=\"ui-tag\" repeat.for=\"m of model\">\n      <span with.bind=\"{m}\" show.one-time=\"buildOption(m, __el, true) & debounce\" ref=\"__el\"></span>\n      <span class=\"ui-tag__close\" click.trigger=\"removeOption(m)\">&#x00D7;</span></div>\n  </template>\n  <input ref=\"$parent.inputEl\" role=\"combo\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\"\n    readonly.bind=\"readonly\" value.two-way=\"inputValue\" input.trigger=\"filterOptions() & debounce\" keydown.trigger=\"checkKeyEvent($event)\"\n    change.trigger=\"false\" focus.trigger=\"toggleDrop(true)\" blur.trigger=\"[canToggleDrop($event), resetQuery(true)] & debounce\" />\n  </div>\n</template>"),
        processContent(function (compiler, resources, node, instruction) {
            instruction.inheritBindingContext = true;
            return true;
        })
    ], ListInput);
    return ListInput;
}());
export { ListInput };
