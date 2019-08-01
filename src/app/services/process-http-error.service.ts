import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpErrorService {

  constructor(private http: HttpClient) { }

  /**
   * Convert HTTP or app generated error response to user error feedback message
   *
   * @params: error - error object to be converted
   *
   * @return: Observable - throw formatted error message
  **/
  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;
    if (error instanceof HttpErrorResponse) {
      const errStatus = (error.status) ? error.status: 503;
      const errStatusText = (error.status) ? error.statusText: 'Service Unavailable';
      errMsg = `${errStatus} - ${errStatusText || ''}`;
    } else {
      errMsg = error.message ? error.message: error.toString();
    }
    return throwError(errMsg);
  }
}
