import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = signal(false);
  categoryId = signal<number | null>(null);
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
      name:        ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.maxLength(1000)]
    });

    const id = this.route.snapshot.paramMap.get('categoryId');
    if (id) {
      this.isEdit.set(true);
      this.categoryId.set(Number(id));
      this.menuService.getCategories().subscribe({
        next: (cats) => {
          const cat = cats.find(c => c.categoryId === Number(id));
          if (cat) this.form.patchValue(cat);
          else this.errorMsg.set('Category not found.');
        },
        error: () => this.errorMsg.set('Failed to load category.')
      });
    }
  }

  get f() { return this.form.controls; }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting.set(true);
    this.errorMsg.set('');

    const payload = { name: this.form.value.name, description: this.form.value.description };

    const req = this.isEdit()
      ? this.adminService.updateCategory(this.categoryId()!, payload)
      : this.adminService.createCategory(payload);

    req.subscribe({
      next: () => this.router.navigate(['/admin'], { queryParams: { tab: 'categories' } }),
      error: (err) => {
        this.errorMsg.set(err?.error?.message ?? 'Failed to save category.');
        this.submitting.set(false);
      }
    });
  }
}
