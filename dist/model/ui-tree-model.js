var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    function UITreeModel(model, parent) {
        var _this = this;
        this.parent = parent;
        this.children = [];
        this.checked = 0;
        this.id = model.id || "node__" + NODE_ID++;
        this.label = model.label;
        this.icon = model.icon;
        this.iconOpen = model.iconOpen;
        this.iconClosed = model.iconClosed;
        this.leaf = model.leaf;
        this.disabled = model.disabled;
        if (model.children) {
            this.children = model.children.map(function (child) { return new UITreeModel(child, _this); });
        }
    }
    Object.defineProperty(UITreeModel.prototype, "nodeIcon", {
        get: function () {
            return (this.leaf ? this.icon : this.expanded ? this.iconOpen : this.iconClosed) || this.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UITreeModel.prototype, "checkIcon", {
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
    Object.defineProperty(UITreeModel.prototype, "expandIcon", {
        get: function () {
            return this.expanded ? "tree-collapse" : "tree-expand";
        },
        enumerable: true,
        configurable: true
    });
    UITreeModel.prototype.toggleCheck = function () {
        var _this = this;
        this.checked = this.checked ? 0 : 1;
        this.children.forEach(function (c) {
            c.updateChild("checked", _this.checked);
        });
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    };
    UITreeModel.prototype.updatePartial = function () {
        var allChecked = this.children.every(function (node) { return node.checked === 1; });
        var allUnchecked = this.children.every(function (node) { return node.checked === 0; });
        this.checked = allChecked ? 1 : allUnchecked ? 0 : 2;
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    };
    UITreeModel.prototype.updateChild = function (prop, v) {
        this[prop] = v;
        this.children.forEach(function (c) {
            c.updateChild(prop, v);
        });
    };
    __decorate([
        computedFrom("leaf", "icon", "expanded", "iconOpen", "iconClosed"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UITreeModel.prototype, "nodeIcon", null);
    __decorate([
        computedFrom("checked"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UITreeModel.prototype, "checkIcon", null);
    __decorate([
        computedFrom("expanded"),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], UITreeModel.prototype, "expandIcon", null);
    return UITreeModel;
}());
export { UITreeModel };
