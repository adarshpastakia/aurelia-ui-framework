###### Simple Menubar

```html
<ui-menubar>
  <ui-menu-item glyph="icon-moon-pencil2">Edit</ui-menu-item>
  <ui-menu-item glyph="icon-moon-search">Search</ui-menu-item>
  <ui-menu-item glyph="icon-moon-bin">Delete</ui-menu-item>
  <ui-divider></ui-divider>
  <ui-menu-item glyph="icon-moon-bubbles4">Notifications</ui-menu-item>
  <ui-menu-item glyph="icon-moon-cog">Settings</ui-menu-item>
</ui-menubar>
```

###### Menubar with Groups

```html
<ui-menubar>
  <ui-menu-group label="Actions">
    <ui-menu-item glyph="icon-moon-pencil2">Edit</ui-menu-item>
    <ui-menu-item glyph="icon-moon-search">Search</ui-menu-item>
    <ui-menu-item glyph="icon-moon-bin">Delete</ui-menu-item>
  </ui-menu-group>
  <ui-menu-group label="Options">
    <ui-menu-item glyph="icon-moon-bubbles4">Notifications</ui-menu-item>
    <ui-menu-item glyph="icon-moon-cog">Settings</ui-menu-item>
  </ui-menu-group>
</ui-menubar>
```

###### Simple Dropdown Menu

```html
<ui-button dropdown.ref="menu">Click Me!</ui-button>
<ui-menu ref="menu">
  <ui-menu-section>Actions</ui-menu-section>
  <ui-menu-item glyph="icon-moon-pencil2">Edit</ui-menu-item>
  <ui-menu-item glyph="icon-moon-search">Search</ui-menu-item>
  <ui-menu-item glyph="icon-moon-bin">Delete</ui-menu-item>
  <ui-menu-section>Options</ui-menu-section>
  <ui-menu-item glyph="icon-moon-bubbles4">Notifications</ui-menu-item>
  <ui-menu-item glyph="icon-moon-cog">Settings</ui-menu-item>
</ui-menu>
```

###### Dropdown Menu with Columns

```html
<ui-button dropdown.ref="menu">Click Me!</ui-button>
<ui-menu ref="menu">
  <ui-row>
    <ui-column>
      <ui-menu-section>Actions</ui-menu-section>
      <ui-menu-item glyph="icon-moon-pencil2">Edit</ui-menu-item>
      <ui-menu-item glyph="icon-moon-search">Search</ui-menu-item>
      <ui-menu-item glyph="icon-moon-bin">Delete</ui-menu-item>
      <ui-menu-section>Options</ui-menu-section>
      <ui-menu-item glyph="icon-moon-bubbles4">Notifications</ui-menu-item>
      <ui-menu-item glyph="icon-moon-cog">Settings</ui-menu-item>
    </ui-column>
    <ui-column>
      <ui-menu-section>Social Networking</ui-menu-section>
      <ui-menu-item glyph="icon-moon-google-plus">Google</ui-menu-item>
      <ui-menu-item glyph="icon-moon-facebook">Facebook</ui-menu-item>
      <ui-menu-item glyph="icon-moon-twitter">Twitter</ui-menu-item>
      <ui-menu-item glyph="icon-moon-linkedin2">LinkedIn</ui-menu-item>
      <ui-menu-item glyph="icon-moon-instagram">Instagram</ui-menu-item>
    </ui-column>
    <ui-column>
      <ui-menu-section>Other Sites</ui-menu-section>
      <ui-menu-item glyph="icon-moon-yahoo2">Yahoo!</ui-menu-item>
      <ui-menu-item glyph="icon-moon-youtube">YouTube</ui-menu-item>
      <ui-menu-item glyph="icon-moon-dribbble">Dribbble</ui-menu-item>
      <ui-menu-item glyph="icon-moon-flickr">Flickr</ui-menu-item>
      <ui-menu-item glyph="icon-moon-pinterest">Pinterest</ui-menu-item>
    </ui-column>
  </ui-row>
</ui-menu>
```

###### Inline Menu

```html
<ui-menu class="ui-border-all ui-border-light ui-inline">
  <ui-menu-section>Actions</ui-menu-section>
  <ui-menu-item glyph="icon-moon-pencil2" description="Lorem ipsum...">Edit</ui-menu-item>
  <ui-menu-item glyph="icon-moon-search" description="Lorem ipsum...">Search</ui-menu-item>
  <ui-menu-item glyph="icon-moon-bin" description="Lorem ipsum...">Delete</ui-menu-item>
  <ui-menu-section>Options</ui-menu-section>
  <ui-menu-item glyph="icon-moon-bubbles4">Notifications</ui-menu-item>
  <ui-menu-item glyph="icon-moon-cog">Settings</ui-menu-item>
</ui-menu>
```


###### Dropdowns

```html
<ui-dropdown width="10em" glyph="glyph-icon-email" value="1">
  <ui-list-item value="1">Mobile</ui-list-item>
  <ui-list-item value="2">Work</ui-list-item>
  <ui-list-item value="3">Home</ui-list-item>
</ui-dropdown>
```
