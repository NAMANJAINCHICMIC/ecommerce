import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { CustomerSignUpComponent } from './customer-sign-up/customer-sign-up.component';
import { VendorSignUpComponent } from './vendor-sign-up/vendor-sign-up.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in'
},
{
    path: 'sign-in',
    component: PhoneLoginComponent,
  
  
 
},
{
  path:'profile',
  component:ProfilePageComponent,

},
{
  path:'otp-page',
  component:OtpPageComponent,

},
{
  path:'customer-sign-up',
  component:CustomerSignUpComponent,
 
},
{
  path:'vendor-sign-up',
  component:VendorSignUpComponent,
 
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    
  ]
})
export class AuthRoutingModule { }
