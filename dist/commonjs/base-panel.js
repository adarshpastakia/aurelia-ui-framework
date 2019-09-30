'use strict';

var aureliaFramework = require('aurelia-framework');
var uiInternal = require('./ui-internal.js');

var BasePanel = (function () {
    function BasePanel() {
        this.pinned = false;
        this.expanded = false;
        this.collapsed = false;
        this.closeable = false;
        this.expandable = false;
        this.collapsible = false;
    }
    BasePanel.prototype.close = function () {
        var _this = this;
        return uiInternal.UIInternal.fireCallbackEvent(this, "beforeclose").then(function (b) { return (b ? _this.remove() : false); });
    };
    BasePanel.prototype.bind = function () {
        this.closeable = !isFalse(this.closeable);
        this.expandable = !isFalse(this.expandable);
        this.collapsible = !isFalse(this.collapsible);
    };
    BasePanel.prototype.toggleExpand = function (expand) {
        this.expanded = expand;
        this.element.dispatchEvent(uiInternal.UIInternal.createEvent("expand", this.expanded));
    };
    BasePanel.prototype.toggleCollapse = function (collapse) {
        this.collapsed = collapse;
    };
    BasePanel.prototype.remove = function () {
        var _this = this;
        this.element.dispatchEvent(uiInternal.UIInternal.createEvent("close"));
        uiInternal.UIInternal.queueTask(function () { return aureliaFramework.DOM.removeNode(_this.element); });
        return true;
    };
    return BasePanel;
}());

exports.BasePanel = BasePanel;
//# sourceMappingURL=base-panel.js.map
