/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { autoinject, PLATFORM } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import {
  Countries,
  Currencies,
  FileTypes,
  UIAlertService,
  UIDialogService
} from "aurelia-ui-framework";
import { getDate } from "date-fns";
import { DlgTest } from "./dlg-test";
import Icons from "./icons.json";

PLATFORM.moduleName("./theme.html");
PLATFORM.moduleName("./typo.html");
PLATFORM.moduleName("./lists.html");
PLATFORM.moduleName("./icons.html");
PLATFORM.moduleName("./responsive.html");
PLATFORM.moduleName("./countries.html");
PLATFORM.moduleName("./currencies.html");
PLATFORM.moduleName("./files.html");
PLATFORM.moduleName("./phonelib.html");
PLATFORM.moduleName("./buttons.html");
PLATFORM.moduleName("./cards.html");
PLATFORM.moduleName("./page.html");
PLATFORM.moduleName("./forms.html");
PLATFORM.moduleName("./panels.html");
PLATFORM.moduleName("./dialog.html");
PLATFORM.moduleName("./datagrid.html");
PLATFORM.moduleName("./alerts.html");
PLATFORM.moduleName("./login.html");
PLATFORM.moduleName("./menu.html");
PLATFORM.moduleName("./wizard.html");
PLATFORM.moduleName("./tabs.html");
PLATFORM.moduleName("./tab-test.html");
PLATFORM.moduleName("./dates.html");
PLATFORM.moduleName("./tree.html");

@autoinject()
export class Tester {
  protected countries: ICountryItem[] = Countries.list;
  protected countryNames = Countries.list.map(o => o.name);
  protected currencies = Currencies;
  protected fileTypes = FileTypes;
  protected countryTree = [];

  protected icons = Icons;

  protected logger = getLogger("Tester");

  protected phoneNumbers = [
    "+12034238124",
    "+12033429821",
    "+971503182424",
    "+971543182424",
    "+919989912694",
    "+919989977561"
  ];
  protected fullPhoneInput = "+971503182424";
  protected localPhoneInput = "0503182424";

  protected src: string;
  protected elCopy: HTMLInputElement;

  protected elScroller: Element;

  protected themes = [
    "default",
    "gray",
    "primary",
    "secondary",
    "info",
    "danger",
    "success",
    "warning"
  ];

  protected menus = new Map([
    [
      { label: "Overview" },
      [
        { icon: "palette-advanced", src: "theme.html", label: "Themes" },
        { icon: "format-text", src: "typo.html", label: "Typography" },
        { icon: "format-list-bulleted", src: "lists.html", label: "Lists" },
        { icon: "blur-radial", src: "icons.html", label: "Icons" },
        {
          icon: "border-none",
          label: "Responsive",
          src: "responsive.html"
        },
        { icon: "earth", src: "countries.html", label: "Countries" },
        { icon: "cash", src: "currencies.html", label: "Currencies" },
        { icon: "file-alert-outline", src: "files.html", label: "File Types" },
        { icon: "phone", src: "phonelib.html", label: "PhoneLib" }
      ]
    ],
    [
      { label: "" },
      [
        {
          icon: "format-page-break",
          label: "Page",
          src: "page.html"
        },
        { icon: "keyboard-outline", src: "forms.html", label: "Forms" },
        { icon: "card-text-outline", src: "login.html", label: "Login" },
        {
          icon: "calendar",
          label: "Date Inputs",
          src: "dates.html"
        }
      ]
    ],
    [
      { label: "" },
      [
        { icon: "dns", src: "buttons.html", label: "Buttons" },
        { icon: "menu", src: "menu.html", label: "Menus" }
      ]
    ],
    [
      { label: "Panels" },
      [
        {
          icon: "mdi mdi-cards-variant",
          label: "Cards",
          src: "cards.html"
        },
        { icon: "mdi mdi-window-restore", src: "dialog.html", label: "Dialogs" },
        {
          icon: "mdi mdi-application",
          label: "Panels",
          src: "panels.html"
        },
        {
          icon: "tab",
          label: "Tabs",
          src: "tabs.html"
        },
        { icon: "mdi mdi-bell-outline", src: "alerts.html", label: "Alerts" },
        {
          badge: { theme: "yellow-dark", icon: "mdi mdi-alert", tooltip: "Under Development" },
          icon: "auto-fix",
          label: "Wizard",
          src: "wizard.html"
        }
      ]
    ],
    [
      { label: "" },
      [
        {
          badge: { theme: "yellow-dark", icon: "mdi mdi-alert", tooltip: "Under Development" },
          icon: "grid",
          label: "Datagrid",
          src: "datagrid.html"
        },
        {
          badge: { theme: "yellow-dark", icon: "mdi mdi-alert", tooltip: "Under Development" },
          icon: "file-tree",
          label: "Tree Panel",
          src: "tree.html"
        }
      ]
    ]
  ]);

  constructor(protected toastService: UIAlertService, private dialogService: UIDialogService) {
    this.countryTree.push({
      children: [],
      iconClosed: "mdi mdi-folder-outline",
      iconOpen: "mdi mdi-folder-open",
      label: "No Items"
    });
    this.countries.groupBy("continent").forEach((v, k) => {
      this.countryTree.push({
        children: v.map(c => ({
          icon: `ui-flag ${c.iso2}`,
          id: c.iso2,
          label: c.name,
          leaf: true
        })),
        iconClosed: "mdi mdi-folder-outline",
        iconOpen: "mdi mdi-folder-open",
        label: k
      });
    });
  }

  protected activate(param) {
    this.src = param.test || "theme.html";

    if (this.elScroller) {
      this.elScroller.scrollTop = 0;
    }
  }

  protected phoneInput(_, value) {
    return PhoneLib.formatInput(value || "", _[1]);
  }

  protected copy(el: Element, icon: string): void {
    /* Get the text field */
    this.elCopy.value = icon;
    /* Select the text field */
    this.elCopy.select();
    /* Copy the text inside the text field */
    document.execCommand("copy");

    const elCopy = el.querySelector(".icon-copy-text") as HTMLElement;
    elCopy.style.opacity = ".7";
    setTimeout(() => (elCopy.style.opacity = "0"), 1000);
  }

  protected selectLoader(query: string) {
    if (!query) {
      return new Promise(resolve => setTimeout(() => resolve(this.countries.slice(0, 10)), 1500));
    } else {
      const options = this.countries.filter(o =>
        o.name
          .toString()
          .ascii()
          .toLowerCase()
          .includes(query)
      );
      return new Promise(resolve => setTimeout(() => resolve(options), 1500));
    }
  }

  protected handleEventPromise() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  protected panelBeforeClose() {
    return this.toastService.confirm("Are you sure?", "Closing", {
      icon: "mdi mdi-comment-question",
      theme: "danger"
    });
  }

  protected logPromise(promise): void {
    promise.then(b => this.logger.info("Promise return", b));
  }

  protected openDialog(isModal = false) {
    if (isModal) {
      this.dialogService
        .open(DlgTest, { isModal })
        .then(result => this.logger.info("Dlg Closed", result));
    } else {
      this.dialogService
        .open(PLATFORM.moduleName("tests/dlg-test"), { isModal })
        .then(result => this.logger.info("Dlg Closed", result));
      this.dialogService
        .open(PLATFORM.moduleName("tests/dlg-test"), { isModal })
        .then(result => this.logger.info("Dlg Closed", result));
    }
  }

  protected isDateDisabled(date): boolean {
    return getDate(date) === 15;
  }

  protected listMatcher = ({ option, value }) => option.iso2 === (value || {}).iso2;
}
