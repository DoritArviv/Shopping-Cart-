import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  uri = 'http://localhost:3000';
  constructor(private http : HttpClient) { }

  registerUser(user){
   return this.http.post(`${this.uri}/addUser`, user);
  }
}
