#### `ui-combo`, `ui-list`
Combo/List input

* Attributes
  * `value.bind = ''`
  * `model.bind`: Read-only
  * `readonly.bind = ''`
  * `disabled.bind = ''`
  * `dir = ''`
  * `tpl = ''`: Display template
  * `width = ''`
  * `placeholder = ''`
  * `help-text = ''`
  * `clear`: Show clear button

  * `options.bind = []`
  * `value-property`
  * `display-property`
  * `icon-property`
  * `force-select`: Force selection from list items

* Events
  * `change.trigger = ''`: Value change event
  * `select.trigger = ''`: Value select event, passes `model` in `$event.detail`

---

#### `ui-tag`
Multi tag input

* Attributes
* `value.bind = ''`: Comma separated values
* `readonly.bind = ''`
* `disabled.bind = ''`
* `dir = ''`
* `width = ''`
* `placeholder = ''`
* `help-text = ''`
* `clear`: Show clear button

* `options.bind = []`
* `value-property`
* `display-property`
* `icon-property`
* `force-select`: Force selection from list items


* Events/Callbacks
  * `change.trigger = ''`: Value change event
