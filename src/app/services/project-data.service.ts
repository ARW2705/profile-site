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

  /**
   * Get project summaries
   *
   * @params: none
   *
   * @return: Observable - array of project summaries
  **/
  getProjects(): Observable<any> {
    return this.http.get(baseURL + apiVersion + 'projects')
      .pipe(catchError(err => this.httpErrorService.handleError(err)));
  }

  /**
   * Get project details by its ID
   *
   * @params: id - query id for requested project
   *
   * @return: Observable - project detail object
  **/
  getProjectById(id: number): Observable<any> {
    return this.http.get(baseURL + apiVersion + 'projects/' + id)
      .pipe(catchError(err => this.httpErrorService.handleError(err)));
  }
}
