import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../interfaces/product.interface";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httprequest = inject(HttpClient);
  public url: string = 'http://localhost:3000/products';

  getProducts(): Observable<Product[]> {
    return this.httprequest.get<Product[]>(this.url);
  }

  getProductById(id: number): Observable<Product> {
    return this.httprequest.get<Product>(`${this.url}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httprequest.post<Product>(this.url, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httprequest.put<Product>(`${this.url}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.httprequest.delete<void>(`${this.url}/${id}`);
  }
}
