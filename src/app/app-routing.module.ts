import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartUserComponent } from './cart-user/cart-user.component';


const routes: Routes = [
  {path : 'products', component : HomeComponent},
  {path : 'user-cart',component : CartUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
