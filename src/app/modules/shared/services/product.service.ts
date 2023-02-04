import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductElement } from '../../shared/interfaces/product.interface';

const BASE_ULR = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  // Obtener todos los productos
  getProducts() {
    const endpoint = `${BASE_ULR}/products`;
    return this.http.get(endpoint);
  }

  // Guardar producto
  saveProduct(body: FormData) {
    const endpoint = `${BASE_ULR}/products`;
    return this.http.post(endpoint, body);
  }

  // Modificar producto
  updateProduct(body: FormData, id: any) {
    const endpoint = `${BASE_ULR}/products/${id}`;
    return this.http.put(endpoint, body);
  }

  // Eliminar producto
  deleteProduct(id: any) {
    const endpoint = `${BASE_ULR}/products/${id.id}`;
    return this.http.delete(endpoint);
  }

  // Buscar producto por nombre
  getProductByName(name: any) {
    const endpoint = `${BASE_ULR}/products/filter/${name}`;
    return this.http.get(endpoint);

  }
}
