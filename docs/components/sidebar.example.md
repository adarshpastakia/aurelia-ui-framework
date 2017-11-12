###### Simple Sidebar

```html
<ui-section row-layout>
  <ui-sidebar label="Sidebar" padded scroll>
    <compose view="../home/lipsum-small.html"></compose>
  </ui-sidebar>
  <ui-content padded scroll>
    <compose view="../home/lipsum-big.html"></compose>
  </ui-content>
  <ui-sidebar collapsible label="Sidebar" scroll padded position="end">
    <compose view="../home/lipsum-small.html"></compose>
  </ui-sidebar>
</ui-section>
```

###### Collapsible mini-display
```html
<ui-section row-layout>
  <ui-sidebar label="Sidebar" mini-display scroll collapsible>
    <ui-menu ref="btnMenu">
      <ui-menu-item glyph="icon-moon-pencil2">Edit</ui-menu-item>
      <ui-menu-item glyph="icon-moon-search">Search</ui-menu-item>
      <ui-menu-item glyph="icon-moon-bin">Delete</ui-menu-item>
      <ui-divider></ui-divider>
      <ui-menu-item glyph="icon-moon-bubbles4" badge-dark="9">Notifications</ui-menu-item>
      <ui-menu-item glyph="icon-moon-cog">Settings</ui-menu-item>
    </ui-menu>
  </ui-sidebar>
  <ui-content padded scroll>
    <compose view="../home/lipsum-big.html"></compose>
  </ui-content>
</ui-section>
```


###### Collapsed mini-display
```html
<ui-section row-layout>
  <ui-content padded scroll>
    <compose view="../home/lipsum-big.html"></compose>
  </ui-content>
  <ui-sidebar compact label="Sidebar" scroll position="end">
    <ui-menu ref="btnMenu">
      <ui-menu-item glyph="icon-moon-pencil2"></ui-menu-item>
      <ui-menu-item glyph="icon-moon-search"></ui-menu-item>
      <ui-menu-item glyph="icon-moon-bin"></ui-menu-item>
      <ui-divider></ui-divider>
      <ui-menu-item glyph="icon-moon-bubbles4"></ui-menu-item>
      <ui-menu-item glyph="icon-moon-cog"></ui-menu-item>
    </ui-menu>
  </ui-sidebar>
</ui-section>
```
