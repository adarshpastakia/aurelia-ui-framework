###### Simple Toolbar

```html
<ui-toolbar>
  <ui-input-group>
    <ui-input width="12em">
      <ui-input-addon glyph="icon-fill-search"></ui-input-addon>
    </ui-input>
    <ui-dropdown value="0">
      <ui-list-item value="0">Site</ui-list-item>
      <ui-list-item value="1">Posts</ui-list-item>
      <ui-list-item value="2">Docs</ui-list-item>
    </ui-dropdown>
  </ui-input-group>
  <ui-filler></ui-filler>
  <ui-button width="9em" glyph="glyph-icon-page" icon-hilight split theme="info" split-theme="blue" dropdown.bind="btnMenu">Click</ui-button>
  <ui-divider></ui-divider>
  <ui-button-group separator="or">
    <ui-button success width="6em">Save</ui-button>
    <ui-button danger width="6em">Cancel</ui-button>
  </ui-button-group>
</ui-toolbar>
```

###### Dark Theme Toolbar

```html
<ui-toolbar dark>
  <ui-input-group>
    <ui-input width="12em">
      <ui-input-addon glyph="icon-fill-search"></ui-input-addon>
    </ui-input>
    <ui-dropdown value="0">
      <ui-list-item value="0">Site</ui-list-item>
      <ui-list-item value="1">Posts</ui-list-item>
      <ui-list-item value="2">Docs</ui-list-item>
    </ui-dropdown>
  </ui-input-group>
  <ui-filler></ui-filler>
  <ui-button width="9em" glyph="glyph-icon-page" icon-hilight split dark dropdown.bind="btnMenu">Click</ui-button>
  <ui-divider></ui-divider>
  <ui-button-group separator="or">
    <ui-button dark width="6em">Save</ui-button>
    <ui-button muted width="6em">Cancel</ui-button>
  </ui-button-group>
</ui-toolbar>
```
