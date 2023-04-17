import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  
  constructor(public authService : AuthService ,private customerService : CustomerService ,  private router:Router){

    }
    emitValue(data:string){
      console.log(data)
      this.customerService.searchString.next(data)
      this.router.navigate([PAGE.HOME]);
    }
homePage(){
  this.router.navigate([PAGE.HOME]);
}
signIn(){
  this.router.navigate([PAGE.SIGN_IN]);
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

}
