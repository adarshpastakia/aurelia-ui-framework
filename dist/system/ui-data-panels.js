System.register(['./_tslib.js', 'aurelia-framework', 'aurelia-event-aggregator', './ui-internal.js', 'date-fns', 'kramed', 'numeral', './ui-format.js'], function (exports) {
  'use strict';
  var __decorate, __metadata, __assign, __spread, computedFrom, bindable, customElement, processContent, noView, containerless, inlineView, bindingMode, children, viewResources, UIInternal, UIFormat;
  return {
    setters: [function (module) {
      __decorate = module.a;
      __metadata = module.b;
      __assign = module.c;
      __spread = module.d;
    }, function (module) {
      computedFrom = module.computedFrom;
      bindable = module.bindable;
      customElement = module.customElement;
      processContent = module.processContent;
      noView = module.noView;
      containerless = module.containerless;
      inlineView = module.inlineView;
      bindingMode = module.bindingMode;
      children = module.children;
      viewResources = module.viewResources;
    }, function () {}, function (module) {
      UIInternal = module.U;
    }, function () {}, function () {}, function () {}, function (module) {
      UIFormat = module.U;
    }],
    execute: function () {

      var UIColumn = (function () {
          function UIColumn(element) {
              var _this = this;
              this.element = element;
              this.label = "";
              this.width = "250px";
              this.minWidth = "80px";
              this.maxWidth = "600px";
              this.type = "text";
              this.align = "start";
              this.locked = false;
              this.resizeable = false;
              this.sortable = false;
              this.noPadding = false;
              this.onDrag = function ($event) { return _this.resize($event); };
              this.onDragEnd = function ($event) { return _this.stopResize($event); };
              this.template = element.querySelector("template");
              this.sortable = element.hasAttribute("sortable");
              this.resizeable = element.hasAttribute("resizeable");
              this.noPadding = element.hasAttribute("no-padding");
          }
          Object.defineProperty(UIColumn.prototype, "css", {
              get: function () {
                  return {
                      width: this.width,
                      minWidth: this.minWidth,
                      maxWidth: this.maxWidth
                  };
              },
              enumerable: true,
              configurable: true
          });
          UIColumn.prototype.compileCell = function (el, record) {
              if (el) {
                  el.innerHTML = "";
                  var tpl = this.template
                      ? this.template.outerHTML
                      : "<template><span innerhtml.bind=\"$value\"></span></template>";
                  var model = {
                      $record: record,
                      $value: this.processValue(record)
                  };
                  var view = UIInternal.compileTemplate(tpl, model, this.owningView.bindingContext);
                  view.appendNodesTo(el);
                  view.attached();
              }
              return true;
          };
          UIColumn.prototype.created = function (owningView) {
              this.owningView = owningView;
          };
          UIColumn.prototype.bind = function () {
              if (!this.template && !this.label) {
                  this.label = this.element.innerHTML || "";
              }
          };
          UIColumn.prototype.startResize = function ($event) {
              $event.stopEvent();
              this.startX = $event.x || $event.clientX;
              this.isResizing = true;
              this.isRtl = isRtl(this.element);
              document.addEventListener("mousemove", this.onDrag);
              document.addEventListener("mouseup", this.onDragEnd);
          };
          UIColumn.prototype.resize = function ($event) {
              var _this = this;
              $event.stopEvent();
              var x = $event.x || $event.clientX;
              var diff = x - this.startX;
              var newWidth = convertToPx(this.width) + (diff * (this.isRtl ? -1 : 1));
              if (newWidth < convertToPx(this.maxWidth) && newWidth > convertToPx(this.minWidth)) {
                  UIInternal.queueTask(function () {
                      _this.width = newWidth + "px";
                      _this.startX = x;
                  });
              }
          };
          UIColumn.prototype.stopResize = function ($event) {
              $event.stopEvent();
              this.isResizing = false;
              document.removeEventListener("mousemove", this.onDrag);
              document.removeEventListener("mouseup", this.onDragEnd);
          };
          UIColumn.prototype.processValue = function (record) {
              var value = record[this.dataId] || "";
              if (isFunction(this.value)) {
                  value = this.value({ record: record, value: value });
              }
              if (isFunction(this.format)) {
                  value = this.value({ record: record, value: value });
              }
              else {
                  switch (this.type) {
                      case "date":
                          value = UIFormat.date(value, this.format);
                          break;
                      case "time":
                          value = UIFormat.time(value, this.format);
                          break;
                      case "datetime":
                          value = UIFormat.datetime(value, this.format);
                          break;
                      case "number":
                          value = UIFormat.number(value, this.format);
                          break;
                      case "currency":
                          value = UIFormat.currency(value, this.format);
                          break;
                  }
              }
              return value;
          };
          __decorate([
              computedFrom("width", "minWidth", "maxWidth"),
              __metadata("design:type", Object),
              __metadata("design:paramtypes", [])
          ], UIColumn.prototype, "css", null);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIColumn.prototype, "dataId", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIColumn.prototype, "label", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIColumn.prototype, "width", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIColumn.prototype, "minWidth", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIColumn.prototype, "maxWidth", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Function)
          ], UIColumn.prototype, "value", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Object)
          ], UIColumn.prototype, "format", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIColumn.prototype, "type", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIColumn.prototype, "align", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Object)
          ], UIColumn.prototype, "locked", void 0);
          UIColumn = __decorate([
              customElement("ui-column"),
              processContent(false),
              noView(),
              __metadata("design:paramtypes", [Element])
          ], UIColumn);
          return UIColumn;
      }());

      var UIDataSource = (function () {
          function UIDataSource(dataOrApi, options) {
              if (options === void 0) { options = {}; }
              this.isPaginated = false;
              this.pageNo = 0;
              this.totalPages = 0;
              this.recordsPerPage = 50;
              this.sortByOrder = "asc";
              this.data = [];
              this.original = [];
              this.options = {
                  rootProperty: "",
                  dataProperty: "data",
                  pageProperty: "pageno",
                  countProperty: "total",
                  sortProperty: "sortBy",
                  orderProperty: "sortOrder",
                  perPageProperty: "pageCount"
              };
              this.options = __assign(__assign({}, this.options), options);
              this.isPaginated = options.paginated;
              this.recordsPerPage = options.recordsPerPage || 50;
              this.sortByProperty = options.defaultSortProperty;
              this.sortByOrder = options.defaultSortOrder || "asc";
              if (isArray(dataOrApi)) {
                  this.original = dataOrApi;
                  this.performFilter();
              }
              else {
                  this.apiSlug = dataOrApi;
              }
          }
          UIDataSource.prototype.sortBy = function (property) {
              if (this.sortByProperty === property) {
                  this.sortByOrder = this.sortByOrder === "asc" ? "desc" : "asc";
              }
              else {
                  this.sortByProperty = property;
                  this.sortByOrder = "asc";
              }
              this.performFilter();
          };
          UIDataSource.prototype.performFilter = function () {
              var data = __spread(this.original);
              if (this.sortByProperty) {
                  data = data.sortBy(this.sortByProperty, this.sortByOrder === "asc");
              }
              if (this.isPaginated) {
                  this.totalPages = Math.ceil(data.length / this.recordsPerPage);
                  data = data.splice(this.pageNo * this.recordsPerPage, this.recordsPerPage);
              }
              this.data = data;
          };
          return UIDataSource;
      }());

      var BodyCell = (function () {
          function BodyCell() {
          }
          BodyCell.prototype.attached = function () {
              this.recordChanged();
              if (this.column.noPadding) {
                  this.el.style.paddingTop = 0;
                  this.el.style.paddingBottom = 0;
              }
          };
          BodyCell.prototype.recordChanged = function () {
              this.column.compileCell(this.el, this.record);
          };
          __decorate([
              bindable(),
              __metadata("design:type", UIColumn)
          ], BodyCell.prototype, "column", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Object)
          ], BodyCell.prototype, "record", void 0);
          BodyCell = __decorate([
              containerless(),
              inlineView("<template>\n        <div class=\"ui-datagrid__cell\" css.bind=\"column.css\" data-resizing.bind=\"column.isResizing\">\n          <div class=\"ui-datagrid__cell__wrapper\" ref=\"el\" ui-align.bind=\"column.align\"></div>\n        </div>\n      </template>")
          ], BodyCell);
          return BodyCell;
      }());

      var HeaderCell = (function () {
          function HeaderCell(element) {
              this.element = element;
          }
          HeaderCell.prototype.fireSortEvent = function () {
              if (this.column.sortable) {
                  this.element.dispatchEvent(UIInternal.createEvent("sort"));
              }
          };
          __decorate([
              bindable(),
              __metadata("design:type", UIColumn)
          ], HeaderCell.prototype, "column", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], HeaderCell.prototype, "sortBy", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], HeaderCell.prototype, "sortOrder", void 0);
          HeaderCell = __decorate([
              containerless(),
              inlineView("<template>\n        <div class=\"ui-datagrid__cell\" css.bind=\"css\" with.bind=\"column\">\n          <div class=\"ui-datagrid__cell__wrapper\" innerhtml.bind=\"label\"\n            click.trigger=\"fireSortEvent()\"></div>\n          <div class=\"ui-datagrid__cell__sorter\" \n            data-sort.bind=\"sortBy === dataId ? sortOrder : ''\">\n            <i if.bind=\"sortable\"></i>\n            <i if.bind=\"sortable\"></i>\n          </div>\n          <div class=\"ui-datagrid__cell__resizer\" if.bind=\"resizeable\" mousedown.trigger=\"startResize($event)\"></div>\n        </div>\n      </template>"),
              __metadata("design:paramtypes", [Element])
          ], HeaderCell);
          return HeaderCell;
      }());

      var view = "<template class=\"ui-datagrid\">\n  <div show.bind=\"false\">\n    <slot></slot>\n  </div>\n\n  <div class=\"ui-datagrid__head\">\n    <div class=\"ui-datagrid__row\">\n      <div class=\"ui-datagrid__row__wrapper\">\n        <div class=\"ui-datagrid__row__locked--start\">\n          <div class=\"ui-datagrid__cell\" css.bind=\"{width: '42px'}\" if.bind=\"checkable\">\n            <div class=\"ui-datagrid__cell__wrapper\">\n              <ui-checkbox checked.to-view=\"selected.length === ds.data.length ? true : selected.length === 0 ? false : '__2__'\" change.trigger=\"toggleSelectionAll($event)\"></ui-checkbox>\n            </div>\n          </div>\n          <div class=\"ui-datagrid__cell\" css.bind=\"{width: '42px'}\" if.bind=\"showCounter\"></div>\n          <template repeat.for=\"col of columns | filter:'start':'locked'\">\n            <header-cell column.bind=\"col\" sort.trigger=\"ds.sortBy(col.dataId)\" sort-by.bind=\"ds.sortByProperty\" sort-order.bind=\"ds.sortByOrder\"></header-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__row__scrolling\">\n          <template repeat.for=\"col of columns | filter:false:'locked'\">\n            <header-cell column.bind=\"col\" sort.trigger=\"ds.sortBy(col.dataId)\" sort-by.bind=\"ds.sortByProperty\" sort-order.bind=\"ds.sortByOrder\"></header-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__cell ui-datagrid__cell--filler\"></div>\n        <div class=\"ui-datagrid__row__locked--end\">\n          <template repeat.for=\"col of columns | filter:'end':'locked'\">\n            <header-cell column.bind=\"col\" sort.trigger=\"ds.sortBy(col.dataId)\" sort-by.bind=\"ds.sortByProperty\" sort-order.bind=\"ds.sortByOrder\"></header-cell>\n          </template>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"ui-datagrid__body\" ref=\"dgBody\">\n    <div class=\"ui-datagrid__row ${$even ? 'ui-datagrid__row--even':'ui-datagrid__row--odd'}\" virtual-repeat.for=\"record of ds.data\">\n      <div class=\"ui-datagrid__row__wrapper ${selected.includes(record) ? 'ui-datagrid__row--selected' : ''}\">\n        <div class=\"ui-datagrid__row__locked--start\">\n          <div class=\"ui-datagrid__cell ui-datagrid__cell--head\" css.bind=\"{width: '42px'}\" if.bind=\"checkable\">\n            <div class=\"ui-datagrid__cell__wrapper\">\n              <ui-checkbox checked.to-view=\"selected.includes(record)\" change.trigger=\"toggleSelection($event, record)\"></ui-checkbox>\n            </div>\n          </div>\n          <div class=\"ui-datagrid__cell ui-datagrid__cell--head\" css.bind=\"{width: '42px'}\" if.bind=\"showCounter\">\n            <div class=\"ui-datagrid__cell__wrapper\">\n              <span css.bind=\"{fontSize:'.8em'}\">${$index + 1}</span>\n            </div>\n          </div>\n          <template repeat.for=\"col of columns | filter:'start':'locked'\">\n            <body-cell column.bind=\"col\" record.bind=\"record\"></body-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__row__scrolling\">\n          <template repeat.for=\"col of columns | filter:false:'locked'\">\n            <body-cell column.bind=\"col\" record.bind=\"record\"></body-cell>\n          </template>\n        </div>\n        <div class=\"ui-datagrid__cell ui-datagrid__cell--filler\"></div>\n        <div class=\"ui-datagrid__row__locked--end\">\n          <template repeat.for=\"col of columns | filter:'end':'locked'\">\n            <body-cell column.bind=\"col\" record.bind=\"record\"></body-cell>\n          </template>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"ui-datagrid__foot\"></div>\n</template>\n";

      var UIDataGrid = (function () {
          function UIDataGrid(element) {
              this.element = element;
              this.selected = [];
              this.showCounter = element.hasAttribute("counter");
          }
          UIDataGrid.prototype.attached = function () {
              this.checkable = this.checkable || this.element.hasAttribute("checkable");
          };
          UIDataGrid.prototype.dataSourceChanged = function () {
              if (isArray(this.dataSource)) {
                  this.ds = new UIDataSource(this.dataSource);
              }
              if (this.dataSource instanceof UIDataSource) {
                  this.ds = this.dataSource;
              }
          };
          UIDataGrid.prototype.toggleSelection = function ($event, record) {
              if (!this.selected) {
                  this.selected = [];
              }
              this.selected = $event.detail.checked
                  ? __spread(this.selected, [record]) : this.selected.filter(function (r) { return r !== record; });
          };
          UIDataGrid.prototype.toggleSelectionAll = function ($event) {
              this.selected = this.selected.length === 0 ? __spread(this.ds.data) : [];
          };
          __decorate([
              bindable(),
              __metadata("design:type", Object)
          ], UIDataGrid.prototype, "dataSource", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Boolean)
          ], UIDataGrid.prototype, "checkable", void 0);
          __decorate([
              bindable({ defaultBindingMode: bindingMode.twoWay }),
              __metadata("design:type", Array)
          ], UIDataGrid.prototype, "selected", void 0);
          __decorate([
              children("ui-column"),
              __metadata("design:type", Object)
          ], UIDataGrid.prototype, "columns", void 0);
          UIDataGrid = __decorate([
              customElement("ui-datagrid"),
              viewResources(HeaderCell, BodyCell),
              inlineView(view),
              __metadata("design:paramtypes", [Element])
          ], UIDataGrid);
          return UIDataGrid;
      }());

      var UIDataCard = (function () {
          function UIDataCard(element) {
              this.element = element;
              this.open = false;
          }
          UIDataCard.prototype.attached = function () {
              this.hrefChanged();
          };
          UIDataCard.prototype.hrefChanged = function () {
              if (this.vmElement) {
                  if (this.href) {
                      this.vmElement.href = this.href;
                  }
                  else if (this.element.hasAttribute("click.trigger")) {
                      this.vmElement.href = "javascript:;";
                  }
                  else if (this.vmElement.attributes.getNamedItem("href")) {
                      this.vmElement.attributes.removeNamedItem("href");
                  }
              }
          };
          UIDataCard.prototype.toggleExpand = function () {
              var _this = this;
              this.open = !this.open;
              if (this.open) {
                  setTimeout(function () { return _this.vmElement.scrollIntoView({ inline: "nearest" }); }, 500);
              }
          };
          UIDataCard.prototype.fireClick = function ($event) {
              if (hasParent($event.target, "ui-datalist__toolbox", "ui-datalist__card")) {
                  $event.stopEvent();
                  return false;
              }
              if (!this.href) {
                  return this.element.dispatchEvent(UIInternal.createEvent("click"));
              }
          };
          __decorate([
              bindable(),
              __metadata("design:type", String)
          ], UIDataCard.prototype, "href", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Array)
          ], UIDataCard.prototype, "actions", void 0);
          __decorate([
              bindable(),
              __metadata("design:type", Boolean)
          ], UIDataCard.prototype, "open", void 0);
          UIDataCard = __decorate([
              containerless(),
              customElement("ui-data-card"),
              inlineView("<template><a class=\"ui-datalist__card\" ref=\"vmElement\" data-open.bind=\"open\" click.trigger=\"fireClick($event)\">\n  <slot name=\"panel-header\"></slot>\n  <slot></slot>\n  <div class=\"ui-datalist__toolbox\">\n    <slot name=\"card-actions\"></slot>\n    <ui-button-group vertical if.bind=\"actions\">\n      <ui-button type=\"tool\" no-caret>\n        <ui-svg-icon icon=\"overflow\"></ui-svg-icon>\n        <ui-drop anchor=\"br\" position=\"tr\">\n          <ui-menu menu-items.bind=\"actions\"></ui-menu>\n        </ui-drop>\n      </ui-button>\n      <ui-button type=\"tool\" click.trigger=\"toggleExpand()\">\n        <ui-svg-icon icon=\"caret\"></ui-svg-icon>\n      </ui-button>\n    </ui-button-group>\n  </div>\n  <slot name=\"panel-footer\"></slot>\n</a></template>"),
              __metadata("design:paramtypes", [Element])
          ], UIDataCard);
          return UIDataCard;
      }());

      var view$1 = "<template class=\"ui-datalist ui-scroll--y\">\n  <slot></slot>\n  <div class=\"ui-datalist__wrapper\">\n\n    <template repeat.for=\"record of dataSource\">\n      <div ref=\"el\" show.one-time=\"compileTemplate(el, record)\"></div>\n    </template>\n\n  </div>\n  <div class=\"ui-datalist__loader\" if.bind=\"isLoading\">\n    <ui-svg-icon icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n  </div>\n</template>\n";

      var UIDataList = (function () {
          function UIDataList(element) {
              this.template = element.querySelector("template");
              if (element.hasAttribute("vertical")) {
                  element.classList.add("ui-datalist--vertical");
              }
          }
          UIDataList.prototype.created = function (owningView) {
              this.owningView = owningView;
          };
          UIDataList.prototype.compileTemplate = function (el, record) {
              if (el) {
                  var tpl = "<template>" + this.template.innerHTML + "</template>";
                  var model = {
                      $record: record
                  };
                  var tplView = UIInternal.compileTemplate(tpl, model, this.owningView.bindingContext);
                  tplView.insertNodesBefore(el);
                  tplView.attached();
                  el.remove();
              }
              return true;
          };
          __decorate([
              bindable(),
              __metadata("design:type", Object)
          ], UIDataList.prototype, "dataSource", void 0);
          UIDataList = __decorate([
              customElement("ui-data-list"),
              processContent(false),
              inlineView(view$1),
              __metadata("design:paramtypes", [Element])
          ], UIDataList);
          return UIDataList;
      }());

      var UIDataTable = (function () {
          function UIDataTable() {
          }
          UIDataTable = __decorate([
              customElement("ui-data-table"),
              inlineView("<template class=\"ui-datalist__table\"><slot></slot></template>")
          ], UIDataTable);
          return UIDataTable;
      }());

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
                  var injectedChildren = this.getChildren(node);
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
                      nodes.push.apply(nodes, __spread(_this.getExpandedTree(_this.getChildren(child))));
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
          UITreeModel.prototype.getChildren = function (node) {
              var injectedChildren = node.children.sortBy("label");
              if (injectedChildren.length === 0) {
                  injectedChildren.push(new UITreeNode({ id: "node-empty", leaf: true }, node));
              }
              if (this.maxNodes > 0 && injectedChildren.length > this.maxNodes) {
                  injectedChildren = __spread(injectedChildren.slice(0, this.maxNodes), [
                      new UITreeNode({ id: "node-more", leaf: true }, node)
                  ]);
              }
              return injectedChildren;
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

      var view$2 = "<template class=\"ui-tree__node ${isSelected ? 'ui-tree--selected':''}\">\n  <div class=\"ui-tree__spacer\" repeat.for=\"i of node.level\"></div>\n  <template if.bind=\"node.id !== 'node-more' && node.id !== 'node-empty'\">\n    <div class=\"ui-tree__expander\" click.trigger=\"tree.toggleExpand(index)\" if.bind=\"!node.leaf\">\n      <ui-svg-icon icon.bind=\"node.expandIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__checkbox\" click.trigger=\"tree.toggleCheck(node)\" if.bind=\"tree.checkable !== false && node.level >= tree.checkable\">\n      <ui-svg-icon icon.bind=\"node.checkIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-tree__icon\">\n      <ui-svg-icon if.bind=\"node.loading\" icon=\"busy\" class=\"ui-anim--spin\"></ui-svg-icon>\n      <ui-icon else class.bind=\"node.nodeIcon\"></ui-icon>\n    </div>\n    <div class=\"ui-tree__label\" click.trigger=\"tree.select(node)\">${node.label}</div>\n  </template>\n  <template if.bind=\"node.id === 'node-more'\">\n    <a class=\"ui-tree__show-more\" click.trigger=\"tree.toggleMore(index)\">\n      <span if.bind=\"node.showingMore\">${tree.labelLess}</span>\n      <span else>${tree.labelMore}</span>\n    </a>\n  </template>\n  <template if.bind=\"node.id === 'node-empty'\">\n    <div class=\"ui-tree__no-children\" ui-color=\"gray\">${tree.labelEmpty}</div>\n  </template>\n</template>\n";

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
              inlineView(view$2)
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
              this.rootNode = new UITreeModel(this.options, this.maxNodes);
          };
          UITreePanel.prototype.optionsChanged = function () {
              this.rootNode = new UITreeModel(this.options, this.maxNodes);
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
          ], UITreePanel.prototype, "options", void 0);
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

      var DataPanels = exports('DataPanels', [UITreePanel, UIDataGrid, UIColumn, UIDataList, UIDataCard, UIDataTable]);

    }
  };
});
//# sourceMappingURL=ui-data-panels.js.map
