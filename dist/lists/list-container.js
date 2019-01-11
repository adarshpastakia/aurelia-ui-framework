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
var ListContainer = /** @class */ (function () {
    function ListContainer() {
    }
    ListContainer = __decorate([
        autoinject(),
        containerless(),
        inlineView("<template>\n  <div if.bind=\"$parent.innerOptions\" mouseout.trigger=\"hilightIndex = -1\">\n    <template repeat.for=\"option of innerOptions\">\n      <div if.bind=\"option.__type==='group'\" class=\"ui-list__title\">${option.label}</div>\n      <div else class.bind=\"listClass(option, $index, value, hilightIndex)\" with.bind=\"{option}\" ref=\"__el\" mouseover.trigger=\"hilightIndex = $index\"\n        show.one-time=\"buildOption(option, __el, !inputValue)\" click.trigger=\"selectOption(option)\" data-model.bind=\"option\"></div>\n    </template>\n  </div>\n  <div if.bind=\"isLoading\" ui-padding ui-align=\"center\" ui-font=\"lg\" ui-color=\"gray\">\n  <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n  </div>\n  <div if.bind=\"isLoaded && innerOptions.length === 0\" ui-padding ui-color=\"gray\" ui-font=\"sm\">${noOptionsText}</div>\n</template>"),
        processContent(function (compiler, resources, node, instruction) {
            instruction.inheritBindingContext = true;
            return true;
        })
    ], ListContainer);
    return ListContainer;
}());
export { ListContainer };
