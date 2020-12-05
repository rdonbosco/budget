import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  Login(param) {
    return this.httpClient.post(`${environment.baseUrl}login`, param);
  }

  users() {
    return this.httpClient.get(`${environment.baseUrl}users`);
  }
  
  refreshToken() {
    return this.httpClient.get(`${environment.baseUrl}refreshToken`);
  }
}
