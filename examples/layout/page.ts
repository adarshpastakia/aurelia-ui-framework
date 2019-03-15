/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class PagesPage {
  protected simplePage = `<template>
  <ui-page page-title="Title">
    <ui-content ui-scroll ui-padding>...</ui-content>
  </ui-page>
</template>`;

  protected complexPage = `<template>
  <ui-page page-title="Title">
    <ui-section-head>
      <ui-breadcrumbs>...</ui-breadcrumbs>
    </ui-section-head>

    <ui-section-foot>
      <ui-toolbar>...</ui-toolbar>
    </ui-section-foot>

    <ui-sidebar collapsible>...</ui-sidebar>

    <ui-content ui-scroll ui-padding>...</ui-content>

  </ui-page>
</template>`;
}
