/**
 * @author    : Adarsh Pastakia
 * @version   : 5.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { ViewSlot } from "aurelia-framework";

// Application config/constants
export class UIAppConfig {
  public AppTitle: string;
  public AppSubtitle: string;
  public AppVersion: string;

  public ApiBaseUrl: string;
  public ApiHeaders: string | KeyValue;

  public AlertContainer?: Element;
  public ToastContainer?: Element;
  public DialogContainer?: ViewSlot & { anchor?: Element };
  public TaskbarContainer?: ViewSlot & { anchor?: Element };
  public FloatingContainer?: Element;

  [key: string]: AnyObject;
}
