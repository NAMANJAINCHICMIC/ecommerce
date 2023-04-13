import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { CustomerComponent } from './customer/customer.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { CustomerUpdateProfileComponent } from './customer-update-profile/customer-update-profile.component';
import { CustomerViewProfileComponent } from './customer-view-profile/customer-view-profile.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { AddReviewsComponent } from './add-reviews/add-reviews.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'customer',
    component: CustomerComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: CustomerHomeComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: `view-details`,
        component: CustomerViewProfileComponent,
      },
      {
        path: `update-details`,
        component: CustomerUpdateProfileComponent,
      },
      {
        path: `my-cart`,
        component: CartComponent,
      },
      {
        path: `my-orders`,
        component: OrderPageComponent,
      },
      {
        path: `payment-gateway`,
        component: PaymentComponent,
      },
      {
        path: `product-detail/:id`,
        component: ProductDetailComponent,
      },
      {
        path: `add-reviews/:id`,
        component: AddReviewsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CustomerRoutingModule {}
