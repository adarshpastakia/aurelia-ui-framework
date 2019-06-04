import { bindable, bindingMode, computedFrom, customElement, inlineView, containerless, processContent, viewResources } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk2.js';
import { a as __decorate, b as __metadata, c as __awaiter } from './chunk3.js';
import { b as BaseInput, a as InputWrapper } from './chunk6.js';

var view = "<template class=\"ui-dropdown\">\n  <a data-active.bind=\"active\" disabled.bind=\"disabled\" click.trigger=\"toggleDrop($event)\" class=\"ui-dropdown__link\" data-open.bind=\"dropEl.isOpen\" data-disabled.bind=\"disabled\">\n    <ui-icon class=\"ui-dropdown__icon\" icon=\"${iconPrefix} ${model[iconProperty]}\" if.bind=\"iconProperty\"></ui-icon>\n    <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n      <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n      <ul>\n        <li repeat.for=\"err of errors\">${err}</li>\n      </ul>\n    </div>\n    <span class=\"ui-dropdown__label\">${selectedLabel}</span>\n    <ui-svg-icon class=\"ui-dropdown__caret\" icon=\"caret\"></ui-svg-icon>\n  </a>\n  <ui-drop view-model.ref=\"dropEl\">\n    <div>\n      <template repeat.for=\"option of options\">\n        <div class=\"ui-list__item ${(option[valueProperty] || option) === value?'ui-list__item--selected':''}\" click.trigger=\"select(option)\">\n          <ui-icon if.bind=\"iconProperty\" icon=\"${iconPrefix} ${option[iconProperty]}\"></ui-icon>\n          ${option[labelProperty] || option}\n        </div>\n      </template>\n    </div>\n  </ui-drop>\n</template>\n";

let UIDropdown = class UIDropdown {
    constructor(element) {
        this.element = element;
        this.value = undefined;
        this.name = "";
        this.placeholder = "Select";
        this.labelProperty = "";
        this.valueProperty = "";
        this.iconProperty = "";
        this.iconPrefix = "";
        this.disabled = false;
        this.model = undefined;
    }
    attached() {
        this.dropEl.tether(this.element);
        this.valueChanged();
    }
    valueChanged() {
        if (this.options) {
            this.model = this.options.find(o => (o[this.valueProperty] || o) === this.value);
        }
    }
    select(model) {
        this.model = model;
        this.value = this.model[this.valueProperty] || this.model;
    }
    get selectedLabel() {
        return !isNull(this.model) ? this.model[this.labelProperty] || this.model : this.placeholder;
    }
    toggleDrop($event) {
        $event.stopEvent();
        const beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
        const afterEvent = this.dropEl.isOpen ? "close" : "open";
        if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
            this.dropEl.toggleDrop();
            this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIDropdown.prototype, "value", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UIDropdown.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDropdown.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDropdown.prototype, "placeholder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDropdown.prototype, "labelProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDropdown.prototype, "valueProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDropdown.prototype, "iconProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDropdown.prototype, "iconPrefix", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UIDropdown.prototype, "options", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIDropdown.prototype, "disabled", void 0);
__decorate([
    computedFrom("model"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDropdown.prototype, "selectedLabel", null);
UIDropdown = __decorate([
    customElement("ui-dropdown"),
    inlineView(view),
    __metadata("design:paramtypes", [Element])
], UIDropdown);

var view$1 = "<template>\n  <div if.bind=\"$parent.innerOptions\" mouseout.trigger=\"hilightIndex = -1\">\n    <template repeat.for=\"option of innerOptions\">\n      <div if.bind=\"option.__type==='group'\" class=\"ui-list__title\">${option.label}</div>\n      <div else class.bind=\"listClass(option, $index, value, hilightIndex)\" with.bind=\"{option}\" ref=\"__el\" mouseover.trigger=\"hilightIndex = $index\" show.one-time=\"buildOption(option, __el, !inputValue)\" click.trigger=\"selectOption(option)\" data-model.bind=\"option\"></div>\n    </template>\n  </div>\n  <div if.bind=\"isLoading\" ui-padding ui-align=\"center\" ui-font=\"lg\" ui-color=\"gray\">\n    <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n  </div>\n  <div if.bind=\"isLoaded && innerOptions.length === 0\" ui-padding ui-color=\"gray\" ui-font=\"sm\">\n    ${noOptionsText}\n  </div>\n</template>\n";

let ListContainer = class ListContainer {
};
ListContainer = __decorate([
    containerless(),
    inlineView(view$1),
    processContent((compiler, resources, node, instruction) => {
        instruction.inheritBindingContext = true;
        return true;
    })
], ListContainer);

var view$2 = "<template>\n  <div class=\"ui-input__tags\" click.trigger=\"inputEl.focus()\">\n    <template if.bind=\"multiple\">\n      <div class=\"ui-tag\" repeat.for=\"m of model\">\n        <span with.bind=\"{m}\" show.one-time=\"buildOption(m, __el, true) & debounce\" ref=\"__el\"></span>\n        <span class=\"ui-tag__close\" click.trigger=\"removeOption(m)\">&#x00D7;</span>\n      </div>\n    </template>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"$parent.inputEl\" role=\"combo\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" input.trigger=\"filterOptions() & debounce\" keydown.trigger=\"checkKeyEvent($event)\" change.trigger=\"false\" focus.trigger=\"toggleDrop(true)\" blur.trigger=\"[canToggleDrop($event), resetQuery(true)] & debounce\">\n  </div>\n</template>\n";

let ListInput = class ListInput {
};
ListInput = __decorate([
    containerless(),
    inlineView(view$2),
    processContent((compiler, resources, node, instruction) => {
        instruction.inheritBindingContext = true;
        return true;
    })
], ListInput);

const KEY_DOWN = 40;
const KEY_UP = 38;
const BACKSPACE = 8;
const ENTER = 13;
class ListMaker extends BaseInput {
    constructor() {
        super(...arguments);
        this.value = undefined;
        this.model = undefined;
        this.name = "";
        this.placeholder = "";
        this.labelProperty = "";
        this.valueProperty = "";
        this.groupProperty = "";
        this.options = [];
        this.readonly = false;
        this.disabled = false;
        this.noOptionsText = "No Options";
        this.multiple = false;
        this.inputValue = "";
        this.isLoaded = false;
        this.isLoading = false;
        this.isGrouped = false;
        this.isFiltered = false;
        this.ignoreChange = false;
        this.allowAny = false;
        this.hilightIndex = -1;
    }
    valueChanged() {
        if (this.ignoreChange) {
            return;
        }
        if (!this.valueProperty) {
            this.model = this.value;
            if (!this.multiple) {
                this.inputValue = this.value ? this.value[this.labelProperty] || this.value : "";
            }
            return;
        }
        if (this.options && !isNull(this.value)) {
            if (this.multiple) {
                this.model = this.options.filter(o => {
                    if (this.matcher) {
                        return this.value.some(value => {
                            return this.matcher({ option: o, value });
                        });
                    }
                    else {
                        return this.value.includes(o[this.valueProperty] || o);
                    }
                });
            }
            else {
                this.model = this.options.find(o => {
                    if (this.matcher) {
                        return this.matcher({ option: o, value: this.value });
                    }
                    else {
                        return this.value === (o[this.valueProperty] || o);
                    }
                });
            }
        }
        else {
            this.model = null;
            this.inputValue = "";
        }
        if (!this.dropEl) {
            UIInternal.queueTask(() => {
                const selected = this.listContainer.querySelector(".ui-list__item--selected");
                if (selected) {
                    selected.scrollIntoView({ block: "nearest" });
                }
            });
        }
        this.resetQuery();
    }
    toggleDrop(open) {
        if (this.dropEl) {
            if (open === true && this.dropEl.isOpen) {
                UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
                return;
            }
            if (super.toggleDrop(open)) {
                this.loadOptions();
            }
        }
    }
    loadOptions() {
        if (this.query) {
            this.fetchOptions();
        }
        else {
            this.buildOptions(this.options);
        }
    }
    filterOptions() {
        this.isFiltered = !!this.inputValue;
        if (this.query) {
            this.fetchOptions(this.inputValue);
        }
        else {
            const query = this.inputValue.ascii().toLowerCase();
            const options = this.options.filter(o => (o[this.labelProperty] || o)
                .toString()
                .ascii()
                .toLowerCase()
                .includes(query));
            this.buildOptions(options);
        }
    }
    selectOption(model) {
        this.ignoreChange = true;
        this.hilightIndex = -1;
        if (this.multiple) {
            if (!(this.value || []).includes(model[this.valueProperty] || model)) {
                this.value = this.value
                    ? [...this.value, model[this.valueProperty] || model]
                    : [model[this.valueProperty] || model];
                this.model = this.model ? [...this.model, model] : [model];
            }
            this.inputValue = "";
            this.inputEl.focus();
            this.inputEl.select();
        }
        else {
            if (this.labelProperty) {
                model.$label = model[this.labelProperty] || model;
            }
            this.value = model[this.valueProperty] || model;
            this.model = model;
            this.resetQuery();
            if (this.dropEl) {
                this.dropEl.closeDrop();
            }
        }
        if (this.isFiltered) {
            this.isFiltered = false;
            this.loadOptions();
        }
        this.element.dispatchEvent(UIInternal.createEvent("change", this.value));
        this.element.dispatchEvent(UIInternal.createEvent("select", this.model));
        setTimeout(() => (this.ignoreChange = false), 500);
    }
    removeOption(model) {
        this.ignoreChange = true;
        this.model = [...this.model.filter(m => m !== model)];
        this.value = this.value.filter(m => m !== (model[this.valueProperty] || model));
        setTimeout(() => (this.ignoreChange = false), 500);
    }
    resetQuery(clearFilter) {
        this.hilightIndex = -1;
        if (this.multiple) {
            this.inputValue = "";
        }
        else {
            this.inputValue = this.model
                ? (this.model[this.labelProperty] || this.model).replace("<u>", "").replace("</u>", "")
                : "";
        }
        if (clearFilter && this.isFiltered) {
            this.isFiltered = false;
            this.loadOptions();
        }
    }
    clear() {
        this.model = null;
        this.value = null;
        this.inputValue = "";
        this.inputEl.focus();
        if (this.isFiltered) {
            this.loadOptions();
        }
    }
    listClass(option, index) {
        const classes = ["ui-list__item"];
        option.__selected = false;
        if (!this.multiple) {
            if (this.matcher) {
                if (this.matcher({ option, value: this.value })) {
                    option.__selected = true;
                    classes.push("ui-list__item--selected");
                }
            }
            else if ((option[this.valueProperty] || option) === this.value) {
                option.__selected = true;
                classes.push("ui-list__item--selected");
            }
        }
        else if (this.multiple && this.value) {
            if (this.matcher) {
                this.value.forEach(value => {
                    if (this.matcher({ option, value })) {
                        option.__selected = true;
                        classes.push("ui-list__item--disabled");
                    }
                });
            }
            else if (this.value.includes(option[this.valueProperty] || option)) {
                option.__selected = true;
                classes.push("ui-list__item--disabled");
            }
        }
        if (this.hilightIndex === index) {
            classes.push("ui-list__item--hilight");
        }
        return classes.join(" ");
    }
    buildOption(option, el, unmark = false) {
        if (el) {
            el.innerHTML = "";
            const tpl = this.template
                ? this.template.outerHTML
                : `<template><div innerhtml.bind="$label"></div></template>`;
            const model = {
                $label: this.isFiltered && !unmark
                    ? this.markOption(option)
                    : option[this.labelProperty] || option,
                $model: option,
                $value: option[this.valueProperty] || option
            };
            const view = UIInternal.compileTemplate(tpl, model);
            view.appendNodesTo(el);
        }
        return true;
    }
    checkKeyEvent($event) {
        if ([KEY_DOWN, KEY_UP].includes($event.keyCode)) {
            if (this.dropEl && !this.dropEl.isOpen) {
                this.dropEl.toggleDrop();
            }
            if ($event.keyCode === KEY_DOWN) {
                this.hilightIndex =
                    this.hilightIndex === -1 && this.model
                        ? this.innerOptions.indexOf(this.model)
                        : this.hilightIndex >= this.innerOptions.length || this.hilightIndex < -1
                            ? -1
                            : this.hilightIndex;
                while (this.hilightIndex + 1 !== this.innerOptions.length &&
                    (this.innerOptions[this.hilightIndex + 1].__type === "group" ||
                        this.innerOptions[this.hilightIndex + 1].__selected ||
                        this.innerOptions[this.hilightIndex + 1].__disabled)) {
                    this.hilightIndex++;
                }
                this.hilightIndex = this.hilightIndex + 1;
            }
            if ($event.keyCode === KEY_UP) {
                this.hilightIndex =
                    this.hilightIndex === -1 && this.model
                        ? this.innerOptions.indexOf(this.model)
                        : this.hilightIndex === -1
                            ? this.innerOptions.length
                            : this.hilightIndex;
                while (this.hilightIndex - 1 > 0 &&
                    (this.innerOptions[this.hilightIndex - 1].__type === "group" ||
                        this.innerOptions[this.hilightIndex - 1].__selected ||
                        this.innerOptions[this.hilightIndex - 1].__disabled)) {
                    this.hilightIndex--;
                }
                this.hilightIndex = this.hilightIndex - 1;
            }
            UIInternal.queueTask(() => {
                const selected = this.listContainer.querySelector(".ui-list__item--hilight");
                if (selected) {
                    selected.scrollIntoView({ block: "nearest" });
                }
            });
            $event.stopEvent();
        }
        else if (this.hilightIndex !== -1 && $event.keyCode === ENTER) {
            this.selectOption(this.innerOptions[this.hilightIndex]);
            $event.stopEvent();
        }
        else if (this.allowAny && !!this.inputValue.trim() && $event.keyCode === ENTER) {
            this.selectOption(this.inputValue);
            $event.stopEvent();
        }
        else if (this.multiple && $event.keyCode === BACKSPACE) {
            if (this.model.length > 0 && this.inputValue.length === 0) {
                $event.stopEvent();
                this.removeOption(this.model.last());
            }
        }
        else {
            this.fireEnter($event);
        }
        return true;
    }
    fetchOptions(query) {
        return __awaiter(this, void 0, void 0, function* () {
            this.showLoading();
            const result = yield this.query({ query });
            if (!this.options) {
                this.options = result;
            }
            this.buildOptions(result || []);
        });
    }
    showLoading() {
        this.isLoaded = false;
        this.isLoading = true;
        this.innerOptions = [];
        if (this.dropEl) {
            UIInternal.queueMicroTask(() => this.dropEl.updatePosition());
        }
    }
    buildOptions(options, silent = false) {
        if (!silent) {
            this.showLoading();
        }
        const optionsClone = options.map(o => (isString(o) ? `${o}` : Object.assign({}, o)));
        UIInternal.queueTask(() => {
            this.isLoading = false;
            if (this.groupProperty) {
                const groups = optionsClone
                    .sortBy([this.groupProperty, this.labelProperty])
                    .groupBy(this.groupProperty);
                groups.forEach((items, label) => this.innerOptions.push({ __type: "group", label }, ...items));
            }
            else {
                this.innerOptions = optionsClone.sortBy(this.labelProperty);
            }
            this.isLoaded = true;
            UIInternal.queueTask(() => {
                const selected = this.listContainer.querySelector(".ui-list__item--selected");
                if (selected) {
                    selected.scrollIntoView({ block: "nearest" });
                }
            });
            if (this.dropEl) {
                UIInternal.queueTask(() => this.dropEl.updatePosition());
            }
        });
    }
    markOption(option) {
        let lbl = option[this.labelProperty] || `${option}`;
        if (isEmpty(this.inputValue)) {
            return lbl;
        }
        const rx = new RegExp(this.inputValue, "i");
        const asc = lbl.toString().ascii();
        if (rx.test(asc)) {
            const start = asc.search(rx);
            lbl =
                lbl.substr(0, start) +
                    "<u>" +
                    lbl.substr(start, this.inputValue.length) +
                    "</u>" +
                    lbl.substr(start + this.inputValue.length);
        }
        return lbl;
    }
}

var view$3 = "<template class=\"ui-input ui-list ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper model.bind=\"$this\">\n    <slot></slot>\n    <list-input></list-input>\n    <div class=\"ui-list__container\" ref=\"listContainer\" css.bind=\"{height}\">\n      <list-container></list-container>\n    </div>\n  </input-wrapper>\n</template>\n";

let UIList = class UIList extends ListMaker {
    constructor(element) {
        super(element);
        this.element = element;
        this.value = undefined;
        this.model = undefined;
        this.name = "";
        this.height = "20em";
        this.placeholder = "";
        this.labelProperty = "";
        this.valueProperty = "";
        this.groupProperty = "";
        this.readonly = false;
        this.disabled = false;
        this.noOptionsText = "No Options";
        this.multiple = element.hasAttribute("multiple");
        this.allowAny = element.hasAttribute("allow-any");
        this.template = this.element.querySelector("template");
    }
    bind() {
        if (!isNull(this.model)) {
            if (this.multiple) {
                this.value = this.multiple
                    ? this.model.map(o => o[this.valueProperty] || o)
                    : this.model[this.labelProperty] || this.model;
            }
        }
        this.isGrouped = !!this.groupProperty;
        this.valueChanged();
    }
    attached() {
        this.loadOptions();
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIList.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIList.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UIList.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIList.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIList.prototype, "height", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIList.prototype, "placeholder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIList.prototype, "labelProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIList.prototype, "valueProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIList.prototype, "groupProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UIList.prototype, "query", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UIList.prototype, "options", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIList.prototype, "readonly", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIList.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIList.prototype, "noOptionsText", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UIList.prototype, "matcher", void 0);
UIList = __decorate([
    customElement("ui-list"),
    viewResources(InputWrapper, ListInput, ListContainer),
    inlineView(view$3),
    __metadata("design:paramtypes", [Element])
], UIList);

var view$4 = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <list-input></list-input>\n  </input-wrapper>\n  <ui-drop view-model.ref=\"dropEl\" class=\"ui-list\" close.trigger=\"resetQuery()\">\n    <div ref=\"listContainer\" class=\"ui-list__container\">\n      <list-container></list-container>\n    </div>\n  </ui-drop>\n</template>\n";

let UISelect = class UISelect extends ListMaker {
    constructor(element) {
        super(element);
        this.element = element;
        this.value = undefined;
        this.model = undefined;
        this.name = "";
        this.placeholder = "";
        this.labelProperty = "";
        this.valueProperty = "";
        this.groupProperty = "";
        this.readonly = false;
        this.disabled = false;
        this.noOptionsText = "No Options";
        this.dropHandle = "caret";
        this.multiple = element.hasAttribute("multiple");
        this.allowAny = element.hasAttribute("allow-any");
        this.template = this.element.querySelector("template");
    }
    attached() {
        this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
        this.dropEl.closeOnClick = !this.multiple;
        this.dropEl.tether(this.element);
    }
    bind() {
        if (!isNull(this.model)) {
            if (this.multiple) {
                this.value = this.multiple
                    ? this.model.map(o => o[this.valueProperty] || o)
                    : this.model[this.labelProperty] || this.model;
            }
        }
        this.isGrouped = !!this.groupProperty;
        this.valueChanged();
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UISelect.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UISelect.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UISelect.prototype, "errors", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISelect.prototype, "name", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISelect.prototype, "placeholder", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISelect.prototype, "labelProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISelect.prototype, "valueProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISelect.prototype, "groupProperty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UISelect.prototype, "query", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UISelect.prototype, "options", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UISelect.prototype, "readonly", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UISelect.prototype, "disabled", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISelect.prototype, "noOptionsText", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UISelect.prototype, "matcher", void 0);
UISelect = __decorate([
    customElement("ui-select"),
    viewResources(InputWrapper, ListInput, ListContainer),
    inlineView(view$4),
    __metadata("design:paramtypes", [Element])
], UISelect);

const Lists = [UIList, UISelect, UIDropdown];

export { Lists };
//# sourceMappingURL=ui-lists.js.map
