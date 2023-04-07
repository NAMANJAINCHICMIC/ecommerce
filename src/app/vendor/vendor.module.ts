import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorAddItemComponent } from './vendor-add-item/vendor-add-item.component';
import { VendorRoutingModule } from './vendor-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VendorUpdateItemComponent } from './vendor-update-item/vendor-update-item.component';
import { VendorViewProfileComponent } from './vendor-view-profile/vendor-view-profile.component';
import { VendorUpdateProfileComponent } from './vendor-update-profile/vendor-update-profile.component';
const material =[
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatToolbarModule,
  MatSlideToggleModule
]


@NgModule({
  declarations: [
    VendorHomeComponent,
    VendorComponent,
    VendorAddItemComponent,
    VendorUpdateItemComponent,
    VendorViewProfileComponent,
    VendorUpdateProfileComponent,
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,

    ReactiveFormsModule,
    FormsModule,
    material
  ],
  exports : [
    material
  ]
})
export class VendorModule { }