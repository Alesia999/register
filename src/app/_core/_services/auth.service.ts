import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserData } from '../../interfaces/user-data.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  register(data: UserData): Observable<UserData> {
    return this._httpClient
      .post<UserData>('https://jsonplaceholder.typicode.com/posts/', data)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
