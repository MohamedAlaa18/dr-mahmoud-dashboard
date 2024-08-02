import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  URL = environment.API_KEY;

  constructor(private httpClient: HttpClient) { }

  getAllTransactions(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.URL}/GetALLTransactions`);
  }
}
