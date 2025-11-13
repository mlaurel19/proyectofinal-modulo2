import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-by-id',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-by-id.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductById implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public productForm: FormGroup;
  public isSubmitting = false;
  public isLoading = true;
  public productId: number = 0;
  public isEditMode = false;

  constructor() {
    this.productForm = this.fb.group({
      id: [0],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      stock: [0, [Validators.required, Validators.min(0)]], // Cambiado a número
      categoria: ['', [Validators.required, Validators.minLength(3)]] // Corregido minLength
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId && this.productId > 0) {
      this.isEditMode = true;
      this.loadProduct();
    } else {
      this.isLoading = false;
      this.isEditMode = false;
    }
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
        if (product) {
          this.productForm.patchValue({
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            stock: product.stock,
            categoria: product.categoria
          });
          this.isLoading = false;
        } else {
          console.error('Producto no encontrado');
          this.router.navigate(['/products']);
        }
      },
      error: (error) => {
        console.error('Error loading product:', error);
        alert('Error al cargar el producto');
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(): void {
    // Marcar todos los campos como touched para mostrar errores
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key)?.markAsTouched();
    });

    if (this.productForm.valid) {
      this.isSubmitting = true;

      const productData = this.productForm.value;

      if (this.isEditMode) {
        // Modo edición
        this.productService.updateProduct(this.productId, productData).subscribe({
          next: (response) => {
            console.log('Producto actualizado:', response);
            alert('Producto actualizado exitosamente');
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Error updating product:', error);
            alert('Error al actualizar el producto: ' + (error.message || 'Error desconocido'));
            this.isSubmitting = false;
          }
        });
      } else {
        // Modo creación
        this.productService.createProduct(productData).subscribe({
          next: (response) => {
            console.log('Producto creado:', response);
            alert('Producto creado exitosamente');
            this.router.navigate(['/products']);
          },
          error: (error) => {
            console.error('Error creating product:', error);
            alert('Error al crear el producto: ' + (error.message || 'Error desconocido'));
            this.isSubmitting = false;
          }
        });
      }
    } else {
      console.log('Formulario inválido:', this.productForm.errors);
      alert('Por favor, corrige los errores en el formulario');
    }
  }

  onCancel(): void {
    if (confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      this.router.navigate(['/products']);
    }
  }

  getErrorMessage(fieldName: string): string {
    const control = this.productForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} es requerido`;
    }
    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${this.getFieldLabel(fieldName)} debe tener al menos ${minLength} caracteres`;
    }
    if (control?.hasError('min')) {
      const min = control.errors?.['min'].min;
      return `${this.getFieldLabel(fieldName)} debe ser mayor o igual a ${min}`;
    }

    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'nombre': 'Nombre',
      'descripcion': 'Descripción',
      'stock': 'Stock',
      'categoria': 'Categoría'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.productForm.get(fieldName);
    return !!(control?.invalid && control?.touched);
  }
}