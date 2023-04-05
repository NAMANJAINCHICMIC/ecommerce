import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environment';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { AuthService } from '../services/auth.service';

import { PhoneLoginComponent } from './phone-login/phone-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
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
   
  ],
  imports: [
    CommonModule,

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