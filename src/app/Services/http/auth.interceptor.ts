import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token && token != "null") {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }

}
