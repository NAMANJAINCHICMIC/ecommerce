import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from '../utils/guards/auth.guard';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { CustomerSignUpComponent } from './customer-sign-up/customer-sign-up.component';
import { VendorSignUpComponent } from './vendor-sign-up/vendor-sign-up.component';
import { AuthInterceptor } from '../utils/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
},
{
    path: 'sign-in',
    component: PhoneLoginComponent,
    // component: SignInComponent,
    // canActivate: [AuthGuard]
 
},
{
  path:'profile',
  component:ProfilePageComponent,
  // canActivate: [AuthGuard]
},
{
  path:'otp-page',
  component:OtpPageComponent,
  // canActivate: [AuthGuard]
},
{
  path:'customer-sign-up',
  component:CustomerSignUpComponent,
  // canActivate: [AuthGuard]
},
{
  path:'vendor-sign-up',
  component:VendorSignUpComponent,
  // canActivate: [AuthGuard]
},
// {
//     path: 'sign-up',
//     component: SignUpComponent,
//     // canActivate: [AuthGuard]
// }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    //{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class AuthRoutingModule { }
