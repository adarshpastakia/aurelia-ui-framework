#### `ui-tab-panel`
Tab Panel

* Attributes
  * `bottom`: Tab bar bottom
  * `active`: Active tab id/index
  * `active-tab`: Active tab instance

* Events
  * `change`: Tab changed
  * `close`: Tab closed

* Methods
  * `canActivate(id):bool`: Returns `true` if tab found and activated, if not found returns `false`

---

#### `ui-tab`
Tab Button

* Attributes
  * `glyph = ''`
  * `glyph-class = ''`
  * `disabled = ''`
  * `closeable = ''`: Allow closing of tab
  * For tabs with router view
    * `href.bind = ''`
    * `active.bind = ''`
  * For tabs with compose
    * `view.bind = ''`
    * `model.bind = ''`
    * `view-model.bind = ''`
