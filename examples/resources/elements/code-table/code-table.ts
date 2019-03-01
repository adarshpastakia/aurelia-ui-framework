/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

import { bindable, customElement, inlineView } from "aurelia-framework";
// import "./code-block.scss";

@customElement("x-code-table")
@inlineView(`<template class="x-code-table">
<caption if.bind="codeTemplate.title" ui-margin="t" ui-align="start" ui-font="md" ui-border="b">
  <code innerhtml.bind="codeTemplate.title" ui-color="blue"></code></caption>

<template if.bind="codeTemplate.attrs">
<table class="x-code-table">
<colgroup><col width="180px"/><col width="140px"/><col width="320px"/></colgroup>
<caption ui-align="start" ui-margin="t" ui-weight="bold" ui-color="gray">Attributes</caption>
<thead><th>Attribute</th><th>Default</th><th>Values</th><th/></thead>
<tbody><tr repeat.for="attr of codeTemplate.attrs">
<td><code><b innerhtml.bind="attr.name"></b></code></td>
<td><code if.bind="attr.default"><i innerhtml.bind="attr.default"></i></code></td>
<td><i if.bind="attr.values" class="ui-color--muted" innerhtml.bind="attr.values"></i></td>
<td innerhtml.bind="attr.description"></td>
</tr></tbody>
</table>
</template>

<template if.bind="codeTemplate.props">
<table class="x-code-table">
<colgroup><col width="320px"/><col width="320px"/></colgroup>
<caption ui-align="start" ui-margin="t" ui-weight="bold" ui-color="gray">Properties</caption>
<thead><th>Property</th><th>Default</th><th/></thead>
<tbody><tr repeat.for="prop of codeTemplate.props">
<td><code><b innerhtml.bind="prop.name"></b></code></td>
<td><code if.bind="prop.default"><i innerhtml.bind="prop.default"></i></code></td>
<td innerhtml.bind="prop.description"></td>
</tr></tbody>
</table>
</template>

<template if.bind="codeTemplate.methods">
<table class="x-code-table">
<colgroup><col width="320px"/><col width="320px"/></colgroup>
<caption ui-align="start" ui-margin="t" ui-weight="bold" ui-color="gray">Methods</caption>
<thead><th>Method</th><th>Params</th><th/></thead>
<tbody><tr repeat.for="method of codeTemplate.methods">
<td><code><b innerhtml.bind="method.name"></b></code></td>
<td><code if.bind="method.params" innerhtml.bind="method.params"></code></td>
<td innerhtml.bind="method.description"></td>
</tr></tbody>
</table>
</template>

<template if.bind="codeTemplate.events">
<table class="x-code-table">
<colgroup><col width="320px"/><col width="320px"/></colgroup>
<caption ui-align="start" ui-margin="t" ui-weight="bold" ui-color="gray">Events</caption>
<thead><th>Event</th><th>$event.detail</th><th/></thead>
<tbody><tr repeat.for="event of codeTemplate.events">
<td><code><b innerhtml.bind="event.name"></b></code></td>
<td><code if.bind="event.params" innerhtml.bind="event.params"></code></td>
<td innerhtml.bind="event.description"></td>
</tr></tbody>
</table>
</template>

<template if.bind="codeTemplate.sass">
<table class="x-code-table">
<colgroup><col width="320px"/><col width="320px"/></colgroup>
<caption ui-align="start" ui-margin="t" ui-weight="bold" ui-color="gray">Sass Variables</caption>
<thead><th>Variable</th><th>Default</th><th/></thead>
<tbody><tr repeat.for="var of codeTemplate.sass">
<td><code><b innerhtml.bind="var.name"></b></code></td><td><code innerhtml.bind="var.default"></code></td><td innerhtml.bind="var.description"></td>
</tr></tbody>
</table>
</template>

<template if.bind="codeTemplate.classes">
<table class="x-code-table">
<colgroup><col width="320px"/><col/></colgroup>
<caption ui-align="start" ui-margin="t" ui-weight="bold" ui-color="gray">CSS Classes</caption>
<thead><th>Class</th><th/></thead>
<tbody><tr repeat.for="class of codeTemplate.classes">
<td><code><b innerhtml.bind="class.name"></b></code></td><td innerhtml.bind="class.description"></td>
</tr></tbody>
</table>
</template>

</table></template>`)
export class CodeTable {
  @bindable() public codeTemplate: AnyObject;
}
