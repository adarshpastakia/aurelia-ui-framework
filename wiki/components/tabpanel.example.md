###### Simple TabPanel

```html
<ui-tab-panel>
  <ui-tab label="Tab 1" padded scroll glyph="glyph-icon-home">
    <!-- any Composed view or Datagrid or any Content -->
  </ui-tab>
  <ui-tab label="Tab 2" disabled="true">
    <!-- any Composed view or Datagrid or any Content -->
  </ui-tab>
  <ui-tab label="Tab 3" closeable padded scroll beforeclose.call="doSomething()">
    <!-- any Composed view or Datagrid or any Content -->
  </ui-tab>
</ui-tab-panel>
```
