import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private httpClient: HttpClient
  ) { }

  Signup(param) {
    return this.httpClient.post(`${environment.baseUrl}signup`, param);
  }
}
