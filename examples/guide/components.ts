/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import BREADCRUMBS from "@images/ui-breadcrumbs.svg";
import BUTTONS from "@images/ui-buttons.svg";
import CARD from "@images/ui-card.svg";
import DATE from "@images/ui-date.svg";
import DIALOG from "@images/ui-dialog.svg";
import FORM from "@images/ui-form.svg";
import GRID from "@images/ui-grid.svg";
import GRIDDER from "@images/ui-gridder.svg";
import INPUTS from "@images/ui-inputs.svg";
import LISTS from "@images/ui-list.svg";
import MENU from "@images/ui-menu.svg";
import MESSAGE from "@images/ui-message.svg";
import NOTIFICATION from "@images/ui-notification.svg";
import PAGE from "@images/ui-page.svg";
import PANEL from "@images/ui-panel.svg";
import SIDEBAR from "@images/ui-sidebar.svg";
import TAB from "@images/ui-tab.svg";
import TAG from "@images/ui-tag.svg";
import TOGGLES from "@images/ui-toggle.svg";
import TOOLBAR from "@images/ui-toolbar.svg";
import VIEWPORT from "@images/ui-viewport.svg";
import WIZARD from "@images/ui-wizard.svg";

export class ComponentPage {
  protected components = [
    {
      title: "Layouts",
      items: [
        {
          href: "/docs/viewport",
          title: "Viewport",
          description: "The viewport wrapper provides a standard application layout",
          image: VIEWPORT
        },
        {
          href: "/docs/page",
          title: "Page",
          description: "Page provides sectioned layout for route pages",
          image: PAGE
        },
        {
          href: "/docs/responsive",
          title: "Responsive Grid",
          description: "12 column responsive flexbox layout",
          image: GRID
        },
        {
          href: "/docs/gridder",
          title: "Gridder",
          description: "12 column gridster style layout",
          image: GRIDDER
        }
      ]
    },
    {
      title: "Buttons / Menus",
      items: [
        {
          href: "/docs/button",
          title: "Buttons",
          description: "Action buttons",
          image: BUTTONS
        },
        {
          href: "/docs/menus",
          title: "Menus",
          description: "Menu lists and bars",
          image: MENU
        },
        {
          href: "/docs/tags",
          title: "Tags",
          description: "Closeable tag labels",
          image: TAG
        },
        {
          href: "docs/breadcrumbs",
          title: "Breadcrumbs",
          description: "Breadcrumb navigation",
          image: BREADCRUMBS
        }
      ]
    },
    {
      title: "Form Controls",
      items: [
        {
          href: "/docs/form",
          title: "Form Elements",
          description: "Form and field layout elements",
          image: FORM
        },
        {
          href: "/docs/inputs",
          title: "Basic Inputs",
          description: "Input elements for text, numbers and phone",
          image: INPUTS
        },
        {
          href: "/docs/lists",
          title: "List Inputs",
          description: "Input elements for lists and tagged inputs",
          image: LISTS
        },
        {
          href: "/docs/toggles",
          title: "Option Inputs",
          description: "Checkboxes, radios and toggle switches",
          image: TOGGLES
        },
        {
          href: "/docs/date",
          title: "Date/Time",
          description: "Date/time input",
          image: DATE
        },
        {
          title: "Wizard",
          description: "Wizard like form",
          image: WIZARD
        }
      ]
    },
    {
      title: "Panels",
      items: [
        {
          href: "/docs/panel",
          title: "Panels",
          description: "Simple collapsible/closeable panel with headers",
          image: PANEL
        },
        {
          href: "/docs/card",
          title: "Cards",
          description: "Card layout panel",
          image: CARD
        },
        {
          href: "/docs/tabs",
          title: "Tabbed Panel",
          description: "Tabbed layout panel",
          image: TAB
        },
        {
          href: "/docs/sidebar",
          title: "Sidebar",
          description: "Section side content",
          image: SIDEBAR
        },
        {
          href: "/docs/toolbar",
          title: "Toolbar",
          description: "Toolbar for arranging action buttons",
          image: TOOLBAR
        },
        {
          href: "/docs/message",
          title: "Message Panel",
          description: "Themed closeable message panel",
          image: MESSAGE
        }
      ]
    },
    {
      title: "Data Components",
      items: [
        {
          href: "/docs/datagrid",
          title: "Data Grid",
          description: "Functional datagrid with resizeable, sortable columns"
        },
        {
          href: "/docs/datalist",
          title: "Data List",
          description: "Card like data list with filtering and lazy loading"
        },
        {
          href: "/docs/datatree",
          title: "Data Tree",
          description: "Functional tree with checkable nodes, filtering, lazy loading"
        }
      ]
    },
    {
      title: "Overlays",
      items: [
        {
          href: "docs/dialog",
          title: "Dialogs",
          description: "Service to render overlay dialogs",
          image: DIALOG
        },
        {
          href: "docs/notification",
          title: "Notification Service",
          description: "Service to render overlay alerts, messages and toast notifications",
          image: NOTIFICATION
        }
      ]
    }
  ];
}
