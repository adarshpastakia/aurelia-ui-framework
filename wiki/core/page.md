#### `ui-page`
Navigation view page

* Attributes
  * `page-title = ''`: Page title will be shown if provided
  * `page-class = ''`: Classname for page content section
  * `animate`: Animate page transition when navigating

---

#### `ui-section`
Page section

* Attributes
  * `row-layout`: Row layout section
  * `column-layout`: Column layout section _Default_
  * `center`: Align content horizontally centered
  * `middle`: Align content vertically centered

---

#### `ui-content`
Page content holder

* Attributes
  * `scroll`: Make content scrollable
  * `padded`: Add padding

---

#### `ui-glyph`
SVG glyph

* Attributes
  * `glyph`: SVG glyph name

> NOTE: `glyph` can be either an SVG glyph name or alternatively it can also use FontAwesome classes `glyph="fa fa-user-circle"`

---

#### `ui-loader`
Loader overlay

* Attributes
  * `busy = bool`: Display loader when busy
  * Size attribute
    * `small`
    * `normal`
    * `large`
