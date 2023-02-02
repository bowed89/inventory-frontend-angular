import { HttpClient } from '@angular/common/http';
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
  saveProduct(body: any) {
    const endpoint = `${BASE_ULR}/products`;
    return this.http.post(endpoint, body);
  }

}
