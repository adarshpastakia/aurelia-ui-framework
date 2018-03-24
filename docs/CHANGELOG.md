<a name="4.0.0-Beta.14"></a>
# 4.0.0-Beta.13 (2018-03-24)

* [UIDatagrid]: Added `ui-dg-tpl` for templated column


<a name="4.0.0-Beta.13"></a>
# 4.0.0-Beta.13 (2018-03-15)

* [UIButton]: Added floating style to allow panel as dropdown
* [UIDialog]: Fixed open/close animation
* Added compact padding style


<a name="4.0.0-Beta.12"></a>
# 4.0.0-Beta.12 (2018-03-05)

* Bug Fixes #110
* Added Material style ripple effect for buttons


<a name="4.0.0-Beta.11"></a>
# 4.0.0-Beta.11 (2018-02-20)

* Bug Fixes #92, #106

<a name="4.0.0-Beta.10"></a>
# 4.0.0-Beta.10 (2018-01-11)



* [UIDatagrid] - Added column resize functionality
* [UIButton] - Added `hide-caret` option for button with dropdown


<a name="4.0.0-Beta.9"></a>
# 4.0.0-Beta.9 (2018-01-06)

* [BUG] - Fixed webpack load issue
* [BUG] - Fixed input field overlay


<a name="4.0.0-Beta.7"></a>
# 4.0.0-Beta.7 (2017-12-23)

* [UIChip] - Added glyph property
* [UIStatsbar] - Fixed theme for extra colors
* [UITree] - Added

<a name="4.0.0-Beta.6"></a>
# 4.0.0-Beta.6 (2017-12-15)

* Added basic UIDatagrid
* Local DataSource

- Pending
  * Virtual scroll datagrid
  * Remote data-source
  * Expanding rows
  * Editable rows


<a name="4.0.0-Beta.5"></a>
# 4.0.0-Beta.5 (2017-11-19)

* List Inputs
  - `UICombo`
  - `UIList`
  - `UITag`

* Fixed validation example. Needed to include `aurelia-validation` plugin before the ui-framework.


<a name="4.0.0-Beta.4"></a>
# 4.0.0-Beta.4 (2017-11-17)

* DataModel
  - `serializable` decorator for serializable properties. The serializable property map is maintained in the model' metadata.
  - Dirty checking at property level. All serializable properties have custom `getter` and `setter` to mark properties as dirty.
  - CRUD operation methods with pre and post hooks.
    - `get(id)`
    - `save()` POST/PUT depending on whether the id property is present.
    - `delete()`

* Minor style changes


<a name="4.0.0-Beta.3"></a>
# 4.0.0-Beta.3 (2017-11-17)

> Messed up the npm publish, by forgetting to add tag.


<a name="4.0.0-Beta.2"></a>
# 4.0.0-Beta.2 (2017-11-12)

### Major Updates

* Responsive Grids
  - Added gutter spacing
  - Update row types
  - Added row properties for columns

* Buttons
  - Added split buttons
  - Flat styled
  - Button group with separator

* Dialogs
  - Lifecycle fixes

* Tabs
  - Style update

* Badges
  - Added badges for menu items

* Theme attributes
  - Background, text themes can be applied by HTML attributes


### Pending Updates

* Data models and sources
* Data dependent components
  - Lists/Combos
  - Datagrid
  - Tree panels
* Validation broken
