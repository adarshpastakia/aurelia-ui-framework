import { computedFrom, bindable, inlineView, bindingMode, customElement, viewResources } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { a as UIInternal } from './chunk2.js';
import { a as __decorate, b as __metadata } from './chunk3.js';

let NODE_ID = 0;
class UITreeModel {
    constructor(children, maxNodes = 0) {
        this.maxNodes = maxNodes;
        this.children = [];
        this.nodes = [];
        this.children = children.map(child => new UITreeNode(child));
        this.nodes = this.getExpandedTree(this.children.sortBy("label"));
    }
    filter(query) {
        const filtered = this.filterNodes(this.children, query);
        this.nodes = this.getExpandedTree(filtered.sortBy("label"));
    }
    toggleExpand(index) {
        const node = this.nodes[index];
        node.expanded = !node.expanded;
        if (node.expanded) {
            let injectedChildren = node.children.sortBy("label");
            if (injectedChildren.length === 0) {
                injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
            }
            if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                injectedChildren = [
                    ...injectedChildren.slice(0, this.maxNodes),
                    new UITreeNode({ id: "node-more", leaf: true }, node)
                ];
            }
            this.nodes = [
                ...this.nodes.slice(0, index + 1),
                ...injectedChildren,
                ...this.nodes.slice(index + 1)
            ];
        }
        else {
            let lastIndex = this.nodes.lastIndex(node.id, "parentId");
            while (this.nodes[lastIndex].expanded) {
                lastIndex = this.nodes.lastIndex(this.nodes[lastIndex].id, "parentId");
            }
            this.nodes = [...this.nodes.slice(0, index + 1), ...this.nodes.slice(lastIndex + 1)];
        }
    }
    toggleMore(index) {
        const node = this.nodes[index];
        node.showingMore = !node.showingMore;
        const parentIndex = this.nodes.index(node.parentId, "id");
        let injectedChildren = this.nodes[parentIndex].children.sortBy("label");
        if (!node.showingMore) {
            if (injectedChildren.length === 0) {
                injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
            }
            if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                injectedChildren = [...injectedChildren.slice(0, this.maxNodes)];
            }
        }
        this.nodes = [
            ...this.nodes.slice(0, parentIndex + 1),
            ...injectedChildren,
            this.nodes[index],
            ...this.nodes.slice(index + 1)
        ];
    }
    getChecked() {
        const checked = [];
        this.getCheckedNodes(this.children, checked);
        return checked;
    }
    getCheckedNodes(nodes, checked) {
        nodes.forEach(node => {
            if (node.checked === 1) {
                checked.push(node);
            }
            if (node.children) {
                this.getCheckedNodes(node.childNodes, checked);
            }
        });
    }
    getExpandedTree(children) {
        const nodes = [];
        children.forEach(child => {
            nodes.push(child);
            if (child.expanded) {
                let injectedChildren = child.children.sortBy("label");
                if (injectedChildren.length === 0) {
                    injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, child));
                }
                if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                    injectedChildren = [
                        ...injectedChildren.slice(0, this.maxNodes),
                        new UITreeNode({ id: "node-more", leaf: true }, child)
                    ];
                }
                nodes.push(...this.getExpandedTree(injectedChildren));
            }
        });
        return nodes;
    }
    filterNodes(nodes, query) {
        return nodes.filter(child => {
            let retVal = !query ||
                child.label
                    .ascii()
                    .toLocaleLowerCase()
                    .includes(query.ascii().toLocaleLowerCase());
            if (!child.leaf) {
                child.filtered = this.filterNodes(child.childNodes, query);
                retVal = retVal || child.filtered.length > 0;
            }
            return retVal;
        });
    }
}
class UITreeNode {
    constructor(node, parent) {
        this.parent = parent;
        this.childNodes = [];
        this.filtered = null;
        this.level = 0;
        this.checked = 0;
        this.id = node.id || `node__${NODE_ID++}`;
        this.label = node.label;
        this.model = node.model;
        this.icon = node.icon;
        this.iconOpen = node.iconOpen;
        this.iconClosed = node.iconClosed;
        this.leaf = !!node.leaf;
        this.expanded = node.expanded;
        this.disabled = node.disabled;
        if (parent) {
            this.level = parent.level + 1;
            this.parentId = parent.id;
        }
        if (node.children) {
            this.childNodes = node.children.map(child => new UITreeNode(child, this));
        }
    }
    get nodeIcon() {
        return (this.leaf ? this.icon : this.expanded ? this.iconOpen : this.iconClosed) || this.icon;
    }
    get checkIcon() {
        return this.checked === 2
            ? "tree-check-half"
            : this.checked
                ? "tree-check-on"
                : "tree-check-off";
    }
    get expandIcon() {
        return this.expanded ? "tree-collapse" : "tree-expand";
    }
    get children() {
        return this.filtered || this.childNodes;
    }
    toggleCheck() {
        this.checked = this.checked ? 0 : 1;
        this.children.forEach((c) => {
            c.updateChild("checked", this.checked);
        });
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    }
    updatePartial() {
        const allChecked = this.children.every(node => node.checked === 1);
        const allUnchecked = this.children.every(node => node.checked === 0);
        this.checked = allChecked ? 1 : allUnchecked ? 0 : 2;
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    }
    updateChild(prop, v) {
        this[prop] = v;
        this.children.forEach((c) => {
            c.updateChild(prop, v);
        });
    }
}
__decorate([
    computedFrom("leaf", "icon", "expanded", "iconOpen", "iconClosed"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UITreeNode.prototype, "nodeIcon", null);
__decorate([
    computedFrom("checked"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UITreeNode.prototype, "checkIcon", null);
__decorate([
    computedFrom("expanded"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UITreeNode.prototype, "expandIcon", null);

var view = "<template class=\"ui-tree__node ${isSelected ? 'ui-tree--selected':''}\">\n  <div class=\"ui-tree__spacer\" repeat.for=\"i of node.level\"></div>\n  <template if.bind=\"node.id !== 'node-more' && node.id !== 'node-empty'\">\n    <div class=\"ui-tree__expander\" click.trigger=\"tree.toggleExpand(index)\" if.bind=\"!node.leaf\">\n      <ui-svg-icon icon.bind=\"node.expandIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__checkbox\" click.trigger=\"tree.toggleCheck(node)\" if.bind=\"tree.checkable !== false && node.level >= tree.checkable\">\n      <ui-svg-icon icon.bind=\"node.checkIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__icon\">\n      <ui-svg-icon if.bind=\"node.loading\" icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      <ui-icon else class.bind=\"node.nodeIcon\"></ui-icon>\n    </div>\n    <div class=\"ui-tree__label\" click.trigger=\"tree.select(node)\">${node.label}</div>\n  </template>\n  <template if.bind=\"node.id === 'node-more'\">\n    <a class=\"ui-tree__show-more\" click.trigger=\"tree.toggleMore(index)\">\n      <span if.bind=\"node.showingMore\">${tree.labelLess}</span>\n      <span else>${tree.labelMore}</span>\n    </a>\n  </template>\n  <template if.bind=\"node.id === 'node-empty'\">\n    <div class=\"ui-tree__no-children\" ui-color=\"gray\">${tree.labelEmpty}</div>\n  </template>\n</template>\n";

let TreeNode = class TreeNode {
    get isSelected() {
        return this.tree.value === this.node.id;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", UITreeNode)
], TreeNode.prototype, "node", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], TreeNode.prototype, "index", void 0);
__decorate([
    bindable(),
    __metadata("design:type", UITreePanel)
], TreeNode.prototype, "tree", void 0);
__decorate([
    computedFrom("tree.value", "node.id"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], TreeNode.prototype, "isSelected", null);
TreeNode = __decorate([
    inlineView(view)
], TreeNode);

let UITreePanel = class UITreePanel {
    constructor(element) {
        this.element = element;
        this.value = undefined;
        this.model = undefined;
        this.labelSearch = "Search...";
        this.labelEmpty = "No Items";
        this.labelLess = "Show Less...";
        this.labelMore = "Show More...";
        this.checkable = false;
        this.searchable = false;
        this.checkable = element.hasAttribute("checkable");
        this.searchable = element.hasAttribute("searchable");
    }
    select(node) {
        if (this.checkable !== false) {
            if (node.level >= this.checkable) {
                node.toggleCheck();
                this.getCheckedValues();
                this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
            }
        }
        else {
            return UIInternal.fireCallbackEvent(this, "beforeselect").then(b => b ? this.changeSelection(node) : false);
        }
    }
    bind() {
        this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
    }
    dataSourceChanged() {
        this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
    }
    toggleExpand(index) {
        this.rootNode.toggleExpand(index);
    }
    toggleMore(index) {
        this.rootNode.toggleMore(index);
    }
    toggleCheck(node) {
        node.toggleCheck();
        this.getCheckedValues();
        this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
    }
    getCheckedValues() {
        this.value = [];
        this.model = [];
        this.rootNode.getChecked().forEach(checkedNode => {
            if (checkedNode.level >= this.checkable) {
                this.value.push(checkedNode.id);
                this.model.push(checkedNode.model);
            }
        });
    }
    searchTextChanged(query) {
        this.rootNode.filter(query);
    }
    changeSelection(node) {
        this.value = node.id;
        this.model = node.model;
        this.element.dispatchEvent(UIInternal.createEvent("select", this.value));
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UITreePanel.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UITreePanel.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Array)
], UITreePanel.prototype, "dataSource", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITreePanel.prototype, "labelSearch", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITreePanel.prototype, "labelEmpty", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITreePanel.prototype, "labelLess", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UITreePanel.prototype, "labelMore", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Number)
], UITreePanel.prototype, "maxNodes", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITreePanel.prototype, "checkable", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UITreePanel.prototype, "searchable", void 0);
UITreePanel = __decorate([
    customElement("ui-tree-panel"),
    viewResources(TreeNode),
    inlineView(`<template class="ui-tree__panel"><ui-field nolabel class="ui-tree__search" if.bind="searchable">
  <ui-input type="search" placeholder="\${labelSearch}" value.bind="searchText" 
  clear.trigger="searchTextChanged()" input.trigger="searchTextChanged(searchText) & debounce:200">
    <ui-input-addon class="ui-text-muted"><ui-icon icon="mdi mdi-magnify"></ui-icon></ui-input-addon></ui-input></ui-field>
  <div class="ui-tree__container" nodeclick.delegate="itemClicked($event.detail)" nodeover.delegate="itemOver($event.detail)" nodeout.delegate="itemOut($event.detail)">
    <tree-node virtual-repeat.for="child of rootNode.nodes" node.bind="child" tree.bind="$parent" index.bind="$index"></tree-node>
  </div></template>`),
    __metadata("design:paramtypes", [Element])
], UITreePanel);

const DataPanels = [UITreePanel];

export { DataPanels };
//# sourceMappingURL=ui-data-panels.js.map
