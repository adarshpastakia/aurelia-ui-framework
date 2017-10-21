System.register(["aurelia-framework", "./ui-input", "../../utils/ui-event", "../../utils/ui-utils", "../../utils/ui-constants", "lodash"], function (exports_1, context_1) {
    "use strict";
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
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ui_input_1, ui_event_1, ui_utils_1, ui_constants_1, _, UIMarkdown, UILanguage;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_input_1_1) {
                ui_input_1 = ui_input_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            },
            function (ui_utils_1_1) {
                ui_utils_1 = ui_utils_1_1;
            },
            function (ui_constants_1_1) {
                ui_constants_1 = ui_constants_1_1;
            },
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
            UIMarkdown = (function (_super) {
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
            exports_1("UIMarkdown", UIMarkdown);
            UILanguage = (function () {
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
                        if (getParentByClass(evt.target, 'ui-list-container') == _this.dropdown) {
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
                    aurelia_framework_1.inlineView("<template class=\"ui-input-wrapper ui-input-list\"><div role=\"input\" class=\"ui-input-control\">\n  <span class=\"ui-input-addon\" click.trigger=\"openDropdown($event, show=true, inputEl.focus())\"><ui-glyph glyph=\"glyph-language\"></ui-glyph></span>\n  <span class=\"ui-error\" if.bind=\"errors\"><ui-glyph glyph=\"glyph-invalid\"></ui-glyph><ul class=\"ui-error-list\"><li repeat.for=\"err of errors\" innerhtml.bind=\"err\"></li></ul></span>\n  <input ref=\"inputEl\" type.bind=\"type\" value.bind=\"elValue\" size=\"10\"\n    focus.trigger=\"fireEvent($event)\" blur.trigger=\"fireEvent($event)\"\n    change.trigger=\"fireEvent($event)\" placeholder.bind=\"placeholder\"\n    disabled.bind=\"isDisabled\" readonly.bind=\"true\" click.trigger=\"openDropdown($event, show=true)\"/>\n  <span class=\"ui-input-addon ui-dropdown-handle\" click.trigger=\"openDropdown($event, show=true, inputEl.focus())\"><ui-glyph glyph=\"glyph-chevron-down\"></ui-glyph></span></div>\n  <div class=\"ui-input-info\" if.bind=\"info\" innerhtml.bind=\"info\"></div>\n\n  <div class=\"ui-list-container ui-floating\" ref=\"dropdown\">\n    <div class=\"ui-list-group\" t=\"Selected\">Selected</div>\n    <div class=\"ui-lang-item\" repeat.for=\"item of selectedList\">\n      <div class=\"ui-list-item ${item.id==value?'ui-selected':''} ${item.disabled?'ui-disabled':''}\"\n      mouseover.delegate=\"hilightItem($event)\" click.trigger=\"fireSelect(item)\"><ui-glyph glyph=\"glyph-invalid\" class=\"ui-text-warning\" if.bind=\"errored.indexOf(item.id)>-1\"></ui-glyph> ${item.name}</div>\n      <a click.trigger=\"removeLanguage(item)\"><ui-glyph class=\"ui-text-danger ui-font-big\" glyph=\"glyph-tree-collapse\"></ui-glyph></a>\n    </div>\n    <div class=\"ui-list-group\" t=\"Available\">Available</div>\n    <div class=\"ui-lang-item\" repeat.for=\"item of availableList\" click.trigger=\"addLanguage(item)\">\n      <div class=\"ui-list-item ${item.disabled?'ui-disabled':''}\" innerhtml.bind=\"item.name\"\n      mouseover.delegate=\"hilightItem($event)\"></div>\n      <ui-glyph class=\"ui-text-info ui-font-big\" glyph=\"glyph-tree-expand\"></ui-glyph>\n    </div>\n    </template>\n  </div>\n</template>"),
                    aurelia_framework_1.customElement('ui-language'),
                    __metadata("design:paramtypes", [Element])
                ], UILanguage);
                return UILanguage;
            }());
            exports_1("UILanguage", UILanguage);
        }
    };
});
