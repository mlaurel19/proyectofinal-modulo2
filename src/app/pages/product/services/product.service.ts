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

}
