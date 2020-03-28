import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@app/auth/auth.service';

// the Jwt token might expire after a while,
// in case client user made some operations that triggers a Http request(with expired token) and got rejected.
// the SPA application could reload and redirect user to login page.
// otherwise, the user may still remains on a protected page with silent warnings in the console.
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authenticationService.logout();
                location.reload(); // reload the Angular single page application.
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}