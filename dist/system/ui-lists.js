System.register(['./chunk.js', 'aurelia-framework', 'aurelia-event-aggregator', './chunk3.js', './chunk6.js'], function (exports, module) {
  'use strict';
  var __decorate, __metadata, __extends, __spread, __awaiter, __generator, __assign, bindable, bindingMode, computedFrom, customElement, inlineView, containerless, processContent, viewResources, UIInternal, BaseInput, InputWrapper;
  return {
    setters: [function (module) {
      __decorate = module.b;
      __metadata = module.c;
      __extends = module.g;
      __spread = module.e;
      __awaiter = module.h;
      __generator = module.i;
      __assign = module.d;
    }, function (module) {
      bindable = module.bindable;
      bindingMode = module.bindingMode;
      computedFrom = module.computedFrom;
      customElement = module.customElement;
      inlineView = module.inlineView;
      containerless = module.containerless;
      processContent = module.processContent;
      viewResources = module.viewResources;
    }, function () {}, function (module) {
      UIInternal = module.a;
    }, function (module) {
      BaseInput = module.b;
      InputWrapper = module.a;
    }],
    execute: function () {

      var view = "<template class=\"ui-dropdown\">\n  <a data-active.bind=\"active\" disabled.bind=\"disabled\" click.trigger=\"toggleDrop($event)\" class=\"ui-dropdown__link\" data-open.bind=\"dropEl.isOpen\" data-disabled.bind=\"disabled\">\n    <ui-icon class=\"ui-dropdown__icon\" icon=\"${iconPrefix} ${model[iconProperty]}\" if.bind=\"iconProperty\"></ui-icon>\n    <div class=\"ui-input__error\" if.bind=\"errors && errors.length\">\n      <ui-svg-icon icon=\"alert\"></ui-svg-icon>\n      <ul>\n        <li repeat.for=\"err of errors\">${err}</li>\n      </ul>\n    </div>\n    <span class=\"ui-dropdown__label\">${selectedLabel}</span>\n    <ui-svg-icon class=\"ui-dropdown__caret\" icon=\"caret\"></ui-svg-icon>\n  </a>\n  <ui-drop view-model.ref=\"dropEl\">\n    <div>\n      <template repeat.for=\"option of options\">\n        <div class=\"ui-list__item ${(option[valueProperty] || option) === value?'ui-list__item--selected':''}\" click.trigger=\"select(option)\">\n          <ui-icon if.bind=\"iconProperty\" icon=\"${iconPrefix} ${option[iconProperty]}\"></ui-icon>\n          ${option[labelProperty] || option}\n        </div>\n      </template>\n    </div>\n  </ui-drop>\n</template>\n";

      var UIDropdown = (function () {
          function UIDropdown(element) {
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
          UIDropdown.prototype.attached = function () {
              this.dropEl.tether(this.element);
              this.valueChanged();
          };
          UIDropdown.prototype.valueChanged = function () {
              var _this = this;
              if (this.options) {
                  this.model = this.options.find(function (o) { return (o[_this.valueProperty] || o) === _this.value; });
              }
          };
          UIDropdown.prototype.select = function (model) {
              this.model = model;
              this.value = this.model[this.valueProperty] || this.model;
          };
          Object.defineProperty(UIDropdown.prototype, "selectedLabel", {
              get: function () {
                  return !isNull(this.model) ? this.model[this.labelProperty] || this.model : this.placeholder;
              },
              enumerable: true,
              configurable: true
          });
          UIDropdown.prototype.toggleDrop = function ($event) {
              $event.stopEvent();
              var beforeEvent = this.dropEl.isOpen ? "beforeopen" : "beforeclose";
              var afterEvent = this.dropEl.isOpen ? "close" : "open";
              if (this.element.dispatchEvent(UIInternal.createEvent(beforeEvent)) !== false) {
                  this.dropEl.toggleDrop();
                  this.element.dispatchEvent(UIInternal.createEvent(afterEvent));
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
          return UIDropdown;
      }());

      var view$1 = "<template>\n  <div if.bind=\"$parent.innerOptions\" mouseout.trigger=\"hilightIndex = -1\">\n    <template repeat.for=\"option of innerOptions\">\n      <div if.bind=\"option.__type==='group'\" class=\"ui-list__title\">${option.label}</div>\n      <div else class.bind=\"listClass(option, $index, value, hilightIndex)\" with.bind=\"{option}\" ref=\"__el\" mouseover.trigger=\"hilightIndex = $index\" show.one-time=\"buildOption(option, __el, !inputValue)\" click.trigger=\"selectOption(option)\" data-model.bind=\"option\"></div>\n    </template>\n  </div>\n  <div if.bind=\"isLoading\" ui-padding ui-align=\"center\" ui-font=\"lg\" ui-color=\"gray\">\n    <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n  </div>\n  <div if.bind=\"isLoaded && innerOptions.length === 0\" ui-padding ui-color=\"gray\" ui-font=\"sm\">\n    ${noOptionsText}\n  </div>\n</template>\n";

      var ListContainer = (function () {
          function ListContainer() {
          }
          ListContainer = __decorate([
              containerless(),
              inlineView(view$1),
              processContent(function (compiler, resources, node, instruction) {
                  instruction.inheritBindingContext = true;
                  return true;
              })
          ], ListContainer);
          return ListContainer;
      }());

      var view$2 = "<template>\n  <div class=\"ui-input__tags\" click.trigger=\"inputEl.focus()\">\n    <template if.bind=\"multiple\">\n      <div class=\"ui-tag\" repeat.for=\"m of model\">\n        <span with.bind=\"{m}\" show.one-time=\"buildOption(m, __el, true) & debounce\" ref=\"__el\"></span>\n        <span class=\"ui-tag__close\" click.trigger=\"removeOption(m)\">&#x00D7;</span>\n      </div>\n    </template>\n    <!--suppress HtmlFormInputWithoutLabel -->\n    <input ref=\"$parent.inputEl\" role=\"combo\" size=\"1\" placeholder.bind=\"placeholder\" disabled.bind=\"disabled || isDisabled || isPlain\" readonly.bind=\"readonly\" value.two-way=\"inputValue\" input.trigger=\"filterOptions() & debounce\" keydown.trigger=\"checkKeyEvent($event)\" change.trigger=\"false\" focus.trigger=\"toggleDrop(true)\" blur.trigger=\"[canToggleDrop($event), resetQuery(true)] & debounce\">\n  </div>\n</template>\n";

      var ListInput = (function () {
          function ListInput() {
          }
          ListInput = __decorate([
              containerless(),
              inlineView(view$2),
              processContent(function (compiler, resources, node, instruction) {
                  instruction.inheritBindingContext = true;
                  return true;
              })
          ], ListInput);
          return ListInput;
      }());

      var KEY_DOWN = 40;
      var KEY_UP = 38;
      var BACKSPACE = 8;
      var ENTER = 13;
      var ListMaker = (function (_super) {
          __extends(ListMaker, _super);
          function ListMaker() {
              var _this = _super !== null && _super.apply(this, arguments) || this;
              _this.value = undefined;
              _this.model = undefined;
              _this.name = "";
              _this.placeholder = "";
              _this.labelProperty = "";
              _this.valueProperty = "";
              _this.groupProperty = "";
              _this.options = [];
              _this.readonly = false;
              _this.disabled = false;
              _this.noOptionsText = "No Options";
              _this.multiple = false;
              _this.inputValue = "";
              _this.isLoaded = false;
              _this.isLoading = false;
              _this.isGrouped = false;
              _this.isFiltered = false;
              _this.ignoreChange = false;
              _this.allowAny = false;
              _this.hilightIndex = -1;
              return _this;
          }
          ListMaker.prototype.valueChanged = function () {
              var _this = this;
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
                      this.model = this.options.filter(function (o) {
                          if (_this.matcher) {
                              return _this.value.some(function (value) {
                                  return _this.matcher({ option: o, value: value });
                              });
                          }
                          else {
                              return _this.value.includes(o[_this.valueProperty] || o);
                          }
                      });
                  }
                  else {
                      this.model = this.options.find(function (o) {
                          if (_this.matcher) {
                              return _this.matcher({ option: o, value: _this.value });
                          }
                          else {
                              return _this.value === (o[_this.valueProperty] || o);
                          }
                      });
                  }
              }
              else {
                  this.model = null;
                  this.inputValue = "";
              }
              if (!this.dropEl) {
                  UIInternal.queueTask(function () {
                      var selected = _this.listContainer.querySelector(".ui-list__item--selected");
                      if (selected) {
                          selected.scrollIntoView({ block: "nearest" });
                      }
                  });
              }
              this.resetQuery();
          };
          ListMaker.prototype.toggleDrop = function (open) {
              var _this = this;
              if (this.dropEl) {
                  if (open === true && this.dropEl.isOpen) {
                      UIInternal.queueMicroTask(function () { return _this.dropEl.updatePosition(); });
                      return;
                  }
                  if (_super.prototype.toggleDrop.call(this, open)) {
                      this.loadOptions();
                  }
              }
          };
          ListMaker.prototype.loadOptions = function () {
              if (this.query) {
                  this.fetchOptions();
              }
              else {
                  this.buildOptions(this.options);
              }
          };
          ListMaker.prototype.filterOptions = function () {
              var _this = this;
              this.isFiltered = !!this.inputValue;
              if (this.query) {
                  this.fetchOptions(this.inputValue);
              }
              else {
                  var query_1 = this.inputValue.ascii().toLowerCase();
                  var options = this.options.filter(function (o) {
                      return (o[_this.labelProperty] || o)
                          .toString()
                          .ascii()
                          .toLowerCase()
                          .includes(query_1);
                  });
                  this.buildOptions(options);
              }
          };
          ListMaker.prototype.selectOption = function (model) {
              var _this = this;
              this.ignoreChange = true;
              this.hilightIndex = -1;
              if (this.multiple) {
                  if (!(this.value || []).includes(model[this.valueProperty] || model)) {
                      this.value = this.value
                          ? __spread(this.value, [model[this.valueProperty] || model]) : [model[this.valueProperty] || model];
                      this.model = this.model ? __spread(this.model, [model]) : [model];
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
              setTimeout(function () { return (_this.ignoreChange = false); }, 500);
          };
          ListMaker.prototype.removeOption = function (model) {
              var _this = this;
              this.ignoreChange = true;
              this.model = __spread(this.model.filter(function (m) { return m !== model; }));
              this.value = this.value.filter(function (m) { return m !== (model[_this.valueProperty] || model); });
              setTimeout(function () { return (_this.ignoreChange = false); }, 500);
          };
          ListMaker.prototype.resetQuery = function (clearFilter) {
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
          };
          ListMaker.prototype.clear = function () {
              this.model = null;
              this.value = null;
              this.inputValue = "";
              this.inputEl.focus();
              if (this.isFiltered) {
                  this.loadOptions();
              }
          };
          ListMaker.prototype.listClass = function (option, index) {
              var _this = this;
              var classes = ["ui-list__item"];
              option.__selected = false;
              if (!this.multiple) {
                  if (this.matcher) {
                      if (this.matcher({ option: option, value: this.value })) {
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
                      this.value.forEach(function (value) {
                          if (_this.matcher({ option: option, value: value })) {
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
          };
          ListMaker.prototype.buildOption = function (option, el, unmark) {
              if (unmark === void 0) { unmark = false; }
              if (el) {
                  el.innerHTML = "";
                  var tpl = this.template
                      ? this.template.outerHTML
                      : "<template><div innerhtml.bind=\"$label\"></div></template>";
                  var model = {
                      $label: this.isFiltered && !unmark
                          ? this.markOption(option)
                          : option[this.labelProperty] || option,
                      $model: option,
                      $value: option[this.valueProperty] || option
                  };
                  var view = UIInternal.compileTemplate(tpl, model);
                  view.appendNodesTo(el);
              }
              return true;
          };
          ListMaker.prototype.checkKeyEvent = function ($event) {
              var _this = this;
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
                  UIInternal.queueTask(function () {
                      var selected = _this.listContainer.querySelector(".ui-list__item--hilight");
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
          };
          ListMaker.prototype.fetchOptions = function (query) {
              return __awaiter(this, void 0, void 0, function () {
                  var result;
                  return __generator(this, function (_a) {
                      switch (_a.label) {
                          case 0:
                              this.showLoading();
                              return [4, this.query({ query: query })];
                          case 1:
                              result = _a.sent();
                              if (!this.options) {
                                  this.options = result;
                              }
                              this.buildOptions(result || []);
                              return [2];
                      }
                  });
              });
          };
          ListMaker.prototype.showLoading = function () {
              var _this = this;
              this.isLoaded = false;
              this.isLoading = true;
              this.innerOptions = [];
              if (this.dropEl) {
                  UIInternal.queueMicroTask(function () { return _this.dropEl.updatePosition(); });
              }
          };
          ListMaker.prototype.buildOptions = function (options, silent) {
              var _this = this;
              if (silent === void 0) { silent = false; }
              if (!silent) {
                  this.showLoading();
              }
              var optionsClone = options.map(function (o) { return (isString(o) ? "" + o : __assign({}, o)); });
              UIInternal.queueTask(function () {
                  _this.isLoading = false;
                  if (_this.groupProperty) {
                      var groups = optionsClone
                          .sortBy([_this.groupProperty, _this.labelProperty])
                          .groupBy(_this.groupProperty);
                      groups.forEach(function (items, label) {
                          var _a;
                          return (_a = _this.innerOptions).push.apply(_a, __spread([{ __type: "group", label: label }], items));
                      });
                  }
                  else {
                      _this.innerOptions = optionsClone.sortBy(_this.labelProperty);
                  }
                  _this.isLoaded = true;
                  UIInternal.queueTask(function () {
                      var selected = _this.listContainer.querySelector(".ui-list__item--selected");
                      if (selected) {
                          selected.scrollIntoView({ block: "nearest" });
                      }
                  });
                  if (_this.dropEl) {
                      UIInternal.queueTask(function () { return _this.dropEl.updatePosition(); });
                  }
              });
          };
          ListMaker.prototype.markOption = function (option) {
              var lbl = option[this.labelProperty] || "" + option;
              if (isEmpty(this.inputValue)) {
                  return lbl;
              }
              var rx = new RegExp(this.inputValue, "i");
              var asc = lbl.toString().ascii();
              if (rx.test(asc)) {
                  var start = asc.search(rx);
                  lbl =
                      lbl.substr(0, start) +
                          "<u>" +
                          lbl.substr(start, this.inputValue.length) +
                          "</u>" +
                          lbl.substr(start + this.inputValue.length);
              }
              return lbl;
          };
          return ListMaker;
      }(BaseInput));

      var view$3 = "<template class=\"ui-input ui-list ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper model.bind=\"$this\">\n    <slot></slot>\n    <list-input></list-input>\n    <div class=\"ui-list__container\" ref=\"listContainer\" css.bind=\"{height}\">\n      <list-container></list-container>\n    </div>\n  </input-wrapper>\n</template>\n";

      var UIList = (function (_super) {
          __extends(UIList, _super);
          function UIList(element) {
              var _this = _super.call(this, element) || this;
              _this.element = element;
              _this.value = undefined;
              _this.model = undefined;
              _this.name = "";
              _this.height = "20em";
              _this.placeholder = "";
              _this.labelProperty = "";
              _this.valueProperty = "";
              _this.groupProperty = "";
              _this.readonly = false;
              _this.disabled = false;
              _this.noOptionsText = "No Options";
              _this.multiple = element.hasAttribute("multiple");
              _this.allowAny = element.hasAttribute("allow-any");
              _this.template = _this.element.querySelector("template");
              return _this;
          }
          UIList.prototype.bind = function () {
              var _this = this;
              if (!isNull(this.model)) {
                  if (this.multiple) {
                      this.value = this.multiple
                          ? this.model.map(function (o) { return o[_this.valueProperty] || o; })
                          : this.model[this.labelProperty] || this.model;
                  }
              }
              this.isGrouped = !!this.groupProperty;
              this.valueChanged();
          };
          UIList.prototype.attached = function () {
              this.loadOptions();
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
          return UIList;
      }(ListMaker));

      var view$4 = "<template class=\"ui-input ${classes}\" aria-disabled.bind=\"disabled || isDisabled\" aria-readonly.bind=\"readonly\">\n  <input-wrapper>\n    <slot></slot>\n    <list-input></list-input>\n  </input-wrapper>\n  <ui-drop view-model.ref=\"dropEl\" class=\"ui-list\" close.trigger=\"resetQuery()\">\n    <div ref=\"listContainer\" class=\"ui-list__container\">\n      <list-container></list-container>\n    </div>\n  </ui-drop>\n</template>\n";

      var UISelect = (function (_super) {
          __extends(UISelect, _super);
          function UISelect(element) {
              var _this = _super.call(this, element) || this;
              _this.element = element;
              _this.value = undefined;
              _this.model = undefined;
              _this.name = "";
              _this.placeholder = "";
              _this.labelProperty = "";
              _this.valueProperty = "";
              _this.groupProperty = "";
              _this.readonly = false;
              _this.disabled = false;
              _this.noOptionsText = "No Options";
              _this.dropHandle = "caret";
              _this.multiple = element.hasAttribute("multiple");
              _this.allowAny = element.hasAttribute("allow-any");
              _this.template = _this.element.querySelector("template");
              return _this;
          }
          UISelect.prototype.attached = function () {
              this.dropEl.attachToViewport = isTrue(this.element.getAttribute("attach-to-viewport"));
              this.dropEl.closeOnClick = !this.multiple;
              this.dropEl.tether(this.element);
          };
          UISelect.prototype.bind = function () {
              var _this = this;
              if (!isNull(this.model)) {
                  if (this.multiple) {
                      this.value = this.multiple
                          ? this.model.map(function (o) { return o[_this.valueProperty] || o; })
                          : this.model[this.labelProperty] || this.model;
                  }
              }
              this.isGrouped = !!this.groupProperty;
              this.valueChanged();
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
          return UISelect;
      }(ListMaker));

      var Lists = exports('Lists', [UIList, UISelect, UIDropdown]);

    }
  };
});
//# sourceMappingURL=ui-lists.js.map
