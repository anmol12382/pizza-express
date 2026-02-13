import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Pizza } from '../models/pizza.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.css'
})
export class PizzasComponent {

  pizzas: Pizza[] = [];
  filteredPizzas: Pizza[] = [];

  filterType: 'all' | 'veg' | 'non-veg' = 'all';

  pizza: Pizza = {
    id: 0,
    name: '',
    type: 'veg',
    ingredients: '',
    toppings: '',
    price: 0
  };

  constructor(private cartService: CartService) {}

  addPizza() {
    this.pizza.id = Date.now();
    this.pizzas.push({ ...this.pizza });
    this.applyFilter();
    this.resetForm();
  }

  resetForm() {
    this.pizza = {
      id: 0,
      name: '',
      type: 'veg',
      ingredients: '',
      toppings: '',
      price: 0
    };
  }

  deletePizza(id: number) {
    this.pizzas = this.pizzas.filter(p => p.id !== id);
    this.applyFilter();
  }

  onFilterChange(event: any) {
    this.filterType = event.target.value;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredPizzas =
      this.filterType === 'all'
        ? this.pizzas
        : this.pizzas.filter(p => p.type === this.filterType);
  }

  addToCart(pizza: Pizza) {
    this.cartService.addToCart(pizza);
    alert('Pizza added to cart 🍕');
  }
}
