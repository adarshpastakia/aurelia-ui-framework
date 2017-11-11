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
            aurelia_framework_1.inlineView("<template class=\"ui-md-editor ui-input-wrapper\"><ui-toolbar start click.trigger=\"toolClicked($event)\">\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button data-id=\"h1\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H1</ui-button>\n  <ui-button data-id=\"h2\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H2</ui-button>\n  <ui-button data-id=\"h3\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H3</ui-button>\n  <ui-button data-id=\"h4\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H4</ui-button>\n  <ui-button data-id=\"h5\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H5</ui-button>\n  <ui-button data-id=\"h6\" disabled.bind=\"disableTools||disabled||readonly\" square small light>H6</ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-bold\" data-id=\"b\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-italic\" data-id=\"i\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-strike\" data-id=\"s\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-link\" data-id=\"a\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-image\" data-id=\"img\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-list\" data-id=\"ul\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-number\" data-id=\"ol\" disabled.bind=\"disableTools||disabled||readonly\" square small light></ui-button>\n  </div>\n  <div class=\"ui-button-group ui-horizontal\">\n  <ui-button glyph=\"glyph-md-help\" data-id=\"help\" disabled.bind=\"disabled||readonly\" square small light></ui-button>\n  <ui-button glyph=\"glyph-md-preview\" data-id=\"preview\" disabled.bind=\"disabled||readonly\" square small light></ui-button>\n  </div></ui-toolbar>\n  <div class=\"ui-watermark ${preview?'preview':''} ${help?'help':''}\">\n  <div role=\"input\" class=\"ui-input-control ui-textarea\"><span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <textarea ref=\"inputEl\" value.bind=\"value\" rows.bind=\"rows\" maxlength.bind=\"maxlength\" dir.bind=\"dir\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    input.trigger=\"fireEvent($event)\" change.trigger=\"fireEvent($event)\"\n    placeholder.bind=\"placeholder\" disabled.bind=\"isDisabled\" readonly.bind=\"readonly\"></textarea>\n  <span class=\"ui-clear\" if.bind=\"clear && value\" click.trigger=\"clearInput()\">&times;</span>\n  <span class=\"ui-counter\" if.bind=\"counter\" innerhtml.bind=\"value.length + ' of ' + maxlength\"></span>\n  </div>\n\n  <div class='ui-md-preview ui-pad-all ui-markdown' show.bind=\"help\" dir=\"ltr\">\n  <h2 class=\"ui-small-caps ui-text-primary ui-strong\">Markdown Syntax</h2>\n  <hr/>\n  <p>Add a blank line to create a separate paragraph</p>\n  <hr/>\n  <p class=\"ui-text-primary\">Headers</p>\n\n  <div>\n      <span>H1 <code class=\"ui-selectable\"># Header</code> <h1 class=\"ui-inline\">Header</h1></span>\n      <br/>\n      <span>H2 <code class=\"ui-selectable\">## Header</code> <h2 class=\"ui-inline\">Header</h2></span>\n      <br/>\n      <span>H3 <code class=\"ui-selectable\">### Header</code> <h3 class=\"ui-inline\">Header</h3></span>\n      <br/>\n      <span>H4 <code class=\"ui-selectable\">#### Header</code> <h4 class=\"ui-inline\">Header</h4></span>\n      <br/>\n      <span>H5 <code class=\"ui-selectable\">##### Header</code> <h5 class=\"ui-inline\">Header</h5></span>\n      <br/>\n      <span>H6 <code class=\"ui-selectable\">###### Header</code> <h6 class=\"ui-inline\">Header</h6></span>\n      <br/>\n  </div>\n\n  <p class=\"ui-text-primary\">Styles</p>\n\n  <p>\n      <span>Italic <code class=\"ui-selectable\">_Italic Text_</code>: <i>Italic</i></span>\n      <br/>\n      <span>Bold <code class=\"ui-selectable\">__Bold Text__</code>: <b>Bold</b></span>\n      <br/>\n      <span>Strikethrough <code class=\"ui-selectable\">~~Strikethrough~~</code>: <del>Strikethrough</del></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Links</p>\n\n  <p>\n      <code class=\"ui-selectable\">[link text](link URL)</code>\n      <br/>\n      <em>any url will be converted to a link, use the above to display custom text instead of url in the link.</em>\n      <br/>\n      <span>eg. <code>&lt;a href=\"url\">Link Text&lt;/a></code></span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Images</p>\n\n  <p>\n      <code class=\"ui-selectable\">![alt text](image URL)</code>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Lists</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* list item</code>: &#8226; list item</span>\n      <br/>\n      <br/>\n      <span><code class=\"ui-selectable\">1. list item</code>: 1. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 2. list item</span>\n      <br/>\n      <span><code class=\"ui-selectable\">* &nbsp;list item</code>: 3. list item</span>\n      <br/>\n  </p>\n\n  <p class=\"ui-text-primary\">Tables</p>\n\n  <p>\n      <span><code class=\"ui-selectable\">|Head|Head |Head|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|:---|:---:|---:|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <span><code class=\"ui-selectable\">|Left Align|Center Align|Right Aligned|</code></span>\n      <br/>\n      <br/>\n      <table>\n          <thead>\n              <tr>\n                  <th class=\"ui-text-start\">Head</th>\n                  <th class=\"ui-text-center\">Head</th>\n                  <th class=\"ui-text-end\">Head</th>\n              </tr>\n          </thead>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n          <tr>\n              <td class=\"ui-text-start\">Left</td>\n              <td class=\"ui-text-center\">Center</td>\n              <td class=\"ui-text-end\">Right</td>\n          </tr>\n      </table>\n  </p>\n  <br/>\n  <br/></div>\n\n  <div class=\"ui-md-preview ui-pad-all ui-markdown\" dir.bind=\"dir\" show.bind=\"preview\" innerhtml.bind=\"value | markdown\" dir.bind=\"dir\"></div>\n\n  </div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n</template>"),
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVsZW1lbnRzL2lucHV0cy91aS1tYXJrZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0pBO1FBQWdDLDhCQUFXO1FBQ3pDLG9CQUFtQixPQUFnQjtZQUFuQyxZQUNFLGlCQUFPLFNBR1I7WUFKa0IsYUFBTyxHQUFQLE9BQU8sQ0FBUztZQWdCbUIsV0FBSyxHQUFHLEVBQUUsQ0FBQztZQUVyRCxTQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsVUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNWLFlBQU0sR0FBRyxJQUFJLENBQUM7WUFDZCxlQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLGNBQVEsR0FBRyxLQUFLLENBQUM7WUFDakIsY0FBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixpQkFBVyxHQUFHLEVBQUUsQ0FBQztZQUNqQixrQkFBWSxHQUFHLEVBQUUsQ0FBQztZQUNsQixVQUFJLEdBQUcsRUFBRSxDQUFDO1lBRWQsV0FBSyxHQUFHLEtBQUssQ0FBQztZQUNkLGFBQU8sR0FBRyxLQUFLLENBQUM7WUFFaEIsWUFBTSxHQUFHLEtBQUssQ0FBQztZQUVmLFVBQUksR0FBRyxLQUFLLENBQUM7WUFDYixhQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLGtCQUFZLEdBQUcsS0FBSyxDQUFDO1lBakMzQixLQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztRQUNqRCxDQUFDO1FBSUQseUJBQUksR0FBSixVQUFLLGNBQXNCLEVBQUUsZUFBdUI7WUFDbEQsaUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQTJCRCxnQ0FBVyxHQUFYLFVBQVksR0FBRztZQUFmLGlCQWtEQztZQWpEQyxJQUFJLEdBQUcsQ0FB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QWtCO1FBakNsQixVQUFVO1lBNUJ0Qiw4QkFBVSxFQUFFO1lBQ1osOEJBQVUsQ0FBQyxnc0VBeUJBLENBQUM7WUFDWixpQ0FBYSxDQUFDLGFBQWEsQ0FBQzs2Q0FFQyxPQUFPO1dBRHhCLFVBQVUsQ0F5SXRCO1FBQUQsaUJBQUM7S0F6SUQsQUF5SUMsSUFBQTtJQXpJWSxnQ0FBVSIsImZpbGUiOiJlbGVtZW50cy9pbnB1dHMvdWktbWFya2Rvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL1xuLy8gQGRlc2NyaXB0aW9uIDpcbi8vIEBhdXRob3IgICAgICA6IEFkYXJzaCBQYXN0YWtpYVxuLy8gQGNvcHlyaWdodCAgIDogMjAxN1xuLy8gQGxpY2Vuc2UgICAgIDogTUlUXG5pbXBvcnQgeyBhdXRvaW5qZWN0LCBjdXN0b21FbGVtZW50LCBiaW5kYWJsZSwgYmluZGluZ01vZGUsIGlubGluZVZpZXcgfSBmcm9tICdhdXJlbGlhLWZyYW1ld29yayc7XG5pbXBvcnQgeyBVSUJhc2VJbnB1dCB9IGZyb20gXCIuL3VpLWlucHV0XCI7XG5pbXBvcnQgeyBVSUV2ZW50IH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLWV2ZW50XCI7XG5pbXBvcnQgeyBVSVV0aWxzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3VpLXV0aWxzXCI7XG5pbXBvcnQgeyBVSUNvbnN0YW50cyB9IGZyb20gXCIuLi8uLi91dGlscy91aS1jb25zdGFudHNcIjtcbmltcG9ydCAqIGFzIF8gZnJvbSBcImxvZGFzaFwiO1xuXG5AYXV0b2luamVjdCgpXG5AY3VzdG9tRWxlbWVudCgndWktbWFya2Rvd24nKVxuQGlubGluZVZpZXcoYDx0ZW1wbGF0ZSBjbGFzcz1cInVpLW1kLWVkaXRvciB1aS1pbnB1dC13cmFwcGVyXCI+PHVpLXRvb2xiYXIgc3RhcnQgY2xpY2sudHJpZ2dlcj1cInRvb2xDbGlja2VkKCRldmVudClcIj5cbiAgPGRpdiBjbGFzcz1cInVpLWJ1dHRvbi1ncm91cCB1aS1ob3Jpem9udGFsXCI+XG4gIDx1aS1idXR0b24gZGF0YS1pZD1cImgxXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PkgxPC91aS1idXR0b24+XG4gIDx1aS1idXR0b24gZGF0YS1pZD1cImgyXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PkgyPC91aS1idXR0b24+XG4gIDx1aS1idXR0b24gZGF0YS1pZD1cImgzXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PkgzPC91aS1idXR0b24+XG4gIDx1aS1idXR0b24gZGF0YS1pZD1cImg0XCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0Pkg0PC91aS1idXR0b24+XG4gIDx1aS1idXR0b24gZGF0YS1pZD1cImg1XCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0Pkg1PC91aS1idXR0b24+XG4gIDx1aS1idXR0b24gZGF0YS1pZD1cImg2XCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0Pkg2PC91aS1idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktYnV0dG9uLWdyb3VwIHVpLWhvcml6b250YWxcIj5cbiAgPHVpLWJ1dHRvbiBnbHlwaD1cImdseXBoLW1kLWJvbGRcIiBkYXRhLWlkPVwiYlwiIGRpc2FibGVkLmJpbmQ9XCJkaXNhYmxlVG9vbHN8fGRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBnbHlwaD1cImdseXBoLW1kLWl0YWxpY1wiIGRhdGEtaWQ9XCJpXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVUb29sc3x8ZGlzYWJsZWR8fHJlYWRvbmx5XCIgc3F1YXJlIHNtYWxsIGxpZ2h0PjwvdWktYnV0dG9uPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtc3RyaWtlXCIgZGF0YS1pZD1cInNcIiBkaXNhYmxlZC5iaW5kPVwiZGlzYWJsZVRvb2xzfHxkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+PC91aS1idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwidWktYnV0dG9uLWdyb3VwIHVpLWhvcml6b250YWxcIj5cbiAgPHVpLWJ1dHRvbiBnbHlwaD1cImdseXBoLW1kLWxpbmtcIiBkYXRhLWlkPVwiYVwiIGRpc2FibGVkLmJpbmQ9XCJkaXNhYmxlVG9vbHN8fGRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBnbHlwaD1cImdseXBoLW1kLWltYWdlXCIgZGF0YS1pZD1cImltZ1wiIGRpc2FibGVkLmJpbmQ9XCJkaXNhYmxlVG9vbHN8fGRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24tZ3JvdXAgdWktaG9yaXpvbnRhbFwiPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtbGlzdFwiIGRhdGEtaWQ9XCJ1bFwiIGRpc2FibGVkLmJpbmQ9XCJkaXNhYmxlVG9vbHN8fGRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBnbHlwaD1cImdseXBoLW1kLW51bWJlclwiIGRhdGEtaWQ9XCJvbFwiIGRpc2FibGVkLmJpbmQ9XCJkaXNhYmxlVG9vbHN8fGRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1idXR0b24tZ3JvdXAgdWktaG9yaXpvbnRhbFwiPlxuICA8dWktYnV0dG9uIGdseXBoPVwiZ2x5cGgtbWQtaGVscFwiIGRhdGEtaWQ9XCJoZWxwXCIgZGlzYWJsZWQuYmluZD1cImRpc2FibGVkfHxyZWFkb25seVwiIHNxdWFyZSBzbWFsbCBsaWdodD48L3VpLWJ1dHRvbj5cbiAgPHVpLWJ1dHRvbiBnbHlwaD1cImdseXBoLW1kLXByZXZpZXdcIiBkYXRhLWlkPVwicHJldmlld1wiIGRpc2FibGVkLmJpbmQ9XCJkaXNhYmxlZHx8cmVhZG9ubHlcIiBzcXVhcmUgc21hbGwgbGlnaHQ+PC91aS1idXR0b24+XG4gIDwvZGl2PjwvdWktdG9vbGJhcj5cbiAgPGRpdiBjbGFzcz1cInVpLXdhdGVybWFyayBcXCR7cHJldmlldz8ncHJldmlldyc6Jyd9IFxcJHtoZWxwPydoZWxwJzonJ31cIj5cbiAgPGRpdiByb2xlPVwiaW5wdXRcIiBjbGFzcz1cInVpLWlucHV0LWNvbnRyb2wgdWktdGV4dGFyZWFcIj48c3BhbiBjbGFzcz1cInVpLWVycm9yXCIgaWYuYmluZD1cImVycm9yc1wiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWludmFsaWRcIj48L3VpLWdseXBoPjx1bCBjbGFzcz1cInVpLWVycm9yLWxpc3RcIj48bGkgcmVwZWF0LmZvcj1cImVyciBvZiBlcnJvcnNcIiBpbm5lcmh0bWwuYmluZD1cImVyclwiPjwvbGk+PC91bD48L3NwYW4+XG4gIDx0ZXh0YXJlYSByZWY9XCJpbnB1dEVsXCIgdmFsdWUuYmluZD1cInZhbHVlXCIgcm93cy5iaW5kPVwicm93c1wiIG1heGxlbmd0aC5iaW5kPVwibWF4bGVuZ3RoXCIgZGlyLmJpbmQ9XCJkaXJcIlxuICAgIGZvY3VzLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIGJsdXIudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCJcbiAgICBpbnB1dC50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIiBjaGFuZ2UudHJpZ2dlcj1cImZpcmVFdmVudCgkZXZlbnQpXCJcbiAgICBwbGFjZWhvbGRlci5iaW5kPVwicGxhY2Vob2xkZXJcIiBkaXNhYmxlZC5iaW5kPVwiaXNEaXNhYmxlZFwiIHJlYWRvbmx5LmJpbmQ9XCJyZWFkb25seVwiPjwvdGV4dGFyZWE+XG4gIDxzcGFuIGNsYXNzPVwidWktY2xlYXJcIiBpZi5iaW5kPVwiY2xlYXIgJiYgdmFsdWVcIiBjbGljay50cmlnZ2VyPVwiY2xlYXJJbnB1dCgpXCI+JnRpbWVzOzwvc3Bhbj5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1jb3VudGVyXCIgaWYuYmluZD1cImNvdW50ZXJcIiBpbm5lcmh0bWwuYmluZD1cInZhbHVlLmxlbmd0aCArICcgb2YgJyArIG1heGxlbmd0aFwiPjwvc3Bhbj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz0ndWktbWQtcHJldmlldyB1aS1wYWQtYWxsIHVpLW1hcmtkb3duJyBzaG93LmJpbmQ9XCJoZWxwXCIgZGlyPVwibHRyXCI+XG4gIDxoMiBjbGFzcz1cInVpLXNtYWxsLWNhcHMgdWktdGV4dC1wcmltYXJ5IHVpLXN0cm9uZ1wiPk1hcmtkb3duIFN5bnRheDwvaDI+XG4gIDxoci8+XG4gIDxwPkFkZCBhIGJsYW5rIGxpbmUgdG8gY3JlYXRlIGEgc2VwYXJhdGUgcGFyYWdyYXBoPC9wPlxuICA8aHIvPlxuICA8cCBjbGFzcz1cInVpLXRleHQtcHJpbWFyeVwiPkhlYWRlcnM8L3A+XG5cbiAgPGRpdj5cbiAgICAgIDxzcGFuPkgxIDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiMgSGVhZGVyPC9jb2RlPiA8aDEgY2xhc3M9XCJ1aS1pbmxpbmVcIj5IZWFkZXI8L2gxPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj5IMiA8Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj4jIyBIZWFkZXI8L2NvZGU+IDxoMiBjbGFzcz1cInVpLWlubGluZVwiPkhlYWRlcjwvaDI+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPkgzIDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiMjIyBIZWFkZXI8L2NvZGU+IDxoMyBjbGFzcz1cInVpLWlubGluZVwiPkhlYWRlcjwvaDM+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPkg0IDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiMjIyMgSGVhZGVyPC9jb2RlPiA8aDQgY2xhc3M9XCJ1aS1pbmxpbmVcIj5IZWFkZXI8L2g0Pjwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj5INSA8Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj4jIyMjIyBIZWFkZXI8L2NvZGU+IDxoNSBjbGFzcz1cInVpLWlubGluZVwiPkhlYWRlcjwvaDU+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPkg2IDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiMjIyMjIyBIZWFkZXI8L2NvZGU+IDxoNiBjbGFzcz1cInVpLWlubGluZVwiPkhlYWRlcjwvaDY+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgPC9kaXY+XG5cbiAgPHAgY2xhc3M9XCJ1aS10ZXh0LXByaW1hcnlcIj5TdHlsZXM8L3A+XG5cbiAgPHA+XG4gICAgICA8c3Bhbj5JdGFsaWMgPGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+X0l0YWxpYyBUZXh0XzwvY29kZT46IDxpPkl0YWxpYzwvaT48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+Qm9sZCA8Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj5fX0JvbGQgVGV4dF9fPC9jb2RlPjogPGI+Qm9sZDwvYj48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+U3RyaWtldGhyb3VnaCA8Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj5+flN0cmlrZXRocm91Z2h+fjwvY29kZT46IDxkZWw+U3RyaWtldGhyb3VnaDwvZGVsPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gIDwvcD5cblxuICA8cCBjbGFzcz1cInVpLXRleHQtcHJpbWFyeVwiPkxpbmtzPC9wPlxuXG4gIDxwPlxuICAgICAgPGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+W2xpbmsgdGV4dF0obGluayBVUkwpPC9jb2RlPlxuICAgICAgPGJyLz5cbiAgICAgIDxlbT5hbnkgdXJsIHdpbGwgYmUgY29udmVydGVkIHRvIGEgbGluaywgdXNlIHRoZSBhYm92ZSB0byBkaXNwbGF5IGN1c3RvbSB0ZXh0IGluc3RlYWQgb2YgdXJsIGluIHRoZSBsaW5rLjwvZW0+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+ZWcuIDxjb2RlPiZsdDthIGhyZWY9XCJ1cmxcIj5MaW5rIFRleHQmbHQ7L2E+PC9jb2RlPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gIDwvcD5cblxuICA8cCBjbGFzcz1cInVpLXRleHQtcHJpbWFyeVwiPkltYWdlczwvcD5cblxuICA8cD5cbiAgICAgIDxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiFbYWx0IHRleHRdKGltYWdlIFVSTCk8L2NvZGU+XG4gICAgICA8YnIvPlxuICA8L3A+XG5cbiAgPHAgY2xhc3M9XCJ1aS10ZXh0LXByaW1hcnlcIj5MaXN0czwvcD5cblxuICA8cD5cbiAgICAgIDxzcGFuPjxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPiogbGlzdCBpdGVtPC9jb2RlPjogJiM4MjI2OyBsaXN0IGl0ZW08L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+PGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+KiBsaXN0IGl0ZW08L2NvZGU+OiAmIzgyMjY7IGxpc3QgaXRlbTwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj4qIGxpc3QgaXRlbTwvY29kZT46ICYjODIyNjsgbGlzdCBpdGVtPC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxici8+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj4xLiBsaXN0IGl0ZW08L2NvZGU+OiAxLiBsaXN0IGl0ZW08L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+PGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+KiAmbmJzcDtsaXN0IGl0ZW08L2NvZGU+OiAyLiBsaXN0IGl0ZW08L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+PGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+KiAmbmJzcDtsaXN0IGl0ZW08L2NvZGU+OiAzLiBsaXN0IGl0ZW08L3NwYW4+XG4gICAgICA8YnIvPlxuICA8L3A+XG5cbiAgPHAgY2xhc3M9XCJ1aS10ZXh0LXByaW1hcnlcIj5UYWJsZXM8L3A+XG5cbiAgPHA+XG4gICAgICA8c3Bhbj48Y29kZSBjbGFzcz1cInVpLXNlbGVjdGFibGVcIj58SGVhZHxIZWFkIHxIZWFkfDwvY29kZT48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+PGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+fDotLS18Oi0tLTp8LS0tOnw8L2NvZGU+PC9zcGFuPlxuICAgICAgPGJyLz5cbiAgICAgIDxzcGFuPjxjb2RlIGNsYXNzPVwidWktc2VsZWN0YWJsZVwiPnxMZWZ0IEFsaWdufENlbnRlciBBbGlnbnxSaWdodCBBbGlnbmVkfDwvY29kZT48L3NwYW4+XG4gICAgICA8YnIvPlxuICAgICAgPHNwYW4+PGNvZGUgY2xhc3M9XCJ1aS1zZWxlY3RhYmxlXCI+fExlZnQgQWxpZ258Q2VudGVyIEFsaWdufFJpZ2h0IEFsaWduZWR8PC9jb2RlPjwvc3Bhbj5cbiAgICAgIDxici8+XG4gICAgICA8YnIvPlxuICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwidWktdGV4dC1zdGFydFwiPkhlYWQ8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzPVwidWktdGV4dC1jZW50ZXJcIj5IZWFkPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzcz1cInVpLXRleHQtZW5kXCI+SGVhZDwvdGg+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLXRleHQtc3RhcnRcIj5MZWZ0PC90ZD5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidWktdGV4dC1jZW50ZXJcIj5DZW50ZXI8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10ZXh0LWVuZFwiPlJpZ2h0PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRkIGNsYXNzPVwidWktdGV4dC1zdGFydFwiPkxlZnQ8L3RkPlxuICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10ZXh0LWNlbnRlclwiPkNlbnRlcjwvdGQ+XG4gICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInVpLXRleHQtZW5kXCI+UmlnaHQ8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICA8L3RhYmxlPlxuICA8L3A+XG4gIDxici8+XG4gIDxici8+PC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInVpLW1kLXByZXZpZXcgdWktcGFkLWFsbCB1aS1tYXJrZG93blwiIGRpci5iaW5kPVwiZGlyXCIgc2hvdy5iaW5kPVwicHJldmlld1wiIGlubmVyaHRtbC5iaW5kPVwidmFsdWUgfCBtYXJrZG93blwiIGRpci5iaW5kPVwiZGlyXCI+PC9kaXY+XG5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJ1aS1pbnB1dC1pbmZvXCIgaWYuYmluZD1cImluZm9cIiBpbm5lcmh0bWwuYmluZD1cImluZm9cIj48L2Rpdj5cbjwvdGVtcGxhdGU+YClcbmV4cG9ydCBjbGFzcyBVSU1hcmtkb3duIGV4dGVuZHMgVUlCYXNlSW5wdXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGVhciA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjbGVhcicpO1xuICAgIHRoaXMuY291bnRlciA9IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb3VudGVyJyk7XHJcbiAgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgc3VwZXIuYmluZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cbiAgLy8gYXR0YWNoZWQoKSB7IH1cbiAgLy8gZGV0YWNoZWQoKSB7IH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgdmFsdWUgPSAnJztcblxuICBAYmluZGFibGUoKSBkaXIgPSAnJztcbiAgQGJpbmRhYmxlKCkgcm93cyA9IDE1O1xuICBAYmluZGFibGUoKSBlcnJvcnMgPSBudWxsO1xuICBAYmluZGFibGUoKSBtYXhsZW5ndGggPSA1MDAwO1xuICBAYmluZGFibGUoKSBkaXNhYmxlZCA9IGZhbHNlO1xuICBAYmluZGFibGUoKSByZWFkb25seSA9IGZhbHNlO1xuICBAYmluZGFibGUoKSBwbGFjZWhvbGRlciA9ICcnO1xuICBAYmluZGFibGUoKSBhdXRvQ29tcGxldGUgPSAnJztcbiAgQGJpbmRhYmxlKCkgaW5mbyA9ICcnO1xuXG4gIHByaXZhdGUgY2xlYXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjb3VudGVyID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBpZ25vcmUgPSBmYWxzZTtcblxuICBwcml2YXRlIGhlbHAgPSBmYWxzZTtcbiAgcHJpdmF0ZSBwcmV2aWV3ID0gZmFsc2U7XG4gIHByaXZhdGUgZGlzYWJsZVRvb2xzID0gZmFsc2U7XG5cbiAgdG9vbENsaWNrZWQoZXZ0KSB7XG4gICAgbGV0IGJ0bjtcbiAgICBpZiAoIShidG4gPSBnZXRQYXJlbnRCeVRhZyhldnQudGFyZ2V0LCAndWktYnV0dG9uJykpKSByZXR1cm47XG4gICAgaWYgKCEoYnRuID0gYnRuWydkYXRhc2V0J11bXCJpZFwiXSkpIHJldHVybjtcblxuICAgIGxldCB2YWwgPSB0aGlzLnZhbHVlIHx8ICcnO1xuICAgIGxldCBkaWZmID0gMCxcbiAgICAgIHN0YXJ0ID0gdGhpcy5pbnB1dEVsLnNlbGVjdGlvblN0YXJ0LFxuICAgICAgZW5kID0gdGhpcy5pbnB1dEVsLnNlbGVjdGlvbkVuZCxcbiAgICAgIHN1YiA9IHZhbC5zdWJzdHIoc3RhcnQsIGVuZCAtIHN0YXJ0KSB8fCAnRWRpdFRoaXMnO1xuXG4gICAgc3dpdGNoIChidG4pIHtcbiAgICAgIGNhc2UgJ2gxJzpcbiAgICAgICAgZGlmZiA9IDM7IHRoaXMudmFsdWUgPSB2YWwuc3Vic3RyKDAsIHN0YXJ0KSArIGBcXG4jICR7c3VifVxcblxcbmAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnaDInOlxuICAgICAgICBkaWZmID0gNDsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYFxcbiMjICR7c3VifVxcblxcbmAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnaDMnOlxuICAgICAgICBkaWZmID0gNTsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYFxcbiMjIyAke3N1Yn1cXG5cXG5gICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ2g0JzpcbiAgICAgICAgZGlmZiA9IDY7IHRoaXMudmFsdWUgPSB2YWwuc3Vic3RyKDAsIHN0YXJ0KSArIGBcXG4jIyMjICR7c3VifVxcblxcbmAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnaDUnOlxuICAgICAgICBkaWZmID0gNzsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYFxcbiMjIyMjICR7c3VifVxcblxcbmAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnaDYnOlxuICAgICAgICBkaWZmID0gODsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYFxcbiMjIyMjIyAke3N1Yn1cXG5cXG5gICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ2InOlxuICAgICAgICBkaWZmID0gMzsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYCAke3N1Yn0gYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdpJzpcbiAgICAgICAgZGlmZiA9IDI7IHRoaXMudmFsdWUgPSB2YWwuc3Vic3RyKDAsIHN0YXJ0KSArIGAgXyR7c3VifV8gYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdzJzpcbiAgICAgICAgZGlmZiA9IDM7IHRoaXMudmFsdWUgPSB2YWwuc3Vic3RyKDAsIHN0YXJ0KSArIGAgfn4ke3N1Yn1+fiBgICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICBkaWZmID0gMjsgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYCBbJHtzdWJ9XShMaW5rX1VybF9IZXJlKSBgICsgdmFsLnN1YnN0cihlbmQpOyBicmVhaztcbiAgICAgIGNhc2UgJ2ltZyc6XG4gICAgICAgIGRpZmYgPSAzOyB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgICFbJHtzdWJ9XShJbWFnZV9VcmxfSGVyZSkgYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICd1bCc6XG4gICAgICAgIGRpZmYgPSAyO1xuICAgICAgICBzdWIgPSBzdWIucmVwbGFjZSgvXi4rJC9nbSwgKHQpID0+IGAqICR7dH1gKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbC5zdWJzdHIoMCwgc3RhcnQpICsgYCR7c3VifVxcbmAgKyB2YWwuc3Vic3RyKGVuZCk7IGJyZWFrO1xuICAgICAgY2FzZSAnb2wnOlxuICAgICAgICB2YXIgaSA9IDE7XG4gICAgICAgIGRpZmYgPSAzO1xuICAgICAgICBzdWIgPSBzdWIucmVwbGFjZSgvXi4rJC9nbSwgKHQpID0+IGAke2krKyA9PSAxID8gJzEuJyA6ICcqJ30gJHt0fWApO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsLnN1YnN0cigwLCBzdGFydCkgKyBgJHtzdWJ9XFxuYCArIHZhbC5zdWJzdHIoZW5kKTsgYnJlYWs7XG4gICAgICBjYXNlICdoZWxwJzpcbiAgICAgICAgdGhpcy5wcmV2aWV3ID0gZmFsc2U7IHRoaXMuZGlzYWJsZVRvb2xzID0gdGhpcy5oZWxwID0gIXRoaXMuaGVscDsgYnJlYWs7XG4gICAgICBjYXNlICdwcmV2aWV3JzpcbiAgICAgICAgdGhpcy5oZWxwID0gZmFsc2U7IHRoaXMuZGlzYWJsZVRvb2xzID0gdGhpcy5wcmV2aWV3ID0gIXRoaXMucHJldmlldzsgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuaW5wdXRFbC5mb2N1cygpO1xuICAgIGlmIChzdWIgPT0gJ0VkaXRUaGlzJyAmJiBidG4gIT0gJ3ByZXZpZXcnICYmIGJ0biAhPSAnaGVscCcpIFVJRXZlbnQucXVldWVUYXNrKCgpID0+IHRoaXMuaW5wdXRFbC5zZXRTZWxlY3Rpb25SYW5nZShzdGFydCArIGRpZmYsIHN0YXJ0ICsgZGlmZiArIHN1Yi5sZW5ndGgpKTtcbiAgfVxufVxuXG5AYXV0b2luamVjdCgpXG5AaW5saW5lVmlldyhgPHRlbXBsYXRlIGNsYXNzPVwidWktaW5wdXQtd3JhcHBlciB1aS1pbnB1dC1saXN0XCI+PGRpdiByb2xlPVwiaW5wdXRcIiBjbGFzcz1cInVpLWlucHV0LWNvbnRyb2xcIj5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1pbnB1dC1hZGRvblwiIGNsaWNrLnRyaWdnZXI9XCJvcGVuRHJvcGRvd24oJGV2ZW50LCBzaG93PXRydWUsIGlucHV0RWwuZm9jdXMoKSlcIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1sYW5ndWFnZVwiPjwvdWktZ2x5cGg+PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cInVpLWVycm9yXCIgaWYuYmluZD1cImVycm9yc1wiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWludmFsaWRcIj48L3VpLWdseXBoPjx1bCBjbGFzcz1cInVpLWVycm9yLWxpc3RcIj48bGkgcmVwZWF0LmZvcj1cImVyciBvZiBlcnJvcnNcIiBpbm5lcmh0bWwuYmluZD1cImVyclwiPjwvbGk+PC91bD48L3NwYW4+XG4gIDxpbnB1dCByZWY9XCJpbnB1dEVsXCIgdHlwZS5iaW5kPVwidHlwZVwiIHZhbHVlLmJpbmQ9XCJlbFZhbHVlXCIgc2l6ZT1cIjEwXCJcbiAgICBmb2N1cy50cmlnZ2VyPVwiZmlyZUV2ZW50KCRldmVudClcIiBibHVyLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiXG4gICAgY2hhbmdlLnRyaWdnZXI9XCJmaXJlRXZlbnQoJGV2ZW50KVwiIHBsYWNlaG9sZGVyLmJpbmQ9XCJwbGFjZWhvbGRlclwiXG4gICAgZGlzYWJsZWQuYmluZD1cImlzRGlzYWJsZWRcIiByZWFkb25seS5iaW5kPVwidHJ1ZVwiIG1vdXNldXAudHJpZ2dlcj1cIiFbJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpLCBzaG93PXRydWUsIG9wZW5Ecm9wZG93bigpXVwiLz5cbiAgPHNwYW4gY2xhc3M9XCJ1aS1pbnB1dC1hZGRvbiB1aS1kcm9wZG93bi1oYW5kbGVcIiBtb3VzZXVwLnRyaWdnZXI9XCIhW3Nob3c9dHJ1ZSwgdG9nZ2xlRHJvcGRvd24oJGV2ZW50KV1cIj48dWktZ2x5cGggZ2x5cGg9XCJnbHlwaC1jaGV2cm9uLWRvd25cIj48L3VpLWdseXBoPjwvc3Bhbj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInVpLWlucHV0LWluZm9cIiBpZi5iaW5kPVwiaW5mb1wiIGlubmVyaHRtbC5iaW5kPVwiaW5mb1wiPjwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJ1aS1saXN0LWNvbnRhaW5lciB1aS1mbG9hdGluZ1wiIHJlZj1cImRyb3Bkb3duXCI+XG4gICAgPGRpdiBjbGFzcz1cInVpLWxpc3QtZ3JvdXBcIiB0PVwiU2VsZWN0ZWRcIj5TZWxlY3RlZDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ1aS1sYW5nLWl0ZW1cIiByZXBlYXQuZm9yPVwiaXRlbSBvZiBzZWxlY3RlZExpc3QgfCBzb3J0OidpZCdcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ1aS1saXN0LWl0ZW0gXFwke2l0ZW0uaWQ9PXZhbHVlPyd1aS1zZWxlY3RlZCc6Jyd9IFxcJHtpdGVtLmRpc2FibGVkPyd1aS1kaXNhYmxlZCc6Jyd9XCJcbiAgICAgIG1vdXNlb3Zlci5kZWxlZ2F0ZT1cImhpbGlnaHRJdGVtKCRldmVudClcIiBjbGljay50cmlnZ2VyPVwiZmlyZVNlbGVjdChpdGVtKVwiPjx1aS1nbHlwaCBnbHlwaD1cImdseXBoLWludmFsaWRcIiBjbGFzcz1cInVpLXRleHQtd2FybmluZ1wiIGlmLmJpbmQ9XCJlcnJvcmVkLmluZGV4T2YoaXRlbS5pZCk+LTFcIj48L3VpLWdseXBoPiBcXCR7aXRlbS5uYW1lfTwvZGl2PlxuICAgICAgPGEgY2xpY2sudHJpZ2dlcj1cInJlbW92ZUxhbmd1YWdlKGl0ZW0pXCI+PHVpLWdseXBoIGNsYXNzPVwidWktdGV4dC1kYW5nZXIgdWktZm9udC1iaWdcIiBnbHlwaD1cImdseXBoLXRyZWUtY29sbGFwc2VcIj48L3VpLWdseXBoPjwvYT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidWktbGlzdC1ncm91cFwiIHQ9XCJBdmFpbGFibGVcIj5BdmFpbGFibGU8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidWktbGFuZy1pdGVtXCIgcmVwZWF0LmZvcj1cIml0ZW0gb2YgYXZhaWxhYmxlTGlzdCB8IHNvcnQ6J2lkJ1wiIGNsaWNrLnRyaWdnZXI9XCJhZGRMYW5ndWFnZShpdGVtKVwiPlxuICAgICAgPGRpdiBjbGFzcz1cInVpLWxpc3QtaXRlbSBcXCR7aXRlbS5kaXNhYmxlZD8ndWktZGlzYWJsZWQnOicnfVwiIGlubmVyaHRtbC5iaW5kPVwiaXRlbS5uYW1lXCJcbiAgICAgIG1vdXNlb3Zlci5kZWxlZ2F0ZT1cImhpbGlnaHRJdGVtKCRldmVudClcIj48L2Rpdj5cbiAgICAgIDx1aS1nbHlwaCBjbGFzcz1cInVpLXRleHQtaW5mbyB1aS1mb250LWJpZ1wiIGdseXBoPVwiZ2x5cGgtdHJlZS1leHBhbmRcIj48L3VpLWdseXBoPlxuICAgIDwvZGl2PlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5gKVxuQGN1c3RvbUVsZW1lbnQoJ3VpLWxhbmd1YWdlJylcbmV4cG9ydCBjbGFzcyBVSUxhbmd1YWdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnQpIHsgfVxuXG4gIC8vIGF1cmVsaWEgaG9va3NcbiAgLy8gY3JlYXRlZChvd25pbmdWaWV3OiBWaWV3LCBteVZpZXc6IFZpZXcpIHsgfVxuICBiaW5kKGJpbmRpbmdDb250ZXh0OiBPYmplY3QsIG92ZXJyaWRlQ29udGV4dDogT2JqZWN0KSB7XG4gICAgdGhpcy5sYW5ndWFnZXNDaGFuZ2VkKHRoaXMubGFuZ3VhZ2VzKTtcbiAgfVxuICBhdHRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlciA9IFVJVXRpbHMudGV0aGVyKHRoaXMuZWxlbWVudCwgdGhpcy5kcm9wZG93bik7XG4gICAgdGhpcy5vYk1vdXNldXAgPSBVSUV2ZW50LnN1YnNjcmliZSgnbW91c2VjbGljaycsIChldnQpID0+IHtcbiAgICAgIGlmIChnZXRQYXJlbnRCeUNsYXNzKGV2dC50YXJnZXQsICd1aS1saXN0LWNvbnRhaW5lcicpID09IHRoaXMuZWxlbWVudCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zaW5nKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgICB9KTtcbiAgfVxuICBkZXRhY2hlZCgpIHtcbiAgICB0aGlzLnRldGhlci5kaXNwb3NlKCk7XG4gICAgdGhpcy5vYk1vdXNldXAuZGlzcG9zZSgpO1xyXG4gIH1cbiAgLy8gdW5iaW5kKCkgeyB9XG4gIC8vIGVuZCBhdXJlbGlhIGhvb2tzXG5cbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgdmFsdWUgPSAnJztcbiAgQGJpbmRhYmxlKHsgZGVmYXVsdEJpbmRpbmdNb2RlOiBiaW5kaW5nTW9kZS50d29XYXkgfSkgZGlyID0gJyc7XG5cbiAgQGJpbmRhYmxlKCkgZXJyb3JzID0gbnVsbDtcbiAgQGJpbmRhYmxlKCkgZGlzYWJsZWQgPSBmYWxzZTtcbiAgQGJpbmRhYmxlKCkgcmVhZG9ubHkgPSBmYWxzZTtcbiAgQGJpbmRhYmxlKCkgaW5mbyA9ICcnO1xuICBAYmluZGFibGUoKSBsYW5ndWFnZXM7XG4gIEBiaW5kYWJsZSgpIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgZXJyb3JlZCA9IFtdO1xuICBzaG93ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBpbnB1dEVsO1xuICBwcml2YXRlIGVsVmFsdWU7XG4gIHByaXZhdGUgZHJvcGRvd247XG5cbiAgcHJpdmF0ZSB0ZXRoZXI7XG4gIHByaXZhdGUgY2xvc2luZztcbiAgcHJpdmF0ZSBvYk1vdXNldXA7XG5cbiAgcHJpdmF0ZSBzZWxlY3RlZExpc3QgPSBbXTtcbiAgcHJpdmF0ZSBhdmFpbGFibGVMaXN0ID0gW107XG5cbiAgdmFsdWVDaGFuZ2VkKG5ld1ZhbHVlKSB7XG4gICAgbGV0IGwgPSBfLmZpbmQodGhpcy5zZWxlY3RlZExpc3QsIFsnaWQnLCBuZXdWYWx1ZV0pIHx8IHt9O1xuICAgIHRoaXMuZGlyID0gKGwucnRsID8gJ3J0bCcgOiAnbHRyJyk7XG4gICAgdGhpcy5lbFZhbHVlID0gbC5uYW1lO1xuICB9XG5cbiAgbGFuZ3VhZ2VzQ2hhbmdlZChuZXdWYWx1ZSkge1xuICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gW107XG4gICAgdGhpcy5hdmFpbGFibGVMaXN0ID0gXy5jbG9uZShVSUNvbnN0YW50cy5MYW5ndWFnZXMpO1xuICAgIGlmICghaXNFbXB0eShuZXdWYWx1ZSkpIHtcbiAgICAgIGxldCBsYW5ncyA9IGlzU3RyaW5nKG5ld1ZhbHVlKSA/IG5ld1ZhbHVlLnNwbGl0KCcsJykgOiBuZXdWYWx1ZTtcbiAgICAgIF8uZm9yRWFjaChsYW5ncywgbCA9PiB0aGlzLnNlbGVjdGVkTGlzdCA9IHRoaXMuc2VsZWN0ZWRMaXN0LmNvbmNhdChfLnJlbW92ZSh0aGlzLmF2YWlsYWJsZUxpc3QsIFsnaWQnLCBsXSkpKTtcbiAgICAgIHRoaXMudmFsdWUgPSBsYW5nc1swXTtcbiAgICB9XG4gIH1cblxuICBmaXJlRXZlbnQoZXZ0KSB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBlbCA9IGdldFBhcmVudEJ5Q2xhc3ModGhpcy5lbGVtZW50LCAndWktaW5wdXQtZ3JvdXAnKTtcbiAgICBpZiAoZXZ0LnR5cGUgPT09ICdmb2N1cycpIHtcbiAgICAgIHRoaXMuaW5wdXRFbC5zZWxlY3QoKTtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd1aS1mb2N1cycpO1xuICAgICAgaWYgKGVsKSBlbC5jbGFzc0xpc3QuYWRkKCd1aS1mb2N1cycpO1xuICAgICAgaWYgKHRoaXMuc2hvdykgdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgICB9XG4gICAgaWYgKGV2dC50eXBlID09PSAnYmx1cicpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgICAgaWYgKGVsKSBlbC5jbGFzc0xpc3QucmVtb3ZlKCd1aS1mb2N1cycpO1xuICAgICAgdGhpcy5jbG9zaW5nID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLmNsb3NlRHJvcGRvd24oKSwgNTAwKTtcbiAgICB9XG4gICAgVUlFdmVudC5maXJlRXZlbnQoZXZ0LnR5cGUsIHRoaXMuZWxlbWVudCwgdGhpcy52YWx1ZSk7XG4gIH1cblxuICBoaWxpZ2h0SXRlbShldnQpIHtcbiAgICBsZXQgaCA9IHRoaXMuZHJvcGRvd24ucXVlcnlTZWxlY3RvcignLnVpLWxpc3QtaXRlbS51aS1oaWxpZ2h0Jyk7XG4gICAgaWYgKGggIT09IG51bGwpIGguY2xhc3NMaXN0LnJlbW92ZSgndWktaGlsaWdodCcpO1xuICAgIGV2dC50YXJnZXQuY2xhc3NMaXN0LmFkZCgndWktaGlsaWdodCcpO1xuICB9XG4gIHVuaGlsaWdodEl0ZW0oZXZ0KSB7XG4gICAgbGV0IGggPSB0aGlzLmRyb3Bkb3duLnF1ZXJ5U2VsZWN0b3IoJy51aS1saXN0LWl0ZW0udWktaGlsaWdodCcpO1xuICAgIGlmIChoICE9PSBudWxsKSBoLmNsYXNzTGlzdC5yZW1vdmUoJ3VpLWhpbGlnaHQnKTtcbiAgfVxuXG4gIHNjcm9sbEludG9WaWV3KCkge1xuICAgIGxldCBoID0gdGhpcy5kcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcudWktbGlzdC1pdGVtLnVpLWhpbGlnaHQnKTtcbiAgICBpZiAoaCA9PSBudWxsKSBoID0gdGhpcy5kcm9wZG93bi5xdWVyeVNlbGVjdG9yKCcudWktbGlzdC1pdGVtLnVpLXNlbGVjdGVkJyk7XG4gICAgdGhpcy5kcm9wZG93bi5zY3JvbGxUb3AgPSAoaCAhPT0gbnVsbCA/IGgub2Zmc2V0VG9wIC0gKHRoaXMuZHJvcGRvd24ub2Zmc2V0SGVpZ2h0IC8gMikgOiAwKTtcbiAgfVxuXG4gIG9wZW5Ecm9wZG93bigpIHtcbiAgICBpZiAodGhpcy5yZWFkb25seSB8fCB0aGlzLmRpc2FibGVkKSByZXR1cm4gdHJ1ZTtcbiAgICB0aGlzLmRyb3Bkb3duLmlzT3BlbiA9IHRydWU7XG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QuYWRkKCd1aS1vcGVuJyk7XG4gICAgdGhpcy50ZXRoZXIucG9zaXRpb24oKTtcbiAgICB0aGlzLnNjcm9sbEludG9WaWV3KCk7XG4gIH1cblxuICBjbG9zZURyb3Bkb3duKCkge1xuICAgIGlmICghdGhpcy5kcm9wZG93bikgcmV0dXJuO1xuICAgIHRoaXMuZHJvcGRvd24uaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5kcm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCd1aS1vcGVuJyk7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihldnQsIGZvcmNlQ2xvc2UgPSBmYWxzZSkge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmRyb3Bkb3duLmlzT3BlbiA/IHRoaXMuY2xvc2VEcm9wZG93bigpIDogdGhpcy5vcGVuRHJvcGRvd24oKTtcbiAgfVxuXG4gIGFkZExhbmd1YWdlKG1vZGVsKSB7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ2FkZCcsIHRoaXMuZWxlbWVudCwgbW9kZWwpO1xuICAgIHRoaXMuc2VsZWN0ZWRMaXN0ID0gdGhpcy5zZWxlY3RlZExpc3QuY29uY2F0KF8ucmVtb3ZlKHRoaXMuYXZhaWxhYmxlTGlzdCwgWydpZCcsIG1vZGVsLmlkXSkpO1xuICAgIHRoaXMudmFsdWUgPSBtb2RlbC5pZDtcbiAgICB0aGlzLmNsb3NlRHJvcGRvd24oKTtcbiAgfVxuXG4gIHJlbW92ZUxhbmd1YWdlKG1vZGVsKSB7XG4gICAgVUlFdmVudC5maXJlRXZlbnQoJ3JlbW92ZScsIHRoaXMuZWxlbWVudCwgbW9kZWwpO1xuICAgIHRoaXMuYXZhaWxhYmxlTGlzdCA9IHRoaXMuYXZhaWxhYmxlTGlzdC5jb25jYXQoXy5yZW1vdmUodGhpcy5zZWxlY3RlZExpc3QsIFsnaWQnLCBtb2RlbC5pZF0pKTtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5zZWxlY3RlZExpc3QubGVuZ3RoID4gMCA/IHRoaXMuc2VsZWN0ZWRMaXN0WzBdLmlkIDogJyc7XG4gIH1cblxuICBmaXJlU2VsZWN0KG1vZGVsKSB7XG4gICAgdGhpcy52YWx1ZSA9IG1vZGVsLmlkO1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIHRoaXMudW5oaWxpZ2h0SXRlbShudWxsKTtcbiAgICBVSUV2ZW50LmZpcmVFdmVudCgnY2hhbmdlJywgdGhpcy5lbGVtZW50LCBtb2RlbClcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==
