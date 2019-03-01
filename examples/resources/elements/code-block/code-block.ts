/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";

@customElement("x-code-block")
@inlineView(`<template class="x-code-block \${lang}" data-page.bind="page">
<pre innerhtml.bind="code | code:lang"></pre>
</template>`)
export class CodeBlock {
  @bindable()
  public lang: "markdown" | "html" | "ts" | "scss" | "shell" = "markdown";
  @bindable() public page: string;
  @bindable() public code: string;
}
