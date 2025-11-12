export interface ProductResponse {
  users: Product[];
}

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  stock: number;
  categoria: string;
}
