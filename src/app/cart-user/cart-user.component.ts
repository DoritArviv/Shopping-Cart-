import { Component, OnInit, OnDestroy} from '@angular/core';
import { CartService } from '../_services/cart.service';
import { Product, User } from '../_interface/all.interface';
import { Subscription } from 'rxjs';
import { GetUsersService } from '../_services/get-users.service';

@Component({
  selector: 'app-cart-user',
  templateUrl: './cart-user.component.html',
  styleUrls: ['./cart-user.component.css']
})
export class CartUserComponent implements OnInit, OnDestroy{

  totalPrice :number;
  user: User;
  products: Product[] = [];

  subProd : Subscription = null;
  subName : Subscription = null;
  subTotal : Subscription = null;

  constructor(
    private cart: CartService,
    private getUserService: GetUsersService
  ) { }

  async ngOnInit() {
    // userName
    this.subName = await this.getUserService.getSingelUser().subscribe((user: User) => {
        this.user = user;
      });
    await this.getUserProduct();
    await this.totPrice();

    if(localStorage.getItem('token') !==null){
      this.cart.get(localStorage.getItem('token'))
    }
  }

  getUserProduct() {
    this.subProd = this.cart.$products().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  onDelete(prodID) {
    this.cart.removeProduct(prodID);
  }

  ngOnDestroy() {
    if(this.subName !== null && this.subTotal !== null && 
        this.subProd !== null)
    {
    this.subName.unsubscribe();
    this.subTotal.unsubscribe();
    this.subProd.unsubscribe();
    }
  }

 async totPrice(){
    this.subTotal = await this.cart.$products().subscribe((products: Product[]) =>{
    this.totalPrice =  products.map(x=>x.price).reduce((sum, val) => sum + val, 0);
      });
    }
  
  

}
