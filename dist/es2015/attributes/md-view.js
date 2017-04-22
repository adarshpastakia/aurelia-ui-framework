var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject, customAttribute } from 'aurelia-framework';
import * as kramed from "kramed";
let MdView = class MdView {
    constructor(element) {
        this.element = element;
        this.value = '';
    }
    attached() {
        let html = this.element.innerHTML;
        html = html.replace('<xmp>', '').replace('</xmp>', '');
        let pre = html.match(/^[ \\t]+/);
        if (pre)
            html = html.replace(new RegExp(`^[ \\t]{${pre[0].length},${pre[0].length}}`, 'gm'), '');
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
        };
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
};
MdView = __decorate([
    autoinject(),
    customAttribute('mdview'),
    __metadata("design:paramtypes", [Element])
], MdView);
export { MdView };
