import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {FormGroup,FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { RegisterService } from '../_services/register.service';
import { CartService } from '../_services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit , OnDestroy {
  frmRegister : FormGroup;
  subRegister : Subscription = null;

  @Output() afterReg = new EventEmitter(); // this i send to app.componet
  @Output() cancelReg = new EventEmitter();

  constructor(
    private fb : FormBuilder,
    private router :Router,
    private registerService : RegisterService
    ) { }

  ngOnInit() {
    this.createForm();
  }
  ngOnDestroy(){
    if (this.subRegister !== null){
    this.subRegister.unsubscribe();
  }
  }
  createForm() {
    this.frmRegister = this.fb.group({
      username: [],
      email :[],
      password: []
    });
  }

  onRegister() {
   this.subRegister = this.registerService.registerUser(this.frmRegister.value)
    .subscribe(async (data: any) => {
      console.log(data); // new user
      localStorage.setItem('token', data.token); 
      const token = await this.waitForToken();
      
      if (token) {
        this.afterReg.emit({isToken: true});
        this.router.navigate(['/products']);
      }
    });
  }

  waitForToken() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      return true;
    }
    return false;
  }
  onCancel(){
    this.cancelReg.emit(true);
  }

}
