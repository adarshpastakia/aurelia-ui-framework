// tslint:disable-next-line:no-submodule-imports
import "@testing-library/jest-dom/extend-expect";
import { PLATFORM } from "aurelia-pal";

export const auconfig = (aurelia, callback?) => {
  return aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName("aurelia-ui-virtualization"))
    .plugin(PLATFORM.moduleName("aurelia-ui-framework"), callback);
};

jest.setTimeout(30000);
