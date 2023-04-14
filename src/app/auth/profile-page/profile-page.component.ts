import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'src/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  visible=true;
  showCustomer = false; 
  showVendor = false; 
  // picUploaded = false;
  showError= false;
  categories = [
   'Vendor',
   'Customer'
  ]
  viewPassword(){
    this.visible = !this.visible;
  }
  constructor(private router: Router ,private toastr: ToastrService, private http: HttpClient,private authService: AuthService ){}
  

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
  vendorForm = new FormGroup(
    {
     
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
      address: new FormControl('',Validators.required ),
      firmName: new FormControl('' ,Validators.required),
      role: new FormControl('vendor')
      // category: new FormControl('',Validators.required ),
      // pathToProfilePic: new FormControl('', ),
    }
  )
get controlName(){
  return this.registrationForm.controls;
}
get vendorControlName(){
  return this.vendorForm.controls;
}
onCustomer(){
this.showCustomer =true;
this.showVendor = false;
}
onVendor(){
  this.showCustomer =false;
  this.showVendor = true;
}
onSubmit(){
  if (this.registrationForm.valid ) {
    console.log('form submitted');
  console.log(this.registrationForm.value);
  // this.authService.storeUserName(`${this.registrationForm.value.firstName} ${this.registrationForm.value.lastName}`)
this.authService.profileDetail(this.registrationForm.value)

}
}
onVendorSubmit(){
if(this.vendorForm.valid){
console.log(this.vendorForm.value);
this.authService.vendorProfileDetail(this.vendorForm.value)
}
}


}
