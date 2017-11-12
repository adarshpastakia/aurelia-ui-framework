//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, inlineView, bindable } from 'aurelia-framework';
import { UIEvent } from "aurelia-ui-framework";

@autoinject()
@inlineView('<template><div class="ui-bg-info ui-pad-all">Lifecycle tester injected</div></template>')
export class DlgLifecycle {
  constructor(public element: Element) { }

  created() { UIEvent.fireEvent('lifecycle', this.element, 'created'); }
  bind(bindingContext) { UIEvent.fireEvent('lifecycle', this.element, 'bind'); }
  attached() { UIEvent.fireEvent('lifecycle', this.element, 'attached'); }
  detached() { UIEvent.fireEvent('lifecycle', this.element, 'detached'); }
  unbind() { UIEvent.fireEvent('lifecycle', this.element, 'unbind'); }
}
