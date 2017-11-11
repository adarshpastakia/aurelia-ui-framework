#### `ui-input`
Text input

* Attributes
  * `value.bind = ''`
  * `number.bind = n`
  * `decimal.bind = n`
  * `readonly.bind = ''`
  * `disabled.bind = ''`
  * `dir = ''`
  * `width = ''`
  * `placeholder = ''`
  * `help-text = ''`
  * `clear`: Show clear button
  * `counter`: Show character counter

  * Input Types
    * `password`
    * `email`
    * `search`
    * `url`
    * `file`
    * `decimal`
    * `number`

* Events
  * `change.trigger = ''`: Value change event

---

#### `ui-textarea`
Multiline input

* Attributes
  * `value.bind = ''`
  * `readonly.bind = ''`
  * `disabled.bind = ''`
  * `dir = ''`
  * `rows = ''`
  * `width = ''`
  * `placeholder = ''`
  * `help-text = ''`
  * `clear`: Show clear button
  * `counter`: Show character counter
  * `autocomplete = ''`: Auto-complete list


* Events/Callbacks
  * `change.trigger = ''`: Value change event
  * `before-replace.call = ''`: Value change event

---

#### `ui-phone`
Phone input

* Attributes
  * `value.bind = ''`
  * `readonly.bind = ''`
  * `disabled.bind = ''`
  * `dir = ''`
  * `width = ''`
  * `placeholder = ''`
  * `help-text = ''`
  * `clear`: Show clear button
  * `country = ''`: Set country for national phone number only, else input will accept international numbers


* Events/Callbacks
  * `change.trigger = ''`: Value change event

---

#### `ui-file`
Multiple file input

* Attributes
  * `max-files = ''`

* Events/Callbacks
  * `change.trigger = ''`: Value change event
