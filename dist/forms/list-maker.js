var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { UIInternal } from "../utils/ui-internal";
import { BaseInput } from "./base-input";
var KEY_DOWN = 40;
var KEY_UP = 38;
var BACKSPACE = 8;
var ENTER = 13;
var ListMaker = /** @class */ (function (_super) {
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
            this.value = this.value
                ? __spread(this.value, [model[this.valueProperty] || model]) : [model[this.valueProperty] || model];
            this.model = this.model ? __spread(this.model, [model]) : [model];
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
        }
        if (this.dropEl) {
            this.dropEl.closeDrop();
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
    ListMaker.prototype.fetchOptions = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.showLoading();
                        return [4 /*yield*/, this.query({ query: query })];
                    case 1:
                        result = _a.sent();
                        if (!this.options) {
                            this.options = result;
                        }
                        this.buildOptions(result || []);
                        return [2 /*return*/];
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
                $value: option[this.labelProperty] || option
            };
            if (isObject(option)) {
                Object.assign(model, option);
            }
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
    return ListMaker;
}(BaseInput));
export { ListMaker };
