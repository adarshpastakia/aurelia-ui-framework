import { UIAppConfig } from "../utils/ui-app-config";
import { UIInternal } from "../utils/ui-internal";
export declare class UIApplication {
    config: UIAppConfig;
    broadcast: typeof UIInternal.broadcast;
    subscribe: typeof UIInternal.subscribe;
    subscribeOnce: typeof UIInternal.subscribeOnce;
    private logger;
    constructor(config: UIAppConfig);
    log(tag: string, ...rest: any[]): void;
    debug(tag: string, ...rest: any[]): void;
}
