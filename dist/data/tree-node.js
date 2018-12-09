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
import { autoinject, bindable, computedFrom } from "aurelia-framework";
import { UITreeNode } from "../model/ui-tree-model";
import { UITreePanel } from "./ui-tree-panel";
var TreeNode = /** @class */ (function () {
    function TreeNode() {
    }
    Object.defineProperty(TreeNode.prototype, "isSelected", {
        get: function () {
            return this.tree.value === this.node.id;
        },
        enumerable: true,
        configurable: true
    });
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
        autoinject()
    ], TreeNode);
    return TreeNode;
}());
export { TreeNode };
