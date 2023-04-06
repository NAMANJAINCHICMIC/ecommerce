import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../utils/guards/auth.guard';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { CustomerComponent } from './customer/customer.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'customer',
    component: CustomerComponent,
    children:[
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
export class CustomerRoutingModule { }