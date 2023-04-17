import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,  } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
   ): boolean {
    if ( !this.authService.isNotLoggedIn() && (this.authService.getRole() == 'vendor') ) {
      return true;
    }  
    if ( !this.authService.isNotLoggedIn()  ) {
      this.router.navigate(['/']);
      return false;
    }  
    this.router.navigate([PAGE.SIGN_IN]);
    return false;
  }
  
}
