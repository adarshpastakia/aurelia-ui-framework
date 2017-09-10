//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import {autoinject, customAttribute, bindable, bindingMode, children, inlineView, useView, containerless, View, DOM} from 'aurelia-framework';
import * as kramed from "kramed";

@autoinject()
@customAttribute('mdview')
export class MdView {
  constructor(public element: Element) {
  }

  value = '';

  attached() {
    let html = this.element.innerHTML;

    html = html.replace('<xmp>', '').replace('</xmp>', '');

    let pre = html.match(/^[ \\t]+/);
    if (pre) html = html.replace(new RegExp(`^[ \\t]{${pre[0].length},${pre[0].length}}`, 'gm'), '');
    // this.element.innerHTML = UIFormat.toHTML('```' + this.value + '\n' + html + '\n```');
    let rend = new kramed.Renderer();
    rend.code = (code, lang) => {
      code = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
      if (window.hljs) {
        window.hljs.configure({
          useBR: true,
          tabReplace: '    '
        });
        return `<pre><code class="hljs ${lang} lang-${lang}">` + window.hljs.highlightAuto(code, [lang]).value + '</code></pre>';
      }
      return `<pre><code class="hljs ${lang} lang-${lang}">${code}</code></pre>`;
    }

    this.element.innerHTML = kramed('```' + this.value + '\n' + html + '\n```', {
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
