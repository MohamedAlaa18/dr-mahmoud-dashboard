import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourseForm } from 'src/app/model/iCourse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  URL = environment.API_KEY;

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

  getCourse(courseId: number): Observable<any> {
    const token = this.getTokenFromCookies();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<any>(`${this.URL}/courses/${courseId}`, { headers });
  }

  createCourse(course: ICourseForm, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('course', new Blob([JSON.stringify(course)], { type: 'multipart/form-data' }));
    formData.append('photo', photo, photo.name);

    const token = this.getTokenFromCookies();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post(`${this.URL}/courses/`, formData, { headers });
  }

  updateCourse(course: ICourseForm, photo: File): Observable<any> {
    const formData = new FormData();
    formData.append('course', JSON.stringify(course));

    if (photo) {
      formData.append('photo', photo, photo.name);
    }

    const token = this.getTokenFromCookies();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.put(`${this.URL}/courses/`, formData, { headers });
  }

  deleteCourse(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL}/courses/${id}`);
  }

  getAllCourses(pageNumber: number, pageSize: number, title?: string, description?: string, code?: string): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (title) {
      params = params.set('title', title);
    }
    if (description) {
      params = params.set('description', description);
    }
    if (code) {
      params = params.set('code', code);
    }

    const token = this.getTokenFromCookies();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<any>(`${this.URL}/courses/`, { headers, params });
  }
}
