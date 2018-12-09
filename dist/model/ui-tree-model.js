var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
import { computedFrom } from "aurelia-framework";
var NODE_ID = 0;
var UITreeModel = /** @class */ (function () {
    function UITreeModel(children, maxNodes) {
        if (maxNodes === void 0) { maxNodes = 0; }
        this.maxNodes = maxNodes;
        this.children = [];
        this.nodes = [];
        this.children = children.map(function (child) { return new UITreeNode(child); });
        this.nodes = this.getExpandedTree(this.children.sortBy("label"));
    }
    UITreeModel.prototype.toggleExpand = function (index) {
        var node = this.nodes[index];
        node.expanded = !node.expanded;
        if (node.expanded) {
            var injectedChildren = node.children.sortBy("label");
            if (injectedChildren.length === 0) {
                injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
            }
            if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                injectedChildren = __spread(injectedChildren.slice(0, this.maxNodes), [
                    new UITreeNode({ id: "node-more", leaf: true }, node)
                ]);
            }
            this.nodes = __spread(this.nodes.slice(0, index + 1), injectedChildren, this.nodes.slice(index + 1));
        }
        else {
            var lastIndex = this.nodes.lastIndex(node.id, "parentId");
            while (this.nodes[lastIndex].expanded) {
                lastIndex = this.nodes.lastIndex(this.nodes[lastIndex].id, "parentId");
            }
            this.nodes = __spread(this.nodes.slice(0, index + 1), this.nodes.slice(lastIndex + 1));
        }
    };
    UITreeModel.prototype.toggleMore = function (index) {
        var node = this.nodes[index];
        node.showingMore = !node.showingMore;
        var parentIndex = this.nodes.index(node.parentId, "id");
        var injectedChildren = this.nodes[parentIndex].children.sortBy("label");
        if (!node.showingMore) {
            if (injectedChildren.length === 0) {
                injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
            }
            if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                injectedChildren = __spread(injectedChildren.slice(0, this.maxNodes));
            }
            this.nodes = __spread(this.nodes.slice(0, parentIndex + 1), injectedChildren, [
                this.nodes[index]
            ], this.nodes.slice(index + 1));
        }
        else {
            this.nodes = __spread(this.nodes.slice(0, parentIndex + 1), injectedChildren, [
                this.nodes[index]
            ], this.nodes.slice(index + 1));
        }
    };
    UITreeModel.prototype.getChecked = function () {
        var checked = [];
        this.getCheckedNodes(this.children, checked);
        return checked;
    };
    UITreeModel.prototype.getCheckedNodes = function (nodes, checked) {
        var _this = this;
        nodes.forEach(function (node) {
            if (node.checked === 1) {
                checked.push(node);
            }
            if (node.children) {
                _this.getCheckedNodes(node.children, checked);
            }
        });
    };
    UITreeModel.prototype.getExpandedTree = function (children) {
        var _this = this;
        var nodes = [];
        children.forEach(function (child) {
            nodes.push(child);
            if (child.expanded) {
                var injectedChildren = child.children.sortBy("label");
                if (injectedChildren.length === 0) {
                    injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, child));
                }
                if (_this.maxNodes > 0 && injectedChildren.length > _this.maxNodes) {
                    injectedChildren = __spread(injectedChildren.slice(0, _this.maxNodes), [
                        new UITreeNode({ id: "node-more", leaf: true }, child)
                    ]);
                }
                nodes.push.apply(nodes, __spread(injectedChildren));
            }
        });
        return nodes;
    };
    return UITreeModel;
}());
export { UITreeModel };
var UITreeNode = /** @class */ (function () {
    function UITreeNode(node, parent) {
        var _this = this;
        this.parent = parent;
        this.children = [];
        this.level = 0;
        this.checked = 0;
        this.id = node.id || "node__" + NODE_ID++;
        this.label = node.label;
        this.model = node.model;
        this.icon = node.icon;
        this.iconOpen = node.iconOpen;
        this.iconClosed = node.iconClosed;
        this.leaf = node.leaf;
        this.expanded = node.expanded;
        this.disabled = node.disabled;
        if (parent) {
            this.level = parent.level + 1;
            this.parentId = parent.id;
        }
        if (node.children) {
            this.children = node.children.map(function (child) { return new UITreeNode(child, _this); });
        }
    }
    Object.defineProperty(UITreeNode.prototype, "nodeIcon", {
        get: function () {
            return (this.leaf ? this.icon : this.expanded ? this.iconOpen : this.iconClosed) || this.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UITreeNode.prototype, "checkIcon", {
        get: function () {
            return this.checked === 2
                ? "tree-check-half"
                : this.checked
                    ? "tree-check-on"
                    : "tree-check-off";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UITreeNode.prototype, "expandIcon", {
        get: function () {
            return this.expanded ? "tree-collapse" : "tree-expand";
        },
        enumerable: true,
        configurable: true
    });
    UITreeNode.prototype.toggleCheck = function () {
        var _this = this;
        this.checked = this.checked ? 0 : 1;
        this.children.forEach(function (c) {
            c.updateChild("checked", _this.checked);
        });
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    };
    UITreeNode.prototype.updatePartial = function () {
        var allChecked = this.children.every(function (node) { return node.checked === 1; });
        var allUnchecked = this.children.every(function (node) { return node.checked === 0; });
        this.checked = allChecked ? 1 : allUnchecked ? 0 : 2;
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    };
    UITreeNode.prototype.updateChild = function (prop, v) {
        this[prop] = v;
        this.children.forEach(function (c) {
            c.updateChild(prop, v);
        });
    };
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
    return UITreeNode;
}());
export { UITreeNode };
