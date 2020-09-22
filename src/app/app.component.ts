import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './_services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Shopping-Cart';

  loggedIn = false;
  goToReg = false;
  goToLogin = false;

  myCart = false;

  constructor(
    private router : Router, 
    private cartService : CartService
  ){}

  ngOnInit(){
    this.router.events.subscribe(event => {
      if (location.pathname === '/' && (localStorage.getItem('token') === null) ) {
        this.myCart = false;
        this.onLogin();
      }
      
      if (location.pathname === '/products') {
        this.myCart = true;
      }
      if(location.pathname === '/user-cart') {
        this.myCart = true;
      }
  });

  }

  afterRegistration(event) {
    if (event.isToken) {
      this.loggedIn = true;
    }
  }

  onLogOut(event){
    if (event === false) {
      this.loggedIn = false;
      this.goToReg = false;
      this.goToLogin = false;
      
      this.router.navigate(['/']);
    }
  }

 onLogin() {
    const token = localStorage.getItem('token');
    if (token !== null) {
    
    this.loggedIn = true;
    }
    this.goToLogin = true;
  }

 afterLogin(){
    this.loggedIn = true;
    this.router.navigate(['/products']);
  }
}
