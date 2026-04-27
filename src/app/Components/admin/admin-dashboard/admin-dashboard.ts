import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { AdminService } from '../../../services/admin.service';
import { Category } from '../../../models/category.model';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  categories = signal<Category[]>([]);
  items = signal<Item[]>([]);
  loading = signal(true);
  successMsg = signal('');
  errorMsg = signal('');

  activeTab = signal<'items' | 'categories'>('items');

  constructor(
    private menuService: MenuService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading.set(true);
    this.menuService.getCategories().subscribe({
      next: (cats) => {
        this.categories.set(cats);
        this.menuService.getItems().subscribe({
          next: (items) => { this.items.set(items); this.loading.set(false); },
          error: () => { this.errorMsg.set('Failed to load items.'); this.loading.set(false); }
        });
      },
      error: () => { this.errorMsg.set('Failed to load categories.'); this.loading.set(false); }
    });
  }

  deleteItem(itemId: number, name: string): void {
    if (!confirm(`Delete "${name}"?`)) return;
    this.adminService.deleteItem(itemId).subscribe({
      next: () => {
        this.items.update(list => list.filter(i => i.itemId !== itemId));
        this.flash('success', `"${name}" deleted.`);
      },
      error: () => this.flash('error', 'Failed to delete item.')
    });
  }

  deleteCategory(id: number, name: string): void {
    if (!confirm(`Delete category "${name}"? This may affect linked items.`)) return;
    this.adminService.deleteCategory(id).subscribe({
      next: () => {
        this.categories.update(list => list.filter(c => c.categoryId !== id));
        this.flash('success', `Category "${name}" deleted.`);
      },
      error: () => this.flash('error', 'Failed to delete category.')
    });
  }

  setTab(tab: 'items' | 'categories'): void {
    this.activeTab.set(tab);
  }

  private flash(type: 'success' | 'error', msg: string): void {
    if (type === 'success') { this.successMsg.set(msg); this.errorMsg.set(''); }
    else { this.errorMsg.set(msg); this.successMsg.set(''); }
    setTimeout(() => { this.successMsg.set(''); this.errorMsg.set(''); }, 3500);
  }

  trackItemId(_: number, item: Item) { return item.itemId; }
  trackCatId(_: number, cat: Category) { return cat.categoryId; }
}
