import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, AddToCartDto, UpdateCartDto } from '../Models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7174/api/cart';

  constructor(private http: HttpClient) {}

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl);
  }

  addToCart(dto: AddToCartDto): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/add`, dto);
  }

  updateCartItem(dto: UpdateCartDto): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/update`, dto);
  }

  removeFromCart(cartItemId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/remove?cartItemId=${cartItemId}`);
  }
}
