// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customElement, bindable, bindingMode, children, inlineView, useView, computedFrom, containerless, View, DOM} from 'aurelia-framework';
import {UITreeOptions, UITreeModel} from "../../utils/ui-tree-model";
import {UIEvent} from "../../utils/ui-event";

@autoinject()
@inlineView(`<template class="ui-tree-panel"><ui-input-group class="ui-search" if.bind="searchable">
  <ui-input type="search" placeholder="Search..." clear value.bind="searchText & debounce:200">&nbsp;<span class="ui-input-addon fi-ui-icon-search"></span></ui-input></ui-input-group>
  <div class="ui-tree-level">
    <tree-node repeat.for="child of root.children | sort:'name'" node.bind="child" options.bind="options" nodeclick.delegate="itemClicked($event.detail)"></tree-node>
  </div></template>`)
@customElement('ui-tree')
export class UITree {
  constructor(public element: Element) {
    if ((this.searchable = element.hasAttribute('searchable'))) element.classList.add('has-search');

    this.obSearch = UIEvent.observe(this, 'searchText')
      .subscribe(v => this.searchTextChanged(v));
  }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) {
    this.modelChanged(this.model || []);
    this.valueChanged(this.value);
  }
  attached() { }
  detached() {
    if (this.obSearch) this.obSearch.dispose();
  }
  unbind() { }
  // end aurelia hooks

  @bindable({ defaultBindingMode: bindingMode.twoWay }) value = '';

  @bindable() model = [];
  @bindable() options: UITreeOptions = new UITreeOptions();

  private root: UITreeModel;
  private searchText: string = '';
  private selectedNode: any = {};

  private obSearch;
  private searchable = false;

  private ignoreChange = false;

  valueChanged(newValue) {
    if (this.ignoreChange) return;
    if (!this.options.showCheckbox) {
      if (this.selectedNode) {
        let p = this.selectedNode;
        p.active = false;
        do { p.childActive = false } while (p = p.parent);
      }
      this.selectedNode = this.findNode(this.root.children, newValue, 'active', true, true);
    }
    else {
      _.forEach(this.root.children, n => n.isChecked = false);
      if (newValue) _.forEach((newValue || '').split(','), v => this.findNode(this.root.children, v, 'checked', true, true));
    }
  }

  optionsChanged(newValue) {
    this.ignoreChange = true;
    if (newValue.showCheckbox) {
      let nodes = this.getChecked(this.root.children);
      this.value = nodes.checked.join(',');
    }
    else {
      if (this.selectedNode) this.value = this.selectedNode.value;
    }
    UIEvent.queueTask(() => this.ignoreChange = false);
  }

  modelChanged(newValue) {
    this.root = new UITreeModel(-1, this.options.maxLevels, this.options.checkboxLevel, {
      id: '',
      name: this.options.rootLabel,
      children: newValue
    }, null);
  }

  @computedFrom('root')
  private get rootNodes() {
    return this.options.showRoot ? [this.root] : this.root.children;
  }

  public getChecked(nodes, retVal = { checked: [], partial: [], unchecked: [] }) {
    var self = this;
    _.forEach(nodes, (n: UITreeModel) => {
      if (n.checked == 2) retVal.partial.push(n.id);
      if (n.checked == 1) retVal.checked.push(n.id);
      if (n.checked == 0) retVal.unchecked.push(n.id);
      if (_.isArray(n.children)) self.getChecked(n.children, retVal);
    });
    return retVal;
  }

  private findNode(obj, id, field?, value = true, expand = false) {
    var self = this;
    return _.find(obj, (n: UITreeModel) => {
      var found = n.id == id;
      if (!found && _.isArray(n.children)) {
        found = !_.isEmpty(self.findNode(n.children, id, field, value));
        if (expand && found) n.expanded = true;
      }
      else if (found) {
        if (field == 'active') self.itemSelect(n);
        if (field == 'expanded') n.expanded = value;
        if (field == 'checked') n.isChecked = value ? 1 : 0;
      }

      return found;
    });
  }

  private itemSelect(node) {
    if (UIEvent.fireEvent('beforeselect', this.element, node)) {
      let p;
      this.ignoreChange = true;
      if (this.selectedNode) {
        (p = this.selectedNode).active = false;
        while (p = p.parent) p.childActive = false;
      }
      (p = this.selectedNode = node).active = true;
      while (p = p.parent) p.childActive = true;
      this.value = node.id;
      this.filter(this.root.children, this.searchText = '');
      this.scrollIntoView();
      UIEvent.fireEvent('select', this.element, node);
      UIEvent.queueTask(() => this.ignoreChange = false);
    }
  }

  private itemChecked(node) {
    if (UIEvent.fireEvent('beforechecked', this.element, node)) {
      this.ignoreChange = true;
      node.isChecked = !node.checked;
      let nodes = this.getChecked(this.root.children);
      this.value = nodes.checked.join(',');
      UIEvent.fireEvent('checked', this.element, node);
      UIEvent.queueTask(() => this.ignoreChange = false);
    }
  }

  private itemClicked(node) {
    if (node.root) return;

    if (this.options.showCheckbox) {
      if (node.level >= this.options.checkboxLevel) {
        this.itemChecked(node);
      }
    }
    else if (node.level < this.options.selectionLevel) {
      node.expanded = !node.expanded;
    }
    else if (node.level >= this.options.selectionLevel) {
      this.itemSelect(node);
    }
  }

  private scrollIntoView() {
    UIEvent.queueTask(() => {
      let x;
      if ((x = this.element.querySelector('.ui-active')) !== null) x.scrollIntoView(false);
    });
  }

  private searchTextChanged(newValue) {
    this.filter(this.root.children, newValue);
  }

  private filter(obj, value, parentVisible: boolean = false): boolean {
    var self = this, ret = false, rx = new RegExp(getAscii(value), 'gi');

    _.forEach(obj, (n: UITreeModel) => {
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
}

@autoinject()
@inlineView(`<template class="ui-tree-item">
    <div class="ui-tree-item-link \${node.disabled?'ui-disabled':''}" if.bind="node.isVisible">
        <a class="ui-expander \${node.expanded?'expanded':''}" if.bind="!node.leaf" click.trigger="node.expanded=!node.expanded">
            <ui-glyph glyph.bind="node.expanded?'tree-collapse':'tree-expand'"></ui-glyph>
        </a>
        <a class="ui-node-checkbox" if.bind="options.showCheckbox && node.level>=options.checkboxLevel" click.trigger="fireClicked()">
          <ui-glyph glyph.bind="node.checked==1?'tree-check-on':(node.checked==2?'tree-check-partial':'tree-check-off')"></ui-glyph>
        </a>
        <a class="ui-node-link \${!options.showCheckbox && node.active?'ui-active':node.childActive?'ui-partial':''}" data-id="\${node.id}" click.trigger="fireClicked()">
            <span class="ui-icon \${node.icon}" if.bind="node.icon"></span>
            <span innerhtml.bind="node.text"></span>
        </a>
    </div>
    <div class="ui-tree-level" if.bind="node.isVisible && !node.leaf && node.expanded">
        <tree-node repeat.for="child of node.children | sort:'name'" node.bind="child" options.bind="options"></tree-node>
    </div>
</template>`) export class TreeNode {
  constructor(public element: Element) { }

  // aurelia hooks
  created(owningView: View, myView: View) { }
  bind(bindingContext: Object, overrideContext: Object) { }
  attached() { }
  detached() { }
  unbind() { }
  // end aurelia hooks

  @bindable() node: UITreeModel;
  @bindable() options: UITreeOptions;

  private fireClicked() {
    UIEvent.fireEvent('nodeclick', this.element, this.node);
  }
}