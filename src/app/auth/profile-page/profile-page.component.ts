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
      category: new FormControl('',Validators.required ),
      firmName: new FormControl('' ),
      // pathToProfilePic: new FormControl('', ),
    }
  )
  VendorForm = new FormGroup(
    {
     
      email: new FormControl('', [Validators.required,Validators.email]),
      phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern("^[6-9]\\d{9}$")]),
      address: new FormControl('',Validators.required ),
      firmName: new FormControl('' ),
      // category: new FormControl('',Validators.required ),
      // pathToProfilePic: new FormControl('', ),
    }
  )
get controlName(){
  return this.registrationForm.controls;
}

onSubmit(){
  if (this.registrationForm.valid ) {
    console.log('form submitted');
  console.log(this.registrationForm.value);
this.authService.profileDetail(this.registrationForm.value)
//   this.authService.enterProfile(this.registrationForm.value).subscribe((res:any)=>{
//     // this.toastr.info(res.message);
//     //     if(res.success){
  
//     //       this.registrationForm.reset();
//     //       this.mainService.userRole = res.data.userRole;
//     //       this.authService.storeToken(res.data.token);
//     //       this.router.navigate([PAGE.HOME]);
//     //     }
//     console.log(res)
//       })
// } else {
//   // validate all form fields
//   console.log("show errors")
//   this.showError = true;
}
}


}
