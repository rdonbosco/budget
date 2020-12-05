import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(
    private httpClient: HttpClient
  ) { }

  Budget(param) {
    return this.httpClient.post(`${environment.baseUrl}Budget`, param);
  }

  GetBudget() {
    return this.httpClient.get(`${environment.baseUrl}Budget`);
  }

  GetBudgetFilter(param) {
    return this.httpClient.post(`${environment.baseUrl}budgetFilter`, param);
  }
}
