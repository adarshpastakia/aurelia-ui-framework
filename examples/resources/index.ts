import { FrameworkConfiguration } from "aurelia-framework";
import { LipsumLine, LipsumPara, LipsumTitle } from "./elements/lipsum";

export function configure(config: FrameworkConfiguration) {
  config.globalResources([LipsumLine, LipsumPara, LipsumTitle]);
}
