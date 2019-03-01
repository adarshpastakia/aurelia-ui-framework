import { FrameworkConfiguration } from "aurelia-framework";
import { Blockquote } from "./elements/blockquote/blockquote";
import { CodeBlock } from "./elements/code-block/code-block";
import { CodeTable } from "./elements/code-table/code-table";
import { LipsumLine, LipsumPara, LipsumTitle } from "./elements/lipsum/lipsum";
import { CodeValueConverter } from "./value-converters/code-formatter";

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    Blockquote,
    CodeBlock,
    CodeTable,
    CodeValueConverter,
    LipsumPara,
    LipsumTitle,
    LipsumLine
  ]);
}
