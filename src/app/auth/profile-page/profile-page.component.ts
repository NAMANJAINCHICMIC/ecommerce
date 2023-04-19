import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { WindowService } from 'src/app/services/window.service';
import { PAGE } from 'src/app/utils/constants/constant';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent  {

  
  categories = [
   'Vendor',
   'Customer'
  ]
 

  constructor(private router: Router ,private toastr: ToastrService, private http: HttpClient,private authService: AuthService , private win : WindowService ){}
 
 
onCustomer(){
  this.router.navigate([PAGE.CUSTOMER_SIGN_UP]);

}
onVendor(){
  this.router.navigate([PAGE.VENDOR_SIGN_UP]);

}
signInPage(){
  this.router.navigate([PAGE.SIGN_IN]);
}

}
