System.register(['./chunk.js', 'aurelia-framework', 'aurelia-event-aggregator', './chunk3.js'], function (exports, module) {
  'use strict';
  var __decorate, __metadata, __spread, computedFrom, bindable, inlineView, bindingMode, customElement, viewResources, UIInternal;
  return {
    setters: [function (module) {
      __decorate = module.b;
      __metadata = module.c;
      __spread = module.e;
    }, function (module) {
      computedFrom = module.computedFrom;
      bindable = module.bindable;
      inlineView = module.inlineView;
      bindingMode = module.bindingMode;
      customElement = module.customElement;
      viewResources = module.viewResources;
    }, function () {}, function (module) {
      UIInternal = module.a;
    }],
    execute: function () {

      var NODE_ID = 0;
      var UITreeModel = (function () {
          function UITreeModel(children, maxNodes) {
              if (maxNodes === void 0) { maxNodes = 0; }
              this.maxNodes = maxNodes;
              this.children = [];
              this.nodes = [];
              this.children = children.map(function (child) { return new UITreeNode(child); });
              this.nodes = this.getExpandedTree(this.children.sortBy("label"));
          }
          UITreeModel.prototype.filter = function (query) {
              var filtered = this.filterNodes(this.children, query);
              this.nodes = this.getExpandedTree(filtered.sortBy("label"));
          };
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
              }
              this.nodes = __spread(this.nodes.slice(0, parentIndex + 1), injectedChildren, [
                  this.nodes[index]
              ], this.nodes.slice(index + 1));
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
                      _this.getCheckedNodes(node.childNodes, checked);
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
                      nodes.push.apply(nodes, __spread(_this.getExpandedTree(injectedChildren)));
                  }
              });
              return nodes;
          };
          UITreeModel.prototype.filterNodes = function (nodes, query) {
              var _this = this;
              return nodes.filter(function (child) {
                  var retVal = !query ||
                      child.label
                          .ascii()
                          .toLocaleLowerCase()
                          .includes(query.ascii().toLocaleLowerCase());
                  if (!child.leaf) {
                      child.filtered = _this.filterNodes(child.childNodes, query);
                      retVal = retVal || child.filtered.length > 0;
                  }
                  return retVal;
              });
          };
          return UITreeModel;
      }());
      var UITreeNode = (function () {
          function UITreeNode(node, parent) {
              var _this = this;
              this.parent = parent;
              this.childNodes = [];
              this.filtered = null;
              this.level = 0;
              this.checked = 0;
              this.id = node.id || "node__" + NODE_ID++;
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
                  this.childNodes = node.children.map(function (child) { return new UITreeNode(child, _this); });
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
          Object.defineProperty(UITreeNode.prototype, "children", {
              get: function () {
                  return this.filtered || this.childNodes;
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

      var view = "<template class=\"ui-tree__node ${isSelected ? 'ui-tree--selected':''}\">\n  <div class=\"ui-tree__spacer\" repeat.for=\"i of node.level\"></div>\n  <template if.bind=\"node.id !== 'node-more' && node.id !== 'node-empty'\">\n    <div class=\"ui-tree__expander\" click.trigger=\"tree.toggleExpand(index)\" if.bind=\"!node.leaf\">\n      <ui-svg-icon icon.bind=\"node.expandIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__checkbox\" click.trigger=\"tree.toggleCheck(node)\" if.bind=\"tree.checkable !== false && node.level >= tree.checkable\">\n      <ui-svg-icon icon.bind=\"node.checkIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__icon\">\n      <ui-svg-icon if.bind=\"node.loading\" icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      <ui-icon else class.bind=\"node.nodeIcon\"></ui-icon>\n    </div>\n    <div class=\"ui-tree__label\" click.trigger=\"tree.select(node)\">${node.label}</div>\n  </template>\n  <template if.bind=\"node.id === 'node-more'\">\n    <a class=\"ui-tree__show-more\" click.trigger=\"tree.toggleMore(index)\">\n      <span if.bind=\"node.showingMore\">${tree.labelLess}</span>\n      <span else>${tree.labelMore}</span>\n    </a>\n  </template>\n  <template if.bind=\"node.id === 'node-empty'\">\n    <div class=\"ui-tree__no-children\" ui-color=\"gray\">${tree.labelEmpty}</div>\n  </template>\n</template>\n";

      var TreeNode = (function () {
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
              inlineView(view)
          ], TreeNode);
          return TreeNode;
      }());

      var UITreePanel = (function () {
          function UITreePanel(element) {
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
          UITreePanel.prototype.select = function (node) {
              var _this = this;
              if (this.checkable !== false) {
                  if (node.level >= this.checkable) {
                      node.toggleCheck();
                      this.getCheckedValues();
                      this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
                  }
              }
              else {
                  return UIInternal.fireCallbackEvent(this, "beforeselect").then(function (b) {
                      return b ? _this.changeSelection(node) : false;
                  });
              }
          };
          UITreePanel.prototype.bind = function () {
              this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
          };
          UITreePanel.prototype.dataSourceChanged = function () {
              this.rootNode = new UITreeModel(this.dataSource, this.maxNodes);
          };
          UITreePanel.prototype.toggleExpand = function (index) {
              this.rootNode.toggleExpand(index);
          };
          UITreePanel.prototype.toggleMore = function (index) {
              this.rootNode.toggleMore(index);
          };
          UITreePanel.prototype.toggleCheck = function (node) {
              node.toggleCheck();
              this.getCheckedValues();
              this.element.dispatchEvent(UIInternal.createEvent("checked", this.value));
          };
          UITreePanel.prototype.getCheckedValues = function () {
              var _this = this;
              this.value = [];
              this.model = [];
              this.rootNode.getChecked().forEach(function (checkedNode) {
                  if (checkedNode.level >= _this.checkable) {
                      _this.value.push(checkedNode.id);
                      _this.model.push(checkedNode.model);
                  }
              });
          };
          UITreePanel.prototype.searchTextChanged = function (query) {
              this.rootNode.filter(query);
          };
          UITreePanel.prototype.changeSelection = function (node) {
              this.value = node.id;
              this.model = node.model;
              this.element.dispatchEvent(UIInternal.createEvent("select", this.value));
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
              inlineView("<template class=\"ui-tree__panel\"><ui-field nolabel class=\"ui-tree__search\" if.bind=\"searchable\">\n  <ui-input type=\"search\" placeholder=\"${labelSearch}\" value.bind=\"searchText\" \n  clear.trigger=\"searchTextChanged()\" input.trigger=\"searchTextChanged(searchText) & debounce:200\">\n    <ui-input-addon class=\"ui-text-muted\"><ui-icon icon=\"mdi mdi-magnify\"></ui-icon></ui-input-addon></ui-input></ui-field>\n  <div class=\"ui-tree__container\" nodeclick.delegate=\"itemClicked($event.detail)\" nodeover.delegate=\"itemOver($event.detail)\" nodeout.delegate=\"itemOut($event.detail)\">\n    <tree-node virtual-repeat.for=\"child of rootNode.nodes\" node.bind=\"child\" tree.bind=\"$parent\" index.bind=\"$index\"></tree-node>\n  </div></template>"),
              __metadata("design:paramtypes", [Element])
          ], UITreePanel);
          return UITreePanel;
      }());

      var DataPanels = exports('DataPanels', [UITreePanel]);

    }
  };
});
//# sourceMappingURL=ui-data-panels.js.map
