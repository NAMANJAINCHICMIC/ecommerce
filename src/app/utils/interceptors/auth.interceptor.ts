import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn:'root'
})
export class AuthInterceptor implements HttpInterceptor {
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('hello')
    return next.handle(request)
    .pipe(catchError((error)=> {
      // console.log(error,"jai mata di")
      return throwError(error)
    }))
  }
}
