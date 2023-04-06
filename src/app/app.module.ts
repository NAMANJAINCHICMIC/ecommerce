import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { AngularFireStorageModule } from '@angular/fire/compat/storage/'; 
import { environment } from 'src/environment';
const material =[
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    material
  ],
  exports:[material],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
