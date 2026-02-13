import { Routes } from '@angular/router';
import { CustomizeComponent } from './customize/customize.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {path:'customize',component:CustomizeComponent},
    {path:'pizzas',component:PizzasComponent},
    {path:'cart',component:CartComponent},
    {path:'',component:LoginComponent},
    {path:'**',component:PageNotFoundComponent},
];
