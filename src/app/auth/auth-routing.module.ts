import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthGuard } from '../utils/guards/auth.guard';



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
    canActivate: [AuthGuard]
 
},
{
  path:'profile',
  component:ProfilePageComponent,
  canActivate: [AuthGuard]
}
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
    // {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ]
})
export class AuthRoutingModule { }
