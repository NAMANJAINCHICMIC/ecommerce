import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CustomerGuard } from '../utils/guards/customer.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer/home',
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
        canActivate: [CustomerGuard]
      },
      {
        path: `update-details`,
        component: CustomerUpdateProfileComponent,
        canActivate: [CustomerGuard]
      },
      {
        path: `my-cart`,
        component: CartComponent,
        canActivate: [CustomerGuard]
      },
      {
        path: `my-orders`,
        component: OrderPageComponent,
        canActivate: [CustomerGuard]
      },
      {
        path: `payment-gateway`,
        component: PaymentComponent,
        canActivate: [CustomerGuard]
      },
      {
        path: `product-detail/:id`,
        component: ProductDetailComponent,
        canActivate: [CustomerGuard]
      },
      {
        path: `add-reviews/:id`,
        component: AddReviewsComponent,
        canActivate: [CustomerGuard]
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
