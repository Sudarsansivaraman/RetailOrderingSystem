import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Cart } from '../../../Models/cart';
import { CartService } from '../../../Services/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (data) => {
        this.cart = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cart';
        this.loading = false;
      }
    });
  }

  removeItem(cartItemId: number): void {
    this.cartService.removeFromCart(cartItemId).subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => {
        this.error = 'Failed to remove item';
      }
    });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(cartItemId);
      return;
    }
    
    this.cartService.updateCartItem({ cartItemId, quantity }).subscribe({
      next: (data) => {
        this.cart = data;
      },
      error: (err) => {
        this.error = 'Failed to update quantity';
      }
    });
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
