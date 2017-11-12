var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "../../utils/ui-constants", "lodash"], function (require, exports, aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, ui_constants_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIMarkdown = (function (_super) {
        __extends(UIMarkdown, _super);
        function UIMarkdown(element) {
            var _this = _super.call(this) || this;
            _this.element = element;
            _this.value = '';
            _this.dir = '';
            _this.rows = 15;
            _this.errors = null;
            _this.maxlength = 5000;
            _this.disabled = false;
            _this.readonly = false;
            _this.placeholder = '';
            _this.autoComplete = '';
            _this.info = '';
            _this.clear = false;
            _this.counter = false;
            _this.ignore = false;
            _this.help = false;
            _this.preview = false;
            _this.disableTools = false;
            _this.clear = element.hasAttribute('clear');
            _this.counter = element.hasAttribute('counter');
            return _this;
        }
        UIMarkdown.prototype.bind = function (bindingContext, overrideContext) {
            _super.prototype.bind.apply(this, arguments);
        };
        UIMarkdown.prototype.toolClicked = function (evt) {
            var _this = this;
            var btn;
            if (!(btn = getParentByTag(evt.target, 'ui-button')))
                return;
            if (!(btn = btn['dataset']["id"]))
                return;
            var val = this.value || '';
            var diff = 0, start = this.inputEl.selectionStart, end = this.inputEl.selectionEnd, sub = val.substr(start, end - start) || 'EditThis';
            switch (btn) {
                case 'h1':
                    diff = 3;
                    this.value = val.substr(0, start) + ("\n# " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h2':
                    diff = 4;
                    this.value = val.substr(0, start) + ("\n## " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h3':
                    diff = 5;
                    this.value = val.substr(0, start) + ("\n### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h4':
                    diff = 6;
                    this.value = val.substr(0, start) + ("\n#### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h5':
                    diff = 7;
                    this.value = val.substr(0, start) + ("\n##### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'h6':
                    diff = 8;
                    this.value = val.substr(0, start) + ("\n###### " + sub + "\n\n") + val.substr(end);
                    break;
                case 'b':
                    diff = 3;
                    this.value = val.substr(0, start) + (" " + sub + " ") + val.substr(end);
                    break;
                case 'i':
                    diff = 2;
                    this.value = val.substr(0, start) + (" _" + sub + "_ ") + val.substr(end);
                    break;
                case 's':
                    diff = 3;
                    this.value = val.substr(0, start) + (" ~~" + sub + "~~ ") + val.substr(end);
                    break;
                case 'a':
                    diff = 2;
                    this.value = val.substr(0, start) + (" [" + sub + "](Link_Url_Here) ") + val.substr(end);
                    break;
                case 'img':
                    diff = 3;
                    this.value = val.substr(0, start) + (" ![" + sub + "](Image_Url_Here) ") + val.substr(end);
                    break;
                case 'ul':
                    diff = 2;
                    sub = sub.replace(/^.+$/gm, function (t) { return "* " + t; });
                    this.value = val.substr(0, start) + (sub + "\n") + val.substr(end);
                    break;
                case 'ol':
                    var i = 1;
                    diff = 3;
                    sub = sub.replace(/^.+$/gm, function (t) { return (i++ == 1 ? '1.' : '*') + " " + t; });
                    this.value = val.substr(0, start) + (sub + "\n") + val.substr(end);
                    break;
                case 'help':
                    this.preview = false;
                    this.disableTools = this.help = !this.help;
                    break;
                case 'preview':
                    this.help = false;
                    this.disableTools = this.preview = !this.preview;
                    break;
            }
            this.inputEl.focus();
            if (sub == 'EditThis' && btn != 'preview' && btn != 'help')
                ui_event_1.UIEvent.queueTask(function () { return _this.inputEl.setSelectionRange(start + diff, start + diff + sub.length); });
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "rows", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "maxlength", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "placeholder", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "autoComplete", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIMarkdown.prototype, "info", void 0);
        UIMarkdown = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.customElement('ui-markdown'),
            aurelia_framework_1.inlineView("<template class=\"ui-md-editor ui-input-wrapper\" dir.bind=\"dir\"><ui-toolbar start click.trigger=\"toolClicked($event)\">\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button data-id=\"h1\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H1</ui-button>\n  <ui-button data-id=\"h2\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H2</ui-button>\n  <ui-button data-id=\"h3\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H3</ui-button>\n  <ui-button data-id=\"h4\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H4</ui-button>\n  <ui-button data-id=\"h5\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H5</ui-button>\n  <ui-button data-id=\"h6\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H6</ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-bold\" data-id=\"b\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-italic\" data-id=\"i\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-strike\" data-id=\"s\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-link\" data-id=\"a\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-image\" data-id=\"img\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-list\" data-id=\"ul\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-number\" data-id=\"ol\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-help\" data-id=\"help\" disabled.bind=\"disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-preview\" data-id=\"preview\" disabled.bind=\"disabled||readonly\" square small light></ui-button>\n  </div></ui-toolbar>\n  <div class=\"ui-watermark ${preview?'preview':''} ${help?'help':''}\">\n  <div role=\"input\" class=\"ui-input-control ui-textarea\"><span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <textarea ref=\"inputEl\" value.bind=\"value\" rows.bind=\"rows\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    placeholder.bind=\"placeholder\" disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"></textarea>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"value.length + ' of ' + maxlength\"></span>\n  </div>\n\n  <div class='ui-md-preview ui-pad-all ui-markdown' show.bind=\"help\" dir=\"ltr\">\n  <h2 class=\"ui-small-caps ui-text-primary ui-strong\">Markdown Syntax</h2>\n  <hr/>\n  <p>Add a blank line to create a separate paragraph</p>\n  <hr/>\n  <p class=\"ui-text-primary\">Headers</p>\n\n  <div>\n      <span>H1 <code class=\"ui-selectable\"># Header</code> <h1 class=\"ui-inline\">Header</h1></span>\n      <br/>\n      <span>H2 <code class=\"ui-selectable\">## Header</code> <h2 class=\"ui-inline\">Header</h2></span>\n      <br/>\n      <span>H3 <code class=\"ui-selectable\">### Header</code> <h3 class=\"ui-inline\">Header</h3></span>\n      <br/>\n      <span>H4 <code class=\"ui-selectable\">#### Header</code> <h4 class=\"ui-inline\">Header</h4></span>\n      <br/>\n      <span>H5 <code class=\"ui-selectable\">##### Header</code> <h5 class=\"ui-inline\">Header</h5></span>\n      <br/>\n      <span>H6 <code class=\"ui-selectable\">###### Header</code> <h6 class=\"ui-inline\">Header</h6></span>\n      <br/>\n  </div>\n\n  <p class=\"ui-text-primary\">Styles</p>\n\n  <p>\n      <span>Italic <code class=\"ui-selectable\">_Italic Text_</code>: <i>Italic</i></span>\n      <br/>\n      <span>Bold <code class=\"ui-selectable\">__Bold Text__</code>: <b>Bold</b></span>\n      <br/>\n      <span>Strikethrough <code class=\"ui-selectable\">~~Strikethrough~~</code>: <del>Strikethrough</del></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Links</p>\n\n  <p>\n      <code class=\"ui-selectable\">[link text](link URL)</code>\n      <br/>\n      <em>any url will be converted to a link, use the above to display custom text instead of url in the link.</em>\n      <br/>\n      <span>eg. <code>&lt;a href=\"url\">Link Text&lt;/a></code></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Images</p>\n\n  <p>\n      <code class=\"ui-selectable\">![alt text](image URL)</code>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Lists</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <br/>\n      <span><code class=\"ui-selectable\">1. list item</code>: 1. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 2. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 3. list item</span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Tables</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">|Head|Head |Head|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|:---|:---:|---:|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <br/>\n      <table>\n          <thead>\n              <tr>\n                  <th class=\"ui-text-start\">Head</th>\n                  <th class=\"ui-text-center\">Head</th>\n                  <th class=\"ui-text-end\">Head</th>\n              </tr>\n          </thead>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n      </table>\n  </p>\n  <br/>\n  <br/></div>\n\n  <div class=\"ui-md-preview ui-pad-all ui-markdown\" dir.bind=\"dir\" show.bind=\"preview\" innerhtml.bind=\"value | markdown\" dir.bind=\"dir\"></div>\n\n  </div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], UIMarkdown);
        return UIMarkdown;
    }(ui_input_1.UIBaseInput));
    exports.UIMarkdown = UIMarkdown;
    var UILanguage = (function () {
        function UILanguage(element) {
            this.element = element;
            this.value = '';
            this.dir = '';
            this.errors = null;
            this.disabled = false;
            this.readonly = false;
            this.info = '';
            this.placeholder = '';
            this.errored = [];
            this.show = false;
            this.selectedList = [];
            this.availableList = [];
        }
        UILanguage.prototype.bind = function (bindingContext, overrideContext) {
            this.languagesChanged(this.languages);
        };
        UILanguage.prototype.attached = function () {
            var _this = this;
            this.tether = ui_utils_1.UIUtils.tether(this.element, this.dropdown);
            this.obMouseup = ui_event_1.UIEvent.subscribe('mouseclick', function (evt) {
                if (getParentByClass(evt.target, 'ui-list-container') == _this.element) {
                    clearTimeout(_this.closing);
                    return true;
                }
                _this.closeDropdown();
            });
        };
        UILanguage.prototype.detached = function () {
            this.tether.dispose();
            this.obMouseup.dispose();
        };
        UILanguage.prototype.valueChanged = function (newValue) {
            var l = _.find(this.selectedList, ['id', newValue]) || {};
            this.dir = (l.rtl ? 'rtl' : 'ltr');
            this.elValue = l.name;
        };
        UILanguage.prototype.languagesChanged = function (newValue) {
            var _this = this;
            this.selectedList = [];
            this.availableList = _.clone(ui_constants_1.UIConstants.Languages);
            if (!isEmpty(newValue)) {
                var langs = isString(newValue) ? newValue.split(',') : newValue;
                _.forEach(langs, function (l) { return _this.selectedList = _this.selectedList.concat(_.remove(_this.availableList, ['id', l])); });
                this.value = langs[0];
            }
        };
        UILanguage.prototype.fireEvent = function (evt) {
            var _this = this;
            evt.stopPropagation();
            var el = getParentByClass(this.element, 'ui-input-group');
            if (evt.type === 'focus') {
                this.inputEl.select();
                this.element.classList.add('ui-focus');
                if (el)
                    el.classList.add('ui-focus');
                if (this.show)
                    this.openDropdown();
            }
            if (evt.type === 'blur') {
                this.element.classList.remove('ui-focus');
                if (el)
                    el.classList.remove('ui-focus');
                this.closing = setTimeout(function () { return _this.closeDropdown(); }, 500);
            }
            ui_event_1.UIEvent.fireEvent(evt.type, this.element, this.value);
        };
        UILanguage.prototype.hilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
            evt.target.classList.add('ui-hilight');
        };
        UILanguage.prototype.unhilightItem = function (evt) {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h !== null)
                h.classList.remove('ui-hilight');
        };
        UILanguage.prototype.scrollIntoView = function () {
            var h = this.dropdown.querySelector('.ui-list-item.ui-hilight');
            if (h == null)
                h = this.dropdown.querySelector('.ui-list-item.ui-selected');
            this.dropdown.scrollTop = (h !== null ? h.offsetTop - (this.dropdown.offsetHeight / 2) : 0);
        };
        UILanguage.prototype.openDropdown = function () {
            if (this.readonly || this.disabled)
                return true;
            this.dropdown.isOpen = true;
            this.dropdown.classList.add('ui-open');
            this.tether.position();
            this.scrollIntoView();
        };
        UILanguage.prototype.closeDropdown = function () {
            if (!this.dropdown)
                return;
            this.dropdown.isOpen = false;
            this.dropdown.classList.remove('ui-open');
        };
        UILanguage.prototype.toggleDropdown = function (evt, forceClose) {
            if (forceClose === void 0) { forceClose = false; }
            evt.stopPropagation();
            evt.cancelBubble = true;
            this.dropdown.isOpen ? this.closeDropdown() : this.openDropdown();
        };
        UILanguage.prototype.addLanguage = function (model) {
            ui_event_1.UIEvent.fireEvent('add', this.element, model);
            this.selectedList = this.selectedList.concat(_.remove(this.availableList, ['id', model.id]));
            this.value = model.id;
            this.closeDropdown();
        };
        UILanguage.prototype.removeLanguage = function (model) {
            ui_event_1.UIEvent.fireEvent('remove', this.element, model);
            this.availableList = this.availableList.concat(_.remove(this.selectedList, ['id', model.id]));
            this.value = this.selectedList.length > 0 ? this.selectedList[0].id : '';
        };
        UILanguage.prototype.fireSelect = function (model) {
            this.value = model.id;
            this.closeDropdown();
            this.unhilightItem(null);
            ui_event_1.UIEvent.fireEvent('change', this.element, model);
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "dir", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "errors", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "disabled", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "readonly", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "info", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "languages", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UILanguage.prototype, "placeholder", void 0);
        UILanguage = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-list\"><div role=\"input\" class=\"ui-input-control\">\n  <span class=\"ui-input-addon\" click.trigger=\"openDropdown($event, show=true, inputEl.focus())\"><ui-glyph glyph=\"glyph-language\"></ui-glyph></span>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type.bind=\"type\" value.bind=\"elValue\" size=\"10\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    change.trigger=\"fireEvent($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"true\" mouseup.trigger=\"![$event.stopPropagation(), show=true, openDropdown()]\"/>\n  <span class=\"ui-input-addon ui-dropdown-handle\" mouseup.trigger=\"![show=true, toggleDropdown($event)]\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n\n  <div class=\"ui-list-container ui-floating\" ref=\"dropdown\">\n    <div class=\"ui-list-group\" t=\"Selected\">Selected</div>\n    <div class=\"ui-lang-item\" repeat.for=\"item of selectedList | sort:'id'\">\n      <div class=\"ui-list-item ${item.id==value?'ui-selected':''} ${item.disabled?'ui-disabled':''}\"\n      mouseover.delegate=\"hilightItem($event)\" click.trigger=\"fireSelect(item)\"><ui-glyph glyph=\"glyph-invalid\" class=\"ui-text-warning\" if.bind=\"errored.indexOf(item.id)>-1\"></ui-glyph> ${item.name}</div>\n      <a click.trigger=\"removeLanguage(item)\"><ui-glyph class=\"ui-text-danger ui-font-big\" glyph=\"glyph-tree-collapse\"></ui-glyph></a>\n    </div>\n    <div class=\"ui-list-group\" t=\"Available\">Available</div>\n    <div class=\"ui-lang-item\" repeat.for=\"item of availableList | sort:'id'\" click.trigger=\"addLanguage(item)\">\n      <div class=\"ui-list-item ${item.disabled?'ui-disabled':''}\" innerhtml.bind=\"item.name\"\n      mouseover.delegate=\"hilightItem($event)\"></div>\n      <ui-glyph class=\"ui-text-info ui-font-big\" glyph=\"glyph-tree-expand\"></ui-glyph>\n    </div>\n    </template>\n  </div>\n</template>"),
            aurelia_framework_1.customElement('ui-language'),
            __metadata("design:paramtypes", [Element])
        ], UILanguage);
        return UILanguage;
    }());
    exports.UILanguage = UILanguage;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1tYXJrZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0pBO1FBQWdDLDhCQUFXO1FBQ3pDLG9CQUFtQixPQUFnQjtZQUFuQyxZQUNFLGlCQUFPLFNBR1I7WUFKa0IsYUFBTyxHQUFQLE9BQU8sQ0FBUztZQWdCbUIsV0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVyRCxTQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsVUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNWLFlBQU0sR0FBRyxJQUFJLENBQUM7WUFDZCxlQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLGNBQVEsR0FBRyxLQUFLLENBQUM7WUFDakIsY0FBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixpQkFBVyxHQUFHLEVBQUUsQ0FBQztZQUNqQixrQkFBWSxHQUFHLEVBQUUsQ0FBQztZQUNsQixVQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsV0FBSyxHQUFHLEtBQUssQ0FBQztZQUNkLGFBQU8sR0FBRyxLQUFLLENBQUM7WUFFaEIsWUFBTSxHQUFHLEtBQUssQ0FBQztZQUVmLFVBQUksR0FBRyxLQUFLLENBQUM7WUFDYixhQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLGtCQUFZLEdBQUcsS0FBSyxDQUFDO1lBakMzQixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUNqRCxDQUFDO1FBSUQseUJBQUksR0FBSixVQUFLLGNBQXNCLEVBQUUsZUFBdUI7WUFDbEQsaUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQTJCRCxnQ0FBVyxHQUFYLFVBQVksR0FBRztZQUFmLGlCQWtEQztZQWpEQyxJQUFJLEdBQUcsQ0FB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QWtCO1FBakNsQixVQUFVO1lBNUJ0Qiw4QkFBVSxFQUFFO1lBQ1osOEJBQVUsQ0FBQyxnc0VBeUJBLENBQUM7WUFDWixpQ0FBYSxDQUFDLGFBQWEsQ0FBQzs2Q0FFQyxPQUFPO1dBRHhCLFVBQVUsQ0F5SXRCO1FBQUQsaUJBQUM7S0F6SUQsQUF5SUMsSUFBQTtJQXpJWSxnQ0FBVSIsImZpbGUiOiJlbGVtZW50cy9pbnB1dHMvdWktbWFya2Rvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGUsIGlubGluZVZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUJhc2VJbnB1dCB9IGZyb20gXCIuL3VpLWlucHV0XCI7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLWV2ZW50XCI7XG5pbXBvcnQgeyBVSVV0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLXV0aWxzXCI7XG5pbXBvcnQgeyBVSUNvbnN0YW50cyB9IGZyb20gXCIuLi8uLi91dGlscy91aS1jb25zdGFudHNcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktbWFya2Rvd24nKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLW1kLWVkaXRvciB1aS1pbnB1dC13cmFwcGVyXCIgZGlyLmJpbmQ9XCJkaXJcIj48dWktdG9vbGJhciBzdGFydCBjbGljay50cmlnZ2VyPVwidG9vbENsaWNrZWQoJGV2ZW50KVwiPlxuICA8ZGl2IGNsYXNzPVwidWktYnV0dG9uLWdyb3VwIHVpLWhvcml6b250YWxcIj5cbiAgPHVpLWJ1dHRvbiBkYXRhLWlkPVwiaDFcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+SDE8L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBkYXRhLWlkPVwiaDJcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+SDI8L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBkYXRhLWlkPVwiaDNcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+SDM8L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBkYXRhLWlkPVwiaDRcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+SDQ8L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBkYXRhLWlkPVwiaDVcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+SDU8L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBkYXRhLWlkPVwiaDZcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+SDY8L3VpLWJ1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24tZ3JvdXAgdWktaG9yaXpvbnRhbFwiPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtYm9sZFwiIGRhdGEtaWQ9XCJiXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PjwvdWktYnV0dG9uPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtaXRhbGljXCIgZGF0YS1pZD1cImlcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+PC91aS1idXR0b24+XG4gIDx1aS1idXR0b24gZ2x5cGg9XCJnbHlwaC1tZC1zdHJpa2VcIiBkYXRhLWlkPVwic1wiIGRpc2FibGVkLmJpbmQ9XCJkaXNhYmxlVG9vbHN8fGRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24tZ3JvdXAgdWktaG9yaXpvbnRhbFwiPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtbGlua1wiIGRhdGEtaWQ9XCJhXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PjwvdWktYnV0dG9uPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtaW1hZ2VcIiBkYXRhLWlkPVwiaW1nXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PjwvdWktYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWJ1dHRvbi1ncm91cCB1aS1ob3Jpem9udGFsXCI+XG4gIDx1aS1idXR0b24gZ2x5cGg9XCJnbHlwaC1tZC1saXN0XCIgZGF0YS1pZD1cInVsXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PjwvdWktYnV0dG9uPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtbnVtYmVyXCIgZGF0YS1pZD1cIm9sXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PjwvdWktYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWJ1dHRvbi1ncm91cCB1aS1ob3Jpem9udGFsXCI+XG4gIDx1aS1idXR0b24gZ2x5cGg9XCJnbHlwaC1tZC1oZWxwXCIgZGF0YS1pZD1cImhlbHBcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PjwvdWktYnV0dG9uPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtcHJldmlld1wiIGRhdGEtaWQ9XCJwcmV2aWV3XCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPC9kaXY+PC91aS10b29sYmFyPlxuICA8ZGl2IGNsYXNzPVwidWktd2F0ZXJtYXJrIFxcJHtwcmV2aWV3PydwcmV2aWV3JzonJ30gXFwke2hlbHA/J2hlbHAnOicnfVwiPlxuICA8ZGl2IHJvbGU9XCJpbnB1dFwiIGNsYXNzPVwidWktaW5wdXQtY29udHJvbCB1aS10ZXh0YXJlYVwiPjxzcGFuIGNsYXNzPVwidWktZXJyb3JcIiBpZi5iaW5kPVwiZXJyb3JzXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtaW52YWxpZFwiPjwvdWktZ2x5cGg+PHVsIGNsYXNzPVwidWktZXJyb3ItbGlzdFwiPjxsaSByZXBlYXQuZm9yPVwiZXJyIG9mIGVycm9yc1wiIGlubmVyaHRtbC5iaW5kPVwiZXJyXCI+PC9saT48L3VsPjwvc3Bhbj5cbiAgPHRleHRhcmVhIHJlZj1cImlucHV0RWxcIiB2YWx1ZS5iaW5kPVwidmFsdWVcIiByb3dzLmJpbmQ9XCJyb3dzXCIgbWF4bGVuZ3RoLmJpbmQ9XCJtYXhsZW5ndGhcIiBkaXIuYmluZD1cImRpclwiXG4gICAgZm9jdXMudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCIgYmx1ci50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIlxuICAgIGlucHV0LnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGNoYW5nZS50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIlxuICAgIHBsYWNlaG9sZGVyLmJpbmQ9XCJwbGFjZWhvbGRlclwiIGRpc2FibGVkLmJpbmQ9XCJpc0Rpc2FibGVkXCIgcmVhZG9ubHkuYmluZD1cInJlYWRvbmx5XCI+PC90ZXh0YXJlYT5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1jbGVhclwiIGlmLmJpbmQ9XCJjbGVhciAmJiB2YWx1ZVwiIGNsaWNrLnRyaWdnZXI9XCJjbGVhcklucHV0KClcIj4mdGltZXM7PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cInVpLWNvdW50ZXJcIiBpZi5iaW5kPVwiY291bnRlclwiIGlubmVyaHRtbC5iaW5kPVwidmFsdWUubGVuZ3RoICsgJyBvZiAnICsgbWF4bGVuZ3RoXCI+PC9zcGFuPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPSd1aS1tZC1wcmV2aWV3IHVpLXBhZC1hbGwgdWktbWFya2Rvd24nIHNob3cuYmluZD1cImhlbHBcIiBkaXI9XCJsdHJcIj5cbiAgPGgyIGNsYXNzPVwidWktc21hbGwtY2FwcyB1aS10ZXh0LXByaW1hcnkgdWktc3Ryb25nXCI+TWFya2Rvd24gU3ludGF4PC9oMj5cbiAgPGhyLz5cbiAgPHA+QWRkIGEgYmxhbmsgbGluZSB0byBjcmVhdGUgYSBzZXBhcmF0ZSBwYXJhZ3JhcGg8L3A+XG4gIDxoci8+XG4gIDxwIGNsYXNzPVwidWktdGV4dC1wcmltYXJ5XCI+SGVhZGVyczwvcD5cblxuICA8ZGl2PlxuICAgICAgPHNwYW4+SDEgPGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+IyBIZWFkZXI8L2NvZGU+IDxoMSBjbGFzcz1cInVpLWlubGluZVwiPkhlYWRlcjwvaDE+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPkgyIDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiMjIEhlYWRlcjwvY29kZT4gPGgyIGNsYXNzPVwidWktaW5saW5lXCI+SGVhZGVyPC9oMj48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+SDMgPGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+IyMjIEhlYWRlcjwvY29kZT4gPGgzIGNsYXNzPVwidWktaW5saW5lXCI+SGVhZGVyPC9oMz48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+SDQgPGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+IyMjIyBIZWFkZXI8L2NvZGU+IDxoNCBjbGFzcz1cInVpLWlubGluZVwiPkhlYWRlcjwvaDQ+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPkg1IDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiMjIyMjIEhlYWRlcjwvY29kZT4gPGg1IGNsYXNzPVwidWktaW5saW5lXCI+SGVhZGVyPC9oNT48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+SDYgPGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+IyMjIyMjIEhlYWRlcjwvY29kZT4gPGg2IGNsYXNzPVwidWktaW5saW5lXCI+SGVhZGVyPC9oNj48L3NwYW4+XG4gICAgICA8YnIvPlxuICA8L2Rpdj5cblxuICA8cCBjbGFzcz1cInVpLXRleHQtcHJpbWFyeVwiPlN0eWxlczwvcD5cblxuICA8cD5cbiAgICAgIDxzcGFuPkl0YWxpYyA8Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj5fSXRhbGljIFRleHRfPC9jb2RlPjogPGk+SXRhbGljPC9pPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj5Cb2xkIDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPl9fQm9sZCBUZXh0X188L2NvZGU+OiA8Yj5Cb2xkPC9iPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj5TdHJpa2V0aHJvdWdoIDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPn5+U3RyaWtldGhyb3VnaH5+PC9jb2RlPjogPGRlbD5TdHJpa2V0aHJvdWdoPC9kZWw+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgPC9wPlxuXG4gIDxwIGNsYXNzPVwidWktdGV4dC1wcmltYXJ5XCI+TGlua3M8L3A+XG5cbiAgPHA+XG4gICAgICA8Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj5bbGluayB0ZXh0XShsaW5rIFVSTCk8L2NvZGU+XG4gICAgICA8YnIvPlxuICAgICAgPGVtPmFueSB1cmwgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBsaW5rLCB1c2UgdGhlIGFib3ZlIHRvIGRpc3BsYXkgY3VzdG9tIHRleHQgaW5zdGVhZCBvZiB1cmwgaW4gdGhlIGxpbmsuPC9lbT5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj5lZy4gPGNvZGU+Jmx0O2EgaHJlZj1cInVybFwiPkxpbmsgVGV4dCZsdDsvYT48L2NvZGU+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgPC9wPlxuXG4gIDxwIGNsYXNzPVwidWktdGV4dC1wcmltYXJ5XCI+SW1hZ2VzPC9wPlxuXG4gIDxwPlxuICAgICAgPGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+IVthbHQgdGV4dF0oaW1hZ2UgVVJMKTwvY29kZT5cbiAgICAgIDxici8+XG4gIDwvcD5cblxuICA8cCBjbGFzcz1cInVpLXRleHQtcHJpbWFyeVwiPkxpc3RzPC9wPlxuXG4gIDxwPlxuICAgICAgPHNwYW4+PGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+KiBsaXN0IGl0ZW08L2NvZGU+OiAmIzgyMjY7IGxpc3QgaXRlbTwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj4qIGxpc3QgaXRlbTwvY29kZT46ICYjODIyNjsgbGlzdCBpdGVtPC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPjxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiogbGlzdCBpdGVtPC9jb2RlPjogJiM4MjI2OyBsaXN0IGl0ZW08L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPjxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPjEuIGxpc3QgaXRlbTwvY29kZT46IDEuIGxpc3QgaXRlbTwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj4qICZuYnNwO2xpc3QgaXRlbTwvY29kZT46IDIuIGxpc3QgaXRlbTwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj4qICZuYnNwO2xpc3QgaXRlbTwvY29kZT46IDMuIGxpc3QgaXRlbTwvc3Bhbj5cbiAgICAgIDxici8+XG4gIDwvcD5cblxuICA8cCBjbGFzcz1cInVpLXRleHQtcHJpbWFyeVwiPlRhYmxlczwvcD5cblxuICA8cD5cbiAgICAgIDxzcGFuPjxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPnxIZWFkfEhlYWQgfEhlYWR8PC9jb2RlPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj58Oi0tLXw6LS0tOnwtLS06fDwvY29kZT48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+PGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+fExlZnQgQWxpZ258Q2VudGVyIEFsaWdufFJpZ2h0IEFsaWduZWR8PC9jb2RlPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj58TGVmdCBBbGlnbnxDZW50ZXIgQWxpZ258UmlnaHQgQWxpZ25lZHw8L2NvZGU+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxici8+XG4gICAgICA8dGFibGU+XG4gICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ1aS10ZXh0LXN0YXJ0XCI+SGVhZDwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3M9XCJ1aS10ZXh0LWNlbnRlclwiPkhlYWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwidWktdGV4dC1lbmRcIj5IZWFkPC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidWktdGV4dC1zdGFydFwiPkxlZnQ8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10ZXh0LWNlbnRlclwiPkNlbnRlcjwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLXRleHQtZW5kXCI+UmlnaHQ8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10ZXh0LXN0YXJ0XCI+TGVmdDwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLXRleHQtY2VudGVyXCI+Q2VudGVyPC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidWktdGV4dC1lbmRcIj5SaWdodDwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgIDwvdGFibGU+XG4gIDwvcD5cbiAgPGJyLz5cbiAgPGJyLz48L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwidWktbWQtcHJldmlldyB1aS1wYWQtYWxsIHVpLW1hcmtkb3duXCIgZGlyLmJpbmQ9XCJkaXJcIiBzaG93LmJpbmQ9XCJwcmV2aWV3XCIgaW5uZXJodG1sLmJpbmQ9XCJ2YWx1ZSB8IG1hcmtkb3duXCIgZGlyLmJpbmQ9XCJkaXJcIj48L2Rpdj5cblxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWlucHV0LWluZm9cIiBpZi5iaW5kPVwiaW5mb1wiIGlubmVyaHRtbC5iaW5kPVwiaW5mb1wiPjwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuZXhwb3J0IGNsYXNzIFVJTWFya2Rvd24gZXh0ZW5kcyBVSUJhc2VJbnB1dCB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNsZWFyID0gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NsZWFyJyk7XG4gICAgdGhpcy5jb3VudGVyID0gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvdW50ZXInKTtcclxuICB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICBzdXBlci5iaW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxuICAvLyBhdHRhY2hlZCgpIHsgfVxuICAvLyBkZXRhY2hlZCgpIHsgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSB2YWx1ZSA9ICcnO1xuXG4gIEBiaW5kYWJsZSgpIGRpciA9ICcnO1xuICBAYmluZGFibGUoKSByb3dzID0gMTU7XG4gIEBiaW5kYWJsZSgpIGVycm9ycyA9IG51bGw7XG4gIEBiaW5kYWJsZSgpIG1heGxlbmd0aCA9IDUwMDA7XG4gIEBiaW5kYWJsZSgpIGRpc2FibGVkID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIHJlYWRvbmx5ID0gZmFsc2U7XG4gIEBiaW5kYWJsZSgpIHBsYWNlaG9sZGVyID0gJyc7XG4gIEBiaW5kYWJsZSgpIGF1dG9Db21wbGV0ZSA9ICcnO1xuICBAYmluZGFibGUoKSBpbmZvID0gJyc7XG5cbiAgcHJpdmF0ZSBjbGVhciA9IGZhbHNlO1xuICBwcml2YXRlIGNvdW50ZXIgPSBmYWxzZTtcblxuICBwcml2YXRlIGlnbm9yZSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgaGVscCA9IGZhbHNlO1xuICBwcml2YXRlIHByZXZpZXcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBkaXNhYmxlVG9vbHMgPSBmYWxzZTtcblxuICB0b29sQ2xpY2tlZChldnQpIHtcbiAgICBsZXQgYnRuO1xuICAgIGlmICghKGJ0biA9IGdldFBhcmVudEJ5VGFnKGV2dC50YXJnZXQsICd1aS1idXR0b24nKSkpIHJldHVybjtcbiAgICBpZiAoIShidG4gPSBidG5bJ2RhdGFzZXQnXVtcImlkXCJdKSkgcmV0dXJuO1xuXG4gICAgbGV0IHZhbCA9IHRoaXMudmFsdWUgfHwgJyc7XG4gICAgbGV0IGRpZmYgPSAwLFxuICAgICAgc3RhcnQgPSB0aGlzLmlucHV0RWwuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQgPSB0aGlzLmlucHV0RWwuc2VsZWN0aW9uRW5kLFxuICAgICAgc3ViID0gdmFsLnN1YnN0cihzdGFydCwgZW5kIC0gc3RhcnQpIHx8ICdFZGl0VGhpcyc7XG5cbiAgICBzd2l0Y2ggKGJ0bikge1xuICAgICAgY2FzZSAnaDEnOlxuICAgICAgICBkaWZmID0gMzsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYFxcbiMgJHtzdWJ9XFxuXFxuYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdoMic6XG4gICAgICAgIGRpZmYgPSA0OyB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgXFxuIyMgJHtzdWJ9XFxuXFxuYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdoMyc6XG4gICAgICAgIGRpZmYgPSA1OyB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgXFxuIyMjICR7c3VifVxcblxcbmAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnaDQnOlxuICAgICAgICBkaWZmID0gNjsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYFxcbiMjIyMgJHtzdWJ9XFxuXFxuYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdoNSc6XG4gICAgICAgIGRpZmYgPSA3OyB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgXFxuIyMjIyMgJHtzdWJ9XFxuXFxuYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdoNic6XG4gICAgICAgIGRpZmYgPSA4OyB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgXFxuIyMjIyMjICR7c3VifVxcblxcbmAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnYic6XG4gICAgICAgIGRpZmYgPSAzOyB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgICR7c3VifSBgICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ2knOlxuICAgICAgICBkaWZmID0gMjsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYCBfJHtzdWJ9XyBgICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ3MnOlxuICAgICAgICBkaWZmID0gMzsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYCB+fiR7c3VifX5+IGAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnYSc6XG4gICAgICAgIGRpZmYgPSAyOyB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgIFske3N1Yn1dKExpbmtfVXJsX0hlcmUpIGAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnaW1nJzpcbiAgICAgICAgZGlmZiA9IDM7IHRoaXMudmFsdWUgPSB2YWwuc3Vic3RyKDAsIHN0YXJ0KSArIGAgIVske3N1Yn1dKEltYWdlX1VybF9IZXJlKSBgICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ3VsJzpcbiAgICAgICAgZGlmZiA9IDI7XG4gICAgICAgIHN1YiA9IHN1Yi5yZXBsYWNlKC9eLiskL2dtLCAodCkgPT4gYCogJHt0fWApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgJHtzdWJ9XFxuYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdvbCc6XG4gICAgICAgIHZhciBpID0gMTtcbiAgICAgICAgZGlmZiA9IDM7XG4gICAgICAgIHN1YiA9IHN1Yi5yZXBsYWNlKC9eLiskL2dtLCAodCkgPT4gYCR7aSsrID09IDEgPyAnMS4nIDogJyonfSAke3R9YCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWwuc3Vic3RyKDAsIHN0YXJ0KSArIGAke3N1Yn1cXG5gICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ2hlbHAnOlxuICAgICAgICB0aGlzLnByZXZpZXcgPSBmYWxzZTsgdGhpcy5kaXNhYmxlVG9vbHMgPSB0aGlzLmhlbHAgPSAhdGhpcy5oZWxwOyBicmVhaztcbiAgICAgIGNhc2UgJ3ByZXZpZXcnOlxuICAgICAgICB0aGlzLmhlbHAgPSBmYWxzZTsgdGhpcy5kaXNhYmxlVG9vbHMgPSB0aGlzLnByZXZpZXcgPSAhdGhpcy5wcmV2aWV3OyBicmVhaztcbiAgICB9XG4gICAgdGhpcy5pbnB1dEVsLmZvY3VzKCk7XG4gICAgaWYgKHN1YiA9PSAnRWRpdFRoaXMnICYmIGJ0biAhPSAncHJldmlldycgJiYgYnRuICE9ICdoZWxwJykgVUlFdmVudC5xdWV1ZVRhc2soKCkgPT4gdGhpcy5pbnB1dEVsLnNldFNlbGVjdGlvblJhbmdlKHN0YXJ0ICsgZGlmZiwgc3RhcnQgKyBkaWZmICsgc3ViLmxlbmd0aCkpO1xuICB9XG59XG5cbkBhdXRvaW5qZWN0KClcbkBpbmxpbmVWaWV3KGA8dGVtcGxhdGUgY2xhc3M9XCJ1aS1pbnB1dC13cmFwcGVyIHVpLWlucHV0LWxpc3RcIj48ZGl2IHJvbGU9XCJpbnB1dFwiIGNsYXNzPVwidWktaW5wdXQtY29udHJvbFwiPlxuICA8c3BhbiBjbGFzcz1cInVpLWlucHV0LWFkZG9uXCIgY2xpY2sudHJpZ2dlcj1cIm9wZW5Ecm9wZG93bigkZXZlbnQsIHNob3c9dHJ1ZSwgaW5wdXRFbC5mb2N1cygpKVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWxhbmd1YWdlXCI+PC91aS1nbHlwaD48L3NwYW4+XG4gIDxzcGFuIGNsYXNzPVwidWktZXJyb3JcIiBpZi5iaW5kPVwiZXJyb3JzXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtaW52YWxpZFwiPjwvdWktZ2x5cGg+PHVsIGNsYXNzPVwidWktZXJyb3ItbGlzdFwiPjxsaSByZXBlYXQuZm9yPVwiZXJyIG9mIGVycm9yc1wiIGlubmVyaHRtbC5iaW5kPVwiZXJyXCI+PC9saT48L3VsPjwvc3Bhbj5cbiAgPGlucHV0IHJlZj1cImlucHV0RWxcIiB0eXBlLmJpbmQ9XCJ0eXBlXCIgdmFsdWUuYmluZD1cImVsVmFsdWVcIiBzaXplPVwiMTBcIlxuICAgIGZvY3VzLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGJsdXIudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCJcbiAgICBjaGFuZ2UudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCIgcGxhY2Vob2xkZXIuYmluZD1cInBsYWNlaG9sZGVyXCJcbiAgICBkaXNhYmxlZC5iaW5kPVwiaXNEaXNhYmxlZFwiIHJlYWRvbmx5LmJpbmQ9XCJ0cnVlXCIgbW91c2V1cC50cmlnZ2VyPVwiIVskZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCksIHNob3c9dHJ1ZSwgb3BlbkRyb3Bkb3duKCldXCIvPlxuICA8c3BhbiBjbGFzcz1cInVpLWlucHV0LWFkZG9uIHVpLWRyb3Bkb3duLWhhbmRsZVwiIG1vdXNldXAudHJpZ2dlcj1cIiFbc2hvdz10cnVlLCB0b2dnbGVEcm9wZG93bigkZXZlbnQpXVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWNoZXZyb24tZG93blwiPjwvdWktZ2x5cGg+PC9zcGFuPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktaW5wdXQtaW5mb1wiIGlmLmJpbmQ9XCJpbmZvXCIgaW5uZXJodG1sLmJpbmQ9XCJpbmZvXCI+PC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInVpLWxpc3QtY29udGFpbmVyIHVpLWZsb2F0aW5nXCIgcmVmPVwiZHJvcGRvd25cIj5cbiAgICA8ZGl2IGNsYXNzPVwidWktbGlzdC1ncm91cFwiIHQ9XCJTZWxlY3RlZFwiPlNlbGVjdGVkPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInVpLWxhbmctaXRlbVwiIHJlcGVhdC5mb3I9XCJpdGVtIG9mIHNlbGVjdGVkTGlzdCB8IHNvcnQ6J2lkJ1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInVpLWxpc3QtaXRlbSBcXCR7aXRlbS5pZD09dmFsdWU/J3VpLXNlbGVjdGVkJzonJ30gXFwke2l0ZW0uZGlzYWJsZWQ/J3VpLWRpc2FibGVkJzonJ31cIlxuICAgICAgbW91c2VvdmVyLmRlbGVnYXRlPVwiaGlsaWdodEl0ZW0oJGV2ZW50KVwiIGNsaWNrLnRyaWdnZXI9XCJmaXJlU2VsZWN0KGl0ZW0pXCI+PHVpLWdseXBoIGdseXBoPVwiZ2x5cGgtaW52YWxpZFwiIGNsYXNzPVwidWktdGV4dC13YXJuaW5nXCIgaWYuYmluZD1cImVycm9yZWQuaW5kZXhPZihpdGVtLmlkKT4tMVwiPjwvdWktZ2x5cGg+IFxcJHtpdGVtLm5hbWV9PC9kaXY+XG4gICAgICA8YSBjbGljay50cmlnZ2VyPVwicmVtb3ZlTGFuZ3VhZ2UoaXRlbSlcIj48dWktZ2x5cGggY2xhc3M9XCJ1aS10ZXh0LWRhbmdlciB1aS1mb250LWJpZ1wiIGdseXBoPVwiZ2x5cGgtdHJlZS1jb2xsYXBzZVwiPjwvdWktZ2x5cGg+PC9hPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1saXN0LWdyb3VwXCIgdD1cIkF2YWlsYWJsZVwiPkF2YWlsYWJsZTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1sYW5nLWl0ZW1cIiByZXBlYXQuZm9yPVwiaXRlbSBvZiBhdmFpbGFibGVMaXN0IHwgc29ydDonaWQnXCIgY2xpY2sudHJpZ2dlcj1cImFkZExhbmd1YWdlKGl0ZW0pXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidWktbGlzdC1pdGVtIFxcJHtpdGVtLmRpc2FibGVkPyd1aS1kaXNhYmxlZCc6Jyd9XCIgaW5uZXJodG1sLmJpbmQ9XCJpdGVtLm5hbWVcIlxuICAgICAgbW91c2VvdmVyLmRlbGVnYXRlPVwiaGlsaWdodEl0ZW0oJGV2ZW50KVwiPjwvZGl2PlxuICAgICAgPHVpLWdseXBoIGNsYXNzPVwidWktdGV4dC1pbmZvIHVpLWZvbnQtYmlnXCIgZ2x5cGg9XCJnbHlwaC10cmVlLWV4cGFuZFwiPjwvdWktZ2x5cGg+XG4gICAgPC9kaXY+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPmApXG5AY3VzdG9tRWxlbWVudCgndWktbGFuZ3VhZ2UnKVxuZXhwb3J0IGNsYXNzIFVJTGFuZ3VhZ2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkgeyB9XG5cbiAgLy8gYXVyZWxpYSBob29rc1xuICAvLyBjcmVhdGVkKG93bmluZ1ZpZXc6IFZpZXcsIG15VmlldzogVmlldykgeyB9XG4gIGJpbmQoYmluZGluZ0NvbnRleHQ6IE9iamVjdCwgb3ZlcnJpZGVDb250ZXh0OiBPYmplY3QpIHtcbiAgICB0aGlzLmxhbmd1YWdlc0NoYW5nZWQodGhpcy5sYW5ndWFnZXMpO1xuICB9XG4gIGF0dGFjaGVkKCkge1xuICAgIHRoaXMudGV0aGVyID0gVUlVdGlscy50ZXRoZXIodGhpcy5lbGVtZW50LCB0aGlzLmRyb3Bkb3duKTtcbiAgICB0aGlzLm9iTW91c2V1cCA9IFVJRXZlbnQuc3Vic2NyaWJlKCdtb3VzZWNsaWNrJywgKGV2dCkgPT4ge1xuICAgICAgaWYgKGdldFBhcmVudEJ5Q2xhc3MoZXZ0LnRhcmdldCwgJ3VpLWxpc3QtY29udGFpbmVyJykgPT0gdGhpcy5lbGVtZW50KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NpbmcpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH0pO1xuICB9XG4gIGRldGFjaGVkKCkge1xuICAgIHRoaXMudGV0aGVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLm9iTW91c2V1cC5kaXNwb3NlKCk7XHJcbiAgfVxuICAvLyB1bmJpbmQoKSB7IH1cbiAgLy8gZW5kIGF1cmVsaWEgaG9va3NcblxuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSB2YWx1ZSA9ICcnO1xuICBAYmluZGFibGUoeyBkZWZhdWx0QmluZGluZ01vZGU6IGJpbmRpbmdNb2RlLnR3b1dheSB9KSBkaXIgPSAnJztcblxuICBAYmluZGFibGUoKSBlcnJvcnMgPSBudWxsO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSByZWFkb25seSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBpbmZvID0gJyc7XG4gIEBiaW5kYWJsZSgpIGxhbmd1YWdlcztcbiAgQGJpbmRhYmxlKCkgcGxhY2Vob2xkZXIgPSAnJztcblxuICBlcnJvcmVkID0gW107XG4gIHNob3cgPSBmYWxzZTtcblxuICBwcml2YXRlIGlucHV0RWw7XG4gIHByaXZhdGUgZWxWYWx1ZTtcbiAgcHJpdmF0ZSBkcm9wZG93bjtcblxuICBwcml2YXRlIHRldGhlcjtcbiAgcHJpdmF0ZSBjbG9zaW5nO1xuICBwcml2YXRlIG9iTW91c2V1cDtcblxuICBwcml2YXRlIHNlbGVjdGVkTGlzdCA9IFtdO1xuICBwcml2YXRlIGF2YWlsYWJsZUxpc3QgPSBbXTtcblxuICB2YWx1ZUNoYW5nZWQobmV3VmFsdWUpIHtcbiAgICBsZXQgbCA9IF8uZmluZCh0aGlzLnNlbGVjdGVkTGlzdCwgWydpZCcsIG5ld1ZhbHVlXSkgfHwge307XG4gICAgdGhpcy5kaXIgPSAobC5ydGwgPyAncnRsJyA6ICdsdHInKTtcbiAgICB0aGlzLmVsVmFsdWUgPSBsLm5hbWU7XG4gIH1cblxuICBsYW5ndWFnZXNDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgdGhpcy5zZWxlY3RlZExpc3QgPSBbXTtcbiAgICB0aGlzLmF2YWlsYWJsZUxpc3QgPSBfLmNsb25lKFVJQ29uc3RhbnRzLkxhbmd1YWdlcyk7XG4gICAgaWYgKCFpc0VtcHR5KG5ld1ZhbHVlKSkge1xuICAgICAgbGV0IGxhbmdzID0gaXNTdHJpbmcobmV3VmFsdWUpID8gbmV3VmFsdWUuc3BsaXQoJywnKSA6IG5ld1ZhbHVlO1xuICAgICAgXy5mb3JFYWNoKGxhbmdzLCBsID0+IHRoaXMuc2VsZWN0ZWRMaXN0ID0gdGhpcy5zZWxlY3RlZExpc3QuY29uY2F0KF8ucmVtb3ZlKHRoaXMuYXZhaWxhYmxlTGlzdCwgWydpZCcsIGxdKSkpO1xuICAgICAgdGhpcy52YWx1ZSA9IGxhbmdzWzBdO1xuICAgIH1cbiAgfVxuXG4gIGZpcmVFdmVudChldnQpIHtcbiAgICBldnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGVsID0gZ2V0UGFyZW50QnlDbGFzcyh0aGlzLmVsZW1lbnQsICd1aS1pbnB1dC1ncm91cCcpO1xuICAgIGlmIChldnQudHlwZSA9PT0gJ2ZvY3VzJykge1xuICAgICAgdGhpcy5pbnB1dEVsLnNlbGVjdCgpO1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3VpLWZvY3VzJyk7XG4gICAgICBpZiAoZWwpIGVsLmNsYXNzTGlzdC5hZGQoJ3VpLWZvY3VzJyk7XG4gICAgICBpZiAodGhpcy5zaG93KSB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICAgIH1cbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdibHVyJykge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWZvY3VzJyk7XG4gICAgICBpZiAoZWwpIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWZvY3VzJyk7XG4gICAgICB0aGlzLmNsb3NpbmcgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY2xvc2VEcm9wZG93bigpLCA1MDApO1xuICAgIH1cbiAgICBVSUV2ZW50LmZpcmVFdmVudChldnQudHlwZSwgdGhpcy5lbGVtZW50LCB0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIGhpbGlnaHRJdGVtKGV2dCkge1xuICAgIGxldCBoID0gdGhpcy5kcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcudWktbGlzdC1pdGVtLnVpLWhpbGlnaHQnKTtcbiAgICBpZiAoaCAhPT0gbnVsbCkgaC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1oaWxpZ2h0Jyk7XG4gICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuYWRkKCd1aS1oaWxpZ2h0Jyk7XG4gIH1cbiAgdW5oaWxpZ2h0SXRlbShldnQpIHtcbiAgICBsZXQgaCA9IHRoaXMuZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnVpLWxpc3QtaXRlbS51aS1oaWxpZ2h0Jyk7XG4gICAgaWYgKGggIT09IG51bGwpIGguY2xhc3NMaXN0LnJlbW92ZSgndWktaGlsaWdodCcpO1xuICB9XG5cbiAgc2Nyb2xsSW50b1ZpZXcoKSB7XG4gICAgbGV0IGggPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0udWktaGlsaWdodCcpO1xuICAgIGlmIChoID09IG51bGwpIGggPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0udWktc2VsZWN0ZWQnKTtcbiAgICB0aGlzLmRyb3Bkb3duLnNjcm9sbFRvcCA9IChoICE9PSBudWxsID8gaC5vZmZzZXRUb3AgLSAodGhpcy5kcm9wZG93bi5vZmZzZXRIZWlnaHQgLyAyKSA6IDApO1xuICB9XG5cbiAgb3BlbkRyb3Bkb3duKCkge1xuICAgIGlmICh0aGlzLnJlYWRvbmx5IHx8IHRoaXMuZGlzYWJsZWQpIHJldHVybiB0cnVlO1xuICAgIHRoaXMuZHJvcGRvd24uaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoJ3VpLW9wZW4nKTtcbiAgICB0aGlzLnRldGhlci5wb3NpdGlvbigpO1xuICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgaWYgKCF0aGlzLmRyb3Bkb3duKSByZXR1cm47XG4gICAgdGhpcy5kcm9wZG93bi5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLW9wZW4nKTtcbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCwgZm9yY2VDbG9zZSA9IGZhbHNlKSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2dC5jYW5jZWxCdWJibGUgPSB0cnVlO1xuICAgIHRoaXMuZHJvcGRvd24uaXNPcGVuID8gdGhpcy5jbG9zZURyb3Bkb3duKCkgOiB0aGlzLm9wZW5Ecm9wZG93bigpO1xuICB9XG5cbiAgYWRkTGFuZ3VhZ2UobW9kZWwpIHtcbiAgICBVSUV2ZW50LmZpcmVFdmVudCgnYWRkJywgdGhpcy5lbGVtZW50LCBtb2RlbCk7XG4gICAgdGhpcy5zZWxlY3RlZExpc3QgPSB0aGlzLnNlbGVjdGVkTGlzdC5jb25jYXQoXy5yZW1vdmUodGhpcy5hdmFpbGFibGVMaXN0LCBbJ2lkJywgbW9kZWwuaWRdKSk7XG4gICAgdGhpcy52YWx1ZSA9IG1vZGVsLmlkO1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICB9XG5cbiAgcmVtb3ZlTGFuZ3VhZ2UobW9kZWwpIHtcbiAgICBVSUV2ZW50LmZpcmVFdmVudCgncmVtb3ZlJywgdGhpcy5lbGVtZW50LCBtb2RlbCk7XG4gICAgdGhpcy5hdmFpbGFibGVMaXN0ID0gdGhpcy5hdmFpbGFibGVMaXN0LmNvbmNhdChfLnJlbW92ZSh0aGlzLnNlbGVjdGVkTGlzdCwgWydpZCcsIG1vZGVsLmlkXSkpO1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLnNlbGVjdGVkTGlzdC5sZW5ndGggPiAwID8gdGhpcy5zZWxlY3RlZExpc3RbMF0uaWQgOiAnJztcbiAgfVxuXG4gIGZpcmVTZWxlY3QobW9kZWwpIHtcbiAgICB0aGlzLnZhbHVlID0gbW9kZWwuaWQ7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgdGhpcy51bmhpbGlnaHRJdGVtKG51bGwpO1xuICAgIFVJRXZlbnQuZmlyZUV2ZW50KCdjaGFuZ2UnLCB0aGlzLmVsZW1lbnQsIG1vZGVsKVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6InNyYyJ9
