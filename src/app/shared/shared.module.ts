import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReplaceNumberDirective } from '../utils/directives/replace-number.directive';



@NgModule({
  declarations: [
    ReplaceNumberDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ReplaceNumberDirective,
  ]
})
export class SharedModule { }
