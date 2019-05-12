import { DOM } from 'aurelia-framework';
import { a as UIInternal } from './chunk2.js';

class BasePanel {
    constructor() {
        this.pinned = false;
        this.expanded = false;
        this.collapsed = false;
        this.closeable = false;
        this.expandable = false;
        this.collapsible = false;
    }
    close() {
        return UIInternal.fireCallbackEvent(this, "beforeclose").then(b => (b ? this.remove() : false));
    }
    bind() {
        this.closeable = !isFalse(this.closeable);
        this.expandable = !isFalse(this.expandable);
        this.collapsible = !isFalse(this.collapsible);
    }
    toggleExpand(expand) {
        this.expanded = expand;
        this.element.dispatchEvent(UIInternal.createEvent("expand", this.expanded));
    }
    toggleCollapse(collapse) {
        this.collapsed = collapse;
    }
    remove() {
        this.element.dispatchEvent(UIInternal.createEvent("close"));
        UIInternal.queueTask(() => DOM.removeNode(this.element));
        return true;
    }
}

export { BasePanel as a };
//# sourceMappingURL=chunk7.js.map
