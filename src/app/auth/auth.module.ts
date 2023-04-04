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



@NgModule({
  declarations: [
    
    PhoneLoginComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    FormsModule, AuthRoutingModule,

  ],
  // providers: [AuthService],
})
export class AuthModule { }
