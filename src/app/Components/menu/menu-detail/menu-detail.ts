import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../../services/menu.service';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-menu-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-detail.html',
  styleUrl: './menu-detail.css'
})
export class MenuDetailComponent implements OnInit {
  item = signal<Item | null>(null);
  loading = signal(true);
  error = signal('');

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('itemId'));
    this.menuService.getItemById(id).subscribe({
      next: (item) => { this.item.set(item); this.loading.set(false); },
      error: () => { this.error.set('Item not found.'); this.loading.set(false); }
    });
  }
}
