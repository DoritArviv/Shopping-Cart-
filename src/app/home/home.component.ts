import { Component, OnInit, OnDestroy } from '@angular/core';
import {GetProductsService} from '../_services/get-products.service';
import {Product} from '../_interface/all.interface'
import { CartService } from '../_services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  products : Product[] =[];

  _$products: Subscription = null;

  constructor(
    private getAllItem : GetProductsService,
    private cart: CartService,
  ) { }

   ngOnInit() : void{
     if(localStorage.getItem('token') !==null){
       this.cart.get(localStorage.getItem('token'))
      }
      this.getAll();

    // Register for cart updates
    this._$products = this.cart.$products().subscribe();
  }

  ngOnDestroy() {
    if (this._$products !== null) {
      this._$products.unsubscribe();
    }
  }

  getAll(){
    this.getAllItem.getProducts().subscribe((data : Product[]) =>{
      this.products = data; 
    })
  }
  
//Add product  to cart
  addToCart(prodID ){
  this.cart.addProduct(prodID);
  }

}
