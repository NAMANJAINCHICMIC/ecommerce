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
  selector: 'app-customer-sign-up',
  templateUrl: './customer-sign-up.component.html',
  styleUrls: ['./customer-sign-up.component.scss']
})
export class CustomerSignUpComponent implements OnInit {
number :any
  showError= false;
  categories = [
   'Vendor',
   'Customer'
  ]

  windowRef :any;
  constructor(private router: Router ,private toastr: ToastrService, private http: HttpClient,private authService: AuthService , private win : WindowService ){}
  ngOnInit(){
    const auth = getAuth();
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier =  new RecaptchaVerifier('recaptcha-container',{
      'size': 'normal',
 
    },auth)
    this.windowRef.recaptchaVerifier.render();
  }
  

  registrationForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required , Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required , Validators.minLength(3)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
      address: new FormControl('',Validators.required ),
      role: new FormControl('customer')
      // category: new FormControl('',Validators.required ),
      // firmName: new FormControl('' ),
      // pathToProfilePic: new FormControl('', ),
    }
  )
 
get controlName(){
  return this.registrationForm.controls;
}

onCustomer(){

this.router.navigate([PAGE.CUSTOMER_SIGN_UP]);

}

  async onSubmit(){
  if (this.registrationForm.valid ) {
    
  console.log(this.registrationForm.value);
  // this.authService.storeUserName(`${this.registrationForm.value.firstName} ${this.registrationForm.value.lastName}`)
// this.authService.profileDetail(this.registrationForm.value)
const boolValue = await this.authService.checkUserExist(this.registrationForm.value.phone)
if(!boolValue){
  console.log('form submitted');
  this.win.sendLoginCode(this.registrationForm.value.phone,this.windowRef).then(result => {
    console.log(result)
    this.windowRef.confirmationResult = result;
    this.win.windowRefrence.confirmationResult = result;
      if(this.windowRef.confirmationResult){
  // this.displayOtpPage = true
  this.number = this.registrationForm.value.phone
  this.authService.userId = this.number
  this.authService.storeUserId(this.number);
  this.authService.profileDetail(this.registrationForm.value)
  this.router.navigate([PAGE.OTP_PAGE]);
      }
  })
  .catch( error => console.log(error) );
}else{
  console.log("user already exist!")
  this.router.navigate([PAGE.SIGN_IN]);
}

}
}
onVendor(){
  this.router.navigate([PAGE.VENDOR_SIGN_UP]);
}

signInPage(){
  this.router.navigate([PAGE.SIGN_IN]);
}

}

