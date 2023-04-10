import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-view-profile',
  templateUrl: './customer-view-profile.component.html',
  styleUrls: ['./customer-view-profile.component.scss']
})
export class CustomerViewProfileComponent implements OnInit {
  // myself:DocumentData = [];
  myself:any;

 info:DocumentData = [];
  constructor(private customerService : CustomerService){}
  async ngOnInit(): Promise<void> {
    const snap = await this.customerService.getCustomerProfile( );
  
    if (snap.exists()) {
             this.info = snap.data()      
             this.myself = snap.data()      
            console.log(this.info)   
        }
 
}}