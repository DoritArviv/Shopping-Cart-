import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';




@Injectable({
  providedIn: 'root'
})
export class LoginService{

  uri = 'http://localhost:3000';
  
  constructor(private http: HttpClient) {}

  login(user) {
    return this.http.post(`${this.uri}/login`, user);
  }
}
