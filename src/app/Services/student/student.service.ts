import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllStudent(): Observable<any> {
    return this.httpClient.get(`${this.URL}/students`);
  }

  getStudentsCount(): Observable<any> {
    return this.httpClient.get<any>(`${this.URL}/students/count`);
  }

  deleteStudent(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.URL}/Student/${id}`);
  }
}
