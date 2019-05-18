import { ViewSlot } from "aurelia-framework";
export declare class UIAppConfig {
    ApiBaseUrl: string;
    ApiHeaders: string | KeyValue;
    AlertContainer?: Element;
    ToastContainer?: Element;
    DialogContainer?: ViewSlot & {
        anchor?: Element;
    };
    TaskbarContainer?: ViewSlot & {
        anchor?: Element;
    };
    FloatingContainer?: Element;
    [key: string]: AnyObject;
}
