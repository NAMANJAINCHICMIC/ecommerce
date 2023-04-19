import { Injectable } from '@angular/core';

import { auth } from 'src/environment';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class WindowService {
windowRefrence : any;
  get windowRef() {
    return window
  }
constructor(private router: Router) {
  this.windowRefrence = this.windowRef
  // this.windowRefrence.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
  //   'size': 'normal',
  //   // 'callback': (response:any) => {
  //   //   // reCAPTCHA solved, allow signInWithPhoneNumber.
  //   //   // ...    
  //   // },
  //   // 'expired-callback': () => {
  //   //   // Response expired. Ask user to solve reCAPTCHA again.
  //   //   // ...
  //   // }
  // },auth)
  // this.windowRefrence.recaptchaVerifier.render();
}
sendLoginCode(phone : any ,windowRefrence:any ) {
  const auth = getAuth();
  const appVerifier = windowRefrence.recaptchaVerifier;
  const num = '+91'+phone;
return signInWithPhoneNumber(auth,num, appVerifier)
//           .then(result => {
//             console.log(result)
//               windowRefrence.confirmationResult = result;
//               if(windowRefrence.confirmationResult){
// // this.displayOtpPage = true
//               }
//           })
//           .catch( error => console.log(error) );
}

verifyLoginCode(otp:any , windowRefrence:any) {
  windowRefrence.confirmationResult
                .confirm(otp)
                // .confirm(this.verificationCode)
                .then( (result:any) => {
                  console.log(result)
                  // this.user = result.user;
                  // this.authService.userId = result.user.uid
                  // this.authService.storeUserId(result.user.uid);
                  // this.authService.storeToken(result.user.accessToken)
                  // if(result._tokenResponse.isNewUser){
                  //   this.router.navigate([PAGE.PROFILE])
                  // }else{
                  //   // this.router.navigate([PAGE.HOME])
                  //   this.authService.getUserData();
                  // }
                  // this.displayOtpPage = false;
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
}
