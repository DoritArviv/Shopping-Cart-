import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  frmLogin : FormGroup;

  subLog : Subscription = null;

  @Output() loggedIn = new EventEmitter(); //emit to app.component
  @Output() cancelLog = new EventEmitter();

  constructor(
    private fb : FormBuilder,
    private loginService : LoginService,
    private router: Router,
    private cartService : CartService) { }

  ngOnInit(): void {
    this.createForm();
  }
  ngOnDestroy(){
    if(this.subLog !== null){
    this.subLog.unsubscribe();
    }
  }
  createForm(){
    this.frmLogin = this.fb.group({
      username : [],
      password : []
    });
  }

  
onLogin() {
  this.subLog= this.loginService.login(this.frmLogin.value)
      .subscribe(async  (token: any) => {
        localStorage.setItem('token', token.token);
        this.loggedIn.emit(true); // user logged in 
        if(localStorage.getItem('token') !==null){
          this.cartService.get(localStorage.getItem('token'))
        }
        this.router.navigate(['/products']);
    
      }, error => {
        throw new Error('No Response');
      });
}

onCancel(){
  this.cancelLog.emit(true)

}

}
