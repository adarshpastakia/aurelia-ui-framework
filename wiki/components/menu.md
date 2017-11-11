#### `ui-menubar`
Menubar to display horizontally aligned menus

* Events
  * `click.delegate`: Menu item clicked `$event.detail = menuItem.id`

---

#### `ui-menu`
Menubar to display vertically aligned menus

* Events
  * `click.delegate`: Menu item clicked `$event.detail = menuItem.id`

---

#### `ui-menu-group`
Menu groups

* Attributes
  * `label = ''`: Group label
  * `collapsible = bool`: Enable accordion style collapsing menu group
  * `collapsed = bool`: Menu group collapsed

---

#### `ui-menu-item`
Menu item

* Attributes
  * `id = ''`
  * `glyph = ''`: Menu icon
  * `class = ''`: Menu classname
  * `description = ''`: Menu label muted subtext
  * `href = ''`: Make menu item a link
  * `active = bool`: Is active menu item
  * `disabled = bool`: Disable menu item

* Events
  * `click.trigger`: Menu item clicked `$event.detail = menuItem.id`

---

#### `ui-dropdown`
Dropdown

* Attributes
  * `glyph = ''`
  * `width = ''`
  * `value.bind = ''`
  * `model.bind = ''`: Reference to the selected item model
  * `disabled = bool`
  * `default-text = ''`: Text to display when no value selected

* Events/Callback
  * `change.trigger`: List item clicked `$event.detail = listItem.id`
  * `beforeselect.call` or `beforeselect.trigger`: return false to stop close event

  > __NOTE__ Use `beforeselect.call` if need to return a promise object

---


#### `ui-list-item`
Dropdown list item

* Attributes
  * `glyph = ''`
  * `value = ''`
  * `model.bind = ''`
  * `disabled = bool`: Disable list item
