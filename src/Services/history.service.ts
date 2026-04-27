import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockItem, Order } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'https://localhost:7174/api';

  constructor(private http: HttpClient) {}

  /**
   * Get stock levels for all items
   */
  getAllStock(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.apiUrl}/inventory/stock`);
  }

  /**
   * Get stock for a specific item
   */
  getStockByItemId(itemId: number): Observable<StockItem> {
    return this.http.get<StockItem>(`${this.apiUrl}/inventory/stock/${itemId}`);
  }

  /**
   * Get order history for logged-in user
   */
  getUserOrderHistory(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orderhistory`);
  }

  /**
   * Get details of a specific order
   */
  getOrderDetail(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orderhistory/${orderId}`);
  }
}
