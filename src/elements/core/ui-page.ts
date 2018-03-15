//
// @description :
// @author      : Adarsh Pastakia
// @copyright   : 2017
// @license     : MIT
import { autoinject, customElement, bindable, inlineView } from 'aurelia-framework';

@autoinject()
@customElement('ui-page')
@inlineView(`
<template class="ui-page ui-column-fill ui-row ui-row-v ui-align-stretch ui-nowrap">
  <div class="ui-page-title ui-column-auto" if.bind="pageTitle" innerhtml.bind="pageTitle"></div>
  <div class="ui-page-body ui-column-fill ui-row ui-row-v ui-align-stretch \${pageClass}"><slot></slot></div>
</template>`)
export class UIPage {
  constructor(public element: Element) {
    if (element.hasAttribute('animate')) element.classList.add('au-animate');
  }
  @bindable() pageClass = '';
  @bindable() pageTitle;
}

@autoinject()
@customElement('ui-section')
@inlineView(`<template class="ui-section ui-column-fill ui-row ui-align-stretch ui-nowrap"><slot></slot></template>`)
export class UISection {
  constructor(public element: Element) {
    if (element.hasAttribute('animate')) element.classList.add('au-animate');
    // LAYOUT
    if (element.hasAttribute('row-layout')) element.classList.add('ui-row-h');
    else element.classList.add('ui-row-v');
    // ALIGNMENT
    if (element.hasAttribute('center')) element.classList.add('ui-justify-center');
    if (element.hasAttribute('middle')) element.classList.add('ui-align-center');
  }
}


@autoinject()
@customElement('ui-content')
@inlineView(`<template class="ui-content ui-column-fill"><slot></slot></template>`)
export class UIContent {
  constructor(public element: Element) {
    if (element.hasAttribute('animate')) element.classList.add('au-animate');
    if (element.hasAttribute('padded')) element.classList.add('ui-pad-all');
    if (element.hasAttribute('scroll')) element.classList.add('ui-scroll');
    if (element.hasAttribute('compact')) element.classList.add('ui-compact');
  }
}

@autoinject()
@customElement('ui-glyph')
@inlineView(`<template class="ui-icon \${glyph}"><svg if.bind="glyph"><use tabindex="-1" x="0" y="0" xlink:href="#\${glyph}"/></svg></template>`)
export class UIGlyph {
  constructor(public element: Element) { }
  @bindable() glyph = '';
}

@autoinject()
@customElement('ui-divider')
@inlineView(`<template class="ui-divider"></template>`)
export class UIDivider { }

@autoinject()
@customElement('ui-loader')
@inlineView(`<template class="ui-loader" show.bind="busy">
  <div class="ui-loader-el">
    <ui-glyph class="ui-anim-loader" glyph="glyph-busy"></ui-glyph>
  </div>
</template>`)
export class UILoader {
  constructor(element: Element) {
    if (element.hasAttribute('small')) element.classList.add('ui-small');
    if (element.hasAttribute('large')) element.classList.add('ui-large');
  }

  @bindable() busy: boolean = false;
}
