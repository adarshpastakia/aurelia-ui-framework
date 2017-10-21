<a name="3.4.5"></a>
## 3.4.5 (2017-10-21)



<a name="3.4.4"></a>
## 3.4.4 (2017-09-10)



<a name="3.4.3"></a>
## 3.4.3 (2017-08-27)



* UIDialog
  * Fixed initial positioning
  * Fixed `ltr` `rtl` switching
  * Added `maximized` flag to open dialog maximized by default
* UIHttpService: Added `patch` method
* UIDatagrid: Fixed text bleeding through `expander` column when scrolling

@avrahamcool
* Fixed missing `aurelia-animator-css` dependency
* UITooltip: Fixed flicker in Chrome browser
* Updated `README`

<a name="3.4.2"></a>
## 3.4.2 (2017-08-02)



<a name="3.4.1"></a>
## 3.4.1 (2017-07-04)

* PR #47. Added `blob` fetch method to http service
* PR #48. Corrected spelling mistake in pre-requisite html
* PR #51. UIModel updated for dirty property checks
* PR #53. UIInput fixes

<a name="3.4.0"></a>
# 3.4.0 (2017-06-09)




* UIInput: Fixed issue when bound value is 0
* UIDgColumn: Fixed issue when display value is 0
* UIValidationRenderer: Fixed repeated error message issue
* UITab: Fixed tab-button-bar layout, added `glyphClass` property
* UIDropdown: Fixed issue to update selected label on i18n locale change
* UIDgButton, UIDgLink: Added `show` bound property for conditional display for links and buttons


<a name="3.3.18"></a>
## 3.3.18 (2017-06-03)



<a name="3.3.17"></a>
## 3.3.17 (2017-06-03)



<a name="3.3.16"></a>
## 3.3.16 (2017-05-30)



<a name="3.3.15"></a>
## 3.3.15 (2017-05-19)



<a name="3.3.14"></a>
## 3.3.14 (2017-05-16)



<a name="3.3.13"></a>
## 3.3.13 (2017-05-16)



<a name="3.3.12"></a>
## 3.3.12 (2017-05-10)



<a name="3.3.11"></a>
## 3.3.11 (2017-05-08)



<a name="3.3.10"></a>
## 3.3.10 (2017-05-06)



<a name="3.3.9"></a>
## 3.3.9 (2017-05-04)



<a name="3.3.8"></a>
## 3.3.8 (2017-05-03)



* Fixed styling issues on `rtl`
* Updated `UIFieldset`
  - Changed `enabled` property to `checked`
  - Added `disabled` property


<a name="3.3.7"></a>
## 3.3.7 (2017-05-02)



<a name="3.3.6"></a>
## 3.3.6 (2017-05-02)



<a name="3.3.5"></a>
## 3.3.5 (2017-05-01)



<a name="3.3.4"></a>
## 3.3.4 (2017-04-30)



<a name="3.3.3"></a>
## 3.3.3 (2017-04-27)



<a name="3.3.2"></a>
## 3.3.2 (2017-04-26)

* UIDatagrid Update
  - Changed layout from tables to flexbox divs
  - Locking columns using css3 transform


<a name="3.3.1"></a>
## 3.3.1 (2017-04-22)



<a name="3.3.0"></a>
# 3.3.0 (2017-04-22)



* Fixed issues with some input elements when value is 0
* Fixed `rtl` support issues
  - Datagrid column resizing
  - Dialog drag and resize
  - Fixed tether positioning
* Added `ribbon` attribute
* Updated theming for `tooltip`, `ribbon`, `ui-chip`
* Added `iefix` for layout issues in MS Edge


<a name="3.2.9"></a>
## 3.2.9 (2017-04-20)


<a name="3.2.8"></a>
## 3.2.8 (2017-04-20)


<a name="3.2.7"></a>
## 3.2.7 (2017-04-20)

* Added accordion style panel group
  ```
  <ui-panel-group toggle>...</ui-panel-group>
  ```
* Added datagrid column groups
  ```
  <ui-dg-column-group label=''>[columns..]</ui-dg-column>
  ```
* Added `viewModel` property for `ui-tab` element, if tab content is a compose element
* Fixed UIDialog task button issue in Edge
* Fixed UIDatagrid bug in Edge

<a name="3.2.6"></a>
## 3.2.6 (2017-04-19)



<a name="3.2.5"></a>
## 3.2.5 (2017-04-17)



<a name="3.2.4"></a>
## 3.2.4 (2017-04-16)



<a name="3.2.3"></a>
## 3.2.3 (2017-04-10)



* Fixed decimal input bug in firefox, requires step="any"
* Updated UIFieldset `enabled` property for two-way binding
* Updated UIDropdown to non select first item by default


<a name="3.2.2"></a>
## 3.2.2 (2017-04-09)



<a name="3.2.1"></a>
## 3.2.1 (2017-04-08)



<a name="3.2.0"></a>
# 3.2.0 (2017-04-04)

* Moved `UILocalDS` to branch `4.0.0`



<a name="3.1.15"></a>
## 3.1.15 (2017-04-04)



<a name="3.1.14"></a>
## 3.1.14 (2017-04-04)

* Removed `position: sticky` for locked columns
* Added `UILocalDS` data-source class, currently used by `UIDatagrid` only
* Solved issue of stretching columns in empty space


<a name="3.1.13"></a>
## 3.1.13 (2017-04-03)



<a name="3.1.12"></a>
## 3.1.12 (2017-04-03)

* Added `row-expander` feature for datagrid to display drilldown data
* Updated dialog control properties 'closable, draggable, minimizable, maximizable'
* Added url validator, fixed decimal validator


<a name="3.1.11"></a>
## 3.1.11 (2017-04-01)

* Added new element
  ```
  <ui-chip removable remove.trigger="fn()" label="Field" class="muted">Value</ui-chip>
  ```
* Fixed issues caused by empty tag body
* Fixed mistake in tether
* Updated styles


<a name="3.1.10"></a>
## 3.1.10 (2017-03-31)

* Added tooltip attribute
* Updated tether implementation


<a name="3.1.9"></a>
## 3.1.9 (2017-03-31)

* Fixed extra color theme issues
* ListInputs: Fixed initial select
* UIDropdown: Fixed issue when changing value through binding
* UIMenuItem: Added isTrue check for disabled
* UITreeModel: Creating seeded id when node does not contain id property
* UIDatagrid: Fixed issue with dg-empty slot, caused by having slot inside an element with if.bind


<a name="3.1.8"></a>
## 3.1.8 (2017-03-30)



<a name="3.1.7"></a>
## 3.1.7 (2017-03-30)

* Removed empty aurelia callback hooks
* Added extra color themes


<a name="3.1.6"></a>
## 3.1.6 (2017-03-30)

* Updated glyph prefix from `ui-` to `glyph-` to prevent issue with conflicting style classes
* Added animate attribute for page, section and content
* Fixed dialog expand/restore glyph
* Added style small for `ui-statsbar`


<a name="3.1.5"></a>
## 3.1.5 (2017-03-29)



<a name="3.1.4"></a>
## 3.1.4 (2017-03-27)



<a name="3.1.3"></a>
## 3.1.3 (2017-03-27)



<a name="3.1.2"></a>
## 3.1.2 (2017-03-27)



<a name="3.1.1"></a>
## 3.1.1 (2017-03-27)



<a name="3.1.0"></a>
## 3.0.10 (2017-03-26)

* Updated `dist` for `commonjs`, `amd`, `es2015`, `system`


<a name="3.0.10"></a>
## 3.0.10 (2017-03-25)



<a name="3.0.9"></a>
## 3.0.9 (2017-03-25)



<a name="3.0.8"></a>
## 3.0.8 (2017-03-25)



<a name="3.0.7"></a>
## 3.0.7 (2017-03-20)



<a name="3.0.6"></a>
## 3.0.6 (2017-03-19)



<a name="3.0.5"></a>
## 3.0.5 (2017-03-18)



<a name="3.0.4"></a>
## 3.0.4 (2017-03-16)



<a name="3.0.3"></a>
## 3.0.3 (2017-03-16)



<a name="3.0.2"></a>
## 3.0.2 (2017-01-29)



<a name="3.0.1"></a>
## 3.0.1 (2017-01-11)
