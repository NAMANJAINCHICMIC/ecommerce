import { Component, OnInit } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { VendorService } from 'src/app/services/vendor.service';
import { defaultImage } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-vendor-view-profile',
  templateUrl: './vendor-view-profile.component.html',
  styleUrls: ['./vendor-view-profile.component.scss']
})
export class VendorViewProfileComponent implements OnInit {
  // myself:DocumentData = [];
  myself:any;
 defaultImage = defaultImage;
 info:DocumentData = [];
  constructor(private vendorService : VendorService){}
  async ngOnInit(): Promise<void> {
    const snap = await this.vendorService.getVendorProfile( );
    if (snap.exists()) {
             this.info = snap.data()      
             this.myself = snap.data()      
            console.log(this.info)   
        }
  // this.mainService.userProfile().subscribe((res:any)=>{
  //   this.myself =res?.data
  //   // console.log(res);
  //   // console.log(this.myself);
  // })
  // }
}}