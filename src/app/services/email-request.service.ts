import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../shared/base-url';
import { apiVersion } from '../shared/api-version';
import { Email } from '../shared/email';

import { ProcessHttpErrorService } from './process-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class EmailRequestService {

  constructor(private http: HttpClient,
    private httpErrorService: ProcessHttpErrorService) { }

  /**
   * Submit email information to server - email is generated there
   *
   * @params: email - necessary data to generate an email
   *
   * @return: Observable - http response data
  **/
  submitEmail(email: Email): Observable<any> {
    return this.http.post(baseURL + apiVersion + 'email', email)
      .pipe(catchError(err => this.httpErrorService.handleError(err)));
  }

}
