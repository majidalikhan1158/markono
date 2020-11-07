// Angular Modules
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
// RxJs
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {
  constructor(
    // Angular Modules
    private http: HttpClient
  ) {}

  public get = (url: string): Observable<HttpResponse<any>> =>
    this.http
      .get(url, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError))

  public post = (url: string, data: any): Observable<HttpResponse<any>> =>
    this.http.post(url, data, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError))

  public put = (url: string, data: any): Observable<HttpResponse<any>> =>
    this.http.put(url, data, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError))

  public delete = (url: string): Observable<HttpResponse<any>> =>
    this.http.delete(url, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError))

  private handleError = (res: HttpErrorResponse | any) =>
    observableThrowError(res)
}
