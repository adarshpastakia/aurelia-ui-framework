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
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ui_treemodel_1 = require("../../data/ui-treemodel");
var ui_event_1 = require("../../utils/ui-event");
var _ = require("lodash");
var UITree = (function () {
    function UITree(element) {
        this.element = element;
        this.value = '';
        this.dataSource = null;
        this.labelSearch = 'Search...';
        this.labelNoitems = 'No items';
        this.labelMore = 'More...';
        this.labelLess = 'Less...';
        this.maxLevels = '99';
        this.checkLevel = '0';
        this.selectLevel = '0';
        this.maxNodes = '0';
        this.searchText = '';
        this.selectedNode = {};
        this.searchable = false;
        this.checkable = false;
        this.ignoreChange = false;
        this.checkable = element.hasAttribute('checkable');
        if (element.hasAttribute('show-lines'))
            element.classList.add('ui-lines');
        if ((this.searchable = element.hasAttribute('searchable')))
            element.classList.add('has-search');
    }
    UITree.prototype.valueChanged = function (newValue) {
        var _this = this;
        if (this.ignoreChange)
            return;
        if (!this.checkable) {
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
    UITree.prototype.expandAll = function () {
        this.root.expandToggle(true);
    };
    UITree.prototype.collapseAll = function () {
        this.root.expandToggle(false);
    };
    UITree.prototype.getChecked = function (nodes, retVal) {
        if (retVal === void 0) { retVal = { checked: [], partial: [], unchecked: [] }; }
        var self = this;
        _.forEach(nodes || this.dataSource.children, function (n) {
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
        _.forEach(nodes || this.dataSource.children, function (n) {
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
    UITree.prototype.itemClicked = function (node) {
        if (node.root)
            return;
        if (this.checkable) {
            if (node.level >= parseInt(this.checkLevel)) {
                this.itemChecked(node);
            }
            else {
                node.expanded = !node.expanded;
            }
        }
        else if (node.level < parseInt(this.selectLevel)) {
            node.expanded = !node.expanded;
        }
        else if (node.level >= parseInt(this.selectLevel)) {
            this.itemSelect(node);
        }
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
            var nodes = this.getChecked(this.dataSource.children);
            this.value = nodes.checked.join(',');
            ui_event_1.UIEvent.fireEvent('checked', this.element, node);
            ui_event_1.UIEvent.queueTask(function () { return _this.ignoreChange = false; });
        }
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
    UITree.prototype.scrollIntoView = function () {
        var _this = this;
        ui_event_1.UIEvent.queueTask(function () {
            var x;
            if ((x = _this.element.querySelector('.ui-active')) !== null)
                x.scrollIntoView(false);
        });
    };
    UITree.prototype.searchTextChanged = function (newValue) {
        this.filter(this.dataSource.children, newValue);
    };
    UITree.prototype.filter = function (obj, value, parentVisible) {
        if (parentVisible === void 0) { parentVisible = false; }
        var self = this, ret = false, rx = new RegExp(value.ascii(), 'gi');
        _.forEach(obj, function (n) {
            n.label = '';
            n.expanded = !_.isEmpty(value) && parentVisible === false;
            if (_.isEmpty(value) && self.selectedNode.id == n.id && self.selectedNode.level == n.level) {
                var p = n.parent;
                while (p) {
                    p.expanded = true;
                    p = p.parent;
                }
            }
            var match = rx.test(n.text.ascii());
            if (!_.isEmpty(value) && match) {
                n.parent.expanded = true;
                var start = n.text.ascii().search(rx);
                var name_1 = n.text.substr(0, start + value.length) + '</u>' + n.text.substr(start + value.length);
                n.label = name_1.substr(0, start) + '<u>' + name_1.substr(start);
            }
            n.isVisible = n.children.length > 0 ? self.filter(n.children, value, match) : (match);
            ret = ret || n.isVisible;
        });
        return ret;
    };
    __decorate([
        aurelia_framework_1.bindable({ defaultBindingMode: aurelia_framework_1.bindingMode.twoWay }),
        __metadata("design:type", Object)
    ], UITree.prototype, "value", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", ui_treemodel_1.UITreeModel)
    ], UITree.prototype, "dataSource", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "labelSearch", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "labelNoitems", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "labelMore", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "labelLess", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "maxLevels", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "checkLevel", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "selectLevel", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", Object)
    ], UITree.prototype, "maxNodes", void 0);
    UITree = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.inlineView("<template class=\"ui-tree-panel\"><ui-input-group class=\"ui-tree-search\" if.bind=\"searchable\">\n  <ui-input type=\"search\" t=\"[placeholder]Search\" placeholder=\"${labelSearch}\" clear value.bind=\"searchText\" input.trigger=\"searchTextChanged(searchText) & debounce:200\"><ui-input-addon class=\"ui-text-muted\" glyph=\"glyph-search\"></ui-input-addon></ui-input></ui-input-group>\n  <div class=\"ui-tree-container\" nodeclick.delegate=\"itemClicked($event.detail)\" nodeover.delegate=\"itemOver($event.detail)\" nodeout.delegate=\"itemOut($event.detail)\">\n    <tree-node repeat.for=\"child of dataSource.children | sort:'text'\" node.bind=\"child\" tree.bind=\"$parent\"></tree-node>\n  </div></template>"),
        aurelia_framework_1.customElement('ui-tree'),
        __metadata("design:paramtypes", [Element])
    ], UITree);
    return UITree;
}());
exports.UITree = UITree;
var TreeNode = (function () {
    function TreeNode(element) {
        this.element = element;
    }
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
        __metadata("design:type", UITree)
    ], TreeNode.prototype, "tree", void 0);
    __decorate([
        aurelia_framework_1.bindable(),
        __metadata("design:type", ui_treemodel_1.UITreeModel)
    ], TreeNode.prototype, "node", void 0);
    TreeNode = __decorate([
        aurelia_framework_1.autoinject(),
        aurelia_framework_1.containerless(),
        aurelia_framework_1.inlineView("<template><div class=\"ui-tree-node ${node.leaf?'ui-leaf':''}\" if.bind=\"node.isVisible\">\n    <div class=\"ui-node-label-row ${node.disabled?'ui-disabled':''}\">\n      <div class=\"ui-node-line ${i==node.level-1?'':'parent'}\" repeat.for=\"i of node.level\" if.bind=\"node.level>0\"></div>\n      <div if.bind=\"!node.leaf\" class=\"ui-node-expander\" click.trigger=\"node.expanded=!node.expanded\">\n        <ui-glyph glyph.bind=\"node.expanded?'glyph-tree-collapse':'glyph-tree-expand'\"></ui-glyph>\n      </div>\n      <div class=\"ui-node-checkbox\" if.bind=\"tree.checkable\" click.trigger=\"fireClicked()\">\n        <ui-glyph glyph.bind=\"node.checked==2?'glyph-tree-check-partial': (node.checked==1?'glyph-tree-check-on':'glyph-tree-check-off')\"></ui-glyph>\n      </div>\n      <div class=\"ui-node-label\" click.trigger=\"fireClicked()\">\n        <ui-glyph glyph.bind=\"node.icon\" if.bind=\"node.icon\"></ui-glyph>\n        <span innerhtml.bind=\"node.label || node.text\"></span>\n      </div>\n    </div>\n    <div class=\"ui-tree-children\" if.bind=\"!node.leaf && node.expanded\">\n      <tree-node node.bind=\"child\" repeat.for=\"child of node.children | sort:'text'\" tree.bind=\"tree\"></tree-node>\n    </div>\n    <div class=\"ui-tree-node\" if.bind=\"!node.leaf && node.expanded && node.children\">\n    <div class=\"ui-node-label-row last-info-line\">\n      <div class=\"ui-node-expander\" repeat.for=\"i of (node.level+1)\"></div>\n      <div class=\"ui-node-checkbox\" if.bind=\"tree.checkable\"></div>\n      <div>\n      <span class=\"ui-text-muted ui-font-small\" t=\"No Items\" if.bind=\"node.children.length==0\">${tree.labelNoitems}</span>\n      <a class=\"ui-font-small ui-strong\" click.trigger=\"hideByCount=false\" if.bind=\"canHideByCount && hideByCount\" t=\"More\">${tree.labelMore}</a>\n      <a class=\"ui-font-small ui-strong\" click.trigger=\"hideByCount=true\" if.bind=\"canHideByCount && !hideByCount\" t=\"Less\">${tree.labelLess}</a>\n    </div></div></div>\n</template>"),
        __metadata("design:paramtypes", [Element])
    ], TreeNode);
    return TreeNode;
}());
exports.TreeNode = TreeNode;
