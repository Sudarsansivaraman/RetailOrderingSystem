import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../../../services/history.service';
import { Order } from '../../../models/inventory.model';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css'
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  error: string | null = null;
  orderId: number | null = null;

  constructor(
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = parseInt(params['id'], 10);
      if (this.orderId) {
        this.loadOrderDetail();
      }
    });
  }

  loadOrderDetail(): void {
    if (!this.orderId) return;

    this.loading = true;
    this.error = null;

    this.historyService.getOrderDetail(this.orderId).subscribe({
      next: (data) => {
        this.order = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading order detail:', err);
        this.error = 'Failed to load order details. Please try again.';
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/history']);
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

  calculateItemTotal(quantity: number, unitPrice: number): number {
    return quantity * unitPrice;
  }
}
