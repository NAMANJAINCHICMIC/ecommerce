import { Injectable } from '@angular/core';
import { Router,  } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class SignInGuard  {
  constructor(private router: Router, private authService: AuthService ) { }
  canActivate(
    ):  boolean  {
      if (!this.authService.isNotLoggedIn()&& (this.authService.getRole() == 'vendor')) {
        this.router.navigate([PAGE.VENDOR_HOME]);
        return false; 
      }

      if ( !this.authService.isNotLoggedIn()&& (this.authService.getRole() == 'customer')) {
        this.router.navigate([PAGE.HOME]);
        return false; 
      }
      if ( this.authService.isNotLoggedIn()) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
  
}
