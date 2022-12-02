import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('access-token') != null) {
      const token = localStorage.getItem('access-token');
      const modifiedReq = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      //console.log(modifiedReq);
      return next.handle(modifiedReq)
    } else {
      return next.handle(request);
    }

  }
}
