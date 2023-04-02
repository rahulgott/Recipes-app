import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[dropwdownToggler]'
})
export class DropwdownTogglerDirective {
  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
