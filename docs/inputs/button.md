#### `ui-button`
Button input

* Attributes
  * `theme = ''`: Button theme
  * `glyph = ''`: Button glyph
  * `small`, `large`, `xlarge`: Button size attribute
  * `width = ''`: Fixed width button
  * `split`: Create a split button. __Note__ must provide dropdown
  * `split-theme = ''`: Split button theme
  * `split-glyph = ''`: Split button glyph
  * `disabled.bind = ''`
  * `dropdown.bind = ''`: Dropdown menu reference
  * `form.bind = ''`: Form menu reference

  * Badges
    * `badge-dark = n`
    * `badge-primary = n`
    * `badge-secondary = n`
    * `badge-info = n`
    * `badge-danger = n`
    * `badge-success = n`
    * `badge-warning = n`
    * `badge = 'amount:n;theme:color'`

* Events
  * `click.trigger = ''`: Button click event
  * `menuopen.trigger = ''`: Event when dropdown/form shown
  * `menuhide.trigger = ''`: Event when dropdown/form hidden

* Theme colors
  * `default`
  * `dark`
  * `muted`
  * `primary`
  * `secondary`
  * `info`
  * `danger`
  * `success`
  * `warning`

> CSS: Add `class="ui-effect-ripple"` for Material style ripple effect
> CSS: Add `class="ui-effect-shadow"` for shadowed press effect

---

#### `ui-button-group`
Button group container

* Attributes
  * `theme = ''`: Button theme
  * `small`, `large`, `xlarge`: Button size attribute
  * `vertical`: Vertical orientation
  * `toggle`: Create a toggle button group. __Note__ buttons must have a value
  * `value = ''`: Value of active button

* Events
  * `change.trigger = ''`: Toggle value change event
  * `menuopen.trigger = ''`: Event when dropdown/form shown
  * `menuhide.trigger = ''`: Event when dropdown/form hidden
