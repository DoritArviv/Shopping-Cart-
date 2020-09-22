import { Component, OnInit,EventEmitter, Output, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GetUsersService } from '../_services/get-users.service';
import { CartService } from '../_services/cart.service';
import { Product } from '../_interface/all.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  
  collapseMenu = true;
  isLoggedIn = false;
  user;
  cartSize = 0;

  subProd : Subscription = null;
  subUser : Subscription = null;
  
 @Output() logOut = new EventEmitter(); // app.component
 @Input() isToken; // 
 
 about = false;


  constructor(
    private router :Router,
    private getUserService : GetUsersService,
    private cart: CartService,
  ) { }

  ngOnInit(): void {
  this.subProd =  this.cart.$products().subscribe((products: Product[]) => {
      this.cartSize = products.length;
    });
  }
  ngOnDestroy(){
    if(this.subUser !== null && this.subProd!== null){
    this.subProd.unsubscribe();
    this.subUser.unsubscribe();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    await this.getUser();
  }

  getUser(){
  this.subUser= this.getUserService.getSingelUser()
    .subscribe((data :any)=>{
      if(typeof data === 'string'){
        console.log('No User From Server');
      } else{
        this.user = data;
        this.isLoggedIn = true;
      }
    }, error => {
      throw new Error('No Response From The Server');
    });
  }

  async onLogOut() {
    await localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.isToken = false;
    this.logOut.emit(false);
    this.router.navigate(['/']); //login
  }

}
