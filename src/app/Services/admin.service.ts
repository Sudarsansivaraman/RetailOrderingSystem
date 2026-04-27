import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Item, CreateItemPayload, UpdateItemPayload } from '../models/item.model';

export interface CategoryPayload { name: string; description: string; }

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly base = 'https://localhost:7174/api/admin';

  constructor(private http: HttpClient) {}

  // ── CATEGORY ──────────────────────────────────────────────────────────
  createCategory(payload: CategoryPayload): Observable<Category> {
    return this.http.post<Category>(`${this.base}/categories`, payload);
  }

  updateCategory(id: number, payload: CategoryPayload): Observable<Category> {
    return this.http.put<Category>(`${this.base}/categories/${id}`, payload);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/categories/${id}`);
  }

  // ── ITEMS ─────────────────────────────────────────────────────────────
  createItem(payload: CreateItemPayload): Observable<Item> {
    return this.http.post<Item>(`${this.base}/items`, payload);
  }

  updateItem(itemId: number, payload: UpdateItemPayload): Observable<Item> {
    return this.http.put<Item>(`${this.base}/items/${itemId}`, payload);
  }

  deleteItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/items/${itemId}`);
  }
}
