import { Directive, ElementRef, HostListener } from '@angular/core';
import { REGEX } from '../constants/constant';

@Directive({
  selector: '[appReplaceNumber]'
})
export class ReplaceNumberDirective {


  constructor(private el: ElementRef) {}

   
  @HostListener('input', ['$event']) onInputChange() {

    this.el.nativeElement.value = this.el.nativeElement.value.replace(REGEX.REPLACE, '');

  }


}


