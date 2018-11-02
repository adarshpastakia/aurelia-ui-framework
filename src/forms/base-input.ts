/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */
import { computedFrom } from "aurelia-framework";
import { UIInternal } from "../utils/ui-internal";

export class BaseInput {
  public value: AnyObject;

  protected inputEl: HTMLInputElement | HTMLTextAreaElement;

  protected errors: string | string[];
  protected maxlength: number = 0;
  protected allowClear: boolean = false;
  protected showCounter: boolean = false;

  protected readonly: string | boolean = false;
  protected disabled: string | boolean = false;
  protected isDisabled: string | boolean = false;

  protected dropHandle: string;

  constructor(protected element: Element) {
    this.allowClear = element.hasAttribute("clear");
    this.showCounter = element.hasAttribute("counter");
  }

  public focus() {
    this.inputEl.focus();
  }

  public disable(b: boolean): void {
    this.isDisabled = b;
  }

  @computedFrom("isDisabled", "disabled", "readonly", "errors")
  get classes(): string {
    const classes = [];
    if (this.errors && this.errors.length > 0) {
      classes.push("ui-input--invalid");
    }
    if (this.isTrue("readonly")) {
      classes.push("ui-input--readonly");
    }
    if (this.isTrue("disabled") || this.isDisabled) {
      classes.push("ui-input--disabled");
    }
    return classes.join(" ");
  }

  protected bind(): void {
    this.readonly = this.isTrue("readonly");
    this.disabled = this.isTrue("disabled");
  }

  protected clear(): void {
    this.value = "";
    this.inputEl.focus();
  }

  protected fireEnter($event: KeyboardEvent): boolean {
    if ($event.keyCode === 13) {
      $event.stopEvent();
      this.element.dispatchEvent(UIInternal.createEvent("enterpressed", this.value));
    }
    return true;
  }

  private isTrue(prop: string): boolean {
    return this[prop] === "" || this[prop] === prop || isTrue(this[prop]);
  }
}
