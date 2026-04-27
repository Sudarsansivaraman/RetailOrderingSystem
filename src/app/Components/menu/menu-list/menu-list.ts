import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { Category } from '../../../models/category.model';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './menu-list.html',
  styleUrl: './menu-list.css'
})
export class MenuListComponent implements OnInit {
  categories = signal<Category[]>([]);
  items = signal<Item[]>([]);
  loading = signal(true);
  error = signal('');

  selectedCategoryId = signal<number | null>(null);
  searchTerm = signal('');

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadItems();
  }

  loadCategories(): void {
    this.menuService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: () => this.error.set('Failed to load categories.')
    });
  }

  loadItems(): void {
    this.loading.set(true);
    this.menuService.getItems(
      this.selectedCategoryId() ?? undefined,
      this.searchTerm() || undefined
    ).subscribe({
      next: (items) => { this.items.set(items); this.loading.set(false); },
      error: () => { this.error.set('Failed to load items.'); this.loading.set(false); }
    });
  }

  selectCategory(id: number | null): void {
    this.selectedCategoryId.set(id);
    this.loadItems();
  }

  onSearch(): void {
    this.loadItems();
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.loadItems();
  }

  trackById(_: number, item: Item) { return item.itemId; }
  trackByCatId(_: number, cat: Category) { return cat.categoryId; }
}
