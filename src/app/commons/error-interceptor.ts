import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private snackbar : MatSnackBar){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        catchError((error : HttpErrorResponse) => {
            let errorMessage = error.error.message || "Unexpected Error from the server";
            this.snackbar.open(errorMessage, "ERROR")
            return throwError(() => error);
        })
    );
  }
}