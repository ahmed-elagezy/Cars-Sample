import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,
    private ToastrService: ToastrService,
    private router: Router
    ) { }
   baseUrl = 'https://localhost:7158/api/Account/register';

  public register( email:string , firstName:string , userName:string , lastName:string , password:string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { email , firstName , userName , lastName , password }).pipe(
      tap((data : any) => {
          // show toast from ngx-toastr
          this.ToastrService.success('Registration Successful', 'Welcome');
          this.ToastrService.info('Please confirm your email', 'Info');
          setTimeout(() => {
            this.router.navigate(['/confirm-email']);
          }, 2000);

      }),

      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          console.log(error);
          // Handle the 404 response here
          this.ToastrService.error('', 'Error');
          // console.log('Not found');
        } else if(error.status === 200){
          this.ToastrService.success('Registration Successful', 'Success');
          this.ToastrService.info('Please confirm your email', 'Info');

        }

        else {
          // Handle other error responses
          // console.log(error);
          // this.ToastrService.error('Registration Failed please try again', 'Error');
          // console.error(error);
        }
        return throwError('Something went wrong');
        this.ToastrService.error('something went worng', 'Error');

      })
    );
  }
}
