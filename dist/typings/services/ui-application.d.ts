import { UIAppConfig } from "../utils/ui-app-config";
export declare class UIApplication {
    config: UIAppConfig;
    private logger;
    constructor(config: UIAppConfig);
    log(tag: string, ...rest: any[]): void;
    debug(tag: string, ...rest: any[]): void;
}
