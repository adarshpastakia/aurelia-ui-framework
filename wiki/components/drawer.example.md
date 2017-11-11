```html
<ui-section>
  <ui-toolbar class="ui-font-large">
    <ui-drawer-toggle drawer.bind="drawerLeft"></ui-drawer-toggle>
    <ui-filler>&nbsp;</ui-filler>
    <ui-drawer-toggle drawer.bind="drawerRight" glyph="glyph-handle-overflow"></ui-drawer-toggle>
  </ui-toolbar>

  <ui-drawer ref="drawerLeft" position="start" scroll padded>
    <compose view="../home/lipsum-small.html"></compose>
  </ui-drawer>
  
  <ui-drawer ref="drawerRight" position="end" scroll padded>
    <compose view="../home/lipsum-small.html"></compose>
  </ui-drawer>

  <ui-content max-height="400px" padded scroll>
    <compose view="../home/lipsum-big.html"></compose>
  </ui-content>
</ui-section>
```
