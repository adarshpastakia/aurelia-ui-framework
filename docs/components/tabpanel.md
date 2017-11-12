#### `ui-tab-panel`
Tab Panel

* Attributes
  * `bottom`: Tab bar bottom


#### `ui-tab`
Tab Body

* Attributes
  * `glyph = ''`
  * `label = ''`
  * `closeable`: Allow closing of table

* Events/Callback
  * `beforeclose.call` or `beforeclose.trigger`: return false to stop close event
  * `close.trigger`

> __NOTE__ Use `beforclose.call` if need to return a promise object
