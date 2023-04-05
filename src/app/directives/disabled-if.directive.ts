import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: `
  [formControlName][appDisabledIf]
  `,
})
export class DisabledIfDirective {
  @Input('appDisabledIf') set disabledIf(value: boolean) {
    this.disabled = value;
    this.toggleDisable();
  }
  private disabled: boolean;
  
  constructor(private ngControl: NgControl) { }

  ngAfterViewInit() {
    this.toggleDisable();
  }

  private toggleDisable() {
    const control = this.ngControl.control;
    if (control) {
      this.disabled ? control.disable() : control.enable();
    }
  }
}
