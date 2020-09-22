import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Product} from '../_interface/all.interface'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private uri = 'http://localhost:3000';

  private products_subject = new BehaviorSubject<Product[]>([]);


  constructor(private http: HttpClient) { }

  get(token){
    const headerToken = new HttpHeaders().append("Authorization",token);
    this.http.get(`${this.uri}/cart/${headerToken.get('Authorization')}`).subscribe((resp) => { 
      this.updateProductsFromServer(resp);
       });  

  }

  public token() : string {
    return  localStorage.getItem('token')
  }

  addProduct(prodID ) {
    this.http.post(`${this.uri}/cart/add_product`, {id :prodID, token : this.token()}).subscribe((resp) => {
      this.updateProductsFromServer(resp);
    });
  }

  removeProduct(prodID) {
    this.http.post(`${this.uri}/cart/remove_product`, {id: prodID, token : this.token()}).subscribe((resp) => {
      this.updateProductsFromServer(resp);
    });
  }

  clearProducts() {
    this.http.post(`${this.uri}/cart/clear`, {token : this.token()}).subscribe((resp) => {
      this.updateProductsFromServer(resp);
    }); 
  }

  private updateProductsFromServer(resp) {
    const _products = resp['products'];
   
    this.products_subject.next(_products);
  }

  public $products() {
    return this.products_subject.asObservable();
  }

  
}
