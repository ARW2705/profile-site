import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../shared/base-url';
import { apiVersion } from '../shared/api-version';

import { ProcessHttpErrorService } from './process-http-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private http: HttpClient,
    private httpErrorService: ProcessHttpErrorService) { }

  getProjects(): Observable<any> {
    return this.http.get(baseURL + apiVersion + 'projects')
      .pipe(catchError(err => this.httpErrorService.handleError(err)));
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(baseURL + apiVersion + 'projects/' + id)
      .pipe(catchError(err => this.httpErrorService.handleError(err)));
  }
}
