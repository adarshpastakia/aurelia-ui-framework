var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customElement, bindable, bindingMode, inlineView, computedFrom } from 'aurelia-framework';
import { UITreeOptions, UITreeModel } from "../../utils/ui-tree-model";
import { UIEvent } from "../../utils/ui-event";
import * as _ from "lodash";
let UITree = class UITree {
    constructor(element) {
        this.element = element;
        this.value = '';
        this.hover = '';
        this.model = [];
        this.options = new UITreeOptions();
        this.searchText = '';
        this.selectedNode = {};
        this.searchable = false;
        this.ignoreChange = false;
        if ((this.searchable = element.hasAttribute('searchable')))
            element.classList.add('has-search');
    }
    bind(bindingContext, overrideContext) {
        this.modelChanged(this.model || []);
        this.valueChanged(this.value);
    }
    valueChanged(newValue) {
        if (this.ignoreChange)
            return;
        if (!this.options.showCheckbox) {
            if (this.selectedNode) {
                let p = this.selectedNode;
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
            _.forEach(this.root.children, n => n.isChecked = false);
            if (newValue)
                _.forEach((newValue || '').split(','), v => this.findNode(this.root.children, v, 'checked', true, true));
        }
    }
    optionsChanged(newValue) {
        this.ignoreChange = true;
        if (newValue.showCheckbox) {
            let nodes = this.getChecked(this.root.children);
            this.value = nodes.checked.join(',');
        }
        else {
            if (this.selectedNode)
                this.value = this.selectedNode.value;
        }
        UIEvent.queueTask(() => this.ignoreChange = false);
    }
    modelChanged(newValue) {
        this.root = new UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
            id: '',
            name: this.options.rootLabel,
            children: newValue
        }, null);
        if (this.options.showCheckbox) {
            let nodes = this.getChecked(this.root.children);
            this.value = nodes.checked.join(',');
        }
        else {
            if (this.selectedNode)
                this.value = this.selectedNode.value;
        }
    }
    get rootNodes() {
        return this.options.showRoot ? [this.root] : this.root.children;
    }
    getChecked(nodes, retVal = { checked: [], partial: [], unchecked: [] }) {
        var self = this;
        _.forEach(nodes || this.root.children, (n) => {
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
    }
    getCheckedTree(nodes) {
        var self = this, retVal = [];
        _.forEach(nodes || this.root.children, (n) => {
            if (n.checked == 1 && n.leaf) {
                retVal.push(n.data);
            }
            if (n.checked != 0 && !n.leaf) {
                let node = n.data;
                node.children = self.getCheckedTree(n.children);
                retVal.push(node);
            }
        });
        return retVal;
    }
    expandAll() {
        this.root.expandToggle(true);
    }
    collapseAll() {
        this.root.expandToggle(false);
    }
    findNode(obj, id, field, value = true, expand = false) {
        var self = this;
        return _.find(obj, (n) => {
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
    }
    itemSelect(node) {
        if (UIEvent.fireEvent('beforeselect', this.element, node)) {
            let p;
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
            UIEvent.fireEvent('select', this.element, node);
            UIEvent.queueTask(() => this.ignoreChange = false);
        }
    }
    itemChecked(node) {
        if (UIEvent.fireEvent('beforechecked', this.element, node)) {
            this.ignoreChange = true;
            node.isChecked = !node.checked;
            let nodes = this.getChecked(this.root.children);
            this.value = nodes.checked.join(',');
            UIEvent.fireEvent('checked', this.element, node);
            UIEvent.queueTask(() => this.ignoreChange = false);
        }
    }
    itemClicked(node) {
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
    }
    itemOver(node) {
        this.hover = node.id;
    }
    itemOut(node) {
        this.hover = null;
    }
    scrollIntoView() {
        UIEvent.queueTask(() => {
            let x;
            if ((x = this.element.querySelector('.ui-active')) !== null)
                x.scrollIntoView(false);
        });
    }
    searchTextChanged(newValue) {
        this.filter(this.root.children, newValue);
    }
    filter(obj, value, parentVisible = false) {
        var self = this, ret = false, rx = new RegExp(getAscii(value), 'gi');
        _.forEach(obj, (n) => {
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
                let start = getAscii(n.text).search(rx);
                let name = n.text.substr(0, start + value.length) + '</b>' + n.text.substr(start + value.length);
                n.text = name.substr(0, start) + '<b>' + name.substr(start);
            }
            n.isVisible = n.children.length > 0 ? self.filter(n.children, value, match || parentVisible) : (match || parentVisible);
            ret = ret || n.isVisible;
        });
        return ret;
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UITree.prototype, "value", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UITree.prototype, "hover", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UITree.prototype, "model", void 0);
__decorate([
    bindable(),
    __metadata("design:type", UITreeOptions)
], UITree.prototype, "options", void 0);
__decorate([
    computedFrom('root'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UITree.prototype, "rootNodes", null);
UITree = __decorate([
    autoinject(),
    inlineView(`<template class="ui-tree-panel"><ui-input-group class="ui-tree-search" if.bind="searchable">
  <ui-input type="search" t="[placeholder]Search" placeholder="\${options.labels.search}" clear value.bind="searchText" input.trigger="searchTextChanged(searchText) & debounce:200"><ui-input-addon class="ui-text-muted" glyph="glyph-search"></ui-input-addon></ui-input></ui-input-group>
  <div class="ui-tree-level">
    <tree-node repeat.for="child of root.children | sort:'name'" node.bind="child" options.bind="options" nodeclick.delegate="itemClicked($event.detail)" nodeover.delegate="itemOver($event.detail)" nodeout.delegate="itemOut($event.detail)"></tree-node>
  </div></template>`),
    customElement('ui-tree'),
    __metadata("design:paramtypes", [Element])
], UITree);
export { UITree };
let TreeNode = class TreeNode {
    constructor(element) {
        this.element = element;
        this.hideByCount = true;
    }
    get canHideByCount() {
        return this.options.maxCount > 0 && this.node.children.length > this.options.maxCount;
    }
    fireClicked() {
        UIEvent.fireEvent('nodeclick', this.element, this.node);
    }
    doMouseOver() {
        UIEvent.fireEvent('nodeover', this.element, this.node);
    }
    doMouseOut() {
        UIEvent.fireEvent('nodeout', this.element, this.node);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", UITreeModel)
], TreeNode.prototype, "node", void 0);
__decorate([
    bindable(),
    __metadata("design:type", UITreeOptions)
], TreeNode.prototype, "options", void 0);
TreeNode = __decorate([
    autoinject(),
    inlineView(`<template class="ui-tree-item">
    <div class="ui-tree-item-link \${node.disabled?'ui-disabled':''}" if.bind="node.isVisible">
        <a class="ui-expander \${node.expanded?'expanded':''}" if.bind="!node.leaf" click.trigger="[node.expanded=!node.expanded, hideByCount=true]">
            <ui-glyph glyph.bind="node.expanded?'glyph-tree-collapse':'glyph-tree-expand'"></ui-glyph>
        </a>
        <a class="ui-node-checkbox" if.bind="options.showCheckbox && node.level>=options.checkboxLevel" click.trigger="fireClicked()">
          <ui-glyph glyph.bind="node.checked==1?'glyph-tree-check-on':(node.checked==2?'glyph-tree-check-partial':'glyph-tree-check-off')"></ui-glyph>
        </a>
        <a class="ui-node-link \${!options.showCheckbox && node.active?'ui-active':node.childActive?'ui-partial':''}" data-id="\${node.id}" click.trigger="fireClicked()" mouseover.delegate="doMouseOver($event)" mouseout.delegate="doMouseOut($event)">
            <ui-glyph glyph.bind="(node.expanded?node.openIcon:node.closedIcon)||node.icon" class.bind="(node.expanded?node.openIcon:node.closedIcon)||node.icon" if.bind="node.icon||node.openIcon"></ui-glyph>
            <span innerhtml.bind="node.text" class="\${node.level<options.checkboxLevel && node.checked!=0?'ui-strong':''}"></span>
        </a>
    </div>
    <div class="ui-tree-level" if.bind="node.isVisible && !node.leaf && node.expanded">
        <tree-node repeat.for="child of node.children | sort:'name'" if.bind="!(canHideByCount && hideByCount && $index>=options.maxCount)" node.bind="child" options.bind="options"></tree-node>
        <div>
        <div if.bind="node.children && node.children.length==0" class="ui-font-small ui-text-muted" t="No Items">\${options.labels.noitems}</div>
        <a class="ui-font-small ui-strong" click.trigger="hideByCount=false" if.bind="canHideByCount && hideByCount" t="More">\${options.labels.more}</a>
        <a class="ui-font-small ui-strong" click.trigger="hideByCount=true" if.bind="canHideByCount && !hideByCount" t="Less">\${options.labels.less}</a>
        </div>
    </div>
</template>`),
    __metadata("design:paramtypes", [Element])
], TreeNode);
export { TreeNode };
