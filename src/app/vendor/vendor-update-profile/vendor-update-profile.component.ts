import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from 'src/app/services/vendor.service';
import { PAGE, REGEX } from 'src/app/utils/constants/constant';


@Component({
  selector: 'app-vendor-update-profile',
  templateUrl: './vendor-update-profile.component.html',
  styleUrls: ['./vendor-update-profile.component.scss']
})
export class VendorUpdateProfileComponent  implements OnInit{
  info:DocumentData = [];
  showError= false;
  async ngOnInit(): Promise<void> {
    const snap = await this.vendorService.getVendorProfile( );
    if(snap)
    if (snap.exists()) {
             this.info = snap.data()      
             
            // console.log(this.info)   
        }
        this.vendorForm = new FormGroup(
          {
           
            email: new FormControl(this.info['email'], [Validators.required,Validators.email]),
            phone: new FormControl(this.info['phone'],[Validators.required , Validators.minLength(10),Validators.pattern(REGEX.MOBILE_NUMBER)]),
            address: new FormControl(this.info['address'],Validators.required ),
            firmName: new FormControl(this.info['firmName'],Validators.required),
            role: new FormControl('vendor')
            // category: new FormControl('',Validators.required ),
            // pathToProfilePic: new FormControl('', ),
          }
        )
      }
  vendorForm: FormGroup<{
      firmName: FormControl<string | null>,
      role: FormControl<string | null>,
      email: FormControl<string | null>,
      phone: FormControl<string | null>,
      address: FormControl<string | null>,
      // pathToProfilePic: FormControl<string | null>
  }>;
  constructor(private router: Router ,private toastr: ToastrService , private http: HttpClient , private vendorService : VendorService){
    this.vendorForm = new FormGroup(
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
      }
 
get controlName(){
  return this.vendorForm.controls;
}
onSubmit(){
  if (this.vendorForm.valid ) {
    this.showError = false;
   this.vendorService.updateVendorProfile(this.vendorForm) 

} else {
  // console.log("show errors")
  this.showError = true;
}
}
profilePage(){
  this.router.navigate([PAGE.VENDOR_PROFILE]);
}
}
