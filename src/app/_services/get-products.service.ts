import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetProductsService {
  
  uri = 'http://localhost:3000';
  
  constructor(private http: HttpClient){ }

  getProducts(){
    return this.http.get(`${this.uri}/products`);
  }
}

