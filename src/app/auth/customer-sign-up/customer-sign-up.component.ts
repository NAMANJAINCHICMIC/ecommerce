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
  selector: 'app-customer-sign-up',
  templateUrl: './customer-sign-up.component.html',
  styleUrls: ['./customer-sign-up.component.scss'],
})
export class CustomerSignUpComponent implements OnInit {
  phoneNumber?: string;
  isSubmitting = false;
  showError = false;
  categories = ['Vendor', 'Customer'];
  replaceWithNumber = REGEX.REPLACE;
  windowRef: any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private authService: AuthService,
    private win: WindowService
  ) {}
  ngOnInit() {
    const auth = getAuth();
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
      },
      auth
    );
    this.windowRef.recaptchaVerifier.render();
  }

  registrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(REGEX.MOBILE_NUMBER),
    ]),
    address: new FormControl('', Validators.required),
    role: new FormControl('customer'),
  });

  get controlName() {
    return this.registrationForm.controls;
  }

  onCustomer() {
    this.router.navigate([PAGE.CUSTOMER_SIGN_UP]);
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      this.isSubmitting = true;
      // console.log(this.registrationForm.value);
      const boolValue = await this.authService.checkUserExist(
        this.registrationForm.value.phone
      );
      if (boolValue != null) {
        if (!boolValue) {
          console.log('form submitted');
          this.win
            .sendLoginCode(this.registrationForm.value.phone, this.windowRef)
            .then((result) => {
              // console.log(result);
              this.windowRef.confirmationResult = result;
              this.win.windowRefrence.confirmationResult = result;
              if (this.windowRef.confirmationResult) {
                this.phoneNumber = '' + this.registrationForm.value.phone;
                this.authService.userId = this.phoneNumber;
                this.authService.storeUserId(this.phoneNumber);
                this.authService.profileDetail(this.registrationForm);
                this.router.navigate([PAGE.OTP_PAGE]);
              }
            })
            .catch((error) => {
              // console.log(error);
              Swal.fire(`Error ${error.code}`, error.message, 'error');
            });
          setTimeout(() => {
            this.isSubmitting = false;
          }, 2000);
        } else {
          // console.log('user already exist!');
          Swal.fire('Error!', 'user already exist!', 'info');
          this.router.navigate([PAGE.SIGN_IN]);
        }
      }
    } else {
      this.showError = true;
    }
  }
  onVendor() {
    this.router.navigate([PAGE.VENDOR_SIGN_UP]);
  }

  signInPage() {
    this.router.navigate([PAGE.SIGN_IN]);
  }
}
