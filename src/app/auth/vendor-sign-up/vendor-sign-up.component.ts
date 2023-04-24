import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { WindowService } from 'src/app/services/window.service';
import { PAGE, REGEX } from 'src/app/utils/constants/constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-sign-up',
  templateUrl: './vendor-sign-up.component.html',
  styleUrls: ['./vendor-sign-up.component.scss']
})
export class VendorSignUpComponent implements OnInit {
  phoneNumber ?:string;
  showError= false;
  categories = [
   'Vendor',
   'Customer'
  ]
 
  windowRef :any;
  constructor(private router: Router ,private toastr: ToastrService, private http: HttpClient,private authService: AuthService , private win : WindowService ){}
  ngOnInit(): void {
    const auth = getAuth();
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-2',{
      'size': 'normal',
   
    },auth)
    this.windowRef.recaptchaVerifier.render();
  }
  

  vendorForm = new FormGroup(
    {
     
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern(REGEX.MOBILE_NUMBER)]),
      address: new FormControl('',Validators.required ),
      firmName: new FormControl('' ,Validators.required),
      role: new FormControl('vendor')
      // category: new FormControl('',Validators.required ),
      // pathToProfilePic: new FormControl('', ),
    }
  )

get vendorControlName(){
  return this.vendorForm.controls;
}
onCustomer(){
  this.router.navigate([PAGE.CUSTOMER_SIGN_UP]);

}
onVendor(){
  this.router.navigate([PAGE.VENDOR_SIGN_UP]);
 
}

  async onVendorSubmit(){
if(this.vendorForm.valid){
  this.showError= false;
console.log(this.vendorForm.value);
const boolValue = await this.authService.checkUserExist(this.vendorForm.value.phone);
if(boolValue != null){
if(!boolValue){
this.win.sendLoginCode(this.vendorForm.value.phone,this.windowRef).then(result => {
  console.log(result)
  this.windowRef.confirmationResult = result;
  this.win.windowRefrence.confirmationResult = result;
    if(this.windowRef.confirmationResult){
// this.displayOtpPage = true
this.phoneNumber = ''+this.vendorForm.value.phone
this.authService.userId = this.phoneNumber
this.authService.storeUserId(this.phoneNumber);
this.authService.vendorProfileDetail(this.vendorForm)
this.router.navigate([PAGE.OTP_PAGE]);
    }
})
.catch( error =>{
  console.log(error) 
  Swal.fire(
    `Error ${error.code}`,
    error.message,
    'error'
    )
  } 
);
}else{
  console.log("user already exist!")
  Swal.fire(
    'Error!',
    'user already exist!',
    'info'
  )
  this.router.navigate([PAGE.SIGN_IN]);
}
}
}else{
  this.showError=true;
}
}
signInPage(){
  this.router.navigate([PAGE.SIGN_IN]);
}


}
