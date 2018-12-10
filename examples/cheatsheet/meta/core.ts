// Viewport
const uiViewport = {
  children: [
    "ui-viewport-header",
    "ui-viewport-footer",
    "ui-section",
    "ui-content",
    "ui-router-view"
  ],
  slots: ["taskbar-start", "taskbar-links"],
  tag: "ui-viewport"
};
const uiLoader = {
  attributes: ["busy=true | false"],
  tag: "ui-loader"
};

// Page
const uiPage = {
  attributes: ["page-title=string"],
  children: [
    "ui-section",
    "ui-section-head",
    "ui-section-foot",
    "ui-content",
    "ui-sidebar",
    "ui-router-view"
  ],
  tag: "ui-page"
};
const uiSection = {
  children: [
    "ui-page",
    "ui-section",
    "ui-section-head",
    "ui-section-foot",
    "ui-content",
    "ui-sidebar",
    "ui-router-view"
  ],
  tag: "ui-section"
};

// Responsive
const uiGrid = {
  attributes: ["size=nm | sm | md | lg"],
  tag: "ui-grid"
};

const uiContainer = {
  attributes: ["fluid"],
  children: ["ui-row"],
  tag: "ui-container"
};

const uiRow = {
  attributes: [
    "halign=start | end | center | spaced | even",
    "valign=top | bottom | middle | stretch",
    "vertical",
    "reverse",
    "nowrap"
  ],
  children: ["ui-col", "ui-row"],
  tag: "ui-row"
};

const uiCol = {
  attributes: [
    "align=top | bottom | middle | stretch",
    "maxWidth=px | em | rem | vw | %",
    "minWidth=px | em | rem | vw | %",
    "size=auto | fill=1-12[@xs | sm | md | lg | xl | xxl]",
    "width=px | em | rem | vw | %"
  ],
  tag: "ui-col"
};

// Icons
const uiIcon = {
  attributes: ["flip-on-rtl", "icon=mdi mdi-[icon]", "size=xs | sm | md | lg | xl"],
  tag: "ui-icon"
};

const uiFlag = {
  attributes: ["code=iso2/iso3 Coutry Code", "size=xs | sm | md | lg | xl"],
  tag: "ui-flag"
};

export default [
  uiViewport,
  uiLoader,
  uiPage,
  uiSection,
  uiGrid,
  uiContainer,
  uiRow,
  uiCol,
  uiIcon,
  uiFlag
];
