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
    ingredients: [],
    toppings: [],
    price: 0
  };

  pizzaMenu = [
  { name: 'Margherita', type: 'veg', price: 199 },
  { name: 'Farmhouse', type: 'veg', price: 299 },
  { name: 'Peppy Paneer', type: 'veg', price: 349 },
  { name: 'Veggie Paradise', type: 'veg', price: 329 },
  { name: 'Indi Tandoori Paneer', type: 'veg', price: 399 },
  { name: 'Cheese and Corn', type: 'veg', price: 249 },

  { name: 'Pepper Barbecue Chicken', type: 'non-veg', price: 399 },
  { name: 'Chicken Sausage', type: 'non-veg', price: 349 },
  { name: 'Chicken Dominator', type: 'non-veg', price: 499 },
  { name: 'Indi Chicken Tikka', type: 'non-veg', price: 459 },
  { name: 'Non-veg Supreme', type: 'non-veg', price: 479 },
  { name: 'Tandoori Chicken Burst', type: 'non-veg', price: 529 },
  { name: 'Garlic Chicken Burst', type: 'non-veg', price: 549 }
];

ingredientsList = [
  'Mozzarella Cheese',
  'Sauce'
];

toppingsList = [
  'Black Olive',
  'Onion',
  'Capsicum',
  'Red Pepper',
  'Paneer'
];


  constructor(private cartService: CartService) {}

  onPizzaSelect(name: string) {
  const selected = this.pizzaMenu.find(p => p.name === name);

  if (selected) {
    this.pizza.type = selected.type as 'veg' | 'non-veg';
    this.pizza.price = selected.price;
  }
}

toggleSelection(list: string[], value: string) {
  const index = list.indexOf(value);
  if (index > -1) {
    list.splice(index, 1);
  } else {
    list.push(value);
  }
}


 addPizza() {
  if (!this.pizza.name) {
    alert('Please select a pizza from the menu 🍕');
    return;
  }

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
      ingredients: [],
      toppings: [],
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
