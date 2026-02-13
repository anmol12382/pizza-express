import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(pizza: Pizza) {
    const items = [...this.cartSubject.value];
    const existing = items.find(i => i.pizza.id === pizza.id);

    if (existing) {
      existing.quantity++;
    } else {
      items.push({ pizza, quantity: 1 });
    }

    this.cartSubject.next(items);
  }

  increase(id: number) {
    this.cartSubject.value.find(i => i.pizza.id === id)!.quantity++;
    this.cartSubject.next([...this.cartSubject.value]);
  }

  decrease(id: number) {
    const items = this.cartSubject.value;
    const item = items.find(i => i.pizza.id === id)!;
    item.quantity--;

    if (item.quantity === 0) {
      this.remove(id);
      return;
    }

    this.cartSubject.next([...items]);
  }

  remove(id: number) {
    this.cartSubject.next(
      this.cartSubject.value.filter(i => i.pizza.id !== id)
    );
  }

  totalAmount$ = this.cart$.pipe(
    map(items =>
      items.reduce((sum, i) => sum + i.pizza.price * i.quantity, 0)
    )
  );

  cartCount$ = this.cart$.pipe(
  map(items =>
    items.reduce((count, item) => count + item.quantity, 0)
  )
);


  clearCart() {
    this.cartSubject.next([]);
  }
}
