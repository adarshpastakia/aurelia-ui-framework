#### `ui-panel`
Panels/Cards

* Attributes
  * `height`: Fixed height
  * `minheight`: Minimum height
  * `maxheight`: Maximum height
  * `expanded.bind`
  * `collapsed.bind`

* Events
  * `beforeclose.trigger`
  * `close.trigger`

---

#### `ui-panel-body`
Panel Body

* Attributes
  * `flex`: Flex layout
  * `padded`
  * `scroll`


---

#### `ui-header`
Panel header

* Attributes
  * `theme = ''`: Header theme

---

#### `ui-header-title`
Panel header title

* Attributes
  * `glyph = ''`: Header icon glyph
  * `icon-hilight`: Add background hilight for icon


---

#### `ui-header-tool`
Panel header tool button

* Attributes
  * `{type}`: Header tool preset type
  * `glyph = ''`: Tool button icon glyph
  * `disabled = ''`
  * `dropdown.bind = ''`: Dropdown menu reference

  * Tool Types
    * `collapse`: Panel collapsible
    * `expand`: Panel expandable
    * `close`: Panel closable
