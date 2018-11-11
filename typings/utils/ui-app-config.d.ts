/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { ViewSlot } from "aurelia-framework";
export declare class UIAppConfig {
    AppTitle: string;
    AppSubtitle: string;
    AppVersion: string;
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
