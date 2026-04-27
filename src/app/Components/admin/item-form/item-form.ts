import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { MenuService } from '../../../services/menu.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './item-form.html',
  styleUrl: './item-form.css'
})
export class ItemFormComponent implements OnInit {
  form!: FormGroup;
  categories = signal<Category[]>([]);
  isEdit = signal(false);
  itemId = signal<number | null>(null);
  submitting = signal(false);
  errorMsg = signal('');

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:          ['', [Validators.required, Validators.maxLength(200)]],
      description:   ['', Validators.maxLength(1000)],
      price:         [null, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      imageUrl:      [''],
      categoryId:    [null, Validators.required],
      isAvailable:   [true]
    });

    // Load categories for dropdown
    this.menuService.getCategories().subscribe({
      next: (cats) => this.categories.set(cats),
      error: () => this.errorMsg.set('Failed to load categories.')
    });

    // Check edit mode
    const id = this.route.snapshot.paramMap.get('itemId');
    if (id) {
      this.isEdit.set(true);
      this.itemId.set(Number(id));
      this.menuService.getItemById(Number(id)).subscribe({
        next: (item) => this.form.patchValue(item),
        error: () => this.errorMsg.set('Failed to load item.')
      });
    }
  }

  get f() { return this.form.controls; }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting.set(true);
    this.errorMsg.set('');

    const payload = this.form.value;

    const req = this.isEdit()
      ? this.adminService.updateItem(this.itemId()!, payload)
      : this.adminService.createItem(payload);

    req.subscribe({
      next: () => this.router.navigate(['/admin']),
      error: (err) => {
        this.errorMsg.set(err?.error?.message ?? 'Failed to save item. Please try again.');
        this.submitting.set(false);
      }
    });
  }
}
