//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject} from 'aurelia-framework';
import {UIFormat, moment} from '../resources/index';

@autoinject()
export class ExampleDashboard {
  constructor() { }

  // aurelia hooks
  // canActivate(model) { return true; }
  // activate(model) { return true; }
  // bind(bindingContext) { }
  // attached() { }
  // detached() { }
  // unbind() { }
  // deactivate() { }
  // end aurelia hooks

  retentions = {}
  colors = ['#F2FAFA', '#D9F0F0', '#BFE6E6', '#A6DBDB', '#8CD1D1', '#73C7C7', '#59BDBD', '#40B2B2', '#26A8A8', '#0D9E9E']

  bind() {
    for (let i = 6; i > 0; i--) {
      let nums = []
      let dt = moment().add(-1 * i, 'week').startOf('week');
      for (let w = 0; w < i; w++)nums.push(Math.ceil(Math.random() * 81));
      this.retentions[dt.format('DD MMM')] = nums;
    }
  }

  getRetentionStyle(v) {
    return this.colors[Math.floor(v / 10)];
  }

  getRetentionTip(count, day, week) {
    return `<strong>${UIFormat.number(count / 100, '0%')}</strong>&nbsp;devices installed on&nbsp;<strong>${day}</strong><br/>were active &nbsp;<strong>${week} week(s)</strong>&nbsp;later.`;
  }
}
