/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */

export class ViewportPage {
  protected appHtml = `<template>
  <ui-viewport>
    <ui-viewport-header
      ui-padding="x--md" 
      ui-font="lg" 
      ui-bg="primary-dark" 
      ui-color="white">App Title</ui-viewport-header>

    <ui-menubar>...</ui-menubar>
    
    <ui-router-view></ui-router-view>

    <ui-viewport-footer 
      ui-align="end" 
      ui-padding="x" 
      ui-color="gray" 
      ui-font="sm">Copyright © 2019</ui-viewport-footer>
  </ui-viewport>
</template>`;
}
