import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.API_KEY;
  private authSubject = new BehaviorSubject<boolean>(false);
  public authStatus$ = this.authSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  private getCookie(name: string): string {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }

  private getTokenFromCookies(): string {
    const token = this.getCookie('userAdminToken');
    return token;
  }

  deposit(userId: string, amount: number): Observable<any> {
    const token = this.getTokenFromCookies();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { amount: amount };

    return this.httpClient.post(`${this.baseUrl}/users/${userId}/deposit`, body, { headers });
  }

  getStudentUsers(pageNumber: number = 1, pageSize: number = 10, searchQuery?: string): Observable<any> {
    const token = this.getTokenFromCookies();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('roleId', '4');

    if (searchQuery) {
      params = params.set('searchQuery', searchQuery);
    }

    return this.httpClient.get<any>(`${this.baseUrl}/users/`, { headers, params });
  }

  getRestUsers(pageNumber: number = 1, pageSize: number = 10, searchQuery?: string): Observable<any> {
    const token = this.getTokenFromCookies();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('includeRoles', '1,2,3');

    if (searchQuery) {
      params = params.set('searchQuery', searchQuery);
    }

    return this.httpClient.get<any>(`${this.baseUrl}/users/`, { headers, params });
  }

  createUser(user: any): Observable<any> {
    const token = this.getTokenFromCookies();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { user };

    return this.httpClient.post(`${this.baseUrl}/users/add`, body, { headers });
  }
}
