import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PAGE } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService ) { }
  canActivate(
    route: ActivatedRouteSnapshot): boolean{
      const { routeConfig } = route;
      const { path } = routeConfig as Route;
  
      if ((path?.includes('main')|| path?.includes('profile'))&& !this.authService.isNotLoggedIn()) {
        return true;
      }  
      if (( path?.includes('sign-in')) && !this.authService.isNotLoggedIn()) {
        this.router.navigate([PAGE.HOME]);
        return false; 
      }
      if ((path?.includes('sign-in')) && this.authService.isNotLoggedIn()) {
        return true;
      }
      this.router.navigate(['/']);
      return false;
  }
  
}
