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
