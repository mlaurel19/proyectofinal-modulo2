import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductCreate {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  public productForm: FormGroup;
  public isSubmitting = false;

  constructor() {
    this.productForm = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      stock: ['', [Validators.required, Validators.minLength(1)]],
      categoria: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isSubmitting = true;

      this.productService
        .createProduct(this.productForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['/products']);
          },
          error: (err) => {
            console.log('Error al crear producto', err);
            this.isSubmitting = false;
          }
        })
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }

  getErrorMessage(fieldname: string): string {
    const control = this.productForm.get(fieldname);

    if (control?.hasError('required')) {
      return `${fieldname} es requerido`
    }

    if (control?.hasError('minLength')) {
      const minLength = control.errors?.['minLength'].requiredLength;
      return `${fieldname} debe tener al menor ${minLength} caracteres`;
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.productForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}
