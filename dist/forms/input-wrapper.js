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
var InputWrapper = /** @class */ (function () {
    function InputWrapper() {
    }
    InputWrapper = __decorate([
        autoinject(),
        containerless(),
        inlineView("<template>\n  <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n    <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n    <ul><li repeat.for=\"err of errors\">${err.message || err}</li></ul>\n  </div>\n  <div class=\"ui-input__counter\" if.bind=\"showCounter && (value.length > 0 || maxlength > 0)\">${counter}</div>\n  <div class=\"ui-input__clear\" if.bind=\"allowClear && value.length > 0\" click.trigger=\"clear()\">\n    <ui-svg-icon icon=\"cross\"></ui-svg-icon></div>\n  <div class=\"ui-input__drop-handle\" if.bind=\"dropHandle\" click.trigger=\"toggleDrop()\">\n    <ui-svg-icon icon.bind=\"dropHandle\"></ui-svg-icon></div>\n  <slot></slot>\n</template>"),
        processContent(function (compiler, resources, node, instruction) {
            instruction.inheritBindingContext = true;
            return true;
        })
    ], InputWrapper);
    return InputWrapper;
}());
export { InputWrapper };
