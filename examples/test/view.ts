export class TesterView {
  protected alertShow: string = "";

  protected attached(): void {
    this.alertShow = "ui-alert--show";
  }
}
