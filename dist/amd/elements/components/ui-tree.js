var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "../../utils/ui-tree-model", "../../utils/ui-event", "lodash"], function (require, exports, aurelia_framework_1, ui_tree_model_1, ui_event_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UITree = (function () {
        function UITree(element) {
            this.element = element;
            this.value = '';
            this.hover = '';
            this.model = [];
            this.options = new ui_tree_model_1.UITreeOptions();
            this.searchText = '';
            this.selectedNode = {};
            this.searchable = false;
            this.ignoreChange = false;
            if ((this.searchable = element.hasAttribute('searchable')))
                element.classList.add('has-search');
        }
        UITree.prototype.bind = function (bindingContext, overrideContext) {
            this.modelChanged(this.model || []);
            this.valueChanged(this.value);
        };
        UITree.prototype.valueChanged = function (newValue) {
            var _this = this;
            if (this.ignoreChange)
                return;
            if (!this.options.showCheckbox) {
                if (this.selectedNode) {
                    var p = this.selectedNode;
                    p.active = false;
                    do {
                        p.childActive = false;
                    } while (p = p.parent);
                }
                this.selectedNode = this.findNode(this.root.children, newValue, 'active', true, true);
            }
            else {
                if (isEmpty(newValue))
                    return;
                _.forEach(this.root.children, function (n) { return n.isChecked = false; });
                if (newValue)
                    _.forEach((newValue || '').split(','), function (v) { return _this.findNode(_this.root.children, v, 'checked', true, true); });
            }
        };
        UITree.prototype.optionsChanged = function (newValue) {
            var _this = this;
            this.ignoreChange = true;
            if (newValue.showCheckbox) {
                var nodes = this.getChecked(this.root.children);
                this.value = nodes.checked.join(',');
            }
            else {
                if (this.selectedNode)
                    this.value = this.selectedNode.value;
            }
            ui_event_1.UIEvent.queueTask(function () { return _this.ignoreChange = false; });
        };
        UITree.prototype.modelChanged = function (newValue) {
            this.root = new ui_tree_model_1.UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
                id: '',
                name: this.options.rootLabel,
                children: newValue
            }, null);
            if (this.options.showCheckbox) {
                var nodes = this.getChecked(this.root.children);
                this.value = nodes.checked.join(',');
            }
            else {
                if (this.selectedNode)
                    this.value = this.selectedNode.value;
            }
        };
        Object.defineProperty(UITree.prototype, "rootNodes", {
            get: function () {
                return this.options.showRoot ? [this.root] : this.root.children;
            },
            enumerable: true,
            configurable: true
        });
        UITree.prototype.getChecked = function (nodes, retVal) {
            if (retVal === void 0) { retVal = { checked: [], partial: [], unchecked: [] }; }
            var self = this;
            _.forEach(nodes || this.root.children, function (n) {
                if (n.checked == 2)
                    retVal.partial.push(n.id);
                if (n.checked == 1)
                    retVal.checked.push(n.id);
                if (n.checked == 0)
                    retVal.unchecked.push(n.id);
                if (_.isArray(n.children))
                    self.getChecked(n.children, retVal);
            });
            return retVal;
        };
        UITree.prototype.getCheckedTree = function (nodes) {
            var self = this, retVal = [];
            _.forEach(nodes || this.root.children, function (n) {
                if (n.checked == 1 && n.leaf) {
                    retVal.push(n.data);
                }
                if (n.checked != 0 && !n.leaf) {
                    var node = n.data;
                    node.children = self.getCheckedTree(n.children);
                    retVal.push(node);
                }
            });
            return retVal;
        };
        UITree.prototype.expandAll = function () {
            this.root.expandToggle(true);
        };
        UITree.prototype.collapseAll = function () {
            this.root.expandToggle(false);
        };
        UITree.prototype.findNode = function (obj, id, field, value, expand) {
            if (value === void 0) { value = true; }
            if (expand === void 0) { expand = false; }
            var self = this;
            return _.find(obj, function (n) {
                var found = n.id == id;
                if (!found && _.isArray(n.children)) {
                    found = !_.isEmpty(self.findNode(n.children, id, field, value));
                    if (expand && found)
                        n.expanded = true;
                }
                else if (found) {
                    if (field == 'active')
                        self.itemSelect(n);
                    if (field == 'expanded')
                        n.expanded = value;
                    if (field == 'checked')
                        n.isChecked = value ? 1 : 0;
                }
                return found;
            });
        };
        UITree.prototype.itemSelect = function (node) {
            var _this = this;
            if (ui_event_1.UIEvent.fireEvent('beforeselect', this.element, node)) {
                var p = void 0;
                this.ignoreChange = true;
                if (this.selectedNode) {
                    (p = this.selectedNode).active = false;
                    while (p = p.parent)
                        p.childActive = false;
                }
                (p = this.selectedNode = node).active = true;
                while (p = p.parent)
                    p.childActive = true;
                this.value = node.id;
                this.filter(this.root.children, this.searchText = '');
                this.scrollIntoView();
                ui_event_1.UIEvent.fireEvent('select', this.element, node);
                ui_event_1.UIEvent.queueTask(function () { return _this.ignoreChange = false; });
            }
        };
        UITree.prototype.itemChecked = function (node) {
            var _this = this;
            if (ui_event_1.UIEvent.fireEvent('beforechecked', this.element, node)) {
                this.ignoreChange = true;
                node.isChecked = !node.checked;
                var nodes = this.getChecked(this.root.children);
                this.value = nodes.checked.join(',');
                ui_event_1.UIEvent.fireEvent('checked', this.element, node);
                ui_event_1.UIEvent.queueTask(function () { return _this.ignoreChange = false; });
            }
        };
        UITree.prototype.itemClicked = function (node) {
            if (node.root)
                return;
            if (this.options.showCheckbox) {
                if (node.level >= this.options.checkboxLevel) {
                    this.itemChecked(node);
                }
                else {
                    node.expanded = !node.expanded;
                }
            }
            else if (node.level < this.options.selectionLevel) {
                node.expanded = !node.expanded;
            }
            else if (node.level >= this.options.selectionLevel) {
                this.itemSelect(node);
            }
        };
        UITree.prototype.itemOver = function (node) {
            this.hover = node.id;
        };
        UITree.prototype.itemOut = function (node) {
            this.hover = null;
        };
        UITree.prototype.scrollIntoView = function () {
            var _this = this;
            ui_event_1.UIEvent.queueTask(function () {
                var x;
                if ((x = _this.element.querySelector('.ui-active')) !== null)
                    x.scrollIntoView(false);
            });
        };
        UITree.prototype.searchTextChanged = function (newValue) {
            this.filter(this.root.children, newValue);
        };
        UITree.prototype.filter = function (obj, value, parentVisible) {
            if (parentVisible === void 0) { parentVisible = false; }
            var self = this, ret = false, rx = new RegExp(getAscii(value), 'gi');
            _.forEach(obj, function (n) {
                n.text = n.text.replace(/<b>/gi, '')
                    .replace(/<\/b>/gi, '');
                n.expanded = !_.isEmpty(value) && n.level <= 2 && parentVisible === false;
                if (_.isEmpty(value) && self.selectedNode.id == n.id && self.selectedNode.level == n.level) {
                    var p = n.parent;
                    while (p) {
                        p.expanded = true;
                        p = p.parent;
                    }
                }
                var match = rx.test(getAscii(n.text));
                if (!_.isEmpty(value) && match) {
                    n.parent.expanded = true;
                    var start = getAscii(n.text).search(rx);
                    var name_1 = n.text.substr(0, start + value.length) + '</b>' + n.text.substr(start + value.length);
                    n.text = name_1.substr(0, start) + '<b>' + name_1.substr(start);
                }
                n.isVisible = n.children.length > 0 ? self.filter(n.children, value, match || parentVisible) : (match || parentVisible);
                ret = ret || n.isVisible;
            });
            return ret;
        };
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITree.prototype, "value", void 0);
        __decorate([
            aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
            __metadata("design:type", Object)
        ], UITree.prototype, "hover", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UITree.prototype, "model", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", ui_tree_model_1.UITreeOptions)
        ], UITree.prototype, "options", void 0);
        __decorate([
            aurelia_framework_1.computedFrom('root'),
            __metadata("design:type", Object),
            __metadata("design:paramtypes", [])
        ], UITree.prototype, "rootNodes", null);
        UITree = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tree-panel\"><ui-input-group class=\"ui-tree-search\" if.bind=\"searchable\">\n  <ui-input type=\"search\" t=\"[placeholder]Search\" placeholder=\"${options.labels.search}\" clear value.bind=\"searchText\" input.trigger=\"searchTextChanged(searchText) & debounce:200\"><ui-input-addon class=\"ui-text-muted\" glyph=\"glyph-search\"></ui-input-addon></ui-input></ui-input-group>\n  <div class=\"ui-tree-level\">\n    <tree-node repeat.for=\"child of root.children | sort:'name'\" node.bind=\"child\" options.bind=\"options\" nodeclick.delegate=\"itemClicked($event.detail)\" nodeover.delegate=\"itemOver($event.detail)\" nodeout.delegate=\"itemOut($event.detail)\"></tree-node>\n  </div></template>"),
            aurelia_framework_1.customElement('ui-tree'),
            __metadata("design:paramtypes", [Element])
        ], UITree);
        return UITree;
    }());
    exports.UITree = UITree;
    var TreeNode = (function () {
        function TreeNode(element) {
            this.element = element;
            this.hideByCount = true;
        }
        Object.defineProperty(TreeNode.prototype, "canHideByCount", {
            get: function () {
                return this.options.maxCount > 0 && this.node.children.length > this.options.maxCount;
            },
            enumerable: true,
            configurable: true
        });
        TreeNode.prototype.fireClicked = function () {
            ui_event_1.UIEvent.fireEvent('nodeclick', this.element, this.node);
        };
        TreeNode.prototype.doMouseOver = function () {
            ui_event_1.UIEvent.fireEvent('nodeover', this.element, this.node);
        };
        TreeNode.prototype.doMouseOut = function () {
            ui_event_1.UIEvent.fireEvent('nodeout', this.element, this.node);
        };
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", ui_tree_model_1.UITreeModel)
        ], TreeNode.prototype, "node", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", ui_tree_model_1.UITreeOptions)
        ], TreeNode.prototype, "options", void 0);
        TreeNode = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-tree-item\">\n    <div class=\"ui-tree-item-link ${node.disabled?'ui-disabled':''}\" if.bind=\"node.isVisible\">\n        <a class=\"ui-expander ${node.expanded?'expanded':''}\" if.bind=\"!node.leaf\" click.trigger=\"[node.expanded=!node.expanded, hideByCount=true]\">\n            <ui-glyph glyph.bind=\"node.expanded?'glyph-tree-collapse':'glyph-tree-expand'\"></ui-glyph>\n        </a>\n        <a class=\"ui-node-checkbox\" if.bind=\"options.showCheckbox && node.level>=options.checkboxLevel\" click.trigger=\"fireClicked()\">\n          <ui-glyph glyph.bind=\"node.checked==1?'glyph-tree-check-on':(node.checked==2?'glyph-tree-check-partial':'glyph-tree-check-off')\"></ui-glyph>\n        </a>\n        <a class=\"ui-node-link ${!options.showCheckbox && node.active?'ui-active':node.childActive?'ui-partial':''}\" data-id=\"${node.id}\" click.trigger=\"fireClicked()\" mouseover.delegate=\"doMouseOver($event)\" mouseout.delegate=\"doMouseOut($event)\">\n            <ui-glyph glyph.bind=\"(node.expanded?node.openIcon:node.closedIcon)||node.icon\" class.bind=\"(node.expanded?node.openIcon:node.closedIcon)||node.icon\" if.bind=\"node.icon||node.openIcon\"></ui-glyph>\n            <span innerhtml.bind=\"node.text\" class=\"${node.level<options.checkboxLevel && node.checked!=0?'ui-strong':''}\"></span>\n        </a>\n    </div>\n    <div class=\"ui-tree-level\" if.bind=\"node.isVisible && !node.leaf && node.expanded\">\n        <tree-node repeat.for=\"child of node.children | sort:'name'\" if.bind=\"!(canHideByCount && hideByCount && $index>=options.maxCount)\" node.bind=\"child\" options.bind=\"options\"></tree-node>\n        <div>\n        <div if.bind=\"node.children && node.children.length==0\" class=\"ui-font-small ui-text-muted\" t=\"No Items\">${options.labels.noitems}</div>\n        <a class=\"ui-font-small ui-strong\" click.trigger=\"hideByCount=false\" if.bind=\"canHideByCount && hideByCount\" t=\"More\">${options.labels.more}</a>\n        <a class=\"ui-font-small ui-strong\" click.trigger=\"hideByCount=true\" if.bind=\"canHideByCount && !hideByCount\" t=\"Less\">${options.labels.less}</a>\n        </div>\n    </div>\n</template>"),
            __metadata("design:paramtypes", [Element])
        ], TreeNode);
        return TreeNode;
    }());
    exports.TreeNode = TreeNode;
});
