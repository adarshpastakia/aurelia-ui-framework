//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { bindable, customElement, containerless, bindingMode } from 'aurelia-framework';
import * as kramed from 'kramed';

@containerless()
@customElement('x-container')
export class Container {
  @bindable() pageTitle;
  @bindable() source = '';
  @bindable() wiki = '';
  @bindable() needRtl = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) dir = "ltr";
  currentView = 0;

  elSource: any = {};
  elWiki: any = {};
  attached() {
    if (this.source) this.elSource.innerHTML = this.renderHtml(this.source);
    if (this.wiki) this.elWiki.innerHTML = this.renderHtml(this.wiki);
  }

  sourceChanged(newValue) {
    if (newValue) this.elSource.innerHTML = this.renderHtml(newValue);
  }

  wikiChanged(newValue) {
    if (newValue) this.elWiki.innerHTML = this.renderHtml(newValue);
  }

  renderHtml(html, hilight = true) {
    let rend = new kramed.Renderer();
    rend.code = (code, lang) => {
      if (hilight && window.hljs) {
        code = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
        window.hljs.configure({
          useBR: true,
          tabReplace: '    '
        });
        return `<pre><code class="hljs ${lang} lang-${lang}">` + window.hljs.highlightAuto(code, [lang]).value + '</code></pre>';
      }
      else {
        return `<pre><code class="hljs ${lang} lang-${lang}">${code}</code></pre>`;
      }
    }
    return kramed(html, {
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      renderer: rend
    });
  }
}
