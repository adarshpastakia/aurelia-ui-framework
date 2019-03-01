/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2019
 * @license   : MIT
 */
import { ViewSlot } from "aurelia-framework";

// Application config/constants
export class UIAppConfig {
  public ApiBaseUrl: string;
  public ApiHeaders: string | KeyValue;

  public AlertContainer?: Element;
  public ToastContainer?: Element;
  public DialogContainer?: ViewSlot & { anchor?: Element };
  public TaskbarContainer?: ViewSlot & { anchor?: Element };
  public FloatingContainer?: Element;

  [key: string]: AnyObject;
}
