System.register(["aurelia-framework", "lodash"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var aurelia_framework_1, _, UITreeModel, UITreeOptions;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (_1) {
                _ = _1;
            }
        ],
        execute: function () {
            UITreeModel = (function () {
                function UITreeModel(level, maxLevels, checkLevel, model, parent) {
                    var _this = this;
                    this.children = [];
                    this.parent = null;
                    this.isVisible = true;
                    this.__checkLevel = 0;
                    this.id = model.id || ('node-' + (UITreeModel.seed++));
                    this.text = model.name || model.text;
                    this.level = level;
                    this.extra = model.extra;
                    this.icon = model.icon;
                    this.openIcon = model.openIcon;
                    this.closedIcon = model.closedIcon;
                    this.root = level == -1;
                    this.leaf = !model.children || level == maxLevels;
                    this.active = model.active || false;
                    this.expanded = model.expanded || false;
                    this.checked = model.checked ? 1 : 0;
                    this.parent = parent;
                    this.__checkLevel = checkLevel;
                    if (level < maxLevels && (model.children || []).length > 0) {
                        _.each(model.children, function (m) {
                            _this.children.push(new UITreeModel(level + 1, maxLevels, checkLevel, m, _this));
                        });
                    }
                    this.updatePartial();
                }
                Object.defineProperty(UITreeModel.prototype, "isChecked", {
                    set: function (v) {
                        this.checked = v = v ? 1 : 0;
                        _.forEach(this.children, function (c) {
                            c.updateChild('checked', v);
                        });
                        if (this.parent && this.parent.updatePartial) {
                            this.parent.updatePartial();
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UITreeModel.prototype, "data", {
                    get: function () {
                        return {
                            id: this.id,
                            text: this.text,
                            level: this.level,
                            extra: this.extra
                        };
                    },
                    enumerable: true,
                    configurable: true
                });
                UITreeModel.prototype.expandToggle = function (v) {
                    _.forEach(this.children, function (c) {
                        c.expanded = v;
                        if (v === false)
                            c.updateChild('expanded', false);
                    });
                };
                UITreeModel.prototype.updateChild = function (prop, v) {
                    this[prop] = v;
                    _.forEach(this.children, function (c) {
                        c.updateChild(prop, v);
                    });
                };
                UITreeModel.prototype.updatePartial = function () {
                    if (this.children && this.children.length > 0) {
                        var c = _.countBy(this.children, 'checked');
                        var v = 2;
                        if (!c[1] && !c[2]) {
                            v = 0;
                        }
                        if (!c[0] && !c[2]) {
                            v = 1;
                        }
                        this.checked = v;
                    }
                    if (this.parent && this.parent.updatePartial) {
                        this.parent.updatePartial();
                    }
                };
                Object.defineProperty(UITreeModel.prototype, "isLeaf", {
                    get: function () {
                        return this.leaf && !this.icon;
                    },
                    enumerable: true,
                    configurable: true
                });
                UITreeModel.seed = 0;
                __decorate([
                    aurelia_framework_1.computedFrom('leaf', 'icon'),
                    __metadata("design:type", Object),
                    __metadata("design:paramtypes", [])
                ], UITreeModel.prototype, "isLeaf", null);
                return UITreeModel;
            }());
            exports_1("UITreeModel", UITreeModel);
            UITreeOptions = (function () {
                function UITreeOptions(obj) {
                    if (obj === void 0) { obj = {}; }
                    this.maxLevels = 99;
                    this.maxCount = 0;
                    this.showCheckbox = false;
                    this.checkboxLevel = -1;
                    this.showRoot = false;
                    this.rootLabel = 'Root';
                    this.selectionLevel = -1;
                    this.labels = {
                        search: 'Search...',
                        more: 'More...',
                        less: 'Less...',
                        noitems: 'No Items'
                    };
                    Object.assign(this, obj);
                }
                return UITreeOptions;
            }());
            exports_1("UITreeOptions", UITreeOptions);
        }
    };
});
