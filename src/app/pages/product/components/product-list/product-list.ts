import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe, RouterModule],
  templateUrl: './product-list.html',

})
export default class ProductList {
  private productService = inject(ProductService);
  private router = inject(Router);

  public products$: Observable<Product[]> = this.productService.getProducts();
  public isDeleting = signal<number | null>(null);

  onAddProduct(): void {
    this.router.navigate(['/products/create-product']);
  }

  onEditProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  onDeleteProduct(id: number): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      this.isDeleting.set(id);

      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products$ = this.productService.getProducts();
          this.isDeleting.set(null);
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.isDeleting.set(null);
          alert('Error al eliminar el producto');
        }
      });
    }
  }
}
