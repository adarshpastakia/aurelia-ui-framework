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
import { autoinject, bindable, customElement, inlineView, PLATFORM, viewResources } from "aurelia-framework";
import { UITreeModel } from "../model/ui-tree-model";
var UITreePanel = /** @class */ (function () {
    function UITreePanel(element) {
        this.element = element;
        this.labelSearch = "Search...";
        this.labelEmpty = "No Items";
        this.labelLess = "Show Less...";
        this.labelMore = "Show More...";
        this.searchable = true;
    }
    UITreePanel.prototype.bind = function () {
        this.rootNode = new UITreeModel({ children: this.dataSource });
    };
    UITreePanel.prototype.dataSourceChanged = function () {
        this.rootNode = new UITreeModel({ children: this.dataSource });
    };
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
    UITreePanel = __decorate([
        autoinject(),
        customElement("ui-tree-panel"),
        viewResources(PLATFORM.moduleName("./tree-node")),
        inlineView("<template class=\"ui-tree__panel\"><ui-field plain nolabel class=\"ui-tree__search\" if.bind=\"searchable\">\n  <ui-input type=\"search\" t=\"[placeholder]AUF.tree.search\" placeholder=\"${labelSearch}\" clear value.bind=\"searchText\" input.trigger=\"searchTextChanged(searchText) & debounce:200\">\n    <ui-input-addon class=\"ui-text-muted\"><ui-icon icon=\"mdi mdi-magnify\"></ui-icon></ui-input-addon></ui-input></ui-field>\n  <div class=\"ui-tree__container\" nodeclick.delegate=\"itemClicked($event.detail)\" nodeover.delegate=\"itemOver($event.detail)\" nodeout.delegate=\"itemOut($event.detail)\">\n    <tree-node repeat.for=\"child of rootNode.children | sort:'label'\" node.bind=\"child\" tree.bind=\"$parent\"></tree-node>\n  </div></template>"),
        __metadata("design:paramtypes", [Element])
    ], UITreePanel);
    return UITreePanel;
}());
export { UITreePanel };
