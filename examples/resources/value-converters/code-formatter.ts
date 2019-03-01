/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019s
 * @license   : MIT
 */
import { valueConverter } from "aurelia-framework";
import Prism from "prismjs";
// tslint:disable
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-typescript";
// tslint:enable

@valueConverter("code")
export class CodeValueConverter {
  public toView(
    value: string,
    type: "ts" | "scss" | "html" | "shell" | "markdown" = "markdown"
  ): string {
    let lang = Prism.languages.markdown;
    switch (type) {
      case "ts":
        lang = Prism.languages.js;
        break;
      case "html":
        lang = Prism.languages.html;
        break;
      case "scss":
        lang = Prism.languages.scss;
        break;
      case "shell":
        lang = Prism.languages.shell;
        break;
    }
    return Prism.highlight(value, lang, type);
  }
}
