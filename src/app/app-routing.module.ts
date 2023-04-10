import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './auth/page-not-found/page-not-found.component';
import { AuthGuard } from './utils/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    redirectTo:'auth',
    pathMatch:'full'
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
    // canActivate: [AuthGuard]
  },
  {
    path:'vendor',
    loadChildren:()=>import('./vendor/vendor.module').then(m=>m.VendorModule),
    canActivate: [AuthGuard]
  },
  {
    path:'customer',
    loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
