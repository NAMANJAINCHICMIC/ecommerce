import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent {
  constructor(private authService : AuthService ,  private router:Router){
 
    }
homePage(){
  this.router.navigate([PAGE.VENDOR_HOME]);
}
signOut(){
  this.authService.signOutFn()
}
addItem(){
  this.router.navigate([PAGE.ADD_ITEM]);
}
viewProfile(){
  this.router.navigate([PAGE.VENDOR_PROFILE]);
}
orders(){
  this.router.navigate([PAGE.VENDOR_ORDERS]);
}
}
