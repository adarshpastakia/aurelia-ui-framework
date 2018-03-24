#### `ui-datagrid`
Datagrid

* Attributes
  * `data-source`: Data source | array
  * `view`: Compose-able view for subview
  * `scroll`: Flexed datagrid with body scroll
  * `row-counter`: Record counter row header
  * `row-expander`: Enable expanding rows

* Events
  * `rowselect.trigger`

---
#### `ui-dg-tpl`
Datagrid template column

* Bindings
  * `record`
  * `viewModel`

* Attributes
  * `data-id = ''`: Record property id
  * `class`: Style class for cell content
  * `width`
  * `min-width`
  * `locked`: Lock column
  * `sortable`
  * `resizeable`

  * Use: `<ui-dg-tpl><a click.trigger="viewModel.click(record)">${record.property}</a></ui-dg-tpl>`


#### `ui-dg-column`
Datagrid column

* Attributes
  * `data-id = ''`: Record property id
  * `class`: Style class for cell content
  * `width`
  * `min-width`
  * `locked`: Lock column
  * `sortable`
  * `resizeable`
  * `value.call`: Callback method for calculating cell value `fn({record, value})`
  * `display.call`: Callback method for providing custom display text `fn({record, value})`
  * Alignment
    - `start`
    - `center`
    - `end`
  * Formatting
    - `date`
    - `time`
    - `datetime`
    - `age`
    - `fromnow`
    - `number`
    - `currency`
    - `percent`
  * Custom Formatting
    - `format = 'moment format | numeral format'`: To use custom format, pass `date`|`number` along with the custom format.
    - `symbol = '$'`: Currency symbol used with numeral format

---

#### `ui-dg-glyph`
Datagrid glyph icon column

* Attributes
  * `data-id = ''`: Record property id
  * `class`: Style class for cell content
  * `width`
  * `min-width`
  * `locked`: Lock column
  * `sortable`
  * `resizeable`
  * `glyph.call`: Callback method for glyph icon `fn({record, value})`
  * `tooltip.call`: Callback method for icon tooltip `fn({record, value})`



---

#### `ui-dg-link`
Datagrid link column

* Attributes
  * `data-id = ''`: Record property id
  * `class`: Style class for cell content
  * `width`
  * `min-width`
  * `locked`: Lock column
  * `sortable`
  * `resizeable`
  * `show`: Record property truthy to show/hide link or Callback to determine show/hide
  * `disabled`: Record property truthy to enable/disable link or Callback to determine enable/disable
  * `glyph`|`glyph.call`: Glyph value or Callback method for glyph icon `fn({record, value})`
  * `label`|`label.call`: Link label or Callback method for link label `fn({record, value})`

---

#### `ui-dg-button`
Datagrid button column

* Attributes
  * `data-id = ''`: Record property id
  * `class`: Style class for cell content
  * `width`
  * `min-width`
  * `locked`: Lock column
  * `sortable`
  * `resizeable`
  * `show`: Record property truthy to show/hide link or Callback to determine show/hide
  * `disabled`: Record property truthy to enable/disable link or Callback to determine enable/disable
  * `glyph`|`glyph.call`: Glyph value or Callback method for glyph icon `fn({record, value})`
  * `label`|`label.call`: Link label or Callback method for link label `fn({record, value})`
  * `button-width`
  * `button-theme`
