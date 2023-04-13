import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomerViewProfileComponent } from './customer-view-profile/customer-view-profile.component';
import { CustomerUpdateProfileComponent } from './customer-update-profile/customer-update-profile.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartFooterComponent } from './cart-footer/cart-footer.component';
import { CartComponent } from './cart/cart.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PaymentComponent } from './payment/payment.component';
import { OrderPageComponent } from './order-page/order-page.component';


import { AddReviewsComponent } from './add-reviews/add-reviews.component';
const material =[
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerHomeComponent,
    CustomerViewProfileComponent,
    CustomerUpdateProfileComponent,
    ProductDetailComponent,
    CartFooterComponent,
    CartComponent,
    PaymentComponent,
    OrderPageComponent,
    AddReviewsComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    material,
   
  ],
  exports : [
    material
  ]
})
export class CustomerModule { }
