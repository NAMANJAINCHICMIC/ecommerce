import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { CustomerSignUpComponent } from './customer-sign-up/customer-sign-up.component';
import { VendorSignUpComponent } from './vendor-sign-up/vendor-sign-up.component';
import { SharedModule } from '../shared/shared.module';
const material =[
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    
    PhoneLoginComponent,
         ProfilePageComponent,
         OtpPageComponent,
         CustomerSignUpComponent,
         VendorSignUpComponent,
   
  ],
  imports: [
    CommonModule,
SharedModule,
    ReactiveFormsModule,
    FormsModule, AuthRoutingModule, HttpClientModule, 
    material

  ],
  exports:[
    material
  ]
  // providers: [AuthService],
})
export class AuthModule { }
