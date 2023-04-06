import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  constructor(private authService : AuthService){
    //  authService.getProfile()
    //  authService.getUserData()
    }
homePage(){}
signOut(){
  this.authService.signOutFn()
}
}
