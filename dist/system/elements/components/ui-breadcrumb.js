System.register(["aurelia-framework", "../../utils/ui-event"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ui_event_1, UIChip, UIBreadcrumb, UICrumb;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ui_event_1_1) {
                ui_event_1 = ui_event_1_1;
            }
        ],
        execute: function () {
            UIChip = (function () {
                function UIChip(element) {
                    this.element = element;
                    this.id = '';
                    this.label = '';
                    this.color = '';
                    this.theme = '';
                    this.canClose = false;
                    if (element.hasAttribute('big'))
                        element.classList.add('big');
                    if (element.hasAttribute('small'))
                        element.classList.add('small');
                    if (this.element.hasAttribute('primary'))
                        this.theme = 'primary';
                    else if (this.element.hasAttribute('secondary'))
                        this.theme = 'secondary';
                    else if (this.element.hasAttribute('light'))
                        this.theme = 'light';
                    else if (this.element.hasAttribute('dark'))
                        this.theme = 'dark';
                    else if (this.element.hasAttribute('info'))
                        this.theme = 'info';
                    else if (this.element.hasAttribute('danger'))
                        this.theme = 'danger';
                    else if (this.element.hasAttribute('success'))
                        this.theme = 'success';
                    else if (this.element.hasAttribute('warning'))
                        this.theme = 'warning';
                    this.canClose = element.hasAttribute('removable');
                }
                UIChip.prototype.remove = function () {
                    ui_event_1.UIEvent.fireEvent('remove', this.element, this.id);
                };
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIChip.prototype, "id", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIChip.prototype, "label", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIChip.prototype, "color", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UIChip.prototype, "theme", void 0);
                UIChip = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView("<template class=\"ui-chip ${theme}\"><span class=\"ui-chip-label\" css.bind=\"{'background-color':color}\">${label}</span><span class=\"ui-chip-value\"><slot></slot></span><a click.trigger=\"remove()\" class=\"ui-chip-close\" if.bind=\"canClose\">&times</a></template>"),
                    aurelia_framework_1.customElement('ui-chip'),
                    __metadata("design:paramtypes", [Element])
                ], UIChip);
                return UIChip;
            }());
            exports_1("UIChip", UIChip);
            UIBreadcrumb = (function () {
                function UIBreadcrumb(element) {
                    this.element = element;
                    if (element.hasAttribute('primary'))
                        element.classList.add('ui-theme');
                    if (element.hasAttribute('primary'))
                        element.classList.add('primary');
                    if (element.hasAttribute('secondary'))
                        element.classList.add('ui-theme');
                    if (element.hasAttribute('secondary'))
                        element.classList.add('secondary');
                }
                UIBreadcrumb.prototype.fireChange = function ($event) {
                    $event.cancelBubble = true;
                    $event.stopPropagation();
                    if (!isEmpty($event.detail))
                        ui_event_1.UIEvent.fireEvent('change', this.element, $event.detail);
                    return false;
                };
                UIBreadcrumb = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView("<template class=\"ui-breadcrumb\" crumbclicked.delegate=\"fireChange($event)\"><slot></slot></template>"),
                    aurelia_framework_1.customElement('ui-breadcrumb'),
                    __metadata("design:paramtypes", [Element])
                ], UIBreadcrumb);
                return UIBreadcrumb;
            }());
            exports_1("UIBreadcrumb", UIBreadcrumb);
            UICrumb = (function () {
                function UICrumb(element) {
                    this.element = element;
                    this.id = '';
                    this.href = 'javascript:;';
                }
                UICrumb.prototype.fireClick = function ($event) {
                    $event.cancelBubble = true;
                    $event.stopPropagation();
                    ui_event_1.UIEvent.fireEvent('crumbclicked', this.element, this.id);
                    return false;
                };
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UICrumb.prototype, "id", void 0);
                __decorate([
                    aurelia_framework_1.bindable(),
                    __metadata("design:type", Object)
                ], UICrumb.prototype, "href", void 0);
                UICrumb = __decorate([
                    aurelia_framework_1.autoinject(),
                    aurelia_framework_1.inlineView("<template class=\"ui-crumb\"><a href=\"crumb.href || 'javascript:;'\" click.trigger=\"fireClick($event)\"><slot></slot></a></template>"),
                    aurelia_framework_1.customElement('ui-crumb'),
                    __metadata("design:paramtypes", [Element])
                ], UICrumb);
                return UICrumb;
            }());
            exports_1("UICrumb", UICrumb);
        }
    };
});
