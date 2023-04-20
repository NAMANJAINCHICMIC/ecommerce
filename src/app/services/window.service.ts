import { Injectable } from '@angular/core';

import { auth } from 'src/environment';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup } from '@angular/forms';
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
sendLoginCode(phone : string | null | undefined ,windowRefrence:any ) {
  const auth = getAuth();
  const appVerifier = windowRefrence.recaptchaVerifier;
  const num = '+91'+phone;
return signInWithPhoneNumber(auth,num, appVerifier)

}

verifyLoginCode(otp:any , windowRefrence:any) {
  windowRefrence.confirmationResult
                .confirm(otp)
                // .confirm(this.verificationCode)
                .then( (result:any) => {
                  console.log(result)
                 
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
