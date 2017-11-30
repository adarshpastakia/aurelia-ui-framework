var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "lodash"], function (require, exports, aurelia_framework_1, _) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIDatagrid = (function () {
        function UIDatagrid(element, engine) {
            this.element = element;
            this.engine = engine;
            this.cols = [];
            this.colHead = [];
            this.colLocked = [];
            this.virtual = false;
            this.rowCounter = false;
            this.rowExpander = false;
            this.rowCounter = element.hasAttribute('row-counter');
            this.rowExpander = element.hasAttribute('row-expander');
            if (!element.hasAttribute('scroll'))
                this.element.classList.add('ui-auto-size');
        }
        UIDatagrid.prototype.columnsChanged = function (c) {
            this.colHead = _.sortBy(this.columns, 'locked');
            var cols = _.sortBy(_.flatMap(this.columns, function (c) { return c.columns || [c]; }), 'locked');
            this.cols = _.filter(cols, function (c) { return c.locked == 1; });
            this.colLocked = _.filter(cols, function (c) { return c.locked == 0; });
        };
        __decorate([
            aurelia_framework_1.children('ui-dg-column-group,ui-dg-column,ui-dg-button,ui-dg-link,ui-dg-glyph'),
            __metadata("design:type", Object)
        ], UIDatagrid.prototype, "columns", void 0);
        __decorate([
            aurelia_framework_1.bindable(),
            __metadata("design:type", Object)
        ], UIDatagrid.prototype, "dataSource", void 0);
        UIDatagrid = __decorate([
            aurelia_framework_1.autoinject(),
            aurelia_framework_1.inlineView("<template class=\"ui-datagrid\"><div class=\"ui-hide\"><slot></slot></div>\n<div class=\"ui-dg-head\"></div>\n<div class=\"ui-dg-body\"></div>\n<div class=\"ui-dg-foot\"></div>\n</template>"),
            aurelia_framework_1.customElement('ui-datagrid'),
            __metadata("design:paramtypes", [Element, aurelia_framework_1.TemplatingEngine])
        ], UIDatagrid);
        return UIDatagrid;
    }());
    exports.UIDatagrid = UIDatagrid;
});
