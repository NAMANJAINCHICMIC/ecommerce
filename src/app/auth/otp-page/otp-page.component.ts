import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WindowService } from 'src/app/services/window.service';
import { PAGE } from 'src/app/utils/constants/constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.scss']
})
export class OtpPageComponent implements OnInit {
  showError= false;
  isSubmitting = false;
  windowRef: any;
  verificationCode?: string;
  constructor(private win: WindowService , private http: HttpClient ,private router: Router , private authService : AuthService) { 
   
  }
  ngOnInit(): void {
    this.windowRef = this.win.windowRefrence
  }
  verificationForm = new FormGroup(
    {     
      otp:new FormControl('', [Validators.required , Validators.minLength(6),Validators.maxLength(6),]),  
    }
    )
    get controlNameVerify(){
      return this.verificationForm.controls;
    }
  signUpPage(){
    this.router.navigate([PAGE.PROFILE]);
  }
  verifyLoginCode() {
    if (this.verificationForm.valid ) {
      this.showError=false;  
    console.log(this.verificationForm.value.otp)
    const otpValue = this.verificationForm?.value?.otp
    if(this.windowRef.confirmationResult){
      this.isSubmitting = true;
      setTimeout(() => {
        
        this.isSubmitting = false;
      
      }, 2000);
    this.windowRef.confirmationResult
                  .confirm(otpValue)
                 
                  .then( (result:any) => {
                    console.log(result)
                    console.log("user verified")
                   
                    this.authService.userId = result.user.uid
                    
                    this.authService.storeToken(result.user.accessToken)
                  
                    this.authService.getUserData();
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
    Swal.fire(
      'Error!',
      'Something went wrong!',
      'error'
    )
    this.router.navigate([PAGE.SIGN_IN])
  }
}else{
  this.showError=true;
}
}
}
