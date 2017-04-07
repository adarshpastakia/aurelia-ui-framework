//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT

import {autoinject} from 'aurelia-framework';
import {UIApplication, UIHttpService, UIUtils, UILocalDS} from '../resources/index';
import * as _ from "lodash";

@autoinject()
export class TabSalesHistory {
  constructor(public app: UIApplication, public httpClient: UIHttpService) { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model, route) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  store;
  summary = { new: 0, renew: 0, rev: 0 };

  attached() {
    let data = [], sub = [], subc = [];

    subc = []
    subc.push({ label: 'Adelaide', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    subc.push({ label: 'Melbourne', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    subc.push({ label: 'Sydney', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Australia', new: _.sumBy(subc, 'new'), renew: _.sumBy(subc, 'renew'), rev: _.sumBy(subc, 'rev'), subdata: subc })

    subc = [];
    subc.push({ label: 'Beijing', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    subc.push({ label: 'Guangzhou', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    subc.push({ label: 'Shanghai', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'China', new: _.sumBy(subc, 'new'), renew: _.sumBy(subc, 'renew'), rev: _.sumBy(subc, 'rev'), subdata: subc })

    subc = [];
    subc.push({ label: 'Bangalore', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    subc.push({ label: 'Mumbai', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    subc.push({ label: 'New Delhi', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'India', new: _.sumBy(subc, 'new'), renew: _.sumBy(subc, 'renew'), rev: _.sumBy(subc, 'rev'), subdata: subc })

    subc = [];
    subc.push({ label: 'Bangkok', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    subc.push({ label: 'Phuket', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Thailand', new: _.sumBy(subc, 'new'), renew: _.sumBy(subc, 'renew'), rev: _.sumBy(subc, 'rev'), subdata: subc })

    data.push({ label: 'Asia', new: _.sumBy(sub, 'new'), renew: _.sumBy(sub, 'renew'), rev: _.sumBy(sub, 'rev'), subdata: sub, isOpen: true })

    sub = [];
    sub.push({ label: 'France', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Germany', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Italy', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'United Kingdom', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    data.push({ label: 'Europe', new: _.sumBy(sub, 'new'), renew: _.sumBy(sub, 'renew'), rev: _.sumBy(sub, 'rev'), subdata: sub, isOpen: true })

    sub = [];
    sub.push({ label: 'Bahrain', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Qatar', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Saudi Arabia', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'United Arab Emirates', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    data.push({ label: 'Middle East', new: _.sumBy(sub, 'new'), renew: _.sumBy(sub, 'renew'), rev: _.sumBy(sub, 'rev'), subdata: sub, isOpen: true })

    sub = [];
    sub.push({ label: 'Canada', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Bahamas', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Bermuda', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Unites States', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    data.push({ label: 'North America', new: _.sumBy(sub, 'new'), renew: _.sumBy(sub, 'renew'), rev: _.sumBy(sub, 'rev'), subdata: sub, isOpen: true })

    sub = [];
    sub.push({ label: 'Argentina', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Brazil', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Colombia', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    sub.push({ label: 'Ecuador', new: this.rnd(), renew: this.rnd(), rev: this.rnd(81900) })
    data.push({ label: 'South America', new: _.sumBy(sub, 'new'), renew: _.sumBy(sub, 'renew'), rev: _.sumBy(sub, 'rev'), subdata: sub, isOpen: true })

    this.store = new UILocalDS(data);

    this.summary.new = _.sumBy(data, 'new');
    this.summary.renew = _.sumBy(data, 'renew');
    this.summary.rev = _.sumBy(data, 'rev');

  }

  rnd(x = 81) {
    return Math.ceil(Math.random() * x);
  }

  total(record) {
    return record.new + record.renew;
  }

  totalSum(record) {
    return _.sumBy(record, 'new') + _.sumBy(record, 'renew');
  }

  recToggle(b) {
    _.forEach(this.store.data, d => { d.isOpen = b; });
  }

  isExporting = false;
  doExport() {
    this.isExporting = true;
    setTimeout(() => {
      UIUtils.toast({ message: 'Results exported', glyph: 'glyph-alert-notif' });
      this.isExporting = false;
    }, 1000);
  }
}
