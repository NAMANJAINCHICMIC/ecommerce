import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/compat';
// import {auth} from 'firebase/firestore';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { WindowService } from 'src/app/services/window.service';
import { PhoneNumber } from 'src/app/utils/models/phoneNumber';
import { environment } from 'src/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from 'src/app/utils/constants/constant';
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
  user: any;

  constructor(private win: WindowService , private http: HttpClient ,private router: Router , private authService : AuthService) { }

  ngOnInit() {
    const auth = getAuth();
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
      'size': 'normal',
      'callback': (response:any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...    
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    },auth)
    this.windowRef.recaptchaVerifier.render().then((widgetId:any) => { 
    });
  }
  sendLoginCode() {
    const auth = getAuth();
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+91'+this.loginForm.value.phone;
signInWithPhoneNumber(auth,num, appVerifier)
            .then(result => {
              console.log(result)
                this.windowRef.confirmationResult = result;
                if(this.windowRef.confirmationResult){
this.displayOtpPage = true
                }
            })
            .catch( error => console.log(error) );
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationForm.value.otp)
                  // .confirm(this.verificationCode)
                  .then( (result:any) => {
                    console.log(result)
                    this.user = result.user;
                    this.authService.userId = result.user.uid
                    this.authService.storeUserId(result.user.uid);
                    this.authService.storeToken(result.user.accessToken)
                    if(result._tokenResponse.isNewUser){
                      this.router.navigate([PAGE.PROFILE])
                    }else{
                      // this.router.navigate([PAGE.HOME])
                      this.authService.getUserData();
                    }
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
  }
  loginForm = new FormGroup(
    {     
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),   
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

}


