import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { VendorService } from 'src/app/services/vendor.service';
import { PAGE, defaultImage } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-vendor-view-profile',
  templateUrl: './vendor-view-profile.component.html',
  styleUrls: ['./vendor-view-profile.component.scss']
})
export class VendorViewProfileComponent implements OnInit {
 
  myself:any;
 defaultImage = defaultImage;
 info:DocumentData = [];
  constructor(private vendorService : VendorService , private router : Router){}
  async ngOnInit(): Promise<void> {
    const snap = await this.vendorService.getVendorProfile( );
    if(snap)
    if (snap.exists()) {
             this.info = snap.data()      
             this.myself = snap.data()      
            console.log(this.info)   
        }

}
updateProfile(){
  this.router.navigate([PAGE.UPDATE_VENDOR_PROFILE]);
}
}