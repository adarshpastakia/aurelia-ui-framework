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
    var aurelia_framework_1, ui_event_1, UIBreadcrumb, UICrumb;
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
                return UIBreadcrumb;
            }());
            UIBreadcrumb = __decorate([
                aurelia_framework_1.autoinject(),
                aurelia_framework_1.inlineView("<template class=\"ui-breadcrumb\" crumbclicked.delegate=\"fireChange($event)\"><slot></slot></template>"),
                aurelia_framework_1.customElement('ui-breadcrumb'),
                __metadata("design:paramtypes", [Element])
            ], UIBreadcrumb);
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
                return UICrumb;
            }());
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
            exports_1("UICrumb", UICrumb);
        }
    };
});
