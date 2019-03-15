import { PLATFORM } from "aurelia-pal";
export const auconfig = (aurelia, callback?) => {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName("aurelia-validation"))
    .plugin(PLATFORM.moduleName("aurelia-ui-virtualization"))
    .plugin(PLATFORM.moduleName("aurelia-ui-framework"), callback);
};

jest.setTimeout(30000);
