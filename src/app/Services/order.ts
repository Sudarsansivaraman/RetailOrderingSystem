import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, PlaceOrderDto } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7174/api/orders';

  constructor(private http: HttpClient) {}

  placeOrder(dto: PlaceOrderDto): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, dto);
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }
}
