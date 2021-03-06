import { bindable, bindingMode, containerless, customElement, inlineView, computedFrom } from 'aurelia-framework';
import 'aurelia-event-aggregator';
import { U as UIInternal } from './ui-internal.js';
import { _ as __decorate, a as __metadata } from './_tslib.js';
import { B as BasePanel } from './base-panel.js';

var view = "<template>\n  <div ref=\"vmElement\" slot=\"page-alert\" class=\"ui-alert ui-alert--inline\" data-open.bind=\"open\">\n    <div class=\"ui-alert__wrapper\">\n      <div if.bind=\"icon\" class=\"ui-alert__icon\">\n        <ui-icon icon.bind=\"icon\"></ui-icon>\n      </div>\n      <div if.bind=\"alertTitle\" class=\"ui-alert__title\" innerhtml.bind=\"alertTitle\"></div>\n      <div class=\"ui-alert__body\"><slot></slot></div>\n      <div class=\"ui-alert__close\" click.trigger=\"close(false)\" if.bind=\"closeable\">\n        <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n      </div>\n      <div class=\"ui-alert__footer\" if.bind=\"type==='confirm'\">\n        <a click.trigger=\"close(false)\">${cancelLabel}</a>\n        <a click.trigger=\"close(true)\" ui-weight=\"bold\">${okLabel}</a>\n      </div>\n    </div>\n  </div>\n</template>\n";

let UIAlert = class UIAlert {
    constructor(element) {
        this.element = element;
        this.open = false;
        this.icon = "";
        this.alertTitle = "";
        this.okLabel = "OK";
        this.cancelLabel = "Cancel";
        this.type = "alert";
        this.closeable = false;
        this.closeable = element.hasAttribute("closeable");
    }
    close(result) {
        if (this.element.dispatchEvent(UIInternal.createEvent("close", result)) !== false) {
            this.open = false;
        }
    }
};
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Object)
], UIAlert.prototype, "open", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "icon", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "alertTitle", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "okLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIAlert.prototype, "cancelLabel", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIAlert.prototype, "type", void 0);
UIAlert = __decorate([
    containerless(),
    customElement("ui-alert"),
    inlineView(view),
    __metadata("design:paramtypes", [Element])
], UIAlert);

var view$1 = "<template class=\"ui-dialog__wrapper\" data-modal.bind=\"modal\" data-minimized.bind=\"minimized\" data-active.bind=\"active\" mousedown.trigger=\"activate()\">\n  <div class=\"ui-panel-base ui-dialog\" css.bind=\"css\" ref=\"dialogEl\">\n    <div class=\"ui-panel__header\" mousedown.delegate=\"startDrag($event)\">\n      <slot name=\"panel-header\">\n        <ui-header>\n          <ui-header-icon icon.bind=\"icon\" if.bind=\"icon\"></ui-header-icon>\n          <ui-header-title>${label}</ui-header-title>\n        </ui-header>\n      </slot>\n      <div class=\"ui-panel__header__actions\" if.bind=\"!hideToolbox\" mousedown.delegate=\"false\">\n        <ui-divider></ui-divider>\n        <ui-button if.bind=\"help\" class=\"ui-dlg--tool\" ui-theme=\"info\" type=\"tool\">\n          <ui-svg-icon ui-color=\"blue\" view-box=\"2 2 20 20\" icon=\"dlg-help\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"!maximizable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"maximized = !maximized\">\n          <ui-svg-icon ui-color=\"teal\" view-box=\"2 2 20 20\" icon.bind=\"maximized?'dlg-collapse':'dlg-expand'\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"modal || !minimizable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"minimize()\">\n          <ui-svg-icon ui-color=\"yellow\" view-box=\"2 2 20 20\" icon=\"dlg-minimize\"></ui-svg-icon>\n        </ui-button>\n        <ui-button disabled.bind=\"!closeable\" class=\"ui-dlg--tool\" type=\"tool\" click.trigger=\"close()\">\n          <ui-svg-icon ui-color=\"red\" view-box=\"2 2 20 20\" icon=\"dlg-close\"></ui-svg-icon>\n        </ui-button>\n      </div>\n    </div>\n    <div class=\"ui-panel__body\" ref=\"vmElement\">\n      <slot></slot>\n    </div>\n    <slot name=\"panel-footer\"></slot>\n  </div>\n</template>\n";

let UIDialogElement = class UIDialogElement {
    constructor(element) {
        this.element = element;
        this.label = "Dialog";
        this.icon = "";
        this.width = "50vw";
        this.minWidth = "36rem";
        this.maxWidth = "100%";
        this.height = "50vh";
        this.minHeight = "32rem";
        this.maxHeight = "100%";
        this.help = false;
        this.modal = false;
        this.closeable = true;
        this.maximizable = true;
        this.minimizable = true;
        this.hideToolbox = false;
        this.active = true;
        this.minimized = false;
        this.maximized = false;
        this.position = {
            bottom: "auto",
            left: "0",
            right: "auto",
            top: "0"
        };
        this.help = element.hasAttribute("help.trigger");
    }
    cancel() {
        this.close();
    }
    close(result) {
        UIInternal.broadcast("dlg:close", { dialog: this, result });
    }
    minimize() {
        this.minimized = !this.minimized;
        this.active = !this.minimized;
        UIInternal.broadcast("dlg:minimize", { dialog: this });
    }
    activate() {
        UIInternal.broadcast("dlg:activate", { dialog: this });
    }
    bind() {
        if (this.modal) {
            this.position = { bottom: "auto", left: "auto", right: "auto", top: "auto" };
        }
    }
    attached() {
        if (!this.modal) {
            const iconEl = this.element.querySelector(".ui-header__icon .ui-icon");
            if (iconEl) {
                this.icon = iconEl.au.controller.viewModel.icon;
            }
            this.taskButton = UIInternal.compileTemplate(`<template><ui-button size="sm" ui-theme="primary" type.bind="active?'solid':'default'" label.bind="label" icon.bind="icon"></ui-button></template>`, this);
        }
    }
    startDrag($event) {
        if ($event.button === 0) {
            $event.stopEvent();
            UIInternal.broadcast("dlg:drag", {
                dialog: this,
                startX: $event.x || $event.clientX,
                startY: $event.y || $event.clientY
            });
        }
    }
    get css() {
        const pos = Object.assign({ height: this.height, maxHeight: this.maxHeight, maxWidth: this.maxWidth, minHeight: this.minHeight, minWidth: this.minWidth, width: this.width }, this.position);
        if (this.maximized) {
            pos.top = pos.left = pos.right = pos.bottom = "0";
            pos.width = pos.height = "auto";
        }
        return pos;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDialogElement.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIDialogElement.prototype, "icon", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDialogElement.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDialogElement.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDialogElement.prototype, "maxWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDialogElement.prototype, "height", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDialogElement.prototype, "minHeight", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDialogElement.prototype, "maxHeight", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Object)
], UIDialogElement.prototype, "help", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.oneTime }),
    __metadata("design:type", Boolean)
], UIDialogElement.prototype, "modal", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Boolean)
], UIDialogElement.prototype, "closeable", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Boolean)
], UIDialogElement.prototype, "maximizable", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Boolean)
], UIDialogElement.prototype, "minimizable", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.toView }),
    __metadata("design:type", Boolean)
], UIDialogElement.prototype, "hideToolbox", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UIDialogElement.prototype, "beforeclose", void 0);
__decorate([
    computedFrom("width", "minWidth", "maxWidth", "height", "minHeight", "maxHeight", "minimized", "maximized", "position.left", "position.top"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UIDialogElement.prototype, "css", null);
UIDialogElement = __decorate([
    customElement("ui-dialog"),
    inlineView(view$1),
    __metadata("design:paramtypes", [Element])
], UIDialogElement);

let UIDrawer = class UIDrawer {
    constructor(element) {
        this.element = element;
        this.align = "start";
        this.width = "24rem";
        this.maxWidth = "40vw";
        this.push = false;
        this.closeOnClick = false;
        this.isAttached = false;
        this.push = element.hasAttribute("push");
        this.closeOnClick =
            element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
        this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target => !this.closeOnClick && hasParent(target, "ui-drawer__body", "ui-drawer")
            ? undefined
            : (element.dataset.peek = "false"));
    }
    attached() {
        UIInternal.queueTask(() => this.element.nextElementSibling.style.setProperty("--drawer-width", this.width));
        this.isAttached = true;
    }
    detached() {
        if (this.obClick) {
            this.obClick.dispose();
        }
    }
    widthChanged() {
        if (this.isAttached) {
            this.element.nextElementSibling.style.setProperty("--drawer-width", this.width);
        }
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDrawer.prototype, "align", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDrawer.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIDrawer.prototype, "maxWidth", void 0);
UIDrawer = __decorate([
    customElement("ui-drawer"),
    inlineView(`<template class="ui-drawer" data-push.bind="push" data-align.bind="align">
<div class="ui-drawer__shim"></div>
<div class="ui-drawer__body" css.bind="{width, maxWidth}">
  <slot></slot>
</div>
</template>
`),
    __metadata("design:paramtypes", [Element])
], UIDrawer);

let UIDrawerToggle = class UIDrawerToggle {
    toggleOpen() {
        this.drawer.dataset.peek = `${!isTrue(this.drawer.dataset.peek)}`;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", HTMLElement)
], UIDrawerToggle.prototype, "drawer", void 0);
UIDrawerToggle = __decorate([
    customElement("ui-drawer-toggle"),
    inlineView("<template class='ui-drawer__toggler' click.trigger='toggleOpen()'><slot><ui-svg-icon icon='menu'></ui-svg-icon></slot></template>")
], UIDrawerToggle);

let UIFooter = class UIFooter {
    constructor(element) {
        this.element = element;
    }
};
UIFooter = __decorate([
    containerless(),
    customElement("ui-footer"),
    inlineView(`<template><div class="ui-footer" slot="panel-footer" ref="vmElement"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIFooter);

let UIHeader = class UIHeader {
    constructor(element) {
        this.element = element;
        this.label = "";
        this.icon = "";
    }
};
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIHeader.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Object)
], UIHeader.prototype, "icon", void 0);
UIHeader = __decorate([
    containerless(),
    customElement("ui-header"),
    inlineView(`<template><div class="ui-header" slot="panel-header" ref="vmElement">
  <slot name="header-icon"><div class="ui-header__icon" if.bind="icon"><ui-icon icon.bind="icon"></ui-icon></div></slot>
  <slot name="header-title"><div class="ui-header__title" if.bind="label" innerhtml.bind="label"></div></slot>
  <slot name="header-actions"></slot>
  </div></template>`),
    __metadata("design:paramtypes", [Element])
], UIHeader);

let UIHeaderActions = class UIHeaderActions {
    constructor(element) {
        this.element = element;
    }
};
UIHeaderActions = __decorate([
    containerless(),
    customElement("ui-header-actions"),
    inlineView(`<template><div ref="vmElement" slot="header-actions" class="ui-header__actions"><slot></slot></div></template>`),
    __metadata("design:paramtypes", [Element])
], UIHeaderActions);

let UIHeaderIcon = class UIHeaderIcon {
    constructor(element) {
        this.element = element;
        this.icon = "";
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIHeaderIcon.prototype, "icon", void 0);
UIHeaderIcon = __decorate([
    containerless(),
    customElement("ui-header-icon"),
    inlineView(`<template><div ref="vmElement" slot="header-icon" class='ui-header__icon'><slot><ui-icon icon.bind="icon"></ui-icon></slot></div></template>`),
    __metadata("design:paramtypes", [Element])
], UIHeaderIcon);

let UIHeaderTitle = class UIHeaderTitle {
    constructor(element) {
        this.element = element;
    }
};
UIHeaderTitle = __decorate([
    containerless(),
    customElement("ui-header-title"),
    inlineView(`<template><div ref="vmElement" slot="header-title" class='ui-header__title'><slot></slot></div></template>`),
    __metadata("design:paramtypes", [Element])
], UIHeaderTitle);

var view$2 = "<template class=\"ui-panel-base ui-panel\" css.bind=\"{width, minWidth, maxWidth}\" data-expanded.bind=\"expanded\" data-collapsed.bind=\"collapsed\">\n  <div class=\"ui-panel__header\">\n    <slot name=\"panel-header\">\n      <ui-header>\n        <slot name=\"header-icon\" slot=\"header-icon\">\n          <ui-header-icon if.bind=\"icon\" icon.bind=\"icon\"></ui-header-icon>\n        </slot>\n        <slot name=\"header-title\" slot=\"header-title\">\n          <ui-header-title if.bind=\"label\">${label}</ui-header-title>\n        </slot>\n        <slot name=\"header-actions\"></slot>\n      </ui-header>\n    </slot>\n    <div class=\"ui-panel__header__actions\" if.bind=\"collapsible || closeable || expandable\">\n      <ui-divider></ui-divider>\n      <template if.bind=\"expandable\">\n        <ui-button type=\"tool\" click.trigger=\"toggleExpand(!expanded)\">\n          <ui-svg-icon icon.bind=\"expanded?'collapse':'expand'\"></ui-svg-icon>\n        </ui-button>\n      </template>\n      <template if.bind=\"collapsible && !expanded\">\n        <ui-button type=\"tool\" click.trigger=\"toggleCollapse(!collapsed)\">\n          <ui-svg-icon icon.bind=\"collapsed?'plus':'minus'\"></ui-svg-icon>\n        </ui-button>\n      </template>\n      <template if.bind=\"closeable\">\n        <ui-button type=\"tool\" click.trigger=\"close()\">\n          <ui-svg-icon icon=\"cross\"></ui-svg-icon>\n        </ui-button>\n      </template>\n    </div>\n  </div>\n  <div class=\"ui-panel__body\" css.bind=\"{height, minHeight, maxHeight}\">\n    <slot></slot>\n  </div>\n  <slot name=\"panel-footer\"></slot>\n</template>\n";

let UIPanel = class UIPanel extends BasePanel {
    constructor(element) {
        super();
        this.element = element;
        this.label = "";
        this.icon = "";
        this.collapsed = false;
        this.expanded = false;
        this.width = "";
        this.minWidth = "16rem";
        this.maxWidth = "100vw";
        this.height = "";
        this.minHeight = "unset";
        this.maxHeight = "100vh";
        this.closeable = false;
        this.expandable = false;
        this.collapsible = false;
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "icon", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Boolean)
], UIPanel.prototype, "collapsed", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Boolean)
], UIPanel.prototype, "expanded", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "maxWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "height", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "minHeight", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UIPanel.prototype, "maxHeight", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Function)
], UIPanel.prototype, "beforeclose", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIPanel.prototype, "closeable", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIPanel.prototype, "expandable", void 0);
__decorate([
    bindable(),
    __metadata("design:type", Boolean)
], UIPanel.prototype, "collapsible", void 0);
UIPanel = __decorate([
    customElement("ui-panel"),
    inlineView(view$2),
    __metadata("design:paramtypes", [Element])
], UIPanel);

var view$3 = "<template class=\"ui-sidebar\" click.delegate=\"headTrigger === 'toggle' ? collapsed = false : peek = true\" data-peek.bind=\"peek\" data-collapsed.bind=\"collapsed\" data-position.bind=\"position\" data-align.bind=\"align\">\n  <div class=\"ui-sidebar__titlebar\" ui-bg.bind=\"titleBg\" ui-color.bind=\"titleColor\" ui-weight.bind=\"titleWeight\" if.bind=\"collapsible || label\" click.trigger=\"[collapsed = collapsible && !collapsed, $event.stopEvent()]\" css.bind=\"{width}\">\n    <div class=\"ui-sidebar__toggler\" if.bind=\"collapsible\">\n      <ui-svg-icon icon.bind=\"toggleIcon\"></ui-svg-icon>\n    </div>\n    <div class=\"ui-sidebar__title\" ui-color.bind=\"collapsed ? titleBg : ''\">\n      <slot name=\"sidebar-title\"><span if.bind=\"label\" innerhtml.bind=\"label\"></span></slot>\n    </div>\n  </div>\n  <div class=\"ui-sidebar__body\" css.bind=\"{width, maxWidth, minWidth}\" ref=\"bodyEl\">\n    <slot></slot>\n  </div>\n  <div class=\"ui-sidebar__resizer\" if.bind=\"resizeable\" data-resizing.bind=\"isResizing\" mousedown.trigger=\"startResize($event)\"></div>\n</template>\n";

let UISidebar = class UISidebar {
    constructor(element) {
        this.element = element;
        this.position = "start";
        this.width = "24rem";
        this.maxWidth = "40vw";
        this.minWidth = "4rem";
        this.align = "top";
        this.headTrigger = "peek";
        this.collapsed = false;
        this.peek = false;
        this.resizeable = false;
        this.collapsible = false;
        this.closeOnClick = false;
        this.startX = 0;
        this.isResizing = false;
        this.doResize = e => this.resize(e);
        this.endResize = () => this.stopResize();
        this.resizeable = element.hasAttribute("resizeable");
        this.collapsible = element.hasAttribute("collapsible");
        this.closeOnClick =
            element.hasAttribute("close-on-click") && !isFalse(element.getAttribute("close-on-click"));
        this.obClick = UIInternal.subscribe(UIInternal.EVT_VIEWPORT_CLICK, target => !this.peek || (!this.closeOnClick && hasParent(target, "ui-sidebar__body", "ui-sidebar"))
            ? undefined
            : UIInternal.queueTask(() => (this.peek = false)));
    }
    detached() {
        if (this.obClick) {
            this.obClick.dispose();
        }
    }
    get toggleIcon() {
        return `${this.collapsed ? "expand" : "collapse"}-${this.position}`;
    }
    startResize($event) {
        if ($event.button === 0 && !this.isResizing) {
            this.startX = $event.x || $event.clientX;
            this.isResizing = true;
            document.addEventListener("mousemove", this.doResize);
            document.addEventListener("mouseup", this.endResize);
            $event.stopEvent();
        }
    }
    resize($event) {
        if (this.isResizing) {
            let diff = ($event.x || $event.clientX) - this.startX;
            if (this.position === "end") {
                diff = -1 * diff;
            }
            if (isRtl(this.element)) {
                diff = -1 * diff;
            }
            const newWidth = this.bodyEl.offsetWidth + diff;
            if (newWidth <= convertToPx(this.maxWidth) && newWidth >= convertToPx(this.minWidth)) {
                this.width = newWidth + "px";
                this.startX = $event.x || $event.clientX;
            }
            $event.stopEvent();
        }
    }
    stopResize() {
        this.isResizing = false;
        document.removeEventListener("mousemove", this.doResize);
        document.removeEventListener("mouseup", this.endResize);
    }
};
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "position", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "label", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "width", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "maxWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "minWidth", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "titleBg", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "titleColor", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "titleWeight", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "align", void 0);
__decorate([
    bindable(),
    __metadata("design:type", String)
], UISidebar.prototype, "headTrigger", void 0);
__decorate([
    bindable({ defaultBindingMode: bindingMode.twoWay }),
    __metadata("design:type", Boolean)
], UISidebar.prototype, "collapsed", void 0);
__decorate([
    computedFrom("collapsed", "position"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UISidebar.prototype, "toggleIcon", null);
UISidebar = __decorate([
    customElement("ui-sidebar"),
    inlineView(view$3),
    __metadata("design:paramtypes", [Element])
], UISidebar);

let UIToolbar = class UIToolbar {
    constructor(element) {
        this.element = element;
        if (element.hasAttribute("align-end")) {
            element.classList.add("ui-row--end");
        }
    }
};
UIToolbar = __decorate([
    customElement("ui-toolbar"),
    inlineView(`<template class="ui-toolbar"><slot></slot></template>`),
    __metadata("design:paramtypes", [Element])
], UIToolbar);

const Panels = [
    UIHeader,
    UIHeaderIcon,
    UIHeaderTitle,
    UIHeaderActions,
    UIFooter,
    UIDrawer,
    UIDrawerToggle,
    UISidebar,
    UIToolbar,
    UIPanel,
    UIDialogElement,
    UIAlert
];

export { Panels };
//# sourceMappingURL=ui-panels.js.map
