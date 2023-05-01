import { Component, OnInit } from '@angular/core';
// import {auth} from 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { WindowService } from 'src/app/services/window.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE, REGEX } from 'src/app/utils/constants/constant';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent  implements OnInit {
displayOtpPage = false;
  windowRef: any;
  verificationCode?: string;

  showError= false;
phoneNumber?:string;
  constructor(private win: WindowService , private http: HttpClient ,private router: Router , private authService : AuthService) { }

  ngOnInit() {
    const auth = getAuth();
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-3',{
      'size': 'normal',
  
    },auth)
    this.windowRef.recaptchaVerifier.render();
   
  }
  async sendLoginCode() {
    if (this.loginForm.valid ) {
      this.showError=false;  
    const auth = getAuth();
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+91'+this.loginForm.value.phone;
    const userExist = await this.authService.checkUserExist(this.loginForm.value.phone);
    // console.log(exist)
    if(userExist != null){
  
   if(userExist ){
     signInWithPhoneNumber(auth,num, appVerifier)
                 .then(result => {
                  //  console.log(result)
                     this.windowRef.confirmationResult = result;
                     if(this.windowRef.confirmationResult){
     this.displayOtpPage = true
                     }
                 })
                 .catch( error =>{
                  // console.log(error) 
                  Swal.fire(
                    `Error ${error.code}`,
                    error.message,
                    'error'
                    )
                  } 
                );
   }
   else{
    // console.log("user does not exist!")
    Swal.fire(
      'Error!',
      'user does not exist!',
      'info'
    )
    
    this.router.navigate([PAGE.PROFILE])
   }
  }
}else{
  this.showError=true;
}
}

  verifyLoginCode() {
    if (this.verificationForm.valid ) {
      this.showError=false;
    this.windowRef.confirmationResult
                  .confirm(this.verificationForm.value.otp)
  
                  .then( (result:any) => {
                    // console.log(result)
                   
                    this.phoneNumber = ''+this.loginForm.value.phone
                    this.authService.userId = this.phoneNumber
            
                    this.authService.storeUserId(this.phoneNumber);
                    this.authService.storeToken(result.user.accessToken)
                 
                    this.authService.getUserData();
                    this.displayOtpPage = false;
    })
    .catch( (error:any) =>{
      Swal.fire(
				'Error!',
				'Incorrect code entered?',
				'error'
			)
      console.log(error, "Incorrect code entered?")
    }
    );
  }else{
    this.showError=true;
  }
}
  loginForm = new FormGroup(
    {     
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern(REGEX.MOBILE_NUMBER)]),   
    }
  )
  verificationForm = new FormGroup(
    {     
      otp:new FormControl('', [Validators.required , Validators.minLength(6),Validators.maxLength(6),]),  
    }
  )
get controlName(){
  return this.loginForm.controls;
}
get controlNameVerify(){
  return this.verificationForm.controls;
}
signUpPage(){
  this.router.navigate([PAGE.PROFILE]);
}
}


