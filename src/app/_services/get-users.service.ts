import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {
  uri = 'http://localhost:3000';

  constructor( private http :HttpClient) { }
  
  getSingelUser(){
    const objToSend ={
      token :localStorage.getItem('token')
    };
    if(objToSend.token === null){
      return new Observable( obser =>{
        obser.next('no token found')
      });
    }
    return this.http.post(`${this.uri}/get-user`,objToSend)

  }
}
