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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VendorOrdersComponent } from './vendor-orders/vendor-orders.component';
import { VendorProductDetailComponent } from './vendor-product-detail/vendor-product-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';
const material =[
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatProgressSpinnerModule
]


@NgModule({
  declarations: [
    
    VendorHomeComponent,
    VendorComponent,
    VendorAddItemComponent,
    VendorUpdateItemComponent,
    VendorViewProfileComponent,
    VendorUpdateProfileComponent,
    VendorOrdersComponent,
    VendorProductDetailComponent,
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    material,
    SharedModule
  ],
  exports : [
    material
  ]
})
export class VendorModule { }
