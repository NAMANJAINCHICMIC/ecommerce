import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-customer-view-profile',
  templateUrl: './customer-view-profile.component.html',
  styleUrls: ['./customer-view-profile.component.scss']
})
export class CustomerViewProfileComponent implements OnInit {

  myself:any;

 info:DocumentData = [];
  constructor(private customerService : CustomerService , private router : Router){}
  async ngOnInit(): Promise<void> {
    const snap = await this.customerService.getCustomerProfile( );
  
    if (snap.exists()) {
             this.info = snap.data()      
             this.myself = snap.data()      
            // console.log(this.info)   
        }
 
}
updateProfile(){
  this.router.navigate([PAGE.UPDATE_CUSTOMER_PROFILE]);
}
}