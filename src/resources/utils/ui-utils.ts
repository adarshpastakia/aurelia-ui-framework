// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {Container, Lazy, NewInstance} from "aurelia-framework";

export module UIUtils {
  export var auContainer: Container;

  export function lazy(T): any {
    if (!this.auContainer) {
      throw new Error('UIUtils.Lazy::Container not set');
    }
    return Lazy.of(T).get(this.auContainer)();
  }

  export function newInstance(T, container): any {
    if (!this.auContainer) {
      throw new Error('UIUtils.newInstance::Container not provided');
    }
    return NewInstance.of(T).get(this.auContainer);
  }

  export function tether(parent, child, opts?) {
    opts = Object.assign({ resize: true, position: 'bl' }, opts);
    child.style.position = 'fixed';

    return new (function(el, dd, options) {
      this.listeners = [];
      this.dispose = () => {
        this.listeners.forEach(parent => {
          parent.removeEventListener('scroll', this.position);
          parent.removeEventListener('touchstart', this.position);
        })
        window.removeEventListener('resize', this.position);
      }
      this.position = (sizeWidth = false, topLeft = false) => {
        let pos = el.getBoundingClientRect();
        if (options.resize) dd.style.minWidth = pos.width + 'px';

        el.classList.remove('ui-tether-top');
        el.classList.remove('ui-tether-bottom');
        el.classList.remove('ui-tether-left');
        el.classList.remove('ui-tether-right');

        dd.classList.remove('ui-tether-top');
        dd.classList.remove('ui-tether-bottom');
        dd.classList.remove('ui-tether-left');
        dd.classList.remove('ui-tether-right');

        let align = options.position.split('');

        if (align[0] == 't') {
          dd.classList.add('ui-tether-top');
          el.classList.add('ui-tether-bottom');

          dd.style.top = pos.top + 'px';
          dd.style.transform = 'translateY(0)';
        }
        else {
          if (pos.bottom + dd.offsetHeight > window.innerHeight) {
            el.classList.add('ui-tether-top');
            dd.classList.add('ui-tether-bottom');

            dd.style.top = pos.top + 'px';
            dd.style.transform = 'translateY(-100%)';
          }
          else {
            dd.classList.add('ui-tether-top');
            el.classList.add('ui-tether-bottom');

            dd.style.top = pos.bottom + 'px';
            dd.style.transform = 'translateY(0)';
          }
        }

        if (align[1] == 'r') {
          dd.classList.add('ui-tether-right');
          el.classList.add('ui-tether-right');

          dd.style.left = pos.right + 'px';
          dd.style.transform += ' translateX(-100%)';
        }
        else {
          if (pos.left + dd.offsetWidth > window.innerWidth) {
            dd.classList.add('ui-tether-right');
            el.classList.add('ui-tether-right');

            dd.style.left = pos.right + 'px';
            dd.style.transform += ' translateX(-100%)';
          }
          else {
            dd.classList.add('ui-tether-left');
            el.classList.add('ui-tether-left');

            dd.style.left = pos.left + 'px';
            dd.style.transform += ' translateX(0)';
          }
        }
      };;

      let parent = el.parentElement;
      do {
        let cs = getComputedStyle(parent);
        if (!(['scroll', 'auto'].indexOf(cs.overflowX) == -1 && ['scroll', 'auto'].indexOf(cs.overflowX) == -1)) {
          this.listeners.push(parent);
          parent.addEventListener('scroll', this.position);
          parent.addEventListener('touchstart', this.position);
        }
        parent = parent.parentElement;
      } while (parent != null)
      window.addEventListener('resize', this.position);

      this.position();
    })(parent, child, opts);
  }
}