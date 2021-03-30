import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './tabella/tabella.component';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) { }

  handleError:any;

  getDataRows(apiURL: string): Observable<Employee> {
    return this.http.get<Employee>(apiURL).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
}
