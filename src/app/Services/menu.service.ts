import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly base = 'https://localhost:7174/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}/categories`);
  }

  getItems(categoryId?: number, search?: string): Observable<Item[]> {
    let params = new HttpParams();
    if (categoryId != null) params = params.set('categoryId', categoryId);
    if (search)             params = params.set('search', search);
    return this.http.get<Item[]>(`${this.base}/items`, { params });
  }

  getItemById(itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.base}/items/${itemId}`);
  }
}
