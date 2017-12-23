var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { computedFrom } from 'aurelia-framework';
import * as _ from "lodash";
export class UITreeModel {
    constructor(model, level = -1, parent) {
        this.children = [];
        this.parent = null;
        this.isVisible = true;
        if (_.isArray(model))
            model = { id: 'root', children: model };
        this.id = model.id || ('node-' + (UITreeModel.seed++));
        this.text = model.name || model.text;
        this.level = level;
        this.extra = model.extra;
        this.icon = model.icon;
        this.openIcon = model.openIcon;
        this.closedIcon = model.closedIcon;
        this.root = level == -1;
        this.leaf = model.leaf;
        this.active = model.active || false;
        this.expanded = model.expanded || false;
        this.checked = model.checked ? 1 : 0;
        this.parent = parent;
        _.each(model.children, (m) => {
            this.children.push(new UITreeModel(m, level + 1, this));
        });
        this.updatePartial();
    }
    set isChecked(v) {
        this.checked = v = v ? 1 : 0;
        _.forEach(this.children, (c) => {
            c.updateChild('checked', v);
        });
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    }
    get data() {
        return {
            id: this.id,
            text: this.text,
            level: this.level,
            extra: this.extra
        };
    }
    expandToggle(v) {
        _.forEach(this.children, (c) => {
            c.expanded = v;
            if (v === false)
                c.updateChild('expanded', false);
        });
    }
    updateChild(prop, v) {
        this[prop] = v;
        _.forEach(this.children, (c) => {
            c.updateChild(prop, v);
        });
    }
    updatePartial() {
        if (this.children && this.children.length > 0) {
            var c = _.countBy(this.children, 'checked');
            var v = 2;
            if (!c[1] && !c[2]) {
                v = 0;
            }
            if (!c[0] && !c[2]) {
                v = 1;
            }
            this.checked = v;
        }
        if (this.parent && this.parent.updatePartial) {
            this.parent.updatePartial();
        }
    }
    get isLeaf() {
        return this.leaf && !this.icon;
    }
}
UITreeModel.seed = 0;
__decorate([
    computedFrom('leaf', 'icon'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], UITreeModel.prototype, "isLeaf", null);
