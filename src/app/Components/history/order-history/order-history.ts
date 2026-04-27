import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HistoryService } from '../../../services/history.service';
import { Order } from '../../../models/inventory.model';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private historyService: HistoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.loading = true;
    this.error = null;

    this.historyService.getUserOrderHistory().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading order history:', err);
        this.error = 'Failed to load order history. Please try again.';
        this.loading = false;
      }
    });
  }

  viewOrderDetail(orderId: number): void {
    this.router.navigate(['/history/detail', orderId]);
  }

  getStatusColor(status: string): string {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '#2E7D32';
      case 'pending':
        return '#F57C00';
      case 'delivered':
        return '#1565C0';
      case 'cancelled':
        return '#C62828';
      default:
        return '#757575';
    }
  }
}
