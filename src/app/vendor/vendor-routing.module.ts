import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { VendorComponent } from './vendor/vendor.component';
import { VendorHomeComponent } from './vendor-home/vendor-home.component';
import { VendorAddItemComponent } from './vendor-add-item/vendor-add-item.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'vendor-home',
    pathMatch: 'full',
  },

  {
    path: 'vendor',
    component: VendorComponent,
    children:[
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
        
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class VendorRoutingModule { }