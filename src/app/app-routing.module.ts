import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { VendorGuard } from './utils/guards/vendor.guard';
import { SignInGuard } from './utils/guards/sign-in.guard';
import { AuthInterceptor } from './utils/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {
    path:'',
    redirectTo:'customer',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
    canActivate: [SignInGuard]
  },
  {
    path:'vendor',
    loadChildren:()=>import('./vendor/vendor.module').then(m=>m.VendorModule),
    canActivate: [VendorGuard]
  },
  {
    path:'customer',
    loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule),
   
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}]
})
export class AppRoutingModule { }
