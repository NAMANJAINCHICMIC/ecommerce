import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { VendorComponent } from './vendor/vendor.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { VendorAddItemComponent } from './vendor-add-item/vendor-add-item.component';
import { VendorUpdateItemComponent } from './vendor-update-item/vendor-update-item.component';
import { VendorViewProfileComponent } from './vendor-view-profile/vendor-view-profile.component';
import { VendorUpdateProfileComponent } from './vendor-update-profile/vendor-update-profile.component';
import { VendorOrdersComponent } from './vendor-orders/vendor-orders.component';
import { VendorProductDetailComponent } from './vendor-product-detail/vendor-product-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vendor-home',
    pathMatch: 'full',
  },

  {
    path: 'vendor',
    component: VendorComponent,
    children: [
      {
        path: '',
        redirectTo: 'vendor-home',
        pathMatch: 'full',
      },
      {
        path: 'vendor-home',
        component: VendorHomeComponent,
      },
      {
        path: 'add-item',
        component: VendorAddItemComponent,
      },
      {
        path: `update-item/:id`,
        component: VendorUpdateItemComponent,
      },
      {
        path: `vendor-detail`,
        component: VendorViewProfileComponent,
      },
      {
        path: `update-vendor-detail`,
        component: VendorUpdateProfileComponent,
      },
      {
        path: `vendor-product-detail/:id`,
        component: VendorProductDetailComponent,
      },
      {
        path: `vendor-orders`,
        component: VendorOrdersComponent,
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
export class VendorRoutingModule {}
