#### `ui-drawer`
Offscreen drawers

* Attributes
  * `position = 'start/end'`: Drawer position
  * `body-class`: Classes for drawer content body
  * `width = ''`
  * `fluid`: Make fluid drawer width (max-width: 70vw)
  * `large`: Increase the drawer width by 1.5 of $drawer-width
  * `fixed`: Position the drawer fixed to viewport rather than container
  * `scroll`: Add scrolling to drawer body
  * `padded`: Add padding to drawer body
  * `close-on-click`: Close drawer on mouse-click

* Events
  * `beforeopen.trigger`
  * `beforeclose.trigger`
  * `open.trigger`
  * `close.trigger`

---

#### `ui-drawer-toggle`
Drawer toggle button

* Attributes
  * `drawer.bind = 'drawerRef'`: Drawer component
  * `glyph = 'glyph-handle-menu'`: Drawer button glyph
