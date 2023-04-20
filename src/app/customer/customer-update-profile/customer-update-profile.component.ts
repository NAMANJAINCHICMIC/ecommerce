import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE, REGEX } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-customer-update-profile',
  templateUrl: './customer-update-profile.component.html',
  styleUrls: ['./customer-update-profile.component.scss']
})
export class CustomerUpdateProfileComponent  implements OnInit{
  info:DocumentData = [];
  showError= false;
  async ngOnInit(): Promise<void> {
    const snap = await this.customerService.getCustomerProfile( );
    if (snap.exists()) {
             this.info = snap.data()                 
            console.log(this.info)   
        }
        this.customerForm = new FormGroup(
          {      
            email: new FormControl(this.info['email'], [Validators.required,Validators.email]),
            phone: new FormControl(this.info['phone'],[Validators.required , Validators.minLength(10),Validators.pattern(REGEX.MOBILE_NUMBER)]),
            address: new FormControl(this.info['address'],Validators.required ),
            firstName: new FormControl(this.info['firstName'],Validators.required),
            lastName: new FormControl(this.info['lastName'],Validators.required),
            role: new FormControl('customer')
     
          }
        )
      }
  customerForm: FormGroup<{
      firstName: FormControl<string | null>,
      lastName: FormControl<string | null>,
      role: FormControl<string | null>,
      email: FormControl<string | null>,
      phone: FormControl<string | null>,
      address: FormControl<string | null>,
      // pathToProfilePic: FormControl<string | null>
  }>;
  constructor(private router: Router ,private toastr: ToastrService , private http: HttpClient , private customerService : CustomerService){
    this.customerForm = new FormGroup(
      {
       
        email: new FormControl('', [Validators.required,Validators.email]),
        phone: new FormControl('',[Validators.required , Validators.minLength(10),Validators.pattern(REGEX.MOBILE_NUMBER)]),
        address: new FormControl('',Validators.required ),
        firstName: new FormControl('' ,Validators.required),
        lastName: new FormControl('' ,Validators.required),
        role: new FormControl('customer')
        // category: new FormControl('',Validators.required ),
        // pathToProfilePic: new FormControl('', ),
      }
    )
      }
 
get controlName(){
  return this.customerForm.controls;
}
profilePage(){
  this.router.navigate([PAGE.CUSTOMER_PROFILE]);
}
onSubmit(){
  if (this.customerForm.valid ) {
   this.customerService.updateCustomerProfile(this.customerForm ) 

} else {
  console.log("show errors")
  this.showError = true;
}
}
}
