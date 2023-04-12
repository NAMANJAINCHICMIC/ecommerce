import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  constructor(private authService : AuthService ,  private router:Router){
    //  authService.getProfile()
    //  authService.getUserData()
    }
homePage(){
  this.router.navigate([PAGE.HOME]);
}
signOut(){
  this.authService.signOutFn()
}
viewProfile(){
  this.router.navigate([PAGE.CUSTOMER_PROFILE]);
}
myCart(){
  this.router.navigate([PAGE.MY_CART]);
}
myOrders(){
  this.router.navigate([PAGE.MY_ORDERS]);
}
updateProfile(){
  this.router.navigate([PAGE.UPDATE_CUSTOMER_PROFILE]);
}
}
