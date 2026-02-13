import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalAmount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.totalAmount$.subscribe(total => {
      this.totalAmount = total;
    });
  }

  increase(id: number) {
    this.cartService.increase(id);
  }

  decrease(id: number) {
    this.cartService.decrease(id);
  }

  checkout() {
    alert('Thanks for ordering, have a great day! 😊');
    this.cartService.clearCart();
  }
}
