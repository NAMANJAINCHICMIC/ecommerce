import { Directive, ElementRef, HostListener } from '@angular/core';
import { REGEX } from '../constants/constant';

@Directive({
  selector: '[appReplaceNumber]'
})
export class ReplaceNumberDirective {


  constructor(private el: ElementRef) {}

   
  @HostListener('input', ['$event']) onInputChange() {

    // this.el.nativeElement.value = this.el.nativeElement.value.replace(REGEX.REPLACE, '');
    const initialValue = this.el.nativeElement.value;

    // Replace non-numeric characters with empty string
    const sanitizedValue = initialValue.replace(REGEX.REPLACE, '');

    // Set the element value to the sanitized value
    this.el.nativeElement.value = sanitizedValue;

    // Emit a custom event with the sanitized value as payload
    this.el.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));

  }


}


