import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private baseURL: string = 'https://upskilling-egypt.com:3006/api/v1/';

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');

    const updatedUrl = request.url.startsWith('http') ? request.url : `${this.baseURL}${request.url}`;

    const clonedRequest = request.clone({
      url: updatedUrl, 
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(clonedRequest);
  }
}

